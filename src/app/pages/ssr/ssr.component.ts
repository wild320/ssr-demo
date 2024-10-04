import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ssr',
  standalone: true,
  imports: [CardComponent, HttpClientModule, CommonModule],
  templateUrl: './ssr.component.html',
  styleUrls: ['./ssr.component.scss'],
  host: {
    'class': 'content'
  }
})
export class SsrComponent implements OnInit, OnDestroy {
  private title = inject(Title);
  private meta = inject(Meta);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>(); 
  hasProduct = false;
  
  productId: string | null = null;
  product: Product | null = null;
  img: string | null = null;

  ngOnInit(): void {
    this.getProductIdFromRoute();
    this.loadProductData();
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones cuando el componente sea destruido
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Método para obtener el ID del producto desde la URL
  private getProductIdFromRoute(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.productId = params.get('id');
      console.log('Product ID:', this.productId);
    });
  }

  // Método para cargar datos del producto
  private loadProductData(): void {
    if (this.productId) {
      this.getProduct(this.productId)
        .pipe(
          takeUntil(this.destroy$), // Manejar la desuscripción automática
          tap(response => {
            if(response.articulo) {
              this.hasProduct = true;
              this.updateProduct(response.articulo);
            }
          }),
          catchError(err => {
            console.error('Error fetching product data', err);
            return []; // Devolver un observable vacío en caso de error
          })
        )
        .subscribe();
    }
  }

  // Método para obtener el producto (simulación de llamada HTTP interna)
  private getProduct(id: string): Observable<any> {
    // Simulación de llamada HTTP para obtener un producto
    return this.http.get<any>(`https://clouderp.abakoerp.com:9480/ApiCarroCompras/api/Articulos/RecuperarArticuloDetalleCarroCompras/0/${id}`);
  }

  // Método para actualizar el estado del producto y los meta tags
  private updateProduct(product: Product): void {
    this.product = product;
    const { name, caracteristicas, observaciones, price, sku, marca, images, availability, color } = product;

    const description = caracteristicas || observaciones;
    const imageUrl = images.length > 0 ? images[0] : '';
    this.img = imageUrl;
    
    // Actualizar título
    this.title.setTitle(`${name} | Carro Compras`);

    // Agregar meta tags
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: `chocolatina, ${marca.toLowerCase()}, italo, ${color}, ${name}, comprar, oferta` });
    this.meta.updateTag({ property: 'og:title', content: `${name} | Carro Compras` });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: window.location.href });
    this.meta.updateTag({ property: 'og:price:amount', content: `${price}` });
    this.meta.updateTag({ property: 'og:price:currency', content: 'COP' });
    this.meta.updateTag({ property: 'product:brand', content: marca });
    this.meta.updateTag({ property: 'product:availability', content: availability });
    this.meta.updateTag({ property: 'product:retailer_item_id', content: sku });
  }
}
