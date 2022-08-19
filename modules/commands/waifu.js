module.exports.config = {
 name: "waifu",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "dun",
 description: "Ảnh", //nhập thứ bạn muốn
 commandCategory: "random-img", //Phần hiển thị trên help
 usages: "waifu", //cách sử dụng
 cooldowns: 3, //thời gian chờ cách nhau
 
 };
   
module.exports.run = async ({ api, event, args }) => {
 const axios = require('axios');
 const request = require('request');
 const fs = require("fs");
 var max = args[0] || 1
     for (var i = 0; i < max; i++) {
 axios.get('https://api.waifu.pics/nsfw/waifu').then(res => { //nhập api từ waifu.pics
 let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
 
 let callback = function () {
     api.sendMessage({
      body: "",
      attachment: fs.createReadStream(__dirname + `/cache/do.${ext}`)
     }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/do.${ext}`), event.messageID);
    };
    request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/do.${ext}`)).on("close", callback);
   })
   }
}