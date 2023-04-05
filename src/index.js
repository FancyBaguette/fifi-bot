const { Client, IntentsBitField, userMention } = require('discord.js');
const cron = require('cron');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const tacoLyrics = [
    "Kto by pomyślał, że życie tak się zmieni.",
    "Kiedy przyszła wiosna, ja czułem, że umieram.",
    "Tylko dobre chwile zostają w pamięci.",
    "Czasem wątpię, ale nigdy się nie poddaję.",
    "Nie tracę nadziei, bo wiem, że warto walczyć.",
    "W mojej głowie ciągle gra ta sama melodia.",
    "Wszystko jest możliwe, jeśli tylko w to uwierzysz.",
    "Świat jest pełen tajemnic, ale ja patrzę na niego z uśmiechem.",
    "Każde wyjście z cienia jest zwycięstwem.",
    "Czasem w życiu trzeba zrobić krok do przodu, żeby zobaczyć więcej.",
    "Niektóre rzeczy są nie do wybaczenia.",
    "Życie to nie tylko praca i pieniądze.",
    "Czasem trzeba odwagi, żeby zacząć od nowa.",
    "Jestem sam, ale nie jestem samotny.",
    "Nie ma drugiej takiej chwili jak ta właśnie teraz.",
    "W moim sercu zawsze pozostaniesz ty.",
    "Najlepsze rzeczy są najtrudniejsze do zdobycia.",
    "Każda historia ma swój koniec, ale ja wierzę w nowy początek.",
    "Życie to podróż, a ja wciąż szukam swojego celu.",
    "Czasem trudno uwierzyć, że marzenia się spełniają.",
    "Nie ma nic gorszego niż utrata nadziei.",
    "Wszystko ma swój czas, ale nie wszystko jest dla nas.",
    "Nie warto się bać, bo najgorsze już za nami.",
    "Nie chcę już patrzeć na świat przez okno.",
    "Tęsknota jest tym, co nas napędza.",
    "Czasem w nocy mam wrażenie, że świat zatrzymał się w miejscu.",
    "Wszyscy mówią o miłości, ale nikt nie wie, co to znaczy.",
    "Nie ma nic gorszego niż człowiek, który zawsze ma rację.",
    "Nie ma nic piękniejszego niż ideał w naszej wyobraźni.",
    "Nie musisz mieć nic, by czuć się spełniony.",
    "Niektóre rzeczy zostaną z nami na zawsze.",
    "Nie zawsze jest tak, jak byśmy chcieli.",
    "Zawsze trzeba walczyć o to, co się kocha.",
    "Nie musisz być doskonały, by być szczęśliwym.",
    "Życie to walka, ale warto ją podjąć.",
    "Czasem trzeba przegrać, by zrozumieć, jak wygrać.",
];

const randomTaco = () => {
    return tacoLyrics[Math.floor(Math.random()*tacoLyrics.length)]
}

client.on('ready', (c) => {
    console.log(`${c.user.tag} is ready`)

    let scheduledMessage = new cron.CronJob('0 */5 * * * ', () => {
        console.log('cronjob ran')
        const guild = client.guilds.cache.get('586958796434178080');
        const channel = guild.channels.cache.get('710220332589514794');
        channel.send(`${randomTaco()} ${userMention('278217359569977344')}`)
    })

    scheduledMessage.start()
})

client.on('messageCreate', (message) => {
    if (message.author.bot) return

    if (message.content === "Najlepsze studio tatuazu wroclaw") {
        message.reply("pong")
    }
})

client.login('MTA5MzI3OTYxNDQ2NzU5MjIxNQ.GQc3Xl.etfyj5j5Qx6N9Mi6Wz8ATZ1gvXyAGSS8vh8ig4')