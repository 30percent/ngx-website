import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  public messages: string[] = []

  constructor() { }

  add(message: string) {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return this.messages;
  }

  clear() {
    this.messages.length = 0;
  }
}
