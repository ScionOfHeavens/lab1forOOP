import * as fs from 'fs';

//Client
class Lock{
    open : boolean = false;
    DataBase : IntarfaceEmployeeDataBase;
    constructor(DB : IntarfaceEmployeeDataBase){
        this.DataBase = DB;
    }

    getAccess(id : number){
        console.log("Some one want to open door!\n");
        let temp = this.DataBase.getRecordByRecordId(id)
        console.log(temp)
        if(temp.search("CEO")!=-1){
            this.open = true;
            console.log("Ne Beep-beep luchshe:D");
        }
        else{
            console.log("Beep-beep-beep-beep-beep");
            this.open = false;
        }
    }
}

interface IntarfaceEmployeeDataBase{
    getRecordByRecordId(recordId:number) : string;
}

class ProxyCachedEmployeeDataBase implements IntarfaceEmployeeDataBase{
    
    constructor (DataBase : IntarfaceEmployeeDataBase){
        this.emploeeDataBase = DataBase;
        this.LockCashe = [];
    }

    getRecordByRecordId(recordId: number) : string {
        let record = this.LockCashe.find((element,index,array)=>{return element[0]==recordId});
        if(record != undefined){
            console.log("I found it in cashe:)\n");
            return record[1];
        }
        else{
            record = [recordId,this.emploeeDataBase.getRecordByRecordId(recordId)];
            this.addNewCashe(record);
            return record[1]
        }
    }

    addNewCashe(record : [number,string]){
        console.log("I'm adding cahse "+record[0]+" "+record[1]+"\n");

        if(this.LockCashe.length == this.MAX_CASHE){
            this.LockCashe.shift();
        }
        this.LockCashe.push(record);
    }

    private MAX_CASHE = 10;
    private LockCashe : [number,string][];
    private emploeeDataBase : IntarfaceEmployeeDataBase;

}

class EmployeeDataBase implements IntarfaceEmployeeDataBase{
    getRecordByRecordId(recordId: number) : string {
        let buffer = fs.readFileSync("./DataBase.txt").toString();
        let records = buffer.split("\n");
        for(let record of records){
            let columns = record.split(" ");
            if(columns[0]==recordId.toString()){
                console.log("\nI found this record: " + record +"\n");
                console.log("Role is " + columns[2] +"\n");
                return columns[2];
            }
        }
        return "0";
    }
}

let lock : Lock = new Lock(new ProxyCachedEmployeeDataBase(new EmployeeDataBase()));

lock.getAccess(2);
lock.getAccess(5);
lock.getAccess(3);
lock.getAccess(6);
lock.getAccess(12);
lock.getAccess(54);
lock.getAccess(200);
lock.getAccess(53);
lock.getAccess(2);
lock.getAccess(5);