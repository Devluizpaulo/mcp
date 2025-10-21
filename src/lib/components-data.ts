export const componentsData = {
  cpu: [
    {
      label: 'Intel',
      items: [
        { value: 'intel-i9-13900k', label: 'Core i9-13900K' },
        { value: 'intel-i7-13700k', label: 'Core i7-13700K' },
        { value: 'intel-i5-13600k', label: 'Core i5-13600K' },
        { value: 'intel-i5-12400f', label: 'Core i5-12400F' },
      ],
    },
    {
      label: 'AMD',
      items: [
        { value: 'amd-ryzen-9-7950x', label: 'Ryzen 9 7950X' },
        { value: 'amd-ryzen-7-7800x3d', label: 'Ryzen 7 7800X3D' },
        { value: 'amd-ryzen-7-7700x', label: 'Ryzen 7 7700X' },
        { value: 'amd-ryzen-5-7600x', label: 'Ryzen 5 7600X' },
        { value: 'amd-ryzen-5-5600x', label: 'Ryzen 5 5600X' },
      ],
    },
  ],
  gpu: [
    {
      label: 'Nvidia',
      items: [
        { value: 'nvidia-rtx-4090', label: 'GeForce RTX 4090' },
        { value: 'nvidia-rtx-4080-super', label: 'GeForce RTX 4080 Super' },
        { value: 'nvidia-rtx-4070-ti-super', label: 'GeForce RTX 4070 Ti Super' },
        { value: 'nvidia-rtx-4070-super', label: 'GeForce RTX 4070 Super' },
        { value: 'nvidia-rtx-4060-ti', label: 'GeForce RTX 4060 Ti' },
        { value: 'nvidia-rtx-3060', label: 'GeForce RTX 3060' },
      ],
    },
    {
      label: 'AMD',
      items: [
        { value: 'amd-rx-7900-xtx', label: 'Radeon RX 7900 XTX' },
        { value: 'amd-rx-7900-xt', label: 'Radeon RX 7900 XT' },
        { value: 'amd-rx-7800-xt', label: 'Radeon RX 7800 XT' },
        { value: 'amd-rx-6700-xt', label: 'Radeon RX 6700 XT' },
      ],
    },
  ],
  motherboard: [
    { label: 'ASUS', items: [
        { value: 'asus-rog-z790', label: 'ROG Maximus Z790 Hero' },
        { value: 'asus-tuf-b550-plus', label: 'TUF Gaming B550-PLUS' },
    ]},
    { label: 'Gigabyte', items: [
        { value: 'gigabyte-z790-aorus', label: 'Z790 Aorus Elite AX' },
    ]},
    { label: 'MSI', items: [
        { value: 'msi-mpg-b650', label: 'MPG B650 Carbon WiFi' },
    ]},
    { label: 'ASRock', items: [
        { value: 'asrock-x670e-taichi', label: 'X670E Taichi' },
    ]},
  ],
  ram: [
    { label: 'Corsair', items: [
        { value: 'corsair-ddr5-6000-32gb', label: 'Vengeance 32GB DDR5 6000MHz' },
    ]},
    { label: 'G.Skill', items: [
        { value: 'gskill-ddr5-6000-32gb', label: 'Trident Z5 32GB DDR5 6000MHz' },
    ]},
    { label: 'Kingston', items: [
        { value: 'kingston-ddr4-3200-16gb', label: 'Fury Beast 16GB DDR4 3200MHz' },
    ]},
    { label: 'Crucial', items: [
        { value: 'crucial-ddr4-3200-16gb', label: 'Ballistix 16GB DDR4 3200MHz' },
    ]},
  ],
  storage: [
    { label: 'Samsung', items: [
        { value: 'samsung-980-pro-1tb', label: '980 Pro 1TB NVMe SSD' },
        { value: 'samsung-990-pro-2tb', label: '990 Pro 2TB NVMe SSD' },
    ]},
    { label: 'Western Digital', items: [
        { value: 'wd-black-sn850x-1tb', label: 'Black SN850X 1TB NVMe SSD' },
    ]},
    { label: 'Crucial', items: [
        { value: 'crucial-p5-plus-2tb', label: 'P5 Plus 2TB NVMe SSD' },
    ]},
    { label: 'Seagate', items: [
        { value: 'seagate-barracuda-2tb', label: 'Barracuda 2TB HDD' },
    ]},
  ],
  psu: [
      { label: 'Corsair', items: [{ value: 'corsair-rm850x', label: 'RM850x 850W 80+ Gold' }]},
      { label: 'Seasonic', items: [{ value: 'seasonic-focus-gx-750', label: 'FOCUS GX-750 750W 80+ Gold' }]},
      { label: 'EVGA', items: [{ value: 'evga-supernova-1000-g5', label: 'SuperNOVA 1000 G5 1000W 80+ Gold'}]},
      { label: 'be quiet!', items: [{ value: 'be-quiet-straight-power-11-750w', label: 'Straight Power 11 750W 80+ Platinum' }]},
  ],
  case: [
      { label: 'Fractal Design', items: [{ value: 'fractal-design-meshify-c', label: 'Meshify C' }]},
      { label: 'Lian Li', items: [{ value: 'lian-li-pc-o11-dynamic', label: 'PC-O11 Dynamic' }]},
      { label: 'NZXT', items: [{ value: 'nzxt-h510', label: 'H510' }]},
      { label: 'Cooler Master', items: [{ value: 'cooler-master-masterbox-q300l', label: 'MasterBox Q300L' }]},
  ]
};
