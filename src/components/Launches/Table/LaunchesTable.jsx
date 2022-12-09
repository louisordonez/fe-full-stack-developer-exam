import './LaunchesTable.css'

const LaunchesTable = ({ launches }) => {
  const launchDetails = launches.map((launch, index) => (
    <div className="launches-table-container" key={index}>
      <div className="launches-table-icon">
        <img
          src={launch.links.flickr.original[0]}
          className="launches-table-icon-img"
        />
      </div>
      <div className="launches-table-info-container">
        <div className="launches-table-info-header">
          {launch.flight_number}: {launch.name} (
          {new Date(launch.date_unix).getFullYear()})
        </div>
        <div className="launches-table-info-details">
          Details: {launch.details}
        </div>
      </div>
    </div>
  ))

  return <div className="launches-table">{launchDetails}</div>
}

export default LaunchesTable
