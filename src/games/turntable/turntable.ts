import '../../public/css/normal.css';
import './turntable.less';
// // import { eventUtil } from '../../lib/utils.ts';

interface IConfig {
    startPosition: number,
    prizePosition: number | null,
    isClick: boolean,
    isShowToast: boolean,
    toastMes: string | null,
    times: number,
    speed: number,
    cycle: number,
    switch: HTMLDivElement,
    ativeArray: Array<number>,
    currentPos: number,
    timer: any,
}

class Lottery {
    public config: IConfig = {
        startPosition: -1,
        prizePosition: null,
        isClick: false,
        isShowToast: false,
        toastMes: null,
        times: 0,
        speed: 200,
        cycle: 65,
        switch: document.querySelector('#switch') as HTMLDivElement,
        ativeArray: [0, 1, 2, 5, 8, 7, 6, 3], // 转盘抽奖顺序索引
        currentPos: -1,
        timer: null,
   }

    public normal() {
        let eles: HTMLElement[] = Array.prototype.slice.call(document.querySelectorAll('.item'));
        eles.forEach((d, i) => {
            if (i !== 4) {
                d.setAttribute('prize', `我是${i + 1}等奖`);
            } else {
                d.setAttribute('prize', '开始');
            }
            
        });
    }


    public randonNum(): number {
        let num = Math.floor(Math.random() * 8 ); // [0, 7]
        if (num === 5) {
            this.randonNum();
        } 
        return num;
    }

    public startLottery(config) {
        config.times += 1;
        this.rollHander(config);
        if ((config.times >= config.cycle) && (config.prizePosition === config.currentPos)) {
            let prizeDOM: HTMLDivElement = document.querySelectorAll('.item')[config.ativeArray[config.currentPos]] as HTMLDivElement;
            clearTimeout(config.timer);
            alert(prizeDOM.getAttribute('prize'));
            // 重置
            config.isClick = false;
            config.currentPos = -1;
            config.times = 0;
        } else {
            // 末尾减速
            if (config.times < config.cycle && config.times > 55) {
                config.speed += 30;
            } else if (config.times >= 10 && config.times <= 55) {
                // 中间加速
                config.speed -= 30;
            }
            if (config.speed < 40) {
                // 设置个恒定
                config.speed = 40;
            }
            config.timer = setTimeout(() => {
                this.startLottery(config);
            }, config.speed);
            
        }
        return false;
    }

    public rollHander(config) {
        let eles: HTMLElement[] = Array.prototype.slice.call(document.querySelectorAll('.item'));
        for (let i = 0; i <= eles.length - 1; i++) {
            eles[i].classList.remove('active');
        }

        if (config.currentPos === 7) {
            config.currentPos = 0;
        } else {
            config.currentPos += 1;
        }
        eles[config.ativeArray[config.currentPos]].classList.add('active');
        return false;
    }

}

window.onload = function() {
    const lottery = new Lottery();
    lottery.normal();
    let switchDOM = document.querySelector('#switch') as HTMLDivElement;
    switchDOM.addEventListener('click', function() {
        if (lottery.config.isClick || lottery.config.isShowToast) {
            return false;
        }
        lottery.config.isClick = true;
        lottery.config.prizePosition = lottery.randonNum();
        lottery.startLottery(lottery.config);
    }, false)
}

