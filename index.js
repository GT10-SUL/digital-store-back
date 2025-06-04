const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const { login } = require("./src/controller/usuariosController");
const { rotaProtegida } = require("./src/utils");
const usuariosRoutes = require("./src/routes/usuariosRoutes");
const produtosRoutes = require("./src/routes/produtosRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Olá mundo");
});

app.post("/login", async (req, res) => {
    res.send(await login(req.body));
});
app.use("/usuarios", usuariosRoutes);
app.use("/produtos", rotaProtegida, produtosRoutes);


// erro 404
app.use((req, res) => {
    res.status(404).send("Rota não encontrada");
});

app.listen(port, () => {
    console.log(`Servidor de pé: http://localhost:${port}`);
});
