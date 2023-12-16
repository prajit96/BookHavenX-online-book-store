import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../core/services/discussion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrl: './discussion-details.component.css'
})
export class DiscussionDetailsComponent implements OnInit{
  chatloading: boolean = false;
  listloading: boolean = false;
  userMessage: string = "";
  discussionID: string = "";
  filterBy: string = "all";
  discussionPosts: any = [];
  discussionLists: any = [];

  constructor(private activeRoute: ActivatedRoute, private discussionService: DiscussionService, private toastr: ToastrService){}

  ngOnInit(): void {
    let id:string = this.activeRoute.snapshot.paramMap.get('id') || "";
    this.discussionID = id;
    this.getDiscussionsPost(id);
    this.getDiscussionList();
  }

  sendMessage(){
    if(this.userMessage){
      this.discussionService.createDiscussionPost(this.discussionID, this.userMessage).subscribe((res)=>{
        console.log(res);
        this.getDiscussionsPost(this.discussionID)
      }, 
      (err)=>{
        console.log(err)
      })
    }
    this.userMessage = "";
  }

  handleViewDiscussion(id: string){
    this.discussionID = id;
    this.getDiscussionsPost(id);
  }

  filterDiscussion(){
    this.getDiscussionList();
  }

  handleDeleteDiscussion(discussionID: string){
    this.discussionService.deleteDiscussion(discussionID).subscribe((res)=>{
      console.log(res);
      this.toastr.success("Deleted Successfully")
      this.getDiscussionList();
    },
    (err)=>{
      console.log(err)
      this.toastr.error("Network Error")
    })
  }

  handleRefreshChat(){
    this.getDiscussionsPost(this.discussionID);
  }


  getDiscussionsPost(id: string){
    this.chatloading = true;
    this.discussionService.getDiscussionPosts(id).subscribe((res)=>{
      this.discussionPosts = res;
      this.chatloading = false;
    },
    (err)=> {
      this.chatloading = false;
      console.log(err)
    })
  }

  getDiscussionList(){
    this.listloading = true;
    this.discussionService.getAllDiscussions(this.filterBy).subscribe((res)=>{
      this.discussionLists = res;
      this.listloading = false;
    },
    (err)=> {
      console.log(err)
      this.listloading = false;
    })
  }

  formattedTime(timestamp:any){
    const date = new Date(timestamp);

    // Extract time in HH:mm format
    const time = `${date.getHours()}:${date.getMinutes()}`;

    // Extract date in DD/MM/YYYY format
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return `${time} ${formattedDate}`;
  }
}
