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
        alinea: [
          'Hij introduceerde het principe "rule of least power", wat gaat over het kiezen van de minst complexe oplossing voor het probleem dat je hebt. Bijvoorbeeld, als je een probleem kunt oplossen met HTML, CSS of JavaScript, kies dan voor HTML.',
          'Hierbij gaf hij een aantal voorbeelden van nieuwe HTML oplossingen dat vooraf gedaan werd met Javascript. Hieronder een aantal voorbeelden:',
          '<ul> <li>"input type="color""</li> <li>HTML accordion met summary en details element</li> <li>dialog element</li> </ul>'          
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea:[
          'Dit Was mijn eerste indruk van nieuwe web development functies. het was erg interesant om te zien hoeveel ja al kan doen met alleen HTML tags. Alhoewel was het voor mij wel veel informatie en ik begreep nog niet zo goed ik de dingen die hij liet zien toe moest passen.',
          'Nu ik hier op terug kijk, wordt ik weer opnieuw enthousiast over de mogelijkheden die er zijn met HTML. Het geeft me een gevoel om meer uit te gaan zoeken wat er allemaal mogelijk is met enkel HTML en CSS. Het is een goede reminder dat je niet altijd de meest complexe oplossing hoeft te kiezen, maar dat er vaak eenvoudigere oplossingen zijn die ook goed werken.'
        ] 
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
        alinea:[
          'Web monetization is een manier om websites te monetizen door middel van een browserextentie bij de bezoeker. Het idee is dat je een website kunt maken die automatisch betaald wordt door de bezoekers. Dit kan bijvoorbeeld door middel van een abonnement of door het betalen per bezoek.',
          'Hij gaf een aantal voorbeelden van hoe dit werkt en hoe je het kunt implementeren. Het idee is dat je een API kunt gebruiken om betalingen te verwerken en dat je dit kunt integreren in je website.'
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea:[
          'Nadat ik het verhaal van Peter had gehoord wist ik niet zo goed wat ik er van vond. Aan de ene kant vind ik het een goed initiatief om mensen mensen te betalen voor het werk dat ze doen. Maar aan de andere kant denk ik niet dat dit de oplossing is voor het probleem dat we hebben met advertenties en privacy.', 
          'In het geval dat iedereen dit systeem zou gebruiken is het erg goed vor de privacy maar de meeste gebruikers zijn zich er niet van bewust dat dit een probleem is. Ik vraag me af of mensen het een aantrekkelijke oplossing om te betalen voor iets waar ze al "gratis" toegang tot hebben door te betalen met hun gegevens of het zien van advertenties wat voor veel geen groot probleem is.'
        ]
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
        titel: 'Typografie',
        alinea: [
          'typografie is een erg belangrijk onderwerp in de webwereld. Het is een onderwerp waar ik me voor de presentatie van Roel niet zo veel mee bezig heb gehouden. Roel liet zien wat er allemaal mogeljk is met fonts en hoe je dit creatief kan toepassen op het web.',
          'Hij gaf een aantal voorbeelden van variable fonts en hoe je deze op verschillende manieren kan toepassen en liet zien hoe je deze makkelijk kan animeren met CSS'
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea: [
          'Dit was de eerste keer dat ik van variable fonts heb gehoord. Ik kreeg al meteen ideeën hoe ik dit kan toepassen om meer feedback te geven aan de gebruiker in websites door het font te animeren.',
          'Ik vind het erg cool dat je zo veel kan doen met alleen een font. Ik hop dit vaker toe te kunnen pasen in mijn eigen projecten.'
        ]
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
    inleiding: 'Cassie Evans is een creatieve ontwikkelaar die bekend staat om haar werk bij GreenSock (GSAP), een JavaScript-animatielibrary. <br> <br>Met haar passie voor interactieve webanimaties en toegankelijke code, maakt ze lastige concepten voor animatie begrijpelijk.',
    content: [
      {
        titel: 'GSAP',
        alinea: [
          'De presentatie van Cassie ging over allemaal mogelijkheden voor animatie die je met de GSAP animatie library kan maken. Ze liet voorbeelden zien van verschillende funties:',
          '<ul> <li>GSAP untils</li> <li>easing</li> <li>helper function</li> </ul>',
          'Dit werd allemaal erg snel uitgelegd en ik had niet echt het idee dat ik het goed begreep. Het was erg veel informatie in een korte tijd.'
        ]
      },
      {
        titel: 'Wat ik mee ga nemem',
        alinea: [
          'Dit was de eerste keer dat ik van GSAP heb gehoord. Ik zag al meteen dat hier heel veel mee moglejk is maar de presentatie was voor mij erg veel en niet behapbaar.',
          'Het voelde meer alsof Cassie GSAP probeerde te verkopen in plaats van iets uit te leggen. Het maakte me niet enthousiast om GSAP te gaan gebruiken voor mjn volgende project.',
          'Ik zie wel de potentie maar ben momenteel meer geïntresseerd in pure CSS animaties. wellicht dat ik het in de toekomst ga gebruiken als ik het niet voor elkaar krijg met pure CSS.'
        ]
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
    inleiding: 'Nils Binder is een ervaren front-end developer met een passie voor CSS en origami. <br> <br>Bij 9elements werkt hij samen met een team om innovatieve projecten waar te maken.',
    content: [
      {
        titel: 'Design for flexibility',
        alinea: [
          'Nils heeft het tijdens zijn presentatie over designen voor flexibiliteit. Dit houdt in dat websites er goed uit zien om verschillende formaten schermen.',
          'Hij legt uit dat je dit op ceativere manieren kan doen naast het gebruiken van de 12 collommen grid dat veel voor komt. Dit komt doordat websites meestal worden ontworpen in programma\'s zoals figma en dat dit er voor zorgt dat je minder snel aan creativere oplossingen denkt die je kan maken met CSS.',
          'Een voorbeeld hiervan is het gebruik maken van containers om de layout flexibel te maken en niet vast zit aan een grid.'
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea: [
          'Het idee van designen voor flexibiliteit sprak voor mij vor zich. "Natuurlijk wil je dat je website er goed uitziet op verschillende schermen" dacht ik. Maar ik had er nog niet over nagedacht hoe dit gedaan kon worden.',
          'Bij de dingen die Nils liet zien zag ik meteen hoe dit nuttig is en dat het veel vrijheid geeft om je website eigen te maken. het is een goede reminder dat je niet altijd vast hoeft te houden aan de standaard grids die er zijn.',
          'Ik wil zeker oefenen met het gebruiken van containers en flexbox om mijn websites flecibeler te maken.'
        ]
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
        titel: 'declative & imperative programming',
        alinea: [
          'Jeremy heeft het over het verschil tussen declarative en imperative programmeren. Dit zijn verschillende manieren om code te schrijven en hebben verschillende voordelen.',
          'Declarative programming is een manier van programmeren waarbij je beschrijft wat je wilt dat er gebeurt, zonder precies te zeggen hoe het moet gebeuren. Dit maakt de code vaak makkelijker te begrijpen. Een voorbeeld hiervan is het gebruik van CSS om de stijl van een website te beschrijven.',
          'Imperative programming is een manier van programmeren waarbij je precies beschrijft hoe iets moet gebeuren. Dit maakt de code vaak moeilijker te begrijpen. Als een onderdeel het niet doet, werkt het hele programma vaak niet. Een voorbeeld hiervan is het gebruik van JavaScript om de stijl van een website te beschrijven.',
          'hetzelfde geldt voor de mindset van het team. Als je een team hebt met een declarative mindset, zijn ze vaak meer gebouwd op vertrouwen en kan je dingen op je eigen manier oplossen. Als het maar werkt.',
          'Als je een team hebt met een imperative mindset, zijn ze vaak meer gebouwd op controle en zit er een groter systeem achter. Dit kan leiden tot problemen als iemand iets anders doet dan de rest van het team.'
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea: [
          'Deze presentatie heeft mij inzicht gegeven in hoe de mindset van het team invloed heeft op hoe een project wordt agehandeld. Het heeft me laten denken over hoe ik zelf werk en wat bij mij past.',
          'Ik vind het erg fijn om dingen op mijn eigen manier op te lossen en niet ergens aan vast te zitten. Maar aan de andere heb ik ook graag structuur vor wanneer dingen af moeten zijn.',
          'Dit is iets waar ik constant mee bezig kan zijn in te toekomst. Wat voor ontwikkelaar wil ik zijn? Op welke manier moet ik dit oplossen? En wat voor team wil ik om me heen hebben?'
        ]
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
        titel: 'CSS Animaties',
        alinea: [
          'Julie laat bij haar presentatie verschillende oude projecten zien waar ze alleen CSS gebruikt om levendeige animaties te maken.',
          'Zij heeft laten zien dat er super veel mogelijk is met enkel CSS en dat er geen limiet is tot wat we ermee kunnen maken.',
          'In haar animaties is te zien dat ze aan soort skelet bouwt in HTML en de verschillende onderdelen van dat skelet met CSS animeert. Dit zorgt evoor dat positie van de onderldelen in van elkaar afhankelijk zijn en dat ze dus op de juiste plek blijven staan relatief tot elkaar.'
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea: [
          'Om te zien wat er allemaal mogelijk is met enkel CSS maakte me erg anthousiast. Ik heb nog nooit zulke levendige animaties gezien die alleen met CSS zijn gemaakt.',
          'Ik had al eerder ervaring opgedaan met "tekenen" met CSS toen ik met puur CSS een polaroid camera had gemaakt. Maar dit was een heel ander niveau.',
          'Hoewel ik heel graag meer wou weten is het ergens wel intimiderend en weet ik niet zeker tot hoever dit in de praktijk haalbaar is om te maken.',
          'Het voelt meer als iets dat je in je vrije tijd kan doen als hobby of kunst dat iets om in de praktijk te gebruiken voor webproducten.'
        ]
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
        titel: 'Circuit bending',
        alinea: [
          'Rosa heeft het gehad over circuit bending. Dit houdt in dat je hardware kan "hacken" om het wat anders te laten doen dan het origineel voor bedoeld was.',
          'Zij geeft aan dat het er om gaat dat je vooral wat aan het doen bent en niet te veel na denkt over over je plan.',
          'Apparaten van nu zijn vaak zo goed beveiligd dat je ze niet meer kan open maken. Dit maakt het moeilijk om ze te hacken. Maar met oude apparatuur is dit vaak nog wel mogelijk.',
          'Zij laat een aantal voorbeelden zien van dingen die ze heeft gemaakt en hoe ze dit heeft gedaan. Dit zijn vaak apparaten die ze zelf heeft gemaakt of oude apparaten die ze heeft omgebouwd.'
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea: [
          'Ik vond het erg leuk om te zien wat er allemaal mogelijk is met circuit bending. Ik had nog niet eerder op deze manier naar oude hardware gekeken.',
          'Ik ben zelf wel met oude hardware bezig geweest om ze te repareren of om te bouwen. Een voorbeeld hiervan is een polaroid camera uit de jaren 80 laten werken om oplaasdbare batterijen. Het was leuk om te zien dat er veel meer andere mensen zijn die bezig zijn met soort gelijke projecten.',
          'Ik denk alleen niet dat ik dit goed kan toepassen oop web development. Het is meer een hobby dat ik leuk vind om te doen maar niet echt iets dat ik in mijn werk kan gebruiken.'
        ]
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
        titel: 'Web technology op kassasystemen',
        alinea: [
          'Niels heeft het gehad over het toepassen van web technologie op kassasystemen. Dit is iets dat ik nog niet eerder had gehoord en het was erg interessant om te zien hoe dit werkt.',
          'Hij legt uit dat kassasystemen erg verouderd zijn en dat er veel mogelijkheden zijn om deze te verbeteren met web technologie.',
          'Hij laat per onderdeel zien hoe iets met web technologie kan werken:',
          '<ul> <li>bonnen printer</li> <li>kassalade</li> <li>klantenscherm</li> <li>scanner</li> </ul>',
          'Het voordeel hiervan is dat je niet afhankelijk bent van de leverancier van het systeem en zelf meer conrole hebt aangezien alles open source is en je zelf kan bouwen wat je wilt',
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea: [
          'Alhoewel het gaaf was om te zien dat je ook andere dingen kan doen met web tochnologie dan alleen websites, denk ik niet dat ik dit ga toepassen in mijn werk.',
          'Het is een erg niche onderwerp en ik denk niet dat ik hier ooit mee te maken ga krijgen. Maar het was wel leuk om te zien dat er meer mogelijkheden zijn met web technologie dan alleen websites.',
        ]
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
        titel: 'Accessibility',
        alinea: [
          'Bij Nienke gaat accesibility er om dat je geen mensen buiten sluit. Dit is iets dat ik erg belangrijk vind en waar ik zelf ook veel mee bezig ben.',
          'Dit begint al in de research fase van het project. Het is bealngrijk dat je voor accesibility op een persoonlijk level onderzoek doet naar de groep mensen die je wilt helpen.',
          'Zij heeft dit gedaan met een kleine groep mensen waarbij zij heeft getest en verschillende iteraties heeft gemaakt. Ook geeft zij aan dat je ook naar de mensen moet kijken waar ze veel contact mee hebben om andere inzichten te krijgen.'
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea: [
          'Ik vond het erg interressant om te zien hoe intwerpen voor accessibility in de praktijk gedaanakn worden. Natuurlijk heb ik wel eerder gehoord dat goed moet testen en op basis daarvan iteraties moet maken maar was erg leuk om te zien dat dit daadwerkelijk resultaat heeft.',
          'Ik wil graag haar mindset meenemen voor mijn toekomstige projecten. Ik wil ook graag iedereen in de doelgroep mee kunnen nemen in mijn product en het toegenkelijk te maken voor iedereen die er gebruik van maakt.',
          'Het is fijn om een voorbeeld te zien van hoe het moet.'
        ]
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
        titel: 'fixes voor WCAG failures',
        alinea: [
          'Erik heeft het tijdens zijn presentatie over bekende fouten in code waardoor een project niet door de WCAG guidelines komen. Vervolgens legt hij uit hoe je dit op een gemakkelijke manier kan voorkomen zonder al te veel werk.',
          'Volgens Erik moeten vooral op de volgende dingen letten:',
          '<ul> <li>Is alles toegankelijk met enkel het toetsenbord?</li> <li>Is het contrast tussen kleuren groot genoeg?</li> <li>zijn er andere alternatieven voor mensen die bepaalde dingen niet kunne ervaren zoals caption op video\'s?</li><li>Is alle content te zien op alle scherm formaten?</li></ul>',
        ]
      },
      {
        titel: 'Wat ik mee ga nemen',
        alinea: [
          'Alhoewel dit allemaal voor mij wel bekend komt is het wel fijn een om een reminder te krijgen. Ik pas dit momenteel al zo veel mogelijk toe in mijn eigen code. Ik heb helaas geen nieuwe dingen gehoord.'
        ]
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
