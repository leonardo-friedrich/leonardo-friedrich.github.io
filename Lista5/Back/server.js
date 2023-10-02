const express = require('express');
const app = express();
const port = 3001; // Porta que o servidor irá ouvir
const cors = require('cors');

// Configura o middleware para servir as imagens estáticas da pasta 'imagens'
app.use('/imagens', express.static('imagens'));



// Lista de cidades com dados
const cidadesComDados = [
  {
    nome: 'São Paulo',
    imagem: 'https://media.istockphoto.com/id/1345135633/pt/foto/porto-alegre-city.jpg?s=2048x2048&w=is&k=20&c=GWvq9zOV30nKbr-B39zuDRCQjgx2S47ggvJcUlc82kc=',
    descricao: 'São Paulo é a maior cidade do Brasil...',
  },
  {
    nome: 'Rio de Janeiro',
    imagem: 'porto_alegre.jpg',
    descricao: 'O Rio de Janeiro é conhecido por suas praias...',
  },
  {
    nome: 'Belo Horizonte',
    imagem: 'porto_alegre.jpg',
    descricao: 'Belo Horizonte é a capital de Minas Gerais...',
  },
  {
    nome: 'Porto Alegre',
    imagem: 'https://media.istockphoto.com/id/1345135633/pt/foto/porto-alegre-city.jpg?s=2048x2048&w=is&k=20&c=GWvq9zOV30nKbr-B39zuDRCQjgx2S47ggvJcUlc82kc=',
    descricao: 'Porto Alegre é a capital do Rio Grande do Sul...',
  },
  {
    nome: 'Curitiba',
    imagem: 'url_da_imagem_curitiba.jpg',
    descricao: 'Curitiba é a capital do Paraná e conhecida por sua...',
  },
];
app.use(cors());
// Rota de exemplo que retorna uma lista de cidades
app.get('/cidades', (req, res) => {
  const cidades = cidadesComDados.map((cidade) => cidade.nome);
  res.json(cidades);
});

// Rota para obter dados da cidade selecionada
app.get('/cidade/:nome', (req, res) => {
    const nomeCidadeParam = req.params.nome.toLowerCase(); // Converte o nome da URL para minúsculas
    const cidade = cidadesComDados.find((cidade) => cidade.nome.toLowerCase() === nomeCidadeParam);
    if (cidade) {
      res.json({
        nome: cidade.nome,
        imagem: cidade.imagem,
        descricao: cidade.descricao,
      });
    } else {
      res.status(404).json({ mensagem: 'Cidade não encontrada' });
    }
  });
  
  
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
