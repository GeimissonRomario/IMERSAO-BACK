
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../confg/dbConfig.js";


// Conecta ao banco de dados usando a string de conexão obtida das variáveis de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona que busca todos os posts do banco de dados
export async function getTodosPosts() {
    // Acessa o banco "imersao-back"
    const db = conexao.db("imersao-back");
    // Acessa a coleção "posts" dentro do banco
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
        const db = conexao.db("imersao-back");
        const colecao = db.collection("posts");
        return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-back");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost})

}