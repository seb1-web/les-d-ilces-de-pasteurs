# Les Délices de Pasteur

Site de la boulangerie du 37 boulevard Pasteur à Paris : accueil, carte, contact et journal photographique. Refonte de novembre 2026 conservant la palette et les photographies/décorations de Noël du dépôt.

## Lancer le site

Node.js 22 et npm. Le fichier `package-lock.json` fait référence.

```sh
npm ci
npm run dev
```

Ouvrir http://127.0.0.1:3000. Pour vérifier la version de production :

```sh
npm run build
npm run start -- --hostname 127.0.0.1
```

## Vérifications

```sh
npm run lint
npm run test:e2e
```

Les tests E2E nécessitent le serveur sur le port 3000 et Chrome installé. Ils couvrent les quatre routes à 320, 390, 768 et 1440 px, les images locales, les 115 produits, recherche et filtres avec historique navigateur, menu mobile/clavier, galerie Noël (lecture/pause/mouvement réduit), journal, carte à la demande et contrôles axe WCAG A/AA. Le service Google est simulé dans ce test : sa disponibilité extérieure n’est pas certifiée. Rapports dans `artifacts/e2e/`, ignorés par Git.

## Contenus

- `src/data/menu.ts` : 115 entrées et prix conservés à l’identique du dépôt initial. Le prix nul de L’ardéchois s’affiche « Prix en boutique ».
- `src/lib/business.ts` : adresse, téléphone, liens, horaires communs aux pages.
- `public/Images/optimized` : WebP servis par le site, en respectant la majuscule de `Images` pour Linux. Les originaux sont conservés.
- `npm run prepare-images` : régénération des images via Sharp, sans modification des originaux.
- `public/design/moments` : effet photographique Taste, licence et provenance incluses.

Les horaires restent ceux de l’ancien accueil et doivent être confirmés par la boutique : d’autres sources donnent un autre jour de fermeture. Les doublons de tarifs dans la carte source n’ont pas été arbitrairement corrigés.

Aucun paiement, panier, inscription à une newsletter ou formulaire d’envoi n’était fonctionnel dans le dépôt initial. Les liens réels de téléphone, Facebook, itinéraire et contact sont utilisés. Les articles, auteurs et avis appartenant apparemment à une autre enseigne ont été remplacés par les photos réelles de la maison.

## Hébergement

Application Next.js 16. Le fichier Netlify utilise npm et le plugin Next officiel. Pour les liens de partage, définir `NEXT_PUBLIC_SITE_URL` avec le domaine réel ; les variables Netlify `URL` et Vercel `VERCEL_PROJECT_PRODUCTION_URL` sont également prises en charge. Aucun domaine n’est inventé. Hors hébergement configuré, le repli est localhost.

La refonte est préparée sur une branche dédiée : fusion et publication en production sont des étapes distinctes. Suivi des décisions et preuves : coffre Obsidian `S:\seby\seby\Les Délices de Pasteur`.
