import { SpeechrecogService } from './../../services/speech-recognition-service/speechrecog.service';
import { Component, OnInit } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-speechrecog',
  templateUrl: './speechrecog.component.html',
  styleUrls: ['./speechrecog.component.css'],
})
export class SpeechrecogComponent implements OnInit {
  errorMessage!: any;
  serviceStarted: boolean = false;
  allowAudio: boolean = false;

  constructor(public speechRecogService: SpeechrecogService) {
    this.speechRecogService.initSpeechRecognition();
    this.getLocalStream();
  }

  ngOnInit(): void {
    this.speechRecogService.speechRecogInstance.onerror = (event: any) => {
      this.errorMessage =
        'Please wait....if it takes too long, restart the service.';
    };
    this.speechRecogService.speechRecogInstance.onstart = (event: any) => {
      this.serviceStarted = true;
      this.errorMessage = undefined;
    };
  }

  onStart() {
    if (this.allowAudio) {
      this.speechRecogService.start();
      this.errorMessage = 'Please wait...';
    } else {
      this.errorMessage = 'Please permit microphone access!';
    }
  }

  onEnd() {
    this.speechRecogService.stop();
    this.serviceStarted = false;
  }

  getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(() => {
        this.allowAudio = true;
      })
      .catch((err) => {
        console.log('u got an error:' + err);
        this.errorMessage = 'Please permit microphone access!';
        this.allowAudio = false;
      });
  }
}
