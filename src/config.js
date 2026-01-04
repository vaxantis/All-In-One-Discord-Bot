module.exports = {
    client: {
        token: "",
        id: ""
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
            uri: ""
        },
    },
    users: {
        developers: [""],
    },
    development: { 
        enabled: false,
        guild: "",
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
