import { useState, useEffect } from 'react';
import '../App.css';
import Message from './Message';
export default function Box({ timings }) {
   const [next_PrevousEvent, setNext_PrevousEvent] = useState(false)
   const [before, setBefore] = useState(false)

   useEffect(()=>{

        // الدالتين التاليتين لايجاد الحدث الاقرب التالي والماضي من الوقت الحالي
        function setNextEventDiff(now, events){
            
            
            let minimum = 999999;
            let E  = null;
            let arr = []
            Object.values(events).forEach(event => {
                arr = event['time24'].split(':');
                let es = 86400 - (arr[0] * 3600 + arr[1] * 60);
                let d = now - es;
                
                if (d > 0) {
                    if (d < minimum) {
                        minimum = d;
                        E = event;
                    }
                } else {
                    d = now + (arr[0] * 3600 + arr[1] * 60);
                    if (d < minimum) {
                        minimum = d;
                        E = event;
                    }
                }
            });
            
            return [E, minimum];
        }

        function setPrevEventDiff(now, realNow, events){
            
            
            let minimum = 999999;
            let E  = null;
            let arr = []
            Object.values(events).forEach(event => {
                arr = event['time24'].split(':');
                let es = 86400 - (arr[0] * 3600 + arr[1] * 60);
                let d = es - now;
                
                if (d > 0) {
                    if (d < minimum) {
                        minimum = d;
                        E = event;
                    }
                } else {
                    d = es + realNow;
                    if (d < minimum) {
                        minimum = d;
                        E = event;
                    }
                }
            });
            
            return [E, minimum];
        }

        function setEvent(timingsSet){
            setInterval(() => {
                let date = new Date()
                let realNow = ((date.getHours()*3600) + (date.getMinutes()*60) + date.getSeconds());
                let now = (86400) - realNow;
                /* 
               معنا الوقت من الساعة 12 الى اللحظة هذي بالثواني ومسجلة في المتغير السابق
               راح نكلم دالتين لاعطاءنا الفرق بين وقت الحدث القادم والسابق ويكونون مسجلين بالثواني زي ما ان هذا الوقت مسجل بالثواني
               وبناء على الاقل نسجله
               وان كان الحدث الماضي قبل اقل من 20 دقيقة فاهو راح ياخذ زمام الامور
               اذا اكثر من 20 دقيقة فا الحدث التالي ياخذ زمام الامور
               
               
               
                */
                let x = setNextEventDiff(now,timingsSet); // 
                let y = setPrevEventDiff(now,realNow,timingsSet);
                // console.log(`from now ${now} to ${x[0]['ar']} = ${x[1]}`);
                // console.log(`from ${y[0]['ar']} to ${realNow} = ${y[1]}`);
                if(y[1] < 1200){// 1200 = 60*20 which is 20 minute
                    setNext_PrevousEvent(y)
                    setBefore(true)    
                }
                else{
                    setNext_PrevousEvent(x)
                    setBefore(false)
                }
            }, 1000);
            
        }

        if(timings)
            setEvent(timings);
       
        
    },[timings])

    const getSentence = () => {
        let span = document.querySelector('.bu-span');
       
            if(before == false)
                span.classList.remove('before');
            else
                span.classList.add('before');
       
    
        let c1 = next_PrevousEvent[0]['ar'];
        let c2 = before ? 'قبل' : 'بعد';
        return `${c1} ${c2}`;
    };
    
    const getTimeFormattedTimeDifference = ()=>{
            let c3_1 = next_PrevousEvent[1];
            let c3_h = Math.floor(c3_1/3600);
            c3_1 = c3_1 % 3600;
            let c3_m = Math.floor(c3_1/60);
            c3_m = c3_m < 10 ? `0${c3_m}`: c3_m
            c3_1 = c3_1 % 60;
            c3_1 = c3_1 < 10 ? `0${c3_1}`: c3_1
            let c3_s = c3_1;
            return `${c3_h}:${c3_m}:${c3_s}`;
    }

    return (
        <div className='box-times'>
            <div className="box bg-secondary">
                <div className="box-upper">
                    <span className='before bu-span'>
                        {next_PrevousEvent ? getSentence(): '-'}
                        <br/>
                        {next_PrevousEvent ? getTimeFormattedTimeDifference(): '-'}
                    </span>
                </div>
                <div className="box-lower">
                    <div className="box-lower-rhs"></div>
                    <div className="box-lower-lhs">
                        <Message/>
                    </div>
                </div>
            </div>
        </div>
    );
}
