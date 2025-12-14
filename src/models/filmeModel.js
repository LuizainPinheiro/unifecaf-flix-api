import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// READ (R)

// Função para listar todos os filmes
export const findAllFilmes = async () => {
    try {
        const filmes = await prisma.filme.findMany();
        return filmes;
    } catch (error) {
        console.error("Erro no Model ao buscar todos os filmes:", error);
        throw new Error("Falha ao acessar o banco de dados.");
    }
}

// Função para buscar um filme por ID
export const findFilmeById = async (id) => {
    try {
        const filme = await prisma.filme.findUnique({
            where: {
                id: id,
            },
        });
        return filme;
    } catch (error) {
        console.error("Erro no Model ao buscar filme por ID:", error);
        throw new Error("Falha ao acessar o banco de dados.");
    }
};

// CREATE (C)

// Função para criar um novo filme
export const createFilme = async (dadosFilme) => {
    try {
        const novoFilme = await prisma.filme.create({
            data: dadosFilme,
        });
        return novoFilme;
    } catch (error) {
        console.error("Erro no Model ao criar filme:", error);
        throw new Error("Falha ao salvar no banco de dados.");
    }
};

// UPDATE (U)


// Função para atualizar um filme existente por ID
export const updateFilme = async (id, dadosAtualizacao) => {
    try {
        const filmeAtualizado = await prisma.filme.update({
            where: { id: id },
            data: dadosAtualizacao,
        });
        return filmeAtualizado;
    } catch (error) {
        console.error("Erro no Model ao atualizar filme:", error);
        throw new Error("Falha ao atualizar o filme no banco de dados.");
    }
};

// DELETE (D)

// Função para deletar um filme por ID
export const deleteFilme = async (id) => {
    try {
        const filmeDeletado = await prisma.filme.delete({
            where: { id: id },
        });
        return filmeDeletado;
    } catch (error) {
        console.error("Erro no Model ao deletar filme:", error);
        throw new Error("Falha ao deletar o filme no banco de dados.");
    }
};