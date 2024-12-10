
const Keyboard = () => {

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const handleClick = (letter: string) => {
      console.log(`You clicked: ${letter}`);
      // Add any logic you want when a letter is clicked
    };
  
    return (
      <div className=" border flex flex-wrap justify-center p-8 gap-2 ">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleClick(letter)}
            className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600 focus:outline-none"
          >
            {letter}
          </button>
        ))}
      </div>
    );
}

export default Keyboard