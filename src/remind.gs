function remindMessage() {
  // リマインド送り先を取得
  const sheet = openSpreadSheet(SPREAD_SHEET_NAME3);
  const lastRow = sheet.getLastRow(); // 最終行を取得
  const userIds = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  
  // 明日の日付を取得
  const today = new Date();
  today.setDate(today.getDate() + 1);

  // 明日より前の期限のものを取得
  const remindText = getDatePlan(today);
  if (remindText != '') {
    for (let i = 0; i < userIds.length; i++) {
      sendLineMessageFromUserId(userIds[i][0], remindText);
    }
  }
}

//指定日より前の予定を返す
function getDatePlan(date) {
  let remindText = '';
  const sheet = openSpreadSheet(SPREAD_SHEET_NAME1);
  const lastRow = sheet.getLastRow(); // 最終行を取得
  const articles = sheet.getRange(2, 1, lastRow - 1, 2).getValues();

  for(let i = 0; i < articles.length; i++) {
    const cellTime = articles[i][1];
    if (cellTime.getTime() <= date.getTime()) {
      const year = cellTime.getFullYear();
      const month = cellTime.getMonth() + 1;
      const day = cellTime.getDate() + 1;
      if (remindText != '') {
        remindText += '\n';
      }
      remindText += year + '/' + month + '/' + day + ":" + articles[i][0];
    }
  }
  return remindText;
}

//指定のuserIdにメッセージを送る
function sendLineMessageFromUserId(userId, text) {
  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + TOKEN
  };
  var postData = {
    "to": userId,
    "messages": [{
      "type": "text",
      "text": text
    }]
  };
  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  UrlFetchApp.fetch(url, options);
}
