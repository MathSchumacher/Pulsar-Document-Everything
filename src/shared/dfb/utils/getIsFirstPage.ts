import { IDocumentation } from '~/database/models/Documentation';

export function getIsFirstPage(doc: IDocumentation, pageId: number) {
  const result = doc.pages.filter(p => p.categoryId === doc.categories[0].id)[0].id === pageId? true : false;
  return result;
}