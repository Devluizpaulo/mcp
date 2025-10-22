
export const components = [
    // CPUs
    {
      name: "Intel Core i9-13900K",
      type: "cpu",
      manufacturer: "Intel",
      model: "i9-13900K",
      specifications: JSON.stringify({ "Cores": 24, "Threads": 32, "Clock": "3.0 GHz", "Boost": "5.8 GHz" }),
      performanceScore: 9.8,
      estimatedCost: 580
    },
    {
      name: "AMD Ryzen 9 7950X",
      type: "cpu",
      manufacturer: "AMD",
      model: "Ryzen 9 7950X",
      specifications: JSON.stringify({ "Cores": 16, "Threads": 32, "Clock": "4.5 GHz", "Boost": "5.7 GHz" }),
      performanceScore: 9.7,
      estimatedCost: 550
    },
    {
      name: "Intel Core i5-13600K",
      type: "cpu",
      manufacturer: "Intel",
      model: "i5-13600K",
      specifications: JSON.stringify({ "Cores": 14, "Threads": 20, "Clock": "3.5 GHz", "Boost": "5.1 GHz" }),
      performanceScore: 9.2,
      estimatedCost: 310
    },
    {
      name: "AMD Ryzen 7 7700X",
      type: "cpu",
      manufacturer: "AMD",
      model: "Ryzen 7 7700X",
      specifications: JSON.stringify({ "Cores": 8, "Threads": 16, "Clock": "4.5 GHz", "Boost": "5.4 GHz" }),
      performanceScore: 9.0,
      estimatedCost: 340
    },
    // GPUs
    {
      name: "NVIDIA GeForce RTX 4090",
      type: "gpu",
      manufacturer: "NVIDIA",
      model: "GeForce RTX 4090",
      specifications: JSON.stringify({ "VRAM": "24GB GDDR6X", "Boost Clock": "2.52 GHz" }),
      performanceScore: 10.0,
      estimatedCost: 1600
    },
    {
      name: "AMD Radeon RX 7900 XTX",
      type: "gpu",
      manufacturer: "AMD",
      model: "Radeon RX 7900 XTX",
      specifications: JSON.stringify({ "VRAM": "24GB GDDR6", "Boost Clock": "2.5 GHz" }),
      performanceScore: 9.6,
      estimatedCost: 950
    },
    {
      name: "NVIDIA GeForce RTX 4070 Ti",
      type: "gpu",
      manufacturer: "NVIDIA",
      model: "GeForce RTX 4070 Ti",
      specifications: JSON.stringify({ "VRAM": "12GB GDDR6X", "Boost Clock": "2.61 GHz" }),
      performanceScore: 9.3,
      estimatedCost: 800
    },
    // RAM
    {
        name: "Corsair Vengeance 32GB DDR5 5600MHz",
        type: "ram",
        manufacturer: "Corsair",
        model: "Vengeance DDR5",
        specifications: JSON.stringify({ "Capacity": "32GB (2x16GB)", "Speed": "5600MHz", "Type": "DDR5" }),
        performanceScore: 8.8,
        estimatedCost: 100
    },
    {
        name: "G.Skill Trident Z5 32GB DDR5 6000MHz",
        type: "ram",
        manufacturer: "G.Skill",
        model: "Trident Z5",
        specifications: JSON.stringify({ "Capacity": "32GB (2x16GB)", "Speed": "6000MHz", "Type": "DDR5" }),
        performanceScore: 9.1,
        estimatedCost: 120
    },
    // Motherboards
    {
        name: "ASUS ROG Strix Z790-E Gaming",
        type: "motherboard",
        manufacturer: "ASUS",
        model: "ROG Strix Z790-E",
        specifications: JSON.stringify({ "Socket": "LGA 1700", "Chipset": "Z790", "RAM": "DDR5" }),
        performanceScore: 9.5,
        estimatedCost: 480
    },
    {
        name: "MSI MAG B650 Tomahawk",
        type: "motherboard",
        manufacturer: "MSI",
        model: "MAG B650 Tomahawk",
        specifications: JSON.stringify({ "Socket": "AM5", "Chipset": "B650", "RAM": "DDR5" }),
        performanceScore: 8.9,
        estimatedCost: 220
    },
    // Storage
    {
        name: "Samsung 980 Pro 1TB NVMe SSD",
        type: "storage",
        manufacturer: "Samsung",
        model: "980 Pro",
        specifications: JSON.stringify({ "Capacity": "1TB", "Type": "NVMe Gen4 SSD", "Read Speed": "7000 MB/s" }),
        performanceScore: 9.7,
        estimatedCost: 100
    },
    {
        name: "Crucial P3 2TB NVMe SSD",
        type: "storage",
        manufacturer: "Crucial",
        model: "P3",
        specifications: JSON.stringify({ "Capacity": "2TB", "Type": "NVMe Gen3 SSD", "Read Speed": "3500 MB/s" }),
        performanceScore: 9.0,
        estimatedCost: 90
    },
    // PSU
    {
        name: "Corsair RM850x 850W 80+ Gold",
        type: "psu",
        manufacturer: "Corsair",
        model: "RM850x",
        specifications: JSON.stringify({ "Wattage": "850W", "Efficiency": "80+ Gold", "Modular": "Fully" }),
        performanceScore: 9.4,
        estimatedCost: 150
    },
    {
        name: "SeaSonic FOCUS Plus Gold 750W",
        type: "psu",
        manufacturer: "SeaSonic",
        model: "FOCUS Plus Gold",
        specifications: JSON.stringify({ "Wattage": "750W", "Efficiency": "80+ Gold", "Modular": "Fully" }),
        performanceScore: 9.2,
        estimatedCost: 120
    },
    // Case
    {
        name: "Lian Li Lancool II Mesh",
        type: "case",
        manufacturer: "Lian Li",
        model: "Lancool II Mesh",
        specifications: JSON.stringify({ "Type": "Mid Tower", "Color": "Black", "Fans": "3x Included" }),
        performanceScore: 8.5,
        estimatedCost: 110
    },
    {
        name: "Fractal Design Meshify C",
        type: "case",
        manufacturer: "Fractal Design",
        model: "Meshify C",
        specifications: JSON.stringify({ "Type": "Mid Tower", "Color": "Black", "Fans": "2x Included" }),
        performanceScore: 8.4,
        estimatedCost: 95
    },
    // Cooler
    {
        name: "Noctua NH-D15",
        type: "cooler",
        manufacturer: "Noctua",
        model: "NH-D15",
        specifications: JSON.stringify({ "Type": "Air Cooler", "Fan Size": "140mm" }),
        performanceScore: 9.3,
        estimatedCost: 100
    },
    {
        name: "Corsair iCUE H150i Elite Capellix",
        type: "cooler",
        manufacturer: "Corsair",
        model: "H150i Elite",
        specifications: JSON.stringify({ "Type": "Liquid Cooler (AIO)", "Radiator": "360mm" }),
        performanceScore: 9.6,
        estimatedCost: 190
    }
  ];
  
  