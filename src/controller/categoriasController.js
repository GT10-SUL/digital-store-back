const { prisma } = require("../services");

async function buscarCategorias() {
    try {
        return await prisma.categorias.findMany();
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
    // return await executarSQL("SELECT * FROM categorias;");
}

async function buscarUmCategoria(id) {
    try {
        return await prisma.categorias.findFirst({
            where: {
                categoria_id: Number(id)
            }
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
    // return await executarSQL(`SELECT * FROM categorias WHERE categoria_id = ${id};`);
}

async function criarCategoria(dados) {
    try {
        const request =  await prisma.categorias.create({
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
    // return await executarSQL(`INSERT INTO categorias (categoria_nome, categoria_preco, categoria_desconto, categoria_imagem, marca_id,categoria_id) VALUES ('${dados.categoria_nome}', ${dados.categoria_preco}, ${dados.categoria_desconto},'${dados.categoria_imagem}', ${dados.marca_id}, ${dados.categoria_id})`)
}

async function editarCategoria(id,dados) {
    try {
        const request =  await prisma.categorias.update({
            where: {categoria_id: Number(id)},
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

async function apagarCategoria(id) {
    // return await executarSQL(`DELETE FROM categorias WHERE categoria_id = ${id}`)
    try {
        const request = await prisma.categorias.delete({
            where: {
                categoria_id: Number(id)
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
    buscarCategorias,
    buscarUmCategoria,
    criarCategoria,
    apagarCategoria,
    editarCategoria
}