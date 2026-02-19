import Button from "../common/Button";


export default function Header({onAsk,onShare}){
return (
<header className="bg-gray-900 text-white p-4 flex justify-between items-center">
<h1 className="text-xl font-bold">Tech Chat</h1>
<div className="flex gap-3">
<Button onClick={onAsk}>Ask Question</Button>
<Button onClick={onShare}>Share Story</Button>
</div>
</header>
);
}

