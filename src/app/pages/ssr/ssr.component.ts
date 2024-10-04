import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ssr',
  standalone: true,
  imports: [CardComponent, HttpClientModule, CommonModule],
  templateUrl: './ssr.component.html',
  styleUrl: './ssr.component.scss',
  host: {
    'class': 'content'
  }
})
export class SsrComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private http = inject(HttpClient);

  public product: Product = {
    id: 0,
    name: '',
    availability: '',
    badges: '',
    brand: {
      id: 0,
      name: '',
      slug: '',
      imagen: ''
    },
    compareAtPrice: 0,
    images: [],
    price: 0,
    priceunit: 0,
    taxes: 0,
    discount: 0,
    discountPerc: 0,
    descUM: '',
    um: '',
    rating: 0,
    reviews: 0,
    sku: '',
    slug: '',
    idMarca: 0,
    marca: '',
    tieneDescuento: '',
    color: '',
    colorhx: '',
    valorIndividual: '',
    inventario: 0,
    inventarioPedido: 0,
    caracteristicas: '',
    observaciones: ''
  };


  ngOnInit(): void {
    this.getProduct().pipe(
      tap((response) => {
        const { articulo } = response;
        this.product = articulo;
    
        const title = this.product.name;
        const description = this.product.caracteristicas || this.product.observaciones;
        const price = this.product.price;
        const sku = this.product.sku;
        const brand = this.product.marca;
        const imageUrl = this.product.images[0];
        const availability = this.product.availability;
        
        // Actualizar el título de la página
        this.title.setTitle(`${title} | Carro Compras`);
    
        // Agregar meta tags dinámicamente
        this.meta.addTags([
          { name: 'title', content: `${title} | Carro Compras` },
          { name: 'description', content: description },
          { name: 'keywords', content: `chocolatina, ${brand.toLowerCase()}, italo, ${this.product.color}, ${title}, comprar, oferta` },
          { property: 'og:type', content: 'product' },
          { property: 'og:title', content: `${title} | Carro Compras` },
          { property: 'og:description', content: description },
          { property: 'og:image', content: imageUrl },
          { property: 'og:url', content: window.location.href },
          { property: 'og:price:amount', content: `${price}` },
          { property: 'og:price:currency', content: 'COP' },
          { property: 'product:brand', content: brand },
          { property: 'product:availability', content: availability },
          { property: 'product:retailer_item_id', content: sku },
        ]);
      })
    ).subscribe();
    

  }

  getProduct(): Observable<any> {
    return this.http.get<any>("https://clouderp.abakoerp.com:9480/ApiCarroCompras/api/Articulos/RecuperarArticuloDetalleCarroCompras/0/5883");
  }
}
