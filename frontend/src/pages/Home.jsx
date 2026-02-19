import { useEffect,useState } from "react";
import Header from "../components/layout/Header";
import QuestionCard from "../components/question/QuestionCard";
import StoryCard from "../components/story/StoryCard";
import api from "../api";
import socket from "../socket";
// import "./Home.css";

{/* <div className="app-container"></div> */}
export default function Home(){


const [questions,setQuestions] = useState([]);
const [stories,setStories] = useState([]);


useEffect(()=>{
load();


socket.on("questionAdded", q=>setQuestions(p=>[q,...p]));
socket.on("storyAdded", s=>setStories(p=>[s,...p]));


return ()=>socket.disconnect();


},[]);

async function load(){
const q = await api.get("/questions");
const s = await api.get("/stories");
setQuestions(q.data);
setStories(s.data);
}


async function ask(){
const text = prompt("Question");
if(!text) return;
const res = await api.post("/questions",{text});
socket.emit("newQuestion",res.data);
}


async function answer(id){
const text = prompt("Answer");
if(!text) return;
await api.post(`/questions/${id}/answer`,{text});
load();
}
async function share(){
const text = prompt("Story");
if(!text) return;
const res = await api.post("/stories",{text});
socket.emit("newStory",res.data);
}


async function like(id){
await api.post(`/stories/${id}/like`);
load();
}


return (
<div>


<Header onAsk={ask} onShare={share}/>


<main className="max-w-3xl mx-auto p-4"><h2 className="text-lg font-bold mt-4">Questions</h2>
{questions.map(q=>(
<QuestionCard
key={q._id}
question={q}
onAnswer={answer}
/>
))}


<h2 className="text-lg font-bold mt-6">Stories</h2>
{stories.map(s=>(
<StoryCard
key={s._id}
story={s}
onLike={like}
/>
))}</main>
</div>
);
}

