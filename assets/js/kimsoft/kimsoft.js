var kimsoft = {};
kimsoft.util = {};

kimsoft.util.array = {
		calcIndex : function(obj, order) {
			var arrObj = kimsoft.util.array.obj2Array(obj);
			for (var idx = 0; idx < arrObj.length; idx++) {
				if (order == "DESC") {
					arrObj[idx].index = arrObj.length - idx;
				} else {
					arrObj[idx].index = idx + 1;
				}
			}
		},
		obj2Array : function(data) {
			if (data == null) {
				return [];
			} else if ($.isArray(data)) {
				return data;
			} else if (data.length != undefined) {
				var result = [];
				for(var i=0; i<data.length; ++i) {
					result[i] = data[i];
				}
				return result;
			} else {
				return [data];
			}
		}
	};

kimsoft.util.code = {
		getCodeValue : function(infos, code) {
			for(var i=0; i<infos.length; ++i) {
				var info = infos[i];
				if (info.code == code) {
					return info.value;
				}
			}
			return "";
		},
		getCodeByValue : function(infos, value, codeCol, valueCol) {
			for(var i=0; i<infos.length; ++i) {
				var info = infos[i];
				if (info[valueCol] == value) {
					return info[codeCol];
				}
			}
			return "";
		},
		updateCodeValue : function(infos, codeInfos, codeCol, valueCol, codePosFrom, codePosTo) {
			if (codePosFrom == null || codePosFrom == undefined) {
				codePosFrom = 0;
			}
			if (codePosTo == null || codePosTo == undefined) {
				codePosTo = 1000000;
			}
			for(var i=0; i<infos.length; ++i) {
				var info = infos[i];

				var codeVal = info[codeCol];
				if (codeVal == null) {
					codeVal = "";
				}
				info[valueCol] = this.getCodeValue(codeInfos, codeVal.substring(codePosFrom, codePosTo));
			}
		}
	};

kimsoft.util.common = {
		// 팝업(no scroll)
		popsn : function(url, trgt, w, h) {
			var windowLeft = (screen.width-w)/2;
			var windowTop = (screen.height-h)/2;
		    var p = window.open(url,trgt,'width='+w+',height='+h+',scrollbars=no,resizable=no,copyhistory=no,toolbar=no,status=no,top=' + windowTop + ',left=' + windowLeft + '');
		    p.focus();
		    return p;
		},
		//팝업(scroll)
		popsy : function(url, trgt, w, h) { 
			var windowLeft = (screen.width-w)/2;
			var windowTop = (screen.height-h)/2;
		    var p = window.open(url,trgt,'width='+w+',height='+h+',scrollbars=yes,resizable=no,copyhistory=no,toolbar=no,status=no,top=' + windowTop + ',left=' + windowLeft + ''); 
		    p.focus();
		    return p;
		},
		// 쿠키 생성
		setCookie : function(cName, cValue, cDay){
			var expire = new Date();
			expire.setDate(expire.getDate() + cDay);
			cookies = cName + '=' + escape(cValue) + ';path=/';
			if (typeof cDay != 'undefined') {
				cookies += ';expires=' + expire.toGMTString() + ';';
			}
			document.cookie = cookies;
		},
		// 쿠키 가져오기
		getCookie : function(cName) {
			cName = cName + '=';
			var cookieData = document.cookie;
			var start = cookieData.indexOf(cName);
			var cValue = '';
			if(start != -1){
				start += cName.length;
				var end = cookieData.indexOf(';', start);
				if(end == -1) {
					end = cookieData.length;
				}
				cValue = cookieData.substring(start, end);
			}
			return unescape(cValue);
		},
		FIXME : function() {
			alert("서비스 준비중입니다.");
		},
		NA : function() {
			alert("서비스 준비중입니다.");
		},
		NO_AUTH : function() {
			alert("권한이 없습니다.");
		},
		//새로고침
		refreshForm : function() {
			document.location.href = document.location.href.replace(/#$/, '');
		},
		deepCopy : function(data) {
			return JSON.parse(JSON.stringify(data));
		},
		showData : function(data) {
			return alert(JSON.stringify(data));
		}
	};

kimsoft.util.date = {
		dayOfWeek1 : {
					Mon: "월",
					Tue: "화",
					Wed: "수",
					Thu: "목",
					Fri: "금",
					Sat: "토",
					Sun: "일",
					0: "일요일",
					1: "월요일",
					2: "화요일",
					3: "수요일",
					4: "목요일",
					5: "금요일",
					6: "토요일"
		},
		calcAge : function(date1, date2) {
			var year1 = kimsoft.util.number.toInt(date1.substring(0, 4), 0);
			var year2 = kimsoft.util.number.toInt(date2.substring(0, 4), 0);
			if (year1 == 0 || year2 == 0) {
				return -10;
			}
			var age = year2 - year1;
			if (date1.substring(4, 8) > date2.substring(4, 8)) {
				--age;
			}
			return age;
		},
		date2dayOfWeek : function(date) {
			return this.dayOfWeek1[date.getDay()];
		}
	};

kimsoft.util.editor = {
		editors : [],
		initEditor : function(id){
			nhn.husky.EZCreator.createInIFrame({
				oAppRef: this.editors,
				elPlaceHolder: id,
				sSkinURI: "/SE2/SmartEditor2Skin4ak.html",	
				htParams : {
					bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
					bUseVerticalResizer : true,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
					bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
					//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
					fOnBeforeUnload : function(){
						//alert("완료!");
					}
				}, //boolean
				fOnAppLoad : function(){
					//예제 코드
					//oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
				},
				fCreator: "createSEditor2"
			});
		},
		updateEditor : function() {
			for(var i=0; i<this.editors.length; ++i) {
				this.editors[i].exec("UPDATE_CONTENTS_FIELD", []);	// 에디터의 내용이 textarea에 적용됩니다.
			}
		},
		isBlank4se : function(val) {
			if (val == "" || val == "<p>&nbsp;</p>") {
				return true;
			} else {
				return false;
			}
		}
	};

kimsoft.util.file = {
		getFileName : function(path) {
			if (path.lastIndexOf("\\") >= 0) {
				return path.substring(path.lastIndexOf("\\") + 1);
			} else if (path.lastIndexOf("/") >= 0) {
				return path.substring(path.lastIndexOf("/") + 1);
			} else {
				return path;
			}
		},
		getFileExt : function(path) {
			if (path.lastIndexOf(".") >= 0) {
				return path.substring(path.lastIndexOf(".") + 1);
			} else {
				return "";
			}
		}
	};

kimsoft.util.form = {
		//라디오버튼 값 구하기
		getRadioValue : function(obj) {
			if (obj.length) {
				for (var i=0; i<obj.length; ++i) {
					if (obj[i].checked) {
						return obj[i].value;
					}
				}
			} else {
				if (obj.checked) {
					return obj.value;
				}
			}
			return "";
		},
		// 라디오버튼 초기화하기
		clearRadioValue : function(obj) {
			for (var i=0; i<obj.length; ++i) {
				obj[i].checked = false;;
			}
		},
		// input 배열 합치기
		joinInputArr : function(obj, seperator) {
			var tmpObj = [];
			for (var i=0; i<obj.length; ++i) {
				var el = $(obj[i]);
				if (el.prop("tagName").toLowerCase() == "input") {
					tmpObj[i] = $(obj[i]).val();
				} else if (el.prop("tagName").toLowerCase() == "select") {
					tmpObj[i] = $(":selected", el).val();
				}
			}
			return tmpObj.join(seperator);
		},
		//checkbox 배열 합치기
		joinCheckBoxArr : function(obj, seperator) {
			if (obj) {
				if (obj.length) {
					var tmpObj = [];
					for (var i=0; i<obj.length; ++i) {
						if (obj[i].checked) {
							tmpObj[tmpObj.length] = obj[i].value;
						}
					}
					return tmpObj.join(seperator);
				} else {
					if (obj.checked) {
						return obj.value;
					} else {
						return "";
					}
				}
			} else {
				return "";
			}
		},
		setSelectionRange : function(obj, start, end) {
			if (obj.setSelectionRange) {
				obj.setSelectionRange(start, end);
			} else if (obj.createTextRange) {
				var range = obj.createTextRange();
				range.collapse(true);
				range.moveStart("character", start);
				range.moveEnd("character", end);
				range.select();

//				obj.blur();
			}
		},
		defaultSuccessHandler : function(data){
			try {
				var result = $.parseJSON(data);
				if (result.message && result.message != "") {
					alert(result.message);
				}
				if (result.callback && result.callback != "") {
					window[result.callback](result.data);
				}
				if (result.redirectUrl && result.redirectUrl != "") {
					document.location.href = result.redirectUrl;
				}
				return true;
			} catch(e) {
				return false;
			} finally {
			}
		},
		defaultErrorHandler : function(data){
			try {
				alert("에러가 발생하였습니다.");
			} finally {
			}
		},
		submitPost : function(formId, isUpload) {
			var form = $("#" + formId);
			if (isUpload == true) {
				form.attr("encoding", "multipart/form-data");
			} else if (isUpload == false){
				form.attr("encoding", "");
			}

			form.ajaxSubmit({
				type: 'post',
				debug: true,
				async: false,
				success: kimsoft.util.form.defaultSuccessHandler,
				error: kimsoft.util.form.defaultErrorHandler
			});
		},
		sendPost : function(url, param, cbSuccess, cbError) {
			if (!cbSuccess) { cbSuccess = kimsoft.util.form.defaultSuccessHandler; }
			if (!cbError) { cbError = kimsoft.util.form.defaultErrorHandler; }
			$.ajax({
				type: "post",
				url: url,
				data: param,
				async: false,
				success: cbSuccess,
				error: cbError
			});
		},
		setSubmitFunc : function(el, func) {
			el.keydown(function(e) {
				if (e.keyCode == 13) {
					e.preventDefault();
					$(this).blur();
					func();
				}
			});
		},
		setDefaultString : function(el, str) {
			el.focusin(function(e) {
				if ($(this).val() == str) {
					$(this).val("");
				}
			});
			el.focusout(function(e) {
				if ($(this).val() == "") {
					$(this).val(str);
				}
			});

			el.each(function() {
				if ($(this).val() == "") {
					$(this).val(str);
				}
			});
		},
		copyForm : function(srcForm, targetForm) {
			$("#" + srcForm + " input[type=hidden]").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					$("#" + targetForm + " input[name=" + name + "]").val($("#" + srcForm + " input[name=" + name + "]").val());
				}
			});
			$("#" + srcForm + " input[type=text]").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					$("#" + targetForm + " input[name=" + name + "]").val($("#" + srcForm + " input[name=" + name + "]").val());
				}
			});
			$("#" + srcForm + " textarea").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					$("#" + targetForm + " input[name=" + name + "]").val($("#" + srcForm + " textarea[name=" + name + "]").val());
				}
			});
			$("#" + srcForm + " select").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					$("#" + targetForm + " input[name=" + name + "]").val($("#" + srcForm + " select[name=" + name + "]").val());
				}
			});
			$("#" + srcForm + " input[type=radio]").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					$("#" + targetForm + " input[name=" + name + "]").val($("#" + srcForm + " input[name=" + name + "]:checked").val());
				}
			});
		},
		object2form : function(obj, formId, include, exclude) {
			var includes = "," + (include ? include : "") + ",";
			var excludes = "," + (exclude ? exclude : "") + ",";
			function checkInclude(name) {
				if (excludes.indexOf("," + name + ",") >= 0) {
					return false;
				}
				if (includes == ",,") {
					return true;
				}
				if (includes.indexOf("," + name + ",") >= 0) {
					return true;
				}
				return false;
			}

			$("#" + formId + " input[type=hidden]").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					if (checkInclude(name)) {
						$(this).val(obj[name]);
					}
				}
			});
			$("#" + formId + " input[type=text]").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					if (checkInclude(name)) {
						$(this).val(obj[name]);
					}
				}
			});
			$("#" + formId + " input[type=checkbox]").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					if (checkInclude(name)) {
						if (obj[name] == $(this).val()) {
							$(this).attr("checked", true);
						} else {
							$(this).attr("checked", false);
						}
					}
				}
			});
			$("#" + formId + " textarea").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					if (checkInclude(name)) {
						$(this).val(obj[name]);
					}
				}
			});
			$("#" + formId + " select").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					if (checkInclude(name)) {
						$(this).val(obj[name]);
					}
				}
			});
			$("#" + formId + " input[type=radio]").each(function() {
				var name = $(this).attr("name");
				if (!!name && name.substring(0, 4) != "tmp_") {
					if (checkInclude(name)) {
						if (obj[name] == $(this).val()) {
							$(this).attr("checked", true);
						} else {
							$(this).attr("checked", false);
						}
					}
				}
			});
		},
		form2object : function(formId, obj) {
			if (!obj) {
				obj = {};
			}
			$.each($("#" + formId).serializeArray(), function(idx, arr) {
				obj[arr.name] = arr.value;
			});
			return obj;
		},
		form2objectList : function(formId) {
			var list = [];
			var obj = null;
			$.each($("#" + formId).serializeArray(), function(idx, arr) {
				if (obj == null) {
					obj = {};
				}
				if (obj[arr.name] != undefined) {
					list[list.length] = obj;
					obj = {};
				}
				obj[arr.name] = arr.value;
			});
			if (obj != null) {
				list[list.length] = obj;
			}
			return list;
		},
		inputs2object : function(id, obj) {
			if (!obj) {
				obj = {};
			}
			$.each($("#" + id + " input").serializeArray(), function(idx, arr) {
				obj[arr.name] = arr.value;
			});
			$.each($("#" + id + " select").serializeArray(), function(idx, arr) {
				obj[arr.name] = arr.value;
			});
			return obj;
		},
		autoInputData : function() {
			var index = 0;
			$("input").each(function(){
				if ($(this).attr("type") != "hidden" && $(this).attr("type") != "radio" && $(this).attr("type") != "checkbox") {
					++index;
					$(this).val($(this).val() + index);
				}
			});
		}
	};

kimsoft.util.number = {
		toInt : function(n, d) {
			var v = parseInt(n.replace(/,/g, ""), 10);
			if (isNaN(v) && !isNaN(d)) {
				return d;
			} else {
				return v;
			}
		},
		toDouble : function(n, d) {
			var v = parseFloat(n.replace(/,/g, ""), 10);
			if (isNaN(v) && !isNaN(d)) {
				return d;
			} else {
				return v;
			}
		},
		roundPrecision : function(v, p) {
			var po = Math.pow(10, p);
			return Math.round(v * po) / po;
		}
	};

kimsoft.util.string = {
		getByteLength : function(input) {
			var byteLength = 0;
			for (var inx = 0; inx < input.value.length; inx++) {
				var oneChar = escape(input.value.charAt(inx));
				if ( oneChar.length == 1 ) {
					byteLength ++;
				} else if (oneChar.indexOf("%u") != -1) {
					byteLength += 2;
				} else if (oneChar.indexOf("%") != -1) {
					byteLength += oneChar.length/3;
				}
			}
			return byteLength;
		},
		cutString : function(input, length, postfix) {
			var byteLength = 0;
			var currLength = 0;
			var result = "";
			for (var inx = 0; inx < input.length; inx++) {
				var oneChar = escape(input.charAt(inx));
				if ( oneChar.length == 1 ) {
					currLength = 1;
				} else if (oneChar.indexOf("%u") != -1) {
					currLength = 2;
				} else if (oneChar.indexOf("%") != -1) {
					currLength = oneChar.length/3;
				} else {
					continue;
				}
				if (byteLength + currLength + postfix.length > length) {
					return result + postfix;
				}
				byteLength += currLength;
				result += input.charAt(inx);
			}
			return input;
		},
		setComma : function(n) {
			n += '';
			var x = n.split('.');
			var x1 = x[0].replace(/,/g, '');
			var x2 = x.length > 1 ? '.' + x[1] : '';
			x1 = x1.replace(/^(0+)(\d+)/, '$2');
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
			    x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		},
		str2datepicker : function(d) {
			try {
				if (d.length < 8) {
					return "";
				} else {
					return d.substr(0, 4) + "." + d.substr(4, 2) + "." + d.substr(6, 2);
				}
			} catch(err) {
				return "";
			}
		},
		defaultString : function(s) {
			if (s) {
				return s;
			} else {
				return "";
			}
		},
		fill0 : function(v, n) {
			var tmp = "00000000000000000000" + v;
			return tmp.substr(tmp.length - n);
		},
		date2str : function(d) {
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var date = d.getDate();
			return year + "" + fill0("" + month, 2) + fill0("" + date, 2);
		},
		trim : function(v) {
			return v.replace(/^\s+|\s+$/g,"");
		},
		ltrim : function(v) {
			return v.replace(/^\s+/,"");
		},
		rtrim : function(v) {
			return v.replace(/\s+$/,"");
		},
		getCharFromEvent : function(e) {
			var c;
			if (e.charCode == undefined) {
				c = String.fromCharCode(e.which);
			} else {
				c = String.fromCharCode(e.charCode);
			}
			return c;
		}
	};

kimsoft.commonLocalStorage = {
		setLocalData: function (key, val) {
			if(!window.localStorage) {
				setCookie(key, val, 30);
			} else {
				window.localStorage[key] = val;
			}
		},
		removeLocalData: function (key) {
			if(!window.localStorage) {
				setCookie(key, "", 0);
			} else {
				window.localStorage.removeItem(key);
			}
		},
		getLocalData: function (key) {
			var data;
			if(!window.localStorage) {
				data = getCookie(key);
			} else {
				data = window.localStorage[key];
			}
			if (!data) {
				data = "";
			}
			return data;
		}
	};
