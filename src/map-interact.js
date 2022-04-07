function isTouchEnabled() {
  return (("ontouchstart" in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}
jQuery(function () {
  jQuery("path[id^=wdctjs]").each(function (i, e) {
    wdctaddEvent( jQuery(e).attr("id"));
  });
});
function wdctaddEvent(id,relationId) {
  var _obj = jQuery("#" + id);
  var arr = id.split("");
  var _Textobj = jQuery("#" + id + "," + "#wdctjsvn" + arr.slice(6).join(""));
  jQuery("#" + ["visnames"]).attr({"fill":wdctjsconfig.general.visibleNames});
  _obj.attr({"fill":wdctjsconfig[id].upColor, "stroke":wdctjsconfig.general.borderColor});
  _Textobj.attr({"cursor": "default"});
  if (wdctjsconfig[id].active === true) {
    _Textobj.attr({"cursor": "pointer"});
    _Textobj.hover(function () {
      jQuery("#wdctjstip").show().html(wdctjsconfig[id].hover);
      _obj.css({"fill":wdctjsconfig[id].overColor});
    }, function () {
      jQuery("#wdctjstip").hide();
      jQuery("#" + id).css({"fill":wdctjsconfig[id].upColor});
    });
    if (wdctjsconfig[id].target !== "none") {
      _Textobj.mousedown(function () {
        jQuery("#" + id).css({"fill":wdctjsconfig[id].downColor});
      });
    }
    _Textobj.mouseup(function () {
      jQuery("#" + id).css({"fill":wdctjsconfig[id].overColor});
      if (wdctjsconfig[id].target === "new_window") {
        window.open(wdctjsconfig[id].url);	
      } else if (wdctjsconfig[id].target === "same_window") {
        window.parent.location.href = wdctjsconfig[id].url;
      } else if (wdctjsconfig[id].target === "modal") {
        jQuery(wdctjsconfig[id].url).modal("show");
      }
    });
    _Textobj.mousemove(function (e) {
      var x = e.pageX + 10, y = e.pageY + 15;
      var tipw =jQuery("#wdctjstip").outerWidth(), tiph =jQuery("#wdctjstip").outerHeight(),
      x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw - (20 * 2) : x ;
      y = (y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() - tiph - 10 : y ;
      jQuery("#wdctjstip").css({left: x, top: y});
    });
    if (isTouchEnabled()) {
      _Textobj.on("touchstart", function (e) {
        var touch = e.originalEvent.touches[0];
        var x = touch.pageX + 10, y = touch.pageY + 15;
        var tipw =jQuery("#wdctjstip").outerWidth(), tiph =jQuery("#wdctjstip").outerHeight(),
        x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw -(20 * 2) : x ;
        y =(y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() -tiph - 10 : y ;
        jQuery("#" + id).css({"fill":wdctjsconfig[id].downColor});
        jQuery("#wdctjstip").show().html(wdctjsconfig[id].hover);
        jQuery("#wdctjstip").css({left: x, top: y});
      });
      _Textobj.on("touchend", function () {
        jQuery("#" + id).css({"fill":wdctjsconfig[id].upColor});
        if (wdctjsconfig[id].target === "new_window") {
          window.open(wdctjsconfig[id].url);
        } else if (wdctjsconfig[id].target === "same_window") {
          window.parent.location.href = wdctjsconfig[id].url;
        } else if (wdctjsconfig[id].target === "modal") {
          jQuery(wdctjsconfig[id].url).modal("show");
        }
      });
    }
	}
}