/*!
** by zhangxinxu(.com) jquery.mailAutoComplete-4.0.js
*/

(function($) {
	$.fn.mailAutoComplete = function(options) {
		var defaults = {
			className: "emailist",
			email: 	["gmail.com","126.com","163.com","hotmail.com","yahoo.com","yahoo.com.cn","live.com","sohu.com","sina.com"], //邮件数组
			zIndex: 11	
		};
		// 最终参数
		var params = $.extend({}, defaults, options || {});
		
		// 是否现代浏览器
		var isModern = typeof window.screenX === "number", visibility = "visibility";
		// 键值与关键字
		var key = {
			"up": 38,
			"down": 40,
			"enter": 13,
			"esc": 27,
			"tab": 9	
		};
		// 组装HTML的方法
		var fnEmailList = function(input) {
			var htmlEmailList = '', arrValue = input.value.split("@"), arrEmailNew = [];
			$.each(params.email, function(index, email) {
				if (arrValue.length !== 2 || arrValue[1] === "" || email.indexOf(arrValue[1].toLowerCase()) === 0) {			
					arrEmailNew.push(email);						
				}
			});	
			$.each(arrEmailNew, function(index, email) {
				htmlEmailList = htmlEmailList + '<li'+ (input.indexSelected===index? ' class="on"':'') +'>'+ arrValue[0] + "@" + email +'</li>';	
			});		
			return htmlEmailList;			
		};
		// 显示还是隐藏
		var fnEmailVisible = function(ul, isIndexChange) {
			var value = $.trim(this.value), htmlList = '';
			if (value === "" || (htmlList = fnEmailList(this)) === "") {
				ul.css(visibility, "hidden");	
			} else {
				isIndexChange && (this.indexSelected = -1);
				ul.css({left: $(this).offset().left, top: $(this).offset().top + $(this).outerHeight() + 3});
				ul.css(visibility, "visible").html(htmlList);
			}
		};
		
		return $(this).each(function() {
			this.indexSelected = -1;
			// 列表容器创建
			var element = this;
			var eleUl = $('<ul></ul>').css({
				position: "absolute",
				left: $(element).offset().left,
				top: $(element).offset().top + $(element).height() + 10,
				visibility: "hidden",
				zIndex: params.zIndex
			}).addClass(params.className).bind("click", function(e) {
				var target = e && e.target;
				if (target && target.tagName.toLowerCase() === "li") {
				    $(element).val(target.innerHTML).trigger("input").focus();
					$(this).css(visibility, "hidden");
				}				
			});			
//			$(this).before(eleUl);
			eleUl.appendTo("body");
			// IE6的宽度
			if (!window.XMLHttpRequest) { eleUl.width(element.offsetWidth - 2); }	
			
			// 不同浏览器的不同事件
			isModern? $(this).bind("input", function() {
				fnEmailVisible.call(this, eleUl, true);
			}): element.attachEvent("onpropertychange", function(e) {				
				if (e.propertyName !== "value") return;
				fnEmailVisible.call(element, eleUl, true);		
			});
			
			$(document).bind({
				"mouseover": function(e) {
					if (eleUl.css(visibility) === "visible") {
						//element.indexSelected = 
						//if (element.indexSelected !== -1) {
						//	eleUl.html(fnEmailList(element));
						//}
					}
				},
				"click": function(e) {
					var target = e && e.target, htmlList = '';
					if (target == element && element.value && (htmlList = fnEmailList(element, params.email))) {
						eleUl.css(visibility, "visible").html(htmlList);	
					} else if (target != eleUl.get(0) && target.parentNode != eleUl.get(0)) {
						eleUl.css(visibility, "hidden");
					}
				},
				"keydown": function(e) {
					var eleLi = eleUl.find("li");
					if (eleUl.css(visibility) === "visible") {
						switch (e.keyCode) {
							case key.up: {
								element.indexSelected--;
								if (element.indexSelected < 0) {
									element.indexSelected = -1 + eleLi.length;	
								}
								e.preventDefault && e.preventDefault();
								break;
							}
							case key.down: {
								element.indexSelected++;
								if (element.indexSelected >= eleLi.length) {
									element.indexSelected = 0;	
								}
								e.preventDefault && e.preventDefault();
								break;
							}
							case key.enter: {		
								e.preventDefault();		
								eleLi.get(element.indexSelected) && $(element).val(eleLi.eq(element.indexSelected).html());
								eleUl.css("visibility", "hidden");
								break;
							}
							case key.tab: case key.esc: {
								eleUl.css("visibility", "hidden");
								break;
							}
						}
						if (element.indexSelected !== -1) {
							eleUl.html(fnEmailList(element));
						}
					}
				}
			});		
		});
	};
})(jQuery);


