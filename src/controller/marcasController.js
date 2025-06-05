const { prisma } = require("../services");

async function buscarMarcas() {
    try {
        return await prisma.marcas.findMany();
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
    // return await executarSQL("SELECT * FROM marcas;");
}

async function buscarUmMarca(id) {
    try {
        return await prisma.marcas.findFirst({
            where: {
                marca_id: Number(id)
            }
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
    // return await executarSQL(`SELECT * FROM marcas WHERE marca_id = ${id};`);
}

async function criarMarca(dados) {
    try {
        const request =  await prisma.marcas.create({
            data: dados
        });
        if(request){
            return {
                tipo: "success",
                mensagem: "Registro criado com sucesso"
            } 
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
    // return await executarSQL(`INSERT INTO marcas (marca_nome, marca_preco, marca_desconto, marca_imagem, marca_id,marca_id) VALUES ('${dados.marca_nome}', ${dados.marca_preco}, ${dados.marca_desconto},'${dados.marca_imagem}', ${dados.marca_id}, ${dados.marca_id})`)
}

async function editarMarca(id,dados) {
    try {
        const request =  await prisma.marcas.update({
            where: {marca_id: Number(id)},
            data: dados
        })
        if(request){
            return {
                tipo: "success",
                mensagem: "Registro atualizado com sucesso"
            } 
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
        
    }
}

async function apagarMarca(id) {
    // return await executarSQL(`DELETE FROM marcas WHERE marca_id = ${id}`)
    try {
        const request = await prisma.marcas.delete({
            where: {
                marca_id: Number(id)
            }
        });
        if(request){
            return {
                tipo: "success",
                mensagem: "Registro deletado com sucesso"
            } 
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

module.exports = {
    buscarMarcas,
    buscarUmMarca,
    criarMarca,
    apagarMarca,
    editarMarca
}