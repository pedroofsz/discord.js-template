const { readdirSync } = require("fs");

module.exports = (bot) => {
    readdirSync("./comandos/").forEach(dir => {
        const comandos = readdirSync(`./comandos/${dir}/`).filter(arquivo => arquivo.endsWith(".js"));
    
        for (let arquivo of comandos) {
            let pull = require(`../comandos/${dir}/${arquivo}`);
    
            if (pull.nome) {
                bot.comandos.set(pull.nome, pull);
            } else {
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.nome));
        }
    });
    
}