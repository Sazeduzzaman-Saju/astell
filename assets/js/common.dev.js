var kutil = {};
$.extend(kutil, kimsoft.util.array);
$.extend(kutil, kimsoft.util.code);
$.extend(kutil, kimsoft.util.common);
$.extend(kutil, kimsoft.util.date);
$.extend(kutil, kimsoft.util.editor);
$.extend(kutil, kimsoft.util.file);
$.extend(kutil, kimsoft.util.form);
$.extend(kutil, kimsoft.util.number);
$.extend(kutil, kimsoft.util.string);
$.extend(kutil, kimsoft.commonLocalStorage);

$(document).ready(function($){
	if (jQuery.datepicker) {
		jQuery.datepicker.regional['ko'] = {
			closeText: '닫기',
			prevText: '이전달',
			nextText: '다음달',
			currentText: '오늘',
			monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
				'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
			monthNamesShort: ['1월','2월','3월','4월','5월','6월',
				'7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			weekHeader: 'Wk',
			dateFormat: 'yy.mm.dd',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: true,
			yearSuffix: ''
		};
		jQuery.datepicker.setDefaults(jQuery.datepicker.regional['ko']);
	}

	initControl();
});

var gDatepickerOption4user = {
        showOn: 'button',
  		buttonImage: '/images/common/btn_calendar.png', // 달력 아이콘 이미지 경로
  		buttonImageOnly: true,
        buttonText: "달력",
        changeMonth: true,
  		changeYear: true,
        showButtonPanel:true,
        yearRange: 'c-99:c+99'
};

var gLayerPopupOption = {bOnclickHide:false, initOpen:true, backgroundDisplay:true, bg_color:"#000000", bg_opacity:0.5, zindex:10000};
var gUserType = "USER";

function initControl(p, option) {
	if (!p) {
		p = $(document);
	}

	var froms = [];
	var tos = [];
	$(".datepicker", p).each(function(){
		var datepickerOption = gDatepickerOption4user;
		$(this).datepicker(datepickerOption);
		if ($(this).hasClass("datepickerReadonly")) {
			$(this).keydown(function(e){
				if (e.which == 8 || e.which == 46) {
					e.preventDefault();
				}
			});
		} else {
			$(this).keydown(function(e){
				if (e.which == 8 || e.which == 46) {
					$(this).datepicker("setDate", "");
					e.preventDefault();
				}
			});
		}
		$(this).numeric({ichars:"0123456789/"});
		if ($(this).hasClass("datepickerFrom")) {
			$(this).data("pos", froms.length);
			froms[froms.length] = $(this);
		}
		if ($(this).hasClass("datepickerTo")) {
			$(this).data("pos", tos.length);
			tos[tos.length] = $(this);
		}
		if ($(this).hasClass("datepickerMaxToday")) {
			$(this).datepicker("option", "maxDate", "Now");
		}
		if ($(this).hasClass("datepickerMinToday")) {
			$(this).datepicker("option", "minDate", "Now");
		}
		if ($(this).hasClass("datepickerMinTomorrow")) {
			$(this).datepicker("option", "minDate", "Now + 1");
		}
		if ($(this).hasClass("datepickerNoSunday")) {
			$(this).datepicker("option", "beforeShowDay", function(date){
				return [date.getDay() != 0, ''];
			});
		}
		$(this).focus(function(e){
			$(this).datepicker("show");
		});
	});

	for(var i=0; i<froms.length; ++i) {
		var from = froms[i];
		var to = tos[i];

		if (to.datepicker("getDate") == null || to.datepicker("getDate") == "") {
			from.datepicker("option", "maxDate", to.datepicker("option", "maxDate"));
		} else {
			from.datepicker("option", "maxDate", to.datepicker("getDate"));
		}
		if (from.datepicker("getDate") == null || from.datepicker("getDate") == "") {
			to.datepicker("option", "minDate", from.datepicker("option", "minDate"));
		} else {
			to.datepicker("option", "minDate", from.datepicker("getDate"));
		}

		from.datepicker("option", "onSelect", function(dateText, inst) {
			var to = tos[$(this).data("pos")];
			to.datepicker("option", "minDate", dateText);
			to.next().attr('style', 'position:relative;left:0px;');
		});
		to.datepicker("option", "onSelect", function(dateText, inst) {
			var from = froms[$(this).data("pos")];
			from.datepicker("option", "maxDate", dateText);
			from.next().attr('style', 'position:relative;left:0px;');
		});
	}

	$("img[class='ui-datepicker-trigger']").each(function() {
		$(this).attr('style', 'position:relative;left:0px;');
	});


	$('.alphanumeric', p).alphanumeric();
	$('.phone', p).numeric({allow:"-"});
	$('.numeric', p).numeric();
	$('.onlyEng', p).alpha();
	$('.onlyEngKor', p).allAlpha();
	$('.onlyEngMark', p).alphanumeric({allow:"!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.-_ "});

	$(".numericInt", p).keyup(__setComma);
	$(".numericInt", p).click(__setSelectionRange);
	$(".numericInt", p).focus(__setSelectionRange);
	$('.numericInt', p).numeric();

	$(".numericInt2", p).keyup(__setComma);
	$(".numericInt2", p).click(__setSelectionRange);
	$(".numericInt2", p).focus(__setSelectionRange);
	$('.numericInt2', p).numeric({allowNegative:true});

	$(".numericDbl", p).keyup(__setComma);
	$(".numericDbl", p).click(__setSelectionRange);
	$(".numericDbl", p).focus(__setSelectionRange);
	$('.numericDbl', p).numeric({allow:".", nodup:"."});

	function __setComma(e) {
		$(this).val(kutil.setComma($(this).val()));
	}

	function __setSelectionRange(e) {
		kutil.setSelectionRange(this, $(this).val().length, $(this).val().length);
	}

	$("input").keydown(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
		}
	});

	$('.readonly', p).each(function(){
		$(this).keydown(function (e) {
			e.preventDefault();
		});
	});

	$("input, textarea").placeholder();
}

function fixYyyymmdd(val) {
	if (val.length < 8) {
		return val;
	}
	return val.substring(0,4) + "." + val.substring(4,6) + "." + val.substring(6,8);
}

function fixBsnsNum(val) {
	return val.substring(0,3) + "-" + val.substring(3,5) + "-" + val.substring(5,10);
}

function fixCompInfo(val1, val2) {
	return val1.substring(0,3) + "-" + val1.substring(3,5) + "-" + val1.substring(5,10) + "&nbsp;&nbsp;&nbsp;" + val2;
}

function fixEmail(val) {
	if (val == "@") {
		return "";
	} else {
		return val;
	}
}

function fixPhoneNo(val) {
	if (val == "--") {
		return "";
	} else {
		return val;
	}
}

function gLogout() {
	document.location.href = "/logout.jsp";
}

function showPopup(name, url) {
	var w = $(window).width();
	var h = $(window).height();
	var w2 = $("#" + name + "Layer").width();
	var h2 = $("#" + name + "Layer").height();
	var t = $(document).scrollTop();
	var l = $(document).scrollLeft();
	var newT = t + (h - h2) / 2;
	var newL = l + (w - w2) / 2;
	if (newT < 0) {
		newT = 0;
	}
	if (newL < 0) {
		newL = 0;
	}

	$("iframe[name=" + name + "]").attr("src", url);

	var gLayerPopupOption = {bOnclickHide:false, bg_color:"#000000", bg_opacity:0.5, left:newL, top:newT};
	$("body").jqModalPopup("#" + name + "Layer", gLayerPopupOption);
}

function closePopup(iframe) {
	$("iframe[name=" + iframe + "]").attr("src", "about:blank");

	gClosePopup("");
}

function showBsPopup(id, url) {
	$("#" + id).modal({backdrop: "static", keyboard: false});
	$("#" + id).modal("show").find(".modal-content").load(url);
}
