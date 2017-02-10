var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer, Optional, Inject } from '@angular/core';
import { ButtonItemTemplateDirective } from '../listbutton/button-item-template.directive';
import { isPresent } from '../util';
import { ListButton } from '../listbutton/list-button';
import { FocusService } from '../focusable/focus.service';
import { NavigationService } from '../navigation/navigation.service';
import { NAVIGATION_CONFIG } from '../navigation/navigation-config';
var NAVIGATION_SETTINGS = {
    useLeftRightArrows: true
};
var NAVIGATION_SETTINGS_PROVIDER = {
    provide: NAVIGATION_CONFIG,
    useValue: NAVIGATION_SETTINGS
};
/**
 * Represents the Kendo UI DropDownButton component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownbutton [data]="data">
 *    User Settings
 *  </kendo-dropdownbutton>
 * `
 * })
 * class AppComponent {
 *   public data: Array<any> = [{
 *       text: 'My Profile'
 *   }, {
 *       text: 'Friend Requests'
 *   }, {
 *       text: 'Account Settings'
 *   }, {
 *       text: 'Support'
 *   }, {
 *       text: 'Log Out'
 *   }];
 * }
 * ```
 */
var DropDownButtonComponent = (function (_super) {
    __extends(DropDownButtonComponent, _super);
    function DropDownButtonComponent(focusService, navigationService, wrapperRef, renderer, direction) {
        var _this = _super.call(this, focusService, navigationService, wrapperRef, renderer) || this;
        _this.direction = direction;
        /**
         * Defines the name of an existing icon in the Kendo UI theme.
         */
        _this.icon = '';
        /**
         * Defines the list of CSS classes used for styling the Button with custom icons.
         */
        _this.iconClass = '';
        /**
         * Defines a URL for styling the button with a custom image.
         */
        _this.imageUrl = '';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        _this.tabIndex = 0;
        /**
         * Fires each time the user clicks on a drop-down list item. The event data contains the data item bound to the clicked list item.
         */
        _this.itemClick = new EventEmitter();
        _this._itemClick = _this.itemClick;
        return _this;
    }
    Object.defineProperty(DropDownButtonComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the DropDownButton.
         *
         * The available options are:
         * - `animate`&mdash;Enables or disables the popup animation.
         * - `popupClass`&mdash;Specifies the list of CSS classes used for styling the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        /**
         * Sets the disabled state of the DropDownButton.
         */
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets or gets the data of the DropDownButton.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "open", {
        get: function () {
            return this._open;
        },
        /**
         * Sets or gets the `open` property of the DropDownButton.
         * The `open` property determines whether the popup list of the DropDownButton is visible or not.
         */
        set: function (open) {
            if (!this.disabled) {
                this._open = open;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "componentTabIndex", {
        get: function () {
            return this.disabled ? (-1) : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "focused", {
        get: function () {
            return this._isFocused && !this._disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "role", {
        get: function () {
            return 'menu';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "ariaExpanded", {
        get: function () {
            return this.open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "ariaHasPopup", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "ariaOwns", {
        get: function () {
            return this.listId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "active", {
        /**
         * @hidden
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.focus = function () {
        if (!this._disabled) {
            this._isFocused = true;
        }
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.blur = function () {
        this._isFocused = false;
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.keydown = function (event) {
        this.keyDownHandler(event);
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.keypress = function (event) {
        this.keyPressHandler(event);
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.keyup = function (event) {
        this.keyUpHandler(event);
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.mousedown = function (event) {
        if (this._disabled) {
            event.preventDefault();
        }
    };
    Object.defineProperty(DropDownButtonComponent.prototype, "anchorAlign", {
        /**
         * @hidden
         */
        get: function () {
            var align = { horizontal: 'left', vertical: 'bottom' };
            if (this.direction === 'rtl') {
                align.horizontal = 'right';
            }
            return align;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "popupAlign", {
        /**
         * @hidden
         */
        get: function () {
            var align = { horizontal: 'left', vertical: 'top' };
            if (this.direction === 'rtl') {
                align.horizontal = 'right';
            }
            return align;
        },
        enumerable: true,
        configurable: true
    });
    DropDownButtonComponent.prototype.subscribeNavigationEvents = function () {
        var _this = this;
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(function (index) { _this.onArrowKeyNavigate(index); });
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(function () { _this.onNavigationEnterPress(); });
        this.enterUpSubscription = this.navigationService.enterup.subscribe(function () { _this.onNavigationEnterUp(); });
        this.openSubscription = this.navigationService.open.subscribe(function () { _this.onNavigationOpen(); });
        this.closeSubscription = this.navigationService.close
            .merge(this.navigationService.esc)
            .subscribe(function () { _this.onNavigationClose(); });
    };
    DropDownButtonComponent.prototype.onNavigationEnterPress = function () {
        if (!this._disabled && !this._open) {
            this._active = true;
        }
    };
    DropDownButtonComponent.prototype.onNavigationEnterUp = function () {
        if (!this._disabled && !this._open) {
            this._active = false;
        }
        if (this._open) {
            var focused = this.focusService.focused;
            if (isPresent(focused) && focused !== -1) {
                this.emitItemClickHandler(focused);
            }
        }
        this.togglePopupVisibility();
        if (this._open) {
            this.focusFirstItem();
        }
        else {
            this.renderer.invokeElementMethod(this.wrapper, 'focus');
        }
    };
    DropDownButtonComponent.prototype.onNavigationOpen = function () {
        if (!this._disabled && !this._open) {
            this.togglePopupVisibility();
            this.focusFirstItem();
        }
    };
    DropDownButtonComponent.prototype.onNavigationClose = function () {
        if (this._open) {
            this.togglePopupVisibility();
            this.renderer.invokeElementMethod(this.wrapper, 'focus');
        }
    };
    DropDownButtonComponent.prototype.onArrowKeyNavigate = function (index) {
        this.focusService.focus(index);
    };
    return DropDownButtonComponent;
}(ListButton));
__decorate([
    Input(),
    __metadata("design:type", String)
], DropDownButtonComponent.prototype, "icon", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DropDownButtonComponent.prototype, "iconClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DropDownButtonComponent.prototype, "imageUrl", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DropDownButtonComponent.prototype, "popupSettings", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], DropDownButtonComponent.prototype, "textField", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DropDownButtonComponent.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DropDownButtonComponent.prototype, "data", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DropDownButtonComponent.prototype, "open", null);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DropDownButtonComponent.prototype, "tabIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DropDownButtonComponent.prototype, "itemClick", void 0);
__decorate([
    HostBinding('tabindex'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], DropDownButtonComponent.prototype, "componentTabIndex", null);
__decorate([
    HostBinding('class.k-state-focused'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DropDownButtonComponent.prototype, "focused", null);
__decorate([
    HostBinding('attr.role'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], DropDownButtonComponent.prototype, "role", null);
__decorate([
    HostBinding('attr.aria-disabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DropDownButtonComponent.prototype, "ariaDisabled", null);
__decorate([
    HostBinding('attr.aria-expanded'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DropDownButtonComponent.prototype, "ariaExpanded", null);
__decorate([
    HostBinding('attr.aria-haspopup'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DropDownButtonComponent.prototype, "ariaHasPopup", null);
__decorate([
    HostBinding('attr.aria-owns'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], DropDownButtonComponent.prototype, "ariaOwns", null);
__decorate([
    HostBinding('class.k-widget'),
    HostBinding('class.k-dropdown-button'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], DropDownButtonComponent.prototype, "widgetClasses", null);
__decorate([
    HostBinding('attr.dir'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], DropDownButtonComponent.prototype, "dir", null);
__decorate([
    ContentChild(ButtonItemTemplateDirective),
    __metadata("design:type", ButtonItemTemplateDirective)
], DropDownButtonComponent.prototype, "itemTemplate", void 0);
__decorate([
    HostListener('focus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DropDownButtonComponent.prototype, "focus", null);
__decorate([
    HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DropDownButtonComponent.prototype, "blur", null);
__decorate([
    HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DropDownButtonComponent.prototype, "keydown", null);
__decorate([
    HostListener('keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DropDownButtonComponent.prototype, "keypress", null);
__decorate([
    HostListener('keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DropDownButtonComponent.prototype, "keyup", null);
__decorate([
    HostListener('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DropDownButtonComponent.prototype, "mousedown", null);
DropDownButtonComponent = __decorate([
    Component({
        providers: [FocusService, NavigationService, NAVIGATION_SETTINGS_PROVIDER],
        selector: 'kendo-dropdownbutton',
        template: "\n        <button kendoButton #button\n            tabIndex=\"-1\"\n            type=\"button\"\n            [class.k-state-active]=\"active\"\n            [disabled]=\"disabled\"\n            [icon]=\"icon\"\n            [iconClass]=\"iconClass\"\n            [imageUrl]=\"imageUrl\"\n            (click)=\"togglePopupVisibility()\">\n            <ng-content></ng-content>\n        </button>\n        <kendo-popup *ngIf=\"open\"\n            [anchor]=\"button\"\n            [anchorAlign]=\"anchorAlign\"\n            [popupAlign]=\"popupAlign\"\n            [animate]=\"popupSettings?.animate\"\n            [popupClass]=\"popupClasses\"\n            (anchorViewportLeave)=\"open=false\">\n            <kendo-button-list\n                [id]=\"listId\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [itemTemplate]=\"itemTemplate\"\n               (onItemClick)=\"onItemClick($event)\">\n            </kendo-button-list>\n        </kendo-popup>\n    "
    }),
    __param(4, Optional()), __param(4, Inject('kendo-direction')),
    __metadata("design:paramtypes", [FocusService,
        NavigationService,
        ElementRef,
        Renderer, String])
], DropDownButtonComponent);
export { DropDownButtonComponent };
