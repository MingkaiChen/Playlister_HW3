import jsTPS_Transaction from "../common/jsTPS.js"

import { store } from '../store'
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that add song.
 * It will be managed by the transaction stack.
 * 
 * @author Mingkai Chen
 */

class EditSongTransaction extends jsTPS_Transaction {
    constructor(store, song, newName, newArtist, newYouTubeId) {
        super();
        this.store = store;
        this.songIndex = this.store.currentList.songs.indexOf(song);
        this.originalName = song.name;
        this.originalArtist = song.artist;
        this.originalYouTubeId = song.youtubeId;
        this.newName = newName;
        this.newArtist = newArtist;
        this.newYouTubeId = newYouTubeId;
    }

    doTransaction() {
        this.store.editSongCaller(this.songIndex, this.newName, this.newArtist, this.newYouTubeId);
        this.store.unmarkSongForEditing();
    }
    
    undoTransaction() {
        this.store.editSongCaller(this.songIndex, this.originalName, this.originalArtist, this.originalYouTubeId);
        this.store.unmarkSongForEditing();
    }
}

export default EditSongTransaction;