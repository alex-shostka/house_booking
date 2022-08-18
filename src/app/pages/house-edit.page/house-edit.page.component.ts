import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { HouseService } from 'src/app/core/services/house.service';

@Component({
  selector: 'app-house-edit.page',
  templateUrl: './house-edit.page.component.html',
  styleUrls: ['./house-edit.page.component.css'],
})
export class HouseEditPageComponent implements OnInit {
  house!: any;

  constructor(private houseService: HouseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getHouseData();
  }

  getHouseData() {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.houseService.getHouse(params['id']);
        }),
      )
      .subscribe((house: any) => {
        this.house = house;
        // Create form and patch values to the form
      });
  }
}
