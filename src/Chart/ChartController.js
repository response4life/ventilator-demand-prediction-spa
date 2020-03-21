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
        <div style={{ width: '100%', marginTop: '.5em' }}>
          <label style={{ color: colorMap[line] }} key={`${line}-checkbox`}>
            {line}:
            <input
              type="checkbox"
              checked={showLines.includes(line)}
              onChange={onChangeLine(line)}
            />
          </label>
        </div>
      ))}
    </div>
  )
}

export default ChartController
