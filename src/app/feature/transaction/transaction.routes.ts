import { Routes } from '@angular/router';
import { DailyPlan } from './daily-plan/daily-plan';



export default [
    { path: 'daily-plan', component: DailyPlan },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
