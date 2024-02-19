import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../models/categorie.model';
import { Router } from '@angular/router';
import { Image } from '../models/image.model';
@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit{
  newProduit = new Produit();
  categories! : Categorie[];
newIdCat! : number;
newCategorie! : Categorie;
uploadedImage!: File;
imagePath: any;

  constructor(private produitService: ProduitService,private router :Router) { }
  ngOnInit(): void {
    this.produitService.listeCategories().
    subscribe(cats => {console.log(cats);
    this.categories = cats._embedded.categories;
    }
    );
    }
    
    addProduit(){
      this.produitService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.newProduit.image=img;
      this.newProduit.categorie = this.categories.find(cat => cat.idCat
      == this.newIdCat)!;
      this.produitService
      .ajouterProduit(this.newProduit)
      .subscribe(() => {
      this.router.navigate(['produits']);
      });
      });
      }
      onImageUpload(event: any) {
        this.uploadedImage = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(this.uploadedImage);
        reader.onload = (_event) => { this.imagePath = reader.result; }
        }
        
}
