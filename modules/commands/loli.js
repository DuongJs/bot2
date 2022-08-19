const moneydown = 1000 // Số tiền cho mỗi ảnh
module.exports.config = {
  name: "loli", // FBI open up =))
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Khoa",
  description: `Random ảnh loli kawaii, mỗi ảnh tốn ${moneydown}$ ^^`,
  commandCategory: "Hình ảnh",
  usages: "",
  cooldowns: 0
};

module.exports.run = async function({ api, event, Currencies }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var data = await Currencies.getData(event.senderID);
  var money = data.money;
  if(money < moneydown) return api.sendMessage(`Bạn không có đủ ${moneydown}$ để xem ảnh, vui lòng theo thầy Huấn bươn chải!`, event.threadID, event.messageID);
  axios.get("https://api-random-img.doanhkhoa.repl.co/loli").then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
	Currencies.decreaseMoney(event.senderID, moneydown);
    api.sendMessage({
        body: `Loli đây :>  -${moneydown}$\nHiện có ${count} ảnh`,
        attachment: fs.createReadStream(__dirname + `/cache/loli.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/loli.${ext}`), event.messageID);
    };
  request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/loli.${ext}`)).on("close", callback);
  })
}