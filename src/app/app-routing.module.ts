import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { MajProduitComponent } from './maj-produit/maj-produit.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { LoginComponent } from './login/login.component';
import { ProduitGuard } from './produit.guard';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: "produits", component : ProduitsComponent},
  {path : "add-produit", component : AjoutProduitComponent},
  {path:'register',component:RegisterComponent},
  {path:"miseajour-produit/:id",component:MajProduitComponent},
  {path: "listeCategories", component : ListeCategoriesComponent},
  {path: 'login', component: LoginComponent},
  { path: "", redirectTo: "produits", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
