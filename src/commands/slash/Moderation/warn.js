const { client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const warnModel = require("../../../schemas/warnModel");


module.exports = {
    structure: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('warn a user for breaking rules')
    .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to kick')
                .setRequired(true))
      .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason to kick the user")
                .setRequired(false)
        ),
                   
    permissionsRequired: [PermissionFlagsBits.KickMembers],
     botPermissions: [PermissionFlagsBits.KickMembers],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    run: async (client, interaction) => {
      const target = interaction.options.getMember("user");
      reason =
          interaction.options.getString("reason") || `No Reason Provided!`;

      if (target.id === interaction.member.id) {

      const urself = new EmbedBuilder()
      .setDescription(`You can't warn yourself!`)
      .setColor('Red')

     return interaction.reply({embeds: [urself]});
    }
     
     

      if (target.roles.highest.position >= interaction.member.roles.highest.position) {

      const equalhigher = new EmbedBuilder()
      .setDescription(`This user is same/higher than you`)
      .setColor('Red')

     return interaction.reply({embeds: [equalhigher]});
    }

      if (target.roles.highest.position >= interaction.guild.members.me.roles.highest.position) {
      
      const higherequal = new EmbedBuilder()
      .setDescription(`This user is same/higher than me!`)
      .setColor('Red')

     return interaction.reply({embeds: [higherequal]});
      }

        
      const succes = new EmbedBuilder()
              .setDescription(`Warned <@!${target.user.id}> || **${reason}**`)
              .setColor('Green')

        interaction.reply({embeds: [succes]});

      await new warnModel({
        userId: target.id,
        guildId: interaction.guildId,
        moderatorId: interaction.user.id,
        reason,
        timestamp: Date.now(),
      }).save();
              
          }
          };