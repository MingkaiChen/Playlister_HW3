import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteSongModal(props) {
    const { store } = useContext(GlobalStoreContext);

    function handleDelete() {
        store.deleteSong();
        store.unmarkSongForDeletion();
    }

    function handleCancel() {
        store.unmarkSongForDeletion();
    }

    return (
        <div class={"modal" + (store.markSongForDeletion ? " is-visible" : "")}
            id="remove-song-modal" data-animation="slideInOutLeft">
            <div class="modal-root" id='verify-remove-song-root'>
                <div class="modal-north">
                    Remove song?
                </div>
                <div class="modal-center">
                    <div class="modal-center-content">
                        Are you sure you wish to permanently remove the <b id="remove-song-span"></b> from the playlist?
                    </div>
                </div>
                <div class="modal-south">
                    <input type="button" id="remove-song-confirm-button" class="modal-button" value='Confirm' onClick={handleDelete} />
                    <input type="button" id="remove-song-cancel-button" class="modal-button" value='Cancel' onClick={handleCancel} />
                </div>
            </div>
        </div>
    );
}

export default DeleteSongModal;