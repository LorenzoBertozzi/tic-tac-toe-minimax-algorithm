//criando matrix tabuleiro
let board = [
    ['','',''],
    ['','',''],
    ['','','']
];

let w; //largura / 3;
let h; //altura / 3;

//declarando jogadores;
let ai = 'X';
let human = 'O';
let currentPlayer = human; //jogador atual

//plotando tabuleiro
function setup(){
    createCanvas(800,800);
    w = width / 3;
    h = height / 3;
    //bestMove();  //comente essa linha para o primiero jogador ser o human
}

function equals3(a,b,c){
    return a == b && b == c && a != '';
}

function checkWinner(){
    let winner = null;

    //horizontal 
    for(let i= 0; i < 3; i++){
        if(equals3(board[i][0],board[i][1],board[i][2])){
            winner = board[i][0];
        }
    }

    //vertical 
    for(let i = 0; i < 3; i++){
        if(equals3(board[0][i],board[1][i],board[2][i])){
            winner = board[0][i];
        }
    }

    //diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }

    //contar espaços vazios -- identificar velha
    let openSpots = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] == ''){
                openSpots++;
            }
        }
    }

    //velha
    if(winner == null && openSpots == 0){
        return 'velha';
    }else{
        return winner;
    }
}

//clicar para jogar
function mousePressed(){
    //jogada do humano
    if(currentPlayer == human){
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        //verificando jogada
        if(board[i][j] == ''){
            board[i][j] = human;
            currentPlayer = ai;
            bestMove();
        }   
    }
}

function draw(){
    background(255);
    strokeWeight(4);

    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for(let j = 0; j < 3 ; j++){
        for(let i = 0; i < 3; i++){
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];
            
            textSize(32);

            let r = w / 4;
            if(spot == human){
                noFill();
                ellipse(x, y, r * 2);
            }else if(spot == ai){
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }


    let result = checkWinner();
    if (result != null) {
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
        if (result == 'velha') {
            resultP.html('Velha!!');
        } else {
            resultP.html(`${result} Ganhou!!`);
        }
    }
}
