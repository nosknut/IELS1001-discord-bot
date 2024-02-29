const {CONFIGS} = require("../configs.js")

const {getIds, writeIds, getSchedule, writeSchedule} =
    CONFIGS.USE_FIREBASE ? require('./firebaseDb') : require('./fileDb');

const DAYS = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
}

async function getActiveUsers() {
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    const schedule = await getSchedule();
    const ids = await getIds();
    const activeUsers = new Set();
    for (const user of schedule) {
        if (DAYS[user.day] === now.getDay()) {
            if (user.start <= currentTime && user.end >= currentTime) {
                const idRecord = ids.find(entry => entry.id === user.user);
                if (!idRecord) {
                    throw new Error(`No id found for user ${user.user}`);
                }
                activeUsers.add(idRecord.userid);
            }
        }
    }
    return [...activeUsers];
}

async function getInactiveUsers() {
    const ids = (await getIds()).map(id => id.userid);
    const activeUsers = await getActiveUsers();
    const inactiveUsers = ids.filter(id => !activeUsers.includes(id));
    return inactiveUsers;
}

module.exports = {
    getSchedule,
    writeSchedule,
    getIds,
    writeIds,
    getActiveUsers,
    getInactiveUsers,
    DAYS,
}