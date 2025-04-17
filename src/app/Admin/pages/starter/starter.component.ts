import { Component, ViewEncapsulation } from '@angular/core';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { AppSalesProfitComponent } from 'src/app/components/sales-profit/sales-profit.component';
import { AppTotalFollowersComponent } from 'src/app/components/total-followers/total-followers.component';
import { AppTotalIncomeComponent } from 'src/app/components/total-income/total-income.component';
import { AppPopularProductsComponent } from 'src/app/components/popular-products/popular-products.component';
import { AppEarningReportsComponent } from 'src/app/components/earning-reports/earning-reports.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppBlogCardsComponent,
    AppSalesProfitComponent,
    AppTotalFollowersComponent,
    AppTotalIncomeComponent,
    AppPopularProductsComponent,
    AppEarningReportsComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }
