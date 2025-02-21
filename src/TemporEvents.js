import { useEffect, useState } from "react";
import './App.css'

export default function TemporEvents({date}){
        const [eidF, setEidF] = useState([
            "🎉 عيد سعيد ",
            "🕌 عيد مبارك ",
            "🎁 مبروك العيد ",
            "💖 عساكم من عواده ",
            "🙏 تقبل الله منا ومنكم ",
            "🌙 عيدكم مبارك ",
            "🌟 كل عام وأنتم بخير ",
            "😊 عيد الفرحة ",
            "📿 تقبل الله صالح الأعمال ",
            "🎊 مبارك عليكم العيد "
        ]);
        const [ramadan, setRamadan] = useState([
            "🌙 رمضان كريم",
            "🕌 رمضان مبارك",
            "🌜 مبارك عليكم الشهر",
            "🌟 كل عام وأنتم بخير",
            "🙏 تقبل الله منا ومنكم",
            "💖 عساكم من عواده",
            "🤲 رمضان فرصة للتقرب إلى الله",
            "🥘 صوم مقبول",
            "💫 رمضان شهر الرحمة",
            "🕋 تقبل الله صيامكم وقيامكم"
        ]
        );
        
        
        useEffect(()=>{

        function setSentence(month, day){
        let root = document.querySelector('.TemporEvents');
            let tag = document.createElement('p');
            if(month == 8 || month == 9 || month == 10){
                if((day >= 25 && month == 9) || (day < 6 && month == 10)){
                    let index = Math.floor(Math.random() * eidF.length);
                    tag.innerHTML = eidF[index];
                    root.appendChild(tag);
                    root.classList.add('TemporEventsExist'); 
                }
                else{
                    let index = Math.floor(Math.random() * ramadan.length);
                    tag.innerHTML = ramadan[index];
                    root.appendChild(tag);
                    root.classList.add('TemporEventsExist'); 
                }
            }else if(month == 12){
                    let index = Math.floor(Math.random() * eidF.length);
                    tag.innerHTML = eidF[index];
                    root.appendChild(tag);
                    root.classList.add('TemporEventsExist'); 
            }       
        }

        if(date){
            let month = date['hijri']['month']['number']
            let day = date['hijri']['day']
            setSentence(month,day)
        }

        },[date])
        
    
    return (
        <div className="TemporEvents">
            
        </div>
    )
}