const {db} = require("./firebaseSetup");
const {ref, set, get} = require("firebase/database");

const SCHEDULE_PATH = "schedule";
const IDS_PATH = "ids";

async function getSchedule() {
  return (await get(ref(db, SCHEDULE_PATH))).val();
}

async function writeSchedule(schedule) {
  await set(ref(db, SCHEDULE_PATH), schedule);
}

async function getIds() {
  return (await get(ref(db, IDS_PATH))).val();
}

async function writeIds(ids) {
  await set(ref(db, IDS_PATH), ids);
}

module.exports = {
  getSchedule,
  writeSchedule,
  getIds,
  writeIds,
}