const {getSchedule} = require("../database/scheduleDatabase")
const {serializeSchedule} = require("../serializers")

module.exports = {
    name: 'button',
    customId: 'download_schedule_button',
    async handler(interaction) {
        await interaction.reply({
            content: `Current Schedule:\n\`\`\`csv\n${serializeSchedule(await getSchedule())}\n\`\`\``,
            ephemeral: true
        });
    }
}
