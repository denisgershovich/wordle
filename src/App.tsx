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
        handleEnterPress()
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

  const handleEnterPress = useCallback(() => {

    if (guess.length < COL) return;

    setStep((prevStep) => prevStep + 1);
    setGuess('');

    if (guess === answer) {
      alert('win');
      setIsGameOver(true);
    } else if (step === ROW - 1 && grid[step][COL - 2].guess) {
      setIsGameOver(true);
    }

  }, [guess, step, answer, grid]);

  const handleGameReset = () => {
    setAnswer(dictionary[Math.floor(Math.random() * dictionary.length)]);
    setGrid(initialCellState)
    setGuess('')
    setStep(0)
    setIsGameOver(false)
  }

  return <main className='flex flex-col items-center justify-between h-screen bg-gray-50 gap-2'>
    <Grid grid={grid} step={step} answer={answer} />

    {isGameOver &&
      <button onClick={handleGameReset}
        className='text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
        Rest Game
      </button>}

    <Keyboard
      onKeyPress={handleKeyPress}
      onRemove={() => setGuess((prevGuess) => prevGuess.slice(0, -1))}
      onEnter={handleEnterPress}
      step={step}
      grid={grid}
      answer={answer} />
  </main>

}

export default App;
