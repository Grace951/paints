$.fn.animateRotate = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(e, arguments);
        };

        $({deg: 0}).animate({deg: angle}, args);
    });
};


$.preloadImages = function() {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
};

$(document).ready(function(){
  var nav_height = 143;//40;
  var t=0;
  var close = function(event) {
    $("#myNavbar").slideUp("slow");
  }
  $("#close").click(close);
  $("#nav_icon").click(function(event) {
    $("#myNavbar").slideToggle("slow");
  });

  $("#review .circle").hover(function(e){
      var $this = $(this);
      var offset = $this.offset();
      var width = $this.width();
      var height = $this.height();

      var centerX = offset.left + width - 40;
      var centerY = offset.top + height / 2;
      $('#plane').stop(true).animate({
        left:centerX + "px",
        top:centerY - $(window).scrollTop() + "px",
        position:'fixed',
        opacity:1
      }, 700);
  })

  $(".go").hover(function(e){
      $('.go').removeClass('shake');
  },function(e){
      $('.go').addClass('shake');
  })

  var stickyNavTop = $('#top-nav').offset().top;
  var stickyNav = function(){
    var scrollTop = $(window).scrollTop();
    //console.log("scrollTop:" + scrollTop + ",stickyNavTop:" + stickyNavTop);
    if (scrollTop > stickyNavTop) {
        $('#top-nav').addClass('scroll-up');
        nav_height = 40;
    } else {
        $('#top-nav').removeClass('scroll-up');
        nav_height = 40;
    }
  };


  function blink() {
     //$(".gly-center ul li").fadeTo(1500, 0.1).fadeTo(1500, 1.0);
     $(".split-door").fadeTo(1500, 0.1).fadeTo(1500, 0.3);
  }

  stickyNav();

  $('.go').addClass('shake');
  $('.demo-1 .sl-slide .gom').addClass('shake');
  //setInterval(function(){blink()}, 700);

  $(window).scroll(function() {
      stickyNav();
  });

  function change_pos(ttop, target){
   $('html,body').animate({
      scrollTop: ( ttop-nav_height)
    }, 600 );

    if (!target || !target.attr('href')){
      return;
    }
    a = target.attr('href');
    i = $(a).find('.p-icon');
    if(i.length != 0){
      //console.log(a);
      i.animateRotate(360, 1000, "swing", function(){
            //console.log(this); //this is supposed to be the DOM node, but it isn't
        });
    }

  }
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      var a=$(this);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        t = target.offset().top;
        if($(this).find('.circle').length != 0){
          $('#plane').stop(true).animate({
                                fontSize: "900px",
                                opacity: 0,
                                right:'-500px',
                                top:'-500px',
                                position: 'fixed'
                              }, 700, function() {
                                $('#plane').stop(true).animate({fontSize: "36px",opacity: 1, position:'absolute', top:0, left:0},1);
                                change_pos(t, a);
                              });
        }else{
          change_pos(t, $(this));
        }
        return false;
      }
    }
  });
});


$(document).ready(function(){
  var h = $( window ).height();
  $('article.d-article').css("min-height", h);
  (function($){
    $.fn.extend({
      painterSlide: function(options) {
        var defaults = {
            viewport: 'md'
        };

        options = $.extend(defaults, options);
        var imgi=0;
        var $m = this.find('.painting');
        var $obj = this;
        var $dir = $obj.find('.direction');
        var $com = $dir.find('.compress');
        var $desc = $obj.find('.paints-wrap .paint .desc');
        var $gom = $obj.find(".gom");
        var $tumb = $obj.find(".p-tumb");
        var $t = $tumb.find('img');
        var $inner = $obj.find(".sl-slide-inner");
        var $master = $obj.find(".masterpiece");
        var $mp = $obj.find(".l-shift");
        var $wimg = $obj.find('.paints-wrap');
        var $p = $obj.find(".direction .play");
        function rwd(resize) {
          var img;
          var $o = $m.eq(imgi);
          if(!$o.is(':visible'))   return;

          var ani = (resize==1)?0:1000;
          w = '50%';
          $mp.css({
            right: 'auto'
          });
          $mp.animate({
            right:'auto',
            left:w,
            marginLeft:'-380px'
          }, ani);

          $desc.fadeOut( 0).animate({   right: w   }, ani);
          $desc.eq(imgi).fadeIn( ani);
          $desc.eq(imgi).removeClass("show").addClass("show");
          $gom.animate({   right: w  }, ani);
          $tumb.animate({   right: w   }, ani);
          $obj.find(".direction .play").css({    right: w   });
          $obj.find(".direction .note").css({    right: w   });
          $p.css({  right: w    });
        };


        var updateSlide = function() {
          $wimg.stop().fadeOut(1000).animate({'left': -(100*imgi)+'%'}, 10).fadeIn(1000);
          if ($m.eq(imgi).hasClass("isSmall")){
            $com.removeClass('comp').addClass('comp')
                  .removeClass('fa-compress').addClass('fa-expand');
          }else{
            $com.removeClass('comp')
                  .removeClass('fa-expand').addClass('fa-compress');
          }
          $t.css({
            opacity: '0.5'
          });
          $t.eq(imgi).css({
            opacity: '1'
          });
          //alert(getImageWidth($obj.find('.paints-wrap .paint').eq(imgi)));
          rwd(0);
        }

        $gom.click( function(event){
            event.preventDefault();
            if ( $(this).hasClass("isLeft") ) {
                $inner.stop().animate({width:"100%"}, 200);
                $master.css("display", "none");
                $dir.css("display", "none");
                $tumb.css("display", "none");
                $(this).css({
                  right: '10%'
                }).removeClass('t-left').addClass('t-right');
            } else {
                $inner.stop().animate({width:"50%"}, 200);
                $master.css("display", "block");
                $dir.css("display", "block");
                $tumb.css("display", "block");
                $(this).css({
                  right: '5px'
                }).removeClass('t-right').addClass('t-left');
                rwd(0);
            }
            $(this).toggleClass("isLeft");
            return false;
        });

        $t.each(function(index, el) {
          $(this).click( function(event){
            imgi = index % $m.length;
            updateSlide();
            $(this).siblings().css({
              opacity: '0.5'
            });
            $(this).css({
              opacity: '1'
            });
          });
        });
        $obj.find(".direction .play").click( function(event){
            imgi = (imgi + 1) % $m.length;
            updateSlide();
        });

        $obj.find(".direction i.note").click( function(event){
          $desc.each(function(i, e) {
            if (i!=imgi){
              $desc.eq(i).css('display','none');
              $desc.eq(i).removeClass("show");
            }
          });

          if ( $desc.eq(imgi).hasClass("show") ) {
            $desc.eq(imgi).css('display','none');
          } else {
            $desc.eq(imgi).css('display','block');
          }
          $desc.eq(imgi).toggleClass("show");
          if ( $(this).hasClass("comp") ) {
              $m.eq(imgi-1).removeClass('isSmall');
              $(this).removeClass('fa-expand').addClass('fa-compress');
          } else {
              $m.eq(imgi-1).removeClass('isSmall').addClass('isSmall');
              $(this).removeClass('fa-compress').addClass('fa-expand');
          }
          $(this).toggleClass("comp");
          return false;
        });

        $com.click( function(event){
            if ( $(this).hasClass("comp") ) {
                $m.eq(imgi-1).removeClass('isSmall');
                $(this).removeClass('fa-expand').addClass('fa-compress');
            } else {
                $m.eq(imgi-1).removeClass('isSmall').addClass('isSmall');
                $(this).removeClass('fa-compress').addClass('fa-expand');
            }
            $(this).toggleClass("comp");
            return false;
        });
        $t.eq(0).css({
          opacity: '1'
        });
        return this;
      }
    });
  })(jQuery);

  (function($){
    $.fn.extend({
      graceSlide: function(options) {
        var defaults = {
            slider: '#slider1'
        };

        options = $.extend(defaults, options);
        var $t=this;
        var breakpoint = 767;
        var w_width = $(window).width();
        $('#nav-arrows').css({
          display: 'none'
        });
        if ($(window).width() > 767) {
          $('#footer').css({
            display: 'none'
          });
          var Page = (function() {
            var $navArrows = $( '#nav-arrows' ),
            $nav = $( '#nav-dots > span' ),
            slitslider = $t.slitslider( {
              onBeforeChange : function( slide, pos ) {
                $nav.removeClass( 'nav-dot-current' );
                $nav.eq( pos ).addClass( 'nav-dot-current' );
              }
            } ),
            init = function() {
              initEvents();
            },
            initEvents = function() {
              // add navigation events
              $navArrows.children( ':last' ).on( 'click', function() {
                slitslider.next();
                return false;
              } );

              $navArrows.children( ':first' ).on( 'click', function() {
                slitslider.previous();
                return false;
              } );

              $nav.each( function( i ) {
                $( this ).on( 'click', function( event ) {
                  var $dot = $( this );
                  if( !slitslider.isActive() ) {
                    $nav.removeClass( 'nav-dot-current' );
                    $dot.addClass( 'nav-dot-current' );
                  }
                  slitslider.jump( i + 1 );
                  return false;
                } );
              } );

              $t.on('mousewheel', function(event) {
                //console.log(event.deltaX, event.deltaY, event.deltaFactor);
                if (event.deltaY>0){
                    slitslider.previous();
                }else if (event.deltaY<0){
                    slitslider.next();
                }
               });
            };
            return { init : init };
          })();

          Page.init();

          $('.sl-slide').each(function(i, e) {
            $(this).painterSlide();
          });
        }

        var re_rwd = function(start) {
          location.reload();
        };

        //var rTimer;
        $(window).on('resize', function(e) {
          var n_h = $( window ).height();
          if (h != n_h){
            $('article.d-article').css("min-height", n_h);
          }
          //clearTimeout(rTimer);
          //rTimer = setTimeout(function() {
            var nw = $(window).width();
            if (w_width < (breakpoint+1) && nw > breakpoint){
              //small -> big
              re_rwd(true);
            }else if (w_width > breakpoint && nw < (breakpoint+1)){
              //big -> small
              re_rwd(false);
            }
            //console.log("w_width:"+w_width+",nw:"+nw);
            w_width = nw;
          //}, 100);
        });
      }
    });
  })(jQuery);
});

(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };

  $("header#top nav#top-nav .open").clickToggle(function(e){
      $("header#top nav#top-nav").stop().animate({   left: '0px'   }, 500);
      $(this).find('i').toggleClass('fa-angle-double-right fa-angle-double-left');
  },function(e){
      $("header#top nav#top-nav").stop().animate({   left: '-200px'   }, 500);
      $(this).find('i').toggleClass('fa-angle-double-right fa-angle-double-left');
  });

  $('.painting').each(function() {
    var backgroundImage = $(this).css("background-image");

    if (backgroundImage != 'none') {
      var t = $(this);
      tempImage = new Image();
      tempImage.src = backgroundImage.replace("url(", "").replace(")", "").replace("\"", "").replace("\"", "");
      tempImage.load=function(t){
         t.fadeIn(5000);
         //alert(t.css( 'display'));
      }(t);
    }
  });

}(jQuery));

/*! waitForImages jQuery Plugin - v2.0.2 - 2015-06-02
* https://github.com/alexanderdickson/waitForImages
* Copyright (c) 2015 Alex Dickson; Licensed MIT */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS / nodejs module
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    // Namespace all events.
    var eventNamespace = 'waitForImages';

    // CSS properties which contain references to images.
    $.waitForImages = {
        hasImageProperties: [
            'backgroundImage',
            'listStyleImage',
            'borderImage',
            'borderCornerImage',
            'cursor'
        ],
        hasImageAttributes: ['srcset']
    };

    // Custom selector to find all `img` elements with a valid `src` attribute.
    $.expr[':']['has-src'] = function (obj) {
        // Ensure we are dealing with an `img` element with a valid
        // `src` attribute.
        return $(obj).is('img[src][src!=""]');
    };

    // Custom selector to find images which are not already cached by the
    // browser.
    $.expr[':'].uncached = function (obj) {
        // Ensure we are dealing with an `img` element with a valid
        // `src` attribute.
        if (!$(obj).is(':has-src')) {
            return false;
        }

        return !obj.complete;
    };

    $.fn.waitForImages = function () {

        var allImgsLength = 0;
        var allImgsLoaded = 0;
        var deferred = $.Deferred();

        var finishedCallback;
        var eachCallback;
        var waitForAll;

        // Handle options object (if passed).
        if ($.isPlainObject(arguments[0])) {

            waitForAll = arguments[0].waitForAll;
            eachCallback = arguments[0].each;
            finishedCallback = arguments[0].finished;

        } else {

            // Handle if using deferred object and only one param was passed in.
            if (arguments.length === 1 && $.type(arguments[0]) === 'boolean') {
                waitForAll = arguments[0];
            } else {
                finishedCallback = arguments[0];
                eachCallback = arguments[1];
                waitForAll = arguments[2];
            }

        }

        // Handle missing callbacks.
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;

        // Convert waitForAll to Boolean
        waitForAll = !! waitForAll;

        // Ensure callbacks are functions.
        if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) {
            throw new TypeError('An invalid callback was supplied.');
        }

        this.each(function () {
            // Build a list of all imgs, dependent on what images will
            // be considered.
            var obj = $(this);
            var allImgs = [];
            // CSS properties which may contain an image.
            var hasImgProperties = $.waitForImages.hasImageProperties || [];
            // Element attributes which may contain an image.
            var hasImageAttributes = $.waitForImages.hasImageAttributes || [];
            // To match `url()` references.
            // Spec: http://www.w3.org/TR/CSS2/syndata.html#value-def-uri
            var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;

            if (waitForAll) {

                // Get all elements (including the original), as any one of
                // them could have a background image.
                obj.find('*').addBack().each(function () {
                    var element = $(this);

                    // If an `img` element, add it. But keep iterating in
                    // case it has a background image too.
                    if (element.is('img:has-src')) {
                        allImgs.push({
                            src: element.attr('src'),
                            element: element[0]
                        });
                    }

                    $.each(hasImgProperties, function (i, property) {
                        var propertyValue = element.css(property);
                        var match;

                        // If it doesn't contain this property, skip.
                        if (!propertyValue) {
                            return true;
                        }

                        // Get all url() of this element.
                        while (match = matchUrl.exec(propertyValue)) {
                            allImgs.push({
                                src: match[2],
                                element: element[0]
                            });
                        }
                    });

                    $.each(hasImageAttributes, function (i, attribute) {
                        var attributeValue = element.attr(attribute);
                        var attributeValues;

                        // If it doesn't contain this property, skip.
                        if (!attributeValue) {
                            return true;
                        }

                        // Check for multiple comma separated images
                        attributeValues = attributeValue.split(',');

                        $.each(attributeValues, function(i, value) {
                            // Trim value and get string before first
                            // whitespace (for use with srcset).
                            value = $.trim(value).split(' ')[0];

                            allImgs.push({
                                src: value,
                                element: element[0]
                            });
                        });
                    });
                });
            } else {
                // For images only, the task is simpler.
                obj.find('img:has-src')
                    .each(function () {
                    allImgs.push({
                        src: this.src,
                        element: this
                    });
                });
            }

            allImgsLength = allImgs.length;
            allImgsLoaded = 0;

            // If no images found, don't bother.
            if (allImgsLength === 0) {
                finishedCallback.call(obj[0]);
                deferred.resolveWith(obj[0]);
            }

            $.each(allImgs, function (i, img) {

                var image = new Image();
                var events =
                  'load.' + eventNamespace + ' error.' + eventNamespace;

                // Handle the image loading and error with the same callback.
                $(image).one(events, function me (event) {
                    // If an error occurred with loading the image, set the
                    // third argument accordingly.
                    var eachArguments = [
                        allImgsLoaded,
                        allImgsLength,
                        event.type == 'load'
                    ];
                    allImgsLoaded++;

                    eachCallback.apply(img.element, eachArguments);
                    deferred.notifyWith(img.element, eachArguments);

                    // Unbind the event listeners. I use this in addition to
                    // `one` as one of those events won't be called (either
                    // 'load' or 'error' will be called).
                    $(this).off(events, me);

                    if (allImgsLoaded == allImgsLength) {
                        finishedCallback.call(obj[0]);
                        deferred.resolveWith(obj[0]);
                        return false;
                    }

                });

                image.src = img.src;
            });
        });

        return deferred.promise();

    };
}));

/*! Picturefill - v2.3.1 - 2015-04-09
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
  "use strict";

  // For browsers that support matchMedium api such as IE 9 and webkit
  var styleMedia = (window.styleMedia || window.media);

  // For those that don't support matchMedium
  if (!styleMedia) {
    var style       = document.createElement('style'),
      script      = document.getElementsByTagName('script')[0],
      info        = null;

    style.type  = 'text/css';
    style.id    = 'matchmediajs-test';

    script.parentNode.insertBefore(style, script);

    // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
    info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

    styleMedia = {
      matchMedium: function(media) {
        var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        }

        // Test if media query is true or false
        return info.width === '1px';
      }
    };
  }

  return function(media) {
    return {
      matches: styleMedia.matchMedium(media || 'all'),
      media: media || 'all'
    };
  };
}());
/*! Picturefill - v2.3.1 - 2015-04-09
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}()),function(a,b,c){"use strict";function d(b){"object"==typeof module&&"object"==typeof module.exports?module.exports=b:"function"==typeof define&&define.amd&&define("picturefill",function(){return b}),"object"==typeof a&&(a.picturefill=b)}function e(a){var b,c,d,e,f,i=a||{};b=i.elements||g.getAllElements();for(var j=0,k=b.length;k>j;j++)if(c=b[j],d=c.parentNode,e=void 0,f=void 0,"IMG"===c.nodeName.toUpperCase()&&(c[g.ns]||(c[g.ns]={}),i.reevaluate||!c[g.ns].evaluated)){if(d&&"PICTURE"===d.nodeName.toUpperCase()){if(g.removeVideoShim(d),e=g.getMatch(c,d),e===!1)continue}else e=void 0;(d&&"PICTURE"===d.nodeName.toUpperCase()||!g.sizesSupported&&c.srcset&&h.test(c.srcset))&&g.dodgeSrcset(c),e?(f=g.processSourceSet(e),g.applyBestCandidate(f,c)):(f=g.processSourceSet(c),(void 0===c.srcset||c[g.ns].srcset)&&g.applyBestCandidate(f,c)),c[g.ns].evaluated=!0}}function f(){function c(){clearTimeout(d),d=setTimeout(h,60)}g.initTypeDetects(),e();var d,f=setInterval(function(){return e(),/^loaded|^i|^c/.test(b.readyState)?void clearInterval(f):void 0},250),h=function(){e({reevaluate:!0})};a.addEventListener?a.addEventListener("resize",c,!1):a.attachEvent&&a.attachEvent("onresize",c)}if(a.HTMLPictureElement)return void d(function(){});b.createElement("picture");var g=a.picturefill||{},h=/\s+\+?\d+(e\d+)?w/;g.ns="picturefill",function(){g.srcsetSupported="srcset"in c,g.sizesSupported="sizes"in c,g.curSrcSupported="currentSrc"in c}(),g.trim=function(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")},g.makeUrl=function(){var a=b.createElement("a");return function(b){return a.href=b,a.href}}(),g.restrictsMixedContent=function(){return"https:"===a.location.protocol},g.matchesMedia=function(b){return a.matchMedia&&a.matchMedia(b).matches},g.getDpr=function(){return a.devicePixelRatio||1},g.getWidthFromLength=function(a){var c;if(!a||a.indexOf("%")>-1!=!1||!(parseFloat(a)>0||a.indexOf("calc(")>-1))return!1;a=a.replace("vw","%"),g.lengthEl||(g.lengthEl=b.createElement("div"),g.lengthEl.style.cssText="border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden",g.lengthEl.className="helper-from-picturefill-js"),g.lengthEl.style.width="0px";try{g.lengthEl.style.width=a}catch(d){}return b.body.appendChild(g.lengthEl),c=g.lengthEl.offsetWidth,0>=c&&(c=!1),b.body.removeChild(g.lengthEl),c},g.detectTypeSupport=function(b,c){var d=new a.Image;return d.onerror=function(){g.types[b]=!1,e()},d.onload=function(){g.types[b]=1===d.width,e()},d.src=c,"pending"},g.types=g.types||{},g.initTypeDetects=function(){g.types["image/jpeg"]=!0,g.types["image/gif"]=!0,g.types["image/png"]=!0,g.types["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),g.types["image/webp"]=g.detectTypeSupport("image/webp","data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")},g.verifyTypeSupport=function(a){var b=a.getAttribute("type");if(null===b||""===b)return!0;var c=g.types[b];return"string"==typeof c&&"pending"!==c?(g.types[b]=g.detectTypeSupport(b,c),"pending"):"function"==typeof c?(c(),"pending"):c},g.parseSize=function(a){var b=/(\([^)]+\))?\s*(.+)/g.exec(a);return{media:b&&b[1],length:b&&b[2]}},g.findWidthFromSourceSize=function(c){for(var d,e=g.trim(c).split(/\s*,\s*/),f=0,h=e.length;h>f;f++){var i=e[f],j=g.parseSize(i),k=j.length,l=j.media;if(k&&(!l||g.matchesMedia(l))&&(d=g.getWidthFromLength(k)))break}return d||Math.max(a.innerWidth||0,b.documentElement.clientWidth)},g.parseSrcset=function(a){for(var b=[];""!==a;){a=a.replace(/^\s+/g,"");var c,d=a.search(/\s/g),e=null;if(-1!==d){c=a.slice(0,d);var f=c.slice(-1);if((","===f||""===c)&&(c=c.replace(/,+$/,""),e=""),a=a.slice(d+1),null===e){var g=a.indexOf(",");-1!==g?(e=a.slice(0,g),a=a.slice(g+1)):(e=a,a="")}}else c=a,a="";(c||e)&&b.push({url:c,descriptor:e})}return b},g.parseDescriptor=function(a,b){var c,d=b||"100vw",e=a&&a.replace(/(^\s+|\s+$)/g,""),f=g.findWidthFromSourceSize(d);if(e)for(var h=e.split(" "),i=h.length-1;i>=0;i--){var j=h[i],k=j&&j.slice(j.length-1);if("h"!==k&&"w"!==k||g.sizesSupported){if("x"===k){var l=j&&parseFloat(j,10);c=l&&!isNaN(l)?l:1}}else c=parseFloat(parseInt(j,10)/f)}return c||1},g.getCandidatesFromSourceSet=function(a,b){for(var c=g.parseSrcset(a),d=[],e=0,f=c.length;f>e;e++){var h=c[e];d.push({url:h.url,resolution:g.parseDescriptor(h.descriptor,b)})}return d},g.dodgeSrcset=function(a){a.srcset&&(a[g.ns].srcset=a.srcset,a.srcset="",a.setAttribute("data-pfsrcset",a[g.ns].srcset))},g.processSourceSet=function(a){var b=a.getAttribute("srcset"),c=a.getAttribute("sizes"),d=[];return"IMG"===a.nodeName.toUpperCase()&&a[g.ns]&&a[g.ns].srcset&&(b=a[g.ns].srcset),b&&(d=g.getCandidatesFromSourceSet(b,c)),d},g.backfaceVisibilityFix=function(a){var b=a.style||{},c="webkitBackfaceVisibility"in b,d=b.zoom;c&&(b.zoom=".999",c=a.offsetWidth,b.zoom=d)},g.setIntrinsicSize=function(){var c={},d=function(a,b,c){b&&a.setAttribute("width",parseInt(b/c,10))};return function(e,f){var h;e[g.ns]&&!a.pfStopIntrinsicSize&&(void 0===e[g.ns].dims&&(e[g.ns].dims=e.getAttribute("width")||e.getAttribute("height")),e[g.ns].dims||(f.url in c?d(e,c[f.url],f.resolution):(h=b.createElement("img"),h.onload=function(){if(c[f.url]=h.width,!c[f.url])try{b.body.appendChild(h),c[f.url]=h.width||h.offsetWidth,b.body.removeChild(h)}catch(a){}e.src===f.url&&d(e,c[f.url],f.resolution),e=null,h.onload=null,h=null},h.src=f.url)))}}(),g.applyBestCandidate=function(a,b){var c,d,e;a.sort(g.ascendingSort),d=a.length,e=a[d-1];for(var f=0;d>f;f++)if(c=a[f],c.resolution>=g.getDpr()){e=c;break}e&&(e.url=g.makeUrl(e.url),b.src!==e.url&&(g.restrictsMixedContent()&&"http:"===e.url.substr(0,"http:".length).toLowerCase()?void 0!==window.console&&console.warn("Blocked mixed content image "+e.url):(b.src=e.url,g.curSrcSupported||(b.currentSrc=b.src),g.backfaceVisibilityFix(b))),g.setIntrinsicSize(b,e))},g.ascendingSort=function(a,b){return a.resolution-b.resolution},g.removeVideoShim=function(a){var b=a.getElementsByTagName("video");if(b.length){for(var c=b[0],d=c.getElementsByTagName("source");d.length;)a.insertBefore(d[0],c);c.parentNode.removeChild(c)}},g.getAllElements=function(){for(var a=[],c=b.getElementsByTagName("img"),d=0,e=c.length;e>d;d++){var f=c[d];("PICTURE"===f.parentNode.nodeName.toUpperCase()||null!==f.getAttribute("srcset")||f[g.ns]&&null!==f[g.ns].srcset)&&a.push(f)}return a},g.getMatch=function(a,b){for(var c,d=b.childNodes,e=0,f=d.length;f>e;e++){var h=d[e];if(1===h.nodeType){if(h===a)return c;if("SOURCE"===h.nodeName.toUpperCase()){null!==h.getAttribute("src")&&void 0!==typeof console&&console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");var i=h.getAttribute("media");if(h.getAttribute("srcset")&&(!i||g.matchesMedia(i))){var j=g.verifyTypeSupport(h);if(j===!0){c=h;break}if("pending"===j)return!1}}}}return c},f(),e._=g,d(e)}(window,window.document,new window.Image);