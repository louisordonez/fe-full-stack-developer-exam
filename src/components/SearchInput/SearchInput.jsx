import './SearchInput.css'

const SearchInput = ({ query, handleSearch }) => {
  return (
    <div>
      <input type="text" className="search-input" placeholder="Enter keywords" value={query} onChange={handleSearch} />
    </div>
  )
}

export default SearchInput
