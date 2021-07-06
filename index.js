/* 

        CONFIGURAÇÕES

*/

const Discord = require('discord.js');
const cfg = require('./utils/config.json');
const fs = require('fs');
const bot = new Discord.Client({
    messageCacheMaxSize: 4048,
    messageCacheLifetime: 1680,
    messageSweepInterval: 2600,
    disableEveryone: true,
    fetchAllMembers: false,
    disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking'],
    status: "online",
    presence: {
        status: 'online',
        activity: {
         name: '!ajuda',
         type: 'PLAYING',
        },
    }
});

/* 

        HANDLERS

*/


const eventosf = fs.readdirSync('./eventos').filter(arquivo => arquivo.endsWith('.js'));
for (const arquivo of eventosf) {
	const evento = require(`./eventos/${arquivo}`);
	if (evento.once) {
		bot.once(evento.nome, (...args) => evento.execute(...args));
	} else {
		bot.on(evento.nome, (...args) => evento.execute(...args));
	}
}


bot.comandos = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categorias = fs.readdirSync("./comandos/");
["comando"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.on("message", async message => {
    const prefix = cfg.prefix;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let comando = bot.comandos.get(cmd);
    if (!comando) comando = bot.comandos.get(bot.aliases.get(cmd));

    if (comando) 
    comando.run(bot, message, args);
});

/* 

        START DO BOT

*/

bot.login('TOKEN');