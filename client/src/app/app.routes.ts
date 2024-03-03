import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AnimalEditorComponent } from './components';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'new-animal', component: AnimalEditorComponent },
];
