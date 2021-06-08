const User = require("../Models/User");
const Post = require("../Models/Post");

module.exports = {
    async getProfile(req, res) {
        const { user_id } = req.params;

        try {
            const userInfo = await User.findById(user_id);
            if(!userInfo) return res.status(400).json({ message: "Usuário não existe! :(" })

            const userPosts = await Post.find({
                user: user_id
            })

            return res.status(200).json({
                message: ":)",
                userInfo,
                userPosts
            });

        } catch(err) {
            return res.status(400).json({ message: "Erro de requisição! :(" });
        }
    }
}