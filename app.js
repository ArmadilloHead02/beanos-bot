const discord = require('discord.js');
const ytdl = require('ytdl-core');

const token = process.env.token;

// Initialise Discord Bot

const client = new discord.Client();

client.on('ready', () => {
    console.log('Connected');

    client.user.setActivity('b!help');
});

const prefix = 'b!';

client.on('message', (message) => {
    if(message.author.bot) return; // Checks if message wasn't sent by a bot

    if(message.content.startsWith(prefix + "ping")) {
        message.channel.send('Pong!');
    };

    if(message.content.startsWith(prefix + "help")) {
        message.channel.send("List of Commands \n b!ping: Pings the bot \n b!hellothere: General Kenobi! \n b!geff: Sends an image of Geff \n b!geef: Sends an image of Geef \n b!invite: Generates an invite link for the bot \n b!beanos: Plays the beanos theme song \n b!anthem: Plays Saleel al Sawarim \n b!play: Plays a YouTube link \n b!leave: Leaves the current Voice Channel");
    };

    if(message.content.startsWith(prefix + "hellothere")) {
        message.reply("General Kenobi!");
    };

    if(message.content.startsWith(prefix + "geff")) {
        message.channel.send({files: ["./images/geff.jpg"]});
    };

    if(message.content.startsWith(prefix + "geef")) {
        message.channel.send({files: ["./images/geef.png"]})
    };

    if(message.content.startsWith(prefix + "invite")) {
        message.channel.send("https://discord.com/api/oauth2/authorize?client_id=708136332689670164&permissions=2146959191&scope=bot");
    };

    // Voice Channel (join)

    if(message.content.startsWith(prefix + "join")) {
        let voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.reply("Must be in a Voice Channel first");
        voiceChannel.join().catch(console.error);

        message.reply("Successfully joined Voice Channel");
    };

    // Music (beanos.mp3)

    if(message.content.startsWith(prefix + "beanos")) {
        let voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.reply("Must be in a Voice Channel first");
        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.play('./music/beanos.mp3', {volume: 1});
                dispatcher.on("end", end => {voiceChannel.leave()});
            })
            .catch(console.error);
        message.reply("Playing beanos.mp3");
    };

    // Music (saleel-al-sawarim.mp3)

    if(message.content.startsWith(prefix + "anthem")) {
        let voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.reply("Must be in a Voice Channel first");
        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.play('./music/saleel-al-sawarim.mp3', {volume: 1});
                dispatcher.on("end", end => {voiceChannel.leave()});
            })
            .catch(console.error);
        message.reply("Playing saleel-al-sawarim.mp3");
    };

    // Music (youtube)

    if(message.content.startsWith(prefix + "play")) {
        let voiceChannel = message.member.voice.channel;
        let url = message.content.slice(7);

        if(!voiceChannel) return message.reply("You must be in a Voice Channel first");
        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.play(ytdl(url));
                dispatcher.on("end", end => {
                    voiceChannel.leave();
                    console.log('Song finished');
                });
            })
            .catch(console.error);
        message.reply(`Playing ${url}`);
    };

    // Music (leave)

    if(message.content.startsWith(prefix + "leave")) {
        let voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.reply("Must be in a Voice Channel first");
        voiceChannel.leave();
        message.reply("Left voice channel");
    }

    // Sentient commands
    /*
    if(message.content = "good bot") {
        message.reply("Good human");
    };
    */
});

client.login(token);