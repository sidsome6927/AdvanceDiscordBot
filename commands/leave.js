const { getVoiceConnection } = require("@discordjs/voice");

const Leave = {
    name:'leave',
    description:'stop the bot',
    async execute(message,args)
    {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel)
        {
            return message.reply('You have to be in a voice channel');
        }
        const connection = getVoiceConnection(voiceChannel.guild.id);
        await connection.destroy();
    }
}

module.exports = Leave;