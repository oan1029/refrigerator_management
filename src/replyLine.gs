// LINEに返信する処理
function replyLine(LineMessageObject, replyToken) {
	const replyHeaders = {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + TOKEN
	};
	const replyBody = {
		'replyToken': replyToken,
		'messages': LineMessageObject
	};
	const replyOptions = {
		'method': 'POST',
		'headers': replyHeaders,
		'payload': JSON.stringify(replyBody)
	};
	UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', replyOptions);
}