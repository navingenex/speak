import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  fetchText(prompt: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      })
    };
    const body = JSON.stringify({
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5,
    })
    return this.http.post("https://api.openai.com/v1/engines/text-davinci-002/completions", body, httpOptions)
  }
}
