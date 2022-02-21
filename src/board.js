//import { tab } from '@testing-library/user-event/dist/tab';
import React from 'react';
import './index.css';
import  Square from './square'


class Board extends React.Component {
    renderSquare(i) {
      return(
          <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          />
        );
    }
    
    renderRow(props) {
      let table = []
      let count = 0

      for (let i = 0; i < this.props.inputnum; i++) {
        let children = []

        for (let j = 0; j < this.props.inputnum; j++) {
          children.push(this.renderSquare(count))
          count = count + 1
        }
        table.push(<div className="board-row">{children}</div>)
      }
      return table
    }

    render() {
        return (
            <div>
                  {this.renderRow()}
            </div>
        );
    }
  }

export default Board;