import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Cart = () => {
  const currentUser = window.localStorage.getItem("email");
  const data = { currentUser };

  const [books, setBooks] = useState([]);

  const config = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/JSON"
    },
    body: JSON.stringify(data)
  };

  useEffect(() => {
    fetch("https://uwwxb.sse.codesandbox.io/user/cart", config)
      .then(response => response.json())
      .then(data => setBooks(data.books))
      .catch(console.error);
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h2>My Cart</h2>
        <br />
        {books.map((book, bookIndex) => {
          const removeBook = async () => {
            try {
              const currentUser = window.localStorage.getItem("email");
              const bookName = book;
              const data = { bookName, currentUser };

              const config = {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/JSON"
                },
                body: JSON.stringify(data)
              };

              const response = await fetch(
                "https://uwwxb.sse.codesandbox.io/user/removeFromCart",
                config
              );
              const result = await response.json();
              if (result.status === "SUCCESS") {
                alert("Successfully removed from cart");
              } else if (result.status === "NOT_IN_CART") {
                alert("Already removed from cart");
              } else {
                alert("Somethig Went Wrong");
              }
            } catch (e) {
              console.error(e);
              alert("Something Went Wrong");
            }
          };

          return (
            <Fragment key={bookIndex}>
              <p>
                {bookIndex + 1}. {book}
                <Button onClick={removeBook} variant="link" size="sm">
                  Remove
                </Button>
              </p>
              <br />
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Cart;
