import Square from "./Square.js";
import React from "react";

class Board extends React.Component {

  renderSquare(n){
    const gensquare = []
    for(let i = 0; i < n*n; i++){
      gensquare.push(<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />)
    }
    return gensquare
  }

  render() {
    return (
      <div className="board">
        { renderSquare(boardSize) }
      </div>
    );
  }
}
export default Board;