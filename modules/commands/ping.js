module.exports.config = {
	name: "ping",
	version: "1.0.5",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "tag toร n bแป thร nh viรชn",
	commandCategory: "Box Chat",
	usages: "[Text]",
	cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
	try {
		const botID = api.getCurrentUserID();
		var listAFK, listUserID;
		global.moduleData["afk"] && global.moduleData["afk"].afkList ? listAFK = Object.keys(global.moduleData["afk"].afkList || []) : listAFK = []; 
		listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
		listUserID = listUserID.filter(item => !listAFK.includes(item));
		var body = (args.length != 0) ? args.join(" ") : "๐๐ฬฃฬ๐ฒ ๐ซ๐ ๐ญ๐ฎฬ๐จฬ๐ง๐  ๐ญ๐ฬ๐ ๐ง๐ฬ๐จ ๐ฆ๐ฬฬ๐ฒ ๐๐จ๐ง ๐ฆ๐ฬฃฬ๐ญ ๐๐ฬ๐ฒ", mentions = [], index = 0;
		for(const idUser of listUserID) {
			body = "โ" + body;
			mentions.push({ id: idUser, tag: "โ", fromIndex: index - 1 });
			index -= 1;
		}

		return api.sendMessage({ body, mentions }, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
    }