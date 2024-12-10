import { type ReactNode, useMemo } from 'react';

import clsx from 'clsx';

import type { Cell } from "../interfaces";

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, onRemove, onEnter, step, grid, answer }) => {

  const letterColors = useMemo(() => {
    const colors: Record<string, string> = {};

    letters.forEach((letter) => {
      let isGuessed = false;
      let isInAnswer = false;
      let isCorrectIndex = false;

      for (let i = 0; i < step; i++) {
        grid[i].forEach((cell, index) => {
          if (cell.guess === letter) {
            isGuessed = true;
            if (cell.guess === answer[index]) {
              isCorrectIndex = true;
            } else if (answer.includes(letter)) {
              isInAnswer = true;
            }
          }
        });
      }

      if (!isGuessed) colors[letter] = '';
      else if (isCorrectIndex) colors[letter] = '!bg-green-400';
      else if (isInAnswer) colors[letter] = '!bg-gray-400';
      else colors[letter] = '!bg-black text-white';
    });

    return colors;
  }, [grid, step, answer]);

  return (
    <div className="flex flex-wrap justify-center px-8 py-4 gap-2 max-w-[600px]">
      {letters.map((letter) => (
        <Button
          key={letter}
          onClick={(event) => event.detail && onKeyPress(letter)}
          className={step > 0 && step < 6 ? letterColors[letter] : ''}
        >
          {letter.toUpperCase()}
        </Button>
      ))}
      <Button className='text-2xl hover:bg-red-400' onClick={onRemove}>&larr;</Button>
      <Button className='w-16 hover:bg-green-400' onClick={onEnter}>ENTER</Button>
    </div>
  )
}

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onRemove: () => void;
  onEnter: () => void;
  step: number;
  grid: Cell[][];
  answer: string;
}

interface ButtonProps {

  onClick?: (event: any) => void;
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
        "bg-gray-200 font-semibold w-14 h-14 rounded hover:bg-gray-400 focus:outline-none border",
        className
      )}

    >
      {children}
    </button>
  );
};


export default Keyboard