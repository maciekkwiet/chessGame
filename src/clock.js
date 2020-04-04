

class TIME
{
    constructor(seconds,player,child)
    {
        this.start=this.start.bind(this);
        this.pause=this.pause.bind(this);
        this.seconds=seconds;
        this.player=player;
        this.child=child;

        const el = document.createElement("div");

        el.innerText = "timer";
        el.setAttribute("title", "Gamer");
        el.classList.add("timer");
        

        const div = document.querySelector(".chessTimer")
       
     
        div.appendChild(el);

       this.Timer=el;
       console.log(this.Timer);
    
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
    console.log("timer"+this.convertSeconds(this.seconds))
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





                      
    
       
    
      