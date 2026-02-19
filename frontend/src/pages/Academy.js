import React, { useState } from 'react';
import { BookOpen, Shield, Search, Lock, Lightbulb } from 'lucide-react';
import './Academy.css';

const Academy = () => {
  const [selectedTopic, setSelectedTopic] = useState('osint');

  const topics = {
    osint: {
      title: '🎓 O que é OSINT?',
      icon: <Search size={32} />,
      content: (
        <div>
          <h2>OSINT - Open Source Intelligence</h2>
          <p className="intro">OSINT (Inteligência de Fontes Abertas) é a coleta e análise de informações disponíveis publicamente para produzir inteligência acionável.</p>
          
          <h3>📚 Definição</h3>
          <p>OSINT envolve coletar dados de fontes públicas como:</p>
          <ul>
            <li>Sites e redes sociais</li>
            <li>Registros públicos e documentos governamentais</li>
            <li>Notícias e publicações</li>
            <li>Fóruns e comunidades online</li>
            <li>Dados técnicos (WHOIS, DNS, certificados SSL)</li>
          </ul>

          <h3>🎯 Aplicações</h3>
          <div className="application-grid">
            <div className="app-card">
              <h4>🛡️ Segurança Cibernética</h4>
              <p>Identificar vulnerabilidades, monitorar ameaças, análise de superficie de ataque</p>
            </div>
            <div className="app-card">
              <h4>🔍 Investigações</h4>
              <p>Due diligence, investigações corporativas, verificação de antecedentes</p>
            </div>
            <div className="app-card">
              <h4>📰 Jornalismo</h4>
              <p>Verificação de fatos, pesquisa investigativa, análise de dados</p>
            </div>
            <div className="app-card">
              <h4>💼 Inteligência Competitiva</h4>
              <p>Monitoramento de concorrentes, análise de mercado, tendências</p>
            </div>
          </div>

          <h3>⚖️ Aspectos Legais</h3>
          <div className="warning-box">
            <p><strong>IMPORTANTE:</strong> OSINT deve ser realizado dentro dos limites legais. Sempre:</p>
            <ul>
              <li>✓ Use apenas informações publicamente disponíveis</li>
              <li>✓ Respeite termos de serviço dos sites</li>
              <li>✓ Não acesse sistemas sem autorização</li>
              <li>✓ Respeite leis de privacidade e proteção de dados</li>
            </ul>
          </div>

          <h3>🔧 Ferramentas Principais</h3>
          <ul>
            <li><strong>Google Dorks:</strong> Buscas avançadas no Google</li>
            <li><strong>Shodan:</strong> Motor de busca para dispositivos IoT</li>
            <li><strong>Maltego:</strong> Link analysis e visualização</li>
            <li><strong>theHarvester:</strong> Coleta de emails e subdomínios</li>
            <li><strong>Recon-ng:</strong> Framework de reconhecimento</li>
          </ul>
        </div>
      )
    },
    top10: {
      title: '🏆 Top 10 Dorks',
      icon: <Lightbulb size={32} />,
      content: (
        <div>
          <h2>Top 10 Google Dorks Essenciais</h2>
          <p className="intro">Os dorks mais poderosos e úteis para reconhecimento e pesquisa.</p>

          <div className="dork-list">
            <div className="dork-item-academy">
              <div className="rank">1</div>
              <div className="dork-content">
                <h4>site: - Busca em domínio específico</h4>
                <code>site:exemplo.com login</code>
                <p>Busca apenas no domínio especificado. Essencial para enumerar páginas e recursos.</p>
              </div>
            </div>

            <div className="dork-item-academy">
              <div className="rank">2</div>
              <div className="dork-content">
                <h4>filetype: - Busca por tipo de arquivo</h4>
                <code>filetype:pdf confidencial</code>
                <p>Encontra documentos específicos. Útil para localizar PDFs, planilhas, apresentações.</p>
              </div>
            </div>

            <div className="dork-item-academy">
              <div className="rank">3</div>
              <div className="dork-content">
                <h4>inurl: - Palavra na URL</h4>
                <code>inurl:admin inurl:login</code>
                <p>Busca palavras específicas na URL. Ótimo para encontrar painéis admin.</p>
              </div>
            </div>

            <div className="dork-item-academy">
              <div className="rank">4</div>
              <div className="dork-content">
                <h4>intitle: - Palavra no título</h4>
                <code>intitle:"index of" password</code>
                <p>Busca no título da página. Perfeito para diretórios abertos.</p>
              </div>
            </div>

            <div className="dork-item-academy">
              <div className="rank">5</div>
              <div className="dork-content">
                <h4>intext: - Palavra no conteúdo</h4>
                <code>intext:"api_key" OR intext:"secret"</code>
                <p>Busca no texto da página. Útil para encontrar credenciais expostas.</p>
              </div>
            </div>

            <div className="dork-item-academy">
              <div className="rank">6</div>
              <div className="dork-content">
                <h4>cache: - Versão em cache</h4>
                <code>cache:exemplo.com</code>
                <p>Mostra versão em cache do Google. Útil para ver conteúdo removido.</p>
              </div>
            </div>

            <div className="dork-item-academy">
              <div className="rank">7</div>
              <div className="dork-content">
                <h4>related: - Sites relacionados</h4>
                <code>related:exemplo.com</code>
                <p>Encontra sites similares. Ótimo para descobrir concorrentes.</p>
              </div>
            </div>

            <div className="dork-item-academy">
              <div className="rank">8</div>
              <div className="dork-content">
                <h4>Operador - (exclusão)</h4>
                <code>site:exemplo.com -www</code>
                <p>Exclui resultados. Útil para filtrar subdomínios ou termos indesejados.</p>
              </div>
            </div>

            <div className="dork-item-academy">
              <div className="rank">9</div>
              <div className="dork-content">
                <h4>Operador * (wildcard)</h4>
                <code>site:*.exemplo.com</code>
                <p>Coringa para qualquer texto. Perfeito para enumerar subdomínios.</p>
              </div>
            </div>

            <div className="dork-item-academy">
              <div className="rank">10</div>
              <div className="dork-content">
                <h4>Combinação Avançada</h4>
                <code>site:exemplo.com (inurl:admin OR inurl:login) -inurl:css -inurl:js</code>
                <p>Combina múltiplos operadores para buscas cirúrgicas.</p>
              </div>
            </div>
          </div>

          <div className="tip-box">
            <h4>💡 Dica Pro</h4>
            <p>Combine operadores para resultados mais precisos. Use aspas para frases exatas e parênteses para agrupar condições OR.</p>
          </div>
        </div>
      )
    },
    defensive: {
      title: '🛡️ Dorking Defensivo',
      icon: <Shield size={32} />,
      content: (
        <div>
          <h2>Google Dorking Defensivo</h2>
          <p className="intro">Use Google Dorks para proteger sua organização identificando exposições antes dos atacantes.</p>

          <h3>🔍 O que é Dorking Defensivo?</h3>
          <p>É o uso de Google Dorks para encontrar vulnerabilidades e exposições em seus próprios sistemas ANTES que hackers maliciosos as encontrem.</p>

          <h3>🎯 Principais Verificações</h3>

          <div className="check-category">
            <h4>1. Documentos Sensíveis Expostos</h4>
            <code>site:seudominio.com filetype:pdf confidencial</code>
            <code>site:seudominio.com filetype:xlsx senha</code>
            <p>Busque por PDFs, planilhas e documentos que não deveriam estar públicos.</p>
          </div>

          <div className="check-category">
            <h4>2. Painéis Admin Expostos</h4>
            <code>site:seudominio.com inurl:admin</code>
            <code>site:seudominio.com intitle:"Dashboard"</code>
            <p>Verifique se painéis administrativos estão indexados publicamente.</p>
          </div>

          <div className="check-category">
            <h4>3. Credenciais e Chaves API</h4>
            <code>site:seudominio.com intext:"api_key"</code>
            <code>site:seudominio.com intext:"password" filetype:txt</code>
            <p>Procure por credenciais acidentalmente commitadas ou expostas.</p>
          </div>

          <div className="check-category">
            <h4>4. Diretórios Abertos</h4>
            <code>site:seudominio.com intitle:"index of"</code>
            <code>site:seudominio.com intitle:"directory listing"</code>
            <p>Identifique diretórios sem proteção de listagem.</p>
          </div>

          <div className="check-category">
            <h4>5. Subdomínios e Ambientes de Dev</h4>
            <code>site:*.seudominio.com</code>
            <code>site:dev.seudominio.com OR site:staging.seudominio.com</code>
            <p>Enumere todos os subdomínios e verifique ambientes de desenvolvimento.</p>
          </div>

          <div className="check-category">
            <h4>6. Arquivos de Configuração</h4>
            <code>site:seudominio.com ext:xml OR ext:conf OR ext:cnf OR ext:env</code>
            <code>site:seudominio.com inurl:"config"</code>
            <p>Localize arquivos de configuração expostos.</p>
          </div>

          <h3>✅ Checklist de Segurança</h3>
          <div className="checklist">
            <label><input type="checkbox" /> Revisar todos os documentos públicos</label>
            <label><input type="checkbox" /> Proteger painéis administrativos com autenticação</label>
            <label><input type="checkbox" /> Usar robots.txt e meta tags noindex</label>
            <label><input type="checkbox" /> Remover ambientes de dev/staging do público</label>
            <label><input type="checkbox" /> Implementar rate limiting</label>
            <label><input type="checkbox" /> Monitorar índice do Google regularmente</label>
            <label><input type="checkbox" /> Usar Google Search Console para remover URLs</label>
            <label><input type="checkbox" /> Auditar código para credenciais hardcoded</label>
          </div>

          <h3>🚨 Remediação Imediata</h3>
          <ol>
            <li><strong>Remova o conteúdo:</strong> Delete ou mova arquivos sensíveis</li>
            <li><strong>Use robots.txt:</strong> Bloqueie crawlers de indexar paths sensíveis</li>
            <li><strong>Google Search Console:</strong> Solicite remoção de URLs indexadas</li>
            <li><strong>Autenticação:</strong> Adicione proteção em áreas administrativas</li>
            <li><strong>Monitore:</strong> Configure alertas para novas exposições</li>
          </ol>

          <div className="warning-box">
            <p><strong>⚠️ IMPORTANTE:</strong> Execute essas verificações regularmente (mensal ou trimestral) como parte de sua postura de segurança.</p>
          </div>
        </div>
      )
    },
    glossary: {
      title: '📖 Glossário OSINT',
      icon: <BookOpen size={32} />,
      content: (
        <div>
          <h2>Glossário de Termos OSINT</h2>
          <p className="intro">Dicionário completo de termos e conceitos usados em OSINT e Google Dorking.</p>

          <div className="glossary-grid">
            <div className="term">
              <h4>API (Application Programming Interface)</h4>
              <p>Interface que permite comunicação entre aplicações. Frequentemente alvo de reconhecimento.</p>
            </div>

            <div className="term">
              <h4>Attack Surface</h4>
              <p>Conjunto de todos os pontos onde um atacante pode tentar entrar ou extrair dados de um sistema.</p>
            </div>

            <div className="term">
              <h4>Cache</h4>
              <p>Cópia armazenada de uma página web. Google mantém cache que pode revelar conteúdo deletado.</p>
            </div>

            <div className="term">
              <h4>CORS (Cross-Origin Resource Sharing)</h4>
              <p>Mecanismo de segurança do navegador. Misconfigurations podem permitir acesso indevido.</p>
            </div>

            <div className="term">
              <h4>Crawler</h4>
              <p>Bot que navega e indexa páginas web automaticamente. Google usa crawlers para indexar a internet.</p>
            </div>

            <div className="term">
              <h4>CVE (Common Vulnerabilities and Exposures)</h4>
              <p>Sistema de referência para vulnerabilidades de segurança conhecidas publicamente.</p>
            </div>

            <div className="term">
              <h4>DNS (Domain Name System)</h4>
              <p>Sistema que traduz nomes de domínio em endereços IP. Registro DNS revela infraestrutura.</p>
            </div>

            <div className="term">
              <h4>Dork</h4>
              <p>Query de busca avançada usando operadores especiais para encontrar informações específicas.</p>
            </div>

            <div className="term">
              <h4>Enumeration</h4>
              <p>Processo de coletar sistematicamente informações sobre um alvo (subdomínios, portas, serviços).</p>
            </div>

            <div className="term">
              <h4>EXIF (Exchangeable Image File Format)</h4>
              <p>Metadados embutidos em imagens, incluindo GPS, câmera, data/hora.</p>
            </div>

            <div className="term">
              <h4>Footprinting</h4>
              <p>Coleta de informações sobre um alvo para mapear sua presença digital.</p>
            </div>

            <div className="term">
              <h4>Google Dorks</h4>
              <p>Técnicas de busca avançada no Google usando operadores especiais.</p>
            </div>

            <div className="term">
              <h4>HUMINT (Human Intelligence)</h4>
              <p>Inteligência coletada de fontes humanas, complementa OSINT.</p>
            </div>

            <div className="term">
              <h4>Information Disclosure</h4>
              <p>Exposição não intencional de informações sensíveis.</p>
            </div>

            <div className="term">
              <h4>IoC (Indicator of Compromise)</h4>
              <p>Evidências de que um sistema foi comprometido.</p>
            </div>

            <div className="term">
              <h4>Metadata</h4>
              <p>Dados sobre dados. Informações embutidas em arquivos que revelam origem, autor, edições.</p>
            </div>

            <div className="term">
              <h4>OSINT (Open Source Intelligence)</h4>
              <p>Inteligência coletada de fontes públicas e abertas.</p>
            </div>

            <div className="term">
              <h4>Passive Reconnaissance</h4>
              <p>Coleta de informações sem interagir diretamente com o alvo.</p>
            </div>

            <div className="term">
              <h4>Payload</h4>
              <p>Código ou comando usado para explorar vulnerabilidade.</p>
            </div>

            <div className="term">
              <h4>Recon (Reconnaissance)</h4>
              <p>Fase de coleta de informações sobre um alvo.</p>
            </div>

            <div className="term">
              <h4>robots.txt</h4>
              <p>Arquivo que instrui crawlers quais partes do site não devem ser indexadas.</p>
            </div>

            <div className="term">
              <h4>Scraping</h4>
              <p>Extração automatizada de dados de websites.</p>
            </div>

            <div className="term">
              <h4>Social Engineering</h4>
              <p>Manipulação psicológica para obter informações confidenciais.</p>
            </div>

            <div className="term">
              <h4>SQLi (SQL Injection)</h4>
              <p>Ataque que explora vulnerabilidades em queries SQL.</p>
            </div>

            <div className="term">
              <h4>Subdomain</h4>
              <p>Subseção de um domínio principal (ex: blog.exemplo.com).</p>
            </div>

            <div className="term">
              <h4>Surface Web</h4>
              <p>Parte da internet indexada por motores de busca convencionais.</p>
            </div>

            <div className="term">
              <h4>Threat Intelligence</h4>
              <p>Informações sobre ameaças cibernéticas atuais e emergentes.</p>
            </div>

            <div className="term">
              <h4>WHOIS</h4>
              <p>Protocolo para consultar informações sobre registros de domínio.</p>
            </div>

            <div className="term">
              <h4>XSS (Cross-Site Scripting)</h4>
              <p>Vulnerabilidade que permite injeção de scripts maliciosos em páginas web.</p>
            </div>

            <div className="term">
              <h4>Zero-Day</h4>
              <p>Vulnerabilidade desconhecida pelo vendor, sem patch disponível.</p>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="academy-page">
      <header className="academy-header">
        <h1>
          <BookOpen size={36} />
          ACADEMY OSINT
        </h1>
        <p>Centro educacional completo sobre OSINT e Google Dorking</p>
      </header>

      <div className="academy-layout">
        <aside className="topics-sidebar">
          <h3>📚 TÓPICOS</h3>
          {Object.entries(topics).map(([key, topic]) => (
            <button
              key={key}
              className={`topic-btn ${selectedTopic === key ? 'active' : ''}`}
              onClick={() => setSelectedTopic(key)}
            >
              {topic.icon}
              <span>{topic.title}</span>
            </button>
          ))}
        </aside>

        <main className="content-area">
          <div className="article-container">
            {topics[selectedTopic].content}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Academy;