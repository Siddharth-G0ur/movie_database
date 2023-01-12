import { useMemo } from "react";
import { styled } from "@stitches/react";
import * as _ from "radash";
import PropTypes from "prop-types";
import { Droppable } from "../primitives";
import { DraggableComponent } from "./DraggableComponent";
import { connect } from "react-redux";

const Column = ({
  heading,
  //   elements,
  handleClick,
  handleShow,
  handleCreateShow,
  handleEdit,
  card,
}) => {
  const columnIdentifier = useMemo(() => _.camel(heading), [heading]);

  const amounts = useMemo(
    () => card.filter((elm) => elm.column === columnIdentifier).length,
    [card, columnIdentifier]
  );

  return (
    <ColumnWrapper>
      <ColumnHeaderWrapper variant="headerColor">
        <Heading>{heading}</Heading>
        <ColumnItems>
          <ColumnTasksAmout>{amounts}</ColumnTasksAmout>
          <ColumnTasksAmout onClick={handleCreateShow}>+</ColumnTasksAmout>
        </ColumnItems>
      </ColumnHeaderWrapper>
      <Droppable id={columnIdentifier}>
        {card
          .filter((elm) => elm.column === columnIdentifier)
          .map((elm, elmIndex) => (
            <DraggableComponent
              key={`draggable-element-${elmIndex}-${columnIdentifier}`}
              title={elm.title}
              identifier={elm.id}
              content={elm.content}
              handleClick={handleClick}
              handleShow={handleShow}
              id={elm.id}
              handleEdit={handleEdit}
            />
          ))}
        <DropPlaceholder />
      </Droppable>
    </ColumnWrapper>
  );
};

const Heading = styled("h3", {
  color: "#FFF",
});

const ColumnWrapper = styled("div", {
  width: 320,
  padding: 10,
  borderWidth: 2,
  borderRadius: 10,
  backgroundColor: "#CBC3E3",
});

const DropPlaceholder = styled("div", {
  height: 35,
  backgroundColor: "transparent",
  marginTop: 15,
});

const ColumnHeaderWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  variants: {
    variant: {
      headerColor: {
        background: "#5800FF",
      },
    },
  },
  padding: "0px 10px 0px 10px",
  borderRadius: 10,
  marginBottom: "10px",
});

const ColumnItems = styled("span", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const ColumnTasksAmout = styled("span", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 30,
  height: 30,
  borderRadius: 6,
  color: "#FFF",
  background: "rgba( 255, 255, 255, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 255, 255, 255, 0.18 )",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
  margin: "0px 5px 0px 5px",
});

Column.propTypes = {
  card: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  card: state.card,
});

export default connect(mapStateToProps)(Column);
