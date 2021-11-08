export function isViewingFromMobileDevice(): boolean {
  const tabletViewportBreakpoint = 768;
  return window.innerWidth <= tabletViewportBreakpoint;
}
