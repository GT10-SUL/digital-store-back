const { buscarMarcas, buscarUmMarca, criarMarca, apagarMarca, editarMarca } = require("../controller/marcasController");
const { rotaProtegida } = require("../utils");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarMarcas());
});
router.get("/:id", async (req, res) => {
    res.send(await buscarUmMarca(req.params.id));
});
router.post("/", async (req, res) => {
    res.send(await criarMarca(req.body));
});
router.put("/:id", async (req, res) => {
    res.send( await editarMarca(req.params.id, req.body));
});
router.delete("/:id", async (req, res) => {
    res.send(await apagarMarca(req.params.id));
});

module.exports = router;