<details>
<summary>Leerdoelen</summary>

### Samen coderen
> Ik kan me zo presenteren tegenover mijn teamgenoten dat mijn ideeën beter overgebracht worden. Hiermee verbeter ik mijn communicatie vaardigheden binnen een team.
Ik stem met het team de code-structuur en naming conventions etc af, zo kan ik beter effectief samenwerken met gedeelde code.
Aan het eind van de meesterproef heb ik code geschreven dat past bij de afspraken binnen het team en ik heb mijn Ideeën zo overgebracht dat het in overweging is gebracht door de andere teamgenoten.

### Expirimetele CSS
> Aan het eind van de Meesterproef heb ik actief geëxpirimenteerd met moderne CSS-functionaliteiten die ik tijdens de minor heb gezien zoals anchor-positioning, :has() en container queries.
Ik documenteer wat wel en niet heeft gewerkt om bewust beter te worden in CSS.

### Ideeën schetsen
> Ik wil leren om meerdere concepten en visuele uitwerkingen te maken voor het project. Door een aantal verschillende ideeën visueel te schetsen en/of prototypen per uitdaging, wil ik mijn proces onderbouwen en het uiteindelijke ontwerp beter kunnen beargumenteren. Zo kom ik tot een doordachter eindproduct en leer ik beter omgaan met ontwerp-iteraties.

</details>

<details>
<summary>Week 1</summary>

## Week 1
### debrief opdrachtgever
Aan het begin van deze week zijn wij de debrief gaan voorbereiden voor de opdrachtgever, hierbij hebben we een aantal vragen opgesteld. Tijdens de brief zelf zijn deze niet van teopassing gekomen aangezien de opdrachtgever al een duidelijk verhaal had gehouden over do opdracht. Hij heeft tijdens de debrief de keuze gegeven tussen twee opdrachten:

Opdracht 1: Ontwerp en bouw een ‘mirror’ van de huidige WordPress website van Framer Framed wat als doel heeft om de website zo toegankelijk mogelijk te maken.

Opdracht 2: Ontsluiting van het bestaande digitale archief van Framer Framed voor een specifieke doelgroep met specifieke eisen op het gebied van toegankelijkheid. 

Toen we terug kwamen van de debrief kwamen we er heel snel op uit om voor opdracht 2 te gaan aangezien opdracht 1 niet bij minor past. De opdrachtgever had opdracht 1 echter wel als prioriteit aangegeven dus we moesten deze week een argumentatie gaan vormen om duidelijk te maken dat opdracht 1 niet passend is als meesterproef.

Ons idee voor opdracht 2 was om een ontsluiting te maken van de huidige Framer-framed database gericht op toegankelijheid voor blind/slechtzienden die een screenreader en gebruikers die genoodzaakt zijn om alleen toetsenbord navigatie te gebruiken.

### conceptualiseren
vanuit het idee dat we opdracht 2 gaan uitvoeren heb ik samen met het team een aantal ideeën geschetst en een mindmap gemaakt om een beeld te krijgen van de opdracht. Ik heb zelf ook een aantal schetsen gemaakt van hoe de flows er uit zou kunnen zien.

<img src="https://github.com/user-attachments/assets/dc09bc18-8245-4bb1-9807-be98543ad74c" />

<img src="https://github.com/user-attachments/assets/0929e9ad-e15b-4e70-9a3f-cb632d5e0e3a" />

<img src="https://github.com/user-attachments/assets/1b00bdcc-ac97-44ed-8a4c-7397e53c2931" />

### database onderzoeken
Deze week ben ik ook begonnen met de database onderzoeken. Ik wou het voorelkaar krijgen om data op te halen en bruikbaar te maken. Ik kwam al gelijk een aantal obstakels tegen, namelijk:

* Er zitten img, iframe en video hard gecodeerd in de content van de database.
* We kunnen niet gemakkelijk bij afbeeldingen van relaties van een object.
* Het is nog niet duidelijk hoe we door de database kunnen navigeren om alle benodigde data voor ons ontwerp op te halen.

Om het eerste probleem op te lossen heb ik gebprobeerd de HTML code die in de cotnent staat te parsen en de elementen te filteren die we niet in het eindproduct willen hebben. Hiervoor heb ik de HTML parser NPM package gebruikt.
<details>
<summary>code elementen uit HTML halen</summary>

```js
function extractImages(htmlString) {
  const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/gi;
  const imgMatches = [];
  let match;

  // Verzamel alle <img> tags en hun src
  while ((match = imgRegex.exec(htmlString)) !== null) {
    imgMatches.push({
      tag: match[0],   // hele <img ...>
      src: match[1],   // alleen de src
    });
  }

  // Verwijder <img> tags uit de originele content
  const contentWithoutImages = htmlString.replace(imgRegex, '');

  return {
    content: contentWithoutImages.trim(),
    images: imgMatches.map(i => i.src),
  };
}

app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

app.get('/', async (req, res) => {
  const allEvents = [];
  let year = 2005;
  const currentYear = new Date().getFullYear();

  while (year <= currentYear) {
    const url = `https://archive.framerframed.nl/api/get-by-year/${year}/0/200`;
    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.events && json.events.length > 0) {
        console.log(`Data gevonden voor ${year}`);

        for (const event of json.events) {
          const htmlContent = event.node.content_en || '';
          const root = parse(htmlContent);

          // img tags verzamelsen
          const imgElements = root.querySelectorAll('img');
          const imgSources = imgElements.map(img => img.getAttribute('src'));

          // img verwijder uit content
          imgElements.forEach(img => img.remove());

          // overgebleven content opslaan
          event.node.cleaned_content = root.toString().trim();
          event.node.extracted_images = imgSources;
        }

        allEvents.push(...json.events);
      } else {
        console.log(`Geen data voor ${year}`);
      }
    } catch (error) {
      console.error(`Fout bij ophalen van ${year}:`, error);
    }

    year++;
  }

  const types_nl = new Set();
  const types_en = new Set();
  allEvents.forEach(event => {
  if (event.node?.type_en) types_en.add(event.node.type_en);
  if (event.node?.type_nl) types_nl.add(event.node.type_nl);
  });
  console.log('Alle unieke types:', Array.from(types_nl));
  console.log('Alle unieke types engels:', Array.from(types_en));

  const html = await engine.renderFile('server/views/index.liquid', { allEvents });
  res.send(html);
});
```
</details>

</details>

<details>
<summary>Week 2</summary>

## Week 2

### Dynamisch menu voor statische pagina's
Nu we een idee hebben van wat we willen maken, ben ik begonnen aan het werken aan het ophalen van data en op de juiste plek te plaatsen. Aangezien we momenteel nog niet bij de nieuwe API kunnen die de ontwikkelaar van Framer Framed voor ons maakt heb ik besloten om een dynamisch menu te maken. 

De opdrachtgever heeft aangegeven dat hij graag de statische pagina's van de website die ze momenteel hebben bereikbaar zijn in ons product. Deze pagina's kan ik ophalen met de wordpress API. Deze API geeft id's terug, elke id heeft een link en geeft aan of het een child of parent is voor dropdowns. In de backend haal ik alle pagina's op en filter ik de pagina's die ik niet nodig heb zodat nieuwe statische pagina's automatisch in het menu komen. Ik zorg er ook voor dat de dropdowns dynamisch werken door de childs aan de juiste parents toe te voegen.

<details>
<summary>code dynamisch menu backend</summary>

```js
app.use(async (req, res, next) => {
  try {
    // Pagina-ID's die je wilt uitsluiten uit het menu
    const excludedPageIds = [
      49503, 46253, 45363, 42363, 42391, 42441, 42429, 42387, 42339,
      39909, 35525, 34841, 26211, 25435, 25413, 25323, 24671, 24665,
      25247, 23687, 23247, 22171, 21397, 20873, 20769, 20743, 20247,
      19967, 18555, 18553, 18551, 18549, 17573, 16866, 17081, 16742,
      16735, 15249, 11491, 10877, 10865, 10859, 10851, 10735, 8563,
      8013, 5495, 5483, 5419, 3955, 2668, 1482, 378, 258
    ];

    const response = await fetch('https://framerframed.nl/en/wp-json/wp/v2/pages?per_page=100');
    const allPages = await response.json();

    // Filter 
    const visiblePages = allPages.filter(page => !excludedPageIds.includes(page.id));

    // schildren en parent pages definieren
    const mainPages = visiblePages.filter(page => page.parent === 0);
    const subPages = visiblePages.filter(page => page.parent !== 0);

    // children aan parent toevoegen
    const menu = mainPages.map(parent => ({
      ...parent,
      children: subPages.filter(child => child.parent === parent.id),
    }));

    // Zet menu beschikbaar voor alle views
    res.locals.menu = menu;
  } catch (err) {
    console.error('Fout bij ophalen van menu:', err);
    res.locals.menu = [];
  }

  next();
});

app.get('/', async (req, res) => {
  const html = await renderTemplate('server/views/index.liquid', {title: 'Home'}, res);
  res.send(html);
});

const renderTemplate = async (template, data = {}, res = null) => {
  //menu toevoegen aan de data
  if (res && res.locals.menu) {
    data.menu = res.locals.menu;
  }
  return await engine.renderFile(template, data);
};
```
</details>

<details>
<summary>code dynamisch menu HTML</summary>

```html
<nav>
    <ul>
      {% for item in menu %}
        {% if item.children.size > 0 %}
          <li>
            <details>
              <summary>{{ item.title.rendered | strip_html }}</summary>
              <ul>
                {% for child in item.children %}
                  <li>
                    <a href="{{ child.link }}">{{ child.title.rendered | strip_html }}</a>
                  </li>
                {% endfor %}
              </ul>
            </details>
          </li>
        {% else %}
          <li>
            <a href="{{ item.link }}">{{ item.title.rendered | strip_html }}</a>
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  </nav>
```
</details>

### Data ophalen voor detailpagina
Deze week heb ik ook geprobeerd content op te halen voor de detailpagina voor evenementen van Framer Framed. Elk object in de bibliograph database heeft een uuid, met dit id kan ik alle benodigde content en relaties van het object ophalen. vervolgens laat ik deze content zien met behulp van een liquid template. 

Om bij deze pagina te komen is er momenteel een lijst gemaakt die alle evenementen heeft van een bepaald jaar, deze linkt naar de juiste route voor elke uuid. 

<details>
<summary>code lijst van evenementen</summary>

```html
<ul>
  {% for e in event %}
    <li><a href="/event/{{ e.node.uuid }}">{{ e.node.title_nl }}</a></li>
  {% endfor %}
</ul>
```
</details>

<details>
<summary>code detailpagina content ophalen</summary>

```js
app.get('/event/:event', async (req, res) => {Add commentMore actions
  const uuid = req.params.event;

  try {
    // Haal de node-informatie op via UUID
    const url = `https://archive.framerframed.nl/api/node-by-id/${uuid}`;
    const response = await fetch(url);
    const json = await response.json();

    // Render met opgehaalde node
    return res.send(renderTemplate('server/views/detail.liquid', {
      title: json.node.title_nl || json.node.title_en || 'Event detail',
      event: json.node,
      assets: json.assets || [],
      relations: json.rels || []
    }));
  } catch (error) {
    console.error("Fout bij ophalen event:", error);
    return res.status(500).send('Fout bij ophalen eventgegevens.');
  }
});
```
</details>

<details>
<summary>code detailpagina liquid</summary>

```html
{% block content %}
{% if event.title_nl %}
  <h1>{{ event.title_nl }}</h1>
{% elsif event.title_en %}
  <h1>{{ event.title_en }}</h1>
{% else %}
  <h1>Event detail</h1>
{% endif %}

{% if event.content_nl %}
  <div>{{ event.content_nl }}</div>
{% else %}
  <div>{{ event.content_en }}</div>
{% endif %}Add commentMore actions

<p><strong>Start:</strong> {{ event.date_start }}</p>
<p><strong>Einde:</strong> {{ event.date_end }}</p>

<h2>Gerelateerde personen / relaties:</h2>
<ul>
  {% for rel in relations %}
    {% if rel.node.name %}
      <li>{{ rel.node.name }}</li>
    {% endif %}
  {% endfor %}
</ul>

{% endblock %}
```
</details>


Later deze week heb ik ervoor gezorgd dat de juist data in component werd gezet dat Mathijs heeft gemaakt. in `detail.liquid` wordt nu het component gerenderd:
```
{% render 'server/components/detailObject/detailObject.liquid', event: event, relations: relations %}
```
<details>
<summary>code data in component</summary>

```html
<section class="object">
        <div class="object-background">
            <time datetime="17-05-2024" class="year">17-05-2024</time>
        </div>
        <div class="object-container">
            {% if event.title_nl %}
            <h1 class="event">{{ event.title_nl }}</h1>
            {% elsif event.title_en %}
            <h1 class="event">{{ event.title_en }}</h1>
            {% else %}
            <h1 class="event">Event detail</h1>
            {% endif %}
            <ul>
                {% for rel in relations %}
                {% if rel.node.name %}
                <li>
                    <p class="person">{{ rel.node.name }}</p>
                </li>
                {% endif %}
                {% endfor %}
            </ul>
            {% if event.content_nl %}
            <div class="object-content">{{ event.content_nl }}</div>
            {% else %}
            <div class="object-content">{{ event.content_en }}</div>
            {% endif %}
    </section>
```
</details>

</details>

<details>
<summary>Week 3</summary>

## Week 3
### Kleuren
Ik ben er achter gekomen dat we als team veel verschillende kleuren gebruiken op de website die we op meerdere plekken gebruiken. momenteel is er geen plek waar deze gedefinieerd worden, daarom heb ik een bestand gemaakt waar alle custom variables voor kleuren in kunnen worden gezet.

<details>
<summary>colors.css</summary>

```css
body{
/* standaardkleuren */
  --color-text: #231f20;
  --color-background: #050100;

/* kleuren van de huisstijl, gebruik er 1 per keer */
  --color-accent1: #51C0E9;
  --color-accent2: #F7C3E5;
  --color-accent3: #BEC4E8;
  --color-accent4: #EEDE52;
  --color-accent5: #C7C1AC;
}
```
</details>

### Data ophalen voor relatie cards
Er is ook een component gemaakt dor Iris waarin een relaties word laten zien van hetgeen waarvan je op de detailpagina bent. Hiervoor heb ik ook de benodigde dat opgehaald wordt. Aangezien er verschillende soorten content in kan komen te zitten omdat een relatie veel verschillende soorten dingen kunnen zijn, heb ik ervoor gezorgd dat alle soorten content weergegeven kunnen worden. Naar de juiste pagina linken is nog niet gelukt.

<details>
<summary>code relatie component invullen</summary>

```html
<li>
  <section class="relation">
    {% if rel.node.guid and rel.node.name %}
      <a href="{{ rel.node.guid }}" class="event" target="_blank">
        {{ rel.node.name }}
      </a>
    {% else %}
      <p class="event">{{ rel.node.name }}</p>
    {% endif %}

    {% assign type = rel.node.type | downcase %}

    {% if rel.node.bio_nl %}
      <p>{{ rel.node.bio_nl | strip_html | truncate: 300 }}</p>
    {% endif %}
    {% if rel.node.bio_en %}
      <p>{{ rel.node.bio_en | strip_html | truncate: 300 }}</p>
    {% endif %}
    {% if rel.node.about_nl %}
      <p>{{ rel.node.about_nl | strip_html | truncate: 300 }}</p>
    {% endif %}
    {% if rel.node.about_en %}
      <p>{{ rel.node.about_en | strip_html | truncate: 300 }}</p>
    {% endif %}
    {% if rel.node.content_nl %}
      <p>{{ rel.node.content_nl | strip_html | truncate: 300 }}</p>
    {% endif %}
    {% if rel.node.content_en %}
      <p>{{ rel.node.content_en | strip_html | truncate: 300 }}</p>
    {% endif %}

    <ul class="relation-relation">
        {% if rel.rels and rel.rels.size > 0 %}
          {% for subrel in rel.rels %}
            <li>
              <p class="{{ subrel.type | downcase }} rel">{{ subrel.node.name }}</p>
            </li>
          {% endfor %}
        {% endif %}
    </ul>

    {% if rel.node.year %}
      <div class="hapje">
        <time class="year rel" datetime="{{ rel.node.year }}-01-01">
          {{ rel.node.year }}
        </time>
      </div>
    {% endif %}
  </section>
</li>
```
</details>

<details>
<summary>code data relatie component ophalen</summary>

```js
app.get('/event/:event', async (req, res) => {
  const uuid = req.params.event;

  try {
    // 1. Haal event data op
    const url = `https://archive.framerframed.nl/api/node-by-id/${uuid}`;
    const response = await fetch(url);
    const json = await response.json();

    const event = json.node;
    const assets = json.assets || [];
    const relations = json.rels || [];

    // 2. Voor elke relatie haal je ook de relaties van die relatie op
    const relationsWithSubs = await Promise.all(
      relations.map(async (rel) => {
        if (!rel.node?.uuid) return rel; // Geen uuid, gewoon terug

        try {
          const subUrl = `https://archive.framerframed.nl/api/node-by-id/${rel.node.uuid}`;
          const subResponse = await fetch(subUrl);
          const subJson = await subResponse.json();

          // Voeg de sub-relaties toe aan de huidige relatie
          return {
            ...rel,
            rels: subJson.rels || []
          };
        } catch (error) {
          console.error(`Fout bij ophalen sub-relaties van ${rel.node.uuid}:`, error);
          // fallback: return rel zonder subrels
          return {
            ...rel,
            rels: []
          };
        }
      })
    );

    // 3. Render de detailpagina met alles
    return res.send(renderTemplate('server/views/detail.liquid', {
      title: event.title_nl || event.title_en || 'Event detail',
      event,
      assets,
      relations: relationsWithSubs // relaties met subrelaties
    }));

  } catch (error) {
    console.error("Fout bij ophalen event:", error);
    return res.status(500).send('Fout bij ophalen eventgegevens.');
  }
});
```
</details>

### images in detailpagina
Ik heb er deze week ook voor gezorgd dat de assets die in de database staan word ingeladen als afbeelding bij de tekst. Dit heb ik gedaan door de asset die ik eerder al in de backend heb opgehaald mee te geven bij het renderen van het component: 

`{% render 'server/components/detailObject/detailObject.liquid', event: event, relations: relations, assets: assets %}`

<details>
<summary>code asset inladen in component</summary>

```html
<section class="object">
    <div class="object-container">
            {% if event.title_nl %}
            <h1 class="event tag">{{ event.title_nl }}</h1>
            {% elsif event.title_en %}
	@@ -11,16 +11,19 @@
                {% for rel in relations %}
                {% if rel.node.name %}
                <li>
                    {% render 'server/components/Rel-tag/relTag.liquid', rel: rel.node.name, class_name: rel.type %}
                </li>
                {% endif %}
                {% endfor %}
            </ul>
        {% if assets.size > 0 %}
            <img src="{{ assets[0].origin }}" alt="" />
        {% endif %}
        {% if event.content_nl %}
            <div class="object-content">{{ event.content_nl }}</div>
        {% else %}
            <div class="object-content">{{ event.content_en }}</div>
        {% endif %}
        <time datetime="17-05-2024" class="year tag">17-05-2024</time>
        </div>
</section>
```
</details>

### relatie component content laden
Momenteel wordt er met een lang if statement bepaald welke type data er op het relatie component wordt weergegeven. In mijn mening kan dit op een betere manier dan controleren of een bepaald type content beschikbaar is. Ik doe dit door het type op te halen dat de relatie is en op basis daarvan te bepalen welke content er geladen moet worden. Person hebben bijvoorbeeld een bio en evenement hebben content.

<details>
<summary>content inladen relatie component</summary>

```html
    {% assign type = rel.node.type | default: rel.node.type_en | default: rel.node.type_nl | downcase %}

    {% case type %}
      {% when "person" %}
        {% assign text = rel.node.bio_en | default: rel.node.bio_nl %}

      {% when "organisation" %}
        {% assign text = rel.node.about_en | default: rel.node.about_nl %}

      {% when "event" %}
      {% when "launch" %}
        {% assign text = rel.node.content_en | default: rel.node.content_nl %}
    {% endcase %}

    {% if text %}
      <p>{{ text | strip_html | truncate: 300 }}</p>
    {% endif %}
```
</details>

### subrelaties laden voor verschillende type objecten
We willen bij elke relatie ook relaties van de relatie laten zien. Aangezien de endpoint om relaties op te halen van personen anders is dan bij andere objecten heb ik een if statement gemaakt op basis van het type object van de primaire relatie. Als de relatie een persoon is gebruikt hij een andere endpoint om dat op te halen en geeft hij de juiste data terug en anders doet hij het met de gebruikelijke endpoint.

<details>
<summary>code subrelaties toevoegen</summary>

```js
app.get('/event/:event', async (req, res) => {
  const uuid = req.params.event;
  try {
    // 1. Haal event data op
    const url = `https://archive.framerframed.nl/api/node-by-id/${uuid}`;
    const response = await fetch(url);
    const json = await response.json();

    const event = json.node;
    const assets = json.assets || [];
    const relations = (json.rels || []).filter(rel => rel.type !== 'asset'); // filter assets weg

    // 2. Voor elke relatie haal subrelaties op (speciale route voor 'person')
    const relationsWithSubs = await Promise.all(
      relations.map(async (rel) => {
        if (!rel.node?.uuid) return rel;

        try {
          let subRels = [];

          if (rel.type == 'person') {
            // Speciaal pad voor personen
            const personUrl = `https://archive.framerframed.nl/api/rels-for/person/${rel.node.uuid}`;
            const personRes = await fetch(personUrl);
            const personJson = await personRes.json();

            // Gebruik alleen niet-asset sub-relaties
            subRels = (personJson.relations || []).filter(sub => sub.type !== 'asset');

            // Person-data zelf zit in personJson.person
            return {
              ...rel,
              node: personJson.person, // vervang met volledige person info
              rels: subRels
            };
          } else {
            // Standaard pad
            const subUrl = `https://archive.framerframed.nl/api/node-by-id/${rel.node.uuid}`;
            const subRes = await fetch(subUrl);
            const subJson = await subRes.json();

            subRels = (subJson.rels || []).filter(sub => sub.type !== 'asset');

            return {
              ...rel,
              rels: subRels
            };
          }
        } catch (error) {
          console.error(`Fout bij ophalen sub-relaties van ${rel.node.uuid}:`, error);
          return { ...rel, rels: [] };
        }
      })
    );

    // 3. Render de detailpagina
    return res.send(renderTemplate('server/views/detail.liquid', {
      title: event.title_nl || event.title_en || 'Event detail',
      event,
      assets,
      relations: relationsWithSubs
    }));
  } catch (error) {
    console.error("Fout bij ophalen event:", error);
    return res.status(500).send('Fout bij ophalen eventgegevens.');
  }
});
```
</details>

Omdat een persoon een naam heeft en geen titel zoals andere objecten, moet deze dus ook op deze manier worden doorgegeven naar de frontend. In liquid staat het zo dat als er geen naam is, dat er dan een titel komt te staan. ik heb hetzelfde ook toegepast op andere componenten die de titel of naam weergeven van een object/persoon.

<details>
<summary>code weergeven subrelaties</summary>

```html
<ul class="relation-relation">
  {% if rel.rels and rel.rels.size > 0 %}
    {% for subrel in rel.rels %}
      {% assign relNode = subrel.node | default: subrel.object %}
      {% assign title = relNode.title_en | default: relNode.title_nl %}
      {% if title == nil or title == "" %}
        {% assign displayText = relNode.name %}
      {% else %}
        {% assign displayText = title %}
      {% endif %}
      {% if displayText %}
        <li>
          <p class="{{ subrel.type | downcase }} rel">{{ displayText }}</p>
        </li>
      {% endif %}
    {% endfor %}
  {% endif %}
</ul>
```
</details>


</details>

<details>
<summary>Week 4</summary>

## Week 4
### code schoonmaken
Het begin van deze week heb ik vooral besteed aan kleine aanpassingen om de code op te schonen. Dit bevat bijvoorbeeld het verwijderen van onnodige comments en teamgenoten helpen met hun componenten. Dit bevat:

* Geholpen met de subrelaties in een `<details>` element stoppen.
* Een titel toegevoegd aan de lijst met relaties.
* Content anders inladen in relatie component, de juist soort content bij juiste soort object komt te staan.
* Relatie component linken naar juiste route voor events.
* Titel van events weergeven in liquid.
* juiste classes toevoegen aan elementen.


<details>
<summary>code subrelaties in details</summary>

```html
    {% if rel.rels and rel.rels.size > 0 %}Add commentMore actions
      <details class="skiplink rel">
        <summary>Laat {{ rel.rels.size }} relaties zien</summary>
        <ul class="relation-relation">
          {% for subrel in rel.rels %}
            {% assign relNode = subrel.node | default: subrel.object %}
            {% assign title = relNode.title_en | default: relNode.title_nl %}
            {% if title == nil or title == "" %}
              {% assign displayText = relNode.name %}
            {% else %}
              {% assign displayText = title %}
            {% endif %}
            {% if displayText %}
              <li>
                <p class="{{ subrel.type | downcase }} rel">{{ displayText }}</p>
              </li>
            {% endif %}
          {% endfor %}
        </ul>
      </details>
    {% endif %}
```
</details>

<details>
<summary>code relatie lijst titel</summary>

```html
{% layout "server/layouts/base.liquid" %}
{% block content %}
<div class="detail-container">
  {% render 'server/components/detail-object/detail-object.liquid', event: event, relations: relations, assets: assets %}
  <div>
    <h2>relaties:</h2>
    <ul>
    {% for rel in relations %}
        {% render 'server/components/relation/relation.liquid', rel: rel %}
    {% endfor %}
    </ul>
  </div>
</div>
{% endblock %}
```
</details>

<details>
<summary>code content in relaties</summary>

```html
    {% assign type = rel.node.type | default: rel.node.type_en | default: rel.node.type_nl | downcase %}
    {% assign text = "" %}

    {% if type == "person" %}
      {% assign text = rel.node.bio_en | default: rel.node.bio_nl %}
    {% elsif type == "organisation" or type == "collective" %}
      {% assign text = rel.node.about_en | default: rel.node.about_nl %}
    {% else %}
      {% assign text = rel.node.content_en | default: rel.node.content_nl %}
    {% endif %}

    {%- unless text -%}
      {%- assign text = rel.node.content_en | default: rel.node.content_nl -%}
    {%- endunless -%}
```
</details>

<details>
<summary>code relaties linken naar event</summary>

```html
    {% if rel.node.uuid and displayText %}
      <a href="/event/{{ rel.node.uuid }}" class="event">
        {{ displayText }}
      </a>
    {% else %}
      <p class="event">{{ displayText }}</p>
    {% endif %}
```
</details>

<details>
<summary>code event titel weergeven</summary>

```html
        {% assign title = event.title_en | default: event.title_nl %}
        {% if title == nil or title == "" %}
          {% assign EventTitle = event.name %}
        {% else %}
          {% assign EventTitle = title %}
        {% endif %}
        <h1 class="event tag">{{ EventTitle }}</h1>
```
</details>

### Person & organisation detailpagina
Momenteel hebben we alleen detailpagina's voor evenementen. Deze week heb ik de routes gemaakt om naar detailpagina's van personen en organisaties te gaan. Ik heb ook de liquid bestanden gemaakt om deze data te kunnen laten zien. Deze liquid bestanden zijn deel van het bestaande component dat al voor de events bestaat, dit component word in de views gezet die ik heb gemaakt voor elke type object. De views halen allemaal andere data op afhankelijk van welk type object de detailpagina van is.

<details>
<summary>code organisatie route</summary>

```js
app.get("/organisation/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const url = `https://archive.framerframed.nl/api/rels-for/organisation/${uuid}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const organisation = data.person; 
    const relations = (data.relations || []).filter(rel => rel.type !== "asset");

    return res.send(
      renderTemplate("server/views/organisation-detail.liquid", {
        title: organisation.name || "Organisation",
        organisation,
        relations,
      })
    );
  } catch (error) {
    console.error("Fout bij ophalen organisatie:", error);
    return res.status(500).send("Fout bij ophalen organisatiedata.");
  }
});
```
</details>

<details>
<summary>code organisatie view</summary>

```html
{% layout "server/layouts/base.liquid" %}

{% block content %}
<div class="detail-container">
  {% render 'server/components/detail-object/organisation-object.liquid', organisation: organisation, relations: relations %}
  <div>
    <h2>relaties:</h2>
    <ul>
      {% for rel in relations %}
        {% render 'server/components/relation/relation.liquid', rel: rel %}
      {% endfor %}
    </ul>
  </div>
</div>
{% endblock %}
```
</details>

<details>
<summary>code organisatie liquid</summary>

```html
<section class="object">
  <div class="object-container">
    <h1 class="event tag">{{ organisation.name }}</h1>
    {% if organisation.about_nl != "" %}
      <div class="object-content">{{ organisation.about_nl }}</div>
    {% elsif organisation.about_en %}
      <div class="object-content">{{ organisation.about_en }}</div>
    {% endif %}
    {% if organisation.created %}
      <div class="time-content hapje">
        <time class="year tag">{{ organisation.created | date: "%d-%m-%Y" }}</time>
      </div>
    {% endif %}
  </div>
</section>
```
</details>

<details>
<summary>code persoon route</summary>

```js
app.get("/person/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const url = `https://archive.framerframed.nl/api/rels-for/person/${uuid}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.person;
    const relations = (data.relations || []).filter(rel => rel.type !== "asset");

    return res.send(
      renderTemplate("server/views/person-detail.liquid", {
        title: person.name || "Person",
        person,
        relations,
      })
    );
  } catch (error) {
    console.error("Fout bij ophalen persoon:", error);
    return res.status(500).send("Fout bij ophalen persoonsgegevens.");
  }
});
```
</details>

<details>
<summary>code persoon view</summary>

```html
{% layout "server/layouts/base.liquid" %}

{% block content %}
<div class="detail-container">
  {% render 'server/components/detail-object/person-object.liquid', person: person, relations: relations %}
  <div>
    <h2>relaties:</h2>
    <ul>
      {% for rel in relations %}
        {% render 'server/components/relation/relation.liquid', rel: rel %}
      {% endfor %}
    </ul>
  </div>
</div>
{% endblock %}
```
</details>

<details>
<summary>code persoon liquid</summary>

```html
<section class="object">
  <div class="object-container">
    <h1 class="event tag">{{ person.name }}</h1>
    {% if person.bio_nl != "" %}
      <div class="object-content">{{ person.bio_nl }}</div>
    {% elsif person.bio_en %}
      <div class="object-content">{{ person.bio_en }}</div>
    {% endif %}
  </div>
</section>
```
</details>

### subrelaties op de nieuwe views voor personen en organisaties
Wat ik heb toegepast op de detaipagina voor events heb ik nu ook toegepast op de detailpagina van personen en organisaties om de relaties van relaties op te halen. Ik heb hierbij ook het relatie component aangepast zodat alle routes kloppen, je kan nu als gebruiker naar elke relatie gaan vanaf een detailpagina.

<details>
<summary>code relatie component met juiste routes</summary>

```html
<li>
  <section class="relation">
    {% assign title = rel.node.title_en | default: rel.node.title_nl %}
    {% if title == nil or title == "" %}
      {% assign displayText = rel.node.name %}
    {% else %}
      {% assign displayText = title %}
    {% endif %}

    {% assign rel_type = rel.type | downcase %}
    {% assign uuid = rel.node.uuid %}

    {% if displayText and uuid %}
      {% if rel_type == "person" %}
        <a href="/person/{{ uuid }}" class="event">{{ displayText }}</a>
      {% elsif rel_type == "organisation" %}
        <a href="/organisation/{{ uuid }}" class="event">{{ displayText }}</a>
      {% elsif rel_type == "event" %}
        <a href="/event/{{ uuid }}" class="event">{{ displayText }}</a>
      {% else %}
        <a href="/event/{{ uuid }}" class="organisation">{{ displayText }}</a>
      {% endif %}
    {% else %}
      <p class="event">{{ displayText }}</p>
    {% endif %}
    {% assign type = rel.node.type | default: rel.node.type_en | default: rel.node.type_nl | downcase %}
    {% assign text = "" %}
    {% if type == "person" %}
      {% assign text = rel.node.bio_en | default: rel.node.bio_nl %}
    {% elsif type == "organisation" or type == "collective" %}
      {% assign text = rel.node.about_en | default: rel.node.about_nl %}
    {% else %}
      {% assign text = rel.node.content_en | default: rel.node.content_nl %}
    {% endif %}
    {%- unless text -%}
      {%- assign text = rel.node.content_en | default: rel.node.content_nl -%}
    {%- endunless -%}
    {% if text %}
      <p>{{ text | strip_html | truncate: 300 }}</p>
    {% endif %}
    {% if rel.rels and rel.rels.size > 0 %}
      <details class="skiplink rel">
        <summary>Laat {{ rel.rels.size }} relaties zien</summary>
        <ul class="relation-relation">
          {% for subrel in rel.rels %}
            {% assign relNode = subrel.node | default: subrel.object %}
            {% assign title = relNode.title_en | default: relNode.title_nl %}
            {% if title == nil or title == "" %}
              {% assign displayText = relNode.name %}
            {% else %}
              {% assign displayText = title %}
            {% endif %}
            {% if displayText %}
              <li>
                <p class="{{ subrel.type | downcase }} rel">{{ displayText }}</p>
              </li>
            {% endif %}
          {% endfor %}
        </ul>
      </details>
```
</details>

<details>
<summary>code person route met subrelaties</summary>

```js
app.get("/person/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  try {
    // 1. Haal de persoon-relaties op (speciale API)
    const url = `https://archive.framerframed.nl/api/rels-for/person/${uuid}`;
    const response = await fetch(url);
    const json = await response.json();

    const person = json.person;
    const relations = (json.relations || []).filter((rel) => rel.type !== "asset");

    // 2. Haal sub-relaties op per relatie
    const relationsWithSubs = await Promise.all(
      relations.map(async (rel) => {
        const relNode = rel.node || rel.object;
        if (!relNode?.uuid) return rel;

        try {
          let subRels = [];

          if (rel.type === "person") {
            const personUrl = `https://archive.framerframed.nl/api/rels-for/person/${relNode.uuid}`;
            const personRes = await fetch(personUrl);
            const personJson = await personRes.json();

            subRels = (personJson.relations || []).filter((sub) => sub.type !== "asset");

            return {
              ...rel,
              node: personJson.person,
              rels: subRels,
            };
          } else {
            const subUrl = `https://archive.framerframed.nl/api/node-by-id/${relNode.uuid}`;
            const subRes = await fetch(subUrl);
            const subJson = await subRes.json();

            subRels = (subJson.rels || []).filter((sub) => sub.type !== "asset");

            return {
              ...rel,
              node: subJson.node,
              rels: subRels,
            };
          }
        } catch (error) {
          console.error(`Fout bij ophalen sub-relaties van ${relNode.uuid}:`, error);
          return { ...rel, rels: [] };
        }
      })
    );

    // 3. Render pagina
    return res.send(
      renderTemplate("server/views/person-detail.liquid", {
        title: person.name || "Persoon",
        person,
        relations: relationsWithSubs,
      })
    );
  } catch (error) {
    console.error("Fout bij ophalen persoon:", error);
    return res.status(500).send("Fout bij ophalen persoongegevens.");
  }
});
```
</details>

<details>
<summary>code person object component</summary>

```html
<section class="object">
  <div class="object-container">
    <h1 class="event tag">{{ person.name }}</h1>
      <ul>
        {% for rel in relations %}
          {% if rel.node.name %}
            <li>
              {% if rel.node.title_en != null and rel.node.title_en != ""  or if rel.node.title_nl != null and rel.node.title_nl != ""%}
                {% assign text = rel.node.title_en | default: rel.node.title_nl %}
              {% else %}
                {% assign text = rel.node.name %}
              {% endif %}
                {% render 'server/components/rel-tag/rel-tag.liquid', rel: text, class_name: rel.type %}
            </li>
          {% endif %}
        {% endfor %}
      </ul>
    {% if person.bio_nl != "" %}
      <div class="object-content">{{ person.bio_nl }}</div>
    {% elsif person.bio_en %}
      <div class="object-content">{{ person.bio_en }}</div>
    {% endif %}
  </div>
</section>
```
</details>

<details>
<summary>code organisation route met subrelaties</summary>

```js
app.get("/organisation/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const url = `https://archive.framerframed.nl/api/rels-for/organisation/${uuid}`;
    const response = await fetch(url);
    const json = await response.json();

    const organisation = json.person || {}; // fallback
    const relations = (json.relations || []).filter((rel) => rel.type !== "asset");

    const relationsWithSubs = await Promise.all(
      relations.map(async (rel) => {
        const relNode = rel.node || rel.object;
        if (!relNode?.uuid) return rel;

        try {
          let subRels = [];

          if (rel.type === "person") {
            const personUrl = `https://archive.framerframed.nl/api/rels-for/person/${relNode.uuid}`;
            const personRes = await fetch(personUrl);
            const personJson = await personRes.json();

            subRels = (personJson.relations || []).filter((sub) => sub.type !== "asset");

            return {
              ...rel,
              node: personJson.person,
              rels: subRels,
            };
          } else {
            const subUrl = `https://archive.framerframed.nl/api/node-by-id/${relNode.uuid}`;
            const subRes = await fetch(subUrl);
            const subJson = await subRes.json();

            subRels = (subJson.rels || []).filter((sub) => sub.type !== "asset");

            return {
              ...rel,
              node: subJson.node,
              rels: subRels,
            };
          }
        } catch (error) {
          console.error(`Fout bij ophalen sub-relaties van ${relNode.uuid}:`, error);
          return { ...rel, rels: [] };
        }
      })
    );

    return res.send(
      renderTemplate("server/views/organisation-detail.liquid", {
        title: organisation.name || "Organisatie",
        organisation,
        relations: relationsWithSubs,
      })
    );
  } catch (error) {
    console.error("Fout bij ophalen organisatie:", error);
    return res.status(500).send("Fout bij ophalen organisatiegegevens.");
  }
});
```
</details>

<details>
<summary>code organisation object component</summary>

```html
<section class="object">
  <div class="object-container">
    <h1 class="event tag">{{ organisation.name }}</h1>
      <ul>
        {% for rel in relations %}
          {% if rel.node.name %}
            <li>
              {% if rel.node.title_en != null and rel.node.title_en != ""  or if rel.node.title_nl != null and rel.node.title_nl != ""%}
                {% assign text = rel.node.title_en | default: rel.node.title_nl %}
              {% else %}
                {% assign text = rel.node.name %}
              {% endif %}
                {% render 'server/components/rel-tag/rel-tag.liquid', rel: text, class_name: rel.type %}
            </li>
          {% endif %}
        {% endfor %}
      </ul>
    {% if organisation.about_nl != "" %}
      <div class="object-content">{{ organisation.about_nl }}</div>
    {% elsif organisation.about_en %}
      <div class="object-content">{{ organisation.about_en }}</div>
    {% endif %}
    {% if organisation.created %}
      <div class="time-content hapje">
        <time class="year tag">{{ organisation.created | date: "%d-%m-%Y" }}</time>
      </div>
    {% endif %}
  </div>
</section>
```
</details>

Ik ben er hier ok achter gekomen dat organisaties ook een apparte endpoint hebben om de subrelaties op te kunnen halen. Ik heb dit opgelost door in de backend ook te kijken naar wat voor type een relatie is, ik had dit al gedaan voor in het geval dat een relatie een persoon was dus de code was grotendeels hetzelfde:

<details>
<summary>code organisation subrelaties</summary>

```js
app.get("/event/:event", async (req, res) => {
  const uuid = req.params.event;

  try {
    const url = `https://archive.framerframed.nl/api/node-by-id/${uuid}`;
    const response = await fetch(url);
    const json = await response.json();

    const event = json.node;
    const assets = json.assets || [];
    const relations = (json.rels || []).filter((rel) => rel.type !== "asset");

    const relationsWithSubs = await Promise.all(
      relations.map(async (rel) => {
        if (!rel.node?.uuid) return rel;

        try {
          let subRels = [];

          if (rel.type === "person") {
            const personUrl = `https://archive.framerframed.nl/api/rels-for/person/${rel.node.uuid}`;
            const personRes = await fetch(personUrl);
            const personJson = await personRes.json();

            subRels = (personJson.relations || []).filter((sub) => sub.type !== "asset");

            return {
              ...rel,
              node: personJson.person,
              rels: subRels,
            };
          } else if (rel.type === "organisation") {
            const orgUrl = `https://archive.framerframed.nl/api/rels-for/organisation/${rel.node.uuid}`;
            const orgRes = await fetch(orgUrl);
            const orgJson = await orgRes.json();

            subRels = (orgJson.relations || []).filter((sub) => sub.type !== "asset");

            return {
              ...rel,
              node: orgJson.person, // Let op: key is 'person' ook bij organisatie API
              rels: subRels,
            };
          } else {
            const subUrl = `https://archive.framerframed.nl/api/node-by-id/${rel.node.uuid}`;
            const subRes = await fetch(subUrl);
            const subJson = await subRes.json();

            subRels = (subJson.rels || []).filter((sub) => sub.type !== "asset");

            return {
              ...rel,
              rels: subRels,
            };
          }
        } catch (error) {
          console.error(`Fout bij ophalen sub-relaties van ${rel.node.uuid}:`, error);
          return { ...rel, rels: [] };
        }
      })
    );

    return res.send(
      renderTemplate("server/views/detail.liquid", {
        title: event.title_nl || event.title_en || "Event detail",
        event,
        assets,
        relations: relationsWithSubs,
      })
    );
  } catch (error) {
    console.error("Fout bij ophalen event:", error);
    return res.status(500).send("Fout bij ophalen eventgegevens.");
  }
});
```
</details>

### Detailpagina layout
Om er voor te zorgen dat alle components goed op de detailpagina kwamen te staan heb ik de CSS geschreven voor de layout van de detailpagina.

<details>
<summary>code detailpage layout</summary>

```css
.detail-container {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 2rem;
}

.relaties-container{

  h2 {
  color: white;
  font-size: 3rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 85.7vh;
    overflow-y: scroll;

    scrollbar-width: thin;
    scrollbar-color: #F9F6EE black;
  }
}
```
</details>

</details>

<details>
<summary>Week 5</summary>

## Week 5
### Content scroller
Aangezien ik tijdens dit project nog weinig CSS heb geschreven terwijl ik dat wel wou doen heb ik er deze week voor gekozen om geen nieuwe features meer toe te voegen aan de backend. Toen ik vorige week bij CSS day was heb ik heel veel dingen gezien die ik wil uitproberen, dit bevat ook de content scroller die Adam argyle liet zien. Ik heb deze content scroller geprobeerd toe te passen op ons project.

<img src="https://github.com/user-attachments/assets/05303cc3-7b6c-4364-80ba-17319d68b090" />

De HTML structuur ziet er als volgt uit:
```HTML
            <section class="object-content scroll-root">
                <div class="scroll-viewport">
                    <div class="scroll-content">
                        {{ event.content_en }}
                    </div>
                </div>
            </section>
```
`Scroll-root` zorgt ervoor dat er een container om de scrollbar en de content zit en er dus padding tussen de scrollbar en de container gezet kant worden. Dit element word ook gebruikt om als anchor te gebruiken voor de knoppen die de scrollbar bedienen. `scroll-viewport` zit om de content en de daadwerkelijke scrollbar heen, de scrollbar valt buiten `scroll-content`. `scroll-viewport` is ook een container mochten elemanten die daar in zitten het nodig hebben.

In deze scroller zijn heel wat kleine affordances om feedback te geven op de interactie die de gebruiker heeft. Dit bevat verschillen in klein en scale op verschillende states en laten zien wanneer een knop niet beschikbaar is omdat je niet verder kan scrollen. hiervoor heb ik ook standaard styling van de scroller weggehaald omdat in sommige browsers, de scrollbar een outline krijgt als hij focus krijgt. In mijn geval zijn er genoeg andere affordances die het duidelijk maken dat de scrollbar gefocust is dus is deze outline weggehaald.

Om de scroller een light en darkmode te geven waarmee ik ook de kleuren van verschillende states kan veranderen heb ik `light-dark` gebruikt in een custom variable (`--theme`). Ik kan deze waarde dan bijvoorbeeld bij de hover state gebruiken in `color-mix` om op basis van de theme een ander kleure te krijgen voor de hover state. Een andere custom variable die ik heb aangemaakt is de `--space`. deze gebruik ikvoor margins en om de scrollbuttons te plaatsen.

Met gedachte dat er gebruikers zijn die niet veel tegen bewegend beeld kunnen, is er alleen `scroll-behavior: smooth;` als prefers-reduced-motion geen preference heeft.

Een klein trucje dat ik heb geleerd tijdens CSS dat is dat je met `#0000` een transparante kleur krijgt. In de code zie je ook `border-radius: 1e3px;` dit zorgt ervoor dat de border radius precies rond is en niet vreemde vormen krijgt als soms bij 50% gebeurd. Wat hier eigenlijk staat is 1000px(1 met 3 nullen).

Aangezien Firefox geen `-webkit` ondersteund voor de scrollbar, moet er voor firefox andere code geschreven worden met onder andere `scrollbar-color` onder `@supports (-moz-appearance: none)`. Het is helaas niet mogelijk om dit met @ supports te doen aangezien Chrome allebei ondersteund.

De scroller is ook goed te zien met forced color mode aan omdat alle elementen een border hebben. Hiervoor is ook appart een border aangemaakt in de thumb van de scrollbar zodat deze extra styling heeft in deze modus.

De `::scroll-button` heeft verschillende styling voor verschillende states om weer een laag affordance aan te bieden. Dit zorgt ook voor een leuke animatie wanneer er op de knop wordt gedrukt door `scale`. De buttons worden geplaats door midden van anchor positioning. De bovenste knop is geanchored aan de `scroll-root` maar is zelf ook een anchor om de ander knop aan te anchoren. Op deze manier blijft de onderste knop altijd op dezelfde locatie ten opzichte van de bovenste knop.

<details>
<summary>code scroller</summary>

```css
.scroll-root {
      --space: 1lh;
      --theme: light-dark(hsl(none none 40%), hsl(none none 80%));
      anchor-name: --scroll-root;
      border-radius: 10px;
      border: 1px solid var(--_theme);
      padding-inline-end: var(--space);

      > .scroll-viewport {
        container: --scrollport / size scroll-state;
        anchor-name: --scroll-viewport;
        height: 100%;
        overflow: hidden auto;
        overscroll-behavior-y: contain;

        @media (prefers-reduced-motion: no-preference) {
          scroll-behavior: smooth;
        }

        &:is(:focus-visible, :focus-within) {
          outline-offset: -2px;
          outline: none;
        }

        &::-webkit-scrollbar {
          width: 10px;
        }

        &::-webkit-scrollbar-track {
          background: color-mix(in srgb, var(--theme), #0000 80%);
          border-radius: 1e3px;
          background-clip: padding-box;
          margin-block: 1lh;
        }

        &::-webkit-scrollbar-thumb {
          background: color-mix(in srgb, var(--theme), #0000 25%);
          border-radius: 1e3px;
        }

        &:is(:focus-visible, :focus-within)::-webkit-scrollbar-thumb {
          background: var(--theme);
        }

        @media (forced-colors: active) {
          &::-webkit-scrollbar-thumb {
            border: 2px solid currentcolor;
          }
        }

        @media (hover) {
          &::-webkit-scrollbar {
            opacity: 0.5;
          }

          &::-webkit-scrollbar:hover {
            opacity: 1;
          }

          &:hover::-webkit-scrollbar-thumb {
            background: color-mix(in srgb, var(--theme), #0000 10%);
          }

          &::-webkit-scrollbar-thumb:hover {
            background: var(--theme);
          }
        }

        @supports (-moz-appearance: none) {
          scrollbar-width: thin;
          scrollbar-color: var(--theme) #0000;
          transition: scrollbar-color 0.3s ease;

          &:is(:focus-visible, :focus-within) {
            scrollbar-color: LinkText #0000;
          }

          @media (hover) {
            scrollbar-color: light-dark(#eee, #333) #0000;

            &:hover {
              scrollbar-color: var(--theme) #0000;
            }
          }
        }

        > .scroll-content {
          padding: var(--space);
        }

        @supports selector(::scroll-button(*)) {
          &::scroll-button(*) {
            position: fixed;
            appearance: none;
            background: none;
            -webkit-tap-highlight-color: transparent;
            border: 1px solid var(--theme);
            border-radius: 50%;
            aspect-ratio: 1;
            inline-size: 36px;

            transition: opacity 0.5s, scale 0.8s, background-color 0.2s;
          }

          &::scroll-button(*):not(:disabled):is(:hover, :focus-visible) {
            background: color-mix(in srgb, var(--theme), #0000 90%);
          }

          &::scroll-button(*):not(:disabled):active {
            scale: 80%;
          }

          &::scroll-button(*):disabled {
            opacity: 25%;
          }

          &::scroll-button(up) {
            content: "▲" / "Scroll up";

            position-area: inline-start span-block-start;
            position-anchor: --scroll-root;
            anchor-name: --scroll-buttondown;
            margin-inline-end: var(--space);
            margin-block-end: calc(3 * var(--space));
          }

          &::scroll-button(down) {
            content: "▼" / "Scroll down";

            position-anchor: --scroll-buttondown;
            position-area: block-end;
            margin-block-start: calc(var(--space) / 2);
          }
        }
      }
    }
```
</details>

Ik heb deze scrollbar later ook gebruikt voor de rechter kant van het scherm bij de detailpagina om te scrollen door de relaties heen. Hier heb ik geen knoppen toegevoegd en de container heeft bij deze scroller ook geen border omdat het meer een soort caroussel is.

### Kleine laatste fixes
de rest van deze week heb ik vooral kleine dingen gedaan die we nog af wilde maken voor de oplevering bij de opdrachtgever. Dit bevat:
* Main hoogte bepalen op basis van de hoogte van de header zodat er geen scroll is op de detailpagina.
* Grid leesbaarder maken voor het relatie component.
* Tags beter leesbaar maken door `font-size` op 1rem te zetten en iets meer padding om de letters beter te kunnen zien.
* Overal waar ik data in laadt, Engelse data de voorrang geven tot Nederlands aangezien er meer Engelse data beschikbaar is dn Nederlands.
* Layout en typografie responsive maken op de homepagina.

</details>