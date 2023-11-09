import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Query,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flipbook',
  templateUrl: './flipbook.component.html',
  styleUrls: ['./flipbook.component.css'],
})
export class FlipbookComponent implements OnInit, AfterViewInit {
  isPhoneAndOrientation: boolean = false;
  isLoading: boolean = true;
  topicName: string | null = '';
  content: any[] = [];
  @ViewChildren('panelRef') panels: QueryList<ElementRef> =
    new QueryList<ElementRef>();
  ngAfterViewInit(): void {
    this.panels.changes.subscribe(() => {
      // This code will run when the QueryList is updated
      const panelElements: ElementRef[] = this.panels.toArray();

      // You can now access the panel elements and work with them
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
    });
  }
  constructor(
    private readonly _location: Location,
    private storage: AngularFireStorage,
    private readonly _route: ActivatedRoute
  ) {}
  async ngOnInit() {
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

    this.topicName = this._route.snapshot.paramMap.get('topicName');
    await this.fetchData();

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  async fetchData() {
    let urls = [];
    try {
      const folderPath = `/${this.topicName}/flipbooks`;
      const storageRef = this.storage.ref(folderPath);
      const result = await storageRef.listAll().toPromise();

      if (result && result?.items?.length > 0) {
        for (const itemRef of result.items) {
          const downloadPath = `/${itemRef.fullPath}`;
          const fileRef = this.storage.ref(downloadPath);
          const url = await fileRef.getDownloadURL().toPromise();
          urls.push(url);
        }
      }

      urls = urls.sort();
      for (let i = 0; i < urls.length; i += 2) {
        let item = {
          front: urls[i],
          back:
            i + 1 >= urls.length ? '/assets/imgs/last-page.png' : urls[i + 1],
        };
        this.content.push(item);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
    console.log(this.content);
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
