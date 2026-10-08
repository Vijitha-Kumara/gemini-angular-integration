import { Component } from '@angular/core';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { GeminiService } from '../services/gemini.service';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-chat',
  imports: [SkeletonComponent],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})

export class AiChatComponent {
  messages: ChatMessage[] = [
    { role: 'ai', text: 'Hello! How can I help you?' }
  ];
  isLoading = false;
  errorMessage = '';

  constructor(private geminiService: GeminiService) {}

  async sendMessage(message: string): Promise<void> {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || this.isLoading) {
      return;
    }

    this.messages.push({ role: 'user', text: trimmedMessage });
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await this.geminiService.sendMessage(trimmedMessage);
      this.messages.push({
        role: 'ai',
        text: response || 'No response received.'
      });
    } catch (error) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Something went wrong. Please check your API key and try again.';
  }
}
