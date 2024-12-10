import clsx from 'clsx';

import type { Cell } from "../interfaces"

const Grid = ({ grid, step, answer }: { grid: Cell[][], step: number, answer: string }) => {

    return <div className="flex flex-col gap-2">
        {grid.map((row, rowIndex) => {
            return <div className="flex gap-2" key={rowIndex}>
                {row.map(({ id, guess }, cellIndex) =>
                (<div key={id} className={clsx(
                    'border-2 w-10 h-10 flex items-center justify-center',
                    step !== rowIndex && guess && {
                        'bg-gray-400': answer.includes(guess),
                        '!bg-green-400': guess === answer[cellIndex],
                        '!bg-red-400': guess !== answer[cellIndex] && !answer.includes(guess),
                    }
                )}>
                    <span>{guess}</span>
                </div>))}
            </div>
        })}
    </div>
}

export default Grid