import React, { useRef } from "react"; // 👈 مهم جداً
import HTMLFlipBook from "react-pageflip";
import { useNavigate, useParams } from "react-router-dom";
import booksData from "./src/data/booksData";
import ImageComponent from "./src/components/ImageComponent";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookRef = useRef(); // 👈 هنا تعريف bookRef

  const book = booksData.find((b) => b.id === Number(id));

  if (!book) return <h2>❌ الكتاب غير موجود</h2>;

  const handleImageClick = (index) => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(index); // الانتقال إلى الصفحة المحددة
    }
    // setInputValue(index);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        textAlign: "center",
        padding: "10px",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button onClick={() => navigate("/Library")}>🔙 العودة للمكتبة</button>
        <h4 style={{ direction: "rtl" }}>{book.title}</h4>
      </div>

      {/* image-gallery */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <HTMLFlipBook width={500} height={650} ref={bookRef} rtl={true}>
          {book.images.map((image, index) => (
            <div key={index} className="page">
              <img
                src={image}
                alt={`Page ${index + 1}`}
                style={{ width: "100%", height: "100%" }}
              />
              <p>page {index + 1}</p>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          zIndex: "999",
        }}
      >
        <button onClick={() => navigate(`/quiz/${book.id}`)}>
          🎯 ابدأ مسابقة {book.title}
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
