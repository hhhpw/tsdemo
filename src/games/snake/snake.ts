/*
 * @Author: haopeiwei
 * @Date: 2019-08-07 17:34:23
 * @LastEditors: haopeiwei
 * @LastEditTime: 2019-08-15 18:22:58
 */
import "./snake.less";

// 盒子生成
let box: Element = document.querySelectorAll(".box")[0];
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1600; i++) {
  let ele: HTMLElement = document.createElement("div");
  ele.classList.add("item");
  ele.setAttribute("position", getLogLat(i));
  fragment.append(ele);
}


function getLogLat(i: number): string {
  return `${[(i % 50) + 1, Math.ceil((i + 1) / 50)]}`;
}

box.append(fragment);

function Node(x: number, y: number): void {
  this.x = x;
  this.y = y;
}

function Snake() {
  this.foodPos = {};
  this.oldSnakeNodes;
  this.snakeNodes = [];
  this.timer = null;
  this.snakeNodes.push(new Node(29, 2));
  this.snakeNodes.push(new Node(30, 2));
  this.snakeNodes.push(new Node(31, 2));
  this.snakeNodes.push(new Node(32, 2));
  // 末尾是蛇头
  this.snakeNodes.push(new Node(33, 2));
};
// 删除旧蛇属性
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
    let snakeBodyElem = document.querySelector(`div[position="${[xPos, yPos]}"]`) as HTMLElement;
    snakeBodyElem.classList.remove("snakeHead");
    if (i === this.snakeNodes.length - 1) {
      snakeBodyElem.classList.add("snakeHead");
    } else {
      snakeBodyElem.classList.add("snakeBody");
    }
  }
};
// 游戏中止
Snake.prototype.isGameOver = function (nodes: Array<{ x: number, y: number }>) {
  // 蛇头碰触边界
  return new Promise((reslove, reject) => {
    const headX = nodes[nodes.length - 1].x;
    const headY = nodes[nodes.length - 1].y;
    const snakeBody = nodes.slice(0, nodes.length - 1);
    // 超过边界
    if (headX > 50 || headX < 1 || headY < 1 || headY > 32) {
      reject("超过边界");
      // 咬到自身
    } else if (snakeBody.some(d => (d.x === headX) && (d.y === headY))) {
      reject("咬到自己");
    } else {
      reslove();
    }
  })
};
Snake.prototype.moveSnake = function (code: number) {
  // 新的蛇的坐标集合 是老坐标集合的后一位
  this.oldSnakeNodes = [].concat(this.snakeNodes);
  for (let k = 0; k < this.snakeNodes.length - 1; k++) {
    this.snakeNodes[k] = this.snakeNodes[k + 1];
  }
  let xHeader = this.snakeNodes[this.snakeNodes.length - 1].x;
  let yHeader = this.snakeNodes[this.snakeNodes.length - 1].y;
  switch (code) {
    case 39:
      //右 
      this.snakeNodes[this.snakeNodes.length - 1] = { x: xHeader + 1, y: yHeader };
      break;
    case 40:
      //下 
      this.snakeNodes[this.snakeNodes.length - 1] = { x: xHeader, y: yHeader + 1 };
      break;
    case 38:
      //上 
      this.snakeNodes[this.snakeNodes.length - 1] = { x: xHeader, y: yHeader - 1 };
      break;
    case 37:
      //左 
      this.snakeNodes[this.snakeNodes.length - 1] = { x: xHeader - 1, y: yHeader };
      break;
    default:
      break;
  }
  this.isGameOver(this.snakeNodes).then(() => {
    this.isHavingFood();
    this.removeSnakeAttr();
    this.printSnake(code, this.snakeNodes);
    // 增加难度
    let speed;
    if (this.snakeNodes.length <= 6) {
      speed = 300;
    } else if (this.snakeNodes.length >= 7 && this.snakeNodes.length < 12) {
      speed = 200;
    } else {
      speed = 50;
    }
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      // console.log("move");
      this.moveSnake(code);
    }, speed);
  }).catch((err) => {
    clearInterval(this.timer);
    this.timer = 0;
    alert(err + "了，蔡徐坤");
    this.reload();
  })
};
// 是否吃到食物
Snake.prototype.isHavingFood = function () {
  const snakeHead = this.snakeNodes[this.snakeNodes.length - 1];
  const snakeEnd = this.oldSnakeNodes[0];
  // 是否吃到食物
  if (snakeHead.x === this.foodPos.x && snakeHead.y === this.foodPos.y) {
    this.snakeNodes.unshift(snakeEnd);
    this.AddScore();
    this.printFood();
  }
};
// 绘制食物
Snake.prototype.printFood = function () {
  // 1=>32 1=>50 且不在蛇身坐标点
  if (this.foodPos.x && this.foodPos.y) {
    let foodDom = document.querySelector(`div[position="${[this.foodPos.x, this.foodPos.y]}"]`) as HTMLDivElement;
    foodDom.classList.remove("food");
  }
  let food = this.randomFoodPos();
  this.foodPos = food;
  let snakeDom = document.querySelector(`div[position="${[food.x, food.y]}"]`) as HTMLElement;
  snakeDom.classList.add("food");
};
// 生成随机数
Snake.prototype.randomFoodPos = function () {
  let position = { x: Math.floor(Math.random() * 50 + 1), y: Math.floor(Math.random() * 32 + 1) };
  if (this.snakeNodes.some(d => d.x === position.x || d.y === position.y)) {
    this.randomFoodPos();
  }
  return position;
};
// 初始化
Snake.prototype.reload = function () {
  window.location.reload();
};
// 添加分数
Snake.prototype.AddScore = function () {
  let socre = document.getElementsByClassName("score")[0] as HTMLElement;
  socre.innerHTML = String(Number(socre.innerHTML) + 1);
};

const snakeIns = new Snake();
snakeIns.printSnake();
snakeIns.printFood();

window.addEventListener("keydown", function (event) {
  let e = event || window.event;
  let code = e.keyCode || e.which;
  if (code === 39 || code === 40 || code === 38 || code === 37) {
    snakeIns.moveSnake(code);
  }
})


