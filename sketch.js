function setup() {
  canvas = createCanvas(600, 600);
  background("#111");
  textAlign(CENTER, CENTER);
  textSize(12);
  
  
  tree = new Tree();
  canvas.mousePressed(()=>{
    tree.insert(floor(random(1,200)));
  })
  console.log(tree);
  tree.drawTree();
}

function draw() {
  background("#111");
  tree.drawTree();
}