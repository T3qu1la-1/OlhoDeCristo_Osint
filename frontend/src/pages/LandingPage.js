import React, { useEffect, useRef } from 'react';
import { Terminal, Code, Shield, Eye } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onNavigate }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="landing-minimal">
      <canvas ref={canvasRef} className="matrix-bg" />
      
      <div className="landing-content">
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">OLHOS_DE_DEUS.exe</span>
          </div>
          
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="prompt">root@system:~$</span>
              <span className="command"> ./initialize_system</span>
            </div>
            
            <div className="system-output">
              <p className="typing-effect">[OK] Loading security modules...</p>
              <p className="typing-effect delay-1">[OK] Initializing OSINT framework...</p>
              <p className="typing-effect delay-2">[OK] System ready.</p>
            </div>

            <div className="main-content">
              <div className="logo-section">
                <Eye className="logo-icon" size={80} />
                <h1 className="system-title glitch" data-text="OLHOS DE DEUS">
                  OLHOS DE DEUS
                </h1>
              </div>

              <div className="description">
                <p className="mono-text">
                  &gt; PLATAFORMA PROFISSIONAL DE PENTESTING E OSINT
                </p>
                <p className="mono-text">
                  &gt; 300+ FERRAMENTAS INTEGRADAS
                </p>
                <p className="mono-text">
                  &gt; SCANNER DE VULNERABILIDADES
                </p>
                <p className="mono-text">
                  &gt; INTELIGÊNCIA DE FONTES ABERTAS
                </p>
              </div>

              <div className="features-grid">
                <div className="feature-item">
                  <Shield size={24} />
                  <span>PENTESTING</span>
                </div>
                <div className="feature-item">
                  <Terminal size={24} />
                  <span>OSINT</span>
                </div>
                <div className="feature-item">
                  <Code size={24} />
                  <span>EXPLOITS</span>
                </div>
                <div className="feature-item">
                  <Eye size={24} />
                  <span>RECON</span>
                </div>
              </div>

              <div className="developer-section">
                <div className="scan-line"></div>
                <h2 className="developer-title">&gt; DESENVOLVEDOR</h2>
                <div className="developer-info">
                  <p className="mono-text">NOME: TEQU1LA</p>
                  <p className="mono-text">ROLE: SECURITY RESEARCHER & DEVELOPER</p>
                  <p className="mono-text">STACK: PYTHON | REACT | FASTAPI | MONGODB</p>
                  <p className="mono-text">FOCUS: OFFENSIVE SECURITY & OSINT</p>
                </div>
              </div>

              <div className="actions">
                <button className="btn-terminal" onClick={() => onNavigate('login')}>
                  [ LOGIN ]
                </button>
                <button className="btn-terminal btn-primary" onClick={() => onNavigate('register')}>
                  [ REGISTRAR ]
                </button>
              </div>

              <div className="footer-text">
                <p className="mono-text small">USO ÉTICO APENAS - TESTES AUTORIZADOS</p>
                <p className="mono-text small">&copy; 2026 OLHOS DE DEUS - ALL RIGHTS RESERVED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;