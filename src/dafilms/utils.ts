export const getMovieAndYear = (isCzech: boolean): { movie: string | undefined; year: string | null | undefined } => {
  if (isCzech) {
    const movie = getValue('Originální název')?.split('/')[0];
    const year = getValue('Rok');
    return { movie, year };
  } else {
    const movie = getValue('Original title')?.split('/')[0];
    const year = getValue('Year');
    return { movie, year };
  }
}

const getValue = (name: string): string | null | undefined => {
  const labels: HTMLDivElement[] = Array.from(document.querySelectorAll('.list-details .label'));
  const label = labels.find((x) => x.textContent === name);
  return label?.parentNode?.querySelector('.value')?.textContent;
}

export const getButtonRootElements = (): { root: HTMLElement, placingNode: Element | null } => {
  const placingNode = document.querySelector('.film-access ul li');
  const root = document.createElement('li');
  root.classList.add('dafilms-ext');
  return { root, placingNode };
}
