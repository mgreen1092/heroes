import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[]=[]
  add(message: string) {
    this.messages.push(message)
  }
  // adds a method to the cache
  clear() {
    this.messages=[]
  }
  // clears the cache
  constructor() { }
}
