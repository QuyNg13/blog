import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import weeklynerd from './data/weeklynerd.json' assert { type: 'json' };
import leerdoelen from './data/leerdoelen.json' assert { type: 'json'};
import vakken from './data/vakken.json' assert { type: 'json'};
import hackathon from './data/hackathon.json' assert { type: 'json'};

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
    blogs: weeklynerd
  }));
});

app.get('/hackaton', async (req, res) => {
  return res.send(renderTemplate('server/views/hackaton.liquid', {
    hackathon: hackathon
  }));
});

app.get('/reflectie-leerdoelen', async (req, res) => {
  return res.send(renderTemplate('server/views/reflectie-leerdoelen.liquid', {
    title: 'Reflectie en Leerdoelen',
    leerdoelen: leerdoelen
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
