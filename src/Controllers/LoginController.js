const User = require('../Models/User');

module.exports = {
    async login(req, res) {

        const { username, password} = req.body;

        try {

            const validedUsername = await User.findOne({
                username
            });

            if(!validedUsername) return res.status(400).json({ message: "Esse usuário não existe! :("});

            const validedPassword = await User.findOne({
                password
            }).where({
                username
            })

            if(!validedPassword) return res.status(400).json({ message: "Senha de usuário inválida! :("});

            const loggedIn = validedPassword
            
            return res.status(200).json({
                success: "Opa, deu certo! :)",
                data: loggedIn
            });

        } catch(err) {
            return res.status(400).json({ message: "Erro na requisição de usuário! :("});
        }
    }
}