const forests = [
  {
    id: 1,
    forest_name: 'Arapaho and Roosevelt National Forests',
    forest_url: 'https://www.fs.usda.gov/main/arp',
    tree_height: 0,
    stump_height: 6,
    stump_diameter: 6,
    start_date: '2019-11-01T06:00:00Z',
    end_date: '2020-01-06T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '11-02-10T',
    description: 'Arapaho & Roosevelt | Colorado',
    forest_abbr: 'arp',
    tree_cost: 20,
    max_num_trees: 5,
    forest_name_short: 'Arapaho and Roosevelt',
    timezone: 'America/Denver',
    cutting_areas:
          '{ "ELKCREEK": {"startDate": "2019-12-07 15:30:00Z", "endDate": "2019-12-14 21:30:00Z", "name": "Elk Creek"},'
          + '"REDFEATHERLAKES": {"startDate": "2019-12-07 15:30:00Z", "endDate": "2019-12-14 21:30:00Z", "name": "Red Feather Lakes"},'
          + '"SULPHUR": {"startDate": "2019-11-01 15:00:00Z", "endDate": "2020-01-06 22:30:00Z", "name": "Sulphur"},'
          + '"CANYONLAKES": {"startDate": "2019-12-07 15:30:00Z", "endDate": "2019-12-14 21:30:00Z", "name": "Canyon Lakes"} }',
    poss_financial_id: '999900004'
  },
  {
    id: 2,
    forest_name: 'Flathead National Forest',
    forest_url: 'https://www.fs.usda.gov/main/flathead',
    tree_height: 0,
    stump_height: 8,
    stump_diameter: 4,
    start_date: '2019-11-15T07:00:00Z',
    end_date: '2019-12-31T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '11-01-10',
    description: 'Flathead | Montana',
    forest_abbr: 'flathead',
    tree_cost: 5,
    max_num_trees: 3,
    forest_name_short: 'Flathead',
    timezone: 'America/Denver',
    cutting_areas: '{}',
    poss_financial_id: '999900005'
  },
  {
    id: 3,
    forest_name: 'Mt. Hood National Forest',
    forest_url: 'https://www.fs.usda.gov/main/mthood',
    tree_height: 12,
    stump_height: 6,
    stump_diameter: 6,
    start_date: '2019-11-14T07:00:00Z',
    end_date: '2019-12-24T07:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '11-06-06',
    description: 'Mt. Hood | Oregon',
    forest_abbr: 'mthood',
    tree_cost: 5,
    max_num_trees: 5,
    forest_name_short: 'Mt. Hood',
    timezone: 'America/Los_Angeles',
    cutting_areas: '{}',
    poss_financial_id: '999900007'
  },
  {
    id: 4,
    forest_name: 'Shoshone National Forest',
    forest_url: 'https://www.fs.usda.gov/main/shoshone',
    tree_height: 20,
    stump_height: 4,
    stump_diameter: 0,
    start_date: '2019-11-18T07:00:00Z',
    end_date: '2019-12-30T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '11-02-14',
    description: 'Shoshone | Wyoming',
    forest_abbr: 'shoshone',
    tree_cost: 8,
    max_num_trees: 5,
    allow_additional_height: true,
    forest_name_short: 'Shoshone',
    timezone: 'America/Denver',
    cutting_areas: '{}',
    poss_financial_id: '999900006'
  },
  {
    id: 5,
    forest_name: 'Gifford Pinchot National Forest',
    forest_url: 'https://www.fs.usda.gov/main/giffordpinchot',
    tree_height: 12,
    stump_height: 12,
    stump_diameter: 0,
    start_date: '2019-11-14T07:00:00Z',
    end_date: '2019-12-31T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '11-02-14',
    description: 'Gifford Pinchot | Washington',
    forest_abbr: 'giffordpinchot',
    tree_cost: 5,
    max_num_trees: 5,
    forest_name_short: 'Gifford Pinchot',
    timezone: 'America/Seattle',
    cutting_areas: '{}',
    poss_financial_id: '999900014'
  },
  {
    id: 6,
    forest_name: 'Fremont-Winema National Forest',
    forest_url: 'https://www.fs.usda.gov/fremont-winema',
    tree_height: 15,
    stump_height: 6,
    stump_diameter: 0,
    start_date: '2019-11-01T07:00:00Z',
    end_date: '2019-12-25T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '06-02',
    description: 'Fremont-Winema | Oregon',
    forest_abbr: 'fremont-winema',
    tree_cost: 5,
    max_num_trees: 5,
    forest_name_short: 'Fremont-Winema',
    timezone: 'America/Seattle',
    cutting_areas: '{}',
    poss_financial_id: '999900015'
  },
  {
    id: 7,
    forest_name: 'Mt. Baker-Snoqualmie National Forest',
    forest_url: 'https://www.fs.usda.gov/detail/mbs',
    tree_height: 15,
    stump_height: 12,
    stump_diameter: 0,
    start_date: '2019-11-12T07:00:00Z',
    end_date: '2019-12-30T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '06-02',
    description: 'Mt. Baker-Snoqualmie | Washington',
    forest_abbr: 'mbs',
    tree_cost: 10,
    max_num_trees: 5,
    forest_name_short: 'Mt. Baker-Snoqualmie',
    timezone: 'America/Seattle',
    cutting_areas: '{}',
    poss_financial_id: '999900010'
  },
  {
    id: 8,
    forest_name: 'Deschutes National Forest',
    forest_url: 'https://www.fs.usda.gov/deschutes',
    tree_height: 12,
    stump_height: 12,
    stump_diameter: 0,
    start_date: '2019-11-18T07:00:00Z',
    end_date: '2019-12-25T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '06-02',
    description: 'Deschutes | Oregon',
    forest_abbr: 'deschutes',
    tree_cost: 5,
    max_num_trees: 5,
    forest_name_short: 'Deschutes',
    timezone: 'America/Seattle',
    cutting_areas: '{}',
    poss_financial_id: '999900008'
  },
  {
    id: 9,
    forest_name: 'Willamette National Forest ',
    forest_url: 'https://www.fs.usda.gov/willamette',
    tree_height: 12,
    stump_height: 6,
    stump_diameter: 0,
    start_date: '2019-11-12T07:00:00Z',
    end_date: '2020-01-06T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '06-02',
    description: 'Willamette | Oregon',
    forest_abbr: 'willamette',
    tree_cost: 5,
    max_num_trees: 5,
    forest_name_short: 'Willamette',
    timezone: 'America/Seattle',
    cutting_areas: '{}',
    poss_financial_id: '999900012'
  },
  {
    id: 10,
    forest_name: 'Rogue River-Siskiyou National Forest ',
    forest_url: 'https://www.fs.usda.gov/rogue-siskiyou/',
    tree_height: 12,
    stump_height: 12,
    stump_diameter: 0,
    start_date: '2019-11-08T07:00:00Z',
    end_date: '2019-12-25T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '06-02',
    description: 'Rogue River-Siskiyou | Oregon',
    forest_abbr: 'rrs',
    tree_cost: 5,
    max_num_trees: 5,
    forest_name_short: 'Rogue River-Siskiyou',
    timezone: 'America/Seattle',
    cutting_areas: '{}',
    poss_financial_id: '999900009'
  },
  {
    id: 11,
    forest_name: 'Okanogan-Wenatchee National Forest',
    forest_url: 'https://www.fs.usda.gov/main/okawen/home',
    tree_height: 15,
    stump_height: 6,
    stump_diameter: 0,
    start_date: '2019-11-01T07:00:00Z',
    end_date: '2019-12-31T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '06-02',
    description: 'Okanogan-Wenatchee | Washington',
    forest_abbr: 'okawen',
    tree_cost: 5,
    max_num_trees: 2,
    forest_name_short: 'Okanogan-Wenatchee',
    timezone: 'America/Seattle',
    cutting_areas: '{}',
    poss_financial_id: '999900011'
  },
  {
    id: 12,
    forest_name: 'Umatilla National Forest',
    forest_url: 'http://www.fs.usda.gov/umatilla',
    tree_height: 14,
    stump_height: 10,
    stump_diameter: 0,
    start_date: '2019-11-18T07:00:00Z',
    end_date: '2019-12-31T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '06-02',
    description: 'Umatilla | Oregon',
    forest_abbr: 'umatilla',
    tree_cost: 5,
    max_num_trees: 1,
    forest_name_short: 'Umatilla',
    timezone: 'America/Seattle',
    cutting_areas: '{}',
    poss_financial_id: '999900013'
  },
  {
    id: 13,
    forest_name: 'Ochoco National Forest',
    forest_url: 'https://www.fs.usda.gov/ochoco',
    tree_height: 12,
    stump_height: 12,
    stump_diameter: 0,
    start_date: '2019-11-18T07:00:00Z',
    end_date: '2019-12-25T06:59:59Z',
    created: 'now()',
    updated: 'now()',
    org_structure_code: '060607',
    description: 'Ochoco | Oregon',
    forest_abbr: 'ochoco',
    tree_cost: 5,
    max_num_trees: 5,
    forest_name_short: 'Ochoco',
    timezone: 'America/Seattle',
    cutting_areas: '{}',
    poss_financial_id: '999900016'
  }
];

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('christmasTreesForests', forests);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('christmasTreesForests');
  }
};
