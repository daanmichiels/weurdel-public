// This list was compiled using data from both external and internal sources.
// The resulting list may not be used in other works without prior permission.
// 
// 
// Sources and license details for each of the external sources is provided below.
// 
// 
// OpenTaal wordlist
// -----------------
// 
// Source: https://github.com/OpenTaal/opentaal-wordlist
// License: Creative Commons, Attribution 3.0 Unported (CC BY 3.0)
// License text by OpenTaal: ./LICENSE-OpenTaal.txt
// License text for CC BY 3.0: https://creativecommons.org/licenses/by/3.0/
// 
// 
// University of Leipzig Wortschatz project
// ----------------------------------------
// 
// Source: https://wortschatz.uni-leipzig.de/en/download/
// Copyright: © 2022 Abteilung Automatische Sprachverarbeitung, Universität Leipzig.
// License: Creative Commons Attribution 4.0 International License (CC BY 4.0)
// License text: https://creativecommons.org/licenses/by/4.0/
// 
// 
const targetWords = [
    "aaien",
    "aarde",
    "aards",
    "abces",
    "abdij",
    "actie",
    "acuut",
    "adder",
    "adres",
    "adult",
    "aequo",
    "afdak",
    "afgod",
    "afrit",
    "afval",
    "afwas",
    "afzet",
    "agent",
    "aioli",
    "airco",
    "akker",
    "alarm",
    "album",
    "aldus",
    "aleer",
    "alert",
    "alias",
    "alibi",
    "alien",
    "allen",
    "aller",
    "alles",
    "aloud",
    "alsof",
    "amber",
    "amorf",
    "amper",
    "ampul",
    "ander",
    "angel",
    "angst",
    "anijs",
    "animo",
    "anion",
    "anjer",
    "anker",
    "anode",
    "aorta",
    "apart",
    "apneu",
    "appel",
    "april",
    "arena",
    "arend",
    "argon",
    "armoe",
    "aroma",
    "asbak",
    "asiel",
    "assen",
    "astma",
    "atlas",
    "atoom",
    "audio",
    "audit",
    "avond",
    "azijn",
    "baard",
    "baars",
    "baden",
    "badge",
    "baken",
    "balen",
    "balie",
    "banen",
    "barak",
    "baret",
    "barok",
    "baron",
    "barst",
    "bases",
    "basic",
    "basis",
    "batch",
    "batik",
    "baton",
    "bazen",
    "bazin",
    "beeld",
    "beest",
    "begin",
    "begon",
    "beide",
    "beige",
    "beits",
    "beken",
    "beker",
    "beleg",
    "bench",
    "bende",
    "benen",
    "benut",
    "beren",
    "besef",
    "beter",
    "beton",
    "beurs",
    "beurt",
    "beval",
    "bevat",
    "bevel",
    "bever",
    "bezat",
    "bezem",
    "bezet",
    "bezig",
    "bezit",
    "bijna",
    "bingo",
    "bivak",
    "bizar",
    "blaam",
    "blaas",
    "blank",
    "blauw",
    "bleef",
    "bleek",
    "blies",
    "blijf",
    "blijk",
    "blind",
    "bloed",
    "bloei",
    "bloem",
    "blond",
    "bloot",
    "blues",
    "board",
    "bocht",
    "bodem",
    "boden",
    "boert",
    "boete",
    "bogen",
    "bomen",
    "bonus",
    "boord",
    "boren",
    "borst",
    "boten",
    "boter",
    "boven",
    "boxen",
    "braaf",
    "braak",
    "brace",
    "brand",
    "breed",
    "brein",
    "breng",
    "breuk",
    "brief",
    "bries",
    "broek",
    "broer",
    "brons",
    "brood",
    "bruid",
    "bruin",
    "bruto",
    "buddy",
    "bugel",
    "buien",
    "buren",
    "buurt",
    "cacao",
    "canon",
    "casco",
    "casus",
    "catch",
    "cavia",
    "cello",
    "chaos",
    "check",
    "circa",
    "claim",
    "click",
    "close",
    "cloud",
    "clown",
    "coach",
    "combi",
    "combo",
    "conto",
    "conus",
    "corso",
    "costa",
    "coupe",
    "cover",
    "crack",
    "crash",
    "crime",
    "cross",
    "curve",
    "cycli",
    "dacht",
    "dader",
    "dagen",
    "dagje",
    "dalen",
    "daler",
    "danig",
    "daten",
    "datum",
    "debat",
    "decor",
    "deden",
    "deels",
    "degen",
    "deken",
    "delen",
    "deler",
    "demon",
    "depot",
    "derby",
    "derde",
    "deugd",
    "dicht",
    "dieet",
    "diens",
    "dikte",
    "dildo",
    "dille",
    "dinar",
    "diner",
    "diode",
    "disco",
    "doden",
    "dolle",
    "donor",
    "doorn",
    "dopen",
    "dorps",
    "dorst",
    "doses",
    "dosis",
    "doven",
    "draad",
    "draag",
    "draak",
    "drama",
    "drang",
    "drank",
    "dreef",
    "dreun",
    "drift",
    "drijf",
    "drink",
    "drive",
    "droeg",
    "drone",
    "drong",
    "dronk",
    "droog",
    "droom",
    "druif",
    "dubio",
    "duren",
    "duurt",
    "dwaas",
    "dwars",
    "dwerg",
    "dwing",
    "eerst",
    "egaal",
    "eicel",
    "eigen",
    "eikel",
    "eiken",
    "einde",
    "eisen",
    "eitje",
    "eivol",
    "eiwit",
    "eland",
    "elfde",
    "elite",
    "email",
    "emmer",
    "engel",
    "engte",
    "enkel",
    "enorm",
    "enzym",
    "epoxy",
    "eraan",
    "erbij",
    "erger",
    "erker",
    "ermee",
    "ernst",
    "ertoe",
    "eruit",
    "ervan",
    "erven",
    "essay",
    "ester",
    "etage",
    "etsen",
    "etter",
    "euvel",
    "event",
    "exact",
    "extra",
    "facet",
    "farao",
    "farce",
    "fauna",
    "faxen",
    "feest",
    "feite",
    "ferry",
    "fiets",
    "fijne",
    "firma",
    "fjord",
    "flash",
    "flauw",
    "flink",
    "flits",
    "flora",
    "fluit",
    "fluor",
    "flyer",
    "fobie",
    "focus",
    "folie",
    "fonds",
    "forel",
    "forum",
    "foton",
    "fraai",
    "frame",
    "franc",
    "freak",
    "friet",
    "frons",
    "front",
    "fruit",
    "furie",
    "fusie",
    "galei",
    "galop",
    "gamen",
    "gamer",
    "gamma",
    "gapen",
    "garen",
    "gaten",
    "gaven",
    "gazon",
    "gebak",
    "gebed",
    "gebit",
    "gebod",
    "gedoe",
    "geest",
    "geeuw",
    "gegil",
    "gejat",
    "gekko",
    "gekte",
    "gelag",
    "gelei",
    "gelet",
    "geluk",
    "gelul",
    "gemak",
    "gemis",
    "genie",
    "genot",
    "genre",
    "gered",
    "gerei",
    "gerst",
    "gesel",
    "getal",
    "getij",
    "getto",
    "geuit",
    "geval",
    "gevat",
    "gevel",
    "geven",
    "gewas",
    "gewei",
    "gewin",
    "gewis",
    "gezag",
    "gezet",
    "gezin",
    "gilde",
    "ginds",
    "giraf",
    "glans",
    "gleed",
    "gleuf",
    "glimp",
    "gloed",
    "goals",
    "goden",
    "godin",
    "goede",
    "gozer",
    "graad",
    "graaf",
    "graag",
    "graal",
    "graan",
    "graat",
    "grand",
    "grauw",
    "greep",
    "grens",
    "griep",
    "grijn",
    "grijs",
    "grill",
    "grind",
    "groef",
    "groei",
    "groen",
    "groep",
    "groet",
    "grond",
    "groot",
    "gruis",
    "gunst",
    "haaks",
    "haard",
    "haast",
    "hagel",
    "haken",
    "halal",
    "halen",
    "halte",
    "halve",
    "hamer",
    "hapje",
    "happy",
    "haren",
    "harte",
    "haten",
    "haven",
    "hecht",
    "heden",
    "heeft",
    "heide",
    "heiig",
    "heisa",
    "hekel",
    "helen",
    "helft",
    "hemel",
    "henna",
    "heten",
    "hetze",
    "hevig",
    "hield",
    "hielp",
    "hitte",
    "hobby",
    "hoede",
    "hoest",
    "hoeve",
    "hoger",
    "holen",
    "holes",
    "holte",
    "hoofd",
    "hoorn",
    "hopen",
    "horen",
    "hotel",
    "huize",
    "hulde",
    "humor",
    "huren",
    "icoon",
    "idool",
    "ieder",
    "ijdel",
    "ijver",
    "ijzer",
    "image",
    "imago",
    "imker",
    "immer",
    "index",
    "ineen",
    "inert",
    "inleg",
    "innen",
    "innig",
    "input",
    "inrit",
    "intro",
    "inval",
    "inzet",
    "islam",
    "issue",
    "ivoor",
    "jacht",
    "jager",
    "jarig",
    "jeans",
    "jeugd",
    "jihad",
    "joker",
    "joods",
    "juich",
    "juist",
    "kaars",
    "kaart",
    "kabel",
    "kader",
    "kaken",
    "kamer",
    "kanon",
    "kapel",
    "kaper",
    "kapot",
    "karig",
    "kassa",
    "kater",
    "kavel",
    "keken",
    "kerel",
    "keren",
    "kerst",
    "ketel",
    "keten",
    "keuze",
    "kever",
    "kiosk",
    "klaar",
    "klank",
    "klant",
    "kleed",
    "klein",
    "kleur",
    "kliek",
    "klink",
    "klomp",
    "klonk",
    "kloof",
    "kloon",
    "klote",
    "kluif",
    "kluis",
    "kneep",
    "knoop",
    "kocht",
    "koers",
    "koets",
    "kogel",
    "koken",
    "kokos",
    "kolom",
    "komen",
    "komst",
    "koord",
    "kopen",
    "koper",
    "kopie",
    "kopij",
    "koran",
    "koren",
    "korps",
    "koste",
    "koten",
    "koude",
    "kozen",
    "kraag",
    "kraal",
    "kraam",
    "kraan",
    "krans",
    "krant",
    "kreeg",
    "kreng",
    "krijg",
    "krijt",
    "krimp",
    "kring",
    "kroeg",
    "kroon",
    "kroop",
    "kruid",
    "kruik",
    "kruin",
    "kruis",
    "kubus",
    "kudde",
    "kunde",
    "kunst",
    "kuren",
    "kwaad",
    "kwaal",
    "kwart",
    "kwast",
    "kweek",
    "kwijt",
    "laars",
    "label",
    "laden",
    "lagen",
    "lager",
    "laken",
    "lande",
    "laten",
    "later",
    "latex",
    "laude",
    "lease",
    "leden",
    "leest",
    "leeuw",
    "leger",
    "legio",
    "lelie",
    "lenen",
    "lener",
    "lente",
    "lepel",
    "lepra",
    "leren",
    "level",
    "leven",
    "lever",
    "lezen",
    "lezer",
    "licht",
    "lijst",
    "linie",
    "links",
    "liter",
    "lobby",
    "loden",
    "login",
    "loipe",
    "loket",
    "lolly",
    "loods",
    "loops",
    "lopen",
    "loper",
    "lotto",
    "lover",
    "lucht",
    "luier",
    "lunch",
    "luwte",
    "lymfe",
    "maand",
    "maart",
    "macho",
    "macht",
    "macro",
    "mager",
    "magie",
    "magma",
    "maken",
    "maker",
    "malen",
    "manen",
    "manna",
    "markt",
    "massa",
    "match",
    "matig",
    "matje",
    "mayor",
    "media",
    "medio",
    "meest",
    "menen",
    "menig",
    "meren",
    "metal",
    "meten",
    "meter",
    "metro",
    "meute",
    "mijns",
    "mille",
    "minor",
    "minst",
    "mixen",
    "mixer",
    "mocht",
    "model",
    "modem",
    "moest",
    "mogen",
    "molen",
    "moord",
    "motie",
    "motor",
    "motto",
    "musea",
    "mythe",
    "naakt",
    "naald",
    "naast",
    "nabij",
    "nacht",
    "nader",
    "nagel",
    "nanny",
    "natie",
    "negen",
    "nemen",
    "netto",
    "niche",
    "nicht",
    "niets",
    "nieuw",
    "nihil",
    "noden",
    "nodig",
    "nogal",
    "nooit",
    "noten",
    "nylon",
    "oever",
    "offer",
    "ofwel",
    "olijf",
    "omdat",
    "omvat",
    "omver",
    "omweg",
    "omzet",
    "onder",
    "onwel",
    "onzin",
    "oogst",
    "opbod",
    "opera",
    "ophef",
    "opium",
    "oppas",
    "oprit",
    "optie",
    "opzet",
    "opzij",
    "oraal",
    "order",
    "orgel",
    "orgie",
    "ouder",
    "ovaal",
    "paard",
    "paars",
    "palen",
    "palet",
    "panel",
    "parel",
    "paren",
    "party",
    "pasta",
    "patat",
    "patch",
    "pauze",
    "pence",
    "peper",
    "peren",
    "perse",
    "peter",
    "piano",
    "pilot",
    "pinda",
    "pioen",
    "piste",
    "pixel",
    "pizza",
    "plaag",
    "plaat",
    "plank",
    "plant",
    "plein",
    "pleit",
    "ploeg",
    "plons",
    "plots",
    "pluim",
    "pluis",
    "polis",
    "poort",
    "porno",
    "poten",
    "poule",
    "power",
    "praat",
    "preek",
    "prees",
    "prent",
    "prijs",
    "prima",
    "prins",
    "print",
    "prior",
    "proef",
    "promo",
    "prooi",
    "proxy",
    "proza",
    "pruik",
    "pruim",
    "pruts",
    "psalm",
    "puber",
    "pupil",
    "puppy",
    "puree",
    "quilt",
    "quote",
    "rabbi",
    "racen",
    "racer",
    "raden",
    "radio",
    "raken",
    "raket",
    "rally",
    "ramen",
    "ranch",
    "range",
    "rapen",
    "ratel",
    "ratio",
    "rayon",
    "rebel",
    "recht",
    "reden",
    "reeks",
    "regel",
    "regen",
    "regie",
    "regio",
    "reine",
    "reken",
    "rente",
    "repen",
    "retro",
    "reuma",
    "reuze",
    "revue",
    "ribbe",
    "richt",
    "rijen",
    "rijke",
    "rijpe",
    "rijst",
    "riool",
    "ritme",
    "robot",
    "roede",
    "roest",
    "roken",
    "roker",
    "roman",
    "romig",
    "ronde",
    "rooie",
    "route",
    "rozet",
    "rozig",
    "rugby",
    "ruzie",
    "sabel",
    "saldo",
    "salie",
    "salon",
    "samba",
    "samen",
    "satan",
    "sauna",
    "scala",
    "scene",
    "schat",
    "schep",
    "schik",
    "schil",
    "schim",
    "schip",
    "schok",
    "schol",
    "schop",
    "schot",
    "schut",
    "scoop",
    "scoor",
    "score",
    "scout",
    "scrub",
    "sedan",
    "sekse",
    "sekte",
    "serie",
    "serre",
    "sfeer",
    "sheet",
    "shirt",
    "shock",
    "short",
    "sinds",
    "sjaal",
    "sjeik",
    "slaaf",
    "slaan",
    "slaap",
    "slaat",
    "slang",
    "slank",
    "sleuf",
    "sleur",
    "sliep",
    "slijm",
    "sloeg",
    "sloep",
    "sloom",
    "sloop",
    "sloot",
    "sluip",
    "sluis",
    "sluit",
    "smaad",
    "smaak",
    "small",
    "smart",
    "smelt",
    "smoel",
    "smoes",
    "snaar",
    "snack",
    "snars",
    "snede",
    "sneed",
    "snert",
    "snoek",
    "snuit",
    "sober",
    "soort",
    "sound",
    "spalk",
    "speel",
    "speer",
    "speld",
    "spelt",
    "spier",
    "spijt",
    "spits",
    "spoed",
    "spoel",
    "spons",
    "spook",
    "spoor",
    "spoot",
    "sport",
    "sprak",
    "spuit",
    "spurt",
    "staaf",
    "staak",
    "staal",
    "staan",
    "staar",
    "staat",
    "stage",
    "stand",
    "stang",
    "stank",
    "start",
    "state",
    "steak",
    "steeg",
    "steek",
    "steel",
    "steen",
    "steil",
    "stelt",
    "sterk",
    "stern",
    "steun",
    "stier",
    "stijf",
    "stijl",
    "stipt",
    "stock",
    "stoel",
    "stoep",
    "stoer",
    "stoet",
    "stola",
    "stoma",
    "stomp",
    "stond",
    "stoom",
    "stoor",
    "stoot",
    "storm",
    "stort",
    "stout",
    "straf",
    "strak",
    "strip",
    "strop",
    "strot",
    "stuit",
    "stunt",
    "stuur",
    "suite",
    "super",
    "taart",
    "tabak",
    "tabel",
    "taboe",
    "tafel",
    "taken",
    "talen",
    "talud",
    "tanks",
    "tante",
    "tarwe",
    "teder",
    "teelt",
    "tegel",
    "tegen",
    "teint",
    "teken",
    "tekst",
    "teler",
    "tempo",
    "tenor",
    "tepel",
    "teren",
    "terug",
    "thans",
    "thema",
    "thuis",
    "tijde",
    "titel",
    "toast",
    "tocht",
    "toets",
    "togen",
    "tombe",
    "tonen",
    "tools",
    "topic",
    "toren",
    "total",
    "touch",
    "traag",
    "traan",
    "track",
    "train",
    "trant",
    "treed",
    "trein",
    "trend",
    "troef",
    "troep",
    "troon",
    "trots",
    "trouw",
    "truck",
    "tsaar",
    "tumor",
    "turbo",
    "tutor",
    "typen",
    "uiten",
    "uitje",
    "uniek",
    "urine",
    "uzelf",
    "vaart",
    "vacht",
    "vader",
    "vanaf",
    "varen",
    "vaten",
    "vecht",
    "vegen",
    "velen",
    "veren",
    "verre",
    "verte",
    "verve",
    "vezel",
    "video",
    "vieze",
    "villa",
    "vinyl",
    "viool",
    "virus",
    "visie",
    "visum",
    "vlaai",
    "vlees",
    "vleug",
    "vlieg",
    "vloek",
    "vloer",
    "vloog",
    "vloot",
    "vocht",
    "vogel",
    "volle",
    "volop",
    "voort",
    "voren",
    "vorig",
    "vorst",
    "vraag",
    "vrede",
    "vrees",
    "vrije",
    "vrind",
    "vroeg",
    "vroor",
    "vrouw",
    "vuist",
    "vuren",
    "vurig",
    "waard",
    "wacht",
    "wafel",
    "wagen",
    "wagon",
    "wapen",
    "waren",
    "water",
    "wegen",
    "weide",
    "weids",
    "weken",
    "weren",
    "weten",
    "wezen",
    "wijze",
    "winst",
    "witte",
    "woede",
    "woest",
    "wonde",
    "wonen",
    "woord",
    "worst",
    "wraak",
    "wrang",
    "wreed",
    "wrijf",
    "zacht",
    "zadel",
    "zagen",
    "zakje",
    "zalig",
    "zaten",
    "zeden",
    "zegel",
    "zegen",
    "zeker",
    "zelfs",
    "zesde",
    "zetel",
    "zeven",
    "zicht",
    "zieke",
    "ziele",
    "ziens",
    "zijde",
    "zitje",
    "zoals",
    "zocht",
    "zomer",
    "zonde",
    "zonen",
    "zonet",
    "zopas",
    "zover",
    "zowat",
    "zowel",
    "zucht",
    "zulke",
    "zuren",
    "zwaan",
    "zwaar",
    "zwart",
    "zweeg",
    "zweep",
    "zweer",
    "zweet",
    "zwerm",
    "zwijn",
    "zwoer"
];
//# sourceMappingURL=target_words.js.map