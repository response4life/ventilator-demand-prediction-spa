import React from 'react'

function ChartController({ lineNameList, showLines, setShowLines, colorMap }) {
  const onChangeLine = lineName => e => {
    if (e.target.checked) {
      if (!showLines.includes(lineName)) {
        setShowLines([...showLines, lineName])
      }
    } else {
      if (showLines.includes(lineName)) {
        setShowLines(showLines.filter(line => line !== lineName))
      }
    }
  }

  return (
    <div>
      {lineNameList.map(line => (
        <label style={{ 'padding-left': '.5em', color: colorMap[line] }}>
          {line}:
          <input type="checkbox" checked={showLines.includes(line)} onChange={onChangeLine(line)} />
        </label>
      ))}
    </div>
  )
}

export default ChartController
