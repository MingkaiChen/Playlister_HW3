import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import { AddSongTransaction, MoveSongTransaction } from '../transactions'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    DELETE_MARKED_LIST: "DELETE_MARKED_LIST",
    CREATE_NEW_SONG: "CREATE_NEW_SONG",
    MARK_SONG_FOR_EDITING: "MARK_SONG_FOR_EDITING",
    UNMARK_SONG_FOR_EDITING: "UNMARK_SONG_FOR_EDITING",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    UNMARK_SONG_FOR_DELETION: "UNMARK_SONG_FOR_DELETION",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markListForDeletion: null,
        markSongForEditing: null,
        markSongForDeletion: null,
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: payload,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            // CANCEL DELETING A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            // DELETE A LIST
            case GlobalStoreActionType.DELETE_MARKED_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            // CREATE A NEW SONG
            case GlobalStoreActionType.CREATE_NEW_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            // MARK A SONG FOR EDITING
            case GlobalStoreActionType.MARK_SONG_FOR_EDITING: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: payload,
                    markSongForDeletion: null,
                });
            }
            // UNMARK A SONG FOR EDITING
            case GlobalStoreActionType.UNMARK_SONG_FOR_EDITING: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            // MARK A SONG FOR DELETION
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: payload,
                });
            }
            // UNMARK A SONG FOR DELETION
            case GlobalStoreActionType.UNMARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListForDeletion: null,
                    markSongForEditing: null,
                    markSongForDeletion: null,
                });
            }
            default:
                return store;
        }
    }

    store.undo = function () {
        if (tps.hasTransactionToUndo()) {
            tps.undoTransaction();
        }
    }

    store.redo = function () {
        if (tps.hasTransactionToRedo()) {
            tps.doTransaction();
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                if (playlist.name !== newName) {
                    console.log(playlist.name + " " + newName);
                    playlist.name = newName;
                    updateList(playlist);
                }
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function () {
        return store.currentList.songs.length;
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.createNewList = function () {
        async function asyncCreateNewList() {
            let response = await api.createPlaylist({
                name: "Untitled" + (store.newListCounter === 0 ? "" : store.newListCounter),
                songs: []
            });
            if (response.data.success) {
                let playlist = response.data.playlist;
                let newResponse = await api.getPlaylistPairs();
                if (response.data.success) {
                    let pairsArray = newResponse.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_LIST,
                        payload: {
                            idNamePairs: pairsArray,
                            playlist: playlist
                        }
                    });
                    document.getElementById("edit-list-" + pairsArray[pairsArray.length - 1]._id).click();
                }
                else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            else {
                console.log("API FAILED TO CREATE NEW LIST");
            }
        }
        asyncCreateNewList();
    }

    store.showDeleteListModal = function (id) {
        let markedList = store.idNamePairs.filter(list => (list._id === id))[0];
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: markedList
        });
    }

    store.deleteMarkedList = function () {
        async function asyncDeleteMarkedList() {
            console.log(store.markListForDeletion._id);
            let response = await api.deletePlaylistById(store.markListForDeletion._id);
            if (response.data.success) {
                let newResponse = await api.getPlaylistPairs();
                if (newResponse.data.success) {
                    let pairsArray = newResponse.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.DELETE_MARKED_LIST,
                        payload: pairsArray
                    });
                }
            }
        }
        asyncDeleteMarkedList();
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    store.createNewSong = function () {
        async function asyncCreateNewSong() {
            let response = await api.createSong(store.currentList._id, {
                title: "Untitled",
                artist: "Unknown",
                youTubeId: "dQw4w9WgXcQ"
            });
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_SONG,
                    payload: playlist
                });
            }
            else {
                console.log("API FAILED TO CREATE NEW SONG");
            }
        }
        if (store.currentList) {
            asyncCreateNewSong();
        }
    }

    store.addSong = function () {
        tps.addTransaction(new AddSongTransaction(store));
    }

    store.moveSong = function (sourceID, targetID) {
        let sourceIndex = parseInt(sourceID);
        let targetIndex = parseInt(targetID);
        if (sourceIndex !== targetIndex) {
            tps.addTransaction(new MoveSongTransaction(store, sourceIndex, targetIndex));
        }
    }

    store.moveSongCaller = function (sourceIndex, targetIndex) {
        async function asyncMoveSong() {
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
            else {
                console.log("API FAILED TO MOVE SONG");
            }
        }
        let sourceSong = store.currentList.songs[sourceIndex];
        store.currentList.songs.splice(sourceIndex, 1);
        store.currentList.songs.splice(targetIndex, 0, sourceSong);
        asyncMoveSong();
    }

    store.showEditSongModal = function (index) {
        let markedSong = store.currentList.songs[index];
        document.getElementById("edit-song-modal-title-textfield").value = markedSong.title;
        document.getElementById("edit-song-modal-artist-textfield").value = markedSong.artist;
        document.getElementById("edit-song-modal-youTubeId-textfield").value = markedSong.youTubeId;
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDITING,
            payload: markedSong
        });
    }

    store.unmarkSongForEditing = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_SONG_FOR_EDITING,
        });
    }

    store.editSong = function (newName, newArtist, newYouTubeId) {
        async function asyncEditSong() {
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
            else {
                console.log("API FAILED TO EDIT SONG");
            }
        }
        if (newName !== "" && store.markSongForEditing.title !== newName) {
            store.markSongForEditing.title = newName;
        }
        if (newArtist !== "" && store.markSongForEditing.artist !== newArtist) {
            store.markSongForEditing.artist = newArtist;
        }
        if (newYouTubeId !== "" && store.markSongForEditing.youTubeId !== newYouTubeId) {
            store.markSongForEditing.youTubeId = newYouTubeId;
        }
        asyncEditSong();
    }

    store.showDeleteSongModal = function (index) {
        let markedSong = store.currentList.songs[index];
        document.getElementById("remove-song-span").innerHTML = markedSong.title;
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: markedSong
        });
    }

    store.deleteSong = function () {
        async function asyncDeleteSong() {
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
            else {
                console.log("API FAILED TO DELETE SONG");
            }
        }
        store.currentList.songs = store.currentList.songs.filter(song => (song !== store.markSongForDeletion));
        asyncDeleteSong();
    }

    store.unmarkSongForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_SONG_FOR_DELETION,
        });
    }

    store.deleteSongByIndex = function (index) {
        async function asyncDeleteSong() {
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
            else {
                console.log("API FAILED TO DELETE SONG");
            }
        }
        asyncDeleteSong();
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}