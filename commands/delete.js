const { channel } = require('../config/config.json');
const Game = require('../models/Game');

module.exports = {
    name: 'delete',
    description: 'Delete a game of Song Game',
    async execute(message, args) {
        const game = await Game.findOneAndDelete({ theme: args[0] });

        if (game) {
            message.client.channels
                .resolve(channel)
                .send(`${game.theme} was successfully deleted.`);
        } else {
            message.client.channels
                .resolve(channel)
                .send("Game doesn't exist.");
        }
    },
};
