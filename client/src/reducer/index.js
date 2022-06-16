const initialState= {
    videogames: [],
    genres: [],
    details: {},
    allVideogames: [],
    createVideo: [],
    filters: []
}


export default function rootReducer(state= initialState, action){
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };
        case "GET_VIDEOGAME_BY_NAME":
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };
        case "GET_VIDEOGAME_BY_ID":
            return{
                ...state,
                details: action.payload
            };
        case "GET_GENRES":
            return{
                ...state,
                genres: action.payload
            }
        case "FILTER_BY_GENRE":
            const allVideogames = state.allVideogames;
            const array = [];
            const genresFiltered = action.payload === "All" ? allVideogames
            : (() => {for(let i = 0; i < allVideogames.length; i++){
                if(isNaN(allVideogames[i].id)){
                    if(allVideogames[i].genres.map(e => e.name).includes(action.payload)){
                    array.push(allVideogames[i])}
                }
                if(allVideogames[i].genres.includes(action.payload)){
                    array.push(allVideogames[i])
            }}return array})()
            return{
                ...state,
                videogames: genresFiltered,
                filters: genresFiltered
            }
        case "ORDER_BY_NAME":
        let allVid = [...state.videogames]
        allVid = allVid.sort((a,b) =>{
            if(a.name.toLowerCase() < b.name.toLowerCase()) {
            return action.payload === 'Asc' ? -1 : 1
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()) {
            return action.payload === 'Desc' ? -1 : 1
            }else{
            return 0}
        })
        return {
            ...state,
            videogames: action.payload === 'All' ? state.allVideogames : allVid
        }
        case "ORDER_BY_RATING":
            const all = [...state.videogames]
            const filterByRating = all.sort((a,b) => {
                if(a.rating < b.rating){
                    return action.payload === 'Asc' ? 1 : -1
                }
                if(a.rating > b.rating){
                    return action.payload === 'Desc' ? 1 : -1
                }return 0
            })
            return{
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : filterByRating
            }
        case "ORDER_BY_CREATION":
            let filter;
            if(state.filters.length === 0){
                let allVids = [...state.allVideogames];
                filter = action.payload === 'api' ? allVids.filter(e => e.created === false) : allVids.filter(e => e.created === true)
                return{
                    ...state,
                    videogames: action.payload === 'all' ? allVids : filter
                }
            }else if(state.filters.length > 0){
                let allVids = [...state.filters];
                filter = action.payload === 'api' ? allVids.filter(e => e.created === false) : allVids.filter(e => e.created === true)
                return{
                    ...state,
                    videogames: action.payload === 'all' ? allVids : filter
                }
            }return
        case "POST_VIDEOGAME":
            return {
                ...state
            }
        case "DELETE_VIDEOGAME":
            return {
                ...state,
                videogames: state.videogames.filter(e => e.id !== action.payload),
                allVideogames: state.allVideogames.filter(e => e.id !== action.payload)
            }
        case "CLEAR_STATE":
            return {
                ...state,
                details: action.payload,
            }
        default:
            return state;
    }
}
