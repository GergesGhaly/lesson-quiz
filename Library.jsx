import React, { useRef, useState } from "react";
import shelf from "./src/assets/shelf.png";
import { useNavigate } from "react-router-dom";
import booksAndQaData from "./src/data/booskAndQaData"; // ✅ التعديل هنا
import ShelfComponent from "./src/components/ShelfComponent";
import BookComponent from "./src/components/BookComponent";
import libararyWall from "./src/assets/libararyWall.jpg";
import BackBtn from "./src/components/BackBtn";

const Library = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(booksAndQaData); // ✅ التعديل هنا

  const bookRef = useRef();

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = booksAndQaData.filter((book) =>
      book.title.toLowerCase().includes(query)
    ); // ✅ التعديل هنا
    setFilteredBooks(filtered);
  };

  const shelfWidth = 370;
  const bookHeight = 100;
  const bookWidth = 60;
  const booksPerShelf = 4;

  const handleBookClick = (book) => {
    navigate(`/book/${book.id}`); // ✅ عند الضغط على الكتاب ننتقل لصفحته
  };

  return (
    <div
      style={{
        position: "relative",
        flexDirection: "column",
        height: "100dvh",
        transition: "all ease 0.3s",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        padding: "20px 10px ",
        backgroundColor: "#000",
        overflowY: "auto",
      }}
    >
      {/* زر الرجوع */}
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <BackBtn />
      </div>

      {/* مربع البحث */}
      <div>
        <input
          type="text"
          placeholder="Search in books"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            margin: "20px",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "transparent",
            border: "none",
            borderBottom: `1px solid #000000`,
            outline: "none",
            color: "#000000",
            fontFamily: "burelom",
            fontWeight: "500",
          }}
        />
        <style>
          {`
            input[type="text"]::placeholder {
              color: #000000;
            }
          `}
        </style>
      </div>

      {/* عرض الرفوف والكتب */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          left: "0",
          maxHeight: "70vh",
          overflowY: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {Array.from(
          { length: Math.ceil(filteredBooks.length / booksPerShelf) },
          (_, shelfIndex) => (
            <div key={shelfIndex}>
              <div
                className="books-gallery"
                style={{
                  width: shelfWidth,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  gap: "17px",
                  marginBottom: "-25px",
                }}
              >
                {filteredBooks
                  .slice(
                    shelfIndex * booksPerShelf,
                    (shelfIndex + 1) * booksPerShelf
                  )
                  .map((book) => (
                    <BookComponent
                      key={book.id}
                      book={book}
                      handleBookClick={handleBookClick}
                      bookWidth={bookWidth}
                      bookHeight={bookHeight}
                    />
                  ))}
              </div>

              <ShelfComponent shelf={shelf} shelfWidth={shelfWidth} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Library;
