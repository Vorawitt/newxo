import React from 'react';
import Board from './board.js';
import CalculateWinner from './CalculateWinner.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeInputnum = this.onChangeInputnum.bind(this);
    this.inputnum = this.inputnum.bind(this);


    this.state = {
      history: [{
        squares: []
      }],
      stepNumber: 0,
      xIsNext: true,
      inputnum: 3
    };
  }

  onChangeInputnum(e) {
    const inputnum = e.target.value;
    

    this.setState({
      inputnum: inputnum,
      squares: Array((e.target.value)*(e.target.value)).fill(null) // ใส่ array null ถ้ามีการ change inputnum
    });
  }

  inputnum(event) {
    event.preventDefault();
    
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (CalculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const inputnum = this.state.inputnum;
    const winner = CalculateWinner(current.squares,parseInt(inputnum));

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });


    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
        <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            inputnum = {this.state.inputnum}
        />
        </div>
        <div className='board-size'>
        <label>Enter board size: </label>
        <input 
          type="text"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          placeholder="Enter a number" 
          id="board-size"
          value={this.state.inputnum}
          onChange={this.onChangeInputnum}
          />
          <div className="input-board-size">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.inputnum}
                >
                Search
                </button>
          </div>
        </div>
        <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
