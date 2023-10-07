import { __decorate, __param } from "tslib";
import { AfterViewInit, Directive, DoCheck, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, InjectionToken, Inject, } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ChangeFilter } from './change-filter';
import * as ɵngcc0 from '@angular/core';
export var NGX_ECHARTS_CONFIG = new InjectionToken('NGX_ECHARTS_CONFIG');
var NgxEchartsDirective = /** @class */ (function () {
    function NgxEchartsDirective(config, el, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.autoResize = true;
        this.loadingType = 'default';
        // ngx-echarts events
        this.chartInit = new EventEmitter();
        // echarts mouse events
        this.chartClick = this.createLazyEvent('click');
        this.chartDblClick = this.createLazyEvent('dblclick');
        this.chartMouseDown = this.createLazyEvent('mousedown');
        this.chartMouseMove = this.createLazyEvent('mousemove');
        this.chartMouseUp = this.createLazyEvent('mouseup');
        this.chartMouseOver = this.createLazyEvent('mouseover');
        this.chartMouseOut = this.createLazyEvent('mouseout');
        this.chartGlobalOut = this.createLazyEvent('globalout');
        this.chartContextMenu = this.createLazyEvent('contextmenu');
        // echarts mouse events
        this.chartLegendSelectChanged = this.createLazyEvent('legendselectchanged');
        this.chartLegendSelected = this.createLazyEvent('legendselected');
        this.chartLegendUnselected = this.createLazyEvent('legendunselected');
        this.chartLegendScroll = this.createLazyEvent('legendscroll');
        this.chartDataZoom = this.createLazyEvent('datazoom');
        this.chartDataRangeSelected = this.createLazyEvent('datarangeselected');
        this.chartTimelineChanged = this.createLazyEvent('timelinechanged');
        this.chartTimelinePlayChanged = this.createLazyEvent('timelineplaychanged');
        this.chartRestore = this.createLazyEvent('restore');
        this.chartDataViewChanged = this.createLazyEvent('dataviewchanged');
        this.chartMagicTypeChanged = this.createLazyEvent('magictypechanged');
        this.chartPieSelectChanged = this.createLazyEvent('pieselectchanged');
        this.chartPieSelected = this.createLazyEvent('pieselected');
        this.chartPieUnselected = this.createLazyEvent('pieunselected');
        this.chartMapSelectChanged = this.createLazyEvent('mapselectchanged');
        this.chartMapSelected = this.createLazyEvent('mapselected');
        this.chartMapUnselected = this.createLazyEvent('mapunselected');
        this.chartAxisAreaSelected = this.createLazyEvent('axisareaselected');
        this.chartFocusNodeAdjacency = this.createLazyEvent('focusnodeadjacency');
        this.chartUnfocusNodeAdjacency = this.createLazyEvent('unfocusnodeadjacency');
        this.chartBrush = this.createLazyEvent('brush');
        this.chartBrushSelected = this.createLazyEvent('brushselected');
        this.chartRendered = this.createLazyEvent('rendered');
        this.chartFinished = this.createLazyEvent('finished');
        this.currentOffsetWidth = 0;
        this.currentOffsetHeight = 0;
        this.echarts = config.echarts;
    }
    NgxEchartsDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var filter = ChangeFilter.of(changes);
        filter.notFirstAndEmpty('options').subscribe(function (opt) { return _this.onOptionsChange(opt); });
        filter.notFirstAndEmpty('merge').subscribe(function (opt) { return _this.setOption(opt); });
        filter.has('loading').subscribe(function (v) { return _this.toggleLoading(!!v); });
        filter.notFirst('theme').subscribe(function () { return _this.refreshChart(); });
    };
    NgxEchartsDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.resizeSub = fromEvent(window, 'resize')
            .pipe(debounceTime(50))
            .subscribe(function () {
            if (_this.autoResize && window.innerWidth !== _this.currentWindowWidth) {
                _this.currentWindowWidth = window.innerWidth;
                _this.currentOffsetWidth = _this.el.nativeElement.offsetWidth;
                _this.currentOffsetHeight = _this.el.nativeElement.offsetHeight;
                _this.resize();
            }
        });
    };
    NgxEchartsDirective.prototype.ngOnDestroy = function () {
        if (this.resizeSub) {
            this.resizeSub.unsubscribe();
        }
        this.dispose();
    };
    NgxEchartsDirective.prototype.ngDoCheck = function () {
        // No heavy work in DoCheck!
        if (this.chart && this.autoResize) {
            var offsetWidth = this.el.nativeElement.offsetWidth;
            var offsetHeight = this.el.nativeElement.offsetHeight;
            if (this.currentOffsetWidth !== offsetWidth || this.currentOffsetHeight !== offsetHeight) {
                this.currentOffsetWidth = offsetWidth;
                this.currentOffsetHeight = offsetHeight;
                this.resize();
            }
        }
    };
    NgxEchartsDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.initChart(); });
    };
    NgxEchartsDirective.prototype.dispose = function () {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    };
    NgxEchartsDirective.prototype.resize = function () {
        if (this.chart) {
            this.chart.resize();
        }
    };
    NgxEchartsDirective.prototype.toggleLoading = function (loading) {
        if (this.chart) {
            loading
                ? this.chart.showLoading(this.loadingType, this.loadingOpts)
                : this.chart.hideLoading();
        }
    };
    NgxEchartsDirective.prototype.setOption = function (option, opts) {
        if (this.chart) {
            this.chart.setOption(option, opts);
        }
    };
    NgxEchartsDirective.prototype.refreshChart = function () {
        this.dispose();
        this.initChart();
    };
    NgxEchartsDirective.prototype.createChart = function () {
        var _this = this;
        this.currentWindowWidth = window.innerWidth;
        this.currentOffsetWidth = this.el.nativeElement.offsetWidth;
        this.currentOffsetHeight = this.el.nativeElement.offsetHeight;
        var dom = this.el.nativeElement;
        if (window && window.getComputedStyle) {
            var prop = window.getComputedStyle(dom, null).getPropertyValue('height');
            if ((!prop || prop === '0px') && (!dom.style.height || dom.style.height === '0px')) {
                dom.style.height = '400px';
            }
        }
        return this.ngZone.runOutsideAngular(function () { return _this.echarts.init(dom, _this.theme, _this.initOpts); });
    };
    NgxEchartsDirective.prototype.initChart = function () {
        this.onOptionsChange(this.options);
        if (this.merge && this.chart) {
            this.setOption(this.merge);
        }
    };
    NgxEchartsDirective.prototype.onOptionsChange = function (opt) {
        if (opt) {
            if (!this.chart) {
                this.chart = this.createChart();
                this.chartInit.emit(this.chart);
            }
            this.chart.setOption(this.options, true);
        }
    };
    // allows to lazily bind to only those events that are requested through the `@Output` by parent components
    // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
    NgxEchartsDirective.prototype.createLazyEvent = function (eventName) {
        var _this = this;
        return this.chartInit.pipe(switchMap(function (chart) {
            return new Observable(function (observer) {
                chart.on(eventName, function (data) { return _this.ngZone.run(function () { return observer.next(data); }); });
                return function () { return chart.off(eventName); };
            });
        }));
    };
    NgxEchartsDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NGX_ECHARTS_CONFIG,] }] },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "options", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "theme", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "loading", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "initOpts", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "merge", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "autoResize", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "loadingType", void 0);
    __decorate([
        Input()
    ], NgxEchartsDirective.prototype, "loadingOpts", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartInit", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartClick", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartDblClick", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseDown", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseMove", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseUp", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseOver", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMouseOut", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartGlobalOut", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartContextMenu", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartLegendSelectChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartLegendSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartLegendUnselected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartLegendScroll", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartDataZoom", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartDataRangeSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartTimelineChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartTimelinePlayChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartRestore", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartDataViewChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMagicTypeChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartPieSelectChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartPieSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartPieUnselected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMapSelectChanged", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMapSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartMapUnselected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartAxisAreaSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartFocusNodeAdjacency", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartUnfocusNodeAdjacency", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartBrush", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartBrushSelected", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartRendered", void 0);
    __decorate([
        Output()
    ], NgxEchartsDirective.prototype, "chartFinished", void 0);
    NgxEchartsDirective = __decorate([ __param(0, Inject(NGX_ECHARTS_CONFIG))
    ], NgxEchartsDirective);
NgxEchartsDirective.ɵfac = function NgxEchartsDirective_Factory(t) { return new (t || NgxEchartsDirective)(ɵngcc0.ɵɵdirectiveInject(NGX_ECHARTS_CONFIG), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
NgxEchartsDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NgxEchartsDirective, selectors: [["echarts"], ["", "echarts", ""]], inputs: { autoResize: "autoResize", loadingType: "loadingType", options: "options", theme: "theme", loading: "loading", initOpts: "initOpts", merge: "merge", loadingOpts: "loadingOpts" }, outputs: { chartInit: "chartInit", chartClick: "chartClick", chartDblClick: "chartDblClick", chartMouseDown: "chartMouseDown", chartMouseMove: "chartMouseMove", chartMouseUp: "chartMouseUp", chartMouseOver: "chartMouseOver", chartMouseOut: "chartMouseOut", chartGlobalOut: "chartGlobalOut", chartContextMenu: "chartContextMenu", chartLegendSelectChanged: "chartLegendSelectChanged", chartLegendSelected: "chartLegendSelected", chartLegendUnselected: "chartLegendUnselected", chartLegendScroll: "chartLegendScroll", chartDataZoom: "chartDataZoom", chartDataRangeSelected: "chartDataRangeSelected", chartTimelineChanged: "chartTimelineChanged", chartTimelinePlayChanged: "chartTimelinePlayChanged", chartRestore: "chartRestore", chartDataViewChanged: "chartDataViewChanged", chartMagicTypeChanged: "chartMagicTypeChanged", chartPieSelectChanged: "chartPieSelectChanged", chartPieSelected: "chartPieSelected", chartPieUnselected: "chartPieUnselected", chartMapSelectChanged: "chartMapSelectChanged", chartMapSelected: "chartMapSelected", chartMapUnselected: "chartMapUnselected", chartAxisAreaSelected: "chartAxisAreaSelected", chartFocusNodeAdjacency: "chartFocusNodeAdjacency", chartUnfocusNodeAdjacency: "chartUnfocusNodeAdjacency", chartBrush: "chartBrush", chartBrushSelected: "chartBrushSelected", chartRendered: "chartRendered", chartFinished: "chartFinished" }, exportAs: ["echarts"], features: [ɵngcc0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxEchartsDirective, [{
        type: Directive,
        args: [{
                selector: 'echarts, [echarts]',
                exportAs: 'echarts'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [NGX_ECHARTS_CONFIG]
            }] }, { type: ɵngcc0.ElementRef }, { type: ɵngcc0.NgZone }]; }, { autoResize: [{
            type: Input
        }], loadingType: [{
            type: Input
        }], chartInit: [{
            type: Output
        }], chartClick: [{
            type: Output
        }], chartDblClick: [{
            type: Output
        }], chartMouseDown: [{
            type: Output
        }], chartMouseMove: [{
            type: Output
        }], chartMouseUp: [{
            type: Output
        }], chartMouseOver: [{
            type: Output
        }], chartMouseOut: [{
            type: Output
        }], chartGlobalOut: [{
            type: Output
        }], chartContextMenu: [{
            type: Output
        }], chartLegendSelectChanged: [{
            type: Output
        }], chartLegendSelected: [{
            type: Output
        }], chartLegendUnselected: [{
            type: Output
        }], chartLegendScroll: [{
            type: Output
        }], chartDataZoom: [{
            type: Output
        }], chartDataRangeSelected: [{
            type: Output
        }], chartTimelineChanged: [{
            type: Output
        }], chartTimelinePlayChanged: [{
            type: Output
        }], chartRestore: [{
            type: Output
        }], chartDataViewChanged: [{
            type: Output
        }], chartMagicTypeChanged: [{
            type: Output
        }], chartPieSelectChanged: [{
            type: Output
        }], chartPieSelected: [{
            type: Output
        }], chartPieUnselected: [{
            type: Output
        }], chartMapSelectChanged: [{
            type: Output
        }], chartMapSelected: [{
            type: Output
        }], chartMapUnselected: [{
            type: Output
        }], chartAxisAreaSelected: [{
            type: Output
        }], chartFocusNodeAdjacency: [{
            type: Output
        }], chartUnfocusNodeAdjacency: [{
            type: Output
        }], chartBrush: [{
            type: Output
        }], chartBrushSelected: [{
            type: Output
        }], chartRendered: [{
            type: Output
        }], chartFinished: [{
            type: Output
        }], options: [{
            type: Input
        }], theme: [{
            type: Input
        }], loading: [{
            type: Input
        }], initOpts: [{
            type: Input
        }], merge: [{
            type: Input
        }], loadingOpts: [{
            type: Input
        }] }); })();
    return NgxEchartsDirective;
}());
export { NgxEchartsDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVjaGFydHMuZGlyZWN0aXZlLmpzIiwic291cmNlcyI6WyJuZzovbmd4LWVjaGFydHMvbGliL25neC1lY2hhcnRzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsT0FBTyxFQUNQLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLGNBQWMsRUFDZCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUsvQyxNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLGNBQWMsQ0FBbUIsb0JBQW9CLENBQUMsQ0FBQztBQU03RjtBQUF1RCxJQThEckQsNkJBQzhCLE1BQXdCLEVBQzVDLEVBQWMsRUFDZCxNQUFjO0FBQ3hCLFFBRlUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtBQUFDLFFBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtBQUFDLFFBdERoQixlQUFVLEdBQUcsSUFBSSxDQUFDO0FBQzdCLFFBQVcsZ0JBQVcsR0FBRyxTQUFTLENBQUM7QUFDbkMsUUFFRSxxQkFBcUI7QUFDdkIsUUFBWSxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztBQUNoRCxRQUNFLHVCQUF1QjtBQUN6QixRQUFZLGVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZELFFBQVksa0JBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzdELFFBQVksbUJBQWMs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O0FBQUMsc0VBQWlFO0FBQzVFLElBQVc7QUFBYSxRQUF0QixNQUFNLEVBQUU7QUFBQyxpRUFBdUQ7QUFDbEUsSUFBVztBQUFhLFFBQXRCLE1BQU0sRUFBRTtBQUFDLG1FQUEyRDtBQUN0RSxJQUFXO0FBQWEsUUFBdEIsTUFBTSxFQUFFO0FBQUMsc0VBQWlFO0FBQzVFLElBQVc7QUFBYSxRQUF0QixNQUFNLEVBQUU7QUFBQyx3RUFBcUU7QUFDaEYsSUFBVztBQUFhLFFBQXRCLE1BQU0sRUFBRTtBQUFDLDBFQUF5RTtBQUNwRixJQUFXO0FBQWEsUUFBdEIsTUFBTSxFQUFFO0FBQUMsMkRBQTJDO0FBQ3RELElBQVc7QUFBYSxRQUF0QixNQUFNLEVBQUU7QUFBQyxtRUFBMkQ7QUFDdEUsSUFBVztBQUFhLFFBQXRCLE1BQU0sRUFBRTtBQUFDLDhEQUFpRDtBQUM1RCxJQUFXO0FBQWEsUUFBdEIsTUFBTSxFQUFFO0FBQUMsOERBQWlEO0FBRTdELElBdkRhLG1CQUFtQix3QkFKL0IsU0FBUyxDQUFDLGNBQ1QsakNBR00sQ0ErREgsV0FBQSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtDQWxFckIsRUFBRSxvQkFBb0IsdkJBa0VBLE9BL0RuQixtQkFBbUIsQ0FvTS9CO1FBdE1DLFFBQVEsRUFBRSxTQUFTLFdBQ3BCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQXNNRjtBQUFDLElBREQsMEJBQUM7QUFDQSxDQURBLEFBcE1ELElBb01DO0FBQ0QsU0FyTWEsbUJBQW1CO0FBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoYW5nZUZpbHRlciB9IGZyb20gJy4vY2hhbmdlLWZpbHRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmd4RWNoYXJ0c0NvbmZpZyB7XG4gIGVjaGFydHM6IGFueTtcbn1cbmV4cG9ydCBjb25zdCBOR1hfRUNIQVJUU19DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48Tmd4RWNoYXJ0c0NvbmZpZz4oJ05HWF9FQ0hBUlRTX0NPTkZJRycpO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdlY2hhcnRzLCBbZWNoYXJ0c10nLFxuICBleHBvcnRBczogJ2VjaGFydHMnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hFY2hhcnRzRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbjtcbiAgQElucHV0KCkgaW5pdE9wdHM6IHtcbiAgICBkZXZpY2VQaXhlbFJhdGlvPzogbnVtYmVyO1xuICAgIHJlbmRlcmVyPzogc3RyaW5nO1xuICAgIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xuICAgIGhlaWdodD86IG51bWJlciB8IHN0cmluZztcbiAgfTtcbiAgQElucHV0KCkgbWVyZ2U6IGFueTtcbiAgQElucHV0KCkgYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIEBJbnB1dCgpIGxvYWRpbmdUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBsb2FkaW5nT3B0czogb2JqZWN0O1xuXG4gIC8vIG5neC1lY2hhcnRzIGV2ZW50c1xuICBAT3V0cHV0KCkgY2hhcnRJbml0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLy8gZWNoYXJ0cyBtb3VzZSBldmVudHNcbiAgQE91dHB1dCgpIGNoYXJ0Q2xpY2sgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY2xpY2snKTtcbiAgQE91dHB1dCgpIGNoYXJ0RGJsQ2xpY2sgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGJsY2xpY2snKTtcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VEb3duID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlZG93bicpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU1vdmUgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2Vtb3ZlJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlVXAgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2V1cCcpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU92ZXIgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbW91c2VvdmVyJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlT3V0ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlb3V0Jyk7XG4gIEBPdXRwdXQoKSBjaGFydEdsb2JhbE91dCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdnbG9iYWxvdXQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0Q29udGV4dE1lbnUgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY29udGV4dG1lbnUnKTtcblxuICAvLyBlY2hhcnRzIG1vdXNlIGV2ZW50c1xuICBAT3V0cHV0KCkgY2hhcnRMZWdlbmRTZWxlY3RDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xlZ2VuZHNlbGVjdGNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kVW5zZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmR1bnNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydExlZ2VuZFNjcm9sbCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmRzY3JvbGwnKTtcbiAgQE91dHB1dCgpIGNoYXJ0RGF0YVpvb20gPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXpvb20nKTtcbiAgQE91dHB1dCgpIGNoYXJ0RGF0YVJhbmdlU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXJhbmdlc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0VGltZWxpbmVDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWVsaW5lY2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRUaW1lbGluZVBsYXlDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWVsaW5lcGxheWNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UmVzdG9yZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdyZXN0b3JlJyk7XG4gIEBPdXRwdXQoKSBjaGFydERhdGFWaWV3Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdkYXRhdmlld2NoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TWFnaWNUeXBlQ2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYWdpY3R5cGVjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydFBpZVNlbGVjdENoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGllc2VsZWN0Y2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRQaWVTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwaWVzZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRQaWVVbnNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BpZXVuc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TWFwU2VsZWN0Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYXBzZWxlY3RjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hcFNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21hcHNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hcFVuc2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFwdW5zZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRBeGlzQXJlYVNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2F4aXNhcmVhc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0Rm9jdXNOb2RlQWRqYWNlbmN5ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2ZvY3Vzbm9kZWFkamFjZW5jeScpO1xuICBAT3V0cHV0KCkgY2hhcnRVbmZvY3VzTm9kZUFkamFjZW5jeSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd1bmZvY3Vzbm9kZWFkamFjZW5jeScpO1xuICBAT3V0cHV0KCkgY2hhcnRCcnVzaCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdicnVzaCcpO1xuICBAT3V0cHV0KCkgY2hhcnRCcnVzaFNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2JydXNoc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UmVuZGVyZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmVuZGVyZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0RmluaXNoZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZmluaXNoZWQnKTtcblxuICBwcml2YXRlIGNoYXJ0OiBhbnk7XG4gIHByaXZhdGUgZWNoYXJ0czogYW55O1xuICBwcml2YXRlIGN1cnJlbnRPZmZzZXRXaWR0aCA9IDA7XG4gIHByaXZhdGUgY3VycmVudE9mZnNldEhlaWdodCA9IDA7XG4gIHByaXZhdGUgY3VycmVudFdpbmRvd1dpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgcmVzaXplU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOR1hfRUNIQVJUU19DT05GSUcpIGNvbmZpZzogTmd4RWNoYXJ0c0NvbmZpZyxcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICkge1xuICAgIHRoaXMuZWNoYXJ0cyA9IGNvbmZpZy5lY2hhcnRzO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGZpbHRlciA9IENoYW5nZUZpbHRlci5vZihjaGFuZ2VzKTtcbiAgICBmaWx0ZXIubm90Rmlyc3RBbmRFbXB0eTxhbnk+KCdvcHRpb25zJykuc3Vic2NyaWJlKChvcHQpID0+IHRoaXMub25PcHRpb25zQ2hhbmdlKG9wdCkpO1xuICAgIGZpbHRlci5ub3RGaXJzdEFuZEVtcHR5PGFueT4oJ21lcmdlJykuc3Vic2NyaWJlKChvcHQpID0+IHRoaXMuc2V0T3B0aW9uKG9wdCkpO1xuICAgIGZpbHRlci5oYXM8Ym9vbGVhbj4oJ2xvYWRpbmcnKS5zdWJzY3JpYmUoKHYpID0+IHRoaXMudG9nZ2xlTG9hZGluZyghIXYpKTtcbiAgICBmaWx0ZXIubm90Rmlyc3Q8c3RyaW5nPigndGhlbWUnKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoQ2hhcnQoKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlc2l6ZVN1YiA9IGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKVxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdXRvUmVzaXplICYmIHdpbmRvdy5pbm5lcldpZHRoICE9PSB0aGlzLmN1cnJlbnRXaW5kb3dXaWR0aCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgdGhpcy5jdXJyZW50T2Zmc2V0V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgdGhpcy5jdXJyZW50T2Zmc2V0SGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnJlc2l6ZVN1Yikge1xuICAgICAgdGhpcy5yZXNpemVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwb3NlKCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgLy8gTm8gaGVhdnkgd29yayBpbiBEb0NoZWNrIVxuICAgIGlmICh0aGlzLmNoYXJ0ICYmIHRoaXMuYXV0b1Jlc2l6ZSkge1xuICAgICAgY29uc3Qgb2Zmc2V0V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICBjb25zdCBvZmZzZXRIZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T2Zmc2V0V2lkdGggIT09IG9mZnNldFdpZHRoIHx8IHRoaXMuY3VycmVudE9mZnNldEhlaWdodCAhPT0gb2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY3VycmVudE9mZnNldFdpZHRoID0gb2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuY3VycmVudE9mZnNldEhlaWdodCA9IG9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmluaXRDaGFydCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzcG9zZSgpIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydC5kaXNwb3NlKCk7XG4gICAgICB0aGlzLmNoYXJ0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZSgpIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydC5yZXNpemUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZUxvYWRpbmcobG9hZGluZzogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICBsb2FkaW5nXG4gICAgICAgID8gdGhpcy5jaGFydC5zaG93TG9hZGluZyh0aGlzLmxvYWRpbmdUeXBlLCB0aGlzLmxvYWRpbmdPcHRzKVxuICAgICAgICA6IHRoaXMuY2hhcnQuaGlkZUxvYWRpbmcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbihvcHRpb246IGFueSwgb3B0cz86IGFueSkge1xuICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICB0aGlzLmNoYXJ0LnNldE9wdGlvbihvcHRpb24sIG9wdHMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaENoYXJ0KCkge1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIHRoaXMuaW5pdENoYXJ0KCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNoYXJ0KCkge1xuICAgIHRoaXMuY3VycmVudFdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5jdXJyZW50T2Zmc2V0V2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5jdXJyZW50T2Zmc2V0SGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBkb20gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAod2luZG93ICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICBjb25zdCBwcm9wID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9tLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKTtcbiAgICAgIGlmICgoIXByb3AgfHwgcHJvcCA9PT0gJzBweCcpICYmICghZG9tLnN0eWxlLmhlaWdodCB8fCBkb20uc3R5bGUuaGVpZ2h0ID09PSAnMHB4JykpIHtcbiAgICAgICAgZG9tLnN0eWxlLmhlaWdodCA9ICc0MDBweCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuZWNoYXJ0cy5pbml0KGRvbSwgdGhpcy50aGVtZSwgdGhpcy5pbml0T3B0cykpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0Q2hhcnQoKSB7XG4gICAgdGhpcy5vbk9wdGlvbnNDaGFuZ2UodGhpcy5vcHRpb25zKTtcblxuICAgIGlmICh0aGlzLm1lcmdlICYmIHRoaXMuY2hhcnQpIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9uKHRoaXMubWVyZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25PcHRpb25zQ2hhbmdlKG9wdDogYW55KSB7XG4gICAgaWYgKG9wdCkge1xuICAgICAgaWYgKCF0aGlzLmNoYXJ0KSB7XG4gICAgICAgIHRoaXMuY2hhcnQgPSB0aGlzLmNyZWF0ZUNoYXJ0KCk7XG4gICAgICAgIHRoaXMuY2hhcnRJbml0LmVtaXQodGhpcy5jaGFydCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2hhcnQuc2V0T3B0aW9uKHRoaXMub3B0aW9ucywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYWxsb3dzIHRvIGxhemlseSBiaW5kIHRvIG9ubHkgdGhvc2UgZXZlbnRzIHRoYXQgYXJlIHJlcXVlc3RlZCB0aHJvdWdoIHRoZSBgQE91dHB1dGAgYnkgcGFyZW50IGNvbXBvbmVudHNcbiAgLy8gc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUxNzg3OTcyL29wdGltYWwtcmVlbnRlcmluZy10aGUtbmd6b25lLWZyb20tZXZlbnRlbWl0dGVyLWV2ZW50IGZvciBtb3JlIGluZm9cbiAgcHJpdmF0ZSBjcmVhdGVMYXp5RXZlbnQ8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8VD4ge1xuICAgIHJldHVybiB0aGlzLmNoYXJ0SW5pdC5waXBlKFxuICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAoY2hhcnQ6IGFueSkgPT5cbiAgICAgICAgICBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGNoYXJ0Lm9uKGV2ZW50TmFtZSwgKGRhdGE6IFQpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGRhdGEpKSk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gY2hhcnQub2ZmKGV2ZW50TmFtZSk7XG4gICAgICAgICAgfSksXG4gICAgICApLFxuICAgICkgYXMgRXZlbnRFbWl0dGVyPFQ+O1xuICB9XG59XG4iXX0=