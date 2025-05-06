import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

const blogs = {
  'Kilian Valkhof': {
    id: 'Kilian Valkhof',
    title: 'Kilian Valkhof',
    image: {
      src: '/images/kilian_valkhof.webp',
      alt: 'Kilian Valkhof',
    },
    intro: 'Kilian Valkhof over "rule of least power"',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Peter Paul Koch': {
    id: 'Peter Paul Koch',
    title: 'Peter Paul Koch',
    image: {
      src: '/images/peter_paul_koch.webp',
      alt: 'Peter Paul Koch',
    },
    intro: 'Peter Paul Koch over web monetization',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Roel Nieskens': {
    id: 'Roel Nieskens',
    title: 'Roel Nieskens',
    image: {
      src: '/images/roel_nieskens.webp',
      alt: 'Roel Nieskens',
    },
    intro: 'Roel Nieskens over typografie',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Cassie Evans': {
    id: 'Cassie Evans',
    title: 'Cassie Evans',
    image: {
      src: '/images/cassie_evans.webp',
      alt: 'Cassie Evans',
    },
    intro: 'Cassie Evans over GSAP',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Nils binder': {
    id: 'Nils binder',
    title: 'Nils binder',
    image: {
      src: '/images/nils_binder.webp',
      alt: 'Nils binder',
    },
    intro: 'Nils binder over designen voor flexibiliteit',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Jeremy Keith': {
    id: 'Jeremy Keith',
    title: 'Jeremy Keith',
    image: {
      src: '/images/jeremy_keith.webp',
      alt: 'Jeremy Keith',
    },
    intro: 'Jeremy Keith over imperative an declarative design',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Julia Miocene': {
    id: 'Julia Miocene',
    title: 'Julia Miocene',
    image: {
      src: '/images/julia_miocene.webp',
      alt: 'Julia Miocene',
    },
    intro: 'Julia Miocene over css animaties',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Rosa': {
    id: 'Rosa',
    title: 'Rosa',
    intro: 'Rosa over circuit bending',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Niels Leenheer': {
    id: 'Niels Leenheer',
    title: 'Niels Leenheer',
    image: {
      src: '/images/niels_leenheer.webp',
      alt: 'Niels Leenheer',
    },
    intro: 'Niels Leenheer over web technology op kassasysteme',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Nienke de Keijzer': {
    id: 'Nienke de Keijzer',
    title: 'Nienke de Keijzer',
    image: {
      src: '/images/nienke_de_keijzer.webp',
      alt: 'Nienke de Keijzer',
    },
    intro: 'Nienke de Keijzer over accessibility',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'Erik Kroes': {
    id: 'Erik Kroes',
    title: 'Erik Kroes',
    image: {
      src: '/images/erik_kroes.webp',
      alt: 'Erik Kroes',
    },
    intro: 'Erik Kroes fixes voor WCAG failures',
    content: `Hier komt de volledige inhoud van de blog.`
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
