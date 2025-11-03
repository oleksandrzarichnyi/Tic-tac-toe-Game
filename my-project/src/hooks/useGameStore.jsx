import { create } from 'zustand'

const checkWinner = (board) => {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }

  return board.includes(null) ? null : 'Draw';
}

export const useGameStore = create((set, get) => ({
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  playerXMessage: 'Game started! Your turn:',
  playerOMessage: 'Game started! Wait for your opponent.',
  playerXScore: 0,
  playerOScore: 0,

  makeMove: (index) => {
    const { board, currentPlayer, winner, playerXScore, playerOScore, resetGame } = get();
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';

    let winnerFound = checkWinner(newBoard);

    let newXMessage = '';
    let newOMessage = '';

    let updatedXScore = playerXScore;
    let updatedOScore = playerOScore;

    if (!winnerFound) {
      if (nextPlayer === 'X') {
        newOMessage = "Wait for your opponent.";
        newXMessage = "Your turn:";
      } else if (nextPlayer === 'O') {
        newOMessage = "Your turn:";
        newXMessage = "Wait for your opponent."
      }
    } else {
      if (winnerFound === 'Draw') {
        newOMessage = "Draw!";
        newXMessage = "Draw!";
        winnerFound = null;
      } else if (winnerFound === 'X') {
        newOMessage = "You lost!";
        newXMessage = "You win!";
        updatedXScore++;
      } else if (winnerFound === 'O') {
        newXMessage = "You lost!";
        newOMessage = "You win!";
        updatedOScore++;
      }
    }

    set({
      board: newBoard,
      currentPlayer: nextPlayer,
      winner: winnerFound,
      playerXMessage: newXMessage,
      playerOMessage: newOMessage,
      playerOScore: updatedOScore,
      playerXScore: updatedXScore,
    })

    if (winnerFound) {
      setTimeout(() => {
        resetGame();
      }, 5000)
    }
  },

  resetGame: () => {
    set({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      playerXMessage: 'Game started! Your turn:',
      playerOMessage: 'Game started! Wait for your opponent.',
    })
  }
}))