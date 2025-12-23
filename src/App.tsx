import { useState, useEffect } from 'react';
import { AmneziaWG } from 'amnezia-capacitor-plugin';
import './App.css';

function App() {
  const [config, setConfig] = useState('');
  const [status, setStatus] = useState('disconnected');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    checkStatus();
    // Poll status every 5 seconds
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [`${new Date().toLocaleTimeString()} ${msg}`, ...prev]);
    console.log(msg);
  };

  const checkStatus = async () => {
    try {
      const res = await AmneziaWG.getStatus();
      setStatus(res.status);
    } catch (e: any) {
      console.error('Status check failed', e);
    }
  };

  const handleConnect = async () => {
    if (!config) {
      addLog('Error: Config is empty');
      return;
    }

    try {
      addLog('Connecting...');
      const res = await AmneziaWG.connect({ config });
      addLog(`Connect result: ${res.status} ${res.message || ''}`);
      checkStatus();
    } catch (e: any) {
      addLog(`Connection error: ${e.message}`);
    }
  };

  const handleDisconnect = async () => {
    try {
      addLog('Disconnecting...');
      const res = await AmneziaWG.disconnect();
      addLog(`Disconnect result: ${res.status}`);
      checkStatus();
    } catch (e: any) {
      addLog(`Disconnect error: ${e.message}`);
    }
  };

  return (
    <div className="container">
      <h1>AmneziaWG Test</h1>

      <div className="status-card">
        <span className={`status-indicator ${status}`}></span>
        <span>Status: <strong>{status.toUpperCase()}</strong></span>
      </div>

      <div className="form-group">
        <label>Configuration (Interface + Peer)</label>
        <textarea
          value={config}
          onChange={(e) => setConfig(e.target.value)}
          placeholder="[Interface]&#10;PrivateKey = ...&#10;address = ...&#10;&#10;[Peer]&#10;..."
          rows={10}
        />
      </div>

      <div className="actions">
        {status === 'disconnected' ? (
          <button onClick={handleConnect} className="btn primary">Connect</button>
        ) : (
          <button onClick={handleDisconnect} className="btn danger">Disconnect</button>
        )}
      </div>

      <div className="logs">
        <h3>Logs</h3>
        <div className="log-window">
          {logs.map((log, i) => (
            <div key={i} className="log-entry">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
