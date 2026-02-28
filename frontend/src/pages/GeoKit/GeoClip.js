import React, { useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { Upload, Loader2, X, Download, Zap, Info, Image as ImageIcon } from 'lucide-react';
import './GeoClip.css';

const INITIAL_CENTER = [0, 20];
const INITIAL_ZOOM = 2;

// Heatmap component
const GeoClipHeatmap = ({ predictions }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!predictions || predictions.length === 0) return;

    const heatData = predictions.map(p => [p.lat, p.lon, p.confidence]);
    const heat = L.heatLayer(heatData, {
      radius: 30,
      blur: 20,
      maxZoom: 10,
      gradient: {
        0.0: '#00ff00',
        0.3: '#00ffff',
        0.6: '#ffff00',
        1.0: '#ff0000'
      }
    }).addTo(map);

    // Fit bounds to predictions
    const bounds = L.latLngBounds(predictions.map(p => [p.lat, p.lon]));
    map.fitBounds(bounds, { padding: [50, 50], duration: 2 });

    return () => {
      map.removeLayer(heat);
    };
  }, [predictions, map]);

  return null;
};

const GeoClip = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const mapRef = useRef();

  // Handle image upload
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPredictions(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle drag & drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPredictions(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Remove image
  const removeImage = useCallback(() => {
    setImage(null);
    setImageFile(null);
    setPredictions(null);
  }, []);

  // Simulate GeoClip analysis
  const analyzeImage = useCallback(async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock predictions around random location
    const baseLat = (Math.random() - 0.5) * 150;
    const baseLon = (Math.random() - 0.5) * 300;
    
    const mockPredictions = [];
    for (let i = 0; i < 100; i++) {
      const distance = Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      
      mockPredictions.push({
        lat: baseLat + Math.cos(angle) * distance,
        lon: baseLon + Math.sin(angle) * distance,
        confidence: Math.random(),
        rank: i + 1
      });
    }
    
    mockPredictions.sort((a, b) => b.confidence - a.confidence);
    setPredictions(mockPredictions);
    setIsAnalyzing(false);
  }, [image]);

  // Export results
  const exportResults = useCallback(() => {
    if (!predictions) return;
    
    const data = {
      image: imageFile?.name || 'unknown',
      timestamp: new Date().toISOString(),
      predictions: predictions.slice(0, 10).map(p => ({
        rank: p.rank,
        latitude: p.lat,
        longitude: p.lon,
        confidence: (p.confidence * 100).toFixed(2) + '%'
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `geoclip-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [predictions, imageFile]);

  // Fly to prediction
  const flyToPrediction = useCallback((pred) => {
    setSelectedPrediction(pred);
    if (mapRef.current) {
      mapRef.current.flyTo([pred.lat, pred.lon], 8, { duration: 1 });
    }
  }, []);

  return (
    <div className="geoclip-container">
      {/* Header */}
      <header className="geoclip-header">
        <div className="header-content">
          <div className="title-group">
            <Zap className="title-icon" size={48} />
            <h1 className="geoclip-title">
              <span className="text-gradient">GEO</span>CLIP
            </h1>
          </div>
          <p className="geoclip-subtitle">
            🎯 GEOLOCALIZAÇÃO POR IMAGEM - FERRAMENTA OSINT PROFISSIONAL
          </p>
          <div className="credits">
            <small>
              Baseado em <a href="https://github.com/JettChenT/earthkit" target="_blank" rel="noopener noreferrer">EarthKit</a> | 
              GPL v3 | Olhos De Deus
            </small>
          </div>
        </div>
        <button className="info-btn" onClick={() => setShowInfo(!showInfo)}>
          <Info size={20} /> {showInfo ? 'Ocultar Info' : 'Como Usar'}
        </button>
      </header>

      {/* Info Panel */}
      {showInfo && (
        <div className="info-panel">
          <h3>🤖 Como Funciona:</h3>
          <div className="info-steps">
            <div className="step">
              <div className="step-num">1</div>
              <div>
                <h4>Upload da Foto</h4>
                <p>Arraste ou selecione qualquer foto (paisagem, cidade, monumento, etc)</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div>
                <h4>Análise com IA</h4>
                <p>GeoClip analisa características visuais (arquitetura, vegetação, clima, landmarks)</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div>
                <h4>Predições</h4>
                <p>Recebe top 10 localizações mais prováveis com % de confiança</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <div>
                <h4>Heatmap Visual</h4>
                <p>Visualize probabilidades no mapa com gradiente de cores</p>
              </div>
            </div>
          </div>
          <div className="warning">
            ⚠️ <strong>Demo Mode:</strong> Esta versão usa simulação. Para análise real com modelo GeoClip, 
            é necessário backend com GPU e modelo ML treinado.
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="geoclip-main">
        {/* Left Panel - Upload & Results */}
        <div className="left-panel">
          {!image ? (
            <div 
              className="upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                id="image-upload"
                style={{display: 'none'}}
              />
              <label htmlFor="image-upload" className="upload-box">
                <ImageIcon size={64} className="upload-icon" />
                <h3>Upload de Imagem</h3>
                <p>Arraste aqui ou clique para selecionar</p>
                <div className="supported-formats">
                  <span>JPG</span>
                  <span>PNG</span>
                  <span>WebP</span>
                  <span>HEIC</span>
                </div>
                <small>Máximo 10MB</small>
              </label>
            </div>
          ) : (
            <>
              <div className="image-section">
                <div className="image-header">
                  <h3>📷 Imagem Carregada</h3>
                  <button className="remove-btn" onClick={removeImage} title="Remover">
                    <X size={18} />
                  </button>
                </div>
                
                <div className="image-preview">
                  <img src={image} alt="Upload" />
                </div>

                {imageFile && (
                  <div className="image-info">
                    <div className="info-item">
                      <strong>Nome:</strong> {imageFile.name}
                    </div>
                    <div className="info-item">
                      <strong>Tamanho:</strong> {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                )}

                <button 
                  className={`analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="spin" size={20} />
                      Analisando com IA...
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      Analisar Localização
                    </>
                  )}
                </button>
              </div>

              {predictions && (
                <div className="predictions-section">
                  <div className="predictions-header">
                    <h3>🎯 Top 10 Predições</h3>
                    <button className="export-btn" onClick={exportResults} title="Exportar JSON">
                      <Download size={16} /> Exportar
                    </button>
                  </div>
                  
                  <div className="predictions-list">
                    {predictions.slice(0, 10).map(pred => (
                      <div 
                        key={pred.rank}
                        className={`prediction-item ${selectedPrediction?.rank === pred.rank ? 'selected' : ''}`}
                        onClick={() => flyToPrediction(pred)}
                      >
                        <div className="pred-rank">#{pred.rank}</div>
                        <div className="pred-details">
                          <div className="pred-coords">
                            {pred.lat.toFixed(4)}, {pred.lon.toFixed(4)}
                          </div>
                          <div className="pred-confidence-text">
                            Confiança: {(pred.confidence * 100).toFixed(1)}%
                          </div>
                          <div className="confidence-bar">
                            <div 
                              className="confidence-fill" 
                              style={{width: `${pred.confidence * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Panel - Map */}
        <div className="map-panel">
          <MapContainer
            center={INITIAL_CENTER}
            zoom={INITIAL_ZOOM}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap'
            />
            
            {predictions && <GeoClipHeatmap predictions={predictions} />}
          </MapContainer>

          {!predictions && (
            <div className="map-placeholder">
              <Zap size={80} className="placeholder-icon" />
              <h3>Aguardando Análise</h3>
              <p>Faça upload de uma imagem e clique em "Analisar Localização"</p>
              <div className="placeholder-features">
                <span>✓ Heatmap interativo</span>
                <span>✓ Top 10 localizações</span>
                <span>✓ Análise com IA</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeoClip;