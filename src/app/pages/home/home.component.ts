import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExternalLinkDirective } from '../../directives/external-link.directive';
import { ArrowBoxIconComponent } from '../../components/icons/arrow-box-icon.component';
import { GithubIconComponent } from '../../components/icons/github-icon.component';
import { TwitterIconComponent } from '../../components/icons/twitter-icon.component';
import { YouTubeIconComponent } from '../../components/icons/youtube-icon.component';

const icons = [ArrowBoxIconComponent, GithubIconComponent, TwitterIconComponent, YouTubeIconComponent];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ExternalLinkDirective, ...icons],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    'class': 'content'
  }
})
export class HomeComponent implements OnInit{

  numbers: number[] = [
    1, 13, 21, 679, 1564, 1619, 2139, 2257, 2833,
    5141, 5142, 5218, 5329, 5408, 5586, 5591, 5601,
    5630, 5750, 5835, 5847, 5848, 5872, 5873, 5877,
    5880, 5881, 5883, 5891, 5895, 5900, 5936, 5984,
    6001, 6026, 6027, 6030, 3, 4, 5
  ];

  public randomId: string = '';

  ngOnInit(): void {
    this.randomId = this.generateIdRamdon();
  }
  

  generateIdRamdon(): string{  
    const randomIndex = Math.floor(Math.random() * this.numbers.length);
    return this.numbers[randomIndex].toString();
  }

}
