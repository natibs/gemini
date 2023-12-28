import { Injectable, signal } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  loading$ = new Subject<boolean>();

  readonly genAI = new GoogleGenerativeAI('');
  readonly model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  chatHistory$ = new BehaviorSubject([
    {
      role: "user",
      parts: "Hello, I have 2 dogs in my house.",
    },
    {
      role: "model",
      parts: "Great to meet you. What would you like to know?",
    },
  ]);
  constructor() { }

  chat = this.model.startChat({
    history: this.chatHistory$.getValue(),
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  generate(question: string) {
    this.loading$.next(true);
    this.chat.sendMessage(question).then(result => {
      const text = result.response.text();
      this.chatHistory$.next([...this.chatHistory$.getValue(), {
        role: 'model',
        parts: text
      }]);
      this.loading$.next(false);

    });
    this.chatHistory$.next([...this.chatHistory$.getValue(), {
      role: 'user',
      parts: question
    }]);
  }
}
