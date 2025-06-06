import { useState, useEffect } from 'react';
import './App.css';
import Nav from './component/Nav';
import DateBar from './component/DateBar';
import Box from './component/Box';
import Cards from './component/Cards';
import TemporEvents from './component/TemporEvents';

function App() {
  const [address, setAddress] = useState([]);
  const [data, setData] = useState()
  const [boxData, setBoxData] = useState();
  
  //get langtitude and lontitude add them to address array 0=lan, 1=lon
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setAddress([latitude, longitude]); 
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    
  }, []);  
  
  //on address setup from previous useEffect then we fetch data from API
  // data is set onn data state
  useEffect(()=>{
    if(address.length > 0){
      //api https://api.aladhan.com/v1/timings?latitude=25&longitude=44&method=4
    fetch(`https://api.aladhan.com/v1/timings?latitude=${address[0]}&longitude=${address[1]}&method=4`)
    .then(data => data.json())
    .then(data => {
      setData(data)
      
    })
    }
  }, [address])




  /*
  on data change clean data and resolve desired data for the app
  add the desired data on boxData state
  first checks 
  if data is already there then
   let data in variable z (not state) and call cleanTiming(z) this add arabic names and id
  and more suitable data
  and after 500 milisecond we remove the spinnner of loading data becuase everything now is setup and we can lunch
  else
    return
  */
  useEffect(()=>{
    const timeIn12System = (z) => {
      let x = String(z).split(":");
      x[0] = Number(x[0]);
      x[1] = Number(x[1]);
      let h = x[0];
      let ampm = h >= 12 ? "مساء" : "صباحا";
      h = h % 12 || 12;
      h = h >= 10 ? h : `0${h}`;
  
      let m = x[1];
      m = m >= 10 ? m : `0${m}`;
  
      let y = `${h}:${m} ${ampm}`;
      return y;
  }
  
  const cleanTiming = (z)=>{
    
    let x = null
    
    x = z['Asr'];
    z['Asr'] = {'time24': x, "time12":timeIn12System(x),"ar": "العصر", "id":1}
  
    x = z['Dhuhr'];
    z['Dhuhr'] = {'time24': x, "time12":timeIn12System(x),"ar": "الظهر", "id":2}
  
    x = z['Fajr'];
    z['Fajr'] = {'time24': x, "time12":timeIn12System(x),"ar": "الفجر", "id":3}
  
    x = z['Isha'];
    z['Isha'] = {'time24': x, "time12":timeIn12System(x),"ar": "العشاء", "id":4}
  
    x = z['Lastthird'];
    z['Lastthird'] = {'time24': x, "time12":timeIn12System(x),"ar": "الثلث الاخير", "id":5}
  
    x = z['Maghrib'];
    z['Maghrib'] = {'time24': x, "time12":timeIn12System(x),"ar": "المغرب", "id":6}
  
    x = z['Midnight'];
    z['Midnight'] = {'time24': x, "time12":timeIn12System(x),"ar": "منتصف الليل", "id":7}
  
    x = z['Sunrise'];
    z['Sunrise'] = {'time24': x, "time12":timeIn12System(x),"ar": "الشروق", "id":8}
  
    delete z['Firstthird'];
    delete z['Imsak'];
    delete z['Sunset'];
    setBoxData(z);
  }
    
  
      if(data){
      let z = {...data['data']['timings']}
      cleanTiming(z)
      let spinner = document.querySelector('.loading');
      setInterval(() => {
        spinner.classList.add('hidden');
      }, 500);
    }
  },[data])

  return (
    <div className="App bg-dark">
      <div className="loading">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      </div>
      <Nav/>
      <TemporEvents date={data ? data['data']['date']: false}/>
      <DateBar date={data ? data['data']['date']: null}/>
      <Box timings={boxData ? boxData: null}/>
      <Cards timings={boxData ? boxData: null}/>
    </div>
  );
}

export default App;
