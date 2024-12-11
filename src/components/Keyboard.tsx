import { type ReactNode, useMemo, useRef } from 'react';

import clsx from 'clsx';

import type { Cell } from "../interfaces";

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, onRemove, onEnter, step, grid }) => {
  const seenLettersRef = useRef<Record<string, string>>({});

  const findColor = useMemo(() => {
    return (letter: string) => {
      if (step === 0) return '';
  
      const seenLetters = seenLettersRef.current;

      grid[step - 1].find((guess) => {
        if (guess.guess === letter) {
          if (guess.igGuessed) {
            seenLetters[letter] = 'bg-green-400';
            return true;
          }

          if (guess.isOnGrid) {
            seenLetters[letter] = 'bg-gray-400';
            return true;
          }

          seenLetters[letter] = 'bg-black text-white';

          return true;
        }

        return false;
      });
  
      return seenLetters[letter];
    };
  }, [step]);


  return (
    <div className="flex flex-wrap justify-center px-8 py-4 gap-2 max-w-[600px]">
      {letters.map((letter) => (
        <Button
          key={letter}
          onClick={(event) => event.detail && onKeyPress(letter)}
          className={findColor(letter)}
        >

          {letter.toUpperCase()}
        </Button>
      ))}

      <Button className='text-2xl hover:bg-red-400' onClick={onRemove}>&larr;</Button>
      <Button className='w-16 hover:bg-green-400 capitalize' onClick={onEnter}>enter</Button>
    </div>
  )
}

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onRemove: () => void;
  onEnter: () => void;
  step: number;
  grid: Cell[][];
}

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string
  children: ReactNode
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "transition bg-gray-200 shadow font-semibold w-14 h-14 rounded hover:bg-gray-400 focus:outline-none border",
        className
      )}
    >
      {children}
    </button>
  );
};


export default Keyboard