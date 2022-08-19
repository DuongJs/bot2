module.exports.config = {
  name: "adc",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "D-Jukie",
  description: "Áp dụng code từ pastebin",
  commandCategory: "Admin",
  usages: "[filename]",
  cooldowns: 0
};

module.exports.run = async function ({ api, event, args }) {
  const fs = require('fs');
  const axios = require('axios');
  const { threadID, messageID, messageReply, type } = event;
  const send = msg => api.sendMessage(msg, threadID, messageID);
  if (type !== "message_reply") return;
  if (args.length == 0) return send("Vui lòng nhập tên file!");
  var [name, url] = [args[0], event.messageReply.body];
  if (url.indexOf("https://pastebin.com/raw/") !== 0) return send("Link pastebin đéo hợp lệ!);
  const data = (await axios.get(url)).data;
  fs.writeFile( `${__dirname}/${args[0]}.js`, data, "utf-8", function (err) {
    if (err) return send(`Đã xảy ra lỗi khi áp dụng code vào ${args[0]}.js`);
    return send(`Đã áp dụng code vào ${args[0]}.js, sử dụng command load để sử dụng!`);
  });
  }