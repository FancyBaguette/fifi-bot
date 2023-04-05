import dotenv from 'dotenv'
dotenv.config()

// Import the required modules
import { Client, Intents } from 'discord.js'

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
    ]
})

// When the client is ready, log a message to the console
client.once('ready', () => {
  console.log('Ready!');
});

// Listen for incoming messages and respond with a greeting
client.on('messageCreate', message => {
  // Ignore messages sent by the bot itself
  if (message.author.bot) return;

  // Send a greeting in response to a user message
  if (message.content === 'hello') {
    message.reply('Hi there!');
  }
});

// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);