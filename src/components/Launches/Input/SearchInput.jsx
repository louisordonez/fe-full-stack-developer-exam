import './SearchInput.css'

const SearchInput = ({ search, handleSearch }) => {
  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Enter keywords"
        value={search}
        onChange={handleSearch}
      />
    </div>
  )
}

export default SearchInput
