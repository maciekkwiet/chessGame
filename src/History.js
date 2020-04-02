class History {
  generateHistoryTable(historyArray, gameArea) {
    let historyTable = historyArray;

    console.log(historyTable);

    //Build an array containing Customer records.

    //Create a HTML Table element.
    let table = document.createElement('TABLE');
    table.border = '1';

    //Get the count of columns.
    let columnCount = 2;

    //Add the header row.
    let row = table.insertRow(-1);
    for (let i = 0; i < 2; i++) {
      let headerCell = document.createElement('TH');
      headerCell.innerHTML = 'white';
      headerCell.innerHTML = 'black';

      row.appendChild(headerCell);
    }
    console.log(historyTable);

    //Add the data rows.
    for (let i = 1; i < historyTable.length; i++) {
      row = table.insertRow(-1);
      for (let j = 0; j < columnCount; j++) {
        let cell = row.insertCell(-1);
        let piece = historyTable[i];
        if (piece.attack === true) {
          // pawn attack
          if (piece.name === 'pawn' && piece.attack === true)
            cell.innerHTML = piece.x + 'x' + piece.toX + historyTable[i].toY;
          // knight attack
          if (piece.name === 'knight' && piece.attack === true) cell.innerHTML = 'N' + 'x' + piece.toX + piece.toY;
          else cell.innerHTML = piece.name.charAt(0).toUpperCase() + 'x' + piece.toX + piece.toY;
        }
        //castling
        if (piece.castling === true) {
          console.log('dupsko');
          cell.innerHTML = 'O-O-O';
        }
        //if (piece.name === 'king' && piece.castling === 'short') cell.innerHTML = 'O-O';
        {
          // pawn standard
          if (piece.name === 'pawn') cell.innerHTML = piece.toX + historyTable[i].toY;
          // knight standard
          if (piece.name === 'knight') cell.innerHTML = 'N' + piece.toY;
          else cell.innerHTML = piece.name.charAt(0).toUpperCase() + piece.toX + piece.toY;
        }
      }
    }

    let dvTable = document.getElementById('dvTable');
    dvTable.innerHTML = '';
    dvTable.appendChild(table);
  }
}
export default History;
