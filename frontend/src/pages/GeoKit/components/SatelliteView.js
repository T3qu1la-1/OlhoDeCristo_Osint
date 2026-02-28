import React, { useState } from 'react';
import { Satellite, Zap, AlertTriangle } from 'lucide-react';

const SatelliteView = () => {
  const [mode, setMode] = useState('info');

  return (
    <div className="satellite-view-tool">
      <div className="tool-header-section">
        <h2><Satellite size={24} /> VisÃ£o SatÃ©lite & Street View</h2>
        <p>ComparaÃ§Ã£o de imagens satellite e street view para geolocalizaÃ§Ã£o</p>
      </div>

      <div className="satellite-content">
        <div className="feature-showcase">
          <div className="showcase-icon">
            <Satellite size={128} />
          </div>
          <h3>VisÃ£o SatÃ©lite AvanÃ§ada</h3>
          <p>Recurso baseado em EigenPlaces para street view e Sample4Geo para satÃ©lite</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <Satellite size={48} />
            <h4>GeolocalizaÃ§Ã£o por SatÃ©lite</h4>
            <p>Usa Sample4Geo para comparaÃ§Ã£o cross-view entre imagens de satÃ©lite e ground level</p>
          </div>
          
          <div className="feature-card">
            <Zap size={48} />
            <h4>Visual Place Recognition</h4>
            <p>EigenPlaces para matching de street view com alta precisÃ£o</p>
          </div>
          
          <div className="feature-card">
            <AlertTriangle size={48} />
            <h4>Status: Experimental</h4>
            <p>Requer backend Modal com modelos ML prÃ©-carregados</p>
          </div>
        </div>

        <div className="requirements-box">
          <h3>âï¸ Requisitos TÃ©cnicos:</h3>
          <ul>
            <li>ð´ Backend Modal com GPU</li>
            <li>ð´ Modelo Sample4Geo (cross-view)</li>
            <li>ð´ Modelo EigenPlaces (street view)</li>
            <li>ð´ Base de imagens satÃ©lite e street view</li>
            <li>ð´ Tempo de cold-boot: ~2-3 minutos</li>
          </ul>

          <div className="warning-banner">
            <AlertTriangle size={24} />
            <div>
              <strong>Funcionalidade Experimental</strong>
              <p>
                Esta feature requer infraestrutura complexa do backend EarthKit original.
                Para implementaÃ§Ã£o completa, seria necessÃ¡rio:
              </p>
              <ol>
                <li>Configurar Modal.com com GPUs</li>
                <li>Deploy dos modelos ML (Sample4Geo, EigenPlaces)</li>
                <li>Base de dados de imagens satÃ©lite e street view</li>
                <li>API endpoints para matching de imagens</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>ð¯ Como Funcionaria:</h3>
          <div className="workflow">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Upload da Imagem Alvo</h4>
                <p>UsuÃ¡rio envia foto do local desconhecido</p>
              </div>
            </div>
            <div className="workflow-arrow">â</div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>ExtraÃ§Ã£o de Features</h4>
                <p>Modelo extrai embeddings visuais da imagem</p>
              </div>
            </div>
            <div className="workflow-arrow">â</div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>ComparaÃ§Ã£o com Base</h4>
                <p>Match com milhÃµes de imagens satÃ©lite/street view</p>
              </div>
            </div>
            <div className="workflow-arrow">â</div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Ranking de Similaridade</h4>
                <p>Top-K localizaÃ§Ãµes mais provÃ¡veis com score</p>
              </div>
            </div>
          </div>
        </div>

        <div className="models-info">
          <h3>ð¤ Modelos Utilizados:</h3>
          <div className="model-cards">
            <div className="model-card">
              <h4>EigenPlaces</h4>
              <p>Visual Place Recognition para ground-level</p>
              <a href="https://github.com/gmberton/EigenPlaces" target="_blank" rel="noopener noreferrer">
                Ver no GitHub â
              </a>
            </div>
            <div className="model-card">
              <h4>Sample4Geo</h4>
              <p>Cross-view geolocation (satÃ©lite â ground)</p>
              <a href="https://github.com/Skyy93/Sample4Geo" target="_blank" rel="noopener noreferrer">
                Ver no GitHub â
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteView;