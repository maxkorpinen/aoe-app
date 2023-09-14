const units = [
  {
    id: 1,
    name: "militia",
    building: "barracks",
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
    name: "eagle",
    building: "barracks",
    isGoldUnit: true,
    counters: ["spearman", "scout", "archer", "skirmisher"],
    counteredBy: ["militia"],
  },
  {
    id: 4,
    name: "scout",
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
    name: "camel",
    building: "stable",
    isGoldUnit: true,
    counters: ["scout", "knight", "skirmisher", "carcher"],
    counteredBy: ["militia", "spearman"],
  },
  {
    id: 7,
    name: "archer",
    building: "archery range",
    isGoldUnit: true,
    counters: ["militia", "spearman"],
    counteredBy: ["eagle", "scout", "knight", "skirmisher"],
  },
  {
    id: 8,
    name: "skirmisher",
    building: "archery range",
    isGoldUnit: false,
    counters: ["spearman", "archer", "carcher"],
    counteredBy: ["militia", "eagle", "scout", "knight", "camel"],
  },
  {
    id: 9,
    name: "carcher",
    building: "archery range",
    isGoldUnit: true,
    counters: ["militia"],
    counteredBy: ["eagle", "knight", "camel", "skirmisher"],
  },
]

module.exports = units;