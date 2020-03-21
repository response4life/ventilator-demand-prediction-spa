import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

import { VictoryLine, VictoryChart } from 'victory'

function App() {
  const [ventilatorData, setVentilatorData] = useState([])
  const [infectedData, setInfectedData] = useState([])
  const [susceptibleData, setSusceptibleData] = useState([])
  const [recoveredData, setRecoveredData] = useState([])
  const [hospitalizedData, setHospitalizedData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: 'get',
        url: 'http://localhost:5000/'
      })
      const ventilatorData = result.data.map(day => ({
        x: day.day,
        y: day.ventilators_needed
      }))
      const infectedData = result.data.map(day => ({
        x: day.day,
        y: day.infected
      }))
      const hospitalizedData = result.data.map(day => ({
        x: day.day,
        y: day.hospitalized
      }))
      const susceptibleData = result.data.map(day => ({
        x: day.day,
        y: day.susceptible
      }))
      const recoveredData = result.data.map(day => ({
        x: day.day,
        y: day.recovered
      }))
      setVentilatorData(ventilatorData)
      setInfectedData(infectedData)
      setHospitalizedData(hospitalizedData)
      setSusceptibleData(susceptibleData)
      setRecoveredData(recoveredData)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <div style={{ height: '100%', width: '70%', margin: 'auto' }}>
        <VictoryChart>
          <VictoryLine data={ventilatorData} />
          <VictoryLine data={infectedData} />
          <VictoryLine data={hospitalizedData} />
          <VictoryLine data={susceptibleData} />
          <VictoryLine data={recoveredData} />
        </VictoryChart>
      </div>
    </div>
  )
}

export default App
