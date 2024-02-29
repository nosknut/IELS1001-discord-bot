const {ActionRowBuilder, ModalBuilder, UserSelectMenuBuilder} = require('discord.js');

module.exports = {
    name: 'button',
    customId: 'add_ids_button',
    async handler(interaction) {
        await interaction.reply({
            content: 'Add Ids',
            ephemeral: true,
            components: [new ActionRowBuilder()
                .addComponents(new UserSelectMenuBuilder({
                    custom_id: "add_ids_select_input",
                    placeholder: "Select users to add to id list",
                    min_values: 1,
                    max_values: 25,
                }))
            ],
        });
    }
}
