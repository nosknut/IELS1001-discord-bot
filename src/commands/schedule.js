const {ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show_schedule_controls')
        .setDescription('Shows buttons used to interact with the schedule'),

    async execute(interaction) {
        const row = new ActionRowBuilder()

        const refresh = new ButtonBuilder()
            .setCustomId(`refresh_schedule_button`)
            .setLabel('Refresh')
            .setStyle(ButtonStyle.Primary);

        const download = new ButtonBuilder()
            .setCustomId(`download_schedule_button`)
            .setLabel('Download')
            .setStyle(ButtonStyle.Primary);

        const upload = new ButtonBuilder()
            .setCustomId(`upload_schedule_button`)
            .setLabel('Upload')
            .setStyle(ButtonStyle.Primary);

        const rickroll = new ButtonBuilder()
            .setLabel('Contact Arne')
            .setURL('https://youtu.be/dQw4w9WgXcQ?si=Sc7-hfygOKOi8fZ-')
            .setStyle(ButtonStyle.Link);

        row.addComponents(
            refresh,
            download,
            upload,
            rickroll,
        );

        await interaction.reply({
            content: 'Schedule Controls',
            components: [row],
        });
    },
}
