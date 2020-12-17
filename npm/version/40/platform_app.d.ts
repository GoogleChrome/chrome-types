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
// Generated on Thu Dec 17 2020 17:49:45 GMT+1100 (Australian Eastern Daylight Time)

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
   * Use the <code>chrome.app.runtime</code> API to manage the app lifecycle.
 The
   * app runtime manages app installation, controls the event page, and can
 shut
   * down the app at anytime.
   */
  export namespace app.runtime {
    export interface LaunchItem {
      /**
       * FileEntry for the file.
       */
      entry: FileEntry;

      /**
       * The MIME type of the file.
       */
      type: string;
    }

    /**
     * Enumeration of app launch sources.
     */
    export type LaunchSource = "app_launcher" | "new_tab_page" | "reload" | "restart" | "load_and_launch" | "command_line" | "file_handler" | "url_handler" | "system_tray" | "about_page" | "keyboard";

    export interface LaunchData {
      /**
       * The ID of the file or URL handler that the app is being invoked with. Handler
       * IDs are the top-level keys in the <code>file_handlers</code> and/or
       * <code>url_handlers</code> dictionaries in the manifest.
       */
      id?: string;

      /**
       * The file entries for the <code>onLaunched</code> event triggered by a
       * matching file handler in the <code>file_handlers</code> manifest key.
       */
      items?: LaunchItem[];

      /**
       * The URL for the <code>onLaunched</code> event triggered by a matching URL
       * handler in the <code>url_handlers</code> manifest key.
       */
      url?: string;

      /**
       * The referrer URL for the <code>onLaunched</code> event triggered by a
       * matching URL handler in the <code>url_handlers</code> manifest key.
       */
      referrerUrl?: string;

      /**
       * Whether the app is being launched in a <a
       * href="https://support.google.com/chromebook/answer/3134673">Chrome OS kiosk
       * session</a>.
       */
      isKioskSession?: boolean;

      /**
       * Where the app is launched from.
       */
      source?: LaunchSource;
    }

    export interface EmbedRequest {
      embedderId: string;

      /**
       * Optional developer specified data that the app to be embedded can use when
       * making an embedding decision.
       */
      data?: any;

      /**
       * Allows <code>embedderId</code> to embed this app in an &lt;appview&gt;
       * element. The <code>url</code> specifies the content to embed.
       * @param allow.url
       */
      allow: (
        url: string,
      ) => void;

      /**
       * Prevents <code> embedderId</code> from embedding this app in an
       * &lt;appview&gt; element.
       */
      deny: () => void;
    }

    /**
     * Fired when an embedding app requests to embed this app. This event is
     * only available on dev channel with the flag --enable-app-view.
     */
    export const onEmbedRequested: chrome.events.Event<
      /**
       * @param request
       */
      (
        request: EmbedRequest,
      ) => void
    >;

    /**
     * Fired when an app is launched from the launcher.
     */
    export const onLaunched: chrome.events.Event<
      /**
       * @param launchData
       */
      (
        launchData?: LaunchData,
      ) => void
    >;

    /**
     * Fired at Chrome startup to apps that were running when Chrome last shut
     * down.
     */
    export const onRestarted: chrome.events.Event<
      () => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.app.window</code> API to create windows. Windows
 have
   * an optional frame with title bar and size controls. They are not
 associated
   * with any Chrome browser windows. See the <a
   * href="https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/window-state">
 Window State Sample</a> for a demonstration of these options.
   */
  export namespace app.window {
    export interface ContentBounds {
      left?: number;

      top?: number;

      width?: number;

      height?: number;
    }

    export interface BoundsSpecification {
      /**
       * The X coordinate of the content or window.
       */
      left?: number;

      /**
       * The Y coordinate of the content or window.
       */
      top?: number;

      /**
       * The width of the content or window.
       */
      width?: number;

      /**
       * The height of the content or window.
       */
      height?: number;

      /**
       * The minimum width of the content or window.
       */
      minWidth?: number;

      /**
       * The minimum height of the content or window.
       */
      minHeight?: number;

      /**
       * The maximum width of the content or window.
       */
      maxWidth?: number;

      /**
       * The maximum height of the content or window.
       */
      maxHeight?: number;
    }

    export interface Bounds {
      /**
       * This property can be used to read or write the current X coordinate of the
       * content or window.
       */
      left: number;

      /**
       * This property can be used to read or write the current Y coordinate of the
       * content or window.
       */
      top: number;

      /**
       * This property can be used to read or write the current width of the content
       * or window.
       */
      width: number;

      /**
       * This property can be used to read or write the current height of the content
       * or window.
       */
      height: number;

      /**
       * This property can be used to read or write the current minimum width of the
       * content or window. A value of <code>null</code> indicates 'unspecified'.
       */
      minWidth?: number;

      /**
       * This property can be used to read or write the current minimum height of the
       * content or window. A value of <code>null</code> indicates 'unspecified'.
       */
      minHeight?: number;

      /**
       * This property can be used to read or write the current maximum width of the
       * content or window. A value of <code>null</code> indicates 'unspecified'.
       */
      maxWidth?: number;

      /**
       * This property can be used to read or write the current maximum height of the
       * content or window. A value of <code>null</code> indicates 'unspecified'.
       */
      maxHeight?: number;

      /**
       * Set the left and top position of the content or window.
       * @param setPosition.left
       * @param setPosition.top
       */
      setPosition: (
        left: number,
        top: number,
      ) => void;

      /**
       * Set the width and height of the content or window.
       * @param setSize.width
       * @param setSize.height
       */
      setSize: (
        width: number,
        height: number,
      ) => void;

      /**
       * Set the minimum size constraints of the content or window. The minimum width
       * or height can be set to <code>null</code> to remove the constraint. A value
       * of <code>undefined</code> will leave a constraint unchanged.
       * @param setMinimumSize.minWidth
       * @param setMinimumSize.minHeight
       */
      setMinimumSize: (
        minWidth: number,
        minHeight: number,
      ) => void;

      /**
       * Set the maximum size constraints of the content or window. The maximum width
       * or height can be set to <code>null</code> to remove the constraint. A value
       * of <code>undefined</code> will leave a constraint unchanged.
       * @param setMaximumSize.maxWidth
       * @param setMaximumSize.maxHeight
       */
      setMaximumSize: (
        maxWidth: number,
        maxHeight: number,
      ) => void;
    }

    export interface FrameOptions {
      /**
       * <p>Frame type: <code>none</code> or <code>chrome</code> (defaults to
       * <code>chrome</code>).</p><p>For <code>none</code>, the
       * <code>-webkit-app-region</code> CSS property can be used to apply
       * draggability to the app's window.</p><p><code>-webkit-app-region: drag</code>
       * can be used to mark regions draggable. <code>no-drag</code> can be used to
       * disable this style on nested elements.</p>
       */
      type?: string;

      /**
       * <p>Allows the frame color to be set. Frame coloring is only available if the
       * frame type is <code>chrome</code>.</p><p>Frame coloring is new in Chrome
       * 36.</p>
       */
      color?: string;

      /**
       * <p>Allows the frame color of the window when active to be set. Frame coloring
       * is only available if the frame type is <code>chrome</code>.</p><p>Frame
       * coloring is only available if the frame type is
       * <code>chrome</code>.</p><p>Frame coloring is new in Chrome 36.</p>
       */
      activeColor?: string;

      /**
       * <p>Allows the frame color of the window when inactive to be set differently
       * to the active color. Frame coloring is only available if the frame type is
       * <code>chrome</code>.</p><p><code>inactiveColor</code> must be used in
       * conjunction with <code> color</code>.</p><p>Frame coloring is new in Chrome
       * 36.</p>
       */
      inactiveColor?: string;
    }

    /**
     * State of a window: normal, fullscreen, maximized, minimized.
     */
    export type State = "normal" | "fullscreen" | "maximized" | "minimized";

    /**
     * 'shell' is the default window type. 'panel' is managed by the OS (Currently
     * experimental, Ash only).
     */
    export type WindowType = "shell" | "panel";

    export interface CreateWindowOptions {
      /**
       * Id to identify the window. This will be used to remember the size and
       * position of the window and restore that geometry when a window with the same
       * id is later opened. If a window with a given id is created while another
       * window with the same id already exists, the currently opened window will be
       * focused instead of creating a new window.
       */
      id?: string;

      /**
       * <p>Used to specify the initial position, initial size and constraints of the
       * window's content (excluding window decorations). If an <code>id</code> is
       * also specified and a window with a matching <code>id</code> has been shown
       * before, the remembered bounds will be used instead.</p><p>Note that the
       * padding between the inner and outer bounds is determined by the OS. Therefore
       * setting the same bounds property for both the <code>innerBounds</code> and
       * <code>outerBounds</code> will result in an error.</p><p>This property is new
       * in Chrome 36.</p>
       */
      innerBounds?: BoundsSpecification;

      /**
       * <p>Used to specify the initial position, initial size and constraints of the
       * window (including window decorations such as the title bar and frame). If an
       * <code>id</code> is also specified and a window with a matching
       * <code>id</code> has been shown before, the remembered bounds will be used
       * instead.</p><p>Note that the padding between the inner and outer bounds is
       * determined by the OS. Therefore setting the same bounds property for both the
       * <code>innerBounds</code> and <code>outerBounds</code> will result in an
       * error.</p><p>This property is new in Chrome 36.</p>
       */
      outerBounds?: BoundsSpecification;

      /**
       * Default width of the window.
       * @deprecated Use {@link BoundsSpecification}.
       */
      defaultWidth?: number;

      /**
       * Default height of the window.
       * @deprecated Use {@link BoundsSpecification}.
       */
      defaultHeight?: number;

      /**
       * Default X coordinate of the window.
       * @deprecated Use {@link BoundsSpecification}.
       */
      defaultLeft?: number;

      /**
       * Default Y coordinate of the window.
       * @deprecated Use {@link BoundsSpecification}.
       */
      defaultTop?: number;

      /**
       * Width of the window.
       * @deprecated Use {@link BoundsSpecification}.
       */
      width?: number;

      /**
       * Height of the window.
       * @deprecated Use {@link BoundsSpecification}.
       */
      height?: number;

      /**
       * X coordinate of the window.
       * @deprecated Use {@link BoundsSpecification}.
       */
      left?: number;

      /**
       * Y coordinate of the window.
       * @deprecated Use {@link BoundsSpecification}.
       */
      top?: number;

      /**
       * Minimum width of the window.
       * @deprecated Use innerBounds or outerBounds.
       */
      minWidth?: number;

      /**
       * Minimum height of the window.
       * @deprecated Use innerBounds or outerBounds.
       */
      minHeight?: number;

      /**
       * Maximum width of the window.
       * @deprecated Use innerBounds or outerBounds.
       */
      maxWidth?: number;

      /**
       * Maximum height of the window.
       * @deprecated Use innerBounds or outerBounds.
       */
      maxHeight?: number;

      /**
       * Type of window to create.
       */
      type?: WindowType;

      /**
       * Creates a special ime window. This window is not focusable and can be stacked
       * above virtual keyboard window. This is restriced to component ime extensions.
       * Requires app.window.ime API permission.
       */
      ime?: boolean;

      /**
       * <p>Frame type: <code>none</code> or <code>chrome</code> (defaults to
       * <code>chrome</code>). For <code>none</code>, the
       * <code>-webkit-app-region</code> CSS property can be used to apply
       * draggability to the app's window. <code>-webkit-app-region: drag</code> can
       * be used to mark regions draggable. <code>no-drag</code> can be used to
       * disable this style on nested elements.</p><p>Use of <code>FrameOptions</code>
       * is new in M36.</p>
       */
      frame?: string | FrameOptions;

      /**
       * Size and position of the content in the window (excluding the titlebar). If
       * an id is also specified and a window with a matching id has been shown
       * before, the remembered bounds of the window will be used instead.
       * @deprecated Use innerBounds or outerBounds.
       */
      bounds?: ContentBounds;

      /**
       * Enable window background transparency. Only supported in ash. Requires
       * app.window.alpha API permission.
       */
      alphaEnabled?: boolean;

      /**
       * The initial state of the window, allowing it to be created already
       * fullscreen, maximized, or minimized. Defaults to 'normal'.
       */
      state?: State;

      /**
       * If true, the window will be created in a hidden state. Call show() on the
       * window to show it once it has been created. Defaults to false.
       */
      hidden?: boolean;

      /**
       * If true, the window will be resizable by the user. Defaults to true.
       */
      resizable?: boolean;

      /**
       * By default if you specify an id for the window, the window will only be
       * created if another window with the same id doesn't already exist. If a window
       * with the same id already exists that window is activated instead. If you do
       * want to create multiple windows with the same id, you can set this property
       * to false.
       * @deprecated Multiple windows with the same id is no longer supported.
       */
      singleton?: boolean;

      /**
       * <p>If true, the window will stay above most other windows. If there are
       * multiple windows of this kind, the currently focused window will be in the
       * foreground. Requires the <code>"alwaysOnTopWindows"</code> permission.
       * Defaults to false.</p><p>Call <code>setAlwaysOnTop()</code> on the window to
       * change this property after creation.</p>
       */
      alwaysOnTop?: boolean;

      /**
       * If true, the window will be focused when created. Defaults to true.
       */
      focused?: boolean;

      /**
       * If true, the window will be visible on all workspaces. This is only available
       * on dev channel.
       */
      visibleOnAllWorkspaces?: boolean;
    }

    export interface AppWindow {
      /**
       * Focus the window.
       */
      focus: () => void;

      /**
       * <p>Fullscreens the window.</p><p>The user will be able to restore the window
       * by pressing ESC. An application can prevent the fullscreen state to be left
       * when ESC is pressed by requesting the <b>overrideEscFullscreen</b> permission
       * and canceling the event by calling .preventDefault(), like
       * this:</p><p><code>window.onKeyDown = function(e) { if (e.keyCode == 27 /* ESC
       * &#x2a;/) { e.preventDefault(); } };</code></p>
       */
      fullscreen: () => void;

      /**
       * Is the window fullscreen?
       */
      isFullscreen: () => boolean;

      /**
       * Minimize the window.
       */
      minimize: () => void;

      /**
       * Is the window minimized?
       */
      isMinimized: () => boolean;

      /**
       * Maximize the window.
       */
      maximize: () => void;

      /**
       * Is the window maximized?
       */
      isMaximized: () => boolean;

      /**
       * Restore the window, exiting a maximized, minimized, or fullscreen state.
       */
      restore: () => void;

      /**
       * Move the window to the position (|left|, |top|).
       * @param moveTo.left
       * @param moveTo.top
       */
      moveTo: (
        left: number,
        top: number,
      ) => void;

      /**
       * Resize the window to |width|x|height| pixels in size.
       * @param resizeTo.width
       * @param resizeTo.height
       */
      resizeTo: (
        width: number,
        height: number,
      ) => void;

      /**
       * Draw attention to the window.
       */
      drawAttention: () => void;

      /**
       * Clear attention to the window.
       */
      clearAttention: () => void;

      /**
       * Close the window.
       */
      close: () => void;

      /**
       * Show the window. Does nothing if the window is already visible. Focus the
       * window if |focused| is set to true or omitted.
       * @param show.focused
       */
      show: (
        focused?: boolean,
      ) => void;

      /**
       * Hide the window. Does nothing if the window is already hidden.
       */
      hide: () => void;

      /**
       * Get the window's inner bounds as a {@link ContentBounds} object.
       * @deprecated Use innerBounds or outerBounds.
       */
      getBounds: () => ContentBounds;

      /**
       * Set the window's inner bounds.
       * @param setBounds.bounds
       * @deprecated Use innerBounds or outerBounds.
       */
      setBounds: (
        bounds: ContentBounds,
      ) => void;

      /**
       * Set the app icon for the window (experimental). Currently this is only being
       * implemented on Ash. TODO(stevenjb): Investigate implementing this on Windows
       * and OSX.
       * @param setIcon.iconUrl
       */
      setIcon: (
        iconUrl: string,
      ) => void;

      /**
       * Set a badge icon for the window. TODO(benwells): Document this properly
       * before going to stable.
       * @param setBadgeIcon.iconUrl
       */
      setBadgeIcon: (
        iconUrl: string,
      ) => void;

      /**
       * Clear the current for the window. TODO(benwells): Document this properly
       * before going to stable.
       */
      clearBadge: () => void;

      /**
       * Is the window always on top?
       */
      isAlwaysOnTop: () => boolean;

      /**
       * Accessors for testing.
       */
      hasFrameColor: boolean;

      activeFrameColor: number;

      inactiveFrameColor: number;

      firstShowHasHappened?: boolean;

      /**
       * Set whether the window should stay above most other windows. Requires the
       * <code>"alwaysOnTopWindows"</code> permission.
       * @param setAlwaysOnTop.alwaysOnTop
       */
      setAlwaysOnTop: (
        alwaysOnTop: boolean,
      ) => void;

      /**
       * Can the window use alpha transparency? TODO(jackhou): Document this properly
       * before going to stable.
       */
      alphaEnabled: () => boolean;

      /**
       * For platforms that support multiple workspaces, is this window visible on all
       * of them? This is only available on dev channel.
       * @param setVisibleOnAllWorkspaces.alwaysVisible
       */
      setVisibleOnAllWorkspaces: (
        alwaysVisible: boolean,
      ) => void;

      /**
       * The JavaScript 'window' object for the created child.
       */
      contentWindow: Window;

      /**
       * The id the window was created with.
       */
      id: string;

      /**
       * The position, size and constraints of the window's content, which does not
       * include window decorations. This property is new in Chrome 36.
       */
      innerBounds: Bounds;

      /**
       * The position, size and constraints of the window, which includes window
       * decorations, such as the title bar and frame. This property is new in Chrome
       * 36.
       */
      outerBounds: Bounds;
    }

    /**
     * <p>The size and position of a window can be specified in a number of
     * different ways. The most simple option is not specifying anything at all, in
     * which case a default size and platform dependent position will be
     * used.</p><p>To set the position, size and constraints of the window, use the
     * <code>innerBounds</code> or <code>outerBounds</code> properties. Inner bounds
     * do not include window decorations. Outer bounds include the window's title
     * bar and frame. Note that the padding between the inner and outer bounds is
     * determined by the OS. Therefore setting the same property for both inner and
     * outer bounds is considered an error (for example, setting both
     * <code>innerBounds.left</code> and <code>outerBounds.left</code>).</p><p>To
     * automatically remember the positions of windows you can give them ids. If a
     * window has an id, This id is used to remember the size and position of the
     * window whenever it is moved or resized. This size and position is then used
     * instead of the specified bounds on subsequent opening of a window with the
     * same id. If you need to open a window with an id at a location other than the
     * remembered default, you can create it hidden, move it to the desired
     * location, then show it.</p>
     * @param url
     * @param options
     * @param callback <p>Called in the creating window (parent) before the load event is called in the created window (child). The parent can set fields or functions on the child usable from onload. E.g. background.js:</p><p><code>function(createdWindow) { createdWindow.contentWindow.foo = function () { }; };</code></p><p>window.js:</p><p><code>window.onload = function () { foo(); }</code></p>
     * @param callback.createdWindow
     */
    export function create(
      url: string,
      options?: CreateWindowOptions,
      callback?: (
        createdWindow: AppWindow,
      ) => void,
    ): void;

    /**
     * Returns an {@link AppWindow} object for the current script context (ie
     * JavaScript 'window' object). This can also be called on a handle to a script
     * context for another page, for example:
     * otherWindow.chrome.app.window.current().
     */
    export function current(): AppWindow;

    /**
     * @param state
     */
    export function initializeAppWindow(
      state: {[name: string]: any},
    ): void;

    /**
     * Gets an array of all currently created app windows. This method is new in
     * Chrome 33.
     */
    export function getAll(): AppWindow[];

    /**
     * Gets an {@link AppWindow} with the given id. If no window with the given id
     * exists null is returned. This method is new in Chrome 33.
     * @param id
     */
    export function get(
      id: string,
    ): AppWindow;

    /**
     * Does the current platform support windows being visible on all workspaces?
     */
    export function canSetVisibleOnAllWorkspaces(): boolean;

    /**
     * Fired when the window is resized.
     */
    export const onBoundsChanged: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the window is closed. Note, this should be listened to from a
     * window other than the window being closed, for example from the
     * background page. This is because the window being closed will be in the
     * process of being torn down when the event is fired, which means not all
     * APIs in the window's script context will be functional.
     */
    export const onClosed: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the window is fullscreened.
     */
    export const onFullscreened: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the window is maximized.
     */
    export const onMaximized: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the window is minimized.
     */
    export const onMinimized: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the window is restored from being minimized or maximized.
     */
    export const onRestored: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the window's ability to use alpha transparency changes.
     */
    export const onAlphaEnabledChanged: chrome.events.Event<
      () => void
    >;

    /**
     * Event for testing. Lets tests wait until a window has been shown.
     */
    export const onWindowFirstShown: chrome.events.Event<
      () => void
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
   * The <code>chrome.audio</code> API is provided to allow users to
 get
   * information about and control the audio devices attached to the
 system. This
   * API is currently only implemented for ChromeOS.
   * @alpha
 * @chrome-permission audio
 */
  export namespace audio {
    export interface OutputDeviceInfo {
      /**
       * The unique identifier of the audio output device.
       */
      id: string;

      /**
       * The user-friendly name (e.g. "Bose Amplifier").
       */
      name: string;

      /**
       * True if this is the current active device.
       */
      isActive: boolean;

      /**
       * True if this is muted.
       */
      isMuted: boolean;

      /**
       * The output volume ranging from 0.0 to 1.0.
       */
      volume: number;
    }

    export interface InputDeviceInfo {
      /**
       * The unique identifier of the audio input device.
       */
      id: string;

      /**
       * The user-friendly name (e.g. "USB Microphone").
       */
      name: string;

      /**
       * True if this is the current active device.
       */
      isActive: boolean;

      /**
       * True if this is muted.
       */
      isMuted: boolean;

      /**
       * The input gain ranging from 0.0 to 1.0.
       */
      gain: number;
    }

    export interface DeviceProperties {
      /**
       * True if this is muted.
       */
      isMuted: boolean;

      /**
       * If this is an output device then this field indicates the output volume. If
       * this is an input device then this field is ignored.
       */
      volume?: number;

      /**
       * If this is an input device then this field indicates the input gain. If this
       * is an output device then this field is ignored.
       */
      gain?: number;
    }

    /**
     * Get the information of all audio output and input devices.
     * @param callback
     * @param callback.outputInfo
     * @param callback.inputInfo
     */
    export function getInfo(
      callback: (
        outputInfo: OutputDeviceInfo[],
        inputInfo: InputDeviceInfo[],
      ) => void,
    ): void;

    /**
     * Select a subset of audio devices as active.
     * @param ids
     * @param callback
     */
    export function setActiveDevices(
      ids: string[],
      callback: () => void,
    ): void;

    /**
     * Sets the properties for the input or output device.
     * @param id
     * @param properties
     * @param callback
     */
    export function setProperties(
      id: string,
      properties: DeviceProperties,
      callback: () => void,
    ): void;

    /**
     * Fired when anything changes to the audio device configuration.
     */
    export const onDeviceChanged: chrome.events.Event<
      () => void
    >;
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
    export type EventType = "activedescendantchanged" | "alert" | "ariaAttributeChanged" | "autocorrectionOccured" | "blur" | "checkedStateChanged" | "childrenChanged" | "focus" | "hide" | "hover" | "invalidStatusChanged" | "layoutComplete" | "liveRegionChanged" | "loadComplete" | "locationChanged" | "menuEnd" | "menuListItemSelected" | "menuListValueChanged" | "menuPopupEnd" | "menuPopupStart" | "menuStart" | "rowCollapsed" | "rowCountChanged" | "rowExpanded" | "scrollPositionChanged" | "scrolledToAnchor" | "selectedChildrenChanged" | "selection" | "selectionAdd" | "selectionRemove" | "show" | "textChanged" | "textSelectionChanged" | "treeChanged" | "valueChanged";

    /**
     * Describes the purpose of an {@link automation.AutomationNode}.
     */
    export type RoleType = "alertDialog" | "alert" | "annotation" | "application" | "article" | "banner" | "blockquote" | "browser" | "busyIndicator" | "button" | "buttonDropDown" | "canvas" | "cell" | "checkBox" | "client" | "colorWell" | "columnHeader" | "column" | "comboBox" | "complementary" | "contentInfo" | "date" | "dateTime" | "definition" | "descriptionListDetail" | "descriptionList" | "descriptionListTerm" | "desktop" | "details" | "dialog" | "directory" | "disclosureTriangle" | "div" | "document" | "drawer" | "editableText" | "embeddedObject" | "figcaption" | "figure" | "footer" | "form" | "grid" | "group" | "growArea" | "heading" | "helpTag" | "horizontalRule" | "iframe" | "ignored" | "imageMapLink" | "imageMap" | "image" | "incrementor" | "inlineTextBox" | "labelText" | "legend" | "link" | "listBoxOption" | "listBox" | "listItem" | "listMarker" | "list" | "locationBar" | "log" | "main" | "marquee" | "math" | "matte" | "menuBar" | "menuButton" | "menuItem" | "menuItemCheckBox" | "menuItemRadio" | "menuListOption" | "menuListPopup" | "menu" | "meter" | "navigation" | "note" | "outline" | "pane" | "paragraph" | "popUpButton" | "pre" | "presentational" | "progressIndicator" | "radioButton" | "radioGroup" | "region" | "rootWebArea" | "rowHeader" | "row" | "rulerMarker" | "ruler" | "svgRoot" | "scrollArea" | "scrollBar" | "seamlessWebArea" | "search" | "sheet" | "slider" | "sliderThumb" | "spinButtonPart" | "spinButton" | "splitGroup" | "splitter" | "staticText" | "status" | "systemWide" | "tabGroup" | "tabList" | "tabPanel" | "tab" | "tableHeaderContainer" | "table" | "textArea" | "textField" | "time" | "timer" | "titleBar" | "toggleButton" | "toolbar" | "treeGrid" | "treeItem" | "tree" | "unknown" | "tooltip" | "valueIndicator" | "webArea" | "webView" | "window";

    /**
     * Describes characteristics of an {@link automation.AutomationNode}.
     */
    export type StateType = "busy" | "checked" | "collapsed" | "default" | "disabled" | "editable" | "enabled" | "expanded" | "focusable" | "focused" | "haspopup" | "hovered" | "indeterminate" | "invisible" | "linked" | "multiselectable" | "offscreen" | "pressed" | "protected" | "readOnly" | "required" | "selectable" | "selected" | "vertical" | "visited";

    export interface Rect {
      left: number;

      top: number;

      width: number;

      height: number;
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
       * Stops this event from further processing except for any remaining listeners
       * on {@link AutomationEvent.target}.
       */
      stopPropagation: () => void;
    }

    export interface AutomationNode {
      /**
       * The root node of the tree containing this AutomationNode.
       */
      root: AutomationNode;

      /**
       * Whether this AutomationNode is root node.
       */
      isRootNode: boolean;

      /**
       * The role of this node.
       */
      role: automation.RoleType;

      /**
       * The {@link automation.StateType}s describing this node.
       */
      state: {[name: string]: any};

      /**
       * The rendered location (as a bounding box) of this node within the frame.
       */
      location: automation.Rect;

      /**
       * A collection of this node's other attributes.
       */
      attributes?: {[name: string]: any};

      /**
       * The index of this node in its parent node's list of children. If this is the
       * root node, this will be undefined.
       */
      indexInParent?: number;

      children: () => AutomationNode[];

      parent: () => AutomationNode;

      firstChild: () => AutomationNode;

      lastChild: () => AutomationNode;

      previousSibling: () => AutomationNode;

      nextSibling: () => AutomationNode;

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
       * Scrolls this node to make it visible.
       */
      makeVisible: () => void;

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
       * @param querySelector.selector
       */
      querySelector: (
        selector: string,
        callback: (
          node: AutomationNode,
        ) => void,
      ) => void;
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
      tabId: number,
      callback: (
        rootNode: AutomationNode,
      ) => void,
    ): void;

    /**
     * Get the automation tree for the tab with the given tabId, or the current tab
     * if no tabID is given, enabling automation if necessary. Returns a tree with a
     * placeholder root node; listen for the "loadComplete" event to get a
     * notification that the tree has fully loaded (the previous root node reference
     * will stop working at or before this point).
     * @param callback Called when the <code>AutomationNode</code> for the page is available.
     * @param callback.rootNode
     */
    export function getTree(
      callback: (
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
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.bluetoothLowEnergy</code> API is used to communicate with
   * Bluetooth Smart (Low Energy) devices using the
 <a
   * href="https://developer.bluetooth.org/TechnologyOverview/Pages/GATT.aspx">
   * Generic Attribute Profile (GATT)</a>.
   * @chrome-platform chromeos
 * @chrome-platform win
 * @chrome-platform mac
 */
  export namespace bluetoothLowEnergy {
    /**
     * Values representing the possible properties of a characteristic.
     */
    export type CharacteristicProperty = "broadcast" | "read" | "writeWithoutResponse" | "write" | "notify" | "indicate" | "authenticatedSignedWrites" | "extendedProperties" | "reliableWrite" | "writableAuxiliaries";

    export interface Service {
      /**
       * The UUID of the service, e.g. 0000180d-0000-1000-8000-00805f9b34fb.
       */
      uuid: string;

      /**
       * Indicates whether the type of this service is primary or secondary.
       */
      isPrimary: boolean;

      /**
       * Indicates whether this service represents a local service hosted by the
       * application and available to other peripherals, or a remote service hosted
       * and received from a remote peripheral.
       */
      isLocal: boolean;

      /**
       * Returns the identifier assigned to this service. Use the instance ID to
       * distinguish between services from a peripheral with the same UUID and to make
       * function calls that take in a service identifier. Present, if this instance
       * represents a remote service.
       */
      instanceId?: string;

      /**
       * The device address of the remote peripheral that the GATT service belongs to.
       * Present, if this instance represents a remote service.
       */
      deviceAddress?: string;
    }

    export interface Characteristic {
      /**
       * The UUID of the characteristic, e.g. 00002a37-0000-1000-8000-00805f9b34fb.
       */
      uuid: string;

      /**
       * Indicates whether this characteristic represents a local characteristic
       * hosted by the application and available to other peripherals, or a remote
       * characteristic hosted and received from a remote peripheral.
       */
      isLocal: boolean;

      /**
       * The GATT service this characteristic belongs to.
       */
      service: Service;

      /**
       * The properties of this characteristic.
       */
      properties: CharacteristicProperty[];

      /**
       * Returns the identifier assigned to this characteristic. Use the instance ID
       * to distinguish between characteristics from a peripheral with the same UUID
       * and to make function calls that take in a characteristic identifier. Present,
       * if this instance represents a remote characteristic.
       */
      instanceId?: string;

      /**
       * The currently cached characteristic value. This value gets updated when the
       * value of the characteristic is read or updated via a notification or
       * indication.
       */
      value?: ArrayBuffer;
    }

    export interface Descriptor {
      /**
       * The UUID of the characteristic descriptor, e.g.
       * 00002902-0000-1000-8000-00805f9b34fb.
       */
      uuid: string;

      /**
       * Indicates whether this descriptor represents a local descriptor hosted by the
       * application and available to other peripherals, or a remote descriptor hosted
       * and received from a remote peripheral.
       */
      isLocal: boolean;

      /**
       * The GATT characteristic this descriptor belongs to.
       */
      characteristic: Characteristic;

      /**
       * Returns the identifier assigned to this descriptor. Use the instance ID to
       * distinguish between descriptors from a peripheral with the same UUID and to
       * make function calls that take in a descriptor identifier. Present, if this
       * instance represents a remote characteristic.
       */
      instanceId?: string;

      /**
       * The currently cached descriptor value. This value gets updated when the value
       * of the descriptor is read.
       */
      value?: ArrayBuffer;
    }

    export interface ConnectProperties {
      /**
       * Flag indicating whether a connection to the device is left open when the
       * event page of the application is unloaded (see <a
       * href="http://developer.chrome.com/apps/app_lifecycle.html">Manage App
       * Lifecycle</a>). The default value is <code>false.</code>
       */
      persistent: boolean;
    }

    export interface NotificationProperties {
      /**
       * Flag indicating whether the app should receive notifications when the event
       * page of the application is unloaded (see <a
       * href="http://developer.chrome.com/apps/app_lifecycle.html">Manage App
       * Lifecycle</a>). The default value is <code>false</code>.
       */
      persistent: boolean;
    }

    /**
     * Establishes a connection between the application and the device with the
     * given address. A device may be already connected and its GATT services
     * available without calling <code>connect</code>, however, an app that wants to
     * access GATT services of a device should call this function to make sure that
     * a connection to the device is maintained. If the device is not connected, all
     * GATT services of the device will be discovered after a successful call to
     * <code>connect</code>.
     * @param deviceAddress The Bluetooth address of the remote device to which a GATT connection should be opened.
     * @param properties Connection properties (optional).
     * @param callback Called when the connect request has completed.
     */
    export function connect(
      deviceAddress: string,
      properties: ConnectProperties,
      callback: () => void,
    ): void;

    /**
     * Establishes a connection between the application and the device with the
     * given address. A device may be already connected and its GATT services
     * available without calling <code>connect</code>, however, an app that wants to
     * access GATT services of a device should call this function to make sure that
     * a connection to the device is maintained. If the device is not connected, all
     * GATT services of the device will be discovered after a successful call to
     * <code>connect</code>.
     * @param deviceAddress The Bluetooth address of the remote device to which a GATT connection should be opened.
     * @param callback Called when the connect request has completed.
     */
    export function connect(
      deviceAddress: string,
      callback: () => void,
    ): void;

    /**
     * Closes the app's connection to the device with the given address. Note that
     * this will not always destroy the physical link itself, since there may be
     * other apps with open connections.
     * @param deviceAddress The Bluetooth address of the remote device.
     * @param callback Called when the disconnect request has completed.
     */
    export function disconnect(
      deviceAddress: string,
      callback?: () => void,
    ): void;

    /**
     * Get the GATT service with the given instance ID.
     * @param serviceId The instance ID of the requested GATT service.
     * @param callback Called with the requested Service object.
     * @param callback.result
     */
    export function getService(
      serviceId: string,
      callback: (
        result: Service,
      ) => void,
    ): void;

    /**
     * Get all the GATT services that were discovered on the remote device with the
     * given device address.
     * @param deviceAddress The Bluetooth address of the remote device whose GATT services should be returned.
     * @param callback Called with the list of requested Service objects.
     * @param callback.result
     */
    export function getServices(
      deviceAddress: string,
      callback: (
        result: Service[],
      ) => void,
    ): void;

    /**
     * Get the GATT characteristic with the given instance ID that belongs to the
     * given GATT service, if the characteristic exists.
     * @param characteristicId The instance ID of the requested GATT characteristic.
     * @param callback Called with the requested Characteristic object.
     * @param callback.result
     */
    export function getCharacteristic(
      characteristicId: string,
      callback: (
        result: Characteristic,
      ) => void,
    ): void;

    /**
     * Get a list of all discovered GATT characteristics that belong to the given
     * service.
     * @param serviceId The instance ID of the GATT service whose characteristics should be returned.
     * @param callback Called with the list of characteristics that belong to the given service.
     * @param callback.result
     */
    export function getCharacteristics(
      serviceId: string,
      callback: (
        result: Characteristic[],
      ) => void,
    ): void;

    /**
     * Get a list of GATT services that are included by the given service.
     * @param serviceId The instance ID of the GATT service whose included services should be returned.
     * @param callback Called with the list of GATT services included from the given service.
     * @param callback.result
     */
    export function getIncludedServices(
      serviceId: string,
      callback: (
        result: Service[],
      ) => void,
    ): void;

    /**
     * Get the GATT characteristic descriptor with the given instance ID.
     * @param descriptorId The instance ID of the requested GATT characteristic descriptor.
     * @param callback Called with the requested Descriptor object.
     * @param callback.result
     */
    export function getDescriptor(
      descriptorId: string,
      callback: (
        result: Descriptor,
      ) => void,
    ): void;

    /**
     * Get a list of GATT characteristic descriptors that belong to the given
     * characteristic.
     * @param characteristicId The instance ID of the GATT characteristic whose descriptors should be returned.
     * @param callback Called with the list of descriptors that belong to the given characteristic.
     * @param callback.result
     */
    export function getDescriptors(
      characteristicId: string,
      callback: (
        result: Descriptor[],
      ) => void,
    ): void;

    /**
     * Retrieve the value of a specified characteristic from a remote peripheral.
     * @param characteristicId The instance ID of the GATT characteristic whose value should be read from the remote device.
     * @param callback Called with the Characteristic object whose value was requested. The <code>value</code> field of the returned Characteristic object contains the result of the read request.
     * @param callback.result
     */
    export function readCharacteristicValue(
      characteristicId: string,
      callback: (
        result: Characteristic,
      ) => void,
    ): void;

    /**
     * Write the value of a specified characteristic from a remote peripheral.
     * @param characteristicId The instance ID of the GATT characteristic whose value should be written to.
     * @param value The value that should be sent to the remote characteristic as part of the write request.
     * @param callback Called when the write request has completed.
     */
    export function writeCharacteristicValue(
      characteristicId: string,
      value: ArrayBuffer,
      callback: () => void,
    ): void;

    /**
     * Enable value notifications/indications from the specified characteristic.
     * Once enabled, an application can listen to notifications using the {@link
     * onCharacteristicValueChanged} event.
     * @param characteristicId The instance ID of the GATT characteristic that notifications should be enabled on.
     * @param properties Notification session properties (optional).
     * @param callback Called when the request has completed.
     */
    export function startCharacteristicNotifications(
      characteristicId: string,
      properties: NotificationProperties,
      callback: () => void,
    ): void;

    /**
     * Enable value notifications/indications from the specified characteristic.
     * Once enabled, an application can listen to notifications using the {@link
     * onCharacteristicValueChanged} event.
     * @param characteristicId The instance ID of the GATT characteristic that notifications should be enabled on.
     * @param callback Called when the request has completed.
     */
    export function startCharacteristicNotifications(
      characteristicId: string,
      callback: () => void,
    ): void;

    /**
     * Disable value notifications/indications from the specified characteristic.
     * After a successful call, the application will stop receiving
     * notifications/indications from this characteristic.
     * @param characteristicId The instance ID of the GATT characteristic on which this app's notification session should be stopped.
     * @param callback Called when the request has completed (optional).
     */
    export function stopCharacteristicNotifications(
      characteristicId: string,
      callback?: () => void,
    ): void;

    /**
     * Retrieve the value of a specified characteristic descriptor from a remote
     * peripheral.
     * @param descriptorId The instance ID of the GATT characteristic descriptor whose value should be read from the remote device.
     * @param callback Called with the Descriptor object whose value was requested. The <code>value</code> field of the returned Descriptor object contains the result of the read request.
     * @param callback.result
     */
    export function readDescriptorValue(
      descriptorId: string,
      callback: (
        result: Descriptor,
      ) => void,
    ): void;

    /**
     * Write the value of a specified characteristic descriptor from a remote
     * peripheral.
     * @param descriptorId The instance ID of the GATT characteristic descriptor whose value should be written to.
     * @param value The value that should be sent to the remote descriptor as part of the write request.
     * @param callback Called when the write request has completed.
     */
    export function writeDescriptorValue(
      descriptorId: string,
      value: ArrayBuffer,
      callback: () => void,
    ): void;

    /**
     * Fired whan a new GATT service has been discovered on a remote device.
     */
    export const onServiceAdded: chrome.events.Event<
      /**
       * @param service The GATT service that was added.
       */
      (
        service: Service,
      ) => void
    >;

    /**
     * Fired when the state of a remote GATT service changes. This involves any
     * characteristics and/or descriptors that get added or removed from the
     * service, as well as "ServiceChanged" notifications from the remote
     * device.
     */
    export const onServiceChanged: chrome.events.Event<
      /**
       * @param service The GATT service whose state has changed.
       */
      (
        service: Service,
      ) => void
    >;

    /**
     * Fired when a GATT service that was previously discovered on a remote
     * device has been removed.
     */
    export const onServiceRemoved: chrome.events.Event<
      /**
       * @param service The GATT service that was removed.
       */
      (
        service: Service,
      ) => void
    >;

    /**
     * Fired when the value of a remote GATT characteristic changes, either as a
     * result of a read request, or a value change notification/indication This
     * event will only be sent if the app has enabled notifications by calling
     * {@link startCharacteristicNotifications}.
     */
    export const onCharacteristicValueChanged: chrome.events.Event<
      /**
       * @param characteristic The GATT characteristic whose value has changed.
       */
      (
        characteristic: Characteristic,
      ) => void
    >;

    /**
     * Fired when the value of a remote GATT characteristic descriptor changes,
     * usually as a result of a read request. This event exists mostly for
     * convenience and will always be sent after a successful call to {@link
     * readDescriptorValue}.
     */
    export const onDescriptorValueChanged: chrome.events.Event<
      /**
       * @param descriptor The GATT characteristic descriptor whose value has changed.
       */
      (
        descriptor: Descriptor,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.bluetoothSocket</code> API to send and receive data
 to
   * Bluetooth devices using RFCOMM and L2CAP connections.
   * @chrome-platform chromeos
 * @chrome-platform win
 * @chrome-platform mac
 */
  export namespace bluetoothSocket {
    export interface SocketProperties {
      /**
       * Flag indicating whether the socket is left open when the event page of the
       * application is unloaded (see <a
       * href="http://developer.chrome.com/apps/app_lifecycle.html">Manage App
       * Lifecycle</a>). The default value is <code>false.</code> When the application
       * is loaded, any sockets previously opened with persistent=true can be fetched
       * with $ref:getSockets.
       */
      persistent?: boolean;

      /**
       * An application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. The default value is 4096.
       */
      bufferSize?: number;
    }

    export interface CreateInfo {
      /**
       * The ID of the newly created socket. Note that socket IDs created from this
       * API are not compatible with socket IDs created from other APIs, such as the
       * <code>{@link sockets.tcp}</code> API.
       */
      socketId: number;
    }

    export interface ListenOptions {
      /**
       * The RFCOMM Channel used by <code>listenUsingRfcomm</code>. If specified, this
       * channel must not be previously in use or the method call will fail. When not
       * specified, an unused channel will be automatically allocated.
       */
      channel?: number;

      /**
       * The L2CAP PSM used by <code>listenUsingL2cap</code>. If specified, this PSM
       * must not be previously in use or the method call with fail. When not
       * specified, an unused PSM will be automatically allocated.
       */
      psm?: number;

      /**
       * Length of the socket's listen queue. The default value depends on the
       * operating system's host subsystem.
       */
      backlog?: number;
    }

    export interface SocketInfo {
      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * Flag indicating if the socket remains open when the event page of the
       * application is unloaded (see <code>SocketProperties.persistent</code>). The
       * default value is "false".
       */
      persistent: boolean;

      /**
       * Application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. If no buffer size has been
       * specified explictly, the value is not provided.
       */
      bufferSize?: number;

      /**
       * Flag indicating whether a connected socket blocks its peer from sending more
       * data, or whether connection requests on a listening socket are dispatched
       * through the <code>onAccept</code> event or queued up in the listen queue
       * backlog. See <code>setPaused</code>. The default value is "false".
       */
      paused: boolean;

      /**
       * Flag indicating whether the socket is connected to a remote peer.
       */
      connected: boolean;

      /**
       * If the underlying socket is connected, contains the Bluetooth address of the
       * device it is connected to.
       */
      address?: string;

      /**
       * If the underlying socket is connected, contains information about the service
       * UUID it is connected to, otherwise if the underlying socket is listening,
       * contains information about the service UUID it is listening on.
       */
      uuid?: string;
    }

    export interface AcceptInfo {
      /**
       * The server socket identifier.
       */
      socketId: number;

      /**
       * The client socket identifier, i.e. the socket identifier of the newly
       * established connection. This socket identifier should be used only with
       * functions from the <code>chrome.bluetoothSocket</code> namespace. Note the
       * client socket is initially paused and must be explictly un-paused by the
       * application to start receiving data.
       */
      clientSocketId: number;
    }

    export type AcceptError = "system_error" | "not_listening";

    export interface AcceptErrorInfo {
      /**
       * The server socket identifier.
       */
      socketId: number;

      /**
       * The error message.
       */
      errorMessage: string;

      /**
       * An error code indicating what went wrong.
       */
      error: AcceptError;
    }

    export interface ReceiveInfo {
      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * The data received, with a maxium size of <code>bufferSize</code>.
       */
      data: ArrayBuffer;
    }

    export type ReceiveError = "disconnected" | "system_error" | "not_connected";

    export interface ReceiveErrorInfo {
      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * The error message.
       */
      errorMessage: string;

      /**
       * An error code indicating what went wrong.
       */
      error: ReceiveError;
    }

    /**
     * Creates a Bluetooth socket.
     * @param properties The socket properties (optional).
     * @param callback Called when the socket has been created.
     * @param callback.createInfo The result of the socket creation.
     */
    export function create(
      properties: SocketProperties,
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Creates a Bluetooth socket.
     * @param callback Called when the socket has been created.
     * @param callback.createInfo The result of the socket creation.
     */
    export function create(
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Updates the socket properties.
     * @param socketId The socket identifier.
     * @param properties The properties to update.
     * @param callback Called when the properties are updated.
     */
    export function update(
      socketId: number,
      properties: SocketProperties,
      callback?: () => void,
    ): void;

    /**
     * Enables or disables a connected socket from receiving messages from its peer,
     * or a listening socket from accepting new connections. The default value is
     * "false". Pausing a connected socket is typically used by an application to
     * throttle data sent by its peer. When a connected socket is paused, no
     * <code>onReceive</code>event is raised. When a socket is connected and
     * un-paused, <code>onReceive</code> events are raised again when messages are
     * received. When a listening socket is paused, new connections are accepted
     * until its backlog is full then additional connection requests are refused.
     * <code>onAccept</code> events are raised only when the socket is un-paused.
     * @param socketId
     * @param paused
     * @param callback Callback from the <code>setPaused</code> method.
     */
    export function setPaused(
      socketId: number,
      paused: boolean,
      callback?: () => void,
    ): void;

    /**
     * Listen for connections using the RFCOMM protocol.
     * @param socketId The socket identifier.
     * @param uuid Service UUID to listen on.
     * @param options Optional additional options for the service.
     * @param callback Called when listen operation completes.
     */
    export function listenUsingRfcomm(
      socketId: number,
      uuid: string,
      options: ListenOptions,
      callback: () => void,
    ): void;

    /**
     * Listen for connections using the RFCOMM protocol.
     * @param socketId The socket identifier.
     * @param uuid Service UUID to listen on.
     * @param callback Called when listen operation completes.
     */
    export function listenUsingRfcomm(
      socketId: number,
      uuid: string,
      callback: () => void,
    ): void;

    /**
     * Listen for connections using the L2CAP protocol.
     * @param socketId The socket identifier.
     * @param uuid Service UUID to listen on.
     * @param options Optional additional options for the service.
     * @param callback Called when listen operation completes.
     */
    export function listenUsingL2cap(
      socketId: number,
      uuid: string,
      options: ListenOptions,
      callback: () => void,
    ): void;

    /**
     * Listen for connections using the L2CAP protocol.
     * @param socketId The socket identifier.
     * @param uuid Service UUID to listen on.
     * @param callback Called when listen operation completes.
     */
    export function listenUsingL2cap(
      socketId: number,
      uuid: string,
      callback: () => void,
    ): void;

    /**
     * Connects the socket to a remote Bluetooth device. When the
     * <code>connect</code> operation completes successfully, <code>onReceive</code>
     * events are raised when data is received from the peer. If a network error
     * occur while the runtime is receiving packets, a <code>onReceiveError</code>
     * event is raised, at which point no more <code>onReceive</code> event will be
     * raised for this socket until the <code>setPaused(false)</code> method is
     * called.
     * @param socketId The socket identifier.
     * @param address The address of the Bluetooth device.
     * @param uuid The UUID of the service to connect to.
     * @param callback Called when the connect attempt is complete.
     */
    export function connect(
      socketId: number,
      address: string,
      uuid: string,
      callback: () => void,
    ): void;

    /**
     * Disconnects the socket. The socket identifier remains valid.
     * @param socketId The socket identifier.
     * @param callback Called when the disconnect attempt is complete.
     */
    export function disconnect(
      socketId: number,
      callback?: () => void,
    ): void;

    /**
     * Disconnects and destroys the socket. Each socket created should be closed
     * after use. The socket id is no longer valid as soon at the function is
     * called. However, the socket is guaranteed to be closed only when the callback
     * is invoked.
     * @param socketId The socket identifier.
     * @param callback Called when the <code>close</code> operation completes.
     */
    export function close(
      socketId: number,
      callback?: () => void,
    ): void;

    /**
     * Sends data on the given Bluetooth socket.
     * @param socketId The socket identifier.
     * @param data The data to send.
     * @param callback Called with the number of bytes sent.
     * @param callback.bytesSent The number of bytes sent.
     */
    export function send(
      socketId: number,
      data: ArrayBuffer,
      callback?: (
        bytesSent: number,
      ) => void,
    ): void;

    /**
     * Retrieves the state of the given socket.
     * @param socketId The socket identifier.
     * @param callback Called when the socket state is available.
     * @param callback.socketInfo Object containing the socket information.
     */
    export function getInfo(
      socketId: number,
      callback: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     * @param callback Called when the list of sockets is available.
     * @param callback.sockets
     */
    export function getSockets(
      callback: (
        sockets: SocketInfo[],
      ) => void,
    ): void;

    /**
     * Event raised when a connection has been established for a given socket.
     */
    export const onAccept: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: AcceptInfo,
      ) => void
    >;

    /**
     * Event raised when a network error occurred while the runtime was waiting
     * for new connections on the given socket. Once this event is raised, the
     * socket is set to <code>paused</code> and no more <code>onAccept</code>
     * events are raised for this socket.
     */
    export const onAcceptError: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: AcceptErrorInfo,
      ) => void
    >;

    /**
     * Event raised when data has been received for a given socket.
     */
    export const onReceive: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: ReceiveInfo,
      ) => void
    >;

    /**
     * Event raised when a network error occured while the runtime was waiting
     * for data on the socket. Once this event is raised, the socket is set to
     * <code>paused</code> and no more <code>onReceive</code> events are raised
     * for this socket.
     */
    export const onReceiveError: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: ReceiveErrorInfo,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.bluetooth</code> API to connect to a Bluetooth
 device.
   * All functions report failures via chrome.runtime.lastError.
   * @chrome-platform chromeos
 * @chrome-platform win
 * @chrome-platform mac
 */
  export namespace bluetooth {
    /**
     * Allocation authorities for Vendor IDs.
     */
    export type VendorIdSource = "bluetooth" | "usb";

    /**
     * Common device types recognized by Chrome.
     */
    export type DeviceType = "computer" | "phone" | "modem" | "audio" | "carAudio" | "video" | "peripheral" | "joystick" | "gamepad" | "keyboard" | "mouse" | "tablet" | "keyboardMouseCombo";

    export interface AdapterState {
      /**
       * The address of the adapter, in the format 'XX:XX:XX:XX:XX:XX'.
       */
      address: string;

      /**
       * The human-readable name of the adapter.
       */
      name: string;

      /**
       * Indicates whether or not the adapter has power.
       */
      powered: boolean;

      /**
       * Indicates whether or not the adapter is available (i.e. enabled).
       */
      available: boolean;

      /**
       * Indicates whether or not the adapter is currently discovering.
       */
      discovering: boolean;
    }

    export interface Device {
      /**
       * The address of the device, in the format 'XX:XX:XX:XX:XX:XX'.
       */
      address: string;

      /**
       * The human-readable name of the device.
       */
      name?: string;

      /**
       * The class of the device, a bit-field defined by
       * http://www.bluetooth.org/en-us/specification/assigned-numbers/baseband.
       */
      deviceClass?: number;

      /**
       * The Device ID record of the device, where available.
       */
      vendorIdSource?: VendorIdSource;

      vendorId?: number;

      productId?: number;

      deviceId?: number;

      /**
       * The type of the device, if recognized by Chrome. This is obtained from the
       * |deviceClass| field and only represents a small fraction of the possible
       * device types. When in doubt you should use the |deviceClass| field directly.
       */
      type?: DeviceType;

      /**
       * Indicates whether or not the device is paired with the system.
       */
      paired?: boolean;

      /**
       * Indicates whether the device is currently connected to the system.
       */
      connected?: boolean;

      /**
       * Indicates the RSSI ("received signal strength indication") of the connection
       * to the device, measured in dBm, to a resolution of 1dBm. If the device is
       * currently connected, then measures the RSSI of the connection signal.
       * Otherwise, measures the RSSI of the last inquiry sent to the device, where
       * available. Absent if unavailable.
       */
      rssi?: number;

      /**
       * Indicates the host's current transmit power ("Tx power") for the connection
       * to the device, measured in dBm, to a resolution of 1dBm. This value is only
       * available if the device is currently connected.
       */
      currentHostTransmitPower?: number;

      /**
       * Indicates the host's maximum transmit power ("Tx power") for the connection
       * to the device, measured in dBm, to a resolution of 1dBm. This value is only
       * available if the device is currently connected.
       */
      maximumHostTransmitPower?: number;

      /**
       * UUIDs of protocols, profiles and services advertised by the device. For
       * classic Bluetooth devices, this list is obtained from EIR data and SDP
       * tables. For Low Energy devices, this list is obtained from AD and GATT
       * primary services. For dual mode devices this may be obtained from both.
       */
      uuids?: string[];
    }

    /**
     * Get information about the Bluetooth adapter.
     * @param callback Called with an AdapterState object describing the adapter              state.
     * @param callback.adapterInfo Object containing the adapter information.
     */
    export function getAdapterState(
      callback: (
        adapterInfo: AdapterState,
      ) => void,
    ): void;

    /**
     * Get information about a Bluetooth device known to the system.
     * @param deviceAddress Address of device to get.
     * @param callback Called with the Device object describing the device.
     * @param callback.deviceInfo Object containing the device information.
     */
    export function getDevice(
      deviceAddress: string,
      callback: (
        deviceInfo: Device,
      ) => void,
    ): void;

    /**
     * Get a list of Bluetooth devices known to the system, including paired and
     * recently discovered devices.
     * @param callback Called when the search is completed.
     * @param callback.deviceInfos Array of object containing device information.
     */
    export function getDevices(
      callback: (
        deviceInfos: Device[],
      ) => void,
    ): void;

    /**
     * <p>Start discovery. Newly discovered devices will be returned via the
     * onDeviceAdded event. Previously discovered devices already known to the
     * adapter must be obtained using getDevices and will only be updated using the
     * |onDeviceChanged| event if information about them changes.</p><p>Discovery
     * will fail to start if this application has already called startDiscovery.
     * Discovery can be resource intensive: stopDiscovery should be called as soon
     * as possible.</p>
     * @param callback Called to indicate success or failure.
     */
    export function startDiscovery(
      callback?: () => void,
    ): void;

    /**
     * Stop discovery.
     * @param callback Called to indicate success or failure.
     */
    export function stopDiscovery(
      callback?: () => void,
    ): void;

    /**
     * Fired when the state of the Bluetooth adapter changes.
     */
    export const onAdapterStateChanged: chrome.events.Event<
      /**
       * @param state The new state of the adapter.
       */
      (
        state: AdapterState,
      ) => void
    >;

    /**
     * Fired when information about a new Bluetooth device is available.
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
     * Fired when information about a known Bluetooth device has changed.
     */
    export const onDeviceChanged: chrome.events.Event<
      /**
       * @param device
       */
      (
        device: Device,
      ) => void
    >;

    /**
     * Fired when a Bluetooth device that was previously discovered has been out
     * of range for long enough to be considered unavailable again, and when a
     * paired device is removed.
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
   * Use the <code>chrome.bookmarks</code> API to create, organize, and otherwise
   * manipulate bookmarks. Also see <a href='override'>Override Pages</a>, which
   * you can use to create a custom Bookmark Manager page.
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
       * Indicates the reason why this node is unmodifiable. The <var>managed</var>
       * value indicates that this node was configured by the system administrator.
       * Omitted if the node can be modified by the user and the extension (default).
       */
      unmodifiable?: "managed";

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
   * Use the <code>chrome.browser</code> API to interact with the Chrome browser
   * associated with the current application and Chrome profile.
   * @alpha
 * @chrome-permission browser
 */
  export namespace browser {
    export interface OpenTabOptions {
      /**
       * The URL to navigate to when the new tab is initially opened.
       */
      url: string;
    }

    /**
     * Opens a new tab in a browser window associated with the current application
     * and Chrome profile. If no browser window for the Chrome profile is opened, a
     * new one is opened prior to creating the new tab. The initial URL of the new
     * tab is specified in |options|.
     * @param options The {@link OpenTabOptions} for this function.
     * @param callback Called to indicate success or failure.
     */
    export function openTab(
      options: OpenTabOptions,
      callback: () => void,
    ): void;
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
    export type ChannelError = "channel_not_open" | "authentication_error" | "connect_error" | "socket_error" | "transport_error" | "invalid_message" | "invalid_channel_id" | "connect_timeout" | "unknown";

    /**
     * Authentication methods that may be required to connect to a Cast receiver.
     */
    export type ChannelAuthType = "ssl" | "ssl_verified";

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
    }

    export interface ChannelInfo {
      /**
       * Id for the channel.
       */
      channelId: number;

      /**
       * DEPRECATED: The URL to the receiver.  This field will be removed in a future
       * release.
       */
      url: string;

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
     * <p>Opens a new channel to the Cast receiver specified by connectInfo.  Only
     * one channel may be connected to same receiver from the same extension at a
     * time.  If the open request is successful, the callback will be invoked with a
     * ChannelInfo with readyState == 'connecting'.  If unsuccessful, the callback
     * will be invoked with a ChannelInfo with channel.readyState == 'closed',
     * channel.errorState will be set to the error condition, and onError will be
     * fired with error details.</p><p>TODO(mfoltz): Convert 'any' to ConnectInfo
     * once all clients are updated to not send URLs.</p>
     * @param connectInfo
     * @param callback Callback holding the result of a channel operation.
     * @param callback.result
     */
    export function open(
      connectInfo: any,
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
     * Get logs in compressed serialized format. See GetLogsCallback for details.
     * @param callback If successful, |callback| is invoked with data. Otherwise, an error will be raised.
     * @param callback.log compressed serialized raw bytes containing the logs. The log is formatted using protocol buffer. See extensions/browser/api/cast_channel/logging.proto for definition. Compression is in gzip format.
     */
    export function getLogs(
      callback: (
        log: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * Sets trusted certificate authorities where |signature| is a base64 encoded
     * RSA-PSS signature and |keys| is base64 encoded AuthorityKeys protobuf.
     * @param keys
     * @param signature
     * @param callback Callback from <code>setAuthorityKeys</code> method.
     */
    export function setAuthorityKeys(
      keys: string,
      signature: string,
      callback: () => void,
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
     * The maximum number of top level extension items that can be added to an
     * extension action context menu. Any items beyond this limit will be ignored.
     */
    export const ACTION_MENU_TOP_LEVEL_LIMIT: number;

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
        contexts?: [("all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action")] & ("all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action")[],

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
         * format of a pattern, see <a href='match_patterns'>Match Patterns</a>.
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
        contexts?: [("all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action")] & ("all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action")[],
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
   * Use the <code>chrome.copresenceSocket</code> API to create persistent
   * sockets to send data to and receive from data nearby devices.
   * @alpha
 * @chrome-permission copresence
 */
  export namespace copresenceSocket {
    export type TransportType = "online" | "offline";

    export interface ConnectionProperties {
      /**
       * Flag indicating whether the socket should use a low latency transport (if
       * available).
       */
      lowLatency?: boolean;

      /**
       * Flag to force the socket to use a particular type of transport.
       */
      type?: TransportType;
    }

    export interface PeerInfo {
      /**
       * The ID of the newly created peer.
       */
      peerId: number;

      /**
       * An opaque string containing the locator data for this peer. This locator is
       * needed to connect to this socket.
       */
      locator: string;
    }

    export interface ReceiveInfo {
      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * The data received.
       */
      data: ArrayBuffer;
    }

    /**
     * Status of a socket operation.
     */
    export type SocketStatus = "no_error" | "disconnected" | "invalid_socket" | "connect_failure" | "send_failure" | "receive_failure";

    /**
     * Creates a peer that can be connected to by a nearby devices.
     * @param callback Called when the peer has been created.
     * @param callback.peerInfo The result of the socket creation.
     */
    export function createPeer(
      callback: (
        peerInfo: PeerInfo,
      ) => void,
    ): void;

    /**
     * Destroys the peer. This will close any connections to this peer from remote
     * hosts and will prevent any further connections to it.
     * @param peerId Peer ID returned by <code>createPeer</code>.
     */
    export function destroyPeer(
      peerId: number,
    ): void;

    /**
     * Sends data on the given Copresence socket.
     * @param socketId The socket identifier.
     * @param data The data to send.
     * @param callback Called when the <code>send</code> operation completes.
     * @param callback.status Status of the send operation.
     */
    export function send(
      socketId: number,
      data: ArrayBuffer,
      callback?: (
        status: SocketStatus,
      ) => void,
    ): void;

    /**
     * Disconnects and destroys a socket. The socket id is no longer valid and any
     * pending send callbacks are cancelled as soon at the function is called.
     * However, the connection is guaranteed to be closed only when the callback is
     * invoked.
     * @param socketId The socket identifier.
     * @param callback Called when the <code>disconnect</code> operation completes.
     */
    export function disconnect(
      socketId: number,
      callback?: () => void,
    ): void;

    /**
     * Event raised when data has been received for a given socket.
     */
    export const onReceive: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: ReceiveInfo,
      ) => void
    >;

    /**
     * Event raised when a peer receives a new connection. A new socket is
     * created and the id is passed to this event via socketId.
     */
    export const onConnected: chrome.events.Event<
      /**
       * @param peerId ID of the peer that received this connection.
       * @param socketId ID of the new socket that was created which can be used to              communicate on this connection.
       */
      (
        peerId: number,
        socketId: number,
      ) => void
    >;

    /**
     * Event raised when there is a status update for a socket. This can be an
     * error or disconnection. After event is raised, since there has either
     * been an error or disconnection, no more <code>onReceive</code> events are
     * raised for this socket and the socketId is invalidated.
     */
    export const onSocketStatusUpdated: chrome.events.Event<
      /**
       * @param socketId
       * @param status The status update for the socket.
       */
      (
        socketId: number,
        status: SocketStatus,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.copresence</code> API to communicate with other nearby
   * devices using Google's copresence service.
   * @alpha
 * @chrome-permission copresence
 */
  export namespace copresence {
    export interface Strategy {
      /**
       * Attempt to use low power mode. Defaults to false.
       */
      lowPower?: boolean;

      /**
       * Attempt to only broadcast. Using this with onlyScan can result in both being
       * ignored. Defaults to false.
       */
      onlyBroadcast?: boolean;

      /**
       * Attempt to only scan. Using this with onlyBroadcast can result in both being
       * ignored. Defaults to false.
       */
      onlyScan?: boolean;

      /**
       * Attempt to use audible audio. Defaults to false.
       */
      audible?: boolean;
    }

    export interface Message {
      /**
       * The type of message being published. Cannot be empty.
       */
      type: string;

      /**
       * The message payload, in raw bytes.
       */
      payload: ArrayBuffer;
    }

    export interface MessageFilter {
      /**
       * The type of messages to subscribe to. Cannot be empty.
       */
      type: string;
    }

    export interface AccessPolicy {
      /**
       * Only send this message to devices within hearing range. Defaults to false.
       */
      onlyEarshot?: boolean;
    }

    export interface PublishOperation {
      /**
       * A unique ID that identifies this publish.
       */
      id: string;

      /**
       * The message to publish.
       */
      message: Message;

      /**
       * The number of milliseconds for which this publication will be active. This is
       * capped at 24 hours. If not provided, a default of 5 minutes is used.
       */
      timeToLiveMillis?: number;

      /**
       * A policy specifying who can get the message.
       */
      policy?: AccessPolicy;

      /**
       * A set of strategies to use when publishing the message. These strategies are
       * suggestions to copresence that may or may not be followed.
       */
      strategies?: Strategy;
    }

    export interface SubscribeOperation {
      /**
       * A unique ID that identifies this subscription.
       */
      id: string;

      /**
       * Filter that defines which messages we want to subscribe to.
       */
      filter: MessageFilter;

      /**
       * The number of milliseconds for which this subscription will be active. This
       * is capped at 24 hours. If not provided, a default of 5 minutes is used.
       */
      timeToLiveMillis?: number;

      /**
       * A set of strategies to use when subscribing with this filter. These
       * strategies are suggestions to copresence that may or may not be followed.
       */
      strategies?: Strategy;
    }

    export interface UnpublishOperation {
      /**
       * The ID of a message to unpublish. Required if the operation type is
       * 'unpublish'.
       */
      unpublishId: string;
    }

    export interface UnsubscribeOperation {
      /**
       * The ID of a subscription to cancel. Required if the operation type is
       * 'unsubscribe'.
       */
      unsubscribeId: string;
    }

    export interface Operation {
      /**
       * Publication details. Required if the operation type is 'publish'.
       */
      publish?: PublishOperation;

      /**
       * Subscription details. Required if the operation type is 'subscribe'.
       */
      subscribe?: SubscribeOperation;

      /**
       * Unpublish details. Required if the operation type is 'unpublish'.
       */
      unpublish?: UnpublishOperation;

      /**
       * Unsubscribe details. Required if the operation type is 'unsubscribe'.
       */
      unsubscribe?: UnsubscribeOperation;
    }

    /**
     * Indicates whether a batchExecute() call succeeded or encountered errors.
     */
    export type ExecuteStatus = "success" | "failed" | "serverError" | "initFailed";

    /**
     * Specifies an asynchronous status event sent to the app.
     */
    export type Status = "audioFailed" | "serverError";

    /**
     * Sets the API key to use with the app. This parameter only needs to be set to
     * communicate with apps on other platforms. Once the API key is set, apps on
     * any platform that are using this API key can publish/subscribe to each other.
     * @param apiKey
     */
    export function setApiKey(
      apiKey: string,
    ): void;

    /**
     * Temporary call to enable authenticated copresence with an externally provided
     * OAuth token. TODO(ckehoe): Replace this with a proper API.
     * @param token
     */
    export function setAuthToken(
      token: string,
    ): void;

    /**
     * Executes a set of copresence operations in one batch. They will either all be
     * executed, or none will be executed (due to an error in one or more of them).
     * Publish/Subscribe operations are executed in the order that they exist in the
     * array. Unpublish and Unsubscribe are processsed at the end, again, in the
     * order that they exist in the array.
     * @param operations
     * @param callback Callback to return the status of a completed batchExecute() call.
     * @param callback.status
     */
    export function execute(
      operations: Operation[],
      callback: (
        status: ExecuteStatus,
      ) => void,
    ): void;

    /**
     * Fired when new messages arrive.
     */
    export const onMessagesReceived: chrome.events.Event<
      /**
       * @param subscriptionId
       * @param messages
       */
      (
        subscriptionId: string,
        messages: Message[],
      ) => void
    >;

    /**
     * Fired when a new copresence status update is available.
     */
    export const onStatusUpdated: chrome.events.Event<
      /**
       * @param status
       */
      (
        status: Status,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * The <code>chrome.debugger</code> API serves as an alternate transport for
   * Chrome's <a
   * href='http://code.google.com/chrome/devtools/docs/remote-debugging'>remote
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
     * @param requiredVersion Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained <a href='http://code.google.com/chrome/devtools/docs/remote-debugging'>here</a>.
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
     * @param method Method name. Should be one of the methods defined by the <a href='http://code.google.com/chrome/devtools/docs/remote-debugging'>remote debugging protocol</a>.
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
       * @param method Method name. Should be one of the notifications defined by the <a href='http://code.google.com/chrome/devtools/docs/remote-debugging'>remote debugging protocol</a>.
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
        reason: "target_closed" | "canceled_by_user" | "replaced_with_devtools",
      ) => void
    >;
  }

  export {_debugger as debugger};
}

declare namespace chrome {
  /**
   * <em><strong>Note:</strong> this API is currently on hold, without concrete
   * plans to move to stable.</em> Use the
   * <code>chrome.declarativeWebRequest</code> API to intercept, block, or modify
   * requests in-flight. It is significantly faster than the <a
   * href='webRequest'><code>chrome.webRequest</code> API</a> because you can
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
     * @param targetTab Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches <code>tab.url</code>.
     * @param callback
     * @param callback.streamId An opaque string that can be passed to <code>getUserMedia()</code> API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty <code>streamId</code>. The created <code>streamId</code> can be used only once and expires after a few seconds when it is not used.
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
     * @param callback.streamId An opaque string that can be passed to <code>getUserMedia()</code> API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty <code>streamId</code>. The created <code>streamId</code> can be used only once and expires after a few seconds when it is not used.
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

        /**
         * If specified, this script evaluates into a function that accepts three string
         * arguments: the source to preprocess, the URL of the source, and a function
         * name if the source is an DOM event handler. The preprocessorerScript function
         * should return a string to be compiled by Chrome in place of the input source.
         * In the case that the source is a DOM event handler, the returned source must
         * compile to a single JS function.
         */
        preprocessorScript?: string,
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
     * Sources panel.
     */
    export const sources: SourcesPanel;

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
   * Use the <code>chrome.diagnostics</code> API to query various properties of
   * the environment that may be useful for diagnostics.
   * @alpha
 * @chrome-permission diagnostics
 */
  export namespace diagnostics {
    export interface SendPacketOptions {
      /**
       * Target IP address.
       */
      ip: string;

      /**
       * Packet time to live value. If omitted, the system default value will be used.
       */
      ttl?: number;

      /**
       * Packet timeout in seconds. If omitted, the system default value will be used.
       */
      timeout?: number;

      /**
       * Size of the payload. If omitted, the system default value will be used.
       */
      size?: number;
    }

    export interface SendPacketResult {
      /**
       * The IP of the host which we receives the ICMP reply from. The IP may differs
       * from our target IP if the packet's ttl is used up.
       */
      ip: string;

      /**
       * Latency in millisenconds.
       */
      latency: number;
    }

    /**
     * Send a packet of the given type with the given parameters.
     * @param options
     * @param callback
     * @param callback.result
     */
    export function sendPacket(
      options: SendPacketOptions,
      callback: (
        result: SendPacketResult,
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
   * Use the <code>chrome.document_scan</code> API to discover and retrieve
   * images from attached paper document scanners.
   * @alpha
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
       * The MIME type of |dataUrls|.
       */
      mimeType: string;
    }

    /**
     * Performs a document scan.  On success, the PNG data will be sent to the
     * callback.
     * @param options <code>Options</code> object containing scan parameters.
     * @param callback Called with the result and data from the scan.
     * @param callback.results
     */
    export function scan(
      options: ScanOptions,
      callback: (
        results: ScanResults,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.enterprise.platformKeys</code> API to generate
   * hardware-backed keys and to install certificates for these keys. The
   * certificates will be available to the platform and can, for example, be used
   * for TLS authentication and network access.
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
   * The <code>chrome.extensionTypes</code> API contains type declarations for
   * Chrome extensions.
   */
  export namespace extensionTypes {
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
       * <code>false</code> and is only injected into the top frame.
       */
      allFrames?: boolean;

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
      runAt?: "document_start" | "document_end" | "document_idle";
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
   * Schemas for structured manifest entries
   */
  export namespace extensionsManifestTypes {
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
    }
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
     * in case of errors when calling methods of the API. For success, <code>
     * OK</code> must be used.
     */
    export type ProviderError = "OK" | "FAILED" | "IN_USE" | "EXISTS" | "NOT_FOUND" | "ACCESS_DENIED" | "TOO_MANY_OPENED" | "NO_MEMORY" | "NO_SPACE" | "NOT_A_DIRECTORY" | "INVALID_OPERATION" | "SECURITY" | "ABORT" | "NOT_A_FILE" | "NOT_EMPTY" | "INVALID_URL" | "IO";

    /**
     * Mode of opening a file. Used by <code>onOpenFileRequested</code>.
     */
    export type OpenFileMode = "READ" | "WRITE";

    /**
     * Type of a change detected on the observed directory.
     */
    export type ChangeType = "CHANGED" | "DELETED";

    export interface EntryMetadata {
      /**
       * True if it is a directory.
       */
      isDirectory: boolean;

      /**
       * Name of this entry (not full path name).
       */
      name: string;

      /**
       * File size in bytes.
       */
      size: number;

      /**
       * The last modified time of this entry.
       */
      modificationTime: Date;

      /**
       * Mime type for the entry.
       */
      mimeType?: string;

      /**
       * Thumbnail image as a data URI in either PNG, JPEG or WEBP format, at most 32
       * KB in size. Optional, but can be provided only when explicitly requested by
       * the <code>onGetMetadataRequested</code> event.
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
       * Whether the file system supports the <code>tag</code> field for observed
       * directories. Required in order to enable the internal cache.
       */
      supportsNotifyTag?: boolean;
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
       * Set to <code>true</code> if the thumbnail is requested.
       */
      thumbnail: boolean;
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

    /**
     * <p>Mounts a file system with the given <code>fileSystemId</code> and <code>
     * displayName</code>. <code>displayName</code> will be shown in the left panel
     * of Files.app. <code>displayName</code> can contain any characters including
     * '/', but cannot be an empty string. <code>displayName</code> must be
     * descriptive but doesn't have to be unique. The <code>fileSystemId </code>
     * must not be an empty string.</p><p>In case of an error,
     * <code>chrome.runtime.lastError</code> will be set will a corresponding error
     * code.</p>
     * @param options
     * @param callback A generic result callback to indicate success or failure.
     */
    export function mount(
      options: MountOptions,
      callback?: () => void,
    ): void;

    /**
     * <p>Unmounts a file system with the given <code>fileSystemId</code>. It must
     * be called after <code>onUnmountRequested</code> is invoked. Also, the
     * providing extension can decide to perform unmounting if not requested (eg. in
     * case of lost connection, or a file error).</p><p>In case of an error,
     * <code>chrome.runtime.lastError</code> will be set will a corresponding error
     * code.</p>
     * @param options
     * @param callback A generic result callback to indicate success or failure.
     */
    export function unmount(
      options: UnmountOptions,
      callback?: () => void,
    ): void;

    /**
     * Returns all file systems mounted by the extension.
     * @param callback Callback to receive the result of getAll() function.
     * @param callback.fileSystems
     */
    export function getAll(
      callback: (
        fileSystems: FileSystemInfo[],
      ) => void,
    ): void;

    /**
     * <p>Notifies about changes in the watched directory at <code>
     * observedPath</code> in <code>recursive</code mode. If the file system is
     * mounted with <code>supportsNofityTag</code>, then <code>tag</code> must be
     * provided, and all changes since the last notification always reported, even
     * if the system was shutdown. The last tag can be obtained with <code>
     * getAll()</code>. Note, that <code>tag</code> is required in order to enable
     * the internal cache.</p><p>Value of <code>tag</code> can be any string which
     * is unique per call, so it's possible to identify the last registered
     * notification. Eg. if the providing extension starts after a reboot, and the
     * last registered notification's tag is equal to "123", then it should call
     * notify() for all changes which happened since the change tagged as "123". It
     * cannot be an empty string.</p><p>Not all providers are able to provide a tag,
     * but if the file system has a changelog, then the tag can be eg. a change
     * number, or a revision number.</p><p>Note that if a parent directory is
     * removed, then all descendant entries are also removed, and if they are
     * watched, then the API must be notified about the fact. Also, if a directory
     * is renamed, then all descendant entries are in fact removed, as there is no
     * entry under their original paths anymore.</p><p>In case of an error,
     * <code>chrome.runtime.lastError</code> will be set will a corresponding error
     * code.</p>
     * @param options
     * @param callback A generic result callback to indicate success or failure.
     */
    export function notify(
      options: NotifyOptions,
      callback?: () => void,
    ): void;

    /**
     * Raised when unmounting for the file system with the <code>fileSystemId
     * </code> identifier is requested. In the response, the <code>unmount
     * </code> API method must be called together with <code>successCallback
     * </code>. If unmounting is not possible (eg. due to a pending operation),
     * then <code>errorCallback</code> must be called.
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
     * is requested. The metadata must be returned with the <code>
     * successCallback</code> call. In case of an error, <code>errorCallback
     * </code> must be called.
     */
    export const onGetMetadataRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Success callback for the <code>onGetMetadataRequested</code> event.
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
     * Raised when contents of a directory at <code>directoryPath</code> are
     * requested. The results must be returned in chunks by calling the <code>
     * successCallback</code> several times. In case of an error, <code>
     * errorCallback</code> must be called.
     */
    export const onReadDirectoryRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Success callback for the <code>onReadDirectoryRequested</code> event. If more entries will be returned, then <code>hasMore</code> must be true, and it has to be called again with additional entries. If no more entries are available, then <code>hasMore</code> must be set to false.
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
     * file does not exist, then the operation must fail.
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
     * Raised when opening a file previously opened with <code>openRequestId
     * </code> is requested to be closed.
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
     * Raised when reading contents of a file opened previously with <code>
     * openRequestId</code> is requested. The results must be returned in chunks
     * by calling <code>successCallback</code> several times. In case of an
     * error, <code>errorCallback</code> must be called.
     */
    export const onReadFileRequested: chrome.events.Event<
      /**
       * @param options
       * @param successCallback Success callback for the <code>onReadFileRequested</code> event. If more data will be returned, then <code>hasMore</code> must be true, and it has to be called again with additional entries. If no more data is available, then <code>hasMore</code> must be set to false.
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
     * then <code>errorCallback</code> must be called with the <code>EXISTS
     * </code> error code.
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
     * Raised when writing contents to a file opened previously with <code>
     * openRequestId</code> is requested.
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
     * abort request executed. If aborting fails, then <code>errorCallback
     * </code> must be called. Note, that callbacks of the aborted operation
     * must not be called, as they will be ignored. Despite calling <code>
     * errorCallback</code>, the request may be forcibly aborted.
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
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.fileSystem</code> API to create, read, navigate,
 and
   * write to the user's local file system. With this API, Chrome Apps can
 read
   * and write to a user-selected location. For example, a text editor app
 can
   * use the API to read and write local documents. All failures are notified
 via
   * chrome.runtime.lastError.
   * @chrome-permission fileSystem
 */
  export namespace fileSystem {
    export interface AcceptOption {
      /**
       * This is the optional text description for this option. If not present, a
       * description will be automatically generated; typically containing an expanded
       * list of valid extensions (e.g. "text/html" may expand to "*.html, *.htm").
       */
      description?: string;

      /**
       * Mime-types to accept, e.g. "image/jpeg" or "audio/*". One of mimeTypes or
       * extensions must contain at least one valid element.
       */
      mimeTypes?: string[];

      /**
       * Extensions to accept, e.g. "jpg", "gif", "crx".
       */
      extensions?: string[];
    }

    export type ChooseEntryType = "openFile" | "openWritableFile" | "saveFile" | "openDirectory";

    /**
     * Type of a change happened to a child entry within a tracked directory.
     */
    export type ChildChangeType = "created" | "removed" | "changed";

    export interface ChooseEntryOptions {
      /**
       * Type of the prompt to show. The default is 'openFile'.
       */
      type?: ChooseEntryType;

      /**
       * The suggested file name that will be presented to the user as the default
       * name to read or write. This is optional.
       */
      suggestedName?: string;

      /**
       * The optional list of accept options for this file opener. Each option will be
       * presented as a unique group to the end-user.
       */
      accepts?: AcceptOption[];

      /**
       * Whether to accept all file types, in addition to the options specified in the
       * accepts argument. The default is true. If the accepts field is unset or
       * contains no valid entries, this will always be reset to true.
       */
      acceptsAllTypes?: boolean;

      /**
       * Whether to accept multiple files. This is only supported for openFile and
       * openWritableFile. The callback to chooseEntry will be called with a list of
       * entries if this is set to true. Otherwise it will be called with a single
       * Entry.
       */
      acceptsMultiple?: boolean;
    }

    export interface ChildChange {
      entry: Entry;

      type: ChildChangeType;
    }

    export interface EntryChangedEvent {
      /**
       * Tracked entry.
       */
      target: Entry;

      /**
       * List of changed entries within the tracked directory in order they happened.
       * May not be available for some types of file systems.
       */
      childChanges?: ChildChange[];
    }

    export interface EntryRemovedEvent {
      target: Entry;
    }

    /**
     * Get the display path of an Entry object. The display path is based on the
     * full path of the file or directory on the local file system, but may be made
     * more readable for display purposes.
     * @param entry
     * @param callback
     * @param callback.displayPath
     */
    export function getDisplayPath(
      entry: Entry,
      callback: (
        displayPath: string,
      ) => void,
    ): void;

    /**
     * Get a writable Entry from another Entry. This call will fail with a runtime
     * error if the application does not have the 'write' permission under
     * 'fileSystem'. If entry is a DirectoryEntry, this call will fail if the
     * application does not have the 'directory' permission under 'fileSystem'.
     * @param entry
     * @param callback
     * @param callback.entry
     */
    export function getWritableEntry(
      entry: Entry,
      callback: (
        entry: Entry,
      ) => void,
    ): void;

    /**
     * Gets whether this Entry is writable or not.
     * @param entry
     * @param callback
     * @param callback.isWritable
     */
    export function isWritableEntry(
      entry: Entry,
      callback: (
        isWritable: boolean,
      ) => void,
    ): void;

    /**
     * Ask the user to choose a file or directory.
     * @param options
     * @param callback
     * @param callback.entry
     * @param callback.fileEntries
     */
    export function chooseEntry(
      options: ChooseEntryOptions,
      callback: (
        entry?: Entry,
        fileEntries?: FileEntry[],
      ) => void,
    ): void;

    /**
     * Ask the user to choose a file or directory.
     * @param callback
     * @param callback.entry
     * @param callback.fileEntries
     */
    export function chooseEntry(
      callback: (
        entry?: Entry,
        fileEntries?: FileEntry[],
      ) => void,
    ): void;

    /**
     * Returns the file entry with the given id if it can be restored. This call
     * will fail with a runtime error otherwise.
     * @param id
     * @param callback
     * @param callback.entry
     */
    export function restoreEntry(
      id: string,
      callback: (
        entry: Entry,
      ) => void,
    ): void;

    /**
     * Returns whether the app has permission to restore the entry with the given
     * id.
     * @param id
     * @param callback
     * @param callback.isRestorable
     */
    export function isRestorable(
      id: string,
      callback: (
        isRestorable: boolean,
      ) => void,
    ): void;

    /**
     * Returns an id that can be passed to restoreEntry to regain access to a given
     * file entry. Only the 500 most recently used entries are retained, where calls
     * to retainEntry and restoreEntry count as use. If the app has the
     * 'retainEntries' permission under 'fileSystem', entries are retained
     * indefinitely. Otherwise, entries are retained only while the app is running
     * and across restarts.
     * @param entry
     */
    export function retainEntry(
      entry: Entry,
    ): string;

    /**
     * <p>Observes a directory entry. Emits an event if the tracked directory is
     * changed (including the list of files on it), or removed. If <code>
     * recursive</code> is set to true, then also all accessible subdirectories will
     * be tracked. Observers are automatically removed once the extension is closed
     * or suspended, unless <code>entry</code> is retained using
     * <code>chrome.fileSystem.retainEntry</code>.</p><p>In such case of retained
     * entries, the observer stays active across restarts until
     * <code>unobserveEntry</code> is explicitly called. Note, that once the
     * <code>entry</code> is not retained anymore, the observer will be removed
     * automatically. Observed entries are also automatically restored when either
     * <code>getObservers</code> is called, or an observing event for it is
     * invoked.</p>
     * @param entry
     * @param recursive
     */
    export function observeDirectory(
      entry: DirectoryEntry,
      recursive?: boolean,
    ): void;

    /**
     * Unobserves a previously observed either a file or a directory.
     * @param entry
     */
    export function unobserveEntry(
      entry: Entry,
    ): void;

    /**
     * Lists all observed entries.
     * @param callback
     * @param callback.entries
     */
    export function getObservedEntries(
      callback: (
        entries: Entry[],
      ) => void,
    ): void;

    /**
     * Called when an observed entry is changed.
     */
    export const onEntryChanged: chrome.events.Event<
      /**
       * @param event
       */
      (
        event: EntryChangedEvent,
      ) => void
    >;

    /**
     * Called when an observed entry is removed.
     */
    export const onEntryRemoved: chrome.events.Event<
      /**
       * @param event
       */
      (
        event: EntryRemovedEvent,
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
   * Use the <code>chrome.hid</code> API to interact with connected HID devices.
   * This API provides access to HID operations from within the context of an
   * app.
 Using this API, apps can function as drivers for hardware devices.
   * Errors generated by this API are reported by setting
 {@link
   * runtime.lastError} and executing the function's regular callback. The
   * callback's regular parameters will be undefined in this case.
   * @chrome-permission hid
 */
  export namespace hid {
    export interface HidCollectionInfo {
      /**
       * HID usage page identifier.
       */
      usagePage: number;

      /**
       * Page-defined usage identifier.
       */
      usage: number;

      /**
       * Report IDs which belong to the collection and to its children.
       */
      reportIds: number[];
    }

    export interface HidDeviceInfo {
      /**
       * Opaque device ID.
       */
      deviceId: number;

      /**
       * Vendor ID.
       */
      vendorId: number;

      /**
       * Product ID.
       */
      productId: number;

      /**
       * Top-level collections from this device's report descriptors.
       */
      collections: HidCollectionInfo[];

      /**
       * Top-level collection's maximum input report size.
       */
      maxInputReportSize: number;

      /**
       * Top-level collection's maximum output report size.
       */
      maxOutputReportSize: number;

      /**
       * Top-level collection's maximum feature report size.
       */
      maxFeatureReportSize: number;
    }

    export interface HidConnectInfo {
      /**
       * The opaque ID used to identify this connection in all other functions.
       */
      connectionId: number;
    }

    export interface DeviceFilter {
      /**
       * Device vendor ID.
       */
      vendorId?: number;

      /**
       * Device product ID, only checked only if the vendor ID matches.
       */
      productId?: number;

      /**
       * HID usage page identifier.
       */
      usagePage?: number;

      /**
       * HID usage identifier, checked only if the HID usage page matches.
       */
      usage?: number;
    }

    export interface GetDevicesOptions {
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

    /**
     * Enumerate connected HID devices.
     * @param options The properties to search for on target devices.
     * @param callback
     * @param callback.devices
     */
    export function getDevices(
      options: GetDevicesOptions,
      callback: (
        devices: HidDeviceInfo[],
      ) => void,
    ): void;

    /**
     * Open a connection to an HID device for communication.
     * @param deviceId The {@link HidDeviceInfo.deviceId} of the device to open.
     * @param callback
     * @param callback.connection
     */
    export function connect(
      deviceId: number,
      callback: (
        connection: HidConnectInfo,
      ) => void,
    ): void;

    /**
     * Disconnect from a device. Invoking operations on a device after calling this
     * is safe but has no effect.
     * @param connectionId The <code>connectionId</code> returned by {@link connect}.
     * @param callback
     */
    export function disconnect(
      connectionId: number,
      callback?: () => void,
    ): void;

    /**
     * Receive the next input report from the device.
     * @param connectionId The <code>connectionId</code> returned by {@link connect}.
     * @param callback
     * @param callback.reportId The report ID or <code>0</code> if none.
     * @param callback.data The report data, the report ID prefix (if present) is removed.
     */
    export function receive(
      connectionId: number,
      callback: (
        reportId: number,
        data: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * <p>Send an output report to the device.</p><p><em>Note:</em> Do not include a
     * report ID prefix in <code>data</code>. It will be added if necessary.</p>
     * @param connectionId The <code>connectionId</code> returned by {@link connect}.
     * @param reportId The report ID to use, or <code>0</code> if none.
     * @param data The report data.
     * @param callback
     */
    export function send(
      connectionId: number,
      reportId: number,
      data: ArrayBuffer,
      callback: () => void,
    ): void;

    /**
     * Request a feature report from the device.
     * @param connectionId The <code>connectionId</code> returned by {@link connect}.
     * @param reportId The report ID, or <code>0</code> if none.
     * @param callback
     * @param callback.data The report data, including a report ID prefix if one is sent by the device.
     */
    export function receiveFeatureReport(
      connectionId: number,
      reportId: number,
      callback: (
        data: ArrayBuffer,
      ) => void,
    ): void;

    /**
     * <p>Send a feature report to the device.</p><p><em>Note:</em> Do not include a
     * report ID prefix in <code>data</code>. It will be added if necessary.</p>
     * @param connectionId The <code>connectionId</code> returned by {@link connect}.
     * @param reportId The report ID to use, or <code>0</code> if none.
     * @param data The report data.
     * @param callback
     */
    export function sendFeatureReport(
      connectionId: number,
      reportId: number,
      data: ArrayBuffer,
      callback: () => void,
    ): void;
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
       * if the user is not signed in.
       */
      email: string;

      /**
       * A unique identifier for the account. This ID will not change for the lifetime
       * of the account. Empty if the user is not signed in.
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
      details: TokenDetails,
      callback: (
        token?: string,
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
     * @param callback Called with an OAuth2 access token as specified by the manifest, or undefined if there was an error.
     * @param callback.token
     */
    export function getAuthToken(
      callback: (
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
      callback: () => void,
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
      type: "text" | "search" | "tel" | "url" | "email" | "number" | "password";

      /**
       * Whether the text field wants auto-correct.
       */
      autoCorrect: boolean;

      /**
       * Whether the text field wants auto-complete.
       */
      autoComplete: boolean;

      /**
       * Whether the text field wants spell-check.
       */
      spellCheck: boolean;
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
           * The type of the underline to modify this segment.
           */
          style: "underline" | "doubleUnderline" | "noUnderline",
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
       * @param screen The screen type under which the IME is activated.
       */
      (
        engineID: string,
        screen: "normal" | "login" | "lock" | "secondary-login",
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
   * extensions that <a href='override'>override</a> the built-in New Tab page.
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
       * How the extension was installed. One of<br><var>admin</var>: The extension
       * was installed because of an administrative policy,<br><var>development</var>:
       * The extension was loaded unpacked in developer mode,<br><var>normal</var>:
       * The extension was installed normally via a .crx file,<br><var>sideload</var>:
       * The extension was installed by other software on the
       * machine,<br><var>other</var>: The extension was installed by other means.
       */
      installType: "admin" | "development" | "normal" | "sideload" | "other";

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
         * Name of the search engine displayed to user. This may only be ommitted if
         * <em>prepopulated_id</em> is set.
         */
        name?: string,

        /**
         * Omnibox keyword for the search engine. This may only be ommitted if
         * <em>prepopulated_id</em> is set.
         */
        keyword?: string,

        /**
         * An icon URL for the search engine. This may only be ommitted if
         * <em>prepopulated_id</em> is set.
         */
        favicon_url?: string,

        /**
         * An search URL used by the search engine.
         */
        search_url: string,

        /**
         * Encoding of the search term. This may only be ommitted if
         * <em>prepopulated_id</em> is set.
         */
        encoding?: string,

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
   * Use the <code>chrome.mediaGalleries</code> API to access media files (audio,
   * images, video) from the user's local disks (with the user's consent).
   * @chrome-permission mediaGalleries
 */
  export namespace mediaGalleries {
    export type GalleryChangeType = "contents_changed" | "watch_dropped";

    export type GetMediaFileSystemsInteractivity = "no" | "yes" | "if_needed";

    export type GetMetadataType = "all" | "mimeTypeAndTags" | "mimeTypeOnly";

    export type ScanProgressType = "start" | "cancel" | "finish" | "error";

    export interface GalleryChangeDetails {
      /**
       * Type of change event.
       */
      type: GalleryChangeType;

      /**
       * Identifies the modified gallery.
       */
      galleryId: string;
    }

    export interface MediaFileSystemsDetails {
      /**
       * Whether to prompt the user for permission to additional media galleries
       * before returning the permitted set. Default is silent.  If the value 'yes' is
       * passed, or if the application has not been granted access to any media
       * galleries and the value 'if_needed' is passed, then the media gallery
       * configuration dialog will be displayed.
       */
      interactive?: GetMediaFileSystemsInteractivity;
    }

    export interface MediaMetadataOptions {
      /**
       * Specifies which subset of the metadata to retrieve. Defaults to 'all' if the
       * option is omitted.
       */
      metadataType?: GetMetadataType;
    }

    export interface MediaFileSystemMetadata {
      /**
       * The name of the file system.
       */
      name: string;

      /**
       * A unique and persistent id for the media gallery.
       */
      galleryId: string;

      /**
       * If the media gallery is on a removable device, a unique id for the device
       * while the device is online.
       */
      deviceId?: string;

      /**
       * True if the media gallery is on a removable device.
       */
      isRemovable: boolean;

      /**
       * True if the device the media gallery is on was detected as a media device.
       * i.e. a PTP or MTP device, or a DCIM directory is present.
       */
      isMediaDevice: boolean;

      /**
       * True if the device is currently available.
       */
      isAvailable: boolean;
    }

    export interface ScanProgressDetails {
      /**
       * The type of progress event, i.e. start, finish, etc.
       */
      type: ScanProgressType;

      /**
       * The number of Galleries found.
       */
      galleryCount?: number;

      /**
       * Appoximate number of media files found; some file types can be either audio
       * or video and are included in both counts.
       */
      audioCount?: number;

      imageCount?: number;

      videoCount?: number;
    }

    export interface StreamInfo {
      /**
       * Describes format of container or codec of stream, i.e. "mp3", "h264".
       */
      type: string;

      /**
       * An unfiltered string->string dictionary of tags for the stream.
       */
      tags: {[name: string]: any};
    }

    export interface MediaMetadata {
      /**
       * The browser sniffed mime type.
       */
      mimeType: string;

      /**
       * Defined for images and video. In pixels.
       */
      height?: number;

      width?: number;

      /**
       * Defined for images only.
       */
      xResolution?: number;

      yResolution?: number;

      /**
       * Defined for audio and video. In seconds.
       */
      duration?: number;

      /**
       * Defined for images and video. In degrees.
       */
      rotation?: number;

      /**
       * Defined for images only.
       */
      cameraMake?: string;

      cameraModel?: string;

      exposureTimeSeconds?: number;

      flashFired?: boolean;

      fNumber?: number;

      focalLengthMm?: number;

      isoEquivalent?: number;

      /**
       * Defined for audio and video only.
       */
      album?: string;

      artist?: string;

      comment?: string;

      copyright?: string;

      disc?: number;

      genre?: string;

      language?: string;

      title?: string;

      track?: number;

      /**
       * All the metadata in the media file. For formats with multiple streams, stream
       * order will be preserved. Container metadata is the first element.
       */
      rawTags: StreamInfo[];

      /**
       * The images embedded in the media file's metadata. This is most often used for
       * album art or video thumbnails.
       */
      attachedImages: Blob[];
    }

    export interface AddGalleryWatchResult {
      galleryId: string;

      success: boolean;
    }

    /**
     * Get the media galleries configured in this user agent. If none are configured
     * or available, the callback will receive an empty array.
     * @param details
     * @param callback
     * @param callback.mediaFileSystems
     */
    export function getMediaFileSystems(
      details: MediaFileSystemsDetails,
      callback: (
        mediaFileSystems: DOMFileSystem[],
      ) => void,
    ): void;

    /**
     * Get the media galleries configured in this user agent. If none are configured
     * or available, the callback will receive an empty array.
     * @param callback
     * @param callback.mediaFileSystems
     */
    export function getMediaFileSystems(
      callback: (
        mediaFileSystems: DOMFileSystem[],
      ) => void,
    ): void;

    /**
     * Present a directory picker to the user and add the selected directory as a
     * gallery. If the user cancels the picker, selectedFileSystemName will be
     * empty. A user gesture is required for the dialog to display. Without a user
     * gesture, the callback will run as though the user canceled.
     * @param callback
     * @param callback.mediaFileSystems
     * @param callback.selectedFileSystemName
     */
    export function addUserSelectedFolder(
      callback: (
        mediaFileSystems: DOMFileSystem[],
        selectedFileSystemName: string,
      ) => void,
    ): void;

    /**
     * Give up access to a given media gallery.
     * @param galleryId
     * @param callback
     */
    export function dropPermissionForMediaFileSystem(
      galleryId: string,
      callback?: () => void,
    ): void;

    /**
     * Start a scan of the user's hard disks for directories containing media. The
     * scan may take a long time so progress and completion is communicated by
     * events. No permission is granted as a result of the scan, see addScanResults.
     */
    export function startMediaScan(): void;

    /**
     * Cancel any pending media scan.  Well behaved apps should provide a way for
     * the user to cancel scans they start.
     */
    export function cancelMediaScan(): void;

    /**
     * Show the user the scan results and let them add any or all of them as
     * galleries. This should be used after the 'finish' onScanProgress() event has
     * happened. All galleries the app has access to are returned, not just the
     * newly added galleries.
     * @param callback
     * @param callback.mediaFileSystems
     */
    export function addScanResults(
      callback: (
        mediaFileSystems: DOMFileSystem[],
      ) => void,
    ): void;

    /**
     * Get metadata about a specific media file system.
     * @param mediaFileSystem
     */
    export function getMediaFileSystemMetadata(
      mediaFileSystem: DOMFileSystem,
    ): MediaFileSystemMetadata;

    /**
     * Get metadata for all available media galleries.
     * @param callback
     * @param callback.metadata
     */
    export function getAllMediaFileSystemMetadata(
      callback: (
        metadata: MediaFileSystemMetadata[],
      ) => void,
    ): void;

    /**
     * Gets the media-specific metadata for a media file. This should work for files
     * in media galleries as well as other DOM filesystems.
     * @param mediaFile
     * @param options
     * @param callback
     * @param callback.metadata
     */
    export function getMetadata(
      mediaFile: Blob,
      options: MediaMetadataOptions,
      callback: (
        metadata: MediaMetadata,
      ) => void,
    ): void;

    /**
     * Gets the media-specific metadata for a media file. This should work for files
     * in media galleries as well as other DOM filesystems.
     * @param mediaFile
     * @param callback
     * @param callback.metadata
     */
    export function getMetadata(
      mediaFile: Blob,
      callback: (
        metadata: MediaMetadata,
      ) => void,
    ): void;

    /**
     * Adds a gallery watch for the gallery with the specified gallery ID. The given
     * callback is then fired with a success or failure result.
     * @param galleryId
     * @param callback
     * @param callback.result
     */
    export function addGalleryWatch(
      galleryId: string,
      callback: (
        result: AddGalleryWatchResult,
      ) => void,
    ): void;

    /**
     * Removes a gallery watch for the gallery with the specified gallery ID.
     * @param galleryId
     */
    export function removeGalleryWatch(
      galleryId: string,
    ): void;

    /**
     * Notifies which galleries are being watched via the given callback.
     * @param callback
     * @param callback.galleryIds
     */
    export function getAllGalleryWatch(
      callback: (
        galleryIds: string[],
      ) => void,
    ): void;

    /**
     * Removes all gallery watches.
     */
    export function removeAllGalleryWatch(): void;

    /**
     * Fired when a media gallery is changed or a gallery watch is dropped.
     */
    export const onGalleryChanged: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: GalleryChangeDetails,
      ) => void
    >;

    /**
     * The pending media scan has changed state. See details for more
     * information.
     */
    export const onScanProgress: chrome.events.Event<
      /**
       * @param details
       */
      (
        details: ScanProgressDetails,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.notificationProvider</code> API to intercept
   * notifications that would otherwise go into the Chrome Notification Center,
   * get notifiers' information, and inform notifiers about users' actions on the
   * notifications.
   * @chrome-permission notificationProvider
 */
  export namespace notificationProvider {
    /**
     * whether notifications from this notifier is permitted or blocked.
     */
    export type NotifierPermissionLevel = "granted" | "denied";

    export type NotifierType = "application" | "web";

    export interface Notifier {
      /**
       * Id of the notifier.
       */
      notifierId: string;

      /**
       * Type of the notifier.
       */
      type: NotifierType;

      /**
       * Name of the notifier.
       */
      name: string;

      /**
       * Icon of the notifier.
       */
      notifierIcon: notifications.NotificationBitmap;

      /**
       * Permission level of the notifier.
       */
      permissionLevel: NotifierPermissionLevel;

      /**
       * If a notifier has advanced settings.
       */
      hasSettings: boolean;
    }

    /**
     * Inform the notifier that the user cleared a notification sent from that
     * notifier.
     * @param notifierId The id of the notifier that sent the notification.
     * @param notificationId The id of the notification that was closed.
     * @param callback Called to indicate whether a matching notification existed.
     * @param callback.wasCleared
     */
    export function notifyOnCleared(
      notifierId: string,
      notificationId: string,
      callback: (
        wasCleared: boolean,
      ) => void,
    ): void;

    /**
     * Inform the notifier that the user clicked in a non-button area of a
     * notification sent from that notifier.
     * @param notifierId The id of the notifier that sent the notification.
     * @param notificationId The id of the notification that was clicked on.
     * @param callback Called to indicate whether a matching notification existed.
     * @param callback.matchExists
     */
    export function notifyOnClicked(
      notifierId: string,
      notificationId: string,
      callback: (
        matchExists: boolean,
      ) => void,
    ): void;

    /**
     * Inform the notifier that the user pressed a button in the notification sent
     * from that notifier.
     * @param notifierId The id of the notifier that sent the notification.
     * @param notificationId The id of the notification that was clicked on its button.
     * @param buttonIndex The index of the button that was clicked.
     * @param callback Called to indicate whether a matching notification existed.
     * @param callback.matchExists
     */
    export function notifyOnButtonClicked(
      notifierId: string,
      notificationId: string,
      buttonIndex: number,
      callback: (
        matchExists: boolean,
      ) => void,
    ): void;

    /**
     * Inform the notifier that the user changed the permission level of that
     * notifier.
     * @param notifierId The id of the notifier that sent the notification.
     * @param notifierType The type of the notifier that sent the notification.
     * @param level The perission level of the notifier
     * @param callback Called to indicate whether the permission level was changed.
     * @param callback.wasChanged
     */
    export function notifyOnPermissionLevelChanged(
      notifierId: string,
      notifierType: NotifierType,
      level: NotifierPermissionLevel,
      callback: (
        wasChanged: boolean,
      ) => void,
    ): void;

    /**
     * Inform the notifier that the user chose to see advanced settings of that
     * notifier.
     * @param notifierId The id of the notifier that sent the notification.
     * @param notifierType The type of the notifier that sent the notification.
     * @param callback Called to indicate whether the notifier has extra settings.
     * @param callback.hasSettings
     */
    export function notifyOnShowSettings(
      notifierId: string,
      notifierType: NotifierType,
      callback: (
        hasSettings: boolean,
      ) => void,
    ): void;

    /**
     * To get a notifier from it's notifier ID.
     * @param callback Returns the notifier object of the given ID.
     * @param callback.notifier
     */
    export function getNotifier(
      callback: (
        notifier: Notifier,
      ) => void,
    ): void;

    /**
     * To get all the notifiers that could send notifications.
     * @param callback Returns the set of notifiers currently in the system.
     * @param callback.notifiers
     */
    export function getAllNotifiers(
      callback: (
        notifiers: Notifier[],
      ) => void,
    ): void;

    /**
     * A new notification is created.
     */
    export const onCreated: chrome.events.Event<
      /**
       * @param notifierId The id of the notifier that sent the new notification.
       * @param notificationId The id of the newly created notification.
       * @param options The content of the notification: type, title, message etc.
       */
      (
        notifierId: string,
        notificationId: string,
        options: notifications.NotificationOptions,
      ) => void
    >;

    /**
     * A notification is updated by the notifier.
     */
    export const onUpdated: chrome.events.Event<
      /**
       * @param notifierId The id of the notifier that sent the updated notification.
       * @param notificationId The id of the updated notification.
       * @param options The content of the notification: type, title, message etc.
       */
      (
        notifierId: string,
        notificationId: string,
        options: notifications.NotificationOptions,
      ) => void
    >;

    /**
     * A notification is cleared by the notifier.
     */
    export const onCleared: chrome.events.Event<
      /**
       * @param notifierId The id of the notifier that cleared the notification.
       * @param notificationId The id of the cleared notification.
       */
      (
        notifierId: string,
        notificationId: string,
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
       * <p>A URL to the sender's avatar, app icon, or a thumbnail for image
       * notifications.</p><p>URLs can be a data URL, a blob URL, or a URL relative to
       * a resource within this extension's .crx file <em>Required for {@link
       * notifications.create}</em> method.</p>
       */
      iconUrl?: string;

      iconBitmap?: NotificationBitmap;

      /**
       * A URL to the app icon mask. URLs have the same restrictions as {@link
       * notifications.NotificationOptions.iconUrl iconUrl}.  The app icon mask should
       * be in alpha channel, as only the alpha channel of the image will be
       * considered.
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
       * A URL to the image thumbnail for image-type notifications. URLs have the same
       * restrictions as  {@link notifications.NotificationOptions.iconUrl iconUrl}.
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
       * match</match></dim>. You must escape the five predefined entities to display
       * them as text: stackoverflow.com/a/1091953/89484
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
   * This API exposes events used by print manager to query printers controlled
   * by extensions, to query capabilities of them and to submit print jobs to
   * these printers.
   */
  export namespace printerProvider {
    /**
     * Error codes used by providing extensions in response to requests.
     */
    export type PrintError = "OK" | "FAILED" | "INVALID_TICKET" | "INVALID_DATA";

    export interface PrinterInfo {
      /**
       * Unique ID of printer.
       */
      id: string;

      /**
       * Human readable display name of printer.
       */
      name: string;

      /**
       * Human readable description of printer.
       */
      description?: string;
    }

    export interface PrintJob {
      /**
       * ID of the printer to submit the job.
       */
      printerId: string;

      /**
       * print ticket in CJT format described at
       * https://developers.google.com/cloud-print/docs/cdd#cjt
       */
      ticket: {[name: string]: any};

      /**
       * Content type of the document. Supported formats are "application/pdf" and
       * "image/pwg-raster".
       */
      contentType: string;

      /**
       * Buffer with document to printer. Format must match |contentType|.
       */
      document: ArrayBuffer;
    }

    /**
     * Event fired when print manager requests printers provided by extension.
     */
    export const onGetPrintersRequested: chrome.events.Event<
      (
        resultCallback: (
          printerInfo: PrinterInfo[],
        ) => void,
      ) => void
    >;

    /**
     * Event fired when print manager requests printer capabilities.
     */
    export const onGetCapabilityRequested: chrome.events.Event<
      /**
       * @param printerId unique ID of the printer.
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
       * @param printJob parameters of printing request.
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
   * API relies on the <a href='types#ChromeSetting'>ChromeSetting prototype of
   * the type API</a> for getting and setting the proxy configuration.
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
   * The <code>chrome.pushMessaging</code> API is deprecated since Chrome 38,
 and
   * will no longer be supported in Chrome 41.
 Switch to <code>{@link gcm
   * chrome.gcm}</code> to take advantage of
 <a href="cloudMessaging.html">Google
   * Cloud Messaging</a>.
   * @deprecated Use {@link gcm chrome.gcm} API
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
     * @deprecated Use {@link gcm chrome.gcm} API
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
     * @deprecated Use {@link gcm chrome.gcm} API
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
       * @deprecated Use {@link gcm chrome.gcm} API
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
       * The URL of the page or frame that opened the connection. If the sender is in
       * an iframe or webview, it will be iframe's or webview's URL, not the URL of
       * the page which hosts them.
       */
      url?: string;

      /**
       * The TLS channel ID of the page or frame that opened the connection, if
       * requested by the extension or app, and if available.
       */
      tlsChannelId?: string;
    }

    /**
     * An object containing information about the current platform.
     */
    export interface PlatformInfo {
      /**
       * The operating system chrome is running on.
       */
      os: "mac" | "win" | "android" | "cros" | "linux" | "openbsd";

      /**
       * The machine's processor architecture.
       */
      arch: "arm" | "x86-32" | "x86-64";

      /**
       * The native client architecture. This may be different from arch on some
       * platforms.
       */
      nacl_arch: "arm" | "x86-32" | "x86-64";
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
     * script. Extensions may connect to content scripts embedded in tabs via <a
     * href="extensions/tabs#method-connect">tabs.connect</a>.
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
     * to content scripts, use <a
     * href="extensions/tabs#method-sendMessage">tabs.sendMessage</a>.
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
     * to content scripts, use <a
     * href="extensions/tabs#method-sendMessage">tabs.sendMessage</a>.
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
          reason: "install" | "update" | "chrome_update" | "shared_module_update",

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
   * Use the <code>chrome.serial</code> API to read from and write to a device
   * connected to a serial port.
   * @chrome-permission serial
 */
  export namespace serial {
    export interface DeviceInfo {
      /**
       * The device's system path. This should be passed as the <code>path</code>
       * argument to <code>chrome.serial.connect</code> in order to connect to this
       * device.
       */
      path: string;

      /**
       * A PCI or USB vendor ID if one can be determined for the underlying device.
       */
      vendorId?: number;

      /**
       * A USB product ID if one can be determined for the underlying device.
       */
      productId?: number;

      /**
       * A human-readable display name for the underlying device if one can be queried
       * from the host driver.
       */
      displayName?: string;
    }

    export type DataBits = "seven" | "eight";

    export type ParityBit = "no" | "odd" | "even";

    export type StopBits = "one" | "two";

    export interface ConnectionOptions {
      /**
       * Flag indicating whether or not the connection should be left open when the
       * application is suspended (see <a
       * href="http://developer.chrome.com/apps/app_lifecycle.html">Manage App
       * Lifecycle</a>). The default value is "false." When the application is loaded,
       * any serial connections previously opened with persistent=true can be fetched
       * with <code>getConnections</code>.
       */
      persistent?: boolean;

      /**
       * An application-defined string to associate with the connection.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. The default value is 4096.
       */
      bufferSize?: number;

      /**
       * The requested bitrate of the connection to be opened. For compatibility with
       * the widest range of hardware, this number should match one of
       * commonly-available bitrates, such as 110, 300, 1200, 2400, 4800, 9600, 14400,
       * 19200, 38400, 57600, 115200. There is no guarantee, of course, that the
       * device connected to the serial port will support the requested bitrate, even
       * if the port itself supports that bitrate. <code>9600</code> will be passed by
       * default.
       */
      bitrate?: number;

      /**
       * <code>"eight"</code> will be passed by default.
       */
      dataBits?: DataBits;

      /**
       * <code>"no"</code> will be passed by default.
       */
      parityBit?: ParityBit;

      /**
       * <code>"one"</code> will be passed by default.
       */
      stopBits?: StopBits;

      /**
       * Flag indicating whether or not to enable RTS/CTS hardware flow control.
       * Defaults to false.
       */
      ctsFlowControl?: boolean;

      /**
       * The maximum amount of time (in milliseconds) to wait for new data before
       * raising an <code>onReceiveError</code> event with a "timeout" error. If zero,
       * receive timeout errors will not be raised for the connection. Defaults to 0.
       */
      receiveTimeout?: number;

      /**
       * The maximum amount of time (in milliseconds) to wait for a <code>send</code>
       * operation to complete before calling the callback with a "timeout" error. If
       * zero, send timeout errors will not be triggered. Defaults to 0.
       */
      sendTimeout?: number;
    }

    export interface ConnectionInfo {
      /**
       * The id of the serial port connection.
       */
      connectionId: number;

      /**
       * Flag indicating whether the connection is blocked from firing onReceive
       * events.
       */
      paused: boolean;

      /**
       * See <code>ConnectionOptions.persistent</code>
       */
      persistent: boolean;

      /**
       * See <code>ConnectionOptions.name</code>
       */
      name: string;

      /**
       * See <code>ConnectionOptions.bufferSize</code>
       */
      bufferSize: number;

      /**
       * See <code>ConnectionOptions.receiveTimeout</code>
       */
      receiveTimeout: number;

      /**
       * See <code>ConnectionOptions.sendTimeout</code>
       */
      sendTimeout: number;

      /**
       * See <code>ConnectionOptions.bitrate</code>. This field may be omitted or
       * inaccurate if a non-standard bitrate is in use, or if an error occurred while
       * querying the underlying device.
       */
      bitrate?: number;

      /**
       * See <code>ConnectionOptions.dataBits</code>. This field may be omitted if an
       * error occurred while querying the underlying device.
       */
      dataBits?: DataBits;

      /**
       * See <code>ConnectionOptions.parityBit</code>. This field may be omitted if an
       * error occurred while querying the underlying device.
       */
      parityBit?: ParityBit;

      /**
       * See <code>ConnectionOptions.stopBits</code>. This field may be omitted if an
       * error occurred while querying the underlying device.
       */
      stopBits?: StopBits;

      /**
       * See <code>ConnectionOptions.ctsFlowControl</code>. This field may be omitted
       * if an error occurred while querying the underlying device.
       */
      ctsFlowControl?: boolean;
    }

    export type SendError = "disconnected" | "pending" | "timeout" | "system_error";

    export interface SendInfo {
      /**
       * The number of bytes sent.
       */
      bytesSent: number;

      /**
       * An error code if an error occurred.
       */
      error?: SendError;
    }

    export interface HostControlSignals {
      /**
       * DTR (Data Terminal Ready).
       */
      dtr?: boolean;

      /**
       * RTS (Request To Send).
       */
      rts?: boolean;
    }

    export interface DeviceControlSignals {
      /**
       * DCD (Data Carrier Detect) or RLSD (Receive Line Signal/ Detect).
       */
      dcd: boolean;

      /**
       * CTS (Clear To Send).
       */
      cts: boolean;

      /**
       * RI (Ring Indicator).
       */
      ri: boolean;

      /**
       * DSR (Data Set Ready).
       */
      dsr: boolean;
    }

    export interface ReceiveInfo {
      /**
       * The connection identifier.
       */
      connectionId: number;

      /**
       * The data received.
       */
      data: ArrayBuffer;
    }

    export type ReceiveError = "disconnected" | "timeout" | "device_lost" | "system_error";

    export interface ReceiveErrorInfo {
      /**
       * The connection identifier.
       */
      connectionId: number;

      /**
       * An error code indicating what went wrong.
       */
      error: ReceiveError;
    }

    /**
     * Returns information about available serial devices on the system. The list is
     * regenerated each time this method is called.
     * @param callback Called with the list of <code>DeviceInfo</code> objects.
     * @param callback.ports
     */
    export function getDevices(
      callback: (
        ports: DeviceInfo[],
      ) => void,
    ): void;

    /**
     * Connects to a given serial port.
     * @param path The system path of the serial port to open.
     * @param options Port configuration options.
     * @param callback Called when the connection has been opened.
     * @param callback.connectionInfo
     */
    export function connect(
      path: string,
      options: ConnectionOptions,
      callback: (
        connectionInfo: ConnectionInfo,
      ) => void,
    ): void;

    /**
     * Connects to a given serial port.
     * @param path The system path of the serial port to open.
     * @param callback Called when the connection has been opened.
     * @param callback.connectionInfo
     */
    export function connect(
      path: string,
      callback: (
        connectionInfo: ConnectionInfo,
      ) => void,
    ): void;

    /**
     * Update the option settings on an open serial port connection.
     * @param connectionId The id of the opened connection.
     * @param options Port configuration options.
     * @param callback Called when the configuation has completed.
     * @param callback.result
     */
    export function update(
      connectionId: number,
      options: ConnectionOptions,
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Disconnects from a serial port.
     * @param connectionId The id of the opened connection.
     * @param callback Called when the connection has been closed.
     * @param callback.result
     */
    export function disconnect(
      connectionId: number,
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Pauses or unpauses an open connection.
     * @param connectionId The id of the opened connection.
     * @param paused Flag to indicate whether to pause or unpause.
     * @param callback Called when the connection has been successfully paused or              unpaused.
     */
    export function setPaused(
      connectionId: number,
      paused: boolean,
      callback: () => void,
    ): void;

    /**
     * Retrieves the state of a given connection.
     * @param connectionId The id of the opened connection.
     * @param callback Called with connection state information when available.
     * @param callback.connectionInfo
     */
    export function getInfo(
      connectionId: number,
      callback: (
        connectionInfo: ConnectionInfo,
      ) => void,
    ): void;

    /**
     * Retrieves the list of currently opened serial port connections owned by the
     * application.
     * @param callback Called with the list of connections when available.
     * @param callback.connectionInfos
     */
    export function getConnections(
      callback: (
        connectionInfos: ConnectionInfo[],
      ) => void,
    ): void;

    /**
     * Writes data to the given connection.
     * @param connectionId The id of the connection.
     * @param data The data to send.
     * @param callback Called when the operation has completed.
     * @param callback.sendInfo
     */
    export function send(
      connectionId: number,
      data: ArrayBuffer,
      callback: (
        sendInfo: SendInfo,
      ) => void,
    ): void;

    /**
     * Flushes all bytes in the given connection's input and output buffers.
     * @param connectionId
     * @param callback
     * @param callback.result
     */
    export function flush(
      connectionId: number,
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Retrieves the state of control signals on a given connection.
     * @param connectionId The id of the connection.
     * @param callback Called when the control signals are available.
     * @param callback.signals
     */
    export function getControlSignals(
      connectionId: number,
      callback: (
        signals: DeviceControlSignals,
      ) => void,
    ): void;

    /**
     * Sets the state of control signals on a given connection.
     * @param connectionId The id of the connection.
     * @param signals The set of signal changes to send to the device.
     * @param callback Called once the control signals have been set.
     * @param callback.result
     */
    export function setControlSignals(
      connectionId: number,
      signals: HostControlSignals,
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Event raised when data has been read from the connection.
     */
    export const onReceive: chrome.events.Event<
      /**
       * @param info Event data.
       */
      (
        info: ReceiveInfo,
      ) => void
    >;

    /**
     * Event raised when an error occurred while the runtime was waiting for
     * data on the serial port. Once this event is raised, the connection may be
     * set to <code>paused</code>. A <code>"timeout"</code> error does not pause
     * the connection.
     */
    export const onReceiveError: chrome.events.Event<
      /**
       * @param info
       */
      (
        info: ReceiveErrorInfo,
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
   * Use the <code>chrome.socket</code> API to send and receive data over the
   * network using TCP and UDP connections. <b>Note:</b> Starting with Chrome 33,
   * this API is deprecated in favor of the {@link sockets.udp}, {@link
   * sockets.tcp} and
 {@link sockets.tcpServer} APIs.
   * @chrome-permission socket
 */
  export namespace socket {
    export type SocketType = "tcp" | "udp";

    export interface CreateOptions {
    }

    export interface CreateInfo {
      /**
       * The id of the newly created socket.
       */
      socketId: number;
    }

    export interface AcceptInfo {
      resultCode: number;

      /**
       * The id of the accepted socket.
       */
      socketId?: number;
    }

    export interface ReadInfo {
      /**
       * The resultCode returned from the underlying read() call.
       */
      resultCode: number;

      data: ArrayBuffer;
    }

    export interface WriteInfo {
      /**
       * The number of bytes sent, or a negative error code.
       */
      bytesWritten: number;
    }

    export interface RecvFromInfo {
      /**
       * The resultCode returned from the underlying recvfrom() call.
       */
      resultCode: number;

      data: ArrayBuffer;

      /**
       * The address of the remote machine.
       */
      address: string;

      port: number;
    }

    export interface SocketInfo {
      /**
       * The type of the passed socket. This will be <code>tcp</code> or
       * <code>udp</code>.
       */
      socketType: SocketType;

      /**
       * <p>Whether or not the underlying socket is connected.</p><p>For
       * <code>tcp</code> sockets, this will remain true even if the remote peer has
       * disconnected. Reading or writing to the socket may then result in an error,
       * hinting that this socket should be disconnected via
       * <code>disconnect()</code>.</p><p>For <code>udp</code> sockets, this just
       * represents whether a default remote address has been specified for reading
       * and writing packets.</p>
       */
      connected: boolean;

      /**
       * If the underlying socket is connected, contains the IPv4/6 address of the
       * peer.
       */
      peerAddress?: string;

      /**
       * If the underlying socket is connected, contains the port of the connected
       * peer.
       */
      peerPort?: number;

      /**
       * If the underlying socket is bound or connected, contains its local IPv4/6
       * address.
       */
      localAddress?: string;

      /**
       * If the underlying socket is bound or connected, contains its local port.
       */
      localPort?: number;
    }

    export interface NetworkInterface {
      /**
       * The underlying name of the adapter. On *nix, this will typically be "eth0",
       * "lo", etc.
       */
      name: string;

      /**
       * The available IPv4/6 address.
       */
      address: string;

      /**
       * The prefix length
       */
      prefixLength: number;
    }

    export interface TLSVersionConstraints {
      /**
       * The minimum and maximum acceptable versions of TLS. These will be
       * <code>ssl3</code>, <code>tls1</code>, <code>tls1.1</code>, or
       * <code>tls1.2</code>.
       */
      min?: string;

      max?: string;
    }

    export interface SecureOptions {
      tlsVersion?: TLSVersionConstraints;
    }

    /**
     * Creates a socket of the specified type that will connect to the specified
     * remote machine.
     * @param type The type of socket to create. Must be <code>tcp</code> or <code>udp</code>.
     * @param options The socket options.
     * @param callback Called when the socket has been created.
     * @param callback.createInfo
     */
    export function create(
      type: SocketType,
      options: CreateOptions,
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Creates a socket of the specified type that will connect to the specified
     * remote machine.
     * @param type The type of socket to create. Must be <code>tcp</code> or <code>udp</code>.
     * @param callback Called when the socket has been created.
     * @param callback.createInfo
     */
    export function create(
      type: SocketType,
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Destroys the socket. Each socket created should be destroyed after use.
     * @param socketId The socketId.
     */
    export function destroy(
      socketId: number,
    ): void;

    /**
     * Connects the socket to the remote machine (for a <code>tcp</code> socket).
     * For a <code>udp</code> socket, this sets the default address which packets
     * are sent to and read from for <code>read()</code> and <code>write()</code>
     * calls.
     * @param socketId The socketId.
     * @param hostname The hostname or IP address of the remote machine.
     * @param port The port of the remote machine.
     * @param callback Called when the connection attempt is complete.
     * @param callback.result
     */
    export function connect(
      socketId: number,
      hostname: string,
      port: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Binds the local address for socket. Currently, it does not support TCP
     * socket.
     * @param socketId The socketId.
     * @param address The address of the local machine.
     * @param port The port of the local machine.
     * @param callback Called when the bind attempt is complete.
     * @param callback.result
     */
    export function bind(
      socketId: number,
      address: string,
      port: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Disconnects the socket. For UDP sockets, <code>disconnect</code> is a
     * non-operation but is safe to call.
     * @param socketId The socketId.
     */
    export function disconnect(
      socketId: number,
    ): void;

    /**
     * Reads data from the given connected socket.
     * @param socketId The socketId.
     * @param bufferSize The read buffer size.
     * @param callback Delivers data that was available to be read without blocking.
     * @param callback.readInfo
     */
    export function read(
      socketId: number,
      bufferSize: number,
      callback: (
        readInfo: ReadInfo,
      ) => void,
    ): void;

    /**
     * Reads data from the given connected socket.
     * @param socketId The socketId.
     * @param callback Delivers data that was available to be read without blocking.
     * @param callback.readInfo
     */
    export function read(
      socketId: number,
      callback: (
        readInfo: ReadInfo,
      ) => void,
    ): void;

    /**
     * Writes data on the given connected socket.
     * @param socketId The socketId.
     * @param data The data to write.
     * @param callback Called when the write operation completes without blocking or an error occurs.
     * @param callback.writeInfo
     */
    export function write(
      socketId: number,
      data: ArrayBuffer,
      callback: (
        writeInfo: WriteInfo,
      ) => void,
    ): void;

    /**
     * Receives data from the given UDP socket.
     * @param socketId The socketId.
     * @param bufferSize The receive buffer size.
     * @param callback Returns result of the recvFrom operation.
     * @param callback.recvFromInfo
     */
    export function recvFrom(
      socketId: number,
      bufferSize: number,
      callback: (
        recvFromInfo: RecvFromInfo,
      ) => void,
    ): void;

    /**
     * Receives data from the given UDP socket.
     * @param socketId The socketId.
     * @param callback Returns result of the recvFrom operation.
     * @param callback.recvFromInfo
     */
    export function recvFrom(
      socketId: number,
      callback: (
        recvFromInfo: RecvFromInfo,
      ) => void,
    ): void;

    /**
     * Sends data on the given UDP socket to the given address and port.
     * @param socketId The socketId.
     * @param data The data to write.
     * @param address The address of the remote machine.
     * @param port The port of the remote machine.
     * @param callback Called when the send operation completes without blocking or an error occurs.
     * @param callback.writeInfo
     */
    export function sendTo(
      socketId: number,
      data: ArrayBuffer,
      address: string,
      port: number,
      callback: (
        writeInfo: WriteInfo,
      ) => void,
    ): void;

    /**
     * This method applies to TCP sockets only. Listens for connections on the
     * specified port and address. This effectively makes this a server socket, and
     * client socket functions (connect, read, write) can no longer be used on this
     * socket.
     * @param socketId The socketId.
     * @param address The address of the local machine.
     * @param port The port of the local machine.
     * @param backlog Length of the socket's listen queue.
     * @param callback Called when listen operation completes.
     * @param callback.result
     */
    export function listen(
      socketId: number,
      address: string,
      port: number,
      backlog: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * This method applies to TCP sockets only. Listens for connections on the
     * specified port and address. This effectively makes this a server socket, and
     * client socket functions (connect, read, write) can no longer be used on this
     * socket.
     * @param socketId The socketId.
     * @param address The address of the local machine.
     * @param port The port of the local machine.
     * @param callback Called when listen operation completes.
     * @param callback.result
     */
    export function listen(
      socketId: number,
      address: string,
      port: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * This method applies to TCP sockets only. Registers a callback function to be
     * called when a connection is accepted on this listening server socket. Listen
     * must be called first. If there is already an active accept callback, this
     * callback will be invoked immediately with an error as the resultCode.
     * @param socketId The socketId.
     * @param callback The callback is invoked when a new socket is accepted.
     * @param callback.acceptInfo
     */
    export function accept(
      socketId: number,
      callback: (
        acceptInfo: AcceptInfo,
      ) => void,
    ): void;

    /**
     * Enables or disables the keep-alive functionality for a TCP connection.
     * @param socketId The socketId.
     * @param enable If true, enable keep-alive functionality.
     * @param delay Set the delay seconds between the last data packet received and the first keepalive probe. Default is 0.
     * @param callback Called when the setKeepAlive attempt is complete.
     * @param callback.result
     */
    export function setKeepAlive(
      socketId: number,
      enable: boolean,
      delay: number,
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Enables or disables the keep-alive functionality for a TCP connection.
     * @param socketId The socketId.
     * @param enable If true, enable keep-alive functionality.
     * @param callback Called when the setKeepAlive attempt is complete.
     * @param callback.result
     */
    export function setKeepAlive(
      socketId: number,
      enable: boolean,
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Sets or clears <code>TCP_NODELAY</code> for a TCP connection. Nagle's
     * algorithm will be disabled when <code>TCP_NODELAY</code> is set.
     * @param socketId The socketId.
     * @param noDelay If true, disables Nagle's algorithm.
     * @param callback Called when the setNoDelay attempt is complete.
     * @param callback.result
     */
    export function setNoDelay(
      socketId: number,
      noDelay: boolean,
      callback: (
        result: boolean,
      ) => void,
    ): void;

    /**
     * Retrieves the state of the given socket.
     * @param socketId The socketId.
     * @param callback Called when the state is available.
     * @param callback.result
     */
    export function getInfo(
      socketId: number,
      callback: (
        result: SocketInfo,
      ) => void,
    ): void;

    /**
     * Retrieves information about local adapters on this system.
     * @param callback Called when local adapter information is available.
     * @param callback.result
     */
    export function getNetworkList(
      callback: (
        result: NetworkInterface[],
      ) => void,
    ): void;

    /**
     * Join the multicast group and start to receive packets from that group. The
     * socket must be of UDP type and must be bound to a local port before calling
     * this method.
     * @param socketId The socketId.
     * @param address The group address to join. Domain names are not supported.
     * @param callback Called when the join group operation is done with an integer parameter indicating the platform-independent error code.
     * @param callback.result
     */
    export function joinGroup(
      socketId: number,
      address: string,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * <p>Leave the multicast group previously joined using <code>joinGroup</code>.
     * It's not necessary to leave the multicast group before destroying the socket
     * or exiting. This is automatically called by the OS.</p><p>Leaving the group
     * will prevent the router from sending multicast datagrams to the local host,
     * presuming no other process on the host is still joined to the group.</p>
     * @param socketId The socketId.
     * @param address The group address to leave. Domain names are not supported.
     * @param callback Called when the leave group operation is done with an integer parameter indicating the platform-independent error code.
     * @param callback.result
     */
    export function leaveGroup(
      socketId: number,
      address: string,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * <p>Set the time-to-live of multicast packets sent to the multicast
     * group.</p><p>Calling this method does not require multicast permissions.</p>
     * @param socketId The socketId.
     * @param ttl The time-to-live value.
     * @param callback Called when the configuration operation is done.
     * @param callback.result
     */
    export function setMulticastTimeToLive(
      socketId: number,
      ttl: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * <p>Set whether multicast packets sent from the host to the multicast group
     * will be looped back to the host.</p><p>Note: the behavior of
     * <code>setMulticastLoopbackMode</code> is slightly different between Windows
     * and Unix-like systems. The inconsistency happens only when there is more than
     * one application on the same host joined to the same multicast group while
     * having different settings on multicast loopback mode. On Windows, the
     * applications with loopback off will not RECEIVE the loopback packets; while
     * on Unix-like systems, the applications with loopback off will not SEND the
     * loopback packets to other applications on the same host. See MSDN:
     * http://goo.gl/6vqbj</p><p>Calling this method does not require multicast
     * permissions.</p>
     * @param socketId The socketId.
     * @param enabled Indicate whether to enable loopback mode.
     * @param callback Called when the configuration operation is done.
     * @param callback.result
     */
    export function setMulticastLoopbackMode(
      socketId: number,
      enabled: boolean,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Get the multicast group addresses the socket is currently joined to.
     * @param socketId The socketId.
     * @param callback Called with an array of strings of the result.
     * @param callback.groups
     */
    export function getJoinedGroups(
      socketId: number,
      callback: (
        groups: string[],
      ) => void,
    ): void;

    /**
     * Start a TLS client connection over a connected TCP client socket.
     * @param socketId The connected socket to use.
     * @param options Constraints and parameters for the TLS connection.
     * @param callback Called when the TLS connection attempt is complete.
     * @param callback.result
     */
    export function secure(
      socketId: number,
      options: SecureOptions,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Start a TLS client connection over a connected TCP client socket.
     * @param socketId The connected socket to use.
     * @param callback Called when the TLS connection attempt is complete.
     * @param callback.result
     */
    export function secure(
      socketId: number,
      callback: (
        result: number,
      ) => void,
    ): void;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.sockets.tcpServer</code> API to create server
   * applications using TCP connections. This API supersedes the TCP
   * functionality
 previously found in the <code>chrome.socket</code> API.
   */
  export namespace sockets.tcpServer {
    export interface SocketProperties {
      /**
       * Flag indicating if the socket remains open when the event page of the
       * application is unloaded (see <a
       * href="http://developer.chrome.com/apps/app_lifecycle.html">Manage App
       * Lifecycle</a>). The default value is "false." When the application is loaded,
       * any sockets previously opened with persistent=true can be fetched with
       * <code>getSockets</code>.
       */
      persistent?: boolean;

      /**
       * An application-defined string associated with the socket.
       */
      name?: string;
    }

    export interface CreateInfo {
      /**
       * The ID of the newly created server socket. Note that socket IDs created from
       * this API are not compatible with socket IDs created from other APIs, such as
       * the deprecated <code>{@link socket}</code> API.
       */
      socketId: number;
    }

    export interface SocketInfo {
      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * Flag indicating if the socket remains open when the event page of the
       * application is unloaded (see <code>SocketProperties.persistent</code>). The
       * default value is "false".
       */
      persistent: boolean;

      /**
       * Application-defined string associated with the socket.
       */
      name?: string;

      /**
       * Flag indicating whether connection requests on a listening socket are
       * dispatched through the <code>onAccept</code> event or queued up in the listen
       * queue backlog. See <code>setPaused</code>. The default value is "false".
       */
      paused: boolean;

      /**
       * If the socket is listening, contains its local IPv4/6 address.
       */
      localAddress?: string;

      /**
       * If the socket is listening, contains its local port.
       */
      localPort?: number;
    }

    export interface AcceptInfo {
      /**
       * The server socket identifier.
       */
      socketId: number;

      /**
       * The client socket identifier, i.e. the socket identifier of the newly
       * established connection. This socket identifier should be used only with
       * functions from the <code>chrome.sockets.tcp</code> namespace. Note the client
       * socket is initially paused and must be explictly un-paused by the application
       * to start receiving data.
       */
      clientSocketId: number;
    }

    export interface AcceptErrorInfo {
      /**
       * The server socket identifier.
       */
      socketId: number;

      /**
       * The result code returned from the underlying network call.
       */
      resultCode: number;
    }

    /**
     * Creates a TCP server socket.
     * @param properties The socket properties (optional).
     * @param callback Called when the socket has been created.
     * @param callback.createInfo The result of the socket creation.
     */
    export function create(
      properties: SocketProperties,
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Creates a TCP server socket.
     * @param callback Called when the socket has been created.
     * @param callback.createInfo The result of the socket creation.
     */
    export function create(
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Updates the socket properties.
     * @param socketId The socket identifier.
     * @param properties The properties to update.
     * @param callback Called when the properties are updated.
     */
    export function update(
      socketId: number,
      properties: SocketProperties,
      callback?: () => void,
    ): void;

    /**
     * Enables or disables a listening socket from accepting new connections. When
     * paused, a listening socket accepts new connections until its backlog (see
     * <code>listen</code> function) is full then refuses additional connection
     * requests. <code>onAccept</code> events are raised only when the socket is
     * un-paused.
     * @param socketId
     * @param paused
     * @param callback Callback from the <code>setPaused</code> method.
     */
    export function setPaused(
      socketId: number,
      paused: boolean,
      callback?: () => void,
    ): void;

    /**
     * Listens for connections on the specified port and address. If the
     * port/address is in use, the callback indicates a failure.
     * @param socketId The socket identifier.
     * @param address The address of the local machine.
     * @param port The port of the local machine.
     * @param backlog Length of the socket's listen queue. The default value depends on the Operating System (SOMAXCONN), which ensures a reasonable queue length for most applications.
     * @param callback Called when listen operation completes.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function listen(
      socketId: number,
      address: string,
      port: number,
      backlog: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Listens for connections on the specified port and address. If the
     * port/address is in use, the callback indicates a failure.
     * @param socketId The socket identifier.
     * @param address The address of the local machine.
     * @param port The port of the local machine.
     * @param callback Called when listen operation completes.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function listen(
      socketId: number,
      address: string,
      port: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Disconnects the listening socket, i.e. stops accepting new connections and
     * releases the address/port the socket is bound to. The socket identifier
     * remains valid, e.g. it can be used with <code>listen</code> to accept
     * connections on a new port and address.
     * @param socketId The socket identifier.
     * @param callback Called when the disconnect attempt is complete.
     */
    export function disconnect(
      socketId: number,
      callback?: () => void,
    ): void;

    /**
     * Disconnects and destroys the socket. Each socket created should be closed
     * after use. The socket id is no longer valid as soon at the function is
     * called. However, the socket is guaranteed to be closed only when the callback
     * is invoked.
     * @param socketId The socket identifier.
     * @param callback Called when the <code>close</code> operation completes.
     */
    export function close(
      socketId: number,
      callback?: () => void,
    ): void;

    /**
     * Retrieves the state of the given socket.
     * @param socketId The socket identifier.
     * @param callback Called when the socket state is available.
     * @param callback.socketInfo Object containing the socket information.
     */
    export function getInfo(
      socketId: number,
      callback: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     * @param callback Called when the list of sockets is available.
     * @param callback.socketInfos Array of object containing socket information.
     */
    export function getSockets(
      callback: (
        socketInfos: SocketInfo[],
      ) => void,
    ): void;

    /**
     * Event raised when a connection has been made to the server socket.
     */
    export const onAccept: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: AcceptInfo,
      ) => void
    >;

    /**
     * Event raised when a network error occured while the runtime was waiting
     * for new connections on the socket address and port. Once this event is
     * raised, the socket is set to <code>paused</code> and no more
     * <code>onAccept</code> events are raised for this socket until the socket
     * is resumed.
     */
    export const onAcceptError: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: AcceptErrorInfo,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.sockets.tcp</code> API to send and receive data over
   * the
 network using TCP connections. This API supersedes the TCP
   * functionality
 previously found in the <code>chrome.socket</code> API.
   */
  export namespace sockets.tcp {
    export interface SocketProperties {
      /**
       * Flag indicating if the socket is left open when the event page of the
       * application is unloaded (see <a
       * href="http://developer.chrome.com/apps/app_lifecycle.html">Manage App
       * Lifecycle</a>). The default value is "false." When the application is loaded,
       * any sockets previously opened with persistent=true can be fetched with
       * <code>getSockets</code>.
       */
      persistent?: boolean;

      /**
       * An application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. The default value is 4096.
       */
      bufferSize?: number;
    }

    export interface CreateInfo {
      /**
       * The ID of the newly created socket. Note that socket IDs created from this
       * API are not compatible with socket IDs created from other APIs, such as the
       * deprecated <code>{@link socket}</code> API.
       */
      socketId: number;
    }

    export interface SendInfo {
      /**
       * The result code returned from the underlying network call. A negative value
       * indicates an error.
       */
      resultCode: number;

      /**
       * The number of bytes sent (if result == 0)
       */
      bytesSent?: number;
    }

    export interface TLSVersionConstraints {
      /**
       * The minimum and maximum acceptable versions of TLS. These will be
       * <code>ssl3</code>, <code>tls1</code>, <code>tls1.1</code>, or
       * <code>tls1.2</code>.
       */
      min?: string;

      max?: string;
    }

    export interface SecureOptions {
      tlsVersion?: TLSVersionConstraints;
    }

    export interface SocketInfo {
      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * Flag indicating whether the socket is left open when the application is
       * suspended (see <code>SocketProperties.persistent</code>).
       */
      persistent: boolean;

      /**
       * Application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. If no buffer size has been
       * specified explictly, the value is not provided.
       */
      bufferSize?: number;

      /**
       * Flag indicating whether a connected socket blocks its peer from sending more
       * data (see <code>setPaused</code>).
       */
      paused: boolean;

      /**
       * Flag indicating whether the socket is connected to a remote peer.
       */
      connected: boolean;

      /**
       * If the underlying socket is connected, contains its local IPv4/6 address.
       */
      localAddress?: string;

      /**
       * If the underlying socket is connected, contains its local port.
       */
      localPort?: number;

      /**
       * If the underlying socket is connected, contains the peer/ IPv4/6 address.
       */
      peerAddress?: string;

      /**
       * If the underlying socket is connected, contains the peer port.
       */
      peerPort?: number;
    }

    export interface ReceiveInfo {
      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * The data received, with a maxium size of <code>bufferSize</code>.
       */
      data: ArrayBuffer;
    }

    export interface ReceiveErrorInfo {
      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * The result code returned from the underlying network call.
       */
      resultCode: number;
    }

    /**
     * Creates a TCP socket.
     * @param properties The socket properties (optional).
     * @param callback Called when the socket has been created.
     * @param callback.createInfo The result of the socket creation.
     */
    export function create(
      properties: SocketProperties,
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Creates a TCP socket.
     * @param callback Called when the socket has been created.
     * @param callback.createInfo The result of the socket creation.
     */
    export function create(
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Updates the socket properties.
     * @param socketId The socket identifier.
     * @param properties The properties to update.
     * @param callback Called when the properties are updated.
     */
    export function update(
      socketId: number,
      properties: SocketProperties,
      callback?: () => void,
    ): void;

    /**
     * Enables or disables the application from receiving messages from its peer.
     * The default value is "false". Pausing a socket is typically used by an
     * application to throttle data sent by its peer. When a socket is paused, no
     * <code>onReceive</code> event is raised. When a socket is connected and
     * un-paused, <code>onReceive</code> events are raised again when messages are
     * received.
     * @param socketId
     * @param paused
     * @param callback Callback from the <code>setPaused</code> method.
     */
    export function setPaused(
      socketId: number,
      paused: boolean,
      callback?: () => void,
    ): void;

    /**
     * Enables or disables the keep-alive functionality for a TCP connection.
     * @param socketId The socket identifier.
     * @param enable If true, enable keep-alive functionality.
     * @param delay Set the delay seconds between the last data packet received and the first keepalive probe. Default is 0.
     * @param callback Called when the setKeepAlive attempt is complete.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function setKeepAlive(
      socketId: number,
      enable: boolean,
      delay: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Enables or disables the keep-alive functionality for a TCP connection.
     * @param socketId The socket identifier.
     * @param enable If true, enable keep-alive functionality.
     * @param callback Called when the setKeepAlive attempt is complete.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function setKeepAlive(
      socketId: number,
      enable: boolean,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Sets or clears <code>TCP_NODELAY</code> for a TCP connection. Nagle's
     * algorithm will be disabled when <code>TCP_NODELAY</code> is set.
     * @param socketId The socket identifier.
     * @param noDelay If true, disables Nagle's algorithm.
     * @param callback Called when the setNoDelay attempt is complete.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function setNoDelay(
      socketId: number,
      noDelay: boolean,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Connects the socket to a remote machine. When the <code>connect</code>
     * operation completes successfully, <code>onReceive</code> events are raised
     * when data is received from the peer. If a network error occurs while the
     * runtime is receiving packets, a <code>onReceiveError</code> event is raised,
     * at which point no more <code>onReceive</code> event will be raised for this
     * socket until the <code>resume</code> method is called.
     * @param socketId The socket identifier.
     * @param peerAddress The address of the remote machine. DNS name, IPv4 and  IPv6 formats are supported.
     * @param peerPort The port of the remote machine.
     * @param callback Called when the connect attempt is complete.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function connect(
      socketId: number,
      peerAddress: string,
      peerPort: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Disconnects the socket.
     * @param socketId The socket identifier.
     * @param callback Called when the disconnect attempt is complete.
     */
    export function disconnect(
      socketId: number,
      callback?: () => void,
    ): void;

    /**
     * Start a TLS client connection over the connected TCP client socket.
     * @param socketId The existing, connected socket to use.
     * @param options Constraints and parameters for the TLS connection.
     * @param callback Called when the connection attempt is complete.
     * @param callback.result
     */
    export function secure(
      socketId: number,
      options: SecureOptions,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Start a TLS client connection over the connected TCP client socket.
     * @param socketId The existing, connected socket to use.
     * @param callback Called when the connection attempt is complete.
     * @param callback.result
     */
    export function secure(
      socketId: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Sends data on the given TCP socket.
     * @param socketId The socket identifier.
     * @param data The data to send.
     * @param callback Called when the <code>send</code> operation completes.
     * @param callback.sendInfo Result of the <code>send</code> method.
     */
    export function send(
      socketId: number,
      data: ArrayBuffer,
      callback: (
        sendInfo: SendInfo,
      ) => void,
    ): void;

    /**
     * Closes the socket and releases the address/port the socket is bound to. Each
     * socket created should be closed after use. The socket id is no no longer
     * valid as soon at the function is called. However, the socket is guaranteed to
     * be closed only when the callback is invoked.
     * @param socketId The socket identifier.
     * @param callback Called when the <code>close</code> operation completes.
     */
    export function close(
      socketId: number,
      callback?: () => void,
    ): void;

    /**
     * Retrieves the state of the given socket.
     * @param socketId The socket identifier.
     * @param callback Called when the socket state is available.
     * @param callback.socketInfo Object containing the socket information.
     */
    export function getInfo(
      socketId: number,
      callback: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     * @param callback Called when the list of sockets is available.
     * @param callback.socketInfos Array of object containing socket information.
     */
    export function getSockets(
      callback: (
        socketInfos: SocketInfo[],
      ) => void,
    ): void;

    /**
     * Event raised when data has been received for a given socket.
     */
    export const onReceive: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: ReceiveInfo,
      ) => void
    >;

    /**
     * Event raised when a network error occured while the runtime was waiting
     * for data on the socket address and port. Once this event is raised, the
     * socket is set to <code>paused</code> and no more <code>onReceive</code>
     * events are raised for this socket.
     */
    export const onReceiveError: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: ReceiveErrorInfo,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.sockets.udp</code> API to send and receive data over
   * the
 network using UDP connections. This API supersedes the UDP
   * functionality
 previously found in the "socket" API.
   */
  export namespace sockets.udp {
    export interface SocketProperties {
      /**
       * Flag indicating if the socket is left open when the event page of the
       * application is unloaded (see <a
       * href="http://developer.chrome.com/apps/app_lifecycle.html">Manage App
       * Lifecycle</a>). The default value is "false." When the application is loaded,
       * any sockets previously opened with persistent=true can be fetched with
       * <code>getSockets</code>.
       */
      persistent?: boolean;

      /**
       * An application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. If the buffer is too small to
       * receive the UDP packet, data is lost. The default value is 4096.
       */
      bufferSize?: number;
    }

    export interface CreateInfo {
      /**
       * The ID of the newly created socket. Note that socket IDs created from this
       * API are not compatible with socket IDs created from other APIs, such as the
       * deprecated <code>{@link socket}</code> API.
       */
      socketId: number;
    }

    export interface SendInfo {
      /**
       * The result code returned from the underlying network call. A negative value
       * indicates an error.
       */
      resultCode: number;

      /**
       * The number of bytes sent (if result == 0)
       */
      bytesSent?: number;
    }

    export interface SocketInfo {
      /**
       * The socket identifier.
       */
      socketId: number;

      /**
       * Flag indicating whether the socket is left open when the application is
       * suspended (see <code>SocketProperties.persistent</code>).
       */
      persistent: boolean;

      /**
       * Application-defined string associated with the socket.
       */
      name?: string;

      /**
       * The size of the buffer used to receive data. If no buffer size has been
       * specified explictly, the value is not provided.
       */
      bufferSize?: number;

      /**
       * Flag indicating whether the socket is blocked from firing onReceive events.
       */
      paused: boolean;

      /**
       * If the underlying socket is bound, contains its local IPv4/6 address.
       */
      localAddress?: string;

      /**
       * If the underlying socket is bound, contains its local port.
       */
      localPort?: number;
    }

    export interface ReceiveInfo {
      /**
       * The socket ID.
       */
      socketId: number;

      /**
       * The UDP packet content (truncated to the current buffer size).
       */
      data: ArrayBuffer;

      /**
       * The address of the host the packet comes from.
       */
      remoteAddress: string;

      /**
       * The port of the host the packet comes from.
       */
      remotePort: number;
    }

    export interface ReceiveErrorInfo {
      /**
       * The socket ID.
       */
      socketId: number;

      /**
       * The result code returned from the underlying recvfrom() call.
       */
      resultCode: number;
    }

    /**
     * Creates a UDP socket with the given properties.
     * @param properties The socket properties (optional).
     * @param callback Called when the socket has been created.
     * @param callback.createInfo The result of the socket creation.
     */
    export function create(
      properties: SocketProperties,
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Creates a UDP socket with the given properties.
     * @param callback Called when the socket has been created.
     * @param callback.createInfo The result of the socket creation.
     */
    export function create(
      callback: (
        createInfo: CreateInfo,
      ) => void,
    ): void;

    /**
     * Updates the socket properties.
     * @param socketId The socket ID.
     * @param properties The properties to update.
     * @param callback Called when the properties are updated.
     */
    export function update(
      socketId: number,
      properties: SocketProperties,
      callback?: () => void,
    ): void;

    /**
     * Pauses or unpauses a socket. A paused socket is blocked from firing
     * <code>onReceive</code> events.
     * @param socketId
     * @param paused Flag to indicate whether to pause or unpause.
     * @param callback Called when the socket has been successfully paused or unpaused.
     */
    export function setPaused(
      socketId: number,
      paused: boolean,
      callback?: () => void,
    ): void;

    /**
     * <p>Binds the local address and port for the socket. For a client socket, it
     * is recommended to use port 0 to let the platform pick a free port.</p><p>Once
     * the <code>bind</code> operation completes successfully,
     * <code>onReceive</code> events are raised when UDP packets arrive on the
     * address/port specified -- unless the socket is paused.</p>
     * @param socketId The socket ID.
     * @param address The address of the local machine. DNS name, IPv4 and IPv6 formats are supported. Use "0.0.0.0" to accept packets from all local available network interfaces.
     * @param port The port of the local machine. Use "0" to bind to a free port.
     * @param callback Called when the <code>bind</code> operation completes.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function bind(
      socketId: number,
      address: string,
      port: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Sends data on the given socket to the given address and port. The socket must
     * be bound to a local port before calling this method.
     * @param socketId The socket ID.
     * @param data The data to send.
     * @param address The address of the remote machine.
     * @param port The port of the remote machine.
     * @param callback Called when the <code>send</code> operation completes.
     * @param callback.sendInfo Result of the <code>send</code> method.
     */
    export function send(
      socketId: number,
      data: ArrayBuffer,
      address: string,
      port: number,
      callback: (
        sendInfo: SendInfo,
      ) => void,
    ): void;

    /**
     * Closes the socket and releases the address/port the socket is bound to. Each
     * socket created should be closed after use. The socket id is no longer valid
     * as soon at the function is called. However, the socket is guaranteed to be
     * closed only when the callback is invoked.
     * @param socketId The socket ID.
     * @param callback Called when the <code>close</code> operation completes.
     */
    export function close(
      socketId: number,
      callback?: () => void,
    ): void;

    /**
     * Retrieves the state of the given socket.
     * @param socketId The socket ID.
     * @param callback Called when the socket state is available.
     * @param callback.socketInfo Object containing the socket information.
     */
    export function getInfo(
      socketId: number,
      callback: (
        socketInfo: SocketInfo,
      ) => void,
    ): void;

    /**
     * Retrieves the list of currently opened sockets owned by the application.
     * @param callback Called when the list of sockets is available.
     * @param callback.socketInfos Array of object containing socket information.
     */
    export function getSockets(
      callback: (
        socketInfos: SocketInfo[],
      ) => void,
    ): void;

    /**
     * Joins the multicast group and starts to receive packets from that group. The
     * socket must be bound to a local port before calling this method.
     * @param socketId The socket ID.
     * @param address The group address to join. Domain names are not supported.
     * @param callback Called when the <code>joinGroup</code> operation completes.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function joinGroup(
      socketId: number,
      address: string,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * <p>Leaves the multicast group previously joined using <code>joinGroup</code>.
     * This is only necessary to call if you plan to keep using the
     * socketafterwards, since it will be done automatically by the OS when the
     * socket is closed.</p><p>Leaving the group will prevent the router from
     * sending multicast datagrams to the local host, presuming no other process on
     * the host is still joined to the group.</p>
     * @param socketId The socket ID.
     * @param address The group address to leave. Domain names are not supported.
     * @param callback Called when the <code>leaveGroup</code> operation completes.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function leaveGroup(
      socketId: number,
      address: string,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * <p>Sets the time-to-live of multicast packets sent to the multicast
     * group.</p><p>Calling this method does not require multicast permissions.</p>
     * @param socketId The socket ID.
     * @param ttl The time-to-live value.
     * @param callback Called when the configuration operation completes.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function setMulticastTimeToLive(
      socketId: number,
      ttl: number,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * <p>Sets whether multicast packets sent from the host to the multicast group
     * will be looped back to the host.</p><p>Note: the behavior of
     * <code>setMulticastLoopbackMode</code> is slightly different between Windows
     * and Unix-like systems. The inconsistency happens only when there is more than
     * one application on the same host joined to the same multicast group while
     * having different settings on multicast loopback mode. On Windows, the
     * applications with loopback off will not RECEIVE the loopback packets; while
     * on Unix-like systems, the applications with loopback off will not SEND the
     * loopback packets to other applications on the same host. See MSDN:
     * http://goo.gl/6vqbj</p><p>Calling this method does not require multicast
     * permissions.</p>
     * @param socketId The socket ID.
     * @param enabled Indicate whether to enable loopback mode.
     * @param callback Called when the configuration operation completes.
     * @param callback.result The result code returned from the underlying network call. A negative value indicates an error.
     */
    export function setMulticastLoopbackMode(
      socketId: number,
      enabled: boolean,
      callback: (
        result: number,
      ) => void,
    ): void;

    /**
     * Gets the multicast group addresses the socket is currently joined to.
     * @param socketId The socket ID.
     * @param callback Called with an array of strings of the result.
     * @param callback.groups Array of groups the socket joined.
     */
    export function getJoinedGroups(
      socketId: number,
      callback: (
        groups: string[],
      ) => void,
    ): void;

    /**
     * Event raised when a UDP packet has been received for the given socket.
     */
    export const onReceive: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: ReceiveInfo,
      ) => void
    >;

    /**
     * Event raised when a network error occured while the runtime was waiting
     * for data on the socket address and port. Once this event is raised, the
     * socket is paused and no more <code>onReceive</code> events will be raised
     * for this socket until the socket is resumed.
     */
    export const onReceiveError: chrome.events.Event<
      /**
       * @param info The event data.
       */
      (
        info: ReceiveErrorInfo,
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
   * Use the <code>chrome.syncFileSystem</code> API to save and synchronize data
   * on Google Drive. This API is NOT for accessing arbitrary user docs stored in
   * Google Drive. It provides app-specific syncable storage for offline and
   * caching usage so that the same data can be available across different
   * clients. Read <a href="app_storage.html">Manage Data</a> for more on using
   * this API.
   * @chrome-permission syncFileSystem
 */
  export namespace syncFileSystem {
    export type SyncAction = "added" | "updated" | "deleted";

    export type ServiceStatus = "initializing" | "running" | "authentication_required" | "temporary_unavailable" | "disabled";

    export type FileStatus = "synced" | "pending" | "conflicting";

    export type SyncDirection = "local_to_remote" | "remote_to_local";

    export type ConflictResolutionPolicy = "last_write_win" | "manual";

    export interface FileInfo {
      /**
       * <code>fileEntry</code> for the target file whose status has changed. Contains
       * name and path information of synchronized file. On file deletion,
       * <code>fileEntry</code> information will still be available but file will no
       * longer exist.
       */
      fileEntry: Entry;

      /**
       * Resulting file status after {@link onFileStatusChanged} event. The status
       * value can be <code>'synced'</code>, <code>'pending'</code> or
       * <code>'conflicting'</code>.
       */
      status: FileStatus;

      /**
       * Sync action taken to fire {@link onFileStatusChanged} event. The action value
       * can be <code>'added'</code>, <code>'updated'</code> or
       * <code>'deleted'</code>. Only applies if status is <code>'synced'</code>.
       */
      action?: SyncAction;

      /**
       * Sync direction for the {@link onFileStatusChanged} event. Sync direction
       * value can be <code>'local_to_remote'</code> or
       * <code>'remote_to_local'</code>. Only applies if status is
       * <code>'synced'</code>.
       */
      direction?: SyncDirection;
    }

    export interface FileStatusInfo {
      /**
       * One of the Entry's originally given to getFileStatuses.
       */
      fileEntry: Entry;

      /**
       * The status value can be <code>'synced'</code>, <code>'pending'</code> or
       * <code>'conflicting'</code>.
       */
      status: FileStatus;

      /**
       * Optional error that is only returned if there was a problem retrieving the
       * FileStatus for the given file.
       */
      error?: string;
    }

    export interface StorageInfo {
      usageBytes: number;

      quotaBytes: number;
    }

    export interface ServiceInfo {
      state: ServiceStatus;

      description: string;
    }

    /**
     * <p>Returns a syncable filesystem backed by Google Drive. The returned
     * <code>DOMFileSystem</code> instance can be operated on in the same way as the
     * Temporary and Persistant file systems (see <a
     * href="http://www.w3.org/TR/file-system-api/">http://www.w3.org/TR/file-system-api/</a>), except that the filesystem object returned for Sync FileSystem does <b>NOT</b> support directory operations (yet). You can get a list of file entries by reading the root directory (by <a href="http://www.w3.org/TR/file-system-api/#widl-DirectoryEntry-createReader-DirectoryReader">creating a new DirectoryReader</a>), but cannot create a new directory in it.</p><p>Calling this multiple times from the same app will return the same handle to the same file system.</p><p>Note this call can fail. For example, if the user is not signed in to Chrome or if there is no network operation. To handle these errors it is important chrome.runtime.lastError is checked in the callback.</p>
     * @param callback A callback type for requestFileSystem.
     * @param callback.fileSystem
     */
    export function requestFileSystem(
      callback: (
        fileSystem: DOMFileSystem,
      ) => void,
    ): void;

    /**
     * Sets the default conflict resolution policy for the <code>'syncable'</code>
     * file storage for the app. By default it is set to
     * <code>'last_write_win'</code>. When conflict resolution policy is set to
     * <code>'last_write_win'</code> conflicts for existing files are automatically
     * resolved next time the file is updated. |callback| can be optionally given to
     * know if the request has succeeded or not.
     * @param policy
     * @param callback A generic result callback to indicate success or failure.
     */
    export function setConflictResolutionPolicy(
      policy: ConflictResolutionPolicy,
      callback?: () => void,
    ): void;

    /**
     * Gets the current conflict resolution policy.
     * @param callback A callback type for getConflictResolutionPolicy.
     * @param callback.policy
     */
    export function getConflictResolutionPolicy(
      callback: (
        policy: ConflictResolutionPolicy,
      ) => void,
    ): void;

    /**
     * Returns the current usage and quota in bytes for the <code>'syncable'</code>
     * file storage for the app.
     * @param fileSystem
     * @param callback A callback type for getUsageAndQuota.
     * @param callback.info
     */
    export function getUsageAndQuota(
      fileSystem: DOMFileSystem,
      callback: (
        info: StorageInfo,
      ) => void,
    ): void;

    /**
     * Returns the {@link FileStatus} for the given <code>fileEntry</code>. The
     * status value can be <code>'synced'</code>, <code>'pending'</code> or
     * <code>'conflicting'</code>. Note that <code>'conflicting'</code> state only
     * happens when the service's conflict resolution policy is set to
     * <code>'manual'</code>.
     * @param fileEntry
     * @param callback A callback type for getFileStatus.
     * @param callback.status
     */
    export function getFileStatus(
      fileEntry: Entry,
      callback: (
        status: FileStatus,
      ) => void,
    ): void;

    /**
     * Returns each {@link FileStatus} for the given <code>fileEntry</code> array.
     * Typically called with the result from dirReader.readEntries().
     * @param fileEntries
     * @param callback A callback type for getFileStatuses.
     * @param callback.status
     */
    export function getFileStatuses(
      fileEntries: {[name: string]: any}[],
      callback: (
        status: FileStatusInfo[],
      ) => void,
    ): void;

    /**
     * Returns the current sync backend status.
     * @param callback A callback type for getServiceStatus.
     * @param callback.status
     */
    export function getServiceStatus(
      callback: (
        status: ServiceStatus,
      ) => void,
    ): void;

    /**
     * Fired when an error or other status change has happened in the sync
     * backend (for example, when the sync is temporarily disabled due to
     * network or authentication error).
     */
    export const onServiceStatusChanged: chrome.events.Event<
      /**
       * @param detail
       */
      (
        detail: ServiceInfo,
      ) => void
    >;

    /**
     * Fired when a file has been updated by the background sync service.
     */
    export const onFileStatusChanged: chrome.events.Event<
      /**
       * @param detail
       */
      (
        detail: FileInfo,
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
   * Use the <code>chrome.system.network</code> API.
   * @chrome-permission system.network
 */
  export namespace system.network {
    export interface NetworkInterface {
      /**
       * The underlying name of the adapter. On *nix, this will typically be "eth0",
       * "wlan0", etc.
       */
      name: string;

      /**
       * The available IPv4/6 address.
       */
      address: string;

      /**
       * The prefix length
       */
      prefixLength: number;
    }

    /**
     * Retrieves information about local adapters on this system.
     * @param callback Called when local adapter information is available.
     * @param callback.networkInterfaces Array of object containing network interfaces information.
     */
    export function getNetworkInterfaces(
      callback: (
        networkInterfaces: NetworkInterface[],
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
     * Captures the visible area of the currently active tab.  Capture can only be
     * started on the currently active tab after the extension has been
     * <em>invoked</em>.  Capture is maintained across page navigations within the
     * tab, and stops when the tab is closed, or the media stream is closed by the
     * extension.
     * @param options Configures the returned media stream.
     * @param callback Callback with either the tab capture stream or   <code>null</code>.
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
     * Event fired when the capture status of a tab changes. This allows
     * extension authors to keep track of the capture status of tabs to keep UI
     * elements like page actions and infobars in sync.
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
     * Defines how zoom changes in a tab are handled and at what scope.
     */
    export interface ZoomSettings {
      /**
       * Defines how zoom changes are handled, i.e. which entity is responsible for
       * the actual scaling of the page; defaults to <code>automatic</code>.
       */
      mode?: "automatic" | "manual" | "disabled";

      /**
       * Defines whether zoom changes will persist for the page's origin, or only take
       * effect in this tab; defaults to <code>per-origin</code> when in
       * <code>automatic</code> mode, and <code>per-tab</code> otherwise.
       */
      scope?: "per-origin" | "per-tab";
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
     * href='messaging'>Content Script Messaging</a>.
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
     * @param callback.tab Details about the created tab. Will contain the ID of the new tab.
     */
    export function create(
      createProperties: {
        /**
         * The window to create the new tab in. Defaults to the <a
         * href='windows#current-window'>current window</a>.
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
        status?: "loading" | "complete",

        /**
         * Match page titles against a pattern.
         */
        title?: string,

        /**
         * Match tabs against one or more <a href='match_patterns'>URL patterns</a>.
         * Note that fragment identifiers are not matched.
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
     * @param tabId Defaults to the selected tab of the <a href='windows#current-window'>current window</a>.
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
     * @param tabId Defaults to the active tab of the <a href='windows#current-window'>current window</a>.
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
     * window. You must have <a href='declare_permissions'>&lt;all_urls&gt;</a>
     * permission to use this method.
     * @param windowId The target window. Defaults to the <a href='windows#current-window'>current window</a>.
     * @param options
     * @param callback
     * @param callback.dataUrl A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
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
     * window. You must have <a href='declare_permissions'>&lt;all_urls&gt;</a>
     * permission to use this method.
     * @param options
     * @param callback
     * @param callback.dataUrl A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(
      options: extensionTypes.ImageDetails,
      callback: (
        dataUrl: string,
      ) => void,
    ): void;

    /**
     * Captures the visible area of the currently active tab in the specified
     * window. You must have <a href='declare_permissions'>&lt;all_urls&gt;</a>
     * permission to use this method.
     * @param windowId The target window. Defaults to the <a href='windows#current-window'>current window</a>.
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
     * window. You must have <a href='declare_permissions'>&lt;all_urls&gt;</a>
     * permission to use this method.
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
     * href='content_scripts#pi'>programmatic injection</a> section of the content
     * scripts doc.
     * @param tabId The ID of the tab in which to run the script; defaults to the active tab of the current window.
     * @param details Details of the script to run.
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
     * @param details Details of the script to run.
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
     * @param details Details of the CSS text to insert.
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
     * @param details Details of the CSS text to insert.
     * @param callback Called when all the CSS has been inserted.
     */
    export function insertCSS(
      details: extensionTypes.InjectDetails,
      callback?: () => void,
    ): void;

    /**
     * Zooms a specified tab.
     * @param tabId The ID of the tab to zoom; defaults to the active tab of the current window.
     * @param zoomFactor The new zoom factor.
     * @param callback Called after the zoom factor has been changed.
     */
    export function setZoom(
      tabId: number,
      zoomFactor: number,
      callback?: () => void,
    ): void;

    /**
     * Zooms a specified tab.
     * @param zoomFactor The new zoom factor.
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
     * @param callback Called after the zoom settings have been changed.
     */
    export function setZoomSettings(
      tabId: number,
      zoomSettings: ZoomSettings,
      callback: () => void,
    ): void;

    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are
     * handled. These settings are reset to defaults upon navigating the tab.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @param callback Called after the zoom settings have been changed.
     */
    export function setZoomSettings(
      zoomSettings: ZoomSettings,
      callback: () => void,
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
   * href='http://developer.chrome.com/extensions/ttsEngine'>ttsEngine</a> API,
   * which allows an extension to implement a speech engine.
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
   * @chrome-permission preferencesPrivate
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
     * For isochronous mode, SynchronizationType and UsageType map to their
     * namesakes within the USB specification.
     */
    export type SynchronizationType = "asynchronous" | "adaptive" | "synchronous";

    export type UsageType = "data" | "feedback" | "explicitFeedback";

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
       * The amount of data to receive (required only by input transfers).
       */
      length?: number;

      /**
       * The data to transmit (required only by output transfers).
       */
      data?: ArrayBuffer;
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
       * The amount of data to receive (required only by input transfers).
       */
      length?: number;

      /**
       * The data to transmit (required only by output transfers).
       */
      data?: ArrayBuffer;
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
       * Broadcast address for the VPN interface. (default: Deduced from IP address
       * and mask).
       */
      broadcastAddress?: string;

      /**
       * MTU for the VPN interface. (default: 1500)
       */
      mtu?: string;

      /**
       * Bypass network traffic to the below IPs (in CIDR notation) from the tunnel.
       * Typically used to bypass traffic to/from VPN server.
       */
      bypassTunnelForIp: string[];

      /**
       * A list of search domains (default: system setting).
       */
      domainSearch?: string[];

      /**
       * A list of DNS servers in CIDR notation (default: system setting).
       */
      dnsServers?: string[];
    }

    /**
     * The enum is used by the platform to notify the client of connection and
     * network related status. TODO(kaliamoorthi) : Document the messages
     */
    export type PlatformMessage = "connected" | "disconnected" | "underlyingNetworkDisconnected" | "error";

    /**
     * The enum is used by the VPN client to inform the platform of its current
     * state. This helps provide meaningful messages to the user. The states listed
     * below are currently known to the platform (Shill daemon). TODO(kaliamoorthi)
     * : Document all states TODO(kaliamoorthi) : Make failure more informative by
     * expanding the failure conditions.
     */
    export type VpnConnectionState = "connected" | "portal" | "online" | "failure";

    /**
     * Creates a new VPN configuration.
     * @param name
     * @param callback The callback is used by createConfig to signal completion.
     * @param callback.handle
     */
    export function createConfig(
      name: string,
      callback: (
        handle: number,
      ) => void,
    ): void;

    /**
     * Destroys a VPN configuration created by the extension.
     * @param handle
     * @param callback The callback is used by <code>setParameters, sendPacket</code> to signal completion. The callback is called with <code>chrome.runtime.lastError</code> set to error code if there is an error.
     */
    export function destroyConfig(
      handle: number,
      callback?: () => void,
    ): void;

    /**
     * Sets the parameters for a VPN configuration. This should be called after
     * connected is received from the platform.
     * @param handle
     * @param parameters
     * @param callback The callback is used by <code>setParameters, sendPacket</code> to signal completion. The callback is called with <code>chrome.runtime.lastError</code> set to error code if there is an error.
     */
    export function setParameters(
      handle: number,
      parameters: Parameters,
      callback: () => void,
    ): void;

    /**
     * Injects an IP packet into the network stack of Chrome OS.
     * @param handle
     * @param data
     * @param callback The callback is used by <code>setParameters, sendPacket</code> to signal completion. The callback is called with <code>chrome.runtime.lastError</code> set to error code if there is an error.
     */
    export function sendPacket(
      handle: number,
      data: ArrayBuffer,
      callback?: () => void,
    ): void;

    /**
     * Notifies the VPN connection state to Chrome OS.
     * @param handle
     * @param state
     * @param callback The callback is used by <code>setParameters, sendPacket</code> to signal completion. The callback is called with <code>chrome.runtime.lastError</code> set to error code if there is an error.
     */
    export function notifyConnectionStateChanged(
      handle: number,
      state: VpnConnectionState,
      callback?: () => void,
    ): void;

    /**
     * Called when a message is received from the platform for a VPN
     * configuration owned by the extension.
     */
    export const onPlatformMessage: chrome.events.Event<
      /**
       * @param handle
       * @param message
       */
      (
        handle: number,
        message: PlatformMessage,
      ) => void
    >;

    /**
     * Called when an IP packet is received from the platform for a VPN
     * configuration owned by the extension.
     */
    export const onPacketReceived: chrome.events.Event<
      /**
       * @param handle
       * @param data
       */
      (
        handle: number,
        data: ArrayBuffer,
      ) => void
    >;
  }
}

declare namespace chrome {
  /**
   * Use the <code>chrome.wallpaper</code> API to change the ChromeOS wallpaper.
   * @alpha
 * @chrome-platform chromeos
 * @chrome-permission wallpaper
 */
  export namespace wallpaper {
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
         * The jpeg or png encoded wallpaper image.
         */
        data?: ArrayBuffer,

        /**
         * The URL of the wallpaper to be set.
         */
        url?: string,

        /**
         * The supported wallpaper layouts.
         */
        layout: "STRETCH" | "CENTER" | "CENTER_CROPPED",

        /**
         * The file name of the saved wallpaper.
         */
        filename: string,

        /**
         * True if a 128x60 thumbnail should be generated.
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
           * href="history#transition_types">history API</a> except with
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
           * href="history#transition_types">history API</a> except with
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
           * href="history#transition_types">history API</a> except with
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
   * Use the <code>chrome.webViewRequest</code> API to intercept, block, or modify
   * requests in-flight. It is potentially faster than the <a
   * href='webRequest'><code>chrome.webRequest</code> API</a> because you can
   * register rules that are evaluated in the browser rather than the JavaScript
   * engine with reduces roundtrip latencies and allows higher efficiency.
   * @chrome-permission webview
 */
  export namespace webViewRequest {
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
   * Use the <code>webview</code> tag to actively load live content from the web
   * over the network and embed it in your Chrome App. Your app can control the
   * appearance of the <code>webview</code> and interact with the web content,
   * initiate navigations in an embedded web page, react to error events that
   * happen within it, and more (see <a href="#usage">Usage</a>).
   * @chrome-permission webview
 */
  export namespace webviewTag {
    /**
     * Options that determine what data should be cleared by <code>clearData</code>.
     */
    export interface ClearDataOptions {
      /**
       * Clear data accumulated on or after this date, represented in milliseconds
       * since the epoch (accessible via the getTime method of the JavaScript
       * <code>Date</code> object). If absent, defaults to <code>0</code> (which would
       * remove all browsing data).
       */
      since?: number;
    }

    /**
     * A set of data types. Missing properties are interpreted as
     * <code>false</code>.
     */
    export interface ClearDataTypeSet {
      /**
       * Websites' appcaches.
       */
      appcache?: boolean;

      /**
       * The partition's cookies.
       */
      cookies?: boolean;

      /**
       * Websites' filesystems.
       */
      fileSystems?: boolean;

      /**
       * Websites' IndexedDB data.
       */
      indexedDB?: boolean;

      /**
       * Websites' local storage data.
       */
      localStorage?: boolean;

      /**
       * Websites' WebSQL data.
       */
      webSQL?: boolean;
    }

    /**
     * Details of the script or CSS to inject. Either the code or the file property
     * must be set, but both may not be set at the same time.
     */
    export interface InjectDetails {
      /**
       * JavaScript or CSS code to inject.<br><br><b>Warning:</b><br>Be careful using
       * the <code>code</code> parameter. Incorrect use of it may open your app to <a
       * href="https://en.wikipedia.org/wiki/Cross-site_scripting">cross site
       * scripting</a> attacks.
       */
      code?: string;

      /**
       * JavaScript or CSS file to inject.
       */
      file?: string;
    }

    /**
     * Messaging handle to a guest window.
     */
    export interface ContentWindow {
      /**
       * <p>Posts a message to the embedded web content as long as the embedded
       * content is displaying a page from the target origin. This method is available
       * once the page has completed loading. Listen for the <a
       * href="#event-contentload">contentload</a> event and then call the
       * method.</p><p>The guest will be able to send replies to the embedder by
       * posting message to <code>event.source</code> on the message event it
       * receives.</p><p>This API is identical to the <a
       * href="https://developer.mozilla.org/en-US/docs/DOM/window.postMessage">HTML5
       * postMessage API</a> for communication between web pages. The embedder may
       * listen for replies by adding a <code>message</code> event listener to its own
       * frame.</p>
       * @param message Message object to send to the guest.
       * @param targetOrigin Specifies what the origin of the guest window must be for the event to be dispatched.
       */
      postMessage(
        message: any,
        targetOrigin: string,
      ): void;
    }

    /**
     * Interface attached to <code>dialog</code> DOM events.
     */
    export interface DialogController {
      /**
       * Accept the dialog. Equivalent to clicking OK in an <code>alert</code>,
       * <code>confirm</code>, or <code>prompt</code> dialog.
       * @param response The response string to provide to the guest when accepting a <code>prompt</code> dialog.
       */
      ok(
        response?: string,
      ): void;

      /**
       * Reject the dialog. Equivalent to clicking Cancel in a <code>confirm</code> or
       * <code>prompt</code> dialog.
       */
      cancel(): void;
    }

    /**
     * Contains all of the results of the find request.
     */
    export interface FindCallbackResults {
      /**
       * The number of times <code>searchText</code> was matched on the page.
       */
      numberOfMatches: number;

      /**
       * The ordinal number of the current match.
       */
      activeMatchOrdinal: number;

      /**
       * Describes a rectangle around the active match in screen coordinates.
       */
      selectionRect: SelectionRect;

      /**
       * Indicates whether this find request was canceled.
       */
      canceled: boolean;
    }

    /**
     * Options for the find request.
     */
    export interface FindOptions {
      /**
       * Flag to find matches in reverse order. The default value is
       * <code>false</code>.
       */
      backward?: boolean;

      /**
       * Flag to match with case-sensitivity. The default value is <code>false</code>.
       */
      matchCase?: boolean;
    }

    /**
     * Interface attached to <code>newwindow</code> DOM events.
     */
    export interface NewWindow {
      /**
       * Attach the requested target page to an existing <code>webview</code> element.
       * @param webview The <code>webview</code> element to which the target page should be attached.
       */
      attach(
        webview: object,
      ): void;

      /**
       * Cancel the new window request.
       */
      discard(): void;
    }

    /**
     * The type of <code>request</code> object which accompanies a
     * <code>media</code> <a
     * href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface MediaPermissionRequest {
      /**
       * The URL of the frame requesting access to user media.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow(): void;

      /**
       * Deny the permission request. This is the default behavior if
       * <code>allow</code> is not called.
       */
      deny(): void;
    }

    /**
     * The type of <code>request</code> object which accompanies a
     * <code>geolocation</code> <a
     * href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface GeolocationPermissionRequest {
      /**
       * The URL of the frame requesting access to geolocation data.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow(): void;

      /**
       * Deny the permission request. This is the default behavior if
       * <code>allow</code> is not called.
       */
      deny(): void;
    }

    /**
     * The type of <code>request</code> object which accompanies a
     * <code>pointerLock</code> <a
     * href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface PointerLockPermissionRequest {
      /**
       * Whether or not pointer lock was requested as a result of a user input
       * gesture.
       */
      userGesture: boolean;

      /**
       * Whether or not the requesting frame was the most recent client to hold
       * pointer lock.
       */
      lastUnlockedBySelf: boolean;

      /**
       * The URL of the frame requesting pointer lock.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow(): void;

      /**
       * Deny the permission request. This is the default behavior if
       * <code>allow</code> is not called.
       */
      deny(): void;
    }

    /**
     * The type of <code>request</code> object which accompanies a
     * <code>download</code> <a
     * href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface DownloadPermissionRequest {
      /**
       * The HTTP request type (e.g. <code>GET</code>) associated with the download
       * request.
       */
      requestMethod: string;

      /**
       * The requested download URL.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow(): void;

      /**
       * Deny the permission request. This is the default behavior if
       * <code>allow</code> is not called.
       */
      deny(): void;
    }

    /**
     * The type of <code>request</code> object which accompanies a
     * <code>filesystem</code> <a
     * href="#event-permissionrequest">permissionrequest</a></code> DOM event.
     */
    export interface FileSystemPermissionRequest {
      /**
       * The URL of the frame requesting access to local file system.
       */
      url: string;

      /**
       * Allow the permission request.
       */
      allow(): void;

      /**
       * Deny the permission request.
       */
      deny(): void;
    }

    /**
     * The type of <code>request</code> object which accompanies a
     * <code>loadplugin</code> <a
     * href="#event-permissionrequest">permissionrequest</a> DOM event.<p>
     */
    export interface LoadPluginPermissionRequest {
      /**
       * The plugin's identifier string.
       */
      identifier: string;

      /**
       * The plugin's display name.
       */
      name: string;

      /**
       * Allow the permission request. This is the default behavior if
       * <code>deny</code> is not called..
       */
      allow(): void;

      /**
       * Deny the permission request.
       */
      deny(): void;
    }

    /**
     * <p>Describes a rectangle in screen coordinates.</p><p>The containment
     * semantics are array-like; that is, the coordinate <code>(left, top)</code> is
     * considered to be contained by the rectangle, but the coordinate <code>(left +
     * width, top)</code> is not.</p>
     */
    export interface SelectionRect {
      /**
       * Distance from the left edge of the screen to the left edge of the rectangle.
       */
      left: number;

      /**
       * Distance from the top edge of the screen to the top edge of the rectangle.
       */
      top: number;

      /**
       * Width of the rectangle.
       */
      width: number;

      /**
       * Height of the rectangle.
       */
      height: number;
    }

    /**
     * Interface which provides access to webRequest events on the guest page. See
     * the <a
     * href="http://developer.chrome.com/extensions/webRequest">chrome.webRequest</a> extensions API for details on webRequest life cycle and related concepts.<p>To illustrate how usage differs from the extensions webRequest API, consider the following example code which blocks any guest requests for URLs which match <code>*://www.evil.com/*</code>:</p><pre>webview.request.onBeforeRequest.addListener(  function(details) { return {cancel: true}; },  {urls: ["*://www.evil.com/*"]},  ["blocking"]);</pre><p>Additionally, this interface supports declarative webRequest rules through <code>onRequest</code> and <code>onMessage</code> events. See <a href="http://developer.chrome.com/extensions/declarativeWebRequest.html">declarativeWebRequest</a> for API details.</p>Note that conditions and actions for declarative webview webRequests should be instantiated from their <code>chrome.webViewRequest.*</code> counterparts. The following example code declaratively blocks all requests to <code>"example.com"</code> on the webview <code>myWebview</code>:</p><pre>var rule = {  conditions: [    new chrome.webViewRequest.RequestMatcher({ url: { hostSuffix: 'example.com' } })  ],  actions: [ new chrome.webViewRequest.CancelRequest() ]};myWebview.request.onRequest.addRules([rule]);</pre>
     */
    export interface WebRequestEventInteface {
    }

    /**
     * Object reference which can be used to post messages into the guest page.
     */
    export const contentWindow: ContentWindow;

    /**
     * Interface which provides access to webRequest events on the guest page.
     */
    export const request: WebRequestEventInteface;

    /**
     * Navigates backward one history entry if possible. Equivalent to
     * <code>go(-1)</code>.
     */
    export function back(): void;

    /**
     * Indicates whether or not it is possible to navigate backward through history.
     */
    export function canGoBack(): boolean;

    /**
     * Indicates whether or not it is possible to navigate forward through history.
     */
    export function canGoForward(): boolean;

    /**
     * <p>Clears browsing data for the <code>webview</code> partition.</p>
     * @param options Options determining exactly what data to clear.
     * @param types The types of data to be cleared.
     * @param callback Called after the data has been successfully cleared.
     */
    export function clearData(
      options: ClearDataOptions,
      types: ClearDataTypeSet,
      callback?: () => void,
    ): void;

    /**
     * <p>Injects JavaScript code into the guest page.</p><p>The following sample
     * code uses script injection to set the guest page's background color to
     * red:</p><pre>webview.executeScript({ code:
     * "document.body.style.backgroundColor = 'red'" });</pre>
     * @param details Details of the script to run.
     * @param callback Called after all the JavaScript has been executed.
     * @param callback.result The result of the script in every injected frame.
     */
    export function executeScript(
      details: InjectDetails,
      callback?: (
        result?: any[],
      ) => void,
    ): void;

    /**
     * Initiates a find-in-page request.
     * @param searchText The string to find in the page.
     * @param options Options for the find request.
     * @param callback Called after all find results have been returned for this find request.
     * @param callback.results Contains all of the results of the find request. <code>results</code> can be omitted if it is not utilized in the callback function body; for example, if the callback is only used to discern when the find request has completed.
     */
    export function find(
      searchText: string,
      options?: FindOptions,
      callback?: (
        results?: FindCallbackResults,
      ) => void,
    ): void;

    /**
     * Navigates forward one history entry if possible. Equivalent to
     * <code>go(1)</code>.
     */
    export function forward(): void;

    /**
     * Returns Chrome's internal process ID for the guest web page's current
     * process, allowing embedders to know how many guests would be affected by
     * terminating the process. Two guests will share a process only if they belong
     * to the same app and have the same <a href="#partition">storage partition
     * ID</a>. The call is synchronous and returns the embedder's cached notion of
     * the current process ID. The process ID isn't the same as the operating
     * system's process ID.
     */
    export function getProcessId(): number;

    /**
     * Returns the user agent string used by the webview for guest page requests.
     */
    export function getUserAgent(): string;

    /**
     * Gets the current zoom factor.
     * @param callback Called after the current zoom factor is retrieved.
     * @param callback.zoomFactor The current zoom factor.
     */
    export function getZoom(
      callback: (
        zoomFactor: number,
      ) => void,
    ): void;

    /**
     * Navigates to a history entry using a history index relative to the current
     * navigation. If the requested navigation is impossible, this method has no
     * effect.
     * @param relativeIndex Relative history index to which the webview should be navigated. For example, a value of <code>2</code> will navigate forward 2 history entries if possible; a value of <code>-3</code> will navigate backward 3 entries.
     * @param callback
     * @param callback.success Indicates whether the navigation was successful.
     */
    export function go(
      relativeIndex: number,
      callback?: (
        success: boolean,
      ) => void,
    ): void;

    /**
     * Injects CSS into the guest page.
     * @param details Details of the CSS to insert.
     * @param callback Called after the CSS has been inserted.
     */
    export function insertCSS(
      details: InjectDetails,
      callback?: () => void,
    ): void;

    /**
     * Indicates whether or not the webview's user agent string has been overridden
     * by {@link webviewTag.setUserAgentOverride}
     */
    export function isUserAgentOverridden(): void;

    /**
     * Prints the contents of the webview. This is equivalent to calling scripted
     * print function from the webview itself.
     */
    export function print(): void;

    /**
     * Reloads the current top-level page.
     */
    export function reload(): void;

    /**
     * Override the user agent string used by the webview for guest page requests.
     * @param userAgent The user agent string to use.
     */
    export function setUserAgentOverride(
      userAgent: string,
    ): void;

    /**
     * Changes the zoom factor of the page. This zoom will persist for the page's
     * origin, even after navigation.
     * @param zoomFactor The new zoom factor.
     * @param callback Called after the page has been zoomed.
     */
    export function setZoom(
      zoomFactor: number,
      callback?: () => void,
    ): void;

    /**
     * Stops loading the current &lt;webview> navigation if in progress.
     */
    export function stop(): void;

    /**
     * Ends the current find session (clearing all highlighting) and cancels all
     * find requests in progress.
     * @param action Determines what to do with the active match after the find session has ended. <code>clear</code> will clear the highlighting over the active match; <code>keep</code> will keep the active match highlighted; <code>activate</code> will keep the active match highlighted and simulate a user click on that match. The default action is <code>keep</code>.
     */
    export function stopFinding(
      action?: "clear" | "keep" | "activate",
    ): void;

    /**
     * Loads a data URL with a specified base URL used for relative links.
     * Optionally, a virtual URL can be provided to be shown to the user instead of
     * the data URL.
     * @param dataUrl The data URL to load.
     * @param baseUrl The base URL that will be used for relative links.
     * @param virtualUrl The URL that will be displayed to the user.
     */
    export function loadDataWithBaseUrl(
      dataUrl: string,
      baseUrl: string,
      virtualUrl?: string,
    ): void;

    /**
     * Forcibly kills the guest web page's renderer process. This may affect
     * multiple <code>webview</code> tags in the current app if they share the same
     * process, but it will not affect <code>webview</code> tags in other apps.
     */
    export function terminate(): void;

    /**
     * Fired when the guest window attempts to close itself.<p>The following
     * example code navigates the webview to <code>about:blank</code> when the
     * guest attempts to close itself.</p><pre>webview.addEventListener('close',
     * function() {  webview.src = 'about:blank';});</pre>
     */
    export const close: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the guest window logs a console message.<p>The following
     * example code forwards all log messages to the embedder's console without
     * regard for log level or other
     * properties.</p><pre>webview.addEventListener('consolemessage',
     * function(e) {  console.log('Guest page logged a message: ',
     * e.message);});</pre>
     */
    export const consolemessage: chrome.events.Event<
      /**
       * @param level The severity level of the log message. Ranges from 0 to 4.
       * @param message The logged message contents.
       * @param line The line number of the message source.
       * @param sourceId A string identifying the resource which logged the message.
       */
      (
        level: number,
        message: string,
        line: number,
        sourceId: string,
      ) => void
    >;

    /**
     * Fired when the guest window fires a <code>load</code> event, i.e., when a
     * new document is loaded. This does <em>not</em> include page navigation
     * within the current document or asynchronous resource loads. <p>The
     * following example code modifies the default font size of the guest's
     * <code>body</code> element after the page
     * loads:</p><pre>webview.addEventListener('contentload', function() {
     * webview.executeScript({ code: 'document.body.style.fontSize = "42px"'
     * });});</pre>
     */
    export const contentload: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the guest window attempts to open a modal dialog via
     * <code>window.alert</code>, <code>window.confirm</code>, or
     * <code>window.prompt</code>.<p>Handling this event will block the guest
     * process until each event listener returns or the <code>dialog</code>
     * object becomes unreachable (if <code>preventDefault()</code> was
     * called.)</p><p>The default behavior is to cancel the dialog.</p>
     */
    export const dialog: chrome.events.Event<
      /**
       * @param messageType The type of modal dialog requested by the guest.
       * @param messageText The text the guest attempted to display in the modal dialog.
       * @param dialog An interface that can be used to respond to the guest's modal request.
       */
      (
        messageType: "alert" | "confirm" | "prompt",
        messageText: string,
        dialog: DialogController,
      ) => void
    >;

    /**
     * Fired when the process rendering the guest web content has exited.<p>The
     * following example code will show a farewell message whenever the guest
     * page crashes:</p><pre>webview.addEventListener('exit', function(e) {  if
     * (e.reason === 'crash') {    webview.src = 'data:text/plain,Goodbye,
     * world!';  }});</pre>
     */
    export const exit: chrome.events.Event<
      /**
       * @param processID Chrome's internal ID of the process that exited.
       * @param reason String indicating the reason for the exit.
       */
      (
        processID: number,
        reason: "normal" | "abnormal" | "crash" | "kill",
      ) => void
    >;

    /**
     * Fired when new find results are available for an active find request.
     * This might happen multiple times for a single find request as matches are
     * found.
     */
    export const findupdate: chrome.events.Event<
      /**
       * @param searchText The string that is being searched for in the page.
       * @param numberOfMatches The number of matches found for <code>searchText</code> on the page so far.
       * @param activeMatchOrdinal The ordinal number of the current active match, if it has been found. This will be <code>0</code> until then.
       * @param selectionRect Describes a rectangle around the active match, if it has been found, in screen coordinates.
       * @param canceled Indicates whether the find request was canceled.
       * @param finalUpdate Indicates that all find requests have completed and that no more <code>findupdate</code> events will be fired until more find requests are made.
       */
      (
        searchText: string,
        numberOfMatches: number,
        activeMatchOrdinal: number,
        selectionRect: SelectionRect,
        canceled: boolean,
        finalUpdate: string,
      ) => void
    >;

    /**
     * Fired when a top-level load has aborted without committing. <p
     * class="note"><strong>Note:</strong> When a resource load is aborted, a
     * <code>loadabort</code> event will eventually be followed by a
     * <code>loadstop</code> event, even if all committed loads since the last
     * <code>loadstop</code> event (if any) were aborted.</p>
     */
    export const loadabort: chrome.events.Event<
      /**
       * @param url Requested URL.
       * @param isTopLevel Whether the load was top-level or in a subframe.
       * @param reason String indicating what type of abort occurred.
       */
      (
        url: string,
        isTopLevel: boolean,
        reason: "networkError" | "download" | "canceled" | "sslError" | "safeBrowsingError",
      ) => void
    >;

    /**
     * Fired when a load has committed. This includes navigation within the
     * current document as well as subframe document-level loads, but does
     * <em>not</em> include asynchronous resource loads.
     */
    export const loadcommit: chrome.events.Event<
      /**
       * @param url The URL that committed.
       * @param isTopLevel Whether the load is top-level or in a subframe.
       */
      (
        url: string,
        isTopLevel: boolean,
      ) => void
    >;

    /**
     * Fired when a top-level load request has redirected to a different URL.
     */
    export const loadredirect: chrome.events.Event<
      /**
       * @param oldUrl The requested URL before the redirect.
       * @param newUrl The new URL after the redirect.
       * @param isTopLevel Whether or not the redirect happened at top-level or in a subframe.
       */
      (
        oldUrl: string,
        newUrl: string,
        isTopLevel: boolean,
      ) => void
    >;

    /**
     * Fired when a load has begun.
     */
    export const loadstart: chrome.events.Event<
      /**
       * @param url Requested URL.
       * @param isTopLevel Whether the load is top-level or in a subframe.
       */
      (
        url: string,
        isTopLevel: boolean,
      ) => void
    >;

    /**
     * Fired when all frame-level loads in a guest page (including all its
     * subframes) have completed. This includes navigation within the current
     * document as well as subframe document-level loads, but does <em>not</em>
     * include asynchronous resource loads. This event fires every time the
     * number of document-level loads transitions from one (or more) to zero.
     * For example, if a page that has already finished loading (i.e.,
     * <code>loadstop</code> already fired once) creates a new iframe which
     * loads a page, then a second <code>loadstop</code> will fire when the
     * iframe page load completes. This pattern is commonly observed on pages
     * that load ads. <p class="note"><strong>Note:</strong> When a committed
     * load is aborted, a <code>loadstop</code> event will eventually follow a
     * <code>loadabort</code> event, even if all committed loads since the last
     * <code>loadstop</code> event (if any) were aborted.</p>
     */
    export const loadstop: chrome.events.Event<
      () => void
    >;

    /**
     * Fired when the guest page attempts to open a new browser window.<p>The
     * following example code will create and navigate a new
     * <code>webview</code> in the embedder for each requested new
     * window:</p><pre>webview.addEventListener('newwindow', function(e) {  var
     * newWebview = document.createElement('webview');
     * document.body.appendChild(newWebview);
     * e.window.attach(newWebview);});</pre>
     */
    export const newwindow: chrome.events.Event<
      /**
       * @param window An interface that can be used to either attach the requested target page to an existing <code>webview</code> element or explicitly discard the request.
       * @param targetUrl The target URL requested for the new window.
       * @param initialWidth The initial width requested for the new window.
       * @param initialHeight The initial height requested for the new window.
       * @param name The requested name of the new window.
       * @param windowOpenDisposition The requested disposition of the new window.
       */
      (
        window: NewWindow,
        targetUrl: string,
        initialWidth: number,
        initialHeight: number,
        name: string,
        windowOpenDisposition: "ignore" | "save_to_disk" | "current_tab" | "new_background_tab" | "new_foreground_tab" | "new_window" | "new_popup",
      ) => void
    >;

    /**
     * Fired when the guest page needs to request special permission from the
     * embedder.<p>The following example code will grant the guest page access
     * to the <code>webkitGetUserMedia</code> API. Note that an app using this
     * example code must itself specify <code>audioCapture</code> and/or
     * <code>videoCapture</code> manifest
     * permissions:</p><pre>webview.addEventListener('permissionrequest',
     * function(e) {  if (e.permission === 'media') {    e.request.allow();
     * }});</pre>
     */
    export const permissionrequest: chrome.events.Event<
      /**
       * @param permission The type of permission being requested.
       * @param requestId A number which uniquely identifies this request from the guest.
       * @param request An object which holds details of the requested permission. Depending on the type of permission requested, this may be a {@link webviewTag.MediaPermissionRequest}, {@link webviewTag.GeolocationPermissionRequest}, {@link webviewTag.PointerLockPermissionRequest}, {@link webviewTag.DownloadPermissionRequest}, or {@link webviewTag.LoadPluginPermissionRequest}.
       */
      (
        permission: "media" | "geolocation" | "pointerLock" | "download" | "loadplugin" | "filesystem",
        requestId: number,
        request: object,
      ) => void
    >;

    /**
     * Fired when the process rendering the guest web content has become
     * responsive again after being unresponsive.<p>The following example code
     * will fade the <code>webview</code> element in or out as it becomes
     * responsive or unresponsive:</p><pre>webview.style.webkitTransition =
     * 'opacity 250ms';webview.addEventListener('unresponsive', function() {
     * webview.style.opacity = '0.5';});webview.addEventListener('responsive',
     * function() {  webview.style.opacity = '1';});</pre>
     */
    export const responsive: chrome.events.Event<
      /**
       * @param processID Chrome's internal ID of the process that became responsive.
       */
      (
        processID: number,
      ) => void
    >;

    /**
     * Fired when the embedded web content has been resized. Only fires if
     * <code>autosize</code> is enabled.
     */
    export const sizechanged: chrome.events.Event<
      /**
       * @param oldWidth Old width of embedded web content.
       * @param oldHeight Old height of embedded web content.
       * @param newWidth New width of embedded web content.
       * @param newHeight New height of embedded web content.
       */
      (
        oldWidth: number,
        oldHeight: number,
        newWidth: number,
        newHeight: number,
      ) => void
    >;

    /**
     * Fired when the process rendering the guest web content has become
     * unresponsive. This event will be generated once with a matching
     * responsive event if the guest begins to respond again.
     */
    export const unresponsive: chrome.events.Event<
      /**
       * @param processID Chrome's internal ID of the process that has become unresponsive.
       */
      (
        processID: number,
      ) => void
    >;

    /**
     * Fired when the page's zoom changes.
     */
    export const zoomchange: chrome.events.Event<
      /**
       * @param oldZoomFactor The page's previous zoom factor.
       * @param newZoomFactor The new zoom factor that the page was zoomed to.
       */
      (
        oldZoomFactor: number,
        newZoomFactor: number,
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
