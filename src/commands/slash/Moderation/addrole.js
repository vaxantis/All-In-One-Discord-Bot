const { client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Add a role to a user.')
    .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to kick')
                .setRequired(true))
    .addRoleOption((opt) =>
            opt.setName('role')
                .setDescription('The role to grant')
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
      role = interaction.options.getRole("role");
      reason =
          interaction.options.getString("reason") || `Executed by ${interaction.member.id}!`;

      if (target.id === interaction.member.id) {

      const urself = new EmbedBuilder()
      .setDescription(`You cannot add a role to yourself!`)
      .setColor('Red')

     return interaction.reply({embeds: [urself]});
    }
     
     

      if (target.roles.highest.position >= interaction.member.roles.highest.position) {

      const equalhigher = new EmbedBuilder()
      .setDescription(`This user is same/higher than you!`)
      .setColor('Red')

     return interaction.reply({embeds: [equalhigher]});
    }

      if (target.roles.highest.position >= interaction.guild.members.me.roles.highest.position) {
      
      const higherequal = new EmbedBuilder()
      .setDescription(`This user is same/higher than me!`)
      .setColor('Red')

     return interaction.reply({embeds: [higherequal]});
      }

      if (role.position >= interaction.member.roles.highest.position) {
      const samehigher = new EmbedBuilder()
      .setDescription(`That role is same/higher than you!`)
      .setColor('Red')

      return interaction.reply({embeds: [samehigher]});
      }

      if (role.position >= interaction.guild.members.me.roles.highest.position) {
        const highersame = new EmbedBuilder()
      .setDescription(`That role is same/higher than me!`)
      .setColor('Red')

      return interaction.reply({embeds: [highersame]});
    }

      if (target.roles.cache.has(role.id)) {
      
        const hasalready = new EmbedBuilder()
      .setDescription(`User already has the provided role!`)
      .setColor('Red')

     return interaction.reply({embeds: [hasalready]});
      }
        
        
              await target.roles.add(role, reason);

              const succes = new EmbedBuilder()
              .setDescription(`Added <@&${role.id}> role to <@!${target.user.id}>!`)
              .setColor('Green')

              return interaction.reply({embeds: [succes]});
          }
          };