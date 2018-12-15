import '../../public/css/normal.css';
import './turntable.less';
import { eventUtil } from '../../lib/utils.ts';

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
}


// console.log('DASDADA', lastName);


class Turntable {
    public config: IConfig  = {
        startPosition: -1,
        prizePosition: null,
        isClick: false,
        isShowToast: false,
        toastMes: null,
        times: 65,
        speed: 20,
        cycle: 30,
        switch: document.querySelectorAll('.item')[4] as HTMLDivElement,
    };
    public normal() {
        // let eles: NodeListOf<Element> = ;
        let eles: HTMLElement[] = Array.prototype.slice.call(document.querySelectorAll('.item'));
        // console.log(array);
        // for (let i = 0; i < eles.length; i++) {
        //     eles[i]['style'].backgroundColor = 'yellow';
        //     eles[i]['setAttribute']('prize', `我是${i + 1}等奖`);
        // }
        eles.forEach((d, i) => {
            d.style.backgroundColor = 'yellow';
            d.setAttribute('prize', `我是${i + 1}等奖`);
        })
        // Array.prototype.slice(NodeList);
        // let switchDiv = 
        // switchDiv.style.backgroundColor = 'red';

        // eventUtil.addHandler(switchDiv, 'click', this.test(event));
 
    };
    public test(e) {
        console.log(e);
        e.stopImmediatePropagation();
    };

    public startLottery() {
        if (this.config.isClick || this.config.isShowToast) {
            return false;
        }
        let position = this.randonNum();
        this.config.prizePosition = position;
        alert(this.config.prizePosition);
    }
}

const randonNum = (): number => {
    let num = Math.floor(Math.random() * 8 ) + 1;
    if (num === 5) {
        randonNum();
    } 
    return num;
}


window.onload = () => {
    const turntable = new Turntable();
    // let turntable: IConfig;
    turntable.normal();

    const config: IConfig  = {
        startPosition: -1,
        prizePosition: null,
        isClick: false,
        isShowToast: false,
        toastMes: null,
        times: 65,
        speed: 20,
        cycle: 30,
        switch: document.querySelectorAll('.item')[4] as HTMLDivElement,
    };
    const prizePos = randonNum();
    config.prizePosition = prizePos;


    
    // eventUtil.addHandler(turntable.config.switch, 'click', test);
}

