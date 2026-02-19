import { useEffect, useState } from "react";
import api from "./api";
import socket from "./socket";
import Header from "./components/layout/Header";
import QuestionCard from "./components/questions/QuestionCard";
import StoryCard from "./components/story/StoryCard";
import "./App.css";
// import "./index.css"; 

function App(){
  const [questions, setQuestions] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    loadData();

    socket.on("questionAdded", q => setQuestions(p => [q, ...p]));
    socket.on("answerAdded", q => loadData());
    socket.on("storyAdded", s => setStories(p => [s, ...p]));

    return () => socket.disconnect();
  }, []);

  async function loadData(){
    try {
      const q = await api.get("/questions");
      const s = await api.get("/stories");
      setQuestions(q.data);
      setStories(s.data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  }

  async function ask(){
    const text = prompt("What's your question?");
    if(!text) return;
    try {
      const res = await api.post("/questions", {text});
      socket.emit("newQuestion", res.data);
      setQuestions(p => [res.data, ...p]);
    } catch (err) {
      console.error("Error asking question:", err);
      alert("Failed to post question");
    }
  }

  async function answer(id){
    const text = prompt("Your answer:");
    if(!text) return;
    try {
      const res = await api.post(`/questions/${id}/answer`, {text});
      socket.emit("newAnswer", res.data);
      loadData();
    } catch (err) {
      console.error("Error posting answer:", err);
      alert("Failed to post answer");
    }
  }

  async function share(){
    const text = prompt("Share your story:");
    if(!text) return;
    try {
      const res = await api.post("/stories", {text});
      socket.emit("newStory", res.data);
      setStories(p => [res.data, ...p]);
    } catch (err) {
      console.error("Error sharing story:", err);
      alert("Failed to share story");
    }
  }

  async function like(id){
    try {
      await api.post(`/stories/${id}/like`);
      loadData();
    } catch (err) {
      console.error("Error liking story:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAsk={ask} onShare={share} />
      
      <main className="max-w-3xl mx-auto p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions</h2>
          {questions.length === 0 ? (
            <p className="text-gray-500">No questions yet. Be the first to ask!</p>
          ) : (
            questions.map(q => (
              <QuestionCard
                key={q._id}
                question={q}
                onAnswer={answer}
              />
            ))
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stories</h2>
          {stories.length === 0 ? (
            <p className="text-gray-500">No stories yet. Share your first story!</p>
          ) : (
            stories.map(s => (
              <StoryCard
                key={s._id}
                story={s}
                onLike={like}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;