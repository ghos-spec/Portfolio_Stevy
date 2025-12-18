# Guide d'indexation et vérification SEO

## 1. Configuration Google Search Console

### Étape 1 : Ajouter ton site
1. Va sur https://search.google.com/search-console
2. Clique sur "Ajouter une propriété"
3. Entre ton URL : `https://portfolio-stevy.vercel.app`
4. Vérifie la propriété via :
   - Fichier HTML (télécharge et place dans `/public`)
   - Balise meta (ajoute dans `nuxt.config.ts`)
   - Google Analytics (si déjà installé)

### Étape 2 : Soumettre le sitemap
1. Dans Google Search Console, va dans "Sitemaps"
2. Entre : `https://portfolio-stevy.vercel.app/sitemap.xml`
3. Clique sur "Envoyer"

### Étape 3 : Demander l'indexation
1. Va dans "Inspection de l'URL"
2. Entre chaque URL importante
3. Clique sur "Demander l'indexation"

## 2. Vérifications SEO essentielles

### A. Vérifier l'indexation
```
site:portfolio-stevy.vercel.app
```
Dans Google, cette commande affiche toutes les pages indexées.

### B. Vérifier les données structurées
- URL : https://search.google.com/test/rich-results
- Entre ton URL et vérifie que les schémas Person, CreativeWork, BreadcrumbList sont détectés

### C. Vérifier les performances
- URL : https://pagespeed.web.dev/
- Entre ton URL
- Objectif : Score > 90 sur mobile et desktop

### D. Vérifier les meta tags
- URL : https://www.opengraph.xyz/
- Vérifie l'aperçu Facebook/Twitter de tes pages

### E. Vérifier le sitemap
- URL directe : https://portfolio-stevy.vercel.app/sitemap.xml
- Doit contenir toutes tes pages et projets

## 3. Checklist SEO complète

### ✅ Technique
- [x] Sitemap.xml généré et soumis
- [x] Robots.txt configuré
- [x] HTTPS activé (Vercel le fait automatiquement)
- [x] URLs canoniques
- [x] Données structurées JSON-LD
- [ ] Google Search Console configuré
- [ ] Google Analytics installé (optionnel)

### ✅ Contenu
- [x] Balises title uniques par page
- [x] Meta descriptions uniques par page
- [x] Balises H1 présentes
- [x] Images avec attribut alt
- [x] URLs propres et descriptives

### ✅ Performance
- [x] Images optimisées (NuxtImg)
- [x] Compression activée
- [x] Preconnect aux ressources externes
- [x] Fonts préchargées

### ✅ Social Media
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Images absolues pour le partage

## 4. Délais d'indexation

- **Première indexation** : 1-7 jours après soumission du sitemap
- **Mise à jour** : 1-3 jours pour les sites actifs
- **Accélération** : Utilise "Demander l'indexation" dans Google Search Console

## 5. Outils de monitoring continu

### Gratuits
- Google Search Console (essentiel)
- Google Analytics 4
- Bing Webmaster Tools

### Payants (optionnels)
- Ahrefs
- SEMrush
- Moz Pro

## 6. Commandes utiles

### Vérifier l'indexation d'une page spécifique
```
site:portfolio-stevy.vercel.app/projets/nom-du-projet
```

### Vérifier les backlinks
```
link:portfolio-stevy.vercel.app
```

### Rechercher ton nom
```
"Stevy OBAME" développeur
```

## 7. Prochaines étapes recommandées

1. **Configurer Google Search Console** (priorité haute)
2. **Soumettre le sitemap**
3. **Installer Google Analytics 4** pour suivre le trafic
4. **Créer un profil Google Business** (si applicable)
5. **Partager ton portfolio** sur :
   - LinkedIn
   - GitHub
   - Réseaux sociaux professionnels
   - Annuaires de développeurs

## 8. Maintenance SEO

### Hebdomadaire
- Vérifier les erreurs dans Google Search Console
- Publier du nouveau contenu (projets)

### Mensuel
- Analyser les performances de recherche
- Mettre à jour les meta descriptions si besoin
- Vérifier les liens cassés

### Trimestriel
- Audit SEO complet avec Lighthouse
- Mise à jour des données structurées
- Optimisation des images
