import { Component } from '@angular/core';
import { AppService } from './app.service';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private apiService: AppService) { }
  synth: any = window.speechSynthesis;
  title = 'speak';
  transcript: string = "";
  started: boolean = false;
  start() {
    const recognition = new webkitSpeechRecognition();
    this.started = true;
    recognition.onstart = () => {
      console.log('Speech recognition started');

    };

    recognition.onresult = (event: any) => {
      this.transcript = event.results[0][0].transcript;
      console.log(this.transcript);
      console.log(this.started);
      if (this.transcript.trim() !== "")
        this.getChatGPTResponse(this.transcript)
    };
    recognition.onend = (event: any) => {
      console.log("***********end********")

      console.log(this.started);
    }

    recognition.start();

  }
  getChatGPTResponse(prompt: string) {

    this.apiService.fetchText(prompt).subscribe((response: any) => {
      console.log(response)
      // return responseJSON.choices[0].text;
      this.speak(response.choices[0].text)
      this.started = false;
    })

  }
  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    this.synth.speak(utterance);
  }

}
