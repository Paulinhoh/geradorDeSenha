const inpurEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityIndicatorBarEl = document.querySelector(
  "#security-indicator-bar"
);

let passwordLength = 16;

const generatePassword = () => {
  let chars = "abcdefghjklmnpqrstuvwxyz";

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numberChars = "123456789";
  const symbolChars = "?!@&*()[]";

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars;
  }
  if (numberCheckEl.checked) {
    chars += numberChars;
  }
  if (symbolCheckEl.checked) {
    chars += symbolChars;
  }

  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inpurEl.value = password;
  calculateQuality();
  calculateFontSize();
};

const calculateQuality = () => {
  // 20% -> critico => 100% -> safe
  const percent = Math.round(
    (passwordLength / 64) * 25 +
      (upperCaseCheckEl.checked ? 15 : 0) +
      (numberCheckEl.checked ? 25 : 0) +
      (symbolCheckEl.checked ? 35 : 0)
  );

  securityIndicatorBarEl.style.width = `${percent}%`;

  if (percent > 69) {
    // safe
    securityIndicatorBarEl.classList.remove("critical");
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.add("safe");
  } else if (percent > 50) {
    // warning
    securityIndicatorBarEl.classList.remove("critical");
    securityIndicatorBarEl.classList.add("warning");
    securityIndicatorBarEl.classList.remove("safe");
  } else {
    // critical
    securityIndicatorBarEl.classList.add("critical");
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.remove("safe");
  }

  if (percent >= 100) {
    securityIndicatorBarEl.classList.add("completed");
  } else {
    securityIndicatorBarEl.classList.remove("completed");
  }
};

const calculateFontSize = () => {
  if (passwordLength > 45) {
    inpurEl.classList.remove("font-sm");
    inpurEl.classList.remove("font-xs");
    inpurEl.classList.add("font-xxs");
  } else if (passwordLength > 32) {
    inpurEl.classList.remove("font-sm");
    inpurEl.classList.add("font-xs");
    inpurEl.classList.remove("font-xxs");
  } else if (passwordLength > 22) {
    inpurEl.classList.add("font-sm");
    inpurEl.classList.remove("font-xs");
    inpurEl.classList.remove("font-xxs");
  } else {
    inpurEl.classList.remove("font-sm");
    inpurEl.classList.remove("font-xs");
    inpurEl.classList.remove("font-xxs");
  }
};

const copy = () => {
  navigator.clipboard.writeText(inpurEl.value);
};

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", () => {
  passwordLength = passwordLengthEl.value;
  document.querySelector("#password-length-text").innerText = passwordLength;
  generatePassword();
});

upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);
document.querySelector("#renew").addEventListener("click", generatePassword);

generatePassword();
