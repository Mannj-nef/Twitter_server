import handleSearch from './search';

class SearchServices {
  search = handleSearch;
}

const searchServices = new SearchServices();
export default searchServices;
