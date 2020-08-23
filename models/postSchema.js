const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    body: {
        type: String,
        required: true
    }
});

module.exports = model("post", postSchema);