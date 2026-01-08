import { Routes } from '@angular/router';
import { ManageProject } from './manage-project/manage-project';
import { ManageTasks } from './manage-tasks/manage-tasks';
import { ManageWorker } from './manage-worker/manage-worker';


export default [
    { path: 'project', component: ManageProject },
    { path: 'tasks', component: ManageTasks },
    { path: 'worker', component: ManageWorker },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
