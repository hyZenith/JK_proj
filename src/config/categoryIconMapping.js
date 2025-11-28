// src/config/categoryIconMapping.js

const categoryIconMapping = {
  'Manufacturing & Production': 'icon.top1.png',
  'Construction & Materials': 'icon.top2.png',
  'Agriculture & Food': 'icon.top3.png',
  'Textile & Apparel': 'icon.top4.png',
  'Logistics & Transportation': 'icon.top5.png',
  'Energy & Environment': 'icon.top6.png',
  'Machinery & Equipment': 'icon.top7.png',
  'Furniture & Interior Design': 'icon.top8.png',
  'Consumer Goods': 'icon.top9.png'
};

// Helper function to get icon for a category
export const getCategoryIcon = (categoryName) => {
  const iconFileName = categoryIconMapping[categoryName];
  
  if (!iconFileName) {
    console.warn(`No icon mapping found for category: ${categoryName}`);
    return null;
  }
  
  try {
    return `/assets/Industries Icons/${iconFileName}`;
    // If it's in src/assets/Industries Icons/, use the following line instead:
  } catch (error) {
    console.error(`Error loading icon for ${categoryName}:`, error);
    return null;
  }
};

export default categoryIconMapping;
