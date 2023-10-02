import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [cidadeData, setCidadeData] = useState(null);

  // Nomes das cidades diretamente no código do front-end
  const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba'];

  useEffect(() => {
    // Faz uma nova requisição para obter os dados da cidade selecionada
    if (cidadeSelecionada) {
      fetch(`http://localhost:3001/cidade/${cidadeSelecionada}`)
        .then((response) => response.json())
        .then((data) => {
          setCidadeData(data);
        })
        .catch((error) => {
          console.error('Erro ao obter os dados da cidade:', error);
        });
    } else {
      // Se nenhuma cidade estiver selecionada, limpa os dados da cidade
      setCidadeData(null);
    }
  }, [cidadeSelecionada]);

  const handleCidadeSelecionada = (event) => {
    setCidadeSelecionada(event.target.value);
  };

  return (
    <div className="App">
      <h1>Lista de Cidades</h1>
      <select value={cidadeSelecionada} onChange={handleCidadeSelecionada}>
        <option value="">Selecione uma cidade</option>
        {cidades.map((cidade, index) => (
          <option key={index} value={cidade}>
            {cidade}
          </option>
        ))}
      </select>
      {cidadeData && (
        <div className="cidade-data">
          <h2>{cidadeSelecionada}</h2>
          <img src={cidadeData.imagem} alt={cidadeSelecionada} />
          <p>{cidadeData.descricao}</p>
        </div>
      )}
    </div>
  );
}

export default App;
