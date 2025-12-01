const NON_VEG_KEYWORDS = [
  'chicken', 'meat', 'fish', 'egg', 'beef', 'pork', 'lamb', 'mutton',
  'seafood', 'shrimp', 'prawn', 'crab', 'lobster', 'salmon', 'tuna',
  'turkey', 'duck', 'bacon', 'ham', 'sausage', 'gelatin', 'gelatine',
  'anchovies', 'anchovy', 'oyster', 'clam', 'mussel', 'octopus', 'squid',
  'steak', 'ribs', 'drumstick', 'thigh', 'breast', 'wing', 'liver',
  'pepperoni', 'salami', 'chorizo', 'prosciutto', 'venison', 'bison'
];

const REJECTION_MESSAGES = [
  "Whoa there, Roshini. This is a Veg Zone Only™ 🌱",
  "Error 404: Chicken not found — because this is vegetarian paradise 💚",
  "Nice try, but that ingredient isn't veggie-approved 😤",
  "Nope! This cookbook is 100% plant-powered 🥬",
  "Hold up — we don't do that here. Vegetables only! 🥕",
  "That's a hard pass from the Veggie Guardian 🛡️",
  "Red alert! Non-veg detected. Access denied 🚫",
  "This recipe book said 'no thanks' to that ingredient 🙅‍♀️"
];

const VEG_ALTERNATIVES: Record<string, string> = {
  chicken: "paneer, tofu, soy chunks, or jackfruit",
  meat: "lentils, mushrooms, or tempeh",
  fish: "banana blossom or hearts of palm",
  egg: "flax eggs, chia eggs, or aquafaba",
  beef: "black beans, beyond meat, or portobello mushrooms",
  pork: "jackfruit or seitan",
  seafood: "hearts of palm or king oyster mushrooms"
};

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  foundKeywords?: string[];
  suggestions?: string;
}

export const validateVegetarian = (text: string): ValidationResult => {
  if (!text) {
    return { isValid: true };
  }

  const lowerText = text.toLowerCase();
  const foundKeywords: string[] = [];

  // Check for non-veg keywords
  NON_VEG_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(lowerText)) {
      foundKeywords.push(keyword);
    }
  });

  if (foundKeywords.length > 0) {
    const randomMessage = REJECTION_MESSAGES[Math.floor(Math.random() * REJECTION_MESSAGES.length)];

    // Find suggestions
    const suggestions: string[] = [];
    foundKeywords.forEach(keyword => {
      const lowerKeyword = keyword.toLowerCase();
      Object.keys(VEG_ALTERNATIVES).forEach(key => {
        if (lowerKeyword.includes(key)) {
          suggestions.push(`Try ${VEG_ALTERNATIVES[key]} instead!`);
        }
      });
    });

    return {
      isValid: false,
      message: randomMessage,
      foundKeywords,
      suggestions: suggestions.join(" ")
    };
  }

  return { isValid: true };
};
