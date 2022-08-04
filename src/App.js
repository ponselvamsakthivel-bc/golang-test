import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getMethod } from './apiService';
import moment from 'moment';

function App() {


  const [time, setTime] = useState("")
  const [easternTime, setEasternTime] = useState("")

  useEffect(() => {
    getServerTime()
  }, [])


  const getServerTime = () => {
    getMethod(
      "http://3.16.42.52:10000/epoch",
      success => {
        if (success.type == "success") {
          if (success?.data?.epoch_time) {
            let t = new Date(success?.data?.epoch_time * 1000)
            let humanTime = moment(t).format('MMMM Do YYYY, h:mm:ss a')
            setTime(humanTime)
            getEasternTime(success?.data?.epoch_time)
          }
        }
      },
      error => { },
    )
  }

  const getEasternTime = (epoch) => {
    getMethod(
      "http://api.timezonedb.com/v2.1/convert-time-zone?key=BV2IF81PXSS4&format=json&from=Asia/Kolkata&to=Europe/London&time=" + epoch,
      success => {
        if (success?.toTimestamp) {
          let t = new Date(success?.toTimestamp * 1000)
          let humanTime = moment(t).format('MMMM Do YYYY, h:mm:ss a')
          setEasternTime(humanTime)
        }
      },
      error => { },
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


        <table>
          <tr>
            <td>
              <h1>{"Server Time :-"}</h1>
            </td>
            <td>
              <h3>{time}</h3>
            </td>

            <td>
              <button onClick={() => getServerTime()}>{"Refresh"}</button>
            </td>
          </tr>


          <tr>
            <td>
              <h1>{"Eastern Time :-"}</h1>
            </td>
            <td>
              <h3>{easternTime}</h3>
            </td>

            <td>
            </td>
          </tr>
        </table>


      </header>
    </div>
  );
}

export default App;
