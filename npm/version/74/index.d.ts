/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO: These types exist to fill a gap in TS' built-in types.

interface Entry {}
interface DirectoryEntry extends Entry {}
interface FileEntry extends Entry {}
interface FileSystem {}
interface LocalMediaStream {}

declare namespace chrome {
  // TODO: This fixes devtools' types which refer to 'global'.
  type global = typeof Window;
}
// Generated on Thu Dec 17 2020 17:37:10 GMT+1100 (Australian Eastern Daylight Time)

declare namespace chrome {
  /**
   * Use the <code>chrome.accessibilityFeatures</code> API to manage Chrome's
   * accessibility features. This API relies on the <a
   * href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for
   * getting and setting individual accessibility features. In order to get
   * feature states the extension must request
   * <code>accessibilityFeatures.read</code> permission. For modifying feature
   * state, the extension needs <code>accessibilityFeatures.modify</code>
   * permission. Note that <code>accessibilityFeatures.modify</code> does not
   * imply <code>accessibilityFeatures.read</code> permission.
   * @chrome-permission accessibilityFeatures.modify
 * @chrome-permission accessibilityFeatures.read
 */
  export namespace accessibilityFeatures {
    /**
     * <p><strong>ChromeOS only.</strong></p><p>Spoken feedback (text-to-speech).
     * The value indicates whether the feature is enabled or not. <code>get()</code>
     * requires <code>accessibilityFeatures.read</code> permission.
     * <code>set()</code> and <code>clear()</code> require
     * <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export const spokenFeedback: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Enlarged cursor. The value indicates
     * whether the feature is enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.</p>
     */
    export const largeCursor: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Sticky modifier keys (like shift or
     * alt). The value indicates whether the feature is enabled or not.
     * <code>get()</code> requires <code>accessibilityFeatures.read</code>
     * permission. <code>set()</code> and <code>clear()</code> require
     * <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export const stickyKeys: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>High contrast rendering mode. The
     * value indicates whether the feature is enabled or not. <code>get()</code>
     * requires <code>accessibilityFeatures.read</code> permission.
     * <code>set()</code> and <code>clear()</code> require
     * <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export const highContrast: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Full screen magnification. The value
     * indicates whether the feature is enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.</p>
     */
    export const screenMagnifier: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Auto mouse click after mouse stops
     * moving. The value indicates whether the feature is enabled or not.
     * <code>get()</code> requires <code>accessibilityFeatures.read</code>
     * permission. <code>set()</code> and <code>clear()</code> require
     * <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export const autoclick: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Virtual on-screen keyboard. The
     * value indicates whether the feature is enabled or not. <code>get()</code>
     * requires <code>accessibilityFeatures.read</code> permission.
     * <code>set()</code> and <code>clear()</code> require
     * <code>accessibilityFeatures.modify</code> permission.</p>
     */
    export const virtualKeyboard: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Caret highlighting. The value
     * indicates whether the feature is enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.</p>
     */
    export const caretHighlight: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Cursor highlighting. The value
     * indicates whether the feature is enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.</p>
     */
    export const cursorHighlight: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Focus highlighting. The value
     * indicates whether the feature is enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.</p>
     */
    export const focusHighlight: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Select-to-speak. The value indicates
     * whether the feature is enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.</p>
     */
    export const selectToSpeak: types.ChromeSetting<boolean>;

    /**
     * <p><strong>ChromeOS only.</strong></p><p>Switch access. The value indicates
     * whether the feature is enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.</p>
     */
    export const switchAccess: types.ChromeSetting<boolean>;

    /**
     * <code>get()</code> requires <code>accessibilityFeatures.read</code>
     * permission. <code>set()</code> and <code>clear()</code> require
     * <code>accessibilityFeatures.modify</code> permission.
     */
    export const animationPolicy: types.ChromeSetting<"allowed" | "once" | "none">;
  }
}

declare namespace chrome {
  /**
   * Use actions to put icons in the main Google Chrome toolbar, to the right of
   * the address bar. Actions can be set to take action on all pages
   * (default_state: enabled) or only the current page (default_state: disabled).
   * If an action is default disabled, the action appears grayed out when
   * inactive. In addition to its <a href='action#icon'>icon</a>, an action can
   * also have a <a href='action#tooltip'>tooltip</a>, a <a
   * href='action#badge'>badge</a>, and a <a href='action#popups'>popup</a>.
   */
  export namespace action {
    /**
     * Sets the title of the action. This shows up in the tooltip.
     * @param details
     * @param callback
     */
    export function setTitle(
      details: {
        /**
         * The string the action should display when moused over.
         */
        title: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the title of the action.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getTitle(
      details: {
        /**
         * Specify the tab to get the title from. If no tab is specified, the
         * non-tab-specific title is returned.
         */
        tabId?: number,
      },
      callback: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the icon for the action. The icon can be specified either as the path to
     * an image file or as the pixel data from a canvas element, or as dictionary of
     * either one of those. Either the <b>path</b> or the <b>imageData</b> property
     * must be specified.
     * @param details
     * @param callback
     */
    export function setIcon(
      details: {
        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing
         * icon to be set. If the icon is specified as a dictionary, the actual image to
         * be used is chosen depending on screen's pixel density. If the number of image
         * pixels that fit into one screen space unit equals <code>scale</code>, then
         * image with size <code>scale</code> * n will be selected, where n is the size
         * of the icon in the UI. At least one image must be specified. Note that
         * 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'
         */
        imageData?: browserAction.ImageDataType | {[name: string]: any},

        /**
         * Either a relative image path or a dictionary {size -> relative image path}
         * pointing to icon to be set. If the icon is specified as a dictionary, the
         * actual image to be used is chosen depending on screen's pixel density. If the
         * number of image pixels that fit into one screen space unit equals
         * <code>scale</code>, then image with size <code>scale</code> * n will be
         * selected, where n is the size of the icon in the UI. At least one image must
         * be specified. Note that 'details.path = foo' is equivalent to 'details.path =
         * {'16': foo}'
         */
        path?: string | {[name: string]: any},

        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Sets the html document to be opened as a popup when the user clicks on the
     * action's icon.
     * @param details
     * @param callback
     */
    export function setPopup(
      details: {
        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,

        /**
         * The html file to show in a popup.  If set to the empty string (''), no popup
         * is shown.
         */
        popup: string,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the html document set as the popup for this action.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getPopup(
      details: {
        /**
         * Specify the tab to get the popup from. If no tab is specified, the
         * non-tab-specific popup is returned.
         */
        tabId?: number,
      },
      callback: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the badge text for the action. The badge is displayed on top of the
     * icon.
     * @param details
     * @param callback
     */
    export function setBadgeText(
      details: {
        /**
         * Any number of characters can be passed, but only about four can fit in the
         * space.
         */
        text: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the badge text of the action. If no tab is specified, the
     * non-tab-specific badge text is returned.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getBadgeText(
      details: {
        /**
         * Specify the tab to get the badge text from. If no tab is specified, the
         * non-tab-specific badge text is returned.
         */
        tabId?: number,
      },
      callback: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the background color for the badge.
     * @param details
     * @param callback
     */
    export function setBadgeBackgroundColor(
      details: {
        /**
         * An array of four integers in the range [0,255] that make up the RGBA color of
         * the badge. For example, opaque red is <code>[255, 0, 0, 255]</code>. Can also
         * be a string with a CSS value, with opaque red being <code>#FF0000</code> or
         * <code>#F00</code>.
         */
        color: string | browserAction.ColorArray,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the background color of the action.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getBadgeBackgroundColor(
      details: {
        /**
         * Specify the tab to get the badge background color from. If no tab is
         * specified, the non-tab-specific badge background color is returned.
         */
        tabId?: number,
      },
      callback: (
        result: browserAction.ColorArray,
      ) => void,
    ): void;

    /**
     * Enables the action for a tab. By default, actions are enabled.
     * @param tabId The id of the tab for which you want to modify the action.
     * @param callback
     */
    export function enable(
      tabId?: number,
      callback?: () => void,
    ): void;

    /**
     * Disables the action for a tab.
     * @param tabId The id of the tab for which you want to modify the action.
     * @param callback
     */
    export function disable(
      tabId?: number,
      callback?: () => void,
    ): void;

    /**
     * Fired when an action icon is clicked.  This event will not fire if the
     * action has a popup.
     */
    export const onClicked: chrome.events.Event<
      /**
       * @param tab
       */
      (
        tab: tabs.Tab,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.alarms</code> API to schedule code to run
 periodically
   * or at a specified time in the future.
   * @chrome-permission alarms
 */
  export namespace alarms {
    export interface Alarm {
      /**
       * Name of this alarm.
       */
      name: string;

      /**
       * Time at which this alarm was scheduled to fire, in milliseconds past the
       * epoch (e.g. <code>Date.now() + n</code>).  For performance reasons, the alarm
       * may have been delayed an arbitrary amount beyond this.
       */
      scheduledTime: number;

      /**
       * If not null, the alarm is a repeating alarm and will fire again in
       * <var>periodInMinutes</var> minutes.
       */
      periodInMinutes?: number;
    }

    export interface AlarmCreateInfo {
      /**
       * Time at which the alarm should fire, in milliseconds past the epoch (e.g.
       * <code>Date.now() + n</code>).
       */
      when?: number;

      /**
       * <p>Length of time in minutes after which the <code>onAlarm</code> event
       * should fire.</p><p><!-- TODO: need minimum=0 --></p>
       */
      delayInMinutes?: number;

      /**
       * <p>If set, the onAlarm event should fire every <var>periodInMinutes</var>
       * minutes after the initial event specified by <var>when</var> or
       * <var>delayInMinutes</var>.  If not set, the alarm will only fire
       * once.</p><p><!-- TODO: need minimum=0 --></p>
       */
      periodInMinutes?: number;
    }

    /**
     * <p>Creates an alarm.  Near the time(s) specified by <var>alarmInfo</var>, the
     * <code>onAlarm</code> event is fired. If there is another alarm with the same
     * name (or no name if none is specified), it will be cancelled and replaced by
     * this alarm.</p><p>In order to reduce the load on the user's machine, Chrome
     * limits alarms to at most once every 1 minute but may delay them an arbitrary
     * amount more.  That is, setting <code>delayInMinutes</code> or
     * <code>periodInMinutes</code> to less than <code>1</code> will not be honored
     * and will cause a warning.  <code>when</code> can be set to less than 1 minute
     * after "now" without warning but won't actually cause the alarm to fire for at
     * least 1 minute.</p><p>To help you debug your app or extension, when you've
     * loaded it unpacked, there's no limit to how often the alarm can fire.</p>
     * @param name Optional name to identify this alarm. Defaults to the empty string.
     * @param alarmInfo Describes when the alarm should fire.  The initial time must be specified by either <var>when</var> or <var>delayInMinutes</var> (but not both).  If <var>periodInMinutes</var> is set, the alarm will repeat every <var>periodInMinutes</var> minutes after the initial event.  If neither <var>when</var> or <var>delayInMinutes</var> is set for a repeating alarm, <var>periodInMinutes</var> is used as the default for <var>delayInMinutes</var>.
     */
    export function create(
      name: string,
      alarmInfo: AlarmCreateInfo,
    ): void;

    /**
     * <p>Creates an alarm.  Near the time(s) specified by <var>alarmInfo</var>, the
     * <code>onAlarm</code> event is fired. If there is another alarm with the same
     * name (or no name if none is specified), it will be cancelled and replaced by
     * this alarm.</p><p>In order to reduce the load on the user's machine, Chrome
     * limits alarms to at most once every 1 minute but may delay them an arbitrary
     * amount more.  That is, setting <code>delayInMinutes</code> or
     * <code>periodInMinutes</code> to less than <code>1</code> will not be honored
     * and will cause a warning.  <code>when</code> can be set to less than 1 minute
     * after "now" without warning but won't actually cause the alarm to fire for at
     * least 1 minute.</p><p>To help you debug your app or extension, when you've
     * loaded it unpacked, there's no limit to how often the alarm can fire.</p>
     * @param alarmInfo Describes when the alarm should fire.  The initial time must be specified by either <var>when</var> or <var>delayInMinutes</var> (but not both).  If <var>periodInMinutes</var> is set, the alarm will repeat every <var>periodInMinutes</var> minutes after the initial event.  If neither <var>when</var> or <var>delayInMinutes</var> is set for a repeating alarm, <var>periodInMinutes</var> is used as the default for <var>delayInMinutes</var>.
     */
    export function create(
      alarmInfo: AlarmCreateInfo,
    ): void;

    /**
     * Retrieves details about the specified alarm.
     * @param name The name of the alarm to get. Defaults to the empty string.
     * @param callback
     * @param callback.alarm
     */
    export function get(
      name: string,
      callback: (
        alarm?: Alarm,
      ) => void,
    ): void;

    /**
     * Retrieves details about the specified alarm.
     * @param callback
     * @param callback.alarm
     */
    export function get(
      callback: (
        alarm?: Alarm,
      ) => void,
    ): void;

    /**
     * Gets an array of all the alarms.
     * @param callback
     * @param callback.alarms
     */
    export function getAll(
      callback: (
        alarms: Alarm[],
      ) => void,
    ): void;

    /**
     * Clears the alarm with the given name.
     * @param name The name of the alarm to clear. Defaults to the empty string.
     * @param callback
     * @param callback.wasCleared
     */
    export function clear(
      name?: string,
      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;

    /**
     * Clears all alarms.
     * @param callback
     * @param callback.wasCleared
     */
    export function clearAll(
      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;

    /**
     * Fired when an alarm has elapsed. Useful for event pages.
     */
    export const onAlarm: chrome.events.Event<
      /**
       * @param alarm The alarm that has elapsed.
       */
      (
        alarm: Alarm,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * none
   */
  export namespace app {
    /**
     * TODO (it's a manifest)
     */
    export interface Details {
    }

    export interface DOMWindow {
    }

    export type InstallState = "not_installed" | "installed" | "disabled";

    export type RunningState = "running" | "cannot_run" | "ready_to_run";

    /**
     * TODO
     * @returns TODO
     */
    export function getIsInstalled(): boolean;

    /**
     * TODO
     * @param callback
     * @param callback.state
     */
    export function installState(
      callback: (
        state: InstallState,
      ) => void,
    ): void;

    /**
     * TODO
     */
    export function runningState(): RunningState;

    /**
     * TODO
     * @returns TODO
     */
    export function getDetails(): Details;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.automation</code> API allows developers to access the
   * automation (accessibility) tree for the browser. The tree resembles the DOM
   * tree, but only exposes the <em>semantic</em> structure of a page. It can be
   * used to programmatically interact with a page by examining names, roles, and
   * states, listening for events, and performing actions on nodes.
   * @alpha
 */
  export namespace automation {
    /**
     * Possible events fired on an {@link automation.AutomationNode}.
     */
    export type EventType = "activedescendantchanged" | "alert" | "ariaAttributeChanged" | "autocorrectionOccured" | "blur" | "checkedStateChanged" | "childrenChanged" | "clicked" | "documentSelectionChanged" | "documentTitleChanged" | "expandedChanged" | "focus" | "focusContext" | "imageFrameUpdated" | "hide" | "hitTestResult" | "hover" | "invalidStatusChanged" | "layoutComplete" | "liveRegionCreated" | "liveRegionChanged" | "loadComplete" | "loadStart" | "locationChanged" | "mediaStartedPlaying" | "mediaStoppedPlaying" | "menuEnd" | "menuListItemSelected" | "menuListValueChanged" | "menuPopupEnd" | "menuPopupHide" | "menuPopupStart" | "menuStart" | "mouseCanceled" | "mouseDragged" | "mouseMoved" | "mousePressed" | "mouseReleased" | "rowCollapsed" | "rowCountChanged" | "rowExpanded" | "scrollPositionChanged" | "scrolledToAnchor" | "selectedChildrenChanged" | "selection" | "selectionAdd" | "selectionRemove" | "show" | "stateChanged" | "textChanged" | "textSelectionChanged" | "windowActivated" | "windowDeactivated" | "treeChanged" | "valueChanged";

    /**
     * Describes the purpose of an {@link automation.AutomationNode}.
     */
    export type RoleType = "abbr" | "alert" | "alertDialog" | "anchor" | "annotation" | "application" | "article" | "audio" | "banner" | "blockquote" | "button" | "canvas" | "caption" | "caret" | "cell" | "checkBox" | "client" | "colorWell" | "column" | "columnHeader" | "comboBoxGrouping" | "comboBoxMenuButton" | "complementary" | "contentDeletion" | "contentInsertion" | "contentInfo" | "date" | "dateTime" | "definition" | "descriptionList" | "descriptionListDetail" | "descriptionListTerm" | "desktop" | "details" | "dialog" | "directory" | "disclosureTriangle" | "docAbstract" | "docAcknowledgments" | "docAfterword" | "docAppendix" | "docBackLink" | "docBiblioEntry" | "docBibliography" | "docBiblioRef" | "docChapter" | "docColophon" | "docConclusion" | "docCover" | "docCredit" | "docCredits" | "docDedication" | "docEndnote" | "docEndnotes" | "docEpigraph" | "docEpilogue" | "docErrata" | "docExample" | "docFootnote" | "docForeword" | "docGlossary" | "docGlossRef" | "docIndex" | "docIntroduction" | "docNoteRef" | "docNotice" | "docPageBreak" | "docPageList" | "docPart" | "docPreface" | "docPrologue" | "docPullquote" | "docQna" | "docSubtitle" | "docTip" | "docToc" | "document" | "embeddedObject" | "feed" | "figcaption" | "figure" | "footer" | "form" | "genericContainer" | "graphicsDocument" | "graphicsObject" | "graphicsSymbol" | "grid" | "group" | "heading" | "iframe" | "iframePresentational" | "ignored" | "image" | "imageMap" | "inlineTextBox" | "inputTime" | "keyboard" | "labelText" | "layoutTable" | "layoutTableCell" | "layoutTableColumn" | "layoutTableRow" | "legend" | "lineBreak" | "link" | "list" | "listBox" | "listBoxOption" | "listGrid" | "listItem" | "listMarker" | "log" | "main" | "mark" | "marquee" | "math" | "menu" | "menuBar" | "menuButton" | "menuItem" | "menuItemCheckBox" | "menuItemRadio" | "menuListOption" | "menuListPopup" | "meter" | "navigation" | "note" | "pane" | "paragraph" | "popUpButton" | "pre" | "presentational" | "progressIndicator" | "radioButton" | "radioGroup" | "region" | "rootWebArea" | "row" | "rowHeader" | "ruby" | "scrollBar" | "scrollView" | "search" | "searchBox" | "slider" | "sliderThumb" | "spinButton" | "splitter" | "staticText" | "status" | "svgRoot" | "switch" | "tab" | "tabList" | "tabPanel" | "table" | "tableHeaderContainer" | "term" | "textField" | "textFieldWithComboBox" | "time" | "timer" | "titleBar" | "toggleButton" | "toolbar" | "tooltip" | "tree" | "treeGrid" | "treeItem" | "unknown" | "video" | "webArea" | "webView" | "window";

    /**
     * Describes characteristics of an {@link automation.AutomationNode}.
     */
    export type StateType = "autofillAvailable" | "collapsed" | "default" | "editable" | "expanded" | "focusable" | "focused" | "horizontal" | "hovered" | "ignored" | "invisible" | "linked" | "multiline" | "multiselectable" | "offscreen" | "protected" | "required" | "richlyEditable" | "vertical" | "visited";

    /**
     * All possible actions that can be performed on automation nodes.
     */
    export type ActionType = "annotatePageImages" | "blur" | "clearAccessibilityFocus" | "customAction" | "decrement" | "doDefault" | "focus" | "getImageData" | "getTextLocation" | "hitTest" | "increment" | "loadInlineTextBoxes" | "replaceSelectedText" | "scrollBackward" | "scrollDown" | "scrollForward" | "scrollLeft" | "scrollRight" | "scrollUp" | "scrollToMakeVisible" | "scrollToPoint" | "setAccessibilityFocus" | "setScrollOffset" | "setSelection" | "setSequentialFocusNavigationStartingPoint" | "setValue" | "showContextMenu";

    /**
     * <p>Possible changes to the automation tree. For any given atomic change to
     * the tree, each node that's added, removed, or changed, will appear in exactly
     * one TreeChange, with one of these types.</p><p>nodeCreated means that this
     * node was added to the tree and its parent is new as well, so it's just one
     * node in a new subtree that was added.</p>
     */
    export type TreeChangeType = "nodeCreated" | "subtreeCreated" | "nodeChanged" | "textChanged" | "nodeRemoved" | "subtreeUpdateEnd";

    /**
     * Where the node's name is from.
     */
    export type NameFromType = "uninitialized" | "attribute" | "attributeExplicitlyEmpty" | "caption" | "contents" | "placeholder" | "relatedElement" | "title" | "value";

    /**
     * The input restriction for a object -- even non-controls can be disabled.
     */
    export type Restriction = "disabled" | "readOnly";

    /**
     * Indicates the availability and type of interactive popup element
     */
    export type HasPopup = "true" | "menu" | "listbox" | "tree" | "grid" | "dialog";

    /**
     * Describes possible actions when performing a do default action.
     */
    export type DefaultActionVerb = "activate" | "check" | "click" | "clickAncestor" | "jump" | "open" | "press" | "select" | "uncheck";

    export interface Rect {
      left: number;

      top: number;

      width: number;

      height: number;
    }

    export interface FindParams {
      role?: RoleType;

      /**
       * A map of {@link automation.StateType} to boolean, indicating for each state
       * whether it should be set or not. For example: <code>{ StateType.disabled:
       * false }</code> would only match if <code>StateType.disabled</code> was
       * <em>not</em> present in the node's <code>state</code> object.
       */
      state?: {[name: string]: any};

      /**
       * A map of attribute name to expected value, for example <code>{ name: 'Root
       * directory', checkbox_mixed: true }</code>. String attribute values may be
       * specified as a regex, for example <code>{ name: /stralia$/</code> }</code>.
       * Unless specifying a regex, the expected value must be an exact match in type
       * and value for the actual value. Thus, the type of expected value must be one
       * of: <ul> <li>string</li> <li>integer</li> <li>float</li> <li>boolean</li>
       * </ul>
       */
      attributes?: {[name: string]: any};
    }

    export interface SetDocumentSelectionParams {
      /**
       * The node where the selection begins.
       */
      anchorObject: AutomationNode;

      /**
       * The offset in the anchor node where the selection begins.
       */
      anchorOffset: number;

      /**
       * The node where the selection ends.
       */
      focusObject: AutomationNode;

      /**
       * The offset within the focus node where the selection ends.
       */
      focusOffset: number;
    }

    export interface AutomationEvent {
      /**
       * The {@link automation.AutomationNode} to which the event was targeted.
       */
      target: AutomationNode;

      /**
       * The type of the event.
       */
      type: EventType;

      /**
       * The source of this event.
       */
      eventFrom: string;

      mouseX: number;

      mouseY: number;

      /**
       * Stops this event from further processing except for any remaining listeners
       * on {@link AutomationEvent.target}.
       */
      stopPropagation: () => void;
    }

    export interface TreeChange {
      /**
       * The {@link automation.AutomationNode} that changed.
       */
      target: AutomationNode;

      /**
       * The type of change.
       */
      type: TreeChangeType;
    }

    /**
     * Possible tree changes to listen to using addTreeChangeObserver. Note that
     * listening to all tree changes can be expensive.
     */
    export type TreeChangeObserverFilter = "noTreeChanges" | "liveRegionTreeChanges" | "textMarkerChanges" | "allTreeChanges";

    export interface CustomAction {
      id: number;

      description: string;
    }

    export interface AutomationNode {
      /**
       * The root node of the tree containing this AutomationNode.
       */
      root?: AutomationNode;

      /**
       * Whether this AutomationNode is a root node.
       */
      isRootNode: boolean;

      /**
       * The role of this node.
       */
      role?: RoleType;

      /**
       * The {@link automation.StateType}s describing this node.
       * @type {Object<chrome.automation.StateType, boolean>}
       */
      state?: {[name: string]: any};

      /**
       * The rendered location (as a bounding box) of this node in global screen
       * coordinates.
       */
      location?: Rect;

      /**
       * Determines the location of the text within the node specified by |startIndex|
       * and |endIndex|, inclusively. Invokes |callback| with the bounding rectangle,
       * in screen coordinates. |callback| can be invoked either synchronously or
       * asynchronously.
       * @param boundsForRange.startIndex
       * @param boundsForRange.endIndex
       */
      boundsForRange: (
        startIndex: number,
        endIndex: number,
        callback: (
          bounds: Rect,
        ) => void,
      ) => void;

      /**
       * The location (as a bounding box) of this node in global screen coordinates
       * without applying any clipping from ancestors.
       */
      unclippedLocation?: Rect;

      /**
       * The purpose of the node, other than the role, if any.
       */
      description?: string;

      /**
       * The placeholder for this text field, if any.
       */
      placeholder?: string;

      /**
       * The role description for this node.
       */
      roleDescription?: string;

      /**
       * The accessible name for this node, via the <a
       * href="http://www.w3.org/TR/wai-aria/roles#namecalculation"> Accessible Name
       * Calculation</a> process.
       */
      name?: string;

      /**
       * The source of the name.
       */
      nameFrom?: NameFromType;

      /**
       * The image annotation for image nodes, which may be a human-readable string
       * that is the contextualized annotation or a status string related to
       * annotations.
       */
      imageAnnotation?: string;

      /**
       * The value for this node: for example the <code>value</code> attribute of an
       * <code>&lt;input&gt; element.
       */
      value?: string;

      /**
       * The HTML tag for this element, if this node is an HTML element.
       */
      htmlTag?: string;

      /**
       * The level of a heading or tree item.
       */
      hierarchicalLevel?: number;

      /**
       * The start and end index of each word in an inline text box.
       */
      wordStarts?: number[];

      wordEnds?: number[];

      /**
       * The nodes, if any, which this node is specified to control via <a
       * href="http://www.w3.org/TR/wai-aria/states_and_properties#aria-controls">
       * <code>aria-controls</code></a>.
       */
      controls?: AutomationNode[];

      /**
       * The nodes, if any, which form a description for this node.
       */
      describedBy?: AutomationNode[];

      /**
       * The nodes, if any, which may optionally be navigated to after this one. See
       * <a href="http://www.w3.org/TR/wai-aria/states_and_properties#aria-flowto">
       * <code>aria-flowto</code></a>.
       */
      flowTo?: AutomationNode[];

      /**
       * The nodes, if any, which form a label for this element. Generally, the text
       * from these elements will also be exposed as the element's accessible name,
       * via the {@link automation.AutomationNode.name} attribute.
       */
      labelledBy?: AutomationNode[];

      /**
       * The node referred to by <code>aria-activedescendant</code>, where applicable
       */
      activeDescendant?: AutomationNode;

      /**
       * Reverse relationship for active descendant.
       */
      activeDescendantFor?: AutomationNode[];

      /**
       * The target of an in-page link.
       */
      inPageLinkTarget?: AutomationNode;

      /**
       * A node that provides more details about the current node.
       */
      details?: AutomationNode;

      /**
       * A node that provides an error message for a current node.
       */
      errorMessage?: AutomationNode;

      /**
       * Reverse relationship for details.
       */
      detailsFor?: AutomationNode[];

      /**
       * Reverse relationship for errorMessage.
       */
      errorMessageFor?: AutomationNode[];

      /**
       * Reverse relationship for controls.
       */
      controlledBy?: AutomationNode[];

      /**
       * Reverse relationship for describedBy.
       */
      descriptionFor?: AutomationNode[];

      /**
       * Reverse relationship for flowTo.
       */
      flowFrom?: AutomationNode[];

      /**
       * Reverse relationship for labelledBy.
       */
      labelFor?: AutomationNode[];

      /**
       * The column header nodes for a table cell.
       */
      tableCellColumnHeaders?: AutomationNode[];

      /**
       * The row header nodes for a table cell.
       */
      tableCellRowHeaders?: AutomationNode[];

      /**
       * An array of standard actions available on this node.
       */
      standardActions?: ActionType[];

      /**
       * An array of custom actions.
       */
      customActions?: CustomAction[];

      /**
       * The action taken by calling <code>doDefault</code>.
       */
      defaultActionVerb?: DefaultActionVerb;

      /**
       * The URL that this link will navigate to.
       */
      url?: string;

      /**
       * The URL of this document.
       */
      docUrl?: string;

      /**
       * The title of this document.
       */
      docTitle?: string;

      /**
       * Whether this document has finished loading.
       */
      docLoaded?: boolean;

      /**
       * The proportion (out of 1.0) that this doc has completed loading.
       */
      docLoadingProgress?: number;

      /**
       * Scrollable container attributes.
       */
      scrollX?: number;

      scrollXMin?: number;

      scrollXMax?: number;

      scrollY?: number;

      scrollYMin?: number;

      scrollYMax?: number;

      /**
       * Indicates whether this node is scrollable.
       */
      scrollable?: boolean;

      /**
       * The character index of the start of the selection within this editable text
       * element; -1 if no selection.
       */
      textSelStart?: number;

      /**
       * The character index of the end of the selection within this editable text
       * element; -1 if no selection.
       */
      textSelEnd?: number;

      /**
       * The input type, like email or number.
       */
      textInputType?: string;

      /**
       * An array of indexes of the start position of each text marker.
       */
      markerStarts: number[];

      /**
       * An array of indexes of the end position of each text marker.
       */
      markerEnds: number[];

      /**
       * An array of numerical types indicating the type of each text marker, such as
       * a spelling error.
       */
      markerTypes: number[];

      /**
       * The anchor node of the tree selection, if any.
       */
      anchorObject?: AutomationNode;

      /**
       * The anchor offset of the tree selection, if any.
       */
      anchorOffset?: number;

      /**
       * The affinity of the tree selection anchor, if any.
       */
      anchorAffinity?: string;

      /**
       * The focus node of the tree selection, if any.
       */
      focusObject?: AutomationNode;

      /**
       * The focus offset of the tree selection, if any.
       */
      focusOffset?: number;

      /**
       * The affinity of the tree selection focus, if any.
       */
      focusAffinity?: string;

      /**
       * The current value for this range.
       */
      valueForRange?: number;

      /**
       * The minimum possible value for this range.
       */
      minValueForRange?: number;

      /**
       * The maximum possible value for this range.
       */
      maxValueForRange?: number;

      /**
       * The 1-based index of an item in a set.
       */
      posInSet?: number;

      /**
       * The number of items in a set;
       */
      setSize?: number;

      /**
       * The number of rows in this table as specified in the DOM.
       */
      tableRowCount?: number;

      /**
       * The number of rows in this table as specified by the page author.
       */
      ariaRowCount?: number;

      /**
       * The number of columns in this table as specified in the DOM.
       */
      tableColumnCount?: number;

      /**
       * The number of columns in this table as specified by the page author.
       */
      ariaColumnCount?: number;

      /**
       * The zero-based index of the column that this cell is in as specified in the
       * DOM.
       */
      tableCellColumnIndex?: number;

      /**
       * The ARIA column index as specified by the page author.
       */
      ariaCellColumnIndex?: number;

      /**
       * The number of columns that this cell spans (default is 1).
       */
      tableCellColumnSpan?: number;

      /**
       * The zero-based index of the row that this cell is in as specified in the DOM.
       */
      tableCellRowIndex?: number;

      /**
       * The ARIA row index as specified by the page author.
       */
      ariaCellRowIndex?: number;

      /**
       * The number of rows that this cell spans (default is 1).
       */
      tableCellRowSpan?: number;

      /**
       * The corresponding column header for this cell.
       */
      tableColumnHeader?: AutomationNode;

      /**
       * The corresponding row header for this cell.
       */
      tableRowHeader?: AutomationNode;

      /**
       * The column index of this column node.
       */
      tableColumnIndex?: number;

      /**
       * The row index of this row node.
       */
      tableRowIndex?: number;

      /**
       * The type of region if this is the root of a live region. Possible values are
       * 'polite' and 'assertive'.
       */
      liveStatus?: string;

      /**
       * The value of aria-relevant for a live region.
       */
      liveRelevant?: string;

      /**
       * The value of aria-atomic for a live region.
       */
      liveAtomic?: boolean;

      /**
       * The value of aria-busy for a live region or any other element.
       */
      busy?: boolean;

      /**
       * The type of live region if this node is inside a live region.
       */
      containerLiveStatus?: string;

      /**
       * The value of aria-relevant if this node is inside a live region.
       */
      containerLiveRelevant?: string;

      /**
       * The value of aria-atomic if this node is inside a live region.
       */
      containerLiveAtomic?: boolean;

      /**
       * The value of aria-busy if this node is inside a live region.
       */
      containerLiveBusy?: boolean;

      /**
       * Aria auto complete.
       */
      autoComplete?: string;

      /**
       * The name of the programmatic backing object.
       */
      className?: string;

      /**
       * Marks this subtree as modal.
       */
      modal?: boolean;

      /**
       * A map containing all HTML attributes and their values
       * @type {Object<string>}
       */
      htmlAttributes?: {[name: string]: any};

      /**
       * The input type of a text field, such as "text" or "email".
       */
      inputType?: string;

      /**
       * The key that activates this widget.
       */
      accessKey?: string;

      /**
       * The value of the aria-invalid attribute, indicating the error type.
       */
      ariaInvalidValue?: string;

      /**
       * The CSS display attribute for this node, if applicable.
       */
      display?: string;

      /**
       * A data url with the contents of this object's image or thumbnail.
       */
      imageDataUrl?: string;

      /**
       * The author-provided language code for this subtree.
       */
      language?: string;

      /**
       * The detected language code for this subtree.
       */
      detectedLanguage?: string;

      /**
       * Indicates the availability and type of interactive popup element true - the
       * popup is a menu menu - the popup is a menu listbox - the popup is a listbox
       * tree - the popup is a tree grid - the popup is a grid dialog - the popup is a
       * dialog
       */
      hasPopup?: string;

      /**
       * Input restriction, if any, such as readonly or disabled: undefined - enabled
       * control or other object that is not disabled Restriction.DISABLED - disallows
       * input in itself + any descendants Restriction.READONLY - allow
       * focus/selection but not input
       */
      restriction?: string;

      /**
       * Tri-state describing checkbox or radio button: 'false' | 'true' | 'mixed'
       */
      checked?: string;

      /**
       * The inner html of this element. Only populated for math content.
       */
      innerHtml?: string;

      /**
       * The RGBA foreground color of this subtree, as an integer.
       */
      color?: number;

      /**
       * The RGBA background color of this subtree, as an integer.
       */
      backgroundColor?: number;

      /**
       * The RGBA color of an input element whose value is a color.
       */
      colorValue?: number;

      /**
       * Indicates node text is subscript.
       */
      subscript: boolean;

      /**
       * Indicates node text is superscript.
       */
      superscript: boolean;

      /**
       * Indicates node text is bold.
       */
      bold: boolean;

      /**
       * Indicates node text is italic.
       */
      italic: boolean;

      /**
       * Indicates node text is underline.
       */
      underline: boolean;

      /**
       * Indicates node text is line through.
       */
      lineThrough: boolean;

      /**
       * Indicates whether this node is selected, unselected, or neither.
       */
      selected?: boolean;

      /**
       * Walking the tree.
       */
      children: AutomationNode[];

      parent?: AutomationNode;

      firstChild?: AutomationNode;

      lastChild?: AutomationNode;

      previousSibling?: AutomationNode;

      nextSibling?: AutomationNode;

      previousOnLine?: AutomationNode;

      nextOnLine?: AutomationNode;

      previousFocus?: AutomationNode;

      nextFocus?: AutomationNode;

      /**
       * The index of this node in its parent node's list of children. If this is the
       * root node, this will be undefined.
       */
      indexInParent?: number;

      /**
       * Does the default action based on this node's role. This is generally the same
       * action that would result from clicking the node such as expanding a treeitem,
       * toggling a checkbox, selecting a radiobutton, or activating a button.
       */
      doDefault: () => void;

      /**
       * Places focus on this node.
       */
      focus: () => void;

      /**
       * Request a data url for the contents of an image, optionally resized.  Pass
       * zero for maxWidth and/or maxHeight for the original size.
       * @param getImageData.maxWidth
       * @param getImageData.maxHeight
       */
      getImageData: (
        maxWidth: number,
        maxHeight: number,
      ) => void;

      /**
       * Does a hit test of the given global screen coordinates, and fires eventToFire
       * on the resulting object.
       * @param hitTest.x
       * @param hitTest.y
       * @param hitTest.eventToFire
       */
      hitTest: (
        x: number,
        y: number,
        eventToFire: EventType,
      ) => void;

      /**
       * Does a {@link automation.AutomationNode.hitTest}, and receives a callback
       * with the resulting hit node.
       * @param hitTestWithReply.x
       * @param hitTestWithReply.y
       */
      hitTestWithReply: (
        x: number,
        y: number,
        callback: (
          node: AutomationNode,
        ) => void,
      ) => void;

      /**
       * Scrolls this node to make it visible.
       */
      makeVisible: () => void;

      /**
       * Performs custom action.
       * @param performCustomAction.customActionId
       */
      performCustomAction: (
        customActionId: number,
      ) => void;

      /**
       * Convenience method to perform a standard action supported by this node. For
       * actions requiring additional arguments, call the specific binding e.g.
       * <code>setSelection</code>.
       * @param performStandardAction.actionType
       */
      performStandardAction: (
        actionType: ActionType,
      ) => void;

      /**
       * Replaces the selected text within a text field.
       * @param replaceSelectedText.value
       */
      replaceSelectedText: (
        value: string,
      ) => void;

      /**
       * Sets selection within a text field.
       * @param setSelection.startIndex
       * @param setSelection.endIndex
       */
      setSelection: (
        startIndex: number,
        endIndex: number,
      ) => void;

      /**
       * Clears focus and sets this node as the starting point for the next time the
       * user presses Tab or Shift+Tab.
       */
      setSequentialFocusNavigationStartingPoint: () => void;

      /**
       * Sets the value of a text field.
       * @param setValue.value
       */
      setValue: (
        value: string,
      ) => void;

      /**
       * Show the context menu for this element, as if the user right-clicked.
       */
      showContextMenu: () => void;

      /**
       * Resume playing any media within this tree.
       */
      resumeMedia: () => void;

      /**
       * Start ducking any media within this tree.
       */
      startDuckingMedia: () => void;

      /**
       * Stop ducking any media within this tree.
       */
      stopDuckingMedia: () => void;

      /**
       * Suspend any media playing within this tree.
       */
      suspendMedia: () => void;

      /**
       * Scrolls this scrollable container backward.
       */
      scrollBackward: (
        callback: (
          result: boolean,
        ) => void,
      ) => void;

      /**
       * Scrolls this scrollable container forward.
       */
      scrollForward: (
        callback: (
          result: boolean,
        ) => void,
      ) => void;

      /**
       * Scrolls this scrollable container up.
       */
      scrollUp: (
        callback: (
          result: boolean,
        ) => void,
      ) => void;

      /**
       * Scrolls this scrollable container down.
       */
      scrollDown: (
        callback: (
          result: boolean,
        ) => void,
      ) => void;

      /**
       * Scrolls this scrollable container left.
       */
      scrollLeft: (
        callback: (
          result: boolean,
        ) => void,
      ) => void;

      /**
       * Scrolls this scrollable container right.
       */
      scrollRight: (
        callback: (
          result: boolean,
        ) => void,
      ) => void;

      /**
       * Adds a listener for the given event type and event phase.
       * @param addEventListener.eventType
       * @param addEventListener.listener A listener for events on an <code>AutomationNode</code>.
       * @param addEventListener.listener.event
       * @param addEventListener.capture
       */
      addEventListener: (
        eventType: EventType,
        listener: (
          event: AutomationEvent,
        ) => void,
        capture: boolean,
      ) => void;

      /**
       * Removes a listener for the given event type and event phase.
       * @param removeEventListener.eventType
       * @param removeEventListener.listener A listener for events on an <code>AutomationNode</code>.
       * @param removeEventListener.listener.event
       * @param removeEventListener.capture
       */
      removeEventListener: (
        eventType: EventType,
        listener: (
          event: AutomationEvent,
        ) => void,
        capture: boolean,
      ) => void;

      /**
       * <p>Gets the first node in this node's subtree which matches the given CSS
       * selector and is within the same DOM context.</p><p>If this node doesn't
       * correspond directly with an HTML node in the DOM, querySelector will be run
       * on this node's nearest HTML node ancestor. Note that this may result in the
       * query returning a node which is not a descendant of this node.</p><p>If the
       * selector matches a node which doesn't directly correspond to an automation
       * node (for example an element within an ARIA widget, where the ARIA widget
       * forms one node of the automation tree, or an element which is hidden from
       * accessibility via hiding it using CSS or using aria-hidden), this will return
       * the nearest ancestor which does correspond to an automation node.</p>
       * @param domQuerySelector.selector
       */
      domQuerySelector: (
        selector: string,
        callback: (
          node: AutomationNode,
        ) => void,
      ) => void;

      /**
       * Finds the first AutomationNode in this node's subtree which matches the given
       * search parameters.
       * @param find.params
       */
      find: (
        params: FindParams,
      ) => AutomationNode;

      /**
       * Finds all the AutomationNodes in this node's subtree which matches the given
       * search parameters.
       * @param findAll.params
       */
      findAll: (
        params: FindParams,
      ) => AutomationNode[];

      /**
       * Returns whether this node matches the given {@link automation.FindParams}.
       * @param matches.params
       */
      matches: (
        params: FindParams,
      ) => boolean;

      /**
       * @param getNextTextMatch.searchStr
       * @param getNextTextMatch.backward
       */
      getNextTextMatch: (
        searchStr: string,
        backward: boolean,
      ) => AutomationNode;
    }

    /**
     * Get the automation tree for the tab with the given tabId, or the current tab
     * if no tabID is given, enabling automation if necessary. Returns a tree with a
     * placeholder root node; listen for the "loadComplete" event to get a
     * notification that the tree has fully loaded (the previous root node reference
     * will stop working at or before this point).
     * @param tabId
     * @param callback Called when the <code>AutomationNode</code> for the page is available.
     * @param callback.rootNode
     */
    export function getTree(
      tabId?: number,
      callback?: (
        rootNode: AutomationNode,
      ) => void,
    ): void;

    /**
     * Get the automation tree for the whole desktop which consists of all on screen
     * views. Note this API is currently only supported on Chrome OS.
     * @param callback Called when the <code>AutomationNode</code> for the page is available.
     * @param callback.rootNode
     */
    export function getDesktop(
      callback: (
        rootNode: AutomationNode,
      ) => void,
    ): void;

    /**
     * Get the automation node that currently has focus, globally. Will return null
     * if none of the nodes in any loaded trees have focus.
     * @param callback Called with the <code>AutomationNode</code> that currently has focus.
     * @param callback.focusedNode
     */
    export function getFocus(
      callback: (
        focusedNode: AutomationNode,
      ) => void,
    ): void;

    /**
     * Add a tree change observer. Tree change observers are static/global, they
     * listen to changes across all trees. Pass a filter to determine what specific
     * tree changes to listen to, and note that listnening to all tree changes can
     * be expensive.
     * @param filter
     * @param observer A listener for changes on the <code>AutomationNode</code> tree.
     * @param observer.treeChange
     */
    export function addTreeChangeObserver(
      filter: TreeChangeObserverFilter,
      observer: (
        treeChange: TreeChange,
      ) => void,
    ): void;

    /**
     * Remove a tree change observer.
     * @param observer A listener for changes on the <code>AutomationNode</code> tree.
     * @param observer.treeChange
     */
    export function removeTreeChangeObserver(
      observer: (
        treeChange: TreeChange,
      ) => void,
    ): void;

    /**
     * Sets the selection in a tree. This creates a selection in a single tree
     * (anchorObject and focusObject must have the same root). Everything in the
     * tree between the two node/offset pairs gets included in the selection. The
     * anchor is where the user started the selection, while the focus is the point
     * at which the selection gets extended e.g. when dragging with a mouse or using
     * the keyboard. For nodes with the role staticText, the offset gives the
     * character offset within the value where the selection starts or ends,
     * respectively.
     * @param params
     */
    export function setDocumentSelection(
      params: SetDocumentSelectionParams,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.bookmarks</code> API to create, organize, and otherwise
   * manipulate bookmarks. Also see <a href='override'>Override Pages</a>, which
   * you can use to create a custom Bookmark Manager page.
   * @chrome-permission bookmarks
 */
  export namespace bookmarks {
    /**
     * Indicates the reason why this node is unmodifiable. The <var>managed</var>
     * value indicates that this node was configured by the system administrator.
     * Omitted if the node can be modified by the user and the extension (default).
     */
    export type BookmarkTreeNodeUnmodifiable = "managed";

    /**
     * A node (either a bookmark or a folder) in the bookmark tree.  Child nodes are
     * ordered within their parent folder.
     */
    export interface BookmarkTreeNode {
      /**
       * The unique identifier for the node. IDs are unique within the current
       * profile, and they remain valid even after the browser is restarted.
       */
      id: string;

      /**
       * The <code>id</code> of the parent folder.  Omitted for the root node.
       */
      parentId?: string;

      /**
       * The 0-based position of this node within its parent folder.
       */
      index?: number;

      /**
       * The URL navigated to when a user clicks the bookmark. Omitted for folders.
       */
      url?: string;

      /**
       * The text displayed for the node.
       */
      title: string;

      /**
       * When this node was created, in milliseconds since the epoch (<code>new
       * Date(dateAdded)</code>).
       */
      dateAdded?: number;

      /**
       * When the contents of this folder last changed, in milliseconds since the
       * epoch.
       */
      dateGroupModified?: number;

      /**
       * Indicates the reason why this node is unmodifiable. The <var>managed</var>
       * value indicates that this node was configured by the system administrator or
       * by the custodian of a supervised user. Omitted if the node can be modified by
       * the user and the extension (default).
       */
      unmodifiable?: BookmarkTreeNodeUnmodifiable;

      /**
       * An ordered list of children of this node.
       */
      children?: BookmarkTreeNode[];
    }

    /**
     * Object passed to the create() function.
     */
    export interface CreateDetails {
      /**
       * Defaults to the Other Bookmarks folder.
       */
      parentId?: string;

      index?: number;

      title?: string;

      url?: string;
    }

    /**
     * @deprecated Bookmark write operations are no longer limited by Chrome.
     */
    export const MAX_WRITE_OPERATIONS_PER_HOUR: number;

    /**
     * @deprecated Bookmark write operations are no longer limited by Chrome.
     */
    export const MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number;

    /**
     * Retrieves the specified BookmarkTreeNode(s).
     * @param idOrIdList A single string-valued id, or an array of string-valued ids
     * @param callback
     * @param callback.results
     */
    export function get(
      idOrIdList: string | ([string] & string[]),
      callback: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Retrieves the children of the specified BookmarkTreeNode id.
     * @param id
     * @param callback
     * @param callback.results
     */
    export function getChildren(
      id: string,
      callback: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Retrieves the recently added bookmarks.
     * @param numberOfItems The maximum number of items to return.
     * @param callback
     * @param callback.results
     */
    export function getRecent(
      numberOfItems: number,
      callback: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Retrieves the entire Bookmarks hierarchy.
     * @param callback
     * @param callback.results
     */
    export function getTree(
      callback: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
     * @param id The ID of the root of the subtree to retrieve.
     * @param callback
     * @param callback.results
     */
    export function getSubTree(
      id: string,
      callback: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Searches for BookmarkTreeNodes matching the given query. Queries specified
     * with an object produce BookmarkTreeNodes matching all specified properties.
     * @param query Either a string of words and quoted phrases that are matched against bookmark URLs and titles, or an object. If an object, the properties <code>query</code>, <code>url</code>, and <code>title</code> may be specified and bookmarks matching all specified properties will be produced.
     * @param callback
     * @param callback.results
     */
    export function search(
      query: string | {
        /**
         * A string of words and quoted phrases that are matched against bookmark URLs
         * and titles.
         */
        query?: string,

        /**
         * The URL of the bookmark; matches verbatim. Note that folders have no URL.
         */
        url?: string,

        /**
         * The title of the bookmark; matches verbatim.
         */
        title?: string,
      },
      callback: (
        results: BookmarkTreeNode[],
      ) => void,
    ): void;

    /**
     * Creates a bookmark or folder under the specified parentId.  If url is NULL or
     * missing, it will be a folder.
     * @param bookmark
     * @param callback
     * @param callback.result
     */
    export function create(
      bookmark: CreateDetails,
      callback?: (
        result: BookmarkTreeNode,
      ) => void,
    ): void;

    /**
     * Moves the specified BookmarkTreeNode to the provided location.
     * @param id
     * @param destination
     * @param callback
     * @param callback.result
     */
    export function move(
      id: string,
      destination: {
        parentId?: string,
        index?: number,
      },
      callback?: (
        result: BookmarkTreeNode,
      ) => void,
    ): void;

    /**
     * Updates the properties of a bookmark or folder. Specify only the properties
     * that you want to change; unspecified properties will be left unchanged.
     * <b>Note:</b> Currently, only 'title' and 'url' are supported.
     * @param id
     * @param changes
     * @param callback
     * @param callback.result
     */
    export function update(
      id: string,
      changes: {
        title?: string,
        url?: string,
      },
      callback?: (
        result: BookmarkTreeNode,
      ) => void,
    ): void;

    /**
     * Removes a bookmark or an empty bookmark folder.
     * @param id
     * @param callback
     */
    export function remove(
      id: string,
      callback?: () => void,
    ): void;

    /**
     * Recursively removes a bookmark folder.
     * @param id
     * @param callback
     */
    export function removeTree(
      id: string,
      callback?: () => void,
    ): void;

    /**
     * Imports bookmarks from a chrome html bookmark file
     * @param callback
     */
    function _import(
      callback?: () => void,
    ): void;

    export {_import as import};

    /**
     * Exports bookmarks to a chrome html bookmark file
     * @param callback
     */
    function _export(
      callback?: () => void,
    ): void;

    export {_export as export};

    /**
     * Fired when a bookmark or folder is created.
     */
    export const onCreated: chrome.events.Event<
      /**
       * @param id
       * @param bookmark
       */
      (
        id: string,
        bookmark: BookmarkTreeNode,
      ) => void
    >;

    /**
     * Fired when a bookmark or folder is removed.  When a folder is removed
     * recursively, a single notification is fired for the folder, and none for
     * its contents.
     */
    export const onRemoved: chrome.events.Event<
      /**
       * @param id
       * @param removeInfo
       */
      (
        id: string,
        removeInfo: {
          parentId: string,
          index: number,
          node: BookmarkTreeNode,
        },
      ) => void
    >;

    /**
     * Fired when a bookmark or folder changes.  <b>Note:</b> Currently, only
     * title and url changes trigger this.
     */
    export const onChanged: chrome.events.Event<
      /**
       * @param id
       * @param changeInfo
       */
      (
        id: string,
        changeInfo: {
          title: string,
          url?: string,
        },
      ) => void
    >;

    /**
     * Fired when a bookmark or folder is moved to a different parent folder.
     */
    export const onMoved: chrome.events.Event<
      /**
       * @param id
       * @param moveInfo
       */
      (
        id: string,
        moveInfo: {
          parentId: string,
          index: number,
          oldParentId: string,
          oldIndex: number,
        },
      ) => void
    >;

    /**
     * Fired when the children of a folder have changed their order due to the
     * order being sorted in the UI.  This is not called as a result of a
     * move().
     */
    export const onChildrenReordered: chrome.events.Event<
      /**
       * @param id
       * @param reorderInfo
       */
      (
        id: string,
        reorderInfo: {
          childIds: string[],
        },
      ) => void
    >;

    /**
     * Fired when a bookmark import session is begun.  Expensive observers
     * should ignore onCreated updates until onImportEnded is fired.  Observers
     * should still handle other notifications immediately.
     */
    export const onImportBegan: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when a bookmark import session is ended.
     */
    export const onImportEnded: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use browser actions to put icons in the main Google Chrome toolbar, to the
   * right of the address bar. In addition to its <a
   * href='browserAction#icon'>icon</a>, a browser action can have a <a
   * href='browserAction#tooltip'>tooltip</a>, a <a
   * href='browserAction#badge'>badge</a>, and a <a
   * href='browserAction#popups'>popup</a>.
   */
  export namespace browserAction {
    export type ColorArray = [number, number, number, number];

    /**
     * Pixel data for an image. Must be an ImageData object; for example, from a
     * <code>canvas</code> element.
     */
    export type ImageDataType = ImageData;

    /**
     * Sets the title of the browser action. This title appears in the tooltip.
     * @param details
     * @param callback
     */
    export function setTitle(
      details: {
        /**
         * The string the browser action should display when moused over.
         */
        title: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the title of the browser action.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getTitle(
      details: {
        /**
         * The tab to get the title from. If no tab is specified, the default title is
         * returned.
         */
        tabId?: number,
      },
      callback: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the icon for the browser action. The icon can be specified as the path
     * to an image file, as the pixel data from a canvas element, or as a dictionary
     * of one of those. Either the <code>path</code> or the <code>imageData</code>
     * property must be specified.
     * @param details
     * @param callback
     */
    export function setIcon(
      details: {
        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing
         * an icon to be set. If the icon is specified as a dictionary, the image used
         * is chosen depending on the screen's pixel density. If the number of image
         * pixels that fit into one screen space unit equals <code>scale</code>, then an
         * image with size <code>scale</code> * n is selected, where <i>n</i> is the
         * size of the icon in the UI. At least one image must be specified. Note that
         * 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'
         */
        imageData?: ImageDataType | {[name: string]: any},

        /**
         * Either a relative image path or a dictionary {size -> relative image path}
         * pointing to an icon to be set. If the icon is specified as a dictionary, the
         * image used is chosen depending on the screen's pixel density. If the number
         * of image pixels that fit into one screen space unit equals
         * <code>scale</code>, then an image with size <code>scale</code> * n is
         * selected, where <i>n</i> is the size of the icon in the UI. At least one
         * image must be specified. Note that 'details.path = foo' is equivalent to
         * 'details.path = {'16': foo}'
         */
        path?: string | {[name: string]: any},

        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Sets the HTML document to be opened as a popup when the user clicks the
     * browser action icon.
     * @param details
     * @param callback
     */
    export function setPopup(
      details: {
        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,

        /**
         * The HTML file to show in a popup. If set to the empty string (''), no popup
         * is shown.
         */
        popup: string,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the HTML document that is set as the popup for this browser action.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getPopup(
      details: {
        /**
         * The tab to get the popup from. If no tab is specified, the non-tab-specific
         * popup is returned.
         */
        tabId?: number,
      },
      callback: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the badge text for the browser action. The badge is displayed on top of
     * the icon.
     * @param details
     * @param callback
     */
    export function setBadgeText(
      details: {
        /**
         * Any number of characters can be passed, but only about four can fit into the
         * space.
         */
        text: string,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the badge text of the browser action. If no tab is specified, the
     * non-tab-specific badge text is returned.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getBadgeText(
      details: {
        /**
         * The tab to get the badge text from. If no tab is specified, the
         * non-tab-specific badge text is returned.
         */
        tabId?: number,
      },
      callback: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the background color for the badge.
     * @param details
     * @param callback
     */
    export function setBadgeBackgroundColor(
      details: {
        /**
         * An array of four integers in the range 0-255 that make up the RGBA color of
         * the badge. Can also be a string with a CSS hex color value; for example,
         * <code>#FF0000</code> or <code>#F00</code> (red). Renders colors at full
         * opacity.
         */
        color: string | ColorArray,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the background color of the browser action.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getBadgeBackgroundColor(
      details: {
        /**
         * The tab to get the badge background color from. If no tab is specified, the
         * non-tab-specific badge background color is returned.
         */
        tabId?: number,
      },
      callback: (
        result: ColorArray,
      ) => void,
    ): void;

    /**
     * Enables the browser action for a tab. Defaults to enabled.
     * @param tabId The ID of the tab for which to modify the browser action.
     * @param callback
     */
    export function enable(
      tabId?: number,
      callback?: () => void,
    ): void;

    /**
     * Disables the browser action for a tab.
     * @param tabId The ID of the tab for which to modify the browser action.
     * @param callback
     */
    export function disable(
      tabId?: number,
      callback?: () => void,
    ): void;

    /**
     * Opens the extension popup window in the active window but does not grant tab
     * permissions.
     * @param callback
     * @param callback.popupView JavaScript 'window' object for the popup window if it was succesfully opened.
     */
    export function openPopup(
      callback: (
        popupView?: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * Fired when a browser action icon is clicked. Does not fire if the browser
     * action has a popup.
     */
    export const onClicked: chrome.events.Event<
      /**
       * @param tab
       */
      (
        tab: tabs.Tab,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.browsingData</code> API to remove browsing data from a
   * user's local profile.
   * @chrome-permission browsingData
 */
  export namespace browsingData {
    /**
     * Options that determine exactly what data will be removed.
     */
    export interface RemovalOptions {
      /**
       * Remove data accumulated on or after this date, represented in milliseconds
       * since the epoch (accessible via the <code>getTime</code> method of the
       * JavaScript <code>Date</code> object). If absent, defaults to 0 (which would
       * remove all browsing data).
       */
      since?: number;

      /**
       * An object whose properties specify which origin types ought to be cleared. If
       * this object isn't specified, it defaults to clearing only "unprotected"
       * origins. Please ensure that you <em>really</em> want to remove application
       * data before adding 'protectedWeb' or 'extensions'.
       */
      originTypes?: {
        /**
         * Normal websites.
         */
        unprotectedWeb?: boolean,

        /**
         * Websites that have been installed as hosted applications (be careful!).
         */
        protectedWeb?: boolean,

        /**
         * Extensions and packaged applications a user has installed (be _really_
         * careful!).
         */
        extension?: boolean,
      };

      /**
       * When present, only data for origins in this list is deleted. Only supported
       * for cookies, storage and cache. Cookies are cleared for the whole registrable
       * domain.
       */
      origins?: string[];

      /**
       * When present, data for origins in this list is excluded from deletion. Can't
       * be used together with <code>origins</code>. Only supported for cookies,
       * storage and cache.  Cookies are excluded for the whole registrable domain.
       */
      excludeOrigins?: string[];
    }

    /**
     * A set of data types. Missing data types are interpreted as
     * <code>false</code>.
     */
    export interface DataTypeSet {
      /**
       * Websites' appcaches.
       */
      appcache?: boolean;

      /**
       * The browser's cache.
       */
      cache?: boolean;

      /**
       * Cache storage
       */
      cacheStorage?: boolean;

      /**
       * The browser's cookies.
       */
      cookies?: boolean;

      /**
       * The browser's download list.
       */
      downloads?: boolean;

      /**
       * Websites' file systems.
       */
      fileSystems?: boolean;

      /**
       * The browser's stored form data.
       */
      formData?: boolean;

      /**
       * The browser's history.
       */
      history?: boolean;

      /**
       * Websites' IndexedDB data.
       */
      indexedDB?: boolean;

      /**
       * Websites' local storage data.
       */
      localStorage?: boolean;

      /**
       * Server-bound certificates.
       */
      serverBoundCertificates?: boolean;

      /**
       * Stored passwords.
       */
      passwords?: boolean;

      /**
       * Plugins' data.
       */
      pluginData?: boolean;

      /**
       * Service Workers.
       */
      serviceWorkers?: boolean;

      /**
       * Websites' WebSQL data.
       */
      webSQL?: boolean;
    }

    /**
     * Reports which types of data are currently selected in the 'Clear browsing
     * data' settings UI.  Note: some of the data types included in this API are not
     * available in the settings UI, and some UI settings control more than one data
     * type listed here.
     * @param callback
     * @param callback.result
     */
    export function settings(
      callback: (
        result: {
          options: RemovalOptions,

          /**
           * All of the types will be present in the result, with values of
           * <code>true</code> if they are both selected to be removed and permitted to be
           * removed, otherwise <code>false</code>.
           */
          dataToRemove: DataTypeSet,

          /**
           * All of the types will be present in the result, with values of
           * <code>true</code> if they are permitted to be removed (e.g., by enterprise
           * policy) and <code>false</code> if not.
           */
          dataRemovalPermitted: DataTypeSet,
        },
      ) => void,
    ): void;

    /**
     * Clears various types of browsing data stored in a user's profile.
     * @param options
     * @param dataToRemove The set of data types to remove.
     * @param callback Called when deletion has completed.
     */
    export function remove(
      options: RemovalOptions,
      dataToRemove: DataTypeSet,
      callback?: () => void,
    ): void;

    /**
     * Clears websites' appcache data.
     * @param options
     * @param callback Called when websites' appcache data has been cleared.
     */
    export function removeAppcache(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears the browser's cache.
     * @param options
     * @param callback Called when the browser's cache has been cleared.
     */
    export function removeCache(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears websites' cache storage data.
     * @param options
     * @param callback Called when websites' cache storage has been cleared.
     */
    export function removeCacheStorage(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears the browser's cookies and server-bound certificates modified within a
     * particular timeframe.
     * @param options
     * @param callback Called when the browser's cookies and server-bound certificates have been cleared.
     */
    export function removeCookies(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears the browser's list of downloaded files (<em>not</em> the downloaded
     * files themselves).
     * @param options
     * @param callback Called when the browser's list of downloaded files has been cleared.
     */
    export function removeDownloads(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears websites' file system data.
     * @param options
     * @param callback Called when websites' file systems have been cleared.
     */
    export function removeFileSystems(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears the browser's stored form data (autofill).
     * @param options
     * @param callback Called when the browser's form data has been cleared.
     */
    export function removeFormData(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears the browser's history.
     * @param options
     * @param callback Called when the browser's history has cleared.
     */
    export function removeHistory(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears websites' IndexedDB data.
     * @param options
     * @param callback Called when websites' IndexedDB data has been cleared.
     */
    export function removeIndexedDB(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears websites' local storage data.
     * @param options
     * @param callback Called when websites' local storage has been cleared.
     */
    export function removeLocalStorage(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears plugins' data.
     * @param options
     * @param callback Called when plugins' data has been cleared.
     */
    export function removePluginData(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears the browser's stored passwords.
     * @param options
     * @param callback Called when the browser's passwords have been cleared.
     */
    export function removePasswords(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears websites' service workers.
     * @param options
     * @param callback Called when websites' service workers have been cleared.
     */
    export function removeServiceWorkers(
      options: RemovalOptions,
      callback?: () => void,
    ): void;

    /**
     * Clears websites' WebSQL data.
     * @param options
     * @param callback Called when websites' WebSQL databases have been cleared.
     */
    export function removeWebSQL(
      options: RemovalOptions,
      callback?: () => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * API for communicating with a Google Cast device over an authenticated
   * channel.
   * @chrome-permission cast
 */
  export namespace cast.channel {
    /**
     * The state of the channel.
     */
    export type ReadyState = "connecting" | "open" | "closing" | "closed";

    /**
     * Error conditions that the channel may encounter.  All error conditions are
     * terminal.  When an error condition is encountered the API will: (1)
     * Transition the channel to readyState == 'closed'. (2) Set
     * ChannelInfo.lastError to the error condition. (3) Fire an onError event with
     * the error condition. (4) Fire an onClose event.
     */
    export type ChannelError = "channel_not_open" | "authentication_error" | "connect_error" | "socket_error" | "transport_error" | "invalid_message" | "invalid_channel_id" | "connect_timeout" | "ping_timeout" | "unknown";

    /**
     * Authentication methods that may be required to connect to a Cast receiver.
     */
    export type ChannelAuthType = "ssl_verified";

    export interface ConnectInfo {
      /**
       * The IPV4 address of the Cast receiver, e.g. '198.1.0.2'. TODO(mfoltz):
       * Investigate whether IPV6 addresses "just work."
       */
      ipAddress: string;

      /**
       * The port number to connect to, 0-65535.
       */
      port: number;

      /**
       * The amount of time to wait in milliseconds before stopping the connection
       * process. Timeouts are disabled if the value is zero. The default timeout is
       * 8000ms.
       */
      timeout?: number;

      /**
       * The authentication method required for the channel.
       */
      auth: ChannelAuthType;

      /**
       * The amount of time to wait in milliseconds before sending pings to idle
       * channels.
       */
      pingInterval?: number;

      /**
       * The maximum amount of idle time allowed before a channel is closed.
       */
      livenessTimeout?: number;

      /**
       * If set, CastDeviceCapability bitmask values describing capability of the cast
       * device.
       */
      capabilities?: number;
    }

    export interface ChannelInfo {
      /**
       * Id for the channel.
       */
      channelId: number;

      /**
       * Connection information that was used to establish the channel to the
       * receiver.
       */
      connectInfo: ConnectInfo;

      /**
       * The current state of the channel.
       */
      readyState: ReadyState;

      /**
       * If set, the last error condition encountered by the channel.
       */
      errorState?: ChannelError;

      /**
       * If true, keep-alive messages are handled automatically by the channel.
       */
      keepAlive: boolean;

      /**
       * Whether the channel is audio only as identified by the device certificate
       * during channel authentication.
       */
      audioOnly: boolean;
    }

    export interface MessageInfo {
      /**
       * The message namespace.  A namespace is a URN of the form
       * urn:cast-x:<namespace> that is used to interpret and route Cast messages.
       */
      namespace_: string;

      /**
       * <p>source and destination ids identify the origin and destination of the
       * message.  They are used to route messages between endpoints that share a
       * device-to-device channel.</p><p>For messages between applications:   - The
       * sender application id is a unique identifier generated on behalf     of the
       * sender application.   - The receiver id is always the the session id for the
       * application.</p><p>For messages to or from the sender or receiver platform,
       * the special ids 'sender-0' and 'receiver-0' can be used.</p><p>For messages
       * intended for all endpoints using a given channel, the wildcard destination_id
       * '*' can be used.</p>
       */
      sourceId: string;

      destinationId: string;

      /**
       * The content of the message.  Must be either a string or an ArrayBuffer.
       */
      data: any;
    }

    export interface ErrorInfo {
      /**
       * The type of error encountered by the channel.
       */
      errorState: ChannelError;

      /**
       * The event that was occurring when the error happened.  Values are defined in
       * the enum EventType in logging.proto.
       */
      eventType?: number;

      /**
       * An error encountered when processing the authentication handshake. Values are
       * defined in the enum ChallengeReplyErrorType in logging.proto.
       */
      challengeReplyErrorType?: number;

      /**
       * A return value from the underlying net:: socket libraries. Values are defined
       * in net/base/net_error_list.h.
       */
      netReturnValue?: number;

      /**
       * An error code returned by NSS. Values are defined in secerr.h.
       */
      nssErrorCode?: number;
    }

    /**
     * Opens a new channel to the Cast receiver specified by connectInfo.  Only one
     * channel may be connected to same receiver from the same extension at a time.
     * If the open request is successful, the callback will be invoked with a
     * ChannelInfo with readyState == 'connecting'.  If unsuccessful, the callback
     * will be invoked with a ChannelInfo with channel.readyState == 'closed',
     * channel.errorState will be set to the error condition, and onError will be
     * fired with error details.
     * @param connectInfo
     * @param callback Callback holding the result of a channel operation.
     * @param callback.result
     */
    export function open(
      connectInfo: ConnectInfo,
      callback: (
        result: ChannelInfo,
      ) => void,
    ): void;

    /**
     * Sends a message on the channel and invokes callback with the resulting
     * channel status.  The channel must be in readyState == 'open'.  If
     * unsuccessful, channel.readyState will be set to 'closed', channel.errorState
     * will be set to the error condition, and onError will be fired with error
     * details.
     * @param channel
     * @param message
     * @param callback Callback holding the result of a channel operation.
     * @param callback.result
     */
    export function send(
      channel: ChannelInfo,
      message: MessageInfo,
      callback: (
        result: ChannelInfo,
      ) => void,
    ): void;

    /**
     * Requests that the channel be closed and invokes callback with the resulting
     * channel status.  The channel must be in readyState == 'open' or 'connecting'.
     * If successful, onClose will be fired with readyState == 'closed'.  If
     * unsuccessful, channel.readyState will be set to 'closed', and
     * channel.errorState will be set to the error condition.
     * @param channel
     * @param callback Callback holding the result of a channel operation.
     * @param callback.result
     */
    export function close(
      channel: ChannelInfo,
      callback: (
        result: ChannelInfo,
      ) => void,
    ): void;

    /**
     * Fired when a message is received on an open channel.
     */
    export const onMessage: chrome.events.Event<
      /**
       * @param channel
       * @param message
       */
      (
        channel: ChannelInfo,
        message: MessageInfo,
      ) => void
    >;

    /**
     * Fired when an error occurs as a result of a channel operation or a
     * network event. |error| contains details of the error.
     */
    export const onError: chrome.events.Event<
      /**
       * @param channel
       * @param error
       */
      (
        channel: ChannelInfo,
        error: ErrorInfo,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.cast.streaming.receiverSession</code> API creates a Cast
   * receiver session and adds the resulting audio and video tracks to a
   * MediaStream.
   * @alpha
 * @chrome-permission cast.streaming
 */
  export namespace cast.streaming.receiverSession {
    export interface IPEndPoint {
      address: string;

      port: number;
    }

    export interface RtpReceiverParams {
      /**
       * Maximum latency in milliseconds. This parameter controls the logic of flow
       * control. Implementation can adjust latency adaptively and tries to keep it
       * under this threshold. A larger value allows smoother playback at the cost of
       * higher latency.
       */
      maxLatency: number;

      codecName: string;

      /**
       * Synchronization source identifier for incoming data.
       */
      senderSsrc: number;

      /**
       * The SSRC used to send RTCP reports back to the sender.
       */
      receiverSsrc: number;

      /**
       * RTP time units per second, defaults to 48000 for audio and 90000 for video.
       */
      rtpTimebase?: number;

      /**
       * 32 bytes hex-encoded AES key.
       */
      aesKey?: string;

      /**
       * 32 bytes hex-encoded AES IV (Initialization vector) mask.
       */
      aesIvMask?: string;
    }

    /**
     * Creates a Cast receiver session which receives data from a UDP socket. The
     * receiver will decode the incoming data into an audio and a video track which
     * will be added to the provided media stream. The |audioParams| and
     * |videoParams| are generally provided by the sender through some other
     * messaging channel.
     * @param audioParams Audio stream parameters.
     * @param videoParams Video stream parameters.
     * @param localEndpoint Local IP and port to bind to.
     * @param maxWidth
     * @param maxHeight
     * @param maxFrameRate Max video frame rate.
     * @param mediaStreamURL URL of MediaStream to add the audio and video to.
     * @param error_callback
     * @param error_callback.error
     * @param transport_options Optional transport settings.
     */
    export function createAndBind(
      audioParams: RtpReceiverParams,
      videoParams: RtpReceiverParams,
      localEndpoint: IPEndPoint,
      maxWidth: number,
      maxHeight: number,
      maxFrameRate: number,
      mediaStreamURL: string,
      error_callback: (
        error: string,
      ) => void,
      transport_options?: {[name: string]: any},
    ): void;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.cast.streaming.rtpStream</code> API allows configuration
 of
   * encoding parameters and RTP parameters used in a Cast streaming
 session.
   * Valid stream IDs are positive and non-zero.
   * @alpha
 * @chrome-permission cast.streaming
 */
  export namespace cast.streaming.rtpStream {
    export interface CodecSpecificParams {
      key: string;

      value: string;
    }

    export interface RtpPayloadParams {
      payloadType: number;

      /**
       * Maximum latency in milliseconds. This parameter controls the logic of flow
       * control. Implementation can adjust latency adaptively and tries to keep it
       * under this threshold. A larger value allows smoother playback at the cost of
       * higher latency.
       */
      maxLatency: number;

      /**
       * Minimum latency in milliseconds. Defaults to |maxLatency|.
       */
      minLatency?: number;

      /**
       * Starting latency for animated content in milliseconds. Defaults to
       * |maxLatency|.
       */
      animatedLatency?: number;

      codecName: string;

      /**
       * Synchronization source identifier.
       */
      ssrc: number;

      feedbackSsrc: number;

      clockRate?: number;

      /**
       * Minimum bitrate in kilobits per second.
       */
      minBitrate?: number;

      /**
       * Maximum bitrate in kilobits per second.
       */
      maxBitrate?: number;

      /**
       * The number of channels.
       */
      channels?: number;

      /**
       * The maximum frame rate.
       */
      maxFrameRate?: number;

      /**
       * 32 bytes hex-encoded AES key.
       */
      aesKey?: string;

      /**
       * 32 bytes hex-encoded AES IV (Initialization vector) mask.
       */
      aesIvMask?: string;

      /**
       * A list of codec specific params.
       */
      codecSpecificParams: CodecSpecificParams[];
    }

    export interface RtpParams {
      /**
       * RTP payload params.
       */
      payload: RtpPayloadParams;

      rtcpFeatures: string[];
    }

    /**
     * Destroys a Cast RTP stream.
     * @param streamId The RTP stream ID.
     */
    export function destroy(
      streamId: number,
    ): void;

    /**
     * Returns an array of supported parameters with default values. This includes a
     * list of supported codecs on this platform and corresponding encoding and RTP
     * parameters.
     * @param streamId The RTP stream ID.
     */
    export function getSupportedParams(
      streamId: number,
    ): RtpParams[];

    /**
     * Activates the RTP stream by providing the parameters.
     * @param streamId The RTP stream ID.
     * @param params Parameters set for this stream.
     */
    export function start(
      streamId: number,
      params: RtpParams,
    ): void;

    /**
     * Stops activity on the specified stream.
     * @param streamId The RTP stream ID.
     */
    export function stop(
      streamId: number,
    ): void;

    /**
     * Enables / disables logging for a stream.
     * @param streamId
     * @param enable If true, enables logging. Otherwise disables logging.
     */
    export function toggleLogging(
      streamId: number,
      enable: boolean,
    ): void;

    /**
     * Get raw events for a stream in the current session.
     * @param streamId Stream to get events for.
     * @param extraData Extra data to attach to the log, e.g. system info or              experiment tags, in key-value JSON string format.
     * @param callback Called with the raw events.
     * @param callback.rawEvents compressed serialized raw bytes containing raw events              recorded for a stream. The compression is in gzip format. The serialization format can be found at  media/cast/logging/log_serializer.cc.
     */
    export function getRawEvents(
      streamId: number,
      extraData: string,
      callback: (
        rawEvents: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * Get raw events for a stream in the current session.
     * @param streamId Stream to get events for.
     * @param callback Called with the raw events.
     * @param callback.rawEvents compressed serialized raw bytes containing raw events              recorded for a stream. The compression is in gzip format. The serialization format can be found at  media/cast/logging/log_serializer.cc.
     */
    export function getRawEvents(
      streamId: number,
      callback: (
        rawEvents: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * Get stats for a stream in the current session.
     * @param streamId Stream to get stats for.
     * @param callback Called with the stats.
     * @param callback.stats
     */
    export function getStats(
      streamId: number,
      callback: (
        stats: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * Event fired when a Cast RTP stream has started.
     */
    export const onStarted: chrome.events.Event<
      /**
       * @param streamId The ID of the RTP stream.
       */
      (
        streamId: number,
      ) => void
    >;

    /**
     * Event fired when a Cast RTP stream has stopped.
     */
    export const onStopped: chrome.events.Event<
      /**
       * @param streamId The ID of the RTP stream.
       */
      (
        streamId: number,
      ) => void
    >;

    /**
     * Event fired when a Cast RTP stream has error.
     */
    export const onError: chrome.events.Event<
      /**
       * @param streamId The ID of the RTP stream.
       * @param errorString The error info.
       */
      (
        streamId: number,
        errorString: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.cast.streaming.session</code> API creates a Cast
 session
   * using WebMediaStreamTrack as sources. The session is composed
 by RTP streams
   * and a network transport.

 Calling this API will generate corresponding
   * resources for use with
 chrome.cast.streaming.rtpStream and
   * chrome.cast.streaming.udpTransport
 APIs.

 Valid resource IDs are positive
   * and non-zero.
   * @alpha
 * @chrome-permission cast.streaming
 */
  export namespace cast.streaming.session {
    /**
     * Creates a Cast session using the provided audio and video track as source.
     * The tracks must be of type MediaStreamTrack. This will create two RTP streams
     * and a UDP transport that builds the session. Either |audioTrack| or
     * |videoTrack| can be null but not both. This means creating a session with
     * only audio or video. If a given track is null then the created stream ID will
     * be null.
     * @param audioTrack the source audio track.
     * @param videoTrack the source video track.
     * @param callback Called when the sesion has been created.
     * @param callback.audioStreamId The audio RTP stream ID.
     * @param callback.videoStreamId The video RTP stream ID.
     * @param callback.udpTransportId The UDP transport ID.
     */
    export function create(
      audioTrack: MediaStreamTrack,
      videoTrack: MediaStreamTrack,
      callback: (
        audioStreamId: number,
        videoStreamId: number,
        udpTransportId: number,
      ) => void,
    ): void;

    /**
     * Creates a Cast session using the provided audio and video track as source.
     * The tracks must be of type MediaStreamTrack. This will create two RTP streams
     * and a UDP transport that builds the session. Either |audioTrack| or
     * |videoTrack| can be null but not both. This means creating a session with
     * only audio or video. If a given track is null then the created stream ID will
     * be null.
     * @param videoTrack the source video track.
     * @param callback Called when the sesion has been created.
     * @param callback.audioStreamId The audio RTP stream ID.
     * @param callback.videoStreamId The video RTP stream ID.
     * @param callback.udpTransportId The UDP transport ID.
     */
    export function create(
      videoTrack: MediaStreamTrack,
      callback: (
        audioStreamId: number,
        videoStreamId: number,
        udpTransportId: number,
      ) => void,
    ): void;

    /**
     * Creates a Cast session using the provided audio and video track as source.
     * The tracks must be of type MediaStreamTrack. This will create two RTP streams
     * and a UDP transport that builds the session. Either |audioTrack| or
     * |videoTrack| can be null but not both. This means creating a session with
     * only audio or video. If a given track is null then the created stream ID will
     * be null.
     * @param audioTrack the source audio track.
     * @param callback Called when the sesion has been created.
     * @param callback.audioStreamId The audio RTP stream ID.
     * @param callback.videoStreamId The video RTP stream ID.
     * @param callback.udpTransportId The UDP transport ID.
     */
    export function create(
      audioTrack: MediaStreamTrack,
      callback: (
        audioStreamId: number,
        videoStreamId: number,
        udpTransportId: number,
      ) => void,
    ): void;

    /**
     * Creates a Cast session using the provided audio and video track as source.
     * The tracks must be of type MediaStreamTrack. This will create two RTP streams
     * and a UDP transport that builds the session. Either |audioTrack| or
     * |videoTrack| can be null but not both. This means creating a session with
     * only audio or video. If a given track is null then the created stream ID will
     * be null.
     * @param callback Called when the sesion has been created.
     * @param callback.audioStreamId The audio RTP stream ID.
     * @param callback.videoStreamId The video RTP stream ID.
     * @param callback.udpTransportId The UDP transport ID.
     */
    export function create(
      callback: (
        audioStreamId: number,
        videoStreamId: number,
        udpTransportId: number,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.webrtc.castUdpTransport</code> API represents a UDP
   * transport for Cast RTP streams. This API is not useful when standalone
 since
   * it does not have send and receive methods.
 It is used to configure the UDP
   * transport used in Cast session.

 Valid transport IDs are positive and
   * non-zero.
   * @alpha
 * @chrome-permission cast.streaming
 */
  export namespace cast.streaming.udpTransport {
    export interface IPEndPoint {
      address: string;

      port: number;
    }

    /**
     * Destroys a UDP transport.
     * @param transportId The transport ID.
     */
    export function destroy(
      transportId: number,
    ): void;

    /**
     * Sets parameters for this UDP transport. This can only be called once per
     * transport.
     * @param transportId The transport ID.
     * @param destination The address and port to send packets to.
     */
    export function setDestination(
      transportId: number,
      destination: IPEndPoint,
    ): void;

    /**
     * Sets the options. Attributes of this object will be used to activate optional
     * behaviours in the transport. Normally this is only used for experimentation.
     * Must be called before setDestination.
     * @param transportId The transport ID that is created by chrome.cast.streaming.session.create().
     * @param options A dictionary of key-value pairs of options. See media/cast/net/cast_transport_sender_impl.h for supported options.
     */
    export function setOptions(
      transportId: number,
      options: {[name: string]: any},
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use this API to expose certificates to the platform which can use these
   * certificates for TLS authentications.
   * @chrome-platform chromeos
 * @chrome-permission certificateProvider
 */
  export namespace certificateProvider {
    export type Hash = "MD5_SHA1" | "SHA1" | "SHA256" | "SHA384" | "SHA512";

    /**
     * The type of code being requested by the extension with requestPin function.
     */
    export type PinRequestType = "PIN" | "PUK";

    /**
     * The types of errors that can be presented to the user through the requestPin
     * function.
     */
    export type PinRequestErrorType = "INVALID_PIN" | "INVALID_PUK" | "MAX_ATTEMPTS_EXCEEDED" | "UNKNOWN_ERROR";

    export interface CertificateInfo {
      /**
       * Must be the DER encoding of a X.509 certificate. Currently, only certificates
       * of RSA keys are supported.
       */
      certificate: ArrayBuffer;

      /**
       * Must be set to all hashes supported for this certificate. This extension will
       * only be asked for signatures of digests calculated with one of these hash
       * algorithms. This should be in order of decreasing hash preference.
       */
      supportedHashes: Hash[];
    }

    export interface SignRequest {
      /**
       * The unique ID to be used by the extension should it need to call a method
       * that requires it, e.g. requestPin.
       */
      signRequestId: number;

      /**
       * The digest that must be signed.
       */
      digest: ArrayBuffer;

      /**
       * Refers to the hash algorithm that was used to create <code>digest</code>.
       */
      hash: Hash;

      /**
       * The DER encoding of a X.509 certificate. The extension must sign
       * <code>digest</code> using the associated private key.
       */
      certificate: ArrayBuffer;
    }

    export interface RequestPinDetails {
      /**
       * The ID given by Chrome in SignRequest.
       */
      signRequestId: number;

      /**
       * The type of code requested. Default is PIN.
       */
      requestType?: PinRequestType;

      /**
       * The error template displayed to the user. This should be set if the previous
       * request failed, to notify the user of the failure reason.
       */
      errorType?: PinRequestErrorType;

      /**
       * The number of attempts left. This is provided so that any UI can present this
       * information to the user. Chrome is not expected to enforce this, instead
       * stopPinRequest should be called by the extension with errorType =
       * MAX_ATTEMPTS_EXCEEDED when the number of pin requests is exceeded.
       */
      attemptsLeft?: number;
    }

    export interface StopPinRequestDetails {
      /**
       * The ID given by Chrome in SignRequest.
       */
      signRequestId: number;

      /**
       * The error template. If present it is displayed to user. Intended to contain
       * the reason for stopping the flow if it was caused by an error, e.g.
       * MAX_ATTEMPTS_EXCEEDED.
       */
      errorType?: PinRequestErrorType;
    }

    export interface PinResponseDetails {
      /**
       * The code provided by the user. Empty if user closed the dialog or some other
       * error occurred.
       */
      userInput?: string;
    }

    /**
     * Requests the PIN from the user. Only one ongoing request at a time is
     * allowed. The requests issued while another flow is ongoing are rejected. It's
     * the extension's responsibility to try again later if another flow is in
     * progress.
     * @param details Contains the details about the requested dialog.
     * @param callback Is called when the dialog is resolved with the user input, or when the dialog request finishes unsuccessfully (e.g. the dialog was canceled by the user or was not allowed to be shown).
     * @param callback.details
     */
    export function requestPin(
      details: RequestPinDetails,
      callback: (
        details?: PinResponseDetails,
      ) => void,
    ): void;

    /**
     * Stops the pin request started by the {@link requestPin} function.
     * @param details Contains the details about the reason for stopping the request flow.
     * @param callback To be used by Chrome to send to the extension the status from their request to close PIN dialog for user.
     */
    export function stopPinRequest(
      details: StopPinRequestDetails,
      callback: () => void,
    ): void;

    /**
     * This event fires every time the browser requests the current list of
     * certificates provided by this extension. The extension must call
     * <code>reportCallback</code> exactly once with the current list of
     * certificates.
     */
    export const onCertificatesRequested: chrome.events.Event<
      (
        reportCallback: (
          certificates: CertificateInfo[],
          callback: (
            rejectedCertificates: ArrayBuffer[],
          ) => void,
        ) => void,
      ) => void
    >;

    /**
     * This event fires every time the browser needs to sign a message using a
     * certificate provided by this extension in reply to an {@link
     * onCertificatesRequested} event. The extension must sign the data in
     * <code>request</code> using the appropriate algorithm and private key and
     * return it by calling <code>reportCallback</code>.
     * <code>reportCallback</code> must be called exactly once.
     */
    export const onSignDigestRequested: chrome.events.Event<
      /**
       * @param request Contains the details about the sign request.
       */
      (
        request: SignRequest,
        reportCallback: (
          signature?: ArrayBuffer,
        ) => void,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the commands API to add keyboard shortcuts that trigger actions in your
   * extension, for example, an action to open the browser action or send a
   * command to the extension.
   */
  export namespace commands {
    export interface Command {
      /**
       * The name of the Extension Command
       */
      name?: string;

      /**
       * The Extension Command description
       */
      description?: string;

      /**
       * The shortcut active for this command, or blank if not active.
       */
      shortcut?: string;
    }

    /**
     * Returns all the registered extension commands for this extension and their
     * shortcut (if active).
     * @param callback Called to return the registered commands.
     * @param callback.commands
     */
    export function getAll(
      callback?: (
        commands: Command[],
      ) => void,
    ): void;

    /**
     * Fired when a registered command is activated using a keyboard shortcut.
     */
    export const onCommand: chrome.events.Event<
      /**
       * @param command
       */
      (
        command: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.contentSettings</code> API to change settings that
   * control whether websites can use features such as cookies, JavaScript, and
   * plugins. More generally speaking, content settings allow you to customize
   * Chrome's behavior on a per-site basis instead of globally.
   * @chrome-permission contentSettings
 */
  export namespace contentSettings {
    /**
     * The only content type using resource identifiers is {@link
     * contentSettings.plugins}. For more information, see <a
     * href="contentSettings#resource-identifiers">Resource Identifiers</a>.
     */
    export interface ResourceIdentifier {
      /**
       * The resource identifier for the given content type.
       */
      id: string;

      /**
       * A human readable description of the resource.
       */
      description?: string;
    }

    /**
     * The scope of the ContentSetting. One of<br><var>regular</var>: setting for
     * regular profile (which is inherited by the incognito profile if not
     * overridden elsewhere),<br><var>incognito_session_only</var>: setting for
     * incognito profile that can only be set during an incognito session and is
     * deleted when the incognito session ends (overrides regular settings).
     */
    export type Scope = "regular" | "incognito_session_only";

    export interface ContentSetting<T> {
      /**
       * Clear all content setting rules set by this extension.
       * @param details
       * @param callback
       */
      clear(
        details: {
          /**
           * Where to clear the setting (default: regular).
           */
          scope?: Scope,
        },
        callback?: () => void,
      ): void;

      /**
       * Gets the current content setting for a given pair of URLs.
       * @param details
       * @param callback
       * @param callback.details
       */
      get(
        details: {
          /**
           * The primary URL for which the content setting should be retrieved. Note that
           * the meaning of a primary URL depends on the content type.
           */
          primaryUrl: string,

          /**
           * The secondary URL for which the content setting should be retrieved. Defaults
           * to the primary URL. Note that the meaning of a secondary URL depends on the
           * content type, and not all content types use secondary URLs.
           */
          secondaryUrl?: string,

          /**
           * A more specific identifier of the type of content for which the settings
           * should be retrieved.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * Whether to check the content settings for an incognito session. (default
           * false)
           */
          incognito?: boolean,
        },
        callback: (
          details: {
            /**
             * The content setting. See the description of the individual ContentSetting
             * objects for the possible values.
             */
            setting: any,
          },
        ) => void,
      ): void;

      /**
       * Applies a new content setting rule.
       * @param details
       * @param callback
       */
      set(
        details: {
          /**
           * The pattern for the primary URL. For details on the format of a pattern, see
           * <a href='contentSettings#patterns'>Content Setting Patterns</a>.
           */
          primaryPattern: string,

          /**
           * The pattern for the secondary URL. Defaults to matching all URLs. For details
           * on the format of a pattern, see <a href='contentSettings#patterns'>Content
           * Setting Patterns</a>.
           */
          secondaryPattern?: string,

          /**
           * The resource identifier for the content type.
           */
          resourceIdentifier?: ResourceIdentifier,

          /**
           * The setting applied by this rule. See the description of the individual
           * ContentSetting objects for the possible values.
           */
          setting: any,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: Scope,
        },
        callback?: () => void,
      ): void;

      /**
       * @param callback
       * @param callback.resourceIdentifiers A list of resource identifiers for this content type, or <var>undefined</var> if this content type does not use resource identifiers.
       */
      getResourceIdentifiers(
        callback: (
          resourceIdentifiers?: ResourceIdentifier[],
        ) => void,
      ): void;
    }

    export type CookiesContentSetting = "allow" | "block" | "session_only";

    export type ImagesContentSetting = "allow" | "block";

    export type JavascriptContentSetting = "allow" | "block";

    export type LocationContentSetting = "allow" | "block" | "ask";

    export type PluginsContentSetting = "allow" | "block" | "detect_important_content";

    export type PopupsContentSetting = "allow" | "block";

    export type NotificationsContentSetting = "allow" | "block" | "ask";

    export type FullscreenContentSetting = "allow";

    export type MouselockContentSetting = "allow";

    export type MicrophoneContentSetting = "allow" | "block" | "ask";

    export type CameraContentSetting = "allow" | "block" | "ask";

    export type PpapiBrokerContentSetting = "allow" | "block" | "ask";

    export type MultipleAutomaticDownloadsContentSetting = "allow" | "block" | "ask";

    /**
     * Whether to allow cookies and other local data to be set by websites. One
     * of<br><var>allow</var>: Accept cookies,<br><var>block</var>: Block
     * cookies,<br><var>session_only</var>: Accept cookies only for the current
     * session. <br>Default is <var>allow</var>.<br>The primary URL is the URL
     * representing the cookie origin. The secondary URL is the URL of the top-level
     * frame.
     */
    export const cookies: ContentSetting<CookiesContentSetting>;

    /**
     * Whether to show images. One of<br><var>allow</var>: Show
     * images,<br><var>block</var>: Don't show images. <br>Default is
     * <var>allow</var>.<br>The primary URL is the URL of the top-level frame. The
     * secondary URL is the URL of the image.
     */
    export const images: ContentSetting<ImagesContentSetting>;

    /**
     * Whether to run JavaScript. One of<br><var>allow</var>: Run
     * JavaScript,<br><var>block</var>: Don't run JavaScript. <br>Default is
     * <var>allow</var>.<br>The primary URL is the URL of the top-level frame. The
     * secondary URL is not used.
     */
    export const javascript: ContentSetting<JavascriptContentSetting>;

    /**
     * Whether to allow Geolocation. One of <br><var>allow</var>: Allow sites to
     * track your physical location,<br><var>block</var>: Don't allow sites to track
     * your physical location,<br><var>ask</var>: Ask before allowing sites to track
     * your physical location. <br>Default is <var>ask</var>.<br>The primary URL is
     * the URL of the document which requested location data. The secondary URL is
     * the URL of the top-level frame (which may or may not differ from the
     * requesting URL).
     */
    export const location: ContentSetting<LocationContentSetting>;

    /**
     * Whether to run plugins. One of<br><var>allow</var>: Run plugins
     * automatically,<br><var>block</var>: Don't run plugins
     * automatically,<br><var>detect_important_content</var>: Only run automatically
     * those plugins that are detected as the website's main content.<br>The primary
     * URL is the URL of the top-level frame. The secondary URL is not used.
     */
    export const plugins: ContentSetting<PluginsContentSetting>;

    /**
     * Whether to allow sites to show pop-ups. One of<br><var>allow</var>: Allow
     * sites to show pop-ups,<br><var>block</var>: Don't allow sites to show
     * pop-ups. <br>Default is <var>block</var>.<br>The primary URL is the URL of
     * the top-level frame. The secondary URL is not used.
     */
    export const popups: ContentSetting<PopupsContentSetting>;

    /**
     * Whether to allow sites to show desktop notifications. One
     * of<br><var>allow</var>: Allow sites to show desktop
     * notifications,<br><var>block</var>: Don't allow sites to show desktop
     * notifications,<br><var>ask</var>: Ask when a site wants to show desktop
     * notifications. <br>Default is <var>ask</var>.<br>The primary URL is the URL
     * of the document which wants to show the notification. The secondary URL is
     * not used.
     */
    export const notifications: ContentSetting<NotificationsContentSetting>;

    /**
     * <i>Deprecated.</i> No longer has any effect. Fullscreen permission is now
     * automatically granted for all sites. Value is always <var>allow</var>.
     */
    export const fullscreen: ContentSetting<FullscreenContentSetting>;

    /**
     * <i>Deprecated.</i> No longer has any effect. Mouse lock permission is now
     * automatically granted for all sites. Value is always <var>allow</var>.
     */
    export const mouselock: ContentSetting<MouselockContentSetting>;

    /**
     * Whether to allow sites to access the microphone. One of <br><var>allow</var>:
     * Allow sites to access the microphone,<br><var>block</var>: Don't allow sites
     * to access the microphone,<br><var>ask</var>: Ask when a site wants to access
     * the microphone. <br>Default is <var>ask</var>.<br>The primary URL is the URL
     * of the document which requested microphone access. The secondary URL is not
     * used.<br>NOTE: The 'allow' setting is not valid if both patterns are
     * '<all_urls>'.
     */
    export const microphone: ContentSetting<MicrophoneContentSetting>;

    /**
     * Whether to allow sites to access the camera. One of <br><var>allow</var>:
     * Allow sites to access the camera,<br><var>block</var>: Don't allow sites to
     * access the camera,<br><var>ask</var>: Ask when a site wants to access the
     * camera. <br>Default is <var>ask</var>.<br>The primary URL is the URL of the
     * document which requested camera access. The secondary URL is not
     * used.<br>NOTE: The 'allow' setting is not valid if both patterns are
     * '<all_urls>'.
     */
    export const camera: ContentSetting<CameraContentSetting>;

    /**
     * Whether to allow sites to run plugins unsandboxed. One of
     * <br><var>allow</var>: Allow sites to run plugins
     * unsandboxed,<br><var>block</var>: Don't allow sites to run plugins
     * unsandboxed,<br><var>ask</var>: Ask when a site wants to run a plugin
     * unsandboxed. <br>Default is <var>ask</var>.<br>The primary URL is the URL of
     * the top-level frame. The secondary URL is not used.
     */
    export const unsandboxedPlugins: ContentSetting<PpapiBrokerContentSetting>;

    /**
     * Whether to allow sites to download multiple files automatically. One of
     * <br><var>allow</var>: Allow sites to download multiple files
     * automatically,<br><var>block</var>: Don't allow sites to download multiple
     * files automatically,<br><var>ask</var>: Ask when a site wants to download
     * files automatically after the first file. <br>Default is
     * <var>ask</var>.<br>The primary URL is the URL of the top-level frame. The
     * secondary URL is not used.
     */
    export const automaticDownloads: ContentSetting<MultipleAutomaticDownloadsContentSetting>;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.contextMenus</code> API to add items to Google Chrome's
   * context menu. You can choose what types of objects your context menu
   * additions apply to, such as images, hyperlinks, and pages.
   * @chrome-permission contextMenus
 */
  export namespace contextMenus {
    /**
     * The different contexts a menu can appear in. Specifying 'all' is equivalent
     * to the combination of all other contexts except for 'launcher'. The
     * 'launcher' context is only supported by apps and is used to add menu items to
     * the context menu that appears when clicking the app icon in the
     * launcher/taskbar/dock/etc. Different platforms might put limitations on what
     * is actually supported in a launcher context menu.
     */
    export type ContextType = "all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action";

    /**
     * The type of menu item.
     */
    export type ItemType = "normal" | "checkbox" | "radio" | "separator";

    /**
     * The maximum number of top level extension items that can be added to an
     * extension action context menu. Any items beyond this limit will be ignored.
     */
    export const ACTION_MENU_TOP_LEVEL_LIMIT: number;

    /**
     * Creates a new context menu item. If an error occurs during creation, it may
     * not be detected until the creation callback fires; details will be in
     * <code>chrome.runtime.lastError</code>.
     * @param createProperties
     * @param callback Called when the item has been created in the browser. If an error occurs during creation, details will be available in <code>chrome.runtime.lastError</code>.
     * @returns The ID of the newly created item.
     */
    export function create(
      createProperties: {
        /**
         * The type of menu item. Defaults to <code>normal</code>.
         */
        type?: ItemType,

        /**
         * The unique ID to assign to this item. Mandatory for event pages. Cannot be
         * the same as another ID for this extension.
         */
        id?: string,

        /**
         * The text to display in the item; this is <em>required</em> unless
         * <code>type</code> is <code>separator</code>. When the context is
         * <code>selection</code>, use <code>%s</code> within the string to show the
         * selected text. For example, if this parameter's value is "Translate '%s' to
         * Pig Latin" and the user selects the word "cool", the context menu item for
         * the selection is "Translate 'cool' to Pig Latin".
         */
        title?: string,

        /**
         * The initial state of a checkbox or radio button: <code>true</code> for
         * selected, <code>false</code> for unselected. Only one radio button can be
         * selected at a time in a given group.
         */
        checked?: boolean,

        /**
         * List of contexts this menu item will appear in. Defaults to
         * <code>['page']</code>.
         */
        contexts?: [ContextType] & ContextType[],

        /**
         * Whether the item is visible in the menu.
         */
        visible?: boolean,

        /**
         * A function that is called back when the menu item is clicked. Event pages
         * cannot use this; instead, they should register a listener for {@link
         * contextMenus.onClicked}.
         */
        onclick?: (
          info: object,
          tab: tabs.Tab,
        ) => void,

        /**
         * The ID of a parent menu item; this makes the item a child of a previously
         * added item.
         */
        parentId?: number | string,

        /**
         * Restricts the item to apply only to documents or frames whose URL matches one
         * of the given patterns. For details on pattern formats, see <a
         * href='match_patterns'>Match Patterns</a>.
         */
        documentUrlPatterns?: string[],

        /**
         * Similar to <code>documentUrlPatterns</code>, filters based on the
         * <code>src</code> attribute of <code>img</code>, <code>audio</code>, and
         * <code>video</code> tags and the <code>href</code> attribute of <code>a</code>
         * tags.
         */
        targetUrlPatterns?: string[],

        /**
         * Whether this context menu item is enabled or disabled. Defaults to
         * <code>true</code>.
         */
        enabled?: boolean,
      },
      callback?: () => void,
    ): number | string;

    /**
     * Updates a previously created context menu item.
     * @param id The ID of the item to update.
     * @param updateProperties The properties to update. Accepts the same values as the {@link contextMenus.create} function.
     * @param callback Called when the context menu has been updated.
     */
    export function update(
      id: number | string,
      updateProperties: {
        type?: ItemType,
        title?: string,
        checked?: boolean,
        contexts?: [ContextType] & ContextType[],

        /**
         * Whether the item is visible in the menu.
         */
        visible?: boolean,
        onclick?: (
          info: object,
          tab: tabs.Tab,
        ) => void,

        /**
         * The ID of the item to be made this item's parent. Note: You cannot set an
         * item to become a child of its own descendant.
         */
        parentId?: number | string,
        documentUrlPatterns?: string[],
        targetUrlPatterns?: string[],
        enabled?: boolean,
      },
      callback?: () => void,
    ): void;

    /**
     * Removes a context menu item.
     * @param menuItemId The ID of the context menu item to remove.
     * @param callback Called when the context menu has been removed.
     */
    export function remove(
      menuItemId: number | string,
      callback?: () => void,
    ): void;

    /**
     * Removes all context menu items added by this extension.
     * @param callback Called when removal is complete.
     */
    export function removeAll(
      callback?: () => void,
    ): void;

    /**
     */
    export const onClicked: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.cookies</code> API to query and modify cookies, and to
   * be notified when they change.
   * @chrome-permission cookies
 */
  export namespace cookies {
    /**
     * A cookie's 'SameSite' state
     * (https://tools.ietf.org/html/draft-west-first-party-cookies).
     * 'no_restriction' corresponds to a cookie set without a 'SameSite' attribute,
     * 'lax' to 'SameSite=Lax', and 'strict' to 'SameSite=Strict'.
     */
    export type SameSiteStatus = "no_restriction" | "lax" | "strict";

    /**
     * Represents information about an HTTP cookie.
     */
    export interface Cookie {
      /**
       * The name of the cookie.
       */
      name: string;

      /**
       * The value of the cookie.
       */
      value: string;

      /**
       * The domain of the cookie (e.g. "www.google.com", "example.com").
       */
      domain: string;

      /**
       * True if the cookie is a host-only cookie (i.e. a request's host must exactly
       * match the domain of the cookie).
       */
      hostOnly: boolean;

      /**
       * The path of the cookie.
       */
      path: string;

      /**
       * True if the cookie is marked as Secure (i.e. its scope is limited to secure
       * channels, typically HTTPS).
       */
      secure: boolean;

      /**
       * True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to
       * client-side scripts).
       */
      httpOnly: boolean;

      /**
       * The cookie's same-site status (i.e. whether the cookie is sent with
       * cross-site requests).
       */
      sameSite: SameSiteStatus;

      /**
       * True if the cookie is a session cookie, as opposed to a persistent cookie
       * with an expiration date.
       */
      session: boolean;

      /**
       * The expiration date of the cookie as the number of seconds since the UNIX
       * epoch. Not provided for session cookies.
       */
      expirationDate?: number;

      /**
       * The ID of the cookie store containing this cookie, as provided in
       * getAllCookieStores().
       */
      storeId: string;
    }

    /**
     * Represents a cookie store in the browser. An incognito mode window, for
     * instance, uses a separate cookie store from a non-incognito window.
     */
    export interface CookieStore {
      /**
       * The unique identifier for the cookie store.
       */
      id: string;

      /**
       * Identifiers of all the browser tabs that share this cookie store.
       */
      tabIds: number[];
    }

    /**
     * The underlying reason behind the cookie's change. If a cookie was inserted,
     * or removed via an explicit call to "chrome.cookies.remove", "cause" will be
     * "explicit". If a cookie was automatically removed due to expiry, "cause" will
     * be "expired". If a cookie was removed due to being overwritten with an
     * already-expired expiration date, "cause" will be set to "expired_overwrite".
     * If a cookie was automatically removed due to garbage collection, "cause" will
     * be "evicted".  If a cookie was automatically removed due to a "set" call that
     * overwrote it, "cause" will be "overwrite". Plan your response accordingly.
     */
    export type OnChangedCause = "evicted" | "expired" | "explicit" | "expired_overwrite" | "overwrite";

    /**
     * Retrieves information about a single cookie. If more than one cookie of the
     * same name exists for the given URL, the one with the longest path will be
     * returned. For cookies with the same path length, the cookie with the earliest
     * creation time will be returned.
     * @param details Details to identify the cookie being retrieved.
     * @param callback
     * @param callback.cookie Contains details about the cookie. This parameter is null if no such cookie was found.
     */
    export function get(
      details: {
        /**
         * The URL with which the cookie to retrieve is associated. This argument may be
         * a full URL, in which case any data following the URL path (e.g. the query
         * string) is simply ignored. If host permissions for this URL are not specified
         * in the manifest file, the API call will fail.
         */
        url: string,

        /**
         * The name of the cookie to retrieve.
         */
        name: string,

        /**
         * The ID of the cookie store in which to look for the cookie. By default, the
         * current execution context's cookie store will be used.
         */
        storeId?: string,
      },
      callback: (
        cookie?: Cookie,
      ) => void,
    ): void;

    /**
     * Retrieves all cookies from a single cookie store that match the given
     * information.  The cookies returned will be sorted, with those with the
     * longest path first.  If multiple cookies have the same path length, those
     * with the earliest creation time will be first.
     * @param details Information to filter the cookies being retrieved.
     * @param callback
     * @param callback.cookies All the existing, unexpired cookies that match the given cookie info.
     */
    export function getAll(
      details: {
        /**
         * Restricts the retrieved cookies to those that would match the given URL.
         */
        url?: string,

        /**
         * Filters the cookies by name.
         */
        name?: string,

        /**
         * Restricts the retrieved cookies to those whose domains match or are
         * subdomains of this one.
         */
        domain?: string,

        /**
         * Restricts the retrieved cookies to those whose path exactly matches this
         * string.
         */
        path?: string,

        /**
         * Filters the cookies by their Secure property.
         */
        secure?: boolean,

        /**
         * Filters out session vs. persistent cookies.
         */
        session?: boolean,

        /**
         * The cookie store to retrieve cookies from. If omitted, the current execution
         * context's cookie store will be used.
         */
        storeId?: string,
      },
      callback: (
        cookies: Cookie[],
      ) => void,
    ): void;

    /**
     * Sets a cookie with the given cookie data; may overwrite equivalent cookies if
     * they exist.
     * @param details Details about the cookie being set.
     * @param callback
     * @param callback.cookie Contains details about the cookie that's been set.  If setting failed for any reason, this will be "null", and "chrome.runtime.lastError" will be set.
     */
    export function set(
      details: {
        /**
         * The request-URI to associate with the setting of the cookie. This value can
         * affect the default domain and path values of the created cookie. If host
         * permissions for this URL are not specified in the manifest file, the API call
         * will fail.
         */
        url: string,

        /**
         * The name of the cookie. Empty by default if omitted.
         */
        name?: string,

        /**
         * The value of the cookie. Empty by default if omitted.
         */
        value?: string,

        /**
         * The domain of the cookie. If omitted, the cookie becomes a host-only cookie.
         */
        domain?: string,

        /**
         * The path of the cookie. Defaults to the path portion of the url parameter.
         */
        path?: string,

        /**
         * Whether the cookie should be marked as Secure. Defaults to false.
         */
        secure?: boolean,

        /**
         * Whether the cookie should be marked as HttpOnly. Defaults to false.
         */
        httpOnly?: boolean,

        /**
         * The cookie's same-site status: defaults to 'no_restriction'.
         */
        sameSite?: SameSiteStatus,

        /**
         * The expiration date of the cookie as the number of seconds since the UNIX
         * epoch. If omitted, the cookie becomes a session cookie.
         */
        expirationDate?: number,

        /**
         * The ID of the cookie store in which to set the cookie. By default, the cookie
         * is set in the current execution context's cookie store.
         */
        storeId?: string,
      },
      callback?: (
        cookie?: Cookie,
      ) => void,
    ): void;

    /**
     * Deletes a cookie by name.
     * @param details Information to identify the cookie to remove.
     * @param callback
     * @param callback.details Contains details about the cookie that's been removed.  If removal failed for any reason, this will be "null", and "chrome.runtime.lastError" will be set.
     */
    export function remove(
      details: {
        /**
         * The URL associated with the cookie. If host permissions for this URL are not
         * specified in the manifest file, the API call will fail.
         */
        url: string,

        /**
         * The name of the cookie to remove.
         */
        name: string,

        /**
         * The ID of the cookie store to look in for the cookie. If unspecified, the
         * cookie is looked for by default in the current execution context's cookie
         * store.
         */
        storeId?: string,
      },
      callback?: (
        details?: {
          /**
           * The URL associated with the cookie that's been removed.
           */
          url: string,

          /**
           * The name of the cookie that's been removed.
           */
          name: string,

          /**
           * The ID of the cookie store from which the cookie was removed.
           */
          storeId: string,
        },
      ) => void,
    ): void;

    /**
     * Lists all existing cookie stores.
     * @param callback
     * @param callback.cookieStores All the existing cookie stores.
     */
    export function getAllCookieStores(
      callback: (
        cookieStores: CookieStore[],
      ) => void,
    ): void;

    /**
     * Fired when a cookie is set or removed. As a special case, note that
     * updating a cookie's properties is implemented as a two step process: the
     * cookie to be updated is first removed entirely, generating a notification
     * with "cause" of "overwrite" .  Afterwards, a new cookie is written with
     * the updated values, generating a second notification with "cause"
     * "explicit".
     */
    export const onChanged: chrome.events.Event<
      /**
       * @param changeInfo
       */
      (
        changeInfo: {
          /**
           * True if a cookie was removed.
           */
          removed: boolean,

          /**
           * Information about the cookie that was set or removed.
           */
          cookie: Cookie,

          /**
           * The underlying reason behind the cookie's change.
           */
          cause: OnChangedCause,
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.dataReductionProxy</code> API to control the data
   * reduction proxy and access usage metrics. This API relies on the <a
   * href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for
   * getting and setting Chrome's configuration.
   * @chrome-permission dataReductionProxy
 */
  export namespace dataReductionProxy {
    /**
     * Flag to enable data usage reduction by sending requests via data reduction
     * proxy. This preference's value is a boolean, defaulting to
     * <code>false</code>.
     */
    export const spdyProxyEnabled: types.ChromeSetting<boolean>;

    /**
     * Each item contains the number uncompressed bytes through data reduction proxy
     * per day.
     */
    export const dataReductionDailyContentLength: types.ChromeSetting<number[]>;

    /**
     * Each item contains the number of compressed bytes through data reduction
     * proxy per day.
     */
    export const dataReductionDailyReceivedLength: types.ChromeSetting<number[]>;

    /**
     * Flag to enable collection and reporting of detailed data usage.
     */
    export const dataUsageReportingEnabled: types.ChromeSetting<boolean>;

    /**
     * Clear all data saving metrics obtained by using the data reduction proxy.
     * @param callback Callback to call after data savings have been cleared
     */
    export function clearDataSavings(
      callback?: () => void,
    ): void;

    /**
     * Get data usage history.
     * @param getDataUsageCallback Callback to call with data usage history
     * @param getDataUsageCallback.data_usage Data usage history.
     */
    export function getDataUsage(
      getDataUsageCallback?: (
        data_usage: {
          /**
           * Data usage for the past 60 days broken down by time intervals. Each element
           * contains data usage for |kDataUsageBucketLengthMins| minutes.
           */
          data_usage_buckets: any[],
        },
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.debugger</code> API serves as an alternate transport for
   * Chrome's <a
   * href='https://developer.chrome.com/devtools/docs/debugger-protocol'>remote
   * debugging protocol</a>. Use <code>chrome.debugger</code> to attach to one or
   * more tabs to instrument network interaction, debug JavaScript, mutate the DOM
   * and CSS, etc. Use the Debuggee <code>tabId</code> to target tabs with
   * sendCommand and route events by <code>tabId</code> from onEvent callbacks.
   */
  namespace _debugger {
    /**
     * Debuggee identifier. Either tabId or extensionId must be specified
     */
    export interface Debuggee {
      /**
       * The id of the tab which you intend to debug.
       */
      tabId?: number;

      /**
       * The id of the extension which you intend to debug. Attaching to an extension
       * background page is only possible when 'silent-debugger-extension-api' flag is
       * enabled on the target browser.
       */
      extensionId?: string;

      /**
       * The opaque id of the debug target.
       */
      targetId?: string;
    }

    /**
     * Target type.
     */
    export type TargetInfoType = "page" | "background_page" | "worker" | "other";

    /**
     * Connection termination reason.
     */
    export type DetachReason = "target_closed" | "canceled_by_user";

    /**
     * Debug target information
     */
    export interface TargetInfo {
      /**
       * Target type.
       */
      type: TargetInfoType;

      /**
       * Target id.
       */
      id: string;

      /**
       * The tab id, defined if type == 'page'.
       */
      tabId?: number;

      /**
       * The extension id, defined if type = 'background_page'.
       */
      extensionId?: string;

      /**
       * True if debugger is already attached.
       */
      attached: boolean;

      /**
       * Target page title.
       */
      title: string;

      /**
       * Target URL.
       */
      url: string;

      /**
       * Target favicon URL.
       */
      faviconUrl?: string;
    }

    /**
     * Attaches debugger to the given target.
     * @param target Debugging target to which you want to attach.
     * @param requiredVersion Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained <a href='https://developer.chrome.com/devtools/docs/debugger-protocol'>here</a>.
     * @param callback Called once the attach operation succeeds or fails. Callback receives no arguments. If the attach fails, {@link runtime.lastError} will be set to the error message.
     */
    export function attach(
      target: Debuggee,
      requiredVersion: string,
      callback?: () => void,
    ): void;

    /**
     * Detaches debugger from the given target.
     * @param target Debugging target from which you want to detach.
     * @param callback Called once the detach operation succeeds or fails. Callback receives no arguments. If the detach fails, {@link runtime.lastError} will be set to the error message.
     */
    export function detach(
      target: Debuggee,
      callback?: () => void,
    ): void;

    /**
     * Sends given command to the debugging target.
     * @param target Debugging target to which you want to send the command.
     * @param method Method name. Should be one of the methods defined by the <a href='https://developer.chrome.com/devtools/docs/debugger-protocol'>remote debugging protocol</a>.
     * @param commandParams JSON object with request parameters. This object must conform to the remote debugging params scheme for given method.
     * @param callback Response body. If an error occurs while posting the message, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
     * @param callback.result JSON object with the response. Structure of the response varies depending on the method name and is defined by the 'returns' attribute of the command description in the remote debugging protocol.
     */
    export function sendCommand(
      target: Debuggee,
      method: string,
      commandParams?: {[name: string]: any},
      callback?: (
        result?: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * Returns the list of available debug targets.
     * @param callback
     * @param callback.result Array of TargetInfo objects corresponding to the available debug targets.
     */
    export function getTargets(
      callback: (
        result: TargetInfo[],
      ) => void,
    ): void;

    /**
     * Fired whenever debugging target issues instrumentation event.
     */
    export const onEvent: chrome.events.Event<
      /**
       * @param source The debuggee that generated this event.
       * @param method Method name. Should be one of the notifications defined by the <a href='https://developer.chrome.com/devtools/docs/debugger-protocol'>remote debugging protocol</a>.
       * @param params JSON object with the parameters. Structure of the parameters varies depending on the method name and is defined by the 'parameters' attribute of the event description in the remote debugging protocol.
       */
      (
        source: Debuggee,
        method: string,
        params?: {[name: string]: any},
      ) => void
    >;

    /**
     * Fired when browser terminates debugging session for the tab. This happens
     * when either the tab is being closed or Chrome DevTools is being invoked
     * for the attached tab.
     */
    export const onDetach: chrome.events.Event<
      /**
       * @param source The debuggee that was detached.
       * @param reason Connection termination reason.
       */
      (
        source: Debuggee,
        reason: DetachReason,
      ) => void
    >;
  }

  export {_debugger as debugger};
}

declare namespace chrome {
  /**
   * Use the <code>chrome.declarativeContent</code> API to take actions depending
   * on the content of a page, without requiring permission to read the page's
   * content.
   * @chrome-permission declarativeContent
 */
  export namespace declarativeContent {
    /**
     * See <a
     * href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData">https://developer.mozilla.org/en-US/docs/Web/API/ImageData</a>.
     */
    export type ImageDataType = ArrayBuffer;

    export type PageStateMatcherInstanceType = "declarativeContent.PageStateMatcher";

    export type ShowPageActionInstanceType = "declarativeContent.ShowPageAction";

    export type ShowActionInstanceType = "declarativeContent.ShowAction";

    export type SetIconInstanceType = "declarativeContent.SetIcon";

    export type RequestContentScriptInstanceType = "declarativeContent.RequestContentScript";

    /**
     * Matches the state of a web page based on various criteria.
     */
    export interface PageStateMatcher {
      /**
       * Matches if the conditions of the <code>UrlFilter</code> are fulfilled for the
       * top-level URL of the page.
       */
      pageUrl?: events.UrlFilter;

      /**
       * Matches if all of the CSS selectors in the array match displayed elements in
       * a frame with the same origin as the page's main frame. All selectors in this
       * array must be <a href="http://www.w3.org/TR/selectors4/#compound">compound
       * selectors</a> to speed up matching. Note: Listing hundreds of CSS selectors
       * or listing CSS selectors that match hundreds of times per page can slow down
       * web sites.
       */
      css?: string[];

      /**
       * Matches if the bookmarked state of the page is equal to the specified value.
       * Requres the <a href='declare_permissions'>bookmarks permission</a>.
       */
      isBookmarked?: boolean;

      instanceType: PageStateMatcherInstanceType;
    }

    /**
     * Declarative event action that shows the extension's {@link pageAction page
     * action} while the corresponding conditions are met. This action can be used
     * without <a href="declare_permissions#host-permissions">host permissions</a>,
     * but the extension must have a page action. If the extension has the <a
     * href="activeTab.html">activeTab</a> permission, clicking the page action
     * grants access to the active tab.
     */
    export interface ShowPageAction {
      instanceType: ShowPageActionInstanceType;
    }

    /**
     * Declarative event action that shows the extension's toolbar action ({@link
     * pageAction page action} or {@link browserAction browser action}) while the
     * corresponding conditions are met. This action can be used without <a
     * href="declare_permissions#host-permissions">host permissions</a>. If the
     * extension has the <a href="activeTab.html">activeTab</a> permission, clicking
     * the page action grants access to the active tab.
     */
    export interface ShowAction {
      instanceType: ShowActionInstanceType;
    }

    /**
     * Declarative event action that sets the n-<abbr title="device-independent
     * pixel">dip</abbr> square icon for the extension's {@link pageAction page
     * action} or {@link browserAction browser action} while the corresponding
     * conditions are met. This action can be used without <a
     * href="declare_permissions.html#host-permissions">host permissions</a>, but
     * the extension must have a page or browser action.<p>Exactly one of
     * <code>imageData</code> or <code>path</code> must be specified. Both are
     * dictionaries mapping a number of pixels to an image representation. The image
     * representation in <code>imageData</code> is an <a
     * href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData">ImageData</a> object; for example, from a <code>canvas</code> element, while the image representation in <code>path</code> is the path to an image file relative to the extension's manifest. If <code>scale</code> screen pixels fit into a device-independent pixel, the <code>scale * n</code> icon is used. If that scale is missing, another image is resized to the required size.</p>
     */
    export interface SetIcon {
      instanceType: SetIconInstanceType;

      /**
       * Either an <code>ImageData</code> object or a dictionary {size -> ImageData}
       * representing an icon to be set. If the icon is specified as a dictionary, the
       * image used is chosen depending on the screen's pixel density. If the number
       * of image pixels that fit into one screen space unit equals
       * <code>scale</code>, then an image with size <code>scale * n</code> is
       * selected, where <i>n</i> is the size of the icon in the UI. At least one
       * image must be specified. Note that <code>details.imageData = foo</code> is
       * equivalent to <code>details.imageData = {'16': foo}</code>.
       */
      imageData?: ImageDataType | {[name: string]: any};
    }

    /**
     * Declarative event action that injects a content script. <p><b>WARNING:</b>
     * This action is still experimental and is not supported on stable builds of
     * Chrome.</p>
     */
    export interface RequestContentScript {
      /**
       * Names of CSS files to be injected as a part of the content script.
       */
      css?: string[];

      /**
       * Names of JavaScript files to be injected as a part of the content script.
       */
      js?: string[];

      /**
       * Whether the content script runs in all frames of the matching page, or in
       * only the top frame. Default is <code>false</code>.
       */
      allFrames?: boolean;

      /**
       * Whether to insert the content script on <code>about:blank</code> and
       * <code>about:srcdoc</code>. Default is <code>false</code>.
       */
      matchAboutBlank?: boolean;

      instanceType: RequestContentScriptInstanceType;
    }

    /**
     */
    export const onPageChanged: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.declarativeNetRequest</code> API is used to block or
   * redirect network requests by specifying declarative rules.
   * @beta
 * @chrome-permission declarativeNetRequest
 */
  export namespace declarativeNetRequest {
    /**
     * This describes the resource type of the network request.
     */
    export type ResourceType = "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "other";

    /**
     * This describes whether the request is first or third party to the frame in
     * which it originated. A request is said to be first party if it has the same
     * domain (eTLD+1) as the frame in which the request originated.
     */
    export type DomainType = "firstParty" | "thirdParty";

    /**
     * Describes the kind of action to take if a given RuleCondition matches.
     */
    export type RuleActionType = "block" | "redirect" | "allow";

    export interface RuleCondition {
      /**
       * <p>The pattern which is matched against the network request url. Supported
       * constructs:</p><p><b>'*'</b>  : Wildcard: Matches any number of
       * characters.</p><p><b>'|'</b>  : Left/right anchor: If used at either end of
       * the pattern,               specifies the beginning/end of the url
       * respectively.</p><p><b>'||'</b> : Domain name anchor: If used at the
       * beginning of the pattern,               specifies the start of a (sub-)domain
       * of the URL.</p><p><b>'^'</b>  : Separator character: This matches anything
       * except a letter, a               digit or one of the following: _ - . %. This
       * can also match               the end of the URL.</p><p>Therefore
       * <code>urlFilter</code> is composed of the following parts: (optional
       * Left/Domain name anchor) + pattern + (optional Right anchor).</p><p>If
       * omitted, all urls are matched. An empty string is not allowed.</p><p>Note:
       * The <code>urlFilter</code> must be composed of only ASCII characters. This is
       * matched against a url where the host is encoded in the punycode format (in
       * case of internationalized domains) and any other non-ascii characters are url
       * encoded in utf-8. For example, when the request url is http://abc.рф?q=ф,
       * the <code>urlFilter</code> will be matched against the url
       * http://abc.xn--p1ai/?q=%D1%84.</p>
       */
      urlFilter?: string;

      /**
       * Whether the <code>urlFilter</code> is case sensitive. Default is true.
       */
      isUrlFilterCaseSensitive?: boolean;

      /**
       * <p>The rule will only match network requests originating from the list of
       * <code>domains</code>. If the list is omitted, the rule is applied to requests
       * from all domains. An empty list is not allowed.</p><p>Note: sub-domains like
       * "a.example.com" are also allowed. The entries must consist of only ascii
       * characters. Use punycode encoding for internationalized domains.</p>
       */
      domains?: string[];

      /**
       * <p>The rule will not match network requests originating from the list of
       * <code>excludedDomains</code>. If the list is empty or omitted, no domains are
       * excluded. This takes precedence over <code>domains</code>.</p><p>Note:
       * sub-domains like "a.example.com" are also allowed. The entries must consist
       * of only ascii characters. Use punycode encoding for internationalized
       * domains.</p>
       */
      excludedDomains?: string[];

      /**
       * List of resource types which the rule can match. An empty list is not
       * allowed.
       */
      resourceTypes?: ResourceType[];

      /**
       * List of resource types which the rule won't match. Only one of
       * <code>resourceTypes</code> and <code>excludedResourceTypes</code> should be
       * specified. If neither of them is specified, all resource types except
       * "main_frame" are blocked.
       */
      excludedResourceTypes?: ResourceType[];

      /**
       * Specifies whether the network request is first-party or third-party to the
       * domain from which it originated. If omitted, all requests are accepted.
       */
      domainType?: DomainType;
    }

    export interface RuleAction {
      /**
       * The type of action to perform.
       */
      type: RuleActionType;

      /**
       * The redirect url. Only valid if RuleActionType is "redirect".
       */
      redirectUrl?: string;
    }

    export interface Rule {
      /**
       * An id which uniquely identifies a rule. Mandatory and should be >= 1.
       */
      id: number;

      /**
       * Rule priority. Mandatory for redirect rules and should be >= 1. This is used
       * to break ties between multiple matching redirect rules.
       */
      priority?: number;

      /**
       * The condition under which this rule is triggered.
       */
      condition: RuleCondition;

      /**
       * The action to take if this rule is matched.
       */
      action: RuleAction;
    }

    /**
     * The maximum number of allowed pages that an extension can add.
     */
    export const MAX_NUMBER_OF_ALLOWED_PAGES: number;

    /**
     * The maximum number of rules that an extension can specify in the rule
     * resources file. Any excess rules will be ignored and an install warning will
     * be raised.
     */
    export const MAX_NUMBER_OF_RULES: number;

    /**
     * TODO(crbug.com/930961): Enable documentation for these functions once they
     * are implemented.
     * @param rules
     * @param callback
     */
    export function addDynamicRules(
      rules: Rule[],
      callback?: () => void,
    ): void;

    /**
     * @param rule_ids
     * @param callback
     */
    export function removeDynamicRules(
      rule_ids: number[],
      callback?: () => void,
    ): void;

    /**
     * @param callback
     * @param callback.rules
     */
    export function getDynamicRules(
      callback: (
        rules: Rule[],
      ) => void,
    ): void;

    /**
     * Adds <code>page_patterns</code> to the set of allowed pages. Requests from
     * these pages are not intercepted by the extension. These are persisted across
     * browser sessions. Note: <a href="#property-MAX_NUMBER_OF_ALLOWED_PAGES">
     * MAX_NUMBER_OF_ALLOWED_PAGES</a> is the maximum number of allowed page an
     * extension can add. Also, adding page patterns is atomic. In case of an error,
     * no page pattern is added.
     * @param page_patterns Array of <a href="/extensions/match_patterns">match patterns</a> which are to be allowed.
     * @param callback Called after the <code>page_patterns</code> have been added. chrome.runtime.lastError will be set in case of an error, for example if an invalid page pattern is specified or the extension exceeded the maximum page patterns limit.
     */
    export function addAllowedPages(
      page_patterns: string[],
      callback?: () => void,
    ): void;

    /**
     * Removes <code>page_patterns</code> from the set of allowed pages. Note:
     * Removing page patterns is atomic. In case of an error, no page pattern is
     * removed.
     * @param page_patterns Array of <a href="/extensions/match_patterns">match patterns</a> which are to be removed.
     * @param callback Called after the <code>page_patterns</code> have been removed. chrome.runtime.lastError will be set in case of an error.
     */
    export function removeAllowedPages(
      page_patterns: string[],
      callback?: () => void,
    ): void;

    /**
     * Returns the current set of allowed pages.
     * @param callback Called with the set of currently allowed pages.
     * @param callback.result
     */
    export function getAllowedPages(
      callback: (
        result: string[],
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * <em><strong>Note:</strong> this API is currently on hold, without concrete
   * plans to move to stable.</em> Use the
   * <code>chrome.declarativeWebRequest</code> API to intercept, block, or modify
   * requests in-flight. It is significantly faster than the <a
   * href='webRequest'><code>chrome.webRequest</code> API</a> because you can
   * register rules that are evaluated in the browser rather than the JavaScript
   * engine, which reduces roundtrip latencies and allows higher efficiency.
   * @beta
 * @chrome-permission declarativeWebRequest
 */
  export namespace declarativeWebRequest {
    export type RequestMatcherInstanceType = "declarativeWebRequest.RequestMatcher";

    export type CancelRequestInstanceType = "declarativeWebRequest.CancelRequest";

    export type RedirectRequestInstanceType = "declarativeWebRequest.RedirectRequest";

    export type RedirectToTransparentImageInstanceType = "declarativeWebRequest.RedirectToTransparentImage";

    export type RedirectToEmptyDocumentInstanceType = "declarativeWebRequest.RedirectToEmptyDocument";

    export type RedirectByRegExInstanceType = "declarativeWebRequest.RedirectByRegEx";

    export type SetRequestHeaderInstanceType = "declarativeWebRequest.SetRequestHeader";

    export type RemoveRequestHeaderInstanceType = "declarativeWebRequest.RemoveRequestHeader";

    export type AddResponseHeaderInstanceType = "declarativeWebRequest.AddResponseHeader";

    export type RemoveResponseHeaderInstanceType = "declarativeWebRequest.RemoveResponseHeader";

    export type IgnoreRulesInstanceType = "declarativeWebRequest.IgnoreRules";

    export type SendMessageToExtensionInstanceType = "declarativeWebRequest.SendMessageToExtension";

    export type AddRequestCookieInstanceType = "declarativeWebRequest.AddRequestCookie";

    export type AddResponseCookieInstanceType = "declarativeWebRequest.AddResponseCookie";

    export type EditRequestCookieInstanceType = "declarativeWebRequest.EditRequestCookie";

    export type EditResponseCookieInstanceType = "declarativeWebRequest.EditResponseCookie";

    export type RemoveRequestCookieInstanceType = "declarativeWebRequest.RemoveRequestCookie";

    export type RemoveResponseCookieInstanceType = "declarativeWebRequest.RemoveResponseCookie";

    export type Stage = "onBeforeRequest" | "onBeforeSendHeaders" | "onHeadersReceived" | "onAuthRequired";

    /**
     * Filters request headers for various criteria. Multiple criteria are evaluated
     * as a conjunction.
     */
    export interface HeaderFilter {
      /**
       * Matches if the header name starts with the specified string.
       */
      namePrefix?: string;

      /**
       * Matches if the header name ends with the specified string.
       */
      nameSuffix?: string;

      /**
       * Matches if the header name contains all of the specified strings.
       */
      nameContains?: string[] | string;

      /**
       * Matches if the header name is equal to the specified string.
       */
      nameEquals?: string;

      /**
       * Matches if the header value starts with the specified string.
       */
      valuePrefix?: string;

      /**
       * Matches if the header value ends with the specified string.
       */
      valueSuffix?: string;

      /**
       * Matches if the header value contains all of the specified strings.
       */
      valueContains?: string[] | string;

      /**
       * Matches if the header value is equal to the specified string.
       */
      valueEquals?: string;
    }

    /**
     * Matches network events by various criteria.
     */
    export interface RequestMatcher {
      /**
       * Matches if the conditions of the UrlFilter are fulfilled for the URL of the
       * request.
       */
      url?: events.UrlFilter;

      /**
       * Matches if the conditions of the UrlFilter are fulfilled for the 'first
       * party' URL of the request. The 'first party' URL of a request, when present,
       * can be different from the request's target URL, and describes what is
       * considered 'first party' for the sake of third-party checks for cookies.
       */
      firstPartyForCookiesUrl?: events.UrlFilter;

      /**
       * Matches if the request type of a request is contained in the list. Requests
       * that cannot match any of the types will be filtered out.
       */
      resourceType?: webRequest.ResourceType[];

      /**
       * Matches if the MIME media type of a response (from the HTTP Content-Type
       * header) is contained in the list.
       */
      contentType?: string[];

      /**
       * Matches if the MIME media type of a response (from the HTTP Content-Type
       * header) is <em>not</em> contained in the list.
       */
      excludeContentType?: string[];

      /**
       * Matches if some of the request headers is matched by one of the
       * HeaderFilters.
       */
      requestHeaders?: HeaderFilter[];

      /**
       * Matches if none of the request headers is matched by any of the
       * HeaderFilters.
       */
      excludeRequestHeaders?: HeaderFilter[];

      /**
       * Matches if some of the response headers is matched by one of the
       * HeaderFilters.
       */
      responseHeaders?: HeaderFilter[];

      /**
       * Matches if none of the response headers is matched by any of the
       * HeaderFilters.
       */
      excludeResponseHeaders?: HeaderFilter[];

      /**
       * If set to true, matches requests that are subject to third-party cookie
       * policies. If set to false, matches all other requests.
       */
      thirdPartyForCookies?: boolean;

      /**
       * Contains a list of strings describing stages. Allowed values are
       * 'onBeforeRequest', 'onBeforeSendHeaders', 'onHeadersReceived',
       * 'onAuthRequired'. If this attribute is present, then it limits the applicable
       * stages to those listed. Note that the whole condition is only applicable in
       * stages compatible with all attributes.
       */
      stages?: Stage[];

      instanceType: RequestMatcherInstanceType;
    }

    /**
     * Declarative event action that cancels a network request.
     */
    export interface CancelRequest {
      instanceType: CancelRequestInstanceType;
    }

    /**
     * Declarative event action that redirects a network request.
     */
    export interface RedirectRequest {
      instanceType: RedirectRequestInstanceType;

      /**
       * Destination to where the request is redirected.
       */
      redirectUrl: string;
    }

    /**
     * Declarative event action that redirects a network request to a transparent
     * image.
     */
    export interface RedirectToTransparentImage {
      instanceType: RedirectToTransparentImageInstanceType;
    }

    /**
     * Declarative event action that redirects a network request to an empty
     * document.
     */
    export interface RedirectToEmptyDocument {
      instanceType: RedirectToEmptyDocumentInstanceType;
    }

    /**
     * Redirects a request by applying a regular expression on the URL. The regular
     * expressions use the <a
     * href="https://github.com/google/re2/blob/master/doc/syntax.txt">RE2
     * syntax</a>.
     */
    export interface RedirectByRegEx {
      instanceType: RedirectByRegExInstanceType;

      /**
       * A match pattern that may contain capture groups. Capture groups are
       * referenced in the Perl syntax ($1, $2, ...) instead of the RE2 syntax (\1,
       * \2, ...) in order to be closer to JavaScript Regular Expressions.
       */
      from: string;

      /**
       * Destination pattern.
       */
      to: string;
    }

    /**
     * Sets the request header of the specified name to the specified value. If a
     * header with the specified name did not exist before, a new one is created.
     * Header name comparison is always case-insensitive. Each request header name
     * occurs only once in each request.
     */
    export interface SetRequestHeader {
      instanceType: SetRequestHeaderInstanceType;

      /**
       * HTTP request header name.
       */
      name: string;

      /**
       * HTTP request header value.
       */
      value: string;
    }

    /**
     * Removes the request header of the specified name. Do not use SetRequestHeader
     * and RemoveRequestHeader with the same header name on the same request. Each
     * request header name occurs only once in each request.
     */
    export interface RemoveRequestHeader {
      instanceType: RemoveRequestHeaderInstanceType;

      /**
       * HTTP request header name (case-insensitive).
       */
      name: string;
    }

    /**
     * Adds the response header to the response of this web request. As multiple
     * response headers may share the same name, you need to first remove and then
     * add a new response header in order to replace one.
     */
    export interface AddResponseHeader {
      instanceType: AddResponseHeaderInstanceType;

      /**
       * HTTP response header name.
       */
      name: string;

      /**
       * HTTP response header value.
       */
      value: string;
    }

    /**
     * Removes all response headers of the specified names and values.
     */
    export interface RemoveResponseHeader {
      instanceType: RemoveResponseHeaderInstanceType;

      /**
       * HTTP request header name (case-insensitive).
       */
      name: string;

      /**
       * HTTP request header value (case-insensitive).
       */
      value?: string;
    }

    /**
     * Masks all rules that match the specified criteria.
     */
    export interface IgnoreRules {
      instanceType: IgnoreRulesInstanceType;

      /**
       * If set, rules with a lower priority than the specified value are ignored.
       * This boundary is not persisted, it affects only rules and their actions of
       * the same network request stage.
       */
      lowerPriorityThan?: number;

      /**
       * If set, rules with the specified tag are ignored. This ignoring is not
       * persisted, it affects only rules and their actions of the same network
       * request stage. Note that rules are executed in descending order of their
       * priorities. This action affects rules of lower priority than the current
       * rule. Rules with the same priority may or may not be ignored.
       */
      hasTag?: string;
    }

    /**
     * Triggers the {@link declarativeWebRequest.onMessage} event.
     */
    export interface SendMessageToExtension {
      instanceType: SendMessageToExtensionInstanceType;

      /**
       * The value that will be passed in the <code>message</code> attribute of the
       * dictionary that is passed to the event handler.
       */
      message: string;
    }

    /**
     * A filter or specification of a cookie in HTTP Requests.
     */
    export interface RequestCookie {
      /**
       * Name of a cookie.
       */
      name?: string;

      /**
       * Value of a cookie, may be padded in double-quotes.
       */
      value?: string;
    }

    /**
     * A specification of a cookie in HTTP Responses.
     */
    export interface ResponseCookie {
      /**
       * Name of a cookie.
       */
      name?: string;

      /**
       * Value of a cookie, may be padded in double-quotes.
       */
      value?: string;

      /**
       * Value of the Expires cookie attribute.
       */
      expires?: string;

      /**
       * Value of the Max-Age cookie attribute
       */
      maxAge?: number;

      /**
       * Value of the Domain cookie attribute.
       */
      domain?: string;

      /**
       * Value of the Path cookie attribute.
       */
      path?: string;

      /**
       * Existence of the Secure cookie attribute.
       */
      secure?: string;

      /**
       * Existence of the HttpOnly cookie attribute.
       */
      httpOnly?: string;
    }

    /**
     * A filter of a cookie in HTTP Responses.
     */
    export interface FilterResponseCookie {
      /**
       * Name of a cookie.
       */
      name?: string;

      /**
       * Value of a cookie, may be padded in double-quotes.
       */
      value?: string;

      /**
       * Value of the Expires cookie attribute.
       */
      expires?: string;

      /**
       * Value of the Max-Age cookie attribute
       */
      maxAge?: number;

      /**
       * Value of the Domain cookie attribute.
       */
      domain?: string;

      /**
       * Value of the Path cookie attribute.
       */
      path?: string;

      /**
       * Existence of the Secure cookie attribute.
       */
      secure?: string;

      /**
       * Existence of the HttpOnly cookie attribute.
       */
      httpOnly?: string;

      /**
       * Inclusive upper bound on the cookie lifetime (specified in seconds after
       * current time). Only cookies whose expiration date-time is in the interval
       * [now, now + ageUpperBound] fulfill this criterion. Session cookies and
       * cookies whose expiration date-time is in the past do not meet the criterion
       * of this filter. The cookie lifetime is calculated from either 'max-age' or
       * 'expires' cookie attributes. If both are specified, 'max-age' is used to
       * calculate the cookie lifetime.
       */
      ageUpperBound?: number;

      /**
       * Inclusive lower bound on the cookie lifetime (specified in seconds after
       * current time). Only cookies whose expiration date-time is set to 'now +
       * ageLowerBound' or later fulfill this criterion. Session cookies do not meet
       * the criterion of this filter. The cookie lifetime is calculated from either
       * 'max-age' or 'expires' cookie attributes. If both are specified, 'max-age' is
       * used to calculate the cookie lifetime.
       */
      ageLowerBound?: number;

      /**
       * Filters session cookies. Session cookies have no lifetime specified in any of
       * 'max-age' or 'expires' attributes.
       */
      sessionCookie?: boolean;
    }

    /**
     * Adds a cookie to the request or overrides a cookie, in case another cookie of
     * the same name exists already. Note that it is preferred to use the Cookies
     * API because this is computationally less expensive.
     */
    export interface AddRequestCookie {
      instanceType: AddRequestCookieInstanceType;

      /**
       * Cookie to be added to the request. No field may be undefined.
       */
      cookie: declarativeWebRequest.RequestCookie;
    }

    /**
     * Adds a cookie to the response or overrides a cookie, in case another cookie
     * of the same name exists already. Note that it is preferred to use the Cookies
     * API because this is computationally less expensive.
     */
    export interface AddResponseCookie {
      instanceType: AddResponseCookieInstanceType;

      /**
       * Cookie to be added to the response. The name and value need to be specified.
       */
      cookie: declarativeWebRequest.ResponseCookie;
    }

    /**
     * Edits one or more cookies of request. Note that it is preferred to use the
     * Cookies API because this is computationally less expensive.
     */
    export interface EditRequestCookie {
      instanceType: EditRequestCookieInstanceType;

      /**
       * Filter for cookies that will be modified. All empty entries are ignored.
       */
      filter: declarativeWebRequest.RequestCookie;

      /**
       * Attributes that shall be overridden in cookies that machted the filter.
       * Attributes that are set to an empty string are removed.
       */
      modification: declarativeWebRequest.RequestCookie;
    }

    /**
     * Edits one or more cookies of response. Note that it is preferred to use the
     * Cookies API because this is computationally less expensive.
     */
    export interface EditResponseCookie {
      instanceType: EditResponseCookieInstanceType;

      /**
       * Filter for cookies that will be modified. All empty entries are ignored.
       */
      filter: declarativeWebRequest.FilterResponseCookie;

      /**
       * Attributes that shall be overridden in cookies that machted the filter.
       * Attributes that are set to an empty string are removed.
       */
      modification: declarativeWebRequest.ResponseCookie;
    }

    /**
     * Removes one or more cookies of request. Note that it is preferred to use the
     * Cookies API because this is computationally less expensive.
     */
    export interface RemoveRequestCookie {
      instanceType: RemoveRequestCookieInstanceType;

      /**
       * Filter for cookies that will be removed. All empty entries are ignored.
       */
      filter: declarativeWebRequest.RequestCookie;
    }

    /**
     * Removes one or more cookies of response. Note that it is preferred to use the
     * Cookies API because this is computationally less expensive.
     */
    export interface RemoveResponseCookie {
      instanceType: RemoveResponseCookieInstanceType;

      /**
       * Filter for cookies that will be removed. All empty entries are ignored.
       */
      filter: declarativeWebRequest.FilterResponseCookie;
    }

    /**
     */
    export const onRequest: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when a message is sent via {@link
     * declarativeWebRequest.SendMessageToExtension} from an action of the
     * declarative web request API.
     */
    export const onMessage: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The message sent by the calling script.
           */
          message: string,

          /**
           * The stage of the network request during which the event was triggered.
           */
          stage: Stage,

          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: webRequest.ResourceType,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Desktop Capture API that can be used to capture content of screen, individual
   * windows or tabs.
   * @chrome-permission desktopCapture
 */
  export namespace desktopCapture {
    /**
     * Enum used to define set of desktop media sources used in
     * chooseDesktopMedia().
     */
    export type DesktopCaptureSourceType = "screen" | "window" | "tab" | "audio";

    /**
     * Shows desktop media picker UI with the specified set of sources.
     * @param sources Set of sources that should be shown to the user. The sources order in the set decides the tab order in the picker.
     * @param targetTab Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches <code>tab.url</code>. The tab's origin must be a secure origin, e.g. HTTPS.
     * @param callback
     * @param callback.streamId An opaque string that can be passed to <code>getUserMedia()</code> API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty <code>streamId</code>. The created <code>streamId</code> can be used only once and expires after a few seconds when it is not used.
     * @param callback.options Contains properties that describe the stream.
     * @returns An id that can be passed to cancelChooseDesktopMedia() in case the prompt need to be canceled.
     */
    export function chooseDesktopMedia(
      sources: DesktopCaptureSourceType[],
      targetTab: tabs.Tab,
      callback: (
        streamId: string,
        options: {
          /**
           * True if "audio" is included in parameter sources, and the end user does not
           * uncheck the "Share audio" checkbox. Otherwise false, and in this case, one
           * should not ask for audio stream through getUserMedia call.
           */
          canRequestAudioTrack: boolean,
        },
      ) => void,
    ): number;

    /**
     * Shows desktop media picker UI with the specified set of sources.
     * @param sources Set of sources that should be shown to the user. The sources order in the set decides the tab order in the picker.
     * @param callback
     * @param callback.streamId An opaque string that can be passed to <code>getUserMedia()</code> API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty <code>streamId</code>. The created <code>streamId</code> can be used only once and expires after a few seconds when it is not used.
     * @param callback.options Contains properties that describe the stream.
     * @returns An id that can be passed to cancelChooseDesktopMedia() in case the prompt need to be canceled.
     */
    export function chooseDesktopMedia(
      sources: DesktopCaptureSourceType[],
      callback: (
        streamId: string,
        options: {
          /**
           * True if "audio" is included in parameter sources, and the end user does not
           * uncheck the "Share audio" checkbox. Otherwise false, and in this case, one
           * should not ask for audio stream through getUserMedia call.
           */
          canRequestAudioTrack: boolean,
        },
      ) => void,
    ): number;

    /**
     * Hides desktop media picker dialog shown by chooseDesktopMedia().
     * @param desktopMediaRequestId Id returned by chooseDesktopMedia()
     */
    export function cancelChooseDesktopMedia(
      desktopMediaRequestId: number,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.devtools.inspectedWindow</code> API to interact with the
   * inspected window: obtain the tab ID for the inspected page, evaluate the code
   * in the context of the inspected window, reload the page, or obtain the list
   * of resources within the page.
   */
  export namespace devtools.inspectedWindow {
    /**
     * A resource within the inspected page, such as a document, a script, or an
     * image.
     */
    export interface Resource {
      /**
       * The URL of the resource.
       */
      url: string;

      /**
       * Gets the content of the resource.
       * @param callback A function that receives resource content when the request completes.
       * @param callback.content Content of the resource (potentially encoded).
       * @param callback.encoding Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported.
       */
      getContent(
        callback: (
          content: string,
          encoding: string,
        ) => void,
      ): void;

      /**
       * Sets the content of the resource.
       * @param content New content of the resource. Only resources with the text type are currently supported.
       * @param commit True if the user has finished editing the resource, and the new content of the resource should be persisted; false if this is a minor change sent in progress of the user editing the resource.
       * @param callback A function called upon request completion.
       * @param callback.error Set to undefined if the resource content was set successfully; describes error otherwise.
       */
      setContent(
        content: string,
        commit: boolean,
        callback?: (
          error?: {[name: string]: any},
        ) => void,
      ): void;
    }

    /**
     * The ID of the tab being inspected. This ID may be used with chrome.tabs.*
     * API.
     */
    export const tabId: number;

    /**
     * Evaluates a JavaScript expression in the context of the main frame of the
     * inspected page. The expression must evaluate to a JSON-compliant object,
     * otherwise an exception is thrown. The eval function can report either a
     * DevTools-side error or a JavaScript exception that occurs during evaluation.
     * In either case, the <code>result</code> parameter of the callback is
     * <code>undefined</code>. In the case of a DevTools-side error, the
     * <code>isException</code> parameter is non-null and has <code>isError</code>
     * set to true and <code>code</code> set to an error code. In the case of a
     * JavaScript error, <code>isException</code> is set to true and
     * <code>value</code> is set to the string value of thrown object.
     * @param expression An expression to evaluate.
     * @param options The options parameter can contain one or more options.
     * @param callback A function called when evaluation completes.
     * @param callback.result The result of evaluation.
     * @param callback.exceptionInfo An object providing details if an exception occurred while evaluating the expression.
     */
    export function eval(
      expression: string,
      options?: {
        /**
         * If specified, the expression is evaluated on the iframe whose URL matches the
         * one specified. By default, the expression is evaluated in the top frame of
         * the inspected page.
         */
        frameURL?: string,

        /**
         * Evaluate the expression in the context of the content script of the calling
         * extension, provided that the content script is already injected into the
         * inspected page. If not, the expression is not evaluated and the callback is
         * invoked with the exception parameter set to an object that has the
         * <code>isError</code> field set to true and the <code>code</code> field set to
         * <code>E_NOTFOUND</code>.
         */
        useContentScriptContext?: boolean,

        /**
         * Evaluate the expression in the context of a content script of an extension
         * that matches the specified origin. If given, contextSecurityOrigin overrides
         * the 'true' setting on userContentScriptContext.
         */
        contextSecurityOrigin?: string,
      },
      callback?: (
        result: {[name: string]: any},
        exceptionInfo: {
          /**
           * Set if the error occurred on the DevTools side before the expression is
           * evaluated.
           */
          isError: boolean,

          /**
           * Set if the error occurred on the DevTools side before the expression is
           * evaluated.
           */
          code: string,

          /**
           * Set if the error occurred on the DevTools side before the expression is
           * evaluated.
           */
          description: string,

          /**
           * Set if the error occurred on the DevTools side before the expression is
           * evaluated, contains the array of the values that may be substituted into the
           * description string to provide more information about the cause of the error.
           */
          details: any[],

          /**
           * Set if the evaluated code produces an unhandled exception.
           */
          isException: boolean,

          /**
           * Set if the evaluated code produces an unhandled exception.
           */
          value: string,
        },
      ) => void,
    ): void;

    /**
     * Reloads the inspected page.
     * @param reloadOptions
     */
    export function reload(
      reloadOptions?: {
        /**
         * When true, the loader will bypass the cache for all inspected page resources
         * loaded before the <code>load</code> event is fired. The effect is similar to
         * pressing Ctrl+Shift+R in the inspected window or within the Developer Tools
         * window.
         */
        ignoreCache?: boolean,

        /**
         * If specified, the string will override the value of the
         * <code>User-Agent</code> HTTP header that's sent while loading the resources
         * of the inspected page. The string will also override the value of the
         * <code>navigator.userAgent</code> property that's returned to any scripts that
         * are running within the inspected page.
         */
        userAgent?: string,

        /**
         * If specified, the script will be injected into every frame of the inspected
         * page immediately upon load, before any of the frame's scripts. The script
         * will not be injected after subsequent reloads&mdash;for example, if the user
         * presses Ctrl+R.
         */
        injectedScript?: string,
      },
    ): void;

    /**
     * Retrieves the list of resources from the inspected page.
     * @param callback A function that receives the list of resources when the request completes.
     * @param callback.resources The resources within the page.
     */
    export function getResources(
      callback: (
        resources: Resource[],
      ) => void,
    ): void;

    /**
     * Fired when a new resource is added to the inspected page.
     */
    export const onResourceAdded: chrome.events.Event<
      /**
       * @param resource
       */
      (
        resource: Resource,
      ) => void
    >;

    /**
     * Fired when a new revision of the resource is committed (e.g. user saves
     * an edited version of the resource in the Developer Tools).
     */
    export const onResourceContentCommitted: chrome.events.Event<
      /**
       * @param resource
       * @param content New content of the resource.
       */
      (
        resource: Resource,
        content: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.devtools.network</code> API to retrieve the information
   * about network requests displayed by the Developer Tools in the Network panel.
   */
  export namespace devtools.network {
    /**
     * Represents a network request for a document resource (script, image and so
     * on). See HAR Specification for reference.
     */
    export interface Request {
      /**
       * Returns content of the response body.
       * @param callback A function that receives the response body when the request completes.
       * @param callback.content Content of the response body (potentially encoded).
       * @param callback.encoding Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported.
       */
      getContent(
        callback: (
          content: string,
          encoding: string,
        ) => void,
      ): void;
    }

    /**
     * Returns HAR log that contains all known network requests.
     * @param callback A function that receives the HAR log when the request completes.
     * @param callback.harLog A HAR log. See HAR specification for details.
     */
    export function getHAR(
      callback: (
        harLog: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * Fired when a network request is finished and all request data are
     * available.
     */
    export const onRequestFinished: chrome.events.Event<
      /**
       * @param request Description of a network request in the form of a HAR entry. See HAR specification for details.
       */
      (
        request: Request,
      ) => void
    >;

    /**
     * Fired when the inspected window navigates to a new page.
     */
    export const onNavigated: chrome.events.Event<
      /**
       * @param url URL of the new page.
       */
      (
        url: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.devtools.panels</code> API to integrate your extension
   * into Developer Tools window UI: create your own panels, access existing
   * panels, and add sidebars.
   */
  export namespace devtools.panels {
    /**
     * Represents the Elements panel.
     */
    export interface ElementsPanel {
      /**
       * Creates a pane within panel's sidebar.
       * @param title Text that is displayed in sidebar caption.
       * @param callback A callback invoked when the sidebar is created.
       * @param callback.result An ExtensionSidebarPane object for created sidebar pane.
       */
      createSidebarPane(
        title: string,
        callback?: (
          result: ExtensionSidebarPane,
        ) => void,
      ): void;

      /**
       * Fired when an object is selected in the panel.
       */
      onSelectionChanged: chrome.events.Event<
        () => void
      >;
    }

    /**
     * Represents the Sources panel.
     */
    export interface SourcesPanel {
      /**
       * Creates a pane within panel's sidebar.
       * @param title Text that is displayed in sidebar caption.
       * @param callback A callback invoked when the sidebar is created.
       * @param callback.result An ExtensionSidebarPane object for created sidebar pane.
       */
      createSidebarPane(
        title: string,
        callback?: (
          result: ExtensionSidebarPane,
        ) => void,
      ): void;

      /**
       * Fired when an object is selected in the panel.
       */
      onSelectionChanged: chrome.events.Event<
        () => void
      >;
    }

    /**
     * Represents a panel created by extension.
     */
    export interface ExtensionPanel {
      /**
       * Appends a button to the status bar of the panel.
       * @param iconPath Path to the icon of the button. The file should contain a 64x24-pixel image composed of two 32x24 icons. The left icon is used when the button is inactive; the right icon is displayed when the button is pressed.
       * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
       * @param disabled Whether the button is disabled.
       */
      createStatusBarButton(
        iconPath: string,
        tooltipText: string,
        disabled: boolean,
      ): Button;

      /**
       * Fired upon a search action (start of a new search, search result
       * navigation, or search being canceled).
       */
      onSearch: chrome.events.Event<
        /**
         * @param action Type of search action being performed.
         * @param queryString Query string (only for 'performSearch').
         */
        (
          action: string,
          queryString?: string,
        ) => void
      >;

      /**
       * Fired when the user switches to the panel.
       */
      onShown: chrome.events.Event<
        /**
         * @param window The JavaScript <code>window</code> object of panel's page.
         */
        (
          window: global,
        ) => void
      >;

      /**
       * Fired when the user switches away from the panel.
       */
      onHidden: chrome.events.Event<
        () => void
      >;
    }

    /**
     * A sidebar created by the extension.
     */
    export interface ExtensionSidebarPane {
      /**
       * Sets the height of the sidebar.
       * @param height A CSS-like size specification, such as <code>'100px'</code> or <code>'12ex'</code>.
       */
      setHeight(
        height: string,
      ): void;

      /**
       * Sets an expression that is evaluated within the inspected page. The result is
       * displayed in the sidebar pane.
       * @param expression An expression to be evaluated in context of the inspected page. JavaScript objects and DOM nodes are displayed in an expandable tree similar to the console/watch.
       * @param rootTitle An optional title for the root of the expression tree.
       * @param callback A callback invoked after the sidebar pane is updated with the expression evaluation results.
       */
      setExpression(
        expression: string,
        rootTitle?: string,
        callback?: () => void,
      ): void;

      /**
       * Sets a JSON-compliant object to be displayed in the sidebar pane.
       * @param jsonObject An object to be displayed in context of the inspected page. Evaluated in the context of the caller (API client).
       * @param rootTitle An optional title for the root of the expression tree.
       * @param callback A callback invoked after the sidebar is updated with the object.
       */
      setObject(
        jsonObject: string,
        rootTitle?: string,
        callback?: () => void,
      ): void;

      /**
       * Sets an HTML page to be displayed in the sidebar pane.
       * @param path Relative path of an extension page to display within the sidebar.
       */
      setPage(
        path: string,
      ): void;

      /**
       * Fired when the sidebar pane becomes visible as a result of user
       * switching to the panel that hosts it.
       */
      onShown: chrome.events.Event<
        /**
         * @param window The JavaScript <code>window</code> object of the sidebar page, if one was set with the <code>setPage()</code> method.
         */
        (
          window: global,
        ) => void
      >;

      /**
       * Fired when the sidebar pane becomes hidden as a result of the user
       * switching away from the panel that hosts the sidebar pane.
       */
      onHidden: chrome.events.Event<
        () => void
      >;
    }

    /**
     * A button created by the extension.
     */
    export interface Button {
      /**
       * Updates the attributes of the button. If some of the arguments are omitted or
       * <code>null</code>, the corresponding attributes are not updated.
       * @param iconPath Path to the new icon of the button.
       * @param tooltipText Text shown as a tooltip when user hovers the mouse over the button.
       * @param disabled Whether the button is disabled.
       */
      update(
        iconPath?: string,
        tooltipText?: string,
        disabled?: boolean,
      ): void;

      /**
       * Fired when the button is clicked.
       */
      onClicked: chrome.events.Event<
        () => void
      >;
    }

    /**
     * Elements panel.
     */
    export const elements: ElementsPanel;

    /**
     * Sources panel.
     */
    export const sources: SourcesPanel;

    /**
     * The name of the color theme set in user's DevTools settings. Possible values:
     * <code>default</code> (the default) and <code>dark</code>.
     */
    export const themeName: string;

    /**
     * Creates an extension panel.
     * @param title Title that is displayed next to the extension icon in the Developer Tools toolbar.
     * @param iconPath Path of the panel's icon relative to the extension directory.
     * @param pagePath Path of the panel's HTML page relative to the extension directory.
     * @param callback A function that is called when the panel is created.
     * @param callback.panel An ExtensionPanel object representing the created panel.
     */
    export function create(
      title: string,
      iconPath: string,
      pagePath: string,
      callback?: (
        panel: ExtensionPanel,
      ) => void,
    ): void;

    /**
     * Specifies the function to be called when the user clicks a resource link in
     * the Developer Tools window. To unset the handler, either call the method with
     * no parameters or pass null as the parameter.
     * @param callback A function that is called when the user clicks on a valid resource link in Developer Tools window. Note that if the user clicks an invalid URL or an XHR, this function is not called.
     * @param callback.resource A {@link devtools.inspectedWindow.Resource} object for the resource that was clicked.
     */
    export function setOpenResourceHandler(
      callback?: (
        resource: devtools.inspectedWindow.Resource,
      ) => void,
    ): void;

    /**
     * Requests DevTools to open a URL in a Developer Tools panel.
     * @param url The URL of the resource to open.
     * @param lineNumber Specifies the line number to scroll to when the resource is loaded.
     * @param callback A function that is called when the resource has been successfully loaded.
     */
    export function openResource(
      url: string,
      lineNumber: number,
      callback?: () => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.displaySource</code> API creates a Display
 session using
   * WebMediaStreamTrack as sources.
   * @alpha
 * @chrome-permission displaySource
 */
  export namespace displaySource {
    export type ErrorType = "connection_error" | "capabilities_negotiation_error" | "media_pipeline_error" | "timeout_error" | "unknown_error";

    export interface ErrorInfo {
      type: ErrorType;

      description?: string;
    }

    export type SinkState = "Connected" | "Connecting" | "Disconnected";

    export interface SinkInfo {
      /**
       * Id of the sink. It is guaranteed to be unique during the browser session.
       */
      id: number;

      /**
       * Human readable name of the sink.
       */
      name: string;

      /**
       * State of the sink.
       */
      state: SinkState;
    }

    export type AuthenticationMethod = "PBC" | "PIN";

    export interface AuthenticationInfo {
      /**
       * Authentication method.
       */
      method: AuthenticationMethod;

      /**
       * Authentication data (e.g. PIN value).
       */
      data?: string;
    }

    export interface StartSessionInfo {
      /**
       * Id of the sink to connect.
       */
      sinkId: number;

      /**
       * Authentication information.
       */
      authenticationInfo?: AuthenticationInfo;

      /**
       * The source audio track.
       */
      audioTrack?: MediaStreamTrack;

      /**
       * The source audio track.
       */
      videoTrack?: MediaStreamTrack;
    }

    /**
     * Queries the list of the currently available Display sinks.
     * @param callback Called when the request is completed. The argument list is empty if no available sinks were found.
     * @param callback.result
     */
    export function getAvailableSinks(
      callback: (
        result: SinkInfo[],
      ) => void,
    ): void;

    /**
     * Queries authentication data from the sink device.
     * @param sinkId Id of the sink
     * @param callback Called when authentication info retrieved from the sink. The argument |method| field contains the authentication method required by the sink for connection; the |data| field can be null or can contain some supplementary data provided by the sink. If authentication info cannot be retrieved from the sink the "chrome.runtime.lastError" property is defined.
     * @param callback.result
     */
    export function requestAuthentication(
      sinkId: number,
      callback: (
        result: AuthenticationInfo,
      ) => void,
    ): void;

    /**
     * <p>Creates a Display session using the provided StartSessionInfo instance.
     * The input argument fields must be initialized as described below: The
     * |sinkId|  must be a valid id of a sink (obtained via
     * ‘getAvailableSinks’).</p><p>The |audioTrack| or |videoTrack| must be of
     * type MediaStreamTrack. Either |audioTrack| or |videoTrack| can be null but
     * not both. This means creating a session with only audio or video.</p><p>The
     * |authenticationInfo| can be null if no additional authentication data are
     * required by the sink; otherwise its |data| field must contain the required
     * authentication data (e.g. PIN value) and its |method| field must be the same
     * as one obtained from ‘requestAuthentication’.</p>
     * @param sessionInfo
     * @param callback Called when the session is started.
     */
    export function startSession(
      sessionInfo: StartSessionInfo,
      callback?: () => void,
    ): void;

    /**
     * Terminates the active Display session.
     * @param sinkId Id of the connected sink.
     * @param callback Called when the session is terminated.
     */
    export function terminateSession(
      sinkId: number,
      callback?: () => void,
    ): void;

    /**
     * Event fired when the available sinks are modified (either their amount or
     * properties) |sinks| the list of all currently available sinks
     */
    export const onSinksUpdated: chrome.events.Event<
      /**
       * @param sinks
       */
      (
        sinks: SinkInfo[],
      ) => void
    >;

    /**
     * Event fired when the Display session is terminated. |sinkId| Id of the
     * peer sink
     */
    export const onSessionTerminated: chrome.events.Event<
      /**
       * @param sinkId
       */
      (
        sinkId: number,
      ) => void
    >;

    /**
     * Event fired when an error occurs. |sinkId| Id of the peer sink
     * |errorInfo| error description
     */
    export const onSessionErrorOccured: chrome.events.Event<
      /**
       * @param sinkId
       * @param errorInfo
       */
      (
        sinkId: number,
        errorInfo: ErrorInfo,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.dns</code> API for dns resolution.
   * @alpha
 * @chrome-permission dns
 */
  export namespace dns {
    export interface ResolveCallbackResolveInfo {
      /**
       * The result code. Zero indicates success.
       */
      resultCode: number;

      /**
       * A string representing the IP address literal. Supplied only if resultCode
       * indicates success. Note that we presently return only IPv4 addresses.
       */
      address?: string;
    }

    /**
     * Resolves the given hostname or IP address literal.
     * @param hostname The hostname to resolve.
     * @param callback Called when the resolution operation completes.
     * @param callback.resolveInfo
     */
    export function resolve(
      hostname: string,
      callback: (
        resolveInfo: ResolveCallbackResolveInfo,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.documentScan</code> API to discover and retrieve
 images
   * from attached paper document scanners.
   * @chrome-platform chromeos
 * @chrome-permission documentScan
 */
  export namespace documentScan {
    export interface ScanOptions {
      /**
       * The MIME types that are accepted by the caller.
       */
      mimeTypes?: string[];

      /**
       * The number of scanned images allowed (defaults to 1).
       */
      maxImages?: number;
    }

    export interface ScanResults {
      /**
       * The data image URLs in a form that can be passed as the "src" value to an
       * image tag.
       */
      dataUrls: string[];

      /**
       * The MIME type of <code>dataUrls</code>.
       */
      mimeType: string;
    }

    /**
     * Performs a document scan.  On success, the PNG data will be sent to the
     * callback.
     * @param options Object containing scan parameters.
     * @param callback Called with the result and data from the scan.
     * @param callback.result
     */
    export function scan(
      options: ScanOptions,
      callback: (
        result: ScanResults,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.downloads</code> API to programmatically initiate,
   * monitor, manipulate, and search for downloads.
   * @chrome-permission downloads
 */
  export namespace downloads {
    export interface HeaderNameValuePair {
      /**
       * Name of the HTTP header.
       */
      name: string;

      /**
       * Value of the HTTP header.
       */
      value: string;
    }

    /**
     * <dl><dt>uniquify</dt>     <dd>To avoid duplication, the <code>filename</code>
     * is changed to     include a counter before the filename extension.</dd>
     * <dt>overwrite</dt>     <dd>The existing file will be overwritten with the new
     * file.</dd>     <dt>prompt</dt>     <dd>The user will be prompted with a file
     * chooser dialog.</dd> </dl>
     */
    export type FilenameConflictAction = "uniquify" | "overwrite" | "prompt";

    export interface FilenameSuggestion {
      /**
       * The {@link DownloadItem}'s new target {@link DownloadItem.filename}, as a
       * path relative to the user's default Downloads directory, possibly containing
       * subdirectories. Absolute paths, empty paths, and paths containing
       * back-references ".." will be ignored.
       */
      filename: string;

      /**
       * The action to take if <code>filename</code> already exists.
       */
      conflictAction?: FilenameConflictAction;
    }

    export type HttpMethod = "GET" | "POST";

    export type InterruptReason = "FILE_FAILED" | "FILE_ACCESS_DENIED" | "FILE_NO_SPACE" | "FILE_NAME_TOO_LONG" | "FILE_TOO_LARGE" | "FILE_VIRUS_INFECTED" | "FILE_TRANSIENT_ERROR" | "FILE_BLOCKED" | "FILE_SECURITY_CHECK_FAILED" | "FILE_TOO_SHORT" | "FILE_HASH_MISMATCH" | "FILE_SAME_AS_SOURCE" | "NETWORK_FAILED" | "NETWORK_TIMEOUT" | "NETWORK_DISCONNECTED" | "NETWORK_SERVER_DOWN" | "NETWORK_INVALID_REQUEST" | "SERVER_FAILED" | "SERVER_NO_RANGE" | "SERVER_BAD_CONTENT" | "SERVER_UNAUTHORIZED" | "SERVER_CERT_PROBLEM" | "SERVER_FORBIDDEN" | "SERVER_UNREACHABLE" | "SERVER_CONTENT_LENGTH_MISMATCH" | "SERVER_CROSS_ORIGIN_REDIRECT" | "USER_CANCELED" | "USER_SHUTDOWN" | "CRASH";

    export interface DownloadOptions {
      /**
       * The URL to download.
       */
      url: string;

      /**
       * A file path relative to the Downloads directory to contain the downloaded
       * file, possibly containing subdirectories. Absolute paths, empty paths, and
       * paths containing back-references ".." will cause an error. {@link
       * onDeterminingFilename} allows suggesting a filename after the file's MIME
       * type and a tentative filename have been determined.
       */
      filename?: string;

      /**
       * The action to take if <code>filename</code> already exists.
       */
      conflictAction?: FilenameConflictAction;

      /**
       * Use a file-chooser to allow the user to select a filename regardless of
       * whether <code>filename</code> is set or already exists.
       */
      saveAs?: boolean;

      /**
       * The HTTP method to use if the URL uses the HTTP[S] protocol.
       */
      method?: HttpMethod;

      /**
       * Extra HTTP headers to send with the request if the URL uses the HTTP[s]
       * protocol. Each header is represented as a dictionary containing the keys
       * <code>name</code> and either <code>value</code> or <code>binaryValue</code>,
       * restricted to those allowed by XMLHttpRequest.
       */
      headers?: HeaderNameValuePair[];

      /**
       * Post body.
       */
      body?: string;
    }

    /**
     * <dl><dt>file</dt>     <dd>The download's filename is suspicious.</dd>
     * <dt>url</dt>     <dd>The download's URL is known to be malicious.</dd>
     * <dt>content</dt>     <dd>The downloaded file is known to be malicious.</dd>
     * <dt>uncommon</dt>     <dd>The download's URL is not commonly downloaded and
     * could be     dangerous.</dd>     <dt>host</dt>     <dd>The download came from
     * a host known to distribute malicious     binaries and is likely
     * dangerous.</dd>     <dt>unwanted</dt>     <dd>The download is potentially
     * unwanted or unsafe. E.g. it could make     changes to browser or computer
     * settings.</dd>     <dt>safe</dt>     <dd>The download presents no known
     * danger to the user's computer.</dd>     <dt>accepted</dt>     <dd>The user
     * has accepted the dangerous download.</dd> </dl>
     */
    export type DangerType = "file" | "url" | "content" | "uncommon" | "host" | "unwanted" | "safe" | "accepted";

    /**
     * <dl><dt>in_progress</dt>     <dd>The download is currently receiving data
     * from the server.</dd>     <dt>interrupted</dt>     <dd>An error broke the
     * connection with the file host.</dd>     <dt>complete</dt>     <dd>The
     * download completed successfully.</dd> </dl>
     */
    export type State = "in_progress" | "interrupted" | "complete";

    export interface DownloadItem {
      /**
       * An identifier that is persistent across browser sessions.
       */
      id: number;

      /**
       * The absolute URL that this download initiated from, before any redirects.
       */
      url: string;

      /**
       * The absolute URL that this download is being made from, after all redirects.
       */
      finalUrl: string;

      /**
       * Absolute URL.
       */
      referrer: string;

      /**
       * Absolute local path.
       */
      filename: string;

      /**
       * False if this download is recorded in the history, true if it is not
       * recorded.
       */
      incognito: boolean;

      /**
       * Indication of whether this download is thought to be safe or known to be
       * suspicious.
       */
      danger: DangerType;

      /**
       * The file's MIME type.
       */
      mime: string;

      /**
       * The time when the download began in ISO 8601 format. May be passed directly
       * to the Date constructor: <code>chrome.downloads.search({},
       * function(items){items.forEach(function(item){console.log(new
       * Date(item.startTime))})})</code>
       */
      startTime: string;

      /**
       * The time when the download ended in ISO 8601 format. May be passed directly
       * to the Date constructor: <code>chrome.downloads.search({},
       * function(items){items.forEach(function(item){if (item.endTime)
       * console.log(new Date(item.endTime))})})</code>
       */
      endTime?: string;

      /**
       * Estimated time when the download will complete in ISO 8601 format. May be
       * passed directly to the Date constructor: <code>chrome.downloads.search({},
       * function(items){items.forEach(function(item){if (item.estimatedEndTime)
       * console.log(new Date(item.estimatedEndTime))})})</code>
       */
      estimatedEndTime?: string;

      /**
       * Indicates whether the download is progressing, interrupted, or complete.
       */
      state: State;

      /**
       * True if the download has stopped reading data from the host, but kept the
       * connection open.
       */
      paused: boolean;

      /**
       * True if the download is in progress and paused, or else if it is interrupted
       * and can be resumed starting from where it was interrupted.
       */
      canResume: boolean;

      /**
       * Why the download was interrupted. Several kinds of HTTP errors may be grouped
       * under one of the errors beginning with <code>SERVER_</code>. Errors relating
       * to the network begin with <code>NETWORK_</code>, errors relating to the
       * process of writing the file to the file system begin with <code>FILE_</code>,
       * and interruptions initiated by the user begin with <code>USER_</code>.
       */
      error?: InterruptReason;

      /**
       * Number of bytes received so far from the host, without considering file
       * compression.
       */
      bytesReceived: number;

      /**
       * Number of bytes in the whole file, without considering file compression, or
       * -1 if unknown.
       */
      totalBytes: number;

      /**
       * Number of bytes in the whole file post-decompression, or -1 if unknown.
       */
      fileSize: number;

      /**
       * Whether the downloaded file still exists. This information may be out of date
       * because Chrome does not automatically watch for file removal. Call {@link
       * search}() in order to trigger the check for file existence. When the
       * existence check completes, if the file has been deleted, then an {@link
       * onChanged} event will fire. Note that {@link search}() does not wait for the
       * existence check to finish before returning, so results from {@link search}()
       * may not accurately reflect the file system. Also, {@link search}() may be
       * called as often as necessary, but will not check for file existence any more
       * frequently than once every 10 seconds.
       */
      exists: boolean;

      /**
       * The identifier for the extension that initiated this download if this
       * download was initiated by an extension. Does not change once it is set.
       */
      byExtensionId?: string;

      /**
       * The localized name of the extension that initiated this download if this
       * download was initiated by an extension. May change if the extension changes
       * its name or if the user changes their locale.
       */
      byExtensionName?: string;
    }

    export interface DownloadQuery {
      /**
       * This array of search terms limits results to {@link DownloadItem} whose
       * <code>filename</code> or <code>url</code> or <code>finalUrl</code> contain
       * all of the search terms that do not begin with a dash '-' and none of the
       * search terms that do begin with a dash.
       */
      query?: string[];

      /**
       * Limits results to {@link DownloadItem} that started before the given ms since
       * the epoch.
       */
      startedBefore?: string;

      /**
       * Limits results to {@link DownloadItem} that started after the given ms since
       * the epoch.
       */
      startedAfter?: string;

      /**
       * Limits results to {@link DownloadItem} that ended before the given ms since
       * the epoch.
       */
      endedBefore?: string;

      /**
       * Limits results to {@link DownloadItem} that ended after the given ms since
       * the epoch.
       */
      endedAfter?: string;

      /**
       * Limits results to {@link DownloadItem} whose <code>totalBytes</code> is
       * greater than the given integer.
       */
      totalBytesGreater?: number;

      /**
       * Limits results to {@link DownloadItem} whose <code>totalBytes</code> is less
       * than the given integer.
       */
      totalBytesLess?: number;

      /**
       * Limits results to {@link DownloadItem} whose <code>filename</code> matches
       * the given regular expression.
       */
      filenameRegex?: string;

      /**
       * Limits results to {@link DownloadItem} whose <code>url</code> matches the
       * given regular expression.
       */
      urlRegex?: string;

      /**
       * Limits results to {@link DownloadItem} whose <code>finalUrl</code> matches
       * the given regular expression.
       */
      finalUrlRegex?: string;

      /**
       * The maximum number of matching {@link DownloadItem} returned. Defaults to
       * 1000. Set to 0 in order to return all matching {@link DownloadItem}. See
       * {@link search} for how to page through results.
       */
      limit?: number;

      /**
       * Set elements of this array to {@link DownloadItem} properties in order to
       * sort search results. For example, setting <code>orderBy=['startTime']</code>
       * sorts the {@link DownloadItem} by their start time in ascending order. To
       * specify descending order, prefix with a hyphen: '-startTime'.
       */
      orderBy?: string[];

      /**
       * The <code>id</code> of the {@link DownloadItem} to query.
       */
      id?: number;

      /**
       * The absolute URL that this download initiated from, before any redirects.
       */
      url?: string;

      /**
       * The absolute URL that this download is being made from, after all redirects.
       */
      finalUrl?: string;

      /**
       * Absolute local path.
       */
      filename?: string;

      /**
       * Indication of whether this download is thought to be safe or known to be
       * suspicious.
       */
      danger?: DangerType;

      /**
       * The file's MIME type.
       */
      mime?: string;

      /**
       * The time when the download began in ISO 8601 format.
       */
      startTime?: string;

      /**
       * The time when the download ended in ISO 8601 format.
       */
      endTime?: string;

      /**
       * Indicates whether the download is progressing, interrupted, or complete.
       */
      state?: State;

      /**
       * True if the download has stopped reading data from the host, but kept the
       * connection open.
       */
      paused?: boolean;

      /**
       * Why a download was interrupted.
       */
      error?: InterruptReason;

      /**
       * Number of bytes received so far from the host, without considering file
       * compression.
       */
      bytesReceived?: number;

      /**
       * Number of bytes in the whole file, without considering file compression, or
       * -1 if unknown.
       */
      totalBytes?: number;

      /**
       * Number of bytes in the whole file post-decompression, or -1 if unknown.
       */
      fileSize?: number;

      /**
       * Whether the downloaded file exists;
       */
      exists?: boolean;
    }

    export interface StringDelta {
      previous?: string;

      current?: string;
    }

    export interface DoubleDelta {
      previous?: number;

      current?: number;
    }

    export interface BooleanDelta {
      previous?: boolean;

      current?: boolean;
    }

    export interface DownloadDelta {
      /**
       * The <code>id</code> of the {@link DownloadItem} that changed.
       */
      id: number;

      /**
       * The change in <code>url</code>, if any.
       */
      url?: StringDelta;

      /**
       * The change in <code>finalUrl</code>, if any.
       */
      finalUrl?: StringDelta;

      /**
       * The change in <code>filename</code>, if any.
       */
      filename?: StringDelta;

      /**
       * The change in <code>danger</code>, if any.
       */
      danger?: StringDelta;

      /**
       * The change in <code>mime</code>, if any.
       */
      mime?: StringDelta;

      /**
       * The change in <code>startTime</code>, if any.
       */
      startTime?: StringDelta;

      /**
       * The change in <code>endTime</code>, if any.
       */
      endTime?: StringDelta;

      /**
       * The change in <code>state</code>, if any.
       */
      state?: StringDelta;

      /**
       * The change in <code>canResume</code>, if any.
       */
      canResume?: BooleanDelta;

      /**
       * The change in <code>paused</code>, if any.
       */
      paused?: BooleanDelta;

      /**
       * The change in <code>error</code>, if any.
       */
      error?: StringDelta;

      /**
       * The change in <code>totalBytes</code>, if any.
       */
      totalBytes?: DoubleDelta;

      /**
       * The change in <code>fileSize</code>, if any.
       */
      fileSize?: DoubleDelta;

      /**
       * The change in <code>exists</code>, if any.
       */
      exists?: BooleanDelta;
    }

    export interface GetFileIconOptions {
      /**
       * The size of the returned icon. The icon will be square with dimensions size *
       * size pixels. The default and largest size for the icon is 32x32 pixels. The
       * only supported sizes are 16 and 32. It is an error to specify any other size.
       */
      size?: number;
    }

    /**
     * Download a URL. If the URL uses the HTTP[S] protocol, then the request will
     * include all cookies currently set for its hostname. If both
     * <code>filename</code> and <code>saveAs</code> are specified, then the Save As
     * dialog will be displayed, pre-populated with the specified
     * <code>filename</code>. If the download started successfully,
     * <code>callback</code> will be called with the new {@link DownloadItem}'s
     * <code>downloadId</code>. If there was an error starting the download, then
     * <code>callback</code> will be called with <code>downloadId=undefined</code>
     * and {@link runtime.lastError} will contain a descriptive string. The error
     * strings are not guaranteed to remain backwards compatible between releases.
     * Extensions must not parse it.
     * @param options What to download and how.
     * @param callback Called with the id of the new {@link DownloadItem}.
     * @param callback.downloadId
     */
    export function download(
      options: DownloadOptions,
      callback?: (
        downloadId: number,
      ) => void,
    ): void;

    /**
     * Find {@link DownloadItem}. Set <code>query</code> to the empty object to get
     * all {@link DownloadItem}. To get a specific {@link DownloadItem}, set only
     * the <code>id</code> field. To page through a large number of items, set
     * <code>orderBy: ['-startTime']</code>, set <code>limit</code> to the number of
     * items per page, and set <code>startedAfter</code> to the
     * <code>startTime</code> of the last item from the last page.
     * @param query
     * @param callback
     * @param callback.results
     */
    export function search(
      query: DownloadQuery,
      callback: (
        results: DownloadItem[],
      ) => void,
    ): void;

    /**
     * Pause the download. If the request was successful the download is in a paused
     * state. Otherwise {@link runtime.lastError} contains an error message. The
     * request will fail if the download is not active.
     * @param downloadId The id of the download to pause.
     * @param callback Called when the pause request is completed.
     */
    export function pause(
      downloadId: number,
      callback?: () => void,
    ): void;

    /**
     * Resume a paused download. If the request was successful the download is in
     * progress and unpaused. Otherwise {@link runtime.lastError} contains an error
     * message. The request will fail if the download is not active.
     * @param downloadId The id of the download to resume.
     * @param callback Called when the resume request is completed.
     */
    export function resume(
      downloadId: number,
      callback?: () => void,
    ): void;

    /**
     * Cancel a download. When <code>callback</code> is run, the download is
     * cancelled, completed, interrupted or doesn't exist anymore.
     * @param downloadId The id of the download to cancel.
     * @param callback Called when the cancel request is completed.
     */
    export function cancel(
      downloadId: number,
      callback?: () => void,
    ): void;

    /**
     * Retrieve an icon for the specified download. For new downloads, file icons
     * are available after the {@link onCreated} event has been received. The image
     * returned by this function while a download is in progress may be different
     * from the image returned after the download is complete. Icon retrieval is
     * done by querying the underlying operating system or toolkit depending on the
     * platform. The icon that is returned will therefore depend on a number of
     * factors including state of the download, platform, registered file types and
     * visual theme. If a file icon cannot be determined, {@link runtime.lastError}
     * will contain an error message.
     * @param downloadId The identifier for the download.
     * @param options
     * @param callback A URL to an image that represents the download.
     * @param callback.iconURL
     */
    export function getFileIcon(
      downloadId: number,
      options: GetFileIconOptions,
      callback: (
        iconURL?: string,
      ) => void,
    ): void;

    /**
     * Retrieve an icon for the specified download. For new downloads, file icons
     * are available after the {@link onCreated} event has been received. The image
     * returned by this function while a download is in progress may be different
     * from the image returned after the download is complete. Icon retrieval is
     * done by querying the underlying operating system or toolkit depending on the
     * platform. The icon that is returned will therefore depend on a number of
     * factors including state of the download, platform, registered file types and
     * visual theme. If a file icon cannot be determined, {@link runtime.lastError}
     * will contain an error message.
     * @param downloadId The identifier for the download.
     * @param callback A URL to an image that represents the download.
     * @param callback.iconURL
     */
    export function getFileIcon(
      downloadId: number,
      callback: (
        iconURL?: string,
      ) => void,
    ): void;

    /**
     * Open the downloaded file now if the {@link DownloadItem} is complete;
     * otherwise returns an error through {@link runtime.lastError}. Requires the
     * <code>"downloads.open"</code> permission in addition to the
     * <code>"downloads"</code> permission. An {@link onChanged} event will fire
     * when the item is opened for the first time.
     * @param downloadId The identifier for the downloaded file.
     */
    export function open(
      downloadId: number,
    ): void;

    /**
     * Show the downloaded file in its folder in a file manager.
     * @param downloadId The identifier for the downloaded file.
     */
    export function show(
      downloadId: number,
    ): void;

    /**
     * Show the default Downloads folder in a file manager.
     */
    export function showDefaultFolder(): void;

    /**
     * Erase matching {@link DownloadItem} from history without deleting the
     * downloaded file. An {@link onErased} event will fire for each {@link
     * DownloadItem} that matches <code>query</code>, then <code>callback</code>
     * will be called.
     * @param query
     * @param callback
     * @param callback.erasedIds
     */
    export function erase(
      query: DownloadQuery,
      callback?: (
        erasedIds: number[],
      ) => void,
    ): void;

    /**
     * Remove the downloaded file if it exists and the {@link DownloadItem} is
     * complete; otherwise return an error through {@link runtime.lastError}.
     * @param downloadId
     * @param callback
     */
    export function removeFile(
      downloadId: number,
      callback?: () => void,
    ): void;

    /**
     * Prompt the user to accept a dangerous download. Can only be called from a
     * visible context (tab, window, or page/browser action popup). Does not
     * automatically accept dangerous downloads. If the download is accepted, then
     * an {@link onChanged} event will fire, otherwise nothing will happen. When all
     * the data is fetched into a temporary file and either the download is not
     * dangerous or the danger has been accepted, then the temporary file is renamed
     * to the target filename, the |state| changes to 'complete', and {@link
     * onChanged} fires.
     * @param downloadId The identifier for the {@link DownloadItem}.
     * @param callback Called when the danger prompt dialog closes.
     */
    export function acceptDanger(
      downloadId: number,
      callback?: () => void,
    ): void;

    /**
     * Initiate dragging the downloaded file to another application. Call in a
     * javascript <code>ondragstart</code> handler.
     * @param downloadId
     */
    export function drag(
      downloadId: number,
    ): void;

    /**
     * Enable or disable the gray shelf at the bottom of every window associated
     * with the current browser profile. The shelf will be disabled as long as at
     * least one extension has disabled it. Enabling the shelf while at least one
     * other extension has disabled it will return an error through {@link
     * runtime.lastError}. Requires the <code>"downloads.shelf"</code> permission in
     * addition to the <code>"downloads"</code> permission.
     * @param enabled
     */
    export function setShelfEnabled(
      enabled: boolean,
    ): void;

    /**
     * This event fires with the {@link DownloadItem} object when a download
     * begins.
     */
    export const onCreated: chrome.events.Event<
      /**
       * @param downloadItem
       */
      (
        downloadItem: DownloadItem,
      ) => void
    >;

    /**
     * Fires with the <code>downloadId</code> when a download is erased from
     * history.
     */
    export const onErased: chrome.events.Event<
      /**
       * @param downloadId The <code>id</code> of the {@link DownloadItem} that was erased.
       */
      (
        downloadId: number,
      ) => void
    >;

    /**
     * When any of a {@link DownloadItem}'s properties except
     * <code>bytesReceived</code> and <code>estimatedEndTime</code> changes,
     * this event fires with the <code>downloadId</code> and an object
     * containing the properties that changed.
     */
    export const onChanged: chrome.events.Event<
      /**
       * @param downloadDelta
       */
      (
        downloadDelta: DownloadDelta,
      ) => void
    >;

    /**
     * During the filename determination process, extensions will be given the
     * opportunity to override the target {@link DownloadItem.filename}. Each
     * extension may not register more than one listener for this event. Each
     * listener must call <code>suggest</code> exactly once, either
     * synchronously or asynchronously. If the listener calls
     * <code>suggest</code> asynchronously, then it must return
     * <code>true</code>. If the listener neither calls <code>suggest</code>
     * synchronously nor returns <code>true</code>, then <code>suggest</code>
     * will be called automatically. The {@link DownloadItem} will not complete
     * until all listeners have called <code>suggest</code>. Listeners may call
     * <code>suggest</code> without any arguments in order to allow the download
     * to use <code>downloadItem.filename</code> for its filename, or pass a
     * <code>suggestion</code> object to <code>suggest</code> in order to
     * override the target filename. If more than one extension overrides the
     * filename, then the last extension installed whose listener passes a
     * <code>suggestion</code> object to <code>suggest</code> wins. In order to
     * avoid confusion regarding which extension will win, users should not
     * install extensions that may conflict. If the download is initiated by
     * {@link download} and the target filename is known before the MIME type
     * and tentative filename have been determined, pass <code>filename</code>
     * to {@link download} instead.
     */
    export const onDeterminingFilename: chrome.events.Event<
      /**
       * @param downloadItem
       */
      (
        downloadItem: DownloadItem,
        suggest: (
          suggestion?: FilenameSuggestion,
        ) => void,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.enterprise.deviceAttributes</code> API to read device
   * attributes.
 Note: This API is only available to extensions force-installed
   * by enterprise policy.
   * @chrome-platform chromeos
 * @chrome-permission enterprise.deviceAttributes
 */
  export namespace enterprise.deviceAttributes {
    /**
     * Fetches the value of <a
     * href="https://developers.google.com/admin-sdk/directory/v1/guides/manage-chrome-devices">the device identifier of the directory API</a>, that is generated by the server and identifies the cloud record of the device for querying in the cloud directory API. If the current user is not affiliated, returns an empty string.
     * @param callback Called with the device identifier of the directory API when received.
     * @param callback.deviceId
     */
    export function getDirectoryDeviceId(
      callback: (
        deviceId: string,
      ) => void,
    ): void;

    /**
     * Fetches the device's serial number. Please note the purpose of this API is to
     * administrate the device (e.g. generating Certificate Sign Requests for
     * device-wide certificates). This API may not be used for tracking devices
     * without the consent of the device's administrator. If the current user is not
     * affiliated, returns an empty string.
     * @param callback Called with the serial number of the device.
     * @param callback.serialNumber
     */
    export function getDeviceSerialNumber(
      callback: (
        serialNumber: string,
      ) => void,
    ): void;

    /**
     * Fetches the administrator-annotated Asset Id. If the current user is not
     * affiliated or no Asset Id has been set by the administrator, returns an empty
     * string.
     * @param callback Called with the Asset ID of the device.
     * @param callback.assetId
     */
    export function getDeviceAssetId(
      callback: (
        assetId: string,
      ) => void,
    ): void;

    /**
     * Fetches the administrator-annotated Location. If the current user is not
     * affiliated or no Annotated Location has been set by the administrator,
     * returns an empty string.
     * @param callback Called with the Annotated Location of the device.
     * @param callback.annotatedLocation
     */
    export function getDeviceAnnotatedLocation(
      callback: (
        annotatedLocation: string,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.enterprise.hardwarePlatform</code> API to get the
   * manufacturer and model of the hardware platform where the browser runs.
   * Note: This API is only available to extensions installed by enterprise
   * policy.
   * @chrome-permission enterprise.hardwarePlatform
 */
  export namespace enterprise.hardwarePlatform {
    export interface HardwarePlatformInfo {
      model: string;

      manufacturer: string;
    }

    /**
     * Obtains the manufacturer and model for the hardware platform and, if the
     * extension is authorized, returns it via |callback|.
     * @param callback Called with the hardware platform info.
     * @param callback.info
     */
    export function getHardwarePlatformInfo(
      callback: (
        info: HardwarePlatformInfo,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.enterprise.platformKeys</code> API to generate
   * hardware-backed keys and to install certificates for these keys. The
   * certificates will be managed by the platform and can be used for TLS
   * authentication, network access or by other extension through
 {@link
   * platformKeys chrome.platformKeys}.
   * @chrome-platform chromeos
 * @chrome-permission enterprise.platformKeys
 */
  export namespace enterprise.platformKeys {
    export interface Token {
      /**
       * Uniquely identifies this <code>Token</code>. <p>Static IDs are
       * <code>"user"</code> and <code>"system"</code>, referring to the platform's
       * user-specific and the system-wide hardware token, respectively. Any other
       * tokens (with other identifiers) might be returned by {@link
       * enterprise.platformKeys.getTokens}.</p>
       */
      id: string;

      /**
       * Implements the WebCrypto's <a
       * href="http://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface">SubtleCrypto</a> interface. The cryptographic operations, including key generation, are hardware-backed. <p>Only non-extractable RSASSA-PKCS1-V1_5 keys with <code>modulusLength</code> up to 2048 can be generated. Each key can be used for signing data at most once.</p> <p>Keys generated on a specific <code>Token</code> cannot be used with any other Tokens, nor can they be used with <code>window.crypto.subtle</code>. Equally, <code>Key</code> objects created with <code>window.crypto.subtle</code> cannot be used with this interface.</p>
       */
      subtleCrypto: SubtleCrypto;
    }

    /**
     * Returns the available Tokens. In a regular user's session the list will
     * always contain the user's token with <code>id</code> <code>"user"</code>. If
     * a system-wide TPM token is available, the returned list will also contain the
     * system-wide token with <code>id</code> <code>"system"</code>. The system-wide
     * token will be the same for all sessions on this device (device in the sense
     * of e.g. a Chromebook).
     * @param callback Invoked by <code>getTokens</code> with the list of available Tokens.
     * @param callback.tokens The list of available tokens.
     */
    export function getTokens(
      callback: (
        tokens: Token[],
      ) => void,
    ): void;

    /**
     * Returns the list of all client certificates available from the given token.
     * Can be used to check for the existence and expiration of client certificates
     * that are usable for a certain authentication.
     * @param tokenId The id of a Token returned by <code>getTokens</code>.
     * @param callback Called back with the list of the available certificates.
     * @param callback.certificates The list of certificates, each in DER encoding of a X.509     certificate.
     */
    export function getCertificates(
      tokenId: string,
      callback: (
        certificates: ArrayBuffer[],
      ) => void,
    ): void;

    /**
     * Imports <code>certificate</code> to the given token if the certified key is
     * already stored in this token. After a successful certification request, this
     * function should be used to store the obtained certificate and to make it
     * available to the operating system and browser for authentication.
     * @param tokenId The id of a Token returned by <code>getTokens</code>.
     * @param certificate The DER encoding of a X.509 certificate.
     * @param callback Called back when this operation is finished.
     */
    export function importCertificate(
      tokenId: string,
      certificate: ArrayBuffer,
      callback?: () => void,
    ): void;

    /**
     * Removes <code>certificate</code> from the given token if present. Should be
     * used to remove obsolete certificates so that they are not considered during
     * authentication and do not clutter the certificate choice. Should be used to
     * free storage in the certificate store.
     * @param tokenId The id of a Token returned by <code>getTokens</code>.
     * @param certificate The DER encoding of a X.509 certificate.
     * @param callback Called back when this operation is finished.
     */
    export function removeCertificate(
      tokenId: string,
      certificate: ArrayBuffer,
      callback?: () => void,
    ): void;

    /**
     * Challenges a hardware-backed Enterprise Machine Key and emits the response as
     * part of a remote attestation protocol. Only useful on Chrome OS and in
     * conjunction with the Verified Access Web API which both issues challenges and
     * verifies responses. A successful verification by the Verified Access Web API
     * is a strong signal of all of the following: * The current device is a
     * legitimate Chrome OS device. * The current device is managed by the domain
     * specified during   verification. * The current signed-in user is managed by
     * the domain specified during   verification. * The current device state
     * complies with enterprise device policy. For   example, a policy may specify
     * that the device must not be in developer   mode. * Any device identity
     * emitted by the verification is tightly bound to the   hardware of the current
     * device. This function is highly restricted and will fail if the current
     * device is not managed, the current user is not managed, or if this operation
     * has not explicitly been enabled for the caller by enterprise device policy.
     * The Enterprise Machine Key does not reside in the <code>"system"</code> token
     * and is not accessible by any other API.
     * @param challenge A challenge as emitted by the Verified Access Web API.
     * @param registerKey If set, the current Enterprise Machine Key is registered                with the <code>"system"</code> token and relinquishes the                Enterprise Machine Key role. The key can then be                associated with a certificate and used like any other                signing key. This key is 2048-bit RSA. Subsequent calls                to this function will then generate a new Enterprise                Machine Key.
     * @param callback Called back with the challenge response.
     * @param callback.response The challenge response.
     */
    export function challengeMachineKey(
      challenge: ArrayBuffer,
      registerKey: boolean,
      callback: (
        response: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * Challenges a hardware-backed Enterprise Machine Key and emits the response as
     * part of a remote attestation protocol. Only useful on Chrome OS and in
     * conjunction with the Verified Access Web API which both issues challenges and
     * verifies responses. A successful verification by the Verified Access Web API
     * is a strong signal of all of the following: * The current device is a
     * legitimate Chrome OS device. * The current device is managed by the domain
     * specified during   verification. * The current signed-in user is managed by
     * the domain specified during   verification. * The current device state
     * complies with enterprise device policy. For   example, a policy may specify
     * that the device must not be in developer   mode. * Any device identity
     * emitted by the verification is tightly bound to the   hardware of the current
     * device. This function is highly restricted and will fail if the current
     * device is not managed, the current user is not managed, or if this operation
     * has not explicitly been enabled for the caller by enterprise device policy.
     * The Enterprise Machine Key does not reside in the <code>"system"</code> token
     * and is not accessible by any other API.
     * @param challenge A challenge as emitted by the Verified Access Web API.
     * @param callback Called back with the challenge response.
     * @param callback.response The challenge response.
     */
    export function challengeMachineKey(
      challenge: ArrayBuffer,
      callback: (
        response: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * Challenges a hardware-backed Enterprise User Key and emits the response as
     * part of a remote attestation protocol. Only useful on Chrome OS and in
     * conjunction with the Verified Access Web API which both issues challenges and
     * verifies responses. A successful verification by the Verified Access Web API
     * is a strong signal of all of the following: * The current device is a
     * legitimate Chrome OS device. * The current device is managed by the domain
     * specified during   verification. * The current signed-in user is managed by
     * the domain specified during   verification. * The current device state
     * complies with enterprise user policy. For   example, a policy may specify
     * that the device must not be in developer   mode. * The public key emitted by
     * the verification is tightly bound to the   hardware of the current device and
     * to the current signed-in user. This function is highly restricted and will
     * fail if the current device is not managed, the current user is not managed,
     * or if this operation has not explicitly been enabled for the caller by
     * enterprise user policy. The Enterprise User Key does not reside in the
     * <code>"user"</code> token and is not accessible by any other API.
     * @param challenge A challenge as emitted by the Verified Access Web API.
     * @param registerKey If set, the current Enterprise User Key is registered with                the <code>"user"</code> token and relinquishes the                Enterprise User Key role. The key can then be associated                with a certificate and used like any other signing key.                This key is 2048-bit RSA. Subsequent calls to this                function will then generate a new Enterprise User Key.
     * @param callback Called back with the challenge response.
     * @param callback.response The challenge response.
     */
    export function challengeUserKey(
      challenge: ArrayBuffer,
      registerKey: boolean,
      callback: (
        response: ArrayBuffer,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.events</code> namespace contains common types used by APIs
   * dispatching events to notify you when something interesting happens.
   */
  export namespace events {
    /**
     * Description of a declarative rule for handling events.
     */
    export interface Rule {
      /**
       * Optional identifier that allows referencing this rule.
       */
      id?: string;

      /**
       * Tags can be used to annotate rules and perform operations on sets of rules.
       */
      tags?: string[];

      /**
       * List of conditions that can trigger the actions.
       */
      conditions: any[];

      /**
       * List of actions that are triggered if one of the conditions is fulfilled.
       */
      actions: any[];

      /**
       * Optional priority of this rule. Defaults to 100.
       */
      priority?: number;
    }

    /**
     * An object which allows the addition and removal of listeners for a Chrome
     * event.
     */
    export interface Event<T extends Function> {
      /**
       * Registers an event listener <em>callback</em> to an event.
       * @param callback Called when an event occurs. The parameters of this function depend on the type of event.
       */
      addListener(
        callback: () => void,
      ): void;

      /**
       * Deregisters an event listener <em>callback</em> from an event.
       * @param callback Listener that shall be unregistered.
       */
      removeListener(
        callback: () => void,
      ): void;

      /**
       * @param callback Listener whose registration status shall be tested.
       * @returns True if <em>callback</em> is registered to the event.
       */
      hasListener(
        callback: () => void,
      ): boolean;

      /**
       * @returns True if any event listeners are registered to the event.
       */
      hasListeners(): boolean;

      /**
       * Registers rules to handle events.
       * @param eventName Name of the event this function affects.
       * @param webViewInstanceId If provided, this is an integer that uniquely identfies the <webview> associated with this function call.
       * @param rules Rules to be registered. These do not replace previously registered rules.
       * @param callback Called with registered rules.
       * @param callback.rules Rules that were registered, the optional parameters are filled with values.
       */
      addRules(
        eventName: string,
        webViewInstanceId: number,
        rules: Rule[],
        callback?: (
          rules: Rule[],
        ) => void,
      ): void;

      /**
       * Returns currently registered rules.
       * @param eventName Name of the event this function affects.
       * @param webViewInstanceId If provided, this is an integer that uniquely identfies the <webview> associated with this function call.
       * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are returned.
       * @param callback Called with registered rules.
       * @param callback.rules Rules that were registered, the optional parameters are filled with values.
       */
      getRules(
        eventName: string,
        webViewInstanceId: number,
        ruleIdentifiers: string[],
        callback: (
          rules: Rule[],
        ) => void,
      ): void;

      /**
       * Returns currently registered rules.
       * @param eventName Name of the event this function affects.
       * @param webViewInstanceId If provided, this is an integer that uniquely identfies the <webview> associated with this function call.
       * @param callback Called with registered rules.
       * @param callback.rules Rules that were registered, the optional parameters are filled with values.
       */
      getRules(
        eventName: string,
        webViewInstanceId: number,
        callback: (
          rules: Rule[],
        ) => void,
      ): void;

      /**
       * Unregisters currently registered rules.
       * @param eventName Name of the event this function affects.
       * @param webViewInstanceId If provided, this is an integer that uniquely identfies the <webview> associated with this function call.
       * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are unregistered.
       * @param callback Called when rules were unregistered.
       */
      removeRules(
        eventName: string,
        webViewInstanceId: number,
        ruleIdentifiers?: string[],
        callback?: () => void,
      ): void;
    }

    /**
     * Filters URLs for various criteria. See <a href='events#filtered'>event
     * filtering</a>. All criteria are case sensitive.
     */
    export interface UrlFilter {
      /**
       * Matches if the host name of the URL contains a specified string. To test
       * whether a host name component has a prefix 'foo', use hostContains: '.foo'.
       * This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added
       * at the beginning of the host name. Similarly, hostContains can be used to
       * match against component suffix ('foo.') and to exactly match against
       * components ('.foo.'). Suffix- and exact-matching for the last components need
       * to be done separately using hostSuffix, because no implicit dot is added at
       * the end of the host name.
       */
      hostContains?: string;

      /**
       * Matches if the host name of the URL is equal to a specified string.
       */
      hostEquals?: string;

      /**
       * Matches if the host name of the URL starts with a specified string.
       */
      hostPrefix?: string;

      /**
       * Matches if the host name of the URL ends with a specified string.
       */
      hostSuffix?: string;

      /**
       * Matches if the path segment of the URL contains a specified string.
       */
      pathContains?: string;

      /**
       * Matches if the path segment of the URL is equal to a specified string.
       */
      pathEquals?: string;

      /**
       * Matches if the path segment of the URL starts with a specified string.
       */
      pathPrefix?: string;

      /**
       * Matches if the path segment of the URL ends with a specified string.
       */
      pathSuffix?: string;

      /**
       * Matches if the query segment of the URL contains a specified string.
       */
      queryContains?: string;

      /**
       * Matches if the query segment of the URL is equal to a specified string.
       */
      queryEquals?: string;

      /**
       * Matches if the query segment of the URL starts with a specified string.
       */
      queryPrefix?: string;

      /**
       * Matches if the query segment of the URL ends with a specified string.
       */
      querySuffix?: string;

      /**
       * Matches if the URL (without fragment identifier) contains a specified string.
       * Port numbers are stripped from the URL if they match the default port number.
       */
      urlContains?: string;

      /**
       * Matches if the URL (without fragment identifier) is equal to a specified
       * string. Port numbers are stripped from the URL if they match the default port
       * number.
       */
      urlEquals?: string;

      /**
       * Matches if the URL (without fragment identifier) matches a specified regular
       * expression. Port numbers are stripped from the URL if they match the default
       * port number. The regular expressions use the <a
       * href="https://github.com/google/re2/blob/master/doc/syntax.txt">RE2
       * syntax</a>.
       */
      urlMatches?: string;

      /**
       * Matches if the URL without query segment and fragment identifier matches a
       * specified regular expression. Port numbers are stripped from the URL if they
       * match the default port number. The regular expressions use the <a
       * href="https://github.com/google/re2/blob/master/doc/syntax.txt">RE2
       * syntax</a>.
       */
      originAndPathMatches?: string;

      /**
       * Matches if the URL (without fragment identifier) starts with a specified
       * string. Port numbers are stripped from the URL if they match the default port
       * number.
       */
      urlPrefix?: string;

      /**
       * Matches if the URL (without fragment identifier) ends with a specified
       * string. Port numbers are stripped from the URL if they match the default port
       * number.
       */
      urlSuffix?: string;

      /**
       * Matches if the scheme of the URL is equal to any of the schemes specified in
       * the array.
       */
      schemes?: string[];

      /**
       * Matches if the port of the URL is contained in any of the specified port
       * lists. For example <code>[80, 443, [1000, 1200]]</code> matches all requests
       * on port 80, 443 and in the range 1000-1200.
       */
      ports?: (number | number[])[];
    }
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.extensionTypes</code> API contains type declarations for
   * Chrome extensions.
   */
  export namespace extensionTypes {
    /**
     * The format of an image.
     */
    export type ImageFormat = "jpeg" | "png";

    /**
     * Details about the format and quality of an image.
     */
    export interface ImageDetails {
      /**
       * The format of the resulting image.  Default is <code>"jpeg"</code>.
       */
      format?: ImageFormat;

      /**
       * When format is <code>"jpeg"</code>, controls the quality of the resulting
       * image.  This value is ignored for PNG images.  As quality is decreased, the
       * resulting image will have more visual artifacts, and the number of bytes
       * needed to store it will decrease.
       */
      quality?: number;
    }

    /**
     * The soonest that the JavaScript or CSS will be injected into the tab.
     */
    export type RunAt = "document_start" | "document_end" | "document_idle";

    /**
     * The <a
     * href="https://www.w3.org/TR/css3-cascade/#cascading-origins">origin</a> of
     * injected CSS.
     */
    export type CSSOrigin = "author" | "user";

    /**
     * Details of the script or CSS to inject. Either the code or the file property
     * must be set, but both may not be set at the same time.
     */
    export interface InjectDetails {
      /**
       * JavaScript or CSS code to inject.<br><br><b>Warning:</b><br>Be careful using
       * the <code>code</code> parameter. Incorrect use of it may open your extension
       * to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting">cross site
       * scripting</a> attacks.
       */
      code?: string;

      /**
       * JavaScript or CSS file to inject.
       */
      file?: string;

      /**
       * If allFrames is <code>true</code>, implies that the JavaScript or CSS should
       * be injected into all frames of current page. By default, it's
       * <code>false</code> and is only injected into the top frame. If
       * <code>true</code> and <code>frameId</code> is set, then the code is inserted
       * in the selected frame and all of its child frames.
       */
      allFrames?: boolean;

      /**
       * The <a href='webNavigation#frame_ids'>frame</a> where the script or CSS
       * should be injected. Defaults to 0 (the top-level frame).
       */
      frameId?: number;

      /**
       * If matchAboutBlank is true, then the code is also injected in about:blank and
       * about:srcdoc frames if your extension has access to its parent document. Code
       * cannot be inserted in top-level about:-frames. By default it is
       * <code>false</code>.
       */
      matchAboutBlank?: boolean;

      /**
       * The soonest that the JavaScript or CSS will be injected into the tab.
       * Defaults to "document_idle".
       */
      runAt?: RunAt;

      /**
       * The <a
       * href="https://www.w3.org/TR/css3-cascade/#cascading-origins">origin</a> of
       * the CSS to inject. This may only be specified for CSS, not JavaScript.
       * Defaults to <code>"author"</code>.
       */
      cssOrigin?: CSSOrigin;
    }
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.extension</code> API has utilities that can be used by any
   * extension page. It includes support for exchanging messages between an
   * extension and its content scripts or between extensions, as described in
   * detail in <a href='messaging'>Message Passing</a>.
   */
  export namespace extension {
    /**
     * The type of extension view.
     */
    export type ViewType = "tab" | "popup";

    /**
     * Set for the lifetime of a callback if an ansychronous extension api has
     * resulted in an error. If no error has occured lastError will be
     * <var>undefined</var>.
     * @deprecated Please use {@link runtime.lastError}.
     */
    export let lastError: {
      /**
       * Description of the error that has taken place.
       */
      message: string,
    } | undefined;

    /**
     * True for content scripts running inside incognito tabs, and for extension
     * pages running inside an incognito process. The latter only applies to
     * extensions with 'split' incognito_behavior.
     */
    export let inIncognitoContext: boolean | undefined;

    /**
     * Sends a single request to other listeners within the extension. Similar to
     * {@link runtime.connect}, but only sends a single request with an optional
     * response. The {@link extension.onRequest} event is fired in each page of the
     * extension.
     * @param extensionId The extension ID of the extension you want to connect to. If omitted, default is your own extension.
     * @param request
     * @param responseCallback
     * @param responseCallback.response The JSON response object sent by the handler of the request. If an error occurs while connecting to the extension, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
     * @deprecated Please use {@link runtime.sendMessage}.
     */
    export function sendRequest(
      extensionId: string,
      request: any,
      responseCallback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Sends a single request to other listeners within the extension. Similar to
     * {@link runtime.connect}, but only sends a single request with an optional
     * response. The {@link extension.onRequest} event is fired in each page of the
     * extension.
     * @param request
     * @param responseCallback
     * @param responseCallback.response The JSON response object sent by the handler of the request. If an error occurs while connecting to the extension, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
     * @deprecated Please use {@link runtime.sendMessage}.
     */
    export function sendRequest(
      request: any,
      responseCallback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Converts a relative path within an extension install directory to a
     * fully-qualified URL.
     * @param path A path to a resource within an extension expressed relative to its install directory.
     * @returns The fully-qualified URL to the resource.
     * @deprecated Please use {@link runtime.getURL}.
     */
    export function getURL(
      path: string,
    ): string;

    /**
     * Returns an array of the JavaScript 'window' objects for each of the pages
     * running inside the current extension.
     * @param fetchProperties
     * @returns Array of global objects
     */
    export function getViews(
      fetchProperties?: {
        /**
         * The type of view to get. If omitted, returns all views (including background
         * pages and tabs). Valid values: 'tab', 'notification', 'popup'.
         */
        type?: ViewType,

        /**
         * The window to restrict the search to. If omitted, returns all views.
         */
        windowId?: number,

        /**
         * Find a view according to a tab id. If this field is omitted, returns all
         * views.
         */
        tabId?: number,
      },
    ): Window[];

    /**
     * Returns the JavaScript 'window' object for the background page running inside
     * the current extension. Returns null if the extension has no background page.
     */
    export function getBackgroundPage(): Window;

    /**
     * Returns an array of the JavaScript 'window' objects for each of the tabs
     * running inside the current extension. If <code>windowId</code> is specified,
     * returns only the 'window' objects of tabs attached to the specified window.
     * @param windowId
     * @returns Array of global window objects
     * @deprecated Please use {@link extension.getViews} <code>{type: "tab"}</code>.
     */
    export function getExtensionTabs(
      windowId?: number,
    ): Window[];

    /**
     * Retrieves the state of the extension's access to Incognito-mode (as
     * determined by the user-controlled 'Allowed in Incognito' checkbox.
     * @param callback
     * @param callback.isAllowedAccess True if the extension has access to Incognito mode, false otherwise.
     */
    export function isAllowedIncognitoAccess(
      callback: (
        isAllowedAccess: boolean,
      ) => void,
    ): void;

    /**
     * Retrieves the state of the extension's access to the 'file://' scheme (as
     * determined by the user-controlled 'Allow access to File URLs' checkbox.
     * @param callback
     * @param callback.isAllowedAccess True if the extension can access the 'file://' scheme, false otherwise.
     */
    export function isAllowedFileSchemeAccess(
      callback: (
        isAllowedAccess: boolean,
      ) => void,
    ): void;

    /**
     * Sets the value of the ap CGI parameter used in the extension's update URL.
     * This value is ignored for extensions that are hosted in the Chrome Extension
     * Gallery.
     * @param data
     */
    export function setUpdateUrlData(
      data: string,
    ): void;

    /**
     * Fired when a request is sent from either an extension process or a
     * content script.
     */
    export const onRequest: chrome.events.Event<
      /**
       * @param request The request sent by the calling script.
       * @param sender
       * @deprecated Please use {@link runtime.onMessage}.
       */
      (
        request: any,
        sender: runtime.MessageSender,
        sendResponse: () => void,
      ) => void
    >;

    /**
     * Fired when a request is sent from another extension.
     */
    export const onRequestExternal: chrome.events.Event<
      /**
       * @param request The request sent by the calling script.
       * @param sender
       * @deprecated Please use {@link runtime.onMessageExternal}.
       */
      (
        request: any,
        sender: runtime.MessageSender,
        sendResponse: () => void,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Schemas for structured manifest entries
   */
  export namespace extensionsManifestTypes {
    /**
     * This API provides programmatic access to the user interface elements of
     * Chrome. This includes everything in the web view, and optionally Chrome's
     * full user interface.
     */
    export type automation = boolean | {
      /**
       * Whether to request permission to the whole ChromeOS desktop. If granted, this
       * gives the extension access to every aspect of the desktop, and every site and
       * app. If this permission is requested, all other permissions are implicitly
       * included and do not need to be requested separately.
       */
      desktop?: boolean,

      /**
       * A list of URL patterns for which this extension may request an automation
       * tree. If not specified, automation permission will be granted for the sites
       * for which the extension has a <a
       * href='https://developer.chrome.com/extensions/declare_permissions#host-permissions'>host permission</a> or <a href='https://developer.chrome.com/extensions/declare_permissions#activeTab'>activeTab permission</a>).
       */
      matches?: string[],

      /**
       * Whether the extension is allowed interactive access (true) or read-only
       * access (false; default) to the automation tree.
       */
      interact?: boolean,
    };

    /**
     * The <code>content_capabilities</code> manifest entry allows an extension to
     * grant certain additional capabilities to web contents whose locations match a
     * given set of URL patterns.
     */
    export interface ContentCapabilities {
      /**
       * The set of URL patterns to match against. If any of the given patterns match
       * a URL, its contents will be granted the specified capabilities.
       */
      matches: string[];

      /**
       * The set of capabilities to grant matched contents. This is currently limited
       * to <code>clipboardRead</code>, <code>clipboardWrite</code>, and
       * <code>unlimitedStorage</code>.
       */
      permissions: string[];
    }

    export interface ExternallyConnectable {
      /**
       * <p>The IDs of extensions or apps that are allowed to connect. If left empty
       * or unspecified, no extensions or apps can connect.</p><p>The wildcard
       * <code>"*"</code> will allow all extensions and apps to connect.</p>
       */
      ids?: string[];

      /**
       * <p>The URL patterns for <em>web pages</em> that are allowed to connect.
       * <em>This does not affect content scripts.</em> If left empty or unspecified,
       * no web pages can connect.</p><p>Patterns cannot include wildcard domains nor
       * subdomains of <a href="http://publicsuffix.org/list/">(effective) top level
       * domains</a>; <code>*://google.com/*</code> and
       * <code>http://*.chromium.org/*</code> are valid, while
       * <code>&lt;all_urls&gt;</code>, <code>http://&#x2a;/*</code>,
       * <code>*://*.com/*</code>, and even <code>http://*.appspot.com/*</code> are
       * not.</p>
       */
      matches?: string[];

      /**
       * If <code>true</code>, messages sent via {@link runtime.connect} or {@link
       * runtime.sendMessage} will set {@link runtime.MessageSender.tlsChannelId} if
       * those methods request it to be. If <code>false</code>, {@link
       * runtime.MessageSender.tlsChannelId} will never be set under any circumstance.
       */
      accepts_tls_channel_id?: boolean;
    }

    /**
     * The <code>options_ui</code> manifest property declares how the options page
     * should be displayed.
     */
    export interface OptionsUI {
      /**
       * The path to your options page, relative to your extension's root.
       */
      page: string;

      /**
       * If <code>true</code>, a Chrome user agent stylesheet will be applied to your
       * options page. The default value is <code>false</code>, but we recommend you
       * enable it for a consistent UI with Chrome.
       */
      chrome_style?: boolean;

      /**
       * <p>If <code>true</code>, your extension's options page will be opened in a
       * new tab rather than embedded in <em>chrome://extensions</em>. The default is
       * <code>false</code>, and we recommend that you don't change
       * it.</p><p><strong>This is only useful to delay the inevitable deprecation of
       * the old options UI!</strong> It will be removed soon, so try not to use it.
       * It will break.</p>
       */
      open_in_tab?: boolean;
    }

    /**
     * <p>A single string or a list of strings representing host:port patterns.</p>
     */
    export type SocketHostPatterns = string | string[];

    /**
     * The <code>sockets</code> manifest property declares which sockets operations
     * an app can issue.
     */
    export interface sockets {
      /**
       * The <code>udp</code> manifest property declares which sockets.udp operations
       * an app can issue.
       */
      udp?: {
        /**
         * <p>The host:port pattern for <code>bind</code> operations.</p>
         */
        bind?: SocketHostPatterns,

        /**
         * <p>The host:port pattern for <code>send</code> operations.</p>
         */
        send?: SocketHostPatterns,

        /**
         * <p>The host:port pattern for <code>joinGroup</code> operations.</p>
         */
        multicastMembership?: SocketHostPatterns,
      };

      /**
       * The <code>tcp</code> manifest property declares which sockets.tcp operations
       * an app can issue.
       */
      tcp?: {
        /**
         * <p>The host:port pattern for <code>connect</code> operations.</p>
         */
        connect?: SocketHostPatterns,
      };

      /**
       * The <code>tcpServer</code> manifest property declares which sockets.tcpServer
       * operations an app can issue.
       */
      tcpServer?: {
        /**
         * <p>The host:port pattern for <code>listen</code> operations.</p>
         */
        listen?: SocketHostPatterns,
      };
    }

    /**
     * The <code>bluetooth</code> manifest property give permission to an app to use
     * the {@link bluetooth} API. A list of UUIDs can be optionally specified to
     * enable communication with devices.
     */
    export interface bluetooth {
      /**
       * The <code>uuids</code> manifest property declares the list of protocols,
       * profiles and services that an app can communicate using.
       */
      uuids?: string[];

      /**
       * If <code>true</code>, gives permission to an app to use the {@link
       * bluetoothSocket} API
       */
      socket?: boolean;

      /**
       * If <code>true</code>, gives permission to an app to use the {@link
       * bluetoothLowEnergy} API
       */
      low_energy?: boolean;

      /**
       * If <code>true</code>, gives permission to an app to use the advertisement
       * functions in the {@link bluetoothLowEnergy} API
       */
      peripheral?: boolean;
    }

    /**
     * The <code>usb_printers</code> manifest property lists the USB printers
     * supported by an app implementing the {@link printerProvider} API.
     */
    export interface UsbPrinters {
      /**
       * A list of {@link usb.DeviceFilter USB device filters} matching supported
       * devices. A device only needs to match one of the provided filters. A
       * <code>vendorId</code> is required and only one of <code>productId</code> or
       * <code>interfaceClass</code> may be provided.
       */
      filters: {
        /**
         * USB vendor ID of matching devices
         */
        vendorId: number,

        /**
         * USB product ID of matching devices
         */
        productId?: number,

        /**
         * USB interface class implemented by any interface of a matching device.
         */
        interfaceClass?: number,

        /**
         * USB interface sub-class implemented by the interface matching {@link
         * interfaceClass}.
         */
        interfaceSubclass?: number,

        /**
         * USB interface protocol implemented by the interface matching {@link
         * interfaceClass} and {@link interfaceSubclass}.
         */
        interfaceProtocol?: number,
      }[];
    }

    /**
     * The <code>kiosk_secondary_apps</code> manifest property lists the secondary
     * kiosk apps to be deployed by the primary kiosk app.
     */
    export type KioskSecondaryApps = {
      /**
       * ID of secondary kiosk app
       */
      id: string,

      /**
       * Whether the secondary app should be enabled when kiosk app is launched. If
       * true, the app will be enabled before the kiosk app launch; if false the app
       * will be disabled before the kiosk app launch; if not set, the app's enabled
       * state will not be changed during the kiosk app launch. The ${ref:management}
       * API can be used to later change the secondary app state.
       */
      enabled_on_launch?: boolean,
    }[];
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.fileBrowserHandler</code> API to extend the Chrome OS
   * file browser. For example, you can use this API to enable users to upload
   * files to your website.
   * @chrome-platform chromeos
 * @chrome-permission fileBrowserHandler
 */
  export namespace fileBrowserHandler {
    /**
     * Event details payload for fileBrowserHandler.onExecute event.
     */
    export interface FileHandlerExecuteEventDetails {
      /**
       * Array of Entry instances representing files that are targets of this action
       * (selected in ChromeOS file browser).
       */
      entries: any[];

      /**
       * The ID of the tab that raised this event. Tab IDs are unique within a browser
       * session.
       */
      tab_id?: number;
    }

    /**
     * Prompts user to select file path under which file should be saved. When the
     * file is selected, file access permission required to use the file (read,
     * write and create) are granted to the caller. The file will not actually get
     * created during the function call, so function caller must ensure its
     * existence before using it. The function has to be invoked with a user
     * gesture.
     * @param selectionParams Parameters that will be used while selecting the file.
     * @param callback Function called upon completion.
     * @param callback.result Result of the method.
     */
    export function selectFile(
      selectionParams: {
        /**
         * Suggested name for the file.
         */
        suggestedName: string,

        /**
         * List of file extensions that the selected file can have. The list is also
         * used to specify what files to be shown in the select file dialog. Files with
         * the listed extensions are only shown in the dialog. Extensions should not
         * include the leading '.'. Example: ['jpg', 'png']
         */
        allowedFileExtensions?: string[],
      },
      callback: (
        result: {
          /**
           * Whether the file has been selected.
           */
          success: boolean,

          /**
           * Selected file entry. It will be null if a file hasn't been selected.
           */
          entry?: {[name: string]: any},
        },
      ) => void,
    ): void;

    /**
     * Fired when file system action is executed from ChromeOS file browser.
     */
    export const onExecute: chrome.events.Event<
      /**
       * @param id File browser action id as specified in the listener component's manifest.
       * @param details File handler execute event details.
       */
      (
        id: string,
        details: FileHandlerExecuteEventDetails,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.fileSystemProvider</code> API to create file systems,
   * that can be accessible from the file manager on Chrome OS.
   * @chrome-platform chromeos
 * @chrome-permission fileSystemProvider
 */
  export namespace fileSystemProvider {
    /**
     * Error codes used by providing extensions in response to requests as well as
     * in case of errors when calling methods of the API. For success,
     * <code>"OK"</code> must be used.
     */
    export type ProviderError = "OK" | "FAILED" | "IN_USE" | "EXISTS" | "NOT_FOUND" | "ACCESS_DENIED" | "TOO_MANY_OPENED" | "NO_MEMORY" | "NO_SPACE" | "NOT_A_DIRECTORY" | "INVALID_OPERATION" | "SECURITY" | "ABORT" | "NOT_A_FILE" | "NOT_EMPTY" | "INVALID_URL" | "IO";

    /**
     * Mode of opening a file. Used by {@link onOpenFileRequested}.
     */
    export type OpenFileMode = "READ" | "WRITE";

    /**
     * Type of a change detected on the observed directory.
     */
    export type ChangeType = "CHANGED" | "DELETED";

    /**
     * List of common actions. <code>"SHARE"</code> is for sharing files with
     * others. <code>"SAVE_FOR_OFFLINE"</code> for pinning (saving for offline
     * access). <code>"OFFLINE_NOT_NECESSARY"</code> for notifying that the file
     * doesn't need to be stored for offline access anymore. Used by {@link
     * onGetActionsRequested} and {@link onExecuteActionRequested}.
     */
    export type CommonActionId = "SAVE_FOR_OFFLINE" | "OFFLINE_NOT_NECESSARY" | "SHARE";

    export interface EntryMetadata {
      /**
       * True if it is a directory. Must be provided if requested in
       * <code>options</code>.
       */
      isDirectory?: boolean;

      /**
       * Name of this entry (not full path name). Must not contain '/'. For root it
       * must be empty. Must be provided if requested in <code>options</code>.
       */
      name?: string;

      /**
       * File size in bytes. Must be provided if requested in <code>options</code>.
       */
      size?: number;

      /**
       * The last modified time of this entry. Must be provided if requested in
       * <code>options</code>.
       */
      modificationTime?: Date;

      /**
       * Mime type for the entry. Always optional, but should be provided if requested
       * in <code>options</code>.
       */
      mimeType?: string;

      /**
       * Thumbnail image as a data URI in either PNG, JPEG or WEBP format, at most 32
       * KB in size. Optional, but can be provided only when explicitly requested by
       * the {@link onGetMetadataRequested} event.
       */
      thumbnail?: string;
    }

    export interface Watcher {
      /**
       * The path of the entry being observed.
       */
      entryPath: string;

      /**
       * Whether watching should include all child entries recursively. It can be true
       * for directories only.
       */
      recursive: boolean;

      /**
       * Tag used by the last notification for the watcher.
       */
      lastTag?: string;
    }

    export interface OpenedFile {
      /**
       * A request ID to be be used by consecutive read/write and close requests.
       */
      openRequestId: number;

      /**
       * The path of the opened file.
       */
      filePath: string;

      /**
       * Whether the file was opened for reading or writing.
       */
      mode: OpenFileMode;
    }

    export interface FileSystemInfo {
      /**
       * The identifier of the file system.
       */
      fileSystemId: string;

      /**
       * A human-readable name for the file system.
       */
      displayName: string;

      /**
       * Whether the file system supports operations which may change contents of the
       * file system (such as creating, deleting or writing to files).
       */
      writable: boolean;

      /**
       * The maximum number of files that can be opened at once. If 0, then not
       * limited.
       */
      openedFilesLimit: number;

      /**
       * List of currently opened files.
       */
      openedFiles: OpenedFile[];

      /**
       * Whether the file system supports the <code>tag</code> field for observing
       * directories.
       */
      supportsNotifyTag?: boolean;

      /**
       * List of watchers.
       */
      watchers: Watcher[];
    }

    export interface MountOptions {
      /**
       * The string indentifier of the file system. Must be unique per each extension.
       */
      fileSystemId: string;

      /**
       * A human-readable name for the file system.
       */
      displayName: string;

      /**
       * Whether the file system supports operations which may change contents of the
       * file system (such as creating, deleting or writing to files).
       */
      writable?: boolean;

      /**
       * The maximum number of files that can be opened at once. If not specified, or
       * 0, then not limited.
       */
      openedFilesLimit?: number;

      /**
       * Whether the file system supports the <code>tag</code> field for observed
       * directories.
       */
      supportsNotifyTag?: boolean;

      /**
       * Whether the framework should resume the file system at the next sign-in
       * session. True by default.
       */
      persistent?: boolean;
    }

    export interface UnmountOptions {
      /**
       * The identifier of the file system to be unmounted.
       */
      fileSystemId: string;
    }

    export interface UnmountRequestedOptions {
      /**
       * The identifier of the file system to be unmounted.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;
    }

    export interface GetMetadataRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the entry to fetch metadata about.
       */
      entryPath: string;

      /**
       * Set to <code>true</code> if <code>is_directory</code> value is requested.
       */
      isDirectory: boolean;

      /**
       * Set to <code>true</code> if <code>name</code> value is requested.
       */
      name: boolean;

      /**
       * Set to <code>true</code> if <code>size</code> value is requested.
       */
      size: boolean;

      /**
       * Set to <code>true</code> if <code>modificationTime</code> value is requested.
       */
      modificationTime: boolean;

      /**
       * Set to <code>true</code> if <code>mimeType</code> value is requested.
       */
      mimeType: boolean;

      /**
       * Set to <code>true</code> if the thumbnail is requested.
       */
      thumbnail: boolean;
    }

    export interface GetActionsRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * List of paths of entries for the list of actions.
       */
      entryPaths: string[];
    }

    export interface ReadDirectoryRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the directory which contents are requested.
       */
      directoryPath: string;

      /**
       * Set to <code>true</code> if <code>is_directory</code> value is requested.
       */
      isDirectory: boolean;

      /**
       * Set to <code>true</code> if <code>name</code> value is requested.
       */
      name: boolean;

      /**
       * Set to <code>true</code> if <code>size</code> value is requested.
       */
      size: boolean;

      /**
       * Set to <code>true</code> if <code>modificationTime</code> value is requested.
       */
      modificationTime: boolean;

      /**
       * Set to <code>true</code> if <code>mimeType</code> value is requested.
       */
      mimeType: boolean;

      /**
       * Set to <code>true</code> if the thumbnail is requested.
       */
      thumbnail: boolean;
    }

    export interface OpenFileRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * A request ID which will be used by consecutive read/write and close requests.
       */
      requestId: number;

      /**
       * The path of the file to be opened.
       */
      filePath: string;

      /**
       * Whether the file will be used for reading or writing.
       */
      mode: OpenFileMode;
    }

    export interface CloseFileRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * A request ID used to open the file.
       */
      openRequestId: number;
    }

    export interface ReadFileRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * A request ID used to open the file.
       */
      openRequestId: number;

      /**
       * Position in the file (in bytes) to start reading from.
       */
      offset: number;

      /**
       * Number of bytes to be returned.
       */
      length: number;
    }

    export interface CreateDirectoryRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the directory to be created.
       */
      directoryPath: string;

      /**
       * Whether the operation is recursive (for directories only).
       */
      recursive: boolean;
    }

    export interface DeleteEntryRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the entry to be deleted.
       */
      entryPath: string;

      /**
       * Whether the operation is recursive (for directories only).
       */
      recursive: boolean;
    }

    export interface CreateFileRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the file to be created.
       */
      filePath: string;
    }

    export interface CopyEntryRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The source path of the entry to be copied.
       */
      sourcePath: string;

      /**
       * The destination path for the copy operation.
       */
      targetPath: string;
    }

    export interface MoveEntryRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The source path of the entry to be moved into a new place.
       */
      sourcePath: string;

      /**
       * The destination path for the copy operation.
       */
      targetPath: string;
    }

    export interface TruncateRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the file to be truncated.
       */
      filePath: string;

      /**
       * Number of bytes to be retained after the operation completes.
       */
      length: number;
    }

    export interface WriteFileRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * A request ID used to open the file.
       */
      openRequestId: number;

      /**
       * Position in the file (in bytes) to start writing the bytes from.
       */
      offset: number;

      /**
       * Buffer of bytes to be written to the file.
       */
      data: ArrayBuffer;
    }

    export interface AbortRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * An ID of the request to be aborted.
       */
      operationRequestId: number;
    }

    export interface AddWatcherRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the entry to be observed.
       */
      entryPath: string;

      /**
       * Whether observing should include all child entries recursively. It can be
       * true for directories only.
       */
      recursive: boolean;
    }

    export interface RemoveWatcherRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The path of the watched entry.
       */
      entryPath: string;

      /**
       * Mode of the watcher.
       */
      recursive: boolean;
    }

    export interface Action {
      /**
       * The identifier of the action. Any string or {@link CommonActionId} for common
       * actions.
       */
      id: string;

      /**
       * The title of the action. It may be ignored for common actions.
       */
      title?: string;
    }

    export interface ExecuteActionRequestedOptions {
      /**
       * The identifier of the file system related to this operation.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;

      /**
       * The set of paths of the entries to be used for the action.
       */
      entryPaths: string[];

      /**
       * The identifier of the action to be executed.
       */
      actionId: string;
    }

    export interface Change {
      /**
       * The path of the changed entry.
       */
      entryPath: string;

      /**
       * The type of the change which happened to the entry.
       */
      changeType: ChangeType;
    }

    export interface NotifyOptions {
      /**
       * The identifier of the file system related to this change.
       */
      fileSystemId: string;

      /**
       * The path of the observed entry.
       */
      observedPath: string;

      /**
       * Mode of the observed entry.
       */
      recursive: boolean;

      /**
       * The type of the change which happened to the observed entry. If it is
       * DELETED, then the observed entry will be automatically removed from the list
       * of observed entries.
       */
      changeType: ChangeType;

      /**
       * List of changes to entries within the observed directory (including the entry
       * itself)
       */
      changes?: Change[];

      /**
       * Tag for the notification. Required if the file system was mounted with the
       * <code>supportsNotifyTag</code> option. Note, that this flag is necessary to
       * provide notifications about changes which changed even when the system was
       * shutdown.
       */
      tag?: string;
    }

    export interface ConfigureRequestedOptions {
      /**
       * The identifier of the file system to be configured.
       */
      fileSystemId: string;

      /**
       * The unique identifier of this request.
       */
      requestId: number;
    }

    /**
     * <p>Mounts a file system with the given <code>fileSystemId</code> and
     * <code>displayName</code>. <code>displayName</code> will be shown in the left
     * panel of the Files app. <code>displayName</code> can contain any characters
     * including '/', but cannot be an empty string. <code>displayName</code> must
     * be descriptive but doesn't have to be unique. The <code>fileSystemId</code>
     * must not be an empty string.</p><p>Depending on the type of the file system
     * being mounted, the <code>source</code> option must be set
     * appropriately.</p><p>In case of an error, {@link runtime.lastError} will be
     * set with a corresponding error code.</p>
     * @param options
     * @param callback A generic result callback to indicate success or failure.
     */
    export function mount(
      options: MountOptions,
      callback?: () => void,
    ): void;

    /**
     * <p>Unmounts a file system with the given <code>fileSystemId</code>. It must
     * be called after {@link onUnmountRequested} is invoked. Also, the providing
     * extension can decide to perform unmounting if not requested (eg. in case of
     * lost connection, or a file error).</p><p>In case of an error, {@link
     * runtime.lastError} will be set with a corresponding error code.</p>
     * @param options
     * @param callback A generic result callback to indicate success or failure.
     */
    export function unmount(
      options: UnmountOptions,
      callback?: () => void,
    ): void;

    /**
     * Returns all file systems mounted by the extension.
     * @param callback Callback to receive the result of {@link getAll} function.
     * @param callback.fileSystems
     */
    export function getAll(
      callback: (
        fileSystems: FileSystemInfo[],
      ) => void,
    ): void;

    /**
     * Returns information about a file system with the passed
     * <code>fileSystemId</code>.
     * @param fileSystemId
     * @param callback Callback to receive the result of {@link get} function.
     * @param callback.fileSystem
     */
    export function get(
      fileSystemId: string,
      callback: (
        fileSystem: FileSystemInfo,
      ) => void,
    ): void;

    /**
     * <p>Notifies about changes in the watched directory at
     * <code>observedPath</code> in <code>recursive</code> mode. If the file system
     * is mounted with <code>supportsNofityTag</code>, then <code>tag</code> must be
     * provided, and all changes since the last notification always reported, even
     * if the system was shutdown. The last tag can be obtained with {@link
     * getAll}.</p><p>To use, the <code>file_system_provider.notify</code> manifest
     * option must be set to true.</p><p>Value of <code>tag</code> can be any string
     * which is unique per call, so it's possible to identify the last registered
     * notification. Eg. if the providing extension starts after a reboot, and the
     * last registered notification's tag is equal to "123", then it should call
     * {@link notify} for all changes which happened since the change tagged as
     * "123". It cannot be an empty string.</p><p>Not all providers are able to
     * provide a tag, but if the file system has a changelog, then the tag can be
     * eg. a change number, or a revision number.</p><p>Note that if a parent
     * directory is removed, then all descendant entries are also removed, and if
     * they are watched, then the API must be notified about the fact. Also, if a
     * directory is renamed, then all descendant entries are in fact removed, as
     * there is no entry under their original paths anymore.</p><p>In case of an
     * error, {@link runtime.lastError} will be set will a corresponding error
     * code.</p>
     * @param options
     * @param callback A generic result callback to indicate success or failure.
     */
    export function notify(
      options: NotifyOptions,
      callback?: () => void,
    ): void;

    /**
     * Raised when unmounting for the file system with the
     * <code>fileSystemId</code> identifier is requested. In the response, the
     * {@link unmount} API method must be called together with
     * <code>successCallback</code>. If unmounting is not possible (eg. due to a
     * pending operation), then <code>errorCallback</code> must be called.
     */
    export const onUnmountRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: UnmountRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when metadata of a file or a directory at <code>entryPath</code>
     * is requested. The metadata must be returned with the
     * <code>successCallback</code> call. In case of an error,
     * <code>errorCallback</code> must be called.
     */
    export const onGetMetadataRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Success callback for the {@link onGetMetadataRequested} event.
       * @param successCallback.metadata
       */
      (
        options: GetMetadataRequestedOptions,
        successCallback: (
          metadata: EntryMetadata,
        ) => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when a list of actions for a set of files or directories at
     * <code>entryPaths</code> is requested. All of the returned actions must be
     * applicable to each entry. If there are no such actions, an empty array
     * should be returned. The actions must be returned with the
     * <code>successCallback</code> call. In case of an error,
     * <code>errorCallback</code> must be called.
     */
    export const onGetActionsRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Success callback for the {@link onGetActionsRequested} event.
       * @param successCallback.actions
       */
      (
        options: GetActionsRequestedOptions,
        successCallback: (
          actions: Action[],
        ) => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when contents of a directory at <code>directoryPath</code> are
     * requested. The results must be returned in chunks by calling the
     * <code>successCallback</code> several times. In case of an error,
     * <code>errorCallback</code> must be called.
     */
    export const onReadDirectoryRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Success callback for the {@link onReadDirectoryRequested} event. If more entries will be returned, then <code>hasMore</code> must be true, and it has to be called again with additional entries. If no more entries are available, then <code>hasMore</code> must be set to false.
       * @param successCallback.entries
       * @param successCallback.hasMore
       */
      (
        options: ReadDirectoryRequestedOptions,
        successCallback: (
          entries: EntryMetadata[],
          hasMore: boolean,
        ) => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when opening a file at <code>filePath</code> is requested. If the
     * file does not exist, then the operation must fail. Maximum number of
     * files opened at once can be specified with <code>MountOptions</code>.
     */
    export const onOpenFileRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: OpenFileRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when opening a file previously opened with
     * <code>openRequestId</code> is requested to be closed.
     */
    export const onCloseFileRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: CloseFileRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when reading contents of a file opened previously with
     * <code>openRequestId</code> is requested. The results must be returned in
     * chunks by calling <code>successCallback</code> several times. In case of
     * an error, <code>errorCallback</code> must be called.
     */
    export const onReadFileRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Success callback for the {@link onReadFileRequested} event. If more data will be returned, then <code>hasMore</code> must be true, and it has to be called again with additional entries. If no more data is available, then <code>hasMore</code> must be set to false.
       * @param successCallback.data
       * @param successCallback.hasMore
       */
      (
        options: ReadFileRequestedOptions,
        successCallback: (
          data: ArrayBuffer,
          hasMore: boolean,
        ) => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when creating a directory is requested. The operation must fail
     * with the EXISTS error if the target directory already exists. If
     * <code>recursive</code> is true, then all of the missing directories on
     * the directory path must be created.
     */
    export const onCreateDirectoryRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: CreateDirectoryRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when deleting an entry is requested. If <code>recursive</code> is
     * true, and the entry is a directory, then all of the entries inside must
     * be recursively deleted as well.
     */
    export const onDeleteEntryRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: DeleteEntryRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when creating a file is requested. If the file already exists,
     * then <code>errorCallback</code> must be called with the
     * <code>"EXISTS"</code> error code.
     */
    export const onCreateFileRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: CreateFileRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when copying an entry (recursively if a directory) is requested.
     * If an error occurs, then <code>errorCallback</code> must be called.
     */
    export const onCopyEntryRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: CopyEntryRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when moving an entry (recursively if a directory) is requested. If
     * an error occurs, then <code>errorCallback</code> must be called.
     */
    export const onMoveEntryRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: MoveEntryRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when truncating a file to a desired length is requested. If an
     * error occurs, then <code>errorCallback</code> must be called.
     */
    export const onTruncateRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: TruncateRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when writing contents to a file opened previously with
     * <code>openRequestId</code> is requested.
     */
    export const onWriteFileRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: WriteFileRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when aborting an operation with <code>operationRequestId</code> is
     * requested. The operation executed with <code>operationRequestId</code>
     * must be immediately stopped and <code>successCallback</code> of this
     * abort request executed. If aborting fails, then
     * <code>errorCallback</code> must be called. Note, that callbacks of the
     * aborted operation must not be called, as they will be ignored. Despite
     * calling <code>errorCallback</code>, the request may be forcibly aborted.
     */
    export const onAbortRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: AbortRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when showing a configuration dialog for <code>fileSystemId</code>
     * is requested. If it's handled, the
     * <code>file_system_provider.configurable</code> manfiest option must be
     * set to true.
     */
    export const onConfigureRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: ConfigureRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when showing a dialog for mounting a new file system is requested.
     * If the extension/app is a file handler, then this event shouldn't be
     * handled. Instead <code>app.runtime.onLaunched</code> should be handled in
     * order to mount new file systems when a file is opened. For multiple
     * mounts, the <code>file_system_provider.multiple_mounts</code> manifest
     * option must be set to true.
     */
    export const onMountRequested: chrome.events.Event<
      /**
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when setting a new directory watcher is requested. If an error
     * occurs, then <code>errorCallback</code> must be called.
     */
    export const onAddWatcherRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: AddWatcherRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when the watcher should be removed. If an error occurs, then
     * <code>errorCallback</code> must be called.
     */
    export const onRemoveWatcherRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: RemoveWatcherRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;

    /**
     * Raised when executing an action for a set of files or directories is\
     * requested. After the action is completed, <code>successCallback</code>
     * must be called. On error, <code>errorCallback</code> must be called.
     */
    export const onExecuteActionRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Callback to be called by the providing extension in case of a success.
       */
      (
        options: ExecuteActionRequestedOptions,
        successCallback: () => void,
        errorCallback: (
          error: ProviderError,
        ) => void,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.fontSettings</code> API to manage Chrome's font
   * settings.
   * @chrome-permission fontSettings
 */
  export namespace fontSettings {
    /**
     * Represents a font name.
     */
    export interface FontName {
      /**
       * The font ID.
       */
      fontId: string;

      /**
       * The display name of the font.
       */
      displayName: string;
    }

    /**
     * An ISO 15924 script code. The default, or global, script is represented by
     * script code "Zyyy".
     */
    export type ScriptCode = "Afak" | "Arab" | "Armi" | "Armn" | "Avst" | "Bali" | "Bamu" | "Bass" | "Batk" | "Beng" | "Blis" | "Bopo" | "Brah" | "Brai" | "Bugi" | "Buhd" | "Cakm" | "Cans" | "Cari" | "Cham" | "Cher" | "Cirt" | "Copt" | "Cprt" | "Cyrl" | "Cyrs" | "Deva" | "Dsrt" | "Dupl" | "Egyd" | "Egyh" | "Egyp" | "Elba" | "Ethi" | "Geor" | "Geok" | "Glag" | "Goth" | "Gran" | "Grek" | "Gujr" | "Guru" | "Hang" | "Hani" | "Hano" | "Hans" | "Hant" | "Hebr" | "Hluw" | "Hmng" | "Hung" | "Inds" | "Ital" | "Java" | "Jpan" | "Jurc" | "Kali" | "Khar" | "Khmr" | "Khoj" | "Knda" | "Kpel" | "Kthi" | "Lana" | "Laoo" | "Latf" | "Latg" | "Latn" | "Lepc" | "Limb" | "Lina" | "Linb" | "Lisu" | "Loma" | "Lyci" | "Lydi" | "Mand" | "Mani" | "Maya" | "Mend" | "Merc" | "Mero" | "Mlym" | "Moon" | "Mong" | "Mroo" | "Mtei" | "Mymr" | "Narb" | "Nbat" | "Nkgb" | "Nkoo" | "Nshu" | "Ogam" | "Olck" | "Orkh" | "Orya" | "Osma" | "Palm" | "Perm" | "Phag" | "Phli" | "Phlp" | "Phlv" | "Phnx" | "Plrd" | "Prti" | "Rjng" | "Roro" | "Runr" | "Samr" | "Sara" | "Sarb" | "Saur" | "Sgnw" | "Shaw" | "Shrd" | "Sind" | "Sinh" | "Sora" | "Sund" | "Sylo" | "Syrc" | "Syre" | "Syrj" | "Syrn" | "Tagb" | "Takr" | "Tale" | "Talu" | "Taml" | "Tang" | "Tavt" | "Telu" | "Teng" | "Tfng" | "Tglg" | "Thaa" | "Thai" | "Tibt" | "Tirh" | "Ugar" | "Vaii" | "Visp" | "Wara" | "Wole" | "Xpeo" | "Xsux" | "Yiii" | "Zmth" | "Zsym" | "Zyyy";

    /**
     * A CSS generic font family.
     */
    export type GenericFamily = "standard" | "sansserif" | "serif" | "fixed" | "cursive" | "fantasy";

    /**
     * One of<br><var>not_controllable</var>: cannot be controlled by any
     * extension<br><var>controlled_by_other_extensions</var>: controlled by
     * extensions with higher
     * precedence<br><var>controllable_by_this_extension</var>: can be controlled by
     * this extension<br><var>controlled_by_this_extension</var>: controlled by this
     * extension
     */
    export type LevelOfControl = "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension";

    /**
     * Clears the font set by this extension, if any.
     * @param details
     * @param callback
     */
    export function clearFont(
      details: {
        /**
         * The script for which the font should be cleared. If omitted, the global
         * script font setting is cleared.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be cleared.
         */
        genericFamily: GenericFamily,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the font for a given script and generic font family.
     * @param details
     * @param callback
     * @param callback.details
     */
    export function getFont(
      details: {
        /**
         * The script for which the font should be retrieved. If omitted, the font
         * setting for the global script (script code "Zyyy") is retrieved.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be retrieved.
         */
        genericFamily: GenericFamily,
      },
      callback?: (
        details: {
          /**
           * The font ID. Rather than the literal font ID preference value, this may be
           * the ID of the font that the system resolves the preference value to. So,
           * <var>fontId</var> can differ from the font passed to <code>setFont</code>,
           * if, for example, the font is not available on the system. The empty string
           * signifies fallback to the global script font setting.
           */
          fontId: string,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;

    /**
     * Sets the font for a given script and generic font family.
     * @param details
     * @param callback
     */
    export function setFont(
      details: {
        /**
         * The script code which the font should be set. If omitted, the font setting
         * for the global script (script code "Zyyy") is set.
         */
        script?: ScriptCode,

        /**
         * The generic font family for which the font should be set.
         */
        genericFamily: GenericFamily,

        /**
         * The font ID. The empty string means to fallback to the global script font
         * setting.
         */
        fontId: string,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets a list of fonts on the system.
     * @param callback
     * @param callback.results
     */
    export function getFontList(
      callback: (
        results: FontName[],
      ) => void,
    ): void;

    /**
     * Clears the default font size set by this extension, if any.
     * @param details This parameter is currently unused.
     * @param callback
     */
    export function clearDefaultFontSize(
      details?: object,
      callback?: () => void,
    ): void;

    /**
     * Gets the default font size.
     * @param details This parameter is currently unused.
     * @param callback
     * @param callback.details
     */
    export function getDefaultFontSize(
      details?: object,
      callback?: (
        details: {
          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;

    /**
     * Sets the default font size.
     * @param details
     * @param callback
     */
    export function setDefaultFontSize(
      details: {
        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Clears the default fixed font size set by this extension, if any.
     * @param details This parameter is currently unused.
     * @param callback
     */
    export function clearDefaultFixedFontSize(
      details?: object,
      callback?: () => void,
    ): void;

    /**
     * Gets the default size for fixed width fonts.
     * @param details This parameter is currently unused.
     * @param callback
     * @param callback.details
     */
    export function getDefaultFixedFontSize(
      details?: object,
      callback?: (
        details: {
          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;

    /**
     * Sets the default size for fixed width fonts.
     * @param details
     * @param callback
     */
    export function setDefaultFixedFontSize(
      details: {
        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Clears the minimum font size set by this extension, if any.
     * @param details This parameter is currently unused.
     * @param callback
     */
    export function clearMinimumFontSize(
      details?: object,
      callback?: () => void,
    ): void;

    /**
     * Gets the minimum font size.
     * @param details This parameter is currently unused.
     * @param callback
     * @param callback.details
     */
    export function getMinimumFontSize(
      details?: object,
      callback?: (
        details: {
          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void,
    ): void;

    /**
     * Sets the minimum font size.
     * @param details
     * @param callback
     */
    export function setMinimumFontSize(
      details: {
        /**
         * The font size in pixels.
         */
        pixelSize: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Fired when a font setting changes.
     */
    export const onFontChanged: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The font ID. See the description in <code>getFont</code>.
           */
          fontId: string,

          /**
           * The script code for which the font setting has changed.
           */
          script?: ScriptCode,

          /**
           * The generic font family for which the font setting has changed.
           */
          genericFamily: GenericFamily,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void
    >;

    /**
     * Fired when the default font size setting changes.
     */
    export const onDefaultFontSizeChanged: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void
    >;

    /**
     * Fired when the default fixed font size setting changes.
     */
    export const onDefaultFixedFontSizeChanged: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void
    >;

    /**
     * Fired when the minimum font size setting changes.
     */
    export const onMinimumFontSizeChanged: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The font size in pixels.
           */
          pixelSize: number,

          /**
           * The level of control this extension has over the setting.
           */
          levelOfControl: LevelOfControl,
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use <code>chrome.gcm</code> to enable apps and extensions to send and receive
   * messages through the <a
   * href='http://developer.android.com/google/gcm/'>Google Cloud Messaging
   * Service</a>.
   * @chrome-permission gcm
 */
  export namespace gcm {
    /**
     * The maximum size (in bytes) of all key/value pairs in a message.
     */
    export const MAX_MESSAGE_SIZE: number;

    /**
     * Registers the application with GCM. The registration ID will be returned by
     * the <code>callback</code>. If <code>register</code> is called again with the
     * same list of <code>senderIds</code>, the same registration ID will be
     * returned.
     * @param senderIds A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs.
     * @param callback Function called when registration completes. It should check {@link runtime.lastError} for error when <code>registrationId</code> is empty.
     * @param callback.registrationId A registration ID assigned to the application by the GCM.
     */
    export function register(
      senderIds: [string] & string[],
      callback: (
        registrationId: string,
      ) => void,
    ): void;

    /**
     * Unregisters the application from GCM.
     * @param callback A function called after the unregistration completes. Unregistration was successful if {@link runtime.lastError} is not set.
     */
    export function unregister(
      callback: () => void,
    ): void;

    /**
     * Sends a message according to its contents.
     * @param message A message to send to the other party via GCM.
     * @param callback A function called after the message is successfully queued for sending. {@link runtime.lastError} should be checked, to ensure a message was sent without problems.
     * @param callback.messageId The ID of the message that the callback was issued for.
     */
    export function send(
      message: {
        /**
         * The ID of the server to send the message to as assigned by <a
         * href='https://code.google.com/apis/console'>Google API Console</a>.
         */
        destinationId: string,

        /**
         * The ID of the message. It must be unique for each message in scope of the
         * applications. See the <a href='cloudMessaging#send_messages'>Cloud Messaging
         * documentation</a> for advice for picking and handling an ID.
         */
        messageId: string,

        /**
         * Time-to-live of the message in seconds. If it is not possible to send the
         * message within that time, an onSendError event will be raised. A time-to-live
         * of 0 indicates that the message should be sent immediately or fail if it's
         * not possible. The maximum and a default value of time-to-live is 86400
         * seconds (1 day).
         */
        timeToLive?: number,

        /**
         * Message data to send to the server. Case-insensitive <code>goog.</code> and
         * <code>google</code>, as well as case-sensitive <code>collapse_key</code> are
         * disallowed as key prefixes. Sum of all key/value pairs should not exceed
         * {@link gcm.MAX_MESSAGE_SIZE}.
         */
        data: {[name: string]: string},
      },
      callback: (
        messageId: string,
      ) => void,
    ): void;

    /**
     * Fired when a message is received through GCM.
     */
    export const onMessage: chrome.events.Event<
      /**
       * @param message A message received from another party via GCM.
       */
      (
        message: {
          /**
           * The message data.
           */
          data: {[name: string]: string},

          /**
           * The sender who issued the message.
           */
          from?: string,

          /**
           * The collapse key of a message. See <a
           * href='cloudMessaging#collapsible_messages'>Collapsible Messages</a> section
           * of Cloud Messaging documentation for details.
           */
          collapseKey?: string,
        },
      ) => void
    >;

    /**
     * Fired when a GCM server had to delete messages sent by an app server to
     * the application. See <a
     * href='cloudMessaging#messages_deleted_event'>Messages deleted event</a>
     * section of Cloud Messaging documentation for details on handling this
     * event.
     */
    export const onMessagesDeleted: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when it was not possible to send a message to the GCM server.
     */
    export const onSendError: chrome.events.Event<
      /**
       * @param error An error that occured while trying to send the message either in Chrome or on the GCM server. Application can retry sending the message with a reasonable backoff and possibly longer time-to-live.
       */
      (
        error: {
          /**
           * The error message describing the problem.
           */
          errorMessage: string,

          /**
           * The ID of the message with this error, if error is related to a specific
           * message.
           */
          messageId?: string,

          /**
           * Additional details related to the error, when available.
           */
          details: {[name: string]: string},
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.history</code> API to interact with the browser's record
   * of visited pages. You can add, remove, and query for URLs in the browser's
   * history. To override the history page with your own version, see <a
   * href='override'>Override Pages</a>.
   * @chrome-permission history
 */
  export namespace history {
    /**
     * The <a href='#transition_types'>transition type</a> for this visit from its
     * referrer.
     */
    export type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "auto_toplevel" | "form_submit" | "reload" | "keyword" | "keyword_generated";

    /**
     * An object encapsulating one result of a history query.
     */
    export interface HistoryItem {
      /**
       * The unique identifier for the item.
       */
      id: string;

      /**
       * The URL navigated to by a user.
       */
      url?: string;

      /**
       * The title of the page when it was last loaded.
       */
      title?: string;

      /**
       * When this page was last loaded, represented in milliseconds since the epoch.
       */
      lastVisitTime?: number;

      /**
       * The number of times the user has navigated to this page.
       */
      visitCount?: number;

      /**
       * The number of times the user has navigated to this page by typing in the
       * address.
       */
      typedCount?: number;
    }

    /**
     * An object encapsulating one visit to a URL.
     */
    export interface VisitItem {
      /**
       * The unique identifier for the item.
       */
      id: string;

      /**
       * The unique identifier for this visit.
       */
      visitId: string;

      /**
       * When this visit occurred, represented in milliseconds since the epoch.
       */
      visitTime?: number;

      /**
       * The visit ID of the referrer.
       */
      referringVisitId: string;

      /**
       * The <a href='#transition_types'>transition type</a> for this visit from its
       * referrer.
       */
      transition: TransitionType;
    }

    /**
     * Searches the history for the last visit time of each page matching the query.
     * @param query
     * @param callback
     * @param callback.results
     */
    export function search(
      query: {
        /**
         * A free-text query to the history service.  Leave empty to retrieve all pages.
         */
        text: string,

        /**
         * Limit results to those visited after this date, represented in milliseconds
         * since the epoch. If not specified, this defaults to 24 hours in the past.
         */
        startTime?: number,

        /**
         * Limit results to those visited before this date, represented in milliseconds
         * since the epoch.
         */
        endTime?: number,

        /**
         * The maximum number of results to retrieve.  Defaults to 100.
         */
        maxResults?: number,
      },
      callback: (
        results: HistoryItem[],
      ) => void,
    ): void;

    /**
     * Retrieves information about visits to a URL.
     * @param details
     * @param callback
     * @param callback.results
     */
    export function getVisits(
      details: {
        /**
         * The URL for which to retrieve visit information.  It must be in the format as
         * returned from a call to history.search.
         */
        url: string,
      },
      callback: (
        results: VisitItem[],
      ) => void,
    ): void;

    /**
     * Adds a URL to the history at the current time with a <a
     * href='#transition_types'>transition type</a> of "link".
     * @param details
     * @param callback
     */
    export function addUrl(
      details: {
        /**
         * The URL to add.
         */
        url: string,
      },
      callback?: () => void,
    ): void;

    /**
     * Removes all occurrences of the given URL from the history.
     * @param details
     * @param callback
     */
    export function deleteUrl(
      details: {
        /**
         * The URL to remove.
         */
        url: string,
      },
      callback?: () => void,
    ): void;

    /**
     * Removes all items within the specified date range from the history.  Pages
     * will not be removed from the history unless all visits fall within the range.
     * @param range
     * @param callback
     */
    export function deleteRange(
      range: {
        /**
         * Items added to history after this date, represented in milliseconds since the
         * epoch.
         */
        startTime: number,

        /**
         * Items added to history before this date, represented in milliseconds since
         * the epoch.
         */
        endTime: number,
      },
      callback: () => void,
    ): void;

    /**
     * Deletes all items from the history.
     * @param callback
     */
    export function deleteAll(
      callback: () => void,
    ): void;

    /**
     * Fired when a URL is visited, providing the HistoryItem data for that URL.
     * This event fires before the page has loaded.
     */
    export const onVisited: chrome.events.Event<
      /**
       * @param result
       */
      (
        result: HistoryItem,
      ) => void
    >;

    /**
     * Fired when one or more URLs are removed from the history service.  When
     * all visits have been removed the URL is purged from history.
     */
    export const onVisitRemoved: chrome.events.Event<
      /**
       * @param removed
       */
      (
        removed: {
          /**
           * True if all history was removed.  If true, then urls will be empty.
           */
          allHistory: boolean,
          urls?: string[],
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.i18n</code> infrastructure to implement
   * internationalization across your whole app or extension.
   */
  export namespace i18n {
    /**
     * An ISO language code such as <code>en</code> or <code>fr</code>. For a
     * complete list of languages supported by this method, see <a
     * href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. For an unknown language, <code>und</code> will be returned, which means that [percentage] of the text is unknown to CLD
     */
    export type LanguageCode = string;

    /**
     * Gets the accept-languages of the browser. This is different from the locale
     * used by the browser; to get the locale, use {@link i18n.getUILanguage}.
     * @param callback
     * @param callback.languages Array of LanguageCode
     */
    export function getAcceptLanguages(
      callback: (
        languages: LanguageCode[],
      ) => void,
    ): void;

    /**
     * Gets the localized string for the specified message. If the message is
     * missing, this method returns an empty string (''). If the format of the
     * <code>getMessage()</code> call is wrong &mdash; for example,
     * <em>messageName</em> is not a string or the <em>substitutions</em> array has
     * more than 9 elements &mdash; this method returns <code>undefined</code>.
     * @param messageName The name of the message, as specified in the <a href='i18n-messages'><code>messages.json</code></a> file.
     * @param substitutions Up to 9 substitution strings, if the message requires any.
     * @returns Message localized for current locale.
     */
    export function getMessage(
      messageName: string,
      substitutions?: any,
    ): string;

    /**
     * Gets the browser UI language of the browser. This is different from {@link
     * i18n.getAcceptLanguages} which returns the preferred user languages.
     * @returns The browser UI language code such as en-US or fr-FR.
     */
    export function getUILanguage(): string;

    /**
     * Detects the language of the provided text using CLD.
     * @param text User input string to be translated.
     * @param callback
     * @param callback.result LanguageDetectionResult object that holds detected langugae reliability and array of DetectedLanguage
     */
    export function detectLanguage(
      text: string,
      callback: (
        result: {
          /**
           * CLD detected language reliability
           */
          isReliable: boolean,

          /**
           * array of detectedLanguage
           */
          languages: {
            language: LanguageCode,

            /**
             * The percentage of the detected language
             */
            percentage: number,
          }[],
        },
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.identity</code> API to get OAuth2 access tokens.
   * @chrome-permission identity
 */
  export namespace identity {
    export interface AccountInfo {
      /**
       * A unique identifier for the account. This ID will not change for the lifetime
       * of the account.
       */
      id: string;
    }

    export interface ProfileUserInfo {
      /**
       * An email address for the user account signed into the current profile. Empty
       * if the user is not signed in or the <code>identity.email</code> manifest
       * permission is not specified.
       */
      email: string;

      /**
       * A unique identifier for the account. This ID will not change for the lifetime
       * of the account. Empty if the user is not signed in or (in M41+) the
       * <code>identity.email</code> manifest permission is not specified.
       */
      id: string;
    }

    export interface TokenDetails {
      /**
       * Fetching a token may require the user to sign-in to Chrome, or approve the
       * application's requested scopes. If the interactive flag is <code>true</code>,
       * <code>getAuthToken</code> will prompt the user as necessary. When the flag is
       * <code>false</code> or omitted, <code>getAuthToken</code> will return failure
       * any time a prompt would be required.
       */
      interactive?: boolean;

      /**
       * <p>The account ID whose token should be returned. If not specified, the
       * primary account for the profile will be used.</p><p><code>account</code> is
       * only supported when the "enable-new-profile-management" flag is set.</p>
       */
      account?: AccountInfo;

      /**
       * <p>A list of OAuth2 scopes to request.</p><p>When the <code>scopes</code>
       * field is present, it overrides the list of scopes specified in
       * manifest.json.</p>
       */
      scopes?: string[];
    }

    export interface InvalidTokenDetails {
      /**
       * The specific token that should be removed from the cache.
       */
      token: string;
    }

    export interface WebAuthFlowDetails {
      /**
       * The URL that initiates the auth flow.
       */
      url: string;

      /**
       * <p>Whether to launch auth flow in interactive mode.</p><p>Since some auth
       * flows may immediately redirect to a result URL,
       * <code>launchWebAuthFlow</code> hides its web view until the first navigation
       * either redirects to the final URL, or finishes loading a page meant to be
       * displayed.</p><p>If the interactive flag is <code>true</code>, the window
       * will be displayed when a page load completes. If the flag is
       * <code>false</code> or omitted, <code>launchWebAuthFlow</code> will return
       * with an error if the initial navigation does not complete the flow.</p>
       */
      interactive?: boolean;
    }

    /**
     * <p>Retrieves a list of AccountInfo objects describing the accounts present on
     * the profile.</p><p><code>getAccounts</code> is only supported on dev
     * channel.</p>
     * @param callback
     * @param callback.accounts
     */
    export function getAccounts(
      callback: (
        accounts: AccountInfo[],
      ) => void,
    ): void;

    /**
     * <p>Gets an OAuth2 access token using the client ID and scopes specified in
     * the <a href="app_identity.html#update_manifest"><code>oauth2</code> section
     * of manifest.json</a>.</p><p>The Identity API caches access tokens in memory,
     * so it's ok to call <code>getAuthToken</code> non-interactively any time a
     * token is required. The token cache automatically handles
     * expiration.</p><p>For a good user experience it is important interactive
     * token requests are initiated by UI in your app explaining what the
     * authorization is for. Failing to do this will cause your users to get
     * authorization requests, or Chrome sign in screens if they are not signed in,
     * with with no context. In particular, do not use <code>getAuthToken</code>
     * interactively when your app is first launched.</p>
     * @param details Token options.
     * @param callback Called with an OAuth2 access token as specified by the manifest, or undefined if there was an error.
     * @param callback.token
     */
    export function getAuthToken(
      details?: TokenDetails,
      callback?: (
        token?: string,
      ) => void,
    ): void;

    /**
     * <p>Retrieves email address and obfuscated gaia id of the user signed into a
     * profile.</p><p>This API is different from identity.getAccounts in two ways.
     * The information returned is available offline, and it only applies to the
     * primary account for the profile.</p>
     * @param callback
     * @param callback.userInfo
     */
    export function getProfileUserInfo(
      callback: (
        userInfo: ProfileUserInfo,
      ) => void,
    ): void;

    /**
     * <p>Removes an OAuth2 access token from the Identity API's token
     * cache.</p><p>If an access token is discovered to be invalid, it should be
     * passed to removeCachedAuthToken to remove it from the cache. The app may then
     * retrieve a fresh token with <code>getAuthToken</code>.</p>
     * @param details Token information.
     * @param callback Called when the token has been removed from the cache.
     */
    export function removeCachedAuthToken(
      details: InvalidTokenDetails,
      callback?: () => void,
    ): void;

    /**
     * <p>Starts an auth flow at the specified URL.</p><p>This method enables auth
     * flows with non-Google identity providers by launching a web view and
     * navigating it to the first URL in the provider's auth flow. When the provider
     * redirects to a URL matching the pattern
     * <code>https://&lt;app-id&gt;.chromiumapp.org/*</code>, the window will close,
     * and the final redirect URL will be passed to the <var>callback</var>
     * function.</p><p>For a good user experience it is important interactive auth
     * flows are initiated by UI in your app explaining what the authorization is
     * for. Failing to do this will cause your users to get authorization requests
     * with no context. In particular, do not launch an interactive auth flow when
     * your app is first launched.</p>
     * @param details WebAuth flow options.
     * @param callback Called with the URL redirected back to your application.
     * @param callback.responseUrl
     */
    export function launchWebAuthFlow(
      details: WebAuthFlowDetails,
      callback: (
        responseUrl?: string,
      ) => void,
    ): void;

    /**
     * <p>Generates a redirect URL to be used in |launchWebAuthFlow|.</p><p>The
     * generated URLs match the pattern
     * <code>https://&lt;app-id&gt;.chromiumapp.org/*</code>.</p>
     * @param path The path appended to the end of the generated URL.
     */
    export function getRedirectURL(
      path?: string,
    ): string;

    /**
     * Fired when signin state changes for an account on the user's profile.
     */
    export const onSignInChanged: chrome.events.Event<
      /**
       * @param account
       * @param signedIn
       */
      (
        account: AccountInfo,
        signedIn: boolean,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.idle</code> API to detect when the machine's idle state
   * changes.
   * @chrome-permission idle
 */
  export namespace idle {
    export type IdleState = "active" | "idle" | "locked";

    /**
     * Returns "locked" if the system is locked, "idle" if the user has not
     * generated any input for a specified number of seconds, or "active" otherwise.
     * @param detectionIntervalInSeconds The system is considered idle if detectionIntervalInSeconds seconds have elapsed since the last user input detected.
     * @param callback
     * @param callback.newState
     */
    export function queryState(
      detectionIntervalInSeconds: number,
      callback: (
        newState: IdleState,
      ) => void,
    ): void;

    /**
     * Sets the interval, in seconds, used to determine when the system is in an
     * idle state for onStateChanged events. The default interval is 60 seconds.
     * @param intervalInSeconds Threshold, in seconds, used to determine when the system is in an idle state.
     */
    export function setDetectionInterval(
      intervalInSeconds: number,
    ): void;

    /**
     * Gets the time, in seconds, it takes until the screen is locked automatically
     * while idle. Returns a zero duration if the screen is never locked
     * automatically. Currently supported on Chrome OS only.
     * @param callback
     * @param callback.delay Time, in seconds, until the screen is locked automatically while idle. This is zero if the screen never locks automatically.
     */
    export function getAutoLockDelay(
      callback: (
        delay: number,
      ) => void,
    ): void;

    /**
     * Fired when the system changes to an active, idle or locked state. The
     * event fires with "locked" if the screen is locked or the screensaver
     * activates, "idle" if the system is unlocked and the user has not
     * generated any input for a specified number of seconds, and "active" when
     * the user generates input on an idle system.
     */
    export const onStateChanged: chrome.events.Event<
      /**
       * @param newState
       */
      (
        newState: IdleState,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.input.ime</code> API to implement a custom IME for
   * Chrome OS. This allows your extension to handle keystrokes, set the
   * composition, and manage the candidate window.
   * @chrome-platform chromeos
 * @chrome-platform win
 * @chrome-platform linux
 * @chrome-permission input
 */
  export namespace input.ime {
    export type KeyboardEventType = "keyup" | "keydown";

    /**
     * See http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent
     */
    export interface KeyboardEvent {
      /**
       * One of keyup or keydown.
       */
      type: KeyboardEventType;

      /**
       * The ID of the request.
       */
      requestId: string;

      /**
       * The extension ID of the sender of this keyevent.
       */
      extensionId?: string;

      /**
       * Value of the key being pressed
       */
      key: string;

      /**
       * Value of the physical key being pressed. The value is not affected by current
       * keyboard layout or modifier state.
       */
      code: string;

      /**
       * The deprecated HTML keyCode, which is system- and implementation-dependent
       * numerical code signifying the unmodified identifier associated with the key
       * pressed.
       */
      keyCode?: number;

      /**
       * Whether or not the ALT key is pressed.
       */
      altKey?: boolean;

      /**
       * Whether or not the CTRL key is pressed.
       */
      ctrlKey?: boolean;

      /**
       * Whether or not the SHIFT key is pressed.
       */
      shiftKey?: boolean;

      /**
       * Whether or not the CAPS_LOCK is enabled.
       */
      capsLock?: boolean;
    }

    /**
     * Type of value this text field edits, (Text, Number, URL, etc)
     */
    export type InputContextType = "text" | "search" | "tel" | "url" | "email" | "number" | "password";

    /**
     * The auto-capitalize type of the text field.
     */
    export type AutoCapitalizeType = "characters" | "words" | "sentences";

    /**
     * Describes an input Context
     */
    export interface InputContext {
      /**
       * This is used to specify targets of text field operations.  This ID becomes
       * invalid as soon as onBlur is called.
       */
      contextID: number;

      /**
       * Type of value this text field edits, (Text, Number, URL, etc)
       */
      type: InputContextType;

      /**
       * Whether the text field wants auto-correct.
       */
      autoCorrect: boolean;

      /**
       * Whether the text field wants auto-complete.
       */
      autoComplete: boolean;

      /**
       * The auto-capitalize type of the text field.
       */
      autoCapitalize: AutoCapitalizeType;

      /**
       * Whether the text field wants spell-check.
       */
      spellCheck: boolean;

      /**
       * Whether text entered into the text field should be used to improve typing
       * suggestions for the user.
       */
      shouldDoLearning: boolean;
    }

    /**
     * The type of menu item. Radio buttons between separators are considered
     * grouped.
     */
    export type MenuItemStyle = "check" | "radio" | "separator";

    /**
     * A menu item used by an input method to interact with the user from the
     * language menu.
     */
    export interface MenuItem {
      /**
       * String that will be passed to callbacks referencing this MenuItem.
       */
      id: string;

      /**
       * Text displayed in the menu for this item.
       */
      label?: string;

      /**
       * The type of menu item.
       */
      style?: MenuItemStyle;

      /**
       * Indicates this item is visible.
       */
      visible?: boolean;

      /**
       * Indicates this item should be drawn with a check.
       */
      checked?: boolean;

      /**
       * Indicates this item is enabled.
       */
      enabled?: boolean;
    }

    /**
     * The type of the underline to modify this segment.
     */
    export type UnderlineStyle = "underline" | "doubleUnderline" | "noUnderline";

    /**
     * Where to display the candidate window. If set to 'cursor', the window follows
     * the cursor. If set to 'composition', the window is locked to the beginning of
     * the composition.
     */
    export type WindowPosition = "cursor" | "composition";

    /**
     * The screen type under which the IME is activated.
     */
    export type ScreenType = "normal" | "login" | "lock" | "secondary-login";

    /**
     * Which mouse buttons was clicked.
     */
    export type MouseButton = "left" | "middle" | "right";

    /**
     * The IME window types.
     */
    export type WindowType = "normal" | "followCursor";

    /**
     * Describes the screen coordinates of a rect.
     */
    export interface Bounds {
      /**
       * The left of the bounds.
       */
      left: number;

      /**
       * The top of the bounds.
       */
      top: number;

      /**
       * The width of the bounds.
       */
      width: number;

      /**
       * The height of the bounds .
       */
      height: number;
    }

    /**
     * The options to create an IME window
     */
    export interface CreateWindowOptions {
      windowType: WindowType;

      url?: string;

      bounds?: Bounds;
    }

    /**
     * Set the current composition. If this extension does not own the active IME,
     * this fails.
     * @param parameters
     * @param callback Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.
     * @param callback.success
     */
    export function setComposition(
      parameters: {
        /**
         * ID of the context where the composition text will be set
         */
        contextID: number,

        /**
         * Text to set
         */
        text: string,

        /**
         * Position in the text that the selection starts at.
         */
        selectionStart?: number,

        /**
         * Position in the text that the selection ends at.
         */
        selectionEnd?: number,

        /**
         * Position in the text of the cursor.
         */
        cursor: number,

        /**
         * List of segments and their associated types.
         */
        segments?: {
          /**
           * Index of the character to start this segment at
           */
          start: number,

          /**
           * Index of the character to end this segment after.
           */
          end: number,

          /**
           * The type of the underline to modify this segment.
           */
          style: UnderlineStyle,
        }[],
      },
      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Clear the current composition. If this extension does not own the active IME,
     * this fails.
     * @param parameters
     * @param callback Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.
     * @param callback.success
     */
    export function clearComposition(
      parameters: {
        /**
         * ID of the context where the composition will be cleared
         */
        contextID: number,
      },
      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Commits the provided text to the current input.
     * @param parameters
     * @param callback Called when the operation completes with a boolean indicating if the text was accepted or not. On failure, chrome.runtime.lastError is set.
     * @param callback.success
     */
    export function commitText(
      parameters: {
        /**
         * ID of the context where the text will be committed
         */
        contextID: number,

        /**
         * The text to commit
         */
        text: string,
      },
      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Sends the key events.  This function is expected to be used by virtual
     * keyboards.  When key(s) on a virtual keyboard is pressed by a user, this
     * function is used to propagate that event to the system.
     * @param parameters
     * @param callback Called when the operation completes.
     */
    export function sendKeyEvents(
      parameters: {
        /**
         * ID of the context where the key events will be sent, or zero to send key
         * events to non-input field.
         */
        contextID: number,

        /**
         * Data on the key event.
         */
        keyData: KeyboardEvent[],
      },
      callback?: () => void,
    ): void;

    /**
     * Hides the input view window, which is popped up automatically by system. If
     * the input view window is already hidden, this function will do nothing.
     */
    export function hideInputView(): void;

    /**
     * Sets the properties of the candidate window. This fails if the extension
     * doesn't own the active IME
     * @param parameters
     * @param callback Called when the operation completes.
     * @param callback.success
     */
    export function setCandidateWindowProperties(
      parameters: {
        /**
         * ID of the engine to set properties on.
         */
        engineID: string,
        properties: {
          /**
           * True to show the Candidate window, false to hide it.
           */
          visible?: boolean,

          /**
           * True to show the cursor, false to hide it.
           */
          cursorVisible?: boolean,

          /**
           * True if the candidate window should be rendered vertical, false to make it
           * horizontal.
           */
          vertical?: boolean,

          /**
           * The number of candidates to display per page.
           */
          pageSize?: number,

          /**
           * Text that is shown at the bottom of the candidate window.
           */
          auxiliaryText?: string,

          /**
           * True to display the auxiliary text, false to hide it.
           */
          auxiliaryTextVisible?: boolean,

          /**
           * Where to display the candidate window.
           */
          windowPosition?: WindowPosition,
        },
      },
      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Sets the current candidate list. This fails if this extension doesn't own the
     * active IME
     * @param parameters
     * @param callback Called when the operation completes.
     * @param callback.success
     */
    export function setCandidates(
      parameters: {
        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * List of candidates to show in the candidate window
         */
        candidates: {
          /**
           * The candidate
           */
          candidate: string,

          /**
           * The candidate's id
           */
          id: number,

          /**
           * The id to add these candidates under
           */
          parentId?: number,

          /**
           * Short string displayed to next to the candidate, often the shortcut key or
           * index
           */
          label?: string,

          /**
           * Additional text describing the candidate
           */
          annotation?: string,

          /**
           * The usage or detail description of word.
           */
          usage?: {
            /**
             * The title string of details description.
             */
            title: string,

            /**
             * The body string of detail description.
             */
            body: string,
          },
        }[],
      },
      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Set the position of the cursor in the candidate window. This is a no-op if
     * this extension does not own the active IME.
     * @param parameters
     * @param callback Called when the operation completes
     * @param callback.success
     */
    export function setCursorPosition(
      parameters: {
        /**
         * ID of the context that owns the candidate window.
         */
        contextID: number,

        /**
         * ID of the candidate to select.
         */
        candidateID: number,
      },
      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Adds the provided menu items to the language menu when this IME is active.
     * @param parameters
     * @param callback
     */
    export function setMenuItems(
      parameters: {
        /**
         * ID of the engine to use
         */
        engineID: string,

        /**
         * MenuItems to add. They will be added in the order they exist in the array.
         */
        items: MenuItem[],
      },
      callback?: () => void,
    ): void;

    /**
     * Updates the state of the MenuItems specified
     * @param parameters
     * @param callback Called when the operation completes
     */
    export function updateMenuItems(
      parameters: {
        /**
         * ID of the engine to use
         */
        engineID: string,

        /**
         * Array of MenuItems to update
         */
        items: MenuItem[],
      },
      callback?: () => void,
    ): void;

    /**
     * Deletes the text around the caret.
     * @param parameters
     * @param callback Called when the operation completes.
     */
    export function deleteSurroundingText(
      parameters: {
        /**
         * ID of the engine receiving the event.
         */
        engineID: string,

        /**
         * ID of the context where the surrounding text will be deleted.
         */
        contextID: number,

        /**
         * The offset from the caret position where deletion will start. This value can
         * be negative.
         */
        offset: number,

        /**
         * The number of characters to be deleted
         */
        length: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Indicates that the key event received by onKeyEvent is handled.  This should
     * only be called if the onKeyEvent listener is asynchronous.
     * @param requestId Request id of the event that was handled.  This should come from keyEvent.requestId
     * @param response True if the keystroke was handled, false if not
     */
    export function keyEventHandled(
      requestId: string,
      response: boolean,
    ): void;

    /**
     * Creates IME window.
     * @param options The options of the newly created IME window.
     * @param callback Called when the operation completes.
     * @param callback.windowObject The JavaScript 'window' object of the newly created IME window. It contains the additional 'id' property for the parameters of the other functions like showWindow/hideWindow.
     */
    export function createWindow(
      options: CreateWindowOptions,
      callback: (
        windowObject: Window,
      ) => void,
    ): void;

    /**
     * Shows the IME window. This makes the hidden window visible.
     * @param windowId The ID of the IME window.
     * @param callback Called when the operation completes.
     */
    export function showWindow(
      windowId: number,
      callback?: () => void,
    ): void;

    /**
     * Hides the IME window. This doesn't close the window. Instead, it makes the
     * window invisible. The extension can cache the window and show/hide it for
     * better performance.
     * @param windowId The ID of the IME window.
     * @param callback Called when the operation completes.
     */
    export function hideWindow(
      windowId: number,
      callback?: () => void,
    ): void;

    /**
     * Activates the IME extension so that it can receive events.
     * @param callback Called when the operation completes.
     */
    export function activate(
      callback?: () => void,
    ): void;

    /**
     * Deactivates the IME extension so that it cannot receive events.
     * @param callback Called when the operation completes.
     */
    export function deactivate(
      callback?: () => void,
    ): void;

    /**
     * This event is sent when an IME is activated. It signals that the IME will
     * be receiving onKeyPress events.
     */
    export const onActivate: chrome.events.Event<
      /**
       * @param engineID ID of the engine receiving the event
       * @param screen The screen type under which the IME is activated.
       */
      (
        engineID: string,
        screen: ScreenType,
      ) => void
    >;

    /**
     * This event is sent when an IME is deactivated. It signals that the IME
     * will no longer be receiving onKeyPress events.
     */
    export const onDeactivated: chrome.events.Event<
      /**
       * @param engineID ID of the engine receiving the event
       */
      (
        engineID: string,
      ) => void
    >;

    /**
     * This event is sent when focus enters a text box. It is sent to all
     * extensions that are listening to this event, and enabled by the user.
     */
    export const onFocus: chrome.events.Event<
      /**
       * @param context Describes the text field that has acquired focus.
       */
      (
        context: InputContext,
      ) => void
    >;

    /**
     * This event is sent when focus leaves a text box. It is sent to all
     * extensions that are listening to this event, and enabled by the user.
     */
    export const onBlur: chrome.events.Event<
      /**
       * @param contextID The ID of the text field that has lost focus. The ID is invalid after this call
       */
      (
        contextID: number,
      ) => void
    >;

    /**
     * This event is sent when the properties of the current InputContext
     * change, such as the the type. It is sent to all extensions that are
     * listening to this event, and enabled by the user.
     */
    export const onInputContextUpdate: chrome.events.Event<
      /**
       * @param context An InputContext object describing the text field that has changed.
       */
      (
        context: InputContext,
      ) => void
    >;

    /**
     * Fired when a key event is sent from the operating system. The event will
     * be sent to the extension if this extension owns the active IME. The
     * listener function should return true if the event was handled false if it
     * was not.  If the event will be evaluated asynchronously, this function
     * must return undefined and the IME must later call keyEventHandled() with
     * the result.
     */
    export const onKeyEvent: chrome.events.Event<
      /**
       * @param engineID ID of the engine receiving the event
       * @param keyData Data on the key event
       * @returns True if the keystroke was handled, false if not. Or returns undefined if the extension decides to call keyEventHandled explicitly.
       */
      (
        engineID: string,
        keyData: KeyboardEvent,
      ) => boolean
    >;

    /**
     * This event is sent if this extension owns the active IME.
     */
    export const onCandidateClicked: chrome.events.Event<
      /**
       * @param engineID ID of the engine receiving the event
       * @param candidateID ID of the candidate that was clicked.
       * @param button Which mouse buttons was clicked.
       */
      (
        engineID: string,
        candidateID: number,
        button: MouseButton,
      ) => void
    >;

    /**
     * Called when the user selects a menu item
     */
    export const onMenuItemActivated: chrome.events.Event<
      /**
       * @param engineID ID of the engine receiving the event
       * @param name Name of the MenuItem which was activated
       */
      (
        engineID: string,
        name: string,
      ) => void
    >;

    /**
     * Called when the editable string around caret is changed or when the caret
     * position is moved. The text length is limited to 100 characters for each
     * back and forth direction.
     */
    export const onSurroundingTextChanged: chrome.events.Event<
      /**
       * @param engineID ID of the engine receiving the event
       * @param surroundingInfo The surrounding information.
       */
      (
        engineID: string,
        surroundingInfo: {
          /**
           * The text around the cursor. This is only a subset of all text in the input
           * field.
           */
          text: string,

          /**
           * The ending position of the selection. This value indicates caret position if
           * there is no selection.
           */
          focus: number,

          /**
           * The beginning position of the selection. This value indicates caret position
           * if there is no selection.
           */
          anchor: number,

          /**
           * The offset position of <code>text</code>. Since <code>text</code> only
           * includes a subset of text around the cursor, offset indicates the absolute
           * position of the first character of <code>text</code>.
           */
          offset: number,
        },
      ) => void
    >;

    /**
     * This event is sent when chrome terminates ongoing text input session.
     */
    export const onReset: chrome.events.Event<
      /**
       * @param engineID ID of the engine receiving the event
       */
      (
        engineID: string,
      ) => void
    >;

    /**
     * Triggered when the bounds of the IME composition text or cursor are
     * changed. The IME composition text is the instance of text produced in the
     * input method editor.
     */
    export const onCompositionBoundsChanged: chrome.events.Event<
      /**
       * @param boundsList List of bounds information for each character on IME composition text. If there's no composition text in the editor, this array contains the bound information of the cursor.
       */
      (
        boundsList: Bounds[],
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use <code>chrome.instanceID</code> to access the Instance ID service.
   * @chrome-permission gcm
 */
  export namespace instanceID {
    /**
     * Retrieves an identifier for the app instance. The instance ID will be
     * returned by the <code>callback</code>. The same ID will be returned as long
     * as the application identity has not been revoked or expired.
     * @param callback Function called when the retrieval completes. It should check {@link runtime.lastError} for error when instanceID is empty.
     * @param callback.instanceID An Instance ID assigned to the app instance.
     */
    export function getID(
      callback: (
        instanceID: string,
      ) => void,
    ): void;

    /**
     * Retrieves the time when the InstanceID has been generated. The creation time
     * will be returned by the <code>callback</code>.
     * @param callback Function called when the retrieval completes. It should check {@link runtime.lastError} for error when creationTime is zero.
     * @param callback.creationTime The time when the Instance ID has been generated, represented in milliseconds since the epoch.
     */
    export function getCreationTime(
      callback: (
        creationTime: number,
      ) => void,
    ): void;

    /**
     * Return a token that allows the authorized entity to access the service
     * defined by scope.
     * @param getTokenParams Parameters for getToken.
     * @param callback Function called when the retrieval completes. It should check {@link runtime.lastError} for error when token is empty.
     * @param callback.token A token assigned by the requested service.
     */
    export function getToken(
      getTokenParams: {
        /**
         * Identifies the entity that is authorized to access resources associated with
         * this Instance ID. It can be a project ID from <a
         * href='https://code.google.com/apis/console'>Google developer console</a>.
         */
        authorizedEntity: string,

        /**
         * Identifies authorized actions that the authorized entity can take. E.g. for
         * sending GCM messages, <code>GCM</code> scope should be used.
         */
        scope: string,

        /**
         * Allows including a small number of string key/value pairs that will be
         * associated with the token and may be used in processing the request.
         */
        options?: {[name: string]: string},
      },
      callback: (
        token: string,
      ) => void,
    ): void;

    /**
     * Revokes a granted token.
     * @param deleteTokenParams Parameters for deleteToken.
     * @param callback Function called when the token deletion completes. The token was revoked successfully if {@link runtime.lastError} is not set.
     */
    export function deleteToken(
      deleteTokenParams: {
        /**
         * The authorized entity that is used to obtain the token.
         */
        authorizedEntity: string,

        /**
         * The scope that is used to obtain the token.
         */
        scope: string,
      },
      callback: () => void,
    ): void;

    /**
     * Resets the app instance identifier and revokes all tokens associated with it.
     * @param callback Function called when the deletion completes. The instance identifier was revoked successfully if {@link runtime.lastError} is not set.
     */
    export function deleteID(
      callback: () => void,
    ): void;

    /**
     * Fired when all the granted tokens need to be refreshed.
     */
    export const onTokenRefresh: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.launcherPage</code> API provides launcher pages in the
   * Chrome Launcher with the capabilities and events they need.
   */
  export namespace launcherPage {
    /**
     * <p>Pushes a subpage state onto a state stack for the launcher page. This
     * state will be popped when the launcher's back button is pressed, preventing
     * the launcher from hiding the launcher page and sending an onPopSubpage event
     * to the launcher page. Once all states are popped, the next press of the back
     * button will cause the launcher to be hidden.</p><p>Note: All subpages are
     * immediately popped when the launcher is closed or the launcher page is
     * otherwise hidden.</p>
     * @param callback
     */
    export function pushSubpage(
      callback?: () => void,
    ): void;

    /**
     * Opens the launcher if it isn't currently open and shows the launcher page.
     * @param callback
     */
    export function show(
      callback?: () => void,
    ): void;

    /**
     * Returns the launcher to the start page if the launcher page is showing.
     * @param callback
     */
    export function hide(
      callback?: () => void,
    ): void;

    /**
     * <p>Sets whether the launcher page is enabled in the launcher. If disabled,
     * the launcher page will not be shown when the area at the bottom of the
     * launcher is pressed.</p><p>Note: The launcher page will still be displayed at
     * the bottom of the launcher's start page and launcherPage.show() will still
     * show the launcher page.</p>
     * @param enabled
     * @param callback
     */
    export function setEnabled(
      enabled: boolean,
      callback?: () => void,
    ): void;

    /**
     * Fired when the launcher page is transitioning between hidden and shown.
     * It's possible for this to be called with a pushed subpage so this event
     * handler should account for transitioning from any subpage to a collapsed
     * view.
     */
    export const onTransitionChanged: chrome.events.Event<
      /**
       * @param progress
       */
      (
        progress: number,
      ) => void
    >;

    /**
     * Fired when the launcher's back button is pressed if there are remaining
     * subpages on the state stack pushed by pushSubpage().
     */
    export const onPopSubpage: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * An API to listen queries of the Chrome Launcher and provide search results
   * to it.
   * @chrome-permission launcherSearchProvider
 */
  export namespace launcherSearchProvider {
    export interface SearchResult {
      itemId: string;

      title: string;

      /**
       * If iconUrl is not provided, app/extension icon is used automatically.
       */
      iconUrl?: string;

      /**
       * Relevance ranges from 0 to 4. 0 is the lowest relevance, 4 is highest.
       */
      relevance: number;
    }

    /**
     * Sets search result of this extension for the query. Setting a new search
     * results overwrites any previous results of this extension. If queryId is
     * invalid, the results are discarded. Since the space is limited, it is not
     * guranteed that all provided results are shown to a user. The search results
     * will be sorted by relevance, with ties broken by the order of the results in
     * this list (highest priority first).
     * @param queryId
     * @param results
     */
    export function setSearchResults(
      queryId: number,
      results: SearchResult[],
    ): void;

    /**
     * Called when a user typed a query. maxResult is the maximum number of
     * results the extension should provide.
     */
    export const onQueryStarted: chrome.events.Event<
      /**
       * @param queryId
       * @param query
       * @param maxResult
       */
      (
        queryId: number,
        query: string,
        maxResult: number,
      ) => void
    >;

    /**
     * Called when query of |queryId| is ended. After this call,
     * setSearchResults no longer accept the results for queryId.
     */
    export const onQueryEnded: chrome.events.Event<
      /**
       * @param queryId
       */
      (
        queryId: number,
      ) => void
    >;

    /**
     * Called when a user clicks a search result which is provided by
     * setSearchResults.
     */
    export const onOpenResult: chrome.events.Event<
      /**
       * @param itemId
       */
      (
        itemId: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * <p>
   The API that can be used by an app to create and manage data on the
   * Chrome OS lock screen.
 </p>
 <p>
   The API usability will depend on the
   * user session state:
   <ul>
     <li>
       When the user session is locked,
   * the API usage will only be allowed
       from the lock screen context.
   * </li>
     <li>
       When the user session is not locked, the API usage
   * will only be
       allowed outside the lock screen context - i.e. from the
   * regular app
       context.
     </li>
   </ul>
 </p>
 <p>
   Note that apps
   * have reduced access to Chrome apps APIs from the lock screen
   context.
   * </p>
   * @chrome-permission lockScreen
 */
  export namespace lockScreen.data {
    export interface DataItemInfo {
      /**
       * The data item ID that can later be used to retrieve and update the associated
       * lock screen data.
       */
      id: string;
    }

    export interface DataItemsAvailableEvent {
      /**
       * <p>Whether the event was dispatched as a result of the user session
       * getting unlocked.    </p> <p>For example:   <ul>     <li>If the app creates
       * new data items while shown on         the lock screen, when the user unlocks
       * the screen,         {@link onDataItemsAvailable} event will be dispatched
       * with this         property set to <code>true</code>.         </li>
       * <li>When the user logs in, if not previously reported lock screen
       * data items are found, which could happen if the user session had         been
       * closed while it was locked, {@link onDataItemsAvailable} will         be
       * dispatched with this property set to <code>false</code>.         </li>
       * </ul> </p>
       */
      wasLocked: boolean;
    }

    /**
     * Creates a new data item reference - available only in lock screen contexts.
     * @param callback
     * @param callback.item
     */
    export function create(
      callback: (
        item: DataItemInfo,
      ) => void,
    ): void;

    /**
     * Gets references to all data items available to the app.
     * @param callback
     * @param callback.items
     */
    export function getAll(
      callback: (
        items: DataItemInfo[],
      ) => void,
    ): void;

    /**
     * Retrieves content of the data item identified by |id|.
     * @param id
     * @param callback
     * @param callback.data
     */
    export function getContent(
      id: string,
      callback: (
        data: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * Sets contents of a data item. |id| - Identifies the target data item. |data|
     * - The data item contents to set.
     * @param id
     * @param data
     * @param callback
     */
    export function setContent(
      id: string,
      data: ArrayBuffer,
      callback?: () => void,
    ): void;

    /**
     * Deletes a data item. The data item will not be available through this API
     * anymore. |id| - Identifies the data item to delete.
     * @param id
     * @param callback
     */
    function _delete(
      id: string,
      callback?: () => void,
    ): void;

    export {_delete as delete};

    /**
     * Dispatched when new data items become available to main, non-lock screen
     * app context - this event is not expected to be dispatched to the app in
     * the lock screen context.
     */
    export const onDataItemsAvailable: chrome.events.Event<
      /**
       * @param event
       */
      (
        event: DataItemsAvailableEvent,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.management</code> API provides ways to manage the list of
   * extensions/apps that are installed and running. It is particularly useful for
   * extensions that <a href='override'>override</a> the built-in New Tab page.
   * @alpha
 * @chrome-permission management
 */
  export namespace management {
    /**
     * Information about an icon belonging to an extension, app, or theme.
     */
    export interface IconInfo {
      /**
       * A number representing the width and height of the icon. Likely values include
       * (but are not limited to) 128, 48, 24, and 16.
       */
      size: number;

      /**
       * The URL for this icon image. To display a grayscale version of the icon (to
       * indicate that an extension is disabled, for example), append
       * <code>?grayscale=true</code> to the URL.
       */
      url: string;
    }

    /**
     * These are all possible app launch types.
     */
    export type LaunchType = "OPEN_AS_REGULAR_TAB" | "OPEN_AS_PINNED_TAB" | "OPEN_AS_WINDOW" | "OPEN_FULL_SCREEN";

    /**
     * A reason the item is disabled.
     */
    export type ExtensionDisabledReason = "unknown" | "permissions_increase";

    /**
     * The type of this extension, app, or theme.
     */
    export type ExtensionType = "extension" | "hosted_app" | "packaged_app" | "legacy_packaged_app" | "theme";

    /**
     * How the extension was installed. One of<br><var>admin</var>: The extension
     * was installed because of an administrative policy,<br><var>development</var>:
     * The extension was loaded unpacked in developer mode,<br><var>normal</var>:
     * The extension was installed normally via a .crx file,<br><var>sideload</var>:
     * The extension was installed by other software on the
     * machine,<br><var>other</var>: The extension was installed by other means.
     */
    export type ExtensionInstallType = "admin" | "development" | "normal" | "sideload" | "other";

    /**
     * Information about an installed extension, app, or theme.
     */
    export interface ExtensionInfo {
      /**
       * The extension's unique identifier.
       */
      id: string;

      /**
       * The name of this extension, app, or theme.
       */
      name: string;

      /**
       * A short version of the name of this extension, app, or theme.
       */
      shortName: string;

      /**
       * The description of this extension, app, or theme.
       */
      description: string;

      /**
       * The <a href='manifest/version'>version</a> of this extension, app, or theme.
       */
      version: string;

      /**
       * The <a href='manifest/version#version_name'>version name</a> of this
       * extension, app, or theme if the manifest specified one.
       */
      versionName?: string;

      /**
       * Whether this extension can be disabled or uninstalled by the user.
       */
      mayDisable: boolean;

      /**
       * Whether this extension can be enabled by the user. This is only returned for
       * extensions which are not enabled.
       */
      mayEnable?: boolean;

      /**
       * Whether it is currently enabled or disabled.
       */
      enabled: boolean;

      /**
       * A reason the item is disabled.
       */
      disabledReason?: ExtensionDisabledReason;

      /**
       * True if this is an app.
       * @deprecated Please use {@link management.ExtensionInfo.type}.
       */
      isApp: boolean;

      /**
       * The type of this extension, app, or theme.
       */
      type: ExtensionType;

      /**
       * The launch url (only present for apps).
       */
      appLaunchUrl?: string;

      /**
       * The URL of the homepage of this extension, app, or theme.
       */
      homepageUrl?: string;

      /**
       * The update URL of this extension, app, or theme.
       */
      updateUrl?: string;

      /**
       * Whether the extension, app, or theme declares that it supports offline.
       */
      offlineEnabled: boolean;

      /**
       * The url for the item's options page, if it has one.
       */
      optionsUrl: string;

      /**
       * A list of icon information. Note that this just reflects what was declared in
       * the manifest, and the actual image at that url may be larger or smaller than
       * what was declared, so you might consider using explicit width and height
       * attributes on img tags referencing these images. See the <a
       * href='manifest/icons'>manifest documentation on icons</a> for more details.
       */
      icons?: IconInfo[];

      /**
       * Returns a list of API based permissions.
       */
      permissions: string[];

      /**
       * Returns a list of host based permissions.
       */
      hostPermissions: string[];

      /**
       * How the extension was installed.
       */
      installType: ExtensionInstallType;

      /**
       * The app launch type (only present for apps).
       */
      launchType?: LaunchType;

      /**
       * The currently available launch types (only present for apps).
       */
      availableLaunchTypes?: LaunchType[];
    }

    /**
     * Returns a list of information about installed extensions and apps.
     * @param callback
     * @param callback.result
     */
    export function getAll(
      callback?: (
        result: ExtensionInfo[],
      ) => void,
    ): void;

    /**
     * Returns information about the installed extension, app, or theme that has the
     * given ID.
     * @param id The ID from an item of {@link management.ExtensionInfo}.
     * @param callback
     * @param callback.result
     */
    export function get(
      id: string,
      callback?: (
        result: ExtensionInfo,
      ) => void,
    ): void;

    /**
     * Returns information about the calling extension, app, or theme. Note: This
     * function can be used without requesting the 'management' permission in the
     * manifest.
     * @param callback
     * @param callback.result
     */
    export function getSelf(
      callback?: (
        result: ExtensionInfo,
      ) => void,
    ): void;

    /**
     * Returns a list of <a href='permission_warnings'>permission warnings</a> for
     * the given extension id.
     * @param id The ID of an already installed extension.
     * @param callback
     * @param callback.permissionWarnings
     */
    export function getPermissionWarningsById(
      id: string,
      callback?: (
        permissionWarnings: string[],
      ) => void,
    ): void;

    /**
     * Returns a list of <a href='permission_warnings'>permission warnings</a> for
     * the given extension manifest string. Note: This function can be used without
     * requesting the 'management' permission in the manifest.
     * @param manifestStr Extension manifest JSON string.
     * @param callback
     * @param callback.permissionWarnings
     */
    export function getPermissionWarningsByManifest(
      manifestStr: string,
      callback?: (
        permissionWarnings: string[],
      ) => void,
    ): void;

    /**
     * Enables or disables an app or extension. In most cases this function must be
     * called in the context of a user gesture (e.g. an onclick handler for a
     * button), and may present the user with a native confirmation UI as a way of
     * preventing abuse.
     * @param id This should be the id from an item of {@link management.ExtensionInfo}.
     * @param enabled Whether this item should be enabled or disabled.
     * @param callback
     */
    export function setEnabled(
      id: string,
      enabled: boolean,
      callback?: () => void,
    ): void;

    /**
     * Uninstalls a currently installed app or extension.
     * @param id This should be the id from an item of {@link management.ExtensionInfo}.
     * @param options
     * @param callback
     */
    export function uninstall(
      id: string,
      options?: {
        /**
         * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to
         * false for self uninstalls. If an extension uninstalls another extension, this
         * parameter is ignored and the dialog is always shown.
         */
        showConfirmDialog?: boolean,
      },
      callback?: () => void,
    ): void;

    /**
     * Uninstalls the calling extension. Note: This function can be used without
     * requesting the 'management' permission in the manifest.
     * @param options
     * @param callback
     */
    export function uninstallSelf(
      options?: {
        /**
         * Whether or not a confirm-uninstall dialog should prompt the user. Defaults to
         * false.
         */
        showConfirmDialog?: boolean,
      },
      callback?: () => void,
    ): void;

    /**
     * Launches an application.
     * @param id The extension id of the application.
     * @param callback
     */
    export function launchApp(
      id: string,
      callback?: () => void,
    ): void;

    /**
     * Display options to create shortcuts for an app. On Mac, only packaged app
     * shortcuts can be created.
     * @param id This should be the id from an app item of {@link management.ExtensionInfo}.
     * @param callback
     */
    export function createAppShortcut(
      id: string,
      callback?: () => void,
    ): void;

    /**
     * Set the launch type of an app.
     * @param id This should be the id from an app item of {@link management.ExtensionInfo}.
     * @param launchType The target launch type. Always check and make sure this launch type is in {@link ExtensionInfo.availableLaunchTypes}, because the available launch types vary on different platforms and configurations.
     * @param callback
     */
    export function setLaunchType(
      id: string,
      launchType: LaunchType,
      callback?: () => void,
    ): void;

    /**
     * Generate an app for a URL. Returns the generated bookmark app.
     * @param url The URL of a web page. The scheme of the URL can only be "http" or "https".
     * @param title The title of the generated app.
     * @param callback
     * @param callback.result
     */
    export function generateAppForLink(
      url: string,
      title: string,
      callback?: (
        result: ExtensionInfo,
      ) => void,
    ): void;

    /**
     * Fired when an app or extension has been installed.
     */
    export const onInstalled: chrome.events.Event<
      /**
       * @param info
       */
      (
        info: ExtensionInfo,
      ) => void
    >;

    /**
     * Fired when an app or extension has been uninstalled.
     */
    export const onUninstalled: chrome.events.Event<
      /**
       * @param id The id of the extension, app, or theme that was uninstalled.
       */
      (
        id: string,
      ) => void
    >;

    /**
     * Fired when an app or extension has been enabled.
     */
    export const onEnabled: chrome.events.Event<
      /**
       * @param info
       */
      (
        info: ExtensionInfo,
      ) => void
    >;

    /**
     * Fired when an app or extension has been disabled.
     */
    export const onDisabled: chrome.events.Event<
      /**
       * @param info
       */
      (
        info: ExtensionInfo,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Schemas for structured manifest entries
   */
  export namespace manifestTypes {
    /**
     * Chrome settings which can be overriden by an extension.
     */
    export interface ChromeSettingsOverrides {
      /**
       * New value for the homepage.
       */
      homepage?: string;

      /**
       * A search engine
       */
      search_provider?: {
        /**
         * Name of the search engine displayed to user. This may only be omitted if
         * <em>prepopulated_id</em> is set.
         */
        name?: string,

        /**
         * Omnibox keyword for the search engine. This may only be omitted if
         * <em>prepopulated_id</em> is set.
         */
        keyword?: string,

        /**
         * An icon URL for the search engine. This may only be omitted if
         * <em>prepopulated_id</em> is set.
         */
        favicon_url?: string,

        /**
         * An search URL used by the search engine.
         */
        search_url: string,

        /**
         * Encoding of the search term. This may only be omitted if
         * <em>prepopulated_id</em> is set.
         */
        encoding?: string,

        /**
         * If omitted, this engine does not support suggestions.
         */
        suggest_url?: string,

        /**
         * If omitted, this engine does not support image search.
         */
        image_url?: string,

        /**
         * The string of post parameters to search_url
         */
        search_url_post_params?: string,

        /**
         * The string of post parameters to suggest_url
         */
        suggest_url_post_params?: string,

        /**
         * The string of post parameters to image_url
         */
        image_url_post_params?: string,

        /**
         * A list of URL patterns that can be used, in addition to |search_url|.
         */
        alternate_urls?: string[],

        /**
         * An ID of the built-in search engine in Chrome.
         */
        prepopulated_id?: number,

        /**
         * Specifies if the search provider should be default.
         */
        is_default: boolean,
      };

      /**
       * An array of length one containing a URL to be used as the startup page.
       */
      startup_pages?: string[];
    }

    /**
     * Chrome user interface features which can be overriden by an extension.
     */
    export interface ChromeUIOverrides {
      /**
       * Settings to permit bookmarks user interface customization by extensions.
       */
      bookmarks_ui?: {
        /**
         * If <code>true</code>, the built-in bookmark button will be removed from the
         * user interface.
         */
        remove_button?: boolean,

        /**
         * If <code>true</code>, the built-in "Bookmark this page..." shortcut key is
         * removed and the extension is permitted to override the shortcut by binding it
         * in the commands section of the manifest.
         */
        remove_bookmark_shortcut?: boolean,

        /**
         * [Private] If <code>true</code>, the built-in "Bookmark open pages..."
         * shortcut key and corresponding menu item is removed.
         */
        remove_bookmark_open_pages_shortcut?: boolean,
      };
    }

    /**
     * For <code>"file"</code> the source is a file passed via
     * <code>onLaunched</code> event. For <code>"device"</code> contents are fetched
     * from an external device (eg. plugged via USB), without using
     * <code>file_handlers</code>. Finally, for <code>"network"</code> source,
     * contents should be fetched via network.
     */
    export type FileSystemProviderSource = "file" | "device" | "network";

    /**
     * Represents capabilities of a providing extension.
     */
    export interface FileSystemProviderCapabilities {
      /**
       * Whether configuring via <code>onConfigureRequested</code> is supported. By
       * default: <code>false</code>.
       */
      configurable?: boolean;

      /**
       * Whether multiple (more than one) mounted file systems are supported. By
       * default: <code>false</code>.
       */
      multiple_mounts?: boolean;

      /**
       * Whether setting watchers and notifying about changes is supported. By
       * default: <code>false</code>.
       */
      watchable?: boolean;

      /**
       * Source of data for mounted file systems.
       */
      source: FileSystemProviderSource;
    }
  }
}

declare namespace chrome {
  /**
   * Use the <code>networking.config</code> API to authenticate to captive
   * portals.
   * @chrome-platform chromeos
 * @chrome-permission networking.config
 */
  export namespace networking.config {
    /**
     * Indicator for the type of network used in {@link NetworkInfo}.
     */
    export type NetworkType = "WiFi";

    export interface NetworkInfo {
      /**
       * Currently only WiFi supported.
       */
      Type: NetworkType;

      /**
       * A unique identifier of the network.
       */
      GUID?: string;

      /**
       * A hex-encoded byte sequence.
       */
      HexSSID?: string;

      /**
       * The decoded SSID of the network (default encoding is UTF-8). To filter for
       * non-UTF-8 SSIDs, use HexSSID instead.
       */
      SSID?: string;

      /**
       * The basic service set identification (BSSID) uniquely identifying the basic
       * service set. <code>BSSID</code> is represented as a human readable,
       * hex-encoded string with bytes separated by colons, e.g. 45:67:89:ab:cd:ef.
       */
      BSSID?: string;

      /**
       * Identifier indicating the security type of the network. Valid values are
       * <code>None</code>, <code>WEP-PSK</code>, <code>WPA-PSK</code> and
       * <code>WPA-EAP</code>.
       */
      Security?: string;
    }

    /**
     * Argument to {@link finishAuthentication} indicating the result of the captive
     * portal authentication attempt.
     */
    export type AuthenticationResult = "unhandled" | "succeeded" | "rejected" | "failed";

    /**
     * Allows an extension to define network filters for the networks it can handle.
     * A call to this function will remove all filters previously installed by the
     * extension before setting the new list.
     * @param networks Network filters to set. Every <code>NetworkInfo</code> must             either have the <code>SSID</code> or <code>HexSSID</code>             set. Other fields will be ignored.
     * @param callback Called back when this operation is finished.
     */
    export function setNetworkFilter(
      networks: NetworkInfo[],
      callback: () => void,
    ): void;

    /**
     * Called by the extension to notify the network config API that it finished a
     * captive portal authentication attempt and hand over the result of the
     * attempt. This function must only be called with the GUID of the latest {@link
     * onCaptivePortalDetected} event.
     * @param GUID Unique network identifier obtained from         {@link onCaptivePortalDetected}.
     * @param result The result of the authentication attempt.
     * @param callback Called back when this operation is finished.
     */
    export function finishAuthentication(
      GUID: string,
      result: AuthenticationResult,
      callback?: () => void,
    ): void;

    /**
     * This event fires everytime a captive portal is detected on a network
     * matching any of the currently registered network filters and the user
     * consents to use the extension for authentication. Network filters may be
     * set using the {@link setNetworkFilter}. Upon receiving this event the
     * extension should start its authentication attempt with the captive
     * portal. When the extension finishes its attempt, it must call {@link
     * finishAuthentication} with the <code>GUID</code> received with this event
     * and the appropriate authentication result.
     */
    export const onCaptivePortalDetected: chrome.events.Event<
      /**
       * @param networkInfo Information about the network on which a captive portal was detected.
       */
      (
        networkInfo: NetworkInfo,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.notifications</code> API to create rich notifications
   * using templates and show these notifications to users in the system tray.
   * @chrome-permission notifications
 */
  export namespace notifications {
    export type TemplateType = "basic" | "image" | "list" | "progress";

    export type PermissionLevel = "granted" | "denied";

    export interface NotificationItem {
      /**
       * Title of one item of a list notification.
       */
      title: string;

      /**
       * Additional details about this item.
       */
      message: string;
    }

    export interface NotificationBitmap {
      width: number;

      height: number;

      data?: ArrayBuffer;
    }

    export interface NotificationButton {
      title: string;

      /**
       * @deprecated Button icons not visible for Mac OS X users.
       */
      iconUrl?: string;

      iconBitmap?: NotificationBitmap;
    }

    export interface NotificationOptions {
      /**
       * Which type of notification to display. <em>Required for {@link
       * notifications.create}</em> method.
       */
      type?: TemplateType;

      /**
       * <p>A URL to the sender's avatar, app icon, or a thumbnail for image
       * notifications.</p><p>URLs can be a data URL, a blob URL, or a URL relative to
       * a resource within this extension's .crx file <em>Required for {@link
       * notifications.create}</em> method.</p>
       */
      iconUrl?: string;

      iconBitmap?: NotificationBitmap;

      /**
       * <p>A URL to the app icon mask. URLs have the same restrictions as {@link
       * notifications.NotificationOptions.iconUrl iconUrl}.</p><p>The app icon mask
       * should be in alpha channel, as only the alpha channel of the image will be
       * considered.</p>
       * @deprecated The app icon mask is not visible for Mac OS X users.
       */
      appIconMaskUrl?: string;

      appIconMaskBitmap?: NotificationBitmap;

      /**
       * Title of the notification (e.g. sender name for email). <em>Required for
       * {@link notifications.create}</em> method.
       */
      title?: string;

      /**
       * Main notification content. <em>Required for {@link notifications.create}</em>
       * method.
       */
      message?: string;

      /**
       * Alternate notification content with a lower-weight font.
       */
      contextMessage?: string;

      /**
       * Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is
       * default.  On platforms that don't support a notification center (Windows,
       * Linux & Mac), -2 and -1 result in an error as notifications with those
       * priorities will not be shown at all.
       */
      priority?: number;

      /**
       * A timestamp associated with the notification, in milliseconds past the epoch
       * (e.g. <code>Date.now() + n</code>).
       */
      eventTime?: number;

      /**
       * Text and icons for up to two notification action buttons.
       */
      buttons?: NotificationButton[];

      /**
       * Secondary notification content.
       */
      expandedMessage?: string;

      /**
       * A URL to the image thumbnail for image-type notifications. URLs have the same
       * restrictions as {@link notifications.NotificationOptions.iconUrl iconUrl}.
       * @deprecated The image is not visible for Mac OS X users.
       */
      imageUrl?: string;

      imageBitmap?: NotificationBitmap;

      /**
       * Items for multi-item notifications. Users on Mac OS X only see the first
       * item.
       */
      items?: NotificationItem[];

      /**
       * Current progress ranges from 0 to 100.
       */
      progress?: number;

      /**
       * @deprecated This UI hint is ignored as of Chrome 67
       */
      isClickable?: boolean;

      /**
       * Indicates that the notification should remain visible on screen until the
       * user activates or dismisses the notification. This defaults to false.
       */
      requireInteraction?: boolean;

      /**
       * Indicates that no sounds or vibrations should be made when the notification
       * is being shown. This defaults to false.
       */
      silent?: boolean;
    }

    /**
     * Creates and displays a notification.
     * @param notificationId <p>Identifier of the notification. If not set or empty, an ID will automatically be generated. If it matches an existing notification, this method first clears that notification before proceeding with the create operation. The identifier may not be longer than 500 characters.</p><p>The <code>notificationId</code> parameter is required before Chrome 42.</p>
     * @param options Contents of the notification.
     * @param callback <p>Returns the notification id (either supplied or generated) that represents the created notification.</p><p>The callback is required before Chrome 42.</p>
     * @param callback.notificationId
     */
    export function create(
      notificationId: string,
      options: NotificationOptions,
      callback?: (
        notificationId: string,
      ) => void,
    ): void;

    /**
     * Creates and displays a notification.
     * @param options Contents of the notification.
     * @param callback <p>Returns the notification id (either supplied or generated) that represents the created notification.</p><p>The callback is required before Chrome 42.</p>
     * @param callback.notificationId
     */
    export function create(
      options: NotificationOptions,
      callback?: (
        notificationId: string,
      ) => void,
    ): void;

    /**
     * Updates an existing notification.
     * @param notificationId The id of the notification to be updated. This is returned by {@link notifications.create} method.
     * @param options Contents of the notification to update to.
     * @param callback <p>Called to indicate whether a matching notification existed.</p><p>The callback is required before Chrome 42.</p>
     * @param callback.wasUpdated
     */
    export function update(
      notificationId: string,
      options: NotificationOptions,
      callback?: (
        wasUpdated: boolean,
      ) => void,
    ): void;

    /**
     * Clears the specified notification.
     * @param notificationId The id of the notification to be cleared. This is returned by {@link notifications.create} method.
     * @param callback <p>Called to indicate whether a matching notification existed.</p><p>The callback is required before Chrome 42.</p>
     * @param callback.wasCleared
     */
    export function clear(
      notificationId: string,
      callback?: (
        wasCleared: boolean,
      ) => void,
    ): void;

    /**
     * Retrieves all the notifications.
     * @param callback Returns the set of notification_ids currently in the system.
     * @param callback.notifications
     */
    export function getAll(
      callback: (
        notifications: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * Retrieves whether the user has enabled notifications from this app or
     * extension.
     * @param callback Returns the current permission level.
     * @param callback.level
     */
    export function getPermissionLevel(
      callback: (
        level: PermissionLevel,
      ) => void,
    ): void;

    /**
     * The notification closed, either by the system or by user action.
     */
    export const onClosed: chrome.events.Event<
      /**
       * @param notificationId
       * @param byUser
       */
      (
        notificationId: string,
        byUser: boolean,
      ) => void
    >;

    /**
     * The user clicked in a non-button area of the notification.
     */
    export const onClicked: chrome.events.Event<
      /**
       * @param notificationId
       */
      (
        notificationId: string,
      ) => void
    >;

    /**
     * The user pressed a button in the notification.
     */
    export const onButtonClicked: chrome.events.Event<
      /**
       * @param notificationId
       * @param buttonIndex
       */
      (
        notificationId: string,
        buttonIndex: number,
      ) => void
    >;

    /**
     * The user changes the permission level.  As of Chrome 47, only ChromeOS
     * has UI that dispatches this event.
     */
    export const onPermissionLevelChanged: chrome.events.Event<
      /**
       * @param level
       */
      (
        level: PermissionLevel,
      ) => void
    >;

    /**
     * The user clicked on a link for the app's notification settings.  As of
     * Chrome 47, only ChromeOS has UI that dispatches this event. As of Chrome
     * 65, that UI has been removed from ChromeOS, too.
     */
    export const onShowSettings: chrome.events.Event<
      /**
       * @deprecated Custom notification settings button is no longer supported.
       */
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * The omnibox API allows you to register a keyword with Google Chrome's address
   * bar, which is also known as the omnibox.
   */
  export namespace omnibox {
    /**
     * The style type.
     */
    export type DescriptionStyleType = "url" | "match" | "dim";

    /**
     * The window disposition for the omnibox query. This is the recommended context
     * to display results. For example, if the omnibox command is to navigate to a
     * certain URL, a disposition of 'newForegroundTab' means the navigation should
     * take place in a new selected tab.
     */
    export type OnInputEnteredDisposition = "currentTab" | "newForegroundTab" | "newBackgroundTab";

    /**
     * A suggest result.
     */
    export interface SuggestResult {
      /**
       * The text that is put into the URL bar, and that is sent to the extension when
       * the user chooses this entry.
       */
      content: string;

      /**
       * The text that is displayed in the URL dropdown. Can contain XML-style markup
       * for styling. The supported tags are 'url' (for a literal URL), 'match' (for
       * highlighting text that matched what the user's query), and 'dim' (for dim
       * helper text). The styles can be nested, eg. <dim><match>dimmed
       * match</match></dim>. You must escape the five predefined entities to display
       * them as text: stackoverflow.com/a/1091953/89484
       */
      description: string;

      /**
       * Whether the suggest result can be deleted by the user.
       */
      deletable?: boolean;

      /**
       * An array of style ranges for the description, as provided by the extension.
       */
      descriptionStyles?: {
        offset: number,

        /**
         * The style type
         */
        type: DescriptionStyleType,
        length?: number,
      }[];

      /**
       * An array of style ranges for the description, as provided by ToValue().
       */
      descriptionStylesRaw?: {
        offset: number,
        type: number,
      }[];
    }

    /**
     * A suggest result.
     */
    export interface DefaultSuggestResult {
      /**
       * The text that is displayed in the URL dropdown. Can contain XML-style markup
       * for styling. The supported tags are 'url' (for a literal URL), 'match' (for
       * highlighting text that matched what the user's query), and 'dim' (for dim
       * helper text). The styles can be nested, eg. <dim><match>dimmed
       * match</match></dim>.
       */
      description: string;

      /**
       * An array of style ranges for the description, as provided by the extension.
       */
      descriptionStyles?: {
        offset: number,

        /**
         * The style type
         */
        type: DescriptionStyleType,
        length?: number,
      }[];

      /**
       * An array of style ranges for the description, as provided by ToValue().
       */
      descriptionStylesRaw?: {
        offset: number,
        type: number,
      }[];
    }

    /**
     * A callback passed to the onInputChanged event used for sending suggestions
     * back to the browser.
     * @param requestId
     * @param suggestResults An array of suggest results
     */
    export function sendSuggestions(
      requestId: number,
      suggestResults: SuggestResult[],
    ): void;

    /**
     * Sets the description and styling for the default suggestion. The default
     * suggestion is the text that is displayed in the first suggestion row
     * underneath the URL bar.
     * @param suggestion A partial SuggestResult object, without the 'content' parameter.
     */
    export function setDefaultSuggestion(
      suggestion: DefaultSuggestResult,
    ): void;

    /**
     * User has started a keyword input session by typing the extension's
     * keyword. This is guaranteed to be sent exactly once per input session,
     * and before any onInputChanged events.
     */
    export const onInputStarted: chrome.events.Event<
      () => void
    >;

    /**
     * User has changed what is typed into the omnibox.
     */
    export const onInputChanged: chrome.events.Event<
      /**
       * @param text
       */
      (
        text: string,
        suggest: (
          suggestResults: SuggestResult[],
        ) => void,
      ) => void
    >;

    /**
     * User has accepted what is typed into the omnibox.
     */
    export const onInputEntered: chrome.events.Event<
      /**
       * @param text
       * @param disposition
       */
      (
        text: string,
        disposition: OnInputEnteredDisposition,
      ) => void
    >;

    /**
     * User has ended the keyword input session without accepting the input.
     */
    export const onInputCancelled: chrome.events.Event<
      () => void
    >;

    /**
     * User has deleted a suggested result.
     */
    export const onDeleteSuggestion: chrome.events.Event<
      /**
       * @param text Text of the deleted suggestion.
       */
      (
        text: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.pageAction</code> API to put icons in the main Google
   * Chrome toolbar, to the right of the address bar. Page actions represent
   * actions that can be taken on the current page, but that aren't applicable to
   * all pages. Page actions appear grayed out when inactive.
   */
  export namespace pageAction {
    /**
     * Pixel data for an image. Must be an ImageData object (for example, from a
     * <code>canvas</code> element).
     */
    export type ImageDataType = ImageData;

    /**
     * Shows the page action. The page action is shown whenever the tab is selected.
     * @param tabId The id of the tab for which you want to modify the page action.
     * @param callback
     */
    export function show(
      tabId: number,
      callback?: () => void,
    ): void;

    /**
     * Hides the page action. Hidden page actions still appear in the Chrome
     * toolbar, but are grayed out.
     * @param tabId The id of the tab for which you want to modify the page action.
     * @param callback
     */
    export function hide(
      tabId: number,
      callback?: () => void,
    ): void;

    /**
     * Sets the title of the page action. This is displayed in a tooltip over the
     * page action.
     * @param details
     * @param callback
     */
    export function setTitle(
      details: {
        /**
         * The id of the tab for which you want to modify the page action.
         */
        tabId: number,

        /**
         * The tooltip string.
         */
        title: string,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the title of the page action.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getTitle(
      details: {
        /**
         * Specify the tab to get the title from.
         */
        tabId: number,
      },
      callback: (
        result: string,
      ) => void,
    ): void;

    /**
     * Sets the icon for the page action. The icon can be specified either as the
     * path to an image file or as the pixel data from a canvas element, or as
     * dictionary of either one of those. Either the <b>path</b> or the
     * <b>imageData</b> property must be specified.
     * @param details
     * @param callback
     */
    export function setIcon(
      details: {
        /**
         * The id of the tab for which you want to modify the page action.
         */
        tabId: number,

        /**
         * Either an ImageData object or a dictionary {size -> ImageData} representing
         * icon to be set. If the icon is specified as a dictionary, the actual image to
         * be used is chosen depending on screen's pixel density. If the number of image
         * pixels that fit into one screen space unit equals <code>scale</code>, then
         * image with size <code>scale</code> * n will be selected, where n is the size
         * of the icon in the UI. At least one image must be specified. Note that
         * 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}'
         */
        imageData?: ImageDataType | {[name: string]: any},

        /**
         * Either a relative image path or a dictionary {size -> relative image path}
         * pointing to icon to be set. If the icon is specified as a dictionary, the
         * actual image to be used is chosen depending on screen's pixel density. If the
         * number of image pixels that fit into one screen space unit equals
         * <code>scale</code>, then image with size <code>scale</code> * n will be
         * selected, where n is the size of the icon in the UI. At least one image must
         * be specified. Note that 'details.path = foo' is equivalent to 'details.path =
         * {'16': foo}'
         */
        path?: string | {[name: string]: any},

        /**
         * <b>Deprecated.</b> This argument is ignored.
         */
        iconIndex?: number,
      },
      callback?: () => void,
    ): void;

    /**
     * Sets the html document to be opened as a popup when the user clicks on the
     * page action's icon.
     * @param details
     * @param callback
     */
    export function setPopup(
      details: {
        /**
         * The id of the tab for which you want to modify the page action.
         */
        tabId: number,

        /**
         * The html file to show in a popup.  If set to the empty string (''), no popup
         * is shown.
         */
        popup: string,
      },
      callback?: () => void,
    ): void;

    /**
     * Gets the html document set as the popup for this page action.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function getPopup(
      details: {
        /**
         * Specify the tab to get the popup from.
         */
        tabId: number,
      },
      callback: (
        result: string,
      ) => void,
    ): void;

    /**
     * Fired when a page action icon is clicked.  This event will not fire if
     * the page action has a popup.
     */
    export const onClicked: chrome.events.Event<
      /**
       * @param tab
       */
      (
        tab: tabs.Tab,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.pageCapture</code> API to save a tab as MHTML.
   * @chrome-permission pageCapture
 */
  export namespace pageCapture {
    /**
     * Saves the content of the tab with given id as MHTML.
     * @param details
     * @param callback Called when the MHTML has been generated.
     * @param callback.mhtmlData The MHTML data as a Blob.
     */
    export function saveAsMHTML(
      details: {
        /**
         * The id of the tab to save as MHTML.
         */
        tabId: number,
      },
      callback: (
        mhtmlData?: ArrayBuffer,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.permissions</code> API to request <a
   * href='permissions#manifest'>declared optional permissions</a> at run time
   * rather than install time, so users understand why the permissions are needed
   * and grant only those that are necessary.
   */
  export namespace permissions {
    export interface Permissions {
      /**
       * List of named permissions (does not include hosts or origins).
       */
      permissions?: string[];

      /**
       * The list of host permissions, including those specified in the
       * <code>optional_permissions</code> or <code>permissions</code> keys in the
       * manifest, and those associated with <a href='content_scripts'>Content
       * Scripts</a>.
       */
      origins?: string[];
    }

    /**
     * Gets the extension's current set of permissions.
     * @param callback
     * @param callback.permissions The extension's active permissions. Note that the <code>origins</code> property will contain granted origins from those specified in the <code>permissions</code> and <code>optional_permissions</code> keys in the manifest and those associated with <a href='content_scripts'>Content Scripts</a>.
     */
    export function getAll(
      callback: (
        permissions: Permissions,
      ) => void,
    ): void;

    /**
     * Checks if the extension has the specified permissions.
     * @param permissions
     * @param callback
     * @param callback.result True if the extension has the specified permissions. If an origin is specified as both an optional permission and a content script match pattern, this will return <code>false</code> unless both permissions are granted.
     */
    export function contains(
      permissions: Permissions,
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Requests access to the specified permissions, displaying a prompt to the user
     * if necessary. These permissions must either be defined in the
     * <code>optional_permissions</code> field of the manifest or be required
     * permissions that were withheld by the user. Paths on origin patterns will be
     * ignored. You can request subsets of optional origin permissions; for example,
     * if you specify <code>*://&#x2a;/*</code> in the
     * <code>optional_permissions</code> section of the manifest, you can request
     * <code>http://example.com/</code>. If there are any problems requesting the
     * permissions, {@link runtime.lastError} will be set.
     * @param permissions
     * @param callback
     * @param callback.granted True if the user granted the specified permissions.
     */
    export function request(
      permissions: Permissions,
      callback?: (
        granted: boolean,
      ) => void,
    ): void;

    /**
     * Removes access to the specified permissions. If there are any problems
     * removing the permissions, {@link runtime.lastError} will be set.
     * @param permissions
     * @param callback
     * @param callback.removed True if the permissions were removed.
     */
    export function remove(
      permissions: Permissions,
      callback?: (
        removed: boolean,
      ) => void,
    ): void;

    /**
     * Fired when the extension acquires new permissions.
     */
    export const onAdded: chrome.events.Event<
      /**
       * @param permissions The newly acquired permissions.
       */
      (
        permissions: Permissions,
      ) => void
    >;

    /**
     * Fired when access to permissions has been removed from the extension.
     */
    export const onRemoved: chrome.events.Event<
      /**
       * @param permissions The permissions that have been removed.
       */
      (
        permissions: Permissions,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.platformKeys</code> API to access client certificates
   * managed by the platform. If the user or policy grants the permission, an
   * extension can use such a certficate in its custom authentication protocol.
   * E.g. this allows usage of platform managed certificates in third party VPNs
   * (see {@link vpnProvider chrome.vpnProvider}).
   * @chrome-platform chromeos
 * @chrome-permission platformKeys
 */
  export namespace platformKeys {
    export interface Match {
      /**
       * The DER encoding of a X.509 certificate.
       */
      certificate: ArrayBuffer;

      /**
       * The <a href="http://www.w3.org/TR/WebCryptoAPI/#key-algorithm-dictionary">
       * KeyAlgorithm</a> of the certified key. This contains algorithm parameters
       * that are inherent to the key of the certificate (e.g. the key length). Other
       * parameters like the hash function used by the sign function are not included.
       */
      keyAlgorithm: {[name: string]: any};
    }

    export type ClientCertificateType = "rsaSign" | "ecdsaSign";

    export interface ClientCertificateRequest {
      /**
       * This field is a list of the types of certificates requested, sorted in order
       * of the server's preference. Only certificates of a type contained in this
       * list will be retrieved. If <code>certificateTypes</code> is the empty list,
       * however, certificates of any type will be returned.
       */
      certificateTypes: ClientCertificateType[];

      /**
       * List of distinguished names of certificate authorities allowed by the server.
       * Each entry must be a DER-encoded X.509 DistinguishedName.
       */
      certificateAuthorities: ArrayBuffer[];
    }

    export interface SelectDetails {
      /**
       * Only certificates that match this request will be returned.
       */
      request: ClientCertificateRequest;

      /**
       * If given, the <code>selectClientCertificates</code> operates on this list.
       * Otherwise, obtains the list of all certificates from the platform's
       * certificate stores that are available to this extensions. Entries that the
       * extension doesn't have permission for or which doesn't match the request, are
       * removed.
       */
      clientCerts?: ArrayBuffer[];

      /**
       * If true, the filtered list is presented to the user to manually select a
       * certificate and thereby granting the extension access to the certificate(s)
       * and key(s). Only the selected certificate(s) will be returned. If is false,
       * the list is reduced to all certificates that the extension has been granted
       * access to (automatically or manually).
       */
      interactive: boolean;
    }

    export interface VerificationDetails {
      /**
       * Each chain entry must be the DER encoding of a X.509 certificate, the first
       * entry must be the server certificate and each entry must certify the entry
       * preceding it.
       */
      serverCertificateChain: ArrayBuffer[];

      /**
       * The hostname of the server to verify the certificate for, e.g. the server
       * that presented the <code>serverCertificateChain</code>.
       */
      hostname: string;
    }

    export interface VerificationResult {
      /**
       * The result of the trust verification: true if trust for the given
       * verification details could be established and false if trust is rejected for
       * any reason.
       */
      trusted: boolean;

      /**
       * <p>If the trust verification failed, this array contains the errors reported
       * by the underlying network layer. Otherwise, this array is
       * empty.</p><p><strong>Note:</strong> This list is meant for debugging only and
       * may not contain all relevant errors. The errors returned may change in future
       * revisions of this API, and are not guaranteed to be forwards or backwards
       * compatible.</p>
       */
      debug_errors: string[];
    }

    /**
     * This function filters from a list of client certificates the ones that are
     * known to the platform, match <code>request</code> and for which the extension
     * has permission to access the certificate and its private key. If
     * <code>interactive</code> is true, the user is presented a dialog where they
     * can select from matching certificates and grant the extension access to the
     * certificate. The selected/filtered client certificates will be passed to
     * <code>callback</code>.
     * @param details
     * @param callback
     * @param callback.matches The list of certificates that match the request, that the extension has permission for and, if <code>interactive</code> is true, that were selected by the user.
     */
    export function selectClientCertificates(
      details: SelectDetails,
      callback: (
        matches: Match[],
      ) => void,
    ): void;

    /**
     * Passes the key pair of <code>certificate</code> for usage with {@link
     * platformKeys.subtleCrypto} to <code>callback</code>.
     * @param certificate The certificate of a {@link Match} returned by {@link selectClientCertificates}.
     * @param parameters Determines signature/hash algorithm parameters additionally to the parameters fixed by the key itself. The same parameters are accepted as by WebCrypto's <a href="http://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-method-importKey">importKey</a> function, e.g. <code>RsaHashedImportParams</code> for a RSASSA-PKCS1-v1_5 key. For RSASSA-PKCS1-v1_5 keys, additionally the parameters <code>{ "hash": { "name": "none" } }</code> are supported. The sign function will then apply PKCS#1 v1.5 padding and but not hash the given data. <p>Currently, this function only supports the "RSASSA-PKCS1-v1_5" algorithm with one of the hashing algorithms "none", "SHA-1", "SHA-256", "SHA-384", and "SHA-512".</p>
     * @param callback The public and private <a href="http://www.w3.org/TR/WebCryptoAPI/#dfn-CryptoKey">CryptoKey</a> of a certificate which can only be used with {@link platformKeys.subtleCrypto}.
     * @param callback.publicKey
     * @param callback.privateKey Might be <code>null</code> if this extension does not have   access to it.
     */
    export function getKeyPair(
      certificate: ArrayBuffer,
      parameters: {[name: string]: any},
      callback: (
        publicKey: {[name: string]: any},
        privateKey?: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * An implementation of WebCrypto's <a
     * href="http://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface">
     * SubtleCrypto</a> that allows crypto operations on keys of client certificates
     * that are available to this extension.
     */
    export function subtleCrypto(): {[name: string]: any};

    /**
     * Checks whether <code>details.serverCertificateChain</code> can be trusted for
     * <code>details.hostname</code> according to the trust settings of the
     * platform. Note: The actual behavior of the trust verification is not fully
     * specified and might change in the future. The API implementation verifies
     * certificate expiration, validates the certification path and checks trust by
     * a known CA. The implementation is supposed to respect the EKU serverAuth and
     * to support subject alternative names.
     * @param details
     * @param callback
     * @param callback.result
     */
    export function verifyTLSServerCertificate(
      details: VerificationDetails,
      callback: (
        result: VerificationResult,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.power</code> API to override the system's power
   * management features.
   * @chrome-permission power
 */
  export namespace power {
    export type Level = "system" | "display";

    /**
     * Requests that power management be temporarily disabled. |level| describes the
     * degree to which power management should be disabled. If a request previously
     * made by the same app is still active, it will be replaced by the new request.
     * @param level
     */
    export function requestKeepAwake(
      level: Level,
    ): void;

    /**
     * Releases a request previously made via requestKeepAwake().
     */
    export function releaseKeepAwake(): void;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.printerProvider</code> API exposes events used by print
   * manager to query printers controlled by extensions, to query their
   * capabilities and to submit print jobs to these printers.
   * @chrome-permission printerProvider
 */
  export namespace printerProvider {
    /**
     * Error codes returned in response to {@link onPrintRequested} event.
     */
    export type PrintError = "OK" | "FAILED" | "INVALID_TICKET" | "INVALID_DATA";

    export interface PrinterInfo {
      /**
       * Unique printer ID.
       */
      id: string;

      /**
       * Printer's human readable name.
       */
      name: string;

      /**
       * Printer's human readable description.
       */
      description?: string;
    }

    export interface PrintJob {
      /**
       * ID of the printer which should handle the job.
       */
      printerId: string;

      /**
       * The print job title.
       */
      title: string;

      /**
       * Print ticket in <a
       * href="https://developers.google.com/cloud-print/docs/cdd#cjt"> CJT
       * format</a>.
       */
      ticket: {[name: string]: any};

      /**
       * The document content type. Supported formats are
       * <code>"application/pdf"</code> and <code>"image/pwg-raster"</code>.
       */
      contentType: string;

      /**
       * Blob containing the document data to print. Format must match |contentType|.
       */
      document: Blob;
    }

    /**
     * Event fired when print manager requests printers provided by extensions.
     */
    export const onGetPrintersRequested: chrome.events.Event<
      (
        resultCallback: (
          printerInfo: PrinterInfo[],
        ) => void,
      ) => void
    >;

    /**
     * Event fired when print manager requests information about a USB device
     * that may be a printer. <p><em>Note:</em> An application should not rely
     * on this event being fired more than once per device. If a connected
     * device is supported it should be returned in the {@link
     * onGetPrintersRequested} event.</p>
     */
    export const onGetUsbPrinterInfoRequested: chrome.events.Event<
      /**
       * @param device The USB device.
       */
      (
        device: usb.Device,
        resultCallback: (
          printerInfo?: PrinterInfo,
        ) => void,
      ) => void
    >;

    /**
     * Event fired when print manager requests printer capabilities.
     */
    export const onGetCapabilityRequested: chrome.events.Event<
      /**
       * @param printerId Unique ID of the printer whose capabilities are requested.
       */
      (
        printerId: string,
        resultCallback: (
          capabilities: {[name: string]: any},
        ) => void,
      ) => void
    >;

    /**
     * Event fired when print manager requests printing.
     */
    export const onPrintRequested: chrome.events.Event<
      /**
       * @param printJob The printing request parameters.
       */
      (
        printJob: PrintJob,
        resultCallback: (
          result: PrintError,
        ) => void,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.privacy</code> API to control usage of the features in
   * Chrome that can affect a user's privacy. This API relies on the <a
   * href='types#ChromeSetting'>ChromeSetting prototype of the type API</a> for
   * getting and setting Chrome's configuration.
   * @chrome-permission privacy
 */
  export namespace privacy {
    /**
     * The IP handling policy of WebRTC.
     */
    export type IPHandlingPolicy = "default" | "default_public_and_private_interfaces" | "default_public_interface_only" | "disable_non_proxied_udp";

    /**
     * Settings that influence Chrome's handling of network connections in general.
     */
    export const network: {
      /**
       * If enabled, Chrome attempts to speed up your web browsing experience by
       * pre-resolving DNS entries and preemptively opening TCP and SSL connections to
       * servers. This preference only affects actions taken by Chrome's internal
       * prediction service. It does not affect webpage-initiated prefectches or
       * preconnects. This preference's value is a boolean, defaulting to
       * <code>true</code>.
       */
      networkPredictionEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome will explore all possible routing options when using
       * WebRTC to find the most performant path, possibly exposing user's private IP
       * address. Otherwise, WebRTC traffic will be routed the same way as regular
       * HTTP. This preference's value is a boolean, defaulting to <code>true</code>.
       */
      webRTCMultipleRoutesEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome is allowed to use non-proxied UDP to connect to peers or
       * TURN servers when using WebRTC. Since most proxy servers don't handle UDP,
       * using UDP possibly exposes user's IP address. Turning this off effectively
       * forces WebRTC to only use TCP for now, until UDP proxy support is available
       * in Chrome and such proxies are widely deployed. As a result, it also might
       * hurt media performance and increase the load for proxy servers. This
       * preference's value is a boolean, defaulting to <code>true</code>.
       */
      webRTCNonProxiedUdpEnabled: types.ChromeSetting<boolean>,

      /**
       * Allow users to specify the media performance/privacy tradeoffs which impacts
       * how WebRTC traffic will be routed and how much local address information is
       * exposed. This preference's value is of type IPHandlingPolicy, defaulting to
       * <code>default</code>.
       */
      webRTCIPHandlingPolicy: types.ChromeSetting<IPHandlingPolicy>,
    };

    /**
     * Settings that enable or disable features that require third-party network
     * services provided by Google and your default search provider.
     */
    export const services: {
      /**
       * If enabled, Chrome uses a web service to help resolve navigation errors. This
       * preference's value is a boolean, defaulting to <code>true</code>.
       */
      alternateErrorPagesEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome offers to automatically fill in forms. This preference's
       * value is a boolean, defaulting to <code>true</code>.
       */
      autofillEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome offers to automatically fill in addresses and other form
       * data. This preference's value is a boolean, defaulting to <code>true</code>.
       */
      autofillAddressEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome offers to automatically fill in credit card forms. This
       * preference's value is a boolean, defaulting to <code>true</code>.
       */
      autofillCreditCardEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, the password manager will ask if you want to save passwords. This
       * preference's value is a boolean, defaulting to <code>true</code>.
       */
      passwordSavingEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome does its best to protect you from phishing and malware.
       * This preference's value is a boolean, defaulting to <code>true</code>.
       */
      safeBrowsingEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome will send additional information to Google when
       * SafeBrowsing blocks a page, such as the content of the blocked page. This
       * preference's value is a boolean, defaulting to <code>false</code>.
       */
      safeBrowsingExtendedReportingEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome sends the text you type into the Omnibox to your default
       * search engine, which provides predictions of websites and searches that are
       * likely completions of what you've typed so far. This preference's value is a
       * boolean, defaulting to <code>true</code>.
       */
      searchSuggestEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome uses a web service to help correct spelling errors. This
       * preference's value is a boolean, defaulting to <code>false</code>.
       */
      spellingServiceEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome offers to translate pages that aren't in a language you
       * read. This preference's value is a boolean, defaulting to <code>true</code>.
       */
      translationServiceEnabled: types.ChromeSetting<boolean>,
    };

    /**
     * Settings that determine what information Chrome makes available to websites.
     */
    export const websites: {
      /**
       * If disabled, Chrome blocks third-party sites from setting cookies. The value
       * of this preference is of type boolean, and the default value is
       * <code>true</code>.
       */
      thirdPartyCookiesAllowed: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome sends auditing pings when requested by a website
       * (<code>&lt;a ping&gt;</code>). The value of this preference is of type
       * boolean, and the default value is <code>true</code>.
       */
      hyperlinkAuditingEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome sends <code>referer</code> headers with your requests.
       * Yes, the name of this preference doesn't match the misspelled header. No,
       * we're not going to change it. The value of this preference is of type
       * boolean, and the default value is <code>true</code>.
       */
      referrersEnabled: types.ChromeSetting<boolean>,

      /**
       * If enabled, Chrome sends 'Do Not Track' (<code>DNT: 1</code>) header with
       * your requests. The value of this preference is of type boolean, and the
       * default value is <code>false</code>.
       */
      doNotTrackEnabled: types.ChromeSetting<boolean>,

      /**
       * <strong>Available on Windows and ChromeOS only</strong>: If enabled, Chrome
       * provides a unique ID to plugins in order to run protected content. The value
       * of this preference is of type boolean, and the default value is
       * <code>true</code>.
       */
      protectedContentEnabled: types.ChromeSetting<boolean>,
    };
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.processes</code> API to interact with the browser's
   * processes.
   * @alpha
 * @chrome-permission processes
 */
  export namespace processes {
    /**
     * The types of the browser processes.
     */
    export type ProcessType = "browser" | "renderer" | "extension" | "notification" | "plugin" | "worker" | "nacl" | "utility" | "gpu" | "other";

    export interface TaskInfo {
      /**
       * The title of the task.
       */
      title: string;

      /**
       * Optional tab ID, if this task represents a tab running on a renderer process.
       */
      tabId?: number;
    }

    export interface Cache {
      /**
       * The size of the cache, in bytes.
       */
      size: number;

      /**
       * The part of the cache that is utilized, in bytes.
       */
      liveSize: number;
    }

    export interface Process {
      /**
       * Unique ID of the process provided by the browser.
       */
      id: number;

      /**
       * The ID of the process, as provided by the OS.
       */
      osProcessId: number;

      /**
       * The type of process.
       */
      type: ProcessType;

      /**
       * The profile which the process is associated with.
       */
      profile: string;

      /**
       * The debugging port for Native Client processes. Zero for other process types
       * and for NaCl processes that do not have debugging enabled.
       */
      naclDebugPort: number;

      /**
       * Array of TaskInfos representing the tasks running on this process.
       */
      tasks: TaskInfo[];

      /**
       * The most recent measurement of the process’s CPU usage, expressed as the
       * percentage of a single CPU core used in total, by all of the process’s
       * threads. This gives a value from zero to CpuInfo.numOfProcessors*100, which
       * can exceed 100% in multi-threaded processes. Only available when receiving
       * the object as part of a callback from onUpdated or onUpdatedWithMemory.
       */
      cpu?: number;

      /**
       * The most recent measurement of the process network usage, in bytes per
       * second. Only available when receiving the object as part of a callback from
       * onUpdated or onUpdatedWithMemory.
       */
      network?: number;

      /**
       * The most recent measurement of the process private memory usage, in bytes.
       * Only available when receiving the object as part of a callback from
       * onUpdatedWithMemory or getProcessInfo with the includeMemory flag.
       */
      privateMemory?: number;

      /**
       * The most recent measurement of the process JavaScript allocated memory, in
       * bytes. Only available when receiving the object as part of a callback from
       * onUpdated or onUpdatedWithMemory.
       */
      jsMemoryAllocated?: number;

      /**
       * The most recent measurement of the process JavaScript memory used, in bytes.
       * Only available when receiving the object as part of a callback from onUpdated
       * or onUpdatedWithMemory.
       */
      jsMemoryUsed?: number;

      /**
       * The most recent measurement of the process’s SQLite memory usage, in bytes.
       * Only available when receiving the object as part of a callback from onUpdated
       * or onUpdatedWithMemory.
       */
      sqliteMemory?: number;

      /**
       * The most recent information about the image cache for the process. Only
       * available when receiving the object as part of a callback from onUpdated or
       * onUpdatedWithMemory.
       */
      imageCache?: Cache;

      /**
       * The most recent information about the script cache for the process. Only
       * available when receiving the object as part of a callback from onUpdated or
       * onUpdatedWithMemory.
       */
      scriptCache?: Cache;

      /**
       * The most recent information about the CSS cache for the process. Only
       * available when receiving the object as part of a callback from onUpdated or
       * onUpdatedWithMemory.
       */
      cssCache?: Cache;
    }

    /**
     * Returns the ID of the renderer process for the specified tab.
     * @param tabId The ID of the tab for which the renderer process ID is to be returned.
     * @param callback A callback to return the ID of the renderer process of a tab.
     * @param callback.processId Process ID of the tab's renderer process.
     */
    export function getProcessIdForTab(
      tabId: number,
      callback: (
        processId: number,
      ) => void,
    ): void;

    /**
     * Terminates the specified renderer process. Equivalent to visiting
     * about:crash, but without changing the tab's URL.
     * @param processId The ID of the process to be terminated.
     * @param callback A callback to report the status of the termination.
     * @param callback.didTerminate True if terminating the process was successful, and false otherwise.
     */
    export function terminate(
      processId: number,
      callback?: (
        didTerminate: boolean,
      ) => void,
    ): void;

    /**
     * Retrieves the process information for each process ID specified.
     * @param processIds The list of process IDs or single process ID for which to return the process information. An empty list indicates all processes are requested.
     * @param includeMemory True if detailed memory usage is required. Note, collecting memory usage information incurs extra CPU usage and should only be queried for when needed.
     * @param callback A callback called when the processes information is collected.
     * @param callback.processes A dictionary of {@link Process} objects for each requested process that is a live child process of the current browser process, indexed by process ID. Metrics requiring aggregation over time will not be populated in each Process object.
     */
    export function getProcessInfo(
      processIds: number | number[],
      includeMemory: boolean,
      callback: (
        processes: {[name: string]: any},
      ) => void,
    ): void;

    /**
     * Fired each time the Task Manager updates its process statistics,
     * providing the dictionary of updated Process objects, indexed by process
     * ID.
     */
    export const onUpdated: chrome.events.Event<
      /**
       * @param processes A dictionary of updated {@link Process} objects for each live process in the browser, indexed by process ID.  Metrics requiring aggregation over time will be populated in each Process object.
       */
      (
        processes: {[name: string]: any},
      ) => void
    >;

    /**
     * Fired each time the Task Manager updates its process statistics,
     * providing the dictionary of updated Process objects, indexed by process
     * ID. Identical to onUpdate, with the addition of memory usage details
     * included in each Process object. Note, collecting memory usage
     * information incurs extra CPU usage and should only be listened for when
     * needed.
     */
    export const onUpdatedWithMemory: chrome.events.Event<
      /**
       * @param processes A dictionary of updated {@link Process} objects for each live process in the browser, indexed by process ID.  Memory usage details will be included in each Process object.
       */
      (
        processes: {[name: string]: any},
      ) => void
    >;

    /**
     * Fired each time a process is created, providing the corrseponding Process
     * object.
     */
    export const onCreated: chrome.events.Event<
      /**
       * @param process Details of the process that was created. Metrics requiring aggregation over time will not be populated in the object.
       */
      (
        process: Process,
      ) => void
    >;

    /**
     * Fired each time a process becomes unresponsive, providing the
     * corrseponding Process object.
     */
    export const onUnresponsive: chrome.events.Event<
      /**
       * @param process Details of the unresponsive process. Metrics requiring aggregation over time will not be populated in the object. Only available for renderer processes.
       */
      (
        process: Process,
      ) => void
    >;

    /**
     * Fired each time a process is terminated, providing the type of exit.
     */
    export const onExited: chrome.events.Event<
      /**
       * @param processId The ID of the process that exited.
       * @param exitType The type of exit that occurred for the process - normal, abnormal, killed, crashed. Only available for renderer processes.
       * @param exitCode The exit code if the process exited abnormally. Only available for renderer processes.
       */
      (
        processId: number,
        exitType: number,
        exitCode: number,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.proxy</code> API to manage Chrome's proxy settings. This
   * API relies on the <a href='types#ChromeSetting'>ChromeSetting prototype of
   * the type API</a> for getting and setting the proxy configuration.
   * @chrome-platform chromeos
 * @chrome-permission proxy
 */
  export namespace proxy {
    export type Scheme = "http" | "https" | "quic" | "socks4" | "socks5";

    export type Mode = "direct" | "auto_detect" | "pac_script" | "fixed_servers" | "system";

    /**
     * An object encapsulating a single proxy server's specification.
     */
    export interface ProxyServer {
      /**
       * The scheme (protocol) of the proxy server itself. Defaults to 'http'.
       */
      scheme?: Scheme;

      /**
       * The URI of the proxy server. This must be an ASCII hostname (in Punycode
       * format). IDNA is not supported, yet.
       */
      host: string;

      /**
       * The port of the proxy server. Defaults to a port that depends on the scheme.
       */
      port?: number;
    }

    /**
     * An object encapsulating the set of proxy rules for all protocols. Use either
     * 'singleProxy' or (a subset of) 'proxyForHttp', 'proxyForHttps', 'proxyForFtp'
     * and 'fallbackProxy'.
     */
    export interface ProxyRules {
      /**
       * The proxy server to be used for all per-URL requests (that is http, https,
       * and ftp).
       */
      singleProxy?: ProxyServer;

      /**
       * The proxy server to be used for HTTP requests.
       */
      proxyForHttp?: ProxyServer;

      /**
       * The proxy server to be used for HTTPS requests.
       */
      proxyForHttps?: ProxyServer;

      /**
       * The proxy server to be used for FTP requests.
       */
      proxyForFtp?: ProxyServer;

      /**
       * The proxy server to be used for everthing else or if any of the specific
       * proxyFor... is not specified.
       */
      fallbackProxy?: ProxyServer;

      /**
       * List of servers to connect to without a proxy server.
       */
      bypassList?: string[];
    }

    /**
     * An object holding proxy auto-config information. Exactly one of the fields
     * should be non-empty.
     */
    export interface PacScript {
      /**
       * URL of the PAC file to be used.
       */
      url?: string;

      /**
       * A PAC script.
       */
      data?: string;

      /**
       * If true, an invalid PAC script will prevent the network stack from falling
       * back to direct connections. Defaults to false.
       */
      mandatory?: boolean;
    }

    /**
     * An object encapsulating a complete proxy configuration.
     */
    export interface ProxyConfig {
      /**
       * The proxy rules describing this configuration. Use this for 'fixed_servers'
       * mode.
       */
      rules?: ProxyRules;

      /**
       * The proxy auto-config (PAC) script for this configuration. Use this for
       * 'pac_script' mode.
       */
      pacScript?: PacScript;

      /**
       * 'direct' = Never use a proxy<br>'auto_detect' = Auto detect proxy
       * settings<br>'pac_script' = Use specified PAC script<br>'fixed_servers' =
       * Manually specify proxy servers<br>'system' = Use system proxy settings
       */
      mode: Mode;
    }

    /**
     * Proxy settings to be used. The value of this setting is a ProxyConfig object.
     */
    export const settings: types.ChromeSetting<ProxyConfig>;

    /**
     * Notifies about proxy errors.
     */
    export const onProxyError: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * If true, the error was fatal and the network transaction was aborted.
           * Otherwise, a direct connection is used instead.
           */
          fatal: boolean,

          /**
           * The error description.
           */
          error: string,

          /**
           * Additional details about the error such as a JavaScript runtime error.
           */
          details: string,
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.runtime</code> API to retrieve the background page,
   * return details about the manifest, and listen for and respond to events in
   * the app or extension lifecycle. You can also use this API to convert the
   * relative path of URLs to fully-qualified URLs.
   */
  export namespace runtime {
    /**
     * An object which allows two way communication with other pages. See <a
     * href="messaging#connect">Long-lived connections</a> for more information.
     */
    export interface Port {
      /**
       * The name of the port, as specified in the call to {@link runtime.connect}.
       */
      name: string;

      /**
       * Immediately disconnect the port. Calling <code>disconnect()</code> on an
       * already-disconnected port has no effect. When a port is disconnected, no new
       * events will be dispatched to this port.
       */
      disconnect: () => void;

      /**
       * Fired when the port is disconnected from the other end(s). {@link
       * runtime.lastError} may be set if the port was disconnected by an error. If
       * the port is closed via {@link Port.disconnect disconnect}, then this event is
       * <em>only</em> fired on the other end. This event is fired at most once (see
       * also <a href="messaging#port-lifetime">Port lifetime</a>). The first and only
       * parameter to the event handler is this disconnected port.
       */
      onDisconnect: events.Event<() => {}>;

      /**
       * This event is fired when {@link Port.postMessage postMessage} is called by
       * the other end of the port. The first parameter is the message, the second
       * parameter is the port that received the message.
       */
      onMessage: events.Event<() => {}>;

      /**
       * Send a message to the other end of the port. If the port is disconnected, an
       * error is thrown.
       * @param postMessage.message The message to send. This object should be JSON-ifiable.
       */
      postMessage: (
        message: any,
      ) => void;

      /**
       * This property will <b>only</b> be present on ports passed to {@link
       * runtime.onConnect onConnect} / {@link runtime.onConnectExternal
       * onConnectExternal} / {@link runtime.onConnectExternal onConnectNative}
       * listeners.
       */
      sender?: MessageSender;
    }

    /**
     * An object containing information about the script context that sent a message
     * or request.
     */
    export interface MessageSender {
      /**
       * The {@link tabs.Tab} which opened the connection, if any. This property will
       * <strong>only</strong> be present when the connection was opened from a tab
       * (including content scripts), and <strong>only</strong> if the receiver is an
       * extension, not an app.
       */
      tab?: tabs.Tab;

      /**
       * The <a href='webNavigation#frame_ids'>frame</a> that opened the connection. 0
       * for top-level frames, positive for child frames. This will only be set when
       * <code>tab</code> is set.
       */
      frameId?: number;

      /**
       * The guest process id of the requesting webview, if available. Only available
       * for component extensions.
       */
      guestProcessId?: number;

      /**
       * The guest render frame routing id of the requesting webview, if available.
       * Only available for component extensions.
       */
      guestRenderFrameRoutingId?: number;

      /**
       * The ID of the extension or app that opened the connection, if any.
       */
      id?: string;

      /**
       * The URL of the page or frame that opened the connection. If the sender is in
       * an iframe, it will be iframe's URL not the URL of the page which hosts it.
       */
      url?: string;

      /**
       * The name of the native application that opened the connection, if any.
       */
      nativeApplication?: string;

      /**
       * The TLS channel ID of the page or frame that opened the connection, if
       * requested by the extension or app, and if available.
       */
      tlsChannelId?: string;
    }

    /**
     * The operating system chrome is running on.
     */
    export type PlatformOs = "mac" | "win" | "android" | "cros" | "linux" | "openbsd";

    /**
     * The machine's processor architecture.
     */
    export type PlatformArch = "arm" | "x86-32" | "x86-64" | "mips" | "mips64";

    /**
     * The native client architecture. This may be different from arch on some
     * platforms.
     */
    export type PlatformNaclArch = "arm" | "x86-32" | "x86-64" | "mips" | "mips64";

    /**
     * An object containing information about the current platform.
     */
    export interface PlatformInfo {
      /**
       * The operating system chrome is running on.
       */
      os: PlatformOs;

      /**
       * The machine's processor architecture.
       */
      arch: PlatformArch;

      /**
       * The native client architecture. This may be different from arch on some
       * platforms.
       */
      nacl_arch: PlatformNaclArch;
    }

    /**
     * Result of the update check.
     */
    export type RequestUpdateCheckStatus = "throttled" | "no_update" | "update_available";

    /**
     * The reason that this event is being dispatched.
     */
    export type OnInstalledReason = "install" | "update" | "chrome_update" | "shared_module_update";

    /**
     * The reason that the event is being dispatched. 'app_update' is used when the
     * restart is needed because the application is updated to a newer version.
     * 'os_update' is used when the restart is needed because the browser/OS is
     * updated to a newer version. 'periodic' is used when the system runs for more
     * than the permitted uptime set in the enterprise policy.
     */
    export type OnRestartRequiredReason = "app_update" | "os_update" | "periodic";

    /**
     * This will be defined during an API method callback if there was an error
     */
    export let lastError: {
      /**
       * Details about the error which occurred.
       */
      message?: string,
    } | undefined;

    /**
     * The ID of the extension/app.
     */
    export const id: string;

    /**
     * Retrieves the JavaScript 'window' object for the background page running
     * inside the current extension/app. If the background page is an event page,
     * the system will ensure it is loaded before calling the callback. If there is
     * no background page, an error is set.
     * @param callback
     * @param callback.backgroundPage The JavaScript 'window' object for the background page.
     */
    export function getBackgroundPage(
      callback: (
        backgroundPage?: Window,
      ) => void,
    ): void;

    /**
     * <p>Open your Extension's options page, if possible.</p><p>The precise
     * behavior may depend on your manifest's <code><a
     * href="optionsV2">options_ui</a></code> or <code><a
     * href="options">options_page</a></code> key, or what Chrome happens to support
     * at the time. For example, the page may be opened in a new tab, within
     * chrome://extensions, within an App, or it may just focus an open options
     * page. It will never cause the caller page to reload.</p><p>If your Extension
     * does not declare an options page, or Chrome failed to create one for some
     * other reason, the callback will set {@link lastError}.</p>
     * @param callback
     */
    export function openOptionsPage(
      callback?: () => void,
    ): void;

    /**
     * Returns details about the app or extension from the manifest. The object
     * returned is a serialization of the full <a href="manifest.html">manifest
     * file</a>.
     * @returns The manifest details.
     */
    export function getManifest(): {[name: string]: any};

    /**
     * Converts a relative path within an app/extension install directory to a
     * fully-qualified URL.
     * @param path A path to a resource within an app/extension expressed relative to its install directory.
     * @returns The fully-qualified URL to the resource.
     */
    export function getURL(
      path: string,
    ): string;

    /**
     * Sets the URL to be visited upon uninstallation. This may be used to clean up
     * server-side data, do analytics, and implement surveys. Maximum 255
     * characters.
     * @param url URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
     * @param callback Called when the uninstall URL is set. If the given URL is invalid, {@link runtime.lastError} will be set.
     */
    export function setUninstallURL(
      url: string,
      callback?: () => void,
    ): void;

    /**
     * Reloads the app or extension. This method is not supported in kiosk mode. For
     * kiosk mode, use chrome.runtime.restart() method.
     */
    export function reload(): void;

    /**
     * <p>Requests an immediate update check be done for this app/extension.</p>
     * <p><b>Important</b>: Most extensions/apps should <b>not</b> use this method,
     * since chrome already does automatic checks every few hours, and you can
     * listen for the {@link runtime.onUpdateAvailable} event without needing to
     * call requestUpdateCheck.</p><p>This method is only appropriate to call in
     * very limited circumstances, such as if your extension/app talks to a backend
     * service, and the backend service has determined that the client extension/app
     * version is very far out of date and you'd like to prompt a user to update.
     * Most other uses of requestUpdateCheck, such as calling it unconditionally
     * based on a repeating timer, probably only serve to waste client, network, and
     * server resources.</p>
     * @param callback
     * @param callback.status Result of the update check.
     * @param callback.details If an update is available, this contains more information about the available update.
     */
    export function requestUpdateCheck(
      callback: (
        status: RequestUpdateCheckStatus,
        details?: {
          /**
           * The version of the available update.
           */
          version: string,
        },
      ) => void,
    ): void;

    /**
     * Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's
     * no-op.
     */
    export function restart(): void;

    /**
     * Restart the ChromeOS device when the app runs in kiosk mode after the given
     * seconds. If called again before the time ends, the reboot will be delayed. If
     * called with a value of -1, the reboot will be cancelled. It's a no-op in
     * non-kiosk mode. It's only allowed to be called repeatedly by the first
     * extension to invoke this API.
     * @param seconds Time to wait in seconds before rebooting the device, or -1 to cancel a scheduled reboot.
     * @param callback A callback to be invoked when a restart request was successfully rescheduled.
     */
    export function restartAfterDelay(
      seconds: number,
      callback?: () => void,
    ): void;

    /**
     * Attempts to connect to connect listeners within an extension/app (such as the
     * background page), or other extensions/apps. This is useful for content
     * scripts connecting to their extension processes, inter-app/extension
     * communication, and <a href="manifest/externally_connectable.html">web
     * messaging</a>. Note that this does not connect to any listeners in a content
     * script. Extensions may connect to content scripts embedded in tabs via {@link
     * tabs.connect}.
     * @param extensionId The ID of the extension or app to connect to. If omitted, a connection will be attempted with your own extension. Required if sending messages from a web page for <a href="manifest/externally_connectable.html">web messaging</a>.
     * @param connectInfo
     * @returns Port through which messages can be sent and received. The port's {@link Port onDisconnect} event is fired if the extension/app does not exist.
     */
    export function connect(
      extensionId?: string,
      connectInfo?: {
        /**
         * Will be passed into onConnect for processes that are listening for the
         * connection event.
         */
        name?: string,

        /**
         * Whether the TLS channel ID will be passed into onConnectExternal for
         * processes that are listening for the connection event.
         */
        includeTlsChannelId?: boolean,
      },
    ): Port;

    /**
     * Connects to a native application in the host machine. See <a
     * href="nativeMessaging">Native Messaging</a> for more information.
     * @param application The name of the registered application to connect to.
     * @returns Port through which messages can be sent and received with the application
     */
    export function connectNative(
      application: string,
    ): Port;

    /**
     * Sends a single message to event listeners within your extension/app or a
     * different extension/app. Similar to {@link runtime.connect} but only sends a
     * single message, with an optional response. If sending to your extension, the
     * {@link runtime.onMessage} event will be fired in every frame of your
     * extension (except for the sender's frame), or {@link
     * runtime.onMessageExternal}, if a different extension. Note that extensions
     * cannot send messages to content scripts using this method. To send messages
     * to content scripts, use {@link tabs.sendMessage}.
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for <a href="manifest/externally_connectable.html">web messaging</a>.
     * @param message The message to send. This message should be a JSON-ifiable object.
     * @param options
     * @param responseCallback
     * @param responseCallback.response The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
     */
    export function sendMessage(
      extensionId: string,
      message: any,
      options?: {
        /**
         * Whether the TLS channel ID will be passed into onMessageExternal for
         * processes that are listening for the connection event.
         */
        includeTlsChannelId?: boolean,
      },
      responseCallback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Sends a single message to event listeners within your extension/app or a
     * different extension/app. Similar to {@link runtime.connect} but only sends a
     * single message, with an optional response. If sending to your extension, the
     * {@link runtime.onMessage} event will be fired in every frame of your
     * extension (except for the sender's frame), or {@link
     * runtime.onMessageExternal}, if a different extension. Note that extensions
     * cannot send messages to content scripts using this method. To send messages
     * to content scripts, use {@link tabs.sendMessage}.
     * @param message The message to send. This message should be a JSON-ifiable object.
     * @param options
     * @param responseCallback
     * @param responseCallback.response The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
     */
    export function sendMessage(
      message: any,
      options?: {
        /**
         * Whether the TLS channel ID will be passed into onMessageExternal for
         * processes that are listening for the connection event.
         */
        includeTlsChannelId?: boolean,
      },
      responseCallback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Send a single message to a native application.
     * @param application The name of the native messaging host.
     * @param message The message that will be passed to the native messaging host.
     * @param responseCallback
     * @param responseCallback.response The response message sent by the native messaging host. If an error occurs while connecting to the native messaging host, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
     */
    export function sendNativeMessage(
      application: string,
      message: {[name: string]: any},
      responseCallback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Returns information about the current platform.
     * @param callback Called with results
     * @param callback.platformInfo
     */
    export function getPlatformInfo(
      callback: (
        platformInfo: PlatformInfo,
      ) => void,
    ): void;

    /**
     * Returns a DirectoryEntry for the package directory.
     * @param callback
     * @param callback.directoryEntry
     */
    export function getPackageDirectoryEntry(
      callback: (
        directoryEntry: DirectoryEntry,
      ) => void,
    ): void;

    /**
     * Fired when a profile that has this extension installed first starts up.
     * This event is not fired when an incognito profile is started, even if
     * this extension is operating in 'split' incognito mode.
     */
    export const onStartup: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the extension is first installed, when the extension is
     * updated to a new version, and when Chrome is updated to a new version.
     */
    export const onInstalled: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The reason that this event is being dispatched.
           */
          reason: OnInstalledReason,

          /**
           * Indicates the previous version of the extension, which has just been updated.
           * This is present only if 'reason' is 'update'.
           */
          previousVersion?: string,

          /**
           * Indicates the ID of the imported shared module extension which updated. This
           * is present only if 'reason' is 'shared_module_update'.
           */
          id?: string,
        },
      ) => void
    >;

    /**
     * Sent to the event page just before it is unloaded. This gives the
     * extension opportunity to do some clean up. Note that since the page is
     * unloading, any asynchronous operations started while handling this event
     * are not guaranteed to complete. If more activity for the event page
     * occurs before it gets unloaded the onSuspendCanceled event will be sent
     * and the page won't be unloaded.
     */
    export const onSuspend: chrome.events.Event<
      () => void
    >;

    /**
     * Sent after onSuspend to indicate that the app won't be unloaded after
     * all.
     */
    export const onSuspendCanceled: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when an update is available, but isn't installed immediately
     * because the app is currently running. If you do nothing, the update will
     * be installed the next time the background page gets unloaded, if you want
     * it to be installed sooner you can explicitly call
     * chrome.runtime.reload(). If your extension is using a persistent
     * background page, the background page of course never gets unloaded, so
     * unless you call chrome.runtime.reload() manually in response to this
     * event the update will not get installed until the next time chrome itself
     * restarts. If no handlers are listening for this event, and your extension
     * has a persistent background page, it behaves as if
     * chrome.runtime.reload() is called in response to this event.
     */
    export const onUpdateAvailable: chrome.events.Event<
      /**
       * @param details The manifest details of the available update.
       */
      (
        details: {
          /**
           * The version number of the available update.
           */
          version: string,
          [name: string]: any
        },
      ) => void
    >;

    /**
     * Fired when a Chrome update is available, but isn't installed immediately
     * because a browser restart is required.
     */
    export const onBrowserUpdateAvailable: chrome.events.Event<
      /**
       * @deprecated Please use {@link runtime.onRestartRequired}.
       */
      () => void
    >;

    /**
     * Fired when a connection is made from either an extension process or a
     * content script (by {@link runtime.connect}).
     */
    export const onConnect: chrome.events.Event<
      /**
       * @param port
       */
      (
        port: Port,
      ) => void
    >;

    /**
     * Fired when a connection is made from another extension (by {@link
     * runtime.connect}).
     */
    export const onConnectExternal: chrome.events.Event<
      /**
       * @param port
       */
      (
        port: Port,
      ) => void
    >;

    /**
     * Fired when a connection is made from a native application. Currently only
     * supported on Chrome OS.
     */
    export const onConnectNative: chrome.events.Event<
      /**
       * @param port
       */
      (
        port: Port,
      ) => void
    >;

    /**
     * Fired when a message is sent from either an extension process (by {@link
     * runtime.sendMessage}) or a content script (by {@link tabs.sendMessage}).
     */
    export const onMessage: chrome.events.Event<
      /**
       * @param message The message sent by the calling script.
       * @param sender
       * @returns Return true from the event listener if you wish to call <code>sendResponse</code> after the event listener returns.
       */
      (
        message: any,
        sender: MessageSender,
        sendResponse: () => void,
      ) => boolean
    >;

    /**
     * Fired when a message is sent from another extension/app (by {@link
     * runtime.sendMessage}). Cannot be used in a content script.
     */
    export const onMessageExternal: chrome.events.Event<
      /**
       * @param message The message sent by the calling script.
       * @param sender
       * @returns Return true from the event listener if you wish to call <code>sendResponse</code> after the event listener returns.
       */
      (
        message: any,
        sender: MessageSender,
        sendResponse: () => void,
      ) => boolean
    >;

    /**
     * Fired when an app or the device that it runs on needs to be restarted.
     * The app should close all its windows at its earliest convenient time to
     * let the restart to happen. If the app does nothing, a restart will be
     * enforced after a 24-hour grace period has passed. Currently, this event
     * is only fired for Chrome OS kiosk apps.
     */
    export const onRestartRequired: chrome.events.Event<
      /**
       * @param reason The reason that the event is being dispatched.
       */
      (
        reason: OnRestartRequiredReason,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.sessions</code> API to query and restore tabs and
   * windows from a browsing session.
   * @chrome-permission sessions
 */
  export namespace sessions {
    export interface Filter {
      /**
       * The maximum number of entries to be fetched in the requested list. Omit this
       * parameter to fetch the maximum number of entries ({@link
       * sessions.MAX_SESSION_RESULTS}).
       */
      maxResults?: number;
    }

    export interface Session {
      /**
       * The time when the window or tab was closed or modified, represented in
       * milliseconds since the epoch.
       */
      lastModified: number;

      /**
       * The {@link tabs.Tab}, if this entry describes a tab. Either this or {@link
       * sessions.Session.window} will be set.
       */
      tab?: tabs.Tab;

      /**
       * The {@link windows.Window}, if this entry describes a window. Either this or
       * {@link sessions.Session.tab} will be set.
       */
      window?: windows.Window;
    }

    export interface Device {
      info: string;

      /**
       * The name of the foreign device.
       */
      deviceName: string;

      /**
       * A list of open window sessions for the foreign device, sorted from most
       * recently to least recently modified session.
       */
      sessions: Session[];
    }

    /**
     * The maximum number of {@link sessions.Session} that will be included in a
     * requested list.
     */
    export const MAX_SESSION_RESULTS: number;

    /**
     * Gets the list of recently closed tabs and/or windows.
     * @param filter
     * @param callback
     * @param callback.sessions The list of closed entries in reverse order that they were closed (the most recently closed tab or window will be at index <code>0</code>). The entries may contain either tabs or windows.
     */
    export function getRecentlyClosed(
      filter: Filter,
      callback: (
        sessions: Session[],
      ) => void,
    ): void;

    /**
     * Gets the list of recently closed tabs and/or windows.
     * @param callback
     * @param callback.sessions The list of closed entries in reverse order that they were closed (the most recently closed tab or window will be at index <code>0</code>). The entries may contain either tabs or windows.
     */
    export function getRecentlyClosed(
      callback: (
        sessions: Session[],
      ) => void,
    ): void;

    /**
     * Retrieves all devices with synced sessions.
     * @param filter
     * @param callback
     * @param callback.devices The list of {@link sessions.Device} objects for each synced session, sorted in order from device with most recently modified session to device with least recently modified session. {@link tabs.Tab} objects are sorted by recency in the {@link windows.Window} of the {@link sessions.Session} objects.
     */
    export function getDevices(
      filter: Filter,
      callback: (
        devices: Device[],
      ) => void,
    ): void;

    /**
     * Retrieves all devices with synced sessions.
     * @param callback
     * @param callback.devices The list of {@link sessions.Device} objects for each synced session, sorted in order from device with most recently modified session to device with least recently modified session. {@link tabs.Tab} objects are sorted by recency in the {@link windows.Window} of the {@link sessions.Session} objects.
     */
    export function getDevices(
      callback: (
        devices: Device[],
      ) => void,
    ): void;

    /**
     * Reopens a {@link windows.Window} or {@link tabs.Tab}, with an optional
     * callback to run when the entry has been restored.
     * @param sessionId The {@link windows.Window.sessionId}, or {@link tabs.Tab.sessionId} to restore. If this parameter is not specified, the most recently closed session is restored.
     * @param callback
     * @param callback.restoredSession A {@link sessions.Session} containing the restored {@link windows.Window} or {@link tabs.Tab} object.
     */
    export function restore(
      sessionId?: string,
      callback?: (
        restoredSession: Session,
      ) => void,
    ): void;

    /**
     * Fired when recently closed tabs and/or windows are changed. This event
     * does not monitor synced sessions changes.
     */
    export const onChanged: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.signedInDevices</code> API to get a list of devices
   * signed into chrome with the same account as the current profile.
   * @alpha
 * @chrome-permission signedInDevices
 */
  export namespace signedInDevices {
    export type OS = "win" | "mac" | "linux" | "chrome_os" | "android" | "ios" | "unknown";

    export type DeviceType = "desktop_or_laptop" | "phone" | "tablet" | "unknown";

    export interface DeviceInfo {
      /**
       * Name of the device. This name is usually set by the user when setting up a
       * device.
       */
      name: string;

      /**
       * Unique Id for this device. Note: The id is meaningful only in the current
       * device. This id cannot be used to refer to the same device from another
       * device or extension.
       */
      id: string;

      /**
       * The OS of the device.
       */
      os: OS;

      /**
       * Device Type.
       */
      type: DeviceType;

      /**
       * Version of chrome running in this device.
       */
      chromeVersion: string;
    }

    /**
     * Gets the array of signed in devices, signed into the same account as the
     * current profile.
     * @param isLocal If true only return the information for the local device. If false or omitted return the list of all devices including the local device.
     * @param callback The callback to be invoked with the array of DeviceInfo objects.
     * @param callback.devices
     */
    export function get(
      isLocal: boolean,
      callback: (
        devices: DeviceInfo[],
      ) => void,
    ): void;

    /**
     * Gets the array of signed in devices, signed into the same account as the
     * current profile.
     * @param callback The callback to be invoked with the array of DeviceInfo objects.
     * @param callback.devices
     */
    export function get(
      callback: (
        devices: DeviceInfo[],
      ) => void,
    ): void;

    /**
     * Fired when the DeviceInfo object of any of the signed in devices changes,
     * or when a device is added or removed.
     */
    export const onDeviceInfoChange: chrome.events.Event<
      /**
       * @param devices The array of all signed in devices.
       */
      (
        devices: DeviceInfo[],
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.storage</code> API to store, retrieve, and track changes
   * to user data.
   * @chrome-permission storage
 */
  export namespace storage {
    export interface StorageChange {
      /**
       * The old value of the item, if there was an old value.
       */
      oldValue?: any;

      /**
       * The new value of the item, if there is a new value.
       */
      newValue?: any;
    }

    export interface StorageArea {
      /**
       * Gets one or more items from storage.
       * @param keys A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object).  An empty list or object will return an empty result object.  Pass in <code>null</code> to get the entire contents of storage.
       * @param callback Callback with storage items, or on failure (in which case {@link runtime.lastError} will be set).
       * @param callback.items Object with items in their key-value mappings.
       */
      get(
        keys: string | string[] | {[name: string]: any},
        callback: (
          items: {[name: string]: any},
        ) => void,
      ): void;

      /**
       * Gets one or more items from storage.
       * @param callback Callback with storage items, or on failure (in which case {@link runtime.lastError} will be set).
       * @param callback.items Object with items in their key-value mappings.
       */
      get(
        callback: (
          items: {[name: string]: any},
        ) => void,
      ): void;

      /**
       * Gets the amount of space (in bytes) being used by one or more items.
       * @param keys A single key or list of keys to get the total usage for. An empty list will return 0. Pass in <code>null</code> to get the total usage of all of storage.
       * @param callback Callback with the amount of space being used by storage, or on failure (in which case {@link runtime.lastError} will be set).
       * @param callback.bytesInUse Amount of space being used in storage, in bytes.
       */
      getBytesInUse(
        keys: string | string[],
        callback: (
          bytesInUse: number,
        ) => void,
      ): void;

      /**
       * Gets the amount of space (in bytes) being used by one or more items.
       * @param callback Callback with the amount of space being used by storage, or on failure (in which case {@link runtime.lastError} will be set).
       * @param callback.bytesInUse Amount of space being used in storage, in bytes.
       */
      getBytesInUse(
        callback: (
          bytesInUse: number,
        ) => void,
      ): void;

      /**
       * Sets multiple items.
       * @param items <p>An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.</p><p>Primitive values such as numbers will serialize as expected. Values with a <code>typeof</code> <code>"object"</code> and <code>"function"</code> will typically serialize to <code>{}</code>, with the exception of <code>Array</code> (serializes as expected), <code>Date</code>, and <code>Regex</code> (serialize using their <code>String</code> representation).</p>
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       */
      set(
        items: {[name: string]: any},
        callback?: () => void,
      ): void;

      /**
       * Removes one or more items from storage.
       * @param keys A single key or a list of keys for items to remove.
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       */
      remove(
        keys: string | string[],
        callback?: () => void,
      ): void;

      /**
       * Removes all items from storage.
       * @param callback Callback on success, or on failure (in which case {@link runtime.lastError} will be set).
       */
      clear(
        callback?: () => void,
      ): void;

      /**
       * Fired when one or more items change.
       */
      onChanged: chrome.events.Event<
        /**
         * @param changes Object mapping each key that changed to its corresponding {@link storage.StorageChange} for that item.
         */
        (
          changes: {[name: string]: StorageChange},
        ) => void
      >;
    }

    /**
     * Items in the <code>sync</code> storage area are synced using Chrome Sync.
     */
    // TODO: missing 6 properties
    export const sync: StorageArea;

    /**
     * Items in the <code>local</code> storage area are local to each machine.
     */
    // TODO: missing 1 properties
    export const local: StorageArea;

    /**
     * Items in the <code>managed</code> storage area are set by the domain
     * administrator, and are read-only for the extension; trying to modify this
     * namespace results in an error.
     */
    export const managed: StorageArea;

    /**
     * Fired when one or more items change.
     */
    export const onChanged: chrome.events.Event<
      /**
       * @param changes Object mapping each key that changed to its corresponding {@link storage.StorageChange} for that item.
       * @param areaName The name of the storage area (<code>"sync"</code>, <code>"local"</code> or <code>"managed"</code>) the changes are for.
       */
      (
        changes: {[name: string]: StorageChange},
        areaName: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>system.cpu</code> API to query CPU metadata.
   * @chrome-permission system.cpu
 */
  export namespace system.cpu {
    export interface CpuTime {
      /**
       * The cumulative time used by userspace programs on this processor.
       */
      user: number;

      /**
       * The cumulative time used by kernel programs on this processor.
       */
      kernel: number;

      /**
       * The cumulative time spent idle by this processor.
       */
      idle: number;

      /**
       * The total cumulative time for this processor.  This value is equal to user +
       * kernel + idle.
       */
      total: number;
    }

    export interface ProcessorInfo {
      /**
       * Cumulative usage info for this logical processor.
       */
      usage: CpuTime;
    }

    export interface CpuInfo {
      /**
       * The number of logical processors.
       */
      numOfProcessors: number;

      /**
       * The architecture name of the processors.
       */
      archName: string;

      /**
       * The model name of the processors.
       */
      modelName: string;

      /**
       * A set of feature codes indicating some of the processor's capabilities. The
       * currently supported codes are "mmx", "sse", "sse2", "sse3", "ssse3",
       * "sse4_1", "sse4_2", and "avx".
       */
      features: string[];

      /**
       * Information about each logical processor.
       */
      processors: ProcessorInfo[];

      /**
       * <p>List of CPU temperature readings from each thermal zone of the CPU.
       * Temperatures are in degrees Celsius.</p><p><b>Currently supported on Chrome
       * OS only.</b></p>
       */
      temperatures: number[];
    }

    /**
     * Queries basic CPU information of the system.
     * @param callback
     * @param callback.info
     */
    export function getInfo(
      callback: (
        info: CpuInfo,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>system.display</code> API to query display metadata.
   * @chrome-permission system.display
 */
  export namespace system.display {
    export interface Bounds {
      /**
       * The x-coordinate of the upper-left corner.
       */
      left: number;

      /**
       * The y-coordinate of the upper-left corner.
       */
      top: number;

      /**
       * The width of the display in pixels.
       */
      width: number;

      /**
       * The height of the display in pixels.
       */
      height: number;
    }

    export interface Insets {
      /**
       * The x-axis distance from the left bound.
       */
      left: number;

      /**
       * The y-axis distance from the top bound.
       */
      top: number;

      /**
       * The x-axis distance from the right bound.
       */
      right: number;

      /**
       * The y-axis distance from the bottom bound.
       */
      bottom: number;
    }

    export interface Point {
      /**
       * The x-coordinate of the point.
       */
      x: number;

      /**
       * The y-coordinate of the point.
       */
      y: number;
    }

    export interface TouchCalibrationPair {
      /**
       * The coordinates of the display point.
       */
      displayPoint: Point;

      /**
       * The coordinates of the touch point corresponding to the display point.
       */
      touchPoint: Point;
    }

    export interface TouchCalibrationPairQuad {
      /**
       * First pair of touch and display point required for touch calibration.
       */
      pair1: TouchCalibrationPair;

      /**
       * Second pair of touch and display point required for touch calibration.
       */
      pair2: TouchCalibrationPair;

      /**
       * Third pair of touch and display point required for touch calibration.
       */
      pair3: TouchCalibrationPair;

      /**
       * Fourth pair of touch and display point required for touch calibration.
       */
      pair4: TouchCalibrationPair;
    }

    export interface DisplayMode {
      /**
       * The display mode width in device independent (user visible) pixels.
       */
      width: number;

      /**
       * The display mode height in device independent (user visible) pixels.
       */
      height: number;

      /**
       * The display mode width in native pixels.
       */
      widthInNativePixels: number;

      /**
       * The display mode height in native pixels.
       */
      heightInNativePixels: number;

      /**
       * The display mode UI scale factor.
       * @deprecated Use {@link  displayZoomFactor}
       */
      uiScale?: number;

      /**
       * The display mode device scale factor.
       */
      deviceScaleFactor: number;

      /**
       * The display mode refresh rate in hertz.
       */
      refreshRate: number;

      /**
       * True if the mode is the display's native mode.
       */
      isNative: boolean;

      /**
       * True if the display mode is currently selected.
       */
      isSelected: boolean;

      /**
       * True if this mode is interlaced, false if not provided.
       */
      isInterlaced?: boolean;
    }

    /**
     * Layout position, i.e. edge of parent that the display is attached to.
     */
    export type LayoutPosition = "top" | "right" | "bottom" | "left";

    export interface DisplayLayout {
      /**
       * The unique identifier of the display.
       */
      id: string;

      /**
       * The unique identifier of the parent display. Empty if this is the root.
       */
      parentId: string;

      /**
       * The layout position of this display relative to the parent. This will be
       * ignored for the root.
       */
      position: LayoutPosition;

      /**
       * The offset of the display along the connected edge. 0 indicates that the
       * topmost or leftmost corners are aligned.
       */
      offset: number;
    }

    export interface Edid {
      /**
       * 3 character manufacturer code. See Sec. 3.4.1 page 21. Required in v1.4.
       */
      manufacturerId: string;

      /**
       * 2 byte manufacturer-assigned code, Sec. 3.4.2 page 21. Required in v1.4.
       */
      productId: string;

      /**
       * Year of manufacturer, Sec. 3.4.4 page 22. Required in v1.4.
       */
      yearOfManufacture: number;
    }

    export interface DisplayUnitInfo {
      /**
       * The unique identifier of the display.
       */
      id: string;

      /**
       * The user-friendly name (e.g. "HP LCD monitor").
       */
      name: string;

      /**
       * NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
       */
      edid?: Edid;

      /**
       * Chrome OS only. Identifier of the display that is being mirrored if mirroring
       * is enabled, otherwise empty. This will be set for all displays (including the
       * display being mirrored).
       */
      mirroringSourceId: string;

      /**
       * Chrome OS only. Identifiers of the displays to which the source display is
       * being mirrored. Empty if no displays are being mirrored. This will be set to
       * the same value for all displays. This must not include |mirroringSourceId|.
       */
      mirroringDestinationIds: string[];

      /**
       * True if this is the primary display.
       */
      isPrimary: boolean;

      /**
       * True if this is an internal display.
       */
      isInternal: boolean;

      /**
       * True if this display is enabled.
       */
      isEnabled: boolean;

      /**
       * True for all displays when in unified desktop mode. See documentation for
       * {@link enableUnifiedDesktop}.
       */
      isUnified: boolean;

      /**
       * True when the display is in tablet mode. This may be set for touch devices
       * where hasAccelerometerSupport is true, e.g. when an app opens in tablet mode.
       * The default value is false. Provided for ChromeOS Settings UI only.
       * TODO(stevenjb): Remove when Settings switches to a mojo API.
       */
      isTabletMode?: boolean;

      /**
       * The number of pixels per inch along the x-axis.
       */
      dpiX: number;

      /**
       * The number of pixels per inch along the y-axis.
       */
      dpiY: number;

      /**
       * The display's clockwise rotation in degrees relative to the vertical
       * position. Currently exposed only on ChromeOS. Will be set to 0 on other
       * platforms.
       */
      rotation: number;

      /**
       * The display's logical bounds.
       */
      bounds: Bounds;

      /**
       * The display's insets within its screen's bounds. Currently exposed only on
       * ChromeOS. Will be set to empty insets on other platforms.
       */
      overscan: Insets;

      /**
       * The usable work area of the display within the display bounds. The work area
       * excludes areas of the display reserved for OS, for example taskbar and
       * launcher.
       */
      workArea: Bounds;

      /**
       * The list of available display modes. The current mode will have
       * isSelected=true. Only available on Chrome OS. Will be set to an empty array
       * on other platforms.
       */
      modes: DisplayMode[];

      /**
       * True if this display has a touch input device associated with it.
       */
      hasTouchSupport: boolean;

      /**
       * True if this display has an accelerometer associated with it. Provided for
       * ChromeOS Settings UI only. TODO(stevenjb): Remove when Settings switches to a
       * mojo API. NOTE: The name of this may change.
       */
      hasAccelerometerSupport: boolean;

      /**
       * A list of zoom factor values that can be set for the display.
       */
      availableDisplayZoomFactors: number[];

      /**
       * The ratio between the display's current and default zoom. For example, value
       * 1 is equivalent to 100% zoom, and value 1.5 is equivalent to 150% zoom.
       */
      displayZoomFactor: number;
    }

    export interface DisplayProperties {
      /**
       * Chrome OS only. If set to true, changes the display mode to unified desktop
       * (see {@link enableUnifiedDesktop} for details). If set to false, unified
       * desktop mode will be disabled. This is only valid for the primary display. If
       * provided, mirroringSourceId must not be provided and other properties will be
       * ignored. This is has no effect if not provided.
       */
      isUnified?: boolean;

      /**
       * Chrome OS only. If set and not empty, enables mirroring for this display
       * only. Otherwise disables mirroring for all displays. This value should
       * indicate the id of the source display to mirror, which must not be the same
       * as the id passed to setDisplayProperties. If set, no other property may be
       * set.
       * @deprecated Use {@link setMirrorMode}.
       */
      mirroringSourceId?: string;

      /**
       * If set to true, makes the display primary. No-op if set to false. Note: If
       * set, the display is considered primary for all other properties (i.e. {@link
       * isUnified} may be set and bounds origin may not).
       */
      isPrimary?: boolean;

      /**
       * If set, sets the display's overscan insets to the provided values. Note that
       * overscan values may not be negative or larger than a half of the screen's
       * size. Overscan cannot be changed on the internal monitor.
       */
      overscan?: Insets;

      /**
       * If set, updates the display's rotation. Legal values are [0, 90, 180, 270].
       * The rotation is set clockwise, relative to the display's vertical position.
       */
      rotation?: number;

      /**
       * If set, updates the display's logical bounds origin along the x-axis. Applied
       * together with {@link boundsOriginY}. Defaults to the current value if not set
       * and {@link boundsOriginY} is set. Note that when updating the display origin,
       * some constraints will be applied, so the final bounds origin may be different
       * than the one set. The final bounds can be retrieved using {@link getInfo}.
       * The bounds origin cannot be changed on the primary display.
       */
      boundsOriginX?: number;

      /**
       * If set, updates the display's logical bounds origin along the y-axis. See
       * documentation for {@link boundsOriginX} parameter.
       */
      boundsOriginY?: number;

      /**
       * If set, updates the display mode to the mode matching this value. If other
       * parameters are invalid, this will not be applied. If the display mode is
       * invalid, it will not be applied and an error will be set, but other
       * properties will still be applied.
       */
      displayMode?: DisplayMode;

      /**
       * If set, updates the zoom associated with the display. This zoom performs
       * re-layout and repaint thus resulting in a better quality zoom than just
       * performing a pixel by pixel stretch enlargement.
       */
      displayZoomFactor?: number;
    }

    export interface GetInfoFlags {
      /**
       * If set to true, only a single {@link DisplayUnitInfo} will be returned by
       * {@link getInfo} when in unified desktop mode (see {@link
       * enableUnifiedDesktop}). Defaults to false.
       */
      singleUnified?: boolean;
    }

    /**
     * Mirror mode, i.e. different ways of how a display is mirrored to other
     * displays.
     */
    export type MirrorMode = "off" | "normal" | "mixed";

    export interface MirrorModeInfo {
      /**
       * The mirror mode that should be set.
       */
      mode: MirrorMode;

      /**
       * The id of the mirroring source display. This is only valid for 'mixed'.
       */
      mirroringSourceId?: string;

      /**
       * The ids of the mirroring destination displays. This is only valid for
       * 'mixed'.
       */
      mirroringDestinationIds?: string[];
    }

    /**
     * Requests the information for all attached display devices.
     * @param flags Options affecting how the information is returned.
     * @param callback The callback to invoke with the results.
     * @param callback.displayInfo
     */
    export function getInfo(
      flags: GetInfoFlags,
      callback: (
        displayInfo: DisplayUnitInfo[],
      ) => void,
    ): void;

    /**
     * Requests the information for all attached display devices.
     * @param callback The callback to invoke with the results.
     * @param callback.displayInfo
     */
    export function getInfo(
      callback: (
        displayInfo: DisplayUnitInfo[],
      ) => void,
    ): void;

    /**
     * Requests the layout info for all displays. NOTE: This is only available to
     * Chrome OS Kiosk apps and Web UI.
     * @param callback The callback to invoke with the results.
     * @param callback.layouts
     */
    export function getDisplayLayout(
      callback: (
        layouts: DisplayLayout[],
      ) => void,
    ): void;

    /**
     * Updates the properties for the display specified by |id|, according to the
     * information provided in |info|. On failure, {@link runtime.lastError} will be
     * set. NOTE: This is only available to Chrome OS Kiosk apps and Web UI.
     * @param id The display's unique identifier.
     * @param info The information about display properties that should be changed.     A property will be changed only if a new value for it is specified in     |info|.
     * @param callback Empty function called when the function finishes. To find out     whether the function succeeded, {@link runtime.lastError} should be     queried.
     */
    export function setDisplayProperties(
      id: string,
      info: DisplayProperties,
      callback?: () => void,
    ): void;

    /**
     * Set the layout for all displays. Any display not included will use the
     * default layout. If a layout would overlap or be otherwise invalid it will be
     * adjusted to a valid layout. After layout is resolved, an onDisplayChanged
     * event will be triggered. NOTE: This is only available to Chrome OS Kiosk apps
     * and Web UI.
     * @param layouts The layout information, required for all displays except     the primary display.
     * @param callback Empty function called when the function finishes. To find out     whether the function succeeded, {@link runtime.lastError} should be     queried.
     */
    export function setDisplayLayout(
      layouts: DisplayLayout[],
      callback?: () => void,
    ): void;

    /**
     * Enables/disables the unified desktop feature. If enabled while mirroring is
     * active, the desktop mode will not change until mirroring is turned off.
     * Otherwise, the desktop mode will switch to unified immediately. NOTE: This is
     * only available to Chrome OS Kiosk apps and Web UI.
     * @param enabled True if unified desktop should be enabled.
     */
    export function enableUnifiedDesktop(
      enabled: boolean,
    ): void;

    /**
     * Starts overscan calibration for a display. This will show an overlay on the
     * screen indicating the current overscan insets. If overscan calibration for
     * display |id| is in progress this will reset calibration.
     * @param id The display's unique identifier.
     */
    export function overscanCalibrationStart(
      id: string,
    ): void;

    /**
     * Adjusts the current overscan insets for a display. Typically this should
     * either move the display along an axis (e.g. left+right have the same value)
     * or scale it along an axis (e.g. top+bottom have opposite values). Each Adjust
     * call is cumulative with previous calls since Start.
     * @param id The display's unique identifier.
     * @param delta The amount to change the overscan insets.
     */
    export function overscanCalibrationAdjust(
      id: string,
      delta: Insets,
    ): void;

    /**
     * Resets the overscan insets for a display to the last saved value (i.e before
     * Start was called).
     * @param id The display's unique identifier.
     */
    export function overscanCalibrationReset(
      id: string,
    ): void;

    /**
     * Complete overscan adjustments for a display  by saving the current values and
     * hiding the overlay.
     * @param id The display's unique identifier.
     */
    export function overscanCalibrationComplete(
      id: string,
    ): void;

    /**
     * Displays the native touch calibration UX for the display with |id| as display
     * id. This will show an overlay on the screen with required instructions on how
     * to proceed. The callback will be invoked in case of successful calibration
     * only. If the calibration fails, this will throw an error.
     * @param id The display's unique identifier.
     * @param callback Optional callback to inform the caller that the touch      calibration has ended. The argument of the callback informs if the      calibration was a success or not.
     * @param callback.success
     */
    export function showNativeTouchCalibration(
      id: string,
      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Starts custom touch calibration for a display. This should be called when
     * using a custom UX for collecting calibration data. If another touch
     * calibration is already in progress this will throw an error.
     * @param id The display's unique identifier.
     */
    export function startCustomTouchCalibration(
      id: string,
    ): void;

    /**
     * Sets the touch calibration pairs for a display. These |pairs| would be used
     * to calibrate the touch screen for display with |id| called in
     * startCustomTouchCalibration(). Always call |startCustomTouchCalibration|
     * before calling this method. If another touch calibration is already in
     * progress this will throw an error.
     * @param pairs The pairs of point used to calibrate the display.
     * @param bounds Bounds of the display when the touch calibration was performed.     |bounds.left| and |bounds.top| values are ignored.
     */
    export function completeCustomTouchCalibration(
      pairs: TouchCalibrationPairQuad,
      bounds: Bounds,
    ): void;

    /**
     * Resets the touch calibration for the display and brings it back to its
     * default state by clearing any touch calibration data associated with the
     * display.
     * @param id The display's unique identifier.
     */
    export function clearTouchCalibration(
      id: string,
    ): void;

    /**
     * Sets the display mode to the specified mirror mode. Each call resets the
     * state from previous calls. Calling setDisplayProperties() will fail for the
     * mirroring destination displays. NOTE: This is only available to Chrome OS
     * Kiosk apps and Web UI.
     * @param info The information of the mirror mode that should be applied to the     display mode.
     * @param callback Empty function called when the function finishes. To find out     whether the function succeeded, {@link runtime.lastError} should be     queried.
     */
    export function setMirrorMode(
      info: MirrorModeInfo,
      callback?: () => void,
    ): void;

    /**
     * Fired when anything changes to the display configuration.
     */
    export const onDisplayChanged: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * Manages an app's system indicator icon, an image displayed in the system's
   * menubar, system tray, or other visible area provided by the OS.
 This is
   * modelled after the other extension action APIs, such as
 chrome.browserAction
   * and chrome.pageAction.
   * @alpha
 */
  export namespace systemIndicator {
    export interface SetIconDetails {
      path?: any;

      imageData?: any;
    }

    /**
     * Set the image to be used as an indicator icon, using a set of ImageData
     * objects. These objects should have multiple resolutions so that an
     * appropriate size can be selected for the given icon size and DPI scaling
     * settings. Only square ImageData objects are accepted.
     * @param details
     * @param callback
     */
    export function setIcon(
      details: SetIconDetails,
      callback?: () => void,
    ): void;

    /**
     * Show the icon in the status tray.
     */
    export function enable(): void;

    /**
     * Hide the icon from the status tray.
     */
    export function disable(): void;

    /**
     * Fired only when a click on the icon does not result in a menu being
     * shown.
     */
    export const onClicked: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.system.memory</code> API.
   * @chrome-permission system.memory
 */
  export namespace system.memory {
    export interface MemoryInfo {
      /**
       * The total amount of physical memory capacity, in bytes.
       */
      capacity: number;

      /**
       * The amount of available capacity, in bytes.
       */
      availableCapacity: number;
    }

    /**
     * Get physical memory information.
     * @param callback
     * @param callback.info
     */
    export function getInfo(
      callback: (
        info: MemoryInfo,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.system.storage</code> API to query storage device
   * information and be notified when a removable storage device is attached and
   * detached.
   * @chrome-permission system.storage
 */
  export namespace system.storage {
    export type StorageUnitType = "fixed" | "removable" | "unknown";

    export interface StorageUnitInfo {
      /**
       * The transient ID that uniquely identifies the storage device. This ID will be
       * persistent within the same run of a single application. It will not be a
       * persistent identifier between different runs of an application, or between
       * different applications.
       */
      id: string;

      /**
       * The name of the storage unit.
       */
      name: string;

      /**
       * The media type of the storage unit.
       */
      type: StorageUnitType;

      /**
       * The total amount of the storage space, in bytes.
       */
      capacity: number;
    }

    export interface StorageAvailableCapacityInfo {
      /**
       * A copied |id| of getAvailableCapacity function parameter |id|.
       */
      id: string;

      /**
       * The available capacity of the storage device, in bytes.
       */
      availableCapacity: number;
    }

    export type EjectDeviceResultCode = "success" | "in_use" | "no_such_device" | "failure";

    /**
     * Get the storage information from the system. The argument passed to the
     * callback is an array of StorageUnitInfo objects.
     * @param callback
     * @param callback.info
     */
    export function getInfo(
      callback: (
        info: StorageUnitInfo[],
      ) => void,
    ): void;

    /**
     * Ejects a removable storage device.
     * @param id
     * @param callback
     * @param callback.result
     */
    export function ejectDevice(
      id: string,
      callback: (
        result: EjectDeviceResultCode,
      ) => void,
    ): void;

    /**
     * Get the available capacity of a specified |id| storage device. The |id| is
     * the transient device ID from StorageUnitInfo.
     * @param id
     * @param callback
     * @param callback.info
     */
    export function getAvailableCapacity(
      id: string,
      callback: (
        info: StorageAvailableCapacityInfo,
      ) => void,
    ): void;

    /**
     * Fired when a new removable storage is attached to the system.
     */
    export const onAttached: chrome.events.Event<
      /**
       * @param info
       */
      (
        info: StorageUnitInfo,
      ) => void
    >;

    /**
     * Fired when a removable storage is detached from the system.
     */
    export const onDetached: chrome.events.Event<
      /**
       * @param id
       */
      (
        id: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.tabCapture</code> API to interact with tab media
   * streams.
   * @chrome-permission tabCapture
 */
  export namespace tabCapture {
    export type TabCaptureState = "pending" | "active" | "stopped" | "error";

    export interface CaptureInfo {
      /**
       * The id of the tab whose status changed.
       */
      tabId: number;

      /**
       * The new capture status of the tab.
       */
      status: TabCaptureState;

      /**
       * Whether an element in the tab being captured is in fullscreen mode.
       */
      fullscreen: boolean;
    }

    export interface MediaStreamConstraint {
      mandatory: {[name: string]: any};

      optional?: {[name: string]: any};
    }

    export interface CaptureOptions {
      audio?: boolean;

      video?: boolean;

      audioConstraints?: MediaStreamConstraint;

      videoConstraints?: MediaStreamConstraint;

      presentationId?: string;
    }

    export interface GetMediaStreamOptions {
      /**
       * Optional tab id of the tab which will later invoke
       * <code>getUserMedia()</code> to consume the stream. If not specified then the
       * resulting stream can be used only by the calling extension. The stream can
       * only be used by frames in the given tab whose security origin matches the
       * consumber tab's origin. The tab's origin must be a secure origin, e.g. HTTPS.
       */
      consumerTabId?: number;

      /**
       * Optional tab id of the tab which will be captured. If not specified then the
       * current active tab will be selected. Only tabs for which the extension has
       * been granted the <code>activeTab</code> permission can be used as the target
       * tab.
       */
      targetTabId?: number;
    }

    /**
     * Captures the visible area of the currently active tab.  Capture can only be
     * started on the currently active tab after the extension has been
     * <em>invoked</em>, similar to the way that <a
     * href="activeTab#invoking-activeTab">activeTab</a> works.  Capture is
     * maintained across page navigations within the tab, and stops when the tab is
     * closed, or the media stream is closed by the extension.
     * @param options Configures the returned media stream.
     * @param callback Callback with either the tab capture MediaStream or   <code>null</code>.  <code>null</code> indicates an error has occurred   and the client may query chrome.runtime.lastError to access the error   details.
     * @param callback.stream
     */
    export function capture(
      options: CaptureOptions,
      callback: (
        stream: LocalMediaStream,
      ) => void,
    ): void;

    /**
     * Returns a list of tabs that have requested capture or are being captured,
     * i.e. status != stopped and status != error. This allows extensions to inform
     * the user that there is an existing tab capture that would prevent a new tab
     * capture from succeeding (or to prevent redundant requests for the same tab).
     * @param callback Callback invoked with CaptureInfo[] for captured tabs.
     * @param callback.result
     */
    export function getCapturedTabs(
      callback: (
        result: CaptureInfo[],
      ) => void,
    ): void;

    /**
     * <p>Creates an off-screen tab and navigates it to the given |startUrl|. Then,
     * capture is started and a MediaStream is returned via
     * |callback|.</p><p>Off-screen tabs are isolated from the user's normal browser
     * experience. They do not show up in the browser window or tab strip, nor are
     * they visible to extensions (e.g., via the chrome.tabs.* APIs).</p><p>An
     * off-screen tab remains alive until one of three events occurs: 1. All
     * MediaStreams providing its captured content are closed; 2. the page
     * self-closes (e.g., via window.close()); 3. the extension that called
     * captureOffscreenTab() is unloaded.</p><p>Sandboxing: The off-screen tab does
     * not have any access whatsoever to the local user profile (including cookies,
     * HTTP auth, etc.).  Instead, it is provided its own sandboxed profile.  Also,
     * it cannot access any interactive resources such as keyboard/mouse input,
     * media recording devices (e.g., web cams), copy/paste to/from the system
     * clipboard, etc.</p><p>Note: This is a new API, currently only available in
     * Canary/Dev channel, and may change without notice.</p>
     * @param startUrl
     * @param options Constraints for the capture and returned MediaStream.
     * @param callback Callback with either the tab capture MediaStream or   <code>null</code>.  <code>null</code> indicates an error has occurred   and the client may query chrome.runtime.lastError to access the error   details.
     * @param callback.stream
     */
    export function captureOffscreenTab(
      startUrl: string,
      options: CaptureOptions,
      callback: (
        stream: LocalMediaStream,
      ) => void,
    ): void;

    /**
     * Creates a stream ID to capture the target tab. Similar to
     * chrome.tabCapture.capture() method, but returns a media stream ID, instead of
     * a media stream, to the consumer tab.
     * @param options
     * @param callback Callback to invoke with the result. If successful, the result is an opaque string that can be passed to the <code>getUserMedia()</code> API to generate a media stream that corresponds to the target tab. The created <code>streamId</code> can only be used once and expires after a few seconds if it is not used.
     * @param callback.streamId
     */
    export function getMediaStreamId(
      options: GetMediaStreamOptions,
      callback: (
        streamId: string,
      ) => void,
    ): void;

    /**
     * Creates a stream ID to capture the target tab. Similar to
     * chrome.tabCapture.capture() method, but returns a media stream ID, instead of
     * a media stream, to the consumer tab.
     * @param callback Callback to invoke with the result. If successful, the result is an opaque string that can be passed to the <code>getUserMedia()</code> API to generate a media stream that corresponds to the target tab. The created <code>streamId</code> can only be used once and expires after a few seconds if it is not used.
     * @param callback.streamId
     */
    export function getMediaStreamId(
      callback: (
        streamId: string,
      ) => void,
    ): void;

    /**
     * Event fired when the capture status of a tab changes. This allows
     * extension authors to keep track of the capture status of tabs to keep UI
     * elements like page actions in sync.
     */
    export const onStatusChanged: chrome.events.Event<
      /**
       * @param info CaptureInfo with new capture status for the tab.
       */
      (
        info: CaptureInfo,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.tabs</code> API to interact with the browser's tab
   * system. You can use this API to create, modify, and rearrange tabs in the
   * browser.
   */
  export namespace tabs {
    /**
     * An event that caused a muted state change.
     */
    export type MutedInfoReason = "user" | "capture" | "extension";

    /**
     * The tab's muted state and the reason for the last state change.
     */
    export interface MutedInfo {
      /**
       * Whether the tab is muted (prevented from playing sound). The tab may be muted
       * even if it has not played or is not currently playing sound. Equivalent to
       * whether the 'muted' audio indicator is showing.
       */
      muted: boolean;

      /**
       * The reason the tab was muted or unmuted. Not set if the tab's mute state has
       * never been changed.
       */
      reason?: MutedInfoReason;

      /**
       * The ID of the extension that changed the muted state. Not set if an extension
       * was not the reason the muted state last changed.
       */
      extensionId?: string;
    }

    export interface Tab {
      /**
       * The ID of the tab. Tab IDs are unique within a browser session. Under some
       * circumstances a tab may not be assigned an ID; for example, when querying
       * foreign tabs using the {@link sessions} API, in which case a session ID may
       * be present. Tab ID can also be set to <code>chrome.tabs.TAB_ID_NONE</code>
       * for apps and devtools windows.
       */
      id?: number;

      /**
       * The zero-based index of the tab within its window.
       */
      index: number;

      /**
       * The ID of the window that contains the tab.
       */
      windowId: number;

      /**
       * The ID of the tab that opened this tab, if any. This property is only present
       * if the opener tab still exists.
       */
      openerTabId?: number;

      /**
       * Whether the tab is selected.
       * @deprecated Please use {@link tabs.Tab.highlighted}.
       */
      selected: boolean;

      /**
       * Whether the tab is highlighted.
       */
      highlighted: boolean;

      /**
       * Whether the tab is active in its window. Does not necessarily mean the window
       * is focused.
       */
      active: boolean;

      /**
       * Whether the tab is pinned.
       */
      pinned: boolean;

      /**
       * Whether the tab has produced sound over the past couple of seconds (but it
       * might not be heard if also muted). Equivalent to whether the 'speaker audio'
       * indicator is showing.
       */
      audible?: boolean;

      /**
       * Whether the tab is discarded. A discarded tab is one whose content has been
       * unloaded from memory, but is still visible in the tab strip. Its content is
       * reloaded the next time it is activated.
       */
      discarded: boolean;

      /**
       * Whether the tab can be discarded automatically by the browser when resources
       * are low.
       */
      autoDiscardable: boolean;

      /**
       * The tab's muted state and the reason for the last state change.
       */
      mutedInfo?: MutedInfo;

      /**
       * The URL the tab is displaying. This property is only present if the
       * extension's manifest includes the <code>"tabs"</code> permission.
       */
      url?: string;

      /**
       * The title of the tab. This property is only present if the extension's
       * manifest includes the <code>"tabs"</code> permission.
       */
      title?: string;

      /**
       * The URL of the tab's favicon. This property is only present if the
       * extension's manifest includes the <code>"tabs"</code> permission. It may also
       * be an empty string if the tab is loading.
       */
      favIconUrl?: string;

      /**
       * Either <em>loading</em> or <em>complete</em>.
       */
      status?: string;

      /**
       * Whether the tab is in an incognito window.
       */
      incognito: boolean;

      /**
       * The width of the tab in pixels.
       */
      width?: number;

      /**
       * The height of the tab in pixels.
       */
      height?: number;

      /**
       * The session ID used to uniquely identify a tab obtained from the {@link
       * sessions} API.
       */
      sessionId?: string;
    }

    /**
     * Defines how zoom changes are handled, i.e., which entity is responsible for
     * the actual scaling of the page; defaults to <code>automatic</code>.
     */
    export type ZoomSettingsMode = "automatic" | "manual" | "disabled";

    /**
     * Defines whether zoom changes persist for the page's origin, or only take
     * effect in this tab; defaults to <code>per-origin</code> when in
     * <code>automatic</code> mode, and <code>per-tab</code> otherwise.
     */
    export type ZoomSettingsScope = "per-origin" | "per-tab";

    /**
     * Defines how zoom changes in a tab are handled and at what scope.
     */
    export interface ZoomSettings {
      /**
       * Defines how zoom changes are handled, i.e., which entity is responsible for
       * the actual scaling of the page; defaults to <code>automatic</code>.
       */
      mode?: ZoomSettingsMode;

      /**
       * Defines whether zoom changes persist for the page's origin, or only take
       * effect in this tab; defaults to <code>per-origin</code> when in
       * <code>automatic</code> mode, and <code>per-tab</code> otherwise.
       */
      scope?: ZoomSettingsScope;

      /**
       * Used to return the default zoom level for the current tab in calls to
       * tabs.getZoomSettings.
       */
      defaultZoomFactor?: number;
    }

    /**
     * Whether the tabs have completed loading.
     */
    export type TabStatus = "loading" | "complete";

    /**
     * The type of window.
     */
    export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";

    /**
     * An ID that represents the absence of a browser tab.
     */
    export const TAB_ID_NONE: number;

    /**
     * Retrieves details about the specified tab.
     * @param tabId
     * @param callback
     * @param callback.tab
     */
    export function get(
      tabId: number,
      callback: (
        tab: Tab,
      ) => void,
    ): void;

    /**
     * Gets the tab that this script call is being made from. May be undefined if
     * called from a non-tab context (for example, a background page or popup view).
     * @param callback
     * @param callback.tab
     */
    export function getCurrent(
      callback: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Connects to the content script(s) in the specified tab. The {@link
     * runtime.onConnect} event is fired in each content script running in the
     * specified tab for the current extension. For more details, see <a
     * href='messaging'>Content Script Messaging</a>.
     * @param tabId
     * @param connectInfo
     * @returns A port that can be used to communicate with the content scripts running in the specified tab. The port's {@link runtime.Port} event is fired if the tab closes or does not exist.
     */
    export function connect(
      tabId: number,
      connectInfo?: {
        /**
         * Is passed into onConnect for content scripts that are listening for the
         * connection event.
         */
        name?: string,

        /**
         * Open a port to a specific <a href='webNavigation#frame_ids'>frame</a>
         * identified by <code>frameId</code> instead of all frames in the tab.
         */
        frameId?: number,
      },
    ): runtime.Port;

    /**
     * Sends a single request to the content script(s) in the specified tab, with an
     * optional callback to run when a response is sent back.  The {@link
     * extension.onRequest} event is fired in each content script running in the
     * specified tab for the current extension.
     * @param tabId
     * @param request
     * @param responseCallback
     * @param responseCallback.response The JSON response object sent by the handler of the request. If an error occurs while connecting to the specified tab, the callback is called with no arguments and {@link runtime.lastError} is set to the error message.
     * @deprecated Please use {@link runtime.sendMessage}.
     */
    export function sendRequest(
      tabId: number,
      request: any,
      responseCallback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Sends a single message to the content script(s) in the specified tab, with an
     * optional callback to run when a response is sent back.  The {@link
     * runtime.onMessage} event is fired in each content script running in the
     * specified tab for the current extension.
     * @param tabId
     * @param message The message to send. This message should be a JSON-ifiable object.
     * @param options
     * @param responseCallback
     * @param responseCallback.response The JSON response object sent by the handler of the message. If an error occurs while connecting to the specified tab, the callback is called with no arguments and {@link runtime.lastError} is set to the error message.
     */
    export function sendMessage(
      tabId: number,
      message: any,
      options?: {
        /**
         * Send a message to a specific <a href='webNavigation#frame_ids'>frame</a>
         * identified by <code>frameId</code> instead of all frames in the tab.
         */
        frameId?: number,
      },
      responseCallback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Gets the tab that is selected in the specified window.
     * @param windowId Defaults to the <a href='windows#current-window'>current window</a>.
     * @param callback
     * @param callback.tab
     * @deprecated Please use {@link tabs.query} <code>{active: true}</code>.
     */
    export function getSelected(
      windowId: number,
      callback: (
        tab: Tab,
      ) => void,
    ): void;

    /**
     * Gets the tab that is selected in the specified window.
     * @param callback
     * @param callback.tab
     * @deprecated Please use {@link tabs.query} <code>{active: true}</code>.
     */
    export function getSelected(
      callback: (
        tab: Tab,
      ) => void,
    ): void;

    /**
     * Gets details about all tabs in the specified window.
     * @param windowId Defaults to the <a href='windows#current-window'>current window</a>.
     * @param callback
     * @param callback.tabs
     * @deprecated Please use {@link tabs.query} <code>{windowId: windowId}</code>.
     */
    export function getAllInWindow(
      windowId: number,
      callback: (
        tabs: Tab[],
      ) => void,
    ): void;

    /**
     * Gets details about all tabs in the specified window.
     * @param callback
     * @param callback.tabs
     * @deprecated Please use {@link tabs.query} <code>{windowId: windowId}</code>.
     */
    export function getAllInWindow(
      callback: (
        tabs: Tab[],
      ) => void,
    ): void;

    /**
     * Creates a new tab.
     * @param createProperties
     * @param callback
     * @param callback.tab The created tab.
     */
    export function create(
      createProperties: {
        /**
         * The window in which to create the new tab. Defaults to the <a
         * href='windows#current-window'>current window</a>.
         */
        windowId?: number,

        /**
         * The position the tab should take in the window. The provided value is clamped
         * to between zero and the number of tabs in the window.
         */
        index?: number,

        /**
         * The URL to initially navigate the tab to. Fully-qualified URLs must include a
         * scheme (i.e., 'http://www.google.com', not 'www.google.com'). Relative URLs
         * are relative to the current page within the extension. Defaults to the New
         * Tab Page.
         */
        url?: string,

        /**
         * Whether the tab should become the active tab in the window. Does not affect
         * whether the window is focused (see {@link windows.update}). Defaults to
         * <var>true</var>.
         */
        active?: boolean,

        /**
         * Whether the tab should become the selected tab in the window. Defaults to
         * <var>true</var>
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned. Defaults to <var>false</var>
         */
        pinned?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be
         * in the same window as the newly created tab.
         */
        openerTabId?: number,
      },
      callback?: (
        tab: Tab,
      ) => void,
    ): void;

    /**
     * Duplicates a tab.
     * @param tabId The ID of the tab to duplicate.
     * @param callback
     * @param callback.tab Details about the duplicated tab. The {@link tabs.Tab} object does not contain <code>url</code>, <code>title</code>, and <code>favIconUrl</code> if the <code>"tabs"</code> permission has not been requested.
     */
    export function duplicate(
      tabId: number,
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Gets all tabs that have the specified properties, or all tabs if no
     * properties are specified.
     * @param queryInfo
     * @param callback
     * @param callback.result
     */
    export function query(
      queryInfo: {
        /**
         * Whether the tabs are active in their windows.
         */
        active?: boolean,

        /**
         * Whether the tabs are pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tabs are audible.
         */
        audible?: boolean,

        /**
         * Whether the tabs are muted.
         */
        muted?: boolean,

        /**
         * Whether the tabs are highlighted.
         */
        highlighted?: boolean,

        /**
         * Whether the tabs are discarded. A discarded tab is one whose content has been
         * unloaded from memory, but is still visible in the tab strip. Its content is
         * reloaded the next time it is activated.
         */
        discarded?: boolean,

        /**
         * Whether the tabs can be discarded automatically by the browser when resources
         * are low.
         */
        autoDiscardable?: boolean,

        /**
         * Whether the tabs are in the <a href='windows#current-window'>current
         * window</a>.
         */
        currentWindow?: boolean,

        /**
         * Whether the tabs are in the last focused window.
         */
        lastFocusedWindow?: boolean,

        /**
         * Whether the tabs have completed loading.
         */
        status?: TabStatus,

        /**
         * Match page titles against a pattern. This property is ignored if the
         * extension does not have the <code>"tabs"</code> permission.
         */
        title?: string,

        /**
         * Match tabs against one or more <a href='match_patterns'>URL patterns</a>.
         * Fragment identifiers are not matched. This property is ignored if the
         * extension does not have the <code>"tabs"</code> permission.
         */
        url?: string | string[],

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the <a
         * href='windows#current-window'>current window</a>.
         */
        windowId?: number,

        /**
         * The type of window the tabs are in.
         */
        windowType?: WindowType,

        /**
         * The position of the tabs within their windows.
         */
        index?: number,
      },
      callback: (
        result: Tab[],
      ) => void,
    ): void;

    /**
     * Highlights the given tabs and focuses on the first of group. Will appear to
     * do nothing if the specified tab is currently active.
     * @param highlightInfo
     * @param callback
     * @param callback.window Contains details about the window whose tabs were highlighted.
     */
    export function highlight(
      highlightInfo: {
        /**
         * The window that contains the tabs.
         */
        windowId?: number,

        /**
         * One or more tab indices to highlight.
         */
        tabs: number[] | number,
      },
      callback?: (
        window: windows.Window,
      ) => void,
    ): void;

    /**
     * Modifies the properties of a tab. Properties that are not specified in
     * <var>updateProperties</var> are not modified.
     * @param tabId Defaults to the selected tab of the <a href='windows#current-window'>current window</a>.
     * @param updateProperties
     * @param callback
     * @param callback.tab Details about the updated tab. The {@link tabs.Tab} object does not contain <code>url</code>, <code>title</code>, and <code>favIconUrl</code> if the <code>"tabs"</code> permission has not been requested.
     */
    export function update(
      tabId: number,
      updateProperties: {
        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link
         * tabs.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is
         * focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be
         * in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when
         * resources are low.
         */
        autoDiscardable?: boolean,
      },
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Modifies the properties of a tab. Properties that are not specified in
     * <var>updateProperties</var> are not modified.
     * @param updateProperties
     * @param callback
     * @param callback.tab Details about the updated tab. The {@link tabs.Tab} object does not contain <code>url</code>, <code>title</code>, and <code>favIconUrl</code> if the <code>"tabs"</code> permission has not been requested.
     */
    export function update(
      updateProperties: {
        /**
         * A URL to navigate the tab to. JavaScript URLs are not supported; use {@link
         * tabs.executeScript} instead.
         */
        url?: string,

        /**
         * Whether the tab should be active. Does not affect whether the window is
         * focused (see {@link windows.update}).
         */
        active?: boolean,

        /**
         * Adds or removes the tab from the current selection.
         */
        highlighted?: boolean,

        /**
         * Whether the tab should be selected.
         */
        selected?: boolean,

        /**
         * Whether the tab should be pinned.
         */
        pinned?: boolean,

        /**
         * Whether the tab should be muted.
         */
        muted?: boolean,

        /**
         * The ID of the tab that opened this tab. If specified, the opener tab must be
         * in the same window as this tab.
         */
        openerTabId?: number,

        /**
         * Whether the tab should be discarded automatically by the browser when
         * resources are low.
         */
        autoDiscardable?: boolean,
      },
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Moves one or more tabs to a new position within its window, or to a new
     * window. Note that tabs can only be moved to and from normal (window.type ===
     * "normal") windows.
     * @param tabIds The tab ID or list of tab IDs to move.
     * @param moveProperties
     * @param callback
     * @param callback.tabs Details about the moved tabs.
     */
    export function move(
      tabIds: number | number[],
      moveProperties: {
        /**
         * Defaults to the window the tab is currently in.
         */
        windowId?: number,

        /**
         * The position to move the window to. Use <code>-1</code> to place the tab at
         * the end of the window.
         */
        index: number,
      },
      callback?: (
        tabs: Tab | Tab[],
      ) => void,
    ): void;

    /**
     * Reload a tab.
     * @param tabId The ID of the tab to reload; defaults to the selected tab of the current window.
     * @param reloadProperties
     * @param callback
     */
    export function reload(
      tabId?: number,
      reloadProperties?: {
        /**
         * Whether to bypass local caching. Defaults to <code>false</code>.
         */
        bypassCache?: boolean,
      },
      callback?: () => void,
    ): void;

    /**
     * Closes one or more tabs.
     * @param tabIds The tab ID or list of tab IDs to close.
     * @param callback
     */
    export function remove(
      tabIds: number | number[],
      callback?: () => void,
    ): void;

    /**
     * Detects the primary language of the content in a tab.
     * @param tabId Defaults to the active tab of the <a href='windows#current-window'>current window</a>.
     * @param callback
     * @param callback.language An ISO language code such as <code>en</code> or <code>fr</code>. For a complete list of languages supported by this method, see <a href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. The second to fourth columns are checked and the first non-NULL value is returned, except for Simplified Chinese for which <code>zh-CN</code> is returned. For an unknown/undefined language, <code>und</code> is returned.
     */
    export function detectLanguage(
      tabId: number,
      callback: (
        language: string,
      ) => void,
    ): void;

    /**
     * Detects the primary language of the content in a tab.
     * @param callback
     * @param callback.language An ISO language code such as <code>en</code> or <code>fr</code>. For a complete list of languages supported by this method, see <a href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. The second to fourth columns are checked and the first non-NULL value is returned, except for Simplified Chinese for which <code>zh-CN</code> is returned. For an unknown/undefined language, <code>und</code> is returned.
     */
    export function detectLanguage(
      callback: (
        language: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified
     * window. In order to call this method, the extension must have either the <a
     * href='declare_permissions'>&lt;all_urls&gt;</a> permission or the <a
     * href='activeTab'>activeTab</a> permission. In addition to sites that
     * extensions can normally access, this method allows extensions to capture
     * sensitive sites that are otherwise restricted, including chrome:-scheme
     * pages, other extensions' pages, and data: URLs. These sensitive sites can
     * only be captured with the activeTab permission. File URLs may be captured
     * only if the extension has been granted file access.
     * @param windowId The target window. Defaults to the <a href='windows#current-window'>current window</a>.
     * @param options
     * @param callback
     * @param callback.dataUrl A data URL that encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML <code>img</code> element for display.
     */
    export function captureVisibleTab(
      windowId: number,
      options: extensionTypes.ImageDetails,
      callback: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified
     * window. In order to call this method, the extension must have either the <a
     * href='declare_permissions'>&lt;all_urls&gt;</a> permission or the <a
     * href='activeTab'>activeTab</a> permission. In addition to sites that
     * extensions can normally access, this method allows extensions to capture
     * sensitive sites that are otherwise restricted, including chrome:-scheme
     * pages, other extensions' pages, and data: URLs. These sensitive sites can
     * only be captured with the activeTab permission. File URLs may be captured
     * only if the extension has been granted file access.
     * @param options
     * @param callback
     * @param callback.dataUrl A data URL that encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML <code>img</code> element for display.
     */
    export function captureVisibleTab(
      options: extensionTypes.ImageDetails,
      callback: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified
     * window. In order to call this method, the extension must have either the <a
     * href='declare_permissions'>&lt;all_urls&gt;</a> permission or the <a
     * href='activeTab'>activeTab</a> permission. In addition to sites that
     * extensions can normally access, this method allows extensions to capture
     * sensitive sites that are otherwise restricted, including chrome:-scheme
     * pages, other extensions' pages, and data: URLs. These sensitive sites can
     * only be captured with the activeTab permission. File URLs may be captured
     * only if the extension has been granted file access.
     * @param windowId The target window. Defaults to the <a href='windows#current-window'>current window</a>.
     * @param callback
     * @param callback.dataUrl A data URL that encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML <code>img</code> element for display.
     */
    export function captureVisibleTab(
      windowId: number,
      callback: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified
     * window. In order to call this method, the extension must have either the <a
     * href='declare_permissions'>&lt;all_urls&gt;</a> permission or the <a
     * href='activeTab'>activeTab</a> permission. In addition to sites that
     * extensions can normally access, this method allows extensions to capture
     * sensitive sites that are otherwise restricted, including chrome:-scheme
     * pages, other extensions' pages, and data: URLs. These sensitive sites can
     * only be captured with the activeTab permission. File URLs may be captured
     * only if the extension has been granted file access.
     * @param callback
     * @param callback.dataUrl A data URL that encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML <code>img</code> element for display.
     */
    export function captureVisibleTab(
      callback: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Injects JavaScript code into a page. For details, see the <a
     * href='content_scripts#pi'>programmatic injection</a> section of the content
     * scripts doc.
     * @param tabId The ID of the tab in which to run the script; defaults to the active tab of the current window.
     * @param details Details of the script to run. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Called after all the JavaScript has been executed.
     * @param callback.result The result of the script in every injected frame.
     */
    export function executeScript(
      tabId: number,
      details: extensionTypes.InjectDetails,
      callback?: (
        result?: any[],
      ) => void,
    ): void;

    /**
     * Injects JavaScript code into a page. For details, see the <a
     * href='content_scripts#pi'>programmatic injection</a> section of the content
     * scripts doc.
     * @param details Details of the script to run. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Called after all the JavaScript has been executed.
     * @param callback.result The result of the script in every injected frame.
     */
    export function executeScript(
      details: extensionTypes.InjectDetails,
      callback?: (
        result?: any[],
      ) => void,
    ): void;

    /**
     * Injects CSS into a page. For details, see the <a
     * href='content_scripts#pi'>programmatic injection</a> section of the content
     * scripts doc.
     * @param tabId The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
     * @param details Details of the CSS text to insert. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Called when all the CSS has been inserted.
     */
    export function insertCSS(
      tabId: number,
      details: extensionTypes.InjectDetails,
      callback?: () => void,
    ): void;

    /**
     * Injects CSS into a page. For details, see the <a
     * href='content_scripts#pi'>programmatic injection</a> section of the content
     * scripts doc.
     * @param details Details of the CSS text to insert. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Called when all the CSS has been inserted.
     */
    export function insertCSS(
      details: extensionTypes.InjectDetails,
      callback?: () => void,
    ): void;

    /**
     * Zooms a specified tab.
     * @param tabId The ID of the tab to zoom; defaults to the active tab of the current window.
     * @param zoomFactor The new zoom factor. A value of <code>0</code> sets the tab to its current default zoom factor. Values greater than <code>0</code> specify a (possibly non-default) zoom factor for the tab.
     * @param callback Called after the zoom factor has been changed.
     */
    export function setZoom(
      tabId: number,
      zoomFactor: number,
      callback?: () => void,
    ): void;

    /**
     * Zooms a specified tab.
     * @param zoomFactor The new zoom factor. A value of <code>0</code> sets the tab to its current default zoom factor. Values greater than <code>0</code> specify a (possibly non-default) zoom factor for the tab.
     * @param callback Called after the zoom factor has been changed.
     */
    export function setZoom(
      zoomFactor: number,
      callback?: () => void,
    ): void;

    /**
     * Gets the current zoom factor of a specified tab.
     * @param tabId The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
     * @param callback Called with the tab's current zoom factor after it has been fetched.
     * @param callback.zoomFactor The tab's current zoom factor.
     */
    export function getZoom(
      tabId: number,
      callback: (
        zoomFactor: number,
      ) => void,
    ): void;

    /**
     * Gets the current zoom factor of a specified tab.
     * @param callback Called with the tab's current zoom factor after it has been fetched.
     * @param callback.zoomFactor The tab's current zoom factor.
     */
    export function getZoom(
      callback: (
        zoomFactor: number,
      ) => void,
    ): void;

    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are
     * handled. These settings are reset to defaults upon navigating the tab.
     * @param tabId The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @param callback Called after the zoom settings are changed.
     */
    export function setZoomSettings(
      tabId: number,
      zoomSettings: ZoomSettings,
      callback?: () => void,
    ): void;

    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are
     * handled. These settings are reset to defaults upon navigating the tab.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @param callback Called after the zoom settings are changed.
     */
    export function setZoomSettings(
      zoomSettings: ZoomSettings,
      callback?: () => void,
    ): void;

    /**
     * Gets the current zoom settings of a specified tab.
     * @param tabId The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
     * @param callback Called with the tab's current zoom settings.
     * @param callback.zoomSettings The tab's current zoom settings.
     */
    export function getZoomSettings(
      tabId: number,
      callback: (
        zoomSettings: ZoomSettings,
      ) => void,
    ): void;

    /**
     * Gets the current zoom settings of a specified tab.
     * @param callback Called with the tab's current zoom settings.
     * @param callback.zoomSettings The tab's current zoom settings.
     */
    export function getZoomSettings(
      callback: (
        zoomSettings: ZoomSettings,
      ) => void,
    ): void;

    /**
     * Discards a tab from memory. Discarded tabs are still visible on the tab strip
     * and are reloaded when activated.
     * @param tabId The ID of the tab to be discarded. If specified, the tab is discarded unless it is active or already discarded. If omitted, the browser discards the least important tab. This can fail if no discardable tabs exist.
     * @param callback Called after the operation is completed.
     * @param callback.tab The discarded tab, if it was successfully discarded; undefined otherwise.
     */
    export function discard(
      tabId?: number,
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Go foward to the next page, if one is available.
     * @param tabId The ID of the tab to navigate forward; defaults to the selected tab of the current window.
     * @param callback
     */
    export function goForward(
      tabId?: number,
      callback?: () => void,
    ): void;

    /**
     * Go back to the previous page, if one is available.
     * @param tabId The ID of the tab to navigate back; defaults to the selected tab of the current window.
     * @param callback
     */
    export function goBack(
      tabId?: number,
      callback?: () => void,
    ): void;

    /**
     * Fired when a tab is created. Note that the tab's URL may not be set at
     * the time this event is fired, but you can listen to onUpdated events so
     * as to be notified when a URL is set.
     */
    export const onCreated: chrome.events.Event<
      /**
       * @param tab Details of the tab that was created.
       */
      (
        tab: Tab,
      ) => void
    >;

    /**
     * Fired when a tab is updated.
     */
    export const onUpdated: chrome.events.Event<
      /**
       * @param tabId
       * @param changeInfo Lists the changes to the state of the tab that was updated.
       * @param tab Gives the state of the tab that was updated.
       */
      (
        tabId: number,
        changeInfo: {
          /**
           * The status of the tab. Can be either <em>loading</em> or <em>complete</em>.
           */
          status?: string,

          /**
           * The tab's URL if it has changed.
           */
          url?: string,

          /**
           * The tab's new pinned state.
           */
          pinned?: boolean,

          /**
           * The tab's new audible state.
           */
          audible?: boolean,

          /**
           * The tab's new discarded state.
           */
          discarded?: boolean,

          /**
           * The tab's new auto-discardable state.
           */
          autoDiscardable?: boolean,

          /**
           * The tab's new muted state and the reason for the change.
           */
          mutedInfo?: MutedInfo,

          /**
           * The tab's new favicon URL.
           */
          favIconUrl?: string,

          /**
           * The tab's new title.
           */
          title?: string,
        },
        tab: Tab,
      ) => void
    >;

    /**
     * Fired when a tab is moved within a window. Only one move event is fired,
     * representing the tab the user directly moved. Move events are not fired
     * for the other tabs that must move in response to the manually-moved tab.
     * This event is not fired when a tab is moved between windows; for details,
     * see {@link tabs.onDetached}.
     */
    export const onMoved: chrome.events.Event<
      /**
       * @param tabId
       * @param moveInfo
       */
      (
        tabId: number,
        moveInfo: {
          windowId: number,
          fromIndex: number,
          toIndex: number,
        },
      ) => void
    >;

    /**
     * Fires when the selected tab in a window changes.
     */
    export const onSelectionChanged: chrome.events.Event<
      /**
       * @param tabId The ID of the tab that has become active.
       * @param selectInfo
       * @deprecated Please use {@link tabs.onActivated}.
       */
      (
        tabId: number,
        selectInfo: {
          /**
           * The ID of the window the selected tab changed inside of.
           */
          windowId: number,
        },
      ) => void
    >;

    /**
     * Fires when the selected tab in a window changes. Note that the tab's URL
     * may not be set at the time this event fired, but you can listen to {@link
     * tabs.onUpdated} events so as to be notified when a URL is set.
     */
    export const onActiveChanged: chrome.events.Event<
      /**
       * @param tabId The ID of the tab that has become active.
       * @param selectInfo
       * @deprecated Please use {@link tabs.onActivated}.
       */
      (
        tabId: number,
        selectInfo: {
          /**
           * The ID of the window the selected tab changed inside of.
           */
          windowId: number,
        },
      ) => void
    >;

    /**
     * Fires when the active tab in a window changes. Note that the tab's URL
     * may not be set at the time this event fired, but you can listen to
     * onUpdated events so as to be notified when a URL is set.
     */
    export const onActivated: chrome.events.Event<
      /**
       * @param activeInfo
       */
      (
        activeInfo: {
          /**
           * The ID of the tab that has become active.
           */
          tabId: number,

          /**
           * The ID of the window the active tab changed inside of.
           */
          windowId: number,
        },
      ) => void
    >;

    /**
     * Fired when the highlighted or selected tabs in a window changes.
     */
    export const onHighlightChanged: chrome.events.Event<
      /**
       * @param selectInfo
       * @deprecated Please use {@link tabs.onHighlighted}.
       */
      (
        selectInfo: {
          /**
           * The window whose tabs changed.
           */
          windowId: number,

          /**
           * All highlighted tabs in the window.
           */
          tabIds: number[],
        },
      ) => void
    >;

    /**
     * Fired when the highlighted or selected tabs in a window changes.
     */
    export const onHighlighted: chrome.events.Event<
      /**
       * @param highlightInfo
       */
      (
        highlightInfo: {
          /**
           * The window whose tabs changed.
           */
          windowId: number,

          /**
           * All highlighted tabs in the window.
           */
          tabIds: number[],
        },
      ) => void
    >;

    /**
     * Fired when a tab is detached from a window; for example, because it was
     * moved between windows.
     */
    export const onDetached: chrome.events.Event<
      /**
       * @param tabId
       * @param detachInfo
       */
      (
        tabId: number,
        detachInfo: {
          oldWindowId: number,
          oldPosition: number,
        },
      ) => void
    >;

    /**
     * Fired when a tab is attached to a window; for example, because it was
     * moved between windows.
     */
    export const onAttached: chrome.events.Event<
      /**
       * @param tabId
       * @param attachInfo
       */
      (
        tabId: number,
        attachInfo: {
          newWindowId: number,
          newPosition: number,
        },
      ) => void
    >;

    /**
     * Fired when a tab is closed.
     */
    export const onRemoved: chrome.events.Event<
      /**
       * @param tabId
       * @param removeInfo
       */
      (
        tabId: number,
        removeInfo: {
          /**
           * The window whose tab is closed.
           */
          windowId: number,

          /**
           * True when the tab was closed because its parent window was closed.
           */
          isWindowClosing: boolean,
        },
      ) => void
    >;

    /**
     * Fired when a tab is replaced with another tab due to prerendering or
     * instant.
     */
    export const onReplaced: chrome.events.Event<
      /**
       * @param addedTabId
       * @param removedTabId
       */
      (
        addedTabId: number,
        removedTabId: number,
      ) => void
    >;

    /**
     * Fired when a tab is zoomed.
     */
    export const onZoomChange: chrome.events.Event<
      /**
       * @param ZoomChangeInfo
       */
      (
        ZoomChangeInfo: {
          tabId: number,
          oldZoomFactor: number,
          newZoomFactor: number,
          zoomSettings: ZoomSettings,
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.topSites</code> API to access the top sites that are
   * displayed on the new tab page.
   * @chrome-permission topSites
 */
  export namespace topSites {
    /**
     * An object encapsulating a most visited URL, such as the URLs on the new tab
     * page.
     */
    export interface MostVisitedURL {
      /**
       * The most visited URL.
       */
      url: string;

      /**
       * The title of the page
       */
      title: string;
    }

    /**
     * Gets a list of top sites.
     * @param callback
     * @param callback.data
     */
    export function get(
      callback: (
        data: MostVisitedURL[],
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.ttsEngine</code> API to implement a text-to-speech(TTS)
   * engine using an extension. If your extension registers using this API, it
   * will receive events containing an utterance to be spoken and other parameters
   * when any extension or Chrome App uses the <a href='tts'>tts</a> API to
   * generate speech. Your extension can then use any available web technology to
   * synthesize and output the speech, and send events back to the calling
   * function to report the status.
   * @chrome-permission ttsEngine
 */
  export namespace ttsEngine {
    export type VoiceGender = "male" | "female";

    /**
     * Called by an engine to update its list of voices. This list overrides any
     * voices declared in this extension's manifest.
     * @param voices Array of {@link tts.TtsVoice} objects representing the available voices for speech synthesis.
     */
    export function updateVoices(
      voices: tts.TtsVoice[],
    ): void;

    /**
     * Routes a TTS event from a speech engine to a client.
     * @param requestId
     * @param event The update event from the text-to-speech engine indicating the status of this utterance.
     */
    export function sendTtsEvent(
      requestId: number,
      event: tts.TtsEvent,
    ): void;

    /**
     * Called when the user makes a call to tts.speak() and one of the voices
     * from this extension's manifest is the first to match the options object.
     */
    export const onSpeak: chrome.events.Event<
      /**
       * @param utterance The text to speak, specified as either plain text or an SSML document. If your engine does not support SSML, you should strip out all XML markup and synthesize only the underlying text content. The value of this parameter is guaranteed to be no more than 32,768 characters. If this engine does not support speaking that many characters at a time, the utterance should be split into smaller chunks and queued internally without returning an error.
       * @param options Options specified to the tts.speak() method.
       */
      (
        utterance: string,
        options: {
          /**
           * The name of the voice to use for synthesis.
           */
          voiceName?: string,

          /**
           * The language to be used for synthesis, in the form
           * <em>language</em>-<em>region</em>. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
           */
          lang?: string,

          /**
           * Gender of voice for synthesized speech.
           */
          gender?: VoiceGender,

          /**
           * Speaking rate relative to the default rate for this voice. 1.0 is the default
           * rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and
           * 0.5 is half as fast. This value is guaranteed to be between 0.1 and 10.0,
           * inclusive. When a voice does not support this full range of rates, don't
           * return an error. Instead, clip the rate to the range the voice supports.
           */
          rate?: number,

          /**
           * Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being
           * highest. 1.0 corresponds to this voice's default pitch.
           */
          pitch?: number,

          /**
           * Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being
           * highest, with a default of 1.0.
           */
          volume?: number,
        },
        sendTtsEvent: (
          event: tts.TtsEvent,
        ) => void,
      ) => void
    >;

    /**
     * Fired when a call is made to tts.stop and this extension may be in the
     * middle of speaking. If an extension receives a call to onStop and speech
     * is already stopped, it should do nothing (not raise an error). If speech
     * is in the paused state, this should cancel the paused state.
     */
    export const onStop: chrome.events.Event<
      () => void
    >;

    /**
     * Optional: if an engine supports the pause event, it should pause the
     * current utterance being spoken, if any, until it receives a resume event
     * or stop event. Note that a stop event should also clear the paused state.
     */
    export const onPause: chrome.events.Event<
      () => void
    >;

    /**
     * Optional: if an engine supports the pause event, it should also support
     * the resume event, to continue speaking the current utterance, if any.
     * Note that a stop event should also clear the paused state.
     */
    export const onResume: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.tts</code> API to play synthesized text-to-speech (TTS).
   * See also the related <a
   * href='http://developer.chrome.com/extensions/ttsEngine'>ttsEngine</a> API,
   * which allows an extension to implement a speech engine.
   * @chrome-permission tts
 */
  export namespace tts {
    export type EventType = "start" | "end" | "word" | "sentence" | "marker" | "interrupted" | "cancelled" | "error" | "pause" | "resume";

    export type VoiceGender = "male" | "female";

    /**
     * An event from the TTS engine to communicate the status of an utterance.
     */
    export interface TtsEvent {
      /**
       * The type can be <code>start</code> as soon as speech has started,
       * <code>word</code> when a word boundary is reached, <code>sentence</code> when
       * a sentence boundary is reached, <code>marker</code> when an SSML mark element
       * is reached, <code>end</code> when the end of the utterance is reached,
       * <code>interrupted</code> when the utterance is stopped or interrupted before
       * reaching the end, <code>cancelled</code> when it's removed from the queue
       * before ever being synthesized, or <code>error</code> when any other error
       * occurs. When pausing speech, a <code>pause</code> event is fired if a
       * particular utterance is paused in the middle, and <code>resume</code> if an
       * utterance resumes speech. Note that pause and resume events may not fire if
       * speech is paused in-between utterances.
       */
      type: EventType;

      /**
       * The index of the current character in the utterance. For word events, the
       * event fires at the end of one word and before the beginning of the next. The
       * <code>charIndex</code> represents a point in the text at the beginning of the
       * next word to be spoken.
       */
      charIndex?: number;

      /**
       * The error description, if the event type is <code>error</code>.
       */
      errorMessage?: string;

      /**
       * An ID unique to the calling function's context so that events can get routed
       * back to the correct tts.speak call.
       */
      srcId?: number;

      /**
       * True if this is the final event that will be sent to this handler.
       */
      isFinalEvent?: boolean;

      /**
       * The length of the next part of the utterance. For example, in a
       * <code>word</code> event, this is the length of the word which will be spoken
       * next. It will be set to -1 if not set by the speech engine.
       */
      length?: number;
    }

    /**
     * A description of a voice available for speech synthesis.
     */
    export interface TtsVoice {
      /**
       * The name of the voice.
       */
      voiceName?: string;

      /**
       * The language that this voice supports, in the form
       * <em>language</em>-<em>region</em>. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
       */
      lang?: string;

      /**
       * This voice's gender.
       * @deprecated Gender is deprecated and will be ignored.
       */
      gender?: VoiceGender;

      /**
       * If true, the synthesis engine is a remote network resource. It may be higher
       * latency and may incur bandwidth costs.
       */
      remote?: boolean;

      /**
       * The ID of the extension providing this voice.
       */
      extensionId?: string;

      /**
       * All of the callback event types that this voice is capable of sending.
       */
      eventTypes?: EventType[];
    }

    /**
     * Speaks text using a text-to-speech engine.
     * @param utterance The text to speak, either plain text or a complete, well-formed SSML document. Speech engines that do not support SSML will strip away the tags and speak the text. The maximum length of the text is 32,768 characters.
     * @param options The speech options.
     * @param callback Called right away, before speech finishes. Check chrome.runtime.lastError to make sure there were no errors. Use options.onEvent to get more detailed feedback.
     */
    export function speak(
      utterance: string,
      options?: {
        /**
         * If true, enqueues this utterance if TTS is already in progress. If false (the
         * default), interrupts any current speech and flushes the speech queue before
         * speaking this new utterance.
         */
        enqueue?: boolean,

        /**
         * The name of the voice to use for synthesis. If empty, uses any available
         * voice.
         */
        voiceName?: string,

        /**
         * The extension ID of the speech engine to use, if known.
         */
        extensionId?: string,

        /**
         * The language to be used for synthesis, in the form
         * <em>language</em>-<em>region</em>. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.
         */
        lang?: string,

        /**
         * Gender of voice for synthesized speech.
         */
        gender?: VoiceGender,

        /**
         * Speaking rate relative to the default rate for this voice. 1.0 is the default
         * rate, normally around 180 to 220 words per minute. 2.0 is twice as fast, and
         * 0.5 is half as fast. Values below 0.1 or above 10.0 are strictly disallowed,
         * but many voices will constrain the minimum and maximum rates
         * further&mdash;for example a particular voice may not actually speak faster
         * than 3 times normal even if you specify a value larger than 3.0.
         */
        rate?: number,

        /**
         * Speaking pitch between 0 and 2 inclusive, with 0 being lowest and 2 being
         * highest. 1.0 corresponds to a voice's default pitch.
         */
        pitch?: number,

        /**
         * Speaking volume between 0 and 1 inclusive, with 0 being lowest and 1 being
         * highest, with a default of 1.0.
         */
        volume?: number,

        /**
         * The TTS event types the voice must support.
         */
        requiredEventTypes?: string[],

        /**
         * The TTS event types that you are interested in listening to. If missing, all
         * event types may be sent.
         */
        desiredEventTypes?: string[],

        /**
         * This function is called with events that occur in the process of speaking the
         * utterance.
         */
        onEvent?: (
          event: TtsEvent,
        ) => void,
      },
      callback?: () => void,
    ): void;

    /**
     * Stops any current speech and flushes the queue of any pending utterances. In
     * addition, if speech was paused, it will now be un-paused for the next call to
     * speak.
     */
    export function stop(): void;

    /**
     * Pauses speech synthesis, potentially in the middle of an utterance. A call to
     * resume or stop will un-pause speech.
     */
    export function pause(): void;

    /**
     * If speech was paused, resumes speaking where it left off.
     */
    export function resume(): void;

    /**
     * Checks whether the engine is currently speaking. On Mac OS X, the result is
     * true whenever the system speech engine is speaking, even if the speech wasn't
     * initiated by Chrome.
     * @param callback
     * @param callback.speaking True if speaking, false otherwise.
     */
    export function isSpeaking(
      callback?: (
        speaking: boolean,
      ) => void,
    ): void;

    /**
     * Gets an array of all available voices.
     * @param callback
     * @param callback.voices Array of {@link tts.TtsVoice} objects representing the available voices for speech synthesis.
     */
    export function getVoices(
      callback?: (
        voices: TtsVoice[],
      ) => void,
    ): void;

    /**
     * Used to pass events back to the function calling speak().
     */
    export const onEvent: chrome.events.Event<
      /**
       * @param event The event from the text-to-speech engine indicating the status of this utterance.
       */
      (
        event: TtsEvent,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.types</code> API contains type declarations for Chrome.
   */
  export namespace types {
    /**
     * The scope of the ChromeSetting. One of<ul><li><var>regular</var>: setting for
     * the regular profile (which is inherited by the incognito profile if not
     * overridden elsewhere),</li><li><var>regular_only</var>: setting for the
     * regular profile only (not inherited by the incognito
     * profile),</li><li><var>incognito_persistent</var>: setting for the incognito
     * profile that survives browser restarts (overrides regular
     * preferences),</li><li><var>incognito_session_only</var>: setting for the
     * incognito profile that can only be set during an incognito session and is
     * deleted when the incognito session ends (overrides regular and
     * incognito_persistent preferences).</li></ul>
     */
    export type ChromeSettingScope = "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only";

    /**
     * One of<ul><li><var>not_controllable</var>: cannot be controlled by any
     * extension</li><li><var>controlled_by_other_extensions</var>: controlled by
     * extensions with higher
     * precedence</li><li><var>controllable_by_this_extension</var>: can be
     * controlled by this extension</li><li><var>controlled_by_this_extension</var>:
     * controlled by this extension</li></ul>
     */
    export type LevelOfControl = "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension";

    /**
     * An interface that allows access to a Chrome browser setting. See {@link
     * accessibilityFeatures} for an example.
     */
    export interface ChromeSetting<T> {
      /**
       * Gets the value of a setting.
       * @param details Which setting to consider.
       * @param callback
       * @param callback.details Details of the currently effective value.
       */
      get(
        details: {
          /**
           * Whether to return the value that applies to the incognito session (default
           * false).
           */
          incognito?: boolean,
        },
        callback: (
          details: {
            /**
             * The value of the setting.
             */
            value: any,

            /**
             * The level of control of the setting.
             */
            levelOfControl: LevelOfControl,

            /**
             * Whether the effective value is specific to the incognito session.<br/>This
             * property will <em>only</em> be present if the <var>incognito</var> property
             * in the <var>details</var> parameter of <code>get()</code> was true.
             */
            incognitoSpecific?: boolean,
          },
        ) => void,
      ): void;

      /**
       * Sets the value of a setting.
       * @param details Which setting to change.
       * @param callback Called at the completion of the set operation.
       */
      set(
        details: {
          /**
           * The value of the setting. <br/>Note that every setting has a specific value
           * type, which is described together with the setting. An extension should
           * <em>not</em> set a value of a different type.
           */
          value: any,

          /**
           * Where to set the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },
        callback?: () => void,
      ): void;

      /**
       * Clears the setting, restoring any default value.
       * @param details Which setting to clear.
       * @param callback Called at the completion of the clear operation.
       */
      clear(
        details: {
          /**
           * Where to clear the setting (default: regular).
           */
          scope?: ChromeSettingScope,
        },
        callback?: () => void,
      ): void;

      /**
       * Fired after the setting changes.
       */
      onChange: chrome.events.Event<
        /**
         * @param details
         */
        (
          details: {
            /**
             * The value of the setting after the change.
             */
            value: any,

            /**
             * The level of control of the setting.
             */
            levelOfControl: LevelOfControl,

            /**
             * Whether the value that has changed is specific to the incognito
             * session.<br/>This property will <em>only</em> be present if the user has
             * enabled the extension in incognito mode.
             */
            incognitoSpecific?: boolean,
          },
        ) => void
      >;
    }
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.usb</code> API to interact with connected USB
 devices.
   * This API provides access to USB operations from within the context
 of an
   * app. Using this API, apps can function as drivers for hardware devices.
   * Errors generated by this API are reported by setting
 {@link
   * runtime.lastError} and executing the function's regular callback. The
   * callback's regular parameters will be undefined in this case.
   * @chrome-permission usb
 */
  export namespace usb {
    /**
     * Direction, Recipient, RequestType, and TransferType all map to their
     * namesakes within the USB specification.
     */
    export type Direction = "in" | "out";

    export type Recipient = "device" | "interface" | "endpoint" | "other";

    export type RequestType = "standard" | "class" | "vendor" | "reserved";

    export type TransferType = "control" | "interrupt" | "isochronous" | "bulk";

    /**
     * For interrupt and isochronous modes, SynchronizationType and UsageType map to
     * their namesakes within the USB specification.
     */
    export type SynchronizationType = "asynchronous" | "adaptive" | "synchronous";

    export type UsageType = "data" | "feedback" | "explicitFeedback" | "periodic" | "notification";

    export interface Device {
      /**
       * An opaque ID for the USB device. It remains unchanged until the device is
       * unplugged.
       */
      device: number;

      /**
       * The device vendor ID.
       */
      vendorId: number;

      /**
       * The product ID.
       */
      productId: number;

      /**
       * The device version (bcdDevice field).
       */
      version: number;

      /**
       * The iProduct string read from the device, if available.
       */
      productName: string;

      /**
       * The iManufacturer string read from the device, if available.
       */
      manufacturerName: string;

      /**
       * The iSerialNumber string read from the device, if available.
       */
      serialNumber: string;
    }

    export interface ConnectionHandle {
      /**
       * An opaque handle representing this connection to the USB device and all
       * associated claimed interfaces and pending transfers. A new handle is created
       * each time the device is opened. The connection handle is different from
       * {@link Device.device}.
       */
      handle: number;

      /**
       * The device vendor ID.
       */
      vendorId: number;

      /**
       * The product ID.
       */
      productId: number;
    }

    export interface EndpointDescriptor {
      /**
       * Endpoint address.
       */
      address: number;

      /**
       * Transfer type.
       */
      type: TransferType;

      /**
       * Transfer direction.
       */
      direction: Direction;

      /**
       * Maximum packet size.
       */
      maximumPacketSize: number;

      /**
       * Transfer synchronization mode (isochronous only).
       */
      synchronization?: SynchronizationType;

      /**
       * Endpoint usage hint.
       */
      usage?: UsageType;

      /**
       * Polling interval (interrupt and isochronous only).
       */
      pollingInterval?: number;

      /**
       * Extra descriptor data associated with this endpoint.
       */
      extra_data: ArrayBuffer;
    }

    export interface InterfaceDescriptor {
      /**
       * The interface number.
       */
      interfaceNumber: number;

      /**
       * The interface alternate setting number (defaults to <code>0</code).
       */
      alternateSetting: number;

      /**
       * The USB interface class.
       */
      interfaceClass: number;

      /**
       * The USB interface sub-class.
       */
      interfaceSubclass: number;

      /**
       * The USB interface protocol.
       */
      interfaceProtocol: number;

      /**
       * Description of the interface.
       */
      description?: string;

      /**
       * Available endpoints.
       */
      endpoints: EndpointDescriptor[];

      /**
       * Extra descriptor data associated with this interface.
       */
      extra_data: ArrayBuffer;
    }

    export interface ConfigDescriptor {
      /**
       * Is this the active configuration?
       */
      active: boolean;

      /**
       * The configuration number.
       */
      configurationValue: number;

      /**
       * Description of the configuration.
       */
      description?: string;

      /**
       * The device is self-powered.
       */
      selfPowered: boolean;

      /**
       * The device supports remote wakeup.
       */
      remoteWakeup: boolean;

      /**
       * The maximum power needed by this device in milliamps (mA).
       */
      maxPower: number;

      /**
       * Available interfaces.
       */
      interfaces: InterfaceDescriptor[];

      /**
       * Extra descriptor data associated with this configuration.
       */
      extra_data: ArrayBuffer;
    }

    export interface ControlTransferInfo {
      /**
       * The transfer direction (<code>"in"</code> or <code>"out"</code>).
       */
      direction: Direction;

      /**
       * The transfer target. The target given by <code>index</code> must be claimed
       * if <code>"interface"</code> or <code>"endpoint"</code>.
       */
      recipient: Recipient;

      /**
       * The request type.
       */
      requestType: RequestType;

      /**
       * The <code>bRequest</code> field, see <i>Universal Serial Bus Specification
       * Revision 1.1</i> &sect; 9.3.
       */
      request: number;

      /**
       * The <code>wValue</code> field, see <i>Ibid</i>.
       */
      value: number;

      /**
       * The <code>wIndex</code> field, see <i>Ibid</i>.
       */
      index: number;

      /**
       * The maximum number of bytes to receive (required only by input transfers).
       */
      length?: number;

      /**
       * The data to transmit (required only by output transfers).
       */
      data?: ArrayBuffer;

      /**
       * Request timeout (in milliseconds). The default value <code>0</code> indicates
       * no timeout.
       */
      timeout?: number;
    }

    export interface GenericTransferInfo {
      /**
       * The transfer direction (<code>"in"</code> or <code>"out"</code>).
       */
      direction: Direction;

      /**
       * The target endpoint address. The interface containing this endpoint must be
       * claimed.
       */
      endpoint: number;

      /**
       * The maximum number of bytes to receive (required only by input transfers).
       */
      length?: number;

      /**
       * The data to transmit (required only by output transfers).
       */
      data?: ArrayBuffer;

      /**
       * Request timeout (in milliseconds). The default value <code>0</code> indicates
       * no timeout.
       */
      timeout?: number;
    }

    export interface IsochronousTransferInfo {
      /**
       * Transfer parameters. The transfer length or data buffer specified in this
       * parameter block is split along <code>packetLength</code> boundaries to form
       * the individual packets of the transfer.
       */
      transferInfo: GenericTransferInfo;

      /**
       * The total number of packets in this transfer.
       */
      packets: number;

      /**
       * The length of each of the packets in this transfer.
       */
      packetLength: number;
    }

    export interface TransferResultInfo {
      /**
       * A value of <code>0</code> indicates that the transfer was a success. Other
       * values indicate failure.
       */
      resultCode?: number;

      /**
       * The data returned by an input transfer. <code>undefined</code> for output
       * transfers.
       */
      data?: ArrayBuffer;
    }

    export interface DeviceFilter {
      /**
       * Device vendor ID.
       */
      vendorId?: number;

      /**
       * Device product ID, checked only if the vendor ID matches.
       */
      productId?: number;

      /**
       * USB interface class, matches any interface on the device.
       */
      interfaceClass?: number;

      /**
       * USB interface sub-class, checked only if the interface class matches.
       */
      interfaceSubclass?: number;

      /**
       * USB interface protocol, checked only if the interface sub-class matches.
       */
      interfaceProtocol?: number;
    }

    export interface EnumerateDevicesOptions {
      /**
       * @deprecated Equivalent to setting {@link DeviceFilter.vendorId}.
       */
      vendorId?: number;

      /**
       * @deprecated Equivalent to setting {@link DeviceFilter.productId}.
       */
      productId?: number;

      /**
       * A device matching any given filter will be returned. An empty filter list
       * will return all devices the app has permission for.
       */
      filters?: DeviceFilter[];
    }

    export interface EnumerateDevicesAndRequestAccessOptions {
      /**
       * The device vendor ID.
       */
      vendorId: number;

      /**
       * The product ID.
       */
      productId: number;

      /**
       * The interface ID to request access to. Only available on Chrome OS. It has no
       * effect on other platforms.
       */
      interfaceId?: number;
    }

    export interface DevicePromptOptions {
      /**
       * Allow the user to select multiple devices.
       */
      multiple?: boolean;

      /**
       * Filter the list of devices presented to the user. If multiple filters are
       * provided devices matching any filter will be displayed.
       */
      filters?: DeviceFilter[];
    }

    /**
     * Enumerates connected USB devices.
     * @param options The properties to search for on target devices.
     * @param callback
     * @param callback.devices
     */
    export function getDevices(
      options: EnumerateDevicesOptions,
      callback: (
        devices: Device[],
      ) => void,
    ): void;

    /**
     * Presents a device picker to the user and returns the {@link Device}s
     * selected. If the user cancels the picker devices will be empty. A user
     * gesture is required for the dialog to display. Without a user gesture, the
     * callback will run as though the user cancelled.
     * @param options Configuration of the device picker dialog box.
     * @param callback Invoked with a list of chosen {@link Device}s.
     * @param callback.devices
     */
    export function getUserSelectedDevices(
      options: DevicePromptOptions,
      callback: (
        devices: Device[],
      ) => void,
    ): void;

    /**
     * Returns the full set of device configuration descriptors.
     * @param device The {@link Device} to fetch descriptors from.
     * @param callback
     * @param callback.configs
     */
    export function getConfigurations(
      device: Device,
      callback: (
        configs: ConfigDescriptor[],
      ) => void,
    ): void;

    /**
     * Requests access from the permission broker to a device claimed by Chrome OS
     * if the given interface on the device is not claimed.
     * @param device The {@link Device} to request access to.
     * @param interfaceId The particular interface requested.
     * @param callback
     * @param callback.success
     * @deprecated This function was Chrome OS specific and calling it on other
    platforms would fail. This operation is now implicitly performed as part of
    {@link openDevice} and this function will return <code>true</code> on all
    platforms.
     */
    export function requestAccess(
      device: Device,
      interfaceId: number,
      callback: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Opens a USB device returned by {@link getDevices}.
     * @param device The {@link Device} to open.
     * @param callback
     * @param callback.handle
     */
    export function openDevice(
      device: Device,
      callback: (
        handle: ConnectionHandle,
      ) => void,
    ): void;

    /**
     * <p>Finds USB devices specified by the vendor, product and (optionally)
     * interface IDs and if permissions allow opens them for use.</p><p>If the
     * access request is rejected or the device fails to be opened a connection
     * handle will not be created or returned.</p><p>Calling this method is
     * equivalent to calling {@link getDevices} followed by {@link openDevice} for
     * each device.</p>
     * @param options The properties to search for on target devices.
     * @param callback
     * @param callback.handles
     */
    export function findDevices(
      options: EnumerateDevicesAndRequestAccessOptions,
      callback: (
        handles: ConnectionHandle[],
      ) => void,
    ): void;

    /**
     * Closes a connection handle. Invoking operations on a handle after it has been
     * closed is a safe operation but causes no action to be taken.
     * @param handle The {@link ConnectionHandle} to close.
     * @param callback
     */
    export function closeDevice(
      handle: ConnectionHandle,
      callback?: () => void,
    ): void;

    /**
     * <p>Select a device configuration.</p><p>This function effectively resets the
     * device by selecting one of the device's available configurations. Only
     * configuration values greater than <code>0</code> are valid however some buggy
     * devices have a working configuration <code>0</code> and so this value is
     * allowed.</p>
     * @param handle An open connection to the device.
     * @param configurationValue
     * @param callback
     */
    export function setConfiguration(
      handle: ConnectionHandle,
      configurationValue: number,
      callback: () => void,
    ): void;

    /**
     * Gets the configuration descriptor for the currently selected configuration.
     * @param handle An open connection to the device.
     * @param callback
     * @param callback.config
     */
    export function getConfiguration(
      handle: ConnectionHandle,
      callback: (
        config: ConfigDescriptor,
      ) => void,
    ): void;

    /**
     * Lists all interfaces on a USB device.
     * @param handle An open connection to the device.
     * @param callback
     * @param callback.descriptors
     */
    export function listInterfaces(
      handle: ConnectionHandle,
      callback: (
        descriptors: InterfaceDescriptor[],
      ) => void,
    ): void;

    /**
     * <p>Claims an interface on a USB device. Before data can be transfered to an
     * interface or associated endpoints the interface must be claimed. Only one
     * connection handle can claim an interface at any given time. If the interface
     * is already claimed, this call will fail.</p><p>{@link releaseInterface}
     * should be called when the interface is no longer needed.</p>
     * @param handle An open connection to the device.
     * @param interfaceNumber The interface to be claimed.
     * @param callback
     */
    export function claimInterface(
      handle: ConnectionHandle,
      interfaceNumber: number,
      callback: () => void,
    ): void;

    /**
     * Releases a claimed interface.
     * @param handle An open connection to the device.
     * @param interfaceNumber The interface to be released.
     * @param callback
     */
    export function releaseInterface(
      handle: ConnectionHandle,
      interfaceNumber: number,
      callback: () => void,
    ): void;

    /**
     * Selects an alternate setting on a previously claimed interface.
     * @param handle An open connection to the device where this interface has been     claimed.
     * @param interfaceNumber The interface to configure.
     * @param alternateSetting The alternate setting to configure.
     * @param callback
     */
    export function setInterfaceAlternateSetting(
      handle: ConnectionHandle,
      interfaceNumber: number,
      alternateSetting: number,
      callback: () => void,
    ): void;

    /**
     * <p>Performs a control transfer on the specified device.</p><p>Control
     * transfers refer to either the device, an interface or an endpoint. Transfers
     * to an interface or endpoint require the interface to be claimed.</p>
     * @param handle An open connection to the device.
     * @param transferInfo
     * @param callback
     * @param callback.info
     */
    export function controlTransfer(
      handle: ConnectionHandle,
      transferInfo: ControlTransferInfo,
      callback: (
        info: TransferResultInfo,
      ) => void,
    ): void;

    /**
     * Performs a bulk transfer on the specified device.
     * @param handle An open connection to the device.
     * @param transferInfo The transfer parameters.
     * @param callback
     * @param callback.info
     */
    export function bulkTransfer(
      handle: ConnectionHandle,
      transferInfo: GenericTransferInfo,
      callback: (
        info: TransferResultInfo,
      ) => void,
    ): void;

    /**
     * Performs an interrupt transfer on the specified device.
     * @param handle An open connection to the device.
     * @param transferInfo The transfer parameters.
     * @param callback
     * @param callback.info
     */
    export function interruptTransfer(
      handle: ConnectionHandle,
      transferInfo: GenericTransferInfo,
      callback: (
        info: TransferResultInfo,
      ) => void,
    ): void;

    /**
     * Performs an isochronous transfer on the specific device.
     * @param handle An open connection to the device.
     * @param transferInfo
     * @param callback
     * @param callback.info
     */
    export function isochronousTransfer(
      handle: ConnectionHandle,
      transferInfo: IsochronousTransferInfo,
      callback: (
        info: TransferResultInfo,
      ) => void,
    ): void;

    /**
     * Tries to reset the USB device. If the reset fails, the given connection
     * handle will be closed and the  USB device will appear to be disconnected then
     * reconnected.  In this case {@link getDevices} or {@link findDevices} must be
     * called again to acquire the device.
     * @param handle A connection handle to reset.
     * @param callback
     * @param callback.success
     */
    export function resetDevice(
      handle: ConnectionHandle,
      callback: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Event generated when a device is added to the system. Events are only
     * broadcast to apps and extensions that have permission to access the
     * device. Permission may have been granted at install time, when the user
     * accepted an optional permission (see {@link permissions.request}), or
     * through {@link getUserSelectedDevices}.
     */
    export const onDeviceAdded: chrome.events.Event<
      /**
       * @param device
       */
      (
        device: Device,
      ) => void
    >;

    /**
     * Event generated when a device is removed from the system. See {@link
     * onDeviceAdded} for which events are delivered.
     */
    export const onDeviceRemoved: chrome.events.Event<
      /**
       * @param device
       */
      (
        device: Device,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.vpnProvider</code> API to implement a VPN
 client.
   * @chrome-platform chromeos
 * @chrome-permission vpnProvider
 */
  export namespace vpnProvider {
    export interface Parameters {
      /**
       * IP address for the VPN interface in CIDR notation. IPv4 is currently the only
       * supported mode.
       */
      address: string;

      /**
       * Broadcast address for the VPN interface. (default: deduced from IP address
       * and mask)
       */
      broadcastAddress?: string;

      /**
       * MTU setting for the VPN interface. (default: 1500 bytes)
       */
      mtu?: string;

      /**
       * Exclude network traffic to the list of IP blocks in CIDR notation from the
       * tunnel. This can be used to bypass traffic to and from the VPN server. When
       * many rules match a destination, the rule with the longest matching prefix
       * wins. Entries that correspond to the same CIDR block are treated as
       * duplicates. Such duplicates in the collated (exclusionList + inclusionList)
       * list are eliminated and the exact duplicate entry that will be eliminated is
       * undefined.
       */
      exclusionList: string[];

      /**
       * Include network traffic to the list of IP blocks in CIDR notation to the
       * tunnel. This parameter can be used to set up a split tunnel. By default no
       * traffic is directed to the tunnel. Adding the entry "0.0.0.0/0" to this list
       * gets all the user traffic redirected to the tunnel. When many rules match a
       * destination, the rule with the longest matching prefix wins. Entries that
       * correspond to the same CIDR block are treated as duplicates. Such duplicates
       * in the collated (exclusionList + inclusionList) list are eliminated and the
       * exact duplicate entry that will be eliminated is undefined.
       */
      inclusionList: string[];

      /**
       * A list of search domains. (default: no search domain)
       */
      domainSearch?: string[];

      /**
       * A list of IPs for the DNS servers.
       */
      dnsServers: string[];

      /**
       * <p>Whether or not the VPN extension implements auto-reconnection.</p><p>If
       * true, the <code>linkDown</code>, <code>linkUp</code>,
       * <code>linkChanged</code>, <code>suspend</code>, and <code>resume</code>
       * platform messages will be used to signal the respective events. If false, the
       * system will forcibly disconnect the VPN if the network topology changes, and
       * the user will need to reconnect manually. (default: false)</p><p>This
       * property is new in Chrome 51; it will generate an exception in earlier
       * versions. try/catch can be used to conditionally enable the feature based on
       * browser support.</p>
       */
      reconnect?: string;
    }

    /**
     * The enum is used by the platform to notify the client of the VPN session
     * status.
     */
    export type PlatformMessage = "connected" | "disconnected" | "error" | "linkDown" | "linkUp" | "linkChanged" | "suspend" | "resume";

    /**
     * The enum is used by the VPN client to inform the platform of its current
     * state. This helps provide meaningful messages to the user.
     */
    export type VpnConnectionState = "connected" | "failure";

    /**
     * The enum is used by the platform to indicate the event that triggered
     * <code>onUIEvent</code>.
     */
    export type UIEvent = "showAddDialog" | "showConfigureDialog";

    /**
     * Creates a new VPN configuration that persists across multiple login sessions
     * of the user.
     * @param name The name of the VPN configuration.
     * @param callback Called when the configuration is created or if there is an error.
     * @param callback.id A unique ID for the created configuration, or <code>undefined</code> on failure.
     */
    export function createConfig(
      name: string,
      callback: (
        id: string,
      ) => void,
    ): void;

    /**
     * Destroys a VPN configuration created by the extension.
     * @param id ID of the VPN configuration to destroy.
     * @param callback Called when the configuration is destroyed or if there is an error.
     */
    export function destroyConfig(
      id: string,
      callback?: () => void,
    ): void;

    /**
     * Sets the parameters for the VPN session. This should be called immediately
     * after <code>"connected"</code> is received from the platform. This will
     * succeed only when the VPN session is owned by the extension.
     * @param parameters The parameters for the VPN session.
     * @param callback Called when the parameters are set or if there is an error.
     */
    export function setParameters(
      parameters: Parameters,
      callback: () => void,
    ): void;

    /**
     * Sends an IP packet through the tunnel created for the VPN session. This will
     * succeed only when the VPN session is owned by the extension.
     * @param data The IP packet to be sent to the platform.
     * @param callback Called when the packet is sent or if there is an error.
     */
    export function sendPacket(
      data: ArrayBuffer,
      callback?: () => void,
    ): void;

    /**
     * Notifies the VPN session state to the platform. This will succeed only when
     * the VPN session is owned by the extension.
     * @param state The VPN session state of the VPN client.
     * @param callback Called when the notification is complete or if there is an error.
     */
    export function notifyConnectionStateChanged(
      state: VpnConnectionState,
      callback?: () => void,
    ): void;

    /**
     * Triggered when a message is received from the platform for a VPN
     * configuration owned by the extension.
     */
    export const onPlatformMessage: chrome.events.Event<
      /**
       * @param id ID of the configuration the message is intended for.
       * @param message The message received from the platform.  Note that new message types may be added in future Chrome versions to support new features.
       * @param error Error message when there is an error.
       */
      (
        id: string,
        message: PlatformMessage,
        error: string,
      ) => void
    >;

    /**
     * Triggered when an IP packet is received via the tunnel for the VPN
     * session owned by the extension.
     */
    export const onPacketReceived: chrome.events.Event<
      /**
       * @param data The IP packet received from the platform.
       */
      (
        data: ArrayBuffer,
      ) => void
    >;

    /**
     * Triggered when a configuration created by the extension is removed by the
     * platform.
     */
    export const onConfigRemoved: chrome.events.Event<
      /**
       * @param id ID of the removed configuration.
       */
      (
        id: string,
      ) => void
    >;

    /**
     * Triggered when a configuration is created by the platform for the
     * extension.
     */
    export const onConfigCreated: chrome.events.Event<
      /**
       * @param id ID of the configuration created.
       * @param name Name of the configuration created.
       * @param data Configuration data provided by the administrator.
       */
      (
        id: string,
        name: string,
        data: {[name: string]: any},
      ) => void
    >;

    /**
     * Triggered when there is a UI event for the extension. UI events are
     * signals from the platform that indicate to the app that a UI dialog needs
     * to be shown to the user.
     */
    export const onUIEvent: chrome.events.Event<
      /**
       * @param event The UI event that is triggered.
       * @param id ID of the configuration for which the UI event was triggered.
       */
      (
        event: UIEvent,
        id?: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.wallpaper</code> API to change the ChromeOS wallpaper.
   * @chrome-platform chromeos
 * @chrome-permission wallpaper
 */
  export namespace wallpaper {
    /**
     * The supported wallpaper layouts.
     */
    export type WallpaperLayout = "STRETCH" | "CENTER" | "CENTER_CROPPED";

    /**
     * Sets wallpaper to the image at <em>url</em> or <em>wallpaperData</em> with
     * the specified <em>layout</em>
     * @param details
     * @param callback
     * @param callback.thumbnail The jpeg encoded wallpaper thumbnail. It is generated by resizing the wallpaper to 128x60.
     */
    export function setWallpaper(
      details: {
        /**
         * The jpeg or png encoded wallpaper image as an ArrayBuffer.
         */
        data?: ArrayBuffer,

        /**
         * The URL of the wallpaper to be set (can be relative).
         */
        url?: string,

        /**
         * The supported wallpaper layouts.
         */
        layout: WallpaperLayout,

        /**
         * The file name of the saved wallpaper.
         */
        filename: string,

        /**
         * True if a 128x60 thumbnail should be generated. Layout and ratio are not
         * supported yet.
         */
        thumbnail?: boolean,
      },
      callback: (
        thumbnail?: ArrayBuffer,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.webNavigation</code> API to receive notifications about
   * the status of navigation requests in-flight.
   * @chrome-permission webNavigation
 */
  export namespace webNavigation {
    /**
     * Cause of the navigation. The same transition types as defined in the history
     * API are used. These are the same transition types as defined in the <a
     * href="history#transition_types">history API</a> except with
     * <code>"start_page"</code> in place of <code>"auto_toplevel"</code> (for
     * backwards compatibility).
     */
    export type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "start_page" | "form_submit" | "reload" | "keyword" | "keyword_generated";

    export type TransitionQualifier = "client_redirect" | "server_redirect" | "forward_back" | "from_address_bar";

    /**
     * Retrieves information about the given frame. A frame refers to an
     * &lt;iframe&gt; or a &lt;frame&gt; of a web page and is identified by a tab ID
     * and a frame ID.
     * @param details Information about the frame to retrieve information about.
     * @param callback
     * @param callback.details Information about the requested frame, null if the specified frame ID and/or tab ID are invalid.
     */
    export function getFrame(
      details: {
        /**
         * The ID of the tab in which the frame is.
         */
        tabId: number,

        /**
         * The ID of the process that runs the renderer for this tab.
         */
        processId?: number,

        /**
         * The ID of the frame in the given tab.
         */
        frameId: number,
      },
      callback: (
        details?: {
          /**
           * True if the last navigation in this frame was interrupted by an error, i.e.
           * the onErrorOccurred event fired.
           */
          errorOccurred: boolean,

          /**
           * The URL currently associated with this frame, if the frame identified by the
           * frameId existed at one point in the given tab. The fact that an URL is
           * associated with a given frameId does not imply that the corresponding frame
           * still exists.
           */
          url: string,

          /**
           * The ID of the parent frame, or <code>-1</code> if this is the main frame.
           */
          parentFrameId: number,
        },
      ) => void,
    ): void;

    /**
     * Retrieves information about all frames of a given tab.
     * @param details Information about the tab to retrieve all frames from.
     * @param callback
     * @param callback.details A list of frames in the given tab, null if the specified tab ID is invalid.
     */
    export function getAllFrames(
      details: {
        /**
         * The ID of the tab.
         */
        tabId: number,
      },
      callback: (
        details?: {
          /**
           * True if the last navigation in this frame was interrupted by an error, i.e.
           * the onErrorOccurred event fired.
           */
          errorOccurred: boolean,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * The ID of the frame. 0 indicates that this is the main frame; a positive
           * value indicates the ID of a subframe.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or <code>-1</code> if this is the main frame.
           */
          parentFrameId: number,

          /**
           * The URL currently associated with this frame.
           */
          url: string,
        }[],
      ) => void,
    ): void;

    /**
     * Fired when a navigation is about to occur.
     */
    export const onBeforeNavigate: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the tab in which the navigation is about to occur.
           */
          tabId: number,
          url: string,

          /**
           * The value of -1.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique for a given
           * tab and process.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or <code>-1</code> if this is the main frame.
           */
          parentFrameId: number,

          /**
           * The time when the browser was about to start the navigation, in milliseconds
           * since the epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;

    /**
     * Fired when a navigation is committed. The document (and the resources it
     * refers to, such as images and subframes) might still be downloading, but
     * at least part of the document has been received from the server and the
     * browser has decided to switch to the new document.
     */
    export const onCommitted: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,
          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or <code>-1</code> if this is the main frame.
           */
          parentFrameId: number,

          /**
           * Cause of the navigation.
           */
          transitionType: TransitionType,

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: TransitionQualifier[],

          /**
           * The time when the navigation was committed, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;

    /**
     * Fired when the page's DOM is fully constructed, but the referenced
     * resources may not finish loading.
     */
    export const onDOMContentLoaded: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,
          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or <code>-1</code> if this is the main frame.
           */
          parentFrameId: number,

          /**
           * The time when the page's DOM was fully constructed, in milliseconds since the
           * epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;

    /**
     * Fired when a document, including the resources it refers to, is
     * completely loaded and initialized.
     */
    export const onCompleted: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,
          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or <code>-1</code> if this is the main frame.
           */
          parentFrameId: number,

          /**
           * The time when the document finished loading, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;

    /**
     * Fired when an error occurs and the navigation is aborted. This can happen
     * if either a network error occurred, or the user aborted the navigation.
     */
    export const onErrorOccurred: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,
          url: string,

          /**
           * The value of -1.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or <code>-1</code> if this is the main frame.
           */
          parentFrameId: number,

          /**
           * The error description.
           */
          error: string,

          /**
           * The time when the error occurred, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;

    /**
     * Fired when a new window, or a new tab in an existing window, is created
     * to host a navigation.
     */
    export const onCreatedNavigationTarget: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the tab in which the navigation is triggered.
           */
          sourceTabId: number,

          /**
           * The ID of the process that runs the renderer for the source frame.
           */
          sourceProcessId: number,

          /**
           * The ID of the frame with sourceTabId in which the navigation is triggered. 0
           * indicates the main frame.
           */
          sourceFrameId: number,

          /**
           * The URL to be opened in the new window.
           */
          url: string,

          /**
           * The ID of the tab in which the url is opened
           */
          tabId: number,

          /**
           * The time when the browser was about to create a new view, in milliseconds
           * since the epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;

    /**
     * Fired when the reference fragment of a frame was updated. All future
     * events for that frame will use the updated URL.
     */
    export const onReferenceFragmentUpdated: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,
          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or <code>-1</code> if this is the main frame.
           */
          parentFrameId: number,

          /**
           * Cause of the navigation.
           */
          transitionType: TransitionType,

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: TransitionQualifier[],

          /**
           * The time when the navigation was committed, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;

    /**
     * Fired when the contents of the tab is replaced by a different (usually
     * previously pre-rendered) tab.
     */
    export const onTabReplaced: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the tab that was replaced.
           */
          replacedTabId: number,

          /**
           * The ID of the tab that replaced the old tab.
           */
          tabId: number,

          /**
           * The time when the replacement happened, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;

    /**
     * Fired when the frame's history was updated to a new URL. All future
     * events for that frame will use the updated URL.
     */
    export const onHistoryStateUpdated: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the tab in which the navigation occurs.
           */
          tabId: number,
          url: string,

          /**
           * The ID of the process that runs the renderer for this frame.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * The ID of the parent frame, or <code>-1</code> if this is the main frame.
           */
          parentFrameId: number,

          /**
           * Cause of the navigation.
           */
          transitionType: TransitionType,

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: TransitionQualifier[],

          /**
           * The time when the navigation was committed, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.webRequest</code> API to observe and analyze traffic and
   * to intercept, block, or modify requests in-flight.
   * @chrome-permission webRequest
 */
  export namespace webRequest {
    export type ResourceType = "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "other";

    export type OnBeforeRequestOptions = "blocking" | "requestBody";

    export type OnBeforeSendHeadersOptions = "requestHeaders" | "blocking" | "extraHeaders";

    export type OnSendHeadersOptions = "requestHeaders" | "extraHeaders";

    export type OnHeadersReceivedOptions = "blocking" | "responseHeaders" | "extraHeaders";

    export type OnAuthRequiredOptions = "responseHeaders" | "blocking" | "asyncBlocking" | "extraHeaders";

    export type OnResponseStartedOptions = "responseHeaders" | "extraHeaders";

    export type OnBeforeRedirectOptions = "responseHeaders" | "extraHeaders";

    export type OnCompletedOptions = "responseHeaders" | "extraHeaders";

    /**
     * An object describing filters to apply to webRequest events.
     */
    export interface RequestFilter {
      /**
       * A list of URLs or URL patterns. Requests that cannot match any of the URLs
       * will be filtered out.
       */
      urls: string[];

      /**
       * A list of request types. Requests that cannot match any of the types will be
       * filtered out.
       */
      types?: ResourceType[];

      tabId?: number;

      windowId?: number;
    }

    /**
     * An array of HTTP headers. Each header is represented as a dictionary
     * containing the keys <code>name</code> and either <code>value</code> or
     * <code>binaryValue</code>.
     */
    export type HttpHeaders = {
      /**
       * Name of the HTTP header.
       */
      name: string,

      /**
       * Value of the HTTP header if it can be represented by UTF-8.
       */
      value?: string,

      /**
       * Value of the HTTP header if it cannot be represented by UTF-8, stored as
       * individual byte values (0..255).
       */
      binaryValue?: number[],
    }[];

    /**
     * Returns value for event handlers that have the 'blocking' extraInfoSpec
     * applied. Allows the event handler to modify network requests.
     */
    export interface BlockingResponse {
      /**
       * If true, the request is cancelled. This prevents the request from being sent.
       * This can be used as a response to the onBeforeRequest, onBeforeSendHeaders,
       * onHeadersReceived and onAuthRequired events.
       */
      cancel?: boolean;

      /**
       * Only used as a response to the onBeforeRequest and onHeadersReceived events.
       * If set, the original request is prevented from being sent/completed and is
       * instead redirected to the given URL. Redirections to non-HTTP schemes such as
       * <code>data:</code> are allowed. Redirects initiated by a redirect action use
       * the original request method for the redirect, with one exception: If the
       * redirect is initiated at the onHeadersReceived stage, then the redirect will
       * be issued using the GET method. Redirects from URLs with <code>ws://</code>
       * and <code>wss://</code> schemes are <b>ignored</b>.
       */
      redirectUrl?: string;

      /**
       * Only used as a response to the onBeforeSendHeaders event. If set, the request
       * is made with these request headers instead.
       */
      requestHeaders?: HttpHeaders;

      /**
       * Only used as a response to the onHeadersReceived event. If set, the server is
       * assumed to have responded with these response headers instead. Only return
       * <code>responseHeaders</code> if you really want to modify the headers in
       * order to limit the number of conflicts (only one extension may modify
       * <code>responseHeaders</code> for each request).
       */
      responseHeaders?: HttpHeaders;

      /**
       * Only used as a response to the onAuthRequired event. If set, the request is
       * made using the supplied credentials.
       */
      authCredentials?: {
        username: string,
        password: string,
      };
    }

    /**
     * Contains data uploaded in a URL request.
     */
    export interface UploadData {
      /**
       * An ArrayBuffer with a copy of the data.
       */
      bytes?: any;

      /**
       * A string with the file's path and name.
       */
      file?: string;
    }

    /**
     * Contains data passed within form data. For urlencoded form it is stored as
     * string if data is utf-8 string and as ArrayBuffer otherwise. For form-data it
     * is ArrayBuffer. If form-data represents uploading file, it is string with
     * filename, if the filename is provided.
     */
    export type FormDataItem = ArrayBuffer | string;

    export type IgnoredActionType = "redirect" | "request_headers" | "response_headers" | "auth_credentials";

    /**
     * The maximum number of times that <code>handlerBehaviorChanged</code> can be
     * called per 10 minute sustained interval. <code>handlerBehaviorChanged</code>
     * is an expensive function call that shouldn't be called often.
     */
    export const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: number;

    /**
     * Needs to be called when the behavior of the webRequest handlers has changed
     * to prevent incorrect handling due to caching. This function call is
     * expensive. Don't call it often.
     * @param callback
     */
    export function handlerBehaviorChanged(
      callback?: () => void,
    ): void;

    /**
     * Fired when a request is about to occur.
     */
    export const onBeforeRequest: chrome.events.Event<
      /**
       * @param details
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * Contains the HTTP request body data. Only provided if extraInfoSpec contains
           * 'requestBody'.
           */
          requestBody?: {
            /**
             * Errors when obtaining request body data.
             */
            error?: string,

            /**
             * If the request method is POST and the body is a sequence of key-value pairs
             * encoded in UTF8, encoded as either multipart/form-data, or
             * application/x-www-form-urlencoded, this dictionary is present and for each
             * key contains the list of all values for that key. If the data is of another
             * media type, or if it is malformed, the dictionary is not present. An example
             * value of this dictionary is {'key': ['value1', 'value2']}.
             */
            formData?: {[name: string]: FormDataItem[]},

            /**
             * If the request method is PUT or POST, and the body is not already parsed in
             * formData, then the unparsed request body elements are contained in this
             * array.
             */
            raw?: UploadData[],
          },

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through
           * redirects. If this is an opaque origin, the string 'null' will be used.
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,
        },
      ) => BlockingResponse
    >;

    /**
     * Fired before sending an HTTP request, once the request headers are
     * available. This may occur after a TCP connection is made to the server,
     * but before any HTTP data is sent.
     */
    export const onBeforeSendHeaders: chrome.events.Event<
      /**
       * @param details
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * The origin where the request was initiated. This does not change through
           * redirects. If this is an opaque origin, the string 'null' will be used.
           */
          initiator?: string,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The HTTP request headers that are going to be sent out with this request.
           */
          requestHeaders?: HttpHeaders,
        },
      ) => BlockingResponse
    >;

    /**
     * Fired just before a request is going to be sent to the server
     * (modifications of previous onBeforeSendHeaders callbacks are visible by
     * the time onSendHeaders is fired).
     */
    export const onSendHeaders: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through
           * redirects. If this is an opaque origin, the string 'null' will be used.
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The HTTP request headers that have been sent out with this request.
           */
          requestHeaders?: HttpHeaders,
        },
      ) => void
    >;

    /**
     * Fired when HTTP response headers of a request have been received.
     */
    export const onHeadersReceived: chrome.events.Event<
      /**
       * @param details
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through
           * redirects. If this is an opaque origin, the string 'null' will be used.
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9
           * responses (i.e., responses that lack a status line).
           */
          statusLine: string,

          /**
           * The HTTP response headers that have been received with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,
        },
      ) => BlockingResponse
    >;

    /**
     * Fired when an authentication failure is received. The listener has three
     * options: it can provide authentication credentials, it can cancel the
     * request and display the error page, or it can take no action on the
     * challenge. If bad user credentials are provided, this may be called
     * multiple times for the same request. Note, only one of
     * <code>'blocking'</code> or <code>'asyncBlocking'</code> modes must be
     * specified in the <code>extraInfoSpec</code> parameter.
     */
    export const onAuthRequired: chrome.events.Event<
      /**
       * @param details
       * @returns If "blocking" is specified in the "extraInfoSpec" parameter, the event listener should return an object of this type.
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through
           * redirects. If this is an opaque origin, the string 'null' will be used.
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The authentication scheme, e.g. Basic or Digest.
           */
          scheme: string,

          /**
           * The authentication realm provided by the server, if there is one.
           */
          realm?: string,

          /**
           * The server requesting authentication.
           */
          challenger: {
            host: string,
            port: number,
          },

          /**
           * True for Proxy-Authenticate, false for WWW-Authenticate.
           */
          isProxy: boolean,

          /**
           * The HTTP response headers that were received along with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9
           * responses (i.e., responses that lack a status line) or an empty string if
           * there are no headers.
           */
          statusLine: string,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,
        },
        asyncCallback?: (
          response: BlockingResponse,
        ) => void,
      ) => BlockingResponse
    >;

    /**
     * Fired when the first byte of the response body is received. For HTTP
     * requests, this means that the status line and response headers are
     * available.
     */
    export const onResponseStarted: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through
           * redirects. If this is an opaque origin, the string 'null' will be used.
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may
           * be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,

          /**
           * The HTTP response headers that were received along with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9
           * responses (i.e., responses that lack a status line) or an empty string if
           * there are no headers.
           */
          statusLine: string,
        },
      ) => void
    >;

    /**
     * Fired when a server-initiated redirect is about to occur.
     */
    export const onBeforeRedirect: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through
           * redirects. If this is an opaque origin, the string 'null' will be used.
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may
           * be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,

          /**
           * The new URL.
           */
          redirectUrl: string,

          /**
           * The HTTP response headers that were received along with this redirect.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9
           * responses (i.e., responses that lack a status line) or an empty string if
           * there are no headers.
           */
          statusLine: string,
        },
      ) => void
    >;

    /**
     * Fired when a request is completed.
     */
    export const onCompleted: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through
           * redirects. If this is an opaque origin, the string 'null' will be used.
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may
           * be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * Standard HTTP status code returned by the server.
           */
          statusCode: number,

          /**
           * The HTTP response headers that were received along with this response.
           */
          responseHeaders?: HttpHeaders,

          /**
           * HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9
           * responses (i.e., responses that lack a status line) or an empty string if
           * there are no headers.
           */
          statusLine: string,
        },
      ) => void
    >;

    /**
     * Fired when an error occurs.
     */
    export const onErrorOccurred: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,
          url: string,

          /**
           * Standard HTTP method.
           */
          method: string,

          /**
           * The value 0 indicates that the request happens in the main frame; a positive
           * value indicates the ID of a subframe in which the request happens. If the
           * document of a (sub-)frame is loaded (<code>type</code> is
           * <code>main_frame</code> or <code>sub_frame</code>), <code>frameId</code>
           * indicates the ID of this frame, not the ID of the outer frame. Frame IDs are
           * unique within a tab.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame which sent the request. Set to -1 if no
           * parent frame exists.
           */
          parentFrameId: number,

          /**
           * The ID of the tab in which the request takes place. Set to -1 if the request
           * isn't related to a tab.
           */
          tabId: number,

          /**
           * How the requested resource will be used.
           */
          type: ResourceType,

          /**
           * The origin where the request was initiated. This does not change through
           * redirects. If this is an opaque origin, the string 'null' will be used.
           */
          initiator?: string,

          /**
           * The time when this signal is triggered, in milliseconds since the epoch.
           */
          timeStamp: number,

          /**
           * The server IP address that the request was actually sent to. Note that it may
           * be a literal IPv6 address.
           */
          ip?: string,

          /**
           * Indicates if this response was fetched from disk cache.
           */
          fromCache: boolean,

          /**
           * The error description. This string is <em>not</em> guaranteed to remain
           * backwards compatible between releases. You must not parse and act based upon
           * its content.
           */
          error: string,
        },
      ) => void
    >;

    /**
     * Fired when an extension's proposed modification to a network request is
     * ignored. This happens in case of conflicts with other extensions.
     */
    export const onActionIgnored: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: {
          /**
           * The ID of the request. Request IDs are unique within a browser session. As a
           * result, they could be used to relate different events of the same request.
           */
          requestId: string,

          /**
           * The proposed action which was ignored.
           */
          action: IgnoredActionType,
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.webstore</code> API to initiate app and extension
   * installations "inline" from your site.
   */
  export namespace webstore {
    /**
     * Enum used to indicate the stage of the installation process. 'downloading'
     * indicates that the necessary files are being downloaded, and 'installing'
     * indicates that the files are downloaded and are being actively installed.
     */
    export type InstallStage = "installing" | "downloading";

    /**
     * Enum of the possible install results, including error codes sent back in the
     * event that an inline installation has failed.
     */
    export type ErrorCode = "otherError" | "aborted" | "installInProgress" | "notPermitted" | "invalidId" | "webstoreRequestError" | "invalidWebstoreResponse" | "invalidManifest" | "iconError" | "userCanceled" | "blacklisted" | "missingDependencies" | "requirementViolations" | "blockedByPolicy" | "launchFeatureDisabled" | "launchUnsupportedExtensionType" | "launchInProgress";

    /**
     * @param url If you have more than one <code>&lt;link&gt;</code> tag on your page with the <code>chrome-webstore-item</code> relation, you can choose which item you'd like to install by passing in its URL here. If it is omitted, then the first (or only) link will be used. An exception will be thrown if the passed in URL does not exist on the page.
     * @param successCallback This function is invoked when inline installation successfully completes (after the dialog is shown and the user agrees to add the item to Chrome). You may wish to use this to hide the user interface element that prompted the user to install the app or extension.
     * @param failureCallback This function is invoked when inline installation does not successfully complete. Possible reasons for this include the user canceling the dialog, the linked item not being found in the store, or the install being initiated from a non-verified site.
     * @param failureCallback.error The failure detail. You may wish to inspect or log this for debugging purposes, but you should not rely on specific strings being passed back.
     * @param failureCallback.errorCode The error code from the stable set of possible errors.
     * @deprecated Inline installation is deprecated.
     */
    export function install(
      url?: string,
      successCallback?: () => void,
      failureCallback?: (
        error: string,
        errorCode?: ErrorCode,
      ) => void,
    ): void;

    /**
     * Fired when an inline installation enters a new InstallStage. In order to
     * receive notifications about this event, listeners must be registered
     * before the inline installation begins.
     */
    export const onInstallStageChanged: chrome.events.Event<
      /**
       * @param stage The InstallStage that just began.
       * @deprecated Inline installation is deprecated.
       */
      (
        stage: InstallStage,
      ) => void
    >;

    /**
     * Fired periodically with the download progress of an inline install. In
     * order to receive notifications about this event, listeners must be
     * registered before the inline installation begins.
     */
    export const onDownloadProgress: chrome.events.Event<
      /**
       * @param percentDownloaded The progress of the download, between 0 and 1. 0 indicates no progress; 1.0 indicates complete.
       * @deprecated Inline installation is deprecated.
       */
      (
        percentDownloaded: number,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.windows</code> API to interact with browser windows. You
   * can use this API to create, modify, and rearrange windows in the browser.
   */
  export namespace windows {
    /**
     * The type of browser window this is. In some circumstances a window may not be
     * assigned a <code>type</code> property; for example, when querying closed
     * windows from the {@link sessions} API.
     */
    export type WindowType = "normal" | "popup" | "panel" | "app" | "devtools";

    /**
     * The state of this browser window. In some circumstances a window may not be
     * assigned a <code>state</code> property; for example, when querying closed
     * windows from the {@link sessions} API.
     */
    export type WindowState = "normal" | "minimized" | "maximized" | "fullscreen" | "docked" | "locked-fullscreen";

    export interface Window {
      /**
       * The ID of the window. Window IDs are unique within a browser session. In some
       * circumstances a window may not be assigned an <code>ID</code> property; for
       * example, when querying windows using the {@link sessions} API, in which case
       * a session ID may be present.
       */
      id?: number;

      /**
       * Whether the window is currently the focused window.
       */
      focused: boolean;

      /**
       * The offset of the window from the top edge of the screen in pixels. In some
       * circumstances a window may not be assigned a <code>top</code> property; for
       * example, when querying closed windows from the {@link sessions} API.
       */
      top?: number;

      /**
       * The offset of the window from the left edge of the screen in pixels. In some
       * circumstances a window may not be assigned a <code>left</code> property; for
       * example, when querying closed windows from the {@link sessions} API.
       */
      left?: number;

      /**
       * The width of the window, including the frame, in pixels. In some
       * circumstances a window may not be assigned a <code>width</code> property; for
       * example, when querying closed windows from the {@link sessions} API.
       */
      width?: number;

      /**
       * The height of the window, including the frame, in pixels. In some
       * circumstances a window may not be assigned a <code>height</code> property;
       * for example, when querying closed windows from the {@link sessions} API.
       */
      height?: number;

      /**
       * Array of {@link tabs.Tab} objects representing the current tabs in the
       * window.
       */
      tabs?: tabs.Tab[];

      /**
       * Whether the window is incognito.
       */
      incognito: boolean;

      /**
       * The type of browser window this is.
       */
      type?: WindowType;

      /**
       * The state of this browser window.
       */
      state?: WindowState;

      /**
       * Whether the window is set to be always on top.
       */
      alwaysOnTop: boolean;

      /**
       * The session ID used to uniquely identify a window, obtained from the {@link
       * sessions} API.
       */
      sessionId?: string;
    }

    /**
     * Specifies what type of browser window to create. 'panel' is deprecated and is
     * available only to existing whitelisted extensions on Chrome OS.
     */
    export type CreateType = "normal" | "popup" | "panel";

    /**
     * The windowId value that represents the absence of a chrome browser window.
     */
    export const WINDOW_ID_NONE: number;

    /**
     * The windowId value that represents the <a
     * href='windows#current-window'>current window</a>.
     */
    export const WINDOW_ID_CURRENT: number;

    /**
     * Gets details about a window.
     * @param windowId
     * @param getInfo
     * @param callback
     * @param callback.window
     */
    export function get(
      windowId: number,
      getInfo: {
        /**
         * If true, the {@link windows.Window} object has a <var>tabs</var> property
         * that contains a list of the {@link tabs.Tab} objects. The <code>Tab</code>
         * objects only contain the <code>url</code>, <code>title</code>, and
         * <code>favIconUrl</code> properties if the extension's manifest file includes
         * the <code>"tabs"</code> permission.
         */
        populate?: boolean,

        /**
         * If set, the {@link windows.Window} returned is filtered based on its type. If
         * unset, the default filter is set to <code>['normal', 'popup']</code>.
         */
        windowTypes?: WindowType[],
      },
      callback: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Gets details about a window.
     * @param windowId
     * @param callback
     * @param callback.window
     */
    export function get(
      windowId: number,
      callback: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Gets the <a href='#current-window'>current window</a>.
     * @param getInfo
     * @param callback
     * @param callback.window
     */
    export function getCurrent(
      getInfo: {
        /**
         * If true, the {@link windows.Window} object has a <var>tabs</var> property
         * that contains a list of the {@link tabs.Tab} objects. The <code>Tab</code>
         * objects only contain the <code>url</code>, <code>title</code>, and
         * <code>favIconUrl</code> properties if the extension's manifest file includes
         * the <code>"tabs"</code> permission.
         */
        populate?: boolean,

        /**
         * If set, the {@link windows.Window} returned is filtered based on its type. If
         * unset, the default filter is set to <code>['normal', 'popup']</code>.
         */
        windowTypes?: WindowType[],
      },
      callback: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Gets the <a href='#current-window'>current window</a>.
     * @param callback
     * @param callback.window
     */
    export function getCurrent(
      callback: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Gets the window that was most recently focused &mdash; typically the window
     * 'on top'.
     * @param getInfo
     * @param callback
     * @param callback.window
     */
    export function getLastFocused(
      getInfo: {
        /**
         * If true, the {@link windows.Window} object has a <var>tabs</var> property
         * that contains a list of the {@link tabs.Tab} objects. The <code>Tab</code>
         * objects only contain the <code>url</code>, <code>title</code>, and
         * <code>favIconUrl</code> properties if the extension's manifest file includes
         * the <code>"tabs"</code> permission.
         */
        populate?: boolean,

        /**
         * If set, the {@link windows.Window} returned is filtered based on its type. If
         * unset, the default filter is set to <code>['normal', 'popup']</code>.
         */
        windowTypes?: WindowType[],
      },
      callback: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Gets the window that was most recently focused &mdash; typically the window
     * 'on top'.
     * @param callback
     * @param callback.window
     */
    export function getLastFocused(
      callback: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Gets all windows.
     * @param getInfo
     * @param callback
     * @param callback.windows
     */
    export function getAll(
      getInfo: {
        /**
         * If true, each {@link windows.Window} object has a <var>tabs</var> property
         * that contains a list of the {@link tabs.Tab} objects for that window. The
         * <code>Tab</code> objects only contain the <code>url</code>,
         * <code>title</code>, and <code>favIconUrl</code> properties if the extension's
         * manifest file includes the <code>"tabs"</code> permission.
         */
        populate?: boolean,

        /**
         * If set, the {@link windows.Window} returned is filtered based on its type. If
         * unset, the default filter is set to <code>['normal', 'popup']</code>.
         */
        windowTypes?: WindowType[],
      },
      callback: (
        windows: Window[],
      ) => void,
    ): void;

    /**
     * Gets all windows.
     * @param callback
     * @param callback.windows
     */
    export function getAll(
      callback: (
        windows: Window[],
      ) => void,
    ): void;

    /**
     * Creates (opens) a new browser window with any optional sizing, position, or
     * default URL provided.
     * @param createData
     * @param callback
     * @param callback.window Contains details about the created window.
     */
    export function create(
      createData?: {
        /**
         * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs
         * must include a scheme, e.g., 'http://www.google.com', not 'www.google.com'.
         * Non-fully-qualified URLs are considered relative within the extension.
         * Defaults to the New Tab Page.
         */
        url?: string | string[],

        /**
         * The ID of the tab to add to the new window.
         */
        tabId?: number,

        /**
         * The number of pixels to position the new window from the left edge of the
         * screen. If not specified, the new window is offset naturally from the last
         * focused window. This value is ignored for panels.
         */
        left?: number,

        /**
         * The number of pixels to position the new window from the top edge of the
         * screen. If not specified, the new window is offset naturally from the last
         * focused window. This value is ignored for panels.
         */
        top?: number,

        /**
         * The width in pixels of the new window, including the frame. If not specified,
         * defaults to a natural width.
         */
        width?: number,

        /**
         * The height in pixels of the new window, including the frame. If not
         * specified, defaults to a natural height.
         */
        height?: number,

        /**
         * If <code>true</code>, opens an active window. If <code>false</code>, opens an
         * inactive window.
         */
        focused?: boolean,

        /**
         * Whether the new window should be an incognito window.
         */
        incognito?: boolean,

        /**
         * Specifies what type of browser window to create.
         */
        type?: CreateType,

        /**
         * The initial state of the window. The <code>minimized</code>,
         * <code>maximized</code>, and <code>fullscreen</code> states cannot be combined
         * with <code>left</code>, <code>top</code>, <code>width</code>, or
         * <code>height</code>.
         */
        state?: WindowState,

        /**
         * If <code>true</code>, the newly-created window's 'window.opener' is set to
         * the caller and is in the same <a
         * href="https://www.w3.org/TR/html51/browsers.html#unit-of-related-browsing-contexts">unit of related browsing contexts</a> as the caller.
         */
        setSelfAsOpener?: boolean,
      },
      callback?: (
        window?: Window,
      ) => void,
    ): void;

    /**
     * Updates the properties of a window. Specify only the properties that to be
     * changed; unspecified properties are unchanged.
     * @param windowId
     * @param updateInfo
     * @param callback
     * @param callback.window
     */
    export function update(
      windowId: number,
      updateInfo: {
        /**
         * The offset from the left edge of the screen to move the window to in pixels.
         * This value is ignored for panels.
         */
        left?: number,

        /**
         * The offset from the top edge of the screen to move the window to in pixels.
         * This value is ignored for panels.
         */
        top?: number,

        /**
         * The width to resize the window to in pixels. This value is ignored for
         * panels.
         */
        width?: number,

        /**
         * The height to resize the window to in pixels. This value is ignored for
         * panels.
         */
        height?: number,

        /**
         * If <code>true</code>, brings the window to the front; cannot be combined with
         * the state 'minimized'. If <code>false</code>, brings the next window in the
         * z-order to the front; cannot be combined with the state 'fullscreen' or
         * 'maximized'.
         */
        focused?: boolean,

        /**
         * If <code>true</code>, causes the window to be displayed in a manner that
         * draws the user's attention to the window, without changing the focused
         * window. The effect lasts until the user changes focus to the window. This
         * option has no effect if the window already has focus. Set to
         * <code>false</code> to cancel a previous <code>drawAttention</code> request.
         */
        drawAttention?: boolean,

        /**
         * The new state of the window. The 'minimized', 'maximized', and 'fullscreen'
         * states cannot be combined with 'left', 'top', 'width', or 'height'.
         */
        state?: WindowState,
      },
      callback?: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Removes (closes) a window and all the tabs inside it.
     * @param windowId
     * @param callback
     */
    export function remove(
      windowId: number,
      callback?: () => void,
    ): void;

    /**
     * Fired when a window is created.
     */
    export const onCreated: chrome.events.Event<
      /**
       * @param window Details of the created window.
       */
      (
        window: Window,
      ) => void
    >;

    /**
     * Fired when a window is removed (closed).
     */
    export const onRemoved: chrome.events.Event<
      /**
       * @param windowId ID of the removed window.
       */
      (
        windowId: number,
      ) => void
    >;

    /**
     * Fired when the currently focused window changes. Returns
     * <code>chrome.windows.WINDOW_ID_NONE</code> if all Chrome windows have
     * lost focus. <b>Note:</b> On some Linux window managers,
     * <code>WINDOW_ID_NONE</code> is always sent immediately preceding a switch
     * from one Chrome window to another.
     */
    export const onFocusChanged: chrome.events.Event<
      /**
       * @param windowId ID of the newly-focused window.
       */
      (
        windowId: number,
      ) => void
    >;
  }
}
