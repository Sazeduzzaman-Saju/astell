(function($){

	$.fn.alphanumeric = function(p) { 

		p = $.extend({
			ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.-_ ",
			nchars: "",
			allow: "",
			nodup: "",
			allowNegative: false
		  }, p);	

		if (p.allowNegative) {
			p.allow += "-";
		}

		$(this).css('ime-mode', 'disabled');

		return this.each
			(
				function() 
				{

					if (p.nocaps) p.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
					if (p.allcaps) p.nchars += "abcdefghijklmnopqrstuvwxyz";
					
					s = p.allow.split('');
					for (var i=0;i<s.length;i++) if (p.ichars.indexOf(s[i]) != -1) s[i] = "\\" + s[i];
					p.allow = s.join('|');
					
					var reg = new RegExp(p.allow,'gi');
					var ch = p.ichars + p.nchars;
					ch = ch.replace(reg,'');
					var nodup = p.nodup;
					var allowNegative = p.allowNegative;

					$(this).keypress
						(
							function (e)
								{
									var k;
									if (!e.charCode) k = String.fromCharCode(e.which);
										else k = String.fromCharCode(e.charCode);
										
									if (ch.indexOf(k) != -1) e.preventDefault();
									if (e.ctrlKey&&k=='v') e.preventDefault();
									if (nodup.indexOf(k) != -1 && $(this).val().indexOf(k) != -1) e.preventDefault();
									if (allowNegative) {
										if (k=='-' && $(this).val() != "") {
											e.preventDefault();
										}
									}
								}
								
						);
						
					$(this).bind('contextmenu',function () {return false;});
									
				}
			);

	};

	$.fn.numeric = function(p) {
	
		var az = "abcdefghijklmnopqrstuvwxyz";
		az += az.toUpperCase();

		p = $.extend({
			nchars: az
		  }, p);	
		  	
		return this.each (function()
			{
				$(this).css('ime-mode', 'disabled');
				$(this).alphanumeric(p);
			}
		);
			
	};
	
	$.fn.alpha = function(p) {

		var nm = "1234567890";

		p = $.extend({
			nchars: nm
		  }, p);	

		return this.each (function()
			{
				$(this).css('ime-mode', 'disabled');
				$(this).alphanumeric(p);
			}
		);
			
	};	

	$.fn.excSpecChar = function(p) { 

		p = $.extend({
			ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.-_ ",
			nchars: "",
			allow: "",
			nodup: "",
			allowNegative: false
		  }, p);	

		if (p.allowNegative) {
			p.allow += "-";
		}

		return this.each
			(
				function() 
				{

					if (p.nocaps) p.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
					if (p.allcaps) p.nchars += "abcdefghijklmnopqrstuvwxyz";
					
					s = p.allow.split('');
					for (var i=0;i<s.length;i++) if (p.ichars.indexOf(s[i]) != -1) s[i] = "\\" + s[i];
					p.allow = s.join('|');
					
					var reg = new RegExp(p.allow,'gi');
					var ch = p.ichars + p.nchars;
					ch = ch.replace(reg,'');
					var nodup = p.nodup;
					var allowNegative = p.allowNegative;

					$(this).keypress
						(
							function (e)
								{
									var k;
									if (!e.charCode) k = String.fromCharCode(e.which);
										else k = String.fromCharCode(e.charCode);
										
									if (ch.indexOf(k) != -1) e.preventDefault();
									if (e.ctrlKey&&k=='v') e.preventDefault();
									if (nodup.indexOf(k) != -1 && $(this).val().indexOf(k) != -1) e.preventDefault();
									if (allowNegative) {
										if (k=='-' && $(this).val() != "") {
											e.preventDefault();
										}
									}
								}
								
						);
						
					$(this).bind('contextmenu',function () {return false;});
									
				}
			);

	};
	
	$.fn.allAlpha = function(p) {

		var nm = "1234567890";

		p = $.extend({
			nchars: nm
		  }, p);	

		return this.each (function()
			{
				$(this).excSpecChar(p);
			}
		);
			
	};	

})(jQuery);
