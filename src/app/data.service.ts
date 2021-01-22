
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { } 

  // production url
  baseurl = "https://los.dmifinance.in/los/api/"

  // uat url
   //baseurl = "https://dmi.vistaconnect.com/dmi-clubbed-backend/api/"

  
  // Api for User Module
  getAuth() {
    return this.http.get(this.baseurl + 'getauthcp');
  }
  getLogin(emailmobile,password){
    return this.http.post(this.baseurl+'adminlogin', {emailmobile,password})
  }
  getAllUser(){
    return this.http.get(this.baseurl + 'totaluser')
  }
  getAllUserList(){
    return this.http.get(this.baseurl + 'totalusershow')
  }
  getUserDetails(phone){
    return this.http.post(this.baseurl + 'userdetail' , phone)
  }
  getSingleUserEvent(phone){
    return this.http.post(this.baseurl + 'singleuserevent' , phone)
  }
  getPermission(role_id){
    return this.http.post(this.baseurl + 'roletopermissionlist' , {role_id});
  }
  changePassowrd(mobile,currentpassword,newpassword){
    return this.http.post(this.baseurl + 'admin_change_password' , {mobile,currentpassword,newpassword});
  }
  


  // Api for Category Module
  createCategory(category_name,created_by,phone) {
    return this.http.post(this.baseurl + 'createblogcategory', {category_name,created_by,phone})
  }
  getCategoryList() {
    return this.http.get(this.baseurl + 'blogcategorylist')
  }
  getActiveCategoryList() {
    return this.http.get(this.baseurl + 'blogcategoryactivelist')
  }


  // Api for Blogs Module
  addblogs(addblogParams) {
    return this.http.post(this.baseurl + 'createblog', addblogParams)
  }
  getPagination() {
    return this.http.get(this.baseurl + 'blogpaginglist')
  }
  getBlogList(pageno) {
    return this.http.post(this.baseurl + 'bloglist', {pageno} )
  }
  getBlogDetails(blog_id){
    return this.http.post(this.baseurl + 'blogsingleview', {blog_id} )
  }
  updateBlogDetails(updateblogParams){
    return this.http.post(this.baseurl + 'blogupdate', updateblogParams)
  }
  deleteBlogItem(id,phone,user_id){
    return this.http.post(this.baseurl + 'blogdelete', {id,phone,user_id} )
  }


// Api for faq module
  addFaqdata(question,answer,created_by,phone){
    return this.http.post(this.baseurl + 'createfaq', {question,answer,created_by,phone} )
  }
  getFaqList(pageno){
    return this.http.post(this.baseurl + 'faqforadminlist', {pageno} )
  }
  getSpecificFaqList(faq_id){
    return this.http.post(this.baseurl + 'faqdetails', {faq_id} )
  }
  getFaqpaginationList(){
    return this.http.get(this.baseurl + 'faqpaginglist')
  }
  editFaqdata(id,question,answer,status,created_by,phone){
    return this.http.post(this.baseurl + 'faqupdate', {id,question,answer,status,created_by,phone} )
  }
  deleteFAQdata(id,phone,user_id){
    return this.http.post(this.baseurl + 'faqdelete',{id,phone,user_id})
  }


  // Api for discrepancy module
  getTotalDiscrepancy(){
    return this.http.get(this.baseurl + 'totaldiscrepancy')
  }
  getDiscrepancyList(){
    return this.http.get(this.baseurl + 'totaldiscrepancyshow')
  }
  getSingleUserDiscrepancy(phone){
    return this.http.post(this.baseurl + 'singleuserdiscrepancy' , phone)
  }


  // Api for loan module
  getTotalLoan(){
    return this.http.get(this.baseurl + 'totalloan')
  }
  getTotalLoanList(){
    return this.http.get(this.baseurl + 'totalloanshow')
  }
  getSingleUserLoans(phone){
    return this.http.post(this.baseurl + 'singleuserloan' , phone)
  }
  getSingleUserOffer(phone){
    return this.http.post(this.baseurl + 'singleuseroffer' , phone)
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  //collection Urls

  getCollectionFile(phone,created_by,pageno,no_of_records_per_page)
  {
    return this.http.post(this.baseurl + 'collectiondata/collectionfile' , {phone,created_by,pageno,no_of_records_per_page});
  }

  getCollectionFileUser(collection_id,created_by,payment,phone,pageno,no_of_records_per_page)
  {
    return this.http.post(this.baseurl + 'collectiondata/collectionfileuser' , {collection_id,created_by,payment,phone,pageno,no_of_records_per_page});
  }

  recentActivity(listid){
    return this.http.post(this.baseurl + 'collectiondata/collectionidlasthistory' , {listid});
  }

  getCollectionHeadersData(collection_id)
  {
    return this.http.post(this.baseurl + 'collectiondata/collectionidusercount' , {collection_id});
  }

  getFileUserExports(collection_id,craeted_by,payment,phone)
  {
    return this.http.post(this.baseurl + "collectiondata/collectionfileuserexport" , {collection_id,craeted_by,payment,phone});
  }

  collectionAddUser(adminphone,created_by,collection_id,name,email,phone,amount,loan_id,due_date)
  {
    return this.http.post(this.baseurl + "collectiondata/collectionuseradd",{adminphone,created_by,collection_id,name,email,phone,amount,loan_id,due_date})
  }

  createURICollection(listid,userid){
    return this.http.post(this.baseurl + 'createURlforCollection' , {listid,userid});
  }

  createSMSCollection(listid,userid){
    return this.http.post(this.baseurl + 'smsforCollection' , {listid,userid});
  }

  sendreminderCollection(listid,userid){
    return this.http.post(this.baseurl + 'remindersmsforCollection' , {listid,userid});
  }

  collectionLog(listid){
    return this.http.post(this.baseurl + 'collectionlog' , {listid});
  }

  collectionSingleUser(listid, userid){
    return this.http.post(this.baseurl + 'collectionsingleuser' , {listid, userid});
  }

  collectionSingleUserLog(phone){
    return this.http.post(this.baseurl + 'collectiondata/collectionsingleuserlog' , {phone});
  }

  collectionRecentData(){
    return this.http.get(this.baseurl + 'collectiondata/collectionrecentdata');
  }

  searchPayments(phone){
    return this.http.post(this.baseurl + 'collectiondata/collection_phone_search' , {phone});
  }

  searchPaymentsbyopp(opp_name){
    return this.http.post(this.baseurl + 'collectiondata/collection_opp_search' , {opp_name});
  }

  searchPaymentsOppID(url, accesstoken, opp_name){
    return this.http.post(this.baseurl + 'collectiondata/searchwithopp' , {url, accesstoken, opp_name});
  }

  createPaymentLink(id,phone,accesstoken,url,amount){
    return this.http.post(this.baseurl + 'collectiondata/collection_phone_updateamount' , {id,phone,accesstoken,url,amount});
  }

  createPaymentLinkOpp(id,opp,accesstoken,url,amount){
    return this.http.post(this.baseurl + 'collectiondata/collection_opp_updateamount' , {id,opp,accesstoken,url,amount});
  }

  sendPaymentSMS(id,phone){
    return this.http.post(this.baseurl + 'collectiondata/collectiondata_phoneupdate_sendsms' , {id,phone});
  }

  collectionDataSalesForce(phone, accesstoken, url){
    return this.http.post(this.baseurl + 'collectiondata/salesforcedata' , {phone, accesstoken, url});
  }
  paymentSummary(pageno,no_of_records_per_page){
    return this.http.post(this.baseurl + 'collectiondata/collectionpaymentsummary' , {pageno,no_of_records_per_page});
  }

  SearchBYPhoneCM(phone, accesstoken, url){
    return this.http.post(this.baseurl + 'collectiondata/searchbyphoneCM' , {phone, accesstoken, url});
  }

  SearchBYOppCM(opp, accesstoken, url){
    return this.http.post(this.baseurl + 'collectiondata/searchbyoppCM' , {opp, accesstoken, url});
  }

  SendFinalSMS(name,email,phone,amount,oustanding,due_date,loan_name,pre_mobile,emi_amount,collection_user_phone){
    return this.http.post(this.baseurl + 'collectiondata/sendsmsCM' , {name,email,phone,amount,oustanding,due_date,loan_name,pre_mobile,emi_amount,collection_user_phone});
  }

  HistoryByopp(opp){
    return this.http.post(this.baseurl + 'collectiondata/logopp' , {opp});
  }

  AdminLogSummary(phone,pageno,no_of_records_per_page){
    return this.http.post(this.baseurl + 'collectiondata/logphoneadmin' , {phone,pageno,no_of_records_per_page});
  }

  //graphs API

  getGraphData(start_date,end_date){
    return this.http.post(this.baseurl + 'getcron' , {start_date,end_date});
  }

  downloadGraphCSV(){
    return this.http.get(this.baseurl + 'dailyreportfordownload');
  }

  downloadExcelCSV(){
    return this.http.get(this.baseurl + 'exceldownload');
  }

  getTransactionGraph(startdate,enddate){
    return this.http.post(this.baseurl + 'transaction_summary' , {startdate,enddate});
  }

  downloadCSV(startdate,enddate){
    return this.http.post(this.baseurl + 'transaction_summaryexport' , {startdate,enddate});
  }

  //feedback-analytics
  getFeedbackGraph(start_date,end_date,pageno,no_of_records_per_page){
    return this.http.post(this.baseurl + 'starratinglist' , {start_date,end_date,pageno,no_of_records_per_page});
  }

  getRatingGraph(start_date,end_date){
    return this.http.post(this.baseurl + 'ratinggraph' , {start_date,end_date});
  }

  getMainRatingGraph(start_date,end_date){
    return this.http.post(this.baseurl + 'mainratinggraph' , {start_date,end_date});
  }

  getDownloadGraph(start_date,end_date){
    return this.http.post(this.baseurl + 'starratinglistdownload' , {start_date,end_date});
  }


  //partner-Module
  loanPartnerList(pageno,no_of_records_per_page){
    return this.http.post(this.baseurl + 'loanpartnerlist' , {pageno,no_of_records_per_page});
  }
  deletePartner(id,created_by){
    return this.http.post(this.baseurl + 'loanpartnerdelete' , {id,created_by});
  }


  //user-Module
  createUser(name,phone,loan_partner,email,password,created_by){
    return this.http.post(this.baseurl + 'createpartner' , {name,phone,loan_partner,email,password,created_by});
  }
  getPartnerActiveList(){
    return this.http.get(this.baseurl + 'loanpartner');
  }
  getUserList(pageno,no_of_records_per_page){
    return this.http.post(this.baseurl + 'partnerlist' , {pageno,no_of_records_per_page});
  }
  getUserUpdate(id,name,loan_partner,status,created_by){
    return this.http.post(this.baseurl + 'partnerupdate' , {id,name,loan_partner,status,created_by});
  }
  deleteUser(id,created_by){
    return this.http.post(this.baseurl + 'partnerdelete' , {id,created_by});
  }
  
  //eventTracking
  getEventValues(start_date,end_date){
    return this.http.post(this.baseurl + 'partnergetcron' , {start_date,end_date});
  }


  
}


