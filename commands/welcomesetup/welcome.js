let client = require("../../index")
const {MessageEmbed} = require("discord.js"),
 db = require("quick.db");
module.exports = {
        name: "welcome",
        aliases: ["welcome"],
    run: async (client, message, args) => {
       try {
        const p = await client.prefix(message)
      const msg = message;
   if (!msg.member.permissions.has("MANAGE_CHANNELS")) {
      const embed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          "**You Dont Have Permission To use This Command. Required Permission** `MANAGE_CHANNELS`"
        );
      return msg.channel.send(embed2);
    }
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor("#00FF0")
        .setTitle("Server Welcome Setup")
        .setDescription("To use these commands, do `"+ p + "welcome <command>`")
        .addField(
          "Commands Plugins",
          "`channel`, `font`, `image`, `imageremove`, `message`, `messageremove`, `color`, `colorremove`, `embed`, `embedremove`, `disable`, `test`"
        )
        .setFooter(client.user.username + " | Welcome")
        .setTimestamp();
      msg.channel.send(embed);
    } else if (args[0].toLowerCase() === "channel") {
      //---------------------CHANNEL-----------------------------//
      let channel = msg.mentions.channels.first();
      if (!channel) {
        const emb = new MessageEmbed()
          .setColor("RED")
          .setTitle("❌  Channel Missing")
          .setDescription("Please Mention A Channel To Set As Welcome Channel!")
          .setTimestamp();
        return msg.channel.send(emb);
      } else {
        db.set(`welchannl1_${msg.guild.id}`, channel.id);
        const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setDescription(`Welcome Channel Set As ${channel}`)
          .setTitle(" ✅ Welcome Channel Set")
          .setTimestamp();
        msg.channel.send(emb);
        //-------------------CHANNL END-------------------------//
      }
    } else if (args[0].toLowerCase() === "image") {
      //---------------------BACKGROUND-------------------------//
      let chan = db.get(`welchannl1_${msg.guild.id}`);
      if (chan == null) {
        return msg.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTitle("❌ You Have Not Enable Welcome")
            .setDescription("You Need To Enable Welcome To Set Image!")
            .setTimestamp()
        );
      }
      const URL = args[1];
      if (!URL) {
        let em = new MessageEmbed()
          .setColor("RED")
          .setTitle("❌  Welcome Image Error")
          .setDescription("Error Adding Image")
          .addField(
            "Reason",
            "Image requires at least One (1) argument. `"+ p + "welcome image [url]`"
          )
          .setTimestamp();
        msg.channel.send(em);
      } else {
        db.set(`welback1_${msg.guild.id}`, URL);
        const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setTitle("✅  Welcome Image Set As")
          .setImage(URL)
          .setTimestamp();
        msg.channel.send(emb);
        msg.delete();
      }
      //----------------------BACKGROUND END----------------------------//
    } else if (args[0].toLowerCase() === "imageremove") {
      //---------------------BACKGROUND REMOVE-------------------------//
      let welback = db.get(`welback1_${msg.guild.id}`);
      if (welback == null) {
        return msg.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTitle(
              "❌  You Have Not Enable Welcome Image"
            )
            .setDescription("You Have Not Enabled Image To Disable!")
            .setTimestamp()
        );
      } else {
        db.delete(`welback1_${msg.guild.id}`);
        const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setTitle("<:yesk:778449313616756736>  Welcome Image Disable")
          .setDescription("You Have Disabled Your Welcome Image Succesfully!")
          .setTimestamp();
        msg.channel.send(emb);
      }
      //---------------------BACKGROUND REMOVE END-----------------------//
    } else if (args[0].toLowerCase() === "test") {
      //------------------------TEST----------------------------//
      let chan = db.get(`welchannl1_${msg.guild.id}`);
      let welback = db.get(`welback1_${msg.guild.id}`);
      let welmsg = db.get(`welmsg1_${msg.guild.id}`);
      let welc = db.get(`welcolor1_${msg.guild.id}`);
      let user = db.get(`usrcolor1_${msg.guild.id}`);
      let autou = db.get(`urole_${msg.guild.id}`)
      let autob = db.get(`brole_${msg.guild.id}`)
      let dm = db.get(`weldm_${msg.guild.id}`)
      let en = db.get(`emb_${msg.guild.id}`)
      if (chan == null) {
        return msg.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTitle("❌ You Have Not Enable Welcome")
            .setDescription("You Need To Enable Welcome To Test")
            .setTimestamp()
        );
      } else {
        msg.client.emit(
          "guildMemberAdd",
          msg.member || (await msg.guild.fetchMember(msg.author))
        );
        const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setTitle("✅ Welcome Test Sent")
          .setDescription(
            `Done! I have Sent a Fake Your Joining to the Server To Check Out The Setting. Here Is Your Setting:\n
            ${
              chan
                ? "<:ayumuTick:842630449200889856>"
                : "<:no:860411707242840064>"
            } **Welcome Channel: **${
              chan
                ? `Welcome Channel Is Set As <#${chan}>`
                : "No Welcome Channel Is Set, `"+ p + "welcome channel` To Set One"
            }\n${
              welmsg
                ? "<:ayumuTick:842630449200889856>"
                : "<:no:860411707242840064>"
            } **Welcome Message: **${
              welmsg
                ? `Welcome Message Is Set`
                : "No Welcome Message, `"+ p + "welcome message` To Set One"
            }\n${
              welback
                ? "<:ayumuTick:842630449200889856>"
                : "<:no:860411707242840064>"
            } **Welcome Image: **${
              welback
                ? `Welcome Image Is Set`
                : "No Welcome Image, `"+ p + "welcome Image` To Set One"
            }\n${
              welc ? "<:ayumuTick:842630449200889856>" : "<:no:860411707242840064>"
            } **Welcome Text Color:** ${
              welc
                ? `Welcome Text Color Is Set`
                : "No Welcome Text Is Set, `"+ p + "welcome color welcome` To Set One"
            }\n${
              user ? "<:ayumuTick:842630449200889856>" : "<:no:860411707242840064>"
            } **User Text Color:** ${
              user
                ? `User Text Color Is Set`
                : "No User Text Is Set, `"+ p + "welcome color user` To Set One"
            }\n${
              en ? "<:ayumuTick:842630449200889856>" : "<:no:860411707242840064>"
            } **Welcome Embed:** ${
              en ? "Welcome Embed Is Set" : "Welcome Embed Is Not Enabled, `"+ p + "welcome embed` To Set One."
            }`)
          .setTimestamp();
        msg.channel.send(emb);
      }
      //----------------------TEST END-----------------------//
    } else if (args[0].toLowerCase() === "disable") {
      //--------------------DISABLE----------------------//
      let chan = db.get(`welchannl1_${msg.guild.id}`);
      if (chan == null) {
        return msg.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTitle("❌ You Have Not Enabled Welcome")
            .setDescription("You Need To Enable Welcome To Disable!")
            .setTimestamp()
        );
      } else {
        db.delete(`welchannl1_${msg.guild.id}`);
        db.delete(`welback1_${msg.guild.id}`);
        db.delete(`welmsg1_${msg.guild.id}`);
        db.delete(`weldm_${msg.guild.id}`)
        db.delete(`emb_${msg.guild.id}`)
        const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setTitle("✅  Disable Success")
          .setDescription("You Have Disabled Welcome Succesfully")
          .setTimestamp();
        msg.channel.send(emb);
      }
      //-------------------DISABLE END-----------------------//
    } else if (args[0].toLowerCase() === "message") {
      //------------------MESSAGE--------------------//
      let msg1 = args.slice(1).join(" ");
      if (!msg1) {
        return msg.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTitle("❌ Welcome Message Error")
            .setDescription("Please Specify A Message To Be Set In Welcome!")
            .addField(
              "Welcome Variables",
              `**{user}** - Mentions The User On Join.\n**{username}** - Member Username With Tag!\n**{server}** - Gives Server Name.\n**{membercount}** - Gets Server Member Count.\n**{:emoji}** - Show a server emoji by replacing with name. Ex. \`{:Alix}\``
            )
            .setFooter(client.user.username + ` |Welcome`)
            .setTimestamp()
        );
      } else {
        db.set(`welmsg1_${msg.guild.id}`, msg1);
        if (msg1) {
          msg1 = msg1.replace(/{user}/g, msg.author);
          msg1 = msg1.replace(/{server}/g, msg.guild.name);
          msg1 = msg1.replace(/{membercount}/g, msg.guild.memberCount);
          msg1 = msg1.replace(/{username}/g, msg.author.tag);
          let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
          if(!matches) matches = msg1
          for (const match of matches) {
            const rep = await msg.guild.emojis.cache.find(
              (emoji) => emoji.name === match.substring(2, match.length - 1)
            );
            if (rep) msg1 = msg1.replace(match, rep);
          }
        }
        const emn = new MessageEmbed()
          .setColor("#00FF00")
          .setTitle("✅  Welcome Message Set!")
          .addField("Welcome Message Set As", msg1)
          .setFooter("Done!");
        msg.channel.send(emn);
      }
      //--------------MESSAGE END---------------------//
    } else if (args[0].toLowerCase() === "messageremove") {
      let msg1 = db.get(`welmsg1_${msg.guild.id}`);
      if (msg1 == null) {
        return msg.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTitle(
              "❌ You Have Not Enabled Welcome Message"
            )
            .setDescription("You Need To Enable Welcome Message To Disable")
            .setTimestamp()
        );
      } else {
        db.delete(`welmsg1_${msg.guild.id}`);
        const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setTitle("✅  Disable Success")
          .setDescription("You Have Disable Welcome Message Succesfully")
          .setTimestamp();
        msg.channel.send(emb);
      }
    } else if (args[0].toLowerCase() === "color") {
      //----------------------COLOR--------------------------//
      if (!args[1]) {
        const emb = new MessageEmbed()
          .setColor("RED")
          .setTitle("Welcome Text Color")
          .addField(
            p + "welcome color welcome",
            "```Change The Welcome Text Color, Ex. "+ p + "welcome color welcome #00FF00```"
          )
          .addField(
            p + "welcome color user",
            "```Change The Username Text Color, Ex. "+ p + "welcome color user #00FF00```"
          )
          .setTimestamp();
        return msg.channel.send(emb);
      } else if (args[1].toLowerCase() === "welcome") {
        let color = args[2];
        if (!color) {
          const h = new MessageEmbed()
            .setColor("RED")
            .setTitle("❌  Color Error")
            .setDescription(
              "You Have Not Specified The Color To Be Put In Welcome Text"
            )
            .setTimestamp();
          return msg.channel.send(h);
        } else {
          db.set(`welcolor1_${msg.guild.id}`, color);
          const h2 = new MessageEmbed()
            .setColor(color)
            .setTitle("✅  Color Success")
            .setDescription(
              `<-- Your Welcome Text Is Set As Embed Color, \`${color}\``
            )
            .setTimestamp();
          msg.channel.send(h2);
        }
      } else if (args[1].toLowerCase() === "user") {
        let color = args[2];
        if (!color) {
          const h = new MessageEmbed()
            .setColor("RED")
            .setTitle("❌  Color Error")
            .setDescription(
              "You Have Not Specified The Color To Be Put In User Text"
            )
            .setTimestamp();
          return msg.channel.send(h);
        } else {
          db.set(`usrcolor1_${msg.guild.id}`, color);
          const h2 = new MessageEmbed()
            .setColor(color)
            .setTitle("✅  Color Success")
            .setDescription(
              `<-- Your User Text Is Set As Embed Color, \`${color}\``
            )
            .setTimestamp();
          msg.channel.send(h2);
        }
      }
      //---------------------------COLOR END-----------------------------//
    } else if (args[0].toLowerCase() === "colorremove") {
      if (!args[1]) {
        const emb = new MessageEmbed()
          .setColor("RED")
          .setTitle("Welcome Text Color Remove")
          .addField(
            p + "welcome colorremove welcome",
            "```Removes The Welcome Text Color, Ex. "+ p + "welcome colorremove welcome```"
          )
          .addField(
            p + "welcome colorremove user",
            "```Removes The Username Text Color, Ex. "+ p + "welcome colorremove user```"
          )
          .setTimestamp();
        return msg.channel.send(emb);
      } else if (args[1].toLowerCase() === "welcome") {
        let welc = db.get(`welcolor1_${msg.guild.id}`);
        if (!welc) {
          const h = new MessageEmbed()
            .setColor("RED")
            .setTitle("❌  Command Error")
            .setDescription(
              "You Have Not Enabled Welcome Text Color To Disable"
            )
            .setTimestamp();
          return msg.channel.send(h);
        } else {
          db.delete(`welcolor1_${msg.guild.id}`);
          const h2 = new MessageEmbed()
            .setColor("#00FF00")
            .setTitle("✅  Color Removed")
            .setDescription(`Your Welcome Text Color Has Been Removed`)
            .setTimestamp();
          msg.channel.send(h2);
        }
      } else if (args[1].toLowerCase() === "user") {
        let welc = db.get(`usrcolor1_${msg.guild.id}`);
        if (!welc) {
          const h = new MessageEmbed()
            .setColor("RED")
            .setTitle("❌  Command Error")
            .setDescription("You Have Not Enabled User Text Color To Disable")
            .setTimestamp();
          return msg.channel.send(h);
        } else {
          db.delete(`usrcolor1_${msg.guild.id}`);
          const h2 = new MessageEmbed()
            .setColor("#00FF00")
            .setTitle("✅  Color Removed")
            .setDescription(`Your User Text Color Has Been Removed`)
            .setTimestamp();
          msg.channel.send(h2);
        }
      }
    }else if(args[0].toLowerCase() === "embed"){
      db.set(`emb_${msg.guild.id}`, true)
      const gg = new MessageEmbed()
      .setColor("#00FF00")
      .setDescription("You Have Successfully Enabled Welcome Embed")
      .setTitle("✅  Welcome Embed")
      .setTimestamp()
      msg.channel.send(gg)
    }else if(args[0].toLowerCase() === "embedremove"){
      let embed = db.get(`emb_${msg.guild.id}`)
      if(embed == null){
        let h = new MessageEmbed()
        .setColor("RED")
        .setDescription("You Have Not Enabled Welcome Embed To Disable")
        .setTitle("❌  Embed Error")
        .setTimestamp()
        return msg.channel.send(h)
      }else {
        db.delete(`emb_${msg.guild.id}`)
        const emb = new MessageEmbed()
          .setColor("#00FF00")
          .setTitle("✅  Disable Success")
          .setDescription("You Have Disable Welcome Embed Succesfully")
          .setTimestamp();
        msg.channel.send(emb);
      }
    }else if(args[0].toLowerCase() === "font"){
    let embed = new MessageEmbed()
    .setColor("#00ffff")
    .setDescription("Now React With The Number That You Want To Select In Welcome Font\n\n:one: - For **Geizer** Font\n:two: - For **A-Captain** Font\n3️⃣ - For **Bourbon Regular** Font\n\n:x: - To Cancle The Font Selection\n🔁 - To Rest The Welcome Font")
    .setTimestamp()
    const msg1 = await msg.channel.send(embed)
    await msg1.react("1️⃣");
    await msg1.react("2️⃣");
    await msg1.react("3️⃣");
      await msg1.react("❌");
    await msg1.react("🔁")
    msg1.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == "3️⃣" || reaction.emoji.name == "4️⃣" || reaction.emoji.name == "5️⃣" || reaction.emoji.name == "6️⃣" || reaction.emoji.name === "❌" || reaction.emoji.name == "🔁"),
    { max: 1, time: 30000 }).then(collected => {
            if (collected.first().emoji.name == '1️⃣') {
                    msg.reply('Font Set To **Geizer**');
                    db.set(`font_${msg.guild.id}`, "Geizer")
                    msg1.delete()
            }else if(collected.first().emoji.name == "2️⃣"){
              msg.reply("Font Set To **A-Captain**")
              db.set(`font_${msg.guild.id}`, "Captain")
              msg1.delete()
            }else if(collected.first().emoji.name == "3️⃣"){
              msg.reply("Font Set To **Bourbon Regular**")
              db.set(`font_${msg.guild.id}`, "Bourbon")
              msg1.delete()
            }else if(collected.first().emoji.name == "🔁"){
              msg.reply("Font ReSet")
              db.delete(`font_${msg.guild.id}`)
              msg1.delete()
            }
            else
                    msg.reply('Operation canceled.');
                    msg1.delete()
    }).catch(() => {
            msg.reply('No reaction after 30 seconds, operation canceled');
            msg.delete()
    });
  }
} catch (e) {
  return message.channel.send(`An error has occured: ${e.stack}`)
}
}
}