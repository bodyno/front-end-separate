var getJackpot, loadImage;

loadImage = function(am) {
  var classType, di, digit_img_str, digit_len;
  digit_len = am.length;
  digit_img_str = "";
  di = 0;
  while (di < digit_len) {
    if (am[di].match(/^[0-9]$/)) {
      digit_img_str += "<span class='jackpot jackpot_num'>" + am[di] + "</span> ";
    } else {
      classType = "";
      if (am[di] === ".") {
        classType = "jackpot_dot";
      } else if (am[di] === ",") {
        classType = "jackpot_comm";
      } else if (am[di] === "¥") {
        classType = "jackpot_cny";
      } else {
        continue;
      }
      digit_img_str += "<span class='jackpot " + classType + "'>&nbsp;</span>";
    }
    di++;
  }
  return digit_img_str;
};

getJackpot = function(game_type) {
  var game, games, results, textBox, ticker;
  games = jackpot_games[game_type];
  results = [];
  for (game in games) {
    ticker = new Ticker({
      info: 1,
      casino: "playtech",
      game: games[game].jp,
      currency: "cny"
    });
    textBox = game_type + "-" + game;
    ticker.attachToTextBox(textBox);
    ticker.SetCurrencySign("￥");
    ticker.SetCurrencyPos(0);
    results.push(ticker.tick());
  }
  return results;
};

Ticker.prototype.showJackpot = function() {
  var imgtxt, newvalue, text;
  newvalue = this.getJackpot();
  if (this.type !== "count") {
    newvalue = Math.round(newvalue * 100) / 100 + "";
    if (newvalue.match(/^\d+\.\d$/)) {
      newvalue = newvalue + "0";
    }
    if (newvalue.match(/^\d+$/)) {
      newvalue = newvalue + ".00";
    }
  }
  text = "";
  if (newvalue > 0) {
    text = (this.signpos !== 0 ? newvalue + this.sign : this.sign + newvalue);
  }
  if (newvalue > 0 && this.type === "count") {
    text = newvalue;
  }
  imgtxt = loadImage(text);
  if (imgtxt !== "") {
    return this.textbox.innerHTML = imgtxt;
  }
};
