const Post = require('../Models/Post');

module.exports = {
    async createPost(req, res) {
        const { picture, description } = req.body;

        const { user } = req.headers;

        try {

            const newPost = await Post.create({
                picture,
                description,
                user
            });

            return res.status(201).json({
                success: "Postagem criada com sucesso! :)",
                data: newPost
            });

        } catch(err) {
            return res.status(400).json({ message: "Erro de requisição! :(" });
        }
    },

    async listAllPosts(req, res) {

        try {

            const allPosts = await Post.find()
                .populate('user');
            
            return res.status(200).json({
                message: "Todos os Posts listados com sucesso! :)",
                data: allPosts
            })

        } catch(err) {
            return res.status(400).json({ message: "Erro na requisição de listagem! :("})
        }

    },

    async deletePost(req, res) {
        const { post_id } = req.params;
        const { user_id } = req.headers;

        try {
            const belongsToUser = await Post.findOne({ user: user_id }).where({ _id: post_id });
            if(!belongsToUser) return res.status(400).json({ message: "Acesso negado para essa requisição! :/" });

            const postExists = await Post.findById(post_id);
            if(!postExists) return res.status(400).json({ message: "Não existe esse post! :(" })
            
            const deletePost = await Post.findByIdAndDelete(post_id);

            return res.status(200).json({
                message: "Post deletado com sucesso! :)"
            });

        } catch(err) {
            return res.status(400).json({
                message: "Erro ao deletar o post! :("
            });
        }
        
    },

    async editPost(req, res) {
        const { post_id } = req.params;
        const { description } = req.body;
        const { user_id } = req.headers;

        try {
            const belongsToUser = await Post.findOne({ user: user_id }).where({ _id: post_id });
            if(!belongsToUser) return res.status(400).json({ message: "Acesso negado para essa requisição! :/" });

            const postExists = await Post.findById(post_id);
            if(!postExists) return res.status(400).json({ message: "Não existe esse post! :(" })

            const editPost = await Post.findByIdAndUpdate(post_id, {
                description
            }, {
                new: true
            });

            return res.status(200).json({
                message: "Atualizações feitas com success! :)" ,
                data: editPost
            })
        } catch(err) {
            return res.status(200).json({
                message: "Erro na requisição de atualização! :("
            })
        }        
    }
}