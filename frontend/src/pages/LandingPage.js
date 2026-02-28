import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Zap, Globe, Eye, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onNavigate }) => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const features = [
    {
      icon: Shield,
      title: 'Scanner de Vulnerabilidades',
      description: '73 testes automatizados para identificar falhas de segurança em aplicações web',
      color: '#6366F1'
    },
    {
      icon: Zap,
      title: 'GeoClip OSINT',
      description: 'Geolocalização por imagem usando IA para investigações e análise forense',
      color: '#8B5CF6'
    },
    {
      icon: Globe,
      title: 'OSINT Framework',
      description: 'Agregador com 56+ ferramentas profissionais de inteligência de fontes abertas',
      color: '#EC4899'
    },
    {
      icon: Eye,
      title: 'Google Dorks',
      description: '181+ dorks pré-configurados para busca avançada e descoberta de informações',
      color: '#F59E0B'
    }
  ];

  const stats = [
    { value: '73', label: 'Testes de Segurança', suffix: '+' },
    { value: '181', label: 'Google Dorks', suffix: '+' },
    { value: '56', label: 'Ferramentas OSINT', suffix: '+' },
    { value: '100', label: 'Precisão', suffix: '%' }
  ];

  return (
    <div className="landing-page">
      {/* Navbar */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container">
          <div className="nav-content">
            <div className="nav-logo">
              <img src="https://customer-assets.emergentagent.com/job_meu-site-23/artifacts/320hwwea_Gemini_Generated_Image_mykhfqmykhfqmykh.png" alt="Olhos De Deus" />
              <span>Olhos De Deus</span>
            </div>
            <div className="nav-links">
              <button className="btn btn-outline" onClick={() => onNavigate('login')}>Entrar</button>
              <button className="btn btn-primary" onClick={() => onNavigate('register')}>Começar Grátis</button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div 
              className="hero-badge"
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            >
              🔒 Plataforma Profissional de Segurança Ofensiva
            </motion.div>
            
            <h1 className="hero-title">
              Segurança e OSINT <br/>
              <span className="gradient-text">em um só lugar</span>
            </h1>
            
            <p className="hero-description">
              Ferramentas profissionais para pentesting, análise de vulnerabilidades e inteligência de fontes abertas.
              Tudo que você precisa para investigações e segurança digital.
            </p>
            
            <div className="hero-actions">
              <motion.button 
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('register')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Começar Agora <ChevronRight size={20} />
              </motion.button>
              <motion.button 
                className="btn btn-outline btn-lg"
                onClick={() => onNavigate('login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Demo
              </motion.button>
            </div>

            <div className="hero-logo">
              <motion.img 
                src="https://customer-assets.emergentagent.com/job_meu-site-23/artifacts/320hwwea_Gemini_Generated_Image_mykhfqmykhfqmykh.png" 
                alt="Olhos De Deus Logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="stat-value">{stat.value}{stat.suffix}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Ferramentas Profissionais</h2>
            <p>Tudo que você precisa para segurança ofensiva e OSINT</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                >
                  <div className="feature-icon" style={{ color: feature.color }}>
                    <Icon size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Pronto para começar?</h2>
            <p>Junte-se a centenas de profissionais de segurança</p>
            <motion.button 
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Criar Conta Grátis <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="https://customer-assets.emergentagent.com/job_meu-site-23/artifacts/320hwwea_Gemini_Generated_Image_mykhfqmykhfqmykh.png" alt="Logo" />
              <span>Olhos De Deus</span>
            </div>
            <div className="footer-links">
              <a href="#">Documentação</a>
              <a href="#">API</a>
              <a href="#">Suporte</a>
              <a href="#">Privacidade</a>
            </div>
            <div className="footer-social">
              <Github size={20} />
              <Twitter size={20} />
              <Linkedin size={20} />
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Olhos De Deus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;