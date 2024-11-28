import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
 }

// Configuração de armazenamento do multer
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos enviados serão armazenados
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo como o nome original do arquivo enviado
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria a instância do multer com as configurações definidas
const upload = multer({ 
    dest: "./uploads", // Caminho base para uploads
    storage // Utiliza o armazenamento configurado anteriormente
});

// Define as rotas da aplicação
const routes = (app) => {
    // Configura o middleware para permitir o uso de JSON no corpo das requisições
    app.use(express.json());
    app.use(cors(corsOptions));

    // Define uma rota GET para "/posts" que chama a função listarPosts
    // Esta rota retorna todos os posts do banco de dados
    app.get("/posts", listarPosts);

    // Define uma rota POST para "/posts" que chama a função postarNovoPost
    // Esta rota permite criar um novo post
    app.post("/posts", postarNovoPost);

    // Define uma rota POST para "/upload" que utiliza o middleware multer
    // A rota chama a função uploadImagem para tratar o upload da imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost )
}

// Exporta as rotas para uso em outros arquivos
export default routes;
