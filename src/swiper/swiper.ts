/*
 * @Author: haopeiwei
 * @Date: 2019-08-16 14:52:10
 * @LastEditors: haopeiwei
 * @LastEditTime: 2019-08-16 18:34:01
 */

import "../public/css/normal.css";
import "./swiper.css";

const listElems = document.querySelectorAll('li') as NodeListOf<HTMLLIElement>;

// 第一个默认展示

class mySwiper {
  nodes: NodeListOf<HTMLLIElement>;
  // showIndex: 0;
  constructor(nodes) {
    this.nodes = nodes;
  }
  public config = {
    showIndex: 0,
    count: this.nodes && this.nodes.length,
  }
  public init(nodes = this.nodes) {
    // console.  
    nodes[0].classList.add("active");
    nodes[1].classList.add("right");
    nodes[this.nodes.length - 1].classList.add("left");
    this.switchAuto();
  }

  public switchAuto() {
    setInterval(() => {
      console.log("++++");
      // this.next();
    }, 1000);
  }

  // private next() {
  //   // for (let i = 0; i < this.config.count; i++) {
  //   //   this.nodes[0].classList.remove();
  //   // }
  //   if (this.config.showIndex < this.nodes.length - 1) {
  //     this.config.showIndex++;
  //   } else {
  //     this.config.showIndex = this.nodes.length - 1;
  //   }
  // }
}

const swiper = new mySwiper(listElems);
swiper.init();