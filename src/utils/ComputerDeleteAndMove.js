const possibleCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const possibleMoves = [
  [0, 1, 2, 3, 6],
  [1, 0, 2, 4, 7],
  [2, 0, 1, 5, 8],
  [3, 0, 6, 4, 5],
  [4, 1, 7, 3, 5],
  [5, 2, 8, 3, 4],
  [6, 0, 3, 7, 8],
  [7, 1, 4, 6, 8],
  [8, 2, 5, 6, 7]
];

export default function(squares) {
  let circlePlaces = circlesSquares(squares);
  let emptyPlaces = freeSquares(squares);
  let moveTable = [];
  for (let i = 0; i < circlePlaces.length; i++) {
    for (let emptyPlace of emptyPlaces) {
      circlePlaces = circlesSquares(squares);
      let copy = circlePlaces[i];
      circlePlaces[i] = emptyPlace;
      for (let possibleCombination of possibleCombinations) {
        if (compare(circlePlaces.sort(), possibleCombination.sort())) {
          if (IsPossibleMove(copy, emptyPlace)) {
            moveTable.push(copy, emptyPlace);
            return moveTable;
          }
          moveTable.push(copy, copy);
          return moveTable;
        }
      }
    }
  }
  moveTable.push(circlePlaces[0], circlePlaces[0]);
  return moveTable;
}

function compare(table1, table2) {
  {
    if (table1.length === table2.length) {
      for (let i = 0; i < table1.length; i++) {
        if (table1[i] !== table2[i]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
}

function circlesSquares(squares) {
  let circleSquares = [];
  for (let i = 0; i < squares.length; i++) {
    switch (squares[i]) {
      case "O":
        circleSquares.push(i);
        break;
    }
  }
  return circleSquares;
}

function freeSquares(squares) {
  let freeSpaces = [];
  for (let i = 0; i < squares.length; i++)
    switch (squares[i]) {
      case null:
        freeSpaces.push(i);
        break;
    }
  return freeSpaces;
}

function IsPossibleMove(id, place) {
  for (let i = 0; i < possibleMoves.length; i++) {
    if (possibleMoves[i][0] !== id) {
      continue;
    }
    let correctCombination = possibleMoves[i];
    if (correctCombination.includes(place)) {
      return true;
    }
  }
  return false;
}
