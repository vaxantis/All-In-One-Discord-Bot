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

        const mapIntCmds = client.applicationcommandsArray.map((v) => `\`${(v.type === 2 || v.type === 3) ? '' : '/'}${v.name}\`: ${v.description || '(No description)'}`);
        
      const cmds = new ButtonBuilder()
        .setLabel('Commands')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('cmds')
        
        const row = new ActionRowBuilder()
        .addComponents(cmds);

       const help = new EmbedBuilder()
    .setTitle('Get Started with Nalo Tech')
    .setDescription("Here’s how you can get started and make the most of our community:")
    .setColor('#0099ff')
    .addFields(
        { name: '💡 Getting Started', value: 'Simply use the available commands in your server. For further assistance, refer to the Support Server.' },
        { name: '🌐 Support Team', value: 'Need more help or want to report an issue? Create a ticket and our Support Team will help you out.' },
        { name: '🔄 Updates', value: 'Stay updated with the latest features and improvements by checking announcements in the Support Server.' },
        { name: '❓ FAQs', value: 'Common questions and answers can be found in the FAQ section of the Support Server.' },
        { name: '📨 Feedback', value: 'We value your feedback! Share your suggestions or report bugs directly in the Support Server.' }
    )
    .setFooter({ text: 'Thank you for using our bot! Your support helps us grow.', iconURL: 'https://cdn.discordapp.com/attachments/1261044599372386395/1275204267594223717/image0.jpg?ex=66c5b2c5&is=66c46145&hm=54a66fa6466718b673934ddc78dc128f05a2f5cdf0de7d5e3425c4c9ad24ba05&' });


        await interaction.followUp({embeds: [help], components: [row]});
    }
};
