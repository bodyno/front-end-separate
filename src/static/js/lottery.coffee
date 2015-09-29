afterTran = ->
  $(".lottery-one").on("mouseenter", ->
    $(@).find(".lottery-text").fadeIn 200
    $(@).find(".lottery-btn").animate
      bottom: 44
    , 200
  ).on("mouseleave", ->
    $(@).find(".lottery-text").fadeOut 200
    $(@).find(".lottery-btn").animate bottom: -20, 200
  )