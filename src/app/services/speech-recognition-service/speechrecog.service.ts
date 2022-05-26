import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class SpeechrecogService {
  // variable to store webkitSpeechRecognition instance
  speechRecogInstance: any;
  // variable to check whether the speech recognition has stopped
  isStoppedSpeechRecog: boolean = false;
  // actual text that can be used elsewhere in the app
  public text: string = '';
  // temproary variable to hold words, but not the whole para
  tempWords: string = '';

  constructor() {
    // initialize the new webkitSpeechRecognition object
    this.speechRecogInstance = new webkitSpeechRecognition();
    // set the language
    this.speechRecogInstance.lang = 'en-US';
  }

  // intitalize the speech recognition service
  initSpeechRecognition() {
    // voice recognition language
    this.speechRecogInstance.lang = 'en-US';
    // listen to result event
    this.speechRecogInstance.addEventListener('result', (e: any) => {
      // take latest word and append it to transcript and assign to tempWords
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
    });
    console.log('Speech Recognition is initialized');
  }

  // start the speech recognition service
  start() {
    // set isStoppedSpeechRecog to false
    this.isStoppedSpeechRecog = false;
    // start the service
    this.speechRecogInstance.start();
    console.log('Speech recognition started');
    // listen to end event
    this.speechRecogInstance.addEventListener('end', (condition: any) => {
      // if isStoppedSpeechRecog is true
      if (this.isStoppedSpeechRecog) {
        // stop the speech recognition service
        this.speechRecogInstance.stop();
        console.log('End speech recognition');
      } else {
        // call wordConcat function and start the service
        this.wordConcat();
        this.speechRecogInstance.start();
      }
    });
  }

  // stop the service
  stop() {
    // set isStoppedSpeechRecog to true
    this.isStoppedSpeechRecog = true;
    // call wordConcat()
    this.wordConcat();
    // stop the service
    this.speechRecogInstance.stop();
    console.log('End speech recognition');
  }

  wordConcat() {
    // append the text with tempwords and empty that
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
  }
}
