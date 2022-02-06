const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel,createAudioPlayer,createAudioResource,AudioPlayerStatus} = require('@discordjs/voice');

const Play = {
    name:'play',
    description:'Plays a video from youtube',
     async execute(message,args)
    {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel)
        {
            return message.reply('You have to be in a voice channel');
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT'))
        {
            return message.reply('You do not have correct permissions');
        }
        if(!permissions.has('SPEAK'))
        {
            return message.reply('You do not have correct permissions');
        }
        if(!args.length)
        {
            return message.reply('Send the second argument');
        }
       
        const videoFinder = async (query) => {
            const videoResult  =await ytSearch(query);
            return(videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }
        const video = await videoFinder(args.join(' '));
        if(video)
        {
            const stream = await ytdl(video.url,{filter:'audioonly'});
            const player =  createAudioPlayer();
            const resource =  await createAudioResource(stream);
            await message.reply(`Now playing ***${video.title}***`);
            await player.play(resource);
            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });
        }
        else{
            message.reply('No video results');
        }
    }
}

module.exports = Play;