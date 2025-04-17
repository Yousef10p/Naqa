import { useState, useEffect } from 'react';
import '../App.css';
import CardGenerate from './CardGenerate';

export default function Cards({timings}){
    
    
        
        
    return (
        <div className="time-card-div text-light">
            <div className='time-card-inner-div-lhs-rhs'>
                <CardGenerate event={timings ? timings['Fajr'] : '-'}/>
                <CardGenerate event={timings ? timings['Sunrise'] : '-'}/>
                <CardGenerate event={timings ? timings['Dhuhr'] : '-'}/>
                <CardGenerate event={timings ? timings['Asr'] : '-'}/>
            </div>
            <div className='time-card-inner-div-lhs-rhs'>
                <CardGenerate event={timings ? timings['Maghrib'] : '-'}/>
                <CardGenerate event={timings ? timings['Isha'] : '-'}/>
                <CardGenerate event={timings ? timings['Midnight'] : '-'}/>
                <CardGenerate event={timings ? timings['Lastthird'] : '-'}/>
            </div>
            
        </div>
    )
}