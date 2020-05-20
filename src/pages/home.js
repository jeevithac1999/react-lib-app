import React, { useState, useEffect, Fragment } from "react";
import Book from "../components/books";
import { Container, Row, Col, Button } from "react-bootstrap";
import useUserProvider from "../store/UserProvider/useUserProvider";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://uwwxb.sse.codesandbox.io/books")
      .then(response => response.json())
      .then(data => {
        setBooks(data.books);
      })
      .catch(console.error);
  }, []);

  const { isUserLoggedIn } = useUserProvider();

  return (
    <Fragment>
      <br />
      <h2 align="center">Books List</h2>
      {books.map((book, bookIndex) => {
        const addToCart = async () => {
          try {
            if (isUserLoggedIn) {
              const currentUser = window.localStorage.getItem("email");
              const id = book._id;
              const data = { id, currentUser };
              const config = {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/JSON"
                },
                body: JSON.stringify(data)
              };

              const response = await fetch(
                "https://uwwxb.sse.codesandbox.io/user/addToCart",
                config
              );
              const result = await response.json();
              if (result.status === "SUCCESS") {
                alert("Book Added to Cart");
                // window.location.reload();
              } else if (result.status === "FAIL") {
                alert("Book Not Available");
              } else if (result.status === "IN_CART") {
                alert("Already in Cart");
              } else {
                console.error();
                alert("Something Went Wrong");
              }
            } else {
              alert("Login to Add Books to Cart");
            }
          } catch (e) {
            console.error(e);
            alert("Something Went Wrong");
          }
        };

        return (
          <Fragment key={bookIndex}>
            <div>
              <Container>
                <center>
                  <br/>
                  <Book
                    title={book.title}
                    author={book.author}
                    copies={book.copies}
                    description={book.description}
                    ISBN={book.ISBN}
                  />
                </center>
                <center>
                  <Button onClick={addToCart} variant="dark" size="sm">
                    ADD TO CART
                  </Button>
                </center>
                <br />
              </Container>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Home;
