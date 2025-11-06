import { create } from 'zustand'

import { checkWinner } from '../components/checkWinnerFunc'

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