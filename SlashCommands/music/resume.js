const { QueryType } = require("discord-player");
const player = require("../../client/player");

module.exports = {
    name: "resume",
    description: "Resumes the currently paused track.",
    async execute(client, interaction) {
        try {
            if (!interaction.member.voice.channel) return interaction.reply({ content: ":no_entry_sign: **You must join a voice channel to use that!**", ephemeral: true });

            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in <#${interaction.guild.members.me?.voice?.channelId}> to use that!`, ephemeral: true });

            const queue = player.getQueue(interaction.guild.id);
            if (!queue || !queue.playing)
                return interaction.reply({ content: ":no_entry_sign: **There must be music playing to use that!**", ephemeral: true });


            queue.setPaused(false);

            return interaction.reply({ content: `:notes: Resumed **${queue.current.title}**.` });
        } catch (err) {
            console.log(err)
        }
    },
};
