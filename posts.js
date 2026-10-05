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
    author:      "Баг",
    date:        "2025-02-01",
  },
  {
    id:          "info-schol-mn-002",
    category:    "informations",
    sub:         "scholarship-mongolia",
    title:       "Засгийн газрын тэтгэлэг",
    description: "Монгол Улсын Засгийн газраас санхүүждэг тэтгэлэг нь дараах чиглэлийн оюутнуудад зориулагдсан.\n\nЧиглэлүүд:\n- Инженер технологи\n- Анагаах ухаан\n- Хөдөө аж ахуй\n- Багш мэргэжил\n\nЖил бүр элсэлт авдаг тул хугацааг алдалгүй бүртгүүлнэ үү.",
    author:      "Баг",
    date:        "2025-02-05",
  },
  {
    id:          "info-schol-mn-003",
    category:    "informations",
    sub:         "scholarship-mongolia",
    title:       "Аймаг, нийслэлийн тэтгэлэг",
    description: "Орон нутгийн засаг захиргааны байгууллагуудаас тухайн аймаг, дүүргийнхээ сурагчдыг дэмжих зорилгоор олгодог тэтгэлэгүүд.\n\nДавуу тал:\n- ӨРСӨЛДӨӨН бага\n- Орон нутгийн оюутнуудад давуу эрх олгоно\n\nАймгийнхаа Засаг даргын тамгын газарт хандана уу.",
    author:      "Баг",
    date:        "2025-02-08",
  },
  {
    id:          "info-schol-mn-004",
    category:    "informations",
    sub:         "scholarship-mongolia",
    title:       "Дотоодын болон Засгийн газрын бүрэн тэтгэлгүүд",
    description: "Монгол Улсад жил бүр зарлагддаг гол тэтгэлэгт хөтөлбөрүүд:\n\n• Монгол Улсын Ерөнхийлөгчийн 'Илгээлт 2100' (Бакалавр)\n• Монгол Улсын Засгийн газрын 'Ирээдүйн эзэд / Сургалтын төлбөрийн тэтгэлэг'\n\nАймаг, нийслэлийн болон бусад төрийн сангийн тэтгэлгүүдэд хугацаанд нь амжиж бүртгүүлээрэй.",
    author:      "Баг",
    date:        "2026-10-05",
  },

  /* ── SCHOLARSHIP ABROAD ─────────────────────────────────────────────────── */
  {
    id:          "info-schol-ab-001",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "Солонгос улсын тэтгэлэг (GKS)",
    description: "Korean Government Scholarship Program (GKS) нь Монгол оюутнуудад зориулсан бүрэн тэтгэлэгт хөтөлбөр юм.\n\nДэлгэрэнгүй:\n- Бүрэн тэтгэлэг: сургалтын төлбөр + амьдрах зардал\n- Солонгос хэлний сургалт багтсан\n- Хугацаа: Жил бүрийн 9-р сарын сүүлээс бүртгэл эхэлдэг\n\nЭлсэлтийн шалгалт болон ярилцлагад эртнээс бэлдэж эхлээрэй.",
    author:      "Баг",
    date:        "2025-02-10",
  },
  {
    id:          "info-schol-ab-002",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "MEXT — Японы засгийн газрын тэтгэлэг",
    description: "Японы Боловсролын яамны (MEXT) тэтгэлэг нь дэлхийн хамгийн нэр хүндтэй тэтгэлгүүдийн нэг юм.\n\nОнцлог:\n- Бүрэн тэтгэлэгтэй\n- Япон хэлний дагалдах сургалттай\n- Суурь болон магистрын түвшинд олгогддог\n\nЭлсэлтийн материалыг Монгол дахь Японы Элчин сайдын яамны сайтаас авна уу.",
    author:      "Баг",
    date:        "2025-02-14",
  },
  {
    id:          "info-schol-ab-003",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "Чехийн засгийн газрын тэтгэлэг",
    description: "Чехийн Засгийн газраас хөгжиж буй орнуудын оюутнуудад олгодог тэтгэлэгт хөтөлбөр.\n\nДавуу тал:\n- Европт үнэ төлбөргүй суралцах боломж\n- Англи болон Чех хэл дээрх хөтөлбөрүүд\n- Сар бүрийн стипенди олгодог\n\nДэлгэрэнгүй мэдээллийг mzv.gov.cz хуудаснаас харна уу.",
    author:      "Баг",
    date:        "2025-02-18",
  },
  {
    id:          "info-schol-ab-004",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "Гадаад орнуудын Засгийн газрын тэтгэлгүүдийн жагсаалт",
    description: "Дэлхийн томоохон орнуудын Засгийн газраас зарладаг бүрэн тэтгэлэгт хөтөлбөрүүд:\n\n• АНУ: Global UGRAD, Fulbright\n• Япон: MEXT\n• Солонгос: GKS (Global Korea Scholarship)\n• Унгар: Stipendium Hungaricum\n• Хятад: CSC (China Scholarship Council)\n• Их Британи: Chevening\n• Австрали: Australia Awards\n\nБүртгэл ихэвчлэн 9-өөс 1-р сарын хооронд явагддаг тул эртнээс бэлтгэлээ хангаарай.",
    author:      "Баг",
    date:        "2026-10-05",
  },
  {
    id:          "info-schol-ab-005",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "Харвардын Их Сургуулийн Бүрэн Тэтгэлэг (Harvard HFAI)",
    description: "Сургууль: Harvard University (АНУ, Cambridge, MA)\nТэтгэлэг: Harvard Financial Aid Initiative (HFAI / Need-Based Aid)\nТөрөл: Бүрэн тэтгэлэг (Need-Blind Admission & Full Need Covered - Жилд $85,000+)\nТүвшин: Бакалавр (Bachelor of Arts in Economics г.м, 4 жил)\nХэл: Англи хэл\n\nТЭТГЭЛЭГТ ХАМРАГДАХ ЗҮЙЛС:\n- Сургалтын төлбөр: 100% бүрэн даана\n- Амьргааны зардал: $3,500 - $4,000\n- Байр болон хоол: Кампус доторх байр, хоол 100%\n- Замын зардал: Жилд 2 удаагийн ирэх, буцах нислэгийн тийз\n- Даатгал: Harvard Student Health Insurance Plan 100%\n\nБҮРДҮҮЛЭХ МАТЕРИАЛ БА ШААРДЛАГА:\n1. Анкет: Common Application / Coalition Application\n2. GPA: 3.9 - 4.0 (Unweighted) эсвэл 95%+\n3. Оноо: IELTS 7.5+, TOEFL iBT 100+, SAT 1490-1580\n4. Эссэ: Common App эссэ + Harvard Supplemental Essays\n5. Тодорхойлох захидал: 3 ширхэг (1 зөвлөх, 2 багш)\n6. Бусад: Манлайлал, сайн дурын ажил, олимпиад, портфолио\n7. Санхүү: CSS Profile ба эцэг эхийн орлогын тодорхойлолт\n\nХУГАЦАА:\n- Эхлэх: 8 сарын 1\n- Early Action (REA): 11 сарын 1 (Хариу: 12 сарын дунд)\n- Regular Decision (RD): 1 сарын 1 (Хариу: 3 сарын сүүлч)",
    author:      "Баг",
    date:        "2026-10-05",
  },
  {
    id:          "info-schol-ab-006",
    category:    "informations",
    sub:         "scholarship-abroad",
    title:       "Германы Академийн Солилцооны Албаны Тэтгэлэг (DAAD)",
    description: "Германы их дээд сургуулиудад суралцах хүсэлтэй оюутнуудад зориулсан DAAD тэтгэлэгт хөтөлбөр.\n\nДавуу талууд:\n- Сар бүрийн амьргааны стипенди (860€ - 1200€)\n- Эрүүл мэндийн болон осол эрсдэлийн даатгал\n- Ирэх буцах замын зардал\n- Герман эсвэл Англи хэл дээрх хөтөлбөрүүдээс сонгох боломжтой\n\nШалгуур:\n- Магистр ба Докторантурт голчлон олгогдоно\n- Бакалаврын голч 3.0-аас дээш байх\n- Англи эсвэл Герман хэлний C1/B2 түвшний сертификаттай байх.",
    author:      "Баг",
    date:        "2026-10-05",
  },

  /* ── CAREER PATH ────────────────────────────────────────────────────────── */
  {
    id:          "info-career-001",
    category:    "informations",
    sub:         "career-path",
    title:       "Ирээдүйн мэргэжлээ хэрхэн зөв сонгох вэ?",
    description: "Мэргэжил сонголт нь таны амьдралын хамгийн чухал шийдвэрүүдийн нэг юм. Дараах хүчин зүйлсийг анхаарч үзээрэй:\n\n1. Таны жинхэнэ сонирхол — Та чөлөөт цагаараа юу хийх дуртай вэ?\n2. Таны төрөлхийн авьяас — Бусад хүмүүст хэцүү санагддаг зүйл танд амархан байдаг уу?\n3. Зах зээлийн эрэлт — Ирээдүйн 5-10 жилд энэ мэргэжил эрэлттэй байж чадах уу?\n4. Амьдралын хэв маяг — Таны хүсэж буй амьдралын хэв маягт тохирох уу?\n\nЯарах хэрэггүй. Өөрийгөө илүү сайн нээж илрүүлэх тусам чиглэлээ өөрчлөх нь хэвийн зүйл юм.",
    author:      "Баг",
    date:        "2025-01-05",
  },
  {
    id:          "info-career-002",
    category:    "informations",
    sub:         "career-path",
    title:       "Хичээл сонголт хэрхэн хийх вэ",
    description: "Зөв хичээл сонгох нь таны карьерын замд чухал үүрэг гүйцэтгэнэ.\n\nАнхаарах зүйлс:\n- Мэргэжлийнхээ үндсэн хичээлүүдийг заавал судлаарай\n- Хажуугийн ур чадвар (нягтлан, програмчлал) нэмэлт давуу тал болно\n- Дадлагын байгууллагуудтай холбоо барина уу\n- Менторийн зөвлөгөөг чухалчлаарай",
    author:      "Баг",
    date:        "2025-01-10",
  },
  {
    id:          "info-career-003",
    category:    "informations",
    sub:         "career-path",
    title:       "Нийгмийн хүлээлтээс өөр, ховор мэргэжил сонгох нь яагаад буруу биш вэ?",
    description: "Нийгэм ихэнхдээ биднийг цөөн хэдэн 'хүндтэй' гэгдэх мэргэжил рүү шахаж байдаг. Гэвч нийгэмд салбар бүрийн мэргэжилтэн хэрэгтэй.\n\nБодоод үз дээ:\n- Алдартай мэргэжлүүд хэзээ нэгэн цагт ханалтад ордог\n- Ховор мэргэжил нь өрсөлдөөн багатай, өндөр цалинтай байх боломжтой\n- Өөрийн сонирхдог чиглэлд заавал амжилт олдог\n- Бусдад сүржин харагдахаас илүү таны сэтгэл ханамж чухал\n\nСудалгаа хий. Төлөвлөгөө зохио. Өөртөө итгэ.",
    author:      "Баг",
    date:        "2025-01-15",
  },
  {
    id:          "info-career-004",
    category:    "informations",
    sub:         "career-path",
    title:       "Мэргэжил ба Хичээл сонголт",
    description: "Мэргэжил сонголт ба Хөдөлмөрийн зах зээл:\n\n• Ойрын 10–20 жилийн эрэлт хэрэгцээ ба AI-ийн нөлөө:\nМэдээллийн технологи, сэргээгдэх эрчим хүч, биотехнологи болон эрүүл мэндийн салбарын эрэлт тогтвортой өснө. Давтагддаг ажиллагаатай салбарууд AI-д орлогдох эрсдэлтэй тул бүтээлч сэтгэлгээ, шийдвэр гаргах чадвараа бэхжүүлэх хэрэгтэй.\n\n• Цалин ба Гадаад/Дотоодод ажиллах боломж:\nIT, инженерийн салбарт зайнаас (remote) болон гадаадад ажиллах боломж хамгийн өндөр байдаг.\n\n• Сонирхол ба Чадвараа ажилд хөрвүүлэх:\nӨөрийн сонирхдог хоббиг зах зээлийн бодит чадвар (hard skill) болгон хөгжүүлэх шаардлагатай.\n\n• Тохирсон сургуулиа олох:\nСургуулийн рейтингээс гадна тухайн сургуулийн лабораторийн бааз, багшлах бүрэлдэхүүн, төгсөгчдийн ажилд орсон хувь хэмжээг харах нь чухал.",
    author:      "Баг",
    date:        "2026-10-05",
  },
  {
    id:          "info-career-005",
    category:    "informations",
    sub:         "career-path",
    title:       "Хичээл сонголт ба ЭЕШ-ын бэлтгэл",
    description: "Салбар хоорондын ялгаа ба ЭЕШ-ын онцлогууд:\n\n1. Салбар хоорондын ялгаа:\n- STEM: Шинжлэх ухаан, технологи, инженерчлэл, математик.\n- Humanities: Хүмүүнлэг (Хэл, уран зохиол, түүх).\n- Social Sciences: Нийгмийн шинжлэх ухаан (Эдийн засаг, сэтгэл судлал).\n\n2. ЭЕШ-ын босго ба Суурь хичээлүүд:\n- Инженер / IT / STEM: Математик, Физик, Англи хэл.\n- Анагаах / Биологи: Биологи, Хими.\n- Нийгэм / Бизнес: Математик, Нийгэм судлал, Англи хэл.\n\n3. Улсын ба Хувийн сургуулийн ялгаа:\n- Улсын сургууль: Сургалтын орчин дадлагажсан, академик суурь сайтай.\n- Хувийн сургууль: Жижиг анги, практик болон англи хэлний орчин сайн.",
    author:      "Баг",
    date:        "2026-10-05",
  },

  /* ── ANTI BULLYING — BAD RESULTS ────────────────────────────────────────── */
  {
    id:          "info-bully-bad-001",
    category:    "informations",
    sub:         "anti-bullying-bad",
    title:       "Сэтгэцийн эрүүл мэндэд үзүүлэх хор уршиг",
    description: "Уе тэнгийн дээрэлхэлт нь хохирогчид урт хугацааны гүн гүнзгий сэтгэл зүйн хохирол учруулдаг.\n\nТүгээмэл илрэх сөрөг нөлөө:\n- Үргэлжийн айдас, сэтгэл зангирах стресс\n- Сэтгэл гутрал, өөрийгөө үнэлэх үнэлэмж буурах\n- Бусдаас тусгаарлагдах, нийгмийн харилцаанаас зайлсхийх\n- Сэтгэцийн гэмтлийн дараах стресс (PTSD)\n- Бусдад итгэхэд хэцүү болох\n\nЭнэхүү сөрөг нөлөө нь насанд хүрсэн хойно нь ч хадгалагдан үлддэг тул эрт сэргийлэх хэрэгтэй.",
    author:      "Баг",
    date:        "2025-03-01",
  },
  {
    id:          "info-bully-bad-002",
    category:    "informations",
    sub:         "anti-bullying-bad",
    title:       "Сурлагын амжилтад үзүүлэх сөрөг нөлөө",
    description: "Дээрэлхэлтэд өртсөн сурагчдын академик амжилт байнга буурдаг болохыг судалгаанууд харуулдаг.\n\nҮүнд:\n- Ангидаа анхаарлаа төвлөрүүлж чадахгүй байх\n- Хичээлээ таслах, сургуульдаа явахаас айх\n- Идэвх оролцоо эрс буурах\n- Ирээдүйн боловсрол эзэмших боломжийг хязгаарлах",
    author:      "Баг",
    date:        "2025-03-05",
  },

  /* ── ANTI BULLYING — HOW TO STOP ────────────────────────────────────────── */
  {
    id:          "info-bully-stop-001",
    category:    "informations",
    sub:         "anti-bullying-stop",
    title:       "Дуугүй байж болохгүй: Тэдэнд мэдэгдэж, тусламж хүс",
    description: "Анир суваггүй байх нь дээрэлхэгчдийг улам өгөөшүүлдэг. Дуу хоолойгоо хүргэх нь үүнийг зогсоох хамгийн эхний чухал алхам юм.\n\nТа юу хийж чадах вэ:\n- Багш, нийгмийн ажилтан эсвэл итгэдэг насанд хүрсэн хүндээ шууд хэл\n- Болсон явдлын огноо, нарийн ширийнийг тэмдэглэж ав\n- Г Too зайд хараад зогсож буй бусад хүмүүсийг тусламж дуудахад уриал\n- Нууцлалтай тусламжийн утас/бүртгэлийг ашиглах",
    author:      "Баг",
    date:        "2025-03-08",
  },
  {
    id:          "info-bully-stop-002",
    category:    "informations",
    sub:         "anti-bullying-stop",
    title:       "Дэмжлэгтэй, найртай хүрээллийг бий болгох",
    description: "Дээрэлхэлтээс сэргийлэх хамгийн сайн арга бол хүн бүр өөрийгөө үнэ цэнэтэй гэж мэдрэх орчныг бүрдүүлэх явдал юм.\n\nБодит алхмууд:\n- Ганцаардсан ангийнхантайгаа ярилцаж, хамт байх\n- Бусдын ялгаатай байдлыг шоолох биш хүндэтгэх\n- Буруу зүйл харсан үедээ дуугүй өнгөрөхгүй байх\n- Төрөл бүрийн сонирхолтой хүүхдүүдтэй найзлах",
    author:      "Баг",
    date:        "2025-03-12",
  },

  /* ── TIPS ───────────────────────────────────────────────────────────────── */
  {
    id:          "tips-001",
    category:    "tips",
    title:       "Помодоро (Pomodoro) техник",
    description: "25 минут төвлөрөн хичээллээд 5 минут амрах арга.\n\nЯагаад үр дүнтэй вэ:\n- Нэг дор их ачаалал авалгүй бага багаар сурахад тусална\n- Тархины ядаргааг бууруулна\n- Богино хугацаанд төвлөрөх чадварыг нэмэгдүүлнэ\n\nУтасны таймераа тохируулаад туршаад үзээрэй.",
    author:      "Баг",
    date:        "2025-01-08",
  },
  {
    id:          "tips-002",
    category:    "tips",
    title:       "Давтамжтай санах арга (Spaced Repetition)",
    description: "Мэдээллийг өдөр бүр шахмал байдлаар цээжлэх биш, тодорхой хугацааны зайтай (1 өдөр, 3 өдөр, 1 долоо хоног, 2 долоо хоногийн дараа) давтах арга юм.\n\nЭнэ арга нь ой санамжид мэдээллийг урт хугацаатай хадгалахад хамгийн сайн шалгарсан аргуудын нэг юм.\n\nAnki эсвэл Quizlet зэрэг апп ашиглаж болно.",
    author:      "Баг",
    date:        "2025-01-12",
  },
  {
    id:          "tips-003",
    category:    "tips",
    sub:         "scholarship-abroad",
    title:       "Тэтгэлгийн шаардлага ба Бүрдүүлэх зүйлс (Guide & Checklist)",
    description: "Тэтгэлэгт өрсөлдөхөд шаардагдах үндсэн шалгуурууд болон бэлтгэх алхмууд:\n\nШаардлагууд (Requirements):\n- Академик дүн (GPA): Бакалаврт 3.0+, Магистрт 3.2+ байх нь давуу тал болно.\n- Хэлний оноо: IELTS (6.5+), TOEFL iBT (80+), эсвэл тухайн орны хэлний төвшин (HSK, TOPIK, JLPT).\n- Эсээ ба Тодорхойлох захидал (SOP / Recommendation Letter): Өөрийн зорилго, нийгмийн оролцоо, яагаад тухайн мэргэжлийг сонгосон бэ гэдгээ тодорхойлох 1-2 эсээ.\n- Нийгмийн идэвхи (Extracurriculars): Волонтер, сайн дурын ажил, төсөл хөтөлбөрийн туршлага.\n\nХэрэгжүүлэх Алхмууд (Checklist):\n1. Бакалавр эсвэл Магистрын түвшнээ тодорхойлох.\n2. Жил бүрийн Засгийн газрын болон сургуулийн тэтгэлгийн хугацааг (Deadline) календарь дээрээ тэмдэглэх.\n3. Хэлний бэлтгэлээ хагас эсвэл нэг жилийн өмнөөс хангаж эхлэх.",
    author:      "Баг",
    date:        "2026-10-05",
  },
  {
    id:          "tips-004",
    category:    "tips",
    title:       "Бие даан Англи хэл сурах үр дүнтэй 4 зөвлөгөө",
    description: "Шинэ хэл сурахад өдөр тутмын жижиг зуршлууд хамгийн чухал:\n\n1. Shadowing арга: Подкаст болон бичлэг сонсонгоо тухайн хүний яриа, дуудлагыг яг ижилхэн дагаж чангаар хэлэх.\n2. Аппликейшн ашиглах: Anki, Duolingo, ELSA Speak зэргээр үгсийн фондоо тэлэх.\n3. Орчноо бүрдүүлэх: Утасныхаа хэлийг англи болгож, үзэж буй кино, бичлэгээ англи хадмалтайгаар үзэх.\n4. Өдөр бүр 10 минут бичих: Англиар богино өдрийн тэмдэглэл бичиж хэвших.",
    author:      "Баг",
    date:        "2026-10-05",
  },

  /* ── ADVICES ────────────────────────────────────────────────────────────── */
  {
    id:          "adv-001",
    category:    "advices",
    title:       "Шалгалтын стрессээ хэрхэн удирдах вэ?",
    description: "Шалгалтын өмнө стрессдэх нь хэвийн зүйл. Гол нь үүнийг өөртөө ашигтайгаар хянах хэрэгтэй.\n\nПрактик алхмууд:\n1. Хичээл хийх хуваариа доад тал нь 2 долоо хоногийн өмнө зохиох\n2. 7-8 цаг заавал унтаж амрах (унтах үед ой санамж батаждаг)\n3. Өдөр бүр хөнгөн дасгал хийж, салхилах\n4. Хэт их сандарвал ойр дотны хүнтэйгээ ярилцах\n\nНэг удаагийн шалгалтын дүн таны бүх амьдралыг тодорхойлохгүй гэдгийг санаарай.",
    author:      "Баг",
    date:        "2025-01-15",
  },
  {
    id:          "adv-002",
    category:    "advices",
    title:       "Тогтвортой суралцах зуршлыг төлөвшүүлэх",
    description: "Урам зориг (Motivation) ирж буцдаг. Харин Зуршил (Habit) таныг тасралтгүй урагшлуулагч хүч юм.\n\nБагаас эхэл: Өдөр бүр яг нэг цагт ердөө 15 минут төвлөрч хичээл хийж хэвш. Дараа нь хугацаагаа бага багаар уртасга.\n\nОрчин чухал: Хичээл хийх тусгай цэвэрхэн ширээ болон орчин нь таны тархинд 'одоо хичээллэх цаг' гэсэн дохио өгдөг.",
    author:      "Баг",
    date:        "2025-01-20",
  },
  {
    id:          "adv-003",
    category:    "advices",
    title:       "Хичээл хойшлуулах (Procrastination) зуршлаас хэрхэн гарах вэ?",
    description: "Хичээл эсвэл даалгаврыг хойшлуулах нь залихайн шинж биш, харин сэтгэл зүйн дарамт болон айдастай холбоотой байдаг.\n\nШийдэл:\n- 5 секундын дүрэм: Бодож суулгүйгээр 5, 4, 3, 2, 1 гээд шууд хийж эхлэх.\n- Даалгаврыг жижиглэх: 'Эсээ бичих' гэхийн оронд 'Эхний 2 өгүүлбэрийг бичих' гэж жижиг зорилго тавих.\n- Саатуулж буй зүйлсийг холдуулах: Хичээл хийх үедээ утсаа өөр өрөөнд үлдээх.",
    author:      "Баг",
    date:        "2026-10-05",
  }

];

/*
    SHARED HELPERS — do not edit below
*/

var CAT_LABELS = {
  informations: "Мэдээлэл",
  tips:         "Зөвлөмж",
  advices:      "Зөвлөгөө",
};

var CAT_DESCS = {
  informations: "Оюутан залууст зориулсан ерөнхий мэдээлэл болон суралцах боломжууд.",
  tips:         "Суралцах аргууд, бүтээмж дээшлүүлэх техникүүд.",
  advices:      "Сургуулийн амьдрал, стресс менежмент болон хувь хүний хөгжлийн зөвлөгөө.",
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
    return d.toLocaleDateString('mn-MN', { year:'numeric', month:'long', day:'numeric' });
  } catch(e) { return str; }
}

function excerpt(str, max) {
  max = max || 140;
  var s = (str || '').replace(/\n/g, ' ');
  return s.length > max ? s.slice(0, max).trimEnd() + '...' : s;
}

/* ── Firebase comments ── */
var _commentsDb = null;
var _commentsAuth = null;
var _commentsAuthReady = null;
var _commentsCurrentUser = null;

async function initCommentsFirebase() {
  if (_commentsAuthReady) return _commentsAuthReady;

  _commentsAuthReady = (async function() {
    var config = await import('./firebase-config.js');
    var authModule = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
    var firestore = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

    _commentsDb = config.db;
    _commentsAuth = config.auth;

    return await new Promise(function(resolve) {
      var unsubscribe = authModule.onAuthStateChanged(_commentsAuth, function(user) {
        _commentsCurrentUser = user || null;
        unsubscribe();
        resolve(_commentsCurrentUser);
      });

      authModule.onAuthStateChanged(_commentsAuth, function(user) {
        _commentsCurrentUser = user || null;
      });
    });
  })();

  return _commentsAuthReady;
}

async function getCurrentCommentUser() {
  await initCommentsFirebase();
  return _commentsCurrentUser || (_commentsAuth ? _commentsAuth.currentUser : null);
}

async function loadComments(postId) {
  var list = document.getElementById('commentsList');
  if (!list) return [];

  try {
    await initCommentsFirebase();
    var firestore = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
    var snapshot = await firestore.getDocs(
      firestore.query(
        firestore.collection(_commentsDb, 'article_comments'),
        firestore.where('postId', '==', postId)
      )
    );

    var comments = snapshot.docs.map(function(doc) {
      return Object.assign({ id: doc.id }, doc.data());
    });

    comments.sort(function(a, b) {
      var aTime = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
      var bTime = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
      return aTime - bTime;
    });

    renderCommentsList(comments);
    return comments;
  } catch (e) {
    console.error('Could not load comments:', e);
    list.innerHTML = '<div class="no-comments">Could not load comments.</div>';
    return [];
  }
}

function renderCommentsList(comments) {
  var list = document.getElementById('commentsList');
  if (!list) return;

  if (!comments.length) {
    list.innerHTML = '<div class="no-comments">Сэтгэгдэл байхгүй байна.</div>';
    return;
  }

  list.innerHTML = '';
  comments.forEach(function(c) {
    var item = document.createElement('div');
    item.className = 'comment-item';
    var dateText = '';
    if (c.createdAt && c.createdAt.toDate) {
      dateText = c.createdAt.toDate().toLocaleDateString();
    }
    item.innerHTML =
      '<div class="comment-name">' + escHtml(c.name || 'User') + '</div>' +
      '<div class="comment-text">' + escHtml(c.text || '') + '</div>' +
      '<div class="comment-date">' + escHtml(dateText) + '</div>';
    list.appendChild(item);
  });
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
    '<div class="post-card-meta"><span>' + meta + '</span><span class="post-card-read">Унших</span></div>';
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
  loadComments(post.id);

  var form = document.getElementById('commentForm');
  if (form) {
    form.onsubmit = async function(e) {
      e.preventDefault();

      var user = await getCurrentCommentUser();
      if (!user) {
        alert('You need to sign in to comment.');
        return;
      }

      var textEl = document.getElementById('commentText');
      var text = textEl ? textEl.value.trim() : '';
      if (!text || text.length > 1000) return;

      var button = form.querySelector('button[type="submit"]');
      if (button) { button.disabled = true; button.textContent = 'Posting...'; }

      try {
        var firestore = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
        await firestore.addDoc(firestore.collection(_commentsDb, 'article_comments'), {
          postId: post.id,
          category: post.category || '',
          authorId: user.uid,
          name: user.displayName || user.email || 'User',
          text: text,
          createdAt: firestore.serverTimestamp()
        });

        form.reset();
        await loadComments(post.id);
      } catch (err) {
        console.error('Could not post comment:', err);
        alert('Could not post comment.');
      } finally {
        if (button) { button.disabled = false; button.textContent = 'Post comment'; }
      }
    };
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
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
