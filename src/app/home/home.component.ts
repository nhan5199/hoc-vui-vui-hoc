import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  goToMath: string = '/math-menu';
  isLoading: boolean = true;
  constructor(private readonly titleService: Title) {
    this.titleService.setTitle('Học vui - Vui học');
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.isLoading = false;
  }
}
