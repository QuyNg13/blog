import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

const blogs = {
  'eerste-blog': {
    id: 'eerste-blog',
    title: 'eerste blog',
    image: {
      src: '/images/cassie_evans.webp',
      alt: 'Afbeelding bij blog',
    },
    intro: 'In deze blog vertel ik over mijn eerste ervaring met web development.',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'tweede blog': {
    id: 'tweede blog',
    title: 'tweede blog',
    image: {
      src: '/images/cassie_evans.webp',
      alt: 'Afbeelding natuur',
    },
    intro: 'Een reflectie over de combinatie tussen natuur en technologie.',
    content: `Volledige inhoud blog 2...`
  },
  'derde-blog': {
    id: 'derde-blog',
    title: 'derde blog',
    image: {
      src: '/images/cassie_evans.webp',
      alt: 'Afbeelding bij blog',
    },
    intro: 'In deze blog vertel ik over mijn eerste ervaring met web development.',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'vierde': {
    id: 'vierde-blog',
    title: 'vierde blog',
    image: {
      src: '/images/cassie_evans.webp',
      alt: 'Afbeelding bij blog',
    },
    intro: 'In deze blog vertel ik over mijn eerste ervaring met web development.',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'vijfde-blog': {
    id: 'vijfde-blog',
    title: 'vijfde blog',
    image: {
      src: '/images/cassie_evans.webp',
      alt: 'Afbeelding bij blog',
    },
    intro: 'In deze blog vertel ik over mijn eerste ervaring met web development.',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'zesde-blog': {
    id: 'zesde-blog',
    title: 'zesde blog',
    image: {
      src: '/images/cassie_evans.webp',
      alt: 'Afbeelding bij blog',
    },
    intro: 'In deze blog vertel ik over mijn eerste ervaring met web development.',
    content: `Hier komt de volledige inhoud van de blog.`
  },
  'zevende-blog': {
    id: 'zevende-blog',
    title: 'zevende blog',
    image: {
      src: '/images/cassie_evans.webp',
      alt: 'Afbeelding bij blog',
    },
    intro: 'In deze blog vertel ik over mijn eerste ervaring met web development.',
    content: `Hier komt de volledige inhoud van de blog.`
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
