const { channel } = require('../config/config.json');
const Game = require('../models/Game');

module.exports = {
    name: 'submit',
    description: 'Submit a song to a game',
    async execute(message, args) {
        const game = await Game.findOne({ theme: args[0].replace(/"/g, '') });
        if (!game) {
            message.client.channels
                .resolve(channel)
                .send("That game doesn't exist.");
            return;
        }
        const id = game.players.findIndex((value) => {
            return value.user === message.author.id;
        });

        // Player has joined game
        if (id !== -1) {
            if (game.players[id].numSongs < game.numSongs) {
                game.songs.push({ url: args[1], player: message.author.id });

                game.players[id].numSongs += 1;
                if (game.players[id].numSongs === game.numSongs) {
                    game.numPlayersReady += 1;
                }

                game.save();

                message.client.channels
                    .resolve(channel)
                    .send('Song submitted successfully.');

                if (game.numPlayersReady === game.minPlayers) {
                    startGame(game);
                }
            } else {
                message.client.channels
                    .resolve(channel)
                    .send("You've submitted all of your songs.");
            }
        }
        // Player hasn't joined game
        else {
            message.client.channels
                .resolve(channel)
                .send("You haven't joined that game.");
        }
    },
};

const startGame = (game) => {
    console.log(`${game.theme} is ready to start.`);
};
