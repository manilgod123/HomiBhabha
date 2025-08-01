const params = new URLSearchParams(window.location.search);
const setName = params.get('set');
const dataPath = `data/${setName}.json`;

let questions = [];
let currentIndex = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const explanationEl = document.getElementById('explanation');
const nextBtn = document.getElementById('nextBtn');

fetch(dataPath)
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  })
  .catch(() => {
    questionEl.textContent = "Failed to load questions.";
  });

function showQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = `Q${currentIndex + 1}. ${q.question}`;
  optionsEl.innerHTML = "";
  explanationEl.classList.add('hidden');
  nextBtn.classList.add('hidden');

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = "w-full text-left p-3 sm:p-4 border rounded hover:bg-gray-100 text-sm sm:text-base";
    btn.onclick = () => handleAnswer(i, q.answer, q.explanation, btn);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(selected, correct, explanation, clickedBtn) {
  const allButtons = optionsEl.querySelectorAll('button');
  allButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) {
      btn.classList.add('bg-green-200');
    }
    if (i === selected && i !== correct) {
      btn.classList.add('bg-red-200');
    }
  });

  explanationEl.textContent = explanation;
  explanationEl.classList.remove('hidden');
  nextBtn.classList.remove('hidden');

  nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      questionEl.textContent = "Quiz Completed!";
      optionsEl.innerHTML = "";
      explanationEl.textContent = "";
      nextBtn.style.display = 'none';
    }
  };
}
