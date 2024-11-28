import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts
export async function listarPosts(req, res) {
    // Busca os posts do banco de dados
    const posts = await getTodosPosts();

    // Retorna os posts como resposta no formato JSON com status 200 (OK)
    res.status(200).json(posts);
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const novoPost = req.body;

    try {
        // Cria o post no banco de dados e retorna o resultado
        const postCriado = await criarPost(novoPost);

        // Envia o post criado como resposta no formato JSON com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Loga o erro no console para debug
        console.error(erro.message);

        // Retorna uma mensagem de erro com status 500 (Erro interno do servidor)
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

// Função para fazer upload de uma imagem e criar um post relacionado
export async function uploadImagem(req, res) {
    // Cria um objeto do post com as informações iniciais da imagem
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname, // Define o nome original do arquivo como URL inicial
        alt: ""
    };

    try {
        // Cria o post no banco de dados
        const postCriado = await criarPost(novoPost);

        // Atualiza o caminho da imagem para incluir o ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Renomeia o arquivo no sistema de arquivos para o novo caminho
        fs.renameSync(req.file.path, imagemAtualizada);

        // Envia o post criado como resposta no formato JSON com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Loga o erro no console para debug
        console.error(erro.message);

        // Retorna uma mensagem de erro com status 500 (Erro interno do servidor)
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}
export async function atualizarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const post = {
            imgUrl : urlImagem,
            descricao : descricao,
            alt: req.body.alt
        };
        // Cria o post no banco de dados e retorna o resultado
        const postCriado = await atualizarPost(id, post);

        // Envia o post criado como resposta no formato JSON com status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Loga o erro no console para debug
        console.error(erro.message);

        // Retorna uma mensagem de erro com status 500 (Erro interno do servidor)
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}