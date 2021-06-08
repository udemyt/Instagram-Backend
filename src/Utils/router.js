const { Router } = require('express');
const LikeController = require('../Controllers/LikeController');
const LoginController = require('../Controllers/LoginController');
const PostController = require('../Controllers/PostController');
const ProfileController = require('../Controllers/ProfileController');
const UserController = require('../Controllers/UserController');

const route = Router();

// Rotas de criação e e listagem de users
route.get('/users', UserController.listUsers);
route.post('/users', UserController.createUser);

// Rotas de Login
route.post('/login', LoginController.login);

// Rotas de criação e administração de Posts
route.post('/posts', PostController.createPost);
route.get('/posts', PostController.listAllPosts);
route.delete('/post/:post_id', PostController.deletePost);
route.put('/post/:post_id', PostController.editPost);

// Rota de perfil de user
route.get('/users/:user_id', ProfileController.getProfile);

// Rota para likes
route.post('/posts/:post_id/like', LikeController.likePost);

module.exports = route 