const {updateActiveUserRole} = require("../updateRoles")

module.exports = {
    name: 'button',
    customId: 'refresh_schedule_button',
    async handler(interaction) {
        await interaction.deferReply({ ephemeral: true });
        
        await updateActiveUserRole(true)
            .then(async () => {
                await interaction.editReply({
                    content: 'Roles have been updated according to the new schedule.',
                    ephemeral: true
                });
            })
            .catch(async (e) => {
                await interaction.editReply({
                    content: `Error: ${e}`,
                    ephemeral: true
                });
                throw e;
            })
    }
}
