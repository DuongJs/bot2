module.exports.config = {
 name: "waif",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "dun",
 description: "Ảnh", //nhập thứ bạn muốn
 commandCategory: "random-img", //Phần hiển thị trên help
 usages: "waif", //cách sử dụng
 cooldowns: 1, //thời gian chờ cách nhau
 
 };
   
module.exports.run = async ({ api, event }) => {
 const axios = require('axios');
 const request = require('request');
 const fs = require("fs");
 axios.get('https://api.waifu.pics/sfw/waifu').then(res => { //nhập api từ waifu.pics
 let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
 
 let callback = function () {
     api.sendMessage({
      body: "",
      attachment: fs.createReadStream(__dirname + `/cache/dom.${ext}`)
     }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/dom.${ext}`), event.messageID);
    };
    request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/dom.${ext}`)).on("close", callback);
   })
}
