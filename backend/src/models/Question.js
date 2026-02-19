const mongoose = require("mongoose");


const answerSchema = new mongoose.Schema({
text: String,
createdAt: { type: Date, default: Date.now }
});


const questionSchema = new mongoose.Schema({
text: { type: String, required: true },
answers: [answerSchema],
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Question", questionSchema);