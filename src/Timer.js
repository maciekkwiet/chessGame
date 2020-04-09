

class Timer
{
    constructor(seconds,player)
    {
        this.start=this.start.bind(this);
        this.pause=this.pause.bind(this);
        this.seconds=seconds;
        this.player=player;
        

 
       this.TimerHandler=document.querySelector("#"+player);
      
     
    
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
        console.log("GAME OVER")

       // let newDiv = document.createElement("div");
       // newDiv.body.innerHTML = "GAME OVER";
        
       document.querySelector(".end").classList.toggle("visible");
                 
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





                      
    
       
    
      