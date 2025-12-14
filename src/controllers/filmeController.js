//Importações
import * as filmeModel from '../models/filmeModel.js';
import { Prisma } from '@prisma/client'; 

// Remove acentos e caracteres especiais
const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// ROTA 1: Listar Todos os Filmes 
export const listarTodos = async (req, res) => {
    try {
        const filmes = await filmeModel.findAllFilmes();
        res.status(200).json({ data: filmes, count: filmes.length });
    } catch (error) {
        console.error("Erro ao listar todos os filmes:", error.message);
        res.status(500).json({ message: "Erro interno do servidor ao processar a requisição." });
    }
};

// ROTA 2: Buscar por ID 
export const buscarPorId = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID de filme inválido. O ID deve ser um número." });
    }

    try {
        const filme = await filmeModel.findFilmeById(id);

        if (!filme) {
            return res.status(404).json({ message: `Filme com ID ${id} não encontrado no acervo.` });
        }
        res.status(200).json({ data: [filme] });
    } catch (error) {
        console.error("Erro ao buscar filme por ID:", error.message);
        res.status(500).json({ message: "Erro interno do servidor ao processar a requisição." });
    }
};

// ROTA 3: Filtrar por Nome ou Sinopse 
export const filtrarPorNomeOuSinopse = async (req, res) => {
    const termoBusca = req.query.nome;

    if (!termoBusca || termoBusca.trim() === '') {
        return res.status(400).json({ message: "Parâmetro 'nome' ausente ou vazio. Forneça um termo de busca." });
    }

    try {
        // 1. Busca todos os filmes 
        const todosOsFilmes = await filmeModel.findAllFilmes();

        // 2. Prepara o termo de busca para comparação
        const termoLimpo = removerAcentos(termoBusca).toLowerCase().trim();

        // 3. Filtra usando o metodo .filter()
        const filmesFiltrados = todosOsFilmes.filter(filme => {
            const tituloLimpo = removerAcentos(filme.titulo).toLowerCase();
            const sinopseLimpa = removerAcentos(filme.sinopse).toLowerCase();
            const diretorLimpo = removerAcentos(filme.diretor).toLowerCase();
            const generoLimpo = removerAcentos(filme.genero).toLowerCase();
            
            // Retorna true se o termo for encontrado em qualquer campo 
            return tituloLimpo.includes(termoLimpo) || 
                   sinopseLimpa.includes(termoLimpo) ||
                   diretorLimpo.includes(termoLimpo) ||
                   generoLimpo.includes(termoLimpo);
        });
        
        if (filmesFiltrados.length === 0) {
             return res.status(404).json({ message: `Nenhum filme encontrado para o termo: "${termoBusca}"` });
        }

        res.status(200).json({ data: filmesFiltrados, count: filmesFiltrados.length });

    } catch (error) {
        console.error("Erro ao filtrar filmes:", error.message);
        res.status(500).json({ message: "Erro interno do servidor ao processar a requisição." });
    }
};

// ROTA 4: Criar Novo Filme
export const criarNovoFilme = async (req, res) => {
    const { titulo, sinopse, diretor, ano_lancamento, genero } = req.body;

    // Validação de campos obrigatórios
    if (!titulo || !sinopse || !diretor || !ano_lancamento || !genero) {
        return res.status(400).json({ message: "Todos os campos (titulo, sinopse, diretor, ano_lancamento, genero) são obrigatórios." });
    }

    // Validação do tipo de ano_lancamento
    if (typeof ano_lancamento !== 'number' || ano_lancamento > new Date().getFullYear() + 1 || ano_lancamento < 1895) {
        return res.status(400).json({ message: "O 'ano_lancamento' deve ser um número válido (Ano de lançamento deve ser entre 1895 e o ano atual + 1)." });
    }

    try {
        const novoFilme = await filmeModel.createFilme(req.body);
        res.status(201).json({ 
            message: "Filme criado com sucesso!",
            data: novoFilme
        });
    } catch (error) {
        console.error("Erro ao criar novo filme:", error.message);
        res.status(500).json({ message: "Erro interno do servidor ao salvar o filme." });
    }
};

// ROTA 5: Atualizar Filme
export const atualizarFilme = async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizacao = req.body;
    
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID de filme inválido. O ID deve ser um número." });
    }

    // Validação de dados para atualização
    if (Object.keys(dadosAtualizacao).length === 0) {
        return res.status(400).json({ message: "Nenhum dado fornecido para atualização." });
    }

    // Validação de tipo de ano_lancamento
    if (dadosAtualizacao.ano_lancamento && (typeof dadosAtualizacao.ano_lancamento !== 'number' || dadosAtualizacao.ano_lancamento > new Date().getFullYear() + 1 || dadosAtualizacao.ano_lancamento < 1895)) {
        return res.status(400).json({ message: "O 'ano_lancamento' deve ser um número válido (Ano de lançamento deve ser entre 1895 e o ano atual + 1)." });
    }

    try {
        const filmeAtualizado = await filmeModel.updateFilme(id, dadosAtualizacao);
        
        // Status 200 OK
        res.status(200).json({ 
            message: `Filme com ID ${id} atualizado com sucesso!`,
            data: filmeAtualizado
        });
    } catch (error) {
        console.error("Erro ao atualizar filme:", error.message);
        
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ message: `Filme com ID ${id} não encontrado para atualização.` });
        }
        
        res.status(500).json({ message: "Erro interno do servidor ao atualizar o filme." });
    }
};

// ROTA 6: Deletar Filme 
export const deletarFilme = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID de filme inválido. O ID deve ser um número." });
    }

    try {
        await filmeModel.deleteFilme(id);
        
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar filme:", error.message);

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ message: `Filme com ID ${id} não encontrado para deleção.` });
        }
        
        res.status(500).json({ message: "Erro interno do servidor ao deletar o filme." });
    }
};