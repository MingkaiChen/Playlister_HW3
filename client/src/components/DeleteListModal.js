import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal(props) {
    const { store } = useContext(GlobalStoreContext);
    return (
        <div
            class={"modal" + (store.markListForDeletion ? " is-visible" : "")}
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
            <div class="modal-root" id='verify-delete-list-root'>
                <div class="modal-north">
                    Delete playlist?
                </div>
                <div class="modal-center">
                    <div class="modal-center-content">
                        Are you sure you wish to permanently delete the <b>{store.markListForDeletion ? store.markListForDeletion.name : ""}</b> playlist?
                    </div>
                </div>
                <div class="modal-south">
                    <input type="button"
                        id="delete-list-confirm-button"
                        class="modal-button"
                        onClick={store.deleteMarkedList}
                        value='Confirm' />
                    <input type="button"
                        id="delete-list-cancel-button"
                        class="modal-button"
                        onClick={store.unmarkListForDeletion}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default DeleteListModal;