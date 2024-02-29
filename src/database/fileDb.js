const fs = require('fs');
const {parseCsv, serializeIds, serializeSchedule} = require('../serializers');

const SCHEDULE_PATH = "./data/schedule.csv";
const IDS_PATH = "./data/ids.csv";

async function getSchedule() {
  return parseCsv(fs.readFileSync(SCHEDULE_PATH));
}

async function writeSchedule(schedule) {
  fs.writeFileSync(SCHEDULE_PATH, serializeSchedule(schedule));
}

async function getIds() {
  return parseCsv(fs.readFileSync(IDS_PATH));;
}

async function writeIds(ids) {
  fs.writeFileSync(IDS_PATH, serializeIds(ids));
}

module.exports = {
  getSchedule,
  writeSchedule,
  getIds,
  writeIds,
}