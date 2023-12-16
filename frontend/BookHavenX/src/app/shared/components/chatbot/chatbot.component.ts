import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollable_parent') private scrollContainer?: ElementRef;
  showChatbot: boolean = false;
  messages: { text: string; from: 'user' | 'bot' | 'books'; books?: any }[] = [];
  userMessage: string = '';
  loading: boolean = false;
  books: any = [];

  constructor(private chatbotService: ChatbotService, private router: Router) {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.messages.push({ text: "Welcome to BookHavenX store. How may I assist you today?", from: 'bot' });
    // this.callChatBotAPI();
  }

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
    this.scrollToBottom();
  }

  handleViewBook(bookID: string){
    this.showChatbot = false;
    this.router.navigate(['/books', bookID]);
  }

  sendMessage() {
    if (this.userMessage.trim() === '') {
      return;
    }

    // User message
    this.messages.push({ text: this.userMessage, from: 'user' });
    this.callChatBotAPI();
    this.userMessage = '';
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }


  //Function to call chatBotAPI
  callChatBotAPI() {
    this.loading = true;
    this.chatbotService.sendMessageToChatAPI(this.userMessage).subscribe(
      (res) => {
        if (Array.isArray(res) && res.length !== 0) {
          this.books = res;
          this.messages.push({
            text: 'Here are some suggestions:',
            from: 'books',
            books: [...this.books]
          });
        } else {
          this.messages.push({ text: res.response, from: 'bot' });
          this.books = [];
        }
        this.loading = false;
        this.userMessage = '';
        this.scrollToBottom();
      },
      (error) => {
        console.error('Error:', error);
        this.messages.push({
          text: "I apologize for the inconvenience. It seems that we're experiencing some technical difficulties at the moment.",
          from: 'bot',
        });
        this.books = [];
        this.loading = false;
      }
    );
  }
}
