const {getIds, writeIds} = require("../database/scheduleDatabase");
const {serializeIds} = require("../serializers");
const {Events} = require('discord.js');

// https://discordjs.guide/message-components/interactions.html#the-client-interactioncreate-event
module.exports = {
    name: Events.InteractionCreate,
    customId: 'add_ids_select_input',
    async execute(interaction) {
        if (interaction.customId !== 'add_ids_select_input') return;

        await interaction.deferReply({ephemeral: true})

        const ids = await getIds();
        const existingIds = ids.map(id => id.userid)
        const newIds = interaction.values.filter(id => !existingIds.includes(id))

        if (newIds.length > 0) {
            for (const id of newIds) {
                const name = interaction.users.get(id).globalName
                ids.push({
                    id: name.split(" ")[0].toLowerCase(),
                    name,
                    userid: id,
                })
            }

            await writeIds(ids)

            await interaction.editReply({
                content: `Ids was updated\n\`\`\`csv\n${serializeIds(ids)}\n\`\`\``,
                ephemeral: true,
            })
        } else {
            await interaction.editReply({
                content: `The selected users were alredy in the database`,
                ephemeral: true,
            })
        }
    }
}
