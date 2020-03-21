import React from 'react'

function Table({ headers, rows }) {
  return (
    <div>
      <table style={{ width: '100%' }}>
        <tr>
          {headers.map(header => (
            <th>{header}</th>
          ))}
        </tr>
        {rows.map(row => (
          <tr>
            {headers.map(key => (
              <td>{row[key]}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Table
