import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { AngularIconComponent } from './components/icons/angular-icon.component';
import { FirebaseIconComponent } from './components/icons/firebase-icon.component';
import { ArrowBackIconComponent } from './components/icons/arrow-back-icon.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularIconComponent, FirebaseIconComponent, ArrowBackIconComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly isMainPage$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url === '/'),
    startWith(true)
  );

  isMainPage = toSignal(this.isMainPage$);

  ngOnInit(): void {
    this.title.setTitle("Demo Carro Compras");
    this.meta.updateTag({ name: 'description', content: 'Demo de Carro Compras' });
    this.meta.updateTag({ name: 'keywords', content: 'carro, compras, demo' });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Demo de Carro Compras'
    });
    this.meta.updateTag({
      name: 'og:description',
      content: 'Demo de Carro Compras'
    });
    this.meta.updateTag({
      name: 'og:image',
      content: 'https://ssr-demo-w--magico-mundo.us-central1.hosted.app/assets/LOGO2.png'
    });
    this.meta.updateTag({
      name: 'og:url',
      content: 'https://ssr-demo-w--magico-mundo.us-central1.hosted.app/'
    });
    this.meta.updateTag({
      name: 'twitter:card',
      content:'summary_large_image'
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Demo de Carro Compras'
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Demo de Carro Compras'
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: 'https://ssr-demo-w--magico-mundo.us-central1.hosted.app/assets/LOGO2.png'
    });
    this.meta.updateTag({
      name: 'twitter:url',
      content: 'https://ssr-demo-w--magico-mundo.us-central1.hosted.app/'
    });
    this.meta.updateTag({
      name: 'theme-color',
      content: '#0f0ff0'
    });

  }
}
