import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = ({ onNavigate }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      onNavigate('dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const strength = passwordStrength(formData.password);

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-card">
          <div className="auth-header">
            <img src="https://customer-assets.emergentagent.com/job_meu-site-23/artifacts/320hwwea_Gemini_Generated_Image_mykhfqmykhfqmykh.png" alt="Logo" className="auth-logo" />
            <h1>Criar conta</h1>
            <p>Comece sua jornada de segurança digital</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <div className="form-group">
              <label>Nome completo</label>
              <div className="input-wrapper">
                <User size={20} />
                <input 
                  type="text" 
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={20} />
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Senha</label>
              <div className="input-wrapper">
                <Lock size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`strength-bar ${i < strength ? 'active' : ''}`}
                        style={{
                          background: i < strength ? 
                            ['#EF4444', '#F59E0B', '#F59E0B', '#10B981'][strength - 1] : 
                            '#E5E7EB'
                        }}
                      />
                    ))}
                  </div>
                  <span className="strength-text">
                    {['Muito fraca', 'Fraca', 'Média', 'Forte'][strength - 1] || 'Muito fraca'}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Confirmar senha</label>
              <div className="input-wrapper">
                <Lock size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
                {formData.confirmPassword && (
                  <span className="password-match">
                    {formData.password === formData.confirmPassword ? 
                      <CheckCircle size={20} color="#10B981" /> : 
                      <AlertCircle size={20} color="#EF4444" />
                    }
                  </span>
                )}
              </div>
            </div>

            <motion.button 
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Criando conta...' : (
                <>
                  Criar conta <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>
              Já tem uma conta?{' '}
              <button onClick={() => onNavigate('login')} className="link-button">
                Fazer login
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;