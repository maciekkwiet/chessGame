import Piece from './Piece';

class Knight extends Piece {
  
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'knight';
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`; //fontawesome knight
    
  }
  findAttackingMoves(gameArea) {
    const moves = [
                    [2,1],
                    [1,2],
                    [-2,1],
                    [1,-2],
                    [-2,-1],
                    [2,-1],
                    [-1,2],
                    [-1,-2]
                  ];
    let newX = 0;
    let newY = 0;
    const attackMoves = [];
    for (const subTab of moves) {
      newX = this.x + subTab[0];
      newY = this.y + subTab[1];
      if (newX <= 7 && newX >= 0 && newY <= 7 && newY >= 0) {
        if (gameArea[newX][newY]) {
          if (gameArea[newX][newY].side !== this.side || gameArea[newX][newY].side == this.side) attackMoves.push(`${newX},${newY}`);
        }
        else attackMoves.push(`${newX},${newY}`);
      }
    }
    
  
    return attackMoves;
  }

  findLegalMoves(gameArea)
  {   
    let attack = this.findAttackingMoves(gameArea);
    console.log(attack);
    let legalMoves =[]
     

    for(const el of attack)
    {  
      const attackX= el[0];
      const attackY= el[2];
      console.log("x = "+attackX);
      console.log("y = "+attackY);
      
      

      /*if (gameArea[attack.side] == this.side) legal.push(attack);
     console.log(attack)*/

     
      
     /*if (gameArea[attackX][attackY] && gameArea[attackX][attackY].side !== this.side)
        {legal.push(`${attackX},${attackY}`)}
        console.log(legal);*/
      


      attack = attack.filter(!(gameArea[attackX][attackY].side ==this.side));  
      console.log(attack);
    //console.log(legalMoves);
  }

    return attack;
  }
}

export default Knight;
