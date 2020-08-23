const router = require("express").Router();
const postSchema = require("../models/postSchema");

// API: create @post
router.post("/", (req, res) => {
    const { body } = req.body;
    if (!body.trim())
        return res.status(400)
            .json({ errorMsg: "post body is required!!" });
    postSchema.insertMany({ body }, (err, doc) => {
        if (err)
            return res.status(500)
                .json({ errorMsg: "error while inserting post in the db!!" });
        let { _id } = doc;
        return res.status(200)
            .json({ id: _id });
    });
});

// API: read   @get: get all
router.get("/", (req, res) => {
    postSchema.find((err, result) => {
        if (err)
            return res.status(500)
                .json({ errorMsg: "error while listing db posts!!" });
        return res.status(200)
            .json({ posts: result });
    });
});

// API: read   @get: get specific post
router.get("/:id", (req, res) => {
    const { id } = req.params;
    postSchema.findById(id, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
            .json({ post: result });
    });
});

// API: update @put
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { body } = req.body;
    postSchema.findByIdAndUpdate({ _id: id }, { body }, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        const { body, _id } = result; 
        return res.status(200)
            .json({ body, id });
    });
});
// API: delete @delete
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    postSchema.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});
module.exports = router;