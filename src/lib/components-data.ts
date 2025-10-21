export const componentsData = {
  cpu: [
    {
      label: 'Intel',
      items: [
        // 14th Gen
        { value: 'intel-i9-14900k', label: 'Core i9-14900K' },
        { value: 'intel-i7-14700k', label: 'Core i7-14700K' },
        { value: 'intel-i5-14600k', label: 'Core i5-14600K' },
        // 13th Gen
        { value: 'intel-i9-13900k', label: 'Core i9-13900K' },
        { value: 'intel-i7-13700k', label: 'Core i7-13700K' },
        { value: 'intel-i5-13600k', label: 'Core i5-13600K' },
        { value: 'intel-i5-13400f', label: 'Core i5-13400F' },
        // 12th Gen
        { value: 'intel-i9-12900k', label: 'Core i9-12900K' },
        { value: 'intel-i7-12700k', label: 'Core i7-12700K' },
        { value: 'intel-i5-12600k', label: 'Core i5-12600K' },
        { value: 'intel-i5-12400f', label: 'Core i5-12400F' },
        { value: 'intel-i3-12100f', label: 'Core i3-12100F' },
        // Older Gens
        { value: 'intel-i9-11900k', label: 'Core i9-11900K' },
        { value: 'intel-i7-11700k', label: 'Core i7-11700K' },
        { value: 'intel-i5-11600k', label: 'Core i5-11600K' },
        { value: 'intel-i9-10900k', label: 'Core i9-10900K' },
        { value: 'intel-i7-10700k', label: 'Core i7-10700K' },
        { value: 'intel-i5-10600k', label: 'Core i5-10600K' },
      ],
    },
    {
      label: 'AMD',
      items: [
        // Ryzen 7000
        { value: 'amd-ryzen-9-7950x3d', label: 'Ryzen 9 7950X3D' },
        { value: 'amd-ryzen-9-7950x', label: 'Ryzen 9 7950X' },
        { value: 'amd-ryzen-9-7900x3d', label: 'Ryzen 9 7900X3D' },
        { value: 'amd-ryzen-9-7900x', label: 'Ryzen 9 7900X' },
        { value: 'amd-ryzen-7-7800x3d', label: 'Ryzen 7 7800X3D' },
        { value: 'amd-ryzen-7-7700x', label: 'Ryzen 7 7700X' },
        { value: 'amd-ryzen-5-7600x', label: 'Ryzen 5 7600X' },
        { value: 'amd-ryzen-5-7600', label: 'Ryzen 5 7600' },
        // Ryzen 5000
        { value: 'amd-ryzen-9-5950x', label: 'Ryzen 9 5950X' },
        { value: 'amd-ryzen-9-5900x', label: 'Ryzen 9 5900X' },
        { value: 'amd-ryzen-7-5800x3d', label: 'Ryzen 7 5800X3D' },
        { value: 'amd-ryzen-7-5800x', label: 'Ryzen 7 5800X' },
        { value: 'amd-ryzen-7-5700x', label: 'Ryzen 7 5700X' },
        { value: 'amd-ryzen-5-5600x', label: 'Ryzen 5 5600X' },
        { value: 'amd-ryzen-5-5600', label: 'Ryzen 5 5600' },
        // Ryzen 3000
        { value: 'amd-ryzen-9-3950x', label: 'Ryzen 9 3950X' },
        { value: 'amd-ryzen-7-3700x', label: 'Ryzen 7 3700X' },
        { value: 'amd-ryzen-5-3600', label: 'Ryzen 5 3600' },
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
        { value: 'nvidia-rtx-4060', label: 'GeForce RTX 4060' },
        { value: 'nvidia-rtx-3090-ti', label: 'GeForce RTX 3090 Ti' },
        { value: 'nvidia-rtx-3080-ti', label: 'GeForce RTX 3080 Ti' },
        { value: 'nvidia-rtx-3070', label: 'GeForce RTX 3070' },
        { value: 'nvidia-rtx-3060-ti', label: 'GeForce RTX 3060 Ti' },
        { value: 'nvidia-rtx-3060', label: 'GeForce RTX 3060' },
        { value: 'nvidia-rtx-2060-super', label: 'GeForce RTX 2060 Super' },
      ],
    },
    {
      label: 'AMD',
      items: [
        { value: 'amd-rx-7900-xtx', label: 'Radeon RX 7900 XTX' },
        { value: 'amd-rx-7900-xt', label: 'Radeon RX 7900 XT' },
        { value: 'amd-rx-7800-xt', label: 'Radeon RX 7800 XT' },
        { value: 'amd-rx-7700-xt', label: 'Radeon RX 7700 XT' },
        { value: 'amd-rx-6950-xt', label: 'Radeon RX 6950 XT' },
        { value: 'amd-rx-6800-xt', label: 'Radeon RX 6800 XT' },
        { value: 'amd-rx-6700-xt', label: 'Radeon RX 6700 XT' },
        { value: 'amd-rx-6600-xt', label: 'Radeon RX 6600 XT' },
      ],
    },
     {
      label: 'Intel',
      items: [
        { value: 'intel-arc-a770', label: 'Arc A770' },
        { value: 'intel-arc-a750', label: 'Arc A750' },
      ],
    },
  ],
  motherboard: [
    {
      label: 'Socket AM5 (AMD Ryzen 7000)',
      items: [
        { value: 'asus-rog-x670e-crosshair-hero', label: 'ASUS ROG X670E Crosshair Hero' },
        { value: 'gigabyte-x670-aorus-elite-ax', label: 'Gigabyte X670 Aorus Elite AX' },
        { value: 'msi-mpg-b650-carbon-wifi', label: 'MSI MPG B650 Carbon WiFi' },
        { value: 'asrock-x670e-taichi', label: 'ASRock X670E Taichi' },
      ]
    },
    {
      label: 'Socket AM4 (AMD Ryzen 1000-5000)',
      items: [
        { value: 'asus-rog-strix-x570-e', label: 'ASUS ROG Strix X570-E Gaming' },
        { value: 'gigabyte-b550-aorus-pro-ac', label: 'Gigabyte B550 Aorus Pro AC' },
        { value: 'msi-mag-b550-tomahawk', label: 'MSI MAG B550 Tomahawk' },
        { value: 'asrock-b450m-steel-legend', label: 'ASRock B450M Steel Legend' },
      ]
    },
    {
      label: 'Socket LGA1700 (Intel 12/13/14th Gen)',
      items: [
        { value: 'asus-rog-maximus-z790-hero', label: 'ASUS ROG Maximus Z790 Hero' },
        { value: 'gigabyte-z790-aorus-elite-ax', label: 'Gigabyte Z790 Aorus Elite AX' },
        { value: 'msi-mpg-z790-carbon-wifi', label: 'MSI MPG Z790 Carbon WiFi' },
        { value: 'asrock-z690-pg-velocita', label: 'ASRock Z690 PG Velocita' },
        { value: 'asus-prime-b660-plus-d4', label: 'ASUS Prime B660-PLUS D4' },
      ]
    },
     {
      label: 'Socket LGA1200 (Intel 10/11th Gen)',
      items: [
        { value: 'asus-rog-strix-z590-e', label: 'ASUS ROG Strix Z590-E Gaming' },
        { value: 'gigabyte-z490-aorus-ultra', label: 'Gigabyte Z490 Aorus Ultra' },
        { value: 'msi-mag-b460m-mortar', label: 'MSI MAG B460M Mortar WiFi' },
      ]
    },
  ],
  ram: [
    { 
      label: 'DDR5', 
      items: [
        { value: 'corsair-ddr5-6000-32gb', label: 'Corsair Vengeance 32GB (2x16GB) 6000MHz CL36' },
        { value: 'gskill-ddr5-6000-32gb', label: 'G.Skill Trident Z5 RGB 32GB (2x16GB) 6000MHz CL30' },
        { value: 'kingston-fury-ddr5-5200-32gb', label: 'Kingston FURY Beast 32GB (2x16GB) 5200MHz' },
        { value: 'crucial-pro-ddr5-5600-32gb', label: 'Crucial Pro 32GB (2x16GB) 5600MHz' },
    ]},
    { 
      label: 'DDR4', 
      items: [
        { value: 'corsair-ddr4-3200-16gb', label: 'Corsair Vengeance LPX 16GB (2x8GB) 3200MHz CL16' },
        { value: 'gskill-ddr4-3600-16gb', label: 'G.Skill Ripjaws V 16GB (2x8GB) 3600MHz CL18' },
        { value: 'kingston-fury-ddr4-3200-16gb', label: 'Kingston FURY Beast 16GB (2x8GB) 3200MHz' },
        { value: 'crucial-ballistix-ddr4-3200-16gb', label: 'Crucial Ballistix 16GB (2x8GB) 3200MHz' },
    ]},
  ],
  storage: [
    { 
      label: 'NVMe M.2 SSD', 
      items: [
        { value: 'samsung-990-pro-2tb', label: 'Samsung 990 Pro 2TB' },
        { value: 'samsung-980-pro-1tb', label: 'Samsung 980 Pro 1TB' },
        { value: 'wd-black-sn850x-2tb', label: 'WD Black SN850X 2TB' },
        { value: 'crucial-p5-plus-1tb', label: 'Crucial P5 Plus 1TB' },
        { value: 'kingston-kc3000-1tb', label: 'Kingston KC3000 1TB' },
    ]},
    { 
      label: 'SATA SSD', 
      items: [
        { value: 'samsung-870-evo-1tb', label: 'Samsung 870 Evo 1TB' },
        { value: 'crucial-mx500-2tb', label: 'Crucial MX500 2TB' },
    ]},
    { 
      label: 'HDD', 
      items: [
        { value: 'seagate-barracuda-4tb', label: 'Seagate Barracuda 4TB 5400RPM' },
        { value: 'wd-blue-2tb', label: 'WD Blue 2TB 7200RPM' },
    ]},
  ],
  psu: [
      { label: 'Corsair', items: [
        { value: 'corsair-rm1000x', label: 'RM1000x 1000W 80+ Gold' },
        { value: 'corsair-rm850x', label: 'RM850x 850W 80+ Gold' },
        { value: 'corsair-sf750', label: 'SF750 750W 80+ Platinum (SFX)' },
      ]},
      { label: 'Seasonic', items: [
        { value: 'seasonic-prime-tx-1000', label: 'PRIME TX-1000 1000W 80+ Titanium' },
        { value: 'seasonic-focus-gx-750', label: 'FOCUS GX-750 750W 80+ Gold' }
      ]},
      { label: 'EVGA', items: [
        { value: 'evga-supernova-1000-g5', label: 'SuperNOVA 1000 G5 1000W 80+ Gold'},
        { value: 'evga-supernova-850-p2', label: 'SuperNOVA 850 P2 850W 80+ Platinum'},
      ]},
      { label: 'be quiet!', items: [
        { value: 'be-quiet-dark-power-pro-12-1200w', label: 'Dark Power Pro 12 1200W 80+ Titanium' },
        { value: 'be-quiet-straight-power-11-750w', label: 'Straight Power 11 750W 80+ Platinum' }
      ]},
  ],
  case: [
      { label: 'Fractal Design', items: [
        { value: 'fractal-design-meshify-2', label: 'Meshify 2' },
        { value: 'fractal-design-north', label: 'North' },
        { value: 'fractal-design-torrent', label: 'Torrent' },
      ]},
      { label: 'Lian Li', items: [
        { value: 'lian-li-pc-o11-dynamic-evo', label: 'PC-O11 Dynamic EVO' },
        { value: 'lian-li-lancool-iii', label: 'Lancool III' },
      ]},
      { label: 'NZXT', items: [
        { value: 'nzxt-h9-flow', label: 'H9 Flow' },
        { value: 'nzxt-h7-flow', label: 'H7 Flow' },
        { value: 'nzxt-h510-flow', label: 'H510 Flow' },
      ]},
      { label: 'Cooler Master', items: [
        { value: 'cooler-master-masterbox-td500-mesh', label: 'MasterBox TD500 Mesh' },
        { value: 'cooler-master-masterbox-q300l', label: 'MasterBox Q300L' },
      ]},
  ]
};
