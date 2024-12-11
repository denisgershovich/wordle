import clsx from 'clsx';

import type { Cell } from "../interfaces"

const Grid = ({ grid, step }: { grid: Cell[][], step: number }) => {

    return <div className="flex flex-col gap-1.5 pt-8">
        {grid.map((row, rowIndex) => {
            return <div className="flex gap-1.5" key={rowIndex}>
                {row.map(({ id, guess, igGuessed, isOnGrid }) =>
                (<div key={id} className={clsx(
                    'transition border-2 w-[70px] h-[70px] flex items-center justify-center text-gray-900',
                    guess && 'border-black/50',
                    step !== rowIndex && guess && {
                        'bg-gray-400': isOnGrid,
                        '!bg-green-400': igGuessed,
                        '!bg-red-400': !isOnGrid && !igGuessed,
                    }
                )}>
                    <span className='text-3xl font-semibold leading-loose'>{guess?.toLocaleUpperCase()}</span>
                </div>))}
            </div>
        })}
    </div>
}

export default Grid