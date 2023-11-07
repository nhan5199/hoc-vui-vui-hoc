import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-flipbook',
  templateUrl: './flipbook.component.html',
  styleUrls: ['./flipbook.component.css'],
})
export class FlipbookComponent implements OnInit, AfterViewInit {
  isPhoneAndOrientation: boolean = false;
  isLoading: boolean = false;
  content: any[] = [
    {
      front: '/assets/imgs/lession/welcome-exercise.png',
      back: '/assets/imgs/lession/question.png',
    },
    {
      front: '/assets/imgs/lession/welcome-exercise.png',
      back: '/assets/imgs/lession/question.png',
    },
    {
      front: '/assets/imgs/lession/welcome-exercise.png',
      back: '/assets/imgs/lession/question.png',
    },
  ];
  @ViewChildren('panelRef') panels: QueryList<any> = new QueryList();
  ngAfterViewInit(): void {
    const panels: HTMLElement[] = Array.from(
      document.querySelectorAll('.panel')
    );
    const numPanels: number = panels.length;

    // if a panel is open, lower its z-idx
    // otherwise, set zIdx back to the original
    function checkZ(aPanel: HTMLElement) {
      if (aPanel.classList.contains('open')) {
        setTimeout(() => {
          aPanel.style.zIndex = '1';
        }, 800);
      } else {
        // set z-index back to original stored in data
        const zIdx = Number(aPanel.dataset['zIdx']);
        aPanel.style.zIndex = zIdx.toString();
      }
    }

    // loop through all panels and reverse sort via zIdx
    panels.forEach((panel, i) => {
      const zIdx: number = numPanels - i; // Specify the type of zIdx
      panel.style.zIndex = zIdx.toString();
      panel.dataset['zIdx'] = zIdx.toString();
    });

    const imgs: HTMLElement[] = Array.from(
      document.querySelectorAll('.panel img')
    );

    imgs.forEach((img) => {
      img.addEventListener('click', (event) => {
        const target = img.parentElement?.parentElement as HTMLElement;
        const panel = target.closest('.panel') as HTMLElement;
        if (panel) {
          if (
            target.classList.contains('front') ||
            target.classList.contains('back')
          ) {
            panel.classList.toggle('open');
            checkZ(panel);
          }
        }
        event.stopPropagation();
      });
    });
  }
  constructor(private readonly _location: Location) {}
  ngOnInit(): void {
    if (window.screen.width < 900) {
      if (window.orientation === 90 || window.orientation === -90) {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'flex';
        }
        this.isPhoneAndOrientation = false;
      } else {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'none';
        }
        this.isPhoneAndOrientation = true;
      }
    }
  }

  returnToBackPage() {
    this._location.back();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event): void {
    if (window.screen.width < 900) {
      if (window.orientation === 90 || window.orientation === -90) {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'flex';
        }
        this.isPhoneAndOrientation = false;
      } else {
        let flipbook = document.getElementById('flipbook');
        if (flipbook) {
          flipbook.style.display = 'none';
        }
        this.isPhoneAndOrientation = true;
      }
    }
  }
}
