import { Locale } from '@/dictionaries';
import TopBar from '@/components/TopBar';

export default async function TermsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;

  const isIcelandic = lang === 'is';

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <TopBar />

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-12">
          <h1 className="font-h1 text-h1 text-primary mb-4">
            {isIcelandic ? 'Notkunarskilmálar' : 'Terms of Service'}
          </h1>
          <p className="text-on-surface-variant">
            {isIcelandic ? 'Síðast uppfært: 3. maí 2026' : 'Last updated: May 3, 2026'}
          </p>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:font-h3 prose-headings:text-on-surface prose-p:text-on-surface-variant prose-li:text-on-surface-variant">
          {isIcelandic ? (
            <>
              <h2>1. Samþykki Skilmála</h2>
              <p>
                Með því að stofna aðgang á Spark eða nota þjónustuna, samþykkir þú þessa skilmála fyrir hönd þín og barns þíns. Þjónustan er rekin af Neðri Hóll Hugmyndahús ehf., kt. 470126-2480, Álfhólsvegi 97, 200 Kópavogi.
              </p>

              <h2>2. Ókeypis Beta Prófanir</h2>
              <p>
                Spark er sem stendur í lokaðri beta prófun og er því að fullu ókeypis fyrir alla þátttakendur. Engar greiðsluupplýsingar eru skráðar.
              </p>
              <ul>
                <li><strong>Lokun aðgangs:</strong> Þú getur hvenær sem er beðið um að aðgangi þínum og barnsins sé lokað með því að hafa samband við okkur.</li>
                <li><strong>Framtíðarverðlagning:</strong> Þegar beta prófunum lýkur mun Spark mögulega færast yfir í greidda áskriftarþjónustu, en það mun aldrei gerast sjálfkrafa eða án skýrs samþykkis þíns á þeim tímapunkti.</li>
              </ul>

              <h2>3. Notkun Barna og Ábyrgð Foreldra</h2>
              <p>
                Spark er hannað fyrir börn (10-14 ára), en <strong>aðeins foreldrar eða forráðamenn</strong> yfir 18 ára aldri mega stofna aðgang. Foreldrar bera ábyrgð á því að fylgjast með notkun barnsins á pallinum.
              </p>

              <h2>4. Gervigreind og Takmarkanir</h2>
              <p>
                Kerfið okkar notar gervigreind (AI). Þó við notum ströngustu öryggissíur frá Google (Safety Settings) og sértæk kerfisfyrirmæli til að takmarka svör, er gervigreind ekki óskeikul.
              </p>
              <ul>
                <li>Neðri Hóll Hugmyndahús ehf. tekur <strong>enga ábyrgð</strong> á svörum, ofskynjunum (hallucinations) eða efni sem gervigreindin gæti framleitt.</li>
                <li>Notkun kerfisins er á eigin ábyrgð.</li>
              </ul>

              <h2>5. Hugverkaréttindi</h2>
              <p>
                Allt efni á Spark (nema svör frá gervigreind og inntak notenda), þar með talið hönnun, lógó, kennsluefni og forritunarkóði, er eign Neðri Hóll Hugmyndahús ehf. og er varið af höfundarrétti.
              </p>

              <h2>6. Lokaorð</h2>
              <p>
                Brot á þessum skilmálum getur leitt til lokunar á aðgangi án endurgreiðslu. Þessir skilmálar lúta íslenskum lögum.
              </p>
            </>
          ) : (
            <>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By creating an account on Spark or using the service, you agree to these terms on behalf of yourself and your child. The service is operated by Neðri Hóll Hugmyndahús ehf., Álfhólsvegi 97, 200 Kópavogur, Iceland.
              </p>

              <h2>2. Free Beta Testing</h2>
              <p>
                Spark is currently in a closed beta testing phase and is completely free for all participants. No payment information is collected.
              </p>
              <ul>
                <li><strong>Account Termination:</strong> You may request to close your and your child's account at any time by contacting us.</li>
                <li><strong>Future Pricing:</strong> Once the beta testing period concludes, Spark may transition to a paid subscription service, but this will never happen automatically or without your explicit consent at that time.</li>
              </ul>

              <h2>3. Child Use and Parental Responsibility</h2>
              <p>
                Spark is designed for children (ages 10-14), but <strong>only parents or legal guardians</strong> over the age of 18 may create an account. Parents are responsible for monitoring their child's use of the platform.
              </p>

              <h2>4. Artificial Intelligence and Limitations</h2>
              <p>
                Our system utilizes Artificial Intelligence (AI). Although we use strict Google Safety Settings and specific system prompts to constrain responses, AI is not infallible.
              </p>
              <ul>
                <li>Neðri Hóll Hugmyndahús ehf. accepts <strong>no liability</strong> for responses, hallucinations, or content generated by the AI.</li>
                <li>Use of the system is at your own risk.</li>
              </ul>

              <h2>5. Intellectual Property</h2>
              <p>
                All content on Spark (excluding AI responses and user input), including design, logos, educational material, and code, is the property of Neðri Hóll Hugmyndahús ehf. and is protected by copyright law.
              </p>

              <h2>6. Conclusion</h2>
              <p>
                Violation of these terms may result in account termination without refund. These terms are governed by the laws of Iceland.
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
