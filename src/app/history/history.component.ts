import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgIf,NgFor, AsyncPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  geminiService = inject(GeminiService);
  log = this.geminiService.chatHistory$;
}
