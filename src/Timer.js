
class Timer
{
    constructor(seconds,player,fun)
    {
        this.start=this.start.bind(this);
        this.pause=this.pause.bind(this);
        this.seconds=seconds;
        this.player=player;
        this.fun=fun;
        console.log(this.fun)
        
        
       this.TimerHandler=document.querySelector("#"+player);
       this.end=document.querySelector("#end");
      
      
    }

 
    start()
    {  
        this.interval=setInterval(()=>this.timedown(),1000);
            
    }



    pause()
    {
        clearInterval(this.interval)
        
    }

    stop()
    {
        this.pause();
       // console.log("GAME OVER") 
        this.end.innerHTML="GAME OVER" 
        this.fun;
        
                         
    }

 
    timedown()
    {     
        this.TimerHandler.innerHTML=this.convertSeconds(this.seconds); 
        if(this.seconds>0)
    {
        this.seconds--;  
        return this.seconds;
           
    }
  
    else this.stop();
    
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

export default Timer;





                      
    
       
    
      