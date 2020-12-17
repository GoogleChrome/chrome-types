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
// Generated on Thu Dec 17 2020 17:50:10 GMT+1100 (Australian Eastern Daylight Time)

declare namespace chrome {
  /**
   * Use the <code>chrome.accessibilityFeatures</code> API to manage Chrome's
   * accessibility features. This API relies on the <a
   * href='types.html#ChromeSetting'>ChromeSetting prototype of the type API</a>
   * for getting and setting individual accessibility features. In order to get
   * feature states the extension must request
   * <code>accessibilityFeatures.read</code> permission. For modifying feature
   * state, the extension needs <code>accessibilityFeatures.modify</code>
   * permission. Note that <code>accessibilityFeatures.modify</code> does not
   * imply <code>accessibilityFeatures.read</code> permission.
   * @alpha
 * @chrome-platform chromeos
 * @chrome-permission accessibilityFeatures.modify
 * @chrome-permission accessibilityFeatures.read
 */
  export namespace accessibilityFeatures {
    /**
     * Spoken feedback (text-to-speech). The value indicates whether the feature is
     * enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.
     */
    export const spokenFeedback: types.ChromeSetting<boolean>;

    /**
     * Enlarged cursor. The value indicates whether the feature is enabled or not.
     * <code>get()</code> requires <code>accessibilityFeatures.read</code>
     * permission. <code>set()</code> and <code>clear()</code> require
     * <code>accessibilityFeatures.modify</code> permission.
     */
    export const largeCursor: types.ChromeSetting<boolean>;

    /**
     * Sticky modifier keys (like shift or alt). The value indicates whether the
     * feature is enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.
     */
    export const stickyKeys: types.ChromeSetting<boolean>;

    /**
     * High contrast rendering mode. The value indicates whether the feature is
     * enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.
     */
    export const highContrast: types.ChromeSetting<boolean>;

    /**
     * Full screen magnification. The value indicates whether the feature is enabled
     * or not. <code>get()</code> requires <code>accessibilityFeatures.read</code>
     * permission. <code>set()</code> and <code>clear()</code> require
     * <code>accessibilityFeatures.modify</code> permission.
     */
    export const screenMagnifier: types.ChromeSetting<boolean>;

    /**
     * Auto mouse click after mouse stops moving. The value indicates whether the
     * feature is enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.
     */
    export const autoclick: types.ChromeSetting<boolean>;

    /**
     * Virtual on-screen keyboard. The value indicates whether the feature is
     * enabled or not. <code>get()</code> requires
     * <code>accessibilityFeatures.read</code> permission. <code>set()</code> and
     * <code>clear()</code> require <code>accessibilityFeatures.modify</code>
     * permission.
     */
    export const virtualKeyboard: types.ChromeSetting<boolean>;
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
        alarm: Alarm,
      ) => void,
    ): void;

    /**
     * Retrieves details about the specified alarm.
     * @param callback
     * @param callback.alarm
     */
    export function get(
      callback: (
        alarm: Alarm,
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
        state: "not_installed" | "installed" | "disabled",
      ) => void,
    ): void;

    /**
     * TODO
     */
    export function runningState(): "running" | "cannot_run" | "ready_to_run";

    /**
     * TODO
     * @returns TODO
     */
    export function getDetails(): Details;

    /**
     * TODO
     * @param frame TODO
     * @returns TODO
     */
    export function getDetailsForFrame(
      frame: DOMWindow,
    ): Details;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.automation</code> API allows developers to access the
   * automation (accessibility) tree for the browser. This is a tree
   * representation, analogous to the DOM tree, which represents the
   * <em>semantic</em> structure of a page, and can be used to programmatically
   * interact with a page.
   * @chrome-permission automation
 */
  export namespace automation {
    export interface AutomationNode {
      /**
       * Unique ID to identify this node.
       */
      id: number;

      /**
       * The role of this node, e.g. button, static text etc.
       */
      role: string;

      /**
       * The state of this node, e.g. {pressed": true, "inactive": true} etc.
       */
      state: {[name: string]: any};

      /**
       * A collection of this node's other attributes. TODO(aboxhall): Create and use
       * combined list of attributes from AXStringAttribute, AXIntAttribute etc.
       */
      attributes?: {[name: string]: any};

      /**
       * The index of this node in its parent node's list of children. If this is the
       * root node, this will be undefined.
       */
      index_in_parent?: number;

      children: () => {[name: string]: any}[];

      parent: () => {[name: string]: any};

      firstChild: () => {[name: string]: any};

      lastChild: () => {[name: string]: any};

      previousSibling: () => {[name: string]: any};

      nextSibling: () => {[name: string]: any};
    }

    export interface AutomationTree {
      root: AutomationNode;
    }

    /**
     * Get the automation tree for the current tab, enabling automation if
     * necessary.
     * @param callback Called when the <code>AutomationTree</code> for the page is available.
     * @param callback.tree
     */
    export function getTree(
      callback: (
        tree: AutomationTree,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.bookmarks</code> API to create, organize, and otherwise
   * manipulate bookmarks. Also see <a href='override.html'>Override Pages</a>,
   * which you can use to create a custom Bookmark Manager page.
   * @chrome-permission bookmarks
 */
  export namespace bookmarks {
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
       * An ordered list of children of this node.
       */
      children?: BookmarkTreeNode[];
    }

    /**
     * The maximum number of <code>move</code>, <code>update</code>,
     * <code>create</code>, or <code>remove</code> operations that can be performed
     * each hour. Updates that would cause this limit to be exceeded fail.
     */
    export const MAX_WRITE_OPERATIONS_PER_HOUR: number;

    /**
     * The maximum number of <code>move</code>, <code>update</code>,
     * <code>create</code>, or <code>remove</code> operations that can be performed
     * each minute, sustained over 10 minutes. Updates that would cause this limit
     * to be exceeded fail.
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
     * @param query
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
      bookmark: {
        /**
         * Defaults to the Other Bookmarks folder.
         */
        parentId?: string,
        index?: number,
        title?: string,
        url?: string,
      },
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
   * href='browserAction#icon'>icon</a>, a browser action can also have a <a
   * href='browserAction#tooltip'>tooltip</a>, a <a
   * href='browserAction#badge'>badge</a>, and a <a
   * href='browserAction#popups'>popup</a>.
   */
  export namespace browserAction {
    export type ColorArray = [number, number, number, number];

    /**
     * Pixel data for an image. Must be an ImageData object (for example, from a
     * <code>canvas</code> element).
     */
    export type ImageDataType = ImageData;

    /**
     * Sets the title of the browser action. This shows up in the tooltip.
     * @param details
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
     * Sets the icon for the browser action. The icon can be specified either as the
     * path to an image file or as the pixel data from a canvas element, or as
     * dictionary of either one of those. Either the <b>path</b> or the
     * <b>imageData</b> property must be specified.
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
         * image with size <code>scale</code> * 19 will be selected. Initially only
         * scales 1 and 2 will be supported. At least one image must be specified. Note
         * that 'details.imageData = foo' is equivalent to 'details.imageData = {'19':
         * foo}'
         */
        imageData?: ImageDataType | {
          19?: ImageDataType,
          38?: ImageDataType,
        },

        /**
         * Either a relative image path or a dictionary {size -> relative image path}
         * pointing to icon to be set. If the icon is specified as a dictionary, the
         * actual image to be used is chosen depending on screen's pixel density. If the
         * number of image pixels that fit into one screen space unit equals
         * <code>scale</code>, then image with size <code>scale</code> * 19 will be
         * selected. Initially only scales 1 and 2 will be supported. At least one image
         * must be specified. Note that 'details.path = foo' is equivalent to
         * 'details.imageData = {'19': foo}'
         */
        path?: string | {
          19?: string,
          38?: string,
        },

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
     * browser action's icon.
     * @param details
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
    ): void;

    /**
     * Gets the html document set as the popup for this browser action.
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
     * Sets the badge text for the browser action. The badge is displayed on top of
     * the icon.
     * @param details
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
     */
    export function setBadgeBackgroundColor(
      details: {
        /**
         * An array of four integers in the range [0,255] that make up the RGBA color of
         * the badge. For example, opaque red is <code>[255, 0, 0, 255]</code>. Can also
         * be a string with a CSS value, with opaque red being <code>#FF0000</code> or
         * <code>#F00</code>.
         */
        color: string | ColorArray,

        /**
         * Limits the change to when a particular tab is selected. Automatically resets
         * when the tab is closed.
         */
        tabId?: number,
      },
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
         * Specify the tab to get the badge background color from. If no tab is
         * specified, the non-tab-specific badge background color is returned.
         */
        tabId?: number,
      },
      callback: (
        result: ColorArray,
      ) => void,
    ): void;

    /**
     * Enables the browser action for a tab. By default, browser actions are
     * enabled.
     * @param tabId The id of the tab for which you want to modify the browser action.
     */
    export function enable(
      tabId?: number,
    ): void;

    /**
     * Disables the browser action for a tab.
     * @param tabId The id of the tab for which you want to modify the browser action.
     */
    export function disable(
      tabId?: number,
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
     * Fired when a browser action icon is clicked.  This event will not fire if
     * the browser action has a popup.
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
       * The browser's cache. Note: when removing data, this clears the
       * <em>entire</em> cache: it is not limited to the range you specify.
       */
      cache?: boolean;

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
       * Plugins' data.
       */
      pluginData?: boolean;

      /**
       * Stored passwords.
       */
      passwords?: boolean;

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
    export type ChannelError = "channel_not_open" | "authentication_error" | "connect_error" | "socket_error" | "transport_error" | "invalid_message" | "invalid_channel_id" | "unknown";

    export interface ChannelInfo {
      /**
       * Id for the channel.
       */
      channelId: number;

      /**
       * The URL to the receiver.  The URL should be of the form: cast://<IP>:<port>
       * (for an unauthenticated channel) or casts://<IP>:<port> (for an authenticated
       * channel).  Name resolution is not currently supported for cast:// URLs, but
       * may be added in the future.
       */
      url: string;

      /**
       * The current state of the channel.
       */
      readyState: ReadyState;

      /**
       * If set, the last error condition encountered by the channel.
       */
      errorState?: ChannelError;
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
       * the special ids 'sender-0' and 'receiver-0' can be used.  For messages
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

    /**
     * Opens a new channel to the Cast receiver specified by the URL.  Only one
     * channel may be connected to the same URL from the same extension at a time.
     * If the open request is successful, the callback will be invoked with a
     * ChannelInfo with readyState == 'connecting'.  If unsuccessful, the callback
     * will be invoked with a ChannelInfo with channel.readyState == 'closed' and
     * channel.errorState will be set to the error condition.
     * @param url
     * @param callback Callback holding the result of a channel operation.
     * @param callback.result
     */
    export function open(
      url: string,
      callback: (
        result: ChannelInfo,
      ) => void,
    ): void;

    /**
     * Sends a message on the channel and invokes callback with the resulting
     * channel status.  The channel must be in readyState == 'open'.  If
     * unsuccessful, channel.readyState will be set to 'closed', channel.errorState
     * will be set to the error condition.
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
     * Fired when an error occurs as a result of a channel method or a network
     * event.
     */
    export const onError: chrome.events.Event<
      /**
       * @param channel
       */
      (
        channel: ChannelInfo,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.cast.streaming.rtpStream</code> API allows configuration
 of
   * encoding parameters and RTP parameters used in a Cast streaming
 session.
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

      codecName: string;

      /**
       * Synchronization source identifier.
       */
      ssrc?: number;

      feedbackSsrc?: number;

      clockRate?: number;

      minBitrate?: number;

      maxBitrate?: number;

      /**
       * The number of channels.
       */
      channels?: number;

      /**
       * Video width in pixels.
       */
      width?: number;

      /**
       * Video height in pixels.
       */
      height?: number;

      /**
       * 16 bytes AES key encoded in Base64.
       */
      aesKey?: string;

      /**
       * 16 bytes AES IV (Initialization vector) mask encoded in Base64.
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
   * @alpha
 * @chrome-permission cast.streaming
 */
  export namespace cast.streaming.session {
    /**
     * Creates a Cast session using the provided audio and video track as source.
     * This will create two RTP streams and a UDP transport that builds the session.
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
   * plug-ins. More generally speaking, content settings allow you to customize
   * Chrome's behavior on a per-site basis instead of globally.
   * @chrome-permission contentSettings
 */
  export namespace contentSettings {
    /**
     * The only content type using resource identifiers is {@link
     * contentSettings.plugins}. For more information, see <a
     * href="contentSettings.html#resource-identifiers">Resource Identifiers</a>.
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

    export interface ContentSetting<T> {
      /**
       * Clear all content setting rules set by this extension.
       * @param details
       * @param callback
       */
      clear(
        details: {
          /**
           * Where to clear the setting (default: regular). One of<br><var>regular</var>:
           * setting for regular profile (which is inherited by the incognito profile if
           * not overridden elsewhere),<br><var>incognito_session_only</var>: setting for
           * incognito profile that can only be set during an incognito session and is
           * deleted when the incognito session ends (overrides regular settings).
           */
          scope?: "regular" | "incognito_session_only",
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
           * <a href='contentSettings.html#patterns'>Content Setting Patterns</a>.
           */
          primaryPattern: string,

          /**
           * The pattern for the secondary URL. Defaults to matching all URLs. For details
           * on the format of a pattern, see <a
           * href='contentSettings.html#patterns'>Content Setting Patterns</a>.
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
           * Where to set the setting (default: regular). One of<br><var>regular</var>:
           * setting for regular profile (which is inherited by the incognito profile if
           * not overridden elsewhere),<br><var>incognito_session_only</var>: setting for
           * incognito profile that can only be set during an incognito session and is
           * deleted when the incognito session ends (overrides regular settings).
           */
          scope?: "regular" | "incognito_session_only",
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

    /**
     * Whether to allow cookies and other local data to be set by websites. One
     * of<br><var>allow</var>: Accept cookies,<br><var>block</var>: Block
     * cookies,<br><var>session_only</var>: Accept cookies only for the current
     * session. <br>Default is <var>allow</var>.<br>The primary URL is the URL
     * representing the cookie origin. The secondary URL is the URL of the top-level
     * frame.
     */
    export const cookies: ContentSetting<"allow" | "block" | "session_only">;

    /**
     * Whether to show images. One of<br><var>allow</var>: Show
     * images,<br><var>block</var>: Don't show images. <br>Default is
     * <var>allow</var>.<br>The primary URL is the main-frame URL. The secondary URL
     * is the URL of the image.
     */
    export const images: ContentSetting<"allow" | "block">;

    /**
     * Whether to run JavaScript. One of<br><var>allow</var>: Run
     * JavaScript,<br><var>block</var>: Don't run JavaScript. <br>Default is
     * <var>allow</var>.<br>The primary URL is the main-frame URL. The secondary URL
     * is not used.
     */
    export const javascript: ContentSetting<"allow" | "block">;

    /**
     * Whether to run plug-ins. One of<br><var>allow</var>: Run plug-ins
     * automatically,<br><var>block</var>: Don't run plug-ins automatically.
     * <br>Default is <var>allow</var>.<br>The primary URL is the main-frame URL.
     * The secondary URL is not used.
     */
    export const plugins: ContentSetting<"allow" | "block">;

    /**
     * Whether to allow sites to show pop-ups. One of<br><var>allow</var>: Allow
     * sites to show pop-ups,<br><var>block</var>: Don't allow sites to show
     * pop-ups. <br>Default is <var>block</var>.<br>The primary URL is the
     * main-frame URL. The secondary URL is not used.
     */
    export const popups: ContentSetting<"allow" | "block">;

    /**
     * Whether to allow sites to show desktop notifications. One
     * of<br><var>allow</var>: Allow sites to show desktop
     * notifications,<br><var>block</var>: Don't allow sites to show desktop
     * notifications,<br><var>ask</var>: Ask when a site wants to show desktop
     * notifications. <br>Default is <var>ask</var>.<br>The primary URL is the
     * main-frame URL. The secondary URL is not used.
     */
    export const notifications: ContentSetting<"allow" | "block" | "ask">;
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
     * Creates a new context menu item. Note that if an error occurs during
     * creation, you may not find out until the creation callback fires (the details
     * will be in chrome.runtime.lastError).
     * @param createProperties
     * @param callback Called when the item has been created in the browser. If there were any problems creating the item, details will be available in chrome.runtime.lastError.
     * @returns The ID of the newly created item.
     */
    export function create(
      createProperties: {
        /**
         * The type of menu item. Defaults to 'normal' if not specified.
         */
        type?: "normal" | "checkbox" | "radio" | "separator",

        /**
         * The unique ID to assign to this item. Mandatory for event pages. Cannot be
         * the same as another ID for this extension.
         */
        id?: string,

        /**
         * The text to be displayed in the item; this is <em>required</em> unless
         * <em>type</em> is 'separator'. When the context is 'selection', you can use
         * <code>%s</code> within the string to show the selected text. For example, if
         * this parameter's value is "Translate '%s' to Pig Latin" and the user selects
         * the word "cool", the context menu item for the selection is "Translate 'cool'
         * to Pig Latin".
         */
        title?: string,

        /**
         * The initial state of a checkbox or radio item: true for selected and false
         * for unselected. Only one radio item can be selected at a time in a given
         * group of radio items.
         */
        checked?: boolean,

        /**
         * List of contexts this menu item will appear in. Defaults to ['page'] if not
         * specified. Specifying ['all'] is equivalent to the combination of all other
         * contexts except for 'launcher'. The 'launcher' context is only supported by
         * apps and is used to add menu items to the context menu that appears when
         * clicking on the app icon in the launcher/taskbar/dock/etc. Different
         * platforms might put limitations on what is actually supported in a launcher
         * context menu.
         */
        contexts?: [("all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher")] & ("all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher")[],

        /**
         * A function that will be called back when the menu item is clicked. Event
         * pages cannot use this; instead, they should register a listener for
         * chrome.contextMenus.onClicked.
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
         * Lets you restrict the item to apply only to documents whose URL matches one
         * of the given patterns. (This applies to frames as well.) For details on the
         * format of a pattern, see <a href='match_patterns.html'>Match Patterns</a>.
         */
        documentUrlPatterns?: string[],

        /**
         * Similar to documentUrlPatterns, but lets you filter based on the src
         * attribute of img/audio/video tags and the href of anchor tags.
         */
        targetUrlPatterns?: string[],

        /**
         * Whether this context menu item is enabled or disabled. Defaults to true.
         */
        enabled?: boolean,
      },
      callback?: () => void,
    ): number | string;

    /**
     * Updates a previously created context menu item.
     * @param id The ID of the item to update.
     * @param updateProperties The properties to update. Accepts the same values as the create function.
     * @param callback Called when the context menu has been updated.
     */
    export function update(
      id: number | string,
      updateProperties: {
        type?: "normal" | "checkbox" | "radio" | "separator",
        title?: string,
        checked?: boolean,
        contexts?: [("all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher")] & ("all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher")[],
        onclick?: () => void,

        /**
         * Note: You cannot change an item to be a child of one of its own descendants.
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
           * The underlying reason behind the cookie's change. If a cookie was inserted,
           * or removed via an explicit call to "chrome.cookies.remove", "cause" will be
           * "explicit". If a cookie was automatically removed due to expiry, "cause" will
           * be "expired". If a cookie was removed due to being overwritten with an
           * already-expired expiration date, "cause" will be set to "expired_overwrite".
           * If a cookie was automatically removed due to garbage collection, "cause" will
           * be "evicted".  If a cookie was automatically removed due to a "set" call that
           * overwrote it, "cause" will be "overwrite". Plan your response accordingly.
           */
          cause: "evicted" | "expired" | "explicit" | "expired_overwrite" | "overwrite",
        },
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.debugger</code> API serves as an alternate transport for
   * Chrome's <a
   * href='http://code.google.com/chrome/devtools/docs/remote-debugging.html'>remote debugging protocol</a>. Use <code>chrome.debugger</code> to attach to one or more tabs to instrument network interaction, debug JavaScript, mutate the DOM and CSS, etc. Use the Debuggee <code>tabId</code> to target tabs with sendCommand and route events by <code>tabId</code> from onEvent callbacks.
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
       * background page is only possible when 'enable-silent-debugging' flag is
       * enabled on the target browser.
       */
      extensionId?: string;

      /**
       * The opaque id of the debug target.
       */
      targetId?: string;
    }

    /**
     * Debug target information
     */
    export interface TargetInfo {
      /**
       * Target type.
       */
      type: "page" | "background_page" | "worker" | "other";

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
     * @param requiredVersion Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained <a href='http://code.google.com/chrome/devtools/docs/remote-debugging.html'>here</a>.
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
     * @param method Method name. Should be one of the methods defined by the <a href='http://code.google.com/chrome/devtools/docs/remote-debugging.html'>remote debugging protocol</a>.
     * @param commandParams JSON object with request parameters. This object must conform to the remote debugging params scheme for given method.
     * @param callback Response body. If an error occurs while posting the message, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
     * @param callback.result JSON object with the response. Structure of the response varies depending on the method and is defined by the remote debugging protocol.
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
       * @param method Method name. Should be one of the notifications defined by the <a href='http://code.google.com/chrome/devtools/docs/remote-debugging.html'>remote debugging protocol</a>.
       * @param params JSON object with the response. Structure of the response varies depending on the method and is defined by the remote debugging protocol.
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
        reason: "target_closed" | "canceled_by_user" | "replaced_with_devtools",
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
     * Matches the state of a web page by various criteria.
     */
    export interface PageStateMatcher {
      /**
       * Matches if the condition of the UrlFilter are fulfilled for the top-level URL
       * of the page.
       */
      pageUrl?: events.UrlFilter;

      /**
       * Matches if all of the CSS selectors in the array match displayed elements in
       * a frame with the same origin as the page's main frame.  All selectors in this
       * array must be <a href="http://www.w3.org/TR/selectors4/#compound">compound
       * selectors</a> to speed up matching.  Note that listing hundreds of CSS
       * selectors or CSS selectors that match hundreds of times per page can still
       * slow down web sites.
       */
      css?: string[];

      instanceType: "declarativeContent.PageStateMatcher";
    }

    /**
     * Declarative event action that shows the extension's {@link pageAction page
     * action} while the corresponding conditions are met.  This action can be used
     * without <a href="declare_permissions.html#host-permissions">host
     * permissions</a>, but the extension must have a page action.  If the extension
     * takes the <a href="activeTab.html">activeTab</a> permission, a click on the
     * page action will grant access to the active tab.
     */
    export interface ShowPageAction {
      instanceType: "declarativeContent.ShowPageAction";
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
   * Use the <code>chrome.declarativeWebRequest</code> API to intercept, block, or
   * modify requests in-flight. It is significantly faster than the <a
   * href='webRequest.html'><code>chrome.webRequest</code> API</a> because you can
   * register rules that are evaluated in the browser rather than the JavaScript
   * engine with reduces roundtrip latencies and allows higher efficiency.
   * @beta
 * @chrome-permission declarativeWebRequest
 */
  export namespace declarativeWebRequest {
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
      resourceType?: ("main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other")[];

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
      stages?: ("onBeforeRequest" | "onBeforeSendHeaders" | "onHeadersReceived" | "onAuthRequired")[];

      instanceType: "declarativeWebRequest.RequestMatcher";
    }

    /**
     * Declarative event action that cancels a network request.
     */
    export interface CancelRequest {
      instanceType: "declarativeWebRequest.CancelRequest";
    }

    /**
     * Declarative event action that redirects a network request.
     */
    export interface RedirectRequest {
      instanceType: "declarativeWebRequest.RedirectRequest";

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
      instanceType: "declarativeWebRequest.RedirectToTransparentImage";
    }

    /**
     * Declarative event action that redirects a network request to an empty
     * document.
     */
    export interface RedirectToEmptyDocument {
      instanceType: "declarativeWebRequest.RedirectToEmptyDocument";
    }

    /**
     * Redirects a request by applying a regular expression on the URL. The regular
     * expressions use the <a href="http://code.google.com/p/re2/wiki/Syntax">RE2
     * syntax</a>.
     */
    export interface RedirectByRegEx {
      instanceType: "declarativeWebRequest.RedirectByRegEx";

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
      instanceType: "declarativeWebRequest.SetRequestHeader";

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
      instanceType: "declarativeWebRequest.RemoveRequestHeader";

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
      instanceType: "declarativeWebRequest.AddResponseHeader";

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
      instanceType: "declarativeWebRequest.RemoveResponseHeader";

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
      instanceType: "declarativeWebRequest.IgnoreRules";

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
      instanceType: "declarativeWebRequest.SendMessageToExtension";

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
      instanceType: "declarativeWebRequest.AddRequestCookie";

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
      instanceType: "declarativeWebRequest.AddResponseCookie";

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
      instanceType: "declarativeWebRequest.EditRequestCookie";

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
      instanceType: "declarativeWebRequest.EditResponseCookie";

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
      instanceType: "declarativeWebRequest.RemoveRequestCookie";

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
      instanceType: "declarativeWebRequest.RemoveResponseCookie";

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
          stage: "onBeforeRequest" | "onBeforeSendHeaders" | "onHeadersReceived" | "onAuthRequired",

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
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
    export type DesktopCaptureSourceType = "screen" | "window" | "tab";

    /**
     * Shows desktop media picker UI with the specified set of sources.
     * @param sources Set of sources that should be shown to the user.
     * @param targetTab Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension, otherwise the stream can be used only by the specified tab. If the tab's security origin changes before this function returns, the call may fail.
     * @param callback
     * @param callback.streamId An opaque string that can be passed to <code>getUserMedia()</code> API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty <code>streamId</code>
     * @returns An id that can be passed to cancelChooseDesktopMedia() in case the prompt need to be canceled.
     */
    export function chooseDesktopMedia(
      sources: DesktopCaptureSourceType[],
      targetTab: tabs.Tab,
      callback: (
        streamId: string,
      ) => void,
    ): number;

    /**
     * Shows desktop media picker UI with the specified set of sources.
     * @param sources Set of sources that should be shown to the user.
     * @param callback
     * @param callback.streamId An opaque string that can be passed to <code>getUserMedia()</code> API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty <code>streamId</code>
     * @returns An id that can be passed to cancelChooseDesktopMedia() in case the prompt need to be canceled.
     */
    export function chooseDesktopMedia(
      sources: DesktopCaptureSourceType[],
      callback: (
        streamId: string,
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
   * Use the <code>chrome.experimental.devtools.audits</code> API to add new audit
   * categories to the Developer Tools' Audit panel.
   * @chrome-permission experimental
 */
  export namespace experimental.devtools.audits {
    /**
     * A group of logically related audit checks.
     */
    export interface AuditCategory {
      /**
       * If the category is enabled, this event is fired when the audit is
       * started. The event handler is expected to initiate execution of the
       * audit logic that will populate the <code>results</code> collection.
       */
      onAuditStarted: chrome.events.Event<
        /**
         * @param results
         */
        (
          results: AuditResults,
        ) => void
      >;
    }

    /**
     * A value returned from one of the formatters (a URL, code snippet etc), to be
     * passed to <code>createResult()</code> or <code>addChild()</code>. See {@link
     * AuditResults.createSnippet} and {@link AuditResults.createURL}.
     */
    export interface FormattedValue {
    }

    /**
     * A collection of audit results for the current run of the audit category.
     */
    export interface AuditResults {
      /**
       * A class that contains possible values for the audit result severities.
       */
      Severity: AuditResultSeverity;

      /**
       * The contents of the node.
       */
      text: string;

      /**
       * Children of this node.
       */
      children?: AuditResultNode[];

      /**
       * Whether the node is expanded by default.
       */
      expanded?: boolean;

      /**
       * Adds an audit result. The results are rendered as bulleted items under the
       * audit category assoicated with the <code>AuditResults</code> object.
       * @param displayName A concise, high-level description of the result.
       * @param description A detailed description of what the displayName means.
       * @param severity
       * @param details A subtree that appears under the added result that may provide additional details on the violations found.
       */
      addResult(
        displayName: string,
        description: string,
        severity: AuditResultSeverity,
        details?: AuditResultNode,
      ): void;

      /**
       * Creates a result node that may be used as the <code>details</code> parameters
       * to the <code>addResult()</code> method.
       * @param content Either string or formatted values returned by one of the AuditResult formatters (a URL, a snippet etc). If multiple arguments are passed, these will be concatenated into a single node.
       */
      createResult(
        content: string | FormattedValue,
      ): AuditResultNode;

      /**
       * Signals the DevTools Audits panel that the run of this category is over. The
       * audit run also completes automatically when the number of added top-level
       * results is equal to that declared when AuditCategory was created.
       */
      done(): void;

      /**
       * Render passed value as a URL in the Audits panel.
       * @param href A URL that appears as the href value on the resulting link.
       * @param displayText Text that appears to the user.
       */
      createURL(
        href: string,
        displayText?: string,
      ): FormattedValue;

      /**
       * Render passed text as a code snippet in the Audits panel.
       * @param text Snippet text.
       */
      createSnippet(
        text: string,
      ): FormattedValue;
    }

    /**
     * A node in the audit result tree. Displays content and may optionally have
     * children nodes.
     */
    export interface AuditResultNode {
      /**
       * If set, the subtree will always be expanded.
       */
      expanded: boolean;

      /**
       * Adds a child node to this node.
       * @param content Either string or formatted values returned by one of the AuditResult formatters (URL, snippet etc). If multiple arguments are passed, these will be concatenated into a single node.
       */
      addChild(
        content: string | FormattedValue,
      ): AuditResultNode;
    }

    /**
     * This type contains possible values for a result severity. The results of
     * different severities are distinguished by colored bullets near the result's
     * display name.
     */
    export interface AuditResultSeverity {
      Info: string;

      Warning: string;

      Severe: string;
    }

    /**
     * Adds an audit category.
     * @param displayName A display name for the category.
     * @param resultCount The expected number of audit results in the category.
     */
    export function addCategory(
      displayName: string,
      resultCount: number,
    ): AuditCategory;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.experimental.devtools.console</code> API to retrieve
   * messages from the inspected page console and post messages there.
   * @chrome-permission experimental
 */
  export namespace experimental.devtools.console {
    /**
     * A console message.
     */
    export interface ConsoleMessage {
      /**
       * Message severity.
       */
      severity: Severity;

      /**
       * The text of the console message, as represented by the first argument to the
       * console.log() or a similar method (no parameter substitution  performed).
       */
      text: string;

      /**
       * The URL of the script that originated the message, if available.
       */
      url?: string;

      /**
       * The number of the line where the message originated, if available.
       */
      line?: number;
    }

    export interface Severity {
      Tip: string;

      Debug: string;

      Log: string;

      Warning: string;

      Error: string;
    }

    /**
     * Adds a message to the console.
     * @param severity The severity of the message.
     * @param text The text of the message.
     */
    export function addMessage(
      severity: Severity,
      text: string,
    ): void;

    /**
     * Retrieves console messages.
     * @param callback A function that receives console messages when the request completes.
     * @param callback.messages Console messages.
     */
    export function getMessages(
      callback: (
        messages: ConsoleMessage[],
      ) => void,
    ): void;

    /**
     * Fired when a new message is added to the console.
     */
    export const onMessageAdded: chrome.events.Event<
      /**
       * @param message
       */
      (
        message: ConsoleMessage,
      ) => void
    >;
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
     * otherwise an exception is thrown.
     * @param expression An expression to evaluate.
     * @param callback A function called when evaluation completes.
     * @param callback.result The result of evaluation.
     * @param callback.isException Set if an exception was caught while evaluating the expression.
     */
    export function eval(
      expression: string,
      callback?: (
        result: {[name: string]: any},
        isException: boolean,
      ) => void,
    ): void;

    /**
     * Reloads the inspected page.
     * @param reloadOptions
     */
    export function reload(
      reloadOptions?: {
        /**
         * When true, the loader will ignore the cache for all inspected page resources
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
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.dial</code> API to discover devices that support DIAL.
   * Protocol specification: http://www.dial-multiscreen.org/
   * @chrome-permission dial
 */
  export namespace dial {
    export interface DialDevice {
      /**
       * A label identifying the device within this instance of the browser. Not
       * guaranteed to persist beyond browser instances.
       */
      deviceLabel: string;

      /**
       * A URL pointing to the device description resource for the device.
       */
      deviceDescriptionUrl: string;

      /**
       * The uPnP configuration ID reported by the device.  Corresponds to the
       * CONFIGID.UPNP.ORG header in the M-SEARCH response.
       */
      configId?: number;
    }

    export type DialErrorCode = "no_listeners" | "no_valid_network_interfaces" | "network_disconnected" | "cellular_network" | "socket_error" | "unknown";

    export interface DialError {
      code: DialErrorCode;
    }

    /**
     * Requests that DIAL discovery happen immediately.  The request may not be
     * honored as discovery may already be happening in the background.  The
     * callback is invoked with |true| if discovery was initiated or |false|
     * otherwise.
     * @param callback
     * @param callback.result
     */
    export function discoverNow(
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * <p>Event fired to inform clients of the current, complete set of
     * responsive devices.  Clients should only need to store the list from the
     * most recent event.  May be fired in response to multiple
     * circumstances:</p><p>(1) The DIAL service refreshed its device list
     * through periodic polling. (2) A client invoked discoverNow(). (3) An
     * event happened that should invalidate the device list     (e.g., a
     * network interface went offline), in which case it is fired     with an
     * empty array.</p>
     */
    export const onDeviceList: chrome.events.Event<
      /**
       * @param result
       */
      (
        result: DialDevice[],
      ) => void
    >;

    /**
     * Event fired to inform clients on errors during device discovery.
     */
    export const onError: chrome.events.Event<
      /**
       * @param error
       */
      (
        error: DialError,
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

    export type InterruptReason = "FILE_FAILED" | "FILE_ACCESS_DENIED" | "FILE_NO_SPACE" | "FILE_NAME_TOO_LONG" | "FILE_TOO_LARGE" | "FILE_VIRUS_INFECTED" | "FILE_TRANSIENT_ERROR" | "FILE_BLOCKED" | "FILE_SECURITY_CHECK_FAILED" | "FILE_TOO_SHORT" | "NETWORK_FAILED" | "NETWORK_TIMEOUT" | "NETWORK_DISCONNECTED" | "NETWORK_SERVER_DOWN" | "NETWORK_INVALID_REQUEST" | "SERVER_FAILED" | "SERVER_NO_RANGE" | "SERVER_PRECONDITION" | "SERVER_BAD_CONTENT" | "USER_CANCELED" | "USER_SHUTDOWN" | "CRASH";

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
       * Absolute URL.
       */
      url: string;

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
       * <code>filename</code> or <code>url</code> contain all of the search terms
       * that do not begin with a dash '-' and none of the search terms that do begin
       * with a dash.
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
       * Absolute URL.
       */
      url?: string;

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
     * Prompt the user to accept a dangerous download. Does not automatically accept
     * dangerous downloads. If the download is accepted, then an {@link onChanged}
     * event will fire, otherwise nothing will happen.  When all the data is fetched
     * into a temporary file and either the download is not dangerous or the danger
     * has been accepted, then the temporary file is renamed to the target filename,
     * the |state| changes to 'complete', and {@link onChanged} fires.
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
       * List of actions that are triggered if one of the condtions is fulfilled.
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
     * Filters URLs for various criteria. See <a href='#filtered'>event
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
       * href="http://code.google.com/p/re2/wiki/Syntax">RE2 syntax</a>.
       */
      urlMatches?: string;

      /**
       * Matches if the URL without query segment and fragment identifier matches a
       * specified regular expression. Port numbers are stripped from the URL if they
       * match the default port number. The regular expressions use the <a
       * href="http://code.google.com/p/re2/wiki/Syntax">RE2 syntax</a>.
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
   * none
   * @chrome-permission experimental
 */
  export namespace experimental.accessibility {
    /**
     * Information about the state of a checkbox.
     */
    export interface CheckboxDetails {
      /**
       * True if this checkbox is checked.
       */
      isChecked: boolean;
    }

    /**
     * Information about the state of a combo box.
     */
    export interface ComboBoxDetails {
      /**
       * The value of the combo box.
       */
      value: string;

      /**
       * The number of items in the combo box's list.
       */
      itemCount: number;

      /**
       * The 0-based index of the current value, or -1 if the user entered a value not
       * from the list.
       */
      itemIndex: number;
    }

    /**
     * Information about the state of a list box.
     */
    export interface ListBoxDetails {
      /**
       * The value of the list box.
       */
      value: string;

      /**
       * The number of items in the list.
       */
      itemCount: number;

      /**
       * The 0-based index of the selected value, or -1 if no items are selected.
       */
      itemIndex: number;
    }

    /**
     * Information about the state of a drop-down menu.
     */
    export interface MenuDetails {
    }

    /**
     * Information about a menu item.
     */
    export interface MenuItemDetails {
      /**
       * True if this item opens a submenu.
       */
      hasSubmenu: boolean;

      /**
       * The number of items in the menu.
       */
      itemCount: number;

      /**
       * The 0-based index of this menu item.
       */
      itemIndex: number;
    }

    /**
     * Information about the state of a radio button.
     */
    export interface RadioButtonDetails {
      /**
       * True if this radio button is checked.
       */
      isChecked: boolean;

      /**
       * The number of radio buttons in this group.
       */
      itemCount: number;

      /**
       * The 0-based index of this radio button in this group.
       */
      itemIndex: number;
    }

    /**
     * Information about the state of a slider.
     */
    export interface SliderDetails {
      /**
       * The value of the slider as a string.
       */
      stringValue: string;
    }

    /**
     * Additional accessibility information about a tab.
     */
    export interface TabDetails {
      /**
       * The number of tabs in this group.
       */
      itemCount: number;

      /**
       * The 0-based index of this tab in this group.
       */
      itemIndex: number;
    }

    /**
     * Information about the state of a text box.
     */
    export interface TextBoxDetails {
      /**
       * The value of the text box - the entered text.
       */
      value: string;

      /**
       * True if this control contains password text whose contents should be
       * obscured.
       */
      isPassword: boolean;

      /**
       * The index of the character where the selection starts, if this control
       * contains editable text.
       */
      selectionStart: number;

      /**
       * The index of the character where the selection ends, if this control contains
       * editable text.
       */
      selectionEnd: number;
    }

    /**
     * Information about the state of a tree control.
     */
    export interface TreeDetails {
    }

    /**
     * Information about a selected tree control item.
     */
    export interface TreeItemDetails {
      /**
       * The 0-based depth of this tree item.
       */
      itemDepth: number;

      /**
       * The number of items in the current depth.
       */
      itemCount: number;

      /**
       * The 0-based index of this tree item at the current tree depth.
       */
      itemIndex: number;

      /**
       * The number of children of the current tree item.
       */
      childrenCount: number;

      /**
       * True if this if this tree item is expanded.
       */
      isItemExpanded: boolean;
    }

    /**
     * Information about an alert
     */
    export interface AlertInfo {
      /**
       * The message the alert is showing.
       */
      message: string;
    }

    /**
     * Parent class for accessibility information about an object.
     */
    export interface AccessibilityObject {
      /**
       * The type of this object, which determines the contents of 'details'.
       */
      type: "alert" | "button" | "checkbox" | "combobox" | "link" | "menu" | "menuitem" | "radiobutton" | "slider" | "tab" | "textbox" | "tree" | "treeitem" | "window";

      /**
       * The localized name of the object, like OK or Password. Do not rely on an
       * exact string match because the text will be in the user's language and may
       * change in the future.
       */
      name: string;

      /**
       * The localized name of the context for the object, like the name of the
       * surrounding toolbar or group of controls.
       */
      context?: string;

      /**
       * Other details like the state, depending on the type of object.
       */
      details?: CheckboxDetails | ComboBoxDetails | MenuDetails | MenuItemDetails | RadioButtonDetails | SliderDetails | TabDetails | TextBoxDetails | TreeDetails | TreeItemDetails;
    }

    /**
     * Enables or disables the accessibility extension api. This must be set to true
     * before event listeners or getFocusedControl will work.
     * @param enabled True if accessibility support should be enabled.
     */
    export function setAccessibilityEnabled(
      enabled: boolean,
    ): void;

    /**
     * Enables or disables native accessibility support. Once disabled, it is up to
     * the calling extension to provide accessibility for web contents.
     * @param enabled True if native accessibility support should be enabled.
     */
    export function setNativeAccessibilityEnabled(
      enabled: boolean,
    ): void;

    /**
     * Gets information about the currently focused control.
     * @param callback
     * @param callback.control Details of the currently focused control, or null if nothing is focused.
     */
    export function getFocusedControl(
      callback: (
        control?: AccessibilityObject,
      ) => void,
    ): void;

    /**
     * Gets alerts being shown on the given tab.
     * @param tabId
     * @param callback
     * @param callback.alerts Alerts being shown on the given tab.
     */
    export function getAlertsForTab(
      tabId: number,
      callback: (
        alerts: AlertInfo[],
      ) => void,
    ): void;

    /**
     * Fired when a window is opened.
     */
    export const onWindowOpened: chrome.events.Event<
      /**
       * @param window Information about the window that was opened.
       */
      (
        window: AccessibilityObject,
      ) => void
    >;

    /**
     * Fired when a window is closed.
     */
    export const onWindowClosed: chrome.events.Event<
      /**
       * @param window Information about the window that was closed.
       */
      (
        window: AccessibilityObject,
      ) => void
    >;

    /**
     * Fired when a control is focused.
     */
    export const onControlFocused: chrome.events.Event<
      /**
       * @param control Details of the control that was focused.
       */
      (
        control: AccessibilityObject,
      ) => void
    >;

    /**
     * Fired when a control's action is taken, like pressing a button or
     * toggling a checkbox.
     */
    export const onControlAction: chrome.events.Event<
      /**
       * @param control Details of the control whose action was taken.
       */
      (
        control: AccessibilityObject,
      ) => void
    >;

    /**
     * Fired when text changes in an editable text control.
     */
    export const onTextChanged: chrome.events.Event<
      /**
       * @param control Details of the control where the text changed.
       */
      (
        control: AccessibilityObject,
      ) => void
    >;

    /**
     * Fired when a menu is opened.
     */
    export const onMenuOpened: chrome.events.Event<
      /**
       * @param menu Information about the menu that was opened.
       */
      (
        menu: AccessibilityObject,
      ) => void
    >;

    /**
     * Fired when a menu is closed.
     */
    export const onMenuClosed: chrome.events.Event<
      /**
       * @param menu Information about the menu that was closed.
       */
      (
        menu: AccessibilityObject,
      ) => void
    >;

    /**
     * Fired ChromeVox load state changes.
     */
    export const onChromeVoxLoadStateChanged: chrome.events.Event<
      /**
       * @param loading True if ChromeVox is loading; false if ChromeVox is unloading.
       * @param makeAnnouncements Whether to make introductory announcements.
       */
      (
        loading: boolean,
        makeAnnouncements: boolean,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.extension</code> API has utilities that can be used by any
   * extension page. It includes support for exchanging messages between an
   * extension and its content scripts or between extensions, as described in
   * detail in <a href='messaging.html'>Message Passing</a>.
   */
  export namespace extension {
    /**
     * Set for the lifetime of a callback if an ansychronous extension api has
     * resulted in an error. If no error has occured lastError will be
     * <var>undefined</var>.
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
         * pages and tabs). Valid values: 'tab', 'infobar', 'notification', 'popup'.
         */
        type?: "tab" | "infobar" | "notification" | "popup",

        /**
         * The window to restrict the search to. If omitted, returns all views.
         */
        windowId?: number,
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
   * messages through <a
   * href='http://developer.android.com/google/gcm/index.html'>Google Cloud
   * Messaging</a>.
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
         * applications. See the <a href='cloudMessagingV2#send_messages'>Cloud
         * Messaging documentation</a> for advice for picking and handling an ID.
         */
        messageId: string,

        /**
         * Time-to-live of the message in seconds. If it is not possible to send the
         * message within that time, an onSendError event will be raised. A time-to-live
         * of 0 indicates that the message should be sent immediately or fail if it's
         * not possible. The maximum and a default value of time-to-live is 2419200
         * seconds (4 weeks).
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
          collapseKey?: string,
        },
      ) => void
    >;

    /**
     * Fired when a GCM server had to delete messages sent by an app server to
     * the application. See <a
     * href='cloudMessagingV2#messages_deleted_event'>Messages deleted event</a>
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
   * href='override.html'>Override Pages</a>.
   * @chrome-permission history
 */
  export namespace history {
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
      transition: "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "auto_toplevel" | "form_submit" | "reload" | "keyword" | "keyword_generated";
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
         * since the epoch.
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
     * Gets the accept-languages of the browser. This is different from the locale
     * used by the browser; to get the locale, use {@link i18n.getUILanguage}.
     * @param callback
     * @param callback.languages Array of the accept languages of the browser, such as en-US,en,zh-CN
     */
    export function getAcceptLanguages(
      callback: (
        languages: string[],
      ) => void,
    ): void;

    /**
     * Gets the localized string for the specified message. If the message is
     * missing, this method returns an empty string (''). If the format of the
     * <code>getMessage()</code> call is wrong &mdash; for example,
     * <em>messageName</em> is not a string or the <em>substitutions</em> array has
     * more than 9 elements &mdash; this method returns <code>undefined</code>.
     * @param messageName The name of the message, as specified in the <a href='i18n-messages.html'><code>messages.json</code></a> file.
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
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.identity</code> API to get OAuth2 access tokens.
   * @chrome-permission identity
 */
  export namespace identity {
    export interface TokenDetails {
      /**
       * Fetching a token may require the user to sign-in to Chrome, or approve the
       * application's requested scopes. If the interactive flag is <code>true</code>,
       * <code>getAuthToken</code> will prompt the user as necessary. When the flag is
       * <code>false</code> or omitted, <code>getAuthToken</code> will return failure
       * any time a prompt would be required.
       */
      interactive?: boolean;
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

    export interface AccountInfo {
      /**
       * A unique identifier for the account. This ID will not change for the lifetime
       * of the account.
       */
      id: string;
    }

    /**
     * <p>Gets an OAuth2 access token using the client ID and scopes specified in
     * the <a href="app_identity.html#update_manifest"><code>oauth2</code> section
     * of manifest.json</a>.</p><p>The Identity API caches access tokens in memory,
     * so it's ok to call <code>getAuthToken</code> any time a token is required.
     * The token cache automatically handles expiration.</p>
     * @param details Token options.
     * @param callback Called with an OAuth2 access token as specified by the manifest, or undefined if there was an error.
     * @param callback.token
     */
    export function getAuthToken(
      details: TokenDetails,
      callback: (
        token?: string,
      ) => void,
    ): void;

    /**
     * <p>Gets an OAuth2 access token using the client ID and scopes specified in
     * the <a href="app_identity.html#update_manifest"><code>oauth2</code> section
     * of manifest.json</a>.</p><p>The Identity API caches access tokens in memory,
     * so it's ok to call <code>getAuthToken</code> any time a token is required.
     * The token cache automatically handles expiration.</p>
     * @param callback Called with an OAuth2 access token as specified by the manifest, or undefined if there was an error.
     * @param callback.token
     */
    export function getAuthToken(
      callback: (
        token?: string,
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
      callback: () => void,
    ): void;

    /**
     * <p>Starts an auth flow at the specified URL.</p><p>This method enables auth
     * flows with non-Google identity providers by launching a web view and
     * navigating it to the first URL in the provider's auth flow. When the provider
     * redirects to a URL matching the pattern
     * <code>https://&lt;app-id&gt;.chromiumapp.org/*</code>, the window will close,
     * and the final redirect URL will be passed to the <var>callback</var>
     * function.</p>
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
        newState: "active" | "idle" | "locked",
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
        newState: "active" | "idle" | "locked",
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.infobars</code> API to add a horizontal panel just above
   * a tab's contents. See the screenshot below.
   * @alpha
 * @chrome-permission infobars
 */
  export namespace infobars {
    /**
     * Shows an infobar in the specified tab. The infobar will be closed
     * automatically when the tab navigates. Use window.close() to close the infobar
     * before then.
     * @param details
     * @param callback
     * @param callback.window Contains details about the window in which the infobar was created.
     */
    export function show(
      details: {
        /**
         * The tab id for the tab to display the infobar in.
         */
        tabId: number,

        /**
         * The html file that contains the infobar.
         */
        path: string,

        /**
         * The height (in pixels) of the infobar to show. If omitted, the default
         * infobar height will be used.
         */
        height?: number,
      },
      callback?: (
        window: windows.Window,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.input.ime</code> API to implement a custom IME for
   * Chrome OS. This allows your extension to handle keystrokes, set the
   * composition, and manage the candidate window.
   * @chrome-platform chromeos
 * @chrome-permission input
 */
  export namespace input.ime {
    /**
     * See http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent
     */
    export interface KeyboardEvent {
      /**
       * One of keyup or keydown.
       */
      type: "keyup" | "keydown";

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
      type: "text" | "search" | "tel" | "url" | "email" | "number";
    }

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
       * Enum representing if this item is: check, radio, or a separator.  Radio
       * buttons between separators are considered grouped.
       */
      style?: "check" | "radio" | "separator";

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
           * How to render this segment
           */
          style: "underline" | "doubleUnderline",
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
           * Where to display the candidate window. If set to 'cursor', the window follows
           * the cursor. If set to 'composition', the window is locked to the beginning of
           * the composition.
           */
          windowPosition?: "cursor" | "composition",
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
     * This event is sent when an IME is activated. It signals that the IME will
     * be receiving onKeyPress events.
     */
    export const onActivate: chrome.events.Event<
      /**
       * @param engineID ID of the engine receiving the event
       */
      (
        engineID: string,
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
     * This event is sent if this extension owns the active IME.
     */
    export const onKeyEvent: chrome.events.Event<
      /**
       * @param engineID ID of the engine receiving the event
       * @param keyData Data on the key event
       * @returns True if the keystroke was handled, false if not.  This function should always return a value if |async| is not specified.
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
        button: "left" | "middle" | "right",
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
           * The text around cursor.
           */
          text: string,

          /**
           * The ending position of the selection. This value indicates caret position if
           * there is no selection.
           */
          focus: number,

          /**
           * The beginning position of the selection. This value indicates caret position
           * if is no selection.
           */
          anchor: number,
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
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.location</code> API to retrieve the geographic location
   * of the host machine. This API is a version of the <a
   * href="http://dev.w3.org/geo/api/spec-source.html">HTML Geolocation API</a>
   * that is compatible with event pages.
   * @chrome-permission location
 */
  export namespace location {
    export interface Coordinates {
      /**
       * The geographic latitude specified in degrees.
       */
      latitude: number;

      /**
       * The geographic longitude specified in degrees.
       */
      longitude: number;

      /**
       * The height of the position, specified in meters above the [WGS84] ellipsoid,
       * or null if Chrome cannot provide altitude information.
       */
      altitude?: number;

      /**
       * The accuracy of the latitude and longitude coordinates, in meters. This
       * represents the radius of a circle around the given location.
       */
      accuracy: number;

      /**
       * The accuracy in meters of the 'altitude' attribute if it's not null,
       * otherwise, null.
       */
      altitudeAccuracy?: number;

      /**
       * The direction of travel of the hosting device and is specified in degrees,
       * where 0 <= heading < 360, counting clockwise relative to the true north. If
       * the Chrome cannot provide heading information, the value of this attribute is
       * null. If the hosting device is stationary (i.e. the value of the speed
       * attribute is 0), then the value of the heading attribute is NaN.
       */
      heading?: number;

      /**
       * The magnitude of the horizontal component of the hosting device's current
       * velocity and is specified in meters per second. If the Chrome cannot provide
       * speed information, the value of this attribute is null.
       */
      speed?: number;
    }

    export interface Location {
      /**
       * Location watch request name.
       */
      name: string;

      /**
       * Coordinates and their accuracy.
       */
      coords: Coordinates;

      /**
       * The time when the Location object was acquired in milliseconds since the
       * start of the Unix Epoch.
       */
      timestamp: number;
    }

    export interface WatchLocationRequestInfo {
      /**
       * Minimum distance between location updates, in meters. Defaults to 0 - any
       * change in location will be reported.
       */
      minDistanceInMeters?: number;

      /**
       * Minimum time interval between location updates, in milliseconds. Defaults to
       * 0 - system-defined frequency of updates will be used.
       */
      minTimeInMilliseconds?: number;

      /**
       * Maximum age of a cached location, in milliseconds, that Chrome can pass to
       * the first onLocationUpdate event for this location watch request. If this
       * value <= 0, Chrome will always attempt to acquire a new location. Defaults to
       * 0.
       */
      maximumAge?: number;
    }

    /**
     * Starts a location watching request. If there is another location watching
     * request with the same name (or no name if none is specified), it will be
     * cancelled and replaced by this request.
     * @param name Optional name to identify this request. Defaults to the empty string.
     * @param requestInfo Optional parameters for this request.
     */
    export function watchLocation(
      name: string,
      requestInfo: WatchLocationRequestInfo,
    ): void;

    /**
     * Ends a location watching request.
     * @param name Optional name to identify the request to remove. Defaults to the empty string.
     */
    export function clearWatch(
      name: string,
    ): void;

    /**
     * Fired when a location change is detected.
     */
    export const onLocationUpdate: chrome.events.Event<
      /**
       * @param location An object containing matching events and new location.
       */
      (
        location: Location,
      ) => void
    >;

    /**
     * Fired when detecting location in not possible.
     */
    export const onLocationError: chrome.events.Event<
      /**
       * @param error Human-readable error description.
       */
      (
        error: string,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.management</code> API provides ways to manage the list of
   * extensions/apps that are installed and running. It is particularly useful for
   * extensions that <a href='override.html'>override</a> the built-in New Tab
   * page.
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
       * The <a href='manifest/version.html'>version</a> of this extension, app, or
       * theme.
       */
      version: string;

      /**
       * Whether this extension can be disabled or uninstalled by the user.
       */
      mayDisable: boolean;

      /**
       * Whether it is currently enabled or disabled.
       */
      enabled: boolean;

      /**
       * A reason the item is disabled.
       */
      disabledReason?: "unknown" | "permissions_increase";

      /**
       * True if this is an app.
       * @deprecated Please use {@link management.ExtensionInfo.type}.
       */
      isApp: boolean;

      /**
       * The type of this extension, app, or theme.
       */
      type: "extension" | "hosted_app" | "packaged_app" | "legacy_packaged_app" | "theme";

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
       * href='manifest/icons.html'>manifest documentation on icons</a> for more
       * details.
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
       * How the extension was installed. One of<br><var>admin</var>: The extension
       * was installed because of an administrative policy,<br><var>development</var>:
       * The extension was loaded unpacked in developer mode,<br><var>normal</var>:
       * The extension was installed normally via a .crx file,<br><var>sideload</var>:
       * The extension was installed by other software on the
       * machine,<br><var>other</var>: The extension was installed by other means.
       */
      installType: "admin" | "development" | "normal" | "sideload" | "other";
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
     * Returns a list of <a href='permission_warnings.html'>permission warnings</a>
     * for the given extension id.
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
     * Returns a list of <a href='permission_warnings.html'>permission warnings</a>
     * for the given extension manifest string. Note: This function can be used
     * without requesting the 'management' permission in the manifest.
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
     * Enables or disables an app or extension.
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
         * false.
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
     * Chrome settings which can be overriden by an extension.
     */
    export interface ChromeSettingsOverrides {
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
         * in the commands section of the manifest. The corresponding menu item is also
         * removed or overridden as well.
         */
        remove_bookmark_shortcut?: boolean,

        /**
         * [Private] If <code>true</code>, the built-in "Bookmark open pages..."
         * shortcut key and corresponding menu item is removed.
         */
        remove_bookmark_open_pages_shortcut?: boolean,

        /**
         * Deprecated. Use remove_button instead.
         */
        hide_bookmark_button?: boolean,
      };

      /**
       * New value for the homepage.
       */
      homepage?: string;

      /**
       * A search engine
       */
      search_provider?: {
        /**
         * Name of the search engine displayed to user.
         */
        name: string,

        /**
         * Omnibox keyword for the search engine.
         */
        keyword: string,

        /**
         * An icon URL for the search engine.
         */
        favicon_url: string,

        /**
         * An search URL used by the search engine.
         */
        search_url: string,

        /**
         * Encoding of the search term.
         */
        encoding: string,

        /**
         * If omitted, this engine does not support suggestions.
         */
        suggest_url?: string,

        /**
         * If omitted, this engine does not support instant.
         */
        instant_url?: string,

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
         * The string of post parameters to instant_url
         */
        instant_url_post_params?: string,

        /**
         * The string of post parameters to image_url
         */
        image_url_post_params?: string,

        /**
         * A list of URL patterns that can be used, in addition to |search_url|.
         */
        alternate_urls?: string[],

        /**
         * Specifies if the search provider should be default.
         */
        is_default: boolean,
      };

      /**
       * URLs to be added to the list of startup pages.
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
    }
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.mdns</code> API to discover services over mDNS.
 This
   * comprises a subset of the features of the NSD spec:
   * http://www.w3.org/TR/discovery-api/
   * @chrome-permission mdns
 */
  export namespace mdns {
    export interface MDnsService {
      /**
       * The service name of an mDNS advertised service,
       * <instance_name>.<service_type>.
       */
      serviceName: string;

      /**
       * The host:port pair of an mDNS advertised service.
       */
      serviceHostPort: string;

      /**
       * The IP address of an mDNS advertised service.
       */
      ipAddress: string;

      /**
       * Metadata for an mDNS advertised service.
       */
      serviceData: string[];
    }

    /**
     * Event fired to inform clients of the current complete set of known
     * available services. Clients should only need to store the list from the
     * most recent event. The service type that the extension is interested in
     * discovering should be specified as the event filter with the
     * 'serviceType' key. Not specifying an event filter will not start any
     * discovery listeners.
     */
    export const onServiceList: chrome.events.Event<
      /**
       * @param services
       */
      (
        services: MDnsService[],
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
       * Sender's avatar, app icon, or a thumbnail for image notifications.
       * <em>Required for {@link notifications.create}</em> method.
       */
      iconUrl?: string;

      iconBitmap?: NotificationBitmap;

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
       * default.
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
       * Image thumbnail for image-type notifications.
       */
      imageUrl?: string;

      imageBitmap?: NotificationBitmap;

      /**
       * Items for multi-item notifications.
       */
      items?: NotificationItem[];

      /**
       * Current progress ranges from 0 to 100.
       */
      progress?: number;

      /**
       * Whether to show UI indicating that the app will visibly respond to clicks on
       * the body of a notification.
       */
      isClickable?: boolean;
    }

    /**
     * Creates and displays a notification.
     * @param notificationId Identifier of the notification. If it is empty, this method generates an id. If it matches an existing notification, this method first clears that notification before proceeding with the create operation.
     * @param options Contents of the notification.
     * @param callback Returns the notification id (either supplied or generated) that represents the created notification.
     * @param callback.notificationId
     */
    export function create(
      notificationId: string,
      options: NotificationOptions,
      callback: (
        notificationId: string,
      ) => void,
    ): void;

    /**
     * Updates an existing notification.
     * @param notificationId The id of the notification to be updated. This is returned by {@link notifications.create} method.
     * @param options Contents of the notification to update to.
     * @param callback Called to indicate whether a matching notification existed.
     * @param callback.wasUpdated
     */
    export function update(
      notificationId: string,
      options: NotificationOptions,
      callback: (
        wasUpdated: boolean,
      ) => void,
    ): void;

    /**
     * Clears the specified notification.
     * @param notificationId The id of the notification to be cleared. This is returned by {@link notifications.create} method.
     * @param callback Called to indicate whether a matching notification existed.
     * @param callback.wasCleared
     */
    export function clear(
      notificationId: string,
      callback: (
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
     * The user changes the permission level.
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
     * The user clicked on a link for the app's notification settings.
     */
    export const onShowSettings: chrome.events.Event<
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
        type: "url" | "match" | "dim",
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
        type: "url" | "match" | "dim",
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
       * @param disposition The window disposition for the omnibox query. This is the recommended context to display results. For example, if the omnibox command is to navigate to a certain URL, a disposition of 'newForegroundTab' means the navigation should take place in a new selected tab.
       */
      (
        text: string,
        disposition: "currentTab" | "newForegroundTab" | "newBackgroundTab",
      ) => void
    >;

    /**
     * User has ended the keyword input session without accepting the input.
     */
    export const onInputCancelled: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.pageAction</code> API to put icons inside the address
   * bar. Page actions represent actions that can be taken on the current page,
   * but that aren't applicable to all pages.
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
     */
    export function show(
      tabId: number,
    ): void;

    /**
     * Hides the page action.
     * @param tabId The id of the tab for which you want to modify the page action.
     */
    export function hide(
      tabId: number,
    ): void;

    /**
     * Sets the title of the page action. This is displayed in a tooltip over the
     * page action.
     * @param details
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
         * image with size <code>scale</code> * 19 will be selected. Initially only
         * scales 1 and 2 will be supported. At least one image must be specified. Note
         * that 'details.imageData = foo' is equivalent to 'details.imageData = {'19':
         * foo}'
         */
        imageData?: ImageDataType | {
          19?: ImageDataType,
          38?: ImageDataType,
        },

        /**
         * Either a relative image path or a dictionary {size -> relative image path}
         * pointing to icon to be set. If the icon is specified as a dictionary, the
         * actual image to be used is chosen depending on screen's pixel density. If the
         * number of image pixels that fit into one screen space unit equals
         * <code>scale</code>, then image with size <code>scale</code> * 19 will be
         * selected. Initially only scales 1 and 2 will be supported. At least one image
         * must be specified. Note that 'details.path = foo' is equivalent to
         * 'details.imageData = {'19': foo}'
         */
        path?: string | {
          19?: string,
          38?: string,
        },

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
   * none
   */
  export namespace pageActions {
    /**
     * Enables a page action for a particular tab+URL combination (makes its icon
     * visible in the OmniBox when a certain URL is active in a given tab). The page
     * action will automatically be disabled (its icon hidden) if the user navigates
     * to a new URL or closes the tab. The action will also automatically be
     * enabled/disabled as the user switches tabs.
     * @param pageActionId An extension can have multiple page actions specified in the manifest, each with a unique identifier. This string identifies which page action you want to enable (and must match a page action id declared in the manifest).
     * @param action An object specifing what action should be applied to the page action. Contains the following properties:
     */
    export function enableForTab(
      pageActionId: string,
      action: {
        /**
         * The id of the tab for which you want to enable the page action.
         */
        tabId: number,

        /**
         * The URL of the page you want the page action to apply to. If the URL
         * specified does not match the currently navigated URL (user has navigated to
         * another page) then no action is taken.
         */
        url: string,

        /**
         * Specifying <b>title</b> allows you to change the tooltip that appears when
         * you hover over the page action icon in the OmniBox. This parameter is
         * optional and if omitted then the page action <b>name</b> property declared in
         * the manifest is used.
         */
        title?: string,

        /**
         * A zero-based index into the <b>icons</b> vector specified in the manifest.
         * This parameter is optional and if omitted then the first icon in the
         * <b>icons</b> vector of the page action is used. This id is useful to
         * represent different page action states. Example: An RSS feed icon could have
         * a 'subscribe now' icon and an 'already subscribed' icon.
         */
        iconId?: number,
      },
    ): void;

    /**
     * Disables a page action for a particular tab+URL combination (makes its
     * OmniBox page action icon hidden when a certain URL is active in a given tab).
     * This can be useful to disable a page action before the user navigates away
     * from a page containing an enabled page action.
     * @param pageActionId An extension can have multiple page actions specified in the manifest, each with a unique identifier. This string identifies which page action you want to disable (and must match a page action id declared in the manifest).
     * @param action An object specifying what action should be applied to the page action. Contains the following properties:
     */
    export function disableForTab(
      pageActionId: string,
      action: {
        /**
         * The id of the tab for which you want to disable the page action.
         */
        tabId: number,

        /**
         * The URL of the page you want the page action to not apply to. If the URL
         * specified does not match the currently navigated URL (user has navigated to
         * another page) then no action is taken.
         */
        url: string,
      },
    ): void;
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
       * List of named permissions (does not include hosts or origins).  Anything
       * listed here must appear in the <code>optional_permissions</code> list in the
       * manifest.
       */
      permissions?: string[];

      /**
       * List of origin permissions. Anything listed here must be a subset of a host
       * that appears in the <code>optional_permissions</code> list in the manifest.
       * For example, if <code>http://*.example.com/</code> or
       * <code>http://&#x2a;/</code> appears in <code>optional_permissions</code>, you
       * can request an origin of <code>http://help.example.com/</code>. Any path is
       * ignored.
       */
      origins?: string[];
    }

    /**
     * Gets the extension's current set of permissions.
     * @param callback
     * @param callback.permissions The extension's active permissions.
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
     * @param callback.result True if the extension has the specified permissions.
     */
    export function contains(
      permissions: Permissions,
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Requests access to the specified permissions. These permissions must be
     * defined in the optional_permissions field of the manifest. If there are any
     * problems requesting the permissions, {@link runtime.lastError} will be set.
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
   * Use the <code>chrome.privacy</code> API to control usage of the features in
   * Chrome that can affect a user's privacy. This API relies on the <a
   * href='types.html#ChromeSetting'>ChromeSetting prototype of the type API</a>
   * for getting and setting Chrome's configuration.
   * @chrome-permission privacy
 */
  export namespace privacy {
    /**
     * Settings that influence Chrome's handling of network connections in general.
     */
    export const network: {
      /**
       * If enabled, Chrome attempts to speed up your web browsing experience by
       * pre-resolving DNS entries, prerendering sites (<code>&lt;link rel='prefetch'
       * ...&gt;</code>), and preemptively opening TCP and SSL connections to servers.
       * This preference's value is a boolean, defaulting to <code>true</code>.
       */
      networkPredictionEnabled: types.ChromeSetting<boolean>,
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
       * If enabled, Chrome does its best to protect you from phishing and malware.
       * This preference's value is a boolean, defaulting to <code>true</code>.
       */
      safeBrowsingEnabled: types.ChromeSetting<boolean>,

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
   * Use the <code>chrome.proxy</code> API to manage Chrome's proxy settings. This
   * API relies on the <a href='types.html#ChromeSetting'>ChromeSetting prototype
   * of the type API</a> for getting and setting the proxy configuration.
   * @chrome-permission proxy
 */
  export namespace proxy {
    /**
     * An object encapsulating a single proxy server's specification.
     */
    export interface ProxyServer {
      /**
       * The scheme (protocol) of the proxy server itself. Defaults to 'http'.
       */
      scheme?: "http" | "https" | "quic" | "socks4" | "socks5";

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
      mode: "direct" | "auto_detect" | "pac_script" | "fixed_servers" | "system";
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
   * Use <code>chrome.pushMessaging</code> to enable apps and extensions to
   * receive message data sent through
 <a href="cloudMessaging.html">Google Cloud
   * Messaging</a>.
   * @chrome-permission pushMessaging
 */
  export namespace pushMessaging {
    export interface Message {
      /**
       * The subchannel the message was sent on; only values 0-3 are valid.
       */
      subchannelId: number;

      /**
       * The payload associated with the message, if any. This should not contain any
       * personally identifiable information.
       */
      payload: string;
    }

    export interface ChannelIdResult {
      /**
       * The channel ID for this app to use for push messaging.
       */
      channelId: string;
    }

    /**
     * Retrieves the channel ID associated with this app or extension. Typically an
     * app or extension will want to send this value to its application server so
     * the server can use it to trigger push messages back to the app or extension.
     * If the interactive flag is set, we will ask the user to log in when they are
     * not already logged in.
     * @param interactive
     * @param callback
     * @param callback.channelId
     */
    export function getChannelId(
      interactive: boolean,
      callback: (
        channelId: ChannelIdResult,
      ) => void,
    ): void;

    /**
     * Retrieves the channel ID associated with this app or extension. Typically an
     * app or extension will want to send this value to its application server so
     * the server can use it to trigger push messages back to the app or extension.
     * If the interactive flag is set, we will ask the user to log in when they are
     * not already logged in.
     * @param callback
     * @param callback.channelId
     */
    export function getChannelId(
      callback: (
        channelId: ChannelIdResult,
      ) => void,
    ): void;

    /**
     * Fired when a push message has been received.
     */
    export const onMessage: chrome.events.Event<
      /**
       * @param message The details associated with the message.
       */
      (
        message: Message,
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
     * An object which allows two way communication with other pages.
     */
    export interface Port {
      name: string;

      disconnect: () => void;

      onDisconnect: events.Event<() => {}>;

      onMessage: events.Event<() => {}>;

      postMessage: () => void;

      /**
       * This property will <b>only</b> be present on ports passed to
       * onConnect/onConnectExternal listeners.
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
       * The ID of the extension or app that opened the connection, if any.
       */
      id?: string;

      /**
       * The URL of the page or frame that opened the connection, if any. This
       * property will <strong>only</strong> be present when the connection was opened
       * from a tab or content script.
       */
      url?: string;

      /**
       * The TLS channel ID of the web page that opened the connection, if requested
       * by the extension or app, and if available.
       */
      tlsChannelId?: string;
    }

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
     * @param url
     */
    export function setUninstallURL(
      url: string,
    ): void;

    /**
     * Reloads the app or extension.
     */
    export function reload(): void;

    /**
     * Requests an update check for this app/extension.
     * @param callback
     * @param callback.status Result of the update check.
     * @param callback.details If an update is available, this contains more information about the available update.
     */
    export function requestUpdateCheck(
      callback: (
        status: "throttled" | "no_update" | "update_available",
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
     * Attempts to connect to connect listeners within an extension/app (such as the
     * background page), or other extensions/apps. This is useful for content
     * scripts connecting to their extension processes, inter-app/extension
     * communication, and <a href="manifest/externally_connectable.html">web
     * messaging</a>. Note that this does not connect to any listeners in a content
     * script. Extensions may connect to content scripts embedded in tabs via {@link
     * tabs.connect}.
     * @param extensionId The ID of the extension or app to connect to. If omitted, a connection will be attempted with your own extension. Required if sending messages from a web page for <a href="manifest/externally_connectable.html">web messaging</a>.
     * @param connectInfo
     * @returns Port through which messages can be sent and received. The port's {@link runtime.Port onDisconnect} event is fired if the extension/app does not exist.
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
     * Connects to a native application in the host machine.
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
     * {@link runtime.onMessage} event will be fired in each page, or {@link
     * runtime.onMessageExternal}, if a different extension. Note that extensions
     * cannot send messages to content scripts using this method. To send messages
     * to content scripts, use {@link tabs.sendMessage}.
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for <a href="manifest/externally_connectable.html">web messaging</a>.
     * @param message
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
     * {@link runtime.onMessage} event will be fired in each page, or {@link
     * runtime.onMessageExternal}, if a different extension. Note that extensions
     * cannot send messages to content scripts using this method. To send messages
     * to content scripts, use {@link tabs.sendMessage}.
     * @param message
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
        platformInfo: {
          /**
           * The operating system chrome is running on.
           */
          os: "mac" | "win" | "android" | "cros" | "linux" | "openbsd",

          /**
           * The machine's processor architecture.
           */
          arch: "arm" | "x86-32" | "x86-64",

          /**
           * The native client architecture. This may be different from arch on some
           * platforms.
           */
          nacl_arch: "arm" | "x86-32" | "x86-64",
        },
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
          reason: "install" | "update" | "chrome_update",

          /**
           * Indicates the previous version of the extension, which has just been updated.
           * This is present only if 'reason' is 'update'.
           */
          previousVersion?: string,
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
     * chrome.runtime.reload().
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
     * content script.
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
     * Fired when a connection is made from another extension.
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
     * Fired when a message is sent from either an extension process or a
     * content script.
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
     * Fired when a message is sent from another extension/app. Cannot be used
     * in a content script.
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
       * @param reason The reason that the event is being dispatched. 'app_update' is used when the restart is needed because the application is updated to a newer version. 'os_update' is used when the restart is needed because the browser/OS is updated to a newer version. 'periodic' is used when the system runs for more than the permitted uptime set in the enterprise policy.
       */
      (
        reason: "app_update" | "os_update" | "periodic",
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.scriptBadge</code> API to control the behaviour of the
   * script badge.
   */
  export namespace scriptBadge {
    /**
     * Sets the html document to be opened as a popup when the user clicks on the
     * script badge's icon.
     * @param details
     */
    export function setPopup(
      details: {
        /**
         * The id of the tab for which you want to modify the script badge.
         */
        tabId: number,

        /**
         * The html file to show in a popup.  If set to the empty string (''), no popup
         * is shown.
         */
        popup: string,
      },
    ): void;

    /**
     * Gets the html document set as the popup for this script badge.
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
     * Brings the script badge to the attention of the user, imploring her to click.
     * You should call this when you detect that you can do something to a
     * particular tab.  Do not call this for every tab. That's tacky.  If the user
     * clicks on the badge, the activeTab APIs become available. If the extension
     * has already run on this tab, this call does nothing.
     * @param details
     */
    export function getAttention(
      details: {
        /**
         * Specify the tab to request to act on.
         */
        tabId: number,
      },
    ): void;

    /**
     * Fired when a script badge icon is clicked.  This event will not fire if
     * the script badge has a popup.
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
   * Use the <code>chrome.sessions</code> API to query and restore tabs and
   * windows from a browsing session.
   * @alpha
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
      /**
       * Represents all information about a foreign device.
       */
      info: string;

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
     * @param callback.sessions The list of closed entries in reverse order that they were closed (the most recently closed tab or window will be at index <code>0</code>).The entries may contain either tabs or windows.
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
     * @param callback.sessions The list of closed entries in reverse order that they were closed (the most recently closed tab or window will be at index <code>0</code>).The entries may contain either tabs or windows.
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
     * @param sessionId The {@link windows.Window.sessionId}, or {@link tabs.Tab.sessionId} to restore.
     * @param callback
     * @param callback.restoredSession A {@link sessions.Session} containing the restored {@link windows.Window} or {@link tabs.Tab} object.
     */
    export function restore(
      sessionId?: string,
      callback?: (
        restoredSession: Session,
      ) => void,
    ): void;
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
     * Fired if the DeviceInfo object of any of the signed in devices change or
     * a new device is added or a device removed.
     */
    export const onDeviceInfoChange: chrome.events.Event<
      /**
       * @param devices
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
    }

    /**
     * Items in the <code>sync</code> storage area are synced using Chrome Sync.
     */
    // TODO: missing 5 properties
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
       * Identifier of the display that is being mirrored on the display unit. If
       * mirroring is not in progress, set to an empty string. Currently exposed only
       * on ChromeOS. Will be empty string on other platforms.
       */
      mirroringSourceId: string;

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
    }

    export interface DisplayProperties {
      /**
       * If set and not empty, starts mirroring between this and the display with the
       * provided id (the system will determine which of the displays is actually
       * mirrored). If set and not empty, stops mirroring between this and the display
       * with the specified id (if mirroring is in progress). If set, no other
       * parameter may be set.
       */
      mirroringSourceId?: string;

      /**
       * If set to true, makes the display primary. No-op if set to false.
       */
      isPrimary?: boolean;

      /**
       * If set, sets the display's overscan insets to the provided values. Note that
       * overscan values may not be negative or larger than a half of the screen's
       * size. Overscan cannot be changed on the internal monitor. It's applied after
       * <code>isPrimary</code> parameter.
       */
      overscan?: Insets;

      /**
       * If set, updates the display's rotation. Legal values are [0, 90, 180, 270].
       * The rotation is set clockwise, relative to the display's vertical position.
       * It's applied after <code>overscan</code> paramter.
       */
      rotation?: number;

      /**
       * If set, updates the display's logical bounds origin along x-axis. Applied
       * together with <code>boundsOriginY</code>, if <code>boundsOriginY</code> is
       * set. Note that, when updating the display origin, some constraints will be
       * applied, so the final bounds origin may be different than the one set. The
       * final bounds can be retrieved using {@link getInfo}. The bounds origin is
       * applied after <code>rotation</code>. The bounds origin cannot be changed on
       * the primary display. Note that is also invalid to set bounds origin values if
       * <code>isPrimary</code> is also set (as <code>isPrimary</code> parameter is
       * applied first).
       */
      boundsOriginX?: number;

      /**
       * If set, updates the display's logical bounds origin along y-axis. See
       * documentation for <code>boundsOriginX</code> parameter.
       */
      boundsOriginY?: number;
    }

    /**
     * Get the information of all attached display devices.
     * @param callback
     * @param callback.displayInfo
     */
    export function getInfo(
      callback: (
        displayInfo: DisplayUnitInfo[],
      ) => void,
    ): void;

    /**
     * Updates the properties for the display specified by |id|, according to the
     * information provided in |info|. On failure, {@link runtime.lastError} will be
     * set.
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
    }

    /**
     * Captures the visible area of the currently active tab. This method can only
     * be used on the currently active page after the extension has been
     * <em>invoked</em>, similar to the way that <a
     * href="activeTab.html">activeTab</a> works.
     * @param options Configures the returned media stream.
     * @param callback Callback with either the stream returned or null.
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
     * @param callback
     * @param callback.result
     */
    export function getCapturedTabs(
      callback: (
        result: CaptureInfo[],
      ) => void,
    ): void;

    /**
     * Event fired when the capture status of a tab changes. This allows
     * extension authors to keep track of the capture status of tabs to keep UI
     * elements like page actions and infobars in sync.
     */
    export const onStatusChanged: chrome.events.Event<
      /**
       * @param info
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
    export interface Tab {
      /**
       * The ID of the tab. Tab IDs are unique within a browser session. Under some
       * circumstances a Tab may not be assigned an ID, for example when querying
       * foreign tabs using the {@link sessions} API, in which case a session ID may
       * be present.
       */
      id?: number;

      /**
       * The zero-based index of the tab within its window.
       */
      index: number;

      /**
       * The ID of the window the tab is contained within.
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
       * Whether the tab is active in its window. (Does not necessarily mean the
       * window is focused.)
       */
      active: boolean;

      /**
       * Whether the tab is pinned.
       */
      pinned: boolean;

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
       * The session ID used to uniquely identify a Tab obtained from the {@link
       * sessions} API.
       */
      sessionId?: string;
    }

    /**
     * Details of the script or CSS to inject. Either the code or the file property
     * must be set, but both may not be set at the same time.
     */
    export interface InjectDetails {
      /**
       * JavaScript or CSS code to inject.
       */
      code?: string;

      /**
       * JavaScript or CSS file to inject.
       */
      file?: string;

      /**
       * If allFrames is <code>true</code>, implies that the JavaScript or CSS should
       * be injected into all frames of current page. By default, it's
       * <code>false</code> and is only injected into the top frame.
       */
      allFrames?: boolean;

      /**
       * The soonest that the JavaScript or CSS will be injected into the tab.
       * Defaults to "document_idle".
       */
      runAt?: "document_start" | "document_end" | "document_idle";
    }

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
     * called from a non-tab context (for example: a background page or popup view).
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
     * href='messaging.html'>Content Script Messaging</a>.
     * @param tabId
     * @param connectInfo
     * @returns A port that can be used to communicate with the content scripts running in the specified tab. The port's {@link runtime.Port} event is fired if the tab closes or does not exist.
     */
    export function connect(
      tabId: number,
      connectInfo?: {
        /**
         * Will be passed into onConnect for content scripts that are listening for the
         * connection event.
         */
        name?: string,
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
     * @param responseCallback.response The JSON response object sent by the handler of the request. If an error occurs while connecting to the specified tab, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
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
     * @param message
     * @param responseCallback
     * @param responseCallback.response The JSON response object sent by the handler of the message. If an error occurs while connecting to the specified tab, the callback will be called with no arguments and {@link runtime.lastError} will be set to the error message.
     */
    export function sendMessage(
      tabId: number,
      message: any,
      responseCallback?: (
        response: any,
      ) => void,
    ): void;

    /**
     * Gets the tab that is selected in the specified window.
     * @param windowId Defaults to the <a href='windows.html#current-window'>current window</a>.
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
     * @param windowId Defaults to the <a href='windows.html#current-window'>current window</a>.
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
     * @param callback.tab Details about the created tab. Will contain the ID of the new tab.
     */
    export function create(
      createProperties: {
        /**
         * The window to create the new tab in. Defaults to the <a
         * href='windows.html#current-window'>current window</a>.
         */
        windowId?: number,

        /**
         * The position the tab should take in the window. The provided value will be
         * clamped to between zero and the number of tabs in the window.
         */
        index?: number,

        /**
         * The URL to navigate the tab to initially. Fully-qualified URLs must include a
         * scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs
         * will be relative to the current page within the extension. Defaults to the
         * New Tab Page.
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
     * @param tabId The ID of the tab which is to be duplicated.
     * @param callback
     * @param callback.tab Details about the duplicated tab. The {@link tabs.Tab} object doesn't contain <code>url</code>, <code>title</code> and <code>favIconUrl</code> if the <code>"tabs"</code> permission has not been requested.
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
         * Whether the tabs are highlighted.
         */
        highlighted?: boolean,

        /**
         * Whether the tabs are in the <a href='windows.html#current-window'>current
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
        status?: "loading" | "complete",

        /**
         * Match page titles against a pattern.
         */
        title?: string,

        /**
         * Match tabs against a <a href='match_patterns.html'>URL pattern</a>. Note that
         * fragment identifiers are not matched.
         */
        url?: string,

        /**
         * The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the <a
         * href='windows.html#current-window'>current window</a>.
         */
        windowId?: number,

        /**
         * The type of window the tabs are in.
         */
        windowType?: "normal" | "popup" | "panel" | "app",

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
     * Highlights the given tabs.
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
      callback: (
        window: windows.Window,
      ) => void,
    ): void;

    /**
     * Modifies the properties of a tab. Properties that are not specified in
     * <var>updateProperties</var> are not modified.
     * @param tabId Defaults to the selected tab of the <a href='windows.html#current-window'>current window</a>.
     * @param updateProperties
     * @param callback
     * @param callback.tab Details about the updated tab. The {@link tabs.Tab} object doesn't contain <code>url</code>, <code>title</code> and <code>favIconUrl</code> if the <code>"tabs"</code> permission has not been requested.
     */
    export function update(
      tabId: number,
      updateProperties: {
        /**
         * A URL to navigate the tab to.
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
         * The ID of the tab that opened this tab. If specified, the opener tab must be
         * in the same window as this tab.
         */
        openerTabId?: number,
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
     * @param callback.tab Details about the updated tab. The {@link tabs.Tab} object doesn't contain <code>url</code>, <code>title</code> and <code>favIconUrl</code> if the <code>"tabs"</code> permission has not been requested.
     */
    export function update(
      updateProperties: {
        /**
         * A URL to navigate the tab to.
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
         * The ID of the tab that opened this tab. If specified, the opener tab must be
         * in the same window as this tab.
         */
        openerTabId?: number,
      },
      callback?: (
        tab?: Tab,
      ) => void,
    ): void;

    /**
     * Moves one or more tabs to a new position within its window, or to a new
     * window. Note that tabs can only be moved to and from normal (window.type ===
     * "normal") windows.
     * @param tabIds The tab or list of tabs to move.
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
         * The position to move the window to. -1 will place the tab at the end of the
         * window.
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
         * Whether using any local cache. Default is false.
         */
        bypassCache?: boolean,
      },
      callback?: () => void,
    ): void;

    /**
     * Closes one or more tabs.
     * @param tabIds The tab or list of tabs to close.
     * @param callback
     */
    export function remove(
      tabIds: number | number[],
      callback?: () => void,
    ): void;

    /**
     * Detects the primary language of the content in a tab.
     * @param tabId Defaults to the active tab of the <a href='windows.html#current-window'>current window</a>.
     * @param callback
     * @param callback.language An ISO language code such as <code>en</code> or <code>fr</code>. For a complete list of languages supported by this method, see <a href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, <code>und</code> will be returned.
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
     * @param callback.language An ISO language code such as <code>en</code> or <code>fr</code>. For a complete list of languages supported by this method, see <a href='http://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc'>kLanguageInfoTable</a>. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, <code>und</code> will be returned.
     */
    export function detectLanguage(
      callback: (
        language: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified
     * window. You must have <a href='declare_permissions.html'>host permission</a>
     * for the URL displayed by the tab.
     * @param windowId The target window. Defaults to the <a href='windows.html#current-window'>current window</a>.
     * @param options
     * @param callback
     * @param callback.dataUrl A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(
      windowId: number,
      options: types.ImageDetails,
      callback: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified
     * window. You must have <a href='declare_permissions.html'>host permission</a>
     * for the URL displayed by the tab.
     * @param options
     * @param callback
     * @param callback.dataUrl A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(
      options: types.ImageDetails,
      callback: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified
     * window. You must have <a href='declare_permissions.html'>host permission</a>
     * for the URL displayed by the tab.
     * @param windowId The target window. Defaults to the <a href='windows.html#current-window'>current window</a>.
     * @param callback
     * @param callback.dataUrl A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(
      windowId: number,
      callback: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified
     * window. You must have <a href='declare_permissions.html'>host permission</a>
     * for the URL displayed by the tab.
     * @param callback
     * @param callback.dataUrl A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(
      callback: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Injects JavaScript code into a page. For details, see the <a
     * href='content_scripts.html#pi'>programmatic injection</a> section of the
     * content scripts doc.
     * @param tabId The ID of the tab in which to run the script; defaults to the active tab of the current window.
     * @param details Details of the script to run.
     * @param callback Called after all the JavaScript has been executed.
     * @param callback.result The result of the script in every injected frame.
     */
    export function executeScript(
      tabId: number,
      details: tabs.InjectDetails,
      callback?: (
        result?: any[],
      ) => void,
    ): void;

    /**
     * Injects JavaScript code into a page. For details, see the <a
     * href='content_scripts.html#pi'>programmatic injection</a> section of the
     * content scripts doc.
     * @param details Details of the script to run.
     * @param callback Called after all the JavaScript has been executed.
     * @param callback.result The result of the script in every injected frame.
     */
    export function executeScript(
      details: tabs.InjectDetails,
      callback?: (
        result?: any[],
      ) => void,
    ): void;

    /**
     * Injects CSS into a page. For details, see the <a
     * href='content_scripts.html#pi'>programmatic injection</a> section of the
     * content scripts doc.
     * @param tabId The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
     * @param details Details of the CSS text to insert.
     * @param callback Called when all the CSS has been inserted.
     */
    export function insertCSS(
      tabId: number,
      details: tabs.InjectDetails,
      callback?: () => void,
    ): void;

    /**
     * Injects CSS into a page. For details, see the <a
     * href='content_scripts.html#pi'>programmatic injection</a> section of the
     * content scripts doc.
     * @param details Details of the CSS text to insert.
     * @param callback Called when all the CSS has been inserted.
     */
    export function insertCSS(
      details: tabs.InjectDetails,
      callback?: () => void,
    ): void;

    /**
     * Fired when a tab is created. Note that the tab's URL may not be set at
     * the time this event fired, but you can listen to onUpdated events to be
     * notified when a URL is set.
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
           * The tab's new favicon URL.
           */
          favIconUrl?: string,
        },
        tab: Tab,
      ) => void
    >;

    /**
     * Fired when a tab is moved within a window. Only one move event is fired,
     * representing the tab the user directly moved. Move events are not fired
     * for the other tabs that must move in response. This event is not fired
     * when a tab is moved between windows. For that, see {@link
     * tabs.onDetached}.
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
     * tabs.onUpdated} events to be notified when a URL is set.
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
     * onUpdated events to be notified when a URL is set.
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
     * Fired when a tab is detached from a window, for example because it is
     * being moved between windows.
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
     * Fired when a tab is attached to a window, for example because it was
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
           * True when the tab is being closed because its window is being closed.
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
  }
}

declare namespace chrome {
  /**
   * Tests a valid IDL file.
   */
  export namespace idl_basics {
    export type EnumType = "name1" | "name2";

    export interface MyType1 {
      a: string;
    }

    export function function1(): void;

    /**
     * @param x
     */
    export function function2(
      x: number,
    ): void;

    /**
     * @param arg
     */
    export function function3(
      arg: MyType1,
    ): void;

    /**
     * @param cb
     */
    export function function4(
      cb: () => void,
    ): void;

    /**
     * @param cb
     * @param cb.x
     */
    export function function5(
      cb: (
        x: number,
      ) => void,
    ): void;

    /**
     * @param cb
     * @param cb.arg
     */
    export function function6(
      cb: (
        arg: MyType1,
      ) => void,
    ): void;

    /**
     * @param cb
     * @param cb.type
     */
    export function function7(
      cb: (
        type: EnumType,
      ) => void,
    ): void;

    /**
     */
    export const onFoo1: chrome.events.Event<
      () => void
    >;

    /**
     */
    export const onFoo2: chrome.events.Event<
      /**
       * @param arg
       */
      (
        arg: MyType1,
      ) => void
    >;

    /**
     */
    export const onFoo3: chrome.events.Event<
      /**
       * @param type
       */
      (
        type: EnumType,
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
   * when any extension or Chrome App uses the <a href='tts.html'>tts</a> API to
   * generate speech. Your extension can then use any available web technology to
   * synthesize and output the speech, and send events back to the calling
   * function to report the status.
   * @chrome-permission ttsEngine
 */
  export namespace ttsEngine {
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
          gender?: "male" | "female",

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
   * href='http://developer.chrome.com/extensions/ttsEngine.html'>ttsEngine</a>
   * API, which allows an extension to implement a speech engine.
   * @chrome-permission tts
 */
  export namespace tts {
    /**
     * An event from the TTS engine to communicate the status of an utterance.
     */
    export interface TtsEvent {
      /**
       * The type can be 'start' as soon as speech has started, 'word' when a word
       * boundary is reached, 'sentence' when a sentence boundary is reached, 'marker'
       * when an SSML mark element is reached, 'end' when the end of the utterance is
       * reached, 'interrupted' when the utterance is stopped or interrupted before
       * reaching the end, 'cancelled' when it's removed from the queue before ever
       * being synthesized, or 'error' when any other error occurs. When pausing
       * speech, a 'pause' event is fired if a particular utterance is paused in the
       * middle, and 'resume' if an utterance resumes speech. Note that pause and
       * resume events may not fire if speech is paused in-between utterances.
       */
      type: "start" | "end" | "word" | "sentence" | "marker" | "interrupted" | "cancelled" | "error" | "pause" | "resume";

      /**
       * The index of the current character in the utterance.
       */
      charIndex?: number;

      /**
       * The error description, if the event type is 'error'.
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
       */
      gender?: "male" | "female";

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
      eventTypes?: string[];
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
        gender?: "male" | "female",

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
   * The <code>chrome.types.private</code> API contains private type declarations
   * for Chrome.
   */
  export namespace types.private {
    /**
     * An interface that allows component extensions direct access to a Chrome
     * browser setting.
     */
    export interface ChromeDirectSetting {
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
           * Where to set the setting (default: regular). One
           * of<ul><li><var>regular</var>: setting for the regular profile (which is
           * inherited by the incognito profile if not overridden
           * elsewhere),</li><li><var>regular_only</var>: setting for the regular profile
           * only (not inherited by the incognito
           * profile),</li><li><var>incognito_persistent</var>: setting for the incognito
           * profile that survives browser restarts (overrides regular
           * preferences),</li><li><var>incognito_session_only</var>: setting for the
           * incognito profile that can only be set during an incognito session and is
           * deleted when the incognito session ends (overrides regular and
           * incognito_persistent preferences).</li></ul>
           */
          scope?: "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only",
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
           * Where to clear the setting (default: regular). One
           * of<ul><li><var>regular</var>: setting for the regular profile (which is
           * inherited by the incognito profile if not overridden
           * elsewhere),</li><li><var>regular_only</var>: setting for the regular profile
           * only (not inherited by the incognito
           * profile),</li><li><var>incognito_persistent</var>: setting for the incognito
           * profile that survives browser restarts (overrides regular
           * preferences),</li><li><var>incognito_session_only</var>: setting for the
           * incognito profile that can only be set during an incognito session and is
           * deleted when the incognito session ends (overrides regular and
           * incognito_persistent preferences).</li></ul>
           */
          scope?: "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only",
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
   * The <code>chrome.types</code> API contains type declarations for Chrome.
   */
  export namespace types {
    /**
     * An interface that allows access to a Chrome browser setting. See {@link
     * proxy.settings} for an example.
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
             * One of<ul><li><var>not_controllable</var>: cannot be controlled by any
             * extension</li><li><var>controlled_by_other_extensions</var>: controlled by
             * extensions with higher
             * precedence</li><li><var>controllable_by_this_extension</var>: can be
             * controlled by this extension</li><li><var>controlled_by_this_extension</var>:
             * controlled by this extension</li></ul>
             */
            levelOfControl: "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension",

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
           * Where to set the setting (default: regular). One
           * of<ul><li><var>regular</var>: setting for the regular profile (which is
           * inherited by the incognito profile if not overridden
           * elsewhere),</li><li><var>regular_only</var>: setting for the regular profile
           * only (not inherited by the incognito
           * profile),</li><li><var>incognito_persistent</var>: setting for the incognito
           * profile that survives browser restarts (overrides regular
           * preferences),</li><li><var>incognito_session_only</var>: setting for the
           * incognito profile that can only be set during an incognito session and is
           * deleted when the incognito session ends (overrides regular and
           * incognito_persistent preferences).</li></ul>
           */
          scope?: "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only",
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
           * Where to clear the setting (default: regular). One
           * of<ul><li><var>regular</var>: setting for the regular profile (which is
           * inherited by the incognito profile if not overridden
           * elsewhere),</li><li><var>regular_only</var>: setting for the regular profile
           * only (not inherited by the incognito
           * profile),</li><li><var>incognito_persistent</var>: setting for the incognito
           * profile that survives browser restarts (overrides regular
           * preferences),</li><li><var>incognito_session_only</var>: setting for the
           * incognito profile that can only be set during an incognito session and is
           * deleted when the incognito session ends (overrides regular and
           * incognito_persistent preferences).</li></ul>
           */
          scope?: "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only",
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
             * One of<ul><li><var>not_controllable</var>: cannot be controlled by any
             * extension</li><li><var>controlled_by_other_extensions</var>: controlled by
             * extensions with higher
             * precedence</li><li><var>controllable_by_this_extension</var>: can be
             * controlled by this extension</li><li><var>controlled_by_this_extension</var>:
             * controlled by this extension</li></ul>
             */
            levelOfControl: "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension",

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

    /**
     * Details about the format and quality of an image.
     */
    export interface ImageDetails {
      /**
       * The format of the resulting image.  Default is <code>"jpeg"</code>.
       */
      format?: "jpeg" | "png";

      /**
       * When format is <code>"jpeg"</code>, controls the quality of the resulting
       * image.  This value is ignored for PNG images.  As quality is decreased, the
       * resulting image will have more visual artifacts, and the number of bytes
       * needed to store it will decrease.
       */
      quality?: number;
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
     * For isochronous mode, SynchronizationType and UsageType map to their
     * namesakes within the USB specification.
     */
    export type SynchronizationType = "asynchronous" | "adaptive" | "synchronous";

    export type UsageType = "data" | "feedback" | "explicitFeedback";

    export interface Device {
      /**
       * The id of the USB device. It remains unchanged until the device is unplugged.
       */
      device: number;

      vendorId: number;

      productId: number;
    }

    export interface ConnectionHandle {
      /**
       * The id of the USB connection handle.
       */
      handle: number;

      vendorId: number;

      productId: number;
    }

    export interface EndpointDescriptor {
      address: number;

      type: TransferType;

      direction: Direction;

      maximumPacketSize: number;

      /**
       * Used for isochronous mode.
       */
      synchronization?: SynchronizationType;

      usage?: UsageType;

      /**
       * If this is an interrupt endpoint, this will be 1-255.
       */
      pollingInterval?: number;
    }

    export interface InterfaceDescriptor {
      interfaceNumber: number;

      alternateSetting: number;

      interfaceClass: number;

      interfaceSubclass: number;

      interfaceProtocol: number;

      description?: string;

      endpoints: EndpointDescriptor[];
    }

    export interface ControlTransferInfo {
      /**
       * The direction of this transfer.
       */
      direction: Direction;

      /**
       * The intended recipient for this transfer.
       */
      recipient: Recipient;

      /**
       * The type of this request.
       */
      requestType: RequestType;

      request: number;

      value: number;

      index: number;

      /**
       * If this transfer is an input transfer, then this field must be set to
       * indicate the expected data length. If this is an output transfer, then this
       * field is ignored.
       */
      length?: number;

      /**
       * The data payload carried by this transfer. If this is an output transfer then
       * this field must be set.
       */
      data?: ArrayBuffer;
    }

    export interface GenericTransferInfo {
      /**
       * The direction of this transfer.
       */
      direction: Direction;

      endpoint: number;

      /**
       * If this is an input transfer then this field indicates the size of the input
       * buffer. If this is an output transfer then this field is ignored.
       */
      length?: number;

      /**
       * If this is an output transfer then this field must be populated. Otherwise,
       * it will be ignored.
       */
      data?: ArrayBuffer;
    }

    export interface IsochronousTransferInfo {
      /**
       * All of the normal transfer parameters are encapsulated in the transferInfo
       * parameters. Note that the data specified in this parameter block is split
       * along packetLength boundaries to form the individual packets of the transfer.
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
       * A value of 0 indicates that the transfer was a success. Other values indicate
       * failure.
       */
      resultCode?: number;

      /**
       * If the transfer was an input transfer then this field will contain all of the
       * input data requested.
       */
      data?: ArrayBuffer;
    }

    export interface EnumerateDevicesOptions {
      vendorId: number;

      productId: number;
    }

    export interface EnumerateDevicesAndRequestAccessOptions {
      vendorId: number;

      productId: number;

      /**
       * The interface id to request access against. Only available on ChromeOS. It
       * has no effect on other platforms.
       */
      interfaceId?: number;
    }

    /**
     * Lists USB devices specified by vendorId/productId/interfaceId tuple.
     * @param options The properties to search for on target devices.
     * @param callback Invoked with a list of |Device|s on complete.
     * @param callback.devices
     */
    export function getDevices(
      options: EnumerateDevicesOptions,
      callback: (
        devices: Device[],
      ) => void,
    ): void;

    /**
     * This method is ChromeOS specific. Calling this method on other platforms will
     * fail. Requests access from the permission broker to an OS claimed device if
     * the given interface on the device is not claimed.
     * @param device The device to request access to.
     * @param interfaceId
     * @param callback
     * @param callback.sucess
     */
    export function requestAccess(
      device: Device,
      interfaceId: number,
      callback: (
        sucess: boolean,
      ) => void,
    ): void;

    /**
     * Opens a USB device returned by |getDevices|.
     * @param device The device to open.
     * @param callback Invoked with the created ConnectionHandle on complete.
     * @param callback.handle
     */
    export function openDevice(
      device: Device,
      callback: (
        handle: ConnectionHandle,
      ) => void,
    ): void;

    /**
     * <p>Finds USB devices specified by the vendorId/productId/interfaceId tuple
     * and, if permissions allow, opens them for use.</p><p>On Chrome OS, you can
     * specify the interfaceId. In that case the method will request access from
     * permission broker in the same way as in |requestUsbAcess|.</p><p>If the
     * access request is rejected, or the device is failed to be opened, its
     * connection handle will not be created or returned.</p><p>Calling this method
     * is equivalent to calling |getDevices| followed by a series of |requestAccess|
     * (if it is on ChromeOs) and |openDevice| calls, and returning all the
     * successfully opened connection handles.</p>
     * @param options The properties to search for on target devices.
     * @param callback Invoked with the opened ConnectionHandle on complete.
     * @param callback.handles
     */
    export function findDevices(
      options: EnumerateDevicesAndRequestAccessOptions,
      callback: (
        handles: ConnectionHandle[],
      ) => void,
    ): void;

    /**
     * Closes a connection handle. Invoking operations on a device after it has been
     * closed is a safe operation, but causes no action to be taken.
     * @param handle The connection handle to close.
     * @param callback The callback to invoke once the device is closed.
     */
    export function closeDevice(
      handle: ConnectionHandle,
      callback?: () => void,
    ): void;

    /**
     * Lists all the interfaces on the USB device.
     * @param handle The device from which the interfaces should be listed.
     * @param callback The callback to invoke when the interfaces are enumerated.
     * @param callback.descriptors
     */
    export function listInterfaces(
      handle: ConnectionHandle,
      callback: (
        descriptors: InterfaceDescriptor[],
      ) => void,
    ): void;

    /**
     * <p>Claims an interface on the specified USB device. Before you can transfer
     * data with endpoints, you must claim their parent interfaces. Only one
     * connection handle on the same host can claim each interface. If the interface
     * is already claimed, this call will fail.</p><p>You shall call
     * releaseInterface when the interface is not needed anymore.</p>
     * @param handle The device on which the interface is to be claimed.
     * @param interfaceNumber
     * @param callback The callback to invoke once the interface is claimed.
     */
    export function claimInterface(
      handle: ConnectionHandle,
      interfaceNumber: number,
      callback: () => void,
    ): void;

    /**
     * Releases a claim to an interface on the provided device.
     * @param handle The device on which the interface is to be released.
     * @param interfaceNumber
     * @param callback The callback to invoke once the interface is released.
     */
    export function releaseInterface(
      handle: ConnectionHandle,
      interfaceNumber: number,
      callback: () => void,
    ): void;

    /**
     * Selects an alternate setting on a previously claimed interface on a device.
     * @param handle The device on which the interface settings are to be set.
     * @param interfaceNumber
     * @param alternateSetting The alternate setting to set.
     * @param callback The callback to invoke once the interface setting is set.
     */
    export function setInterfaceAlternateSetting(
      handle: ConnectionHandle,
      interfaceNumber: number,
      alternateSetting: number,
      callback: () => void,
    ): void;

    /**
     * <p>Performs a control transfer on the specified device. See the
     * ControlTransferInfo structure for the parameters required to make a
     * transfer.</p><p>Conceptually control transfer talks to the device itself. You
     * do not need to claim interface 0 to perform a control transfer.</p>
     * @param handle A connection handle to make the transfer on.
     * @param transferInfo The parameters to the transfer. See ControlTransferInfo.
     * @param callback Invoked once the transfer has completed.
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
     * @param handle A connection handle to make the transfer on.
     * @param transferInfo The parameters to the transfer. See GenericTransferInfo.
     * @param callback Invoked once the transfer has completed.
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
     * @param handle A connection handle to make the transfer on.
     * @param transferInfo The parameters to the transfer. See GenericTransferInfo.
     * @param callback Invoked once the transfer has completed.
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
     * @param handle A connection handle to make the transfer on.
     * @param transferInfo The parameters to the transfer. See IsochronousTransferInfo.
     * @param callback Invoked once the transfer has been completed.
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
     * Tries to reset the USB device and restores it to the previous status. If the
     * reset fails, the given connection handle will be closed and the  USB device
     * will appear to be disconnected then reconnected.  In that case you must call
     * |getDevices| or |findDevices| again to acquire the device.
     * @param handle A connection handle to reset.
     * @param callback Invoked once the device is reset with a boolean indicating whether the reset is completed successfully.
     * @param callback.result
     */
    export function resetDevice(
      handle: ConnectionHandle,
      callback: (
        result: boolean,
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
         * The ID of the process runs the renderer for this tab.
         */
        processId: number,

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
           * ID of frame that wraps the frame. Set to -1 of no parent frame exists.
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
           * The ID of the process runs the renderer for this tab.
           */
          processId: number,

          /**
           * The ID of the frame. 0 indicates that this is the main frame; a positive
           * value indicates the ID of a subframe.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame. Set to -1 of no parent frame exists.
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
           * The ID of the process runs the renderer for this tab.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique for a given
           * tab and process.
           */
          frameId: number,

          /**
           * ID of frame that wraps the frame. Set to -1 of no parent frame exists.
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
           * The ID of the process runs the renderer for this tab.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * Cause of the navigation. The same transition types as defined in the history
           * API are used. These are the same transition types as defined in the <a
           * href="history.html#transition_types">history API</a> except with
           * <code>"start_page"</code> in place of <code>"auto_toplevel"</code> (for
           * backwards compatibility).
           */
          transitionType: "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "start_page" | "form_submit" | "reload" | "keyword" | "keyword_generated",

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: ("client_redirect" | "server_redirect" | "forward_back" | "from_address_bar")[],

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
           * The ID of the process runs the renderer for this tab.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

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
           * The ID of the process runs the renderer for this tab.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

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
           * The ID of the process runs the renderer for this tab.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

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
           * The ID of the process runs the renderer for the source tab.
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
           * The ID of the process runs the renderer for this tab.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * Cause of the navigation. The same transition types as defined in the history
           * API are used. These are the same transition types as defined in the <a
           * href="history.html#transition_types">history API</a> except with
           * <code>"start_page"</code> in place of <code>"auto_toplevel"</code> (for
           * backwards compatibility).
           */
          transitionType: "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "start_page" | "form_submit" | "reload" | "keyword" | "keyword_generated",

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: ("client_redirect" | "server_redirect" | "forward_back" | "from_address_bar")[],

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
           * The ID of the process runs the renderer for this tab.
           */
          processId: number,

          /**
           * 0 indicates the navigation happens in the tab content window; a positive
           * value indicates navigation in a subframe. Frame IDs are unique within a tab.
           */
          frameId: number,

          /**
           * Cause of the navigation. The same transition types as defined in the history
           * API are used. These are the same transition types as defined in the <a
           * href="history.html#transition_types">history API</a> except with
           * <code>"start_page"</code> in place of <code>"auto_toplevel"</code> (for
           * backwards compatibility).
           */
          transitionType: "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "start_page" | "form_submit" | "reload" | "keyword" | "keyword_generated",

          /**
           * A list of transition qualifiers.
           */
          transitionQualifiers: ("client_redirect" | "server_redirect" | "forward_back" | "from_address_bar")[],

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
      types?: ("main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other")[];

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
       * If true, the request is cancelled. Used in onBeforeRequest, this prevents the
       * request from being sent.
       */
      cancel?: boolean;

      /**
       * Only used as a response to the onBeforeRequest and onHeadersReceived events.
       * If set, the original request is prevented from being sent/completed and is
       * instead redirected to the given URL. Redirections to non-HTTP schemes such as
       * data: are allowed. Redirects initiated by a redirect action use the original
       * request method for the redirect, with one exception: If the redirect is
       * initiated at the onHeadersReceived stage, then the redirect will be issued
       * using the GET method.
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
            formData?: {[name: string]: string[]},

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
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
           * How the requested resource will be used.
           */
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
        },
      ) => BlockingResponse
    >;

    /**
     * Fired when an authentication failure is received. The listener has three
     * options: it can provide authentication credentials, it can cancel the
     * request and display the error page, or it can take no action on the
     * challenge. If bad user credentials are provided, this may be called
     * multiple times for the same request.
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
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
        },
        callback?: (
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
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
          type: "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "object" | "xmlhttprequest" | "other",

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
     * @param url If you have more than one <code>&lt;link&gt;</code> tag on your page with the <code>chrome-webstore-item</code> relation, you can choose which item you'd like to install by passing in its URL here. If it is omitted, then the first (or only) link will be used. An exception will be thrown if the passed in URL does not exist on the page.
     * @param successCallback This function is invoked when inline installation successfully completes (after the dialog is shown and the user agrees to add the item to Chrome). You may wish to use this to hide the user interface element that prompted the user to install the app or extension.
     * @param failureCallback This function is invoked when inline installation does not successfully complete. Possible reasons for this include the user canceling the dialog, the linked item not being found in the store, or the install being initiated from a non-verified site.
     * @param failureCallback.error The failure detail. You may wish to inspect or log this for debugging purposes, but you should not rely on specific strings being passed back.
     */
    export function install(
      url?: string,
      successCallback?: () => void,
      failureCallback?: (
        error: string,
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
    export interface Window {
      /**
       * The ID of the window. Window IDs are unique within a browser session. Under
       * some circumstances a Window may not be assigned an ID, for example when
       * querying windows using the {@link sessions} API, in which case a session ID
       * may be present.
       */
      id?: number;

      /**
       * Whether the window is currently the focused window.
       */
      focused: boolean;

      /**
       * The offset of the window from the top edge of the screen in pixels. Under
       * some circumstances a Window may not be assigned top property, for example
       * when querying closed windows from the {@link sessions} API.
       */
      top?: number;

      /**
       * The offset of the window from the left edge of the screen in pixels. Under
       * some circumstances a Window may not be assigned left property, for example
       * when querying closed windows from the {@link sessions} API.
       */
      left?: number;

      /**
       * The width of the window, including the frame, in pixels. Under some
       * circumstances a Window may not be assigned width property, for example when
       * querying closed windows from the {@link sessions} API.
       */
      width?: number;

      /**
       * The height of the window, including the frame, in pixels. Under some
       * circumstances a Window may not be assigned height property, for example when
       * querying closed windows from the {@link sessions} API.
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
       * The type of browser window this is. Under some circumstances a Window may not
       * be assigned type property, for example when querying closed windows from the
       * {@link sessions} API.
       */
      type?: "normal" | "popup" | "panel" | "app";

      /**
       * The state of this browser window. Under some circumstances a Window may not
       * be assigned state property, for example when querying closed windows from the
       * {@link sessions} API.
       */
      state?: "normal" | "minimized" | "maximized" | "fullscreen";

      /**
       * Whether the window is set to be always on top.
       */
      alwaysOnTop: boolean;

      /**
       * The session ID used to uniquely identify a Window obtained from the {@link
       * sessions} API.
       */
      sessionId?: string;
    }

    /**
     * The windowId value that represents the absence of a chrome browser window.
     */
    export const WINDOW_ID_NONE: number;

    /**
     * The windowId value that represents the <a
     * href='windows.html#current-window'>current window</a>.
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
         * If true, the {@link windows.Window} object will have a <var>tabs</var>
         * property that contains a list of the {@link tabs.Tab} objects. The
         * <code>Tab</code> objects only contain the <code>url</code>,
         * <code>title</code> and <code>favIconUrl</code> properties if the extension's
         * manifest file includes the <code>"tabs"</code> permission.
         */
        populate?: boolean,
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
         * If true, the {@link windows.Window} object will have a <var>tabs</var>
         * property that contains a list of the {@link tabs.Tab} objects. The
         * <code>Tab</code> objects only contain the <code>url</code>,
         * <code>title</code> and <code>favIconUrl</code> properties if the extension's
         * manifest file includes the <code>"tabs"</code> permission.
         */
        populate?: boolean,
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
         * If true, the {@link windows.Window} object will have a <var>tabs</var>
         * property that contains a list of the {@link tabs.Tab} objects. The
         * <code>Tab</code> objects only contain the <code>url</code>,
         * <code>title</code> and <code>favIconUrl</code> properties if the extension's
         * manifest file includes the <code>"tabs"</code> permission.
         */
        populate?: boolean,
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
         * If true, each {@link windows.Window} object will have a <var>tabs</var>
         * property that contains a list of the {@link tabs.Tab} objects for that
         * window. The <code>Tab</code> objects only contain the <code>url</code>,
         * <code>title</code> and <code>favIconUrl</code> properties if the extension's
         * manifest file includes the <code>"tabs"</code> permission.
         */
        populate?: boolean,
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
     * Creates (opens) a new browser with any optional sizing, position or default
     * URL provided.
     * @param createData
     * @param callback
     * @param callback.window Contains details about the created window.
     */
    export function create(
      createData?: {
        /**
         * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs
         * must include a scheme (i.e. 'http://www.google.com', not 'www.google.com').
         * Relative URLs will be relative to the current page within the extension.
         * Defaults to the New Tab Page.
         */
        url?: string | string[],

        /**
         * The id of the tab for which you want to adopt to the new window.
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
         * The width in pixels of the new window, including the frame. If not specified
         * defaults to a natural width.
         */
        width?: number,

        /**
         * The height in pixels of the new window, including the frame. If not specified
         * defaults to a natural height.
         */
        height?: number,

        /**
         * If true, opens an active window. If false, opens an inactive window.
         */
        focused?: boolean,

        /**
         * Whether the new window should be an incognito window.
         */
        incognito?: boolean,

        /**
         * Specifies what type of browser window to create. The 'panel' and
         * 'detached_panel' types create a popup unless the '--enable-panels' flag is
         * set.
         */
        type?: "normal" | "popup" | "panel" | "detached_panel",
      },
      callback?: (
        window?: Window,
      ) => void,
    ): void;

    /**
     * Updates the properties of a window. Specify only the properties that you want
     * to change; unspecified properties will be left unchanged.
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
         * If true, brings the window to the front. If false, brings the next window in
         * the z-order to the front.
         */
        focused?: boolean,

        /**
         * If true, causes the window to be displayed in a manner that draws the user's
         * attention to the window, without changing the focused window. The effect
         * lasts until the user changes focus to the window. This option has no effect
         * if the window already has focus. Set to false to cancel a previous draw
         * attention request.
         */
        drawAttention?: boolean,

        /**
         * The new state of the window. The 'minimized', 'maximized' and 'fullscreen'
         * states cannot be combined with 'left', 'top', 'width' or 'height'.
         */
        state?: "normal" | "minimized" | "maximized" | "fullscreen",
      },
      callback?: (
        window: Window,
      ) => void,
    ): void;

    /**
     * Removes (closes) a window, and all the tabs inside it.
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
       * @param window Details of the window that was created.
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
     * Fired when the currently focused window changes. Will be
     * chrome.windows.WINDOW_ID_NONE if all chrome windows have lost focus.
     * Note: On some Linux window managers, WINDOW_ID_NONE will always be sent
     * immediately preceding a switch from one chrome window to another.
     */
    export const onFocusChanged: chrome.events.Event<
      /**
       * @param windowId ID of the newly focused window.
       */
      (
        windowId: number,
      ) => void
    >;
  }
}
