import { getDictionary, Locale } from '@/dictionaries';
import Link from 'next/link';
import TopBar from '@/components/TopBar';

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const t = dict.landing;

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-fixed min-h-screen pb-20 md:pb-0">
      <TopBar />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Header */}
        <header className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-caps text-label-caps uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            Spark Methodology
          </div>
          <h1 className="font-h1 text-h1 text-on-surface max-w-4xl mx-auto leading-tight">
            4D Ramminn: Leiðin að <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Gervigreindarlæsi</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Við kennum börnum ekki bara að nota gervigreind, heldur að skilja hana, stjórna henni og meta hana af gagnrýni.
          </p>
        </header>

        {/* Bento Grid Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* 1. Delegation */}
          <div className="md:col-span-8 glass-card rounded-[24px] p-md flex flex-col md:flex-row gap-8 items-center overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40">
            <div className="w-full md:w-1/2 space-y-4 order-2 md:order-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_turned_in</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">1. Delegation (Verkfela)</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Að læra hvaða verkefni henta gervigreind og hver eiga að vera í okkar höndum. Við hvetjum til samvinnu þar sem vélin vinnur vinnuna en barnið stýrir ferlinu.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> Hugmyndavinna</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> Gagnaúrvinnsla</li>
                <li className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="material-symbols-outlined text-sm">check_circle</span> Skapandi uppköst</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-full relative order-1 md:order-2">
              <img className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl" alt="Delegation" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD68FDU1kI3qnTAU3TNdrJtCcfl1a6595TPXnE7mt5sXMJt_B7wxjUD069rNrsn_R7NRXAoavQpazLG5B0yn4KWMxqQYuPPZ13iQWpZwqQIlQjlGzh4FhKjWkT2jgUrFdZ7W9WY_NfxOiU_OJL78W_HJUqpIApqTUoh4FA7nJsZEDFvAoEmWBxzLdszhH4I-nIcWHzI-HKcijjmpduKgZAAnpJ71Kejuez7ap8qyxj2fsTot6WJvqk4nNCS79pk3S0sWA4y6ktdlAFh"/>
            </div>
          </div>

          {/* 2. Description */}
          <div className="md:col-span-4 glass-card rounded-[24px] p-md bg-gradient-to-br from-violet-50/50 to-white border border-white/40">
            <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
              <img className="w-full h-full object-cover" alt="Description" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3vKX4Nhjqdg4ew_Y1XWvjsqiPCRJ79UcGGv8pdpMabws97j5SVZtebC2tit6SZjIS8GxSvsjmVchgPcz_rEXByTZWo8zqAjpA_SF5xG9hgLuuJ59LzQQ7r8TeznIBBP798RVowFmeUmmh7tCE5G-ecQ6tInC5iVwNrDqf7YXMq9T3z8bVlv_ernsztVMH1yQsujR8eBRoTHS2JQI-lgtUZwJnP1sOWK2a3_97qvv_Up8PPwPO6hA7EwFSoB05QcYJ_W0rFQJLTlp5"/>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">2. Description (Lýsing)</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Listin að eiga samskipti við tæknina. Skýrar skipanir og nákvæmt málfar eru lykillinn að árangri í gervigreindarheimi.
              </p>
            </div>
          </div>

          {/* 3. Discernment */}
          <div className="md:col-span-4 glass-card rounded-[24px] p-md flex flex-col justify-between bg-white/70 border border-white/40">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">3. Discernment (Aðgreining)</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Gagnrýnin hugsun er kjarninn. Við kennum börnum að bera kennsl á villur, hlutdrægni og meta sannleiksgildi þess sem gervigreindin skilar.
              </p>
            </div>
            <div className="mt-8 p-4 bg-white/50 rounded-xl border border-white/80 shadow-inner">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-tighter text-on-surface-variant">Sannleiksmat í rauntíma</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* 4. Diligence */}
          <div className="md:col-span-8 glass-card rounded-[24px] p-md flex flex-col md:flex-row gap-8 items-center bg-white shadow-xl shadow-primary/5 border border-white/40">
            <div className="w-full md:w-2/5 h-64 md:h-full relative">
              <img className="absolute inset-0 w-full h-full object-cover rounded-2xl" alt="Diligence" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0JB_viD8d-gt9Id37dxC0H1CIxp7rYBtbe09GRztQo2sefKHGJdmafepSn6GihTMz3xB2TG1THWsSwKkCBDpr1yJYdvgcm_12vY9tKwaYq35qSom3EHEGvxnSbJuM-UFn7ETDSYRH4-n124T-jb3z0ooYCxx8KIQE_rc_iWIsb1DfUAM80hYwpNzPQtXj7wXepdF7gnkKsjoqQDKXYnpVT4RMUTcwep0HX6G2C4_8EEhcMwV7S1Mhg2jJf66wBDAnRraM9l5YQqg7"/>
            </div>
            <div className="w-full md:w-3/5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
              </div>
              <h3 className="font-h3 text-h3 text-on-surface">4. Diligence (Iðni)</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Lokafrágangur og ábyrgð. Barnið á lokaorðið og ber ábyrgð á úttakinu. Við leggjum áherslu á að fínpússa, yfirfara og gera verkefnið að sínu eigin.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-3 bg-primary-fixed/30 rounded-lg">
                  <span className="block text-xl font-bold text-primary">100%</span>
                  <span className="text-[10px] uppercase font-bold text-primary-container">Eignarhald</span>
                </div>
                <div className="p-3 bg-secondary-fixed/30 rounded-lg">
                  <span className="block text-xl font-bold text-secondary">0%</span>
                  <span className="text-[10px] uppercase font-bold text-on-secondary-fixed-variant">Afritun</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Educational Value Section */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="font-h2 text-h2 text-on-surface mb-4">Öryggi og menntunargildi</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Við byggjum Spark á traustum grunni þar sem siðfræði og öryggi fara saman.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30">
              <div className="mb-6 w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px]">verified_user</span>
              </div>
              <h4 className="font-h3 text-[20px] mb-3">Lokað vistkerfi</h4>
              <p className="text-on-surface-variant text-sm">Öruggt umhverfi þar sem gögn barna eru aldrei notuð til að þjálfa opinber líkön eða seld þriðja aðila.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30">
              <div className="mb-6 w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[32px]">psychology</span>
              </div>
              <h4 className="font-h3 text-[20px] mb-3">Kollsteypt nám</h4>
              <p className="text-on-surface-variant text-sm">Í stað þess að fá svörin, læra börnin að spyrja réttu spurninganna og þróa með sér dýpri skilning.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-surface-container-low border border-outline-variant/30">
              <div className="mb-6 w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600 text-[32px]">family_restroom</span>
              </div>
              <h4 className="font-h3 text-[20px] mb-3">Gegnsæi foreldra</h4>
              <p className="text-on-surface-variant text-sm">Fullkomið yfirlit yfir framfarir og samskipti barnsins, með verkfærum til að ræða tæknina heima.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 p-lg rounded-[40px] bg-gradient-to-br from-primary to-primary-container text-white overflow-hidden relative">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-h1 text-[40px] leading-tight mb-6">Tilbúin að kveikja neistann?</h2>
            <p className="text-primary-fixed text-body-lg mb-10 opacity-90">Skráðu barnið þitt í framtíðina í dag og sjáðu hvernig 4D ramminn okkar umbreytir forvitni í færni.</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${lang}/login`} className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                Byrjaðu núna
              </Link>
              <Link href={`/${lang}/join`} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                Krakkar: Spila
              </Link>
            </div>
          </div>
          <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-secondary-container/30 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute right-10 bottom-[-20%] w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none"></div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 py-12 border-t border-slate-200 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-8">
          <div className="space-y-4">
            <div className="text-lg font-bold text-slate-900 dark:text-white">Spark AI Fluency</div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500 max-w-xs">© 2026 Spark AI Fluency. Empowering the next generation.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-slate-900">Resources</h5>
              <nav className="flex flex-col gap-2">
                <Link className="text-slate-400 hover:text-violet-500 transition-colors text-xs" href="#">Parent Guide</Link>
                <Link className="text-slate-400 hover:text-violet-500 transition-colors text-xs" href="#">Help Center</Link>
              </nav>
            </div>
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-slate-900">Legal</h5>
              <nav className="flex flex-col gap-2">
                <Link className="text-slate-400 hover:text-violet-500 transition-colors text-xs" href="#">Privacy Policy</Link>
                <Link className="text-slate-400 hover:text-violet-500 transition-colors text-xs" href="#">Terms of Service</Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
