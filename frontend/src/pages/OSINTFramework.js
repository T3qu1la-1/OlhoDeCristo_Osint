import React, { useState } from 'react';
import { ExternalLink, Search, Compass } from 'lucide-react';
import { osintFramework } from '../utils/osintFramework';
import './OSINTFramework.css';

const OSINTFrameworkPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFramework = osintFramework.filter(category =>
    category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.tools.some(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="osint-framework-page">
      <header className="framework-header">
        <h1>
          <Compass size={36} />
          FRAMEWORK OSINT
        </h1>
        <p>Coleção completa de ferramentas para investigação de fontes abertas</p>
        <div className="stats-banner">
          <div className="stat-item">
            <span className="stat-number">{osintFramework.length}</span>
            <span className="stat-label">Categorias</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{osintFramework.reduce((acc, cat) => acc + cat.tools.length, 0)}+</span>
            <span className="stat-label">Ferramentas</span>
          </div>
        </div>
      </header>

      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Buscar ferramentas ou categorias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="framework-grid">
        {filteredFramework.map((category, idx) => (
          <div key={idx} className="category-card">
            <div className="category-header">
              <h2>{category.category}</h2>
              <span className="tools-count">{category.tools.length} ferramentas</span>
            </div>
            <div className="tools-list">
              {category.tools.map((tool, toolIdx) => (
                <a
                  key={toolIdx}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-item"
                >
                  <div className="tool-info">
                    <h4>{tool.name}</h4>
                    <p>{tool.description}</p>
                  </div>
                  <ExternalLink size={18} className="external-icon" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredFramework.length === 0 && (
        <div className="no-results">
          <Search size={48} />
          <p>Nenhuma ferramenta encontrada</p>
          <span>Tente outro termo de busca</span>
        </div>
      )}

      <div className="info-footer">
        <h3>💡 SOBRE O OSINT FRAMEWORK</h3>
        <p>
          Este framework reúne as principais ferramentas de OSINT (Open Source Intelligence) 
          organizadas por categoria. Todas as ferramentas são de código aberto ou oferecem 
          versões gratuitas para investigação e pesquisa.
        </p>
        <div className="footer-warning">
          ⚠️ Use estas ferramentas de forma ética e legal. Sempre respeite a privacidade e as leis aplicáveis.
        </div>
      </div>
    </div>
  );
};

export default OSINTFrameworkPage;
