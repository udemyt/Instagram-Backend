const Post = require("../Models/Post");

module.exports = {
    async likePost(req, res) {
        const { post_id } = req.params;
        const { user_id } = req.headers;

        try {
            const likedPost = await Post.findById(post_id);
            if(!likedPost) return res.status(400).json({ message: "Post não existe! :("});

            if(likedPost.likes.includes(user_id)) return res.status(400).json({ message: "Você já deu like no post! ;)"});

            likedPost.likes.push(user_id)
            await likedPost.save()
            
            return res.status(201).json(likedPost);
        } catch(err) {
            return res.status(400).json({ message: "Erro na requisição! :("});
        }
    },

    async dislikePost(req, res) {
        const { post_id } = req.params;
        const { user_id } = req.headers;

        try {
            const dislikedPost = await Post.findById(post_id);
            if(!dislikedPost) return res.status(400).json({ message: "Post não existe! :("});

            if(!dislikedPost.likes.includes(user_id)) return res.status(400).json({ message: "Este post você já deu dislike! ;)" });

            dislikedPost.likes.pull(user_id)
            await dislikedPost.save()
            
            return res.status(201).json(dislikedPost);

        } catch(err) {
            return res.status(400).json({ message: "Erro na requisição! :("});
        }
    }
}