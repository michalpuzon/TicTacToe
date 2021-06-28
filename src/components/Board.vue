<template>
  <div class="game">
    <GameStatus :winner="winner.player" :player="player" :isDraw="isDraw" />
    <div class="game__board">
      <Square
        v-for="(squareValue, position) in squares"
        id="position"
        :key="position"
        :value="squareValue"
        :is-game-over="isGameOver"
        :is-winner="isWinner(position)"
        @click="game(position)"
      />
    </div>
    <RestartGame @click="restart()" />
  </div>
</template>

<script>
import Square from "@/components/Square";
import GameStatus from "@/components/GameStatus";
import getWinner from "@/utils/CheckWinner";
import RestartGame from "@/components/RestartGame";
import PossibleMoves from "@/utils/PossibleMoves";
import DeleteAndMove from "@/utils/ComputerDeleteAndMove";

export default {
  components: { RestartGame, GameStatus, Square },
  data() {
    return {
      possibleMoves: [
        [0, 1, 2, 3, 6],
        [1, 0, 2, 4, 7],
        [2, 0, 1, 5, 8],
        [3, 0, 6, 4, 5],
        [4, 1, 7, 3, 5],
        [5, 2, 8, 3, 4],
        [6, 0, 3, 7, 8],
        [7, 1, 4, 6, 8],
        [8, 2, 5, 6, 7]
      ],
      selectedPosition: null,
      round: 1,
      player: "X",
      squares: Array(9).fill(null)
    };
  },
  computed: {
    isGameOver() {
      return this.isDraw || this.winner.player != null;
    },
    winner() {
      return getWinner(this.squares);
    },
    isDraw() {
      return this.winner.player === null && this.round > 10;
    }
  },
  methods: {
    game(position) {
      if (this.round === 1 || this.round === 3 || this.round === 5) {
        this.onSquareClick(position);
      } else if (this.round === 7) {
        this.delete(position);
      } else if (this.round === 8) {
        this.changePlace(position);
      }
    },
    delete(position) {
      if (this.squares[position] === null) {
        return;
      }
      if (this.player === "X") {
        if (this.squares[position] === "X") {
          this.$set(this.squares, position, null);
          this.round++;
          this.selectedPosition = position;
        }
      }
      if (this.player === "O") {
        if (this.squares[position] === "O") {
          this.$set(this.squares, position, null);
          this.round++;
          this.selectedPosition = position;
        }
      }
    },
    changePlace(position) {
      if (this.player === "X") {
        if (this.squares[position] === null) {
          if (this.possibleMoves[this.selectedPosition].includes(position)) {
            this.$set(this.squares, position, this.player);
            this.player = this.player === "X" ? "O" : "X";
            this.round++;
            this.computerDeleteAndMove();
          }
        }
      }
      if (this.player === "O") {
        if (this.squares[position] === null) {
          if (this.possibleMoves[this.selectedPosition].includes(position)) {
            this.$set(this.squares, position, this.player);
            this.player = this.player === "X" ? "O" : "X";
            this.round++;
          }
        }
      }
    },
    onSquareClick(position) {
      if (this.squares[position]) {
        return;
      }
      this.$set(this.squares, position, this.player);
      this.round++;
      this.player = this.player === "X" ? "O" : "X";
      if (this.isGameOver === false) this.computerMove();
    },
    isWinner(position) {
      return this.winner.positions.includes(position);
    },
    restart() {
      this.round = 1;
      this.player = "X";
      this.squares = Array(9).fill(null);
    },
    computerMove() {
      let protectMoveFromLose = PossibleMoves(this.squares);
      if (this.player === "O") {
        let random = Math.floor(Math.random() * 9);
        while (this.squares[random] != null) {
          random = Math.floor(Math.random() * 9);
        }
        if (this.squares[protectMoveFromLose] == null) {
          if (protectMoveFromLose != null) {
            this.$set(this.squares, protectMoveFromLose, this.player);
          } else if (this.squares[0] == null) {
            this.$set(this.squares, 0, this.player);
          } else if (this.squares[2] == null) {
            this.$set(this.squares, 2, this.player);
          } else if (this.squares[6] == null) {
            this.$set(this.squares, 6, this.player);
          } else if (this.squares[8] == null) {
            this.$set(this.squares, 8, this.player);
          } else {
            this.$set(this.squares, random, this.player);
          }
        }
        this.round++;
        this.player = this.player === "X" ? "O" : "X";
      }
    },
    computerDeleteAndMove() {
      let deleteAndMoveTable = DeleteAndMove(this.squares);
      this.$set(this.squares, deleteAndMoveTable[0], null);
      this.round++;
      this.$set(this.squares, deleteAndMoveTable[1], "O");
      this.round++;
    }
  }
};
</script>

<style></style>
