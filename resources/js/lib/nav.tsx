/**
 * Navigation adapters for Inertia.
 *
 * The design was built with TanStack Router. These helpers keep the same
 * call-site shape (`to="/product/$slug" params={{ slug }} search={{ ... }}`) so the
 * JSX in the components stays identical, but navigation is performed by Inertia.
 */
import { forwardRef, useCallback, useMemo, type ComponentPropsWithoutRef } from "react";
import { Link as InertiaLink, router, usePage } from "@inertiajs/react";
import type { ZodTypeAny, z } from "zod";
import { cn } from "@/lib/utils";

type Params = Record<string, string | number>;
type SearchValue = string | number | boolean | null | undefined;
export type SearchObject = Record<string, SearchValue>;
export type SearchInput = SearchObject | ((prev: SearchObject) => SearchObject);

/** Split an Inertia page url ("/blog?q=x") into path and query string. */
function splitUrl(url: string) {
  const i = url.indexOf("?");
  const pathAndHash = i === -1 ? url : url.slice(0, i);
  const query = i === -1 ? "" : url.slice(i + 1).replace(/#.*$/, "");
  return { path: pathAndHash.replace(/#.*$/, ""), query };
}

export function parseQuery(query: string): SearchObject {
  const out: SearchObject = {};
  new URLSearchParams(query).forEach((value, key) => { out[key] = value; });
  return out;
}

export function serializeSearch(search: SearchObject): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (value === undefined || value === null || value === "") continue;
    params.set(key, String(value));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

/** Fill "$param" segments of a route pattern. */
export function fillPath(to: string, params?: Params): string {
  if (!params) return to;
  return to.replace(/\$([A-Za-z0-9_]+)/g, (_m, name: string) => encodeURIComponent(String(params[name] ?? "")));
}

export function buildHref(to: string, params?: Params, search?: SearchInput, currentQuery = ""): string {
  const resolved = typeof search === "function" ? search(parseQuery(currentQuery)) : search;
  return fillPath(to, params) + (resolved ? serializeSearch(resolved) : "");
}

function normalize(path: string) {
  const p = path.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function isActivePath(current: string, target: string, exact = false) {
  const a = normalize(current);
  const b = normalize(target);
  if (exact || b === "/") return a === b;
  return a === b || a.startsWith(`${b}/`);
}

type AppLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  to: string;
  params?: Params;
  search?: SearchInput;
  activeOptions?: { exact?: boolean };
  activeProps?: ComponentPropsWithoutRef<"a"> & Record<string, unknown>;
  /** TanStack naming: `false` keeps the scroll position. */
  resetScroll?: boolean;
};

/**
 * Drop-in replacement for TanStack's <Link>. Like TanStack it marks the active route
 * with aria-current="page" and data-status="active", and merges `activeProps`.
 */
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(function AppLink(
  { to, params, search, activeOptions, activeProps, resetScroll = true, className, ...rest },
  ref,
) {
  const { url } = usePage();
  const { path: currentPath, query: currentQuery } = splitUrl(url);
  const href = buildHref(to, params, search, currentQuery);
  const active = isActivePath(currentPath, splitUrl(href).path, activeOptions?.exact);
  const { className: activeClass, ...activeRest } = (active ? activeProps : undefined) ?? {};
  return (
    <InertiaLink
      ref={ref}
      href={href}
      preserveScroll={!resetScroll}
      data-status={active ? "active" : undefined}
      aria-current={active ? "page" : undefined}
      {...(rest as Record<string, unknown>)}
      {...(activeRest as Record<string, unknown>)}
      className={cn(className, activeClass)}
    />
  );
});

type NavigateOptions = {
  to: string;
  params?: Params;
  search?: SearchInput;
  replace?: boolean;
  resetScroll?: boolean;
};

/** Replacement for TanStack's useNavigate() with the same `{ to, params, search }` options. */
export function useAppNavigate() {
  return useCallback((opts: NavigateOptions) => {
    const query = typeof window === "undefined" ? "" : window.location.search.replace(/^\?/, "");
    const href = buildHref(opts.to, opts.params, opts.search, query);
    router.visit(href, { replace: opts.replace ?? false, preserveScroll: opts.resetScroll === false });
  }, []);
}

/**
 * Typed, validated read of the current URL's query string plus a setter that updates the
 * URL on the client only (no server round-trip, no page reload). Replaces
 * Route.useSearch() / Route.useNavigate({ search }).
 */
export function useUrlSearch<S extends ZodTypeAny>(schema: S) {
  const { url } = usePage();
  const query = splitUrl(url).query;
  const search = useMemo(() => schema.parse(parseQuery(query)) as z.infer<S>, [schema, query]);
  const setSearch = useCallback(
    (next: SearchInput, opts: { replace?: boolean; resetScroll?: boolean } = {}) => {
      const current = splitUrl(window.location.pathname + window.location.search);
      const resolved = typeof next === "function" ? next(parseQuery(current.query)) : next;
      const nextUrl = current.path + serializeSearch(resolved);
      const visit = { url: nextUrl, preserveScroll: opts.resetScroll === false || opts.replace === true, preserveState: true };
      if (opts.replace) router.replace(visit);
      else router.push(visit);
    },
    [],
  );
  return [search, setSearch] as const;
}
