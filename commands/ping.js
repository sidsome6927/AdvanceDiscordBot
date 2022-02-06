const Ping = {
    name:'ping',
    description:'This is a ping command',
    execute(msg)
    {
        msg.reply('pong');
    }
}
module.exports = Ping;