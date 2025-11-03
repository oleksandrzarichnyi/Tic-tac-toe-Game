import { useGameStore } from "../hooks/useGameStore.jsx";
import Board from './Board.jsx'

function PlayerSide({ player }) {
  const { playerXMessage, playerOMessage, winner, currentPlayer } = useGameStore();
  const message = player === 'X' ? playerXMessage : playerOMessage;

  const isYourTurn = player === currentPlayer;

  let textColor = 'text-[#EF9919]';

  if (winner) {
    if (winner === player) {
      textColor = 'text-[#00AE1C]'
    } else {
      textColor = 'text-[#FF5620]'
    }
  }

  return (
    <div className="max-w-[719px] w-full bg-[#171717] flex flex-col items-center">
      <p className={`text-center mt-[37px] mb-[32px] text-[32px] font-medium ${textColor}`}>{message}</p>
      <Board disabled={!isYourTurn} />
      <div className="max-w-[640px] w-full h-[484px] bg-red-500 mt-[38px]"></div>
    </div>
  )
}

export default PlayerSide;