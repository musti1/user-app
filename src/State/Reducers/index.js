import {
    FILTER_USERS,
    SELECT_USER,
    UN_SELECT_USER,
    CACHE_NEXT,
    RECEIVE_USERS,
    REQUEST_USERS,
    INVALIDATE_LIST
} from "../Constants/User";

import {CHANGE_NATIONALITY} from "../Constants/Settings";
import UserSearchService from "../../Services/UserSearchService";

const userSearch = new UserSearchService([]);
const initialState = {
    selectedUser: null,
    filters: {
        searchTerm: ""
    },
    usersList: [],
    filteredList: [],
    paginationInfo: {
        currentPageNo: 0,
        hasMore: () => {
            return true
        }
    },
    cachedNext: null,
    isLoading: false,
    settings: {
        nat: ['CH', 'ES', 'FR', 'GB']
    }
};
const reducer = (state = initialState, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case FILTER_USERS:
            let filteredList = state.usersList;
            const searchTerm = action.payload;
            if (searchTerm !== "") {
                filteredList = userSearch.filterBySearchTerm(searchTerm);
            }
            return {
                ...state,
                filters: {
                    searchTerm: searchTerm
                },
                filteredList
            };
        case SELECT_USER:
            return {
                ...state,
                selectedUser: action.payload
            };
        case UN_SELECT_USER:
            return {
                ...state,
                selectedUser: null
            };
        case REQUEST_USERS:
            return {
                ...state,
                isLoading: true
            };
        case INVALIDATE_LIST:
            return initialState;
        case CACHE_NEXT:
            return {
                ...state,
                cachedNext: action.payload
            };
        case RECEIVE_USERS:
            const oldList = state.usersList;
            const {usersList, paginationInfo} = action.payload;
            const newList = oldList.concat(usersList);
            userSearch.buildIndex(newList);
            let newFiltered = newList;
            if (state.filters.searchTerm !== '') {
                newFiltered = userSearch.filterBySearchTerm(state.filters.searchTerm);
            }
            return {
                ...state,
                usersList: newList,
                paginationInfo,
                filteredList: newFiltered,
                isLoading: false
            };
        case CHANGE_NATIONALITY:
            return {
                ...initialState,
                settings: {
                    nat: action.payload
                }
            };
        default:
            return state;
    }
};

export default reducer;