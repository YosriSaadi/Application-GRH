import * as ɵngcc0 from '@angular/core';
var NgxEchartsModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { NgxEchartsDirective, NGX_ECHARTS_CONFIG } from './ngx-echarts.directive';
let NgxEchartsModule = NgxEchartsModule_1 = class NgxEchartsModule {
    static forRoot(config) {
        return {
            ngModule: NgxEchartsModule_1,
            providers: [{ provide: NGX_ECHARTS_CONFIG, useValue: config }],
        };
    }
    static forChild() {
        return {
            ngModule: NgxEchartsModule_1,
        };
    }
};
NgxEchartsModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NgxEchartsModule });
NgxEchartsModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NgxEchartsModule_Factory(t) { return new (t || NgxEchartsModule)(); }, imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NgxEchartsModule, { declarations: function () { return [NgxEchartsDirective]; }, exports: function () { return [NgxEchartsDirective]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxEchartsModule, [{
        type: NgModule,
        args: [{
                imports: [],
                declarations: [NgxEchartsDirective],
                exports: [NgxEchartsDirective]
            }]
    }], null, null); })();
export { NgxEchartsModule };
export { NgxEchartsDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVjaGFydHMubW9kdWxlLmpzIiwic291cmNlcyI6WyJuZzovbmd4LWVjaGFydHMvbGliL25neC1lY2hhcnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQW9CLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFPcEcsSUFBYSxnQkFBZ0Isd0JBQTdCLE1BQWEsZ0JBQWdCO0FBQzdCLElBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUF3QjtBQUFJLFFBQ3pDLE9BQU87QUFDWCxZQUFNLFFBQVEsRUFBRSxrQkFBZ0I7QUFDaEMsWUFBTSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDcEUsU0FBSyxDQUFDO0FBQ04sSUFBRSxDQUFDO0FBQ0gsSUFBRSxNQUFNLENBQUMsUUFBUTtBQUNqQixRQUFJLE9BQU87QUFDWCxZQUFNLFFBQVEsRUFBRSxrQkFBZ0I7QUFDaEMsU0FBSyxDQUFDO0FBQ04sSUFBRSxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBWlksZ0JBQWdCLHlDQUw1QixRQUFRLENBQUMsVUFDUjtNQUFPLEVBQUUsRUFBRSxVQUNYLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDLFVBQ25DLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDLE9BQy9CLENBQUMsSUFDVyxnQkFBZ0IsQ0FZNUI7Ozs7Ozs7OzswQkFDRDtBQUNBLFNBZGEsZ0JBQWdCO0FBYzdCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDO0FBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neEVjaGFydHNEaXJlY3RpdmUsIE5neEVjaGFydHNDb25maWcsIE5HWF9FQ0hBUlRTX0NPTkZJRyB9IGZyb20gJy4vbmd4LWVjaGFydHMuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIGRlY2xhcmF0aW9uczogW05neEVjaGFydHNEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTmd4RWNoYXJ0c0RpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5neEVjaGFydHNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IE5neEVjaGFydHNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neEVjaGFydHNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5HWF9FQ0hBUlRTX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9XSxcbiAgICB9O1xuICB9XG4gIHN0YXRpYyBmb3JDaGlsZCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neEVjaGFydHNNb2R1bGUsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBOZ3hFY2hhcnRzRGlyZWN0aXZlIH07XG4iXX0=