import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

const blogs = {
  'eerste-blog': {
    id: 'eerste-blog',
    title: 'eerste blog',
    image: {
      src: '/images/blog1.jpg',
      alt: 'Afbeelding bij blog',
      width: 600,
      height: 400,
    },
    intro: 'In deze blog vertel ik over mijn eerste ervaring met web development.',
    content: `<p>Hier komt de volledige inhoud van de blog.</p>`
  },
  'tweede blog': {
    id: 'tweede blog',
    title: 'tweede blog',
    image: {
      src: '/images/blog2.jpg',
      alt: 'Afbeelding natuur',
      width: 600,
      height: 400,
    },
    intro: 'Een reflectie over de combinatie tussen natuur en technologie.',
    content: `<p>Volledige inhoud blog 2...</p>`
  }
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
      title: 'Home', 
      blogs: Object.values(blogs) 
    }));
  });
  
  app.get('/blog/:id/', async (req, res) => {
    const id = req.params.id;
    const blog = blogs[id];
    if (!blog) {
      return res.status(404).send('Blog niet gevonden');
    }
    return res.send(renderTemplate('server/views/detail.liquid', {
      title: blog.title,
      blog: blog
    }));
  });

const renderTemplate = (template, data) => {
  return engine.renderFileSync(template, data);
};
