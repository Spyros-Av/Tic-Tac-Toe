import React, { useContext } from 'react'
import Board from '../board/Board'
import calculateWinner from '../../libraries/tictactoe';
import { appContext } from '../../appContext';
import './Game.css';

const Game = () => {
    const { state, dispatch } = useContext(appContext);

    const winner = calculateWinner(state.history[state.stepNumber]);

    let status;
    if (state.history.length === 10 && !winner) {
        status = 'Draw, play again'
    }
    else {
        status = winner ? 'Winner ' + winner : 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    }
    


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
                    {desc}
                </button>
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