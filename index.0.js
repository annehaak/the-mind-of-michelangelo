(function(d) {
    var h = [];
    d.loadImages = function(a, e) {
        "string" == typeof a && (a = [a]);
        for (var f = a.length, g = 0, b = 0; b < f; b++) {
            var c = document.createElement("img");
            c.onload = function() {
                g++;
                g == f && d.isFunction(e) && e()
            };
            c.src = a[b];
            h.push(c)
        }
    }
})(window.jQuery);
$.fn.hasAttr = function(name) {
    var attr = $(this).attr(name);
    return typeof attr !== typeof undefined && attr !== false;
};


$(document).ready(function() {
    r = function() {
        dpi = window.devicePixelRatio;
    };
    if (!window.HTMLPictureElement) {
        r();
    }

});

