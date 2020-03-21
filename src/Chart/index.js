import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'

import ChartController from './ChartController'

const showLine = showLines => line => showLines.includes(line.name)

const renderLines = (lines, showLines, linesColorMap) => {
  console.log(showLines)
  const shouldShowLine = showLine(showLines)
  return lines
    .filter(shouldShowLine)
    .map(line => (
      <VictoryLine
        data={line.data}
        style={{ data: { stroke: linesColorMap[line.name] || 'black' } }}
      />
    ))
}

const getlineNameList = lines => lines.map(line => line.name)

const getLineColors = lines => {
  return {
    susceptible: 'blue',
    infected: 'red',
    recovered: 'green',
    'ventilators demanded': 'purple',
    hospitalized: 'orange'
  }
}

function Chart({ lines }) {
  const lineNameList = getlineNameList(lines)
  const linesColorMap = getLineColors(lineNameList)
  const [showLines, setShowLines] = useState(lineNameList)

  return (
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
  )
}

Chart.propTypes = {
  lines: PropTypes.array
}

export default Chart
