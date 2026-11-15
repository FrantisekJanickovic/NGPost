// ───────────────────────────────────────────────────────────
// STRIPE PLACEHOLDER
// Sem vlož Stripe Payment Link (napr. "https://buy.stripe.com/xxxx").
// Kým je prázdny, tlačidlá iba skrolujú na sekciu s cenou.
// ───────────────────────────────────────────────────────────
const STRIPE_PAYMENT_LINK = "";

if (STRIPE_PAYMENT_LINK) {
  document.querySelectorAll("[data-stripe]").forEach((a) => {
    a.href = STRIPE_PAYMENT_LINK;
  });
}

// Ciferník v hero sekcii: prepínanie režimu pôst : jedenie
const day = document.getElementById("dial-day");
const big = document.getElementById("dial-big");
const sub = document.getElementById("dial-sub");
const buttons = document.querySelectorAll(".dial-switch button");
const C = 2 * Math.PI * 118; // obvod kruhu
const EAT_END = 20; // okno jedenia končí o 20:00

function setDial(fastHours) {
  const eat = 24 - fastHours;
  const start = EAT_END - eat;
  day.style.strokeDasharray = `${(eat / 24) * C} ${C}`;
  day.style.transform = `rotate(${-90 + start * 15}deg)`; // polnoc je hore
  big.textContent = `${fastHours} : ${eat}`;
  sub.textContent = `jem ${start}:00 – ${EAT_END}:00`;
  buttons.forEach((b) =>
    b.setAttribute("aria-pressed", String(Number(b.dataset.fast) === fastHours))
  );
}

buttons.forEach((b) => b.addEventListener("click", () => setDial(Number(b.dataset.fast))));

// Úvodná animácia: okno jedenia sa "otvorí" raz po načítaní
day.style.strokeDasharray = `0 ${C}`;
day.style.transform = "rotate(90deg)";
requestAnimationFrame(() => requestAnimationFrame(() => setDial(16)));
