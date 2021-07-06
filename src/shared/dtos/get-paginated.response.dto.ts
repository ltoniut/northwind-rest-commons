import { IsNumber, IsObject } from 'class-validator';
import { PageQuery } from './page-query';
import { ResponseDTO } from './response.dto';

interface TLinks {
  self: string;
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export const DefaultPageLimit = 20;

export class GetPaginatedResponseDTO<T> extends ResponseDTO<T[]> {
  /**
   * Page Links
   */
  @IsObject()
  links: TLinks;

  /**
   * Meta Object
   */
  @IsObject()
  meta?: object;

  /**
   * Current page
   */
  @IsNumber()
  page: number;

  /**
   * Limit of number by page
   */
  @IsNumber()
  limit: number;

  /**
   * Total record on the database
   */
  @IsNumber()
  count: number;

  /**
   * Number of pages
   */
  @IsNumber()
  pages: number;

  /**
   * Page
   * @param list List of Items
   * @param filter GetFilterDTO
   * @param count Total Record Count
   * @param meta Metadata
   */
  constructor(list: T[], filter: PageQuery, count: number, meta?: object) {
    super(list, meta);

    const { page } = filter;
    const limit = filter.limit || DefaultPageLimit;

    this.page = typeof page !== 'undefined' ? page : 1;
    this.limit = limit;
    this.count = count;

    if (count > limit) {
      this.pages = count / limit;
      if (count % limit !== 0) {
        this.pages = Math.floor(this.pages) + 1;
      }
    } else {
      this.pages = 1;
    }

    // Call method to mount the links
    if (this.page <= this.pages) {
      this.mountLinks(filter);
    }
  }

  mountLinks(filter: PageQuery): void {
    const currentPage: number = this.page;
    const lastPage: number =
      this.pages === 1 || currentPage === this.pages ? 0 : this.pages;
    const prevPage: number = this.page === 1 ? 0 : this.page;
    const nextPage: number = currentPage < lastPage ? currentPage + 1 : 0;

    const { baseUrl } = filter;
    const search = new URLSearchParams();
    Object.entries(filter)
      .filter(([key, val]) => {
        switch (key) {
          case 'baseUrl': // doesn't belong to the url
            return false;
          case 'filterValues': // calculated value
            return false;
          case 'offset': // calculated value
            return false;
          default:
            // only if a value is provided
            return !!val;
        }
      })
      .forEach(([key, val]) => {
        search.append(key, `${val}`);
      });

    const links: TLinks = {
      self: this.mountUrl(baseUrl || '/', search, { page: currentPage }),
      first:
        this.page === 1
          ? null
          : this.mountUrl(baseUrl || '/', search, { page: 1 }),
      last:
        lastPage === 0
          ? null
          : this.mountUrl(baseUrl || '/', search, { page: lastPage }),
      prev:
        prevPage === 0
          ? null
          : this.mountUrl(baseUrl || '/', search, { page: prevPage }),
      next:
        nextPage === 0
          ? null
          : this.mountUrl(baseUrl || '/', search, { page: nextPage }),
    };
    this.links = links;
  }

  mountUrl(
    baseUrl: string,
    search: URLSearchParams,
    keys: Record<string, any>,
  ): string {
    search = new URLSearchParams(search);
    Object.entries(keys).forEach(([key, val]) => {
      search.append(key, `${val}`);
    });
    const sSearch = search.toString();
    return `${baseUrl}${sSearch ? '?' : ''}${sSearch}`;
  }

  mountMeta(meta: object | undefined): void {
    this.meta = meta;
  }
}
