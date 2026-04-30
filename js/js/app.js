// app.js — index page logic only

let currentTopicId = null;

function init() {
  buildSidebar();
  buildTopicsSummary();
}

function buildSidebar() {
  const ul = document.getElementById("topic-list");
  TOPICS.forEach(t => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = t.label;
    btn.dataset.id = t.id;
    btn.onclick = () => loadTopic(t.id);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function buildTopicsSummary() {
  const ul = document.getElementById("topics-summary");
  TOPICS.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.label;
    ul.appendChild(li);
  });
}

function loadTopic(id) {
  currentTopicId = id;
  const searchEl = document.getElementById("search-input");
  if (searchEl) searchEl.value = "";

  document.querySelectorAll("#topic-list button").forEach(b => {
    b.classList.toggle("active", b.dataset.id === id);
  });

  const topic = TOPICS.find(t => t.id === id);
  if (!topic) return;

  const heading = document.getElementById("topic-heading");
  heading.textContent = topic.label;
  heading.style.display = "block";

  const container = document.getElementById("cards-container");
  container.innerHTML = "";
  document.getElementById("no-results").style.display = "none";

  topic.cards.forEach(card => container.appendChild(makeCard(card)));
}

function makeCard(card) {
  const wrap = document.createElement("div");
  wrap.className = "card";
  const header = document.createElement("div");
  header.className = "card-header";
  const typeSpan = document.createElement("span");
  typeSpan.className = "card-type";
  typeSpan.textContent = TYPE_LABELS[card.type] || card.type;
  const titleDiv = document.createElement("div");
  titleDiv.className = "card-title";
  titleDiv.textContent = card.title;
  header.appendChild(typeSpan);
  header.appendChild(titleDiv);
  wrap.appendChild(header);
  const ul = document.createElement("ul");
  ul.className = "card-items";
  card.items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  wrap.appendChild(ul);
  return wrap;
}

function runSearch() {
  const q = document.getElementById("search-input").value.trim().toLowerCase();
  if (!q) { if (currentTopicId) loadTopic(currentTopicId); else clearCenter(); return; }

  document.querySelectorAll("#topic-list button").forEach(b => b.classList.remove("active"));
  document.getElementById("topic-heading").textContent = `Хайлт: "${q}"`;
  document.getElementById("topic-heading").style.display = "block";

  const container = document.getElementById("cards-container");
  container.innerHTML = "";
  const noRes = document.getElementById("no-results");

  const results = [];
  TOPICS.forEach(t => {
    t.cards.forEach(card => {
      const inTitle = card.title.toLowerCase().includes(q);
      const matchedItems = card.items.filter(i => i.toLowerCase().includes(q));
      if (inTitle || matchedItems.length) {
        results.push({ card: { ...card, title: `[${t.label}] ${card.title}`, items: inTitle ? card.items : matchedItems } });
      }
    });
  });

  if (!results.length) { noRes.style.display = "block"; return; }
  noRes.style.display = "none";

  results.forEach(r => {
    const el = makeCard(r.card);
    el.querySelectorAll("li").forEach(li => {
      li.innerHTML = li.innerHTML.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`, "gi"), "<mark>$1</mark>");
    });
    container.appendChild(el);
  });
}

function clearSearch() {
  document.getElementById("search-input").value = "";
  if (currentTopicId) loadTopic(currentTopicId); else clearCenter();
}

function clearCenter() {
  document.getElementById("topic-heading").style.display = "none";
  document.getElementById("cards-container").innerHTML = "";
  document.getElementById("no-results").style.display = "none";
}

document.addEventListener("DOMContentLoaded", init);
