module.exports = {
    nome: "ping",
    aliases: ["ping"],
    categoria: "misc",
    desc: "Comando de testes do adm.",
    uso: "",
    run: async (bot, message, args) => {

        message.channel.send("Pong!");

    }
}