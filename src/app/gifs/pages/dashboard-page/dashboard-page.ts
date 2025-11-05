import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiftSideMenu } from "../../components/gift-side-menu/gift-side-menu";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, GiftSideMenu],
  templateUrl: './dashboard-page.html',
  
})
export default class DashboardPage { }
