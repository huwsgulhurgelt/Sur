/* =============================================================================
   posts.js — EDIT YOUR POSTS HERE
   =============================================================================

   HOW TO ADD A POST:
   Copy the template at the bottom, fill it in, done.

   FIELDS:
     id          — unique string, no spaces (e.g. "tips-003")          REQUIRED
     category    — "informations" | "tips" | "advices"                 REQUIRED
     sub         — subcategory for informations page (see list below)   optional
                   "scholarship-mongolia" | "scholarship-abroad"
                   "career-path" | "anti-bullying-bad" | "anti-bullying-stop"
     title       — headline                                             REQUIRED
     description — full content. Use \n for line breaks                 REQUIRED
     author      — name shown on the card                               optional
     date        — "YYYY-MM-DD"                                         optional
   ============================================================================= */

var POSTS = [

  /* ── SCHOLARSHIP IN MONGOLIA ────────────────────────────────────────────── */
  {
    id:          "info-schol-mn-001",
    category:    "informations",
    sub:         "scholarship-mongolia",
    title:       "Ерөнхийлөгчийн тэтгэлэг",
    description: "Монгол Улсын Ерөнхийлөгчийн нэрэмжит тэтгэлэг нь онцгой амжилт гаргасан оюутнуудад олгогддог.\n\nШалгуур:\n- ЭЕШ-д өндөр оноо авсан байх\n- Нийгмийн идэвхтэй оролцоо\n- Санхүүгийн хэрэгцээ\n\nДэлгэрэнгүй мэдээллийг Боловсролын яамны веб сайтаас авна уу.",
    author:      "Team",
    date:        "2025-02-01",
  },
  {
    id:          "info-schol-mn-002",
    category:    "informations",
    sub:         "scholarship-mongolia",
    title:       "Засгийн газрын тэтгэлэг",
    description: "Монгол Улсын Засгийн газраас санхүүждэг тэтгэлэг нь дараах чиглэлийн оюутнуудад зориулагдсан.\n\nЧиглэлүүд:\n- Инженер технологи\n- Анагаах ухаан\n- Хөдөө аж ахуй\n- Багш мэргэжил\n\nЖил бүр элсэлт авдаг тул хугацааг алдалгүй бүртгүүлнэ үү.",
    author:      "Team",
    date:        "2025-02-05",
  },
  {
    id:          "info-schol-mn-003",
    category:    "informations",
    sub:         "scholarship-mongolia",
    title:       "Аймаг, нийслэлийн тэтгэлэг",
    description: "Орон нутгийн засаг захиргааны байгууллагуудаас тухайн аймаг, дүүргийнхнээ дэмжих зорилгоор олгодог тэтгэлэгүүд.\n\nДавуу тал:\n- Өрсөлдөөн бага\n- Орон нутгийн оюутнуудад давуу эрх\n\nАймгийнхаа Засаг даргын тамгын газарт хандана уу.",
    author:      "Team",
    date:        "2025-02-08",
  },
  {
    id:          "info-schol-mn-004",
    category:    "informations",
    sub:         "scholarship-mongolia",
    title:       "Дотоодын болон Засгийн газрын бүрэн тэтгэлгүүд",
    description: "Монгол Улсад жил бүр зарлагддаг гол тэтгэлэгт хөтөлбөрүүд:\n\n• Монгол Улсын Ерөнхийлөгчийн 'Илгээлт 2100' (Бакалавр)\n• Монгол Улсын Засгийн газрын 'Ирээдүйн эзэд / Сургалтын төлбөрийн тэтгэлэг'\n\nАймаг, нийслэлийн болон бусад төрийн сангийн тэтгэлгүүдэд хугацаанд нь амжиж бүртгүүлээрэй.",
    author:      "Team",
    date:        "2026-10-05",
  },

  /* ── SCHOLARSHIP ABROAD ─────────────────────────────────────────────────── */
  {
    id:          "info-schol-ab-001",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "Солонгос улсын тэтгэлэг (GKS)",
    description: "Korean Government Scholarship Program нь Монгол оюутнуудад нээлттэй.\n\nДэлгэрэнгүй:\n- Бүрэн тэтгэлэг: сургалтын төлбөр + амьдрах зардал\n- Солонгос хэлний сургалт багтана\n- Хугацаа: Жил бүрийн 9-р сарын сүүлчээр\n\nЭлсэлтийн шалгалт болон ярилцлагад бэлдэж эхлэ.",
    author:      "Team",
    date:        "2025-02-10",
  },
  {
    id:          "info-schol-ab-002",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "MEXT — Японы засгийн газрын тэтгэлэг",
    description: "Японы Боловсролын яамны (MEXT) тэтгэлэг нь дэлхийн хамгийн нэр хүндтэй тэтгэлгүүдийн нэг.\n\nОнцлог:\n- Бүрэн тэтгэлэг\n- Японы хэлний дагалдах сургалт\n- Суурь болон магистрын түвшин\n\nЭлсэлтийн материалыг Монгол дахь Японы элчин сайдын яамнаас авна.",
    author:      "Team",
    date:        "2025-02-14",
  },
  {
    id:          "info-schol-ab-003",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "Чехийн засгийн газрын тэтгэлэг",
    description: "Чехийн Засгийн газраас хөгжиж буй орнуудын оюутнуудад олгодог тэтгэлэг.\n\nДавуу тал:\n- Европт суралцах боломж\n- Англи болон Чех хэл дээрх хөтөлбөрүүд\n- Хагас болон бүрэн тэтгэлэгтэй сонголтууд\n\nДэлгэрэнгүй: mzv.gov.cz",
    author:      "Team",
    date:        "2025-02-18",
  },
  {
    id:          "info-schol-ab-004",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "Гадаад орнуудын Засгийн газрын тэтгэлгүүдийн жагсаалт",
    description: "Дэлхийн томоохон орнуудын Засгийн газраас зарладаг бүрэн тэтгэлэгт хөтөлбөрүүд:\n\n• USA: Global UGRAD, Fulbright\n• Japan: MEXT\n• Korea: GKS (Global Korea Scholarship)\n• Hungary: Stipendium Hungaricum\n• China: CSC (China Scholarship Council)\n• UK: Chevening\n• Australia: Australia Awards\n\nБүртгэл ихэвчлэн 9-өөс 1-р сарын хооронд явагддаг тул эртнээс бэлтгэлээ хангаарай.",
    author:      "Team",
    date:        "2026-10-05",
  },
  {
    id:          "info-schol-ab-005",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "Харвардын Их Сургуулийн Бүрэн Тэтгэлэг (Harvard HFAI)",
    description: "Сургууль: Harvard University (АНУ, Cambridge, MA)\nТэтгэлэг: Harvard Financial Aid Initiative (HFAI / Need-Based Aid)\nТөрөл: Бүрэн тэтгэлэг (Need-Blind Admission & Full Need Covered - Жилд $85,000+)\nТүвшин: Бакалавр (Bachelor of Arts in Economics г.м, 4 жил)\nХэл: Англи хэл\n\nТЭТГЭЛЭГТ ХАМРАГДАХ ЗҮЙЛС:\n- Сургалтын төлбөр: 100% бүрэн даана\n- Амьргааны зардал: $3,500 - $4,000\n- Байр болон хоол: Кампус доторх байр, хоол 100%\n- Замын зардал: Жилд 2 удаагийн ирэх, буцах нислэгийн тийз\n- Даатгал: Harvard Student Health Insurance Plan 100%\n\nБҮРДҮҮЛЭХ МАТЕРИАЛ БА ШААРДЛАГА:\n1. Анкет: Common Application / Coalition Application\n2. GPA: 3.9 - 4.0 (Unweighted) эсвэл 95%+\n3. Оноо: IELTS 7.5+, TOEFL iBT 100+, SAT 1490-1580\n4. Эссэ: Common App эссэ + Harvard Supplemental Essays\n5. Тодорхойлох захидал: 3 ширхэг (1 зөвлөх, 2 багш)\n6. Бусад: Манлайлал, сайн дурын ажил, олимпиад, портфолио\n7. Санхүү: CSS Profile ба эцэг эхийн орлогын тодорхойлолт\n\nХУГАЦАА:\n- Эхлэх: 8 сарын 1\n- Early Action (REA): 11 сарын 1 (Хариу: 12 сарын дунд)\n- Regular Decision (RD): 1 сарын 1 (Хариу: 3 сарын сүүлч)",
    author:      "Team",
    date:        "2026-10-05",
  },

  /* ── CAREER PATH ────────────────────────────────────────────────────────── */
  {
    id:          "info-career-001",
    category:    "informations",
    sub:         "career-path",
    title:       "How to determine your future career and the factors you should consider when choosing",
    description: "Choosing a career is one of the biggest decisions you will make. Consider these key factors:\n\n1. Your genuine interests — what do you do when nobody is watching?\n2. Your natural strengths — what comes easy to you that others find difficult?\n3. Market demand — will this field have jobs in 5-10 years?\n4. Lifestyle fit — does the career match the life you want?\n5. Values alignment — does the work feel meaningful to you?\n\nTake your time. It is okay to change direction as you learn more about yourself.",
    author:      "Team",
    date:        "2025-01-05",
  },
  {
    id:          "info-career-002",
    category:    "informations",
    sub:         "career-path",
    title:       "Хичээл сонголт хэрхэн хийх вэ",
    description: "Зөв хичээл сонгох нь таны карьерын замд чухал үүрэг гүйцэтгэнэ.\n\nАнхаарах зүйлс:\n- Мэргэжлийнхээ үндсэн хичээлүүдийг заавал судлаарай\n- Хажуугийн ур чадвар (нягтлан, програмчлал) нэмэлт давуу тал болно\n- Дадлагын байгууллагуудтай холбоо барина уу\n- Менторийн зөвлөгөөг чухалчлаарай",
    author:      "Team",
    date:        "2025-01-10",
  },
  {
    id:          "info-career-003",
    category:    "informations",
    sub:         "career-path",
    title:       "Why it is okay to choose non popular careers despite the society's expectations",
    description: "Society often pushes students toward a narrow list of 'acceptable' careers. But the world needs people in every field.\n\nThink about it:\n- Every popular career field will eventually become overcrowded\n- Unusual careers often pay very well precisely because few people pursue them\n- Passion and skill in an unpopular field beats disinterest in a popular one\n- Your happiness matters more than what sounds impressive at dinner\n\nDo your research. Make a plan. Trust yourself.",
    author:      "Team",
    date:        "2025-01-15",
  },
  {
    id:          "info-career-004",
    category:    "informations",
    sub:         "career-path",
    title:       "Мэргэжил ба Хичээл сонголт",
    description: "Мэргэжил сонголт ба Хөдөлмөрийн зах зээл:\n\n• Ойрын 10–20 жилийн эрэлт хэрэгцээ ба AI-ийн нөлөө:\nМэдээллийн технологи, сэргээгдэх эрчим хүч, биотехнологи болон эрүүл мэндийн салбарын эрэлт тогтвортой өснө. Давтагддаг ажиллагаатай салбарууд AI-д орлогдох эрсдэлтэй тул бүтээлч сэтгэлгээ, шийдвэр гаргах чадвараа бэхжүүлэх хэрэгтэй.\n\n• Цалин ба Гадаад/Дотоодод ажиллах боломж:\nIT, инженерийн салбарт зайнаас (remote) болон гадаадад ажиллах боломж хамгийн өндөр байдаг.\n\n• Сонирхол ба Чадвараа ажилд хөрвүүлэх:\nӨөрийн сонирхдог хоббиг зах зээлийн бодит чадвар (hard skill) болгон хөгжүүлэх шаардлагатай.\n\n• Тохирсон сургуулиа олох:\nСургуулийн рейтингээс гадна тухайн сургуулийн лабораторийн бааз, багшлах бүрэлдэхүүн, төгсөгчдийн ажилд орсон хувь хэмжээг харах нь чухал.",
    author:      "Team",
    date:        "2026-10-05",
  },
  {
    id:          "info-career-005",
    category:    "informations",
    sub:         "career-path",
    title:       "Хичээл сонголт ба ЭЕШ-ын бэлтгэл",
    description: "Салбар хоорондын ялгаа ба ЭЕШ-ын онцлогууд:\n\n1. Салбар хоорондын ялгаа:\n- STEM: Шинжлэх ухаан, технологи, инженерчлэл, математик.\n- Humanities: Хүмүүнлэг (Хэл, уран зохиол, түүх).\n- Social Sciences: Нийгмийн шинжлэх ухаан (Эдийн засаг, сэтгэл судлал).\n\n2. ЭЕШ-ын босго ба Суурь хичээлүүд:\n- Инженер / IT / STEM: Математик, Физик, Англи хэл.\n- Анагаах / Биологи: Биологи, Хими.\n- Нийгэм / Бизнес: Математик, Нийгэм судлал, Англи хэл.\n\n3. Улсын ба Хувийн сургуулийн ялгаа:\n- Улсын сургууль: Сургалтын орчин дадлагажсан, академик суурь сайтай.\n- Хувийн сургууль: Жижиг анги, практик болон англи хэлний орчин сайн.",
    author:      "Team",
    date:        "2026-10-05",
  },

  /* ── ANTI BULLYING — BAD RESULTS ────────────────────────────────────────── */
  {
    id:          "info-bully-bad-001",
    category:    "informations",
    sub:         "anti-bullying-bad",
    title:       "Mental health consequences",
    description: "Bullying causes serious and lasting mental health damage to victims.\n\nCommon effects:\n- Anxiety and chronic stress\n- Depression and low self-worth\n- Social withdrawal and isolation\n- Post-traumatic stress symptoms\n- Difficulty trusting others\n\nThese effects can persist well into adulthood if not addressed.",
    author:      "Team",
    date:        "2025-03-01",
  },
  {
    id:          "info-bully-bad-002",
    category:    "informations",
    sub:         "anti-bullying-bad",
    title:       "Impact on academic performance",
    description: "Students who experience bullying consistently perform worse academically.\n\nResearch shows:\n- Difficulty concentrating in class\n- Increased absenteeism to avoid bullies\n- Reduced participation and engagement\n- Long-term disruption to educational attainment",
    author:      "Team",
    date:        "2025-03-05",
  },

  /* ── ANTI BULLYING — HOW TO STOP ────────────────────────────────────────── */
  {
    id:          "info-bully-stop-001",
    category:    "informations",
    sub:         "anti-bullying-stop",
    title:       "Speak up and report",
    description: "Silence allows bullying to continue. Speaking up is the most powerful first step.\n\nWhat you can do:\n- Tell a teacher, counselor, or trusted adult immediately\n- Document incidents with dates and details\n- Encourage bystanders to report what they see\n- Use anonymous reporting systems if available",
    author:      "Team",
    date:        "2025-03-08",
  },
  {
    id:          "info-bully-stop-002",
    category:    "informations",
    sub:         "anti-bullying-stop",
    title:       "Build a supportive community",
    description: "The best prevention for bullying is a culture where everyone feels they belong.\n\nPractical steps:\n- Include classmates who seem isolated\n- Celebrate differences instead of mocking them\n- Be the person who steps in when you see something wrong\n- Build friendships across different social groups",
    author:      "Team",
    date:        "2025-03-12",
  },

  /* ── TIPS ───────────────────────────────────────────────────────────────── */
  {
    id:          "tips-001",
    category:    "tips",
    title:       "The Pomodoro arga",
    description: "5min amraad 20 min ium hii.\n\nwhy it works:\n- iheer n suralgui baga baga aar surhaar sain\n- Reduces mental fatigue\n- Creates a sense of urgency that helps focus\n\nUse a simple timer on your phone. The key is to stop when it goes off, even mid-sentence.",
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
  {
    id:          "tips-003",
    category:    "tips",
    sub:         "scholarship-abroad",
    title:       "Тэтгэлгийн шаардлага ба Бүрдүүлэх зүйлс (Guide & Checklist)",
    description: "Тэтгэлэгт өрсөлдөхөд шаардагдах үндсэн шалгуурууд болон бэлтгэх алхмууд:\n\nШаардлагууд (Requirements):\n- Академик дүн (GPA): Бакалаврт 3.0+, Магистрт 3.2+ байх нь давуу тал болно.\n- Хэлний оноо: IELTS (6.5+), TOEFL iBT (80+), эсвэл тухайн орны хэлний төвшин (HSK, TOPIK, JLPT).\n- Эсээ ба Тодорхойлох захидал (SOP / Recommendation Letter): Өөрийн зорилго, нийгмийн оролцоо, яагаад тухайн мэргэжлийг сонгосон бэ гэдгээ тодорхойлох 1-2 эсээ.\n- Нийгмийн идэвхи (Extracurriculars): Волонтер, сайн дурын ажил, төсөл хөтөлбөрийн туршлага.\n\nХэрэгжүүлэх Алхмууд (Checklist):\n1. Бакалавр эсвэл Магистрын түвшнээ тодорхойлох.\n2. Жил бүрийн Засгийн газрын болон сургуулийн тэтгэлгийн хугацааг (Deadline) календарь дээрээ тэмдэглэх.\n3. Хэлний бэлтгэлээ хагас эсвэл нэг жилийн өмнөөс хангаж эхлэх.",
    author:      "Team",
    date:        "2026-10-05",
  },

  /* ── ADVICES ────────────────────────────────────────────────────────────── */
  {
    id:          "adv-001",
    category:    "advices",
    title:       "shalgaltiin stress",
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
  }

];

/*
    SHARED HELPERS — do not edit below
*/

var CAT_LABELS = {
  informations: "Informations",
  tips:         "Tips",
  advices:      "Advices",
};

var CAT_DESCS = {
  informations: "General knowledge and information shared by students.",
  tips:         "Study techniques, productivity strategies, and methods that work.",
  advices:      "Advice on managing school life, stress, habits, and growth.",
};

function getPostsByCategory(cat) {
  return POSTS.filter(function(p) { return p.category === cat; });
}

/* Filter by category AND subcategory */
function getPostsBySub(cat, sub) {
  return POSTS.filter(function(p) { return p.category === cat && p.sub === sub; });
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
  var list = document.getElementById('commentsList');
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
