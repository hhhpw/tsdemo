import "./snake.less";
// 盒子生成
let box: Element = document.querySelectorAll(".box")[0];
const fragment = document.createDocumentFragment();

// let nodes: Array<any> = [];


for (let i = 0; i < 1600; i++) {
  let ele: HTMLElement = document.createElement("div");
  ele.classList.add("item");
  ele.setAttribute("position", getLogLat(i));
  // if (i === 77 || i === 76 || i === 75) {
  //   ele.classList.add("snakeBody");
  // }
  // if (i === 78) {
  //   ele.classList.add("snakeBody");
  //   ele.classList.add("snakeHead");
  // }
  fragment.append(ele);
}

function getLogLat(i) {
  // if (i % 50 === 0)
  // nodes.push([(i % 50) + 1, Math.ceil((i + 1) / 50)]);
  // if ( i + 1)
  return `${[(i % 50) + 1, Math.ceil((i + 1) / 50)]}`;
}

// 宽高50 * 80  共1600个方块 坐标集合【1，50】 * 【1，32】
box.append(fragment);

// console.log("nodes", nodes);

function Node(x: number, y: number) {
  this.x = x;
  this.y = y;
}
function Snake() {
  this.oldSnakeNodes = [];
  this.snakeNodes = [];
  this.snakeNodes.push(new Node(29, 2));
  this.snakeNodes.push(new Node(30, 2));
  this.snakeNodes.push(new Node(31, 2));
  this.snakeNodes.push(new Node(32, 2));
  // 末尾是蛇头
  this.snakeNodes.push(new Node(33, 2));
  Snake.prototype.removeSnakeAttr = function () {
    for (let i = 0; i < this.oldSnakeNodes.length; i++) {
      let xPos = this.oldSnakeNodes[i].x;
      let yPos = this.oldSnakeNodes[i].y;
      let snakeBodyElem = document.querySelector(`div[position="${[xPos, yPos]}"]`) as HTMLElement;
      snakeBodyElem.classList.remove("snakeHead");
      snakeBodyElem.classList.remove("snakeBody");
    }
  };
  Snake.prototype.printSnake = function () {
    this.oldSnakeNodes = [].concat(this.snakeNodes);
    for (let i = 0; i < this.snakeNodes.length; i++) {
      let xPos = this.snakeNodes[i].x;
      let yPos = this.snakeNodes[i].y;
      console.log(xPos, yPos);
      let snakeBodyElem = document.querySelector(`div[position="${[xPos, yPos]}"]`) as HTMLElement;
      snakeBodyElem.classList.remove("snakeHead");
      if (i === this.snakeNodes.length - 1) {
        snakeBodyElem.classList.add("snakeHead");
      } else {
        snakeBodyElem.classList.add("snakeBody");
      }
    }
  };
  Snake.prototype.isGameOver = function (code: number, xPos: number, yPos: number) {
    console.log("xPos", xPos, "yPos", yPos);
    const rangeX = [1, 50];
    const rangY = [1, 32];
    if ((yPos === rangY[0] || yPos === rangY[1]) && (code === 38 || code === 40)) {
      alert("游戏结束");
      return true;
    }

    if ((xPos === rangeX[0] || xPos === rangeX[1]) && (code === 37 || code === 39)) {
      alert("游戏结束");
      return true;
    }

  };
  Snake.prototype.moveSnake = function (code: number) {
    // 新的蛇的坐标集合 是老坐标集合的后一位
    this.oldSnakeNodes = [].concat(this.snakeNodes);
    // let isOver = this.isGameOver(code, this.oldSnakeNodes[this.oldSnakeNodes.length - 1].x,
    //   this.oldSnakeNodes[this.oldSnakeNodes.length - 1].y);
    this.isGameOver(code, this.oldSnakeNodes[this.oldSnakeNodes.length - 1].x,
      this.oldSnakeNodes[this.oldSnakeNodes.length - 1].y);
    // t p = new Promise((resolve, reject) => {
    //   let flag = this.isGameOver();
    //   if (flag) {
    //     resolve();
    //   } else {
    //     reject();
    //   }
    // })
    // console.log("isOver", isOver);
    // isOver.then((res) => {
    //   console.log("res", res);
    // })
    // 【1，2，3】 =》 【2，3，4】
    for (let k = 0; k < this.snakeNodes.length - 1; k++) {
      this.snakeNodes[k] = this.snakeNodes[k + 1];
    }
    console.log("this.snakeNodes", this.snakeNodes);
    console.log(this.snakeNodes[this.snakeNodes.length - 1]);
    let xHeader = this.snakeNodes[this.snakeNodes.length - 1].x;
    let yHeader = this.snakeNodes[this.snakeNodes.length - 1].y;
    switch (code) {
      case 39:
        //右  console.log("右");
        this.snakeNodes[this.snakeNodes.length - 1] = { x: xHeader + 1, y: yHeader };
        break;
      case 40:
        //下   console.log("下");
        this.snakeNodes[this.snakeNodes.length - 1] = { x: xHeader, y: yHeader + 1 };
        break;
      case 38:
        //上  console.log("上");
        this.snakeNodes[this.snakeNodes.length - 1] = { x: xHeader, y: yHeader - 1 };

        break;
      case 37:
        //左  console.log("左");
        this.snakeNodes[this.snakeNodes.length - 1] = { x: xHeader - 1, y: yHeader };
        break;

      default:
        break;
    }

    this.removeSnakeAttr();
    this.printSnake();
    // 蛇头根据方向去修改

  }
}

const snakeIns = new Snake();
// console.log("t", t);
snakeIns.printSnake();

window.addEventListener("keydown", function (event) {
  let e = event || window.event;
  let code = e.keyCode || e.which
  if (code === 39 || code === 40 || code === 38 || code === 37) {
    snakeIns.moveSnake(code)
  }
})
