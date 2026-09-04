/** True for links that leave the site, so they get target/rel and an external icon. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
