import { useCallback, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import * as _ from "radash";
import { Column } from "./components";
import "react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
import Modal from "react-responsive-modal";
import EditModal from "./components/EditModal";
import store from "./store";
import { Provider } from "react-redux";

const COLUMNS = ["Add", "Educational", "Entertainment", "History"];
const DEFAULT_COLUMN = "educational";

const DEFAULT_DATA_STATE = [
  {
    id: _.uid(6),
    title: "Movie 1",
    content: "Hello world 1",
    column: DEFAULT_COLUMN,
  },

  {
    id: _.uid(6),
    title: "Movie 1",
    content: "Hello world 1",
    column: DEFAULT_COLUMN,
  },
];

const App = () => {
  const [data, setData] = useState(DEFAULT_DATA_STATE);
  const [videoModal, setVideoModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleClick = () => {
    setVideoModal(true);
  };

  const handleClose = () => setEditModal(false);
  const handleShow = () => setEditModal(true);

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
      <Provider store={store}>
        <DndContext onDragEnd={handleOnDragEnd}>
          <MainWrapper>
            {COLUMNS.map((column, columnIndex) => (
              <Column
                key={`column-${columnIndex}`}
                heading={column}
                elements={_.select(
                  data,
                  (elm) => elm,
                  (f) => f.column === _.camel(column)
                )}
                handleClick={handleClick}
                handleShow={handleShow}
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
        <EditModal show={editModal} onHide={handleClose} />
      </Provider>
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

export default App;
