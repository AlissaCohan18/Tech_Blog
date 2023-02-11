// Import the User & Post model
const User = require("./User");
const Comment = require("./Comment");
const Blog = require("./Blog");

// create associations
// user has many blogs
User.hasMany(Blog, {
  foreignKey: "user_id",
});

// user has many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// blog belongs to user
Blog.belongsTo(User, {
  foreignKey: "user_id",
});

// comment belongs to user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// comment belongs to blog
Comment.belongsTo(Blog, {
    foreignKey: "blog_id"
    });

// blog has many comment
Blog.hasMany(Comment, {
    foreignKey: "blog_id"
})

// Export object with them as the properties
module.exports = { User, Comment, Blog };
