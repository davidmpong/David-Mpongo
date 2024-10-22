const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🧜‍♂🌪 | ❤‍🔥 David mpongo ☠️]";
/** 
* @author NTKhang
* @author: do not delete it
* @message if you delete or edit it you will get a global ban
*/

module.exports = {
	config: {
		name: "help",
		version: "1.17",
		author: "David",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem cách dùng lệnh",
			en: "View command usage"
		},
		longDescription: {
			vi: "Xem cách sử dụng của các lệnh",
			en: "View command usage"
		},
		category: "info",
		guide: {
			vi: "   {pn} [để trống | <số trang> | <tên lệnh>]"
				+ "\   {pn} <command name> [-u | usage | -g | guide]: chỉ hiển thị phần hướng dẫn sử dụng lệnh"
				+ "\   {pn} <command name> [-i | info]: chỉ hiển thị phần thông tin về lệnh"
				+ "\   {pn} <command name> [-r | role]: chỉ hiển thị phần quyền hạn của lệnh"
				+ "\   {pn} <command name> [-a | alias]: chỉ hiển thị phần tên viết tắt của lệnh",
			en: "{pn} [empty ✰ <𝙽𝚞𝚖𝚎́𝚛𝚘 𝚍𝚞 𝚙𝚊𝚐𝚎> ➫ <command name>]"
				+ "\   {pn} <command name> [-u | usage | -g | guide]: only show command usage"
				+ "\   {pn} <command name> [-i | info]: only show command info"
				+ "\   {pn} <command name> [-r | role]: only show command role"
				+ "\   {pn} <command name> [-a | alias]: only show command alias"
		},
		priority: 1
	},

	langs: {
		vi: {
			help: "╭─────────────⭓\%1\├─────⭔\│ Trang [ %2/%3 ]\│ Hiện tại bot có %4 lệnh có thể sử dụng\│ » Gõ %5help <số trang> để xem danh sách các lệnh\│ » Gõ %5help để xem chi tiết cách sử dụng lệnh đó\├────────⭔\│ %6\╰─────────────⭓",
			help2: "%1├───────⭔\│ » Hiện tại bot có %2 lệnh có thể sử dụng\│ » Gõ %3help <tên lệnh> để xem chi tiết cách sử dụng lệnh đó\│ %4\╰─────────────⭓",
			commandNotFound: "Lệnh \%1\ không tồn tại",
			getInfoCommand: "╭── NAME ────⭓\│ %1\├── INFO\│ Mô tả: %2\│ Các tên gọi khác: %3\│ Các tên gọi khác trong nhóm bạn: %4\│ Version: %5\│ Role: %6\│ Thời gian mỗi lần dùng lệnh: %7s\│ Author: %8\├── Usage\│%9\├── Notes\│ Nội dung bên trong <XXXXX> là có thể thay đổi\│ Nội dung bên trong [a|b|c] là a hoặc b hoặc c\╰──────⭔",
			onlyInfo: "╭── INFO ────⭓\│ Tên lệnh: %1\│ Mô tả: %2\│ Các tên gọi khác: %3\│ Các tên gọi khác trong nhóm bạn: %4\│ Version: %5\│ Role: %6\│ Thời gian mỗi lần dùng lệnh: %7s\│ Author: %8\╰─────────────⭓",
			onlyUsage: "╭── USAGE ────⭓\│%1\╰─────────────⭓",
			onlyAlias: "╭── ALIAS ────⭓\│ Các tên gọi khác: %1\│ Các tên gọi khác trong nhóm bạn: %2\╰─────────────⭓",
			onlyRole: "╭── ROLE ────⭓\│%1\╰─────────────⭓",
			doNotHave: "Không có",
			roleText0: "0 (Tất cả người dùng)",
			roleText1: "1 (Quản trị viên nhóm)",
			roleText2: "2 (Admin bot)",
			roleText0setRole: "0 (set role, tất cả người dùng)",
			roleText1setRole: "1 (set role, quản trị viên nhóm)",
			pageNotFound: "Trang %1 không tồn tại"
		},
		en: {
			help: "┏━━━━━━━━━┓\┃⟮𓄿David 𝙱𝙾𝚃𓅛⟯┃\┗━━━━━━━━━┛\➠%1\├─────⛁\│ 𝙿𝙰𝙶𝙴𝚂 ➣ ❰ %2/%3 ❱\│ 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝙴𝚂 ➢ ❰ %4 ❱\│ » 𝐭𝐚𝐩𝐞𝐳 ￫%5help￩ <page> 𝙿𝚘𝚞𝚛 𝚕𝚊 𝚕𝚒𝚜𝚝𝚎 𝚍𝚎 𝚌𝚘𝚖𝚍𝚜\│ » 𝚝𝚊𝚙𝚎𝚣 ￫%5help￩ 𝚙𝚘𝚞𝚛 𝚙𝚕𝚞𝚜 𝚍'𝚒𝚗𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗\\┏━━━━━━━━━━━┓\ Davidmpong1000@𝚐𝚖𝚊𝚒𝚕.𝚌𝚘𝚖     \┗━━━━━━━━━━━┛\𝐍𝐨𝐦: ☆David mpongo ☆🪶\🦅𝐅𝐁: www.facebook.com/100092277325670\⛁────────✰\│ %6\╰────⟮David🦅⟯────⛁",
			help2: "┏━━━━━━━━┓\┃𓅜David 𝙱𝚘𝚝𓅛 ┃\┗━━━━━━━━┛ %1 ✰\│ ➢ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗘𝗦: ❰%2❱\│ ➢ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚎𝚜: 𝚃𝚊𝚙𝚎𝚣 %3help <command name> 𝐩𝐨𝐮𝐫 𝐜𝐨𝐦𝐩𝐫𝐞𝐧𝐝𝐫𝐞 𝐥𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧𝐧𝐞𝐦𝐞𝐧𝐭 𝐝𝐞 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞\\➢ 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚙𝚎𝚞𝚛:\🍆 𝗡𝗢𝗠: ✰David mpongo ✰🪶\🦅 𝗙𝗕: www.facebook.com/100092277325670\│ %4\╰────𝗗/𝙱𝚘𝚝─────☻",
			commandNotFound: "Command \%1\ does not exist",
			getInfoCommand: "╭── ⅈ𝖓𝚏օ ────⭓\│ 𝐍𝐨𝐦 𝐝𝐞 𝐥𝐚 𝐜𝐦𝐝: %1\│ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: %2\│ 𝐍𝐨𝐦𝐬: %3\│ 𝐍𝐨𝐦𝐬 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬: %4\│ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: %5\│ 𝐑𝐨𝐥𝐞: %6\│ 𝐓𝐞𝐦𝐩𝐬 𝐝'𝐞𝐱𝐞𝐜𝐮𝐭𝐢𝐨𝐧: %7s\│ Author: %8\╰─────────────⭓",
			onlyInfo: "╭── INFO ────⭓\│ Command name: %1\│ Description: %2\│ Other names: %3\│ Other names in your group: %4\│ Version: %5\│ Role: %6\│ Time per command: %7s\│ Author: %8\╰─────────────⭓",
			onlyUsage: "╭── USAGE ────⭓\│%1\╰─────────────⭓",
			onlyAlias: "╭── ALIAS ────⭓\│ Other names: %1\│ Other names in your group: %2\╰─────────────⭓",
			onlyRole: "╭── ROLE ────⭓\│%1\╰─────────────⭓",
			doNotHave: "Do not have",
			roleText0: "0 (All users)",
			roleText1: "1 (Group administrators)",
			roleText2: "2 (Admin bot)",
			roleText0setRole: "0 (set role, all users)",
			roleText1setRole: "1 (set role, group administrators)",
			pageNotFound: "Page %1 does not exist"
		}
	},

	onStart: async function ({ message, args, event, threadsData, getLang, role }) {
		const langCode = await threadsDat
