const axios = require('axios');
const config = {
  name: 'gelbooru',
  version: '1.1.1.1',
  hasPermssion: 0,
  credits: '',
  description: 'Tìm ảnh trên gelbooru(.)com',
  commandCategory: 'Hình ảnh',
  usages: '[số lượng] [key search]',
  cooldowns: 5
};

const run = async ({ api, event, args }) => {
  var { threadID, messageID } = event;
  try {
    var [count, search] = (isNaN(parseInt(args[0]))) ? [1, args.join("_")] : [parseInt(args[0]), args.splice(1).join('_')];
    const get = (await axios.get(encodeURI(`https://api-dundun.up.railway.app/gelbooru?search=${search}`))).data;
    if (get.count == 0) return api.sendMessage("Đéo tìm thấy kết quả nào!", threadID, messageID);
    if ("error" in get) return api.sendMessage("API đã xảy ra lỗi!", threadID, messageID);
    var attachment = [];
    for (var i = 0; i < count; i++) {
      if (i == 50) break;
      const down = (await axios.get(`https://external-content.duckduckgo.com/iu/?u=${get.data[Math.floor(Math.random()*get.count)]}`, { responseType: 'stream' })).data;
      attachment.push(down);
    };
    return api.sendMessage({ attachment }, threadID, messageID);
  } catch(error) { return api.sendMessage(`Đã xảy ra lỗi!${error}`, threadID, messageID); };
};

module.exports = {
  config,
  run
}