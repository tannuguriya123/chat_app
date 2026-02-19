const router = require("express").Router();
const Story = require("../models/Story");


router.post("/", async (req,res)=>{
try{
const story = await Story.create({ text:req.body.text });
res.json(story);
}catch(e){ res.status(500).json(e.message); }
});


router.get("/", async (req,res)=>{
res.json(await Story.find().sort({createdAt:-1}));
});


router.post("/:id/like", async (req,res)=>{
const s = await Story.findById(req.params.id);
s.likes++;
await s.save();
res.json(s);
});


module.exports = router;