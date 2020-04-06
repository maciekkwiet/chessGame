class HistoryTable {
  generateHistoryTable(historyArray) {
    const historyTable = [];
    for (let i = 0; i < historyArray.length; i++) {
      let element = historyArray[i];

      let anotherPieceRow = '';
      let anotherPieceColumn = '';
      if (element.anotherPieceInRow) anotherPieceRow = element.anotherPieceInRow;
      if (element.anotherPieceInColumn) anotherPieceColumn = element.anotherPieceInColumn;

      console.log('inne', anotherPieceColumn, anotherPieceRow);
      const coordinates = element.toX + element.toY;

      let toPush = element.name.charAt(0).toUpperCase() + anotherPieceRow + anotherPieceColumn + coordinates;
      // pawn standard move
      if (element.name === 'pawn') toPush = coordinates;
      // knight standard move
      if (element.name === 'knight') toPush = 'N' + anotherPieceRow + anotherPieceColumn + coordinates;
      if (element.attack === true) {
        toPush = element.name.charAt(0).toUpperCase() + anotherPieceRow + anotherPieceColumn + 'x' + coordinates;
        // pawn attack
        if (element.name === 'pawn') toPush = element.x + 'x' + coordinates;
        // knight attack
        if (element.name === 'knight') toPush = 'N' + anotherPieceRow + anotherPieceColumn + 'x' + coordinates;
      }
      if (element.castling === 'long') {
        toPush = 'O-O-O';
      }
      if (element.castling === 'short') {
        toPush = 'O-O';
      }
      historyTable.push(toPush);
    }

    //Create a HTML Table element.
    let table = document.createElement('TABLE');
    table.border = '1';
    let tableToDisplay = [];

    for (let i = 0; i < historyTable.length; i = i + 2) {
      if (historyTable[i + 1]) tableToDisplay.push([historyTable[i], historyTable[i + 1]]);
      else tableToDisplay.push([historyTable[i], '']);
    }
    console.log('tabletodisplay', tableToDisplay);

    //Add the data rows.
    for (let i = 0; i < tableToDisplay.length; i++) {
      let row = table.insertRow(-1);
      for (let j = 0; j < 2; j++) {
        let cell = row.insertCell(-1);
        cell.innerHTML = tableToDisplay[i][j];
      }
    }

    let dvTable = document.getElementById('dvTable');
    dvTable.innerHTML = '';
    dvTable.appendChild(table);
  }
}
export default HistoryTable;
