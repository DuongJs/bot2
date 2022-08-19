// Lấy key tại https://serpapi.com
const apikey = "8adb5ee609123e2289db00d46dbfb27a5a6977429d335eda308b899fe5acba2e";

module.exports.config = {
  name: "yandex",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Khoa",
  description: "Tìm ảnh bằng yandex images",
  commandCategory: "Hình ảnh",
  cooldowns: 0,
  usages: "[từ khóa tìm kiếm] [số lượng(mặc định là 10)]"
};

module.exports.run = async function ({ event, api, args }) {
try {
  const fs = require('fs');
  const axios = require('axios');
  var { threadID, messageID, senderID, body } = event;
  if (args.length == 0) return api.sendMessage("Vui lòng nhập từ khóa tìm kiếm!", threadID, messageID);
  var count = isNaN(parseInt(args[args.length-1])) ? 10 : parseInt(args[args.length-1]);
  if (count > 15) return api.sendMessage("Tìm gì lắm thế! tối đa 15 thôi!", threadID, messageID);
  var end = isNaN(parseInt(args[args.length-1])) ? body.length : body.length - 1 - count.toString().length;
  var search = body.slice(body.indexOf(args[0]), end);
  api.sendMessage("Đang tìm " + search + "...", threadID, messageID);
  const res = await axios.get(`https://serpapi.com/search.json?engine=yandex_images&text=${encodeURI(search)}&api_key=${apikey}`);
  var Image = res.data.images_results;
  var data = [];

  for (var i= 1; i <= count; i++) {
    let path = __dirname + `/cache/yandex${i}.jpg`;
    let down = (await axios.get(`${Image[Math.floor(Math.random() * Image.length)].original}`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(path, Buffer.from(down, 'utf-8'));
    data.push(fs.createReadStream(path));
  };

  api.sendMessage({
    body: search + " đây :>",
    attachment: data
  }, threadID, messageID);

  for (let j= 1; j <= count; j++) {
    fs.unlinkSync(__dirname + `/cache/yandex${j}.jpg`);
  };
} catch (error) { return api.sendMessage(`Đã xảy ra lỗi!\nHãy thử thay apikey\n\n${error}`, threadID, messageID) }
}