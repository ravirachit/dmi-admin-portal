import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login-signup/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './users/employee/employee.component';
import { UsersComponent } from './users/users.component';
import { DealersComponent } from './dealers/dealers.component';
import { UserdetailsComponent } from './users/userdetails/userdetails.component';
import { CustomersComponent } from './customers/customers.component';
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
import { AddnewUserComponent} from './collection_section/co-agent/viewlist/addnew-user/addnew-user.component';
import { EventsComponent } from './customer_section/events/events.component';
import { CustDashboardComponent } from './customer_section/cust-dashboard/cust-dashboard.component';
import { NotificationComponent } from './customer_section/notification/notification.component';
import { AllowedBorrowComponent } from './customer_section/allowed-borrow/allowed-borrow.component';
import { BorrowersComponent } from './customer_section/borrowers/borrowers.component';
import { CustLoansComponent} from './customer_section/cust-loans/cust-loans.component';
import { TicketsComponent } from './customer_section/tickets/tickets.component';
import { CollectDashboardComponent } from './collection_section/collect-dashboard/collect-dashboard.component';
import { PaymentTrackingComponent } from './collection_section/payment-tracking/payment-tracking.component';
import { EventTrackingComponent } from './collection_section/event-tracking/event-tracking.component';
import { TransactionAnalyticsComponent } from './customer_section/transaction-analytics/transaction-analytics.component';
import { EDashboardComponent } from './e-mandate_section/e-dashboard/e-dashboard.component';
import { ELoansComponent } from './e-mandate_section/e-loans/e-loans.component';
import { EBorrowersComponent } from './e-mandate_section/e-borrowers/e-borrowers.component';
import { ETrackingComponent } from './e-mandate_section/e-tracking/e-tracking.component';
import { EAnalyticsComponent } from './e-mandate_section/e-analytics/e-analytics.component';
import { XSellDashboardComponent } from './x-sell_section/x-sell-dashboard/x-sell-dashboard.component';
import { XSellLoansComponent } from './x-sell_section/x-sell-loans/x-sell-loans.component';
import { XSellOffersComponent } from './x-sell_section/x-sell-offers/x-sell-offers.component';
import { XSellBorrowersComponent } from './x-sell_section/x-sell-borrowers/x-sell-borrowers.component';
import { AllowPermissionsComponent } from './allow-permissions/allow-permissions.component';
import { FeedbackAnalyticsComponent } from './customer_section/feedback-analytics/feedback-analytics.component';
import { PartnerComponent } from './partner/partner.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AddNewUserComponent } from './user-portal/add-new-user/add-new-user.component';
import { PartnereventsComponent } from './partnerevents/partnerevents.component';
import { PaymentLinkComponent } from './collection_section/payment-link/payment-link.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ShowHistoryComponent } from './collection_section/co-agent/viewlist/show-history/show-history.component';
import { PaylinkComponent } from './collection_section/paylink/paylink.component';
import { HistoryComponent } from './collection_section/history/history.component';


import { AuthGuard } from './_guards';


const routes: Routes = [
{path: '' , component: LoginComponent},

{path: 'login' , component: LoginComponent, canActivate: [AuthGuard]},
{path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard]},
{path: 'employee' , component: EmployeeComponent, canActivate: [AuthGuard]},
{path: 'users' , component: UsersComponent, canActivate: [AuthGuard]},
{path: 'dealers' , component: DealersComponent, canActivate: [AuthGuard]},
{path: 'userdetails' , component: UserdetailsComponent, canActivate: [AuthGuard]},
{path: 'customers' , component: CustomersComponent, canActivate: [AuthGuard]},
{path: 'adduser' , component: AdduserComponent, canActivate: [AuthGuard]},
{path: 'totalLoanDetail' , component: TotalLoanDetailComponent, canActivate: [AuthGuard]},
{path: 'totalDiscrepancyDetail' , component: TotalDiscrepancyDetailComponent, canActivate: [AuthGuard]},
{path: 'blog' , component: BlogComponent, canActivate: [AuthGuard]},
{path: 'adblog' , component: AddblogComponent, canActivate: [AuthGuard]},
{path: 'blogdetail' , component: BlogdetailComponent, canActivate: [AuthGuard]},
{path: 'updateblog', component: UpdateBlogComponent, canActivate: [AuthGuard]},
{path: 'categorylist', component: CategoryComponent, canActivate: [AuthGuard]},
{path: 'addcategory', component: AddCategoryComponent, canActivate: [AuthGuard]},
{path: 'editcategory', component: EditCategoryComponent, canActivate: [AuthGuard]},
{path: 'faqlist', component: FaqComponent, canActivate: [AuthGuard]},
{path: 'addfaq', component: AddFaqComponent, canActivate: [AuthGuard]},
{path: 'editfaq', component: EditFaqComponent, canActivate: [AuthGuard]},

{path: 'co-agent' , component: CoAgentComponent, canActivate: [AuthGuard]},
{path: 'creatlist' , component: CreatlistComponent, canActivate: [AuthGuard]},
{path: 'viewlist' , component: ViewlistComponent, canActivate: [AuthGuard]},
{path: 'viewdetails' , component: ViewdetailsComponent, canActivate: [AuthGuard]},
{path: 'single' , component: SingleComponent, canActivate: [AuthGuard]},
{path: 'show-history' , component:ShowHistoryComponent , canActivate: [AuthGuard]},
{path: 'addnew-user', component: AddnewUserComponent, canActivate: [AuthGuard]},
{path: 'events', component:EventsComponent, canActivate: [AuthGuard]},
{path: 'transaction-analytics', component:TransactionAnalyticsComponent, canActivate: [AuthGuard]},
{path: 'allow-permissions', component:AllowPermissionsComponent, canActivate: [AuthGuard]},
{path: 'partner' , component:PartnerComponent, canActivate: [AuthGuard] },
{path: 'user-portal' , component:UserPortalComponent, canActivate: [AuthGuard] },
{path: 'add-new-user' , component:AddNewUserComponent, canActivate: [AuthGuard] },
{path: 'partnerevents' , component:PartnereventsComponent, canActivate: [AuthGuard]},
{path: 'my-account' , component:MyAccountComponent, canActivate:[AuthGuard]},


//customer-dashboard
{path: 'cust-dashboard', component:CustDashboardComponent, canActivate: [AuthGuard]},
{path: 'notification', component:NotificationComponent, canActivate: [AuthGuard]},
{path: 'allowed-borrower', component:AllowedBorrowComponent, canActivate: [AuthGuard]},
{path: 'borrowers', component:BorrowersComponent, canActivate: [AuthGuard]},
{path: 'feedback-analytics', component:FeedbackAnalyticsComponent, canActivate: [AuthGuard]},
{path: 'cust-loans', component:CustLoansComponent, canActivate: [AuthGuard]},
{path: 'tickets', component:TicketsComponent, canActivate: [AuthGuard]},

//collection-dashboard
{path: 'collect-dashboard', component:CollectDashboardComponent, canActivate: [AuthGuard]},
{path: 'event-tracking', component:EventTrackingComponent, canActivate: [AuthGuard]},
{path: 'payment-tracking', component:PaymentTrackingComponent, canActivate: [AuthGuard]},
{path: 'payment-link' , component:PaymentLinkComponent, canActivate: [AuthGuard]},
{path: 'paylink' , component:PaylinkComponent, canActivate: [AuthGuard]},
{path: 'history' , component:HistoryComponent, canActivate: [AuthGuard]},

//e-mandate
{path: 'e-dashboard', component:EDashboardComponent, canActivate: [AuthGuard]},
{path: 'e-loans', component:ELoansComponent, canActivate: [AuthGuard]},
{path: 'e-borrowers', component:EBorrowersComponent, canActivate: [AuthGuard]},
{path: 'e-tracking', component:ETrackingComponent, canActivate: [AuthGuard]},
{path: 'e-analytics', component:EAnalyticsComponent, canActivate: [AuthGuard]},

//x-sell
{path: 'x-sell-dashboard', component:XSellDashboardComponent, canActivate: [AuthGuard]},
{path: 'x-sell-loans', component:XSellLoansComponent, canActivate: [AuthGuard]},
{path: 'x-sell-offers', component:XSellOffersComponent, canActivate: [AuthGuard]},
{path: 'x-sell-borrowers', component:XSellBorrowersComponent, canActivate: [AuthGuard]}

//{ path: '**', redirectTo: 'dashboard'},
// {path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard]},
// {path: 'employee' , component: EmployeeComponent, canActivate: [AuthGuard]},
// {path: 'users' , component: UsersComponent, canActivate: [AuthGuard]},
// {path: 'dealers' , component: DealersComponent, canActivate: [AuthGuard]},
// {path: 'userdetails' , component: UserdetailsComponent, canActivate: [AuthGuard]},
// { path: '**', redirectTo: 'dashboard'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
