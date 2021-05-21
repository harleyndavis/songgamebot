const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    theme: {
        type: String,
        unique: true,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    minPlayers: {
        type: Number,
        default: 3,
    },
    numSongs: {
        type: Number,
        default: 3,
    },
    numPlayersReady: {
        type: Number,
        default: 0,
    },
    players: [
        {
            user: {
                type: String,
            },
            numSongs: {
                type: Number,
            },
        },
    ],
    songs: [
        {
            url: {
                type: String,
            },
            player: {
                type: String,
            },
        },
    ],
});

// eslint-disable-next-line no-undef
module.exports = Game = mongoose.model('game', GameSchema);
