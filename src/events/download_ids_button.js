const {getIds} = require("../database/scheduleDatabase")
const {serializeIds} = require("../serializers")

module.exports = {
    name: 'button',
    customId: 'download_ids_button',
    async handler(interaction) {
        await interaction.reply({
            content: `Current ids:\n\`\`\`csv\n${serializeIds(await getIds())}\n\`\`\``,
            ephemeral: true
        });
    }
}
