// ===================================================================
//  Le Monde de Fabienne — generateur du site (LocWeb, 2026-10-14)
//     node build.mjs          -> apercu (noindex)
//     PROD=1 node build.mjs   -> mise en ligne (lemondedefabienne.fr)
//  Tout le contenu vient de ses reseaux (Facebook, Instagram) et du
//  registre des entreprises : rien d'invente. Son adresse personnelle
//  n'apparait pas, seulement sa commune.
// ===================================================================
import fs from 'node:fs';
import path from 'node:path';

const ICI = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const PROD = process.env.PROD === '1';
const URL_SITE = PROD ? 'https://www.lemondedefabienne.fr/' : 'https://shigyn.github.io/Fabienne/';
const PHOTOS = JSON.parse(fs.readFileSync(path.join(ICI, '_source', 'photos.json'), 'utf8'));
const V = '2';

const E = {
  nom: 'Le Monde de Fabienne',
  devise: 'Fleurs, pâtisseries et décorations',
  prenom: 'Fabienne',
  dirigeante: 'Fabienne Kluth',
  siret: '106 596 216 00015',
  tel: '06 62 05 10 17',
  telLien: '+33662051017',
  email: 'contact@lemondedefabienne.fr',
  ville: 'Saint-Sébastien-de-Morsent',
  codePostal: '27180',
  departement: 'Eure',
  facebook: 'https://www.facebook.com/p/Le-monde-de-Fabienne-61570727814528/',
  instagram: 'https://www.instagram.com/le_monde_de_fabienne/',
};

// Les commandes passent par WhatsApp (formule sans abonnement : pas de
// paiement en ligne, Fabienne gere ses commandes et sa facturation).
const wa = (texte) => `https://wa.me/33662051017?text=${encodeURIComponent(texte)}`;
const WA_BONJOUR = wa('Bonjour Fabienne, je viens de votre site et je voudrais passer une commande : ');

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (ch) => URL_SITE + ch;
function img(r, nom, alt, { eager = false, sizes = '(min-width: 900px) 40vw, 100vw', cls = '' } = {}) {
  const p = PHOTOS[nom];
  if (!p) throw new Error('photo inconnue : ' + nom);
  const srcset = p.l > 800 ? ` srcset="${r}photos/${nom}-800.webp 800w, ${r}photos/${nom}-1600.webp ${p.l}w" sizes="${sizes}"` : '';
  return `<img${cls ? ` class="${cls}"` : ''} src="${r}photos/${nom}-800.webp"${srcset} alt="${esc(alt)}" width="${p.l}" height="${p.h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

const I = {
  tel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.3L4.4 7H19.6z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
  fleche: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/></svg>',
  insta: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.4V14h2.7v8z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>',
  carte: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 2h16V6H4zm0 4v6h16v-6z"/></svg>',
  // Un brin de feuillage, dessine une fois, repris en ornement.
  brin: '<svg class="brin" viewBox="0 0 120 40" aria-hidden="true"><path d="M4 30C30 26 60 22 116 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><g fill="currentColor"><path d="M22 27c-2-7 2-12 9-13-1 7-4 11-9 13z"/><path d="M26 28c6-4 12-3 16 2-6 3-11 2-16-2z"/><path d="M48 22c-1-8 4-13 11-13-1 7-5 11-11 13z"/><path d="M53 23c6-4 13-3 16 3-7 2-12 1-16-3z"/><path d="M76 16c0-7 5-11 11-11-1 6-5 10-11 11z"/><path d="M80 17c6-3 11-2 14 3-6 2-10 1-14-3z"/><circle cx="110" cy="9" r="3"/></g></svg>',
};

/* Les prochains rendez-vous. Une seule liste : elle remplit la section
   « Me trouver » et la fenetre du bouton epingle. `fin` sert a masquer
   le bouton une fois la date passee, sans reconstruire le site. */
const EVENEMENTS = [
  {
    jour: '25', mois: 'octobre 2026', fin: '2026-10-25',
    nom: 'Fête de la pomme, du cidre et du fromage',
    lieu: 'Conches-en-Ouche',
    texte: 'Douceurs salées (tartes, quiches, cakes salés) et sucrées (cookies, madeleines, cakes aux saveurs d’automne), à accompagner d’un chocolat chaud à l’ancienne.',
  },
];
const agenda = (r, ev, { photo = true } = {}) => `
      <p class="agenda-eti">Prochain rendez-vous</p>
      <p class="agenda-date"><b>${ev.jour}</b><span>${ev.mois}</span></p>
      <h3>${esc(ev.nom)}</h3>
      <p class="agenda-lieu">${I.pin} ${esc(ev.lieu)}</p>
      <p>${esc(ev.texte)}</p>
      ${photo ? `<figure class="agenda-photo">${img(r, 'stand-chocolat-chaud', 'Le stand et sa machine à chocolat chaud', { sizes: '(min-width: 900px) 24vw, 80vw' })}</figure>` : ''}`;

/* ---------------- donnees structurees ---------------- */
const ENTITE = {
  '@type': 'LocalBusiness',
  '@id': URL_SITE + '#entreprise',
  name: E.nom,
  alternateName: 'Le monde de Fabienne — fleurs, pâtisseries et décorations',
  description: 'Douceurs faites maison (cakes, cookies, tartelettes, quiches), fleurs et graines récoltées au jardin, créations et décoration (torchons, rideaux sur mesure, meubles relookés), à Saint-Sébastien-de-Morsent dans l’Eure.',
  url: URL_SITE,
  image: URL_SITE + 'photos/partage.jpg',
  telephone: E.tel,
  email: E.email,
  founder: { '@type': 'Person', name: E.dirigeante },
  foundingDate: '2026-06',
  address: { '@type': 'PostalAddress', addressLocality: E.ville, postalCode: E.codePostal, addressRegion: 'Normandie', addressCountry: 'FR' },
  areaServed: ['Saint-Sébastien-de-Morsent', 'Évreux', 'Conches-en-Ouche', 'Eure'].map((v) => ({ '@type': 'Place', name: v })),
  paymentAccepted: 'Espèces, carte bancaire',
  sameAs: [E.facebook, E.instagram],
  makesOffer: ['Pâtisseries et douceurs faites maison', 'Graines récoltées au jardin', 'Fleurs de saison', 'Rideaux sur mesure', 'Relooking de meubles'].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name: n } })),
};

/* ---------------- gabarit ---------------- */
const NAV = [['#douceurs', 'Douceurs'], ['#fleurs', 'Fleurs & graines'], ['#creations', 'Créations'], ['#histoire', 'Mon histoire'], ['#me-trouver', 'Me trouver']];

function page(chemin, { titre, description, corps, schemas = [], classe = '' }) {
  const r = '../'.repeat(chemin.split('/').filter(Boolean).length);
  const accueil = r || './';
  const lien = (h) => (chemin === '' ? h : accueil + h);
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(titre)}</title>
<meta name="description" content="${esc(description)}">
${PROD ? '' : '<meta name="robots" content="noindex,nofollow">\n'}<link rel="canonical" href="${abs(chemin)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${esc(E.nom)}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${URL_SITE}photos/partage.jpg">
<meta name="theme-color" content="#f6efe4">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23c9837e'/%3E%3Ctext x='16' y='22' font-size='17' text-anchor='middle' fill='%23fbf7f0' font-family='Georgia'%3EF%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Figtree:wght@400;500;600;700&family=Caveat:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/style.css?v=${V}">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': [ENTITE, ...schemas] })}</script>
</head>
<body class="${classe}">
<a class="evitement" href="#contenu">Aller au contenu</a>

<header class="entete" data-entete>
  <div class="entete-in">
    <a class="marque" href="${accueil}" aria-label="${esc(E.nom)}, accueil">
      <span class="marque-nom">Le monde de Fabienne</span>
      <span class="marque-devise">${esc(E.devise)}</span>
    </a>
    <nav class="nav" aria-label="Navigation principale">
      ${NAV.map(([h, t]) => `<a href="${lien(h)}">${t}</a>`).join('\n      ')}
    </nav>
    <a class="bouton bouton-rose entete-cta" href="${WA_BONJOUR}" target="_blank" rel="noopener">${I.wa} Commander</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="menu-mobile" aria-label="Ouvrir le menu"><span></span><span></span></button>
  </div>
  <div class="menu-mobile" id="menu-mobile" hidden>
    ${NAV.map(([h, t]) => `<a href="${lien(h)}">${t}</a>`).join('\n    ')}
    <a class="bouton bouton-rose" href="${WA_BONJOUR}" target="_blank" rel="noopener">${I.wa} Commander sur WhatsApp</a>
    <a class="bouton bouton-ligne" href="tel:${E.telLien}">${I.tel} ${E.tel}</a>
  </div>
</header>

<main id="contenu">
${corps(r)}
</main>

<footer class="pied">
  <div class="cadre pied-haut">
    <div>
      <p class="pied-nom">Le monde de Fabienne</p>
      <p>${esc(E.devise)}, faites main à ${E.ville}, dans l’${E.departement}.</p>
    </div>
    <div>
      <h2 class="pied-titre">Me joindre</h2>
      <p><a href="tel:${E.telLien}">${E.tel}</a><br><a href="mailto:${E.email}">${E.email}</a></p>
    </div>
    <div>
      <h2 class="pied-titre">Me suivre</h2>
      <p class="pied-reseaux"><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${I.fb}</a><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.insta}</a></p>
    </div>
  </div>
  <div class="cadre pied-bas">
    <span>© ${new Date().getFullYear()} ${esc(E.nom)}</span>
    <span><a href="${r}mentions-legales/">Mentions légales</a> · <a href="${r}confidentialite/">Confidentialité</a>${PROD ? ' · Site réalisé par <a href="https://locweb.fr" target="_blank" rel="noopener">LocWeb</a>' : ''}</span>
  </div>
</footer>

${EVENEMENTS.length ? `<button class="epingle" type="button" data-ouvrir-agenda data-fin="${EVENEMENTS[0].fin}" aria-haspopup="dialog">
  <span class="epingle-date"><b>${EVENEMENTS[0].jour}</b><small>${EVENEMENTS[0].mois.split(' ')[0].slice(0, 3)}.</small></span>
  <span class="epingle-texte"><small>Où me trouver prochainement</small><b>${esc(EVENEMENTS[0].lieu)}</b><b class="epingle-court">Où me trouver ?</b></span>
</button>
<dialog class="fenetre" data-agenda aria-label="Où me trouver prochainement">
  <button class="fenetre-fermer" type="button" data-fermer-agenda aria-label="Fermer">×</button>
  <div class="agenda agenda-fenetre">${agenda(r, EVENEMENTS[0])}
    <div class="actions"><a class="bouton bouton-rose" href="${WA_BONJOUR}" target="_blank" rel="noopener">${I.wa} Réserver mes douceurs</a></div>
    <p class="fenetre-suite">Les autres dates sont annoncées sur <a href="${E.facebook}" target="_blank" rel="noopener">Facebook</a> et <a href="${E.instagram}" target="_blank" rel="noopener">Instagram</a>.</p>
  </div>
</dialog>` : ''}
<a class="flottant" href="${WA_BONJOUR}" target="_blank" rel="noopener" aria-label="Commander sur WhatsApp">${I.wa}<span>Commander</span></a>

<script>
  window.LOCWEB_CONFIG = {
    supabaseUrl: 'https://ibqawtgnucakzdldnitj.supabase.co',
    supabaseAnonKey: 'sb_publishable_rpLrUo4Cqnfl8zSohDqO0A_Q5Vkj2Hk',
    clientId: '',
    ga4Id: ''
  };
</script>
<script src="${r}mesure.js" defer></script>
<script src="${r}assets/site.js?v=${V}" defer></script>
</body>
</html>
`;
}

/* Une photo facon polaroid, avec un morceau de ruban adhesif. */
const polaroid = (r, nom, alt, legende, cls = '', opts = {}) => `
  <figure class="polaroid ${cls}">
    <span class="scotch" aria-hidden="true"></span>
    <span class="polaroid-photo">${img(r, nom, alt, opts)}</span>
    ${legende ? `<figcaption>${legende}</figcaption>` : ''}
  </figure>`;

/* ===================================================================
   PAGES
   =================================================================== */
const PAGES = [];
const ajouter = (ch, o) => PAGES.push([ch, o]);

ajouter('', {
  titre: 'Le Monde de Fabienne — Pâtisseries, fleurs et déco faites main (Eure)',
  description: 'Douceurs faites maison, fleurs et graines du jardin, rideaux sur mesure et meubles relookés : les créations de Fabienne, à Saint-Sébastien-de-Morsent près d’Évreux.',
  schemas: [{ '@type': 'WebSite', url: URL_SITE, name: E.nom, inLanguage: 'fr-FR' }],
  classe: 'accueil',
  corps: (r) => `
<section class="hero">
  <div class="cadre hero-in">
    <div class="hero-texte">
      <p class="surtitre hero-anim">${I.pin} ${E.ville} · ${E.departement}</p>
      <h1 class="hero-anim">De la graine <em>à l’assiette</em></h1>
      <p class="hero-chapo hero-anim">Des douceurs faites maison, des fleurs et des graines récoltées au jardin, des créations pour embellir la maison. Bienvenue dans le monde de Fabienne.</p>
      <div class="actions hero-anim">
        <a class="bouton bouton-rose" href="${WA_BONJOUR}" target="_blank" rel="noopener">${I.wa} Commander sur WhatsApp</a>
        <a class="bouton bouton-ligne" href="tel:${E.telLien}">${I.tel} ${E.tel}</a>
      </div>
      <p class="main hero-anim">fait main, avec le cœur ♡</p>
    </div>
    <div class="hero-collage hero-anim" aria-label="Quelques créations de Fabienne">
      ${polaroid(r, 'tartelettes-noisettes', 'Tartelettes aux noisettes faites maison', 'tartelettes maison', 'p1', { eager: true, sizes: '(min-width: 900px) 30vw, 70vw' })}
      ${polaroid(r, 'bouquets-et-graines', 'Bouquets de fleurs et sachets de graines sur le stand', 'bouquets du jardin', 'p2', { sizes: '(min-width: 900px) 20vw, 45vw' })}
      ${polaroid(r, 'torchon-et-sachets-de-graines', 'Torchon imprimé et sachets de graines récoltées', 'torchons &amp; graines', 'p3', { sizes: '(min-width: 900px) 20vw, 45vw' })}
    </div>
  </div>
</section>

<section class="univers-zone">
  <div class="cadre">
    <div class="univers">
      <a class="univers-carte reveler" href="#douceurs">
        <span class="univers-photo">${img(r, 'muffins-maison', 'Muffins faits maison', { sizes: '(min-width: 900px) 30vw, 90vw' })}</span>
        <span class="univers-texte"><b>Les douceurs</b><span>Cakes, cookies, tartelettes, quiches : sucré comme salé.</span></span>
      </a>
      <a class="univers-carte reveler" href="#fleurs">
        <span class="univers-photo">${img(r, 'jonquilles-et-tulipes', 'Jonquilles et tulipes au jardin', { sizes: '(min-width: 900px) 30vw, 90vw' })}</span>
        <span class="univers-texte"><b>Fleurs &amp; graines</b><span>Les fleurs de saison et les graines que je récolte moi-même.</span></span>
      </a>
      <a class="univers-carte reveler" href="#creations">
        <span class="univers-photo">${img(r, 'etagere-avant-apres', 'Étagère relookée, avant et après', { sizes: '(min-width: 900px) 30vw, 90vw' })}</span>
        <span class="univers-texte"><b>Créations &amp; déco</b><span>Couture, rideaux sur mesure, meubles qui retrouvent une seconde vie.</span></span>
      </a>
    </div>
  </div>
</section>

<section class="section" id="douceurs">
  <div class="cadre douceurs">
    <div class="douceurs-texte reveler">
      <p class="surtitre">${I.brin} Les douceurs</p>
      <h2>Fait maison, <em>comme on aime</em></h2>
      <p>Tout est préparé à la main, avec de bons ingrédients et beaucoup de gourmandise. Des recettes de saison qui changent au fil de l’année.</p>
      <div class="deux-listes">
        <div><h3>Côté sucré</h3><ul><li>Cookies généreux</li><li>Madeleines</li><li>Cakes de saison</li><li>Tartelettes aux noisettes</li><li>Muffins</li></ul></div>
        <div><h3>Côté salé</h3><ul><li>Tartes</li><li>Quiches</li><li>Cakes salés</li></ul></div>
      </div>
      <p class="note-main">Et sur les stands, un <b>chocolat chaud à l’ancienne</b> pour accompagner le tout.</p>
      <a class="lien-fleche" href="${wa('Bonjour Fabienne, je voudrais commander des douceurs : ')}" target="_blank" rel="noopener">Une envie, une fête à préparer ? Écrivez-moi sur WhatsApp ${I.fleche}</a>
    </div>
    <div class="galerie-douceurs reveler">
      <figure class="g1">${img(r, 'cakes-sucre-glace', 'Cakes au sucre glace', { sizes: '(min-width: 900px) 26vw, 50vw' })}</figure>
      <figure class="g2">${img(r, 'cookies-chocolat', 'Cookies au chocolat', { sizes: '(min-width: 900px) 20vw, 50vw' })}</figure>
      <figure class="g3">${img(r, 'tartelettes-noisettes', 'Tartelettes aux noisettes', { sizes: '(min-width: 900px) 20vw, 50vw' })}</figure>
      <figure class="g4">${img(r, 'cake-maison', 'Cake fait maison', { sizes: '(min-width: 900px) 26vw, 50vw' })}</figure>
    </div>
  </div>
</section>

<section class="section section-sauge" id="fleurs">
  <div class="cadre fleurs">
    <div class="fleurs-photos reveler">
      ${polaroid(r, 'bouquets-et-graines', 'Bouquets de fleurs fraîches et boîte de sachets de graines', 'au stand, les bouquets du moment', 'f1', { sizes: '(min-width: 900px) 28vw, 80vw' })}
      ${polaroid(r, 'jonquilles-et-tulipes', 'Jonquilles et tulipes', 'le printemps au jardin', 'f2', { sizes: '(min-width: 900px) 18vw, 50vw' })}
    </div>
    <div class="fleurs-texte reveler">
      <p class="surtitre">${I.brin} Fleurs &amp; graines</p>
      <h2>Du jardin <em>à votre jardin</em></h2>
      <p>Les fleurs poussent au jardin, et à la fin de la saison, je récolte leurs graines pour vous les proposer en petits sachets. De quoi semer à votre tour, et voir fleurir chez vous ce qui a fleuri chez moi.</p>
      <div class="ardoise" role="note">
        <p class="ardoise-titre">Graines récoltées par mes soins ♡</p>
        <p class="ardoise-prix"><span>1 € le sachet</span><span>5 € les 6</span></p>
        <p class="ardoise-liste">Pavot de Californie · Soucis · Zinnia · et d’autres selon la récolte</p>
      </div>
      <p>Et selon la saison, des bouquets de fleurs fraîches sur le stand.</p>
    </div>
  </div>
</section>

<section class="section" id="creations">
  <div class="cadre">
    <div class="tete-section reveler">
      <p class="surtitre">${I.brin} Créations &amp; déco</p>
      <h2>Embellir la maison, <em>à la main</em></h2>
      <p class="chapo">La couture, la récup’, les petites touches qui changent tout. Chaque pièce est unique.</p>
    </div>
    <div class="creations">
      <article class="creation reveler">
        <div class="creation-photo">${img(r, 'torchon-et-sachets-de-graines', 'Torchon imprimé « La cuisine où il fait bon partager »', { sizes: '(min-width: 900px) 30vw, 90vw' })}</div>
        <h3>Torchons &amp; sacs en tissu</h3>
        <p>Des torchons et des sacs imprimés de motifs fleuris et de petits mots doux, comme « La cuisine où il fait bon partager ».</p>
      </article>
      <article class="creation reveler">
        <div class="creation-photo">${img(r, 'rideau-sur-mesure', 'D’un simple rouleau de tissu à un rideau sur mesure', { sizes: '(min-width: 900px) 30vw, 90vw' })}</div>
        <h3>Rideaux sur mesure</h3>
        <p>D’un simple rouleau de tissu à un rideau d’exception : des rideaux cousus à vos dimensions, dans le tissu de votre choix.</p>
      </article>
      <article class="creation reveler">
        <div class="creation-photo">${img(r, 'etagere-avant-apres', 'Étagère sombre relookée en blanc, avant et après', { sizes: '(min-width: 900px) 30vw, 90vw' })}</div>
        <h3>Meubles relookés</h3>
        <p>Il suffisait de voir son potentiel : un meuble sombre de brocante devient une jolie étagère pleine de charme. Quelques heures de travail, beaucoup de patience, et une seconde vie.</p>
      </article>
    </div>
  </div>
</section>

<section class="section section-papier" id="histoire">
  <div class="cadre etroit histoire reveler">
    <p class="surtitre">${I.brin} Mon histoire</p>
    <h2>Une reconversion, <em>un monde à moi</em></h2>
    <p>Le Monde de Fabienne est né en 2026, d’une reconversion professionnelle et d’une envie simple : réunir ce que j’aime faire. Cuisiner des douceurs, faire pousser des fleurs, coudre, donner une seconde vie aux objets.</p>
    <p>Mon fil conducteur, c’est <b>de la graine à l’assiette</b> : du jardin à la cuisine, en passant par la maison, tout est fait main, à ${E.ville}, près d’Évreux.</p>
    <p class="signature">Fabienne</p>
  </div>
</section>

<section class="section" id="me-trouver">
  <div class="cadre trouver">
    <div class="trouver-texte reveler">
      <p class="surtitre">${I.brin} Me trouver</p>
      <h2>Sur les marchés <em>et les fêtes de l’Eure</em></h2>
      <p>Vous me retrouvez sur les marchés, fêtes et salons de la région, avec mon stand de douceurs, de fleurs et de créations.</p>
      <ul class="infos-stand">
        <li>${I.pin}<span>Basée à ${E.ville} (${E.codePostal}), à côté d’Évreux</span></li>
        <li>${I.carte}<span>Carte bancaire et espèces acceptées sur le stand</span></li>
      </ul>
      <p>Les prochaines dates sont annoncées sur <a href="${E.facebook}" target="_blank" rel="noopener">Facebook</a> et <a href="${E.instagram}" target="_blank" rel="noopener">Instagram</a>.</p>
    </div>
    <aside class="agenda reveler" aria-label="Prochain rendez-vous">${agenda(r, EVENEMENTS[0])}
    </aside>
  </div>
</section>

<section class="section section-rose" id="contact">
  <div class="cadre contact">
    <div class="contact-texte reveler">
      <p class="surtitre">${I.brin} Commander</p>
      <h2>Une commande, <em>une question ?</em></h2>
      <p>Le plus simple, c’est WhatsApp : choisissez ce qui vous fait envie, le message est déjà prêt, vous n’avez plus qu’à préciser pour quand et pour combien. Je vous réponds avec plaisir.</p>
      <a class="contact-tel" href="tel:${E.telLien}">${I.tel}<span><small>Par téléphone</small><b>${E.tel}</b></span></a>
      <a class="contact-tel" href="mailto:${E.email}">${I.mail}<span><small>Par e-mail</small><b>${E.email}</b></span></a>
    </div>
    <div class="commande reveler">
      <h3>${I.wa} Commander sur WhatsApp</h3>
      <p>Touchez votre envie :</p>
      <div class="commande-choix">
        <a href="${wa('Bonjour Fabienne, je voudrais commander des douceurs (sucrées / salées) : ')}" target="_blank" rel="noopener"><b>Des douceurs</b><span>Cakes, cookies, tartelettes, quiches…</span>${I.fleche}</a>
        <a href="${wa('Bonjour Fabienne, je voudrais des sachets de graines : ')}" target="_blank" rel="noopener"><b>Des graines ou des fleurs</b><span>1 € le sachet, 5 € les 6</span>${I.fleche}</a>
        <a href="${wa('Bonjour Fabienne, je voudrais un rideau sur mesure / une création en tissu : ')}" target="_blank" rel="noopener"><b>Un rideau ou de la couture</b><span>Sur mesure, dans le tissu de votre choix</span>${I.fleche}</a>
        <a href="${wa('Bonjour Fabienne, j’ai un meuble à relooker : ')}" target="_blank" rel="noopener"><b>Un meuble à relooker</b><span>Envoyez-moi une photo</span>${I.fleche}</a>
      </div>
      <a class="bouton bouton-rose" href="${WA_BONJOUR}" target="_blank" rel="noopener">${I.wa} Autre chose : écrivez-moi</a>
    </div>
  </div>
</section>`,
});

ajouter('mentions-legales/', {
  titre: 'Mentions légales — Le Monde de Fabienne',
  description: `Mentions légales du site ${E.nom}.`,
  corps: () => `
<section class="section"><div class="cadre etroit texte-riche">
  <h1>Mentions légales</h1>
  <h2>Éditrice du site</h2>
  <p>${E.dirigeante} — entrepreneuse individuelle, nom commercial « ${E.nom} »<br>${E.ville} (${E.codePostal})<br>SIRET : ${E.siret}<br>${E.tel} — ${E.email}</p>
  <p>Directrice de la publication : ${E.dirigeante}</p>
  <h2>Hébergement</h2><p>[À compléter à la mise en ligne]</p>
  <h2>Crédits</h2><p>Photographies : ${E.nom}. Réalisation : LocWeb.</p>
</div></section>`,
});

ajouter('confidentialite/', {
  titre: 'Politique de confidentialité — Le Monde de Fabienne',
  description: `Comment ${E.nom} traite les données transmises via son site.`,
  corps: () => `
<section class="section"><div class="cadre etroit texte-riche">
  <h1>Politique de confidentialité</h1>
  <h2>Les données recueillies</h2><p>Ce site ne comporte aucun formulaire : les commandes se font par WhatsApp, par téléphone ou par e-mail. Les informations que vous transmettez ainsi servent uniquement à traiter votre commande.</p>
  <h2>Mesure d’audience</h2><p>Le site utilise Google Analytics pour mesurer sa fréquentation de façon anonymisée.</p>
  <h2>Vos droits</h2><p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à ${E.email}. Aucune donnée n’est vendue ni cédée.</p>
</div></section>`,
});

for (const [ch, o] of PAGES) {
  fs.mkdirSync(path.join(ICI, ch), { recursive: true });
  fs.writeFileSync(path.join(ICI, ch, 'index.html'), page(ch, o));
}
fs.writeFileSync(path.join(ICI, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${abs('')}</loc></url>\n</urlset>\n`);
fs.writeFileSync(path.join(ICI, 'robots.txt'), PROD ? `User-agent: *\nAllow: /\n\nSitemap: ${URL_SITE}sitemap.xml\n` : `# Apercu : pas d'indexation avant la mise en ligne.\nUser-agent: *\nDisallow: /\n`);
fs.writeFileSync(path.join(ICI, '.nojekyll'), '');
console.log(`${PAGES.length} pages — ${PROD ? 'PRODUCTION' : 'apercu (noindex)'}`);
