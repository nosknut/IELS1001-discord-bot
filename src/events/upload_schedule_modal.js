const {writeSchedule, getSchedule} = require("../database/scheduleDatabase");
const {serializeSchedule, parseCsv} = require("../serializers");
const {updateActiveUserRole} = require("../updateRoles")

module.exports = {
    name: 'modal',
    customId: 'upload_schedule_modal',
    async handler(interaction) {
        const newSchedule = interaction.fields.getTextInputValue('upload_schedule_modal_text_input');

        await interaction.deferReply({ephemeral: true});

        await writeSchedule(parseCsv(newSchedule))

        await updateActiveUserRole(true)
            .then(async () => {
                await interaction.editReply({
                    content: `Schedule was updated\n\`\`\`csv\n${serializeSchedule(await getSchedule())}\n\`\`\``,
                    ephemeral: true,
                })
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
