import { formatCurrency } from "../../script/utils/money.js";

console.log('Test suit: formatCurrency')

console.log('convert cents into dollars')

if (formatCurrency(2095) === '20.95') {
    console.log("passed");
}

else {
    console.log('failed');
}

console.log('working with 0')
if (formatCurrency(0) === '0.00') {
    console.log('passed')
}
else {
    console.log('faild')
}


console.log('round up the nearest cent')
if (formatCurrency(2000.5) === '20.01' && formatCurrency(2000.4) === '20.00') {
    console.log('passed')
}
else {
    console.log('failed')
}

console.log('test with the negative number')
if(formatCurrency(-2000) === '-20.00'){
    console.log('passed')
}
else{
    console.log('faild')
}