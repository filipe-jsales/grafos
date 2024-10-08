export class dijkstra {
  findLowestCostNode = (costs, processed) => {
    const knownNodes = Object.keys(costs);

    const lowestCostNode = knownNodes.reduce((lowest, node) => {
      if (lowest === null && !processed.includes(node)) {
        lowest = node;
      }
      if (costs[node] < costs[lowest] && !processed.includes(node)) {
        lowest = node;
      }
      return lowest;
    }, null);

    return lowestCostNode;
  };

  dijkstra = graph => {

    const trackedCosts = Object.assign({ finish: Infinity }, graph.start);

    const trackedParents = { finish: null };
    for (let child in graph.start) {
      trackedParents[child] = 'start';
    }
    const processedNodes = [];
    const nodesList = new Set();

    let node = this.findLowestCostNode(trackedCosts, processedNodes);

    while (node) {
      let costToReachNode = trackedCosts[node];
      let childrenOfNode = graph[node];

      for (let child in childrenOfNode) {
        let costFromNodetoChild = childrenOfNode[child];
        let costToChild = costToReachNode + costFromNodetoChild;

        if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
          nodesList.add(node);
          trackedCosts[child] = costToChild;
          trackedParents[child] = node;
          if (
            trackedParents.finish === null &&
            trackedCosts.finish === Infinity
          ) {
            let results = {
              distance: Infinity,
              path: ['Não existe caminho!',[]],
            };
            return results;
          }
        }

      }

      processedNodes.push(node);

      node = this.findLowestCostNode(trackedCosts, processedNodes);
    }

    let nodesTrackedParents = [];
    let optimalPath = [];
    let optimalPathSet = new Set();

    optimalPathSet.add('finish');
    optimalPathSet.add(trackedParents.finish);

    function pushNodes(value1, value2, set) {
      nodesTrackedParents.push(value2);
    }

    function pushPath(value1, value2, set) {
      optimalPath.push(value2);
    }

    nodesList.forEach(pushNodes);
    nodesTrackedParents.reverse();

    while (!optimalPathSet.has('start'))
      for (let i = 0; i < nodesTrackedParents.length; i++) {
        optimalPathSet.add(trackedParents[nodesTrackedParents[i]]);
      }
    optimalPathSet.forEach(pushPath);

    optimalPath.reverse();
    if (trackedCosts.finish === Infinity) {
      optimalPath = ['Não existe caminho!',[]];
    }

    const results = {
      distance: trackedCosts.finish,
      path: optimalPath,
    };

    return results;
  };
}
