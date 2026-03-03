import React, { useState } from 'react';
import { Database, Copy, RefreshCw, Download } from 'lucide-react';
import './ToolPages.css';

const Generators = () => {
  const [activeTab, setActiveTab] = useState('cpf');
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState([]);

  const generateCPF = () => {
    const cpfs = [];
    for (let i = 0; i < quantity; i++) {
      let cpf = '';
      for (let j = 0; j < 9; j++) {
        cpf += Math.floor(Math.random() * 10);
      }
      let sum = 0;
      for (let j = 0; j < 9; j++) {
        sum += parseInt(cpf[j]) * (10 - j);
      }
      let digit1 = 11 - (sum % 11);
      digit1 = digit1 > 9 ? 0 : digit1;
      cpf += digit1;
      sum = 0;
      for (let j = 0; j < 10; j++) {
        sum += parseInt(cpf[j]) * (11 - j);
      }
      let digit2 = 11 - (sum % 11);
      digit2 = digit2 > 9 ? 0 : digit2;
      cpf += digit2;
      cpfs.push(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
    }
    setResults(cpfs);
  };

  const generatePhone = () => {
    const phones = [];
    const ddds = ['11', '21', '31', '41', '51', '61', '71', '81', '85', '91'];
    for (let i = 0; i < quantity; i++) {
      const ddd = ddds[Math.floor(Math.random() * ddds.length)];
      const prefix = 9;
      const num = Math.floor(10000000 + Math.random() * 90000000);
      phones.push(`(${ddd}) ${prefix}${num.toString().substring(0, 4)}-${num.toString().substring(4)}`);
    }
    setResults(phones);
  };

  const generateEmail = () => {
    const emails = [];
    const providers = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    const names = ['joao', 'maria', 'pedro', 'ana', 'carlos', 'julia', 'lucas', 'fernanda'];
    for (let i = 0; i < quantity; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const num = Math.floor(100 + Math.random() * 900);
      const provider = providers[Math.floor(Math.random() * providers.length)];
      emails.push(`${name}${num}@${provider}`);
    }
    setResults(emails);
  };

  const generateCEP = () => {
    const ceps = [];
    for (let i = 0; i < quantity; i++) {
      const num = Math.floor(10000000 + Math.random() * 90000000);
      ceps.push(num.toString().replace(/(\d{5})(\d{3})/, '$1-$2'));
    }
    setResults(ceps);
  };

  const generateName = () => {
    const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Juliana', 'Lucas', 'Fernanda'];
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Costa', 'Pereira'];
    const names = [];
    for (let i = 0; i < quantity; i++) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last1 = lastNames[Math.floor(Math.random() * lastNames.length)];
      const last2 = lastNames[Math.floor(Math.random() * lastNames.length)];
      names.push(`${first} ${last1} ${last2}`);
    }
    setResults(names);
  };

  const generateAddress = () => {
    const streets = ['Rua das Flores', 'Av. Paulista', 'Rua Oscar Freire', 'Av. Brasil'];
    const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília'];
    const states = ['SP', 'RJ', 'MG', 'DF'];
    const addresses = [];
    for (let i = 0; i < quantity; i++) {
      const street = streets[Math.floor(Math.random() * streets.length)];
      const num = Math.floor(1 + Math.random() * 9999);
      const city = cities[Math.floor(Math.random() * cities.length)];
      const state = states[Math.floor(Math.random() * states.length)];
      const cep = Math.floor(10000000 + Math.random() * 90000000).toString().replace(/(\d{5})(\d{3})/, '$1-$2');
      addresses.push(`${street}, ${num} - ${city}/${state} - CEP: ${cep}`);
    }
    setResults(addresses);
  };

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
    const passwords = [];
    for (let i = 0; i < quantity; i++) {
      let password = '';
      for (let j = 0; j < 16; j++) {
        password += chars[Math.floor(Math.random() * chars.length)];
      }
      passwords.push(password);
    }
    setResults(passwords);
  };

  const generators = {
    cpf: { label: 'CPF', func: generateCPF },
    phone: { label: 'TELEFONE', func: generatePhone },
    email: { label: 'EMAIL', func: generateEmail },
    cep: { label: 'CEP', func: generateCEP },
    name: { label: 'NOME', func: generateName },
    address: { label: 'ENDEREÇO', func: generateAddress },
    password: { label: 'SENHA', func: generatePassword }
  };

  const handleGenerate = () => {
    generators[activeTab].func();
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join('\n'));
  };

  const exportResults = () => {
    const blob = new Blob([results.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className='tool-page'>
      <div className='tool-header'>
        <div className='tool-title'>
          <Database size={32} />
          <div>
            <h1>GERADORES UTILS BR</h1>
            <p>&gt; Generate realistic Brazilian data</p>
          </div>
        </div>
      </div>

      <div className='tool-content'>
        <div className='tabs'>
          {Object.entries(generators).map(([key, value]) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => { setActiveTab(key); setResults([]); }}
            >
              {value.label}
            </button>
          ))}
        </div>

        <div className='search-box'>
          <div className='input-group-tool'>
            <label>QUANTIDADE</label>
            <div className='input-with-button'>
              <input
                type='number'
                min='1'
                max='100'
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              />
              <button className='btn-tool' onClick={handleGenerate}>
                <RefreshCw size={18} />
                GERAR
              </button>
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <>
            <div className='stats-row'>
              <div className='stat-box'>
                <div className='stat-value'>{results.length}</div>
                <div className='stat-label'>GERADOS</div>
              </div>
              <button className='btn-tool btn-secondary' onClick={copyAll}>
                <Copy size={18} />
                COPIAR
              </button>
              <button className='btn-tool btn-secondary' onClick={exportResults}>
                <Download size={18} />
                EXPORTAR
              </button>
            </div>
            <div className='output-box'>
              <pre>{results.join('\n')}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Generators;