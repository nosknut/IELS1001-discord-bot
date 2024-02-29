// Require the necessary discord.js classes
require('dotenv/config');
const {Collection} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const {client} = require("./clientSetup.js");
const {startScheduleCronJob} = require('./updateRoles.js');

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.name === 'modal') {
		client.modals.set(event.customId, event.handler);
	} else if (event.name === 'button') {
		client.buttons.set(event.customId, event.handler);
	} else if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

startScheduleCronJob();