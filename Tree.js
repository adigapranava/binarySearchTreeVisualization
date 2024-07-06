function Tree(){
  this.root = null;
  this.levels = [];
  this.rootPosX = width/2;
  this.rootPosY = height/2;
}


Tree.prototype.insert = function(n){
  if(this.root == null){
    this.root = new Node(n, this.rootPosX,this.rootPosY);
  }else{
    this.root.addNode(n, this.rootPosX,this.rootPosY);
  }
  this.updatePosOfNodes();
}

Tree.prototype.updateLevels = function(node, level){
  if (node !== null) {
    if (!this.levels[level]) {
      this.levels[level] = [];
    }
    this.levels[level].push(node);
    this.updateLevels(node.left, level + 1);
    this.updateLevels(node.right, level + 1);
  }
}

Tree.prototype.updatePosOfNodes = function(){
  this.levels = [];
  this.updateLevels(this.root, 0);
  const canvasWidth = width;
  const canvasHeight = height;
  const levelHeight = canvasHeight / (this.levels.length + 1);
  
  let posX = 0;
  let posY = 0;
  
  this.rootPosX = canvasWidth/2;
  this.rootPosY = levelHeight;
  
  for (let level = 0; level < this.levels.length; level++) {
      const nodesAtLevel = this.levels[level];
      const numNodes = nodesAtLevel.length;
      const levelWidth = canvasWidth / (numNodes + 1);
      posY += levelHeight;
      nodesAtLevel.forEach((node, index) => {
        posX += levelWidth;
        
        node.targetX = posX;
        node.targetY = posY;
        node.moveNode();
      });
      posX = 0;
  }
}

Tree.prototype.traverse = function(){
  if(this.root==null){
    console.log("Tree is empty");
    return;
  }else{
    this.root.traverse();
  }
}

Tree.prototype.search = function(n){
  if(this.root==null){
    return null;
  }else{
    return this.root.search(n);
  }
}

Tree.prototype.getNodes = function() {
  if(this.root==null){
    console.log("Tree is empty");
    return [];
  }else{
    return this.root.getNodes();
  }
}

Tree.prototype.findLeafNodes = function(){
  return this.root.findLeafNodes();
}

Tree.prototype.drawTree = function(){
   for (let level = 0; level < this.levels.length; level++) {
      const nodesAtLevel = this.levels[level];
      const numNodes = nodesAtLevel.length;
      nodesAtLevel.forEach((node, index) => {
        node.moveNode();
        stroke(200);
        strokeWeight(4);
        if (node.left !== null) {
          line(node.x, node.y, node.left.x, node.left.y);
        }
        if (node.right !== null) {
          line(node.x, node.y, node.right.x, node.right.y);
        }
        stroke(0);
        strokeWeight(0);
        fill(node.nodeColor); // Circle color
        ellipse(node.x, node.y, 30, 30); // Circle size
        fill(200); // Text color
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        text(node.val, node.x, node.y);
      });
  }
}


