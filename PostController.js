const Post = require('./Post')

class PostController{
    async create(req, res){
        const {title, text} = req.body
        const post = await Post.create({title, text})
        res.json(post)
    }

    async getAll(req, res){
        const posts = await Post.find()
        res.json(posts)
    }

}

module.exports = new PostController()