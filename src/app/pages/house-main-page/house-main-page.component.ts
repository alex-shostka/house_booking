import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/core/services/house.service';

@Component({
  selector: 'app-house-main-page',
  templateUrl: './house-main-page.component.html',
  styleUrls: ['./house-main-page.component.css'],
})
export class HouseMainPageComponent implements OnInit {
  houses: any = [];

  constructor(private houseService: HouseService) {}

  ngOnInit(): void {
    this.getHouses();
  }

  getHouses(): void {
    this.houseService.getHouses().subscribe((data: any) => {
      this.houses = data;
    });
  }
}
