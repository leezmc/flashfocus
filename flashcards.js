// Get references to DOM elements
const flashcards = document.getElementById("flashcards");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const saveCardButton = document.getElementById("save_card");
const deleteCardsButton = document.getElementById("delete_cards");
const showCardBoxButton = document.getElementById("show_card_box");
const closeCardBoxButton = document.getElementById("close_card_box");

// Initialize content array
let contentArray = [];

// Load flashcards from localStorage
const loadFlashcards = () => {
  const items = localStorage.getItem("items");
  if (items) {
    contentArray = JSON.parse(items);
    contentArray.forEach(createFlashcard);
  }
};

// Create a new flashcard
const createFlashcard = (flashcard_info) => {
  // Create DOM elements
  const flashcard = document.createElement("div");
  const questionElem = document.createElement("h2");
  const answerElem = document.createElement("h2");
  const delBtn = document.createElement("i");

  // Add classes to elements
  flashcard.classList.add("flashcard");
  questionElem.classList.add("question");
  answerElem.classList.add("answer");
  delBtn.classList.add("fas", "fa-minus");

  // Set content and styles for elements
  questionElem.textContent = flashcard_info.my_question;
  answerElem.textContent = flashcard_info.my_answer;
  answerElem.style.display = "none";

  // Add event listeners to elements
  delBtn.addEventListener("click", () => {
    const index = contentArray.indexOf(flashcard_info);
    contentArray.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(contentArray));
    flashcard.remove();
  });

  flashcard.addEventListener("click", () => {
    answerElem.style.display = answerElem.style.display === "none" ? "block" : "none";
  });

  // Append elements to flashcard
  flashcard.appendChild(questionElem);
  flashcard.appendChild(answerElem);
  flashcard.appendChild(delBtn);

  // Append flashcard to flashcards container
  flashcards.appendChild(flashcard);
};

// Save a new flashcard
const saveFlashcard = () => {
  const flashcard_info = {
    my_question: question.value,
    my_answer: answer.value,
  };
  contentArray.push(flashcard_info);
  localStorage.setItem("items", JSON.stringify(contentArray));
  createFlashcard(flashcard_info);
  question.value = "";
  answer.value = "";
};

// Remove all flashcards
const removeAllFlashcards = () => {
  localStorage.clear();
  flashcards.innerHTML = "";
  contentArray = [];
};

// Show/hide the create card box
const toggleCreateCardBox = () => {
  const createCardBox = document.getElementById("create_card");
  createCardBox.style.display = createCardBox.style.display === "none" ? "block" : "none";
};

// Add event listeners to buttons
saveCardButton.addEventListener("click", saveFlashcard);
deleteCardsButton.addEventListener("click", removeAllFlashcards);
showCardBoxButton.addEventListener("click", toggleCreateCardBox);
closeCardBoxButton.addEventListener("click", toggleCreateCardBox);

// Load initial flashcards
loadFlashcards();
