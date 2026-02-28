import React, { useState } from 'react';
import { Search, Copy, PlayCircle, X, ExternalLink, Filter } from 'lucide-react';
import { dorksDatabase } from '../utils/dorksDatabase';
import './OSINTPage.css';

const OSINTPage = () => {
  const [target, setTarget] = useState('');
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customDork, setCustomDork] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' ou 'targeted'
  const [copiedIndex, setCopiedIndex] = useState(null);

  const totalDorks = dorksDatabase.getTotalCount();
  
  const filteredCategories = dorksDatabase.categories.filter(cat => 
    cat.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const openModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const executeDork = (dorkQuery) => {
    let fullQuery = dorkQuery;
    
    // Se tem target, substitui {TARGET} ou adiciona site:
    if (target) {
      if (fullQuery.includes('{TARGET}')) {
        fullQuery = fullQuery.replace(/{TARGET}/g, target);
      } else if (!fullQuery.includes('site:')) {
        fullQuery = `site:${target} ${fullQuery}`;
      }
    }
    
    // Adiciona keyword se existir
    if (keyword && !fullQuery.includes(keyword)) {
      fullQuery += ` "${keyword}"`;
    }
    
    setQuery(fullQuery.trim());
    openGoogle(fullQuery.trim());
  };

  const openGoogle = (searchQuery) => {
    const encoded = encodeURIComponent(searchQuery);
    window.open(`https://www.google.com/search?q=${encoded}`, '_blank');
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const runQuickSearch = () => {
    let searchQuery = '';
    
    if (target) {
      searchQuery += `site:${target} `;
    }
    
    if (keyword) {
      searchQuery += `"${keyword}"`;
    }
    
    if (searchQuery.trim()) {
      setQuery(searchQuery.trim());
      openGoogle(searchQuery.trim());
    }
  };

  const runCustomDork = () => {
    if (!customDork.trim()) return;
    
    let finalQuery = customDork;
    
    if (target && !customDork.includes('site:')) {
      finalQuery = `site:${target} ${customDork}`;
    }
    
    setQuery(finalQuery);
    openGoogle(finalQuery);
  };

  const insertOperator = (operator) => {
    setCustomDork(customDork + operator + ' ');
  };

  const executeTargetedDork = (dork) => {
    if (!target) {
      alert('Por favor, insira um domínio alvo primeiro!');
      return;
    }
    const query = dork.query.replace(/{TARGET}/g, target);
    setQuery(query);
    openGoogle(query);
  };

  return (
    <div className="osint-page">
      <header className="osint-header">
        <h1>
          <span className="glitch" data-text="DORKSEARCH">DORK<span className="highlight">SEARCH</span></span>
          <span className="pro-badge">PRO</span>
        </h1>
        <p className="subtitle">
          <Search size={16} /> {totalDorks}+ GOOGLE DORKS ORGANIZADOS
        </p>
      </header>

      <div className="search-config">
        <h2>⚙️ CONFIGURAÇÃO DE BUSCA</h2>
        
        <div className="input-group">
          <label>🎯 DOMÍNIO ALVO (opcional)</label>
          <div className="input-wrapper">
            <span className="prefix">site:</span>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="exemplo.com.br"
            />
            <button onClick={() => setTarget('')} className="clear-btn">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>🔑 PALAVRA-CHAVE</label>
          <div className="input-wrapper">
            <span className="prefix">#</span>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="senha, admin, backup..."
            />
            <button onClick={() => setKeyword('')} className="clear-btn">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="button-group">
          <button onClick={runQuickSearch} className="btn-primary">
            <PlayCircle size={20} />
            BUSCA RÁPIDA
          </button>
          <button onClick={() => {setTarget(''); setKeyword(''); setQuery('');}} className="btn-secondary">
            LIMPAR
          </button>
        </div>

        {query && (
          <div className="query-preview">
            <div className="query-header">
              <span>QUERY GERADA:</span>
              <button onClick={() => copyToClipboard(query, 'main')}>
                <Copy size={16} /> {copiedIndex === 'main' ? 'COPIADO!' : 'COPIAR'}
              </button>
            </div>
            <code>{query}</code>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          📚 CATEGORIAS ({dorksDatabase.categories.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'targeted' ? 'active' : ''}`}
          onClick={() => setActiveTab('targeted')}
        >
          🎯 DORKS POR ALVO ({dorksDatabase.targetedDorks.length})
        </button>
      </div>

      {activeTab === 'categories' && (
        <div className="dorks-section">
          <div className="section-header">
            <h2>📂 CATEGORIAS DE DORKS</h2>
            <div className="search-box">
              <Filter size={16} />
              <input
                type="text"
                placeholder="Filtrar categorias..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="dorks-grid">
            {filteredCategories.map((category, idx) => (
              <div 
                key={idx}
                className="dork-card"
                onClick={() => openModal(category)}
              >
                <div className="dork-icon">
                  {category.icon}
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="dork-count">{category.dorks.length} dorks</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'targeted' && (
        <div className="targeted-section">
          <div className="section-header">
            <h2>🎯 DORKS PARA ALVO ESPECÍFICO</h2>
            <p className="section-subtitle">
              {target ? `Alvo atual: ${target}` : 'Insira um domínio acima para usar estes dorks'}
            </p>
          </div>

          <div className="targeted-dorks-list">
            {dorksDatabase.targetedDorks.map((dork, idx) => (
              <div key={idx} className="targeted-dork-item">
                <div className="targeted-dork-info">
                  <span className="dork-number">{idx + 1}</span>
                  <div className="dork-details">
                    <code className="dork-query">
                      {target ? dork.query.replace(/{TARGET}/g, target) : dork.query}
                    </code>
                    <span className="dork-desc">{dork.description}</span>
                  </div>
                </div>
                <div className="targeted-dork-actions">
                  <button 
                    onClick={() => executeTargetedDork(dork)} 
                    className="btn-execute"
                    disabled={!target}
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button 
                    onClick={() => copyToClipboard(
                      target ? dork.query.replace(/{TARGET}/g, target) : dork.query, 
                      `targeted-${idx}`
                    )} 
                    className="btn-copy"
                  >
                    <Copy size={16} />
                    {copiedIndex === `targeted-${idx}` ? '✓' : ''}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="custom-dork-section">
        <h2>🔧 CONSTRUTOR AVANÇADO</h2>
        <p className="section-description">Crie queries customizadas combinando operadores do Google</p>
        
        <div className="operator-chips">
          {['site:', 'filetype:', 'inurl:', 'intitle:', 'intext:', 'ext:', 'cache:', 'related:', 'OR', 'AND', '-', '"'].map(op => (
            <button key={op} onClick={() => insertOperator(op)} className="chip">
              <code>{op}</code>
            </button>
          ))}
        </div>

        <div className="custom-input-group">
          <textarea
            value={customDork}
            onChange={(e) => setCustomDork(e.target.value)}
            placeholder='Exemplo: site:exemplo.com inurl:admin filetype:php intitle:"login"'
            rows="3"
          />
          <button onClick={runCustomDork} className="execute-btn">
            <PlayCircle size={20} /> EXECUTAR
          </button>
        </div>
      </div>

      {showModal && selectedCategory && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-icon">{selectedCategory.icon}</span>
                <h3>{selectedCategory.name}</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>
            <p className="modal-description">{selectedCategory.description}</p>
            <div className="modal-body">
              {selectedCategory.dorks.map((dork, idx) => (
                <div key={idx} className="dork-item">
                  <div className="dork-item-header">
                    <span className="dork-number">{idx + 1}</span>
                    <span className="dork-label">{dork.description}</span>
                  </div>
                  <code className="dork-code">{dork.query}</code>
                  <div className="dork-actions">
                    <button onClick={() => executeDork(dork.query)} className="btn-execute">
                      <ExternalLink size={16} /> Executar
                    </button>
                    <button onClick={() => copyToClipboard(dork.query, `modal-${idx}`)} className="btn-copy">
                      <Copy size={16} /> {copiedIndex === `modal-${idx}` ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OSINTPage;
