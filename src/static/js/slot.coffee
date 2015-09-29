loadImage = (am) ->
  digit_len = am.length
  digit_img_str = ""
  di = 0

  while di < digit_len
    if am[di].match(/^[0-9]$/)
      digit_img_str += "<span class='jackpot jackpot_num'>" + am[di] + "</span> "
    else
      classType = ""
      if am[di] is "."
        classType = "jackpot_dot"
      else if am[di] is ","
        classType = "jackpot_comm"
      else if am[di] is "¥"
        classType = "jackpot_cny"
      else
        continue
      digit_img_str += "<span class='jackpot " + classType + "'>&nbsp;</span>"
    di++
  digit_img_str
getJackpot = (game_type) ->
  games = jackpot_games[game_type]
  for game of games
    ticker = new Ticker(
      info: 1
      casino: "playtech"
      game: games[game].jp
      currency: "cny"
    )
    textBox = game_type + "-" + game
    ticker.attachToTextBox textBox
    ticker.SetCurrencySign "￥"
    ticker.SetCurrencyPos 0
    ticker.tick()
Ticker::showJackpot = ->
  newvalue = @getJackpot()
  unless @type is "count"
    newvalue = Math.round(newvalue * 100) / 100 + ""
    newvalue = newvalue + "0"  if newvalue.match(/^\d+\.\d$/)
    newvalue = newvalue + ".00"  if newvalue.match(/^\d+$/)
  text = ""
  text = ((if @signpos isnt 0 then newvalue + @sign else @sign + newvalue))  if newvalue > 0
  text = newvalue  if newvalue > 0 and @type is "count"
  imgtxt = loadImage(text)
  @textbox.innerHTML = imgtxt  unless imgtxt is ""