import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ssr',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './ssr.component.html',
  styleUrl: './ssr.component.scss',
  host: {
    'class': 'content'
  }
})
export class SsrComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  
  ngOnInit(): void {
    const title = "Smartphone Mora X10"
    this.title.setTitle(`${title} | Carro Compras`);
    this.meta.addTags([
      { name: 'description', content: 'Compra el mejor  al mejor precio. Envío rápido y seguro.' },
      { name: 'keywords', content: 'Smartphone Mora X10, smartphone, tecnología, comprar, precio, calidad, dispositivos electrónicos' },
      { name: 'og:title', content: 'Smartphone Mora X10 - Compra en Mora' },
      { name: 'og:description', content: 'Obtén el Smartphone Mora X10 al mejor precio en Mora. Aprovecha nuestras ofertas y descuentos exclusivos.' },
      { name: 'og:type', content: 'product' },
      { name: 'og:url', content: 'https://mora.com/producto/smartphone-mora-x10' },
      { name: 'og:image', content: 'https://ssr-demo-w--magico-mundo.us-central1.hosted.app/assets/smartphone-mora-x10.png' },
      { name: 'twitter:card', content:'summary_large_image' },
      { name: 'twitter:site', content: '@mora_com' },
      { name: 'twitter:title', content: 'Smartphone Mora X10 - Compra en Mora' },
      { name: 'twitter:description', content: 'Compra el Smartphone Mora X10 al mejor precio con envío gratis y garantía.' },
      { name: 'twitter:image', content: 'https://ssr-demo-w--magico-mundo.us-central1.hosted.app/assets/smartphone-mora-x10.png' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' }
    ]);
    
  }
}
