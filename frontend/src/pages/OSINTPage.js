import React, { useState } from 'react';
import { Search, Copy, PlayCircle, X } from 'lucide-react';
import { dorksData } from '../utils/dorksData';
import './OSINTPage.css';

const OSINTPage = () => {
  const [mode, setMode] = useState('sec');
  const [target, setTarget] = useState('');
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customDork, setCustomDork] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredDorks = dorksData.filter(d => 
    d.type === mode && 
    d.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const openModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const executeDork = (dorkCode) => {
    let fullQuery = '';
    
    if (mode === 'sec' && target) {
      if (!dorkCode.includes('site:')) {
        fullQuery += `site:${target} `;
      }
    }
    
    if (keyword) {
      fullQuery += `"${keyword}" `;
    }
    
    fullQuery += dorkCode;
    
    setQuery(fullQuery.trim());
    openGoogle(fullQuery.trim());
  };

  const openGoogle = (searchQuery) => {
    const encoded = encodeURIComponent(searchQuery);
    window.open(`https://www.google.com/search?q=${encoded}`, '_blank');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Toast notification could be added here
  };

  const runQuickSearch = () => {
    let searchQuery = '';
    
    if (mode === 'sec' && target) {
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
    
    if (mode === 'sec' && target && !customDork.includes('site:')) {
      finalQuery = `site:${target} ${customDork}`;
    }
    
    setQuery(finalQuery);
    openGoogle(finalQuery);
  };

  const insertOperator = (operator) => {
    setCustomDork(customDork + operator + ' ');
  };

  return (
    <div className="osint-page">
      <header className="osint-header">
        <h1>
          <span className="glitch" data-text="DORKSEARCH">DORK<span className="highlight">SEARCH</span></span>
          <span className="pro-badge">PRO</span>
        </h1>
        <p className="subtitle">
          <Search size={16} /> ADVANCED PASSIVE RECONNAISSANCE PLATFORM
        </p>
      </header>

      <div className="mode-switcher">
        <button 
          className={`mode-btn ${mode === 'sec' ? 'active' : ''}`}
          onClick={() => setMode('sec')}
        >
          <div className="mode-icon">🛡️</div>
          <div className="mode-info">
            <h3>CYBER_INTEL</h3>
            <p>Pentesting • Bug Bounty • Red Team</p>
          </div>
        </button>
        
        <button 
          className={`mode-btn ${mode === 'media' ? 'active' : ''}`}
          onClick={() => setMode('media')}
        >
          <div className="mode-icon">🔍</div>
          <div className="mode-info">
            <h3>FILE_HUNTER</h3>
            <p>Documents • Media • Personal Info</p>
          </div>
        </button>
      </div>

      <div className="search-config">
        <h2>SEARCH CONFIGURATION</h2>
        
        {mode === 'sec' && (
          <div className="input-group">
            <label>TARGET DOMAIN</label>
            <div className="input-wrapper">
              <span className="prefix">site:</span>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="example.com"
              />
              <button onClick={() => setTarget('')} className="clear-btn">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="input-group">
          <label>KEYWORD / QUERY</label>
          <div className="input-wrapper">
            <span className="prefix">#</span>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter search term..."
            />
            <button onClick={() => setKeyword('')} className="clear-btn">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="button-group">
          <button onClick={runQuickSearch} className="btn-primary">
            <PlayCircle size={20} />
            EXECUTE SCAN
          </button>
          <button onClick={() => {setTarget(''); setKeyword(''); setQuery('');}} className="btn-secondary">
            RESET
          </button>
        </div>

        {query && (
          <div className="query-preview">
            <div className="query-header">
              <span>GENERATED QUERY:</span>
              <button onClick={() => copyToClipboard(query)}>
                <Copy size={16} /> COPY
              </button>
            </div>
            <code>{query}</code>
          </div>
        )}
      </div>

      <div className="dorks-section">
        <div className="section-header">
          <h2>AVAILABLE CATEGORIES</h2>
          <input
            type="text"
            placeholder="🔍 Search category..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="dorks-grid">
          {filteredDorks.map((category, idx) => (
            <div 
              key={idx}
              className="dork-card"
              onClick={() => openModal(category)}
            >
              <div className="dork-icon" style={{background: `${category.color}20`, borderColor: `${category.color}40`, color: category.color}}>
                {category.icon}
              </div>
              <h3>{category.category}</h3>
              <p>Explore {category.items.length} dorks</p>
            </div>
          ))}
        </div>
      </div>

      <div className="custom-dork-section">
        <h2>ADVANCED CONSTRUCTOR</h2>
        <p className="section-description">Create custom queries combining advanced Google operators</p>
        
        <div className="operator-chips">
          {['site:', 'filetype:', 'inurl:', 'intitle:', 'intext:', 'ext:', 'cache:', 'related:'].map(op => (
            <button key={op} onClick={() => insertOperator(op)} className="chip">
              <code>{op}</code>
            </button>
          ))}
        </div>

        <div className="custom-input-group">
          <textarea
            value={customDork}
            onChange={(e) => setCustomDork(e.target.value)}
            placeholder='Example: site:example.com inurl:admin filetype:php intitle:"login"'
            rows="3"
          />
          <button onClick={runCustomDork} className="execute-btn">
            <PlayCircle size={20} /> EXECUTE
          </button>
        </div>
      </div>

      {showModal && selectedCategory && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedCategory.category}</h3>
              <button onClick={() => setShowModal(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {selectedCategory.items.map((item, idx) => (
                <div key={idx} className="dork-item">
                  <div className="dork-item-header">
                    <span className="dork-number">{idx + 1}</span>
                    <span className="dork-label">{item.label}</span>
                  </div>
                  <code className="dork-code">{item.dork}</code>
                  <div className="dork-actions">
                    <button onClick={() => executeDork(item.dork)} className="btn-execute">
                      <PlayCircle size={16} /> Execute
                    </button>
                    <button onClick={() => copyToClipboard(item.dork)} className="btn-copy">
                      <Copy size={16} /> Copy
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
