import { ElementRef, EventEmitter, Renderer } from '@angular/core';
import { Align } from '@progress/kendo-angular-popup';
import { PopupSettings } from '../listbutton/popup-settings';
import { ButtonItemTemplateDirective } from '../listbutton/button-item-template.directive';
import { Direction } from '../direction';
import { ListButton } from '../listbutton/list-button';
import { FocusService } from '../focusable/focus.service';
import { NavigationService } from '../navigation/navigation.service';
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
export declare class DropDownButtonComponent extends ListButton {
    private direction;
    /**
     * Defines the name of an existing icon in the Kendo UI theme.
     */
    icon: string;
    /**
     * Defines the list of CSS classes used for styling the Button with custom icons.
     */
    iconClass: string;
    /**
     * Defines a URL for styling the button with a custom image.
     */
    imageUrl: string;
    /**
     * Configures the popup of the DropDownButton.
     *
     * The available options are:
     * - `animate`&mdash;Enables or disables the popup animation.
     * - `popupClass`&mdash;Specifies the list of CSS classes used for styling the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Sets the data item field that represents the item text.
     * If the data contains only primitive values, do not define it.
     */
    textField: string;
    /**
     * Sets the disabled state of the DropDownButton.
     */
    disabled: boolean;
    /**
     * Sets or gets the data of the DropDownButton.
     *
     * > The data has to be provided in an array-like list.
     */
    data: any;
    /**
     * Sets or gets the `open` property of the DropDownButton.
     * The `open` property determines whether the popup list of the DropDownButton is visible or not.
     */
    open: boolean;
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabIndex: number;
    /**
     * Fires each time the user clicks on a drop-down list item. The event data contains the data item bound to the clicked list item.
     */
    itemClick: EventEmitter<any>;
    readonly componentTabIndex: number;
    readonly focused: boolean;
    readonly role: string;
    readonly ariaDisabled: boolean;
    readonly ariaExpanded: boolean;
    readonly ariaHasPopup: boolean;
    readonly ariaOwns: string;
    readonly widgetClasses: boolean;
    readonly dir: Direction;
    /**
     * @hidden
     */
    readonly active: boolean;
    itemTemplate: ButtonItemTemplateDirective;
    /**
     * @hidden
     */
    focus(): void;
    /**
     * @hidden
     */
    blur(): void;
    /**
     * @hidden
     */
    keydown(event: any): void;
    /**
     * @hidden
     */
    keypress(event: any): void;
    /**
     * @hidden
     */
    keyup(event: any): void;
    /**
     * @hidden
     */
    mousedown(event: any): void;
    /**
     * @hidden
     */
    readonly anchorAlign: Align;
    /**
     * @hidden
     */
    readonly popupAlign: Align;
    constructor(focusService: FocusService, navigationService: NavigationService, wrapperRef: ElementRef, renderer: Renderer, direction: Direction);
    protected subscribeNavigationEvents(): void;
    private onNavigationEnterPress();
    private onNavigationEnterUp();
    private onNavigationOpen();
    private onNavigationClose();
    private onArrowKeyNavigate(index);
}
