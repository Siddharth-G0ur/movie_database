import { useCallback, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import * as _ from "radash";
import Column from "./components/Column";
import "react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
import EditModal from "./components/EditModal";
import CreateModal from "./components/CreateModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { columnUpdate } from "./actions/card";
import getVideoId from "get-video-id";
import { moveToHistory } from "./actions/card";

const COLUMNS = ["Add", "Educational", "Entertainment", "History"];
const DEFAULT_COLUMN = "educational";

const App = ({ card, columnUpdate, moveToHistory }) => {
  const [videoModal, setVideoModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [cardToBeEdited, setCardToBeEdited] = useState();
  const [heading, setHeading] = useState();
  const [videoUrl, setVideoUrl] = useState();

  const handleClick = (idd) => {
    const reqCard = card.filter((card) => card.id === idd);
    const url = reqCard[0].link;
    const { id } = getVideoId(url);
    setVideoUrl(id);
    setVideoModal(true);
    moveToHistory(idd);
  };
  const handleEdit = (id) => setCardToBeEdited(id);
  const handleClose = () => setEditModal(false);
  const handleShow = () => setEditModal(true);

  const handleCreateClose = () => setCreateModal(false);
  const handleCreateShow = (head) => {
    setHeading(head);
    setCreateModal(true);
  };

  const handleOnDragEnd = ({ active, over }) => {
    const elementId = active.id;

    card.map((elm) => {
      if (elm.id === elementId) {
        const column = over?.id ? String(over.id) : elm.column;
        console.log(column);
        columnUpdate(elementId, column);
      }
    });
  };

  return (
    <>
      <DndContext onDragEnd={handleOnDragEnd}>
        <MainWrapper>
          {COLUMNS.map((column, columnIndex) => (
            <Column
              key={`column-${columnIndex}`}
              heading={column}
              handleClick={handleClick}
              handleShow={handleShow}
              handleCreateShow={handleCreateShow}
              handleEdit={handleEdit}
            />
          ))}
        </MainWrapper>
      </DndContext>
      <ModalVideo
        channel="youtube"
        isOpen={videoModal}
        videoId={videoUrl}
        onClose={() => setVideoModal(false)}
      />
      <EditModal show={editModal} onHide={handleClose} id={cardToBeEdited} />
      <CreateModal
        show={createModal}
        onHide={handleCreateClose}
        headingName={heading}
      />
    </>
  );
};

const MainWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  backgroundColor: "#fff",
  paddingTop: 40,
  paddingBottom: 40,
  height: "90vh",
});

App.propTypes = {
  card: PropTypes.array.isRequired,
  columnUpdate: PropTypes.func.isRequired,
  moveToHistory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  card: state.card,
});

export default connect(mapStateToProps, { columnUpdate, moveToHistory })(App);
