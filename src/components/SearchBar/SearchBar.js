import style from './SearchBar.module.scss';

const SearchBar = ( { searchValue, onChangeSearch } ) => {
    
    return (
        <input className={`${style.searchBar} form-control`} 
        type="text" id="search-bar" 
        value={searchValue} 
        onChange={(e) => onChangeSearch(e.target.value)}
        placeholder="Search Bugs"
        />
    );
}

export default SearchBar;