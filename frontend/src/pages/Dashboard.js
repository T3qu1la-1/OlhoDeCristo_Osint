import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Search, Activity, AlertTriangle, Lock, Image, Compass, BookOpen, 
  FileText, Flame, Globe, Terminal, Users, Target, Database, Code,
  TrendingUp, Zap, Eye, ArrowRight, Sparkles, Clock, CheckCircle
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tools = [
    {
      id: 'pentester',
      title: 'Pentester Pro',
      description: 'Scanner avançado de vulnerabilidades',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      features: ['SQL Injection', 'XSS Scanner', 'Headers Security', 'SSL/TLS Analysis'],
      status: 'active'
    },
    {
      id: 'username-search',
      title: 'Username Search',
      description: 'Busca em 300+ plataformas',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      features: ['Social Media', 'Forums', 'Gaming', 'Dating Sites'],
      status: 'new'
    },
    {
      id: 'face-recognition',
      title: 'Face Recognition',
      description: 'Análise facial com IA',
      icon: Eye,
      color: 'from-orange-500 to-red-500',
      features: ['Age Detection', 'Emotion Analysis', 'Similar Faces', 'Reverse Search'],
      status: 'new'
    },
    {
      id: 'generators',
      title: 'Geradores Utils',
      description: 'Dados brasileiros realistas',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      features: ['CPF', 'Telefones', 'Endereços', 'CEP'],
      status: 'new'
    },
    {
      id: 'payload-gen',
      title: 'Payload Generator',
      description: 'Biblioteca completa de exploits',
      icon: Terminal,
      color: 'from-indigo-500 to-blue-500',
      features: ['SQL Injection', 'XSS', 'Reverse Shells', 'Command Injection'],
      status: 'new'
    },
    {
      id: 'api-tester',
      title: 'API Security Tester',
      description: 'Testes de segurança em APIs',
      icon: Code,
      color: 'from-pink-500 to-rose-500',
      features: ['REST/GraphQL', 'Rate Limiting', 'IDOR', 'Auth Bypass'],
      status: 'new'
    },
    {
      id: 'osint',
      title: 'OSINT Dorks',
      description: 'Google dorking & reconhecimento',
      icon: Search,
      color: 'from-yellow-500 to-orange-500',
      features: ['150+ Dorks', 'Custom Builder', 'Cyber Intel', 'File Hunter'],
      status: 'active'
    },
    {
      id: 'framework',
      title: 'OSINT Framework',
      description: 'Coleção completa de ferramentas',
      icon: Compass,
      color: 'from-cyan-500 to-blue-500',
      features: ['200+ Tools', '16 Categories', 'Direct Links', 'Search'],
      status: 'active'
    },
    {
      id: 'data-viz',
      title: 'Data Visualizer',
      description: 'Visualização de dados',
      icon: TrendingUp,
      color: 'from-violet-500 to-purple-500',
      features: ['Network Graphs', 'Heatmaps', 'Attack Surface', 'Relations'],
      status: 'new'
    },
    {
      id: 'website-cloner',
      title: 'Website Cloner',
      description: 'Clone completo de sites',
      icon: Globe,
      color: 'from-teal-500 to-cyan-500',
      features: ['Full Clone', 'Templates', 'Hosting', 'Analytics'],
      status: 'new'
    },
    {
      id: 'reverse-image',
      title: 'Reverse Image Search',
      description: 'Busca reversa multi-engine',
      icon: Target,
      color: 'from-red-500 to-orange-500',
      features: ['Google', 'Yandex', 'Bing', 'TinEye'],
      status: 'new'
    },
    {
      id: 'academy',
      title: 'Academy',
      description: 'Centro educacional completo',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-500',
      features: ['Cursos', 'Tutoriais', 'Glossário', 'Certificações'],
      status: 'active'
    },
    {
      id: 'exif',
      title: 'EXIF Hunter',
      description: 'Extrator de metadados',
      icon: Image,
      color: 'from-pink-500 to-purple-500',
      features: ['GPS Data', 'Camera Info', 'Timestamp', 'Full Report'],
      status: 'active'
    },
    {
      id: 'emoji',
      title: 'Emoji-Crypt',
      description: 'Esteganografia com emojis',
      icon: Lock,
      color: 'from-yellow-500 to-red-500',
      features: ['Encrypt', 'Decrypt', 'Mapping', 'Export'],
      status: 'active'
    },
    {
      id: 'geokit',
      title: 'GeoKit',
      description: 'Ferramentas de geolocalização',
      icon: Globe,
      color: 'from-green-500 to-teal-500',
      features: ['Image Location', 'GPS Analysis', 'Maps', 'Forensics'],
      status: 'active'
    },
    {
      id: 'reports',
      title: 'Relatórios',
      description: 'Geração de relatórios',
      icon: FileText,
      color: 'from-gray-500 to-slate-500',
      features: ['Detailed', 'Export', 'Executive', 'History'],
      status: 'active'
    }
  ];

  const stats = [
    { icon: Shield, label: 'Scans Realizados', value: '1,234', change: '+12%', color: 'text-blue-400' },
    { icon: AlertTriangle, label: 'Vulnerabilidades', value: '89', change: '-8%', color: 'text-red-400' },
    { icon: Activity, label: 'APIs Testadas', value: '456', change: '+23%', color: 'text-green-400' },
    { icon: Users, label: 'Usernames Encontrados', value: '2,567', change: '+45%', color: 'text-purple-400' }
  ];

  const recentActivity = [
    { action: 'Scan completo em exemplo.com', time: '5 min atrás', icon: Shield, color: 'text-blue-400' },
    { action: 'Username encontrado: john_doe', time: '12 min atrás', icon: Users, color: 'text-purple-400' },
    { action: 'API teste: 15 endpoints', time: '25 min atrás', icon: Code, color: 'text-green-400' },
    { action: 'Payload gerado: SQL Injection', time: '1 hora atrás', icon: Terminal, color: 'text-orange-400' }
  ];

  return (
    <div className="modern-dashboard">
      {/* Header */}
      <div className="dashboard-header-modern">
        <div>
          <h1 className="dashboard-title-modern">
            <span className="wave-emoji">👋</span> Bem-vindo de volta!
          </h1>
          <p className="dashboard-subtitle-modern">
            <Clock size={16} /> {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="header-actions">
          <motion.button 
            className="btn-dashboard btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={18} /> Quick Scan
          </motion.button>
          <motion.button 
            className="btn-dashboard btn-primary"
            onClick={() => onNavigate('pentester')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={18} /> Nova Investigação
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-modern">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index}
              className="stat-card-modern"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="stat-header">
                <div className={`stat-icon ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="dashboard-content-grid">
        {/* Tools Grid */}
        <div className="tools-section-modern">
          <div className="section-header-modern">
            <h2>
              <Sparkles size={24} /> Suas Ferramentas
            </h2>
            <p>{tools.length} ferramentas disponíveis</p>
          </div>
          
          <div className="tools-grid-modern">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  className="tool-card-modern"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => onNavigate(tool.id)}
                >
                  {tool.status === 'new' && (
                    <div className="tool-badge">NEW</div>
                  )}
                  <div className={`tool-icon-modern bg-gradient-to-br ${tool.color}`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="tool-title-modern">{tool.title}</h3>
                  <p className="tool-desc-modern">{tool.description}</p>
                  <ul className="tool-features-modern">
                    {tool.features.slice(0, 3).map((feature, i) => (
                      <li key={i}>
                        <CheckCircle size={14} /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="tool-button-modern">
                    Abrir <ArrowRight size={16} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="sidebar-content-modern">
          {/* Recent Activity */}
          <div className="activity-card">
            <h3 className="activity-title">
              <Activity size={20} /> Atividade Recente
            </h3>
            <div className="activity-list">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div 
                    key={index}
                    className="activity-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`activity-icon ${activity.color}`}>
                      <Icon size={18} />
                    </div>
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* System Status */}
          <div className="status-card">
            <h3 className="status-title">
              <Zap size={20} /> Status do Sistema
            </h3>
            <div className="status-items">
              <div className="status-item">
                <span className="status-dot online"></span>
                <span>Todos os serviços online</span>
              </div>
              <div className="status-item">
                <span className="status-dot online"></span>
                <span>API funcionando</span>
              </div>
              <div className="status-item">
                <span className="status-dot online"></span>
                <span>Database conectado</span>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="tips-card">
            <h3 className="tips-title">
              <Sparkles size={20} /> Dica do Dia
            </h3>
            <p className="tip-text">
              Use o <strong>Username Search</strong> para encontrar perfis em mais de 300 plataformas simultaneamente. Ideal para investigações OSINT!
            </p>
          </div>
        </div>
      </div>

      {/* Warning Box */}
      <div className="warning-box-modern">
        <AlertTriangle size={24} />
        <div>
          <strong>USO ÉTICO APENAS</strong>
          <p>Estas ferramentas são destinadas apenas a testes de segurança autorizados e pesquisa. O acesso não autorizado a sistemas é ilegal.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;