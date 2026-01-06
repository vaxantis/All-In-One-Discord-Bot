const {
  Client,
  Interaction,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");
const ExtendedClient = require("../../class/ExtendedClient");

module.exports = {
  structure: new SlashCommandBuilder()
    .setName("serverstats")
    .setDescription("View server statistics"),

  permissionsRequired: [],
  botPermissions: [],

  /**
   *
   * @param {ExtendedClient} client
   * @param {Interaction} interaction
   */
  run: async (client, interaction) => {
    await interaction.deferReply();

    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("serverstats_select") // this is the customId for the component module
        .setPlaceholder("Select a stat to view")
        .addOptions([
          { label: "Member Count", value: "members" },
          { label: "Roles", value: "roles" },
          { label: "Emojis", value: "emojis" },
          { label: "Boost Level", value: "boost" },
        ])
    );

    const embed = new EmbedBuilder()
      .setTitle(`📊 ${interaction.guild.name} Statistics`)
      .setDescription("Select an option from the menu below to view detailed stats.")
      .setColor("#3498DB")
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setTimestamp();

    await interaction.editReply({ embeds: [embed], components: [row] });
  },
};
