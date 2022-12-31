import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import style from './SearchBar.module.scss';

const SearchBar = ( { searchValue, onChangeSearch, clearSearch } ) => {
    
    return (
        <div className={style.searchWrapper}>
            {searchValue ? <FaTimesCircle onClick={clearSearch} /> : <FaSearch/>}
            
            <input className={`${style.searchBar} form-control`} 
                type="text" id="search-bar" 
                value={searchValue} 
                onChange={(e) => onChangeSearch(e.target.value)}
                placeholder="Search Bugs"
                autoComplete="off"
            />
        </div>
        
    );
}

export default SearchBar;