const { StringSelectMenuInteraction, ModalSubmitInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, getTextInputValue} = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
  customId: "serverstats_select",
  options: {
    public: true // responses visible to all users
  },
  /**
   *
   * @param {ExtendedClient} client
   * @param {*} interaction
   */
  run: async (client, interaction) => {
    if (interaction.user.id !== interaction.message.interaction.user.id) {
      return interaction.reply({ content: "❌ This is not your selection.", ephemeral: true });
    }

    let statEmbed;

    switch (interaction.values[0]) {
      case "members":
        statEmbed = new EmbedBuilder()
          .setTitle("👥 Member Count")
          .setDescription(`Total members: **${interaction.guild.memberCount}**`)
          .setColor("#2ECC71")
          .setTimestamp();
        break;

      case "roles":
        const roleList = interaction.guild.roles.cache
          .map((r) => r.name)
          .filter((r) => r !== "@everyone")
          .slice(0, 1024)
          .join(", ") || "None";

        statEmbed = new EmbedBuilder()
          .setTitle("🎭 Roles")
          .setDescription(roleList)
          .setColor("#9B59B6")
          .setTimestamp();
        break;

      case "emojis":
        const emojiList = interaction.guild.emojis.cache
          .map((e) => e.toString())
          .slice(0, 1024)
          .join(" ") || "None";

        statEmbed = new EmbedBuilder()
          .setTitle("😄 Emojis")
          .setDescription(emojiList)
          .setColor("#F1C40F")
          .setTimestamp();
        break;

      case "boost":
        statEmbed = new EmbedBuilder()
          .setTitle("🚀 Boost Level")
          .setDescription(`Server Boost Level: **${interaction.guild.premiumTier}**\nTotal Boosts: **${interaction.guild.premiumSubscriptionCount}**`)
          .setColor("#E67E22")
          .setTimestamp();
        break;
    }

    await interaction.update({ embeds: [statEmbed] });
  },
};
