var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { isPresent } from './../util';
import { KeyEvents } from './key-events';
import { Keys } from './keys';
import { NavigationAction } from './navigation-action';
import { NAVIGATION_CONFIG } from './navigation-config';
/**
 * @hidden
 */
var NavigationService = (function () {
    function NavigationService(config) {
        this.navigate = new EventEmitter();
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.enter = new EventEmitter();
        this.enterpress = new EventEmitter();
        this.enterup = new EventEmitter();
        this.tab = new EventEmitter();
        this.esc = new EventEmitter();
        this.useLeftRightArrows = config.useLeftRightArrows;
    }
    NavigationService.prototype.process = function (args) {
        var keyCode = args.keyCode;
        var keyEvent = args.keyEvent;
        var index;
        var action = NavigationAction.Undefined;
        if (keyEvent === KeyEvents.keypress) {
            if (this.isEnter(keyCode)) {
                action = NavigationAction.EnterPress;
            }
        }
        else if (keyEvent === KeyEvents.keyup) {
            if (this.isEnter(keyCode)) {
                action = NavigationAction.EnterUp;
            }
        }
        else {
            if (args.altKey && keyCode === Keys.down) {
                action = NavigationAction.Open;
            }
            else if (args.altKey && keyCode === Keys.up) {
                action = NavigationAction.Close;
            }
            else if (this.isEnter(keyCode)) {
                action = NavigationAction.Enter;
            }
            else if (keyCode === Keys.esc) {
                action = NavigationAction.Esc;
            }
            else if (keyCode === Keys.tab) {
                action = NavigationAction.Tab;
            }
            else if (keyCode === Keys.up || (this.useLeftRightArrows && keyCode === Keys.left)) {
                index = this.next({
                    current: args.current,
                    start: args.max,
                    end: args.min,
                    step: -1
                });
                action = NavigationAction.Navigate;
            }
            else if (keyCode === Keys.down || (this.useLeftRightArrows && keyCode === Keys.right)) {
                index = this.next({
                    current: args.current,
                    start: args.min,
                    end: args.max,
                    step: 1
                });
                action = NavigationAction.Navigate;
            }
        }
        if (action !== NavigationAction.Undefined) {
            this[NavigationAction[action].toLowerCase()].emit(index);
        }
        return action;
    };
    NavigationService.prototype.isEnter = function (keyCode) {
        return keyCode === Keys.enter || keyCode === Keys.space;
    };
    NavigationService.prototype.next = function (args) {
        if (!isPresent(args.current)) {
            return args.start;
        }
        else {
            return args.current !== args.end ? args.current + args.step : args.end;
        }
    };
    return NavigationService;
}());
NavigationService = __decorate([
    Injectable(),
    __param(0, Inject(NAVIGATION_CONFIG)),
    __metadata("design:paramtypes", [Object])
], NavigationService);
export { NavigationService };
