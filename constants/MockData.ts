import { Product, User } from "../types";

export const mockProduct = {
  img: "https://cdn2.cocinadelirante.com/sites/default/files/images/2020/06/papas-fritas-con-maicena-facil.jpg",
  description:
    "adjashdkajhdkjashkajshdkasjd sadjkhaskjd haskjdhas kdjhaskdjahs dskajhdka sjd\ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
  title: "Papas Fritas",
  id: 123,
  units: 38,
  price: 60,
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
  },
  {
    img: "https://el-periodico.com.ar/download/multimedia.normal.9e80f8bf087e2bd0.696e646976696475616c2d6265746f732d6c6f6d6f5f6e6f726d616c2e706e67.png",
    description:
      "adjashdkajhdkjashkajshdkasjd sadjkhaskjd haskjdhas kdjhaskdjahs dskajhdka sjd\ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
    title: "Lomo",
    id: 13,
    units: 8,
    price: 210,
  },
  {
    img: "https://cdn.kiwilimon.com/recetaimagen/13003/th5-640x426-5707.jpg",
    description:
      "adjashdkajhdkjashkajshdkasjd sadjkhaskjd haskjdhas kdjhaskdjahs dskajhdka sjd\ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
    title: "Pizza",
    id: 14,
    units: 19,
    price: 120,
  },
  {
    img: "https://beerwisdom.eu/wp-content/uploads/2018/07/beer-1.png",
    description:
      "adjashdkajhdkjashkajshdkasjd sadjkhaskjd haskjdhas kdjhaskdjahs dskajhdka sjd\ndjkhaksjdhkajsdaskd\njskdhkjashdkjasdhakdja",
    title: "Cerveza",
    id: 15,
    units: 1000,
    price: 90,
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
