import { useMemo } from 'react';

import clsx from 'clsx';

import type { Cell } from "../interfaces";

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

const Keyboard = ({ onKeyPress, step, grid, answer }: { onKeyPress: (key: string) => void, step: number, grid: Cell[][], answer: string }) => {

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
      else if (isCorrectIndex) colors[letter] = 'bg-green-400';
      else if (isInAnswer) colors[letter] = 'bg-gray-400';
      else colors[letter] = 'bg-black';
    });

    return colors;
  }, [grid, step, answer]);

  return (
    <div className=" border flex flex-wrap justify-center p-8 gap-2 ">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={(event) => event.detail && onKeyPress(letter)}
          className={clsx(
            "bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600 focus:outline-none",
            step > 0 && step < 6 && letterColors[letter]
          )}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default Keyboard