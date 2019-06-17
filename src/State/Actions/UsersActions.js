import UserService from '../../Services/UserService';
import {
    FILTER_USERS,
    SELECT_USER,
    UN_SELECT_USER,
    CACHE_NEXT,
    RECEIVE_USERS,
    REQUEST_USERS,
    INVALIDATE_LIST
} from '../Constants/User';

export const filterUsers = (searchTerm) => {
    return {
        type: FILTER_USERS,
        payload: searchTerm
    };
};

export const selectUser = (user) => {
    return {
        type: SELECT_USER,
        payload: user
    };
};

export const unSelectUser = () => {
    return {
        type: UN_SELECT_USER,
    };
};

export const cacheNext = (nextDataSet) => {
    return {
        type: CACHE_NEXT,
        payload: nextDataSet
    };
};


export const invalidateList = () => {
    return {
        type: INVALIDATE_LIST,
    };
};

export const receiveUsers = (userDataSet) => {
    return {
        type: RECEIVE_USERS,
        payload: userDataSet
    }
};

export const requestUsers = () => {
    return {
        type: REQUEST_USERS
    }
};

export const loadMore = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const {paginationInfo, settings} = state;
            dispatch(requestUsers());
            const userDataSet = await getNextPageData(state);
            dispatch(receiveUsers(userDataSet));
            const nextDataSet = await UserService.getUsersData(
                paginationInfo.currentPageNo + 2,
                settings.nat
            );
            dispatch(cacheNext(nextDataSet));

        } catch (e) {
            dispatch(invalidateList());
        }
    };
};

const getNextPageData = async (state) => {
    const {paginationInfo, settings, cachedNext} = state;
    if (cachedNext === null) {
        return await UserService.getUsersData(
            paginationInfo.currentPageNo + 1,
            settings.nat
        );
    } else {
        return cachedNext;
    }
};
