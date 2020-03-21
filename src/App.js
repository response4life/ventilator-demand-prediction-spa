import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

import Chart from './Chart'
import Table from './Table'

const buildUrl = params => {
  const base =
    process.env.REACT_APP_NODE_ENV === 'production'
      ? 'https://r4l-ventilator-prediction-api.herokuapp.com/sir'
      : 'http://localhost:5000/sir'
  const url = `${base}?population=${params.population}&initial_infected=${params.initialInfected}&initial_recovered=${params.initialRecovered}&recovery_rate=${params.recoveryRate}&contact_rate=${params.contactRate}&days=${params.days}`
  return url
}

function App() {
  const [ventilatorData, setVentilatorData] = useState([])
  const [infectedData, setInfectedData] = useState([])
  const [susceptibleData, setSusceptibleData] = useState([])
  const [recoveredData, setRecoveredData] = useState([])
  const [hospitalizedData, setHospitalizedData] = useState([])
  const [URLParams, setURLParams] = useState({
    population: 100000,
    initialInfected: 1,
    initialRecovered: 0,
    contactRate: 0.2,
    recoveryRate: 0.1,
    days: 160
  })
  const [tableData, setTableData] = useState({ headers: [], rows: [] })

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: 'get',
        url: buildUrl(URLParams)
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
      setTableData({
        headers: [
          'day',
          'ventilators_needed',
          'infected',
          'hospitalized',
          'susceptible',
          'recovered'
        ],
        rows: result.data
      })
    }
    fetchData()
  }, [URLParams])

  return (
    <div className="App">
      <Chart
        setURLParams={setURLParams}
        lines={[
          { name: 'ventilators demanded', data: ventilatorData },
          { name: 'infected', data: infectedData },
          { name: 'hospitalized', data: hospitalizedData },
          { name: 'susceptible', data: susceptibleData },
          { name: 'recovered', data: recoveredData }
        ]}
      />
      <Table headers={tableData.headers} rows={tableData.rows} />
    </div>
  )
}

export default App
