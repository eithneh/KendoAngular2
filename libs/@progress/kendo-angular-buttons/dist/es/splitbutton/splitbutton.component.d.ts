import { ElementRef, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, Renderer } from '@angular/core';
import { Align } from '@progress/kendo-angular-popup';
import { ListButton } from './../listbutton/list-button';
import { PopupSettings } from './../listbutton/popup-settings';
import { ButtonItemTemplateDirective } from './../listbutton/button-item-template.directive';
import { FocusService } from './../focusable/focus.service';
import { NavigationService } from './../navigation/navigation.service';
import { Direction } from '../direction';
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
export declare class SplitButtonComponent extends ListButton implements AfterViewInit, OnChanges {
    /**
     * hidden
     */
    readonly anchorAlign: Align;
    /**
     * hidden
     */
    readonly popupAlign: Align;
    /**
     * Sets the text of the SplitButton.
     */
    text: string;
    /**
     * Defines an icon to be rendered next to the button text.
     */
    icon: string;
    /**
     * Defines an icon with a custom CSS class to be rendered next to the button text.
     */
    iconClass: string;
    /**
     * Defines the location of an image to be displayed next to the button text.
     */
    imageUrl: string;
    /**
     * When set to `true`, disables a SplitButton item.
     */
    disabled: boolean;
    /**
     * Configures the popup of the SplitButton.
     *
     * The available options are:
     * - `animate`&mdash;Enables or disables the popup animation.
     * - `popupClass`&mdash;Specifies a list of CSS classes used for styling the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabIndex: number;
    /**
     * Configures the text field of the button-list popup.
     */
    textField: string;
    /**
     * An item template that helps to customize the item content.
     */
    itemTemplate: ButtonItemTemplateDirective;
    /**
     * Fires each time the user clicks the main button.
     */
    buttonClick: EventEmitter<any>;
    /**
     * Fires each time the user clicks on the drop-down list. The event data contains the data item bound to the clicked list item.
     */
    itemClick: EventEmitter<any>;
    /**
     * Sets the data of the SplitButton.
     *
     * > The data has to be provided in an array-like list.
     */
    data: any;
    /**
     * Sets or gets the `open` property of the SplitButton.
     * The `open` property determines whether the popup list of the SplitButton is visible or not.
     */
    open: boolean;
    /**
     * @hidden
     */
    readonly active: boolean;
    isFocused: boolean;
    readonly widgetClasses: boolean;
    readonly widgetTabIndex: number;
    readonly role: string;
    readonly ariaDisabled: boolean;
    readonly ariaExpanded: boolean;
    readonly ariaHasPopup: boolean;
    readonly ariaOwns: string;
    readonly ariaLabel: string;
    readonly dir: string;
    /**
     * @hidden
     */
    onButtonFocus(): boolean;
    /**
     * @hidden
     */
    onButtonClick(): void;
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
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: SimpleChanges): void;
    constructor(focusService: FocusService, navigationService: NavigationService, wrapperRef: ElementRef, renderer: Renderer, direction: Direction);
    protected enterHanlder(): void;
    private buttonText;
    private direction;
    private updateButtonText();
}
