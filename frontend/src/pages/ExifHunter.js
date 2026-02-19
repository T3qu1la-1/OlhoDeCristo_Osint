import React, { useState } from 'react';
import { Image as ImageIcon, Upload, FileSearch, Trash2, Download, ExternalLink } from 'lucide-react';
import './ExifHunter.css';

const ExifHunter = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fotoForensicsUrl, setFotoForensicsUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWithFotoForensics = () => {
    if (!imageUrl.trim()) {
      alert('Por favor, insira uma URL de imagem válida');
      return;
    }
    
    setLoading(true);
    
    // FotoForensics aceita URLs diretamente
    const forensicsUrl = `https://fotoforensics.com/analysis.php?id=${encodeURIComponent(imageUrl)}&fmt=ela`;
    setFotoForensicsUrl(forensicsUrl);
    
    // Abrir em nova aba
    window.open(forensicsUrl, '_blank');
    
    setTimeout(() => setLoading(false), 1000);
  };

  const analyzeUploadedImage = async () => {
    if (!imageFile) {
      alert('Por favor, faça upload de uma imagem primeiro');
      return;
    }

    setLoading(true);
    
    // Para imagens locais, precisamos upload para algum servidor público
    // Ou usar a URL da imagem se estiver hospedada
    alert('📌 Para análise completa, hospede sua imagem online e use a opção "Analisar por URL".\n\nOu abra https://fotoforensics.com e faça upload manualmente.');
    
    setLoading(false);
  };

  const clear = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageUrl('');
    setFotoForensicsUrl('');
  };

  return (
    <div className="exif-hunter">
      <header className="page-header">
        <h1>
          <ImageIcon size={32} />
          EXIF HUNTER
        </h1>
        <p>Extrator de Metadados de Imagens - Descubra informações ocultas</p>
      </header>

      <div className="upload-section">
        <div className="upload-card">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="file-input"
            hidden
          />
          <label htmlFor="file-input" className="upload-area">
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            ) : (
              <div className="upload-placeholder">
                <Upload size={48} />
                <p>Clique ou arraste uma imagem aqui</p>
                <span>Suporta: JPG, PNG, WEBP, GIF</span>
              </div>
            )}
          </label>
          
          {imageFile && (
            <div className="file-actions">
              <button className="btn-analyze" onClick={extractMetadata} disabled={loading}>
                <FileSearch size={20} />
                {loading ? 'ANALISANDO...' : 'EXTRAIR METADADOS'}
              </button>
              <button className="btn-clear" onClick={clear}>
                <Trash2 size={20} /> LIMPAR
              </button>
            </div>
          )}
        </div>
      </div>

      {metadata && (
        <div className="metadata-section">
          <div className="metadata-header">
            <h2>📦 METADADOS EXTRAÍDOS</h2>
            <button className="btn-download" onClick={downloadReport}>
              <Download size={18} /> EXPORTAR
            </button>
          </div>
          
          <div className="metadata-grid">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="metadata-item">
                <div className="metadata-key">{key}</div>
                <div className="metadata-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="info-section">
        <h3>💡 SOBRE METADADOS EXIF</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>📸 O que é EXIF?</h4>
            <p>
              EXIF (Exchangeable Image File Format) é um padrão que especifica formatos 
              para imagens, sons e tags auxiliares usadas por câmeras digitais, smartphones e outros dispositivos.
            </p>
          </div>
          <div className="info-card">
            <h4>📍 Dados de Localização</h4>
            <p>
              Muitas fotos contêm coordenadas GPS que revelam exatamente onde a imagem foi tirada. 
              Isso pode ser útil para OSINT mas também representa riscos de privacidade.
            </p>
          </div>
          <div className="info-card">
            <h4>⚙️ Dados Técnicos</h4>
            <p>
              Informações como modelo da câmera, configurações de exposição, ISO, abertura, 
              e software usado podem ajudar a identificar a origem de uma imagem.
            </p>
          </div>
          <div className="info-card">
            <h4>🔒 Segurança</h4>
            <p>
              Sempre remova metadados sensíveis antes de compartilhar imagens online. 
              Use ferramentas de limpeza de EXIF quando necessário.
            </p>
          </div>
        </div>
      </div>

      <div className="warning-box">
        <div className="warning-icon">⚠️</div>
        <div className="warning-content">
          <h4>NOTA TÉCNICA</h4>
          <p>
            Esta versão demonstra a interface do EXIF Hunter. Para extração completa de metadados EXIF, 
            é necessário integrar bibliotecas especializadas como <code>exif-js</code> ou processamento backend.
          </p>
          <p>
            A extração completa incluiria: coordenadas GPS, fabricante da câmera, configurações de foto, 
            data/hora original, software usado, e muito mais.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExifHunter;
