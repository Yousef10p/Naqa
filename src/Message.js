import { useState, useEffect } from 'react';
import './App.css';

export default function Message() {
    const [index, setIndex] = useState(null);
    const [adhkar, setAdhkar] = useState([
        "اللَّهُمَّ لَكَ الحَمْدُ",
        "اللَّهُ أَكْبَرُ",
        "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
        "لَا إِلٰهَ إِلَّا اللَّهُ",
        "أَسْتَغْفِرُ اللَّهَ",
        "اللَّهُمَّ آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً",
        "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ العَفْوَ فَاعْفُ عَنَّا",
        "لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ"
    ]);

    useEffect(() => {
        function getRandomIndex() {
            const randomIndex = Math.floor(Math.random() * adhkar.length);
            setIndex(randomIndex);
        }

        // Get a random message on initial render
        getRandomIndex();

        // Set interval to change message every 5 minutes (300000 milliseconds)
        const interval = setInterval(() => {
            getRandomIndex();
        }, 180000); // 300000 ms = 5 minutes

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [adhkar]); // Dependency array ensures effect runs on first render

    return (
        <span id='message'>
            {index !== null ? adhkar[index] : "Loading..."}
        </span>
    );
}
