require('dotenv').config()
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js')
const Librus = require('librus-api')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,    
        IntentsBitField.Flags.MessageContent,
    ],
});

const librusClient = new Librus()

client.on('ready', () => {
    console.log(`🤖 Bot ${client.user.tag} is ready!`)
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName = "librus") {
        const login = interaction.options.get('login').value
        const haslo = interaction.options.get('haslo').value
        const opcja = interaction.options.get('funkcja').value

        librusClient.authorize(login, haslo).then( async () => {
            if (opcja === "dane-konta") {
                try {
                    const uczen = await librusClient.info.getAccountInfo()
                    const uczenEmbed = new EmbedBuilder()
                        .setColor(0xeb0d66)
                        .setTitle('Twoje dane')
                        .addFields(
                            {name: 'Dane ucznia', value: `${uczen.student.nameSurname}, klasa ${uczen.student.class}`}
                        )
    
                    interaction.reply({embeds: [uczenEmbed], ephemeral: true}, )
                    delete login, haslo
                } catch (err) {
                    interaction.reply(
                        `An error has occured: ${err}`
                    )
                }
            }
        })
    }
})

client.login(process.env.TOKEN)