import { Category, Commerce, Product, User } from "../types";

export const mockProduct = {
  img: "https://cdn2.cocinadelirante.com/sites/default/files/images/2020/06/papas-fritas-con-maicena-facil.jpg",
  description:
    "adjashdkajhdkjashkajshdkasjd sadjkhaskjd haskjdhas kdjhaskdjahs dskajhdka sjd\ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
  title: "Papas Fritas",
  id: 123,
  units: 38,
  commerce: 5,
  price: 60,
};

export const mockCommerce: Commerce = {
  id: 2634891,
  name: "Mock Commerce",
  description:
    "Blank descriptionOccaecat nulla eiusmod ex consequat quis nostrud officia est commodo.",
  img: "",
  location: {
    longitude: -40.0641,
    latitude: -65.0641,
  },
  category: 1,
};

export const productList: Product[] = [
  {
    img: "https://img.interempresas.net/fotos/1622791.jpeg",
    description:
      "Hamburguesa con cebolla, tomate, lechuga y queso cheddar derretido \ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
    title: "Hamburguesa",
    id: 12,
    units: 4,
    price: 370,
    commerce: 2,
  },
  {
    img: "https://el-periodico.com.ar/download/multimedia.normal.9e80f8bf087e2bd0.696e646976696475616c2d6265746f732d6c6f6d6f5f6e6f726d616c2e706e67.png",
    description:
      "adjashdkajhdkjashkajshdkasjd sadjkhaskjd haskjdhas kdjhaskdjahs dskajhdka sjd\ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
    title: "Lomo",
    id: 13,
    units: 8,
    price: 210,
    commerce: 4,
  },
  {
    img: "https://cdn.kiwilimon.com/recetaimagen/13003/th5-640x426-5707.jpg",
    description:
      "adjashdkajhdkjashkajshdkasjd sadjkhaskjd haskjdhas kdjhaskdjahs dskajhdka sjd\ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
    title: "Pizza",
    id: 14,
    units: 19,
    price: 120,
    commerce: 3,
  },
  {
    img: "https://beerwisdom.eu/wp-content/uploads/2018/07/beer-1.png",
    description:
      "adjashdkajhdkjashkajshdkasjd sadjkhaskjd haskjdhas kdjhaskdjahs dskajhdka sjd\ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
    title: "Cerveza",
    id: 15,
    units: 1000,
    price: 90,
    commerce: 1,
  },
  mockProduct,
];

export const DEFAULT_USER_IMAGE =
  "https://www.iconninja.com/files/111/870/406/user-people-profile-human-account-avatar-icon.png";

export const mockUser: User = {
  id: 1,
  username: "Joaquin",
  email: "joaquin@email.com",
  address: "Calle viva 123",
  isLoggedIn: true,
};

export const commerceList: Commerce[] = [
  {
    id: 1,
    name: "Betos",
    img: "https://www.paseoriveraindarte.com.ar/wp-content/uploads/2018/10/Bestos-02.png",
    location: {
      longitude: -64.18387,
      latitude: -31.389415,
    },
    category: 1,
    description:
      "Ipsum adipisicing proident adipisicing culpa id. Veniam Lorem magna pariatur ex irure laborum sit excepteur. Adipisicing eiusmod dolor aliqua voluptate ea et aute commodo aliqua ipsum amet Lorem. In pariatur est reprehenderit proident laboris elit et ullamco. Laboris mollit duis dolore incididunt do non culpa nisi consectetur laborum sunt incididunt.",
  },
  {
    id: 2,
    name: "Burger King",
    img: "https://speisekarte.menu/storage/media/company_images/1769255/burgerking3Q_0.jpg",
    location: {
      longitude: -64.18387,
      latitude: -31.389415,
    },
    category: 1,
    description:
      "Ipsum adipisicing proident adipisicing culpa id. Veniam Lorem magna pariatur ex irure laborum sit excepteur. Adipisicing eiusmod dolor aliqua voluptate ea et aute commodo aliqua ipsum amet Lorem. In pariatur est reprehenderit proident laboris elit et ullamco. Laboris mollit duis dolore incididunt do non culpa nisi consectetur laborum sunt incididunt.",
  },
  {
    id: 3,
    name: "Nolita",
    img: "https://fastly.4sqi.net/img/general/600x600/79139099_-5juWmBrqE3pLO_qWpooxaZxFKAPq7aMWzLOFuD2T1s.jpg",
    location: {
      longitude: -64.18387,
      latitude: -31.389415,
    },
    category: 2,
    description:
      "Ipsum adipisicing proident adipisicing culpa id. Veniam Lorem magna pariatur ex irure laborum sit excepteur. Adipisicing eiusmod dolor aliqua voluptate ea et aute commodo aliqua ipsum amet Lorem. In pariatur est reprehenderit proident laboris elit et ullamco. Laboris mollit duis dolore incididunt do non culpa nisi consectetur laborum sunt incididunt.",
  },
  {
    id: 4,
    name: "Vidon",
    img: "https://media-cdn.tripadvisor.com/media/photo-s/06/33/e8/0f/vidon-bar.jpg",
    location: {
      longitude: -64.18387,
      latitude: -31.389415,
    },
    category: 2,
    description:
      "Ipsum adipisicing proident adipisicing culpa id. Veniam Lorem magna pariatur ex irure laborum sit excepteur. Adipisicing eiusmod dolor aliqua voluptate ea et aute commodo aliqua ipsum amet Lorem. In pariatur est reprehenderit proident laboris elit et ullamco. Laboris mollit duis dolore incididunt do non culpa nisi consectetur laborum sunt incididunt.",
  },
  {
    id: 5,
    name: "Tucson Stakehouse",
    img: "https://infonegocios.info/uploads/Tucson-steakhouse-zona-sur-1-cba.jpg",
    location: {
      longitude: -64.18387,
      latitude: -31.389415,
    },
    category: 3,
    description:
      "Ipsum adipisicing proident adipisicing culpa id. Veniam Lorem magna pariatur ex irure laborum sit excepteur. Adipisicing eiusmod dolor aliqua voluptate ea et aute commodo aliqua ipsum amet Lorem. In pariatur est reprehenderit proident laboris elit et ullamco. Laboris mollit duis dolore incididunt do non culpa nisi consectetur laborum sunt incididunt.",
  },
];

export const categoriesList: Category[] = [
  {
    id: 1,
    name: "Comida rapida",
    icon: "hamburger",
  },
  {
    id: 2,
    name: "Bar",
    icon: "beer",
  },
  {
    id: 3,
    name: "Restaurant",
    icon: "utensils",
  },
];

export const defaultDeltas = {
  // These delta properties define how the 'zoom' works on the map
  latitudeDelta: 0.0143,
  longitudeDelta: 0.0134,
};

export const InitialRegion = {
  latitude: -31.389415,
  longitude: -64.18387,
  ...defaultDeltas,
};

// !Do not use ↓
// function getLongitudDelta() {
//   const window = Dimensions.get("window");
//   const { width } = window;
//   const LATITUD_DELTA = 0.0922;

//   return LATITUD_DELTA + width / 230;
// }
