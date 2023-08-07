$(function(){
    const mediaObj = {
    	mediaMode : "",
        windowWidth : $( window ).width() ,
        productSwipers : null,
        thumbSwipers : null,
        mediaq : function () {
            //media queries
        	this.windowWidth = $( window ).width();
            if (window.matchMedia("(max-width: 1366px)").matches == false) {
                //PC
                if ($("header .gnb").length > 0) {
                    mediaObj.gnbPc();
                }
                if ($("header .menu").length > 0) {
                    mediaObj.menuPc();
                }
                if ($(".scroll-y").length > 0) {
                    mediaObj.scrollbarY();
                }
                if ($('.sub .bnr').length > 0) {
                    mediaObj.productListOver();
                }
            } else if (window.matchMedia("(max-width: 1023px)").matches) {
                if ($("header .menu").length > 0) {
                    mediaObj.menuMo();
                }
                //태블릿 가로 세로
            }else{
                mediaObj.menuMo();
                //모바일

            }
        },
        //.quick .btn-star
        quickBtn:function (){
            $('.quick .btn-star').off().click(function () {
                let quickWidth = $('.side-group .quick .inner .txt').width();
                $(this).fadeOut(300);
                $('.side-group .quick .inner').css('width', quickWidth + 79);
            });
            $('.quick .btn-close').off().click(function () {
                $('.quick .inner').css('width','52px')
                $('.quick .btn-star').fadeIn(300);
            });
        },
        //.more .btn-more
        moreBtn:function (){
            $('.side-group .more .btn-more').off().click(function () {
                if($(this).hasClass('on')) {
                    $(this).removeClass('on');
                    $('.more .inner').stop().fadeOut(200);
                } else{
                    $(this).addClass('on');
                    $('.more .inner').stop().fadeIn(200);
                }
            });
        },
        //scrollTop
        scrollTop:function() {
            if ($("footer").length > 0) {
                if ($(window).scrollTop() + $(window).height() > $('footer').offset().top + 300) {
                    $('.side-group').addClass('end');
                } else {
                    $('.side-group').removeClass('end');
                }
            }
            $('.btn-top').off().click(function () {
                $('html, body').animate({scrollTop: 0}, 400);
                return false;
            });
        },
        scrollAni : function () {
            let secLength = ($(".scrollAni").length);
            let secNum = [];
            let windowH = $(window).height();
            let scrollT = $(window).scrollTop();
            let windowDV = $(window).height() / 4;
            if ($(".scrollAniTop").length > 0) {
                $(".scrollAniTop").addClass('view');
            }
            for(var i = 0; i < secLength; i++) {
                let tempSec = $(".scrollAni.n" + (i+2));
                if (tempSec.length > 0 ) {
                    secNum[i] = (tempSec.offset().top) - windowH + windowDV;
                }
                if(scrollT > secNum[i]) {
                    tempSec.addClass('view');
                }else{
                    tempSec.removeClass('view');
                }
            }

        },
        //커스텀 스크롤
        scrollbarY:function() {
            $(".scroll-y").mCustomScrollbar({
                setTop: 0,
                theme:"dark",
                axis:"y",
                mouseWheelPixels : 50,
                mouseWheel:{
                    preventDefault: true,
                },
                scrollInertia:500,
                alwaysShowScrollbar:1,
            });
        },
        //header > color(메인일때 dark)
        headerColor : function (){
            let scrollT = $(window).scrollTop();
            let contentH = $('.key-visual').height() / 3;
            if($(".key-visual").length > 0 && $("header .btn-srch.on").length < 1 && scrollT < contentH ) {
                $('header').addClass('dark');
                $('.gnb .depth1').off().hover(function () {
                    $('header').removeClass('dark');
                }, function () {
                    $('header').addClass('dark');
                });
            }else{
                $('header').removeClass('dark');
                $('.gnb .depth1').off().hover(function () {
                    $('header').removeClass('dark');
                }, function () {
                    $('header').removeClass('dark');
                });
            }
        },
        btnAni : function (){
            $('.btn-line-ty1').off().hover(function () {
                $(this).addClass('ani');
            }, function () {
                $(this).removeClass('ani');
            });
        },
        //header > gnb(반응형: pc)
        gnbPc : function () {
            $('header .gnb .depth1>li').off().hover(function () {
                $('header .gnb .depth2').stop().slideUp(200);
                $('header .gnb .depth2').css('border-left','1px solid rgba(0,0,0,0.1)');
                $('header .gnb .depth2').css('border-right','1px solid rgba(0,0,0,0.1)');
                $('header .gnb .depth2').css('border-bottom','1px solid rgba(0,0,0,0.1)');
                $(this).find('.depth2').stop().slideDown(200);
            }, function () {
                $('header .gnb .depth2').stop().slideUp(200);
                $('header .gnb .depth2').css('border','0');
            });
        },
        backupMenuHref() {
            $('header .menu .depth1 ul').prev('a').each(function() {
            	const orgHref = $(this).attr("org-href");
            	if (!orgHref) {
                	$(this).attr("org-href", $(this).attr("href"));
            	}
            });
        },
        initMenu() {
        	$('header .btn-menu').off();
            $('header .menu .overlay').off();
            $('header .menu .depth1>li>a.mark').off();
            $('header .menu .depth2>li>a.mark').off();
            $('header .btn-menu-back').off()
            $('header .menu .depth3>li>a.mark').off();
        	$('header .menu .depth3>li').off();

        	this.backupMenuHref();

            if (this.menuMoTimeout && this.menuMoTimeout > 0) {
            	clearTimeout(this.menuMoTimeout);
            	this.menuMoTimeout = -1;
            }
        },
        hideMenuPc: function(timeout) {
        	if($('header .btn-menu').hasClass('on') == false) {
        		return;
        	}
            $('header .btn-menu').removeClass('on');
            if (timeout > 0) {
                $('header .menu-box').stop().slideUp(timeout);
            } else {
                $('header .menu-box').stop().hide();
            }
            $('header h1').css('z-index', '5000');
        },
        hideMenuMo: function(timeout) {
        	if($('header .btn-menu').hasClass('on') == false) {
        		return;
        	}
        	$('header .btn-menu').removeClass('on');
        	if (timeout > 0) {
                $('header .menu .overlay').stop().fadeOut(timeout);
        	} else {
                $('header .menu .overlay').stop().hide();
        	}
            $('header .menu').stop().removeClass('on');
            $('header .menu-box').stop().removeClass('on');
            $('header h1').css('z-index', '5000');
        },
        //header > menu(반응형: pc)
        menuPc : function () {
            var self = this;
        	if (this.mediaMode == "pc") {
        		return;
        	}
        	this.mediaMode = "pc";

        	self.hideMenuMo(0);
        	this.initMenu();
            $('header .menu-box').stop().hide();
        	$('header .menu .depth1 ul').prev('a').removeClass('mark');

        	//Product 1depth LINE 삭제
        	$('.productDepth1Line').remove();
            $('header .menu .depth1 ul').prev('a').each(function() {
              	$(this).attr("href", $(this).attr("org-href"));
            });
            $('header .btn-menu').off().click(function () {
                if($(this).hasClass('on')) {
                	self.hideMenuPc(200);
                } else{
                    $(this).addClass('on');
                    $('header .menu-box').stop().slideDown(200);
                    $('header h1').css('z-index', '4999');
                }
            });
            $('header .menu .depth3>li').off().hover(function () {
                $('header .menu .depth4').stop().fadeOut(100);
                $(this).find('.depth4').stop().fadeIn(100);
            }, function () {
                $('header .menu .depth4').stop().fadeOut(100);
            });
        },
        //header > menu(반응형:tablet, mobile)
        menuMo : function () {
            var self = this;
        	if (this.mediaMode == "mobile") {
        		return;
        	}
        	this.mediaMode = "mobile";

        	self.hideMenuPc(0);
        	this.initMenu();
            $('header .menu-box').stop().hide();
            this.menuMoTimeout = setTimeout(function() {
                $('header .menu-box').show();
            	self.menuMoTimeout = -1;
            }, 200);

        	//Product 1depth LINE 추가
        	$('.productDepth1Line').show();
            //하위메뉴가 있는경우 왼쪽 마크 추가
            $('header .menu .depth1 ul').prev('a').addClass('mark');
            //하위메뉴가 있는경우 링크 삭제
            $('header .menu .depth1 ul').prev('a').attr("href", "javascript:void(4)");
            //메뉴on, off
            $('header .btn-menu').off().click(function () {
                if($(this).hasClass('on')) {
                	self.hideMenuMo(200);
                } else{
                    $(this).addClass('on');
                    $('header .menu .overlay').stop().fadeIn(200);
                    $('header .menu').stop().addClass('on');
                    $('header .menu-box').stop().addClass('on');
                    $('header h1').css('z-index', '4999');
                }
            });
            $('header .menu .overlay').off().click(function () {
                if($('header .btn-menu').hasClass('on')) {
                    $('header .menu').stop().removeClass('move');
                    $('header .menu .depth3').removeClass('on');
                    $('header .btn-menu').removeClass('on');
                    $('header .menu .overlay').stop().fadeOut(200);
                    $('header .menu').stop().removeClass('on');
                    $('header .menu-box').stop().removeClass('on');

                } else{
                    $('header .menu').stop().removeClass('move');
                    $('header .menu .depth3').removeClass('on');
                    $('header .btn-menu').addClass('on');
                    $('header .menu .overlay').stop().fadeIn(200);
                    $('header .menu').stop().addClass('on');
                    $('header .menu-box').stop().addClass('on');
                }
            });
            //메뉴 1뎁스
            $('header .menu .depth1>li>a.mark').off().click(function () {
                if($(this).hasClass('on')) {
                    $('header .menu .depth1>li>a.mark').removeClass('on');
                    $('header .menu .depth1>li>.depth2').slideUp(200);
                } else{
                    $('header .menu .depth1>li>a.mark').removeClass('on');
                    $('header .menu .depth1>li>.depth2').slideUp(200);
                    $(this).addClass('on');
                    $(this).next('.depth2').slideDown(200);
                }
            });
            //메뉴 2뎁스에서 3뎁스로 이동
            $('header .menu .depth2>li>a.mark').off().click(function () {
                let title2d = $(this).text();
                $('header .menu').stop().addClass('move');
                $(this).next('.depth3').addClass('on');
                $('.menu .mo-title h2').text(title2d);
                setTimeout(function() {
                    $('header .menu-box').scrollTop(0);
                }, 200);

            });
            //메뉴 3뎁스 에서 2뎁스로 이동
            $('header .btn-menu-back').off().click(function () {
                $('header .menu').stop().removeClass('move');
                $('header .menu .depth3').removeClass('on');
            });
            //메뉴 3뎁스
            $('header .menu .depth3>li>a.mark').off().click(function () {
                if($(this).hasClass('on')) {
                    $('header .menu .depth3>li>a.mark').removeClass('on');
                    $('header .menu .depth3>li>.depth4').slideUp(200);
                } else{
                    $('header .menu .depth3>li>a.mark').removeClass('on');
                    $('header .menu .depth3>li>.depth4').slideUp(200);
                    $(this).addClass('on');
                    $(this).next('.depth4').slideDown(200);
                }
            });
        },
        //header > search
        btnSearch : function (){
            let scrollT = 0;
            let contentH = 0;
            $('header .btn-srch').off().click(function () {
                scrollT = $(window).scrollTop();
                contentH = $('.key-visual').height() / 3;
                if($(this).hasClass('on')) {
                    $('.srch-box .overlay').stop().fadeOut(200);
                    $(this).removeClass('on');
                    $('header .srch-box .inner').stop().slideUp(200);
                    //메인 키비쥬얼영역이 있을경우 : 검색 닫을때 헤더 색상변경
                    if($(".key-visual").length > 0  && scrollT < contentH ){
                        $('header').addClass('dark');
                    }else {
                        $('header').removeClass('dark');
                    }
                } else{
                    $('.srch-box .overlay').stop().fadeIn(200);
                    $(this).addClass('on');
                    $('header .srch-box .inner').stop().slideDown(200);
                    $('header').removeClass('dark');
                    //메인 키비쥬얼영역이 있을경우 : 검색 켜져있을때 헤더 색상변경 해제
                    $('.gnb .depth1').off().hover(function () {
                        $('header').removeClass('dark');
                    }, function () {
                        $('header').removeClass('dark');
                    });
                }
            });
            $('header .srch-box .overlay').off().click(function () {
                scrollT = $(window).scrollTop();
                contentH = $('.key-visual').height() / 3;
                $('.srch-box .overlay').stop().fadeOut(200);
                $('header .btn-srch').removeClass('on');
                $('header .srch-box .inner').stop().slideUp(200);
                //메인 키비쥬얼영역이 있을경우 : 검색 닫을때 헤더 색상변경
                if($(".key-visual").length > 0  && scrollT < contentH ){
                    $('header').addClass('dark');
                }else {
                    $('header').removeClass('dark');
                }
            });
        },
        //main > key-visual > Swiper
        swiperKeyVisual : function () {
            let timeout = null;
            let waiting = 5000;
            let firstType = $('.key-visual .swiper-wrapper .swiper-slide').eq(0).data().slideType;
            let players = [];
            let options = {};
            let progress = $('.key-visual .swiper-progress-bar .progress');

            let swiperKeyVisual = new Swiper('.key-visual .swiper-container', {
                loop:true,
                pagination: {
                    el: '.key-visual .swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
            });
            let firstVdo = $('.key-visual .swiper-container .swiper-slide[data-swiper-slide-index = 0]:first video').get(0);

            //swiper 생성 후 li앞위로 2개 늘어남
            let videos = $('.key-visual .swiper-slide video');
            $.each(videos, function (key, row){
                let player = videojs(row, options);
                player.on('ended', function() {
                    next();
                })
                players[key] = player;
            })

            swiperKeyVisual.on('slideChangeTransitionEnd', function () {
                let index = swiperKeyVisual.activeIndex;
                let currentSlide = $(swiperKeyVisual.slides[index]);
                let currentSlideType = currentSlide.data('slide-type');

                $.each(players, function (key, row){
                    players[key].pause();
                });

                clearTimeout(timeout);
                progress.stop();
                progress.css('width', '0');

                switch (currentSlideType) {
                    case 'img':
                        progress.animate({'width': '100%'}, waiting, 'linear');
                        runNext();
                        break;
                    case 'vdo':
                        let currentVideo = currentSlide.find('video').get(0);
                        currentVideo.currentTime = 0;
                        currentVideo.play();
                        break;
                    default:
                        throw new Error('invalid slide type');
                }
            })

            function prev() {
                swiperKeyVisual.slidePrev();
            }

            function next() {
                swiperKeyVisual.slideNext();
            }

            function runNext() {
                timeout = setTimeout(function () {
                    next();
                }, waiting);
            }

            if(firstType == 'img') {
                runNext();
            }
            else{
                setTimeout( function() {
                    firstVdo.play();
                }, 1);
            }
        },
        //main > product-banner > Swiper
        swiperProductBanner : function () {
            let waiting = 5000;
            let progress = $('.product-banner .swiper-progress-bar .progress');
            let swiperProduct = new Swiper('.main .product-banner .swiper-container', {
                effect:'fade',
                speed: 600,
                parallax: true,
                loop:{
                    loop: true,
                },
                navigation: {
                    nextEl: '.main .product-banner .swiper-button-next',
                    prevEl: '.main .product-banner .swiper-button-prev',
                },
                autoplay: {
                    delay: 5000,
                },
                breakpoints : {
                    768 : {

                    },
                }
            });

// added by kimsoft
            $('.main .product-banner .prev-info').html($('.main .product-banner .swiper-slide:eq(0) .txt2').text());
            $('.main .product-banner .next-info').html($('.main .product-banner .swiper-slide:eq(2) .txt2').text());
// END : added by kimsoft

            swiperProduct.on('slideChangeTransitionEnd', function () {
// added by kimsoft
            	var prevIdx = this.realIndex;
            	var prevBannerName = $('.main .product-banner .swiper-slide:eq(' + prevIdx + ') .txt2').text();
            	$('.main .product-banner .prev-info').html(prevBannerName);
            	var nextIdx = this.realIndex + 2;
            	var nextBannerName = $('.main .product-banner .swiper-slide:eq(' + nextIdx + ') .txt2').text();
            	$('.main .product-banner .next-info').html(nextBannerName);
// END : added by kimsoft

                progress.stop();
                progress.css('width', '0');
                progress.animate({'width': '100%'}, waiting, 'linear');
            });
            progress.animate({'width': '100%'}, waiting, 'linear');
        },
        //main > product > tab-ty
        productTab : function () {
            $('.product .tab-ty a').off().click(function () {
                if($(this).hasClass('on')) {
                }else {
                    $('.product .tab-ty a').removeClass('on');
                    $(this).addClass('on');
                    if($(this).hasClass('n1')) {
                        $('.product .tab-cont').removeClass('on');
                        $('.product .tab-cont.n1').addClass('on');
                    }else if($(this).hasClass('n2')){
                        $('.product .tab-cont').removeClass('on');
                        $('.product .tab-cont.n2').addClass('on');

                    }else if($(this).hasClass('n3')){
                        $('.product .tab-cont').removeClass('on');
                        $('.product .tab-cont.n3').addClass('on');
                    }else {
                        $('.product .tab-cont').removeClass('on');
                        $('.product .tab-cont.n4').addClass('on');
                    }
                }
            });
        },
        //main > product > wl > Swiper
        swiperProductList : function () {
            //제품 탭 배열
            this.productSwipers = [];
            for(let i = 0; i < 4; i++) {
                let productSwiper = new Swiper('.main .product .n'+(i+1)+' .wl .swiper-container', {
                    slidesPerView: 1,
                    loop: {
                        loop: true,
                    },
                    navigation: {
                        nextEl: '.main .product .n'+(i+1)+' .wl .swiper-button-next',
                        prevEl: '.main .product .n'+(i+1)+' .wl .swiper-button-prev',
                    },
                });

                //제품 애니메이션 종료 리스너
                productSwiper.on('transitionEnd', function () {
                    //현재 선택된 탭
                    let tabSeq = mediaObj.productSwipers.indexOf(this);
                    let tempThumbSwiper = mediaObj.thumbSwipers[tabSeq];
                    //섬네일 active
                    $.each(tempThumbSwiper.slides, function (key, row) {
                        tempThumbSwiper.slides[key].firstElementChild.classList.remove('active');
                    })
                    tempThumbSwiper.slides[productSwiper.realIndex].firstElementChild.classList.add('active');

// added by kimsoft
                    tempThumbSwiper.slideTo(productSwiper.realIndex);

                	$('.main .product .tmpProductInfo').hide();
                	$('.main .product .tmpProductInfo_' + productSwiper.realIndex).show();
// END : added by kimsoft
                });

                this.productSwipers[i] = productSwiper;
            }
        },
        //main > product > wr > Swiper
        swiperProductThumb : function () {
            //제품섬네일 탭 배열
            this.thumbSwipers = [];
            for(let i = 0; i < 4; i++) {
                //슬라이드로 움직이면, swiper 리스너 1회무시하기위해 무빙flag
                let sliderMoving = false;
                let thumbSwiper = new Swiper('.main .product .n'+(i+1)+' .wr .swiper-container', {
                    init: true,
                    loop: false,
                    slidesPerView: 'auto',
                    breakpoints : {
                        768 : {

                        },
                    }
                });
                //리스트 전체갯수
                let progress = $('.main .product .n'+(i+1)+' .wr .swiper-progress-bar .progress');
                let swiperLength = thumbSwiper.slides.length;
                //스와이퍼 가로전체길이
                let swiperWidth = thumbSwiper.width;
                //스와이퍼 각 객체 가로길이
                let swiperEachWidth = thumbSwiper.slides[0].offsetWidth;
                //스와이퍼 이동 가능한 총 개수
                let slidersCount = swiperLength - Math.round(swiperWidth / (swiperEachWidth)) + 1;
                //슬라이더 2~스와이프 가능한 총 갯수만큼 지정
                let slider = $(".main .product .n"+(i+1)+" .wr .swiper-slider" ).slider({
                    min: 1,
                    max: slidersCount+1,
                    range: "min",
                    value: 2,
                    slide: function( event, ui ) {
                        //슬라이더를 2부터 시작했으니 1이면 다시 2로 해야되는데 동작안함
                        if(ui.value == 1){
                            slider.slider( "value", 2 );
                            return;
                        }
                        //슬라이더 이동후 값이 2부터 시작, 스와이프 페이지는 0부터 시작했으니 -2.
                        thumbSwiper.slideTo(ui.value-2, 100);
                        sliderMoving = true;
                    }
                });

                thumbSwiper.on('transitionEnd', function () {
                    //슬라이드로 무빙중이면 1회무시
                    if(sliderMoving){
                        sliderMoving = false;
                        return;
                    }
                    let progressCnt = Math.ceil(-thumbSwiper.translate / swiperEachWidth) + 1;
                    //translate가 0부터 스와이프 각 객체의 가로만큼 -됨. 현재는 -153씩
                    slider.slider( "value", progressCnt+1 ); //slide는 2부터시작이므로 +1
                });

                //섬네일 클릭 리스너
                thumbSwiper.on('click', function () {
                    //현재 선택된 탭
                    let tabSeq = mediaObj.thumbSwipers.indexOf(this);
                    let tempThumbSwiper = mediaObj.thumbSwipers[tabSeq];
                    let tempProjectSwiper = mediaObj.productSwipers[tabSeq];
                    //제품슬라이드
                    tempProjectSwiper.slideTo(this.clickedIndex+1);
                    //섬네일 active
                    $.each(tempThumbSwiper.slides, function (key, row) {
                        tempThumbSwiper.slides[key].firstElementChild.classList.remove('active');
                    })
                    tempThumbSwiper.slides[this.clickedIndex].firstElementChild.classList.add('active');
// added by kimsoft
                	$('.main .product .tmpProductInfo').hide();
                	$('.main .product .tmpProductInfo_' + this.clickedIndex).show();
// END : added by kimsoft
                });

                this.thumbSwipers[i] = thumbSwiper;
            }
        },
        //main > experience > swiper
        swiperExperience : function () {
            let timeout = null;
            let waiting = 5000;
            let firstType = $('.main .experience .swiper-wrapper .swiper-slide').eq(0).data().slideType;
            let players = [];
            let options = {};

            let swiperExperience  = new Swiper('.main .experience .swiper-container', {
                loop:true,
                effect: "fade",
                navigation: {
                    nextEl: '.main .experience .swiper-button-next',
                    prevEl: '.main .experience .swiper-button-prev',
                },
            });
            let firstVdo = $('.main .experience .swiper-wrapper .swiper-slide[data-swiper-slide-index = 0]:first video').get(0);

            //swiper 생성 후 li앞위로 2개 늘어남
            let videos = $('.experience .swiper-slide video');
            $.each(videos, function (key, row){
                let player = videojs(row, options);
                player.on('ended', function() {
                    next();
                })
                players[key] = player;
            })

// added by kimsoft
            var prevExpType = $('.main .experience .swiper-slide:eq(0)').data('slide-type');
            if (prevExpType == "img") {
            	$('.main .experience .swiper-button-prev .bg').css("background-image", $('.main .experience .swiper-slide:eq(0) .bg').css("background-image"));
            } else {
            	var prevExpUrl = $('.main .experience .swiper-slide:eq(0) .video-js').find('source').attr("src");
            	var html = '<video class="video-js"><source src="' + prevExpUrl + '" type="video/mp4"></video>';
            	$('.main .experience .swiper-button-prev .bg').addClass("vdo");
            	$('.main .experience .swiper-button-prev .bg').html(html);
            }
            var nextExpType = $('.main .experience .swiper-slide:eq(2)').data('slide-type');
        	if (nextExpType == "img") {
        		$('.main .experience .swiper-button-next .bg').css("background-image", $('.main .experience .swiper-slide:eq(2) .bg').css("background-image"));
        	} else {
        		var nextExpUrl = $('.main .experience .swiper-slide:eq(2) .video-js').find('source').attr("src");
        		var html = '<video class="video-js"><source src="' + nextExpUrl + '" type="video/mp4"></video>';
        		$('.main .experience .swiper-button-next .bg').addClass("vdo");
        		$('.main .experience .swiper-button-next .bg').html(html);
        	}
// END : added by kimsoft
            swiperExperience.on('slideChangeTransitionEnd', function () {
// added by kimsoft
                $('.main .experience .swiper-button-prev .bg').removeClass("vdo");
                $('.main .experience .swiper-button-prev .bg').html("");
                $('.main .experience .swiper-button-prev .bg').css("background-image", "");
                $('.main .experience .swiper-button-next .bg').removeClass("vdo");
                $('.main .experience .swiper-button-next .bg').html("");
                $('.main .experience .swiper-button-next .bg').css("background-image", "");

            	var prevIdx = this.realIndex;
            	var prevExpType = $('.main .experience .swiper-slide:eq(' + prevIdx + ')').data('slide-type');
            	if (prevExpType == "img") {
            		$('.main .experience .swiper-button-prev .bg').css("background-image", $('.main .experience .swiper-slide:eq(' + prevIdx + ') .bg').css("background-image"));
            	} else {
            		var prevExpUrl = $('.main .experience .swiper-slide:eq(' + prevIdx + ') .video-js').find('source').attr("src");
            		var html = '<video class="video-js"><source src="' + prevExpUrl + '" type="video/mp4"></video>';
            		$('.main .experience .swiper-button-prev .bg').addClass("vdo");
            		$('.main .experience .swiper-button-prev .bg').html(html);
            	}

            	var nextIdx = this.realIndex + 2;
            	var nextExpType = $('.main .experience .swiper-slide:eq(' + nextIdx + ')').data('slide-type');
            	if (nextExpType == "img") {
            		$('.main .experience .swiper-button-next .bg').css("background-image", $('.main .experience .swiper-slide:eq(' + nextIdx + ') .bg').css("background-image"));
            	} else {
            		var nextExpUrl = $('.main .experience .swiper-slide:eq(' + nextIdx + ') .video-js').find('source').attr("src");
            		var html = '<video class="video-js"><source src="' + nextExpUrl + '" type="video/mp4"></video>';
            		$('.main .experience .swiper-button-next .bg').addClass("vdo");
            		$('.main .experience .swiper-button-next .bg').html(html);
            	}
// END : added by kimsoft
                let index = swiperExperience.activeIndex;
                let currentSlide = $(swiperExperience.slides[index]);
                let currentSlideType = currentSlide.data('slide-type');

                $.each(players, function (key, row){
                    players[key].pause();
                });

                clearTimeout(timeout);

                switch (currentSlideType) {
                    case 'img':
                        runNext();
                        break;
                    case 'vdo':
                        let currentVideo = currentSlide.find('video').get(0);
                        currentVideo.currentTime = 0;
                        currentVideo.play();
                        break;
                    default:
                        throw new Error('invalid slide type');
                }
            })

            function prev() {
                swiperExperience.slidePrev();
            }

            function next() {
                swiperExperience.slideNext();
            }

            function runNext() {
                timeout = setTimeout(function () {
                    next();
                }, waiting);
            }

            if(firstType == 'img') {
                runNext();
            }
            else{
                setTimeout( function() {
                    firstVdo.play();
                }, 1);
            }
        },
        //main > news > swiper
        swiperNews : function () {
            //슬라이드로 움직이면, swiper 리스너 1회무시하기위해 무빙flag
            let sliderMoving = false;
            let mySwiper = new Swiper('.ak_news .swiper-container', {
                init: true,
                loop: false,
                slidesPerView: 'auto',
                breakpoints : {
                    768 : {

                    },
                }
            });
            //리스트 전체갯수
            let progress = $('.ak_news .swiper-progress-bar .progress');
            let swiperLength = mySwiper.slides.length;
            //스와이퍼 가로전체길이
            let swiperWidth = mySwiper.width;
            //스와이퍼 각 객체 가로길이
            let swiperEachWidth = mySwiper.slides[0].offsetWidth;
            //스와이퍼 이동 가능한 총 개수
            let slidersCount = swiperLength - Math.round(swiperWidth / (swiperEachWidth)) + 1;
            //슬라이더 2~스와이프 가능한 총 갯수만큼 지정
            let slider = $( ".ak_news .swiper-slider" ).slider({
                min: 1,
                max: slidersCount+1,
                range: "min",
                value: 2,
                slide: function( event, ui ) {
                    //슬라이더를 2부터 시작했으니 1이면 다시 2로 해야되는데 동작안함
                    if(ui.value == 1){
                        slider.slider( "value", 2 );
                        return;
                    }
                    //슬라이더 이동후 값이 2부터 시작, 스와이프 페이지는 0부터 시작했으니 -2.
                    mySwiper.slideTo(ui.value-2, 100);
                    sliderMoving = true;
                }
            });

            mySwiper.on('transitionEnd', function () {
                //슬라이드로 무빙중이면 1회무시
                if(sliderMoving){
                    sliderMoving = false;
                    return;
                }
                let progressCnt = Math.ceil(-mySwiper.translate / swiperEachWidth) + 1;
                //translate가 0부터 스와이프 각 객체의 가로만큼 -됨. 현재는 -153씩
                slider.slider( "value", progressCnt+1 ); //slide는 2부터시작이므로 +1

                $.each(mySwiper.slides, function (key, row){
                    mySwiper.slides[key].firstElementChild.classList.remove('active');
                })
                mySwiper.slides[mySwiper.realIndex].firstElementChild.classList.add('active');
            });
        },
        //sub > more-product > swiper
        swiperMoreProduct : function () {
            //tab
            $('.more-product .tab a').off().click(function () {
                $('.more-product .tab a').removeClass('on');
                $(this).addClass('on');
// added by kimsoft
                setTimeout(function() {
                    mySwiper.update();
                }, 1);
// END : added by kimsoft
            });
            let swiperTab = new Swiper('.sub .more-product .tab .swiper-container', {
                watchOverflow:true,
                centerInsufficientSlides : true,
                slidesPerView: 'auto',
                breakpoints : {
                    1023 : {
                        slidesOffsetBefore:20,
                        slidesOffsetAfter:20
                    },
                }
            });
            //슬라이드로 움직이면, swiper 리스너 1회무시하기위해 무빙flag
            let sliderMoving = false;
            let mySwiper = new Swiper('.sub .more-product .list .swiper-container', {
                init: true,
                loop: false,
                slidesPerView: 'auto',
                centerInsufficientSlides:true,
                breakpoints: {
                    1920 : {
                        slidesPerView: 6,
                    },
                    1629 : {
                        slidesPerView: 5,
                    },
                    1366 : {
                        slidesPerView: 6,
                    },
                    1023 : {
                        slidesPerView: 'auto',
                    },
                }
            });
            //리스트 전체갯수
            let progress = $('.sub .more-product .list .swiper-progress-bar .progress');
            let swiperLength = mySwiper.slides.length;
            //스와이퍼 가로전체길이
            let swiperWidth = mySwiper.width;
            //스와이퍼 각 객체 가로길이
            let swiperEachWidth = mySwiper.slides[0].offsetWidth;
            //스와이퍼 이동 가능한 총 개수
            let slidersCount = swiperLength - Math.round(swiperWidth / (swiperEachWidth)) + 1;
            //슬라이더 2~스와이프 가능한 총 갯수만큼 지정
            let slider = $('.sub .more-product .list .swiper-slider').slider({
                min: 1,
                max: slidersCount + 1,
                range: "min",
                value: 2,
                slide: function (event, ui) {
                    //슬라이더를 2부터 시작했으니 1이면 다시 2로 해야되는데 동작안함
                    if (ui.value == 1) {
                        slider.slider("value", 2);
                        return;
                    }
                    //슬라이더 이동후 값이 2부터 시작, 스와이프 페이지는 0부터 시작했으니 -2.
                    mySwiper.slideTo(ui.value - 2, 100);
                    sliderMoving = true;
                }
            });

            mySwiper.on('transitionEnd', function () {
                //슬라이드로 무빙중이면 1회무시
                if (sliderMoving) {
                    sliderMoving = false;
                    return;
                }
                let progressCnt = Math.ceil(-mySwiper.translate / swiperEachWidth) + 1;
                //translate가 0부터 스와이프 각 객체의 가로만큼 -됨. 현재는 -153씩
                slider.slider("value", progressCnt + 1); //slide는 2부터시작이므로 +1

                $.each(mySwiper.slides, function (key, row) {
                    mySwiper.slides[key].firstElementChild.classList.remove('active');
                })
                mySwiper.slides[mySwiper.realIndex].firstElementChild.classList.add('active');
            });
        },
        //lnb
        swiperLnb : function () {
            if ($(".lnb").length > 0) {
                $('.body-wrap').addClass('v1');
            }
            let swiperLnb = new Swiper('.lnb .swiper-container', {
                watchOverflow:true,
                centerInsufficientSlides : true,
                slidesPerView: 'auto',
                breakpoints : {
                    1023 : {
                        centerInsufficientSlides : false,
                        slidesOffsetBefore:20,
                        slidesOffsetAfter:20
                    },
                }
            });
            $('.lnb .swiper-slide a').off().click(function () {
                let headerH = $('header').height();
                let LnbH = $('.lnb').height();
                let offsetTopH = headerH + LnbH;
                let offsetM2 = $('.design-group').offset();
                let offsetM3 = $('.dropdown-list').offset();
                $('.lnb .swiper-slide a').removeClass('on');
                $(this).addClass('on');
                if($(this).closest('.swiper-container').hasClass('v1')) {
                    if ($(this).hasClass('m1')) {
                        $('html, body').animate({scrollTop: 0}, 400);
                    } else if ($(this).hasClass('m2')) {
                        $('html, body').animate({scrollTop: offsetM2.top - offsetTopH}, 400);
                    } else if ($(this).hasClass('m3')) {
                        $('html, body').animate({scrollTop: offsetM3.top - offsetTopH}, 400);
                    }
                }
            });
        },
        //04_akNews.html > tab-ty2
        swiperTab : function () {
            let swiperTab = new Swiper('.tab-ty2 .swiper-container', {
                watchOverflow:true,
                centerInsufficientSlides : true,
                slidesPerView: 'auto',
                breakpoints : {
                    1023 : {
                        centerInsufficientSlides : false,
                        slidesOffsetBefore:20,
                        slidesOffsetAfter:20
                    },
                }
            });
            $('.tab-ty2 .swiper-slide a').off().click(function () {
                $('.tab-ty2 .swiper-slide a').removeClass('on');
                $(this).addClass('on');

// added by kimsoft
                if ($(this).attr("id")) {
                	var selectedTabId = $(this).attr("id").split("_");
                	if (selectedTabId[0].indexOf("searchInfo") > -1) {
                		selSearchInfoType(selectedTabId[1]);
                	}
                }
// END : added by kimsoft
            });
        },
        //02_whats New > color-dot
        colorDot : function (){
            $(".list-ty1 .color-dot a").off().click(function () {
                let num = $(this).data().num;
                $(this).closest('.color-dot').find("a").removeClass('on');
                $(this).addClass('on');
                $(this).parents('.txt-area').prev().find('li').removeClass('on');
                $(this).parents('.txt-area').prev().find('li[data-num='+num+']').addClass('on');
            });
        },
        //02_dap_list > color-dot
        colorDot2 : function (){
            $(".list-ty2 .color-dot a").off().click(function () {
                let num = $(this).data().num;
                $(this).closest('.color-dot').find("a").removeClass('on');
                $(this).addClass('on');
                $(this).parents('.dot-area').prev().find('li').removeClass('on');
                $(this).parents('.dot-area').prev().find('li[data-num='+num+']').addClass('on');
            });
        },
        //02_dap > bnr
        productListOver : function (){
            $('.sub .bnr').off().hover(function () {
                $(this).find('.bg').addClass('on');
                $(this).find('.over').stop().slideDown(500);
            }, function () {
                $(this).find('.bg').removeClass('on');
                $(this).find('.over').stop().slideUp(500);
            });
        },
        productListVideo : function (){
            let player = videojs('productVideo');
        },
        dropdownList : function (){
            $('.dropdown-list .wrap>ul>li>a').off().click(function () {
                if($(this).hasClass('on')) {
                    $(this).removeClass('on');
                    $(this).closest('li').find('.cont').stop().slideUp(200);

                } else{
                    $(this).addClass('on');
                    $(this).closest('li').find('.cont').stop().slideDown(200);
                }
            });
        },
        //02_detail > design > Swiper
        swiperDesignList : function () {
            //제품 탭 배열
            let productSwiper = new Swiper('.design-group .list .swiper-container', {
                slidesPerView: 1,
                loop: {
                    loop: true,
                }
            });

            //제품 애니메이션 종료 리스너
            productSwiper.on('transitionEnd', function () {
                //현재 선택된 탭
                let tempThumbSwiper = mediaObj.thumbSwipers;
                //섬네일 active
                $.each(tempThumbSwiper.slides, function (key, row) {
                    tempThumbSwiper.slides[key].firstElementChild.classList.remove('active');
                })
                tempThumbSwiper.slides[productSwiper.realIndex].firstElementChild.classList.add('active');
            });

            this.productSwipers = productSwiper;
        },
        //02detail > design > Swiper
        swiperDesignThumb : function () {
            //슬라이드로 움직이면, swiper 리스너 1회무시하기위해 무빙flag
            let sliderMoving = false;
            let thumbSwiper = new Swiper('.design-group .thumb .swiper-container', {
                init: true,
                loop: false,
                slidesPerView: 'auto',
                breakpoints : {
                    768 : {

                    },
                }
            });
            //리스트 전체갯수
            let progress = $('.design-group .thumb .swiper-progress-bar .progress');
            let swiperLength = thumbSwiper.slides.length;
            //스와이퍼 가로전체길이
            let swiperWidth = thumbSwiper.width;
            //스와이퍼 각 객체 가로길이
            let swiperEachWidth = thumbSwiper.slides[0].offsetWidth;
            //스와이퍼 이동 가능한 총 개수
            let slidersCount = swiperLength - Math.round(swiperWidth / (swiperEachWidth)) + 1;
            //슬라이더 2~스와이프 가능한 총 갯수만큼 지정
            let slider = $(".design-group .thumb .swiper-slider" ).slider({
                min: 1,
                max: slidersCount+1,
                range: "min",
                value: 2,
                slide: function( event, ui ) {
                    //슬라이더를 2부터 시작했으니 1이면 다시 2로 해야되는데 동작안함
                    if(ui.value == 1){
                        slider.slider( "value", 2 );
                        return;
                    }
                    //슬라이더 이동후 값이 2부터 시작, 스와이프 페이지는 0부터 시작했으니 -2.
                    thumbSwiper.slideTo(ui.value-2, 100);
                    sliderMoving = true;
                }
            });

            thumbSwiper.on('transitionEnd', function () {
                //슬라이드로 무빙중이면 1회무시
                if(sliderMoving){
                    sliderMoving = false;
                    return;
                }
                let progressCnt = Math.ceil(-thumbSwiper.translate / swiperEachWidth) + 1;
                //translate가 0부터 스와이프 각 객체의 가로만큼 -됨. 현재는 -153씩
                slider.slider( "value", progressCnt+1 ); //slide는 2부터시작이므로 +1
            });

            //섬네일 클릭 리스너
            thumbSwiper.on('click', function () {
                //현재 선택된 탭
                let tempThumbSwiper = mediaObj.thumbSwipers;
                let tempProjectSwiper = mediaObj.productSwipers;
                //제품슬라이드
                tempProjectSwiper.slideTo(this.clickedIndex+1);
                //섬네일 active
                $.each(tempThumbSwiper.slides, function (key, row) {
                    tempThumbSwiper.slides[key].firstElementChild.classList.remove('active');
                })
                tempThumbSwiper.slides[this.clickedIndex].firstElementChild.classList.add('active');
            });
            this.thumbSwipers = thumbSwiper;
        },
        //02detail > detail-group5 > Swiper
        swiperDetail1 : function () {
            let detailSwiper = new Swiper('.detail-group5 .swiper-container', {
                init: true,
                loop: true,
                effect: "fade",
                pagination: {
                    el: '.detail-group5 .swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.detail-group5 .swiper-button-next',
                    prevEl: '.detail-group5 .swiper-button-prev',
                },
            });
        },
        //02detail > detail-group15 > Swiper
        swiperDetail2 : function () {
            let detailSwiper = new Swiper('.detail-group15 .swiper-container', {
                init: true,
                loop: true,
                effect: "fade",
                pagination: {
                    el: '.detail-group15 .swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.detail-group15 .swiper-button-next',
                    prevEl: '.detail-group15 .swiper-button-prev',
                },
            });
        },
        swiperDetailVisual : function () {
            let swiperDetailVisual = new Swiper('.sub-visual3 .bg .swiper-container', {
                loop: true,
                pagination: {
                    el: '.sub-visual3 .bg .swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                }
            });
        },
        //02_detail12_AkCdRipperMk2.html > detail-group51 > Swiper
        swiperDetail3 : function () {
            let detailSwiper = new Swiper('.detail-group51 .swiper-container', {
                init: true,
                loop: true,
                effect: "fade",
                pagination: {
                    el: '.detail-group51 .swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.detail-group51 .swiper-button-next',
                    prevEl: '.detail-group51 .swiper-button-prev',
                },
            });
        },
        swiperDetail4 : function () {
            let detailSwiper = new Swiper('.detail-group81 .swiper-container', {
                init: true,
                loop: true,
                pagination: {
                    el: '.detail-group81 .swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.detail-group81 .swiper-button-next',
                    prevEl: '.detail-group81 .swiper-button-prev',
                },
            });
        },
        //02detail > detail-group2 > button
        detailBtn : function (){
            $(".detail-group2 .btn-ty").off().click(function () {
                if($(this).hasClass('on')) {
                    $(this).removeClass('on');
                    $(".detail-group2 .dv3").slideDown(200);
                    $(".detail-group2 .dv2").slideDown(200);
                    $(".detail-group2 .dv4").slideDown(200);
                }else {
                    $(this).addClass('on');
                    $(".detail-group2 .dv3").slideUp(200);
                    $(".detail-group2 .dv2").slideUp(200);
                    $(".detail-group2 .dv4").slideUp(200);
                }
            });
        },
        //02detail > detail-group1 > gallery
        swiperGallery : function() {
            let galleryThumbs = new Swiper('.gallery .thumbs', {
                spaceBetween: 12,
                slidesPerView: 'auto',
                watchOverflow:true,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                breakpoints: {
                    1199: {
                        spaceBetween: 8,
                    },
                    767: {
                        spaceBetween: 4,
                    }
                }
            });
            let galleryTop = new Swiper('.gallery .top', {
                effect: "fade",
                navigation: {
                    nextEl: '.gallery .swiper-button-next',
                    prevEl: '.gallery .swiper-button-prev',
                },
                thumbs: {
                    swiper: galleryThumbs
                },
                pagination: {
                    el: '.gallery .swiper-pagination',
                }
            });
        },
        //02detail .popup-media
        popupMedia:function (){
            $('*[data-type="popMediaOpen"]').off().click(function () {
// added by kimsoft
            	var value = $(this).attr("value");
            	var contentNo = value.split("_")[0];
            	var videoAddr = value.substring(contentNo.length + 1);
            	updateViewCnt(contentNo);
                $("#videoIframe").attr("src", videoAddr);
// END : added by kimsoft
                $('.popup-media').fadeIn(300);
            });
            $('*[data-type="popMediaOpen2"]').off().click(function () {
// added by kimsoft
            	var imgAddr = $(this).css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
            	$("#imgIframe").attr("src", imgAddr);
// END : added by kimsoft
            	$('.popup-media.v1').fadeIn(300);
            });
            $('*[data-type="popMediaOpen3"]').off().click(function () {
// added by kimsoft
            	var videoAddr = $(this).attr("value");
            	$("#videoIframe").attr("src", videoAddr);
// END : added by kimsoft
                $('.popup-media.v2').fadeIn(300);
            });
            $('*[data-type="popMediaClose"]').off().click(function () {
            	var mediaVideo = $("#videoIframe").attr("src");
            	if (mediaVideo) {
            		$("#videoIframe").attr("src", "");
            	} else {
            		var tmpVideoSrc = $(this).next().find('iframe:first').attr("src");
            		if (tmpVideoSrc) {
            			$(this).next().find('iframe:first').attr("src", "");
            			$(this).next().find('iframe:first').attr("src", tmpVideoSrc);
            		}
            	}
                $('.popup-media').fadeOut(300);
            });
            $('*[data-type="popMediaOpenN1"]').off().click(function () {
                $('.popup-media.n1').fadeIn(300);
            });
            $('*[data-type="popMediaOpenN2"]').off().click(function () {
                $('.popup-media.n2').fadeIn(300);
            });
            $('*[data-type="popMediaOpenN3"]').off().click(function () {
                $('.popup-media.n3').fadeIn(300);
            });
            $('*[data-type="popMediaOpenN4"]').off().click(function () {
                $('.popup-media.n4').fadeIn(300);
            });
        },
        //05_faq.html > dropdown
        dropdownFAQ: function () {
            $('.list-dropdown .cont-top').off().click(function () {
                if($(this).hasClass('on')) {
                    $('.list-dropdown .cont-top').removeClass('on');
                    $('.list-dropdown .inner').slideUp();
                }else {
// added by kimsoft
                	var bbsNo = $(this).attr("value");
                	updateViewCnt(bbsNo);
// END : added by kimsoft
                    $('.list-dropdown .cont-top').removeClass('on');
                    $('.list-dropdown .inner').slideUp();
                    $(this).addClass('on');
                    $(this).closest('li').find('.inner').slideDown();
                }
            });
        },
        //05_whereToBuy.html
        dropdownMap: function () {
            $('.map-ty .map-btn').off().click(function () {
                if($(this).hasClass('off')) {
                    $(this).removeClass('off');
                    $(this).closest('.map-ty').removeClass('off');
                    $(this).closest('.map-ty').find('.bg-area').slideDown();
                    $('.map-btn-area').slideDown();
                }else {
                    $(this).addClass('off');
                    $(this).closest('.map-ty').addClass('off');
                    $(this).closest('.map-ty').find('.bg-area').slideUp();
                    $('.map-btn-area').slideUp();
                }
            });
            $('.map-ty .btn-area').on( {
                mouseover: function(){
                    if($(this).hasClass('on')) {
                    }else {
                        if ($(this).hasClass('asia')) {
                            $('.map-ty .btn-area').removeClass('on');
                            $(this).addClass('on');
                            $('.map-ty .bg').hide();
                            $('.map-ty .bg.asia').fadeIn(400);
                            $('.map-ty .bg.asia .dot').fadeIn(400);
                        } else if ($(this).hasClass('oceania')) {
                            $('.map-ty .btn-area').removeClass('on');
                            $(this).addClass('on');
                            $('.map-ty .bg').hide();
                            $('.map-ty .bg.oceania').fadeIn(400);
                            $('.map-ty .bg.oceania .dot').fadeIn(400);
                        } else if ($(this).hasClass('europe')) {
                            $('.map-ty .btn-area').removeClass('on');
                            $(this).addClass('on');
                            $('.map-ty .bg').hide();
                            $('.map-ty .bg.europe').fadeIn(400);
                            $('.map-ty .bg.europe .dot').fadeIn(400);
                        } else if ($(this).hasClass('africa')) {
                            $('.map-ty .btn-area').removeClass('on');
                            $(this).addClass('on');
                            $('.map-ty .bg').hide();
                            $('.map-ty .bg.africa').fadeIn(400);
                            $('.map-ty .bg.africa .dot').fadeIn(400);
                        } else if ($(this).hasClass('n_america')) {
                            $('.map-ty .btn-area').removeClass('on');
                            $(this).addClass('on');
                            $('.map-ty .bg').hide();
                            $('.map-ty .bg.n_america').fadeIn(400);
                            $('.map-ty .bg.n_america .dot').fadeIn(400);
                        } else if ($(this).hasClass('s_america')) {
                            $('.map-ty .btn-area').removeClass('on');
                            $(this).addClass('on');
                            $('.map-ty .bg').hide();
                            $('.map-ty .bg.s_america').fadeIn(400);
                            $('.map-ty .bg.s_america .dot').fadeIn(400);
                        }
                    }
                },
                mouseleave: function(){
                    $('.map-ty .btn-area').removeClass('on');
                    $('.map-ty .bg').hide();
                    $('.map-ty .bg .dot').hide();
                    $('.map-ty .bg.default').show();
                },
                click: function(){
                    $(this).off('mouseleave');
                }
            });
        },
        storyVisual: function (){
            let options = {
                poster: "[이미지 주소 등록]",
                controls: true,
                preload: "auto",
            };
            let player = videojs('StoryVisual', options);
// added by kimsoft
            setTimeout(function() {
                player.play();
            }, 1);
// END : added by kimsoft


        },
        storyVideo: function (){
            let options = {
                poster: "[이미지 주소 등록]",
                controls: true,
                preload: "auto",
            };
            let player = videojs('storyVideo', options);
            player.play();


        },
        //selectType
        selectType : function (){
            $(".select-ty a").off().click(function () {
                if($(this).hasClass('active')) {
                    $(".select-ty a").removeClass('active');
                    $(".select-ty ul").slideUp(200);
                    $(".select-ty3 a").removeClass('active');
                    $(".select-ty3 .scroll-y").slideUp(200);
                    return false;
                }else {
                    $(".select-ty a").removeClass('active');
                    $(".select-ty ul").slideUp(200);
                    $(".select-ty3 a").removeClass('active');
                    $(".select-ty3 .scroll-y").slideUp(200);
                    $(this).addClass('active');
                    $(this).next('ul').slideDown(200);
                    return false;
                }
            });
            $(".select-ty li").off().click(function () {
// changed by kimsoft
            	let selectTxt = $(this).text();
            	var selectedId = $(this).attr("id").split("_");
                $(this).closest('ul').find('li').removeClass('on');
                if (selectedId[0].indexOf("familySite") > -1) {
                } else {
                	$(this).addClass('on');
                	$(this).closest('.select-ty').find('a').text(selectTxt);
                	$(this).closest('.select-ty').find('input').val(selectedId[1]);
                }
                $(this).closest('.select-ty').find('a').removeClass('active');
                $(this).closest('ul').slideUp(200);
                if (selectedId[0].indexOf("category") > -1) {
                    $(this).closest('.select-ty').find('input').val($(this).attr("value"));
                    if (selectedId[0] == "categoryCountryNo1") {
                        $("#tmpForm input[name=countryNo2]").val("");
                    }
                    search();
                } else if (selectedId[0].indexOf("familySite") > -1) {
            		var familySite = $(this).attr("value");
            		if (familySite != "") {
            			window.open(familySite, '_blank'); 
            		}
                }
// END : changed by kimsoft
                return false;
            });
            $(document).click(function(e){
                if(e.target.className =="select-ty"){return false}
                $(".select-ty a").removeClass('active');
                $(".select-ty ul").slideUp(200);
            });
        },
        //selectType3 : 211015
        selectType3 : function (){
            $(".select-ty3 a").off().click(function () {
                if($(this).hasClass('active')) {
                    $(".select-ty3 a").removeClass('active');
                    $(".select-ty3 .scroll-y").slideUp(200);
                    $(".select-ty a").removeClass('active');
                    $(".select-ty ul").slideUp(200);
                    return false;
                }else {
                    $(".select-ty3 a").removeClass('active');
                    $(".select-ty3 .scroll-y").slideUp(200);
                    $(".select-ty a").removeClass('active');
                    $(".select-ty ul").slideUp(200);
                    $(this).addClass('active');
                    $(this).next('.scroll-y').slideDown(200);
                    return false;
                }
            });
            $(".select-ty3 li").off().click(function () {
// changed by kimsoft
            	let selectTxt = $(this).text();
            	var selectedId = $(this).attr("id").split("_");
                $(this).closest('ul').find('li').removeClass('on');
                $(this).addClass('on');
                $(this).closest('.select-ty3').find('a').text(selectTxt);
                $(this).closest('.select-ty3').find('input').val(selectedId[1]);
                $(this).closest('.select-ty3').find('a').removeClass('active');
                $(this).closest('.scroll-y').slideUp(200);
                if (selectedId[0].indexOf("category") > -1) {
                    $(this).closest('.select-ty3').find('input').val($(this).attr("value"));
                    search();
                }
// END : changed by kimsoft
                return false;
            });
            $(document).click(function(e){
                if(e.target.className =="select-ty3"){return false}
                $(".select-ty3 a").removeClass('active');
                $(".select-ty3 .scroll-y").slideUp(200);
            });
        },
        //01brand>timeline
        timeline : function() {
            let timelineThumbs = new Swiper('.timeline .thumbs', {
                spaceBetween: 55,
                slidesPerView: 'auto',
                watchOverflow:true,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                breakpoints: {
                    1023: {
                        slidesOffsetBefore:20,
                        slidesOffsetAfter:20,
                        spaceBetween: 35,
                    }
                }
            });
            let timelineTop = new Swiper('.timeline .list', {
                navigation: {
                    nextEl: '.timeline .swiper-button-next',
                    prevEl: '.timeline .swiper-button-prev',
                },
                loop:true,
                thumbs: {
                    swiper: timelineThumbs
                }
            });
        },
        //01_teraton.html > tab
        teratonTab : function () {
            let teratonTab = new Swiper('.teraton .tab .swiper-container', {
                watchOverflow:true,
                centerInsufficientSlides : true,
                slidesPerView: 'auto'
            });
            $('.teraton .tab .swiper-slide a').off().click(function () {
                $('.teraton .tab .swiper-slide a').removeClass('on');
                $(this).addClass('on');
                if($(this).hasClass('n1')) {
                    $('.teraton .tab-cont1').fadeIn(200);
                    $('.teraton .tab-cont2').fadeOut(200);
                }else if($(this).hasClass('n2')){
                    $('.teraton .tab-cont2').fadeIn(200);
                    $('.teraton .tab-cont1').fadeOut(200);
                }
            });
        },
    }
// changed by kimsoft
//    $(window).on('load', function () {
    $(document).ready(function () {
// END : changed by kimsoft
        mediaObj.mediaq();
        if ($(".scrollAni").length > 0) {
            mediaObj.scrollAni();
        }
        if ($(".scrollAniTop").length > 0) {
            mediaObj.scrollAni();
        }
        if ($(".side-group .quick").length > 0) {
            mediaObj.quickBtn();
        }
        if ($(".side-group .more").length > 0) {
            mediaObj.moreBtn();
        }
        if ($(".btn-top").length > 0) {
            mediaObj.scrollTop();
        }
        if ($(".key-visual").length > 0) {
            mediaObj.headerColor();
        }
        if ($(".btn-line-ty1").length > 0) {
            mediaObj.btnAni();
        }
        if ($(".main .key-visual").length > 0) {
            mediaObj.swiperKeyVisual();
        }
        if ($(".main .product-banner").length > 0) {
            mediaObj.swiperProductBanner();
        }
        if ($(".main .product").length > 0) {
            mediaObj.productTab();
            mediaObj.swiperProductList();
            mediaObj.swiperProductThumb();
        }
        if ($(".main .experience").length > 0) {
            mediaObj.swiperExperience();
        }
        if ($(".ak_news").length > 0) {
            mediaObj.swiperNews();
        }
        if ($('.more-product').length > 0) {
            mediaObj.swiperMoreProduct();
        }
        if ($('.lnb').length > 0) {
            mediaObj.swiperLnb();
        }
        if ($('.tab-ty2').length > 0) {
            mediaObj.swiperTab();
        }
        if ($('header .btn-srch').length > 0) {
            mediaObj.btnSearch();
        }
        if ($('.list-ty1 .color-dot').length > 0) {
            mediaObj.colorDot();
        }
        if ($('.list-ty2 .color-dot').length > 0) {
            mediaObj.colorDot2();
        }
        if ($('.sub .bnr-top').length > 0) {
            mediaObj.productListVideo();
        }
        if ($('.dropdown-list').length > 0) {
            mediaObj.dropdownList();
        }
        if ($('.design-group .slide-group').length > 0) {
            mediaObj.swiperDesignList();
            mediaObj.swiperDesignThumb();
        }
        if ($('.detail-group5 .swiper-container').length > 0) {
            mediaObj.swiperDetail1();
        }
        if ($('.detail-group15 .swiper-container').length > 0) {
            mediaObj.swiperDetail2();
        }
        if ($('.sub-visual3 .bg .swiper-container').length > 0) {
            mediaObj.swiperDetailVisual();
        }
        if ($('.detail-group51 .swiper-container').length > 0) {
            mediaObj.swiperDetail3();
        }
        if ($('.detail-group81 .swiper-container').length > 0) {
            mediaObj.swiperDetail4();
        }
        if ($('.detail-group2 .btn-ty').length > 0) {
            mediaObj.detailBtn();
        }
        if ($('.detail-group1 .gallery').length > 0) {
            mediaObj.swiperGallery();
        }
        if ($('.popup-media').length > 0) {
            mediaObj.popupMedia();
        }
        if ($('.list-dropdown').length > 0) {
            mediaObj.dropdownFAQ();
        }
        if ($('.map-ty').length > 0) {
            mediaObj.dropdownMap();
        }
        if ($('.sub-visual4').length > 0) {
            mediaObj.storyVisual();
        }
        if ($('.select-ty').length > 0) {
            mediaObj.selectType();
        }
        if ($('.select-ty3').length > 0) {
            mediaObj.selectType3();
        }
        if ($('.timeline').length > 0) {
            mediaObj.timeline();
        }
        if ($('.teraton .tab').length > 0) {
            mediaObj.teratonTab();
        }
    });
    $(window).on('resize', function () {
        mediaObj.mediaq();
        if ($(".scrollAni").length > 0) {
            mediaObj.scrollAni();
        }
        if ($(".scrollAniTop").length > 0) {
            mediaObj.scrollAni();
        }
    });

    $(window).scroll(function(){
        if ($(".key-visual").length > 0) {
            mediaObj.headerColor();
        }
        if ($(".scrollAni").length > 0) {
            mediaObj.scrollAni();
        }
        if ($(".scrollAniTop").length > 0) {
            mediaObj.scrollAni();
        }
        if ($(".btn-top").length > 0) {
            mediaObj.scrollTop();
        }

    });
});