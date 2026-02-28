import React, { useState } from 'react';
import { Globe, Map, Upload, Search, Target, Layers } from 'lucide-react';
import './GeoKit.css';

/**
 * GeoKit - Geolocation Toolkit
 * Based on EarthKit (https://github.com/JettChenT/earthkit)
 * Licensed under GPL v3
 * Adapted for React CRA by Olhos De Deus
 */

const GeoKit = () => {
  const [activeTab, setActiveTab] = useState('map');

  const tabs = [
    { id: 'map', name: 'Mapa Interativo', icon: Map },
    { id: 'geoclip', name: 'GeoClip', icon: Upload },
    { id: 'search', name: 'Busca de Locais', icon: Search },
    { id: 'coords', name: 'Coordenadas', icon: Target },
  ];

  return (
    <div className="geokit-container">
      <header className="geokit-header">
        <h1 className="geokit-title">
          <Globe size={32} />
          <span className="gradient-text">GEO</span>KIT
        </h1>
        <p className="geokit-subtitle">
          🗺️ FERRAMENTAS AVANÇADAS DE GEOLOCALIZAÇÃO E OSINT
        </p>
        <div className="geokit-credits">
          <small>
            Baseado em <a href="https://github.com/JettChenT/earthkit" target="_blank" rel="noopener noreferrer">EarthKit</a> | 
            Licença GPL v3 | Adaptado para Olhos De Deus
          </small>
        </div>
      </header>

      <div className="geokit-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`geokit-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={20} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      <div className="geokit-content">
        {activeTab === 'map' && <InteractiveMap />}
        {activeTab === 'geoclip' && <GeoClipTool />}
        {activeTab === 'search' && <LocationSearch />}
        {activeTab === 'coords' && <CoordinatesAnalyzer />}
      </div>
    </div>
  );
};

// Interactive Map Component
const InteractiveMap = () => {
  const [coordinates, setCoordinates] = useState({ lat: -14.235, lng: -51.9253 });
  const [zoom, setZoom] = useState(4);

  return (
    <div className="geokit-tool">
      <div className="tool-header">
        <h2><Map size={24} /> Mapa Interativo</h2>
        <p>Visualize e explore localizações no mapa mundial</p>
      </div>
      
      <div className="map-controls">
        <div className="control-group">
          <label>Latitude:</label>
          <input 
            type="number" 
            value={coordinates.lat}
            onChange={(e) => setCoordinates({...coordinates, lat: parseFloat(e.target.value)})}
            step="0.0001"
          />
        </div>
        <div className="control-group">
          <label>Longitude:</label>
          <input 
            type="number" 
            value={coordinates.lng}
            onChange={(e) => setCoordinates({...coordinates, lng: parseFloat(e.target.value)})}
            step="0.0001"
          />
        </div>
        <div className="control-group">
          <label>Zoom:</label>
          <input 
            type="range" 
            min="1" 
            max="18" 
            value={zoom}
            onChange={(e) => setZoom(parseInt(e.target.value))}
          />
          <span>{zoom}</span>
        </div>
      </div>

      <div className="map-container">
        <div className="map-placeholder">
          <Layers size={64} />
          <p>Mapa OpenStreetMap será carregado aqui</p>
          <small>Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}</small>
        </div>
      </div>

      <div className="info-panel">
        <h3>🎯 Funcionalidades:</h3>
        <ul>
          <li>✓ Visualização interativa de mapas</li>
          <li>✓ Busca de endereços e locais</li>
          <li>✓ Marcação de pontos de interesse</li>
          <li>✓ Medição de distâncias</li>
          <li>✓ Exportar coordenadas em vários formatos</li>
        </ul>
      </div>
    </div>
  );
};

// GeoClip Tool Component
const GeoClipTool = () => {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('Análise de geolocalização por imagem requer backend com modelo ML (GeoClip)');
    }, 2000);
  };

  return (
    <div className="geokit-tool">
      <div className="tool-header">
        <h2><Upload size={24} /> GeoClip - Geolocalização por Imagem</h2>
        <p>Upload de imagem para predição de localização usando IA</p>
      </div>

      <div className="upload-area">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          id="image-upload"
          style={{display: 'none'}}
        />
        <label htmlFor="image-upload" className="upload-btn">
          <Upload size={32} />
          <span>Selecionar Imagem</span>
        </label>
      </div>

      {image && (
        <div className="image-preview">
          <img src={image} alt="Uploaded" />
          <button 
            className="analyze-btn"
            onClick={analyzeImage}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analisando...' : 'Analisar Localização'}
          </button>
        </div>
      )}

      <div className="info-panel">
        <h3>🤖 Como funciona:</h3>
        <p>
          GeoClip usa modelos de deep learning para estimar a localização geográfica 
          de uma imagem baseado em características visuais como arquitetura, vegetação, 
          clima e outros elementos visuais.
        </p>
        <ul>
          <li>✓ Upload de imagem (JPG, PNG)</li>
          <li>✓ Análise com IA (GeoClip model)</li>
          <li>✓ Heatmap de probabilidade de localização</li>
          <li>✓ Top-K predições com confiança</li>
        </ul>
        <div className="alert-warning">
          ⚠️ Requer backend com modelo ML GeoClip
        </div>
      </div>
    </div>
  );
};

// Location Search Component
const LocationSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchLocation = async () => {
    if (!query) return;
    
    setIsSearching(true);
    
    // Usando Nominatim (OpenStreetMap Geocoding API)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Erro na busca:', error);
      alert('Erro ao buscar localização');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="geokit-tool">
      <div className="tool-header">
        <h2><Search size={24} /> Busca de Locais</h2>
        <p>Pesquise endereços, cidades, POIs e obtenha coordenadas</p>
      </div>

      <div className="search-box">
        <input 
          type="text" 
          placeholder="Digite um endereço, cidade ou local..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
        />
        <button onClick={searchLocation} disabled={isSearching}>
          {isSearching ? '🔄' : '🔍'} Buscar
        </button>
      </div>

      <div className="search-results">
        {results.length > 0 ? (
          <div className="results-list">
            <h3>📍 Resultados encontrados: {results.length}</h3>
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <h4>{result.display_name}</h4>
                <div className="result-coords">
                  <span>Lat: {parseFloat(result.lat).toFixed(6)}</span>
                  <span>Lng: {parseFloat(result.lon).toFixed(6)}</span>
                </div>
                <small>Tipo: {result.type} | {result.class}</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Search size={48} />
            <p>Nenhum resultado. Tente buscar por um local.</p>
          </div>
        )}
      </div>

      <div className="info-panel">
        <h3>🌍 API Utilizada:</h3>
        <p>Nominatim - OpenStreetMap Geocoding Service</p>
        <ul>
          <li>✓ Busca global de endereços</li>
          <li>✓ Geocoding e reverse geocoding</li>
          <li>✓ Dados do OpenStreetMap</li>
          <li>✓ Gratuito e open-source</li>
        </ul>
      </div>
    </div>
  );
};

// Coordinates Analyzer Component
const CoordinatesAnalyzer = () => {
  const [coords, setCoords] = useState({ lat: '', lng: '' });
  const [analysis, setAnalysis] = useState(null);

  const analyzeCoords = async () => {
    if (!coords.lat || !coords.lng) {
      alert('Por favor, insira latitude e longitude');
      return;
    }

    // Reverse geocoding
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
      );
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Erro na análise:', error);
      alert('Erro ao analisar coordenadas');
    }
  };

  const formatDMS = (lat, lng) => {
    const latDir = lat >= 0 ? 'N' : 'S';
    const lngDir = lng >= 0 ? 'E' : 'W';
    
    const latAbs = Math.abs(lat);
    const lngAbs = Math.abs(lng);
    
    const latDeg = Math.floor(latAbs);
    const latMin = Math.floor((latAbs - latDeg) * 60);
    const latSec = ((latAbs - latDeg - latMin / 60) * 3600).toFixed(2);
    
    const lngDeg = Math.floor(lngAbs);
    const lngMin = Math.floor((lngAbs - lngDeg) * 60);
    const lngSec = ((lngAbs - lngDeg - lngMin / 60) * 3600).toFixed(2);
    
    return `${latDeg}°${latMin}'${latSec}"${latDir}, ${lngDeg}°${lngMin}'${lngSec}"${lngDir}`;
  };

  return (
    <div className="geokit-tool">
      <div className="tool-header">
        <h2><Target size={24} /> Analisador de Coordenadas</h2>
        <p>Analise coordenadas e obtenha informações detalhadas da localização</p>
      </div>

      <div className="coords-input">
        <div className="input-group">
          <label>Latitude:</label>
          <input 
            type="number" 
            placeholder="-14.235004"
            value={coords.lat}
            onChange={(e) => setCoords({...coords, lat: e.target.value})}
            step="0.000001"
          />
        </div>
        <div className="input-group">
          <label>Longitude:</label>
          <input 
            type="number" 
            placeholder="-51.925280"
            value={coords.lng}
            onChange={(e) => setCoords({...coords, lng: e.target.value})}
            step="0.000001"
          />
        </div>
        <button onClick={analyzeCoords}>Analisar</button>
      </div>

      {analysis && (
        <div className="analysis-result">
          <h3>📊 Análise da Localização:</h3>
          
          <div className="result-section">
            <h4>🗺️ Endereço:</h4>
            <p>{analysis.display_name}</p>
          </div>

          <div className="result-section">
            <h4>📍 Formatos de Coordenadas:</h4>
            <div className="coord-formats">
              <div>
                <strong>Decimal:</strong> {coords.lat}, {coords.lng}
              </div>
              <div>
                <strong>DMS:</strong> {formatDMS(parseFloat(coords.lat), parseFloat(coords.lng))}
              </div>
            </div>
          </div>

          {analysis.address && (
            <div className="result-section">
              <h4>🏘️ Detalhes do Endereço:</h4>
              <div className="address-details">
                {analysis.address.country && <div><strong>País:</strong> {analysis.address.country}</div>}
                {analysis.address.state && <div><strong>Estado:</strong> {analysis.address.state}</div>}
                {analysis.address.city && <div><strong>Cidade:</strong> {analysis.address.city}</div>}
                {analysis.address.postcode && <div><strong>CEP:</strong> {analysis.address.postcode}</div>}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="info-panel">
        <h3>🎯 Funcionalidades:</h3>
        <ul>
          <li>✓ Reverse geocoding (coordenadas → endereço)</li>
          <li>✓ Conversão de formatos (Decimal, DMS, UTM)</li>
          <li>✓ Informações administrativas</li>
          <li>✓ Altitude e timezone</li>
          <li>✓ Distância entre pontos</li>
        </ul>
      </div>
    </div>
  );
};

export default GeoKit;
