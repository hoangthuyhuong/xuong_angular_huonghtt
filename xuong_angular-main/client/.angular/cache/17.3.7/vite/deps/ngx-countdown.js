import {
  NgTemplateOutlet,
  formatDate
} from "./chunk-OJOEFZDN.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  LOCALE_ID,
  NgModule,
  NgZone,
  Optional,
  Output,
  ViewEncapsulation$1,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵinject,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵsanitizeHtml,
  ɵɵtemplate
} from "./chunk-E4LXAG2G.js";
import "./chunk-WSA2QMXP.js";
import {
  __spreadValues
} from "./chunk-WKYGNSYM.js";

// node_modules/ngx-countdown/fesm2022/ngx-countdown.mjs
var _c0 = (a0) => ({
  $implicit: a0
});
function CountdownComponent_Conditional_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function CountdownComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CountdownComponent_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.render)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.i));
  }
}
function CountdownComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ctx_r0.i.text, ɵɵsanitizeHtml);
  }
}
var CountdownStatus;
(function(CountdownStatus2) {
  CountdownStatus2[CountdownStatus2["ing"] = 0] = "ing";
  CountdownStatus2[CountdownStatus2["pause"] = 1] = "pause";
  CountdownStatus2[CountdownStatus2["stop"] = 2] = "stop";
  CountdownStatus2[CountdownStatus2["done"] = 3] = "done";
})(CountdownStatus || (CountdownStatus = {}));
var _CountdownTimer = class _CountdownTimer {
  constructor(ngZone) {
    this.ngZone = ngZone;
    this.fns = [];
    this.commands = [];
    this.nextTime = 0;
    this.ing = false;
  }
  start() {
    if (this.ing === true) {
      return;
    }
    this.ing = true;
    this.nextTime = +/* @__PURE__ */ new Date();
    this.ngZone.runOutsideAngular(() => {
      this.process();
    });
  }
  process() {
    while (this.commands.length) {
      this.commands.shift()();
    }
    let diff = +/* @__PURE__ */ new Date() - this.nextTime;
    const count = 1 + Math.floor(diff / 100);
    diff = 100 - diff % 100;
    this.nextTime += 100 * count;
    for (let i = 0, len = this.fns.length; i < len; i += 2) {
      let frequency = this.fns[i + 1];
      if (0 === frequency) {
        this.fns[i](count);
      } else {
        frequency += 2 * count - 1;
        const step = Math.floor(frequency / 20);
        if (step > 0) {
          this.fns[i](step);
        }
        this.fns[i + 1] = frequency % 20 + 1;
      }
    }
    if (!this.ing) {
      return;
    }
    setTimeout(() => this.process(), diff);
  }
  add(fn, frequency) {
    this.commands.push(() => {
      this.fns.push(fn);
      this.fns.push(frequency === 1e3 ? 1 : 0);
      this.ing = true;
    });
    return this;
  }
  remove(fn) {
    this.commands.push(() => {
      const i = this.fns.indexOf(fn);
      if (i !== -1) {
        this.fns.splice(i, 2);
      }
      this.ing = this.fns.length > 0;
    });
    return this;
  }
};
_CountdownTimer.ɵfac = function CountdownTimer_Factory(t) {
  return new (t || _CountdownTimer)(ɵɵinject(NgZone));
};
_CountdownTimer.ɵprov = ɵɵdefineInjectable({
  token: _CountdownTimer,
  factory: _CountdownTimer.ɵfac
});
var CountdownTimer = _CountdownTimer;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountdownTimer, [{
    type: Injectable
  }], () => [{
    type: NgZone
  }], null);
})();
var COUNTDOWN_CONFIG = new InjectionToken("COUNTDOWN_CONFIG");
function provideCountdown(config) {
  return makeEnvironmentProviders([{
    provide: COUNTDOWN_CONFIG,
    useValue: config
  }]);
}
var _CountdownComponent = class _CountdownComponent {
  set config(i) {
    if (i.notify != null && !Array.isArray(i.notify) && i.notify > 0) {
      i.notify = [i.notify];
    }
    this._config = i;
  }
  get config() {
    return this._config;
  }
  constructor(locale, timer, cdr, ngZone, defCog) {
    this.locale = locale;
    this.timer = timer;
    this.cdr = cdr;
    this.ngZone = ngZone;
    this.defCog = defCog;
    this.frequency = 1e3;
    this._notify = {};
    this.status = CountdownStatus.ing;
    this.isDestroy = false;
    this.i = {};
    this.left = 0;
    this.event = new EventEmitter();
  }
  /**
   * Start countdown, you must manually call when `demand: false`
   */
  begin() {
    this.status = CountdownStatus.ing;
    this.callEvent("start");
  }
  /**
   * Restart countdown
   */
  restart() {
    if (this.status !== CountdownStatus.stop) {
      this.destroy();
    }
    this.init();
    this.callEvent("restart");
  }
  /**
   * Stop countdown, must call `restart` when stopped, it's different from pause, unable to recover
   */
  stop() {
    if (this.status === CountdownStatus.stop) {
      return;
    }
    this.status = CountdownStatus.stop;
    this.destroy();
    this.callEvent("stop");
  }
  /**
   * Pause countdown, you can use `resume` to recover again
   */
  pause() {
    if (this.status === CountdownStatus.stop || this.status === CountdownStatus.pause) {
      return;
    }
    this.status = CountdownStatus.pause;
    this.callEvent("pause");
  }
  /**
   * Resume countdown
   */
  resume() {
    if (this.status === CountdownStatus.stop || this.status !== CountdownStatus.pause) {
      return;
    }
    this.status = CountdownStatus.ing;
    this.callEvent("resume");
  }
  callEvent(action) {
    this.event.emit({
      action,
      left: this.left,
      status: this.status,
      text: this.i.text
    });
  }
  init() {
    const config = this.config = __spreadValues(__spreadValues({
      demand: false,
      leftTime: 0,
      format: "HH:mm:ss",
      timezone: "+0000",
      formatDate: ({
        date,
        formatStr,
        timezone
      }) => {
        return formatDate(new Date(date), formatStr, this.locale, timezone || "+0000");
      }
    }, this.defCog), this.config);
    const frq = this.frequency = ~config.format.indexOf("S") ? 100 : 1e3;
    this.status = config.demand ? CountdownStatus.pause : CountdownStatus.ing;
    this.getLeft();
    const _reflow = this.reflow;
    this.reflow = (count = 0, force = false) => _reflow.apply(this, [count, force]);
    if (Array.isArray(config.notify)) {
      config.notify.forEach((time) => {
        if (time < 1) {
          throw new Error(`The notify config must be a positive integer.`);
        }
        time = time * 1e3;
        time = time - time % frq;
        this._notify[time] = true;
      });
    }
    this.timer.add(this.reflow, frq).start();
    this.reflow(0, true);
  }
  destroy() {
    this.timer.remove(this.reflow);
    return this;
  }
  /**
   * 更新时钟
   */
  reflow(count = 0, force = false) {
    if (this.isDestroy) {
      return;
    }
    const {
      status,
      config,
      _notify
    } = this;
    if (!force && status !== CountdownStatus.ing) {
      return;
    }
    let value = this.left = this.left - this.frequency * count;
    if (value < 1) {
      value = 0;
    }
    this.i = {
      value,
      text: config.formatDate({
        date: value,
        formatStr: config.format,
        timezone: config.timezone
      })
    };
    if (typeof config.prettyText === "function") {
      this.i.text = config.prettyText(this.i.text);
    }
    this.cdr.detectChanges();
    if (config.notify === 0 || _notify[value]) {
      this.ngZone.run(() => {
        this.callEvent("notify");
      });
    }
    if (value === 0) {
      this.ngZone.run(() => {
        this.status = CountdownStatus.done;
        this.destroy();
        this.callEvent("done");
      });
    }
  }
  /**
   * 获取倒计时剩余帧数
   */
  getLeft() {
    const {
      config,
      frequency
    } = this;
    let left = config.leftTime * 1e3;
    const end = config.stopTime;
    if (!left && end) {
      left = end - (/* @__PURE__ */ new Date()).getTime();
    }
    this.left = left - left % frequency;
  }
  ngOnInit() {
    this.init();
    if (!this.config.demand) {
      this.begin();
    }
  }
  ngOnDestroy() {
    this.isDestroy = true;
    this.destroy();
  }
  ngOnChanges(changes) {
    if (!changes.config.firstChange) {
      this.restart();
    }
  }
};
_CountdownComponent.ɵfac = function CountdownComponent_Factory(t) {
  return new (t || _CountdownComponent)(ɵɵdirectiveInject(LOCALE_ID), ɵɵdirectiveInject(CountdownTimer), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(COUNTDOWN_CONFIG, 8));
};
_CountdownComponent.ɵcmp = ɵɵdefineComponent({
  type: _CountdownComponent,
  selectors: [["countdown"]],
  hostVars: 2,
  hostBindings: function CountdownComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("count-down", true);
    }
  },
  inputs: {
    config: "config",
    render: "render"
  },
  outputs: {
    event: "event"
  },
  standalone: true,
  features: [ɵɵProvidersFeature([CountdownTimer]), ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 2,
  vars: 1,
  consts: [[4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "innerHTML"]],
  template: function CountdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, CountdownComponent_Conditional_0_Template, 1, 4, "ng-container")(1, CountdownComponent_Conditional_1_Template, 1, 1);
    }
    if (rf & 2) {
      ɵɵconditional(0, ctx.render ? 0 : 1);
    }
  },
  dependencies: [NgTemplateOutlet],
  styles: [".count-down{font-variant-numeric:tabular-nums}\n"],
  encapsulation: 2,
  changeDetection: 0
});
var CountdownComponent = _CountdownComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountdownComponent, [{
    type: Component,
    args: [{
      selector: "countdown",
      template: `
    @if (render) {
    <ng-container *ngTemplateOutlet="render; context: { $implicit: i }" />
    } @else {
    <span [innerHTML]="i.text"></span>
    }
  `,
      host: {
        "[class.count-down]": "true"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NgTemplateOutlet],
      providers: [CountdownTimer],
      standalone: true,
      styles: [".count-down{font-variant-numeric:tabular-nums}\n"]
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LOCALE_ID]
    }]
  }, {
    type: CountdownTimer
  }, {
    type: ChangeDetectorRef
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [COUNTDOWN_CONFIG]
    }]
  }], {
    config: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    render: [{
      type: Input
    }],
    event: [{
      type: Output
    }]
  });
})();
var _CountdownModule = class _CountdownModule {
};
_CountdownModule.ɵfac = function CountdownModule_Factory(t) {
  return new (t || _CountdownModule)();
};
_CountdownModule.ɵmod = ɵɵdefineNgModule({
  type: _CountdownModule,
  imports: [CountdownComponent],
  exports: [CountdownComponent]
});
_CountdownModule.ɵinj = ɵɵdefineInjector({});
var CountdownModule = _CountdownModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountdownModule, [{
    type: NgModule,
    args: [{
      imports: [CountdownComponent],
      exports: [CountdownComponent]
    }]
  }], null, null);
})();
export {
  COUNTDOWN_CONFIG,
  CountdownComponent,
  CountdownModule,
  CountdownStatus,
  CountdownTimer,
  provideCountdown
};
//# sourceMappingURL=ngx-countdown.js.map
