(window.webpackJsonp = window.webpackJsonp || []).push([[6], {
    110: function(t, s, i) {
        "use strict";
        i.r(s),
        i.d(s, "background", (function() {
            return l
        }
        )),
        i.d(s, "foreground", (function() {
            return h
        }
        ));
        class a {
            constructor() {
                this.compensate = !1,
                this.include = innerHeight,
                this.hack = !window.CSS || !CSS.supports || !CSS.supports("will-change", "transform"),
                this.reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion)").matches
            }
            static settings(t, s) {
                var i = t=>document.querySelectorAll(t);
                switch (typeof t.el) {
                case "string":
                    t.el = i(t.el);
                    break;
                case "object":
                    t.el = t.el;
                    break;
                default:
                    t.el = i(s)
                }
                return NodeList.prototype.isPrototypeOf(t.el) && (t.el = Array.from(t.el)),
                Array.isArray(t.el) || (t.el = [t.el]),
                t
            }
            animate() {
                this.monitor(),
                this.hasChanged() && this.isVisible() && (this.unchange(),
                this.measure(),
                this.update()),
                requestAnimationFrame(()=>{
                    this.animate()
                }
                )
            }
            hasChanged() {
                return this.wtop !== this.pwtop || this.wheight !== this.pwheight || this.top > this.ptop + 1 || this.top < this.ptop - 1 || this.height > this.pheight + 1 || this.height < this.pheight - 1
            }
            unchange() {
                this.pwtop = this.wtop,
                this.pwheight = this.wheight,
                this.ptop = this.top,
                this.pheight = this.height
            }
            monitor() {
                this.wtop = pageYOffset,
                this.wheight = innerHeight,
                this.wbottom = this.wtop + this.wheight,
                this.top = this.el.getBoundingClientRect().top + this.wtop,
                this.height = this.el.offsetHeight,
                this.bottom = this.top + this.height,
                this.middle = this.top + this.height / 2
            }
            measure() {
                var t = this.compensate ? this.wtop / this.wheight : (this.wtop + this.wheight / 2 - this.origin()) / (this.height + this.wheight);
                this.margin = this.boundary < 0 ? Math.abs(this.boundary) : Math.round(this.boundary * (1 - this.height / this.wheight)),
                this.margin += 50,
                this.parallax = parseFloat((this.boundary * t).toFixed(1)),
                this.css.setProperty && this.css.setProperty("--parallax-control", parseFloat(t).toFixed(4))
            }
            isVisible() {
                return this.bottom + this.include > this.wtop && this.top - this.include < this.wbottom
            }
        }
        class e extends a {
            constructor(t, s) {
                super(),
                this.el = t,
                this.init(s)
            }
            init(t) {
                this.reduceMotion || (this.compensate = !("" !== this.el.dataset.parallaxCompensate && !t.compensate),
                this.boundary = isNaN(parseInt(this.el.dataset.parallaxAmount)) ? t.amount || 300 : parseInt(this.el.dataset.parallaxAmount),
                this.boundary && (this.css = this.el.style,
                this.css.display = "inline-block",
                this.css.transition = "initial",
                this.css.willChange = "transform",
                this.css.transform = this.hack ? "translate3d(0,0,0)" : "translateY(0)",
                this.animate()))
            }
            origin() {
                return this.middle - (this.parallax || 0)
            }
            update() {
                this.parallax !== this.pparallax && (this.pparallax = this.parallax,
                this.hack ? this.css.transform = "translate3d(0,".concat(this.parallax, "px,0)") : this.css.transform = "translateY(".concat(this.parallax, "px)"))
            }
        }
        var h = function() {
            for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s = a.settings(t, "[data-parallax]"), i = 0; i < s.el.length; ++i)
                new e(s.el[i],s)
        }
          , r = t=>{
            var s = t.toString()
              , i = s.length
              , a = 0;
            if (0 === i)
                return a;
            for (var e = 0; e < i; e++)
                a = (a << 5) - a + s.charCodeAt(e),
                a |= 0;
            return Math.abs(a).toString()
        }
          , n = [];
        class o extends a {
            constructor(t, s) {
                super(),
                this.wrap = t,
                this.init(s)
            }
            init(t) {
                var s = this.wrap.dataset.parallaxBackground || this.wrap.dataset.parallaxBg
                  , i = getComputedStyle(this.wrap).backgroundImage.replace(/url\("?([^)"]+)"?\)/, "$1");
                this.reduceMotion ? "none" === i && (this.wrap.style.backgroundImage = "url(".concat(s, ")")) : (this.boundary = isNaN(parseInt(this.wrap.dataset.parallaxAmount)) ? t.amount || Math.round(innerHeight / 2) : parseInt(this.wrap.dataset.parallaxAmount),
                this.boundary && (this.el = document.createElement("div"),
                this.img = document.createElement("img"),
                this.img.src = s || t.image || i,
                this.css = this.el.style,
                this.css.backgroundImage = "url(".concat(this.img.src, ")"),
                this.css.position = this.img.style.position = "absolute",
                this.css.top = this.css.left = this.css.right = this.css.bottom = 0,
                this.css.zIndex = -1,
                this.css.backgroundSize = "cover",
                this.css.backgroundPosition = "center center",
                this.css.transition = "initial",
                this.css.willChange = "transform",
                this.css.transform = this.hack ? "translate3d(0,0,0)" : "translateY(0)",
                this.wrap.style.position = "relative",
                this.wrap.style.zIndex = 2,
                this.wrap.style.overflow = "hidden",
                this.wrap.appendChild(this.el),
                this.img.addEventListener("load", ()=>{
                    this.img = null,
                    this.measure(),
                    this.update()
                }
                ),
                window.addEventListener("resize", ()=>{
                    !function(t, s) {
                        for (var i = r(t), a = function() {
                            clearTimeout(n[i]),
                            delete n[i],
                            t(...arguments)
                        }, e = function() {
                            for (var t = arguments.length, e = new Array(t), h = 0; h < t; h++)
                                e[h] = arguments[h];
                            clearTimeout(n[i]),
                            n[i] = setTimeout(()=>a(...e), s)
                        }, h = arguments.length, o = new Array(h > 2 ? h - 2 : 0), l = 2; l < h; l++)
                            o[l - 2] = arguments[l];
                        if (1 === o.length && "prepare" === o[0])
                            return e;
                        e(...o)
                    }(()=>{
                        this.measure(),
                        this.update()
                    }
                    , 256)
                }
                ),
                this.animate()))
            }
            origin() {
                return this.middle
            }
            update() {
                if (this.margin !== this.pmargin) {
                    var t = parseInt(this.css.minHeight)
                      , s = this.wrap.offsetHeight + this.margin;
                    (isNaN(t) || Math.abs(t - s) > 5) && (this.css.minHeight = "".concat(s, "px")),
                    this.pmargin = this.margin
                }
                if (this.parallax !== this.pparallax) {
                    var i = parseFloat((this.parallax - this.margin / 2).toFixed(1));
                    this.pparallax = this.parallax,
                    this.hack ? this.css.transform = "translate3d(0,".concat(i, "px,0)") : this.css.transform = "translateY(".concat(i, "px)")
                }
            }
        }
        var l = function() {
            for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s = a.settings(t, "[data-parallax-background],[data-parallax-bg]"), i = 0; i < s.el.length; ++i)
                new o(s.el[i],s)
        };
        s.default = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            h(t.foreground),
            l(t.background)
        }
    }
}]);
