import React, { useState } from 'react';
import { Lock, Unlock, Copy, Trash2 } from 'lucide-react';
import './EmojiCrypt.css';

const EmojiCrypt = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encrypt');

  const emojiMap = {
    'a': '😀', 'b': '😃', 'c': '😄', 'd': '😁', 'e': '😆', 'f': '😅', 'g': '🤣', 'h': '😂',
    'i': '🙂', 'j': '🙃', 'k': '😉', 'l': '😊', 'm': '😇', 'n': '🥰', 'o': '😍', 'p': '🤩',
    'q': '😘', 'r': '😗', 's': '😚', 't': '😙', 'u': '🥲', 'v': '😋', 'w': '😛', 'x': '😜',
    'y': '🤪', 'z': '😝', '0': '🤑', '1': '🤗', '2': '🤭', '3': '🤫', '4': '🤔', '5': '🤐',
    '6': '🤨', '7': '😐', '8': '😑', '9': '😶', ' ': '⬜', '.': '⚫', ',': '🔴', '!': '🔵',
    '?': '🟡', '@': '🟢', '#': '🟣', '$': '🟠', '%': '🟤', '&': '⚪', '*': '🟥', '+': '🟦'
  };

  const reverseEmojiMap = Object.fromEntries(
    Object.entries(emojiMap).map(([k, v]) => [v, k])
  );

  const encrypt = (text) => {
    return text
      .toLowerCase()
      .split('')
      .map(char => emojiMap[char] || char)
      .join('');
  };

  const decrypt = (text) => {
    const emojiRegex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu;
    return text
      .match(emojiRegex)
      .map(emoji => reverseEmojiMap[emoji] || emoji)
      .join('');
  };

  const handleProcess = () => {
    if (mode === 'encrypt') {
      setOutputText(encrypt(inputText));
    } else {
      try {
        setOutputText(decrypt(inputText));
      } catch (e) {
        setOutputText('❌ Erro ao descriptografar. Verifique se o texto contém emojis válidos.');
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
  };

  const clear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="emoji-crypt">
      <header className="page-header">
        <h1>
          {mode === 'encrypt' ? <Lock size={32} /> : <Unlock size={32} />}
          EMOJI-CRYPT
        </h1>
        <p>Esteganografia com Emojis - Oculte mensagens em texto visual</p>
      </header>

      <div className="mode-toggle">
        <button
          className={mode === 'encrypt' ? 'active' : ''}
          onClick={() => setMode('encrypt')}
        >
          <Lock size={20} /> CRIPTOGRAFAR
        </button>
        <button
          className={mode === 'decrypt' ? 'active' : ''}
          onClick={() => setMode('decrypt')}
        >
          <Unlock size={20} /> DESCRIPTOGRAFAR
        </button>
      </div>

      <div className="crypt-container">
        <div className="crypt-section">
          <h3>{mode === 'encrypt' ? '📝 TEXTO ORIGINAL' : '🎭 TEXTO CRIPTOGRAFADO'}</h3>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'encrypt' ? 'Digite sua mensagem secreta aqui...' : 'Cole os emojis aqui...'}
            rows="8"
          />
          <div className="char-count">{inputText.length} caracteres</div>
        </div>

        <div className="crypt-actions">
          <button className="btn-process" onClick={handleProcess}>
            {mode === 'encrypt' ? '🔒 CRIPTOGRAFAR' : '🔓 DESCRIPTOGRAFAR'}
          </button>
          <button className="btn-clear" onClick={clear}>
            <Trash2 size={18} /> LIMPAR
          </button>
        </div>

        <div className="crypt-section">
          <h3>{mode === 'encrypt' ? '🎭 TEXTO CRIPTOGRAFADO' : '📝 TEXTO ORIGINAL'}</h3>
          <textarea
            value={outputText}
            readOnly
            placeholder="O resultado aparecerá aqui..."
            rows="8"
          />
          {outputText && (
            <button className="btn-copy" onClick={copyToClipboard}>
              <Copy size={18} /> COPIAR
            </button>
          )}
        </div>
      </div>

      <div className="info-box">
        <h3>ℹ️ COMO FUNCIONA</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>Criptografia</h4>
            <p>Cada letra é convertida em um emoji único. Números e caracteres especiais também são mapeados.</p>
          </div>
          <div className="info-card">
            <h4>Descriptografia</h4>
            <p>Os emojis são convertidos de volta para o texto original usando o mapeamento reverso.</p>
          </div>
          <div className="info-card">
            <h4>Uso</h4>
            <p>Ideal para enviar mensagens secretas em redes sociais onde emojis são comuns.</p>
          </div>
        </div>
      </div>

      <div className="emoji-legend">
        <h3>📖 LEGENDA DE EMOJIS</h3>
        <div className="legend-grid">
          {Object.entries(emojiMap).slice(0, 20).map(([char, emoji]) => (
            <div key={char} className="legend-item">
              <span className="char">{char.toUpperCase()}</span>
              <span className="arrow">→</span>
              <span className="emoji">{emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiCrypt;
