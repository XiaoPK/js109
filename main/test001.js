function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}



let result = [];
let items = loadAllItems();
let inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];
for(let i = 0; i<inputs.length; i++){
    for(let j in items){
        if(items[j].barcode === inputs[i].substring(0,10)){
            if(!result[inputs[i]]){
                if(items[j].barcode===inputs[i]) {
                    result[inputs[i]] = 1;
                }else {
                    result[inputs[i].substring(0,10)] = parseInt(inputs[i].substring(11,12));
                }
            }else{
                result[inputs[i]]++;
            }
        }
    }
}
console.log(result);


let onSale = loadPromotions();
let zengPin = [];
for(let j in onSale){
    for(let i in onSale[j].barcodes){
        if(result[onSale[j].barcodes[i]] >= 2){
            zengPin[onSale[j].barcodes[i]] = 1;
        }
    }
}
console.log(zengPin);

let str = "***<没钱赚商店>购物清单***\n";
let countSmall = 0;
let countAll = 0;
for(let j in items){
    if(result[items[j].barcode]){
        countSmall = items[j].price*result[items[j].barcode];
        countAll += countSmall;
        str += '名称：'+items[j].name+'，数量：'+result[items[j].barcode]+items[j].unit+'，单价：'+
            items[j].price+"(元)，小计："+countSmall+"(元)\n"
    }
}


let str1 = "挥泪赠送商品：\n";
let countSave = 0;
for(let k in items){
    if(zengPin[items[k].barcode]){
        str1 += "名称："+items[k].name+"，数量："+zengPin[items[k].barcode]+items[k].unit+"\n";
        countSmall = items[k].price*zengPin[items[k].barcode];
        countSave += countSmall;
    }
}
let str2 = "总计："+countAll+"(元)\n"+"节省："+countSave+"(元)\n" ;

str += "----------------------\n" +str1 +"----------------------\n" +str2+"**********************";
console.log(str);