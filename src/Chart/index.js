import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryLine } from 'victory'

import ChartController from './ChartController'
import ChartParameters from './ChartParameters'

const showLine = showLines => line => showLines.includes(line.name)

const renderLines = (lines, showLines, linesColorMap) => {
  const shouldShowLine = showLine(showLines)
  return lines
    .filter(shouldShowLine)
    .map(line => (
      <VictoryLine
        key={line.name}
        data={line.data}
        style={{ data: { stroke: linesColorMap[line.name] || 'black' } }}
      />
    ))
}

const getlineNameList = lines => lines.map(line => line.name)

const getLineColors = () => {
  return {
    susceptible: 'blue',
    infected: 'red',
    recovered: 'green',
    'ventilators demanded': 'purple',
    hospitalized: 'orange'
  }
}

function Chart({ lines, setURLParams }) {
  const lineNameList = getlineNameList(lines)
  const linesColorMap = getLineColors(lineNameList)
  const [showLines, setShowLines] = useState(lineNameList)

  return (
    <div style={{ width: '100%', height: 'auto', marginBottom: '2em', display: 'flex' }}>
      <div style={{ width: '80%' }}>
        <VictoryChart
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        >
          {renderLines(lines, showLines, linesColorMap)}
        </VictoryChart>
        <ChartController
          lineNameList={lineNameList}
          setShowLines={setShowLines}
          showLines={showLines}
          colorMap={linesColorMap}
        />
      </div>
      <div style={{ width: '20%', height: 'auto' }}>
        <ChartParameters setURLParams={setURLParams} />
      </div>
    </div>
  )
}

Chart.propTypes = {
  lines: PropTypes.array,
  setURLParams: PropTypes.func
}

export default Chart
