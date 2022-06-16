import axios  from 'axios';

export function getVideogames(){
    return async function(dispatch){
        try{
            let json = await axios.get('/videogames');
            return dispatch({
                type: "GET_VIDEOGAMES",
                payload: json.data
            })
        }catch(e){
            console.log(e)
        }
    }
};

// export function getVideogames(){
//     return function(dispatch) {
//         return axios.get('http://localhost:3001/videogames')
//         .then(function(response){
//             return dispatch({
//                 type: "GET_VIDEOGAMES",
//                 payload: response.data
//             })
//         }
//         )
//         .catch(function(error){
//             console.log(error)
//         },
//         console.log('Ahí me ejecuté')
//         )
//     }
// }

export function getVideogameByName(name){
    return async function(dispatch){
        try {
            let json = await axios.get(`/videogames?name=${name}`);
            return dispatch({
                type: "GET_VIDEOGAME_BY_NAME",
                payload: json.data
            })
        } catch (e) {
            alert('Videogame not found')
            console.log(e)
        }
    }
}

export function getVideogameById(id){
    return async function(dispatch){
        try {
            let json = await axios.get(`/videogames/${id}`);
            return dispatch({
                type: "GET_VIDEOGAME_BY_ID",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
};

export function getGenres(){
    return async function(dispatch){
        try {
            let json = await axios.get('/genres');
            return dispatch({
                type: "GET_GENRES",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function filterVideogamesByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function orderByName(payload) {
    //console.log(payload)
    return {
    type: "ORDER_BY_NAME",
    payload
    }
}

export function orderByRating(payload){
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}

export function orderByCreation(payload){
    return {
        type: "ORDER_BY_CREATION",
        payload
    }
}

export function postVideogame(game){
    return async function(dispatch){
        const created= await axios.post(`/videogames`, game)
        //console.log(game)
        return created;
    }
}

export function deleteGame(id){
    return async function(dispatch){
        await axios.delete(`/videogames/${id}`)
        dispatch({
            type: "DELETE_VIDEOGAME",
            payload: id
        })
    }
}

export function clearState(){
    return {
        type: "CLEAR_STATE",
        payload: {}
    }
}
