const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res)=>{
    //res.sendFile(path.resolve(__dirname, 'public/pages/post.html'));
    const blogpost = await BlogPost.findById(req.params.id).populate('userId')
    res.render('post', {blogpost});
};  