const INITIAL_STATE = {
    projects: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_PROJECTS_PENDING':
            return{...state, error:null, fetching:true, fetched:false}
        case 'GET_PROJECTS_FULFILLED':
            return{...state, projects:action.payload, fetching:false, fetched:true}
        case 'GET_PROJECTS_REJECTED':
            return{...state, error:action.payload, fetching:false, fetched:false}
        default:
            return state
    }
}