const screens = [
  document.getElementById("screen-discover"),
  document.getElementById("screen-match"),
  document.getElementById("screen-quest"),
  document.getElementById("screen-streak")
];

let currentScreen = 0;

function showToast(message) {
  const oldToast = document.querySelector(".toast");
  if (oldToast) oldToast.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function showScreen(index) {
  currentScreen = Math.max(0, Math.min(index, screens.length - 1));
  if (window.matchMedia("(max-width: 720px)").matches) {
    screens.forEach((screen, i) => {
      screen.classList.toggle("active-phone", i === currentScreen);
    });
    document.getElementById("screen-label").textContent =
      `Interactive prototype · Screen ${currentScreen + 1} of ${screens.length}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    screens[currentScreen].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }
}

document.querySelectorAll(".connect-btn").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    document.getElementById("match-name").textContent = name;
    button.textContent = "Connected ✓";
    setTimeout(() => showScreen(1), 180);
  });
});

document.querySelectorAll(".question-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".question-card").forEach(c => c.classList.remove("selected-card"));
    card.classList.add("selected-card");
    card.querySelector("input").checked = true;
  });
});

document.getElementById("send-icebreaker").addEventListener("click", () => {
  showToast("Icebreaker sent!");
  setTimeout(() => showScreen(2), 500);
});

document.getElementById("accept-quest").addEventListener("click", () => {
  showToast("Coffee side-quest accepted");
  setTimeout(() => showScreen(3), 500);
});

document.getElementById("suggest-time").addEventListener("click", () => {
  showToast("Time suggestion opened");
});

document.querySelectorAll("[data-back]").forEach(button => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.back);
    showScreen(screens.indexOf(target));
  });
});

document.getElementById("event-task").addEventListener("click", () => {
  const checkbox = document.getElementById("event-checkbox");
  checkbox.checked = !checkbox.checked;

  const task = document.getElementById("event-task");
  const circle = task.querySelector(".empty-circle");
  const fill = document.getElementById("progress-fill");
  const percent = document.getElementById("progress-percent");
  const caption = document.getElementById("progress-caption");
  const reward = document.getElementById("reward-card");

  if (checkbox.checked) {
    circle.className = "check-circle";
    circle.textContent = "✓";
    task.classList.add("done");
    fill.style.width = "100%";
    percent.textContent = "100%";
    caption.textContent = "Badge unlocked — friendship streak complete!";
    reward.classList.add("unlocked");
    showToast("Friendship Badge unlocked!");
  } else {
    circle.className = "empty-circle";
    circle.textContent = "";
    task.classList.remove("done");
    fill.style.width = "55%";
    percent.textContent = "55%";
    caption.textContent = "1 more quest to unlock your badge";
    reward.classList.remove("unlocked");
  }
});

document.getElementById("find-event").addEventListener("click", () => {
  showToast("Showing upcoming McMaster events");
});

document.getElementById("previous-screen").addEventListener("click", () => showScreen(currentScreen - 1));
document.getElementById("next-screen").addEventListener("click", () => showScreen(currentScreen + 1));

window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 720px)").matches) {
    screens.forEach((screen, i) => screen.classList.toggle("active-phone", i === currentScreen));
  } else {
    screens.forEach(screen => screen.classList.add("active-phone"));
  }
});

if (!window.matchMedia("(max-width: 720px)").matches) {
  screens.forEach(screen => screen.classList.add("active-phone"));
}
