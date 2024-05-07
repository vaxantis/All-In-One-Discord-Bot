const { model, Schema } = require('mongoose');

module.exports = model('warnModel',
    new Schema({

        userId: {
            type: String,
            required: true
        },

        guildId: {
            type: String,
            required: true
        },

        moderatorId: {
            type: String,
            required: true
        },

        reason: {
            type: String,
            required: false
        },

        timestamp: {
            type: String,
            required: false
        }
    })
);