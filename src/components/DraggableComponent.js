import React, { useMemo, useState, useRef } from "react";
import { styled } from "@stitches/react";
import { Draggable } from "../primitives";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";

export const DraggableComponent = ({
  identifier,
  content,
  title,
  handleClick,
}) => {
  const itemIdentifier = useMemo(() => identifier, [identifier]);
  const ref = useRef(null); //ADD THIS

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Draggable id={itemIdentifier} ref={ref}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{content}</Card.Text>
          </Card.Body>
        </Draggable>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outline-primary" size="lg">
            Edit
          </Button>
          <Button variant="outline-primary" size="lg" onClick={handleClick}>
            Play
          </Button>

          <Button variant="outline-primary" size="lg">
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

const ElementWrapper = styled("div", {
  background: "#f6f6f6",
  borderRadius: 10,
  height: 120,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 12,
});

const ElementText = styled("h3", {
  fontSize: 18,
  fontWeight: 600,
});
