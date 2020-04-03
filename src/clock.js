

class TIME
{
    constructor(seconds,timer)
    {
        this.start=this.start.bind(this);
        this.pause=this.pause.bind(this);
        this.seconds=seconds;
        this.timer=timer;

        //this.Start=document.querySelector('#Start');
        //this.Stop=document.querySelector('#Stop');
        this.Timer=document.querySelector("#"+this.timer);
        //this.Pause=document.querySelector('#Pause');
    
        //this.Start.addEventListener('click',this.start);
        //this.Pause.addEventListener('click',this.pause);
        //this.Stop.addEventListener('click',this.stop);  
    }

    start()
    {  
        this.interval=setInterval(()=>this.timedown(),1000);
        console.log(this.interval);    
    }

    pause()
    {
        clearInterval(this.interval)
    }
    timedown()
    {     
    
    if(this.seconds>0)
    this.seconds--;
   this.Timer.innerHTML=this.convertSeconds(this.seconds);
    console.log(this.convertSeconds(this.seconds))
    return this.seconds;       
    }

    convertSeconds(s)
    {
    let min= Math.floor(s/60);
    let sec= s % 60;
    min = min<10 ? "0" + min : min;
    sec=sec<10 ? "0" + sec : sec;
    return  min + ":" + sec
    }
    }

export default TIME;





                      
    
       
    
      