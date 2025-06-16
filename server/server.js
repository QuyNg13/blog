import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import { marked } from 'marked';
import sirv from 'sirv';
import fs from 'fs';
import path from 'path';

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

const readJson = (file) =>
  JSON.parse(fs.readFileSync(path.resolve('server', 'data', file), 'utf-8'));

app.get('/', async (req, res) => {
  return res.send(renderTemplate('server/views/index.liquid', {
    title: 'Home'
  }));
});

app.get('/weekly-nerd', async (req, res) => {
  const weeklynerd = readJson('weeklynerd.json');
  return res.send(renderTemplate('server/views/weekly-nerd.liquid', {
    title: 'Weekly Nerd',
    blogs: weeklynerd
  }));
});

app.get('/hackathon', async (req, res) => {
  const hackathon = readJson('hackathon.json');
  return res.send(renderTemplate('server/views/hackathon.liquid', {
    hackathon: hackathon
  }));
});

app.get('/reflectie-leerdoelen', async (req, res) => {
  const leerdoelen = readJson('leerdoelen.json');
  return res.send(renderTemplate('server/views/reflectie-leerdoelen.liquid', {
    title: 'Reflectie en Leerdoelen',
    leerdoelen: leerdoelen
  }));
});

app.get('/vakken', async (req, res) => {
  const vakken = readJson('vakken.json');
  return res.send(renderTemplate('server/views/vakken.liquid', {
    title: 'Vakken',
    vakken: vakken
  }));
});

app.get('/meesterproef', async (req, res) => {
  const meesterproef = readJson('meesterproef.json');
  const markdownPath = path.resolve('server', 'data', 'Productbiografie.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
  const meesterproefHTML = marked(markdownContent);
  return res.send(renderTemplate('server/views/meesterproef.liquid', {
    title: 'Meesterproef',
    meesterproef: meesterproef,
    content: meesterproefHTML
  }));
});

// Detailpagina voor een specifieke blog
app.get('/weekly-nerd/:id', async (req, res) => {
  const weeklynerd = readJson('weeklynerd.json');
  const id = req.params.id;
  const blog = weeklynerd.find((nerd) => nerd.id === id);

  if (!blog) {
    return res.status(404).send('Blog not found');
  }

  return res.send(renderTemplate('server/views/weekly-nerd-detail.liquid', {
    title: `Blog Detail: ${blog.title}`,
    blog: blog
  }));
});

const renderTemplate = (template, data) => {
  return engine.renderFileSync(template, data);
};
