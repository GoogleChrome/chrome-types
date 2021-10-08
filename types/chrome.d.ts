
export interface ChromeVersionsData {
  head: string;
  releases: Map<number, { revision: string, version: string }>;
}
