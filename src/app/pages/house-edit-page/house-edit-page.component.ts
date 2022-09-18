import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs';
import { HouseService } from 'src/app/core/services/house.service';

@Component({
  selector: 'app-house-edit-page',
  templateUrl: './house-edit-page.component.html',
  styleUrls: ['./house-edit-page.component.css'],
})
export class HouseEditPageComponent implements OnInit {
  house!: any;

  constructor(
    private houseService: HouseService,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {}

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
        this.setTitle(this.house.id);
        // Create form and patch values to the form
      });
  }

  setTitle(id: number) {
    this.titleService.setTitle(`Edit hoouse with ${id} id`);
  }
}
