
class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.g = 0; //distance from the node to the start node
    this.h = 0;  //distance from the node to the target node
    this.f = 0; //f =g +h
    this.parent = null;
  }
}

export function astar(map, start, end) {
  let openList = [];// list of node with start to search
  let closedList = [];// list of node already process
  let width = map[0].length;
  let height = map.length;

  let startNode = new Node(start[0], start[1]);
  let endNode = new Node(end[0], end[1]);

  openList.push(startNode);

  while (openList.length > 0) {
    let currentNode = openList[0];
    let currentIndex = 0;

    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < currentNode.f) {
        currentNode = openList[i];
        currentIndex = i;
      }
    }

    openList.splice(currentIndex, 1);
    closedList.push(currentNode);

    if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
      let path = [];
      let current = currentNode;
      while (current !== null) {
        path.push([current.x, current.y]);
        current = current.parent;
      }
      return path.reverse();
    }

    let neighbors = [];

    // map[y][x] !== 1
    // map optimizer, make 0, 5, 7 to 0
    // else 1
    const possibleOption = [0, 4, 5, 6, 7];
    
    // left
    if (currentNode.x - 1 >= 0 && possibleOption.includes(map[currentNode.y][currentNode.x - 1])) {
      neighbors.push(new Node(currentNode.x - 1, currentNode.y));
    }

    // right
    if (currentNode.x + 1 < width && possibleOption.includes(map[currentNode.y][currentNode.x + 1])) {
      neighbors.push(new Node(currentNode.x + 1, currentNode.y));
    }

    // up
    if (currentNode.y - 1 >= 0 && possibleOption.includes(map[currentNode.y - 1][currentNode.x])) {
      neighbors.push(new Node(currentNode.x, currentNode.y - 1));
    }

    // down
    if (currentNode.y + 1 < height && possibleOption.includes(map[currentNode.y + 1][currentNode.x])) {
      neighbors.push(new Node(currentNode.x, currentNode.y + 1));
    }

    for (let neighbor of neighbors) {
      if (closedList.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
        continue;
      }

      neighbor.g = currentNode.g + 1;
      neighbor.h = Math.abs(neighbor.x - endNode.x) + Math.abs(neighbor.y - endNode.y);
      neighbor.f = neighbor.g + neighbor.h;

      if (openList.find(node => node.x === neighbor.x && node.y === neighbor.y && neighbor.g >= node.g)) {
        continue;
      }

      neighbor.parent = currentNode;
      openList.push(neighbor);
    }
  }

  return [];
}

let start = [3, 3]; // Enemy start position
let end = [1, 4]; // Pacman position

const map = [ 
  [ 2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  3], 
  [13,  7,  0,  0,  4,  0,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  0, 13], 
  [13,  0,  2, 12, 12, 12, 12, 12, 12, 12, 12, 16,  0, 15, 12, 12, 12, 16,  0, 13], 
  [13,  0, 13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13], 
  [13,  0, 11, 12, 16,  0, 15, 12, 12, 12, 12, 12, 12, 12, 16,  0, 15, 16,  0, 13], 
  [13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13], 
  [13,  0,  2, 12, 12, 12, 12,  3,  0,  0,  2, 12, 12, 12, 12, 12, 12,  3,  0, 13], 
  [13,  0, 13,  0,  0,  0,  0, 11, 12, 12,  9,  0,  0,  0,  0,  0,  7, 13,  0, 13], 
  [13,  0, 13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  9,  0, 13], 
  [13,  0, 11, 16,  0,  2, 12, 12, 12,  3,  0,  2, 12, 12,  3,  0,  0,  0,  0, 13], 
  [13,  0,  0,  0,  0, 13,  0,  0,  6, 14,  0, 14,  0,  7, 13,  0,  2,  3,  0, 13], 
  [13,  0,  2,  3,  0, 13,  0, 17, 18,  0,  0,  0,  0,  0, 13,  0, 13, 13,  0, 13], 
  [13,  0, 11,  9,  0, 14,  0, 11, 12, 12, 12, 12, 12, 12,  9,  0, 11,  9,  0, 13], 
  [13,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13], 
  [13,  6, 17,  0, 17,  0, 15, 12, 12, 12,  3,  0, 15, 16,  0, 17,  0, 17,  0, 13], 
  [13,  0, 13,  0, 14,  0,  0,  0,  0,  0, 14,  0,  0,  0,  0, 14,  0, 13,  0, 13], 
  [13,  0, 13,  0,  0,  0,  2, 12,  3,  0,  0,  0,  0, 17,  0,  0,  6, 13,  0, 13], 
  [13,  0, 11, 12, 16,  0, 13,  0, 14,  0, 15, 12, 12,  9,  0, 15, 12,  9,  0, 13], 
  [13,  0,  0,  0,  0,  0, 13,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  0, 13], 
  [11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,  9], 
];

let path = astar(map, start, end);
console.log(path);
