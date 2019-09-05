(function ($) {
    var ModuleName = 'banner';

    var Module = function (ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.$btn = $(`<div class=` + options.button.class + `>` + options.button.closeText + `</div>`);
        this.option = options;
        this.transTime = 600;
        this.timer;
    };

    Module.DEFAULT = {
        openAtStart: true,
        autoToggle: false,
        transition: true,
        button: {
            closeText: '收合', // [string]
            openText: '展開', // [string]
            class: 'btnn', // [string]
        },
        class: {
            closed: 'closed',
            closing: 'closing',
            opened: 'opened',
            opening: 'opening',
        },
        // 當有transition時，要執行的callback function
        whenTransition: function whenTransition() {
            console.log('whenTransition');
        },
    }

    Module.prototype.toggle = function () {
        if (this.$ele.hasClass(this.option.class.opened)) {
            this.close();
        } else if (this.$ele.hasClass(this.option.class.closed)) {
            this.open();
        }
    }
    Module.prototype.close = function () {
        var opts = this.option, timer;
        this.$btn.text(opts.button.openText);
        if (opts.transition && this.$ele.hasClass(opts.class.opened)) {
            this.whenTrans();
            timer = this.timer;
            this.$ele.addClass('transition').removeClass(opts.class.opened).addClass(opts.class.closing);
            this.$ele.on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
                function () {
                    $(this).removeClass(opts.class.closing).removeClass(opts.class.opened).addClass(opts.class.closed);
                    Module.prototype.clearTimer(timer);
                }
            );
        } else {
            this.$ele.removeClass(opts.class.opened).addClass(opts.class.closed);
        }
    }
    Module.prototype.open = function () {
        var opts = this.option, timer;
        this.$btn.text(opts.button.closeText);
        if (opts.transition && this.$ele.hasClass(opts.class.closed)) {
            this.whenTrans();
            timer = this.timer;
            this.$ele.addClass('transition').removeClass(opts.class.closed).addClass(opts.class.opening);
            this.$ele.on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
                function () {
                    $(this).removeClass(opts.class.opening).removeClass(opts.class.closed).addClass(opts.class.opened);
                    Module.prototype.clearTimer(timer);
                });
        } else {
            this.$ele.removeClass(opts.class.closed).addClass(opts.class.opened);
        }
    }

    Module.prototype.whenTrans = function () {
        this.timer = setInterval(this.option.whenTransition, this.transTime / 30);
        return this.timer;
    }

    Module.prototype.clearTimer = function (timer) {
        clearInterval(timer);
        clearTimeout(timer);
    }

    Module.prototype.openAtStart = function () {
        if (this.option.openAtStart) {
            this.$ele.removeClass(this.option.class.closed).addClass(this.option.class.opened);
        } else {
            this.$ele.removeClass(this.option.class.opened).addClass(this.option.class.closed);
            this.$btn.text(this.option.button.openText);
        }
    }

    Module.prototype.autoToggle = function () {
        var $this = this;
        if (typeof this.option.autoToggle === "boolean") {
            this.option.autoToggle ? this.$ele.removeClass(this.option.class.opened).addClass(this.option.class.closed) : '';
        } else if (typeof this.option.autoToggle === "number") {
            setTimeout(
                function () {
                    $this.toggle();
                }, this.option.autoToggle);
        }
    }

    Module.prototype.init = function () {
        this.$ele.append(this.$btn);
    }

    $.fn[ModuleName] = function (options) {
        return this.each(function () {
            var $this = $(this);
            var module = $this.data(ModuleName);
            var opts = null;

            if (!!module) {
                if (typeof options === 'string') {
                    module[options]();
                } else {
                    console.log('unsupported options!');
                    throw 'unsupported options!';
                }
            } else {
                opts = $.extend({}, Module.DEFAULT, typeof options === 'object' && options);
                module = new Module(this, opts);
                $this.data(ModuleName, module);
                module.init();

                module.$btn.on('click', function () {
                    module.toggle();
                });

                module.autoToggle();
                module.openAtStart();
            }
        });
    };
})(jQuery);