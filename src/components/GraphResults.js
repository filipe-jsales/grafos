import React, { useState } from 'react';
import {
  viewCard,
  viewCardList,
  viewCardSelectionAdj,
  viewCardSelectionAresta,
  viewCardSelectionGrau,
  viewCardSelectionMenorCaminhoNaoOrient,
  viewCardSelectionMenorCaminhoOrient,
} from '../components/CardInfo';
import { algoritmosGrafos } from '../Algoritmos/funcoesBasicas';
import { planarity_test } from '../Algoritmos/planarFunction';
import { arvoreGeradoraMinima } from '../Algoritmos/arvoreGeradoraMinima';
import { cicloEuleriano } from '../Algoritmos/cicloEuleriano';
import { componentesFortes } from '../Algoritmos/componentesFortes';
import { ordenacaoTopologica } from '../Algoritmos/ordenacaoTopologica';
import { verificaBiconexo } from '../Algoritmos/verificaBiconexo';
import { verificaConexidade } from '../Algoritmos/verificaConexidade';
import { verificaEuleriano } from '../Algoritmos/verificaEuleriano';
import { largura } from '../Algoritmos/largura';
import { caminhoBellmanFord } from '../Algoritmos/caminhoBellmanFord';
import { color } from '@chakra-ui/react';

const stateOriginal = {
  counter: 6,
  graph: {
    nodes: [
      { id: 1, label: 'A', x: 200, y: 0 },
      { id: 2, label: 'B', x: 50, y: 250 },
      { id: 3, label: 'C', x: 300, y: 0 },
      { id: 4, label: 'D', x: 90, y: 100 },
      { id: 5, label: 'E', x: 0, y: 10 },
      { id: 6, label: 'F', x: 0, y: 10 },
    ],
    edges: [
      { from: 1, to: 2, label: '3' },
      { from: 1, to: 3, label: '5' },
      { from: 3, to: 2, label: '3' },
      { from: 3, to: 4, label: '9' },
      { from: 4, to: 5, label: '4' },
      { from: 5, to: 6, label: '6' },
      { from: 2, to: 6, label: '11' },
    ],
  },
};

const state = JSON.parse(JSON.stringify(stateOriginal));

var K5 = {
  nodes: [
    { id: 0, label: 'A', x: 200, y: 0 },
    { id: 1, label: 'B', x: 50, y: 250 },
    { id: 2, label: 'C', x: 300, y: 0 },
    { id: 3, label: 'D', x: 90, y: 100 },
    { id: 4, label: 'E', x: 0, y: 10 },
  ],
  edges: [
    { from: 0, to: 1, label: 3 },
    { from: 0, to: 2, label: 5 },
    { from: 0, to: 3, label: 1 },
    { from: 0, to: 4, label: 3 },
    { from: 1, to: 2, label: 9 },
    { from: 1, to: 3, label: 4 },
    { from: 1, to: 4, label: 6 },
    { from: 2, to: 3, label: 9 },
    { from: 2, to: 4, label: 4 },
    { from: 3, to: 4, label: 6 },
  ],
};

function GraphResults(props) {
  const teste = new algoritmosGrafos(); //Cria objeto da classe algoritmosGrafos para realizar os testes e gerar os resultados
  const [selectedVertices, setSelectedVertices] = useState([]); // Conjunto de vértices selecionados

  const vertice = state.graph.nodes[0]; // Usado nos resultados que se escolhe um vértice
  const grafo = props.state.graph; //variável com o grafo para se pegar mais facilmente os nodes e as edges
  const vertices = grafo.nodes;
  const arestas = grafo.edges;

  const isIndependente = teste.verificarIndependente(selectedVertices, grafo);
  const isClique = teste.verificarClique(selectedVertices, grafo);
  const isDominante = teste.verificarDominante(selectedVertices, grafo);

  const origem = grafo.nodes[grafo.nodes.length - 1].id;
  const destino = grafo.nodes[0].id;
  const tamanhoListavertices = state.graph.nodes.length; //tamanho da lista de vértices
  const origemBFS = state.graph.nodes[0].label;
  const destinoBFS = state.graph.nodes[3].label;

  const copia = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

  const copia1 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia2 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia3 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia4 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia5 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia6 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia7 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia8 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra
  const copia9 = JSON.parse(JSON.stringify(grafo)); //copia o objeto grafo para não ser referenciado no algoritmo de dijkstra

  const handleSelectVertex = vertex => {
    setSelectedVertices(prev => {
      if (prev.find(v => v.id === vertex.id)) {
        // Se o vértice já está selecionado, remove-o
        return prev.filter(v => v.id !== vertex.id);
      } else {
        // Caso contrário, adiciona à seleção
        return [...prev, vertex];
      }
    });
  };

  var resultadoConexo = false;

  resultadoConexo = teste.verificaConexo(copia8);

  var resultadoConexidade = '';
  var resultadoComponentesFortes = '';

  if (resultadoConexo && props.orientacao) {
    resultadoConexidade = verificaConexidade(vertices, arestas);
    if (resultadoConexidade !== 'Fortemente Conexo') {
      resultadoComponentesFortes = componentesFortes(grafo.nodes, grafo.edges);
    }
  }

  var resultadoCiclico = false;

  if (resultadoConexo && props.orientacao) {
    resultadoCiclico = teste.possuiCicloOrientado(copia9.nodes, copia9.edges);
  } else if (resultadoConexo && !props.orientacao) {
    resultadoCiclico = teste.possuiCiclo(copia2, origem, destino);
  }

  var resultadoOrdenacaoTopologica = '';

  if (!resultadoCiclico && resultadoConexo && props.orientacao) {
    resultadoOrdenacaoTopologica = ordenacaoTopologica(grafo);
  }

  var resultadoPlanar = false;
  var resultadoBiconexo = false;
  var resultadoEuleriano = false;
  var resultadoCicloEuleriano = '';

  if (resultadoConexo && !props.orientacao) {
    resultadoPlanar = planarity_test(copia4.nodes, copia4.edges);
    resultadoBiconexo = verificaBiconexo(grafo.nodes, grafo.edges);
    resultadoEuleriano = verificaEuleriano(grafo.nodes, grafo.edges);
    if (resultadoEuleriano) {
      resultadoCicloEuleriano = cicloEuleriano(grafo.nodes, grafo.edges);
    }
  }
  const visibility = false;

  var resultadosAGM = '';
  var resultadoCustoAGM = '';
  var resultadoArestasAGM = '';

  if (resultadoConexo) {
    resultadosAGM = arvoreGeradoraMinima(props.state);
    resultadoCustoAGM = resultadosAGM.custo;
    resultadoArestasAGM = resultadosAGM.arestas;
  }
  const [existeAresta, setExisteAresta] = useState(['', '']);
  const [selectGrauVertice, setSelectGrauVertice] = useState();
  const [selectVerticeAdj, setSelectVerticeAdj] = useState();
  const [selectMenorCaminhoOrient, setSelectMenorCaminhoOrient] = useState([
    '',
    '',
  ]);
  const [selectMenorCaminhoNaoOrient, setSelectMenorCaminhoNaoOrient] =
    useState(['', '']);

  var resultadoAresta = 'Informe dois vértices';
  if (existeAresta[0] !== '' && existeAresta[1] !== '') {
    resultadoAresta = teste.procuraAresta(
      existeAresta[0],
      existeAresta[1],
      copia5,
      props.orientacao
    );
  } else {
    resultadoAresta = 'Informe dois vértices';
  }

  var grauVertice = 'Escolha um vértice';
  if (selectGrauVertice !== '' && selectGrauVertice !== undefined) {
    grauVertice =
      'Grau ' +
      teste.calcularGrau(
        copia6,
        selectGrauVertice,
        props.orientacao ? 'orientado' : 'nao_orientado'
      );
  } else {
    grauVertice = 'Escolha um vértice';
  }

  var adjacenciasVertice = 'Escolha um vértice';
  if (selectVerticeAdj !== '' && selectVerticeAdj !== undefined) {
    adjacenciasVertice = teste.recuperarAdjacencias(copia7, selectVerticeAdj);
  } else {
    adjacenciasVertice = 'Escolha um vértice';
  }

  var possuiPeso = false;
  for (let i = 0; i < grafo.edges.length; i++) {
    if (grafo.edges[i].label != '') {
      possuiPeso = true;
      break;
    }
  }

  var resultadoBellmanFord = '';
  var resultadoMenorCaminho = '';
  var resultadoMenorCusto = '';

  if (props.orientacao) {
    if (
      selectMenorCaminhoOrient[0] !== undefined &&
      selectMenorCaminhoOrient[0] !== '' &&
      selectMenorCaminhoOrient[1] !== undefined &&
      selectMenorCaminhoOrient[1] !== '' &&
      selectMenorCaminhoOrient[0] !== selectMenorCaminhoOrient[1]
    ) {
      var verticeDestino = grafo.nodes.find(
        vertice => vertice.label === selectMenorCaminhoOrient[1]
      );
      var testaDestino = grafo.edges.find(
        aresta => aresta.to === verticeDestino.id
      );

      if (testaDestino !== undefined) {
        resultadoBellmanFord = caminhoBellmanFord(
          copia1,
          selectMenorCaminhoOrient[0],
          selectMenorCaminhoOrient[1]
        );

        resultadoMenorCaminho = resultadoBellmanFord.menorCaminho;
        resultadoMenorCusto = resultadoBellmanFord.distanciaCusto;
      } else {
        resultadoMenorCaminho = 'Não existe caminho';
      }
    } else {
      resultadoMenorCaminho = 'Informe dois vértices distintos';
    }
  }

  var MenorCaminhoNorientado = '';
  if (!props.orientacao) {
    if (
      selectMenorCaminhoNaoOrient[0] !== undefined &&
      selectMenorCaminhoNaoOrient[0] !== '' &&
      selectMenorCaminhoNaoOrient[1] !== undefined &&
      selectMenorCaminhoNaoOrient[1] !== '' &&
      selectMenorCaminhoNaoOrient[0] !== selectMenorCaminhoNaoOrient[1]
    ) {
      var resultadoLargura = largura(
        copia3,
        selectMenorCaminhoNaoOrient[0],
        selectMenorCaminhoNaoOrient[1]
      );

      MenorCaminhoNorientado = resultadoLargura.path;
      if (resultadoLargura.cost === 0) {
        resultadoMenorCusto = resultadoLargura.distance;
      } else {
        resultadoMenorCusto = resultadoLargura.cost;
      }
    } else {
      MenorCaminhoNorientado = 'Informe dois vértices distintos';
    }
  }

  return (
    <>
      {viewCardSelectionAresta(
        'Existe a Aresta?',
        resultadoAresta,
        grafo,
        existeAresta,
        setExisteAresta,
        props.orientacao
      )}
      {viewCardSelectionGrau(
        'Grau do Vértice',
        grauVertice,
        grafo,
        setSelectGrauVertice
      )}
      {viewCardSelectionAdj(
        'Adjacentes do Vértice',
        adjacenciasVertice,
        grafo,
        setSelectVerticeAdj
      )}
      {!props.orientacao
        ? viewCard(
            'Grafo Não Orientado Conexo?',
            resultadoConexo ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {props.orientacao && resultadoConexo
        ? viewCard('Conexidade do Dígrafo', resultadoConexidade, visibility)
        : null}
      {resultadoConexidade !== 'Fortemente Conexo' &&
      props.orientacao &&
      resultadoConexo
        ? viewCard('Componentes Fortes', resultadoComponentesFortes, visibility)
        : null}
      {resultadoConexo
        ? viewCard(
            'Grafo Ciclico?',
            resultadoCiclico ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {props.orientacao && !resultadoCiclico && resultadoConexo
        ? viewCard(
            'Ordenação Topológica',
            resultadoOrdenacaoTopologica,
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard('Grafo Planar?', resultadoPlanar ? 'Sim' : 'Não', visibility)
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Grafo Biconexo?',
            resultadoBiconexo ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Grafo Euleriano?',
            resultadoEuleriano ? 'Sim' : 'Não',
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo && resultadoEuleriano
        ? viewCard(
            'Ciclo Euleriano?',
            resultadoCicloEuleriano.toString(),
            visibility
          )
        : null}
      {!props.orientacao
        ? viewCardSelectionMenorCaminhoNaoOrient(
            possuiPeso ? 'Caminho de Menor Custo' : 'Caminho Mais Curto',
            MenorCaminhoNorientado,
            grafo,
            selectMenorCaminhoNaoOrient,
            setSelectMenorCaminhoNaoOrient
          )
        : null}
      {props.orientacao
        ? viewCardSelectionMenorCaminhoOrient(
            possuiPeso ? 'Caminho de Menor Custo' : 'Caminho Mais Curto',
            resultadoMenorCaminho,
            grafo,
            selectMenorCaminhoOrient,
            setSelectMenorCaminhoOrient
          )
        : null}
      {props.orientacao &&
      resultadoMenorCusto !== Infinity &&
      resultadoMenorCusto !== undefined &&
      resultadoMenorCusto !== ''
        ? viewCard(
            possuiPeso
              ? 'Custo do Menor Caminho'
              : 'Distância do Caminho Mais Curto',
            resultadoMenorCusto,
            visibility
          )
        : null}
      {!props.orientacao && resultadoMenorCusto !== ''
        ? viewCard(
            possuiPeso
              ? 'Custo do Menor Caminho'
              : 'Distância do Caminho Mais Curto',
            resultadoMenorCusto,
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCard(
            'Custo da Árvore Geradora Mínima',
            resultadoCustoAGM,
            visibility
          )
        : null}
      {!props.orientacao && resultadoConexo
        ? viewCardList(
            'Arestas da Árvore Geradora Mínima',
            resultadoArestasAGM,
            visibility
          )
        : null}

      {viewCard(
        'Selecione os vértices para verificar:',
        grafo.nodes.map(node => (
          <button
            key={node.id}
            onClick={() => handleSelectVertex(node)}
            style={{
              backgroundColor: selectedVertices.find(v => v.id === node.id)
                ? 'green'
                : '#A47EC1ff',
              borderRadius: '8px',
              margin: '5px',
              padding: '5px',
              height: '35px',
              marginBottom: '10px',
            }}
          >
            {node.label}
          </button>
        ))
      )}
      {isIndependente !== undefined && isIndependente !== null
        ? viewCard(
            'É um Conjunto Independente?',
            isIndependente ? 'Sim' : 'Não',
            false
          )
        : null}
      {viewCard('É um Clique?', isClique ? 'Sim' : 'Não', false)}
      {viewCard('É um Conjunto Dominante?', isDominante ? 'Sim' : 'Não', false)}
    </>
  );
}
export default GraphResults;
