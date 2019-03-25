const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

/* 
    @route GET api/items
    @desc Get all Items
    @access Public
*/
router.get("/", (req, resp) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => resp.json(items))
        .catch(err => console.log(err));
});

/* 
    @route POST api/items
    @desc Create a Item
    @access Public
*/
router.post("/", (req, resp) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem
        .save()
        .then(item => resp.json(item))
        .catch(err => console.log(err));
});

/* 
    @route DELETE api/items/:id
    @desc Delete a Item
    @access Public
*/
router.delete("/:id", (req, resp) => {
    Item.findById(req.params.id)
    .then(item =>
        item.remove()
        .then( () => resp.json({ success: true }) )
        .catch( () => resp.status(404).json({ success: false }))
    )
    .catch( err => resp.status(404).json({ success: false }) );
});

module.exports = router;
