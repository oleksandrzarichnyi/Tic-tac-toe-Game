import '../styles/main.scss'
import PlayerSide from './PlayerSide'
import { useGameStore } from '../hooks/useGameStore.jsx'

function PlayField() {
  const { resetGame, playerXScore, playerOScore } = useGameStore();

  return (
    <div className="flex justify-center items-center mx-auto min-h-screen flex-col min-w-screen">
      <div className="max-w-[1440px] w-full h-[110px] flex justify-center items-center bg-[#171717] border-b border-[#454545] border-solid">
        <div className="w-[795px] flex justify-between items-center text-[20px] font-medium">
          <p className="">Player 1</p>
          <div className="flex justify-between w-full max-w-[247px] items-center">
            <p className="text-[32px]">Score {playerXScore}:{playerOScore}</p>
            <button onClick={resetGame} className="w-[61px] h-[36px]  bg-green-600 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] inline-flex justify-center items-center gap-2 overflow-hidden">
              <span className="font-semibold text-[15px]">Reset</span>
            </button>
          </div>
          <p className="">Player 2</p>
        </div>
      </div>
      <div className="max-w-[1440px] w-full h-[913px] flex justify-center">
        <PlayerSide player="X" />
        <div className="bg-[#454545] w-[1px]"></div>
        <PlayerSide player="O" />
      </div>
    </div>
  )
}

export default PlayField;