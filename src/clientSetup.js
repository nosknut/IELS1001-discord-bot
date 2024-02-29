// Require the necessary discord.js classes
const {Client, GatewayIntentBits} = require('discord.js');
const {CONFIGS} = require("./configs.js")

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// Log in to Discord with your client's token
client.login(CONFIGS.DISCORD_TOKEN);

module.exports = {
    client,
}
