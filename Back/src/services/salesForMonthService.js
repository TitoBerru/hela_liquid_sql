const path = require("path");
const fs = require("fs");
const cmvFilePath = path.join(__dirname, "../dataBase/cmvJson.json");
let cmv = JSON.parse(fs.readFileSync(cmvFilePath, "utf-8"));
let TotalForMonthDetail =[];
let totalForMonthCost = 0;

//funcion para convertir las fechas a ISO 8601 (yyyy-mm-dd)
function convertToISODate(cmv) {
    const [day, month, yearAndTime] = cmv.split('/');
    const [year, time] = yearAndTime.split(', ');
    const [hours, minutes, seconds] = time.split(':');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}`;
  }

const salesForMonth ={
    salesForMontDetail :(month)=> {
            return cmv.filter(item => {
                const createdAtDate = new Date(convertToISODate(item.createdAt));
                
                if (createdAtDate.getMonth() === month){
                    TotalForMonthDetail.push(item)
                };
            });
            
    },
    salesForMontCost :(month)=>{
        cmv;
        salesForMonth.salesForMontDetail(month)
        totalForMonthCost = TotalForMonthDetail.reduce((acum, actual) => acum + (actual.nico +actual.Vg + actual.Pg + actual.totalEsencias + actual.frasco)*actual.quantity,0)
        console.log('consle desde servcios salesformMontcost: ',totalForMonthCost)
        return totalForMonthCost;
       }

    

    
}

module.exports = salesForMonth;
// salesForMonth.salesForMontCost(7)
// console.log ('console.log desde linea 47 salesForMonthServices: ', totalForMonthCost)