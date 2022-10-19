import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function EditSongModal(props) {
    const { store } = useContext(GlobalStoreContext);
    let newName = "";
    let newArtist = "";
    let newYouTubeId = "";
    let handleChangeTitle = (event) => {
        newName = event.target.value;
    };
    let handleChangeArtist = (event) => {
        newArtist = event.target.value;
    };
    let handleChangeYouTubeId = (event) => {
        newYouTubeId = event.target.value;
    };
    let handleCancel = () => {
        store.unmarkSongForEditing();
    };
    let handleConfirm = () => {
        store.editSong(newName, newArtist, newYouTubeId);
        store.unmarkSongForEditing();
    };
    return (
        <div
            class={"modal" + (store.markSongForEditing ? " is-visible" : "")}
            id="edit-song-modal"
            data-animation="slideInOutLeft">
            <div class="modal-root" id='verify-edit-song-root'>
                <div class="modal-north">
                    Edit Song
                </div>
                <div class="modal-center">
                    <div class="modal-center-content" id="edit-song-info-div">

                        <span id="title-prompt">Title:</span>
                        <input onChange={handleChangeTitle} id="edit-song-modal-title-textfield"></input>

                        <span id="artist-prompt">Artist:</span>
                        <input onChange={handleChangeArtist} id="edit-song-modal-artist-textfield"></input>

                        <span id="you-tube-id-prompt">YouTubeId:</span>
                        <input onChange={handleChangeYouTubeId} id="edit-song-modal-youTubeId-textfield"></input>


                    </div>
                </div>
                <div class="modal-south">
                    <input type="button"
                        id="edit-song-confirm-button"
                        class="modal-button"
                        onClick={handleConfirm}
                        value='Confirm' />
                    <input type="button"
                        id="edit-song-cancel-button"
                        class="modal-button"
                        onClick={handleCancel}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default EditSongModal;