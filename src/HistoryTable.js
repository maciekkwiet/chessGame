class HistoryTable {
  generateHistoryTable(historyArray) {
    const historyTable = [];
    for (let i = 0; i < historyArray.length; i++) {
      const element = historyArray[i];

      let anotherPieceRow = '';
      let anotherPieceColumn = '';
      if (element.anotherPieceInRow) anotherPieceRow = element.anotherPieceInRow;
      if (element.anotherPieceInColumn) anotherPieceColumn = element.anotherPieceInColumn;

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
    const table = document.createElement('TABLE');
    table.border = '1';
    const tableToDisplay = [];

    for (let i = 0; i < historyTable.length; i = i + 2) {
      if (historyTable[i + 1]) tableToDisplay.push([historyTable[i], historyTable[i + 1]]);
      else tableToDisplay.push([historyTable[i], '']);
    }

    //Add the data rows.
    for (let i = 0; i < tableToDisplay.length; i++) {
      const row = table.insertRow(-1);
      for (let j = 0; j < 2; j++) {
        const cell = row.insertCell(-1);
        cell.innerHTML = tableToDisplay[i][j];
      }
    }

    const dvTable = document.getElementById('dvTable');
    dvTable.innerHTML = '';
    dvTable.appendChild(table);
  }
}
export default HistoryTable;
