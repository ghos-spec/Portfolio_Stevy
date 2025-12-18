export const useStructuredData = () => {
  const requestUrl = useRequestURL();
  const baseUrl = requestUrl.origin;

  const personSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Stevy OBAME',
    jobTitle: 'Développeur Web & Designer Graphique',
    url: baseUrl,
    image: `${baseUrl}/stevy.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Libreville',
      addressCountry: 'GA'
    },
    sameAs: [
      // Ajoute tes liens réseaux sociaux ici
      // 'https://linkedin.com/in/...',
      // 'https://github.com/...',
    ],
    knowsAbout: [
      'Développement Web',
      'Design Graphique',
      'UI/UX Design',
      'Vue.js',
      'Nuxt.js',
      'React',
      'TypeScript',
      'Tailwind CSS'
    ]
  });

  const portfolioSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Portfolio de Stevy OBAME',
    description: 'Portfolio professionnel présentant mes projets de développement web et design graphique',
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: 'Stevy OBAME'
    },
    inLanguage: 'fr-FR'
  });

  const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  });

  const projectSchema = (project: {
    name: string;
    description: string;
    imageUrl?: string;
    liveUrl?: string;
    githubUrl?: string;
    category?: string;
    tags?: string[];
    date?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    image: project.imageUrl || `${baseUrl}/projet.png`,
    url: project.liveUrl || baseUrl,
    author: {
      '@type': 'Person',
      name: 'Stevy OBAME'
    },
    dateCreated: project.date,
    keywords: project.tags?.join(', '),
    genre: project.category,
    inLanguage: 'fr-FR'
  });

  const addStructuredData = (schema: object | object[]) => {
    const schemas = Array.isArray(schema) ? schema : [schema];
    
    useHead({
      script: schemas.map((s) => ({
        type: 'application/ld+json',
        children: JSON.stringify(s)
      }))
    });
  };

  return {
    personSchema,
    portfolioSchema,
    breadcrumbSchema,
    projectSchema,
    addStructuredData
  };
};
