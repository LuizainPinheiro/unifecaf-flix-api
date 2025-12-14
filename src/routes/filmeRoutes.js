import express from 'express';
import * as filmeController from '../controllers/filmeController.js';

const router = express.Router();

// Rotas de LEITURA (READ)

// ROTA DE FILTRO 
router.get('/filtro/filme', filmeController.filtrarPorNomeOuSinopse);

// ROTA DE LISTAGEM GERAL (GET /filme)
router.get('/filme', filmeController.listarTodos);

// ROTA DE BUSCA POR ID (GET /filme/:id)
router.get('/filme/:id', filmeController.buscarPorId);


// ROTA DE CRIAÇÃO (CREATE)
router.post('/filme', filmeController.criarNovoFilme);

// ROTA DE ATUALIZAÇÃO (UPDATE)
router.put('/filme/:id', filmeController.atualizarFilme);

// ROTA DE DELEÇÃO (DELETE)
router.delete('/filme/:id', filmeController.deletarFilme);


export default router;





