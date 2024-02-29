const {writeIds, getIds} = require("../database/scheduleDatabase");
const {serializeIds, parseCsv} = require("../serializers");

module.exports = {
    name: 'modal',
    customId: 'upload_ids_modal',
    async handler(interaction) {
        const newIds = interaction.fields.getTextInputValue('upload_ids_modal_text_input');

        await interaction.deferReply({ephemeral: true});

        await writeIds(parseCsv(newIds))

        await interaction.editReply({
            content: `Ids was updated\n\`\`\`csv\n${serializeIds(await getIds())}\n\`\`\``,
            ephemeral: true,
        })
    }
}
