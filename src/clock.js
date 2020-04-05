

class TIME
{
    constructor(seconds,player)
    {
        this.start=this.start.bind(this);
        this.pause=this.pause.bind(this);
        this.seconds=seconds;
        this.player=player;

 
       this.Timer=document.querySelector("#"+player);
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





                      
    
       
    
      