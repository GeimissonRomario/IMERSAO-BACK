// Importa o módulo Express, usado para criar o servidor
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do servidor Express
const app = express();
app.use(express.static("uploads"));
routes(app);

// Define a porta do servidor e inicia o servidor escutando as requisições
app.listen(3000, () => {
    console.log("Servidor escutando..."); // Exibe mensagem quando o servidor está ativo
});

