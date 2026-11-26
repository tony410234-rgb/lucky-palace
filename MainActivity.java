package com.taeyul.luckypalace;

import android.app.Activity;
import android.content.Context;
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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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
        boolean online = isOnline();
        s.setCacheMode(online ? WebSettings.LOAD_NO_CACHE : WebSettings.LOAD_CACHE_ELSE_NETWORK);
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView view, WebResourceRequest req, WebResourceError err) {
                if (req.isForMainFrame() && !fellBack) { fellBack = true; view.loadUrl(LOCAL); }
            }
        });
        setContentView(web);
        hideBars();
        String remote = readUrl();
        if (online && remote != null && remote.startsWith("https://")) web.loadUrl(remote + "?t=" + System.currentTimeMillis());
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
    protected void onPause() { super.onPause(); web.onPause(); web.pauseTimers(); }

    @Override
    protected void onResume() { super.onResume(); web.onResume(); web.resumeTimers(); hideBars(); }

    @Override
    protected void onDestroy() { web.destroy(); super.onDestroy(); }
}
