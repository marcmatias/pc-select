export default async function lang(value) {
  let result = value == 'ptBR' ? await import('./pt-br') : await import('./en-us');
  return result.default;
}
