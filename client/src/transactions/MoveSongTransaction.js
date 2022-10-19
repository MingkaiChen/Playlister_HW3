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

class MoveSongTransaction extends jsTPS_Transaction {
    constructor(store, source, target) {
        super();
        this.store = store;
        this.source = source;
        this.target = target;
    }

    doTransaction() {
        this.store.moveSongCaller(this.source, this.target);
    }
    
    undoTransaction() {
        this.store.moveSongCaller(this.target, this.source);
    }
}

export default MoveSongTransaction;