import './LaunchesTable.css'

const LaunchesTable = () => {
  return (
    <div className="launches-table">
      <div className="launches-table-container">
        <div className="launches-table-icon"></div>
        <div className="launches-table-info-container">
          <div className="launches-table-info-header">Flight number:</div>
          <div className="launches-table-info-details">Details:</div>
        </div>
      </div>
    </div>
  )
}

export default LaunchesTable
