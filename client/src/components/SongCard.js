import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("source", event.target.id);
    };
    function handleDragOver(event) {
        event.preventDefault();
    };
    function handleDragEnter(event) {
        event.preventDefault();
    };
    function handleDragLeave(event) {
        event.preventDefault();
    };

    function handleDrop(event) {
        event.preventDefault();
        let targetID = event.target.id;
        targetID = targetID.substring(targetID.indexOf("-") + 1);
        let sourceID = event.dataTransfer.getData("source");
        sourceID = sourceID.substring(sourceID.indexOf("-") + 1);
        store.moveSong(sourceID, targetID);
    };

    function handleEdit(event) {
        store.showEditSongModal(index);
    }

    function handleDelete(event) {
        store.showDeleteSongModal(index);
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            draggable="true"
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDoubleClick={handleEdit}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleDelete}
            />
        </div>
    );
}

export default SongCard;