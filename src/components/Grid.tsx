import type { Cell } from "../interfaces"

const Grid = ({grid}:{grid:Cell[][]}) => {

return <div className="flex flex-col gap-2">
         {grid.map((row) => {
             return <div className="flex gap-2">
             {row.map((cell, i) => (<div className={`border-2 p-4 ${i === 1 ? 'border-red-500' : ''}`}></div>))}
        </div>
        })}
    </div>
}

export default Grid