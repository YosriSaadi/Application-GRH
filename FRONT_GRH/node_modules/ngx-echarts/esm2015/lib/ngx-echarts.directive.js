import { __decorate, __param } from "tslib";
import { AfterViewInit, Directive, DoCheck, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, InjectionToken, Inject, } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ChangeFilter } from './change-filter';
import * as ɵngcc0 from '@angular/core';
export const NGX_ECHARTS_CONFIG = new InjectionToken('NGX_ECHARTS_CONFIG');
let NgxEchartsDirective = class NgxEchartsDirective {
    constructor(config, el, ngZone) {
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
    ngOnChanges(changes) {
        const filter = ChangeFilter.of(changes);
        filter.notFirstAndEmpty('options').subscribe((opt) => this.onOptionsChange(opt));
        filter.notFirstAndEmpty('merge').subscribe((opt) => this.setOption(opt));
        filter.has('loading').subscribe((v) => this.toggleLoading(!!v));
        filter.notFirst('theme').subscribe(() => this.refreshChart());
    }
    ngOnInit() {
        this.resizeSub = fromEvent(window, 'resize')
            .pipe(debounceTime(50))
            .subscribe(() => {
            if (this.autoResize && window.innerWidth !== this.currentWindowWidth) {
                this.currentWindowWidth = window.innerWidth;
                this.currentOffsetWidth = this.el.nativeElement.offsetWidth;
                this.currentOffsetHeight = this.el.nativeElement.offsetHeight;
                this.resize();
            }
        });
    }
    ngOnDestroy() {
        if (this.resizeSub) {
            this.resizeSub.unsubscribe();
        }
        this.dispose();
    }
    ngDoCheck() {
        // No heavy work in DoCheck!
        if (this.chart && this.autoResize) {
            const offsetWidth = this.el.nativeElement.offsetWidth;
            const offsetHeight = this.el.nativeElement.offsetHeight;
            if (this.currentOffsetWidth !== offsetWidth || this.currentOffsetHeight !== offsetHeight) {
                this.currentOffsetWidth = offsetWidth;
                this.currentOffsetHeight = offsetHeight;
                this.resize();
            }
        }
    }
    ngAfterViewInit() {
        setTimeout(() => this.initChart());
    }
    dispose() {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
    resize() {
        if (this.chart) {
            this.chart.resize();
        }
    }
    toggleLoading(loading) {
        if (this.chart) {
            loading
                ? this.chart.showLoading(this.loadingType, this.loadingOpts)
                : this.chart.hideLoading();
        }
    }
    setOption(option, opts) {
        if (this.chart) {
            this.chart.setOption(option, opts);
        }
    }
    refreshChart() {
        this.dispose();
        this.initChart();
    }
    createChart() {
        this.currentWindowWidth = window.innerWidth;
        this.currentOffsetWidth = this.el.nativeElement.offsetWidth;
        this.currentOffsetHeight = this.el.nativeElement.offsetHeight;
        const dom = this.el.nativeElement;
        if (window && window.getComputedStyle) {
            const prop = window.getComputedStyle(dom, null).getPropertyValue('height');
            if ((!prop || prop === '0px') && (!dom.style.height || dom.style.height === '0px')) {
                dom.style.height = '400px';
            }
        }
        return this.ngZone.runOutsideAngular(() => this.echarts.init(dom, this.theme, this.initOpts));
    }
    initChart() {
        this.onOptionsChange(this.options);
        if (this.merge && this.chart) {
            this.setOption(this.merge);
        }
    }
    onOptionsChange(opt) {
        if (opt) {
            if (!this.chart) {
                this.chart = this.createChart();
                this.chartInit.emit(this.chart);
            }
            this.chart.setOption(this.options, true);
        }
    }
    // allows to lazily bind to only those events that are requested through the `@Output` by parent components
    // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
    createLazyEvent(eventName) {
        return this.chartInit.pipe(switchMap((chart) => new Observable((observer) => {
            chart.on(eventName, (data) => this.ngZone.run(() => observer.next(data)));
            return () => chart.off(eventName);
        })));
    }
};
NgxEchartsDirective.ɵfac = function NgxEchartsDirective_Factory(t) { return new (t || NgxEchartsDirective)(ɵngcc0.ɵɵdirectiveInject(NGX_ECHARTS_CONFIG), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
NgxEchartsDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NgxEchartsDirective, selectors: [["echarts"], ["", "echarts", ""]], inputs: { autoResize: "autoResize", loadingType: "loadingType", options: "options", theme: "theme", loading: "loading", initOpts: "initOpts", merge: "merge", loadingOpts: "loadingOpts" }, outputs: { chartInit: "chartInit", chartClick: "chartClick", chartDblClick: "chartDblClick", chartMouseDown: "chartMouseDown", chartMouseMove: "chartMouseMove", chartMouseUp: "chartMouseUp", chartMouseOver: "chartMouseOver", chartMouseOut: "chartMouseOut", chartGlobalOut: "chartGlobalOut", chartContextMenu: "chartContextMenu", chartLegendSelectChanged: "chartLegendSelectChanged", chartLegendSelected: "chartLegendSelected", chartLegendUnselected: "chartLegendUnselected", chartLegendScroll: "chartLegendScroll", chartDataZoom: "chartDataZoom", chartDataRangeSelected: "chartDataRangeSelected", chartTimelineChanged: "chartTimelineChanged", chartTimelinePlayChanged: "chartTimelinePlayChanged", chartRestore: "chartRestore", chartDataViewChanged: "chartDataViewChanged", chartMagicTypeChanged: "chartMagicTypeChanged", chartPieSelectChanged: "chartPieSelectChanged", chartPieSelected: "chartPieSelected", chartPieUnselected: "chartPieUnselected", chartMapSelectChanged: "chartMapSelectChanged", chartMapSelected: "chartMapSelected", chartMapUnselected: "chartMapUnselected", chartAxisAreaSelected: "chartAxisAreaSelected", chartFocusNodeAdjacency: "chartFocusNodeAdjacency", chartUnfocusNodeAdjacency: "chartUnfocusNodeAdjacency", chartBrush: "chartBrush", chartBrushSelected: "chartBrushSelected", chartRendered: "chartRendered", chartFinished: "chartFinished" }, exportAs: ["echarts"], features: [ɵngcc0.ɵɵNgOnChangesFeature] });
NgxEchartsDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NGX_ECHARTS_CONFIG,] }] },
    { type: ElementRef },
    { type: NgZone }
];
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
export { NgxEchartsDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVjaGFydHMuZGlyZWN0aXZlLmpzIiwic291cmNlcyI6WyJuZzovbmd4LWVjaGFydHMvbGliL25neC1lY2hhcnRzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsT0FBTyxFQUNQLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLGNBQWMsRUFDZCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUsvQyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLGNBQWMsQ0FBbUIsb0JBQW9CLENBQUMsQ0FBQztBQU03RixJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtBQUFHLElBOERqQyxZQUM4QixNQUF3QixFQUM1QyxFQUFjLEVBQ2QsTUFBYztBQUN4QixRQUZVLE9BQUUsR0FBRixFQUFFLENBQVk7QUFBQyxRQUNmLFdBQU0sR0FBTixNQUFNLENBQVE7QUFBQyxRQXREaEIsZUFBVSxHQUFHLElBQUksQ0FBQztBQUM3QixRQUFXLGdCQUFXLEdBQUcsU0FBUyxDQUFDO0FBQ25DLFFBRUUscUJBQXFCO0FBQ3ZCLFFBQVksY0FBUyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7QUFDaEQsUUFDRSx1QkFBdUI7QUFDekIsUUFBWSxlQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RCxRQUFZLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3RCxRQUFZLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxRQUFZLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxRQUFZLGlCQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzRCxRQUFZLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxRQUFZLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3RCxRQUFZLG1CQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxRQUFZLHFCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbkUsUUFDRSx1QkFBdUI7QUFDekIsUUFBWSw2QkFBd0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDbkYsUUFBWSx3QkFBbUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDekUsUUFBWSwwQkFBcUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDN0UsUUFBWSxzQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JFLFFBQVksa0JBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzdELFFBQVksMkJBQXNCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQy9FLFFBQVkseUJBQW9CLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzNFLFFBQVksNkJBQXdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25GLFFBQVksaUJBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNELFFBQVkseUJBQW9CLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzNFLFFBQVksMEJBQXFCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzdFLFFBQVksMEJBQXFCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzdFLFFBQVkscUJBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNuRSxRQUFZLHVCQUFrQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdkUsUUFBWSwwQkFBcUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDN0UsUUFBWSxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ25FLFFBQVksdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN2RSxRQUFZLDBCQUFxQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM3RSxRQUFZLDRCQUF1QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNqRixRQUFZLDhCQUF5QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNyRixRQUFZLGVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZELFFBQVksdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN2RSxRQUFZLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3RCxRQUFZLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3RCxRQUdVLHVCQUFrQixHQUFHLENBQUMsQ0FBQztBQUNqQyxRQUFVLHdCQUFtQixHQUFHLENBQUMsQ0FBQztBQUNsQyxRQVFJLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNsQyxJQUFFLENBQUM7QUFDSCxJQUNFLFdBQVcsQ0FBQyxPQUFzQjtBQUNwQyxRQUFJLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUMsUUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQU0sU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDMUYsUUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQU0sT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEYsUUFBSSxNQUFNLENBQUMsR0FBRyxDQUFVLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RSxRQUFJLE1BQU0sQ0FBQyxRQUFRLENBQVMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBQzFFLElBQUUsQ0FBQztBQUNILElBQ0UsUUFBUTtBQUNWLFFBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUNoRCxhQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0IsYUFBTyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3RCLFlBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLGtCQUFrQixFQUFFO0FBQzlFLGdCQUFVLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3RELGdCQUFVLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7QUFDdEUsZ0JBQVUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztBQUN4RSxnQkFBVSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDeEIsYUFBUztBQUNULFFBQU0sQ0FBQyxDQUFDLENBQUM7QUFDVCxJQUFFLENBQUM7QUFDSCxJQUNFLFdBQVc7QUFDYixRQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUN4QixZQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkMsU0FBSztBQUNMLFFBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ25CLElBQUUsQ0FBQztBQUNILElBQ0UsU0FBUztBQUNYLFFBQUksNEJBQTRCO0FBQ2hDLFFBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDdkMsWUFBTSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7QUFDNUQsWUFBTSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFDOUQsWUFDTSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLFlBQVksRUFBRTtBQUNoRyxnQkFBUSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDO0FBQzlDLGdCQUFRLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxZQUFZLENBQUM7QUFDaEQsZ0JBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3RCLGFBQU87QUFDUCxTQUFLO0FBQ0wsSUFBRSxDQUFDO0FBQ0gsSUFDRSxlQUFlO0FBQ2pCLFFBQUksVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZDLElBQUUsQ0FBQztBQUNILElBQ1UsT0FBTztBQUNqQixRQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNwQixZQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDM0IsWUFBTSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUN4QixTQUFLO0FBQ0wsSUFBRSxDQUFDO0FBQ0gsSUFDVSxNQUFNO0FBQ2hCLFFBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ3BCLFlBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMxQixTQUFLO0FBQ0wsSUFBRSxDQUFDO0FBQ0gsSUFDVSxhQUFhLENBQUMsT0FBZ0I7QUFDeEMsUUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDcEIsWUFBTSxPQUFPO0FBQ2IsZ0JBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUNwRSxnQkFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQyxTQUFLO0FBQ0wsSUFBRSxDQUFDO0FBQ0gsSUFDVSxTQUFTLENBQUMsTUFBVyxFQUFFLElBQVU7QUFDM0MsUUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDcEIsWUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekMsU0FBSztBQUNMLElBQUUsQ0FBQztBQUNILElBQ1UsWUFBWTtBQUN0QixRQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQixRQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNyQixJQUFFLENBQUM7QUFDSCxJQUNVLFdBQVc7QUFDckIsUUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNoRCxRQUFJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7QUFDaEUsUUFBSSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO0FBQ2xFLFFBQUksTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7QUFDdEMsUUFDSSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7QUFDM0MsWUFBTSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pGLFlBQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFDMUYsZ0JBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQ25DLGFBQU87QUFDUCxTQUFLO0FBQ0wsUUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDbEcsSUFBRSxDQUFDO0FBQ0gsSUFDVSxTQUFTO0FBQ25CLFFBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkMsUUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNsQyxZQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLFNBQUs7QUFDTCxJQUFFLENBQUM7QUFDSCxJQUNVLGVBQWUsQ0FBQyxHQUFRO0FBQ2xDLFFBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixZQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ3ZCLGdCQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3hDLGdCQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxhQUFPO0FBQ1AsWUFDTSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9DLFNBQUs7QUFDTCxJQUFFLENBQUM7QUFDSCxJQUNFLDJHQUEyRztBQUM3RyxJQUFFLHVIQUF1SDtBQUN6SCxJQUFVLGVBQWUsQ0FBSSxTQUFpQjtBQUFJLFFBQzlDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ3hCLFNBQVMsQ0FDUCxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQ2IsSUFBSSxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtBQUN0QyxZQUFZLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RixZQUFZLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM5QyxRQUFVLENBQUMsQ0FBQyxDQUNMLENBQ2lCLENBQUM7QUFDekIsSUFBRSxDQUFDO0FBQ0gsQ0FBQzs7cXREQUFBO0FBQ0Q7QUFBNkMsNENBdEl4QyxNQUFNLFNBQUMsa0JBQWtCO0FBQVMsWUFDdkIsVUFBVTtBQUN4QixZQUFrQixNQUFNO0FBQ3pCO0FBakVVO0FBQWEsSUFBckIsS0FBSyxFQUFFO0FBQUMsb0RBQWE7QUFDYjtBQUFhLElBQXJCLEtBQUssRUFBRTtBQUFDLGtEQUFjO0FBQ2Q7QUFBYSxJQUFyQixLQUFLLEVBQUU7QUFBQyxvREFBaUI7QUFDakI7QUFDVixJQURFLEtBQUssRUFBRTtBQUFDLHFEQUtQO0FBQ087QUFDVixJQURFLEtBQUssRUFBRTtBQUFDLGtEQUFXO0FBQ1g7QUFBYSxJQUFyQixLQUFLLEVBQUU7QUFBQyx1REFBa0I7QUFDbEI7QUFBYSxJQUFyQixLQUFLLEVBQUU7QUFBQyx3REFBd0I7QUFDeEI7QUFBYSxJQUFyQixLQUFLLEVBQUU7QUFBQyx3REFBb0I7QUFHbkI7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxzREFBb0M7QUFHcEM7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyx1REFBMkM7QUFDM0M7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywwREFBaUQ7QUFDakQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywyREFBbUQ7QUFDbkQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywyREFBbUQ7QUFDbkQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyx5REFBK0M7QUFDL0M7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywyREFBbUQ7QUFDbkQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywwREFBaUQ7QUFDakQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywyREFBbUQ7QUFDbkQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyw2REFBdUQ7QUFHdkQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxxRUFBdUU7QUFDdkU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxnRUFBNkQ7QUFDN0Q7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxrRUFBaUU7QUFDakU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyw4REFBeUQ7QUFDekQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywwREFBaUQ7QUFDakQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxtRUFBbUU7QUFDbkU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxpRUFBK0Q7QUFDL0Q7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxxRUFBdUU7QUFDdkU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyx5REFBK0M7QUFDL0M7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxpRUFBK0Q7QUFDL0Q7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxrRUFBaUU7QUFDakU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxrRUFBaUU7QUFDakU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyw2REFBdUQ7QUFDdkQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywrREFBMkQ7QUFDM0Q7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxrRUFBaUU7QUFDakU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyw2REFBdUQ7QUFDdkQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywrREFBMkQ7QUFDM0Q7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxrRUFBaUU7QUFDakU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxvRUFBcUU7QUFDckU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyxzRUFBeUU7QUFDekU7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQyx1REFBMkM7QUFDM0M7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywrREFBMkQ7QUFDM0Q7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywwREFBaUQ7QUFDakQ7QUFBYSxJQUF0QixNQUFNLEVBQUU7QUFBQywwREFBaUQ7QUFyRGhELG1CQUFtQixvQkFKL0IsU0FBUyxDQUFDLFVBQ1QsUUFBUSxFQUFFLG5DQUdSLENBK0RDLFdBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7ZUFsRUMsZkFrRUEsR0EvRG5CLG1CQUFtQixDQW9NL0I7QUF0TUMsUUFBUSxFQUFFLFNBQVMsT0FDcEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQXNNRjtBQUFDLFNBck1ZLG1CQUFtQjtBQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGFuZ2VGaWx0ZXIgfSBmcm9tICcuL2NoYW5nZS1maWx0ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5neEVjaGFydHNDb25maWcge1xuICBlY2hhcnRzOiBhbnk7XG59XG5leHBvcnQgY29uc3QgTkdYX0VDSEFSVFNfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPE5neEVjaGFydHNDb25maWc+KCdOR1hfRUNIQVJUU19DT05GSUcnKTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZWNoYXJ0cywgW2VjaGFydHNdJyxcbiAgZXhwb3J0QXM6ICdlY2hhcnRzJyxcbn0pXG5leHBvcnQgY2xhc3MgTmd4RWNoYXJ0c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGluaXRPcHRzOiB7XG4gICAgZGV2aWNlUGl4ZWxSYXRpbz86IG51bWJlcjtcbiAgICByZW5kZXJlcj86IHN0cmluZztcbiAgICB3aWR0aD86IG51bWJlciB8IHN0cmluZztcbiAgICBoZWlnaHQ/OiBudW1iZXIgfCBzdHJpbmc7XG4gIH07XG4gIEBJbnB1dCgpIG1lcmdlOiBhbnk7XG4gIEBJbnB1dCgpIGF1dG9SZXNpemUgPSB0cnVlO1xuICBASW5wdXQoKSBsb2FkaW5nVHlwZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgbG9hZGluZ09wdHM6IG9iamVjdDtcblxuICAvLyBuZ3gtZWNoYXJ0cyBldmVudHNcbiAgQE91dHB1dCgpIGNoYXJ0SW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8vIGVjaGFydHMgbW91c2UgZXZlbnRzXG4gIEBPdXRwdXQoKSBjaGFydENsaWNrID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NsaWNrJyk7XG4gIEBPdXRwdXQoKSBjaGFydERibENsaWNrID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2RibGNsaWNrJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1vdXNlRG93biA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtb3VzZWRvd24nKTtcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VNb3ZlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlbW92ZScpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZVVwID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNldXAnKTtcbiAgQE91dHB1dCgpIGNoYXJ0TW91c2VPdmVyID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21vdXNlb3ZlcicpO1xuICBAT3V0cHV0KCkgY2hhcnRNb3VzZU91dCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtb3VzZW91dCcpO1xuICBAT3V0cHV0KCkgY2hhcnRHbG9iYWxPdXQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZ2xvYmFsb3V0Jyk7XG4gIEBPdXRwdXQoKSBjaGFydENvbnRleHRNZW51ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NvbnRleHRtZW51Jyk7XG5cbiAgLy8gZWNoYXJ0cyBtb3VzZSBldmVudHNcbiAgQE91dHB1dCgpIGNoYXJ0TGVnZW5kU2VsZWN0Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsZWdlbmRzZWxlY3RjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydExlZ2VuZFNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xlZ2VuZHNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydExlZ2VuZFVuc2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kdW5zZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRMZWdlbmRTY3JvbGwgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGVnZW5kc2Nyb2xsJyk7XG4gIEBPdXRwdXQoKSBjaGFydERhdGFab29tID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2RhdGF6b29tJyk7XG4gIEBPdXRwdXQoKSBjaGFydERhdGFSYW5nZVNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2RhdGFyYW5nZXNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydFRpbWVsaW5lQ2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd0aW1lbGluZWNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0VGltZWxpbmVQbGF5Q2hhbmdlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd0aW1lbGluZXBsYXljaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydFJlc3RvcmUgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmVzdG9yZScpO1xuICBAT3V0cHV0KCkgY2hhcnREYXRhVmlld0NoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZGF0YXZpZXdjaGFuZ2VkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hZ2ljVHlwZUNoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFnaWN0eXBlY2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRQaWVTZWxlY3RDaGFuZ2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BpZXNlbGVjdGNoYW5nZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UGllU2VsZWN0ZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGllc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0UGllVW5zZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwaWV1bnNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydE1hcFNlbGVjdENoYW5nZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbWFwc2VsZWN0Y2hhbmdlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRNYXBTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdtYXBzZWxlY3RlZCcpO1xuICBAT3V0cHV0KCkgY2hhcnRNYXBVbnNlbGVjdGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ21hcHVuc2VsZWN0ZWQnKTtcbiAgQE91dHB1dCgpIGNoYXJ0QXhpc0FyZWFTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdheGlzYXJlYXNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydEZvY3VzTm9kZUFkamFjZW5jeSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdmb2N1c25vZGVhZGphY2VuY3knKTtcbiAgQE91dHB1dCgpIGNoYXJ0VW5mb2N1c05vZGVBZGphY2VuY3kgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgndW5mb2N1c25vZGVhZGphY2VuY3knKTtcbiAgQE91dHB1dCgpIGNoYXJ0QnJ1c2ggPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnYnJ1c2gnKTtcbiAgQE91dHB1dCgpIGNoYXJ0QnJ1c2hTZWxlY3RlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdicnVzaHNlbGVjdGVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydFJlbmRlcmVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3JlbmRlcmVkJyk7XG4gIEBPdXRwdXQoKSBjaGFydEZpbmlzaGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2ZpbmlzaGVkJyk7XG5cbiAgcHJpdmF0ZSBjaGFydDogYW55O1xuICBwcml2YXRlIGVjaGFydHM6IGFueTtcbiAgcHJpdmF0ZSBjdXJyZW50T2Zmc2V0V2lkdGggPSAwO1xuICBwcml2YXRlIGN1cnJlbnRPZmZzZXRIZWlnaHQgPSAwO1xuICBwcml2YXRlIGN1cnJlbnRXaW5kb3dXaWR0aDogbnVtYmVyO1xuICBwcml2YXRlIHJlc2l6ZVN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTkdYX0VDSEFSVFNfQ09ORklHKSBjb25maWc6IE5neEVjaGFydHNDb25maWcsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICApIHtcbiAgICB0aGlzLmVjaGFydHMgPSBjb25maWcuZWNoYXJ0cztcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBDaGFuZ2VGaWx0ZXIub2YoY2hhbmdlcyk7XG4gICAgZmlsdGVyLm5vdEZpcnN0QW5kRW1wdHk8YW55Pignb3B0aW9ucycpLnN1YnNjcmliZSgob3B0KSA9PiB0aGlzLm9uT3B0aW9uc0NoYW5nZShvcHQpKTtcbiAgICBmaWx0ZXIubm90Rmlyc3RBbmRFbXB0eTxhbnk+KCdtZXJnZScpLnN1YnNjcmliZSgob3B0KSA9PiB0aGlzLnNldE9wdGlvbihvcHQpKTtcbiAgICBmaWx0ZXIuaGFzPGJvb2xlYW4+KCdsb2FkaW5nJykuc3Vic2NyaWJlKCh2KSA9PiB0aGlzLnRvZ2dsZUxvYWRpbmcoISF2KSk7XG4gICAgZmlsdGVyLm5vdEZpcnN0PHN0cmluZz4oJ3RoZW1lJykuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVmcmVzaENoYXJ0KCkpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZXNpemVTdWIgPSBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJylcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSAmJiB3aW5kb3cuaW5uZXJXaWR0aCAhPT0gdGhpcy5jdXJyZW50V2luZG93V2lkdGgpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgIHRoaXMuY3VycmVudE9mZnNldFdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgIHRoaXMuY3VycmVudE9mZnNldEhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5yZXNpemVTdWIpIHtcbiAgICAgIHRoaXMucmVzaXplU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIC8vIE5vIGhlYXZ5IHdvcmsgaW4gRG9DaGVjayFcbiAgICBpZiAodGhpcy5jaGFydCAmJiB0aGlzLmF1dG9SZXNpemUpIHtcbiAgICAgIGNvbnN0IG9mZnNldFdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgY29uc3Qgb2Zmc2V0SGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudE9mZnNldFdpZHRoICE9PSBvZmZzZXRXaWR0aCB8fCB0aGlzLmN1cnJlbnRPZmZzZXRIZWlnaHQgIT09IG9mZnNldEhlaWdodCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRPZmZzZXRXaWR0aCA9IG9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmN1cnJlbnRPZmZzZXRIZWlnaHQgPSBvZmZzZXRIZWlnaHQ7XG4gICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbml0Q2hhcnQoKSk7XG4gIH1cblxuICBwcml2YXRlIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgIHRoaXMuY2hhcnQuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5jaGFydCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNpemUoKSB7XG4gICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgIHRoaXMuY2hhcnQucmVzaXplKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVMb2FkaW5nKGxvYWRpbmc6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgbG9hZGluZ1xuICAgICAgICA/IHRoaXMuY2hhcnQuc2hvd0xvYWRpbmcodGhpcy5sb2FkaW5nVHlwZSwgdGhpcy5sb2FkaW5nT3B0cylcbiAgICAgICAgOiB0aGlzLmNoYXJ0LmhpZGVMb2FkaW5nKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb24ob3B0aW9uOiBhbnksIG9wdHM/OiBhbnkpIHtcbiAgICBpZiAodGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydC5zZXRPcHRpb24ob3B0aW9uLCBvcHRzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hDaGFydCgpIHtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmluaXRDaGFydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDaGFydCgpIHtcbiAgICB0aGlzLmN1cnJlbnRXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuY3VycmVudE9mZnNldFdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIHRoaXMuY3VycmVudE9mZnNldEhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgZG9tID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgY29uc3QgcHJvcCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvbSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0Jyk7XG4gICAgICBpZiAoKCFwcm9wIHx8IHByb3AgPT09ICcwcHgnKSAmJiAoIWRvbS5zdHlsZS5oZWlnaHQgfHwgZG9tLnN0eWxlLmhlaWdodCA9PT0gJzBweCcpKSB7XG4gICAgICAgIGRvbS5zdHlsZS5oZWlnaHQgPSAnNDAwcHgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLmVjaGFydHMuaW5pdChkb20sIHRoaXMudGhlbWUsIHRoaXMuaW5pdE9wdHMpKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdENoYXJ0KCkge1xuICAgIHRoaXMub25PcHRpb25zQ2hhbmdlKHRoaXMub3B0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5tZXJnZSAmJiB0aGlzLmNoYXJ0KSB7XG4gICAgICB0aGlzLnNldE9wdGlvbih0aGlzLm1lcmdlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uT3B0aW9uc0NoYW5nZShvcHQ6IGFueSkge1xuICAgIGlmIChvcHQpIHtcbiAgICAgIGlmICghdGhpcy5jaGFydCkge1xuICAgICAgICB0aGlzLmNoYXJ0ID0gdGhpcy5jcmVhdGVDaGFydCgpO1xuICAgICAgICB0aGlzLmNoYXJ0SW5pdC5lbWl0KHRoaXMuY2hhcnQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoYXJ0LnNldE9wdGlvbih0aGlzLm9wdGlvbnMsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGFsbG93cyB0byBsYXppbHkgYmluZCB0byBvbmx5IHRob3NlIGV2ZW50cyB0aGF0IGFyZSByZXF1ZXN0ZWQgdGhyb3VnaCB0aGUgYEBPdXRwdXRgIGJ5IHBhcmVudCBjb21wb25lbnRzXG4gIC8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MTc4Nzk3Mi9vcHRpbWFsLXJlZW50ZXJpbmctdGhlLW5nem9uZS1mcm9tLWV2ZW50ZW1pdHRlci1ldmVudCBmb3IgbW9yZSBpbmZvXG4gIHByaXZhdGUgY3JlYXRlTGF6eUV2ZW50PFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogRXZlbnRFbWl0dGVyPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5jaGFydEluaXQucGlwZShcbiAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgKGNoYXJ0OiBhbnkpID0+XG4gICAgICAgICAgbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBjaGFydC5vbihldmVudE5hbWUsIChkYXRhOiBUKSA9PiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChkYXRhKSkpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IGNoYXJ0Lm9mZihldmVudE5hbWUpO1xuICAgICAgICAgIH0pLFxuICAgICAgKSxcbiAgICApIGFzIEV2ZW50RW1pdHRlcjxUPjtcbiAgfVxufVxuIl19