"use strict";
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
var core_1 = require("@angular/core");
var list_button_1 = require("./../listbutton/list-button");
var button_item_template_directive_1 = require("./../listbutton/button-item-template.directive");
var focus_service_1 = require("./../focusable/focus.service");
var navigation_service_1 = require("./../navigation/navigation.service");
var navigation_config_1 = require("./../navigation/navigation-config");
var util_1 = require("./../util");
var NAVIGATION_SETTINGS = {
    useLeftRightArrows: true
};
var NAVIGATION_SETTINGS_PROVIDER = {
    provide: navigation_config_1.NAVIGATION_CONFIG,
    useValue: NAVIGATION_SETTINGS
};
/**
 * Represents the Kendo UI SplitButton component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-splitbutton [data]="data" [icon]="'paste'"
 *      (itemClick)="onSplitButtonItemClick($event)"
 *      (buttonClick)="onSplitButtonClick()">Paste</kendo-splitbutton>
 * `
 * })
 *
 * class AppComponent {
 *   public data: Array<any> = [{
 *       text: 'Keep Text Only',
 *       icon: 'paste-plain-text',
 *       click: () => { console.log('Keep Text Only click handler'); }
 *   }, {
 *       text: 'Paste as HTML',
 *       icon: 'paste-as-html'
 *   }, {
 *       text: 'Paste Markdown',
 *       icon: 'paste-markdown'
 *   }, {
 *       text: 'Set Default Paste'
 *   }];
 *
 *   public onSplitButtonClick(dataItem: any): void {
 *       console.log('Paste');
 *   }
 *
 *   public onSplitButtonItemClick(dataItem: any): void {
 *       if (dataItem) {
 *           console.log(dataItem.text);
 *       }
 *   }
 * }
 * ```
 */
var SplitButtonComponent = (function (_super) {
    __extends(SplitButtonComponent, _super);
    function SplitButtonComponent(focusService, navigationService, wrapperRef, renderer, direction) {
        var _this = _super.call(this, focusService, navigationService, wrapperRef, renderer) || this;
        /**
         * Sets the text of the SplitButton.
         */
        _this.text = '';
        /**
         * Defines an icon to be rendered next to the button text.
         */
        _this.icon = '';
        /**
         * Defines an icon with a custom CSS class to be rendered next to the button text.
         */
        _this.iconClass = '';
        /**
         * Defines the location of an image to be displayed next to the button text.
         */
        _this.imageUrl = '';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        _this.tabIndex = 0;
        /**
         * Fires each time the user clicks the main button.
         */
        _this.buttonClick = new core_1.EventEmitter();
        /**
         * Fires each time the user clicks on the drop-down list. The event data contains the data item bound to the clicked list item.
         */
        _this.itemClick = new core_1.EventEmitter();
        _this.buttonText = '';
        _this.direction = direction;
        _this._itemClick = _this.itemClick;
        return _this;
    }
    Object.defineProperty(SplitButtonComponent.prototype, "anchorAlign", {
        /**
         * hidden
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
    Object.defineProperty(SplitButtonComponent.prototype, "popupAlign", {
        /**
         * hidden
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
    Object.defineProperty(SplitButtonComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        /**
         * When set to `true`, disables a SplitButton item.
         */
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "popupSettings", {
        get: function () {
            if (!this._popupSettings) {
                this._popupSettings = { animate: true, popupClass: '' };
            }
            return this._popupSettings;
        },
        /**
         * Configures the popup of the SplitButton.
         *
         * The available options are:
         * - `animate`&mdash;Enables or disables the popup animation.
         * - `popupClass`&mdash;Specifies a list of CSS classes used for styling the popup.
         */
        set: function (value) {
            this._popupSettings = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "data", {
        get: function () {
            if (!this._data) {
                this.data = [];
            }
            return this._data;
        },
        /**
         * Sets the data of the SplitButton.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "open", {
        get: function () {
            return this._open;
        },
        /**
         * Sets or gets the `open` property of the SplitButton.
         * The `open` property determines whether the popup list of the SplitButton is visible or not.
         */
        set: function (open) {
            if (this.disabled) {
                return;
            }
            this._open = open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "active", {
        /**
         * @hidden
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "isFocused", {
        get: function () {
            return this._isFocused && !this._disabled;
        },
        set: function (value) {
            this._isFocused = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "widgetTabIndex", {
        get: function () {
            return this.disabled ? -1 : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "role", {
        get: function () {
            return 'listbox';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "ariaExpanded", {
        get: function () {
            return this.open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "ariaHasPopup", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "ariaOwns", {
        get: function () {
            return this.listId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "ariaLabel", {
        get: function () {
            return this.buttonText + " splitbutton";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitButtonComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.onButtonFocus = function () {
        this.renderer.invokeElementMethod(this.wrapper, "focus");
        return true;
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.onButtonClick = function () {
        this.focusWrapper();
        this.buttonClick.emit();
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.focus = function () {
        this._isFocused = true;
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.blur = function () {
        this.blurHandler();
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.keydown = function (event) {
        this.keyDownHandler(event);
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.keypress = function (event) {
        this.keyPressHandler(event);
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.keyup = function (event) {
        this.keyUpHandler(event);
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.ngAfterViewInit = function () {
        this.updateButtonText();
    };
    /**
     * @hidden
     */
    SplitButtonComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('text')) {
            this.updateButtonText();
        }
    };
    SplitButtonComponent.prototype.enterHanlder = function () {
        if (this.disabled) {
            return;
        }
        if (this.open) {
            var focused = this.focusService.focused;
            if (util_1.isPresent(focused) && focused !== -1) {
                this.emitItemClickHandler(focused);
            }
        }
        else {
            this.buttonClick.emit();
        }
    };
    SplitButtonComponent.prototype.updateButtonText = function () {
        var _this = this;
        var innerText = this.wrapper.innerText.split('\n').join('').trim();
        //setTimout is needed because of `Expression has changed after it was checked.` error;
        setTimeout(function () { _this.buttonText = innerText; }, 0);
    };
    return SplitButtonComponent;
}(list_button_1.ListButton));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButtonComponent.prototype, "text", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButtonComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButtonComponent.prototype, "iconClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButtonComponent.prototype, "imageUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SplitButtonComponent.prototype, "disabled", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SplitButtonComponent.prototype, "popupSettings", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SplitButtonComponent.prototype, "tabIndex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitButtonComponent.prototype, "textField", void 0);
__decorate([
    core_1.ContentChild(button_item_template_directive_1.ButtonItemTemplateDirective),
    __metadata("design:type", button_item_template_directive_1.ButtonItemTemplateDirective)
], SplitButtonComponent.prototype, "itemTemplate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SplitButtonComponent.prototype, "buttonClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SplitButtonComponent.prototype, "itemClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SplitButtonComponent.prototype, "data", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SplitButtonComponent.prototype, "open", null);
__decorate([
    core_1.HostBinding('class.k-state-focused'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SplitButtonComponent.prototype, "isFocused", null);
__decorate([
    core_1.HostBinding('class.k-widget'),
    core_1.HostBinding('class.k-split-button'),
    core_1.HostBinding('class.k-button-group'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], SplitButtonComponent.prototype, "widgetClasses", null);
__decorate([
    core_1.HostBinding('tabindex'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], SplitButtonComponent.prototype, "widgetTabIndex", null);
__decorate([
    core_1.HostBinding('attr.role'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], SplitButtonComponent.prototype, "role", null);
__decorate([
    core_1.HostBinding('attr.aria-disabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], SplitButtonComponent.prototype, "ariaDisabled", null);
__decorate([
    core_1.HostBinding('attr.aria-expanded'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], SplitButtonComponent.prototype, "ariaExpanded", null);
__decorate([
    core_1.HostBinding('attr.aria-haspopup'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], SplitButtonComponent.prototype, "ariaHasPopup", null);
__decorate([
    core_1.HostBinding('attr.aria-owns'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], SplitButtonComponent.prototype, "ariaOwns", null);
__decorate([
    core_1.HostBinding('attr.aria-label'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], SplitButtonComponent.prototype, "ariaLabel", null);
__decorate([
    core_1.HostBinding('attr.dir'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], SplitButtonComponent.prototype, "dir", null);
__decorate([
    core_1.HostListener('focus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SplitButtonComponent.prototype, "focus", null);
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SplitButtonComponent.prototype, "blur", null);
__decorate([
    core_1.HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SplitButtonComponent.prototype, "keydown", null);
__decorate([
    core_1.HostListener('keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SplitButtonComponent.prototype, "keypress", null);
__decorate([
    core_1.HostListener('keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SplitButtonComponent.prototype, "keyup", null);
SplitButtonComponent = __decorate([
    core_1.Component({
        providers: [focus_service_1.FocusService, navigation_service_1.NavigationService, NAVIGATION_SETTINGS_PROVIDER],
        selector: 'kendo-splitbutton',
        template: "\n        <button kendoButton #button\n            [disabled]=\"disabled\"\n            [icon]=\"icon\"\n            [class.k-state-active]=\"active\"\n            [iconClass]=\"iconClass\"\n            [imageUrl]=\"imageUrl\"\n            [tabindex]=\"-1\"\n            (focus)=\"onButtonFocus()\"\n            (click)=\"onButtonClick()\">\n            {{text}}<ng-content></ng-content>\n        </button><button kendoButton\n            [disabled]=\"disabled\"\n            [icon]=\"'arrow-s'\"\n            [tabindex]=\"-1\"\n            (focus)=\"onButtonFocus()\"\n            (click)=\"togglePopupVisibility()\">\n        </button>\n        <kendo-popup *ngIf=\"open\"\n            [anchor]=\"button\"\n            [anchorAlign]=\"anchorAlign\"\n            [popupAlign]=\"popupAlign\"\n            [animate]=\"popupSettings.animate\"\n            [popupClass]=\"popupClasses\">\n            <kendo-button-list [data]=\"data\"\n                [id]=\"listId\"\n                [textField]=\"textField\"\n                [itemTemplate]=\"itemTemplate\"\n                (onItemBlur)=\"blurHandler()\"\n                (onItemClick)=\"onItemClick($event)\">\n            </kendo-button-list>\n        </kendo-popup>\n    "
    }),
    __param(4, core_1.Optional()), __param(4, core_1.Inject('kendo-direction')),
    __metadata("design:paramtypes", [focus_service_1.FocusService,
        navigation_service_1.NavigationService,
        core_1.ElementRef,
        core_1.Renderer, String])
], SplitButtonComponent);
exports.SplitButtonComponent = SplitButtonComponent;
