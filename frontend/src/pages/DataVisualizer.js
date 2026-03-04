import React, { useState } from 'react';
import { TrendingUp, Upload, Download, Info, Zap } from 'lucide-react';
import './ToolPages.css';

const DataVisualizer = () => {
  const [data, setData] = useState('');
  const [vizType, setVizType] = useState('network');
  const [showHelp, setShowHelp] = useState(true);

  const sampleData = {
    network: `{
  "nodes": [
    {"id": "user1", "label": "John Doe", "type": "person"},
    {"id": "user2", "label": "Jane Smith", "type": "person"},
    {"id": "ip1", "label": "192.168.1.1", "type": "ip"},
    {"id": "ip2", "label": "10.0.0.5", "type": "ip"},
    {"id": "domain1", "label": "example.com", "type": "domain"},
    {"id": "email1", "label": "john@example.com", "type": "email"}
  ],
  "edges": [
    {"from": "user1", "to": "ip1", "label": "connected"},
    {"from": "user2", "to": "ip1", "label": "connected"},
    {"from": "ip1", "to": "domain1", "label": "resolved"},
    {"from": "user1", "to": "email1", "label": "owns"}
  ]
}`,
    heatmap: `{
  "locations": [
    {"lat": -23.5505, "lng": -46.6333, "weight": 10, "label": "São Paulo"},
    {"lat": -22.9068, "lng": -43.1729, "weight": 8, "label": "Rio de Janeiro"},
    {"lat": -19.9167, "lng": -43.9345, "weight": 5, "label": "Belo Horizonte"},
    {"lat": -15.7801, "lng": -47.9292, "weight": 7, "label": "Brasília"},
    {"lat": -3.7172, "lng": -38.5433, "weight": 4, "label": "Fortaleza"}
  ]
}`
  };

  const loadSample = () => {
    setData(sampleData[vizType]);
  };

  const visualize = () => {
    alert('🚧 Visualização em desenvolvimento! Use os dados JSON para integrar com D3.js, Chart.js, ou exportar para ferramentas como Gephi, Maltego, etc.');
  };

  return (
    <div className='tool-page'>
      <div className='tool-header'>
        <div className='tool-title'>
          <TrendingUp size={32} />
          <div>
            <h1>DATA VISUALIZER</h1>
            <p>&gt; Prepare dados para visualização de networks e heatmaps</p>
          </div>
        </div>
      </div>

      <div className='tool-content'>
        {/* Info Box */}
        <div className='alert-box' style={{background: 'rgba(0, 255, 65, 0.1)', borderLeftColor: '#00ff41'}}>
          <Info size={18} />
          <span>
            <strong>O QUE FAZ:</strong> Prepara e valida dados JSON para visualização de redes de relacionamento (grafos) 
            e mapas de calor (heatmaps). Útil em investigações OSINT para mapear conexões entre pessoas, IPs, domínios, emails, etc.
          </span>
        </div>

        {/* Tabs */}
        <div className='tabs'>
          <button 
            className={`tab ${vizType === 'network' ? 'active' : ''}`} 
            onClick={() => { setVizType('network'); setData(''); }}
          >
            NETWORK GRAPH
          </button>
          <button 
            className={`tab ${vizType === 'heatmap' ? 'active' : ''}`} 
            onClick={() => { setVizType('heatmap'); setData(''); }}
          >
            HEATMAP
          </button>
        </div>

        {/* Explicação do tipo selecionado */}
        {vizType === 'network' && (
          <div className='output-box' style={{marginBottom: '1rem'}}>
            <h3 style={{color: '#00ff41', marginBottom: '1rem'}}>📊 NETWORK GRAPH (Grafo de Rede)</h3>
            <p style={{color: '#ccc', marginBottom: '1rem'}}>
              Visualiza relacionamentos entre entidades. Ideal para mapear conexões em investigações.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
              <div style={{padding: '1rem', background: 'rgba(0, 0, 0, 0.3)', borderLeft: '3px solid #00ff41'}}>
                <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>🔵 NODES (Nós)</h4>
                <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                  Entidades: pessoas, IPs, domínios, emails, telefones
                </p>
              </div>
              <div style={{padding: '1rem', background: 'rgba(0, 0, 0, 0.3)', borderLeft: '3px solid #00ff41'}}>
                <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>➡️ EDGES (Conexões)</h4>
                <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                  Relacionamentos: amizade, propriedade, comunicação
                </p>
              </div>
              <div style={{padding: '1rem', background: 'rgba(0, 0, 0, 0.3)', borderLeft: '3px solid #00ff41'}}>
                <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>🏷️ LABELS</h4>
                <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                  Identificadores e tipos para cada nó
                </p>
              </div>
            </div>
          </div>
        )}

        {vizType === 'heatmap' && (
          <div className='output-box' style={{marginBottom: '1rem'}}>
            <h3 style={{color: '#00ff41', marginBottom: '1rem'}}>🗺️ HEATMAP (Mapa de Calor)</h3>
            <p style={{color: '#ccc', marginBottom: '1rem'}}>
              Visualiza densidade/intensidade de dados geográficos. Ideal para análise de localizações.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
              <div style={{padding: '1rem', background: 'rgba(0, 0, 0, 0.3)', borderLeft: '3px solid #00ff41'}}>
                <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>📍 LAT/LNG</h4>
                <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                  Coordenadas geográficas (latitude, longitude)
                </p>
              </div>
              <div style={{padding: '1rem', background: 'rgba(0, 0, 0, 0.3)', borderLeft: '3px solid #00ff41'}}>
                <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>⚖️ WEIGHT (Peso)</h4>
                <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                  Intensidade: número de eventos, atividades, etc
                </p>
              </div>
              <div style={{padding: '1rem', background: 'rgba(0, 0, 0, 0.3)', borderLeft: '3px solid #00ff41'}}>
                <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>🏷️ LABEL</h4>
                <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                  Nome da localização (opcional)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Input de dados */}
        <div className='input-group-tool'>
          <label>DATA (JSON FORMAT)</label>
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder={`Cole seu JSON aqui ou clique em "LOAD SAMPLE" para ver exemplo...`}
            style={{minHeight: '300px', fontFamily: 'monospace', fontSize: '0.85rem'}}
          />
        </div>

        {/* Botões */}
        <div className='stats-row'>
          <button className='btn-tool btn-secondary' onClick={loadSample}>
            <Upload size={18} />
            LOAD SAMPLE
          </button>
          <button className='btn-tool' onClick={visualize}>
            <Zap size={18} />
            VALIDATE & PREPARE
          </button>
          <button 
            className='btn-tool btn-secondary' 
            onClick={() => {
              if (data) {
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `data_${vizType}_${Date.now()}.json`;
                a.click();
              }
            }}
            disabled={!data}
          >
            <Download size={18} />
            EXPORT JSON
          </button>
        </div>

        {/* Ferramentas de visualização */}
        <div className='output-box'>
          <h3 style={{color: '#00ff41', marginBottom: '1rem'}}>🛠️ FERRAMENTAS RECOMENDADAS:</h3>
          <div style={{display: 'grid', gap: '1rem'}}>
            {[
              {
                name: 'Gephi',
                url: 'https://gephi.org',
                desc: 'Software livre para análise e visualização de grafos. Ideal para networks complexos.',
                types: ['network']
              },
              {
                name: 'Maltego',
                url: 'https://maltego.com',
                desc: 'Ferramenta profissional de OSINT com visualização de networks. Padrão da indústria.',
                types: ['network']
              },
              {
                name: 'D3.js',
                url: 'https://d3js.org',
                desc: 'Biblioteca JavaScript para visualizações interativas customizadas.',
                types: ['network', 'heatmap']
              },
              {
                name: 'Leaflet + Heatmap.js',
                url: 'https://leafletjs.com',
                desc: 'Biblioteca para mapas interativos com layer de heatmap.',
                types: ['heatmap']
              },
              {
                name: 'Google Maps API',
                url: 'https://developers.google.com/maps',
                desc: 'API do Google Maps com suporte a heatmap layers.',
                types: ['heatmap']
              },
              {
                name: 'Cytoscape.js',
                url: 'https://js.cytoscape.org',
                desc: 'Biblioteca JavaScript para análise e visualização de grafos complexos.',
                types: ['network']
              }
            ].filter(tool => tool.types.includes(vizType)).map((tool, index) => (
              <div key={index} style={{
                padding: '1rem',
                background: 'rgba(0, 255, 65, 0.05)',
                border: '1px solid #333',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{color: '#00ff41', marginBottom: '0.25rem'}}>{tool.name}</h4>
                  <p style={{color: '#ccc', fontSize: '0.85rem'}}>{tool.desc}</p>
                </div>
                <a 
                  href={tool.url} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='btn-tool btn-secondary'
                  style={{padding: '0.5rem 1rem', fontSize: '0.75rem'}}
                >
                  ACESSAR
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Casos de uso */}
        <div className='alert-box'>
          <TrendingUp size={18} />
          <span>
            <strong>CASOS DE USO:</strong> Mapear redes sociais de suspeitos, visualizar fluxo de comunicação, 
            identificar hubs centrais em redes, analisar padrões geográficos de atividades, 
            rastrear propagação de informações, conectar múltiplas fontes de dados OSINT.
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizer;
