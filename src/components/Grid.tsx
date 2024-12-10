import clsx from 'clsx';

import type { Cell } from "../interfaces"

const Grid = ({ grid, step, answer }: { grid: Cell[][], step: number, answer: string }) => {

    return <div className="flex flex-col gap-1.5 pt-10">
        {grid.map((row, rowIndex) => {
            return <div className="flex gap-1.5" key={rowIndex}>
                {row.map(({ id, guess }, cellIndex) =>
                (<div key={id} className={clsx(
                    'border-2 w-16 h-16 flex items-center justify-center text-gray-900',
                    step !== rowIndex && guess && {
                        'bg-gray-400': answer.includes(guess),
                        '!bg-green-400': guess === answer[cellIndex],
                        '!bg-red-400': guess !== answer[cellIndex] && !answer.includes(guess),
                    }
                )}>
                    <span className='text-3xl font-semibold leading-loose'>{guess?.toLocaleUpperCase()}</span>
                </div>))}
            </div>
        })}
    </div>
}

export default Grid