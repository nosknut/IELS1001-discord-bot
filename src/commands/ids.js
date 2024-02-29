const {ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show_id_controls')
        .setDescription('Shows buttons used to interact with the ids'),

    async execute(interaction) {
        const row = new ActionRowBuilder()

        const downloadIds = new ButtonBuilder()
            .setCustomId(`download_ids_button`)
            .setLabel('Download')
            .setStyle(ButtonStyle.Primary);

        const uploadIds = new ButtonBuilder()
            .setCustomId(`upload_ids_button`)
            .setLabel('Upload')
            .setStyle(ButtonStyle.Primary);

        const addIds = new ButtonBuilder()
            .setCustomId(`add_ids_button`)
            .setLabel('Add Ids')
            .setStyle(ButtonStyle.Primary);

        row.addComponents(
            downloadIds,
            uploadIds,
            addIds,
        );

        await interaction.reply({
            content: 'Id Controls',
            components: [row],
        });
    },
}
