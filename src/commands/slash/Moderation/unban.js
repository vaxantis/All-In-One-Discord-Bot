const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user.')
        .addStringOption(option =>
            option
                .setName('userid')
                .setDescription('The ID of the user to unban')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason for the unban')
                .setRequired(false)),
    options: {
        cooldown: 5000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const userId = interaction.options.getString('userid');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        try {
            const user = await interaction.guild.bans.fetch(userId).catch(() => null);
            if (!user) {
                return interaction.reply({ content: `No user found with ID ${userId}.`, ephemeral: true });
            }

            await interaction.guild.members.unban(userId, reason);

            const embed = new EmbedBuilder()
            .setDescription(`Unbanned ${user.user.tag} || ${reason}`)
            .setColor('0099ff')

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error unbanning user:', error);
            await interaction.reply({ content: `There was an error trying to unban the user with ID ${userId}.`, ephemeral: true });
        }
    }
};
