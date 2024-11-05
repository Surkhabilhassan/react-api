import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import WatherCard from './../watherCard'

let Home = () => {

  const [CityName, setCityName] = useState("");
  const [data, setData] = useState([]);

  let submitHandler = async (e) => {
    e.preventDefault();

    if (!CityName) {
      console.log("City name is required");
      return;
    }

    console.log("I am submit handler function");

    try {
      let response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${CityName}&appid=2d93cd43c6c0fa7a5697a1f434c522dc&units=metric`);

      console.log("response:", response);

      setData(response.data.list);

    } catch (error) {
      console.log("error in API call:", error);
    }
  }

  return (
    <div>
      <h1>Wather App Home</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>City Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter City Name" 
            onChange={(e) => setCityName(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Get Weather</Button>
      </Form>

      {data.map((eachForecast, index) => (
        <WatherCard
          key={index}
          date={eachForecast.dt_txt}
          temp={eachForecast.main.temp}
          min={eachForecast.main.temp_min}
          max={eachForecast.main.temp_max}
          pressure={eachForecast.main.pressure}
          humidity={eachForecast.main.humidity}  // corrected spelling
          kf={eachForecast.main.temp_kf}
          feel={eachForecast.main.feels_like}   // corrected property name
        />
      ))}
    </div>
  )
}

export default Home;
