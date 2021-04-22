import calculateWinner from './tictactoe';

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
            return {
                history: state.history[action.setStep + 1],
                stepNumber: action.setStep,
                xIsNext: (action.setStep % 2 === 0)
            }

        default:
            return state;
    }
}

export default reducer;