import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';

dotenv.config();

async function DiscordBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages,
    ],
  });
  const prefix = '!';

  client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.tag ?? ''}!`);
  });

  client.on('messageCreate', async function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift()?.toLowerCase();

    if (command === 'ping') {
      const timeTaken = Date.now() - message.createdTimestamp;
      await message.reply(
        `Pong! This message had a latency of ${timeTaken}ms.`,
      );
    } else if (command === 'sum') {
      const numArgs = args.map((x) => parseFloat(x));
      const sum = numArgs.reduce((counter, x) => (counter += x));
      await message.reply(
        `The sum of all the arguments you provided is ${sum}!`,
      );
    }
  });

  await client.login(process.env.CLIENT_TOKEN);
}

export default DiscordBot;
