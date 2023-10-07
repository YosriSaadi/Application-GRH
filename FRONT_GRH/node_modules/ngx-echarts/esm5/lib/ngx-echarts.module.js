import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { NgxEchartsDirective, NGX_ECHARTS_CONFIG } from './ngx-echarts.directive';
import * as ɵngcc0 from '@angular/core';
var NgxEchartsModule = /** @class */ (function () {
    function NgxEchartsModule() {
    }
    NgxEchartsModule_1 = NgxEchartsModule;
    NgxEchartsModule.forRoot = function (config) {
        return {
            ngModule: NgxEchartsModule_1,
            providers: [{ provide: NGX_ECHARTS_CONFIG, useValue: config }],
        };
    };
    NgxEchartsModule.forChild = function () {
        return {
            ngModule: NgxEchartsModule_1,
        };
    };
    var NgxEchartsModule_1;
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
    }], function () { return []; }, null); })();
    return NgxEchartsModule;
}());
export { NgxEchartsModule };
export { NgxEchartsDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVjaGFydHMubW9kdWxlLmpzIiwic291cmNlcyI6WyJuZzovbmd4LWVjaGFydHMvbGliL25neC1lY2hhcnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFvQixrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQU9wRztBQUNvQixJQURwQjtBQUE4QixJQVk5QixDQUFDO0FBQ0QseUJBYmEsZ0JBQWdCO0FBQUUsSUFDdEIsd0JBQU8sR0FBZCxVQUFlLE1BQXdCO0FBQUksUUFDekMsT0FBTztBQUNYLFlBQU0sUUFBUSxFQUFFLGtCQUFnQjtBQUNoQyxZQUFNLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUNwRSxTQUFLLENBQUM7QUFDTixJQUFFLENBQUM7QUFDRixJQUFRLHlCQUFRLEdBQWY7QUFBYyxRQUNaLE9BQU87QUFDWCxZQUFNLFFBQVEsRUFBRSxrQkFBZ0I7QUFDaEMsU0FBSyxDQUFDO0FBQ04sSUFBRSxDQUFDO0FBQ0Y7SUFaWSxnQkFBZ0IsNkNBTDVCLFFBQVEsQ0FBQztXQUNSLE9BQU8sRUFBRSxFQUFFLGNBQ1gsWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUMsY0FDbkMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUMsV0FDL0IsQ0FBQyxRQUNXLGdCQUFnQixDQVk1Qjs7Ozs7Ozs7O2dEQUNEO0FBQ0EsSUFGQSx1QkFBQztBQUVELENBRkMsQUFaRCxJQVlDO0FBQ0QsU0FiYSxnQkFBZ0I7QUFjN0IsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUM7QUFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4RWNoYXJ0c0RpcmVjdGl2ZSwgTmd4RWNoYXJ0c0NvbmZpZywgTkdYX0VDSEFSVFNfQ09ORklHIH0gZnJvbSAnLi9uZ3gtZWNoYXJ0cy5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbTmd4RWNoYXJ0c0RpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtOZ3hFY2hhcnRzRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4RWNoYXJ0c01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogTmd4RWNoYXJ0c0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RWNoYXJ0c01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkdYX0VDSEFSVFNfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH1dLFxuICAgIH07XG4gIH1cbiAgc3RhdGljIGZvckNoaWxkKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RWNoYXJ0c01vZHVsZSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IE5neEVjaGFydHNEaXJlY3RpdmUgfTtcbiJdfQ==