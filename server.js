//Importações 
import express from 'express';
import filmeRoutes from './src/routes/filmeRoutes.js'; 
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

// Middleware para permitir requisições de outras origens (CORS)
app.use(cors());

// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API de Controle de Filmes em Execução.');
});

// A ROTA BASE principal para todos os endpoints de filmes
app.use('/v1/controle-filmes', filmeRoutes);

// Tratamento de rotas não encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: "Rota não encontrada." });
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});

