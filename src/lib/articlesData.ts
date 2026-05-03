export type Article = {
  id: string;
  slug: string;
  date: string;
  readTime: number; // in minutes
  author: string;
  imageUrl: string;
  title: { is: string; en: string };
  excerpt: { is: string; en: string };
  content: { is: string; en: string }; // Markdown or HTML content
};

export const articlesData: Article[] = [
  {
    id: "art-01",
    slug: "gervigreind-sem-einkakennari",
    date: "2026-05-01",
    readTime: 6,
    author: "Þórarinn Hjálmarsson",
    imageUrl: "/images/blog/tutor.jpg",
    title: {
      is: "Gervigreind sem einkakennari: Hvernig á að tala við vélina",
      en: "AI as a Private Tutor: How to Talk to the Machine"
    },
    excerpt: {
      is: "Prompt Engineering er ekki bara fyrir forritara. Lærðu hvernig börn geta notað skipanir til að fá gagnrýna og uppbyggilega aðstoð við heimanámið, í stað þess að fá bara svörin afhent.",
      en: "Prompt Engineering isn't just for developers. Learn how children can use prompts to get critical and constructive homework help, rather than just being handed the answers."
    },
    content: {
      is: `
<h2>Hvað er Prompt Engineering?</h2>
<p>Þegar fyrstu mállíkönin (LLMs) komu á markaðinn töldu margir að þau væru í eðli sínu eins og leitarvélar: þú spyrð spurningar og færð svar. En sannleikurinn, líkt og rannsóknir hjá framsæknum gervigreindarfyrirtækjum eins og Anthropic sýna, er sá að <strong>þú færð nákvæmlega það svar sem þú biður um.</strong></p>

<p>Ef barn spyr: <em>"Hvað er 43 sinnum 12?"</em> þá mun vélin gefa svarið. Ef barnið spyr hins vegar: <em>"Ég er að reyna að margfalda 43 sinnum 12 en ég er dálítið föst. Geturðu hjálpað mér að setja upp dæmið skref fyrir skref án þess að gefa mér lokasvarið?"</em> þá umbreytist vélin úr reiknivél yfir í þolinmóðan einkakennara.</p>

<h2>Listin að spyrja rétt (AI Fluency)</h2>
<p>Þetta er nákvæmlega það sem við köllum <strong>AI Fluency</strong> eða stafrænt gervigreindarlæsi. Í heimi þar sem svörin eru alltaf til staðar, verður hæfnin til að <em>spyrja réttu spurninganna</em> mikilvægari en nokkru sinni fyrr.</p>
<p>Í Spark kerfinu okkar hönnum við svokölluð "system prompts" í bakendanum sem þvinga gervigreindina til að hegða sér eins og kennari (eða t.d. söguleg persóna). Hún gefur aldrei rétta svarið strax, heldur hrindir af stað rökræðum sem knýr barnið til að finna svarið sjálft.</p>

<h2>Hvernig þú getur æft þetta heima</h2>
<ul>
  <li><strong>Vertu sértækur (Be specific):</strong> Kenndu barninu að gefa gervigreindinni hlutverk. "Láttu eins og þú sért sögukennari að útskýra Víkingaöldina fyrir 12 ára krakka."</li>
  <li><strong>Bannaðu bein svör:</strong> Prófaðu að bæta við setningunni: "...en ekki gefa mér beint svar, spurðu mig frekar leiðandi spurninga."</li>
  <li><strong>Rökræddu við vélina:</strong> Hvetjið barnið til að skrifa: "Ég er ekki sammála þér, ég held að..." til að sjá hvernig vélin bregst við gagnrýninni hugsun.</li>
</ul>

<p>Að læra að stýra vélunum (Prompt Engineering) er mikilvægasta færni sem við getum kennt börnunum okkar í dag, og það er nákvæmlega það sem Spark snýst um.</p>
      `,
      en: `
<h2>What is Prompt Engineering?</h2>
<p>When large language models (LLMs) first entered the market, many thought of them as advanced search engines: you ask a question, you get an answer. But the truth, as research from forward-thinking AI companies like Anthropic shows, is that <strong>you get exactly the kind of answer you ask for.</strong></p>

<p>If a child asks: <em>"What is 43 times 12?"</em> the machine gives the answer. However, if the child asks: <em>"I'm trying to multiply 43 times 12 but I'm a bit stuck. Can you help me set up the problem step by step without giving me the final answer?"</em> the machine transforms from a calculator into a patient private tutor.</p>

<h2>The Art of Asking Correctly (AI Fluency)</h2>
<p>This is exactly what we call <strong>AI Fluency</strong>. In a world where answers are instantly available, the ability to <em>ask the right questions</em> becomes more important than ever.</p>
<p>In our Spark system, we design backend "system prompts" that force the AI to act like a teacher (or, for example, a historical figure). It never gives the correct answer right away; instead, it sparks a dialogue that pushes the child to find the answer themselves.</p>

<h2>How You Can Practice This at Home</h2>
<ul>
  <li><strong>Be specific:</strong> Teach your child to assign a role to the AI. "Act like a history teacher explaining the Viking Age to a 12-year-old."</li>
  <li><strong>Forbid direct answers:</strong> Try adding the sentence: "...but don't give me the direct answer, ask me leading questions instead."</li>
  <li><strong>Debate the machine:</strong> Encourage your child to write: "I disagree with you, I think..." to see how the machine reacts to critical thinking.</li>
</ul>

<p>Learning to guide these machines (Prompt Engineering) is the most critical skill we can teach our children today, and it is exactly what Spark is all about.</p>
      `
    }
  },
  {
    id: "art-02",
    slug: "oryggi-og-ofskynjanir-i-mallikonum",
    date: "2026-05-02",
    readTime: 8,
    author: "Þórarinn Hjálmarsson",
    imageUrl: "/images/blog/security.jpg",
    title: {
      is: "Öryggi og ofskynjanir (Hallucinations): Að kenna börnum að treysta en staðfesta",
      en: "Security and Hallucinations: Teaching Children to Trust but Verify"
    },
    excerpt: {
      is: "Af hverju lýgur gervigreindin stundum? Hvað eru ofskynjanir í mállíkönum og hvernig getum við notað þær sem kennslutæki fyrir gagnrýna hugsun hjá börnum?",
      en: "Why does AI sometimes lie? What are hallucinations in LLMs, and how can we use them as teaching moments for critical thinking in children?"
    },
    content: {
      is: `
<h2>Vandinn við ofskynjanir (Hallucinations)</h2>
<p>Öll stór mállíkön (eins og ChatGPT og Claude) eru þjálfuð á gífurlegu magni af texta af internetinu. Þau "skilja" ekki heiminn á sama hátt og við; þau spá frekar fyrir um næsta orð í setningu. Stundum leiðir þetta til þess að vélin setur fram röng gögn sem líta ótrúlega sannfærandi út. Þetta kallast ofskynjanir eða <strong>Hallucinations</strong>.</p>

<h2>Er þetta galli eða fídus?</h2>
<p>Hjá Spark lítum við ekki eingöngu á ofskynjanir sem galla, heldur sem <strong>kærkomið tækifæri til að æfa gagnrýna hugsun</strong> (Discernment í 4D rammanum okkar). Ef börn alast upp við þá trú að tölvan hafi alltaf rétt fyrir sér, er hætt við að þau verði auðtrúa gagnvart upplýsingaóreiðu (misinformation) framtíðarinnar.</p>

<h2>Að kenna heilbrigða tortryggni</h2>
<p>Eitt af mikilvægustu skrefunum í menntun nútímans er að læra að "treysta, en staðfesta" (Trust, but verify). Rannsóknir Anthropic á sviði AI öryggis sýna að jafnvel snjöllustu líkön geta gert villur þegar þau fara út fyrir sitt þekkingarsvið.</p>

<p>Í gegnum Spark verkefnin hvetjum við stundum til vafans. Við látum gervigreindina taka undir léleg rök, eða jafnvel reyna að "fela" svarið svo barnið þurfi sjálft að finna götin í rökfærslunni.</p>
<p>Þegar barnið þitt spjallar við vélina heima, hvettu það til að spyrja: <em>"Hvernig veistu það? Geturðu nefnt dæmi eða heimildir?"</em> Jafnvel þó gervigreindin komi með heimild, þá er það frábær æfing að fara út á Google og athuga hvort heimildin sé í raun og veru til.</p>
      `,
      en: `
<h2>The Problem with Hallucinations</h2>
<p>All large language models (like ChatGPT and Claude) are trained on massive amounts of text from the internet. They don't "understand" the world the way we do; rather, they predict the next word in a sequence. Sometimes, this leads the machine to present incorrect data that looks incredibly convincing. This is known as <strong>Hallucinations</strong>.</p>

<h2>Is this a Bug or a Feature?</h2>
<p>At Spark, we don't view hallucinations solely as a bug, but as a <strong>welcome opportunity to practice critical thinking</strong> (Discernment in our 4D framework). If children grow up believing the computer is always right, they risk becoming gullible to future misinformation.</p>

<h2>Teaching Healthy Skepticism</h2>
<p>One of the most important steps in modern education is learning to "trust, but verify." Anthropic's research in AI safety shows that even the smartest models can make errors when pushing the boundaries of their knowledge.</p>

<p>Through Spark's missions, we actively encourage skepticism. We sometimes have the AI agree with poor logic, or even try to "hide" the answer so the child has to find the holes in the argumentation themselves.</p>
<p>When your child chats with a machine at home, encourage them to ask: <em>"How do you know that? Can you provide examples or sources?"</em> Even if the AI provides a source, it's an excellent exercise to go out on Google and verify if that source actually exists.</p>
      `
    }
  },
  {
    id: "art-03",
    slug: "gagnrynin-hugsun-fyrir-framtidina",
    date: "2026-05-03",
    readTime: 5,
    author: "Þórarinn Hjálmarsson",
    imageUrl: "/images/blog/critical.jpg",
    title: {
      is: "Gagnrýnin hugsun: Lykilfærni 21. aldarinnar",
      en: "Critical Thinking: The Key Skill of the 21st Century"
    },
    excerpt: {
      is: "Þegar vélar geta svarað öllum spurningum, gert heimavinnuna og skrifað ritgerðirnar, hvaða færni situr þá eftir sem mannleg sérstaða? Gagnrýnin hugsun.",
      en: "When machines can answer any question, do homework, and write essays, what skill remains uniquely human? Critical thinking."
    },
    content: {
      is: `
<h2>Að hugsa utan rammans</h2>
<p>Skólakerfið hefur lengi treyst á að mæla þekkingu (minni) og hefðbundna færni í gegnum stöðluð próf. En með tilkomu gervigreindar hafa leikreglurnar breyst. Ef þekking er aðgengileg með einum smelli, þá er gildi þess að kunna upplýsingar utan að orðið mun minna en áður.</p>

<h2>Hvað á þá að kenna börnum?</h2>
<p>Gildi mannkyns í framtíðinni mun liggja í <strong>gagnrýnni hugsun, sköpunargáfu, og uppbyggilegri greiningu.</strong> Það er nákvæmlega þetta sem AI Fluency snýst um.</p>
<p>Börn þurfa að læra hvernig á að leysa flókin vandamál, hvernig á að samþætta upplýsingar úr mismunandi áttum, og mikilvægast af öllu, hvernig á að brjóta niður gervi-rök og upplýsingaóreiðu.</p>

<h2>Hlutverk Spark</h2>
<p>Markmið Spark er ekki að kenna börnum hvernig gervigreind er forrituð (þó það sé gagnlegt!), heldur er vélin sjálf notuð sem æfingasvæði. Með því að spjalla við sögulegar persónur eða leysa gátur sem vélin setur fram, þurfa börnin að efast, greina og beita eigin dómgreind. Þau eru að þjálfa "gagnrýna vöðvann" sinn.</p>
      `,
      en: `
<h2>Thinking Outside the Box</h2>
<p>The education system has long relied on measuring knowledge (memory) and traditional skills through standardized testing. But with the advent of AI, the rules of the game have changed. If knowledge is accessible with one click, the value of memorizing information is much lower than before.</p>

<h2>So What Should We Teach Children?</h2>
<p>The value of humanity in the future will lie in <strong>critical thinking, creativity, and constructive analysis.</strong> This is exactly what AI Fluency is about.</p>
<p>Children need to learn how to solve complex problems, how to integrate information from different sources, and most importantly, how to break down pseudo-logic and misinformation.</p>

<h2>The Role of Spark</h2>
<p>Spark's goal is not to teach children how AI is programmed (although that is useful!), rather the machine itself is used as a training ground. By chatting with historical figures or solving riddles presented by the machine, children must question, analyze, and apply their own judgment. They are training their "critical muscle."</p>
      `
    }
  },
  {
    id: "art-04",
    slug: "hvernig-virkja-llm",
    date: "2026-05-04",
    readTime: 7,
    author: "Þórarinn Hjálmarsson",
    imageUrl: "/images/blog/llm.jpg",
    title: {
      is: "Á mannamáli: Hvernig virka stór mállíkön (LLMs)?",
      en: "In Plain English: How Do Large Language Models (LLMs) Work?"
    },
    excerpt: {
      is: "Einföld og aðgengileg útskýring á því hvernig gervigreind hugsar. Engin tækniþekking nauðsynleg, bara forvitni um hvernig stærsta tæknibylting samtímans virkar.",
      en: "A simple and accessible explanation of how AI thinks. No technical knowledge required, just curiosity about how the greatest tech revolution of our time works."
    },
    content: {
      is: `
<h2>Vélræni Páfagaukurinn</h2>
<p>Það er stundum talað um stór mállíkön (Large Language Models eins og GPT-4 og Claude) sem mjög fleyga páfagauka. Þau "hugsa" ekki í mannskilningi. Í staðinn vinna þau með tölfræði. Þegar þau skrifa setningu eru þau einfaldlega að giska á hvaða orð ætti tölfræðilega séð að koma næst, byggt á því gífurlega magni texta sem þau hafa "lesið".</p>

<h2>Tokens (Orðahlutar)</h2>
<p>Gervigreindin les ekki heilu orðin. Hún brýtur þau niður í minni einingar sem kallast *tokens*. Eitt "token" gæti verið stutt orð ("og") eða hluti af lengra orði. Þegar þú skrifar spurningu, breytir vélin spurningunni í tokens, keyrir hana í gegnum tauganet (neural network) sem inniheldur milljarða af tengingum, og reiknar út hvaða token er líklegast til að fylgja.</p>

<h2>Alignment (Siðferðisþjálfun)</h2>
<p>Hvernig vitum við þá að vélin muni ekki segja eitthvað hræðilegt? Það er þar sem <em>Alignment</em> kemur inn. Fyrirtæki eins og Anthropic hafa verið leiðandi í að þróa aðferðir eins og <strong>Constitutional AI</strong>, þar sem líkaninu er kennd ákveðin "stjórnarskrá" eða siðareglur. Það þýðir að þegar það fær spurningu, þá skoðar það svar sitt gegn siðareglunum sínum áður en það skrifar svarið á skjáinn þinn.</p>

<h2>Af hverju skiptir þetta máli fyrir foreldra?</h2>
<p>Að vita að líkanið er "spá-vél" en ekki "staðreynda-vél" breytir því hvernig við og börnin okkar umgangast hana. Við ættum ekki að spyrja hana um nákvæmar staðreyndir án þess að sannreyna þær (út af ofskynjunum), heldur nota hana frekar til að <em>hugstorma, rökræða og læra tungumál.</em></p>
      `,
      en: `
<h2>The Mechanical Parrot</h2>
<p>Large language models (like GPT-4 and Claude) are sometimes referred to as highly eloquent parrots. They don't "think" in a human sense. Instead, they work with statistics. When they write a sentence, they are simply guessing which word statistically should come next, based on the massive amount of text they have "read."</p>

<h2>Tokens</h2>
<p>The AI doesn't read whole words. It breaks them down into smaller units called *tokens*. One token might be a short word ("and") or part of a longer word. When you type a question, the machine converts the question into tokens, runs it through a neural network containing billions of connections, and calculates which token is most likely to follow.</p>

<h2>Alignment</h2>
<p>So how do we know the machine won't say something terrible? That's where <em>Alignment</em> comes in. Companies like Anthropic have pioneered methods like <strong>Constitutional AI</strong>, where the model is taught a specific "constitution" or code of ethics. This means that when it receives a question, it checks its response against its ethical guidelines before printing the answer on your screen.</p>

<h2>Why Does This Matter for Parents?</h2>
<p>Knowing that the model is a "prediction machine" rather than a "fact machine" changes how we and our children interact with it. We shouldn't ask it for precise facts without verifying them (due to hallucinations); instead, we should use it to <em>brainstorm, debate, and learn language.</em></p>
      `
    }
  }
];
