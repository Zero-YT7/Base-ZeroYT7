//"use-gak use wkwk"

owner = '6283862323152'
botname = 'Cyber Zero'
botinfo = 'Zeroyt7'

const { fetchJosn, fetchText } = require('./lib/fetcher')
const { color, bgcolor } = require('./lib/color')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')

const
	{
		WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		mentionedJid,
		processTime,
	} = require("@adiwajshing/baileys")
const fs = require("fs")
const axios = require('axios')
const speed = require("performance-now")
const util = require('util')
const crypto = require('crypto')
const request = require('request')
const moment = require('moment-timezone')
const { exec, spawn } = require('child_process')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')

const _antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
const _antivirtex = JSON.parse(fs.readFileSync('./database/antivirtex.json'))

module.exports = zeroyt7 = async (zeroyt7, mek) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.blocked
        	mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
        const type = Object.keys(mek.message)[0]        
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        const prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : '-'          	
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		const q = args.join(' ')
		const txt = mek.message.conversation
		const botNumber = zeroyt7.user.jid
		const ownerNumber = [`${owner}@s.whatsapp.net`, `6283862323152@s.whatsapp.net`]
		const isGroup = from.endsWith('@g.us')
		let sender = isGroup ? mek.participant : mek.key.remoteJid
		const totalchat = await zeroyt7.chats.all()
		const groupMetadata = isGroup ? await zeroyt7.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const conts = mek.key.fromMe ? zeroyt7.user.jid : zeroyt7.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? zeroyt7.user.name : conts.notify || conts.vname || conts.name || '-'
        
		const isAntiLink = isGroup ? _antilink.includes(from) : false
		const isAntiVirtex = isGroup ? _antivirtex.includes(from) : false
		const isOwner = ownerNumber.includes(sender)
		const isMybot = isOwner || mek.key.fromMe

		mess = {
			wait: 'Sabar Lagi Proses Tod...!',
			success: 'Done Jangan Lupa Subscribe Zero YT7',
			error: {
				stick: 'Gagal Convert Gambar To Sticker...Coba Lagi !',
				Iv: 'Linknya Error Tod !'
			},
			only: {
				admin: 'Kusus Admin Tod !',
				group: 'Khusus Group Tod !'
			}
		}
		const isUrl = (url) => {
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }
        const reply = (teks) => {
            zeroyt7.sendMessage(from, teks, text, {quoted:mek})
        }
        const sendMess = (hehe, teks) => {
            zeroyt7.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
            (id == null || id == undefined || id == false) ? zeroyt7.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : zeroyt7.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
        }
        zeroyt7.chatRead(from, "read")

        const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './stik' + names + '.png', async function () {
                    console.log('selesai');
                    let filess = './stik' + names + '.png'
                    let asw = './stik' + names + '.webp'
                    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                        let media = fs.readFileSync(asw)
                        zeroyt7.sendMessage(to, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                    });
                });
            }
        const sendMediaURL = async(to, url, text="", mids=[]) =>{
                if(mids.length > 0){
                    text = normalizeMention(to, text, mids)
                }
                const fn = Date.now() / 10000;
                const filename = fn.toString()
                let mime = ""
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        mime = res.headers['content-type']
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, filename, async function () {
                    console.log('done');
                    let media = fs.readFileSync(filename)
                    let type = mime.split("/")[0]+"Message"
                    if(mime === "image/gif"){
                        type = MessageType.video
                        mime = Mimetype.gif
                    }
                    if(mime.split("/")[0] === "audio"){
                        mime = Mimetype.mp4Audio
                    }
                    zeroyt7.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
                    fs.unlinkSync(filename)
                });
            }   
            if (budy.match(/(https:\/\/chat.whatsapp.com)/gi)) {
			if (!isGroup) return
			if (!isAntiLink) return
			if (isGroupAdmins) return reply(`${pushname} Okelah Lu Admin Gpp :D`)
			var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
			setTimeout(() => {
				reply('byee👋')
			}, 1100)
			setTimeout(() => {
				zeroyt7.groupRemove(from, [Kick]).catch((e) => { reply(`*Adminin Woi* \nError: ${e}`) })
			}, 1000)
			setTimeout(() => {
				reply(`Link Group Terdeteksi maaf *${pushname}* anda akan di kick`)
			}, 0)
		}
		if (txt.length > 700) {
			if (!isGroup) return
			if (!isAntiVirtex) return
			if (isGroupAdmins) return reply(`${pushname} Adalah Admin Group Kamu Tidak Akan Di kick`)
			var kic = `${sender.split("@")[0]}@s.whatsapp.net`
			reply(`Virtex Terdeteksi maaf ${sender.split("@")[0]} anda akan di kick dari group`)
			setTimeout(() => {
				zeroyt7.groupRemove(from, [kic]).catch((e) => { reply(`Gajadi Gw Bkn Admin :v *ERR:* ${e}`) })
			}, 0)
		}

//========================================================================================================================//
		colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
      	if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
      	//if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mTEXT\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
     	if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
      	//if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mTEXT\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
	
switch (command) {
	case 'menu':
	case 'help':
	menunya = `✮Group Menu✮
	✎ ${prefix}antilink
	✎ ${prefix}antivirtex
	✎ ${prefix}group
	✎ ${prefix}linkgrup
	✎ ${prefix}promote
	✎ ${prefix}demote
	✎ ${prefix}add
	✎ ${prefix}kick`
	zeroyt7.sendMessage(from, menunya, text, {quoted: mek})
	break
	case 'antilink' :
				if (!isGroup) return reply(mess.only.group)
				if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
				but = [
                { buttonId: '!antilinkon', buttonText: { displayText: 'On' }, type: 1 },
                { buttonId: '!antilinkoff', buttonText: { displayText: 'Off' }, type: 1 }
                 ]
				sendButton(from, "Silahkan pilih untuk antilink group", botinfo, but, mek)
	break
				case 'antilinkon' :
				    //if (!isGroupAdmins) return reply("Anda Bukan Admin")
					if (isAntiLink) return reply('anti link sudah on')
					_antilink.push(from)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(_antilink))
					reply(`\`\`\`✓Sukses mengaktifkan fitur anti link di group\`\`\` *${groupMetadata.subject}*`)
				break
				case 'antilinkoff' :
				    //if (!isGroupAdmins) return reply("Anda Bukan Admin")
					if (!isAntiLink) return reply('anti link sudah off sebelumnya')
					_antilink.splice(from, 1)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(_antilink))
					reply(`\`\`\`✓Sukses menonaktifkan fitur anti link di group\`\`\` *${groupMetadata.subject}*`)
				break
	case 'antivirtex' :
				if (!isGroup) return reply(mess.only.group)
				if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
				but = [
                { buttonId: '!antivirtexon', buttonText: { displayText: 'On' }, type: 1 },
                { buttonId: '!antivirtexoff', buttonText: { displayText: 'Off' }, type: 1 }
                 ]
				sendButton(from, "Silahkan pilih untuk antivirtex group", botinfo, but, mek)
	break
				case 'antivirtexon' :
				    //if (!isGroupAdmins) return reply("Anda Bukan Admin")
					if (isAntiVirtex) return reply('anti virtex group sudah aktif sebelumnya')
					_antivirtex.push(from)
					fs.writeFileSync('./database/antivirtex.json', JSON.stringify(_antivirtex))
					reply(`\`\`\`Sukses mengaktifkan mode anti virtex di group\`\`\` *${groupMetadata.subject}*`)
				break
				case 'antivirtexoff' :
				    //if (!isGroupAdmins) return reply("Anda Bukan Admin")
					if (!isAntiVirtex) return reply('Mode anti virtex sudah nonaktif sebelumnya')
					_antivirtex.splice(from, 1)
					fs.writeFileSync('./database/antivirtex.json', JSON.stringify(_antivirtex))
					reply(`\`\`\`✓Sukes menonaktifkan mode anti virtex di group\`\`\` *${groupMetadata.subject}*`)
				break
	case 'group' :
				if (!isGroup) return reply(mess.only.group)
				if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
				but = [
                { buttonId: '!groupbuka', buttonText: { displayText: 'Buka' }, type: 1 },
                { buttonId: '!geouptutup', buttonText: { displayText: 'Tutup' }, type: 1 }
                 ]
				sendButton(from, "Silahkan pilih untuk buka/tutup group", botinfo, but, mek)
	break
				case 'groupbuka' :
				    //if (!isGroupAdmins) return reply("Anda Bukan Admin")
					reply(`\`\`\`✓Sukses Membuka Group\`\`\` *${groupMetadata.subject}*`)
					zeroyt7.groupSettingChange(from, GroupSettingChange.messageSend, false)
				break
				case 'geouptutup' :
				    //if (!isGroupAdmins) return reply("Anda Bukan Admin")
					reply(`\`\`\`✓Sukses Menutup Group\`\`\` *${groupMetadata.subject}*`)
					zeroyt7.groupSettingChange(from, GroupSettingChange.messageSend, true)
				break
	case 'linkgrup' :
				if (!isGroup) return reply(mess.only.group)
				if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
				linkgc = await zeroyt7.groupInviteCode(from)
				yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				zeroyt7.sendMessage(from, yeh, text, { quoted: mek })
				break
	case 'promote' :
				if (!isGroup) return reply(mess.only.group)
				//if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
				if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
				if (mentioned.length > 1) {
					teks = 'Perintah di terima, anda menjdi admin :\n'
					for (let _ of mentioned) {
						teks += `@${_.split('@')[0]}\n`
					}
					mentions(teks, mentioned, true)
					zeroyt7.groupMakeAdmin(from, mentioned)
				} else {
					mentions(`Perintah di terima, @${mentioned[0].split('@')[0]} Kamu Menjadi Admin Di Group *${groupMetadata.subject}*`, mentioned, true)
					zeroyt7.groupMakeAdmin(from, mentioned)
				}
				break
			case 'demote' :
				if (!isGroup) return reply(mess.only.group)
				//if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
				if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
				if (mentioned.length > 1) {
					teks = 'Perintah di terima, anda tidak menjadi admin :\n'
					for (let _ of mentioned) {
						teks += `@${_.split('@')[0]}\n`
					}
					mentions(teks, mentioned, true)
					zeroyt7.groupDemoteAdmin(from, mentioned)
				} else {
					mentions(`Perintah di terima, Menurunkan : @${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
					zeroyt7.groupDemoteAdmin(from, mentioned)
				}
				break
		case 'add' :
				if (!isGroup) return reply(mess.only.group)
				//if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
				if (args.length < 1) return reply('Yang mau di add siapa??')
				if (args[0].startsWith('08')) return reply('Gunakan kode negara Gan')
				try {
					num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
					zeroyt7.groupAdd(from, [num])
				} catch (e) {
					console.log('Error :', e)
					reply('Gagal menambahkan target, mungkin karena di private')
				}
				break
			case 'kick' :
				if (!isGroup) return reply(mess.only.group)
				//if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply("Bot Bukan Admin :)")
				if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
				if (mentioned.length > 1) {
					teks = 'Perintah di terima, mengeluarkan :\n'
					for (let _ of mentioned) {
						teks += `@${_.split('@')[0]}\n`
					}
					mentions(teks, mentioned, true)
					zeroyt7.groupRemove(from, mentioned)
				} else {
					mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
					zeroyt7.groupRemove(from, mentioned)
				}
				break
default:
if (isOwner) {
			if (budy.startsWith('>')) {
				console.log(color('[EVAL1]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval return`))
				try {
					let evaled = await eval(budy.slice(2))
					if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					reply(`${evaled}`)
				} catch (err) {
					reply(`${err}`)
				}
			} else if (budy.startsWith('x')) {
				console.log(color('[EVAL2]'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval identy`))
				try {
					return zeroyt7.sendMessage(from, JSON.stringify(eval(budy.slice(2)), null, '\t'), text, { quoted: mek })
				} catch (err) {
					e = String(err)
					reply(e)
				}
			}
		}
		}
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero") && !e.includes("jid")) {
	console.log('Error : %s', color(e, 'red'))
        }
	// console.log(e)
	}
}


	
    
