import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

const blogs = {
  'Kilian-Valkhof': {
    id: 'Kilian-Valkhof',
    title: 'Kilian Valkhof',
    image: {
      src: '/images/kilian_valkhof.webp',
      alt: 'Kilian Valkhof',
    },
    intro: 'Kilian Valkhof over "rule of least power"',
    inleiding: 'In deze blog bespreken ik de lezing van Kilian Valkhof. Kilian Valkhof is een Nederlandse front-end developer, spreker en ondernemer. <br> <br>Hij is de oprichter van Polypane, een browser voor ontwikkelaars. Met een passie voor het verbeteren van het web deelt Valkhof regelmatig zijn kennis via blogs en presentaties.',
    content: [
      {
        titel: 'Rule of Least Power',
        tekst: 'Hij introduceerde het principe "rule of least power", wat gaat over het kiezen van de minst complexe oplossing.'
      },
      {
        titel: 'Toepassing',
        tekst: 'Dit principe helpt om flexibelere, onderhoudbare code te schrijven.'
      }
    ]
  },
  'Peter-Paul-Koch': {
    id: 'Peter-Paul-Koch',
    title: 'Peter Paul Koch',
    image: {
      src: '/images/peter_paul_koch.webp',
      alt: 'Peter Paul Koch',
    },
    intro: 'Peter Paul Koch over web monetization',
    inleiding: 'Peter-Paul Koch, ook bekend als PPK, is een webontwikkelaar en consultant die bekend staat om zijn kennis op het gebied van browsercompatibiliteit en front-endontwikkeling. <br> <br>Hij heeft zich ingezet voor het verbeteren van webstandaarden. Als oprichter van QuirksMode.org leverde hij waardevolle bijdragen aan de webgemeenschap met uitgebreide documentatie.',
    content: [
      {
        titel: 'Web monetization',
        tekst: 'Hij introduceerde het principe "rule of least power", wat gaat over het kiezen van de minst complexe oplossing.'
      },
      {
        titel: 'Toepassing',
        tekst: 'Dit principe helpt om flexibelere, onderhoudbare code te schrijven.'
      }
    ]
  },
  'Roel-Nieskens': {
    id: 'Roel-Nieskens',
    title: 'Roel Nieskens',
    image: {
      src: '/images/roel_nieskens.webp',
      alt: 'Roel Nieskens',
    },
    intro: 'Roel Nieskens over typografie',
    inleiding: 'Roel Nieskens is een front-end developer en typografiespecialist, bekend om zijn innovatieve werk op het gebied van typografie. <br> <br>Op zijn website PixelAmbacht.nl deelt hij zijn inzichten en experimenten, waaronder projecten zoals Wakamai Fondue en Sans Bullshit Sans.',
    content: [
      {
        titel: 'titel1',
        tekst: 'inhoud'
      },
      {
        titel: 'titel2',
        tekst: 'inhoud'
      }
    ]
  },
  'Cassie-Evans': {
    id: 'Cassie-Evans',
    title: 'Cassie Evans',
    image: {
      src: '/images/cassie_evans.webp',
      alt: 'Cassie Evans',
    },
    intro: 'Cassie Evans over GSAP',
    inleiding: 'Cassie Evans is een creatieve ontwikkelaar die bekend staat om haar werk bij GreenSock (GSAP), een JavaScript-animatiebibliotheek. <br> <br>Met haar passie voor interactieve webanimaties en toegankelijke code, maakt ze lastige concepten voor animatie begrijpelijk.',
    content: [
      {
        titel: 'titel1',
        tekst: 'inhoud'
      },
      {
        titel: 'titel2',
        tekst: 'inhoud'
      }
    ]
  },
  'Nils-binder': {
    id: 'Nils-binder',
    title: 'Nils binder',
    image: {
      src: '/images/nils_binder.webp',
      alt: 'Nils binder',
    },
    intro: 'Nils binder over designen voor flexibiliteit',
    inleiding: 'Nils Binder is een ervaren front-end developer met een passie voor CSS en origami. <br> <br>Bij 9elements werkt hij zemen met een team om innovatieve projecten waar te maken.',
    content: [
      {
        titel: 'titel1',
        tekst: 'inhoud'
      },
      {
        titel: 'titel2',
        tekst: 'inhoud'
      }
    ]
  },
  'Jeremy-Keith': {
    id: 'Jeremy-Keith',
    title: 'Jeremy Keith',
    image: {
      src: '/images/jeremy_keith.webp',
      alt: 'Jeremy Keith',
    },
    intro: 'Jeremy Keith over imperative an declarative design',
    inleiding: 'Jeremy Keith is een webontwikkelaar en auteur die staat voor een toegankelijk en toekomstbestendig web. <br> <br>Met zijn werk bij Clearleft en boeken als Resilient Web Design heeft hij een waaardevolle stem in de web wereld.',
    content: [
      {
        titel: 'titel1',
        tekst: 'inhoud'
      },
      {
        titel: 'titel2',
        tekst: 'inhoud'
      }
    ]
  },
  'Julia-Miocene': {
    id: 'Julia-Miocene',
    title: 'Julia Miocene',
    image: {
      src: '/images/julia_miocene.webp',
      alt: 'Julia Miocene',
    },
    intro: 'Julia Miocene over css animaties',
    inleiding: 'Julia Miocene is een webontwikkelaar die zich richt op CSS-animaties. <br> <br>Ze heeft een passie voor het creëren van levendige visuals met pure CSS.', 
    content: [
      {
        titel: 'titel1',
        tekst: 'inhoud'
      },
      {
        titel: 'titel2',
        tekst: 'inhoud'
      }
    ]
  },
  'Rosa': {
    id: 'Rosa',
    title: 'Rosa',
    intro: 'Rosa over circuit bending',
    inleiding: 'Rosa is een oud student bij CMD en is nu bezig bij Hackers united waar ze circuit bending en hardware hacking doet. <br> <br>Ze heeft een passie voor het maken van muziek met oude hardware om ze nieuw leven te geven.',
    content: [
      {
        titel: 'titel1',
        tekst: 'inhoud'
      },
      {
        titel: 'titel2',
        tekst: 'inhoud'
      }
    ]
  },
  'Niels-Leenheer': {
    id: 'Niels-Leenheer',
    title: 'Niels Leenheer',
    image: {
      src: '/images/niels_leenheer.webp',
      alt: 'Niels Leenheer',
    },
    intro: 'Niels Leenheer over web technology op kassasystemen',
    inleiding: 'Niels is een ontwikkelaar werkzaam bij salonhub. <br> <br>Hij heeft een passie voor het toeppassen van web technologie op kassasystemen.',
    content: [
      {
        titel: 'titel1',
        tekst: 'inhoud'
      },
      {
        titel: 'titel2',
        tekst: 'inhoud'
      }
    ]
  },
  'Nienke-de-Keijzer': {
    id: 'Nienke-de-Keijzer',
    title: 'Nienke de Keijzer',
    image: {
      src: '/images/nienke_de_keijzer.webp',
      alt: 'Nienke de Keijzer',
    },
    intro: 'Nienke de Keijzer over accessibility',
    inleiding: 'Nieke is een oud student bij CMD die verteld over haar afstudeerproject bij BVG. <br> <br>Zij legt uit hoe ze haar project heeft aangepakt en hoe ze de toegankelijkheid van de BVG app heeft verbeterd.',
    content: [
      {
        titel: 'titel1',
        tekst: 'inhoud'
      },
      {
        titel: 'titel2',
        tekst: 'inhoud'
      }
    ]
  },
  'Erik-Kroes': {
    id: 'Erik-Kroes',
    title: 'Erik Kroes',
    image: {
      src: '/images/erik_kroes.webp',
      alt: 'Erik Kroes',
    },
    intro: 'Erik Kroes fixes voor WCAG failures',
    inleiding: 'Erik is een consultant gespecialiseerd in onder andere toegankelijkheid. <br> <br>Hij legt uit hoe je de toegankelijkheid van websites snel kan verbeteren door veel voorkomende WCAG failures aan te kaarten.',
    content: [
      {
        titel: 'titel1',
        tekst: 'inhoud'
      },
      {
        titel: 'titel2',
        tekst: 'inhoud'
      }
    ]
  },
};

const leerdoelen = {
  'Leerdoel 1': {
    id: 'Leerdoel 1',
    title: 'Leerdoel 1',
    intro: 'samen coderen',
    content: `inhoud`
  },
  'Leerdoel 2': {
    id: 'Leerdoel 2',
    title: 'Leerdoel 2',
    intro: 'expirmenteren met nieuwe css',
    content: `inhoud`
  },
  'Leerdoel 3': {
    id: 'Leerdoel 3',
    title: 'Leerdoel 3',
    intro: 'Ideeën itereren en meerdere uitwerkingen maken',
    content: `inhoud`
  },
};

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

app.get('/', async (req, res) => {
  return res.send(renderTemplate('server/views/index.liquid', {
    title: 'Home'
  }));
});

app.get('/weekly-nerd', async (req, res) => {
  return res.send(renderTemplate('server/views/weekly-nerd.liquid', {
    title: 'Weekly Nerd',
    blogs: Object.values(blogs)
  }));
});

app.get('/hackaton', async (req, res) => {
  return res.send(renderTemplate('server/views/hackaton.liquid', {
    title: 'Hackaton',
  }));
});

app.get('/reflectie-leerdoelen', async (req, res) => {
  return res.send(renderTemplate('server/views/reflectie-leerdoelen.liquid', {
    title: 'Reflectie en Leerdoelen',
    leerdoelen: Object.values(leerdoelen)
  }));
});

// Detailpagina voor een specifieke blog
app.get('/weekly-nerd/blog/:id', async (req, res) => {
  const id = req.params.id;
  const blog = blogs[id];

  if (!blog) {
    return res.status(404).send('Blog not found');
  }

  return res.send(renderTemplate('server/views/blog-detail.liquid', {
    title: `Blog Detail: ${blog.title}`,
    blog: blog
  }));
});

const renderTemplate = (template, data) => {
  return engine.renderFileSync(template, data);
};
