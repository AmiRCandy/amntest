package com.amnezia.capacitor;

import android.content.Intent;
import android.net.VpnService;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;

import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.ActivityCallback;
import androidx.activity.result.ActivityResult;
import org.amnezia.awg.backend.Backend;
import org.amnezia.awg.backend.GoBackend;
import org.amnezia.awg.backend.Tunnel;
import org.amnezia.awg.config.Config;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "AmneziaWG")
public class AmneziaWGPlugin extends Plugin {

    private Backend backend;
    private Tunnel tunnel;

    private static class MyTunnel implements Tunnel {
        private final String name;
        private State state = State.DOWN;

        MyTunnel(String name) { this.name = name; }

        @Override
        public String getName() { return name; }

        @Override
        public void onStateChange(State newState) {
            this.state = newState;
        }
    }

    @Override
    public void load() {
        this.backend = new GoBackend(getContext());
        this.tunnel = new MyTunnel("amnezia0");
    }

    @PluginMethod
    public void connect(PluginCall call) {
        String configStr = call.getString("config");
        if (configStr == null) {
            call.reject("Must provide config string");
            return;
        }

        // Prepare VPN
        Intent intent = VpnService.prepare(getContext());
        if (intent != null) {
            // Need permission. Save call handled by startActivityForResult
            startActivityForResult(call, intent, "vpnRequestCode");
        } else {
            // Already authorized
            doConnect(call, configStr);
        }
    }
    
    @ActivityCallback
    public void vpnRequestCode(PluginCall call, ActivityResult result) {
         if (result.getResultCode() == android.app.Activity.RESULT_OK) {
             String configStr = call.getString("config");
             doConnect(call, configStr);
         } else {
             call.reject("VPN permission denied");
         }
    }

    private void doConnect(PluginCall call, String configStr) {
        try {
             Config config = Config.parse(new BufferedReader(new InputStreamReader(
                 new ByteArrayInputStream(configStr.getBytes(StandardCharsets.UTF_8)))));
             backend.setState(tunnel, Tunnel.State.UP, config);
             
             JSObject ret = new JSObject();
             ret.put("status", "connected");
             call.resolve(ret);
        } catch (Exception e) {
             e.printStackTrace();
             call.reject("Failed to connect: " + e.getMessage());
        }
    }

    @PluginMethod
    public void disconnect(PluginCall call) {
        try {
            backend.setState(tunnel, Tunnel.State.DOWN, null);
            JSObject ret = new JSObject();
            ret.put("status", "disconnected");
            call.resolve(ret);
        } catch (Exception e) {
             call.reject("Failed to disconnect: " + e.getMessage());
        }
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        try {
            Tunnel.State state = backend.getState(tunnel);
             JSObject ret = new JSObject();
             ret.put("status", state == Tunnel.State.UP ? "connected" : "disconnected");
             call.resolve(ret);
        } catch (Exception e) {
            call.reject("Error getting status");
        }
    }
}
