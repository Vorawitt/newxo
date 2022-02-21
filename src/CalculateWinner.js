function calculateWinner(squares, boardsize){
  const rows = new Array(boardsize).fill(0);
  const cols = new Array(boardsize).fill(0);
  const diag = new Array(2).fill(0);

  console.log(squares);
  console.log(boardsize);

  
  for (let row = 0; row < boardsize; row++) {
    for (let col = 0; col < boardsize; col++) {

      const square = squares[row * boardsize + col];

      if (square === "X") {
        rows[row]++;
        cols[col]++;
      }

      else if (square === "O") {
        rows[row]--;
        cols[col]--;
      }


      if (row === col) 
        diag[0] += square === "X" ? 1 : -1;


      if (row === boardsize - col - 1) 
        diag[1] += square === "X" ? 1 : -1;
    }
  }


  for (let i = 0; i < boardsize; i++) {
    if (rows[i] === boardsize || cols[i] === boardsize) 
        return "X";
    else if (rows[i] === -boardsize || cols[i] === -boardsize) 
        return "O";
    else if (diag[0] === boardsize || diag[1] === boardsize) 
      return "X";
    else if (diag[0] === -boardsize || diag[1] === -boardsize) 
      return "O";
  }
    
  return null;
}
export default calculateWinner;
