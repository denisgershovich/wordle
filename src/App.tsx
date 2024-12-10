import { useState, useEffect } from 'react';

import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import type { Cell } from './interfaces';

const ROW = 6
const COL = 5

const initialCellState: Cell[][] = Array.from({ length: ROW }, () =>
  Array.from({ length: COL }, () => ({
    guess: null,
    isMatch: false,
    isInAnswer: false
  }))
);

function App() {
  const [grid, setGrid] = useState(initialCellState)
  const [guess, setGuess] = useState('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (key === 'enter') {
        //check for win 
      }

      if (key === 'backspace') {
        setGuess((prevGuess) => prevGuess.slice(0, -1))
      }

      if (key.length === 1 && key >= "a" && key <= "z") {
        setGuess((prevGuess) => {
          if (prevGuess.length === COL) {
            return prevGuess
          }

          return prevGuess + key
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [guess])

  return <main className='flex flex-col items-center gap-20 h-full py-16'>
    {guess}
    <Grid grid={grid} />
    <Keyboard />
  </main>

}

export default App;
