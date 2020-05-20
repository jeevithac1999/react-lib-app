import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
const Book = ({ title, author, description, copies, ISBN }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Title :{title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Author: {author}</ListGroupItem>
        <ListGroupItem>No of copies:{copies}</ListGroupItem>
        <ListGroupItem>ISBN : {ISBN}</ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default Book;