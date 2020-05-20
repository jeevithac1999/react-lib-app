import React, { useEffect, useState, Fragment } from "react";
import { Button } from "react-bootstrap";

const userProfile = () => {
  const currentUser = window.localStorage.getItem("email");
  const data = { currentUser };

  const [user, setUser] = useState({});
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
    fetch("https://uwwxb.sse.codesandbox.io/user/profile", config)
      .then(response => response.json())
      .then(result => {
        setUser(result.user);
        setBooks(result.user.booksBorrowed);
      })
      .catch(console.error);
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h2>Profile Page</h2>
        <br />
        <p>
          <b>Name : </b> {user.firstName} {user.lastName}
        </p>
        <p>
          <b>Email : </b> {user.email}
        </p>
        <p>
          <b>Books Borrowed </b>
        </p>
        {books.map((book, bookIndex) => {

          const returnBook = async () => {
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
                "https://uwwxb.sse.codesandbox.io/user/returnBooks",
                config
              );
              const result = await response.json();
              if (result.status === "SUCCESS") {
                alert("Successfully returned");
              } else if(result.status === "NOT_IN_CART") {
                alert("Already returned to Library")
              }
              else {
                alert("Somethig Went Wrong");
              }
            } catch (e) {
              console.error(e);
              alert("Something Went Wrong");
            }
          };

          return (
            <Fragment key={bookIndex}>
              <ol>
              <li>
                {book}
                <Button onClick={returnBook} variant="link" size="sm">
                  Return
                </Button>
              </li>
              </ol>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default userProfile;
