const booskAndQaData = [
  {
    id: 2,
    title: "Animales",
    category: "لاهوتيات",
    // ✅ التصنيف الجديد
    images: [
      "https://images.pexels.com/photos/19400410/pexels-photo-19400410/free-photo-of-a-cow-standing-in-a-field-with-mountains-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/12846013/pexels-photo-12846013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4079379/pexels-photo-4079379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6491060/pexels-photo-6491060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    quiz: {
      title: {
        ar: "أنبياء وشخصيات",
        en: "Prophets and Figures",
      },
      questions: [
        {
          question: {
            ar: "من شقّ البحر بعصاه؟",
            en: "Who parted the sea with his staff?",
          },
          answers: {
            ar: ["داود", "موسى", "إيليا", "يشوع"],
            en: ["David", "Moses", "Elijah", "Joshua"],
          },
          correct: 1,
        },
        {
          question: {
            ar: "من عاش في بطن الحوت ثلاثة أيام؟",
            en: "Who lived in the belly of a whale for three days?",
          },
          answers: {
            ar: ["يونان", "موسى", "يعقوب", "يوحنا"],
            en: ["Jonah", "Moses", "Jacob", "John"],
          },
          correct: 0,
        },
        {
          question: {
            ar: "من هو النبي الذي صعد إلى السماء في مركبة نارية؟",
            en: "Which prophet ascended to heaven in a chariot of fire?",
          },
          answers: {
            ar: ["إيليا", "إليشع", "إرميا", "حزقيال"],
            en: ["Elijah", "Elisha", "Jeremiah", "Ezekiel"],
          },
          correct: 0,
        },
        {
          question: {
            ar: "من هو النبي الذي مسح داود ملكًا؟",
            en: "Which prophet anointed David as king?",
          },
          answers: {
            ar: ["شمعون", "صموئيل", "ناثان", "إيليا"],
            en: ["Simon", "Samuel", "Nathan", "Elijah"],
          },
          correct: 1,
        },
        {
          question: {
            ar: "من هو التلميذ الذي كتب سفر الرؤيا؟",
            en: "Which disciple wrote the Book of Revelation?",
          },
          answers: {
            ar: ["موسى", "إشعياء", "يوحنا", "حزقيال"],
            en: ["Moses", "Isaiah", "John", "Ezekiel"],
          },
          correct: 2,
        },
        {
          question: {
            ar: "من هو الملك الذي هزم جليات؟",
            en: "Which king defeated Goliath?",
          },
          answers: {
            ar: ["سليمان", "شاول", "داود", "يشوع"],
            en: ["Solomon", "Saul", "David", "Joshua"],
          },
          correct: 2,
        },
        {
          question: {
            ar: "من هو النبي الذي تنبأ عن العذراء التي تلد؟",
            en: "Which prophet prophesied about the virgin who would give birth?",
          },
          answers: {
            ar: ["إشعياء", "إرميا", "حزقيال", "هوشع"],
            en: ["Isaiah", "Jeremiah", "Ezekiel", "Hosea"],
          },
          correct: 0,
        },
        {
          question: {
            ar: "من هو النبى الحكيم الذي كتب الأمثال؟",
            en: "Which wise prophet wrote the Proverbs?",
          },
          answers: {
            ar: ["داود", "سليمان", "موسى", "يشوع"],
            en: ["David", "Solomon", "Moses", "Joshua"],
          },
          correct: 1,
        },
        {
          question: {
            ar: "من هو النبي الذي أنقذ من جب الأسود؟",
            en: "Which prophet was saved from the lion's den?",
          },
          answers: {
            ar: ["دانيال", "نحميا", "عزرا", "صموئيل"],
            en: ["Daniel", "Nehemiah", "Ezra", "Samuel"],
          },
          correct: 0,
        },
        {
          question: {
            ar: "من هو الشخص الذي خان يسوع؟",
            en: "Who betrayed Jesus?",
          },
          answers: {
            ar: ["بطرس", "توما", "يهوذا", "يعقوب"],
            en: ["Peter", "Thomas", "Judas", "James"],
          },
          correct: 2,
        },
      ],
    },
  },
  {
    id: 3,
    title: "Seas",
    category: "العهد القديم", // ✅ تصنيف مختلف
    images: [
      "https://images.pexels.com/photos/4122201/pexels-photo-4122201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4084064/pexels-photo-4084064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/10179344/pexels-photo-10179344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7473300/pexels-photo-7473300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    quiz: {
      title: {
        ar: "قصص من العهد القديم",
        en: "Stories from the Old Testament",
      },
      questions: [
        {
          question: {
            ar: "من بنى الفلك لينقذ عائلته من الطوفان؟",
            en: "Who built the ark to save his family from the flood?",
          },
          answers: {
            ar: ["إبراهيم", "نوح", "موسى", "يوسف"],
            en: ["Abraham", "Noah", "Moses", "Joseph"],
          },
          correct: 1,
        },
        {
          question: {
            ar: "من هو أول إنسان خلقه الله؟",
            en: "Who was the first human created by God?",
          },
          answers: {
            ar: ["نوح", "إبراهيم", "آدم", "يعقوب"],
            en: ["Noah", "Abraham", "Adam", "Jacob"],
          },
          correct: 2,
        },
        {
          question: {
            ar: "من شقّ البحر بعصاه؟",
            en: "Who parted the sea with his staff?",
          },
          answers: {
            ar: ["داود", "موسى", "إيليا", "يشوع"],
            en: ["David", "Moses", "Elijah", "Joshua"],
          },
          correct: 1,
        },
        {
          question: {
            ar: "من عاش في بطن الحوت ثلاثة أيام؟",
            en: "Who lived in the belly of a whale for three days?",
          },
          answers: {
            ar: ["يونان", "موسى", "يعقوب", "يوحنا"],
            en: ["Jonah", "Moses", "Jacob", "John"],
          },
          correct: 0,
        },
        {
          question: {
            ar: "من رأى السلم بين السماء والأرض في حلم؟",
            en: "Who saw a ladder between heaven and earth in a dream?",
          },
          answers: {
            ar: ["يعقوب", "يوسف", "إبراهيم", "موسى"],
            en: ["Jacob", "Joseph", "Abraham", "Moses"],
          },
          correct: 0,
        },
        {
          question: {
            ar: "من كان أصغر أبناء يعقوب وبيع كعبد؟",
            en: "Who was the youngest son of Jacob and was sold as a slave?",
          },
          answers: {
            ar: ["بنيامين", "لاوي", "يوسف", "روبن"],
            en: ["Benjamin", "Levi", "Joseph", "Reuben"],
          },
          correct: 2,
        },
        {
          question: {
            ar: "من كان الملك الذي حلم بالبقرات السبع؟",
            en: "Which king dreamed of seven cows?",
          },
          answers: {
            ar: ["فرعون", "نبوخذنصر", "شاول", "أخاب"],
            en: ["Pharaoh", "Nebuchadnezzar", "Saul", "Ahab"],
          },
          correct: 0,
        },
        {
          question: {
            ar: "من هو النبي الذي تحدى أنبياء البعل؟",
            en: "Which prophet challenged the prophets of Baal?",
          },
          answers: {
            ar: ["إيليا", "إشعياء", "إرميا", "حزقيال"],
            en: ["Elijah", "Isaiah", "Jeremiah", "Ezekiel"],
          },
          correct: 0,
        },
        {
          question: {
            ar: "من قاد شعب إسرائيل بعد موسى؟",
            en: "Who led the Israelites after Moses?",
          },
          answers: {
            ar: ["هارون", "داود", "يشوع", "صموئيل"],
            en: ["Aaron", "David", "Joshua", "Samuel"],
          },
          correct: 2,
        },
        {
          question: {
            ar: "ما اسم الجبل الذي أعطى الله عليه الوصايا العشر؟",
            en: "What is the name of the mountain where God gave the Ten Commandments?",
          },
          answers: {
            ar: ["جبل الكرمل", "جبل الزيتون", "جبل سيناء", "جبل تابور"],
            en: [
              "Mount Carmel",
              "Mount of Olives",
              "Mount Sinai",
              "Mount Tabor",
            ],
          },
          correct: 2,
        },
      ],
    },
  },
];

export default booskAndQaData;
