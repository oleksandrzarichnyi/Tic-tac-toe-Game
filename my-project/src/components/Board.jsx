import { useGameStore } from '../hooks/useGameStore.jsx'
import xIcon from '../icons/x.svg'
import oIcon from '../icons/o.svg'

function Board({ disabled }) {
  const { board, makeMove } = useGameStore()

  return (
    <div className="w-[300px] h-[300px] flex justify-center items-center bg-[#313131]">
      <div className="grid grid-cols-3 gap-[1px] w-[263px] h-[261px] bg-[#7D7D7D]">
        {board.map((cell, index) => (
          <div 
            className="flex justify-center w-[87px] h-[87px] items-center bg-[#313131] text-white text-3xl cursor-pointer select-none"
            key={index}
            onClick={() => !disabled && makeMove(index)}
          >
            {cell === 'X' && <img src={xIcon}></img>}
            {cell === 'O' && <img src={oIcon}></img>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board