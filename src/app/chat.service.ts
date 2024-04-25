import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<string[]>([]);
  private typingSubject = new BehaviorSubject<string>('');

  get messages() {
    return this.messagesSubject.asObservable();
  }

  get typing() {
    return this.typingSubject.asObservable();
  }

  sendMessage(message: string, tabId: string) {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push({
      author: tabId,
      message: message
    });
    this.messagesSubject.next(messages);
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  setTyping(value: string) {
    this.typingSubject.next(value);
    localStorage.setItem('typing', value);
  }
}
