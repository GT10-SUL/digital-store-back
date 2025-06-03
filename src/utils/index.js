const jwt = require("jsonwebtoken");

function rotaProtegida(req, res, next){
    const token = req.headers.authorization;
    
    if(!token){
        res.status(401).send({
            tipo: "warning",
            mensagem: "Não autorizado"
        });
    }

    jwt.verify(token.split(" ")[1], process.env.SEGREDO, (error) => {
        if(error){
            res.status(401).send({
                tipo: "warning",
                mensagem: "token inválido"
            })
        }
        next();
    });
}

module.exports = {
    rotaProtegida
}