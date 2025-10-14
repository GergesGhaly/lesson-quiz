import React, { useRef, useState } from "react";
import shelf from "./src/assets/shelf.png";
import { useNavigate } from "react-router-dom";
import booksAndQaData from "./src/data/booskAndQaData";
import ShelfComponent from "./src/components/ShelfComponent";
import BookComponent from "./src/components/BookComponent";
import BackBtn from "./src/components/BackBtn";
import libraryBg from "./src/assets/libraryBg.jpg";

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل"); // ✅ تصنيف افتراضي
  const [filteredBooks, setFilteredBooks] = useState(booksAndQaData);

  const bookRef = useRef();

  // ✅ استخراج التصنيفات الفريدة من الداتا
  const categories = [
    "الكل",
    ...new Set(booksAndQaData.map((b) => b.category)),
  ];

  // ✅ فلترة حسب البحث والتصنيف
  const handleFilter = (query, category) => {
    let filtered = booksAndQaData.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );

    if (category !== "الكل") {
      filtered = filtered.filter((book) => book.category === category);
    }

    setFilteredBooks(filtered);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleFilter(query, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handleFilter(searchQuery, category);
  };

  const shelfWidth = 370;
  const bookHeight = 100;
  const bookWidth = 60;
  const booksPerShelf = 4;

  const handleBookClick = (book) => {
    navigate(`/book/${book.id}`);
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
        // backgroundImage: `url(${libraryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
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

      {/* مربع البحث + الفلاتر */}
      <div style={{ textAlign: "center", direction: "rtl" }}>
        <input
          type="text"
          placeholder="ابحث في المكتبة"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            margin: "10px",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "transparent",
            border: "none",
            borderBottom: `1px solid #ffffff`,
            outline: "none",
            color: "#ffffff",
            fontFamily: "burelom",
            fontWeight: "500",
          }}
        />

        {/* ✅ قائمة الفلاتر */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={{
                backgroundColor:
                  selectedCategory === category ? "#FFBD2B" : "transparent",
                color: selectedCategory === category ? "#000" : "#fff",
                border: "1px solid #fff",
                borderRadius: "15px",
                padding: "6px 12px",
                fontFamily: "burelom",
                cursor: "pointer",
                transition: "0.3s",
                fontSize: "17px",
                fontWeight: "500",
              }}
            >
              {category}
            </button>
          ))}
        </div>
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
          marginTop: "20px",
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
