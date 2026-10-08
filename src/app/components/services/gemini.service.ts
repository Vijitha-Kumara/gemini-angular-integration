import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private readonly models = [
    'gemini-3.5-flash-lite',
  ];

  private readonly googleGenAI = new GoogleGenAI({
    apiKey: import.meta.env.NG_APP_GEMINI_API_KEY,
  });

  async sendMessage(message: string): Promise<string> {
    let lastError: unknown;

    for (const model of this.models) {
      try {
        const response = await this.generateContent(model, message);
        return response.text ?? '';
      } catch (error) {
        lastError = error;

        if (!this.isTemporaryGeminiError(error)) {
          throw error;
        }
      }
    }

    throw new Error(
      'Gemini is busy right now. Please try again in a few minutes.'
    );
  }

  private generateContent(model: string, message: string) {
    return this.googleGenAI.models.generateContent({
      model,
      contents: message,
    });
  }

  private isTemporaryGeminiError(error: unknown): boolean {
    const message = this.getErrorText(error).toLowerCase();

    return (
      message.includes('503') ||
      message.includes('unavailable') ||
      message.includes('high demand')
    );
  }

  private getErrorText(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return String(error);
  }
}
