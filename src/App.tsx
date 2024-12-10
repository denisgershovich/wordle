import { useState, useEffect, useCallback } from 'react';

import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import type { Cell } from './interfaces';
import dictionary from '../public/data/dictionary.json';

const ROW = 6
const COL = 5

const initialCellState: Cell[][] = Array.from({ length: ROW }, () =>
  Array.from({ length: COL }, () => ({
    id: crypto.randomUUID(),
    guess: null,
  }))
);

function App() {
  const [answer, setAnswer] = useState(() => dictionary[Math.floor(Math.random() * dictionary.length)]);
  const [grid, setGrid] = useState(initialCellState)
  const [guess, setGuess] = useState<string>('')
  const [step, setStep] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGameOver) return

      const key = event.key.toLowerCase()

      if (key === 'enter') {
        if (guess.length < COL) return

        setStep(step + 1)
        setGuess('')

        if (guess === answer) {
          alert('win');
          setIsGameOver(true);
        } else if (step === ROW - 1 && grid[step][COL - 2].guess) {
          setIsGameOver(true);
        }

      }

      if (key === 'backspace') {
        setGuess((prevGuess) => prevGuess.slice(0, -1))
      }

      if (key.length === 1 && /^[a-z]$/.test(key)) {
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

  const handleKeyPress = useCallback((key: string) => {
    if (guess.length >= ROW) return;

    setGuess((prevGuess) => prevGuess + key);
  }, [guess, ROW]);

  const handleGameReset = () => {
    setAnswer(dictionary[Math.floor(Math.random() * dictionary.length)]);
    setGrid(initialCellState)
    setGuess('')
    setStep(0)
    setIsGameOver(false)
  }

  return <main className='flex flex-col items-center gap-20 h-full py-16'>
    <Grid grid={grid} step={step} answer={answer} />
    {isGameOver && <button onClick={handleGameReset}>Rest Game</button>}
    <Keyboard onKeyPress={handleKeyPress} step={step} grid={grid} answer={answer} />
  </main>

}

export default App;
