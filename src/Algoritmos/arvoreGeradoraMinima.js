import criaMatrizAdjacenciaNaoOrientado from './criaMatrizAdjacenciaNaoOrientado';

export function arvoreGeradoraMinima(graphData) {
  const listaVertices = graphData.graph.nodes;
  const listaArestas = graphData.graph.edges;
  let V = graphData.counter;
  var arestasArvore = [];
  var custo = 0;

  function minKey(key, mstSet) {
    let min = Number.MAX_VALUE,
      min_index;

    for (let v = 0; v < V; v++) {
      if (mstSet[v] == false && key[v] < min) {
        min = key[v];
        min_index = v;
      }
    }

    return min_index;
  }


  function printMST(parent, graph) {

    for (let i = 1; i < V; i++) {
      var vertice1 = listaVertices.find(v => v.id == parent[i]+1);
      var vertice2 = listaVertices.find(v => v.id == i+1);
      arestasArvore.push(vertice1.label + ' - ' + vertice2.label + '  ( ' + graph[i][parent[i]]+' )');
      custo += graph[i][parent[i]];

      
    }
  }

  function primMST(graph) {
    let parent = [];

    let key = [];

    let mstSet = [];

    for (let i = 0; i < V; i++) {
      key[i] = Number.MAX_VALUE;
      mstSet[i] = false;
    }

    key[0] = 0;
    parent[0] = -1; // First node is always root of MST

    for (let count = 0; count < V - 1; count++) {
      let u = minKey(key, mstSet);

      mstSet[u] = true;

      for (let v = 0; v < V; v++)
        if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v]) {
          parent[v] = u;
          key[v] = graph[u][v];
        }
    }

    printMST(parent, graph);
  }

  let graph = criaMatrizAdjacenciaNaoOrientado(listaVertices, listaArestas);
  primMST(graph);

  var resultadoAGM = {};
  resultadoAGM['custo'] = custo;
  resultadoAGM['arestas'] = arestasArvore;
  return resultadoAGM;
}
