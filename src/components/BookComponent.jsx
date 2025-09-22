import React, { useState } from "react";
import Tooltip from "./Tooltip"; // تأكد من استيراد Tooltip من الملف الصحيح

const BookComponent = ({
  book,
  handleBookClick,
  bookWidth,
  bookHeight,
  marginTop,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
      onClick={() => handleBookClick(book)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && <Tooltip text={book.title} />}
      <div
        style={{
          ...styles.innerBook,
          width: bookWidth,
          height: bookHeight,
          marginTop: marginTop,
        }}
        className="book-component"
      >
        <div style={{ ...styles.img, paddingTop: "calc(1.07 * 100%)" }}>
          <img src={book.images[0]} alt="Book Cover" style={styles.image} />
        </div>
        <div style={styles.page}></div>
        <div style={{ ...styles.page, ...styles.page2 }}></div>
        <div style={{ ...styles.page, ...styles.page3 }}></div>
        <div style={{ ...styles.page, ...styles.page4 }}></div>
        <div style={{ ...styles.page, ...styles.page5 }}></div>
        <div
          style={{
            ...styles.img,
            ...styles.finalPage,
            paddingTop: "calc(1.07 * 100%)",
          }}
        >
          <img
            src={book.images[0]}
            alt="Book Final Page"
            style={styles.image}
          />
        </div>

        {/* شريط التسمية عمودي ويغطي طول الكتاب بالكامل */}
        <div
          style={{
            // transformStyle: "preserve-3d",
            // perspective: "2000px",
            // transform: "rotateY(-20deg)",

            position: "absolute",
            top: "0px", // بدء الشريط من أعلى الكتاب
            left: "2px", // بدء الشريط من أقصى اليسار
            width: "100%", // عرض الشريط
            height: "20px", // طول الشريط بنفس طول الكتاب
            backgroundColor: "rgb(255,249,224)",
            color: "black",
            textAlign: "center",
            lineHeight: "1.5", // لضبط محاذاة النص عموديًا
            fontSize: "11px",
            zIndex: 1001, // التأكد من أن الشريط فوق الكتاب
            cursor: "pointer",
            transform: "rotate(-90deg) translateX(-100%)", // تدوير الشريط والنص بزاوية 90 درجة
            transformOrigin: "top left", // نقطة الأصل للتدوير
          }}
        >
          {book.title}
        </div>
      </div>
    </div>
  );
};

const styles = {
  innerBook: {
    alignItems: "center",
    display: "flex",
    position: "relative",
    transformStyle: "preserve-3d",
    perspective: "2000px",
  },
  book: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transform: "translateZ(0)",
  },
  img: {
    transform: "rotateY(-20deg)",
    width: "100%",
    zIndex: 5,
    clear: "both",
    height: "100%",
    background: "#ddd",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    display: "block",
    position: "absolute",
    top: "0",
  },
  page: {
    width: "calc(100% - 20px)",
    height: "calc(100% - 2px)",
    position: "absolute",
    boxShadow:
      "inset 0px -1px 2px rgba(50, 50, 50, 0.2), inset -1px 0px 1px rgba(150, 150, 150, 0.1)",
    borderRadius: "0px 3px 3px 0px",
    transform: "rotateY(-20deg) translateZ(-5px)",
    right: "-3px",
    zIndex: 4,
    background: "white",
  },
  page2: {
    height: "calc(100% - 4px)",
    right: "-6px",
    zIndex: 3,
  },
  page3: {
    height: "calc(100% - 6px)",
    right: "-9px",
    zIndex: 2,
  },
  page4: {
    height: "calc(100% - 8px)",
    right: "-12px",
    zIndex: 1,
  },
  page5: {
    height: "calc(100% - 10px)",
    right: "-15px",
    zIndex: 0,
  },
  finalPage: {
    position: "absolute",
    zIndex: -1,
    right: "-17px",
    transform: "rotateY(-19deg) translateZ(-10px) scale(0.984)",
  },
};

export default BookComponent;
