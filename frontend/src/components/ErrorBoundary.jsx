import React from 'react';

/**
 * 🛡️ Error Boundary - Captura erros do React sem quebrar a aplicação
 * Protege contra crashes completos da aplicação
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log do erro para analytics ou serviço de erro
    console.error('🔴 Error Boundary capturou erro:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Aqui você poderia enviar o erro para um serviço de monitoramento
    // como Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    // Recarregar a página como fallback
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // UI alternativa quando há erro
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '40px',
            maxWidth: '600px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '20px'
            }}>
              ⚠️
            </div>
            
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: '16px'
            }}>
              Oops! Algo deu errado
            </h1>
            
            <p style={{
              fontSize: '16px',
              color: '#4a5568',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              Ocorreu um erro inesperado na aplicação. Não se preocupe, seus dados estão seguros.
              Tente recarregar a página ou voltar para a página inicial.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginBottom: '24px',
                textAlign: 'left',
                background: '#f7fafc',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '12px'
                }}>
                  Detalhes do erro (modo desenvolvimento)
                </summary>
                <pre style={{
                  fontSize: '12px',
                  color: '#e53e3e',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#5568d3'}
                onMouseLeave={(e) => e.target.style.background = '#667eea'}
              >
                🔄 Recarregar Página
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  background: '#48bb78',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#38a169'}
                onMouseLeave={(e) => e.target.style.background = '#48bb78'}
              >
                🏠 Página Inicial
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
