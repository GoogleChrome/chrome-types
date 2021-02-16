// These are stubs for DOM APIs not nessecarily available in TS' defaults.
interface Entry {}
interface DirectoryEntry extends Entry {}
interface FileEntry extends Entry {}
interface FileSystem {}
interface LocalMediaStream {}
type DOMFileSystem = FileSystem;

declare namespace chrome {
 // This fixes devtools' types which refer to 'global'.
 type global = typeof Window;
}