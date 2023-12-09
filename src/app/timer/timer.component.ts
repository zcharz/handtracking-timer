import { Component } from '@angular/core';
import { Time } from '../data/time';
import { min } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  

  paused:boolean;
  currentTime: Time;
  initialLength: Time;
  //only useful when timer is running
  endsAt: Date;
  startedAt: Date;



  constructor(){}

  ngOnInit(){
    this.initialLength = new Time(0,5,0);
    this.currentTime = new Time(0,5,0);
    this.paused = true;

    setInterval(this.tick, 1000);
  }

  toggleTimer(){
    if(this.paused){ //start timer
      
      this.endsAt = new Date(Date.now() + this.currentTime.minutes * 60 * 1000);
      this.paused = false;

    }
    else{ //stop timer
      this.paused = true;

    }
  }

  tick(){
    if(!this.paused && this.endsAt != null){
      const now = Date.now();
      const dif = this.endsAt.getTime() - now;
      var hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((dif % (1000 * 60)) / 1000);
      this.currentTime = new Time(hours, minutes, seconds);
      console.log("tick");
    }

  }

}