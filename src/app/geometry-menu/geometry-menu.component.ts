import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data';

@Component({
  selector: 'app-geometry-menu',
  templateUrl: './geometry-menu.component.html',
  styleUrls: ['./geometry-menu.component.css'],
})
export class GeometryMenuComponent implements OnInit, AfterViewInit {
  planeGeometryMenu: any[] = [];
  cubeGeometryMenu: any[] = [];
  isLoading: boolean = true;

  constructor(
    private readonly _location: Location,
    private readonly _dataService: DataService
  ) {}

  ngOnInit(): void {
    this.cubeGeometryMenu = this._dataService.cubeGeometryMenu;
    this.planeGeometryMenu = this._dataService.planeGeometryMenu;
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  returnToBackPage() {
    this._location.back();
  }
}
