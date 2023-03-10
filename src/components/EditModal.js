import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { editCard, getCardData } from "../actions/card";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const EditModal = ({ show, onHide, editCard, id }) => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
  });
  const { title, link, description } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.id = id;
    editCard(formData);
    onHide();
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={link}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

EditModal.prototype = {
  editCard: PropTypes.func.isRequired,
};

export default connect(null, { editCard })(EditModal);
