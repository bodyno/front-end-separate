afterTran = ->
  $("#go-top").click ->
    $("html,body").animate
      scrollTop: 0
    , 200
