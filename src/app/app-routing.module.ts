import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/portada/portada.module').then( m => m.PortadaPageModule)
  },
  {
    path:'login',
    loadChildren:()=>import('./paginas/login/login.module').then(m=>m.LoginPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./paginas/camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'confirmar',
    loadChildren: () => import('./paginas/confirmar/confirmar.module').then( m => m.ConfirmarPageModule)
  },
  {
    path: 'exito',
    loadChildren: () => import('./paginas/exito/exito.module').then( m => m.ExitoPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
