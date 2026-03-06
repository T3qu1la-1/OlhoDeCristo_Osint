/**
 * 🚫 PROTEÇÃO CONTRA INSPEÇÃO DO SITE
 * Desabilita DevTools, F12, View Source, Right Click
 */

// Desabilitar F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
document.addEventListener('keydown', function(e) {
  // F12
  if (e.keyCode === 123) {
    e.preventDefault();
    return false;
  }
  
  // Ctrl+Shift+I (DevTools)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    e.preventDefault();
    return false;
  }
  
  // Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
    e.preventDefault();
    return false;
  }
  
  // Ctrl+Shift+C (Inspect Element)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
    e.preventDefault();
    return false;
  }
  
  // Ctrl+U (View Source)
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
    return false;
  }
  
  // Ctrl+S (Save Page)
  if (e.ctrlKey && e.keyCode === 83) {
    e.preventDefault();
    return false;
  }
});

// Desabilitar Right Click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// Detectar DevTools aberto
let devtools = {
  isOpen: false,
  orientation: null
};

const threshold = 160;

const emitEvent = (isOpen, orientation) => {
  if (isOpen && !devtools.isOpen) {
    console.clear();
    console.log('%c⚠️ ATENÇÃO', 'color: red; font-size: 40px; font-weight: bold;');
    console.log('%cDevTools detectado! Esta ação foi registrada.', 'color: red; font-size: 20px;');
    
    // Opcional: redirecionar ou alertar
    // window.location.href = '/';
  }
  
  devtools.isOpen = isOpen;
  devtools.orientation = orientation;
};

const main = () => {
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  const orientation = widthThreshold ? 'vertical' : 'horizontal';
  
  if (!(heightThreshold && widthThreshold) &&
      ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
       widthThreshold || heightThreshold)) {
    emitEvent(true, orientation);
  } else {
    emitEvent(false, null);
  }
};

// Verificar a cada 500ms
setInterval(main, 500);

// Limpar console periodicamente
setInterval(() => {
  if (devtools.isOpen) {
    console.clear();
    console.log('%c🚫 Inspeção não permitida', 'color: red; font-size: 30px; font-weight: bold;');
  }
}, 1000);

// Desabilitar seleção de texto (opcional)
// document.addEventListener('selectstart', function(e) {
//   e.preventDefault();
//   return false;
// });

// Detectar debug mode
(function() {
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function() {
      emitEvent(true, 'console');
    }
  });
  
  setInterval(() => {
    console.dir(element);
    console.clear();
  }, 1000);
})();

export default {
  init() {
    console.log('🔒 Proteção contra inspeção ativada');
  }
};
