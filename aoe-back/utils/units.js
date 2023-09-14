const units = [
  {
    id: 1,
    name: "militia",
    building: "varracks",
    isGoldUnit: true,
    counters: ["spearman", "eagle", "skirmisher"], // ids of units that militia counters
    counteredBy: ["archer", "carcher"], // ids of units that counter militia
  },
  {
    id: 2,
    name: "spearman",
    building: "barracks",
    isGoldUnit: false,
    counters: ["scout", "knight", "camel"],
    counteredBy: ["militia", "eagle", "archer", "skirmisher"],
  },
  {
    id: 3,
    name: "Eagle Scout",
    building: "Barracks",
    isGoldUnit: true,
    counters: ["spearman", "scout", "archer", "skirmisher"],
    counteredBy: ["militia"],
  },
  {
    id: 4,
    name: "Scout",
    building: "stable",
    isGoldUnit: false,
    counters: ["archer", "skirmisher"],
    counteredBy: ["militia", "spearman", "eagle", "knight", "camel"],
  },
  {
    id: 5,
    name: "knight",
    building: "stable",
    isGoldUnit: true,
    counters: ["scout", "archer", "skirmisher", "carcher"],
    counteredBy: ["spearman", "camel"],
  },
  {
    id: 6,
    name: "Camel",
    building: "stable",
    isGoldUnit: true,
    counters: ["scout", "knight", "skirmisher", "carcher"],
    counteredBy: ["militia", "spearman"],
  },
  {
    id: 7,
    name: "Archer",
    building: "Archery Range",
    isGoldUnit: true,
    counters: ["militia", "spearman"],
    counteredBy: ["eagle", "scout", "knight", "skirmisher"],
  },
  {
    id: 8,
    name: "Skirmisher",
    building: "Archery Range",
    isGoldUnit: false,
    counters: ["spearman", "archer", "carcher"],
    counteredBy: ["militia", "eagle", "scout", "knight", "camel"],
  },
  {
    id: 9,
    name: "Cavalry Archer",
    building: "Archery Range",
    isGoldUnit: true,
    counters: ["militia"],
    counteredBy: ["eagle", "knight", "camel", "skirmisher"],
  },
]

module.exports = units;