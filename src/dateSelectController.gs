// 日付選択アクションのポストバックイベントの処理
function dateSelectController(events, replyToken) {
	// ポストバックイベントを取得
	const postback = events.postback;
  // 日付選択アクションかどうかを取得
  const data = postback.data;

  if (data == 'action=setDate') {
    // 選択された消費期限を取得・書き込み
    const expireDate = postback.params.date;
    writeSpreadSheetForDate(expireDate);
    const nameInputMessage = expireDate + 'で登録します。品名を入力してください';

    // 商品名の入力を促す
    let LineMessageObject = [{
			'type': 'text',
			'text': nameInputMessage
		}];

    // LINEに返信する
		replyLine(LineMessageObject, replyToken);
  
  // 上記以外の場合、使い方を送信
	} else {
    // 商品名の入力を促す
    let LineMessageObject = [{
			'type': 'text',
			'text': INFO_MESSAGE
		}];

    // LINEに返信する
		replyLine(LineMessageObject, replyToken);
  }

}