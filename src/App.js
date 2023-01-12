import { useCallback, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import * as _ from "radash";

import { Column } from "./components";
import "react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";

const COLUMNS = ["Videos", "Educational", "Entertainment", "History"];
const DEFAULT_COLUMN = "videos";

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
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    console.log("Hello");
    setModal(true);
  };

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
              elements={_.select(
                data,
                (elm) => elm,
                (f) => f.column === _.camel(column)
              )}
              handleClick={handleClick}
            />
          ))}
        </MainWrapper>
      </DndContext>
      <ModalVideo
        channel="youtube"
        isOpen={modal}
        videoId={"1HpZevFifuo"}
        onClose={() => setModal(false)}
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

export default App;
