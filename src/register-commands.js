require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: 'librus',
        description: 'Wprowadź dane logowania oraz sprecyzuj rodzaj informacji który chcesz otrzymać',
        options: [
            {
                name: 'login',
                description: 'Twój login do Librusa, np. "340312u"',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'haslo',
                description: 'Twoje hasło do Librusa',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'funkcja',
                description: 'Wybierz rodzaj informacji jaki chcesz otrzymać od bota',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Dane konta',
                        value: 'dane-konta'
                    },
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