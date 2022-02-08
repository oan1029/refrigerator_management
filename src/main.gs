// LINEから送信されたデータを処理する
function doPost(e) {
	// レスポンスを取得
	const responseLine = e.postData.getDataAsString();
	// JSON形式に変換する
	const responseLineJson = JSON.parse(responseLine).events[0];
	// イベントへの応答に使用するトークンを取得
	const replyToken = responseLineJson.replyToken;
	
	// メッセージイベントの場合
	if (responseLineJson.type == 'message') {
		messageController(responseLineJson, replyToken);
	} else if (responseLineJson.type == 'postback') {
    dateSelectController(responseLineJson, replyToken);
  }
}