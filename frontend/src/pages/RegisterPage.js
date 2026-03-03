import React, { useState } from 'react';
import { ArrowRight, AlertCircle, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = ({ onNavigate }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasLetter: /[a-zA-Z]/.test(password)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    const result = await register(formData.username, formData.email, formData.password);
    
    if (result.success) {
      onNavigate('dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const validation = validatePassword(formData.password);

  return (
    <div className="auth-minimal">
      <div className="auth-container-minimal">
        <div className="auth-box">
          <div className="auth-header-minimal">
            <h1 className="auth-title">REGISTRAR</h1>
            <div className="title-underline"></div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form-minimal">
            {error && (
              <div className="error-box">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="input-group">
              <label>USERNAME</label>
              <input 
                type="text" 
                placeholder="seu_username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
                autoComplete="username"
              />
            </div>

            <div className="input-group">
              <label>EMAIL</label>
              <input 
                type="email" 
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <label>SENHA</label>
              <input 
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                autoComplete="new-password"
              />
              {formData.password && (
                <div className="password-checks">
                  <div className={`check-item ${validation.minLength ? 'valid' : 'invalid'}`}>
                    {validation.minLength ? <Check size={14} /> : <X size={14} />}
                    <span>MÍNIMO 6 CARACTERES</span>
                  </div>
                  <div className={`check-item ${validation.hasLetter ? 'valid' : 'invalid'}`}>
                    {validation.hasLetter ? <Check size={14} /> : <X size={14} />}
                    <span>CONTÉM LETRA</span>
                  </div>
                  <div className={`check-item ${validation.hasNumber ? 'valid' : 'invalid'}`}>
                    {validation.hasNumber ? <Check size={14} /> : <X size={14} />}
                    <span>CONTÉM NÚMERO</span>
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="btn-minimal"
              disabled={loading}
            >
              {loading ? 'CRIANDO...' : (
                <>
                  CRIAR CONTA <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer-minimal">
            <p>
              JÁ TEM CONTA?{' '}
              <button onClick={() => onNavigate('login')} className="link-minimal">
                LOGIN
              </button>
            </p>
            <button onClick={() => onNavigate('landing')} className="link-minimal">
              VOLTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;