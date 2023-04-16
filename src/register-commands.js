require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: 'librus',
        description: 'Enter your login credentials and select the type of info you would like to receive',
        options: [
            {
                name: 'login',
                description: 'Your Librus Synergia login, eg. "340312u"',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'password',
                description: 'Your Librus Synergia password',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'option',
                description: 'Select the kind of information you would like to receive from the bot',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Display account info',
                        value: 'account-info'
                    },
                    {
                        name: 'Display the most recent announcement',
                        value: 'announcement'
                    }
                ]
            }
        ]
    },
]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN)

const register = async () => {
    try {
        console.log('Registering slash commands...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands}
        )

        console.log('Slash commands registered.')
    } catch (err) {
        console.log(`An error has occured: ${err}`)
    }
}

register()