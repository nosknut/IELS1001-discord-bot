require('dotenv/config');
const fileDb = require('./database/fileDb')
const firebaseDb = require('./database/firebaseDb')

async function main() {
    const schedule = await fileDb.getSchedule()
    const ids = await fileDb.getIds()

    await firebaseDb.writeSchedule(schedule)
    await firebaseDb.writeIds(ids)
}

main()