import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useNavigate, useParams } from "react-router-dom";
import booksData from "./src/data/booksData";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookRef = useRef();
  const [isLastPage, setIsLastPage] = useState(false);

  const book = booksData.find((b) => b.id === Number(id));
  if (!book) return <h2>❌ الكتاب غير موجود</h2>;

  // ✅ دالة مضمونة لمعرفة الصفحة الحالية
  const handleFlip = () => {
    const bookObj = bookRef.current.pageFlip();
    const currentPage = bookObj.getCurrentPageIndex();
    const totalPages = book.images.length;

    // 👇 لو آخر صفحة أو قبل الأخيرة (بسبب flip مزدوج)
    if (currentPage >= totalPages - 2) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  };

  return (
    <div
      style={{
        height: "100dvh",
        textAlign: "center",
        padding: "20px 10px",
        position: "relative",
        backgroundColor: "#000",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",

        gap: "20px",
      }}
    >
      {/* 🔹 شريط العنوان */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={() => navigate("/Library")}
          style={{
            background: "transparent",
            border: "2px solid #FFBD2B",
            color: "#FFBD2B",
            padding: "6px 14px",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          العودة للمكتبة
        </button>
        <h4 style={{ direction: "rtl", color: "#fff" }}>{book.title}</h4>
      </div>

      {/* 📖 flip book */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HTMLFlipBook
          width={500}
          height={650}
          ref={bookRef}
          rtl={true}
          onFlip={handleFlip} // ✅ متابعة التقليب هنا
          style={{
            boxShadow: "0 0 15px rgba(255,189,43,0.4)",
          }}
        >
          {book.images.map((image, index) => (
            <div key={index} className="page">
              <img
                src={image}
                alt={`Page ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* ✅ زر المسابقة - يظهر فقط عند آخر صفحة */}
      {isLastPage && (
        <button
          onClick={() => navigate(`/quiz/${book.id}`)}
          style={{
            backgroundColor: "#FFBD2B",
            border: "none",
            color: "#000",
            fontWeight: "bold",
            padding: "12px 28px",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0 0 15px rgba(255,189,43,0.6)",
            transition: "all 0.3s ease",
            zIndex: 9999,
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#FFD86F")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFBD2B")}
        >
          🎯 ابدأ مسابقة {book.title}
        </button>
      )}
    </div>
  );
};

export default BookDetails;
