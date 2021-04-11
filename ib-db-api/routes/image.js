const express = require("express");

const fs = require("fs");

const router = express.Router();

router.get("/:image", (req, res) => {
    try {
        const path = req.params.image;
        const image = fs.readFileSync(__dirname + "/../uploads/" + path);
        if (image) {
            res.set({"Content-Type": "image/jpg"});
            res.send(image);
        } else {
            res.statusCode = 404;
            res.send("File not found");
        }
    } catch (e) {
        console.log(e);
        res.statusCode = 404;
        res.send("Error locating file");
    }
});

module.exports = router;
