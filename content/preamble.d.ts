// Force this to be a module.
export {};

// These are stubs for DOM APIs not nessecarily available in TS' defaults.
interface Entry {}
interface FileEntry extends Entry {}
interface DirectoryEntry extends Entry {}
interface LocalMediaStream {}
interface DOMFileSystem extends FileSystem {}

// This is used to support addListener() where additional parameters are supported.
// The name is detected inside the developer.chrome.com repository and special actions are taken.
type CustomChromeEvent<H extends (...args: any) => void> =
  Omit<chrome.events.Event<H>, 'addListener'> & {

    // nb. This just copies the description from `chrome.events.Event.addListener`.
    /**
     * Registers an event listener _callback_ to an event.
     */
    readonly addListener: H;

  };
