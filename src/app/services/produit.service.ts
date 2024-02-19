import { Injectable } from '@angular/core';
import { Produit } from '../models/produit.model';
import { Categorie } from '../models/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../models/CategorieWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../models/image.model';
const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  
 
  apiURLCat: string = 'http://localhost:8080/mstechnology/cat';
  apiURL: string = 'http://localhost:8080/mstechnology/api';
  produits! : Produit[]; //un tableau de produits
  //categories : Categorie[];
 

  constructor(private http : HttpClient,
              private authService : AuthService) { 
    
    /* this.categories = [
      {idCat : 1, nomCat : "PC"},
      {idCat : 2, nomCat : "Imprimante"}
    ]; */
  /*  this.produits = [{idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011"),
                      categorie : {idCat : 1, nomCat : "PC"} },
                     {idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010"),
                    categorie :  {idCat : 2, nomCat : "Imprimante"}},
                     {idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020"), 
                     categorie : {idCat : 1, nomCat : "PC"}}
                    ];
                    */
    
  }

  listeProduit(): Observable<Produit[]>{
    return this.http.get<Produit[]>(this.apiURL+"/all");
   }

    ajouterProduit( prod: Produit):Observable<Produit>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        return this.http.post<Produit>(this.apiURL+"/addprod", prod, {headers:httpHeaders});
      }
      uploadImage(file: File, filename: string): Observable<Image>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/upload'}`;
        return this.http.post<Image>(url, imageFormData);
        }
        loadImage(id: number): Observable<Image> {
        const url = `${this.apiURL + '/image/get/info'}/${id}`;
        return this.http.get<Image>(url);
        }
      
   
  supprimerProduit(id : number) {
       const url = `${this.apiURL}/delprod/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
          return this.http.delete(url,  {headers:httpHeaders});
        }
      
   consulterProduit(id: number): Observable<Produit> {
          const url = `${this.apiURL}/getbyid/${id}`;
          console.log(url);
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
            return this.http.get<Produit>(url,{headers:httpHeaders});
          }
  
    majProduit(prod :Produit) : Observable<Produit>    {
       console.log("prooooooooooood "+prod);
        console.log(prod.categorie);
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
            return this.http.put<Produit>(this.apiURL+"/updateprod", prod, {headers:httpHeaders});
          }
  

         
       listeCategories():Observable<CategorieWrapper>{
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return  this.http.get<CategorieWrapper>(this.apiURLCat,{headers:httpHeaders});
        
            }     

       rechercherParCategorie(idCat: number): Observable<Produit[]> {
          const url = `${this.apiURL}/prodscat/${idCat}`;
          return this.http.get<Produit[]>(url);
         } 

  rechercherParNom(nom: string):Observable< Produit[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
    }

    ajouterCategorie( cat: Categorie):Observable<Categorie>{
      return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
      }
      uploadImageProd(file: File, filename: string, idProd:number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/uplaodImageProd'}/${idProd}`;
        return this.http.post(url, imageFormData);
        }
        supprimerImage(id : number) {
          const url = `${this.apiURL}/image/delete/${id}`;
          return this.http.delete(url, httpOptions);
          }
          

 
}