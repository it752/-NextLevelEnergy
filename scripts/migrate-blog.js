import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '9grbh5qy',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
  apiVersion: '2024-03-10',
});

const posts = [
  {
    title: 'Integracja zespołu w polskich górach',
    date: '12.02.2025',
    excerpt: 'Weekend pełen wyzwań i wspólnej zabawy.',
    fullText: 'W naszej firmie wierzymy, że najlepsze pomysły rodzą się z dala od biurek. Nasz ostatni wyjazd integracyjny do Zakopanego to nie tylko kilometry pokonane na szlakach, ale też dziesiątki godzin rozmów i wspólnych gier, które zbliżyły nas do siebie. Po wymagającym sezonie projektowym taki odpoczynek był nam wszystkim potrzebny. W górach nauczyliśmy się ufać sobie nawzajem i jeszcze sprawniej rozwiązywać problemy jako zespół. Zobaczcie sami, jak Level Up ładuje baterie przed kolejnymi wyzwaniami w branży OZE!',
    imagePath: '../src/assets/blog/blog-1.png',
  },
  {
    title: 'Akademia Liderów – pierwsza edycja',
    date: '08.02.2025',
    excerpt: 'Inwestujemy w rozwój kompetencji miękkich.',
    fullText: 'Rozwój techniczny to u nas podstawa, ale wiemy, że efektywne zarządzanie projektami i relacjami wymaga czegoś więcej. Z dumą ogłaszamy zakończenie pierwszej edycji naszej "Akademii Liderów" – trzymiesięcznego cyklu warsztatów z asertywności, rozwiązywania konfliktów i motywowania zespołu. Program zgromadził kilkunastu najbardziej zaangażowanych pracowników, którzy pod okiem doświadczonych mentorów doskonalili swoje predyspozycje do objęcia w przyszłości ważnych ról w strukturach naszej filmy.',
    imagePath: '../src/assets/blog/blog-2.png',
  },
  {
    title: 'Nasze nowe biuro – więcej niż miejsce pracy',
    date: '01.02.2025',
    excerpt: 'Przestrzeń zaprojektowana z myślą o ludziach.',
    fullText: 'Kolejny krok przed nami! Otworzyliśmy nowoczesną siedzibę, która została zaprojektowana specjalnie dla naszego rosnącego zespołu inżynierów i handlowców. Stworzyliśmy przestrzeń, która promuje kreatywność – znajdziecie tu zarówno ciche strefy do pracy w skupieniu, jak i duże obszary wspólne sprzyjające swobodnej wymianie pomysłów przy kawie. Ale największym hitem biura jest zdecydowanie nasza sala relaksu z piłkarzykami i konsolą. Nowe biuro to obietnica lepszych warunków dla każdego z naszych pracowników.',
    imagePath: '../src/assets/blog/blog-3.png',
  },
  {
    title: 'Mistrzostwa firmy w kartingu',
    date: '25.01.2025',
    excerpt: 'Sportowa rywalizacja poza godzinami pracy.',
    fullText: 'W ostatni weekend nasz zespół postanowił zmierzyć się w nieco innej domenie niż dotychczas – zorganizowaliśmy firmowe mistrzostwa w wyścigach gokartów! Po emocjonujących eliminacjach i niesamowicie zaciętym finale wyłoniliśmy zwycięzcę z działu technicznego. Jednak tego dnia nie liczyły się tylko czasy okrążeń. Liczyła się zdrowa, przyjazna sportowa rywalizacja, zbijanie "piątek" i niesamowita atmosfera. Tego typu spotkania wspaniale odstresowują nas po trudach codziennej, intensywnej pracy.',
    imagePath: '../src/assets/blog/blog-1.png',
  },
  {
    title: 'Targi technologii OZE – byliśmy tam!',
    date: '15.01.2025',
    excerpt: 'Nasi inżynierowie zdobywają nową wiedzę.',
    fullText: 'Branża Odnawialnych Źródeł Energii pędzi do przodu z niesamowitą prędkością, dlatego nasi specjaliści po prostu muszą być na bieżąco. Grupa inżynierów i projektantów z naszej firmy wzięła udział w największych branżowych targach we Frankfurcie. Zdobyliśmy tam masę nowej wiedzy o pompach ciepła nowej generacji i zaawansowanych systemach zarządzania energią (BMS). Ta cenna wiedza już niedługo zostanie przekuta w realne szkolenia wewnętrzne, podnosząc kompetencje wszystkich pracowników.',
    imagePath: '../src/assets/blog/blog-2.png',
  },
  {
    title: 'Owocowe czwartki? Śniadania!',
    date: '05.01.2025',
    excerpt: 'Rozmowy przy stole w drodze do pracy.',
    fullText: 'W zeszłym miesiącu zrobiliśmy mały audyt naszych firmowych benefitów. Odkryliśmy, że zamiast standardowych rozwiązań, nasz zespół znacznie bardziej ceni wspólnie spędzany czas! Dlatego wprowadziliśmy tradycję piątkowych "Wielkich Śniadań". Dział po departamencie - co tydzień ktoś inny przejmuje kuchenne stery i przygotowuje autorskie posiłki dla całego biura. Od pancaków po tradycyjne jajecznice. Taka przerwa sprzyja wzmacnianiu relacji i lepszej współpracy w nadchodzącym tygodniu.',
    imagePath: '../src/assets/blog/blog-3.png',
  },
];

async function migrate() {
  console.log('Starting migration...');
  for (const post of posts) {
    console.log(`Processing: ${post.title}`);
    
    // Upload image
    const filePath = path.join(__dirname, post.imagePath);
    let imageAsset;
    try {
      const imageBuffer = fs.readFileSync(filePath);
      imageAsset = await client.assets.upload('image', imageBuffer, {
        filename: path.basename(filePath),
      });
      console.log(`Image uploaded: ${imageAsset._id}`);
    } catch (err) {
      console.error(`Failed to upload image for ${post.title}:`, err);
      continue;
    }

    // Create document
    const doc = {
      _type: 'post',
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      fullText: post.fullText,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
    };

    try {
      const res = await client.create(doc);
      console.log(`Document created with ID: ${res._id}`);
    } catch (err) {
      console.error(`Failed to create document for ${post.title}:`, err);
    }
  }
  console.log('Migration complete!');
}

migrate();
