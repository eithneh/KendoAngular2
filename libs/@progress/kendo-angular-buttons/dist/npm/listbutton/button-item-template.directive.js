"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* tslint:disable:directive-selector-name */
var core_1 = require("@angular/core");
/**
 * Used for rendering the list item content.
 *
 * To define the item template, nest a `<template>` tag with the `kendo<ComponentName>ItemTemplate` directive inside the component tag.
 *
 * Use:
 * - The `kendoDropDownButtonItemTemplate` directive for the DropDownButton.
 * - The `kendoSplitButtonItemTemplate` directive for the SplitButton.
 *
 * The template context is set to the current component. To get a reference to the current data item, use the `let-dataItem` directive.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-splitbutton [data]="listItems">
 *    <template kendoSplitButtonItemTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </template>
 *  </kendo-splitbutton>
 *  <kendo-dropdownbutton [data]="listItems">
 *    <template kendoDropDownButtonItemTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </template>
 *  </kendo-dropdownbutton>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<any> = [{
 *      text: 'item1',
 *      icon: 'refresh',
 *      disabled: false,
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }, {
 *      text: 'item2',
 *      icon: 'refresh',
 *      disabled: false,
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }]
 * }
 * ```
 *
 * For more examples, refer to [Templates]({% slug overview_ddl_kendouiforangular %}#templates).
 */
var ButtonItemTemplateDirective = (function () {
    function ButtonItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    return ButtonItemTemplateDirective;
}());
ButtonItemTemplateDirective = __decorate([
    core_1.Directive({
        selector: '[kendoDropDownButtonItemTemplate],[kendoSplitButtonItemTemplate]'
    }),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], ButtonItemTemplateDirective);
exports.ButtonItemTemplateDirective = ButtonItemTemplateDirective;
