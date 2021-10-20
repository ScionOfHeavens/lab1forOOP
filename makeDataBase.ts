import * as fs from 'fs';
import { arrayBuffer } from 'stream/consumers';

let role : string[]=["employee","manager","Elder manager","CEO"];

for (let i : number = 0;i<100;i++){
    let k : number = Math.round(Math.random()*100)%4;
    let buffer : string = i + " name" + i + " " + role[k] + "\n";
    fs.appendFileSync("./DataBase.txt", buffer);
}