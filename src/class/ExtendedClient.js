const { Client, Partials, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const config = require('../config');
const ExtendedClient = require('../class/ExtendedClient');
const commands = require("../handlers/commands");
const events = require("../handlers/events");
deploy = require("../handlers/deploy");
const mongoose = require("../handlers/mongoose");
const components = require("../handlers/components");

module.exports = class extends Client {

    collection = {
        interactioncommands: new Collection(),
        prefixcommands: new Collection(),
        aliases: new Collection(),
        components: {
            buttons: new Collection(),
            selects: new Collection(),
            modals: new Collection(),
            autocomplete: new Collection()
        }
    };
    applicationcommandsArray = [];

    constructor() {
        super({
            intents: Object.values(GatewayIntentBits),
            partials: Object.values(Partials)
        });
    };

    start = async () => {
        commands(this);
        events(this);
        components(this);

        if (config.handler.mongodb.enabled) mongoose();

        await this.login(process.env.CLIENT_TOKEN || config.client.token);

        if (config.handler.deploy) deploy(this, config);

        this.once('ready', () => {
            console.log(`Logged in as ${this.user.tag}`);
            console.log(`Bot is in ${this.guilds.cache.size} guilds.`);

            this.updateStatus();

            setInterval(() => {
                this.updateStatus();
            }, 10000); // 10 seconds interval
        });

        this.on('guildCreate', () => {
            console.log(`Joined a new guild! Now in ${this.guilds.cache.size} guilds.`);
            this.updateStatus();
        });

        this.on('guildDelete', () => {
            console.log(`Removed from a guild. Now in ${this.guilds.cache.size} guilds.`);
            this.updateStatus();
        });

        // Listen for mentions
        this.on('messageCreate', async (message) => {
            if (message.author.bot || !message.guild) return;

            const mentionRegex = new RegExp(`^<@!?${this.user.id}>$`);
            if (mentionRegex.test(message.content)) {
                const embed = new EmbedBuilder()
                    .setColor(0x00AE86)
                    .setTitle('Oh, Hello there!')
                    .setDescription('How can I help you today?')
                    .setFooter({ text: `Pinged by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

                await message.reply({ embeds: [embed] });
            }
        });
    };

    updateStatus() {
        const statuses = [
            { name: `/get-started | Helping ${this.users.cache.size} users out!`, type: 2 }, // Watching
        ];

        let currentStatus = 0;

        this.user.setPresence({
            activities: [statuses[currentStatus]],
            status: 'online'
        });

        currentStatus = (currentStatus + 1) % statuses.length;
    }
};
