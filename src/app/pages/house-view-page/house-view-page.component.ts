import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { HouseService } from 'src/app/core/services/house.service';

@Component({
  selector: 'app-house-view-page',
  templateUrl: './house-view-page.component.html',
  styleUrls: ['./house-view-page.component.css'],
})
export class HouseViewPageComponent implements OnInit {
  house$: any;

  constructor(private houseService: HouseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getHouseData();
  }

  getHouseData() {
    this.house$ = this.route.params.pipe(
      switchMap((params) => {
        return this.houseService.getHouse(params['id']);
      }),
    );
  }
}
