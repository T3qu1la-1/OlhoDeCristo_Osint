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

      <div className="analysis-methods">
        <div className="method-card">
          <h3>📤 MÉTODO 1: Analisar por URL</h3>
          <p>Insira a URL de uma imagem pública para análise completa com FotoForensics</p>
          <div className="url-input-group">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="url-input"
            />
            <button 
              className="btn-analyze" 
              onClick={analyzeWithFotoForensics}
              disabled={loading || !imageUrl.trim()}
            >
              <FileSearch size={20} />
              {loading ? 'ANALISANDO...' : 'ANALISAR COM FOTOFORENSICS'}
            </button>
          </div>
          {fotoForensicsUrl && (
            <a 
              href={fotoForensicsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="forensics-link"
            >
              <ExternalLink size={16} />
              Ver análise completa no FotoForensics
            </a>
          )}
        </div>

        <div className="method-divider">OU</div>

        <div className="method-card">
          <h3>📁 MÉTODO 2: Upload de Arquivo</h3>
          <p>Faça upload de uma imagem do seu dispositivo</p>
          <div className="upload-section-inline">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="file-input"
              hidden
            />
            <label htmlFor="file-input" className="upload-btn">
              <Upload size={20} />
              {imageFile ? imageFile.name : 'SELECIONAR IMAGEM'}
            </label>
            {imageFile && (
              <button className="btn-analyze-upload" onClick={analyzeUploadedImage}>
                <FileSearch size={20} />
                ANALISAR
              </button>
            )}
          </div>
          {imagePreview && (
            <div className="preview-inline">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>
      </div>

      {(imageFile || imageUrl) && (
        <button className="btn-clear-all" onClick={clear}>
          <Trash2 size={20} /> LIMPAR TUDO
        </button>
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
