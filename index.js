import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js'
import input from 'input'

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildIntegrations],
})
const rest = new REST({ version: '10' })

const init = async () => {
    const TOKEN = await input.text('Token > ')

    await client.login(TOKEN).catch(() => {
        console.log('Token that you provided is invalid. Try again!')
        init()
    })

    rest.setToken(TOKEN)
}

console.log('GiveMeBadge | https://github.com/denipolis')
await init()

const commands = [
    {
        name: 'badge',
        description: 'Woah!',
    },
]

client.on(Events.ClientReady, async () => {
    await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
    })
    client.user.setActivity('/badge')
    console.log(
        'Congratulations! We\'re connected to Discord!\nNow go to your guild and write command "/badge".'
    )
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName === 'badge') {
        await interaction.reply('Good job! 🔥')
        console.log('Looks like it worked!')
    }
})
