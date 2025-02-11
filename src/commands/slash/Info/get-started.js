const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const GuildSchema = require('../../../schemas/GuildSchema');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('get-started')
        .setDescription('View all the possible commands!'),
    options: {
        cooldown: 15000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        await interaction.deferReply();

        let prefix = config.handler.prefix;

        if (config.handler?.mongodb?.enabled) {
            try {
                const data = (await GuildSchema.findOne({ guild: message.guildId }));

                if (data && data?.prefix) prefix = data.prefix;
            } catch {
                prefix = config.handler.prefix;
            };
        };

        const mapIntCmds = client.applicationcommandsArray.map((v) => `\`${(v.type === 2 || v.type === 3) ? '' : '/'}${v.name}\`: ${v.description || '(No description)'}`);
        const mapPreCmds = client.collection.prefixcommands.map((v) => `\`${prefix}${v.structure.name}\` (${v.structure.aliases.length > 0 ? v.structure.aliases.map((a) => `**${a}**`).join(', ') : 'None'}): ${v.structure.description || '(No description)'}`);
        
        const invite = new ButtonBuilder()
        .setLabel('Invite bot!')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.com/oauth2/authorize?client_id=1217220951171928214&permissions=19269862042870&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2FwwehxqRKe4&scope=guilds.join+bot')
        .setEmoji('🔗')
        
        const row = new ActionRowBuilder()
        .addComponents(invite);

       const help = new EmbedBuilder()
                    .setTitle('Help command')
                    .setDescription("For more support, please join our Support Server [here](https://discord.gg/xbFdfNbKnC)")
                    .addFields(
                        { name: 'Slash commands', value: `${mapIntCmds.join('\n')}` },
                        { name: 'Prefix commands', value: `${mapPreCmds.join('\n')}` }
                    )
       
        const expired = new EmbedBuilder()
       .setTitle("Expired!")
       .setDescription("The help menu has expired because it has been used too long ago. Please use it again by executing the </help:1218973589491941429> command!")
       .setColor("Red")
        
        await interaction.followUp({embeds: [help], components: [row]});
        await wait(20_000)
        await interaction.editReply({embeds: [expired], components: []})
    }
};
