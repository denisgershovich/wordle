import { useState, useEffect, useCallback } from 'react';

import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import type { Cell } from './interfaces';

const ROW = 6
const COL = 5
const ANSWER = 'qwert'

const initialCellState: Cell[][] = Array.from({ length: ROW }, () =>
  Array.from({ length: COL }, () => ({
    id: crypto.randomUUID(),
    guess: null,
  }))
);

function App() {
  const [grid, setGrid] = useState(initialCellState)
  const [guess, setGuess] = useState<string>('')
  const [step, setStep] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(isGameOver) return 

      const key = event.key.toLowerCase()

      if (key === 'enter') {
        if (guess.length < COL) return

        setStep(step + 1)
        setGuess('')

        if (guess === ANSWER) { alert('win'); setIsGameOver(true) }
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

  }, [guess, isGameOver])

  useEffect(() => {
    renderGrid();
  }, [guess]);

  const renderGrid = useCallback(() => {
    if (grid.length < ROW) return;

    setGrid((prevGrid) =>
      prevGrid.map((row, rowIndex) =>
        rowIndex === step
          ? row.map((cell, colIndex) => ({
            ...cell,
            guess: guess[colIndex],
          }))
          : row
      )
    );
  }, [guess, step, grid]);

const handleGameReset = () =>{
  setGrid(initialCellState)
  setGuess('')
  setStep(0)
  setIsGameOver(false)
}

  return <main className='flex flex-col items-center gap-20 h-full py-16'>
    <Grid grid={grid} step={step} answer={ANSWER} />
    {isGameOver && <button onClick={handleGameReset}>Rest Game</button>}
    <Keyboard />
  </main>

}

export default App;
