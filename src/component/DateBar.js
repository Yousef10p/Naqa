import { useState, useEffect } from 'react';
import '../App.css';


export default function DateBar({date}){
    const [time, setTime] = useState();

    useEffect(()=>{
        // the followign are doing normal clock simply by editing the state [time, setTime]
        const updateClock = () => {
            let x = new Date();
            let h = x.getHours();
            let ampm = h >= 12 ? 'مساء' : 'صباح';
            h = h % 12 || 12;
            let m = x.getMinutes();
            m = m >= 10 ? `${m}` : `0${m}`;
            let s = x.getSeconds();
            s = s >= 10 ? `${s}` : `0${s}`;
            let y = `${ampm} ${h}:${m}:${s} `;
            setTime(y);
        };
        const interval = setInterval(updateClock, 1000); 

        return () => clearInterval(interval); 
    },[])
    let day = date ? date['hijri']['weekday']['ar']: '-'; // get day in arabic such الاحد الخميس وهكذا
    let year = date ? date['readable']: '-'; // get the year in readable format such ---> "17 Apr 2025"
    let higri = date ?  `${date['hijri']['day']} ${date['hijri']['month']['ar']} `: '-' // concatenate hijri day such --> 19 and hijri-month-arabic such --> شوال resulting --> "19 شوال"
    return(
        
        <div className="Date">
            <div className="Date-2">
                <h4 className='day'>{day}</h4>
                <div className='Date-CurrentDate bg-secondary'>{ year }</div>
            </div>
            <div className="Date-2">
                <h4 className='higri'>{higri}</h4>
                <div className='Date-CurrentDate bg-secondary time'>{time}</div>
            </div>
        </div>
    )
}