const {
  Client,
  Interaction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  structure: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("Set a reminder")
    .addIntegerOption((opt) =>
      opt
        .setName("time")
        .setDescription("Time in minutes before the reminder")
        .setRequired(true)
    )
    .addStringOption((opt) =>
      opt
        .setName("message")
        .setDescription("Reminder message")
        .setRequired(true)
    ),

  permissionsRequired: [],
  botPermissions: [],

  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  run: async (client, interaction) => {
    const time = interaction.options.getInteger("time");
    const message = interaction.options.getString("message");

    await interaction.deferReply({ ephemeral: true });

    // Validate time
    if (time <= 0) {
      const invalidEmbed = new EmbedBuilder()
        .setTitle("⛔ Invalid Time")
        .setDescription("Time must be greater than 0 minutes.")
        .setColor("#E74C3C")
        .setFooter({ text: "All-In-One Discord Bot | Reminder" });

      return interaction.editReply({ embeds: [invalidEmbed] });
    }

    // Confirmation embed
    const confirmEmbed = new EmbedBuilder()
      .setTitle("✅ Reminder Set")
      .setDescription(`I will remind you in **${time} minute(s)**.`)
      .addFields(
        { name: "Message", value: `\`\`\`${message}\`\`\`` }
      )
      .setColor("#3498DB")
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

    await interaction.editReply({ embeds: [confirmEmbed] });

    // Schedule reminder
    setTimeout(async () => {
      const reminderEmbed = new EmbedBuilder()
        .setTitle("⏰ Reminder")
        .setDescription(`**Message:**\n${message}`)
        .setColor("#2ECC71")
        .setTimestamp()

      try {
        await interaction.user.send({ embeds: [reminderEmbed] });
      } catch {
        console.log(`Couldn't DM ${interaction.user.tag} their reminder.`);
      }
    }, time * 60 * 1000);
  },
};
