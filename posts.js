/* =============================================================================
   posts.js — ADD, EDIT, DELETE POSTS HERE
   =============================================================================

   HOW TO ADD A POST:
   Copy one of the blocks below, fill in your content, and add it to POSTS.

   FIELDS:
     id          — unique string, no spaces (e.g. "tips-003")      REQUIRED
     category    — "informations" | "tips" | "advices" | "teachers" REQUIRED
     title       — short headline                                   REQUIRED
     description — full post content (use \n for new lines)        REQUIRED
     author      — who wrote it                                     optional
     date        — "YYYY-MM-DD"                                     optional

   HOW TO DELETE:
   Remove the entire { ... } block for that post.

   HOW TO EDIT:
   Just change the text inside the quotes.

   =========================================================================== */

var POSTS = [

  /* ── INFORMATIONS ── */
  {
    id:          "info-001",
    category:    "informations",
    title:       "How to use this site",
    description: "Welcome to our student knowledge platform.\n\nThis site is built by students, for students. Each section covers a different area — browse Tips for study techniques, Advices for personal growth, Informations for general knowledge, and For Teachers for resources aimed at educators.\n\nClick any card to read the full post and leave a comment.",
    author:      "Team",
    date:        "2025-01-01",
  },
  {
    id:          "info-002",
    category:    "informations",
    title:       "What is active learning?",
    description: "Active learning is an approach where students engage directly with the material rather than passively listening.\n\nTechniques include:\n- Summarising in your own words\n- Teaching the concept to someone else\n- Practice problems and quizzes\n- Group discussion\n\nResearch consistently shows active learning leads to better long-term retention compared to re-reading notes.",
    author:      "Team",
    date:        "2025-01-05",
  },

  /* ── TIPS ── */
  {
    id:          "tips-001",
    category:    "tips",
    title:       "The Pomodoro Technique",
    description: "Work in focused 25-minute blocks, then take a 5-minute break. After four blocks, take a longer 15–30 minute break.\n\nWhy it works:\n- Breaks the task into manageable chunks\n- Reduces mental fatigue\n- Creates a sense of urgency that helps focus\n\nUse a simple timer on your phone. The key is to stop when the timer goes off, even mid-sentence.",
    author:      "Team",
    date:        "2025-01-08",
  },
  {
    id:          "tips-002",
    category:    "tips",
    title:       "Spaced repetition for memorisation",
    description: "Instead of studying the same material daily, review it at increasing intervals — after 1 day, then 3 days, then 1 week, then 2 weeks.\n\nThis exploits the spacing effect: memories are stronger when formed over multiple spaced sessions rather than one long session.\n\nFree tools like Anki automate this scheduling for you.",
    author:      "Team",
    date:        "2025-01-12",
  },

  /* ── ADVICES ── */
  {
    id:          "adv-001",
    category:    "advices",
    title:       "Managing exam stress",
    description: "Stress before exams is normal. The goal is not to eliminate it but to keep it at a productive level.\n\nPractical steps:\n1. Plan your revision schedule at least two weeks ahead\n2. Sleep 7–8 hours — sleep consolidates memory\n3. Exercise daily, even a short walk helps\n4. Talk to someone if you feel overwhelmed\n\nRemember: one exam does not define your future.",
    author:      "Team",
    date:        "2025-01-15",
  },
  {
    id:          "adv-002",
    category:    "advices",
    title:       "Building consistent study habits",
    description: "Motivation comes and goes. Habits are what keep you moving when motivation is low.\n\nStart small. Commit to just 15 minutes of focused study at the same time each day. Once the habit is formed, gradually increase the duration.\n\nEnvironment matters: a dedicated, tidy study space signals to your brain that it is time to focus.",
    author:      "Team",
    date:        "2025-01-20",
  },

  /* ── FOR TEACHERS ── */
  {
    id:          "teach-001",
    category:    "teachers",
    title:       "Giving effective feedback",
    description: "Effective feedback is specific, timely, and actionable.\n\nInstead of: 'Good work.'\nTry: 'Your argument in the second paragraph is strong. The third paragraph would be clearer if you added an example.'\n\nFeedback should tell students what they did well, what needs improvement, and how to improve it. Avoid feedback overload — focus on two or three key points per piece of work.",
    author:      "Team",
    date:        "2025-01-22",
  },

  /*
  ── ADD A NEW POST HERE ──────────────────────────────────────────────────────

  {
    id:          "",          // unique, no spaces e.g. "tips-003"
    category:    "",          // informations | tips | advices | teachers
    title:       "",
    description: "",          // use \n for line breaks
    author:      "",
    date:        "",          // YYYY-MM-DD
  },

  ──────────────────────────────────────────────────────────────────────────── */

];

/* =============================================================================
   SHARED LOGIC — do not edit below this line
   =========================================================================== */

var CAT_LABELS = {
  informations: "Informations",
  tips:         "Tips",
  advices:      "Advices",
  teachers:     "For Teachers",
};

function getPostsByCategory(cat) {
  return POSTS.filter(function(p) { return p.category === cat; });
}

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(str) {
  if (!str) return '';
  var d = new Date(str);
  return d.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
}

function excerpt(str, max) {
  max = max || 140;
  if (!str) return '';
  var s = str.replace(/\n/g, ' ');
  return s.length > max ? s.slice(0, max).trimEnd() + '…' : s;
}

/* ── Comments via localStorage ── */
function getComments(postId) {
  try { return JSON.parse(localStorage.getItem('comments_' + postId)) || []; }
  catch(e) { return []; }
}
function saveComments(postId, comments) {
  localStorage.setItem('comments_' + postId, JSON.stringify(comments));
}

/* ── Build a post card ── */
function buildCard(post, onClick) {
  var card = document.createElement('article');
  card.className = 'post-card';
  card.innerHTML =
    '<div class="post-card-cat">' + escHtml(CAT_LABELS[post.category] || post.category) + '</div>' +
    '<div class="post-card-title">' + escHtml(post.title) + '</div>' +
    '<div class="post-card-excerpt">' + escHtml(excerpt(post.description)) + '</div>' +
    '<div class="post-card-meta">' +
      '<span>' + (post.author ? escHtml(post.author) : '') + (post.date ? (post.author ? ' · ' : '') + formatDate(post.date) : '') + '</span>' +
      '<span class="post-card-read">Read</span>' +
    '</div>';
  card.addEventListener('click', function() { onClick(post); });
  return card;
}

/* ── Build and open modal ── */
var _modalOpen = false;

function openModal(post) {
  var overlay = document.getElementById('postModal');
  if (!overlay) return;
  _modalOpen = true;

  // Fill header
  document.getElementById('modalCat').textContent   = CAT_LABELS[post.category] || post.category;
  document.getElementById('modalTitle').textContent = post.title;
  document.getElementById('modalMeta').textContent  =
    (post.author ? post.author : '') + (post.date ? (post.author ? ' — ' : '') + formatDate(post.date) : '');
  document.getElementById('modalContent').textContent = post.description;

  // Comments
  renderComments(post.id);

  // Wire up comment form
  var form = document.getElementById('commentForm');
  form.onsubmit = function(e) {
    e.preventDefault();
    var name = document.getElementById('commentName').value.trim();
    var text = document.getElementById('commentText').value.trim();
    if (!name || !text) return;
    var comments = getComments(post.id);
    comments.push({ name: name, text: text, date: new Date().toISOString() });
    saveComments(post.id, comments);
    renderComments(post.id);
    form.reset();
  };

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderComments(postId) {
  var comments = getComments(postId);
  var list     = document.getElementById('commentsList');
  if (!list) return;
  if (!comments.length) {
    list.innerHTML = '<div class="no-comments">No comments yet. Be the first.</div>';
    return;
  }
  list.innerHTML = '';
  comments.forEach(function(c) {
    var item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML =
      '<div class="comment-name">' + escHtml(c.name) + '</div>' +
      '<div class="comment-text">' + escHtml(c.text) + '</div>' +
      '<div class="comment-date">' + formatDate(c.date ? c.date.split('T')[0] : '') + '</div>';
    list.appendChild(item);
  });
}

function closeModal() {
  var overlay = document.getElementById('postModal');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = 'auto';
  _modalOpen = false;
}

/* ── Nav: hamburger ── */
function initNav() {
  var burger = document.getElementById('navHamburger');
  var drawer = document.getElementById('navDrawer');
  if (!burger || !drawer) return;
  burger.addEventListener('click', function() {
    var open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
  });
  // close on outside click
  document.addEventListener('click', function(e) {
    if (!burger.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      burger.classList.remove('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initNav();

  // Modal close button
  var closeBtn = document.getElementById('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on overlay click
  var overlay = document.getElementById('postModal');
  if (overlay) overlay.addEventListener('click', function(e) { if (e.target === this) closeModal(); });

  // Close on Escape
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && _modalOpen) closeModal(); });
});
