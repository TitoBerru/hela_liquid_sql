const path = require("path");
const fs = require("fs");
const cmvFilePath = path.join(__dirname, "../dataBase/cmvJson.json");

let cmv = JSON.parse(fs.readFileSync(cmvFilePath, "utf-8"));

function convertToISODate (cmv) {
    const [day, month, yearAndTime] = cmv.split('/');
    const [year, time] = yearAndTime.split(', ');
    const [hours, minutes, seconds] = time.split(':');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}`;
  }

  module.exports = convertToISODate;