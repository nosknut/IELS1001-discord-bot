const {Events} = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		} else if (interaction.isButton()) {
			const handler = interaction.client.buttons.get(interaction.customId);

			if (!handler) {
				console.error(`No button matching ${interaction.customId} was found.`);
				return;
			}

			try {
				await handler(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.customId}`);
				console.error(error);
			}
		} else if (interaction.isModalSubmit()) {
			const handler = interaction.client.modals.get(interaction.customId);

			if (!handler) {
				console.error(`No modal matching ${interaction.customId} was found.`);
				return;
			}

			try {
				await handler(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.customId}`);
				console.error(error);
			}
		}
	},
};