const User = require('../Models/User')

module.exports = {
    async createUser(req, res) {
        const {
            username,
            password,
            name,
            description,
            site
        } = req.body;

        try {

            const userAlreadyExists = await User.findOne({
                username
            });

            if(userAlreadyExists) return res.status(400).json({ message: `O @nickname ${username} já existe! :(`});
            
            const createdUser = await User.create({
                username: username,
                password: password,
                name: name,
                description: description,
                site: site,
            });

            return res.status(200).send({
                menssage: "Usuário criado com sucesso! :)",
                data: createdUser
            })

        } catch(err) {
            return res.status(400).send({ erro: "Errou na criação do usuário! :("});
        }
    },
    async listUsers(req, res) {
        try {
            const showUsers = await User.find();

            return res.status(200).send({
                menssage: "All Users requisitados com sucesso! :)",
                data: showUsers
            });

        } catch(err) {
            return res.status(400).send({ erro: "Errou na requisição de all Users! :("});
        }
    }
}