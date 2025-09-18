import { Routes } from '@angular/router';
import { ManageProject } from './manage-project/manage-project';
import { ManageWorker } from './manage-worker/manage-worker';

export default [
    { path: 'manage-project', component: ManageProject },
    { path: 'manage-worker', component: ManageWorker },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
