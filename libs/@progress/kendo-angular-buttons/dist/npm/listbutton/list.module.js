"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var list_component_1 = require("./list.component");
var focusable_directive_1 = require("./../focusable/focusable.directive");
var button_item_template_directive_1 = require("./button-item-template.directive");
var template_context_directive_1 = require("./template-context.directive");
var EXPORTED_DIRECTIVES = [
    list_component_1.ListComponent,
    focusable_directive_1.FocusableDirective,
    button_item_template_directive_1.ButtonItemTemplateDirective,
    template_context_directive_1.TemplateContextDirective
];
/**
 * @hidden
 */
var ListModule = (function () {
    function ListModule() {
    }
    return ListModule;
}());
ListModule = __decorate([
    core_1.NgModule({
        declarations: [EXPORTED_DIRECTIVES],
        exports: [EXPORTED_DIRECTIVES],
        imports: [common_1.CommonModule]
    })
], ListModule);
exports.ListModule = ListModule;
