/*
 スプレッドシートを開く
 引数:シート名
 戻り値:シート
 */
function openSpreadSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SPREAD_SHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  return sheet;
}

/*
 スプレッドシートにユーザIDを書き込む
 引数:LINEユーザID
*/
function writeSpreadSheetForUserId(userId) {
  const sheet = openSpreadSheet(SPREAD_SHEET_NAME3);
  const lastRow = sheet.getLastRow(); // 最終行を取得
  sheet.getRange(lastRow + 1, 1, 1, 1).setValue(userId); // getRange(row, column, numRows, numColumns)で最終行、1列目を始点とし、1行1列目に値をセット
}

/*
 スプレッドシートに品名を書き込む
 引数:品名
*/
function writeSpreadSheetForName(text) {
  const sheet = openSpreadSheet(SPREAD_SHEET_NAME1);
  const lastRow = sheet.getLastRow(); // 最終行を取得
  sheet.getRange(lastRow, 1, 1, 1).setValue(text); // getRange(row, column, numRows, numColumns)で最終行、1列目を始点とし、1行1列目に値をセット
}

/*
 スプレッドシートに賞味期限・消費期限を書き込む
 引数:賞味期限・消費期限
 */
function writeSpreadSheetForDate(expireDate) {
  const sheet = openSpreadSheet(SPREAD_SHEET_NAME1);
  const lastRow = sheet.getLastRow(); // 最終行を取得
  // 賞味期限・消費期限は品名より先にセットするため、値が設定されている最終行に+1して新しい行にする
  sheet.getRange(lastRow + 1, 2, 1, 1).setValue(expireDate); // getRange(row, column, numRows, numColumns)で最終行+1、2列目を始点とし、1行1列目に値をセット
}

/*
  スプレッドシートからユーザIDを探す
  引数:ユーザID
 */
function searchUserId(userId){
  const sheet = openSpreadSheet(SPREAD_SHEET_NAME3);
  const textFinder = sheet.createTextFinder(userId);
  const cells = textFinder.findAll();
  return cells.length;
}

/*
 スプレッドシートをソートする
 */
function sortSpreadSheet() {
  const sheet = openSpreadSheet(SPREAD_SHEET_NAME1);
  // 最終行を取得
  const lastRow = sheet.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow(); // A1セルから見て下方向に値のある行数を取得
  const range = sheet.getRange(2, 1,lastRow - 1, 2); // ヘッダはそのままにしたいので、2行目1列目を始点とし、最終行-1、2列目の範囲を対象とする
  range.sort(2); // 2列目（賞味期限・消費期限）の昇順でソート
}