import { I18nRequestScopeService } from 'nestjs-i18n';
// MAKE SURE the name of your import matches the name of the file you are importing
import resource from '@src/i18n/en/resource.json';

const translationFiles = {
  resource,
};

type files = typeof translationFiles;

export const translate = async <T extends keyof files>(
  translator: I18nRequestScopeService,
  file: T,
  key: keyof files[T],
  value?: Array<string | number>,
): Promise<string> => {
  const translationKey = `${file}.${key}`;
  return value?.length
    ? translator.translate(translationKey, { args: value })
    : translator.translate(translationKey);
};
