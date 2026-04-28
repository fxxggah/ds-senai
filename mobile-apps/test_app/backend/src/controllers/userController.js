const db = require("../config/db")

exports.createUser = async (req, res) => {
    const { nome } = req.body;

    try {
        const [result] = await db.query("INSERT INTO dadosUsuarios (nome) VALUES (?)", [nome])
        res.status(201).json({message: "Usuario criado com sucesso: ", result})
    } catch (error) {
        res.status(500).json({message: "Erro ao criar usuario"});
        console.error("Erro: ", error)
    }
}

exports.getUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT * FROM dadosUsuarios WHERE ativo = TRUE")
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message: "Erro ao criar usuario"});
        console.error("Erro: ", error)
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        const [result] = await db.query("DELETE FROM dadosUsuarios WHERE id = (id)", [id])
        res.status(200).json({message: "Usuario deletado com sucesso", result})
    } catch (error) {
        res.status(500).json({message: "Erro ao deletar usuario"});
        console.error("Erro: ", error)
    }
}



