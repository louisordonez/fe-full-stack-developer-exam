const LaunchesCard = ({ launch }) => {
  return (
    <div className="launches-card-container">
      <div className="launches-card-icon">
        <img src={launch.links.flickr.original[0]} className="launches-card-icon-img" />
      </div>
      <div className="launches-card-info-container">
        <div className="launches-card-info-header">
          {launch.flight_number}: {launch.name} ({new Date(launch.date_utc).getFullYear()})
        </div>
        <div className="launches-card-info-details">Details: {launch.details}</div>
      </div>
    </div>
  )
}

export default LaunchesCard
