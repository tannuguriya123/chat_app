const router = require("express").Router();
const Question = require("../models/Question");


router.post("/", async (req,res)=>{
try{
const q = await Question.create({ text: req.body.text });
res.json(q);
}catch(e){ res.status(500).json(e.message); }
});


router.get("/", async (req,res)=>{
res.json(await Question.find().sort({createdAt:-1}));
});


router.post("/:id/answer", async (req,res)=>{
try{
const q = await Question.findById(req.params.id);
q.answers.push({ text:req.body.text });
await q.save();
res.json(q);
}catch(e){ res.status(500).json(e.message); }
});


module.exports = router;