/** Keep reading space on small screens without changing the header's layout height. */
export function installMobileHeader(
  header: HTMLElement,
  menu: HTMLDialogElement,
  browser: Window,
  doc: Document,
) {
  const mobile = browser.matchMedia('(max-width: 950px)');
  let previousY = 0;
  let direction = 0;
  let travel = 0;
  let headerHeight = header.offsetHeight;
  let frame: number | undefined;

  function scrollPosition() {
    // Clamp elastic overscroll at either end of the document (including iOS Safari).
    const end = Math.max(0, doc.documentElement.scrollHeight - browser.innerHeight);
    return Math.min(end, Math.max(0, browser.scrollY));
  }
  function reveal() {
    delete header.dataset.scrollHidden;
  }
  function reset() {
    previousY = scrollPosition();
    headerHeight = header.offsetHeight;
    direction = 0;
    travel = 0;
    reveal();
  }
  function update() {
    frame = undefined;
    const currentY = scrollPosition();
    const delta = currentY - previousY;
    previousY = currentY;
    if (
      !mobile.matches ||
      menu.open ||
      header.querySelector(':focus-visible') ||
      currentY <= headerHeight + 24
    ) {
      direction = 0;
      travel = 0;
      reveal();
      return;
    }
    if (!delta) return;
    const nextDirection = Math.sign(delta);
    if (direction !== nextDirection) {
      direction = nextDirection;
      travel = 0;
    }
    travel += Math.abs(delta);
    // Hysteresis ignores tiny finger movements; a deliberate upward scroll reveals sooner.
    if (direction > 0 && travel >= 14) header.dataset.scrollHidden = 'true';
    else if (direction < 0 && travel >= 8) reveal();
  }
  function queueUpdate() {
    if (frame === undefined) frame = browser.requestAnimationFrame(update);
  }
  const menuObserver = new MutationObserver(reset);
  menuObserver.observe(menu, { attributes: true, attributeFilter: ['open'] });
  browser.addEventListener('scroll', queueUpdate, { passive: true });
  browser.addEventListener('resize', reset);
  browser.addEventListener('pageshow', reset);
  browser.addEventListener('hashchange', reset);
  mobile.addEventListener('change', reset);
  header.addEventListener('focusin', reset);
  reset();

  return () => {
    if (frame !== undefined) browser.cancelAnimationFrame(frame);
    browser.removeEventListener('scroll', queueUpdate);
    browser.removeEventListener('resize', reset);
    browser.removeEventListener('pageshow', reset);
    browser.removeEventListener('hashchange', reset);
    mobile.removeEventListener('change', reset);
    header.removeEventListener('focusin', reset);
    menuObserver.disconnect();
    reveal();
  };
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  const header = document.querySelector<HTMLElement>('.site-header');
  const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
  if (header && menu) installMobileHeader(header, menu, window, document);
}
