import React from 'react'

type TableProps = {
  headers: string[]
  data: Array<Array<string | React.ReactNode>>
}

const Table: React.FC<TableProps> = ({ headers, data }) => (
  <div className='overflow-x-auto'>
    <table className='table-auto w-full border-collapse border border-gray-300'>
      <thead>
        <tr className='bg-gray-100'>
          {headers.map(header => (
            <th
              key={header}
              className='border border-gray-300 px-4 py-2 text-left'
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className='border border-gray-300 px-4 py-2'>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default Table
