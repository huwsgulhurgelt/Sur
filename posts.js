/* =============================================================================
   posts.js — EDIT YOUR POSTS HERE
   =============================================================================

   HOW TO ADD A POST:
   Copy the template at the bottom of POSTS, fill it in, done.

   FIELDS:
     id          — unique string, no spaces (e.g. "tips-003")        REQUIRED
     category    — "informations" | "tips" | "advices" | "teachers"  REQUIRED
     title       — headline                                           REQUIRED
     description — full content. Use \n for line breaks              REQUIRED
     author      — name shown on the card                            optional
     date        — "YYYY-MM-DD"                                      optional

   HOW TO DELETE:  Remove the whole { ... }, block.
   HOW TO EDIT:    Just change the text inside the quotes.
   ============================================================================= */

var POSTS = [

  /* ── INFORMATIONS ──────────────────────────────────────────────────────── */
  {
    id:          "info-001",
    category:    "informations",
    title:       "What is active learning?",
    description: "Active learning is an approach where students engage directly with the material rather than passively listening.\n\nTechniques include:\n- Summarising in your own words\n- Teaching the concept to someone else\n- Practice problems and quizzes\n- Group discussion\n\nResearch consistently shows active learning leads to better long-term retention compared to re-reading notes.",
    author:      "Team",
    date:        "2025-01-05",
  },
  {
    id:          "info-002",
    category:    "informations",
    title:       "How memory works",
    description: "Memory is not a single system. Psychologists distinguish between short-term memory, which holds about 7 items for around 20 seconds, and long-term memory, which can last a lifetime.\n\nThe transfer from short-term to long-term memory is strengthened by:\n- Repetition over time (spaced practice)\n- Connecting new information to existing knowledge\n- Emotion and personal relevance\n\nUnderstanding this helps you study smarter, not harder.",
    author:      "Team",
    date:        "2025-01-10",
  },

  /* ── TIPS ──────────────────────────────────────────────────────────────── */
  {
    id:          "tips-001",
    category:    "tips",
    title:       "The Pomodoro Technique",
    description: "Work in focused 25-minute blocks, then take a 5-minute break. After four blocks, take a longer 15-30 minute break.\n\nWhy it works:\n- Breaks tasks into manageable chunks\n- Reduces mental fatigue\n- Creates a sense of urgency that helps focus\n\nUse a simple timer on your phone. The key is to stop when it goes off, even mid-sentence.",
    author:      "Team",
    date:        "2025-01-08",
  },
  {
    id:          "tips-002",
    category:    "tips",
    title:       "Spaced repetition",
    description: "Instead of studying the same material every day, review it at increasing intervals — after 1 day, then 3 days, then 1 week, then 2 weeks.\n\nThis exploits the spacing effect: memories are stronger when formed over multiple spaced sessions rather than one long session.\n\nFree tools like Anki automate this scheduling for you.",
    author:      "Team",
    date:        "2025-01-12",
  },

  /* ── ADVICES ───────────────────────────────────────────────────────────── */
  {
    id:          "adv-001",
    category:    "advices",
    title:       "Managing exam stress",
    description: "Stress before exams is normal. The goal is not to eliminate it but to keep it at a productive level.\n\nPractical steps:\n1. Plan your revision schedule at least two weeks ahead\n2. Sleep 7-8 hours — sleep consolidates memory\n3. Exercise daily, even a short walk helps\n4. Talk to someone if you feel overwhelmed\n\nOne exam does not define your future.",
    author:      "Team",
    date:        "2025-01-15",
  },
  {
    id:          "adv-002",
    category:    "advices",
    title:       "Building consistent study habits",
    description: "Motivation comes and goes. Habits are what keep you going when motivation is low.\n\nStart small. Commit to just 15 minutes of focused study at the same time each day. Once the habit is formed, gradually increase the duration.\n\nEnvironment matters too — a dedicated, tidy study space signals to your brain that it is time to focus.",
    author:      "Team",
    date:        "2025-01-20",
  },

  /* ── FOR TEACHERS ──────────────────────────────────────────────────────── */
  {
    id:          "teach-001",
    category:    "teachers",
    title:       "Giving effective feedback",
    description: "Effective feedback is specific, timely, and actionable.\n\nInstead of: 'Good work.'\nTry: 'Your argument in the second paragraph is strong. The third paragraph would be clearer if you added a concrete example.'\n\nFeedback should tell students:\n1. What they did well\n2. What needs improvement\n3. How to improve it\n\nFocus on two or three key points per piece of work — feedback overload is counterproductive.",
    author:      "Team",
    date:        "2025-01-22",
  },

  /*
  ── ADD A NEW POST — copy this block and fill it in ─────────────────────────

  {
    id:          "",        // unique, no spaces  e.g. "tips-003"
    category:    "",        // informations | tips | advices | teachers
    title:       "",
    description: "",        // use \n for line breaks
    author:      "",
    date:        "",        // YYYY-MM-DD
  },

  ──────────────────────────────────────────────────────────────────────────── */
];

/* =============================================================================
   SHARED HELPERS — do not edit below
   ============================================================================= */

var CAT_LABELS = {
  informations: "Informations",
  tips:         "Tips",
  advices:      "Advices",
  teachers:     "For Teachers",
};

var CAT_DESCS = {
  informations: "General knowledge and information shared by students.",
  tips:         "Study techniques, productivity strategies, and methods that work.",
  advices:      "Advice on managing school life, stress, habits, and growth.",
  teachers:     "Resources, strategies, and ideas for educators.",
};

function getPostsByCategory(cat) {
  return POSTS.filter(function(p) { return p.category === cat; });
}

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(str) {
  if (!str) return '';
  try {
    var d = new Date(str);
    return d.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  } catch(e) { return str; }
}

function excerpt(str, max) {
  max = max || 140;
  var s = (str || '').replace(/\n/g, ' ');
  return s.length > max ? s.slice(0, max).trimEnd() + '...' : s;
}

/* ── localStorage comments ── */
function getComments(postId) {
  try { return JSON.parse(localStorage.getItem('comments_' + postId)) || []; }
  catch(e) { return []; }
}
function saveComments(postId, comments) {
  try { localStorage.setItem('comments_' + postId, JSON.stringify(comments)); } catch(e) {}
}

/* ── Build card element ── */
function buildCard(post, onClickFn) {
  var card = document.createElement('article');
  card.className = 'post-card';
  var meta = '';
  if (post.author) meta += escHtml(post.author);
  if (post.date)   meta += (post.author ? ' · ' : '') + formatDate(post.date);
  card.innerHTML =
    '<div class="post-card-cat">'     + escHtml(CAT_LABELS[post.category] || post.category) + '</div>' +
    '<div class="post-card-title">'   + escHtml(post.title) + '</div>' +
    '<div class="post-card-excerpt">' + escHtml(excerpt(post.description)) + '</div>' +
    '<div class="post-card-meta"><span>' + meta + '</span><span class="post-card-read">Read</span></div>';
  card.addEventListener('click', function() { onClickFn(post); });
  return card;
}

/* ── Modal ── */
var _activePostId = null;

function openModal(post) {
  _activePostId = post.id;
  var overlay = document.getElementById('postModal');
  if (!overlay) return;
  document.getElementById('modalCat').textContent   = CAT_LABELS[post.category] || post.category;
  document.getElementById('modalTitle').textContent = post.title;
  var meta = '';
  if (post.author) meta += post.author;
  if (post.date)   meta += (post.author ? ' — ' : '') + formatDate(post.date);
  document.getElementById('modalMeta').textContent    = meta;
  document.getElementById('modalContent').textContent = post.description;
  renderComments(post.id);

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
  var list     = document.getElementById('commentsList');
  if (!list) return;
  var comments = getComments(postId);
  if (!comments.length) {
    list.innerHTML = '<div class="no-comments">No comments yet.</div>';
    return;
  }
  list.innerHTML = '';
  comments.forEach(function(c) {
    var item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML =
      '<div class="comment-name">' + escHtml(c.name) + '</div>' +
      '<div class="comment-text">' + escHtml(c.text) + '</div>' +
      '<div class="comment-date">' + (c.date ? formatDate(c.date.split('T')[0]) : '') + '</div>';
    list.appendChild(item);
  });
}

function closeModal() {
  var overlay = document.getElementById('postModal');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
  _activePostId = null;
}

/* ── Nav hamburger ── */
function initNav() {
  var burger = document.getElementById('navHamburger');
  var drawer = document.getElementById('navDrawer');
  if (!burger || !drawer) return;
  burger.addEventListener('click', function() {
    var open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
  });
  document.addEventListener('click', function(e) {
    if (!burger.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      burger.classList.remove('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initNav();
  var closeBtn = document.getElementById('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  var overlay = document.getElementById('postModal');
  if (overlay) overlay.addEventListener('click', function(e) { if (e.target === this) closeModal(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && _activePostId) closeModal(); });
});
