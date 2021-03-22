let str=prompt("nhap chuoi de kiem tra:");
let flag=true;
let length=str.length;
for (let i = 0; i < Math.floor(length/2); i++) {
    if(str[i]!=str[(length-1)-i]){
        flag=false;
        break;
    }
}

console.log(flag);