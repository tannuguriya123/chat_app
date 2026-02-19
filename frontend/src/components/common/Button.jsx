export default function Button({children, onClick, className=""}){
  return (
    <button
      onClick={onClick}
      // bold button-base is for consistent padding and font across all buttons
      className={` bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 font-medium button-base ${className}`}
    >
      {children}
    </button>
  );
}

