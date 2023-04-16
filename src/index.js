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
        const password = interaction.options.get('password').value
        const option = interaction.options.get('option').value

        librusClient.authorize(login, password).then( async () => {
            if (option === "account-data") {

                try {
                    const student = await librusClient.info.getAccountInfo()

                    if (student.student.nameSurname === '') {
                        interaction.reply({content: '⚠ Invalid login or password', ephemeral: true})
                        return
                    }

                    const embed = new EmbedBuilder()
                        .setColor(0xeb0d66)
                        .setTitle('Your data')
                        .addFields(
                            {name: '👨‍🎓 Student data', value: `${uczen.student.nameSurname} \n ${uczen.student.class}`},
                            {name: '🖥 Account data', value: `${uczen.account.nameSurname} \n ${uczen.account.login}`}
                        )
    
                    interaction.reply({embeds: [embed], ephemeral: true})
                    /*
                        These two variables need to be removed from the memory
                        because otherwise if someone tries to log in with invalid
                        data, they will receive info for the most recent valid login
                    */
                    delete login, password
                } catch (err) {
                    interaction.reply({content: `An error has occured: ${err}`, ephemeral: true})
                }

            } else if (option === 'announcement') {

                try {
                    librusClient.inbox.listAnnouncements().then((data) => {
                        console.log(data)
                        interaction.reply(
                            {content: `
                            **${data[0].title}**
                            *👨‍💼 ${data[0].user} 📅 ${data[0].date}* \n
                            ${data[0].content}
                            `, ephemeral: true}
                        )
                    })
                } catch (err) {
                    interaction.reply({content: `An error has occured: ${err}`, ephemeral: true})
                }

            }
        })
    }
})

client.login(process.env.TOKEN)