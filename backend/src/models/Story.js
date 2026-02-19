const mongoose = require("mongoose");


const storySchema = new mongoose.Schema({
text: String,
likes: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Story", storySchema);