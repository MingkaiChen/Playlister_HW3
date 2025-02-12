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

class AddSongTransaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
    }

    doTransaction() {
        this.store.createNewSong();
    }
    
    undoTransaction() {
        this.store.deleteSongByIndex(this.store.currentList.songs.length - 1);
    }
}

export default AddSongTransaction;