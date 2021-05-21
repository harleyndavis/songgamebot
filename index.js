const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config/config.json');
const connectDB = require('./config/db');

// Create new discord Client
const client = new Discord.Client();

// Load in commands
client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// Runs once after logging in
client.once('ready', () => {
    // Connect to database
    connectDB();
    console.log('Bot online!');
});

client.on('message', (message) => {
    // console.log('Message Received');
    if (!message.content.startsWith(prefix) || message.author.bot) {
        // console.log('Not a command');
        return;
    }

    const args = message.content
        .slice(prefix.length)
        .match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);

    const commandName = args.shift().toLowerCase();
    // console.log(`Command: ${commandName}, Args: ${args}`);

    if (args[0]) args[0] = args[0].replace(/"/g, '');

    const command = client.commands.get(commandName);
    // eslint-disable-next-line quotes
    if (!command) return message.channel.send("That command doesn't exist.");

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: '${prefix}${command.name} ${command.usage}'`;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.author.send(
            'There was an error trying to execute that command.'
        );
    }
});

// Login to discord with your app's token
client.login(token);
