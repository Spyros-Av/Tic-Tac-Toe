import React, { useReducer } from 'react'
import Board from '../board/Board'
import calculateWinner from '../../libraries/tictactoe';
import reducer from '../../libraries/reducer';
import './Game.css';


const Game = () => {
    const [state, dispatch] = useReducer(reducer, {
        history: [Array(9).fill(null)],
        xIsNext: true,
        stepNumber: 0,
    })
    console.log("state history Game:",state.history);
    console.log("state stepNumber Game:",state.stepNumber);
    // console.log(calculateWinner(state.history[state.stepNumber]))
    const winner = calculateWinner(state.history[state.stepNumber]);
    let status = winner ? 'Winner ' + winner : 'Next player: ' + (state.xIsNext ? 'X' : 'O');


    const moves = state.history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => dispatch({
                    type: 'jumpTo',
                    setStep: move
                })}>
                    {desc}</button>
            </li>
        );

    })

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={state.history[state.stepNumber]}
                    onClick={(i) => dispatch({
                        type: 'handleClick',
                        idx: i
                    })}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );

}

export default Game;