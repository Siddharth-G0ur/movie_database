import React, { useMemo, useState, useRef } from "react";
import { styled } from "@stitches/react";
import { Draggable } from "../primitives";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-modal-video/scss/modal-video.scss";

export const DraggableComponent = ({
  identifier,
  content,
  title,
  handleClick,
  handleShow,
}) => {
  const itemIdentifier = useMemo(() => identifier, [identifier]);
  const ref = useRef(null); //ADD THIS

  return (
    <Card style={{ width: "18rem", marginBottom: "10px" }}>
      <Draggable id={itemIdentifier} ref={ref}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Draggable>
      <ElementWrapper>
        <Button variant="outline-secondary" onClick={handleShow}>
          Edit
        </Button>
        <Button
          size="lg"
          onClick={handleClick}
          style={{ background: "#5800FF" }}
        >
          Play
        </Button>

        <Button variant="outline-danger" size="lg">
          Delete
        </Button>
      </ElementWrapper>
    </Card>
  );
};

const ElementWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  margin: "10px",
});

const ElementText = styled("h3", {
  fontSize: 18,
  fontWeight: 600,
});
