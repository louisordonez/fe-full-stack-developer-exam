const LaunchesCard = ({ launch }) => {
  return (
    <div className="launches-card-container">
      <div className="launches-card-icon">
        <a
          className="table-cell"
          href={launch.links.webcast}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.youtube.com/vi/${launch.links.youtube_id}/default.jpg`}
            className="launches-card-icon-img"
          />
        </a>
      </div>
      <div className="launches-card-info-container">
        <div className="launches-card-info-header">
          {launch.flight_number}: {launch.name} (
          {new Date(launch.date_utc).getFullYear()})
        </div>
        <div className="launches-card-info-details">
          Details: {launch.details}
        </div>
      </div>
    </div>
  )
}

export default LaunchesCard
