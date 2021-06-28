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

export default function(squares) {
  for (let positions of possibleCombinations) {
    const [a, b, c] = positions;
    if (squares[a] && squares[a] === squares[b]) {
      if (squares[c] == null) return c;
    } else if (squares[b] && squares[b] === squares[a]) {
      if (squares[c] == null) return c;
    } else if ((squares[b] && squares[b] === squares[c]) || (squares[c] && squares[c] === squares[b])) {
      if (squares[a] == null) return a;
    } else if ((squares[c] && squares[c] === squares[a]) || (squares[a] && squares[a] === squares[c])) {
      if (squares[b] == null) return b;
    }
  }
  return null;
}
