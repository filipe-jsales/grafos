class HungarianAlgorithm {
    // Método para reduzir a matriz de custo
    reduceMatrix(costMatrix) {
      const reducedMatrix = costMatrix.map(row => {
        const rowMin = Math.min(...row);
        return row.map(value => value - rowMin);
      });
  
      for (let j = 0; j < reducedMatrix[0].length; j++) {
        const colMin = Math.min(...reducedMatrix.map(row => row[j]));
        for (let i = 0; i < reducedMatrix.length; i++) {
          reducedMatrix[i][j] -= colMin;
        }
      }
  
      return reducedMatrix;
    }
  
    // Método para cobrir zeros na matriz
    coverZeros(costMatrix) {
      const n = costMatrix.length;
      const coveredRows = Array(n).fill(false);
      const coveredCols = Array(n).fill(false);
  
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (costMatrix[i][j] === 0 && !coveredRows[i] && !coveredCols[j]) {
            coveredRows[i] = true;
            coveredCols[j] = true;
          }
        }
      }
  
      return { coveredRows, coveredCols };
    }
  
    // Método para ajustar a matriz de custo
    adjustMatrix(costMatrix, coveredRows, coveredCols) {
      const n = costMatrix.length;
      let minValue = Infinity;
  
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (!coveredRows[i] && !coveredCols[j]) {
            minValue = Math.min(minValue, costMatrix[i][j]);
          }
        }
      }
  
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (!coveredRows[i] && !coveredCols[j]) {
            costMatrix[i][j] -= minValue;
          }
          if (coveredRows[i] && coveredCols[j]) {
            costMatrix[i][j] += minValue;
          }
        }
      }
  
      return costMatrix;
    }
  
    // Método principal para aplicar o Algoritmo Húngaro
    hungarian(costMatrix) {
      let matrix = this.reduceMatrix(costMatrix);
      let { coveredRows, coveredCols } = this.coverZeros(matrix);
  
      while (coveredRows.filter(v => v).length + coveredCols.filter(v => v).length < matrix.length) {
        matrix = this.adjustMatrix(matrix, coveredRows, coveredCols);
        ({ coveredRows, coveredCols } = this.coverZeros(matrix));
      }
  
      const assignments = new Array(matrix.length).fill(-1);
  
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (matrix[i][j] === 0 && !assignments.includes(j)) {
            assignments[i] = j;
            break;
          }
        }
      }
  
      return assignments;
    }
  }
  
  // Exemplo de uso
  const costMatrix = [
    [3, 1, 4],
    [2, 5, 3],
    [4, 2, 1]
  ];
  
  const hungarian = new HungarianAlgorithm();
  const result = hungarian.hungarian(costMatrix);
  
  console.log('Assignments:', result);
  