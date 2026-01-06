<!-- 
██╗   ██╗ █████╗ ██╗  ██╗
██║   ██║██╔══██╗██║ ██╔╝
██║   ██║███████║█████╔╝ 
██║   ██║██╔══██║██╔═██╗ 
╚██████╔╝██║  ██║██║  ██╗
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
-->

<p align="center">
<img align="center" alt="GitHub Issues" src="https://img.shields.io/github/issues/vaxantis/All-In-One-Discord-Bot?style=for-the-badge"> 
<img align="center" alt="GitHub license" src="https://img.shields.io/github/license/vaxantis/All-In-One-Discord-Bot?style=for-the-badge">
<img align="center" alt="GitHub Stars" src="https://img.shields.io/github/stars/vaxantis/All-In-One-Discord-Bot?style=for-the-badge">
<img align="center" alt="GitHub Forks" src="https://img.shields.io/github/forks/vaxantis/All-In-One-Discord-Bot?style=for-the-badge">
<img align="center" alt="GitHub Contributors" src="https://img.shields.io/github/contributors/vaxantis/All-In-One-Discord-Bot.svg?style=for-the-badge">
</p>

<p align="center"><strong>
Advanced all-in-one Discord bot with prefix & slash commands
</strong></p>

<p align="center">
A fully-featured bot, including moderation, fun, music, utility, and server management tools, all designed to be easy to set up and use.
</p>

> [!CAUTION]
> **Never share or commit your `.env` file!** It contains your bot token, MongoDB credentials, and API keys. Keep it secret and add `.env` to `.gitignore`.

---

## Table of Contents
- [Features](#features)
- [Compatibility](#compatibility)
- [Installation & Setup](#installation--setup)
- [Command Categories](#command-categories)
- [Setting Up Audit Logs](#setting-up-audit-logs)
- [Technical Features](#technical-features)
- [Contributors](#contributors)
- [Support](#support)
- [License](#license)

---

## Features

### Moderation Tools
- Complete moderation: ban, kick, mute, timeout, warn
- Auto moderation: spam & profanity filtering
- Ticket system: create, manage, and log tickets
- Audit logging: track changes, member updates, message edits

### Fun & Entertainment
- Music system: play YouTube, Spotify, SoundCloud
- Leveling & XP system with customizable rewards
- Mini-games: rock-paper-scissors, coinflip, 8ball
- Meme and joke commands

### Utility & Info
- Server info, user info, role info
- Profile system for users
- Weather info & utility commands

### Integration & API
- Spotify API integration
- Instagram post notifications
- Valorant player & store info
- Weather API support

### Customization
- Custom prefix support
- Custom embeds & announcements
- Thread management tools

---

## Compatibility

### System Requirements

| Operating System | Support Status | Notes |
|-----------------|----------------|-------|
| Windows 10+      | ✅ Full Support | Recommended |
| macOS Ventura+   | ✅ Full Support | Tested |
| Linux (Ubuntu/Debian/Fedora/CentOS) | ✅ Full Support | Tested |

### Node.js

| Node.js Version | Support Status |
|-----------------|----------------|
| v18.13.0+       | ✅ Minimum required |
| v20.x           | ✅ Recommended |

> **Tip:** Use [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) to manage Node versions.

---

## Installation & Setup

```bash
# 1. Clone or fork the repository
git clone https://github.com/vaxantis/All-In-One-Discord-Bot.git
cd All-In-One-Discord-Bot

# 2. Install dependencies
npm install

# 3. Setup .env file
cp .example.env .env

# 4. Fill in the .env file
# Open .env with a text editor and fill the following fields:
# TOKEN=YourDiscordBotToken
# MONGO_URI=YourMongoDBConnectionString
# CLIENT_ID=YourDiscordApplicationClientID
# GUILD_ID=YourServerID
# SPOTIFY_CLIENT_ID=YourSpotifyClientID
# SPOTIFY_CLIENT_SECRET=YourSpotifyClientSecret
# SPOTIFY_REDIRECT_URI=YourRedirectURI (usually default)

# 5. Optional: Auto-generate .env with setup script
npm run setup-env:prod   # Production
npm run setup-env:dev    # Development

# 6. Run the bot
npm run prod             # Production mode
npm run prod:nodemon     # Development mode with nodemon

# 7. Optional helper scripts
npm run wipe-data:prod      # Wipe MongoDB data
npm run update-packages     # Update all dependencies
npm run update-ytdl-core    # Update ytdl-core package
npm run codebase-info       # Show codebase statistics
