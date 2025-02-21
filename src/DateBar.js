import { useState, useEffect } from 'react';
import './App.css';


export default function DateBar({date}){
    const [time, setTime] = useState();

    useEffect(()=>{
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
    let day = date ? date['hijri']['weekday']['ar']: '-';
    let year = date ? date['readable']: '-';
    let higri = date ?  `${date['hijri']['day']} ${date['hijri']['month']['ar']} `: '-'
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