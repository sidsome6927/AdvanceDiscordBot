const Discord = require('discord.js');
const { Intents } = Discord;
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));
for(const file of commandFiles)
{
  const command = require(`./commands/${file}`);
  client.commands.set(command.name,command);
}

const dotenv = require('dotenv');
dotenv.config();

const prefix = "!";

client.on('ready', async() => {
     await console.log(`This bot is online and logged in as ${client.user.tag}`);
});

client.on('message', msg=> {
  const args = msg.content.substring(prefix.length).split(" ");
  switch(args[0])
  {
    case 'ping':
      console.log(client.commands.get('ping').name);
      console.log(client.commands.get('ping').description);
      client.commands.get('ping').execute(msg,args);
      break;
    case 'play':
      console.log(client.commands.get('play').name);
      console.log(client.commands.get('play').description);
      client.commands.get('play').execute(msg,args);
      break;
    case 'leave':
      console.log(client.commands.get('leave').name);
      console.log(client.commands.get('leave').description);
      client.commands.get('leave').execute(msg,args);
      break;
        
  }
})

client.login(process.env.TOKEN);