import React, { useState } from 'react';
import { Target, Upload, ExternalLink, BookOpen, Search } from 'lucide-react';
import './ToolPages.css';

const ReverseImageSearch = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);

  const searchEngines = [
    {
      name: 'Google Images',
      url: 'https://images.google.com/searchbyimage',
      desc: 'O mais popular. Upload de imagem ou cole URL',
      icon: '🔍',
      tutorial: [
        '1. Acesse images.google.com',
        '2. Clique no ícone da câmera na barra de busca',
        '3. Cole a URL da imagem ou faça upload',
        '4. Clique em "Pesquisar por imagem"'
      ]
    },
    {
      name: 'Yandex Images',
      url: 'https://yandex.com/images',
      desc: 'Excelente para imagens da Europa e Ásia',
      icon: '🌍',
      tutorial: [
        '1. Acesse yandex.com/images',
        '2. Clique no ícone da câmera',
        '3. Upload ou cole URL da imagem',
        '4. Veja resultados similares'
      ]
    },
    {
      name: 'TinEye',
      url: 'https://tineye.com',
      desc: 'Busca especializada, mostra onde a imagem foi usada',
      icon: '👁️',
      tutorial: [
        '1. Acesse tineye.com',
        '2. Upload da imagem ou cole URL',
        '3. Veja todas as páginas que usaram a imagem',
        '4. Filtre por data, tamanho, etc'
      ]
    },
    {
      name: 'Bing Visual Search',
      url: 'https://www.bing.com/visualsearch',
      desc: 'Busca visual da Microsoft',
      icon: '🔎',
      tutorial: [
        '1. Acesse bing.com/images',
        '2. Clique no ícone da câmera',
        '3. Upload ou URL da imagem',
        '4. Explore resultados visuais'
      ]
    },
    {
      name: 'Social Catfish',
      url: 'https://socialcatfish.com/reverse-image-search',
      desc: 'Especializado em perfis de redes sociais',
      icon: '🐱',
      tutorial: [
        '1. Acesse socialcatfish.com',
        '2. Upload da foto de perfil',
        '3. Busca em redes sociais',
        '4. Identifica perfis falsos'
      ]
    },
    {
      name: 'Berify',
      url: 'https://berify.com',
      desc: 'Proteção de direitos autorais de imagens',
      icon: '🛡️',
      tutorial: [
        '1. Upload de múltiplas imagens',
        '2. Busca em toda internet',
        '3. Monitora uso não autorizado',
        '4. Relatórios detalhados'
      ]
    }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
    }
  };

  return (
    <div className='tool-page'>
      <div className='tool-header'>
        <div className='tool-title'>
          <Target size={32} />
          <div>
            <h1>REVERSE IMAGE SEARCH GUIDE</h1>
            <p>&gt; Tutorial completo para busca reversa de imagens</p>
          </div>
        </div>
      </div>

      <div className='tool-content'>
        <div className='alert-box' style={{background: 'rgba(0, 255, 65, 0.1)', borderLeftColor: '#00ff41', marginBottom: '2rem'}}>
          <BookOpen size={18} />
          <span>
            <strong>COMO FUNCIONA:</strong> Busca reversa permite encontrar onde uma imagem foi usada na internet, 
            descobrir a origem de fotos, identificar pessoas, verificar plágio e validar informações em investigações OSINT.
          </span>
        </div>

        {/* Preview da imagem */}
        <div className='grid-2' style={{marginBottom: '2rem'}}>
          <div className='input-group-tool'>
            <label>COLE URL DA IMAGEM</label>
            <input
              type='text'
              placeholder='https://example.com/image.jpg'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className='input-group-tool'>
            <label>OU FAÇA UPLOAD</label>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              style={{padding: '0.5rem'}}
            />
          </div>
        </div>

        {imageUrl && (
          <div className='output-box' style={{textAlign: 'center', marginBottom: '2rem'}}>
            <h3 style={{marginBottom: '1rem', color: '#00ff41'}}>SUA IMAGEM:</h3>
            <img 
              src={imageUrl} 
              alt='Target' 
              style={{maxWidth: '100%', maxHeight: '300px', border: '2px solid #00ff41'}} 
              onError={(e) => e.target.style.display = 'none'} 
            />
            <p style={{marginTop: '1rem', color: '#888'}}>
              Use esta imagem nos motores de busca abaixo
            </p>
          </div>
        )}

        {/* Motores de busca */}
        <div className='output-box'>
          <h3 style={{marginBottom: '1.5rem', color: '#00ff41', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Search size={24} />
            MOTORES DE BUSCA REVERSA:
          </h3>

          <div style={{display: 'grid', gap: '1.5rem'}}>
            {searchEngines.map((engine, index) => (
              <div key={index} style={{
                padding: '1.5rem',
                background: 'rgba(0, 255, 65, 0.05)',
                border: '2px solid #333',
                borderRadius: '8px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00ff41'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
              >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span style={{fontSize: '2rem'}}>{engine.icon}</span>
                    <div>
                      <h4 style={{color: '#00ff41', marginBottom: '0.25rem', fontSize: '1.1rem'}}>
                        {engine.name}
                      </h4>
                      <p style={{color: '#888', fontSize: '0.85rem'}}>{engine.desc}</p>
                    </div>
                  </div>
                  <a 
                    href={engine.url} 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='btn-tool'
                    style={{padding: '0.75rem 1.5rem'}}
                  >
                    ABRIR <ExternalLink size={16} />
                  </a>
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '4px',
                  borderLeft: '3px solid #00ff41'
                }}>
                  <h5 style={{color: '#00ff41', marginBottom: '0.5rem', fontSize: '0.9rem'}}>
                    📝 TUTORIAL:
                  </h5>
                  {engine.tutorial.map((step, idx) => (
                    <p key={idx} style={{
                      color: '#ccc',
                      fontSize: '0.85rem',
                      marginBottom: '0.25rem',
                      paddingLeft: '1rem'
                    }}>
                      {step}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas profissionais */}
        <div className='output-box' style={{marginTop: '2rem'}}>
          <h3 style={{marginBottom: '1rem', color: '#00ff41'}}>🎯 DICAS PROFISSIONAIS:</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
            <div style={{padding: '1rem', background: 'rgba(0, 255, 65, 0.05)', borderLeft: '3px solid #00ff41'}}>
              <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>✂️ Crop Estratégico</h4>
              <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                Recorte apenas o rosto ou elemento principal para resultados mais precisos
              </p>
            </div>
            <div style={{padding: '1rem', background: 'rgba(0, 255, 65, 0.05)', borderLeft: '3px solid #00ff41'}}>
              <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>🔄 Use Múltiplos Motores</h4>
              <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                Cada motor tem índice diferente. Teste em pelo menos 3 para cobertura completa
              </p>
            </div>
            <div style={{padding: '1rem', background: 'rgba(0, 255, 65, 0.05)', borderLeft: '3px solid #00ff41'}}>
              <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>📅 Busca por Data</h4>
              <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                Use filtros de data para encontrar a primeira aparição da imagem
              </p>
            </div>
            <div style={{padding: '1rem', background: 'rgba(0, 255, 65, 0.05)', borderLeft: '3px solid #00ff41'}}>
              <h4 style={{color: '#00ff41', marginBottom: '0.5rem'}}>🎨 Edição Reversa</h4>
              <p style={{color: '#ccc', fontSize: '0.85rem'}}>
                Se a imagem estiver editada, tente remover filtros/marcas d'água antes
              </p>
            </div>
          </div>
        </div>

        {/* Casos de uso */}
        <div className='alert-box' style={{marginTop: '2rem'}}>
          <Target size={18} />
          <span>
            <strong>CASOS DE USO OSINT:</strong> Verificar identidade em redes sociais, 
            rastrear origem de fake news, identificar localizações em fotos, 
            encontrar perfis duplicados/falsos, validar credenciais de pessoas, 
            investigar plágio de conteúdo visual.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReverseImageSearch;
