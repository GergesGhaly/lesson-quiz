import React, { useRef, useState } from "react";
import shelf from "./src/assets/shelf.png";
import { useNavigate } from "react-router-dom";
import booksData from "./src/data/booksData";
import ShelfComponent from "./src/components/ShelfComponent";
import BookComponent from "./src/components/BookComponent";
import libararyWall from "./src/assets/libararyWall.jpg";

const Library = () => {
  const navigate = useNavigate();

  // الحالة لتخزين الكتاب الحالي
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  const bookRef = useRef(); // مرجع للكتاب الكبير
  // Handle the search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter books based on the search query
    const filtered = booksData.filter((book) =>
      book.title.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  };

  const shelfWidth = 370;
  const bookHeight = 100;
  const bookWidth = 60;
  const booksPerShelf = 4; // عدد الكتب في كل رف

  // عند النقر على الكتاب يتم اختياره
  const handleBookClick = (book) => {
    // setSelectedBook(book);
    navigate(`/book/${book.id}`); // الانتقال لصفحة الكتاب
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
        // backgroundImage: `url(${libararyWall})`,
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center center",
        // minHeight: "100dvh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "2px solid #FFBD2B",
            color: "#FFBD2B",
            padding: "6px 14px",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
      {/*  هالكتب  */}
      <div>
        {/* صندوق الإدخال البحث */}
        <input
          type="text"
          placeholder=" Search in books"
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
            color: #000000; // تحديث لون placeholder بناءً على لون النص

          }
        `}
        </style>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          left: "0", // لنقل العنصر إلى اليسار (في حال كنت تريد توسيط العنصر عموديًا فقط)
          maxHeight: "70vh",
          overflowY: "auto",
          msOverflowStyle: "none" /* IE و Edge */,
          scrollbarWidth: "none" /* Firefox */,
        }}
      >
        {/* عرض الكتب الصغيره */}
        {Array.from(
          { length: Math.ceil(booksData.length / booksPerShelf) },
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
                  .map((book, bookIndex) => (
                    <BookComponent
                      book={book}
                      handleBookClick={handleBookClick}
                      bookWidth={bookWidth}
                      bookHeight={bookHeight}
                    />
                  ))}
              </div>

              {/* عرض الرف */}
              <ShelfComponent shelf={shelf} shelfWidth={shelfWidth} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Library;
