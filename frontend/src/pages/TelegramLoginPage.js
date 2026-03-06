import React, { useState } from 'react';
import { Send, ArrowLeft, ExternalLink, Loader } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import './AuthPages.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TelegramLoginPage = ({ onNavigate, onLoginSuccess }) => {
  const [telegramId, setTelegramId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!telegramId || !password) {
      toast.error('Preencha todos os campos!');
      return;
    }

    setLoading(true);

    try {
      // Backend vai capturar o IP automaticamente
      const response = await axios.post(`${BACKEND_URL}/api/auth/telegram/login`, {
        telegram_id: telegramId,
        password
      });

      const { access_token, user } = response.data;

      // Salvar token
      localStorage.setItem('token', access_token);

      toast.success(`Bem-vindo, ${user.first_name}! 🚀`);

      // Recarregar para atualizar AuthContext
      setTimeout(() => {
        window.location.href = '/';
      }, 500);

    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Erro ao fazer login via Telegram';
      toast.error(`❌ ${errorMsg}`);
      setLoading(false);
    }
  };

  const openBot = () => {
    window.open('https://t.me/MarfinnoBot', '_blank');
    toast.info('📱 Inicie conversa com /start para se registrar');
  };

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: '500px' }}>
        <button 
          className="back-button"
          onClick={() => onNavigate('landing')}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>

        <div className="auth-header">
          <div className="logo-container" style={{ 
            background: 'linear-gradient(135deg, #00bfff 0%, #0080ff 100%)',
            boxShadow: '0 0 30px rgba(0, 191, 255, 0.5)'
          }}>
            <Send size={48} color="#fff" />
          </div>
          <h1 style={{ 
            background: 'linear-gradient(135deg, #00bfff, #0080ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2rem',
            marginBottom: '0.5rem'
          }}>
            Login via Telegram
          </h1>
          <p style={{ color: '#888', fontSize: '0.95rem' }}>
            Use seu <strong style={{ color: '#00bfff' }}>Telegram ID</strong> e senha do bot
          </p>
        </div>

        <form className="auth-form" onSubmit={handleLogin} style={{ marginTop: '2rem' }}>
          <div className="form-group">
            <label style={{ color: '#00bfff', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🆔 Telegram ID
            </label>
            <input
              type="text"
              placeholder="Ex: 123456789"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              disabled={loading}
              style={{
                background: 'rgba(0, 191, 255, 0.05)',
                border: '2px solid rgba(0, 191, 255, 0.3)',
                color: '#fff',
                padding: '0.9rem',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00bfff'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 191, 255, 0.3)'}
            />
            <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.3rem', display: 'block' }}>
              Seu ID único do Telegram (somente números)
            </small>
          </div>

          <div className="form-group">
            <label style={{ color: '#00bfff', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🔐 Senha
            </label>
            <input
              type="password"
              placeholder="Senha cadastrada no bot"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                background: 'rgba(0, 191, 255, 0.05)',
                border: '2px solid rgba(0, 191, 255, 0.3)',
                color: '#fff',
                padding: '0.9rem',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00bfff'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 191, 255, 0.3)'}
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
            style={{
              background: loading ? '#666' : 'linear-gradient(135deg, #00bfff, #0080ff)',
              padding: '1rem',
              fontSize: '1.05rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(0, 191, 255, 0.4)',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <>
                <Loader className="spin" size={20} />
                Entrando...
              </>
            ) : (
              <>
                <Send size={20} />
                Entrar via Telegram
              </>
            )}
          </button>
        </form>

        <div className="auth-divider" style={{ margin: '2rem 0' }}>
          <span style={{ color: '#666' }}>Não tem conta?</span>
        </div>

        <button 
          className="auth-button-secondary"
          onClick={openBot}
          style={{
            background: 'rgba(0, 191, 255, 0.1)',
            border: '2px solid #00bfff',
            color: '#00bfff',
            padding: '1rem',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0, 191, 255, 0.2)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 191, 255, 0.1)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <ExternalLink size={20} />
          Abrir @MarfinnoBot para Registrar
        </button>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          background: 'rgba(0, 191, 255, 0.05)', 
          borderRadius: '12px',
          border: '2px solid rgba(0, 191, 255, 0.2)'
        }}>
          <h3 style={{ 
            color: '#00bfff', 
            marginBottom: '1rem', 
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📱 Como funciona:
          </h3>
          <ol style={{ 
            color: '#ccc', 
            fontSize: '0.95rem', 
            marginLeft: '1.5rem', 
            lineHeight: '2',
            paddingLeft: '0.5rem'
          }}>
            <li style={{ marginBottom: '0.5rem' }}>
              Abra o bot <strong style={{ color: '#00bfff' }}>@MarfinnoBot</strong> no Telegram
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Envie <code style={{ 
                background: 'rgba(0, 191, 255, 0.1)', 
                padding: '0.2rem 0.5rem', 
                borderRadius: '4px',
                color: '#00bfff'
              }}>/start</code> para se registrar
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Escolha uma senha forte (mínimo 6 caracteres)
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Use seu <strong style={{ color: '#00bfff' }}>Telegram ID</strong> + senha aqui
            </li>
            <li>
              Seu IP será registrado automaticamente 🔒
            </li>
          </ol>
        </div>

        <div className="auth-links" style={{ marginTop: '1.5rem' }}>
          <button 
            onClick={() => onNavigate('login')}
            style={{ color: '#888', fontSize: '0.9rem' }}
          >
            Login com Email
          </button>
          <span style={{ color: '#333' }}>|</span>
          <button 
            onClick={() => onNavigate('register')}
            style={{ color: '#888', fontSize: '0.9rem' }}
          >
            Registrar com Email
          </button>
        </div>
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TelegramLoginPage;
