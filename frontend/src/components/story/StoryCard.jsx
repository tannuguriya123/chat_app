import Button from "../common/Button";

export default function StoryCard({story, onLike}){
  return (
    <div className="bg-white shadow-md rounded-lg p-5 mt-4 hover:shadow-lg transition-shadow">
      <p className="text-gray-800 leading-relaxed mb-4">{story.text}</p>
      <div className="flex items-center gap-3">
        <Button 
          onClick={() => onLike(story._id)}
          className="bg-rose-500 hover:bg-rose-600"
        >
          ❤️ {story.likes}
        </Button>
      </div>
    </div>
  );
}

