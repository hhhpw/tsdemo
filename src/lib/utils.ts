// export let eventUtil: Object = {
//     addHandler: function(el: HTMLElement, type: string, handler: Function): void {
//         if (el.addEventListener) {
//             el.addEventListener(type, handler, false);
//         } else if (el.attachEvent) {
//             el.attachEvent(type, handler, false);
//         }
//     }
// }

// export namespace Utils {
export let eventUtil: any = {
    addHandler: function(el: HTMLDivElement, type: string, handler: EventListener): void {
        if (el.addEventListener) {
            console.log('handler', handler);
            el.addEventListener(type, handler, false);
        }
    },
    removeHandler: function(el: HTMLDivElement, type: string, handler: EventListener): void {
        if (el.removeEventListener) {
            el.removeEventListener(type, handler, false);
        }
    }
    

}

export let lastName = 'leo';
// }

// export const toQueryString = (obj)  => {
// 	var ret = [];
// 	for (var key in obj) {
// 		key = encodeURIComponent(key);
// 		var values = obj[key];
// 		if (values && values.constructor == Array) { //数组
// 			var queryValues = [];
// 			for (var i = 0, len = values.length, value; i < len; i++) {
// 				value = values[i];
// 				queryValues.push(toQueryPair(key, value));
// 			}
// 			ret = ret.concat(queryValues);
// 		} else { //字符串
// 			ret.push(toQueryPair(key, values));
// 		}
//     }
// }

