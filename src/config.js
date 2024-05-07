module.exports = {
    client: {
        token: "MTIzNzEwOTE1OTI3MTMzMzkwOQ.Gl0u7P.MTqKssIHIlPxmqNS3eQZxf0k1BtSxv6t-zijOE",
        id: "1237109159271333909"
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
        developers: ["1038240696223666257"],
    },
    development: { 
        enabled: false,
        guild: "1234404251271430176",
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
