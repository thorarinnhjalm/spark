import { Locale } from '@/dictionaries';
import TopBar from '@/components/TopBar';

export default async function PrivacyPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;

  const isIcelandic = lang === 'is';

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <TopBar />

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-12">
          <h1 className="font-h1 text-h1 text-primary mb-4">
            {isIcelandic ? 'Persónuverndarstefna' : 'Privacy Policy'}
          </h1>
          <p className="text-on-surface-variant">
            {isIcelandic ? 'Síðast uppfært: 3. maí 2026' : 'Last updated: May 3, 2026'}
          </p>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:font-h3 prose-headings:text-on-surface prose-p:text-on-surface-variant prose-li:text-on-surface-variant">
          {isIcelandic ? (
            <>
              <h2>1. Inngangur</h2>
              <p>
                Neðri Hóll Hugmyndahús ehf. ("við", "okkar", "Spark") tekur persónuvernd þína og barna þinna mjög alvarlega. Þessi persónuverndarstefna útskýrir hvernig við söfnum, notum og verndum upplýsingar þegar þú notar Spark piltvanginn. Við hönnuðum kerfið sérstaklega með persónuvernd barna í huga (í samræmi við GDPR-K).
              </p>

              <h2>2. Upplýsingar sem við söfnum</h2>
              <h3>Frá foreldrum:</h3>
              <ul>
                <li><strong>Reikningsupplýsingar:</strong> Netfang, nafn og lykilorð (dulkóðað) til að búa til aðgang.</li>
                <li><strong>Greiðsluupplýsingar:</strong> Greiðslur eru afgreiddar í gegnum þriðja aðila (Stripe eða Áskell). Við geymum engar kreditkortaupplýsingar á okkar netþjónum.</li>
              </ul>
              
              <h3>Frá börnum:</h3>
              <ul>
                <li><strong>Lágmarksgögn:</strong> Við söfnum aðeins gælunafni (sem foreldri getur valið) og aldri til að aðlaga erfiðleikastig. Engin netföng, engin símanúmer og engin persónugreinanleg gögn (PII) eru tekin frá börnum.</li>
                <li><strong>Notkunargögn:</strong> Sögur og svör sem barnið býr til inni í verkefnum (Missions) til að meta framfarir. Þessi gögn eru aðeins sýnileg foreldrum á mælaborðinu.</li>
              </ul>

              <h2>3. Notkun á Gervigreind (AI)</h2>
              <p>
                Spark notar Gemini (Google) gervigreindarlíkanið. Mikilvægt er að taka fram að:
              </p>
              <ul>
                <li><strong>Engin opinn samskipti:</strong> Börn geta ekki "spjallað" frjálst við gervigreindina. Öll samskipti eru takmörkuð innan ramma viðkomandi verkefnis.</li>
                <li><strong>Engin persónugögn deild:</strong> Upplýsingar frá börnum eru <em>ekki</em> notaðar til að þjálfa stóru málkönnunarlíkönin. Öll skilaboð eru send nafnlaust yfir dulkóðaða API-tengingu.</li>
              </ul>

              <h2>4. Deiling Upplýsinga</h2>
              <p>Við seljum aldrei persónuupplýsingar. Við deilum þeim einungis með samþykktum þjónustuaðilum (t.d. hýsingaraðilum) sem eru bundnir af sömu ströngu GDPR kröfunum, eða ef lög krefjast þess.</p>

              <h2>5. Þín Réttindi</h2>
              <p>
                Þú hefur rétt á að fá aðgang að, leiðrétta eða eyða öllum gögnum um þig eða barnið þitt. Ef þú vilt eyða aðganginum eða krefjast gagna, getur þú sent tölvupóst á <strong>privacy@spark-ai.is</strong> eða beint af foreldramælaborðinu.
              </p>

              <h2>6. Breytingar á stefnunni</h2>
              <p>
                Ef við gerum umtalsverðar breytingar á þessari stefnu munum við láta þig vita með tölvupósti eða tilkynningu inni í kerfinu.
              </p>
            </>
          ) : (
            <>
              <h2>1. Introduction</h2>
              <p>
                Neðri Hóll Hugmyndahús ehf. ("we", "our", "Spark") takes your and your children's privacy very seriously. This privacy policy explains how we collect, use, and protect information when you use the Spark platform. We designed the system specifically with children's privacy in mind (in compliance with GDPR-K).
              </p>

              <h2>2. Information We Collect</h2>
              <h3>From Parents:</h3>
              <ul>
                <li><strong>Account Information:</strong> Email address, name, and password (encrypted) to create an account.</li>
                <li><strong>Payment Information:</strong> Payments are processed via third-party providers (Stripe or Áskell). We do not store any credit card information on our servers.</li>
              </ul>
              
              <h3>From Children:</h3>
              <ul>
                <li><strong>Minimal Data:</strong> We only collect a nickname (which the parent can choose) and age to adjust difficulty levels. No emails, phone numbers, or personally identifiable information (PII) are collected from children.</li>
                <li><strong>Usage Data:</strong> Stories and answers the child generates within missions to assess progress. This data is only visible to parents on their dashboard.</li>
              </ul>

              <h2>3. Use of Artificial Intelligence (AI)</h2>
              <p>
                Spark utilizes the Gemini (Google) AI model. It is important to note that:
              </p>
              <ul>
                <li><strong>No open chat:</strong> Children cannot chat freely with the AI. All interactions are strictly constrained within the scope of the current mission.</li>
                <li><strong>No personal data shared:</strong> Information from children is <em>not</em> used to train foundational AI models. All messages are sent anonymously via an encrypted API connection.</li>
              </ul>

              <h2>4. Information Sharing</h2>
              <p>We never sell personal information. We only share it with approved service providers (e.g., hosting services) who are bound by the same strict GDPR requirements, or if required by law.</p>

              <h2>5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete any data regarding you or your child. If you wish to delete your account or request data, you can email <strong>privacy@spark-ai.com</strong> or do so directly from the parent dashboard.
              </p>

              <h2>6. Changes to Policy</h2>
              <p>
                If we make significant changes to this policy, we will notify you via email or through a notice within the platform.
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
