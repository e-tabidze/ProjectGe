import ring from "../images/ring.jpg";

const metals = [
  { name: "Gold", id: 198 },
  { name: "Silver", id: 199 },
];

const stones = [
  { name: "Diamond", id: "abc" },
  { name: "Coral", id: "def" },
  { name: "Turquoise", id: "ghi" },
  { name: "Emerald", id: "jkl" },
];

const jewelry = [
  {
    _id: "6b21ca3eeb7f6fbccd471814",
    jewellery: "Golden Ring",
    price: 166,
    metal: { name: "Gold", id: 198 },
    stone: { name: "Diamond", id: "abc" },
    image: ring,
    description: "Sterling Silver and 14kt Yellow Gold Multi-Row Cross Ring",
  },
  {
    _id: "6b21ca3eeb7f6fbccd471815",
    jewellery: "Golden Ring",
    price: 150,
    metal: { name: "Gold", id: 198 },
    stone: { name: "Coral", id: "def" },
    image: ring,
    description: "Sterling Silver and 14kt Yellow Gold Multi-Row Cross Ring",
  },
  {
    _id: "6b21ca3eeb7f6fbccd471816",
    jewellery: "Silver Ring",
    price: 199,
    metal: { name: "Silver", id: 199 },
    stone: { name: "Turquoise", id: "ghi" },
    image: ring,
    description: "Sterling Silver and 14kt Yellow Gold Multi-Row Cross Ring",
  },
  {
    _id: "6b21ca3eeb7f6fbccd471817",
    jewellery: "Golden Earrings",
    price: 200,
    metal: { name: "Gold", id: 198 },
    stone: { name: "Emerald", id: "jkl" },
    image: ring,
    description: "Sterling Silver and 14kt Yellow Gold Multi-Row Cross Ring",
  },
  {
    _id: "6b21ca3eeb7f6fbccd471818",
    jewellery: "Golden Ring",
    price: 166,
    metal: { name: "Gold", id: 198 },
    stone: { name: "Diamond", id: "abc" },
    image: ring,
    description: "Sterling Silver and 14kt Yellow Gold Multi-Row Cross Ring",
  },
  {
    _id: "6b21ca3eeb7f6fbccd471819",
    jewellery: "Golden Ring",
    price: 166,
    metal: { name: "Gold", id: 198 },
    stone: { name: "Turquoise", id: "ghi" },
    image: ring,
    description: "Sterling Silver and 14kt Yellow Gold Multi-Row Cross Ring",
  },
  {
    _id: "6b21ca3eeb7f6fbccd471820",
    jewellery: "Silver Earrings",
    price: 60,
    metal: { name: "Silver", id: 199 },
    stone: { name: "Emerald", id: "jkl" },
    image: ring,
    description: "Sterling Silver and 14kt Yellow Gold Multi-Row Cross Ring",
  },
  {
    _id: "6b21ca3eeb7f6fbccd471821",
    jewellery: "Golden Ring",
    price: 166,
    metal: { name: "Silver", id: 199 },
    stone: { name: "Coral", id: "def" },
    image: ring,
    description: "Sterling Silver and 14kt Yellow Gold Multi-Row Cross Ring",
  },
];

export function getJewelry() {
  return jewelry;
}

export function getJewel(id) {
  return jewelry.find((j) => j._id === id);
}

export function getMetals() {
  return metals;
}

export function getStones() {
  return stones;
}