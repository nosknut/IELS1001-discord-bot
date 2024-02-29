const {ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

module.exports = {
    name: 'button',
    customId: 'upload_schedule_button',
    async handler(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('upload_schedule_modal')
            .setTitle('Upload Schedule');

        const newScheduleInput = new TextInputBuilder()
            .setCustomId('upload_schedule_modal_text_input')
            .setLabel("New Schedule")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(newScheduleInput);

        // Add inputs to the modal
        modal.addComponents(firstActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);
    }
}
