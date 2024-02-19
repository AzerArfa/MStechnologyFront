import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../models/categorie.model';
import { Image } from '../models/image.model';
@Component({
  selector: 'app-maj-produit',
  templateUrl: './maj-produit.component.html',
  styleUrls: ['./maj-produit.component.css']
})
export class MajProduitComponent implements OnInit {
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;
  
  currentProduit = new Produit();
  categories! : Categorie[];
  updatedCatId! : number;
  
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private produitService: ProduitService) { }

              ngOnInit(): void {
                this.produitService.listeCategories().
                subscribe(cats => {this.categories = cats._embedded.categories;
                });
                this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id'])
                .subscribe( prod =>{ this.currentProduit = prod;
                this.updatedCatId = prod.categorie.idCat;
                } ) ;
                }
                onAddImageProduit() {
                  this.produitService
                  .uploadImageProd(this.uploadedImage,
                  this.uploadedImage.name,this.currentProduit.idProduit)
                  .subscribe( (img : Image) => {
                  this.currentProduit.images.push(img);
                  });
                  }
                  
    

  

                  majProduit() {
                    this.currentProduit.categorie = this.categories.find(cat => cat.idCat ==
                      this.updatedCatId)!;
                      this.produitService
                      .majProduit(this.currentProduit)
                      .subscribe((prod) => {
                      this.router.navigate(['produits']);
                      });
                      
                    }
  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
    }
    supprimerImage(img: Image){
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.produitService.supprimerImage(img.idImage).subscribe(() => {
      //supprimer image du tableau currentProduit.images
      const index = this.currentProduit.images.indexOf(img, 0);
      if (index > -1) {
      this.currentProduit.images.splice(index, 1);
      }
      });
      }
    
}