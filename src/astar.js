export function astar(map, start, end) {
  // Define the Node class
  class Node {
      constructor(x, y) {
          this.x = x;
          this.y = y;
          this.g = 0; // Distance from the start node
          this.h = 0; // Heuristic (Manhattan distance to end node)
          this.f = 0; // Sum of g and h
          this.parent = null; // Parent node
      }
  }

  // Function to calculate the Manhattan distance heuristic
  function heuristic(node, end) {
      return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
  }

  // Initialize start and end nodes
  let startNode = new Node(start[0], start[1]);
  let endNode = new Node(end[0], end[1]);

  // Initialize open and closed lists
  let openList = [startNode];
  let closedList = [];

  while (openList.length > 0) {
      // Get the node with the lowest f value from the open list
      let currentNode = openList.reduce((minNode, node) => node.f < minNode.f ? node : minNode, openList[0]);

      // Move current node from open to closed list
      openList = openList.filter(node => node !== currentNode);
      closedList.push(currentNode);

      // Check if current node is the end node
      if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
          // Reconstruct path and return it
          let path = [];
          let current = currentNode;
          while (current !== null) {
              path.push([current.x, current.y]);
              current = current.parent;
          }
          return path.reverse();
      }

      // Generate neighbors of the current node
      let neighbors = [];
      for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
              if (dx !== 0 || dy !== 0) {
                  let neighborX = currentNode.x + dx;
                  let neighborY = currentNode.y + dy;
                  if (
                      neighborX >= 0 && neighborX < map[0].length &&
                      neighborY >= 0 && neighborY < map.length &&
                      map[neighborY][neighborX] !== 1 // Check if not a wall
                  ) {
                      neighbors.push(new Node(neighborX, neighborY));
                  }
              }
          }
      }

      // Process each neighbor
      for (let neighbor of neighbors) {
          // Skip if neighbor is in closed list
          if (closedList.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
              continue;
          }

          // Calculate tentative g value
          let tentativeG = currentNode.g + 1; // Assuming each step costs 1

          // Add neighbor to open list if it's not there or if new path is shorter
          if (!openList.some(node => node.x === neighbor.x && node.y === neighbor.y) || tentativeG < neighbor.g) {
              neighbor.g = tentativeG;
              neighbor.h = heuristic(neighbor, endNode);
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.parent = currentNode;

              if (!openList.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                  openList.push(neighbor);
              }
          }
      }
  }

  // No path found
  return [];
}
