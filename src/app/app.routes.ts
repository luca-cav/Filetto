import { Routes } from '@angular/router';

export const routes: Routes = [
    {   path: "",
        loadComponent: () => import("./match/match").then(m => m.Match),
    },
    {
        path: "invite/:roomId",
        loadComponent: () => import("./match/match").then(m => m.Match),
    },
];
