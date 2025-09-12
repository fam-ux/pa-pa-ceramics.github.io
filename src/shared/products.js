const products = [
  // Lavender Flower Collection
  { 
    id: 'lavender-flower-11oz', 
    name: 'Lavender Flower Mug (11oz)', 
    priceCents: 1500, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A hand-painted ceramic mug featuring lavender flowers',
    images: [
      'lavender_flower_11oz_1.jpg',
      'lavender_flower_11oz_2.jpg',
      'lavender_flower_11oz_3.jpg'
    ]
  },
  { 
    id: 'lavender-flower-12oz', 
    name: 'Lavender Flower Mug (12oz)', 
    priceCents: 1500, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A hand-painted ceramic mug featuring lavender flowers',
    images: [
      'lavender_flower_12oz_1.jpg',
      'lavender_flower_12oz_2.jpg',
      'lavender_flower_12oz_3.jpg'
    ]
  },
  { 
    id: 'lavender-flower-16oz', 
    name: 'Lavender Flower Mug (16oz)', 
    priceCents: 2200, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A hand-painted ceramic mug featuring lavender flowers',
    images: [
      'lavender_flower_16oz_mug_1.jpg',
      'lavender_flower_16oz_mug_2.jpg',
      'lavender_flower_16oz_mug_3.jpg'
    ]
  },
  
  // Texas Bluebonnet Collection
  { 
    id: 'texas-bluebonnet-11oz', 
    name: 'Texas Bluebonnet Mug (11oz)', 
    priceCents: 1500, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A ceramic mug painted with Texas bluebonnets',
    images: [
      'texas_bluebonnet_11oz_1.jpg',
      'texas_bluebonnet_11oz_2.jpg',
      'texas_bluebonnet_11oz_3.jpg'
    ]
  },
  { 
    id: 'texas-bluebonnet-12oz', 
    name: 'Texas Bluebonnet Mug (12oz)', 
    priceCents: 1500, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A ceramic mug painted with Texas bluebonnets',
    images: [
      'texas_bluebonnet_12oz_1.jpg',
      'texas_bluebonnet_12oz_2.jpg',
      'texas_bluebonnet_12oz_3.jpg'
    ]
  },
  { 
    id: 'texas-bluebonnet-15oz', 
    name: 'Texas Bluebonnet Mug (15oz)', 
    priceCents: 1800, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A ceramic mug painted with Texas bluebonnets',
    images: [
      'texas_bluebonnet_15oz_1.jpg',
      'texas_bluebonnet_15oz_2.jpg',
      'texas_bluebonnet_15oz_3.jpg'
    ]
  },
  { 
    id: 'texas-bluebonnet-bowl', 
    name: 'Texas Bluebonnet Bowl (5.5")', 
    priceCents: 1800, 
    type: 'bowl', 
    theme: 'floral', 
    imageAlt: 'A ceramic bowl with Texas bluebonnet design',
    images: [
      'texas_bluebonnet_55bowl_1.jpg',
      'texas_bluebonnet_55bowl_2.jpg'
    ]
  },
  
  // Lotus Flower Collection
  { 
    id: 'lotus-flower-15oz', 
    name: 'Lotus Flower Mug (15oz)', 
    priceCents: 1800, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A ceramic mug featuring lotus flower design',
    images: [
      'lotus_flower_15oz_1.jpg',
      'lotus_flower_15oz_2.jpg',
      'lotus_flower_15oz_3.jpg'
    ]
  },
  { 
    id: 'lotus-flower-16oz', 
    name: 'Lotus Flower Mug (16oz)', 
    priceCents: 2200, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A ceramic mug featuring lotus flower design',
    images: [
      'lotus_flower_16oz_mug_1.jpg',
      'lotus_flower_16oz_mug_2.jpg',
      'lotus_flower_16oz_mug_3.jpg'
    ]
  },
  { 
    id: 'lotus-flower-plate', 
    name: 'Lotus Flower Plate (6")', 
    priceCents: 2500, 
    type: 'plate', 
    theme: 'floral', 
    imageAlt: 'A ceramic plate with lotus flower design',
    images: [
      'lotus_flower_6in_plate.jpg'
    ]
  },
  
  // Orchid Flower Collection
  { 
    id: 'orchid-flower-12oz', 
    name: 'Orchid Flower Mug (12oz)', 
    priceCents: 1500, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A ceramic mug with orchid flower design',
    images: [
      'orchid_flower_12oz_1.jpg',
      'orchid_flower_12oz_2.jpg',
      'orchid_flower_12oz_3.jpg'
    ]
  },
  
  // Tulip Flower Collection
  { 
    id: 'tulip-flower-12oz', 
    name: 'Tulip Flower Mug (12oz)', 
    priceCents: 1500, 
    type: 'mug', 
    theme: 'floral', 
    imageAlt: 'A ceramic mug with tulip flower design',
    images: [
      'tulip_flower_12oz_1.jpg',
      'tulip_flower_12oz_2.jpg',
      'tulip_flower_12oz_3.jpg'
    ]
  },
  
  // Panda Family Collection
  { 
    id: 'panda-family-11oz', 
    name: 'Panda Family Mug (11oz)', 
    priceCents: 1500, 
    type: 'mug', 
    theme: 'animals', 
    imageAlt: 'A ceramic mug featuring a panda family design',
    images: [
      'panda_family_11oz_1.jpg',
      'panda_family_11oz_2.jpg',
      'panda_family_11oz_3.jpg'
    ]
  },
  { 
    id: 'panda-family-15oz', 
    name: 'Panda Family Mug (15oz)', 
    priceCents: 1800, 
    type: 'mug', 
    theme: 'animals', 
    imageAlt: 'A ceramic mug featuring a panda family design',
    images: [
      'panda_family_1_15oz.jpg',
      'panda_family_2_15oz.jpg',
      'panda_family_3_15oz.jpg'
    ]
  },
  { 
    id: 'panda-family-bowl', 
    name: 'Panda Family Bowl (5.5")', 
    priceCents: 1800, 
    type: 'bowl', 
    theme: 'animals', 
    imageAlt: 'A ceramic bowl with panda family design',
    images: [
      'panda_family_55bowl_1.jpg',
      'panda_family_55bowl_2.jpg'
    ]
  },
  
  // Bamboo Forest Collection
  { 
    id: 'bamboo-forest-15oz', 
    name: 'Bamboo Forest Mug (15oz)', 
    priceCents: 1800, 
    type: 'mug', 
    theme: 'nature', 
    imageAlt: 'A ceramic mug with bamboo forest design',
    images: [
      'bamboo_forest_15oz_mug_1.jpg',
      'bamboo_forest_15oz_mug_2.jpg',
      'bamboo_forest_15oz_mug_3.jpg'
    ]
  },
  { 
    id: 'bamboo-forest-plate', 
    name: 'Bamboo Forest Plate (6")', 
    priceCents: 2500, 
    type: 'plate', 
    theme: 'nature', 
    imageAlt: 'A ceramic plate with bamboo forest design',
    images: [
      'bamboo_forest_6in_plate.jpg'
    ]
  },
  
  // Pups Collection
  { 
    id: 'pups-lover-15oz', 
    name: 'Pups Lover Mug (15oz)', 
    priceCents: 1800, 
    type: 'mug', 
    theme: 'animals', 
    imageAlt: 'A ceramic mug featuring cute puppies',
    images: [
      'pups_lover_15oz_1.jpg',
      'pups_lover_15oz_2.jpg',
      'pups_lover_15oz_3.jpg'
    ]
  },
  { 
    id: 'pups-lover-plate', 
    name: 'Pups Lover Plate (6")', 
    priceCents: 2500, 
    type: 'plate', 
    theme: 'animals', 
    imageAlt: 'A ceramic plate featuring cute puppies',
    images: [
      'pups_lover_6in_plate.jpg',
      'pups_lover_6in_olate_2.jpg'
    ]
  },
  { 
    id: 'pups-kitties-16oz', 
    name: 'Pups & Kitties Mug (16oz)', 
    priceCents: 2200, 
    type: 'mug', 
    theme: 'animals', 
    imageAlt: 'A ceramic mug featuring puppies and kittens',
    images: [
      'pups_kitties_16oz_1.jpg',
      'pups_kitties_16oz_2.jpg',
      'pups_kitties_16oz_3.jpg'
    ]
  },
]

export default products


