import React, { useReducer } from 'react';
import Game from './components/game/Game';
import calculateWinner from './libraries/tictactoe';
import { appContext } from './appContext';



const reducer = (state, action) => {
    switch (action.type) {
        case 'handleClick':
            const historyStep = state.history.slice(0, state.stepNumber + 1);
            const current = historyStep[state.stepNumber];
            const squares = current.slice();

            if (calculateWinner(squares) || squares[action.idx]) {
                return state;
            }
            squares[action.idx] = state.xIsNext ? 'X' : 'O';
            return {
                history: ([...historyStep, squares]),
                stepNumber: historyStep.length,
                xIsNext: !state.xIsNext,
            }
        case 'jumpTo':
            const jumpHistory = state.history.slice(0, action.setStep + 1);
            return {
                history: jumpHistory,
                stepNumber: action.setStep,
                xIsNext: (action.setStep % 2) === 0
            }

        default:
            return state;
    }
}

function App() {

    const [state, dispatch] = useReducer(reducer, {
        history: [Array(9).fill(null)],
        xIsNext: true,
        stepNumber: 0,
    })

    return (
        <div className="App">
            <appContext.Provider value={{ state, dispatch }}>
                <Game />
            </appContext.Provider>
        </div>
    )
}

export default App;
