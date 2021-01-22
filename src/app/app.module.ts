import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';


import { LoginComponent } from './login-signup/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './sidebar/navbar/navbar.component';
import { HeaderComponent } from './sidebar/header/header.component';
import { EmployeeComponent } from './users/employee/employee.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbdSortableHeader } from './sortable.directive';
import { DealersComponent } from './dealers/dealers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserdetailsComponent } from './users/userdetails/userdetails.component';
import { CustomersComponent } from './customers/customers.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdduserComponent } from './adduser/adduser.component';
import { TotalLoanDetailComponent } from './total-loan-detail/total-loan-detail.component';
import { TotalDiscrepancyDetailComponent } from './total-discrepancy-detail/total-discrepancy-detail.component';
import { BlogComponent } from './customer_section/blog/blog.component';
import { AddblogComponent } from './customer_section/blog/addblog/addblog.component';
import { BlogdetailComponent } from './customer_section/blog/blogdetail/blogdetail.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { UpdateBlogComponent } from './customer_section/blog/update-blog/update-blog.component';
import { FaqComponent } from './customer_section/faq/faq.component';
import { AddFaqComponent } from './customer_section/faq/add-faq/add-faq.component';
import { EditFaqComponent } from './customer_section/faq/edit-faq/edit-faq.component';

import { CoAgentComponent } from './collection_section/co-agent/co-agent.component';
import { CreatlistComponent } from './collection_section/co-agent/creatlist/creatlist.component';
import { ViewlistComponent } from './collection_section/co-agent/viewlist/viewlist.component';
import { ViewdetailsComponent } from './collection_section/co-agent/viewlist/viewdetails/viewdetails.component';
import { SingleComponent } from './collection_section/co-agent/viewlist/single/single.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AddnewUserComponent } from './collection_section/co-agent/viewlist/addnew-user/addnew-user.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EventsComponent } from './customer_section/events/events.component';
import { ChartsModule } from 'ng2-charts';
import { TransactionAnalyticsComponent } from './customer_section/transaction-analytics/transaction-analytics.component';
import { CustDashboardComponent } from './customer_section/cust-dashboard/cust-dashboard.component';
import { NotificationComponent } from './customer_section/notification/notification.component';
import { AllowedBorrowComponent } from './customer_section/allowed-borrow/allowed-borrow.component';
import { BorrowersComponent } from './customer_section/borrowers/borrowers.component';
import { CustLoansComponent} from './customer_section/cust-loans/cust-loans.component';
import { TicketsComponent } from './customer_section/tickets/tickets.component';
import { CollectDashboardComponent } from './collection_section/collect-dashboard/collect-dashboard.component';
import { PaymentTrackingComponent } from './collection_section/payment-tracking/payment-tracking.component';
import { EventTrackingComponent } from './collection_section/event-tracking/event-tracking.component';
import { XSellDashboardComponent } from './x-sell_section/x-sell-dashboard/x-sell-dashboard.component';
import { XSellLoansComponent } from './x-sell_section/x-sell-loans/x-sell-loans.component';
import { XSellOffersComponent } from './x-sell_section/x-sell-offers/x-sell-offers.component';
import { XSellBorrowersComponent } from './x-sell_section/x-sell-borrowers/x-sell-borrowers.component';
import { EDashboardComponent } from './e-mandate_section/e-dashboard/e-dashboard.component';
import { ELoansComponent } from './e-mandate_section/e-loans/e-loans.component';
import { EBorrowersComponent } from './e-mandate_section/e-borrowers/e-borrowers.component';
import { ETrackingComponent } from './e-mandate_section/e-tracking/e-tracking.component';
import { EAnalyticsComponent } from './e-mandate_section/e-analytics/e-analytics.component';
import { AllowPermissionsComponent } from './allow-permissions/allow-permissions.component';
import { FeedbackAnalyticsComponent } from './customer_section/feedback-analytics/feedback-analytics.component';
import { PartnerComponent } from './partner/partner.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AddNewUserComponent } from './user-portal/add-new-user/add-new-user.component';
import { PartnereventsComponent } from './partnerevents/partnerevents.component';
import { PaymentLinkComponent } from './collection_section/payment-link/payment-link.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatFormFieldModule, MatButtonModule,MatDialogModule,MatInputModule } from '@angular/material';
import { ShowHistoryComponent } from './collection_section/co-agent/viewlist/show-history/show-history.component';
import { PaylinkComponent } from './collection_section/paylink/paylink.component';
import { HistoryComponent } from './collection_section/history/history.component';

 

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    HeaderComponent,
    EmployeeComponent,
    UsersComponent,
    NgbdSortableHeader,
    DealersComponent,
    UserdetailsComponent,
    CustomersComponent,
    AdduserComponent,
    TotalLoanDetailComponent,
    TotalDiscrepancyDetailComponent,
    BlogComponent,
    AddblogComponent,
    BlogdetailComponent,
    UpdateBlogComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    FaqComponent,
    AddFaqComponent,
    EditFaqComponent,
    CoAgentComponent,
    CreatlistComponent,
    ViewlistComponent,
    ViewdetailsComponent,
    SingleComponent,
    AddnewUserComponent,
    EventsComponent,
    TransactionAnalyticsComponent,
    CustDashboardComponent,
    NotificationComponent,
    AllowedBorrowComponent,
    BorrowersComponent,
    CustLoansComponent,
    TicketsComponent,
    CollectDashboardComponent,
    PaymentTrackingComponent,
    EventTrackingComponent,
    XSellDashboardComponent,
    XSellLoansComponent,
    XSellOffersComponent,
    EDashboardComponent,
    ELoansComponent,
    EBorrowersComponent,
    ETrackingComponent,
    EAnalyticsComponent,
    XSellBorrowersComponent,
    AllowPermissionsComponent,
    FeedbackAnalyticsComponent,
    PartnerComponent,
    UserPortalComponent,
    AddNewUserComponent,
    PartnereventsComponent,
    PaymentLinkComponent,
    MyAccountComponent,
    DialogComponent,
    ShowHistoryComponent,
    PaylinkComponent,
    HistoryComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    Ng2SmartTableModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    ChartsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    BsDatepickerModule.forRoot()
  ],
  entryComponents: [ DialogComponent ],
  providers: [AuthService, AuthGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
