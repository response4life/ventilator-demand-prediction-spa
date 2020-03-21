import React, { useState } from 'react'

const inputStyle = { width: '100%' }

function ChartParameters({ setURLParams }) {
  const [parameters, setParameters] = useState({
    population: 100000,
    initialInfected: 1,
    initialRecovered: 0,
    contactRate: 0.2,
    recoveryRate: 0.1,
    days: 160
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setParameters({ ...parameters, [name]: value })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    setURLParams(parameters)
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Population:{' '}
          <input
            style={inputStyle}
            type="number"
            value={parameters.population}
            name="population"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Initial Infected:{' '}
          <input
            style={inputStyle}
            type="number"
            value={parameters.initialInfected}
            name="initialInfected"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Initial Recovered:{' '}
          <input
            style={inputStyle}
            type="number"
            value={parameters.initialRecovered}
            name="initialRecovered"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contact Rate:{' '}
          <input
            style={inputStyle}
            type="number"
            value={parameters.contactRate}
            name="contactRate"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Recovery Rate:{' '}
          <input
            style={inputStyle}
            type="number"
            value={parameters.recoveryRate}
            name="recoveryRate"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Days:{' '}
          <input
            style={inputStyle}
            type="number"
            value={parameters.days}
            name="days"
            onChange={handleInputChange}
          />
        </label>
        <input style={inputStyle} type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default ChartParameters
