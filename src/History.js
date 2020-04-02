class History {
  generateHistoryTable(historyArray) {
    let historyTable = [];
    for (let i = 0; i < historyArray.length; i++) {
      let element = historyArray[i];

      let toPush = element.name.charAt(0).toUpperCase() + element.toX + element.toY;
      // pawn standard move
      if (element.name === 'pawn') toPush = element.toX + element.toY;
      // knight standard move
      if (element.name === 'knight') toPush = 'N' + element.toX + element.toY;
      if (element.attack === true) {
        toPush = element.name.charAt(0).toUpperCase() + 'x' + element.toX + element.toY;
        // pawn attack
        if (element.name === 'pawn') toPush = element.x + 'x' + element.toX + element.toY;
        // knight attack
        if (element.name === 'knight') toPush = 'N' + 'x' + element.toX + element.toY;
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
export default History;
