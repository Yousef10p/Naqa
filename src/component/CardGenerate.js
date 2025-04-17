import { useState, useEffect } from 'react';
import '../App.css';

export default function CardGenerate({event}){
    
    const [sentence, setSentence] = useState(false)
    useEffect(()=>{
        function setText(){
            let s1 = `${event['ar']}`
            let s2 = `${event['time12']}`;
            return [s1,s2]
        }

        if(event){
            setSentence(setText())
        }
    },[event])
    useEffect(()=>{
        if(sentence){
            let tag = document.getElementById(`${event.id}`)
            if(tag){
               tag.children[0].innerHTML = sentence[0]; 
               tag.children[1].innerHTML = sentence[1]; 
            }
        }
    },[sentence])
    
    return (
        <div id={`${event['id']}`} className={`card`} >
            <p></p>
            <p></p>
        </div>
    )
}