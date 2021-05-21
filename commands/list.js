const { channel } = require('../config/config.json');
const Game = require('../models/Game');

module.exports = {
    name: 'list',
    description: 'List all the current games',
    async execute(message, args) {
        let data =
            '```THEME                   JOINED   SONGS\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n';
        const games = await Game.find().sort({ create: -1 });
        if (games.length) {
            games.forEach((item) => {
                console.log(item);
                data +=
                    item.theme.padEnd(20, ' ') +
                    '\t' +
                    item.players.length.toString().padStart(2, '0') +
                    '/' +
                    item.minPlayers.toString().padStart(2, '0') +
                    '\t' +
                    item.songs.length.toString().padStart(2, '0') +
                    '/' +
                    (item.minPlayers * item.numSongs)
                        .toString()
                        .padStart(2, '0') +
                    '\n';
            });
            data += '```';
            message.client.channels
                .resolve(channel)
                .send(data, { split: true });
        } else {
            message.client.channels
                .resolve(channel)
                .send('No games have been started.');
        }
    },
};
