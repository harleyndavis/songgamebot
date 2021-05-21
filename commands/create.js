const { channel } = require('../config/config.json');
const Game = require('../models/Game');

module.exports = {
    name: 'create',
    description: 'Create a new game of Song Game',
    args: true,
    numArgs: 3,
    usage: '<theme> <num players> <num songs>',
    execute(message, args) {
        // console.log(args);

        const newGame = new Game({
            theme: args[0],
            creator: message.author.id,
            minPlayers: args[1] || 3,
            numSongs: args[2] || 3,
            players: [],
        });

        newGame.save((err) => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate theme
                    message.client.channels
                        .resolve(channel)
                        .send('That theme name is already in use.');
                } else {
                    // Some other error
                    console.log(err);
                    message.client.channels
                        .resolve(channel)
                        .send('Failed to create game.');
                }
            } else {
                message.client.channels
                    .resolve(channel)
                    .send('The game, ' + args[0] + ' has started.');
            }
        });
    },
};
