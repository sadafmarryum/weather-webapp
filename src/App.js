import { useState } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


function App() {
  let [city, setcity] = useState('');
  let [wdetails, setwdetails] = useState()
  let getData = (e) => {
    if (!city) {
      NotificationManager.error("Please enter a city name");
      return;
    }
    //  Fetch API is often used to retrieve data from external APIs and display it in a component.
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c046edb5bfcb493f61c6ed1c9d09998d&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod==='404') {
          NotificationManager.error("City not found");
          setwdetails()
        }
        else {
          setwdetails(finalRes)
        }
      })
    setcity('')
    e.preventDefault();
    console.log(wdetails);
    
  }

  return (
    <>
      <NotificationContainer />
      <div className="w-100 vh-100 bg-info  ">
        <div className=' p-5'>
          <h1 className='text-white'>Simple Weather App
          </h1>
          <form onSubmit={getData}>
            <input type="text" value={city} onChange={(e) => setcity(e.target.value)} placeholder='City Name' />
            <button className='bg-primary ms-1 text-white'> <b>Submit</b></button>
          </form>
        </div>

        <div className='w-25 bg-light ms-5'>
          <div className="p-3">
            {/* <img src="/img/loading.jpg" alt="gif" style={{ width: '80px', position:'absolute' }} /> */}
            {wdetails !== undefined
              ? <>
                <h2 className='font-bold text-[30px]'>{wdetails.name}  <span className='bg-warning'> {wdetails.sys.country}</span></h2>
                <h3 className='font-bold text-[40px]'>{wdetails.main.temp}</h3>
                <img src='/img/weather.png' style={{ width: '60px' }} alt="img" />
                <p className='mt-2'><b>{wdetails.weather[0].description}</b></p>
              </>
              : 'No Data Available'
            }
          </div>
        </div>


      </div>
    </>
  );
}

export default App;
// ${ wdetails.weather[0].icon }
