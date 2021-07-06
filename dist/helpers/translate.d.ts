import { I18nRequestScopeService } from 'nestjs-i18n';
declare const translationFiles: {
    resource: {
        property1: string;
        property2: string;
    };
};
declare type files = typeof translationFiles;
export declare const translate: <T extends "resource">(translator: I18nRequestScopeService, file: T, key: keyof {
    resource: {
        property1: string;
        property2: string;
    };
}[T], value?: Array<string | number>) => Promise<string>;
export {};
