const { buscarProdutos, buscarUmProduto, criarProduto, apagarProduto, editarProduto } = require("../controller/produtosController");
const { rotaProtegida } = require("../utils");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarProdutos());
});
router.get("/:id", async (req, res) => {
    res.send(await buscarUmProduto(req.params.id));
});
router.post("/", rotaProtegida, async (req, res) => {
    res.send(await criarProduto(req));
});
router.put("/:id", rotaProtegida, async (req, res) => {
    res.send( await editarProduto(req.params.id, req.body));
});
router.delete("/:id", rotaProtegida, async (req, res) => {
    res.send(await apagarProduto(req.params.id));
});

module.exports = router;