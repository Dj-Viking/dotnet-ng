import { enableProdMode, StaticProvider } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
    return document.querySelector<HTMLBaseElement>('base#prod')!.href;
}
export function getLocalBaseUrl() {
    return document.querySelector<HTMLBaseElement>('base#dev')!.href;
}

let providers = [] as StaticProvider[]

if (environment.production) {
    enableProdMode();
    providers = [
        { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
    ];
} else {
    providers = [
        { provide: 'BASE_URL', useFactory: getLocalBaseUrl, deps: [] }
    ];
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
    .catch(err => console.log(err));
