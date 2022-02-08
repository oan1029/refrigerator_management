// メッセージイベントの処理
function messageController(events, replyToken) {
	// メッセージを取得
	const message = events.message;
	// 本文を取得
	const text = message.text;
	
	// 本文に「メニュー」と送られてきた場合
	if (text.indexOf('メニュー') > -1) {
    defaultMenu(events);
  
  // 品目の削除
  } else if (text.indexOf('削除') > -1) {
    const textLength = text.length;
    const articleName = text.substr(0,textLength - 2); // 「○○削除」という文字を想定

    const sheet = openSpreadSheet(SPREAD_SHEET_NAME1);
    const lastRow = sheet.getLastRow(); // 最終行を取得
    const articles = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    let delFlg = false;
    let replyMessage = '';

    for(let i = 0; i < articles.length; i++) {
      const spreadSheetArticleName = articles[i][0];
      if (spreadSheetArticleName == articleName) {
        // 削除
        sheet.deleteRow(i + 2); // ２行目から開始=index0なので
        delFlg = true;
        replyMessage += articleName + 'を削除しました';
      }
    }

    if (!delFlg) {
      replyMessage += articleName + 'が見つかりませんでした';
    }

    // LINEのメッセージ形式にする
		let LineMessageObject = [{
		  'type': 'text',
		  'text': replyMessage
		}];
		
		// LINEに返信する
		replyLine(LineMessageObject, replyToken);

  // 上記以外の場合、品名を登録する
	} else {
    writeSpreadSheetForName(text);
    sortSpreadSheet();

		// LINEのメッセージ形式にする
		let LineMessageObject = [{
			'type': 'text',
			'text': '登録しました'
		}];
		
		// LINEに返信する
		replyLine(LineMessageObject, replyToken);
  }

}