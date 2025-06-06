const { prisma } = require("../services");
const { formidable } = require("formidable");
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");
const copyFileAsync = promisify(fs.copyFile);
const unlinkAsync = promisify(fs.unlink);

// const __dirname = __dirname; // já existe no CommonJS

async function buscarProdutos() {
    try {
        return await prisma.produtos.findMany({
            include: {
                marcas: true,
                categorias: true
            }
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        };
    }
}

async function buscarUmProduto(id) {
    try {
        return await prisma.produtos.findFirst({
            where: {
                produto_id: Number(id)
            }
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        };
    }
}

async function criarProduto(req) {
    try {
        const form = formidable({});

        const resultado = new Promise((resolve, reject) => {
            form.parse(req, async (error, fields, files) => {
                if (error) {
                    resolve({
                        tipo: "error",
                        mensagem: error.message
                    });
                }

                if (!files.produto_imagem) {
                    resolve({
                        tipo: "warning",
                        mensagem: 'O arquivo é obrigatório'
                    });
                }

                const filenameOriginal = files.produto_imagem[0].originalFilename;

                if (!filenameOriginal.includes("png") && !filenameOriginal.includes("jpg")) {
                    resolve({
                        tipo: "warning",
                        mensagem: 'O arquivo precisa ser do tipo PNG ou JPG'
                    });
                }

                const oldpath = files.produto_imagem[0].filepath;
                const filename = filenameOriginal.split('.');
                const newFilename = `${filename[0]}-${Date.now()}.${filename[1]}`;
                const newpath = path.join(__dirname, '../uploads/produtos', newFilename);

                await copyFileAsync(oldpath, newpath);
                await unlinkAsync(oldpath);

                await prisma.produtos.create({
                    data: {
                        produto_nome: fields.produto_nome[0],
                        produto_preco: Number(fields.produto_preco[0]),
                        produto_desconto: Number(fields.produto_desconto[0]),
                        categoria_id: Number(fields.categoria_id[0]),
                        marca_id: Number(fields.marca_id[0]),
                        produto_imagem: 'http://localhost:8000/files/'+newFilename 
                    }
                });
                resolve();
            });

        })
        return resultado;
        // const { fields, files } = await form.parse(req);
        // console.log("fields", fields);
        // console.log("files", files);

        // if (!files.baseFile) {
        //     return {
        //         tipo: "warning",
        //         mensagem: 'O arquivo é obrigatório'
        //     };
        // }

        // const filenameOriginal = files.baseFile[0].originalFilename;

        // if (!filenameOriginal.includes("png") && !filenameOriginal.includes("jpg")) {
        //     return {
        //         tipo: "warning",
        //         mensagem: 'O arquivo precisa ser do tipo PNG ou JPG'
        //     };
        // }

        // const oldpath = files.baseFile[0].filepath;
        // const filename = filenameOriginal.split('.');
        // const newFilename = `${filename[0]}-${Date.now()}.${filename[1]}`;
        // const newpath = path.join(__dirname, '../uploads/produtos', newFilename);

        // await copyFileAsync(oldpath, newpath);
        // await unlinkAsync(oldpath);

        // await prisma.produtos.create({
        //     data: {
        //         ...fields,
        //         produto_imagem: newFilename // você pode salvar só o nome, se quiser
        //     }
        // });

        // return {
        //     tipo: "success",
        //     mensagem: "Registro criado com sucesso"
        // };
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        };
    }
}



async function editarProduto(id, dados) {
    try {
        return await prisma.produtos.update({
            where: { produto_id: Number(id) },
            data: dados
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        };
    }
}

async function apagarProduto(id) {
    try {
        return await prisma.produtos.delete({
            where: {
                produto_id: Number(id)
            }
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        };
    }
}

module.exports = {
    buscarProdutos,
    buscarUmProduto,
    criarProduto,
    apagarProduto,
    editarProduto
};
