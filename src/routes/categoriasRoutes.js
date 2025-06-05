const { buscarCategorias, buscarUmCategoria, criarCategoria, apagarCategoria, editarCategoria } = require("../controller/categoriasController");
const { rotaProtegida } = require("../utils");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarCategorias());
});
router.get("/:id", async (req, res) => {
    res.send(await buscarUmCategoria(req.params.id));
});
router.post("/", async (req, res) => {
    res.send(await criarCategoria(req.body));
});
router.put("/:id", async (req, res) => {
    res.send( await editarCategoria(req.params.id, req.body));
});
router.delete("/:id", async (req, res) => {
    res.send(await apagarCategoria(req.params.id));
});

module.exports = router;