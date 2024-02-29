const cron = require('node-cron');
const {getActiveUsers, getIds, getInactiveUsers} = require("./database/scheduleDatabase.js")
const {client} = require("./clientSetup.js");
const {CONFIGS} = require("./configs.js")
const {reportError} = require("./reportError.js");

let firstRun = true;
const activeUsersCache = new Set();

async function updateActiveUserRole(clearCache = false) {
    console.log('Updating roles ...');

    if (clearCache) {
        activeUsersCache.clear();
        firstRun = true;
    }

    const userDatabase = await getIds();

    const guildId = CONFIGS.GUILD_ID;
    const activeRole = CONFIGS.ACTIVE_ROLE;
    const guild = client.guilds.resolve(guildId);

    const activeUserIds = await getActiveUsers();
    const inactiveUserIds = await getInactiveUsers();

    for (const user of activeUserIds) {
        if (!activeUsersCache.has(user) || firstRun) {
            const nickname = userDatabase.find(id => id.userid === user).name;
            try {
                await guild.members.addRole({
                    role: activeRole,
                    user: user
                })
                console.log(`Added role ${activeRole} to user ${user} with nickname ${nickname}`)
                activeUsersCache.add(user);
            } catch (e) {
                reportError(`Error adding role ${activeRole} to user ${user} with nickname ${nickname}`, e);
            }
        }
    }

    for (const user of inactiveUserIds) {
        if (activeUsersCache.has(user) || firstRun) {
            const nickname = userDatabase.find(id => id.userid === user).name;
            try {
                await guild.members.removeRole({
                    role: activeRole,
                    user: user
                })
                console.log(`Removed role ${activeRole} from user ${user} with nickname ${nickname}`)
                activeUsersCache.delete(user);
            } catch (e) {
                reportError(`Error removing role ${activeRole} from user ${user} with nickname ${nickname}`, e);
            }
        }
    }

    firstRun = false;

    console.log("Done!")
}

function startScheduleCronJob() {
    // Run task every minute
    // https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
    cron.schedule('* * * * *', function () {
        updateActiveUserRole().catch(console.error);
    });
}

module.exports = {
    updateActiveUserRole,
    startScheduleCronJob
}
