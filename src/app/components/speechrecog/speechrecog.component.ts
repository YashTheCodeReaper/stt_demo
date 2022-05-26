import { SpeechrecogService } from './../../services/speech-recognition-service/speechrecog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speechrecog',
  templateUrl: './speechrecog.component.html',
  styleUrls: ['./speechrecog.component.css'],
})
export class SpeechrecogComponent implements OnInit {
  // variable to hold messages
  errorMessage!: any;
  // variable used to show text box
  serviceStarted: boolean = false;
  // variable to hold audio access status
  allowAudio: boolean = false;

  constructor(public speechRecogService: SpeechrecogService) {
    // initialize speech recognition service
    this.speechRecogService.initSpeechRecognition();
    // get audio access
    this.getLocalStream();
  }

  ngOnInit(): void {
    // if any error show errorMessage
    this.speechRecogService.speechRecogInstance.onerror = (event: any) => {
      this.errorMessage =
        'Please wait....if it takes too long, restart the service.';
    };
    // upon start of speech recognition service, set serviceStarted to true
    this.speechRecogService.speechRecogInstance.onstart = (event: any) => {
      this.serviceStarted = true;
      // set errorMessage to undefined
      this.errorMessage = undefined;
    };
  }

  onStart() {
    // if there is audio access
    if (this.allowAudio) {
      // start the speech recognition service
      this.speechRecogService.start();
      this.errorMessage = 'Please wait...';
    } else {
      // else show errorMessage
      this.errorMessage = 'Please permit microphone access!';
    }
  }

  // function to end speech recognition service
  onEnd() {
    this.speechRecogService.stop();
    // set serviceStarted to false
    this.serviceStarted = false;
  }

  // function to get audio access
  getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(() => {
        // upon successful audio access, set allowAudio to true
        this.allowAudio = true;
      })
      .catch((err) => {
        console.log('u got an error:' + err);
        // if there is any error accessing audio, show errorMessage, set allowAudio to false
        this.errorMessage = 'Please permit microphone access!';
        this.allowAudio = false;
      });
  }
}
