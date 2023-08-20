require('dotenv').config();
const { Client, IntentsBitField, messageLink, ActivityType, Status } = require('discord.js');
var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
});

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

let presences = [
    {
        activities: [{ 
            name: `Garrr Store | Open`, 
            type: ActivityType.Playing,
        }],
        status: 'online',
    },
    {
        activities: [{ 
            name: `Garrr Store`, 
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/garrr_td',
        }]
    },
    {
        activities: [{ 
            name: `Garrr Store`, 
            type: ActivityType.Listening,
        }],
        status: 'idle',
    },
    {
        activities: [{ 
            name: `Garrr Store`, 
            type: ActivityType.Watching,
        }],
        status: 'dnd',
    },
]

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
    let i = 0;
    setInterval(() =>{
        let presence = presences[i];
        // If it's undefined, it means we reached the end of the array
        if(!presence){
            // Restart at the first status
            presence = presences[0];
            i = 0;
        }

        client.user.setPresence(presence);
        i++;
    }, 5000);

});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
});

server.listen();
client.login(process.env.BOT_TOKEN);
// Mbuh Gak ruh