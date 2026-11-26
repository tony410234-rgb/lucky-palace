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
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class MainActivity extends Activity {
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
    protected void onDestroy() { web.destroy(); super.onDestroy(); }
}
