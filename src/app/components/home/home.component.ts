import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface InfoCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  state: 'normal' | 'hover';
  subTitle?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('bubbleState', [
      state('normal', style({
        transform: 'scale(1)',
        boxShadow: '0 0 20px rgba(255,255,255,0.2)'
      })),
      state('hover', style({
        transform: 'scale(1.05)',
        boxShadow: '0 0 30px rgba(255,255,255,0.4)'
      })),
      transition('* => *', animate('200ms ease-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  infoCards: InfoCard[] = [
    {
      id: 1,
      title: 'Contáctame',
      subTitle: 'Redes & Ubicación',
      description: '• GitHub: R4GUI\n• Email Institucional: 20213l001010@utcv.edu.mx\n• Email Personal: ragui2001@live.com\n\n• Córdoba, Veracruz\n\nDisponible para:\n• Proyectos de desarrollo\n• Colaboraciones\n• Oportunidades laborales',
      icon: 'contact_mail',
      state: 'normal'
    },
    {
      id: 2,
      title: 'Sobre Mí',
      subTitle: 'Perfil Profesional',
      description: '• Desarrollador de Software\n• 23 años\n• Córdoba, Veracruz\n\nHabilidades Personales:\n• Músico y maestro de música\n• Experiencia con instrumentos musicales\n• Capacidad de liderazgo\n• Trabajo en equipo',
      icon: 'person',
      state: 'normal'
    },
    {
      id: 3,
      title: 'Educación',
      subTitle: 'Formación Académica',
      description: '• Técnico en Informatica Administrativa\nICATEC Córdoba\n\n• Técnico en TIDSM\n(Desarrollo de Software Multiplataforma)\n\n• Estudiante de Ingeniería en\nDesarrollo de Software',
      icon: 'school',
      state: 'normal'
    },
    {
      id: 4,
      title: 'Habilidades',
      subTitle: 'Competencias Técnicas',
      description: '• Angular & TypeScript\n• HTML, CSS, JavaScript\n• Git y Control de Versiones\n• Desarrollo Web Responsivo\n• Metodologías Ágiles\n• Bases de Datos\n• React & Node.js',
      icon: 'code',
      state: 'normal'
    }
  ];

  backgroundParticles: { x: number; y: number }[] = [];
  private readonly PARTICLE_COUNT = 50;
  imageGalleryOpen: boolean = false;
  showScrollTop: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initializeParticles();
    this.animateParticles();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private initializeParticles() {
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.backgroundParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });
    }
  }

  private animateParticles() {
    setInterval(() => {
      this.backgroundParticles = this.backgroundParticles.map((particle) => ({
        x: (particle.x + 0.5) % window.innerWidth,
        y: (particle.y + 0.2) % window.innerHeight,
      }));
    }, 50);
  }

  onCardHover(card: InfoCard): void {
    card.state = 'hover';
  }

  onCardLeave(card: InfoCard): void {
    card.state = 'normal';
  }

  toggleGallery(): void {
    this.imageGalleryOpen = !this.imageGalleryOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.backgroundParticles = this.backgroundParticles.map((particle) => ({
      x: Math.min(particle.x, window.innerWidth),
      y: Math.min(particle.y, window.innerHeight),
    }));
  }
}