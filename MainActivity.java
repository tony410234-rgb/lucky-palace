package com.taeyul.luckypalace;

import android.app.Activity;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import android.speech.tts.TextToSpeech;
import java.util.Locale;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import android.speech.tts.Voice;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class MainActivity extends Activity {
    private TextToSpeech tts;
    private boolean ttsOk = false;
    private final List<Voice> femaleV = new ArrayList<>();
    private final List<Voice> maleV = new ArrayList<>();
    private final List<Voice> allV = new ArrayList<>();

    /* 고품질 한국어 음성들을 모아서 남/여로 나눔 (Google 음성: ism·kob=여성, koc·kod·jun=남성) */
    private void collectVoices() {
        try {
            for (Voice v : tts.getVoices()) {
                Locale l = v.getLocale();
                if (l == null || !"ko".equals(l.getLanguage())) continue;
                if (v.getFeatures() != null && v.getFeatures().contains(TextToSpeech.Engine.KEY_FEATURE_NOT_INSTALLED)) continue;
                allV.add(v);
            }
            Collections.sort(allV, (a, b) -> {
                int s = score(b) - score(a);
                return s != 0 ? s : a.getName().compareTo(b.getName());
            });
            for (Voice v : allV) {
                String n = v.getName().toLowerCase(Locale.ROOT);
                if (n.contains("koc") || n.contains("kod") || n.contains("jun") || n.contains("male") && !n.contains("female")) maleV.add(v);
                else femaleV.add(v);
            }
        } catch (Exception e) { }
    }
    private int score(Voice v) {
        int s = v.getQuality();
        if (!v.isNetworkConnectionRequired()) s += 150;   // 반응 빠른 기기 내장 음성 우선
        if (v.getLatency() <= Voice.LATENCY_NORMAL) s += 50;
        return s;
    }
    private Voice pickVoice(String g, int idx) {
        List<Voice> l = "m".equals(g) ? maleV : femaleV;
        if (l.isEmpty()) l = allV;
        if (l.isEmpty()) return null;
        return l.get(Math.abs(idx) % l.size());
    }
    private static final String LOCAL = "file:///android_asset/www/index.html";
    private WebView web;
    private boolean fellBack = false;
    private long pausedAt = 0;
    private String remote;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#0d0322"));
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(true);
        s.setTextZoom(100);
        s.setCacheMode(WebSettings.LOAD_NO_CACHE);
        web.clearCache(true);
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView view, WebResourceRequest req, WebResourceError err) {
                if (req.isForMainFrame() && !fellBack) { fellBack = true; view.loadUrl(LOCAL); }
            }
        });
        web.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void speak(final String text) {
                if (tts != null && ttsOk) tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "tl");
            }
            @JavascriptInterface
            public boolean hasVoice() { return ttsOk; }
            /* 캐릭터별 목소리: g=성별(m/f), idx=같은 성별 내 다른 목소리, pitch/rate=톤·속도 */
            @JavascriptInterface
            public void say(final String text, final String g, final int idx, final float pitch, final float rate) {
                if (tts == null || !ttsOk) return;
                try {
                    Voice v = pickVoice(g, idx);
                    if (v != null) tts.setVoice(v);
                    float p = pitch;
                    if ("m".equals(g) && maleV.isEmpty()) p = Math.max(0.55f, pitch - 0.25f); // 남자 음성이 없으면 톤을 낮춤
                    tts.setPitch(p);
                    tts.setSpeechRate(rate);
                    tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "tl");
                } catch (Exception e) { tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "tl"); }
            }
            @JavascriptInterface
            public int voiceCount() { return allV.size(); }
            @JavascriptInterface
            public void orient(final String mode) {
                runOnUiThread(new Runnable() { public void run() {
                    setRequestedOrientation("portrait".equals(mode) ? ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT : ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
                    hideBars();
                }});
            }
        }, "TLApp");
        tts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            public void onInit(int status) {
                if (status == TextToSpeech.SUCCESS) {
                    int r = tts.setLanguage(Locale.KOREAN);
                    ttsOk = r != TextToSpeech.LANG_MISSING_DATA && r != TextToSpeech.LANG_NOT_SUPPORTED;
                    collectVoices();
                    Voice v = pickVoice("f", 0);
                    if (v != null) tts.setVoice(v);
                    tts.setPitch(1.04f);
                    tts.setSpeechRate(0.97f);
                }
            }
        });
        setContentView(web);
        hideBars();
        remote = readUrl();
        loadRemote();
    }

    private void loadRemote() {
        if (remote != null && remote.startsWith("https://")) { fellBack = false; web.loadUrl(remote + "?t=" + System.currentTimeMillis()); }
        else web.loadUrl(LOCAL);
    }

    private String readUrl() {
        try (BufferedReader r = new BufferedReader(new InputStreamReader(getAssets().open("url.txt")))) {
            String line = r.readLine();
            return line == null ? null : line.trim();
        } catch (Exception e) { return null; }
    }

    private boolean isOnline() {
        try {
            ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo ni = cm.getActiveNetworkInfo();
            return ni != null && ni.isConnected();
        } catch (Exception e) { return false; }
    }

    private void hideBars() {
        web.setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideBars();
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript(
            "(function(){var p=document.getElementById('pop');if(p&&p.classList.contains('on'))return 2;" +
            "if(document.body.dataset.g!=='lobby'){document.getElementById('back').click();return 1}return 0})()",
            v -> { if ("0".equals(v)) finish(); });
    }

    @Override
    protected void onPause() { super.onPause(); pausedAt = System.currentTimeMillis(); web.onPause(); web.pauseTimers(); }

    @Override
    protected void onResume() {
        super.onResume(); web.onResume(); web.resumeTimers(); hideBars();
        long away = pausedAt == 0 ? 0 : System.currentTimeMillis() - pausedAt;
        // 오프라인 화면이었거나 20분 넘게 나갔다 오면 최신 버전으로 새로 불러오기
        if ((fellBack && isOnline()) || away > 20 * 60 * 1000L) { web.clearCache(true); loadRemote(); }
    }

    @Override
    protected void onDestroy() { if (tts != null) { tts.stop(); tts.shutdown(); } web.destroy(); super.onDestroy(); }
}
