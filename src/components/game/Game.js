import React, { useContext } from 'react'
import Board from '../board/Board'
import calculateWinner from '../../libraries/tictactoe';
import App, {CurrentState} from '../../App';
import './Game.css';


const Game = () => {
    // const [state, dispatch] = useReducer(reducer, {
    //     history: [Array(9).fill(null)],
    //     xIsNext: true,
    //     stepNumber: 0,
    // })

    // console.log("state history Game:",state.history);
    // console.log("state stepNumber Game:",state.stepNumber);
    // console.log(calculateWinner(state.history[state.stepNumber]))

    const gameDispatch = useContext(CurrentState);
    const gameState = useContext(CurrentState);
    const winner = calculateWinner(gameState.currentState.history[gameState.currentState.stepNumber]);
    let status = winner ? 'Winner ' + winner : 'Next player: ' + (gameState.currentState.xIsNext ? 'X' : 'O');


    const moves = gameState.currentState.history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => gameDispatch.dispatch({
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
                    squares={gameState.currentState.history[gameState.state.stepNumber]}
                    onClick={(i) => gameDispatch.dispatch({
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