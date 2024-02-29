const {client} = require("./clientSetup.js")
const {CONFIGS} = require("./configs.js")

const reportError = async (message, error) => {
    console.error(message, error)

    try {
        const errorChannel = CONFIGS.ERROR_CHANNEL;
        const guild = client.guilds.resolve(CONFIGS.GUILD_ID);
        const channel = guild.channels.resolve(errorChannel);
        const developerRole = CONFIGS.DEVELOPER_ROLE;
        const role = guild.roles.resolve(developerRole);
        await channel.send(`${role} ${message}: \`\`\`excel\n${error}\`\`\``);
    } catch (e) {
        console.error(`Unable to report error: ${message}`, e)
    }
}

module.exports = {
    reportError
}