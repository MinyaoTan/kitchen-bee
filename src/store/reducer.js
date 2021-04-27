import * as actionType from '../store/actionType';

const pageItems = 5;
const initialState = {
    searchResult: [],
    searchTarget: '',
    boundaries: [0, pageItems],
    recipes: [],
    page: 1,
    disableNext: false,
    images: []
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CHANGE_SEARCH_TARGET:
            return {
                ...initialState,
                searchTarget: action.target
            };
        case actionType.CHANGE_BOUNDARIES:
            let val = pageItems;
            if (action.value === 0) {
                val = -1 * pageItems;
            }
            return {
                ...state,
                boundaries: [state.boundaries[0] + val, state.boundaries[1] + val]
            };
        case actionType.UPDATE_RECIPES:
            return {
                ...state,
                recipes: action.recipes
            };
        case actionType.UPDATE_PAGE:
            return {
                ...state,
                page: state.page + action.value
            };
        case actionType.DISABLE_NEXT:
            return {
                ...state,
                disableNext: action.disable
            };
        case actionType.POPULATE_RESULT:
            return {
                ...state,
                searchResult: action.result
            };
        case actionType.RESET_STATE:
            return {
                ...initialState
            }
        default:
            return state;
    }
};

export default reducer;