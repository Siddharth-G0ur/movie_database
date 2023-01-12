import { useCallback, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import * as _ from "radash";
import Column from "./components/Column";
import "react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
import Modal from "react-responsive-modal";
import EditModal from "./components/EditModal";
import CreateModal from "./components/CreateModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const COLUMNS = ["Add", "Educational", "Entertainment", "History"];
const DEFAULT_COLUMN = "educational";

const DEFAULT_DATA_STATE = [
  {
    id: _.uid(6),
    title: "Movie 1",
    description: "Hello world 1",
    link: "",
    column: DEFAULT_COLUMN,
  },

  {
    id: _.uid(6),
    title: "Movie 1",
    content: "Hello world 1",
    column: DEFAULT_COLUMN,
  },
];

const App = ({ card }) => {
  const [data, setData] = useState(card);
  const [videoModal, setVideoModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [cardToBeEdited, setCardToBeEdited] = useState();

  const handleClick = () => {
    setVideoModal(true);
  };
  const handleEdit = (id) => setCardToBeEdited(id);
  const handleClose = () => setEditModal(false);
  const handleShow = () => setEditModal(true);

  const handleCreateClose = () => setCreateModal(false);
  const handleCreateShow = () => setCreateModal(true);

  const handleOnDragEnd = useCallback(
    ({ active, over }) => {
      const elementId = active.id;
      const deepCopy = [...data];

      const updatedState = deepCopy.map((elm) => {
        if (elm.id === elementId) {
          const column = over?.id ? String(over.id) : elm.column;
          return { ...elm, column };
        }
        return elm;
      });

      setData(updatedState);
    },
    [data, setData]
  );

  return (
    <>
      <DndContext onDragEnd={handleOnDragEnd}>
        <MainWrapper>
          {COLUMNS.map((column, columnIndex) => (
            <Column
              key={`column-${columnIndex}`}
              heading={column}
              // elements={_.select(
              //   data,
              //   (elm) => elm,
              //   (f) => f.column === _.camel(column)
              // )}
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
        videoId={"1HpZevFifuo"}
        onClose={() => setVideoModal(false)}
      />
      <EditModal show={editModal} onHide={handleClose} id={cardToBeEdited} />
      <CreateModal show={createModal} onHide={handleCreateClose} />
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
};

const mapStateToProps = (state) => ({
  card: state.card,
});

export default connect(mapStateToProps)(App);
