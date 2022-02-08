function defaultMenu(events) {
  const TODAY = new Date();
  const TODAY_STR = Utilities.formatDate(TODAY,'JST','yyyy-MM-dd');

  // メニューを開いたユーザがリマインド先に登録されていない場合は登録する
  const USERID = events.source.userId;
  if (searchUserId(USERID) == 0) {
    writeSpreadSheetForUserId(USERID);
  } 

  /* ボタンテンプレートメッセージを送る(datetime_picker) */
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/push', {
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN, // スクリプトプロパティにトークンは事前に追加しておく
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': USERID, // スクリプトプロパティに送信先IDは事前に追加しておく
      'messages': [
        {
          'type': 'template',
          'altText': 'datetime_picker',
          'template': {
            'type': 'buttons',
            'title': 'メニュー',
            'text': '以下より選択してください。',
            'actions': [
              {
                'type': 'datetimepicker',
                'label': '新しい商品の追加',
                'data': 'action=setDate',
                'mode': 'date',
                'initial': TODAY_STR,
                'max': '2050-12-31',
                'min': '2022-01-01'
              }
              ,
              {
                'type': 'uri',
                'label': '登録されている商品一覧',
                'uri': SPREAD_SHEET_URI
              }
            ]
          }
        }
      ],
      'notificationDisabled': false // trueだとユーザーに通知されない
    }),
  });
}
