import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useUserProvider from "../store/UserProvider/useUserProvider";

const Checkout = () => {
  const { isUserLoggedIn } = useUserProvider();

  const borrowBooks = async () => {
    try {
      if (isUserLoggedIn) {
        const currentUser = window.localStorage.getItem("email");
        const data = { currentUser };
        const config = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/JSON"
          },
          body: JSON.stringify(data)
        };

        const response = await fetch(
          "https://uwwxb.sse.codesandbox.io/user/borrowBooks",
          config
        );
        const result = await response.json();
        if (result.status === "SUCCESS") {
          alert("Books Successfully Borrowed");
        } else {
          console.error();
          alert("Something Went Wrong");
        }
      }
    } catch (e) {
      console.error(e);
      alert("Something Went Wrong");
    }
  };

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
        <h2>Confirm Your Books</h2>
        <br />
        {books.map((book, bookIndex) => {
          return (
            <Fragment key={bookIndex}>
              <p>
                {bookIndex + 1}. {book}
              </p>
              <br />
            </Fragment>
          );
        })}
        <Button onClick={borrowBooks} variant="dark" size="sm">
          Confirm & Borrow
        </Button>
      </div>
    </Fragment>
  );
};

export default Checkout;
