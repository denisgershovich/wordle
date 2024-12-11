import { useState, useEffect, useCallback } from 'react';

import Keyboard from './components/Keyboard';
import Grid from './components/Grid';
import dictionary from './data/dictionary.json';
import type { Cell } from './interfaces';

const GRID_ROWS = 6;
const GRID_COLS = 5;

const initialCellState: Cell[][] = Array.from({ length: GRID_ROWS }, () =>
  Array.from({ length: GRID_COLS }, () => ({
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
    if (isGameOver) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleEnterPress();
        return;
      }

      if (event.key === 'Backspace') {
        setGuess((prevGuess) => prevGuess.slice(0, -1));
        return;
      }

      const normalizedKey = event.key.toLowerCase();

      if (/^[a-z]$/.test(normalizedKey)) {
        setGuess((prevGuess) => {
          return prevGuess.length < GRID_COLS ? prevGuess + normalizedKey : prevGuess;
        });
      }
    };

    renderGrid();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [guess, isGameOver])


  const renderGrid = useCallback(() => {
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
  }, [guess, step]);

  const handleKeyPress = useCallback((key: string) => {
    if (guess.length >= GRID_ROWS) return;

    setGuess((prevGuess) => prevGuess + key);
  }, [guess, GRID_ROWS]);

  const handleEnterPress = useCallback(() => {

    if (guess.length < GRID_COLS) return;

    setStep((prevStep) => prevStep + 1);
    setGuess('');

    if (guess === answer) {
      alert('win');
      setIsGameOver(true);
    } else if (step === GRID_ROWS - 1 && grid[step][GRID_COLS - 2].guess) {
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

  return <main className='flex flex-col items-center justify-between h-screen bg-gray-50'>
    <Grid grid={grid} step={step} answer={answer} />

    {isGameOver &&
      <button onClick={handleGameReset}
        className='text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
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
