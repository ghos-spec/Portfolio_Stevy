# Diagnostic : Images non affichées lors du partage

## Problème identifié

Les images de certains projets ne s'affichent pas lors du partage sur les réseaux sociaux.

## Causes possibles

### 1. URLs Supabase expirées
- Les signed URLs Supabase expirent après 30 jours
- Les crawlers des réseaux sociaux peuvent mettre du temps à accéder à l'image
- Solution : Rendre les images publiques ou augmenter la durée

### 2. Projets sans image
- Certains projets n'ont pas d'`imagePath` dans Firestore
- Le fallback `/projet.png` est utilisé mais peut ne pas être optimal
- Solution : Vérifier que tous les projets ont une image

### 3. Cache des réseaux sociaux
- Facebook, LinkedIn, Twitter gardent les anciennes versions en cache
- Solution : Forcer le rafraîchissement du cache

## Solutions

### Solution 1 : Rendre les images publiques (RECOMMANDÉ)

Pour les projets publiés, rends les images publiques dans Supabase :

1. Va sur ton dashboard Supabase
2. Storage > projects-media
3. Sélectionne le dossier ou les fichiers
4. Clique sur "Make public"

Avantages :
- URLs permanentes
- Pas d'expiration
- Meilleur pour le SEO
- Crawlers des réseaux sociaux peuvent accéder facilement

### Solution 2 : Augmenter la durée des signed URLs

Dans `server/api/projects/index.get.ts`, ligne 42 :
```typescript
// Avant (30 jours)
const { data: signedData, error } = await supabase.storage
  .from(bucket)
  .createSignedUrl(path, 60 * 60 * 24 * 30);

// Après (1 an)
const { data: signedData, error } = await supabase.storage
  .from(bucket)
  .createSignedUrl(path, 60 * 60 * 24 * 365);
```

### Solution 3 : Utiliser des URLs publiques pour les projets publiés

Modifier l'API pour utiliser des URLs publiques pour les projets avec `status: "Publié"` :

```typescript
const getImageUrl = async (data: any) => {
  // Si le projet est publié et a un imagePath, utilise l'URL publique
  if (data.status === 'Publié' && data.imagePath) {
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.imagePath);
    return publicData.publicUrl;
  }
  
  // Sinon, utilise une signed URL
  if (data.imagePath) {
    const { data: signedData } = await supabase.storage
      .from(bucket)
      .createSignedUrl(data.imagePath, 60 * 60 * 24 * 365);
    return signedData?.signedUrl || '';
  }
  
  return '';
};
```

## Vérification des images

### 1. Tester une URL d'image directement
Copie l'URL de l'image d'un projet et ouvre-la dans un nouvel onglet.
- ✅ Si l'image s'affiche : L'URL est valide
- ❌ Si erreur 403/404 : L'URL est expirée ou invalide

### 2. Tester avec les outils de débogage des réseaux sociaux

**Facebook Sharing Debugger**
- URL : https://developers.facebook.com/tools/debug/
- Entre l'URL de ton projet
- Clique sur "Scrape Again" pour forcer le rafraîchissement

**LinkedIn Post Inspector**
- URL : https://www.linkedin.com/post-inspector/
- Entre l'URL de ton projet
- Vérifie l'aperçu

**Twitter Card Validator**
- URL : https://cards-dev.twitter.com/validator
- Entre l'URL de ton projet

**Open Graph Debugger (universel)**
- URL : https://www.opengraph.xyz/
- Teste toutes les meta tags en une fois

### 3. Vérifier dans Firestore

Pour chaque projet, vérifie que :
- `imagePath` existe et est correct
- `status` est "Publié"
- `imageUrl` est généré correctement

## Checklist de diagnostic

- [ ] Vérifier que l'image existe dans Supabase Storage
- [ ] Vérifier que `imagePath` est correct dans Firestore
- [ ] Tester l'URL de l'image directement dans le navigateur
- [ ] Vérifier que l'image est accessible (pas d'erreur 403)
- [ ] Tester avec Facebook Sharing Debugger
- [ ] Forcer le rafraîchissement du cache des réseaux sociaux
- [ ] Vérifier que `/projet.png` existe dans `/public`
- [ ] Vérifier les meta tags OG avec l'inspecteur du navigateur

## Commandes utiles

### Vérifier les meta tags d'une page
```bash
curl -I https://portfolio-stevy.vercel.app/projets/nom-du-projet
```

### Tester l'accessibilité d'une image
```bash
curl -I https://ton-url-supabase.com/image.jpg
```

## Prochaines étapes recommandées

1. **Rendre publiques les images des projets publiés** dans Supabase
2. **Modifier l'API** pour utiliser `getPublicUrl()` au lieu de `createSignedUrl()`
3. **Forcer le rafraîchissement** du cache sur Facebook/LinkedIn
4. **Vérifier que tous les projets** ont une image valide

## Note importante

Les crawlers des réseaux sociaux (Facebook, LinkedIn, Twitter) :
- Ne suivent pas les redirections JavaScript
- Ont besoin d'URLs directes et permanentes
- Mettent en cache les images pendant plusieurs jours/semaines
- Peuvent être bloqués par les CORS ou les signed URLs expirées

C'est pourquoi les URLs publiques sont préférables pour les contenus destinés à être partagés.
