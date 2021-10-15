// These are stubs for DOM APIs not nessecarily available in TS' defaults.
interface Entry {}
interface FileEntry extends Entry {}
interface DirectoryEntry extends Entry {}
interface LocalMediaStream {}
interface DOMFileSystem extends FileSystem {}

// This is used to support addListener() where additional parameters are supported.
// The name is detected inside the developer.chrome.com repository and special actions are taken.
type InternalEventExtraParameters<H extends { addListener(callback: any, ...rest: any): void }> =
    Omit<chrome.events.Event<Parameters<H['addListener']>[0]>, 'addListener'> & Readonly<H>;

