const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

const COMMANDS_PER_PAGE = 10; // Number of commands per page

module.exports = {
    customId: 'cmds',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        // Filter out developer commands
        const commands = client.applicationcommandsArray
            .filter((v) => !v.isDeveloperCommand) // Adjust the condition to match how you identify dev commands
            .map((v) => ({
                name: `${(v.type === 2 || v.type === 3) ? '' : '/'}${v.name}`,
                value: v.description || '(No description)',
                inline: false // or true if you want them to be inline
            }));

        const totalPages = Math.ceil(commands.length / COMMANDS_PER_PAGE);

        // Function to create an embed for a specific page
        const createEmbed = (page) => {            
            const start = page * COMMANDS_PER_PAGE;
            const end = Math.min(start + COMMANDS_PER_PAGE, commands.length);
            const pageCommands = commands.slice(start, end);

            return new EmbedBuilder()
                .setTitle(`Available Commands - Page ${page + 1}/${totalPages}`)
                .setColor('#0099ff')
                .addFields(pageCommands);
        };

        // Create the first page embed
        let currentPage = 0;
        const embed = createEmbed(currentPage);

        // Create the action row with buttons
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('previous')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(currentPage === 0), // Disable if on the first page
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(currentPage === totalPages - 1) // Disable if on the last page
            );

        // Send the initial message with the embed and buttons
        await interaction.followUp({ embeds: [embed], components: [row] });

        // Create a collector to handle button interactions
        const filter = (i) => i.customId === 'previous' || i.customId === 'next';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (i) => {
            if (i.user.id !== interaction.user.id) {
                return i.reply({ content: 'These buttons are not for you!', ephemeral: true });
            }

            if (i.customId === 'previous') {
                currentPage = Math.max(currentPage - 1, 0);
            } else if (i.customId === 'next') {
                currentPage = Math.min(currentPage + 1, totalPages - 1);
            }

            const newEmbed = createEmbed(currentPage);
            const newRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('previous')
                        .setLabel('Previous')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('⬅️')
                        .setDisabled(currentPage === 0),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Next')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('➡️')
                        .setDisabled(currentPage === totalPages - 1)
                );

            await i.update({ embeds: [newEmbed], components: [newRow] });
        });

        collector.on('end', () => {
            // Disable all buttons after the collector ends
            row.components.forEach((button) => button.setDisabled(true));
            interaction.editReply({ components: [row] });
        });
    }
};
