const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res)=>{
    //res.sendFile(path.resolve(__dirname, 'public/pages/index.html'));
    const blogposts = await BlogPost.find({}).populate('userId');
    res.render('index',{
        blogposts
      
    });
}