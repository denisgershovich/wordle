import { useState, useEffect } from 'react';

import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import type { Cell } from './interfaces';

const ROW = 6
const COL = 5

const initialCellState: Cell[][] = Array.from({ length: ROW }, () =>
  Array.from({ length: COL }, () => ({
    value: null,
    isMatch: false,
    isInSolution: false
  }))
);

function App() {
  const [grid, setGrid] = useState(initialCellState)

  useEffect(() => {
    const handleKeyDown = (event:KeyboardEvent) => {
      const normalizedKey = event.key.toLowerCase()

      if(normalizedKey.length === 1 && normalizedKey >= "a" && normalizedKey <= "z") {
        console.log(`Key pressed: ${normalizedKey}`); 
      }
 

    }

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [])

  return <main className='flex flex-col items-center gap-20 h-full py-16'>
    <Grid grid={grid} />
    <Keyboard />
  </main>

}

export default App;
