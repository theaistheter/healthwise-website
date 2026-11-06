const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const form = document.getElementById("registrationForm");
const confirmation = document.getElementById("confirmation");
const message = document.getElementById("message");
const charCount = document.getElementById("charCount");

message.addEventListener("input", () => {
  charCount.textContent = message.value.length;
});

function setError(inputId, errorId, text) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.add("invalid");
  error.textContent = text;
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.remove("invalid");
  error.textContent = "";
}

function validateName() {
  const value = document.getElementById("fullName").value.trim();
  if (!value) {
    setError("fullName", "fullNameError", "Please enter a name.");
    return false;
  }
  if (value.length < 2) {
    setError("fullName", "fullNameError", "Name must contain at least 2 characters.");
    return false;
  }
  clearError("fullName", "fullNameError");
  return true;
}

function validateEmail() {
  const value = document.getElementById("email").value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    setError("email", "emailError", "Please enter a sample email.");
    return false;
  }
  if (!pattern.test(value)) {
    setError("email", "emailError", "Please enter a valid email format.");
    return false;
  }
  clearError("email", "emailError");
  return true;
}

function validateSelect(inputId, errorId, message) {
  const value = document.getElementById(inputId).value;
  if (!value) {
    setError(inputId, errorId, message);
    return false;
  }
  clearError(inputId, errorId);
  return true;
}

document.getElementById("fullName").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("grade").addEventListener("change", () =>
  validateSelect("grade", "gradeError", "Please select your grade level.")
);
document.getElementById("topic").addEventListener("change", () =>
  validateSelect("topic", "topicError", "Please select a health topic.")
);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameOK = validateName();
  const emailOK = validateEmail();
  const gradeOK = validateSelect("grade", "gradeError", "Please select your grade level.");
  const topicOK = validateSelect("topic", "topicError", "Please select a health topic.");

  const academicUse = document.getElementById("academicUse");
  const academicError = document.getElementById("academicUseError");

  if (!academicUse.checked) {
    academicError.textContent = "Please confirm that you will use fictional/sample information.";
  } else {
    academicError.textContent = "";
  }

  if (!nameOK || !emailOK || !gradeOK || !topicOK || !academicUse.checked) {
    confirmation.hidden = true;
    return;
  }

  const selectedTopic = document.getElementById("topic").value;
  const selectedGrade = document.getElementById("grade").value;

  confirmation.innerHTML = `
    <strong>Registration review complete.</strong>
    Thank you, ${escapeHTML(document.getElementById("fullName").value.trim())}.
    Your selected topic is <strong>${escapeHTML(selectedTopic)}</strong> for
    <strong>${escapeHTML(selectedGrade)}</strong>.
    <br><small>This is only a demonstration. Your information has not been saved or sent to a server.</small>
  `;
  confirmation.hidden = false;
  confirmation.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}
