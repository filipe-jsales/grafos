import { criaListaAdjacencia } from './criaListaAdjacencia';
import { largura } from '../Algoritmos/largura';
import criaMatrizAdjacenciaNaoOrientado from './criaMatrizAdjacenciaNaoOrientado';
var ciclo = false;

export class algoritmosGrafos {
  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }

  verificarIndependente(conjunto, grafo) {
    for (let i = 0; i < conjunto.length; i++) {
      for (let j = i + 1; j < conjunto.length; j++) {
        const vertice1 = conjunto[i];
        const vertice2 = conjunto[j];

        const aresta = grafo.edges.find(
          edge =>
            (edge.from === vertice1.id && edge.to === vertice2.id) ||
            (edge.from === vertice2.id && edge.to === vertice1.id)
        );

        if (aresta) {
          return false;
        }
      }
    }
    return true;
  }

  verificarClique(conjunto, grafo) {
    for (let i = 0; i < conjunto.length; i++) {
      for (let j = i + 1; j < conjunto.length; j++) {
        const vertice1 = conjunto[i];
        const vertice2 = conjunto[j];

        // Verifica se existe uma aresta entre os vértices do conjunto
        const aresta = grafo.edges.find(
          edge =>
            (edge.from === vertice1.id && edge.to === vertice2.id) ||
            (edge.from === vertice2.id && edge.to === vertice1.id)
        );

        if (!aresta) {
          // Se não existe uma aresta entre dois vértices do conjunto, ele não é um clique
          return false;
        }
      }
    }
    return true;
  }

  verificarDominante(conjunto, grafo) {
    const dominados = new Set(conjunto.map(v => v.id)); 
  
    for (let node of grafo.nodes) {
      if (!dominados.has(node.id)) {
        const adjacente = grafo.edges.some(
          edge =>
            (dominados.has(edge.from) && edge.to === node.id) ||
            (dominados.has(edge.to) && edge.from === node.id)
        );
  
        if (!adjacente) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  procuraAresta(origem, destino, grafo, orientado) {
    var resposta = 'Não existe a aresta';
    grafo.edges.forEach(teste);
    function teste(item) {
      if (item.from === origem && item.to === destino) {
        resposta = 'Existe a aresta';
      } else if (!orientado && item.to === origem && item.from === destino) {
        resposta = 'Existe a aresta';
      }
    }
    return resposta;
  }

  calcularGrau(grafo, vertice, tipoGrafo) {
    var contador = 0;
    if (tipoGrafo === 'orientado') {
      for (var i = 0; i < grafo.edges.length; i++) {
        if (grafo.edges[i].from === vertice) {
          contador++;
        }
        if (grafo.edges[i].to === vertice) {
          contador++;
        }
      }
      return contador;
    } else if (tipoGrafo === 'nao_orientado') {
      for (var j = 0; j < grafo.edges.length; j++) {
        if (grafo.edges[j].from === vertice || grafo.edges[j].to === vertice) {
          contador++;
        }
      }

      return contador;
    }
  }

  recuperarAdjacencias(grafo, verticeEscolhido) {
    const verticesAdjacentes = new Set();
    const arestas = grafo.edges;
    const vertices = grafo.nodes;
    arestas.forEach(aresta => {
      vertices.forEach(vertice => {
        if (aresta.from === verticeEscolhido && aresta.to === vertice.id) {
          verticesAdjacentes.add(vertice.label);
        }
        if (
          aresta.to === verticeEscolhido &&
          aresta.from === vertice.id &&
          !verticesAdjacentes.has(vertice.label)
        ) {
          verticesAdjacentes.add(vertice.label);
        }
      });
    });
    return [...verticesAdjacentes].join(', ');
  }

  recuperarArestas(grafo, verticeEscolhido) {
    var resposta = [];
    function teste(item) {
      if (item.from === verticeEscolhido) {
        resposta.push(item);
      }
    }
    grafo.edges.forEach(teste);
    return resposta;
  }

  eCiclo(listaAdjacencia, origem, destino, visitados = new Set()) {
    visitados.add(origem);
    const atual = listaAdjacencia[origem];
    var temCiclo = false;
    atual.find(vertice => {
      if (visitados.has(vertice)) {
        ciclo = true;
        temCiclo = true;
      }
      !visitados.has(vertice) &&
        !visitados.has(destino) &&
        this.eCiclo(listaAdjacencia, vertice, destino, visitados);
    });
    return temCiclo;
  }

  buscaEmProfundidade(listaAdjacencia, origem, destino, visitados = new Set()) {
    visitados.add(origem);
    const atual = listaAdjacencia[origem];
    atual.find(vertice => {
      console.log(visitados, vertice);
      if (visitados.has(vertice)) {
        console.log('entrou');
      }
      !visitados.has(vertice) &&
        !visitados.has(destino) &&
        this.buscaEmProfundidade(listaAdjacencia, vertice, destino, visitados);
    });

    return {
      verticesExpandidos: Array.from(visitados),
      caminho: visitados.has(destino),
    };
  }

  converteIdLabel(listaVertices, listaArestas) {
    var listaArestasLabel = [];
    for (var i = 0; i < listaVertices.length; i++) {
      for (var j = 0; j < listaArestas.length; j++) {
        if (listaVertices[i].id === listaArestas[j].from) {
          listaArestas[j].from = listaVertices[i].label;
        } else if (listaVertices[i].id === listaArestas[j].to) {
          listaArestas[j].to = listaVertices[i].label;
        }
      }
    }
    listaArestasLabel = listaArestas;
    return listaArestasLabel;
  }

  criarMapGrafos(nodes, edges) {
    const adjacencyList = new Map();
    nodes.forEach(vertice => adjacencyList.set(vertice.label, []));
    edges.forEach(aresta => adjacencyList.get(aresta.from).push(aresta.to));
    return adjacencyList;
  }

  bfs(grafo, origin, destination) {
    const adjacencyList = this.criarMapGrafos(
      grafo.nodes,
      this.converteIdLabel(grafo.nodes, grafo.edges)
    );
    const visited = new Set();
    const menorCaminho = new Set();

    visited.add(origin);

    const queue = [origin];

    let isPath = '';

    while (queue.length > 0 && visited.size !== adjacencyList.size) {
      const node = queue.shift();

      const current = adjacencyList.get(node);
      if (!visited.has(destination)) {
        menorCaminho.add(node);
      }
      if (current.includes(destination)) {
        menorCaminho.add(current[current.indexOf(destination)]);
      }

      if (!current) break;

      isPath = current.find(node => {
        visited.add(node);
        queue.push(node);

        return node === destination;
      });

      if (isPath) break;
    }

    return {
      expandedNodes: Array.from(visited),
      menorCaminho: Array.from(menorCaminho),
      isPath,
    };
  }

  possuiCiclo(grafo, origem, destino) {
    var nodes = grafo.nodes.length;
    var matriz = criaMatrizAdjacenciaNaoOrientado(grafo.nodes, grafo.edges);
    console.log(matriz);

    function dfs(vertex, visited, parent) {
      visited.add(vertex);
      for (let v = 0; v < nodes; v++) {
        if (matriz[vertex][v]) {
          if (v == parent)
            continue;
          if (visited.has(v))
            return true;
          if (dfs(v, visited, vertex)) return true;
        }
      }
      return false;
    }

    function hasCycle() {
      var visited = new Set(); //visited set
      for (let v = 0; v < nodes; v++) {
        if (visited.has(v))
          continue;
        if (dfs(v, visited, -1)) {
          return true;
        }
      }
      return false;
    }

    return hasCycle();
  }

  possuiCicloOrientado(listaVertices, listaArestas) {
    let V = listaVertices.length;
    let adj = new Array(V);
    for (let i = 0; i < V; ++i) {
      adj[i] = [];
    }

    for (let i = 0; i < listaArestas.length; i++) {
      adicionarAresta(listaArestas[i].from - 1, listaArestas[i].to - 1);
    }

    function adicionarAresta(v1, v2) {
      adj[v1].push(v2);
    }

    if (temCiclo()) return true;
    else return false;

    function dfs(v) {
      var pilha = [];
      var visitados = new Array(V);
      var pilha_rec = new Array(V);

      for (let i = 0; i < V; i++) {
        visitados[i] = false;
        pilha_rec[i] = false;
      }

      while (true) {
        var achou_vizinho = false;
        var vizinho_achado;

        if (!visitados[v]) {
          pilha.push(v);
          visitados[v] = true;
          pilha_rec[v] = true;
        }

        for (let i = 0; i < adj[v].length; i++) {
          if (pilha_rec[adj[v][i]]) {
            return true;
          } else if (!visitados[adj[v][i]]) {
            achou_vizinho = true;
            vizinho_achado = adj[v][i];
            break;
          }
        }

        if (!achou_vizinho) {
          pilha_rec[pilha[pilha.length - 1]] = false; // marca que saiu da pilha
          pilha.pop(); // remove da pilha
          if (!pilha.length) break;
          v = pilha[pilha.length - 1];
        } else v = vizinho_achado;
      }

      return false;
    }

    function temCiclo() {
      for (let i = 0; i < V; i++) {
        if (dfs(i)) return true;
      }
      return false;
    }
  }

  verificaConexo(grafo) {

    class Graph {
      constructor(v) {
        this.V = v;
        this.adj = new Array(v);
        for (let i = 0; i < v; ++i) {
          this.adj[i] = [];
        }
      }

      addEdge(v, w) {
        this.adj[v].push(w); // Add w to v's list.
        this.adj[w].push(v); //The graph is undirected
      }

      DFSUtil(v, visited) {
        visited[v] = true;

        for (let i of this.adj[v]) {
          let n = i;
          if (!visited[n]) {
            this.DFSUtil(n, visited);
          }
        }
      }

      isConnected() {
        let visited = new Array(this.V);
        let i;
        for (i = 0; i < this.V; i++) {
          visited[i] = false;
        }

        for (i = 0; i < this.V; i++) {
          if (this.adj[i].length === 0) {
            return false;
          }
        }

        for (i = 0; i < this.V; i++) {
          if (this.adj[i].length != 0) {
            break;
          }
        }

        if (i == this.V) {
          return true;
        }
        this.DFSUtil(i, visited);
        for (i = 0; i < this.V; i++) {
          if (visited[i] == false && this.adj[i].length > 0) {
            return false;
          }
          if (visited[i] == false && this.adj[i].length == 0) {
            return false;
          }
        }

        return true;
      }

    }
    var listaVertices = grafo.nodes;
    var listaArestas = grafo.edges;

    var g = new Graph(listaVertices.length);
    listaArestas.forEach(aresta => {
      g.addEdge(aresta.from - 1, aresta.to - 1);
    });
    return g.isConnected();

  }
}
