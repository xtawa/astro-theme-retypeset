declare module '@pagefind/default-ui' {
  interface PagefindUIOptions {
    element?: string | HTMLElement;
    showSubResults?: boolean;
    showImages?: boolean;
    excerptLength?: number;
    processResult?: (result: any) => any;
    processTerm?: (term: string) => string;
    showEmptyFilters?: boolean;
    debounceTimeoutMs?: number;
    mergeIndex?: Array<{ bundlePath: string; }>;
    translations?: {
      placeholder?: string;
      clear_search?: string;
      load_more?: string;
      search_label?: string;
      filters_label?: string;
      zero_results?: string;
      many_results?: string;
      one_result?: string;
      alt_search?: string;
      search_suggestion?: string;
      searching?: string;
    };
    autofocus?: boolean;
    sort?: { [key: string]: 'asc' | 'desc' };
    bundlePath?: string;
    baseUrl?: string;
    resetStyles?: boolean;
  }

  export class PagefindUI {
    constructor(options: PagefindUIOptions);
    triggerSearch(query: string): void;
    destroy(): void;
  }
}
