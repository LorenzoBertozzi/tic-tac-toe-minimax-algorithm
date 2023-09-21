//Integraçao de minimax para analise de jogada
function bestMove(){
    //jogada da IA
    let bestScore = -Infinity;
    let move;

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            //jogada é valida ?
            if(board[i][j] == ''){
                board[i][j] = ai;
                let score = minimax(board, 0, false);
                board[i][j] = '' ;
                if(score > bestScore){
                    bestScore = score;
                    move = {i , j};
                }
            }
        }
    }
    board[move.i][move.j] = ai;
    currentPlayer = human;
}

let scores = { X : 10, O : -10, velha : 0 };


function minimax(board, depth, isMaximizing){
    let result = checkWinner();
    if(result != null){
        return scores[result];
    }

    if(isMaximizing){
        let bestScore = -Infinity;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                //local valido ?
                if(board[i][j] == '')
                {
                    board[i][j] = ai;
                    let score = minimax(board,depth + 1, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    }else{
        let bestScore = Infinity;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                //local valido ?
                if(board[i][j] == '')
                {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}
