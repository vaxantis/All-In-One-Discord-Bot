module.exports = {
    client: {
        token: "MTMzNDExMTM2NTMxMjI4Njc1MQ.GhLaZH.t9R02gJwhnFO2981d2Yg0LI6wxhaZ10PEiB5OU",
        id: "1334111365312286751"
    },
    handler: {
        prefix: "?",
        deploy: true,
        commands: {
            prefix: false,
            slash: true,
            user: true,
            message: true,
        },
        mongodb: {
            enabled: false,
            uri: "mongodb+srv://c4clan2:X7e$Hfh,Hpb)v5Q@c4clan2.msmud1g.mongodb.net/?retryWrites=true&w=majority"
        },
    },
    users: {
        developers: ["1250664820488011811"],
    },
    development: { 
        enabled: false,
        guild: "1338281118885220415",
    }, 
    messageSettings: {
        developerMessage: "You are not authorized to use this command, contact staff for more information!",
        cooldownMessage: "Slow down buddy! You're too fast to use this command ({cooldown}s).",
        globalCooldownMessage: "Slow down buddy! This command is on a global cooldown ({cooldown}s).",
        notHasPermissionMessage: "You do not have the permission to use this command.",
        notHasPermissionComponent: "You do not have the permission to use this component.",
        missingDevIDsMessage: "This is a developer only command, but unable to execute due to missing user IDs in configuration file."
    }
};
