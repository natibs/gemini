import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeminiService } from '../services/gemini.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  submitted: boolean = false;
  geminiService = inject(GeminiService);
  form = new FormGroup({
    question: new FormControl('', Validators.required)
  });

  get question() {
    return this.form.get('question');
  }

  generate() {
    this.submitted = true;
    if (this.form.valid) {
      this.geminiService.generate(this.question.value);
      this.form.reset();
      this.submitted = false;
    }
  }
}
