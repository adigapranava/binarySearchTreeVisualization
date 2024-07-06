function Node(n, x=0,y=0 ){
  this.val = n;
  this.left = null;
  this.right = null;
  
  this.x=x;
  this.y=y;
  this.targetX=0;
  this.targetY=0;
  this.nodeSpeed = 0.05;
  this.nodeColor = "#ED225D";
}

Node.prototype.addNode = function(n, rootX, rootY){
  if(n < this.val){
    if(this.left == null){
      this.left = new Node(n, rootX, rootY);
    }else{
      this.left.addNode(n, rootX, rootY);
    }
  }else if(n > this.val){
    if(this.right == null){
      this.right = new Node(n, rootX, rootY);
    }else{
      this.right.addNode(n, rootX, rootY);
    }
  }
}

Node.prototype.traverse  = function(){
  if(this.left != null){
    this.left.traverse();
  }
  console.log(this.val);
  if(this.right != null){
    this.right.traverse();
  } 
}

Node.prototype.search = function(n){
  if(this.val == n){
    // console.log("FOUND");
    return this;
  }else if (this.val > n && this.left != null){
    return this.left.search(n);
  }else if (this.val < n && this.right != null){
    return this.right.search(n);
  }
  return null;
}

Node.prototype.getNodes = function(){
  let elements = [];
  let leftElements = [];
  let rightElements = [];
  if(this.left != null){
    leftElements = this.left.getNodes();
  }
  elements = [...leftElements, ...[this.val]]
  if(this.right != null){
    rightElements = this.right.getNodes();
  } 
  elements = [...elements, ...rightElements];
  return elements;
}

Node.prototype.findLeafNodes = function(){
  let leafCount = 0;
  if(this.left == null && this.right == null){
    leafCount = leafCount + 1;
  }else{
    if(this.right != null){
      leafCount = leafCount + this.right.findLeafNodes();
    }
     if(this.left != null){
      leafCount = leafCount + this.left.findLeafNodes();
    }
  }
  return leafCount;
}

Node.prototype.moveNode = function(){
  this.x += (this.targetX - this.x) * this.nodeSpeed;
  this.y += (this.targetY - this.y) * this.nodeSpeed;
}

// Node.prototype.drawNode = function(parent){
//   console.log("Drwing");
//   if(parent != null){
//     //not root node
//     line(parent.x, parent.y, this.x, this.y);
//   }
//   fill(100,255,100); // Circle color
//   ellipse(this.x, this.y, 30, 30); // Circle size
//   fill(50); // Text color
//   text(this.val, this.x, this.y);

//   if(this.left!=null){
//     this.left.drawNode(this);
//   }
//   if(this.right!=null){
//      this.right.drawNode(this); 
//   }
// }