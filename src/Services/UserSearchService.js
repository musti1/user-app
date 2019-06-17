import * as JsSearch from 'js-search';

class UserSearchService {

    constructor(userList) {
        this.buildIndex(userList);
    }

    buildIndex(userList) {
        const dataToSearch = new JsSearch.Search("isbn");
        dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy();
        dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
        dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("isbn");
        dataToSearch.addIndex("fullName");
        dataToSearch.addDocuments(userList);
        this.jsSearch = dataToSearch;
    }

    filterBySearchTerm(searchTerm) {
        return this.jsSearch.search(searchTerm);
    }

}

export default UserSearchService;