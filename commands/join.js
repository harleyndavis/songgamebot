const { channel } = require('../config/config.json');
const Game = require('../models/Game');

module.exports = {
    name: 'join',
    description: 'Join game of Song Game',
    async execute(message, args) {
        const game = await Game.findOne({ theme: args[0] });

        if (game) {
            if (
                game.players.some((value) => {
                    return value.user === message.author.id;
                })
            ) {
                message.client.channels
                    .resolve(channel)
                    .send('You already joined the game.');
            } else {
                game.players.push({ user: message.author.id, numSongs: 0 });
                game.numPlayers;
                game.save();
                message.client.channels
                    .resolve(channel)
                    .send(`${message.author.username} joined ${game.theme}`);
            }
        } else {
            message.client.channels
                .resolve(channel)
                .send("That game doesn't exist");
        }
    },
};
