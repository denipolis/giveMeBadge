const { Client, Events, GatewayIntentBits, REST, Routes } = require('discord.js')
const input = require('input')

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildIntegrations],
})
const rest = new REST({ version: '10' })

const getInviteLink = () => {
    return `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`
}

const init = async () => {
    const TOKEN = await input.text('Token > ')
    
    rest.setToken(TOKEN)
    await client.login(TOKEN).catch(() => {
        console.log(`\x1b[31mToken that you provided is invalid. Try again! ${TOKEN}`)
        init()
    })
}

console.log('giveMeBadge - https://github.com/denipolis/giveMeBadge\n');

(async() => {await init()})()

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
        `\x1b[32mCongratulations!\nWe\'re connected to Discord!\n\nBot's invite link: ${getInviteLink()}\n\nInvite bot to your guild and and write command "/badge".`
    )
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName === 'badge'){
        await interaction.reply(`**Looks like it's worked!** ✅\n\nNow you have to wait approximately 24 hours to take \"Active Developer Badge\".\n\nUseful links 🔗\n> Take badge - <https://discord.com/developers/active-developer>\n> Active Developer Badge FAQ - <https://support-dev.discord.com/hc/en-us/articles/10113997751447-Active-Developer-Badge>\n`)
        console.log(`Nice, that's worked! Now you can close this application!`)
    }
})
