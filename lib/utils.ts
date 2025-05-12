import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to generate more sophisticated name suggestions
export function generateNames(formData: {
  coreConcept: string;
  industry: string;
  vibe: string;
  keywords: string;
}): string[] {
  const { coreConcept, industry, vibe, keywords } = formData;
  
  // Get the main concept words (first 2-3 significant words)
  const conceptWords = coreConcept
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => !['and', 'the', 'with', 'for', 'that', 'this', 'from', 'have'].includes(word.toLowerCase()))
    .slice(0, 3);
  
  // Get keywords as array
  const keywordArray = keywords
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0);
    
  // Prefixes and suffixes based on the vibe
  const prefixes: Record<string, string[]> = {
    'Modern': ['Neo', 'Flux', 'Evo', 'Nova', 'Pixel'],
    'Playful': ['Joy', 'Fun', 'Spark', 'Zoom', 'Pop'],
    'Trustworthy': ['True', 'Solid', 'Core', 'Guard', 'Shield'],
    'Premium': ['Elite', 'Prime', 'Luxe', 'Apex', 'Crown'],
    'Classic': ['Ever', 'Heritage', 'Legacy', 'Era', 'Origin'],
    'Techy': ['Byte', 'Tech', 'Data', 'Logic', 'Algo']
  };
  
  const suffixes: Record<string, string[]> = {
    'Modern': ['Hub', 'Labs', 'Now', 'Edge', 'Sync'],
    'Playful': ['Dash', 'Joy', 'Blast', 'Zone', 'Vibes'],
    'Trustworthy': ['Guard', 'Shield', 'Safe', 'Trust', 'Secure'],
    'Premium': ['Select', 'Elite', 'Prime', 'Peak', 'Royal'],
    'Classic': ['Co', 'Inc', 'Est', 'Bros', 'Works'],
    'Techy': ['Ware', 'Sys', 'Net', 'Code', 'AI']
  };
  
  // Industry-specific words
  const industryWords: Record<string, string[]> = {
    'Tech': ['Byte', 'Code', 'Bit', 'Pixel', 'Cloud'],
    'Finance': ['Capital', 'Wealth', 'Fund', 'Asset', 'Money'],
    'Health': ['Vital', 'Care', 'Health', 'Life', 'Well'],
    'Food': ['Bite', 'Taste', 'Dish', 'Savor', 'Feast'],
    'Education': ['Learn', 'Mind', 'Scholar', 'Brain', 'Mentor'],
    'Creative': ['Muse', 'Create', 'Canvas', 'Design', 'Art'],
    'E-commerce': ['Shop', 'Cart', 'Buy', 'Market', 'Store'],
    'Travel': ['Journey', 'Trip', 'Wander', 'Go', 'Tour'],
    'Other': ['Hub', 'Spot', 'Point', 'Link', 'Way']
  };
  
  // Generate name patterns
  const names: string[] = [];
  
  // 1. [Prefix] + [Concept Word]
  if (conceptWords.length > 0) {
    const prefix = prefixes[vibe]?.[Math.floor(Math.random() * prefixes[vibe].length)];
    const word = conceptWords[0];
    names.push(`${prefix}${capitalizeFirstLetter(word)}`);
  }
  
  // 2. [Industry] + [Suffix]
  const industrySuffix = suffixes[vibe]?.[Math.floor(Math.random() * suffixes[vibe].length)];
  names.push(`${industry}${industrySuffix}`);
  
  // 3. [Vibe] + [Industry Word]
  const industryWord = industryWords[industry]?.[Math.floor(Math.random() * industryWords[industry].length)];
  names.push(`${vibe}${industryWord}`);
  
  // 4. [Concept Word] + [Industry Word] 
  if (conceptWords.length > 0) {
    const randomIndustryWord = industryWords[industry]?.[Math.floor(Math.random() * industryWords[industry].length)];
    names.push(`${capitalizeFirstLetter(conceptWords[0])}${randomIndustryWord}`);
  }
  
  // 5. The [Industry] [Concept Word]
  if (conceptWords.length > 0) {
    names.push(`The ${industry} ${capitalizeFirstLetter(conceptWords[0])}`);
  }
  
  // 6. Use keywords if available
  if (keywordArray.length > 0) {
    const keyword = keywordArray[Math.floor(Math.random() * keywordArray.length)];
    const vibeSuffix = suffixes[vibe]?.[Math.floor(Math.random() * suffixes[vibe].length)];
    names.push(`${capitalizeFirstLetter(keyword)}${vibeSuffix}`);
  }
  
  // 7. Add some completely unique combinations
  const uniquePatterns = [
    `${vibe}HQ`,
    `${industry}Spark`,
    `${vibe}Wave`,
    conceptWords.length > 0 ? `${conceptWords[0].slice(0, 3)}X` : `NeoX`,
    keywordArray.length > 0 ? `${keywordArray[0].slice(0, 4)}ify` : `Sparkify`
  ];
  
  names.push(...uniquePatterns);
  
  // Remove any duplicates and return
  return [...new Set(names)];
}

// Helper function to capitalize first letter of a string
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to trigger confetti celebration effect
export function triggerConfetti() {
  import('canvas-confetti').then((confetti) => {
    // Check if we're in dark mode
    const isDark = document.documentElement.classList.contains('dark');
    
    // Brighter colors for dark mode
    const colors = isDark 
      ? ['#22d3ee', '#3b82f6', '#a855f7', '#ec4899', '#f59e0b', '#10b981'] // Brighter colors for dark mode
      : ['#4F46E5', '#3B82F6', '#2563EB', '#60A5FA', '#93C5FD']; // Original blue palette
    
    // First burst
    confetti.default({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: colors,
      startVelocity: 45,
      gravity: 0.8,
      scalar: 1.2,
    });
    
    // Left side burst
    setTimeout(() => {
      confetti.default({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.5 },
        colors: isDark 
          ? ['#34d399', '#22d3ee', '#a5b4fc', '#f9a8d4'] 
          : ['#10B981', '#059669', '#34D399', '#6EE7B7', '#A7F3D0'],
        startVelocity: 35,
      });
    }, 250);
    
    // Right side burst
    setTimeout(() => {
      confetti.default({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.5 },
        colors: isDark 
          ? ['#f472b6', '#fb923c', '#facc15', '#a3e635'] 
          : ['#EC4899', '#DB2777', '#F472B6', '#F9A8D4', '#FBCFE8'],
        startVelocity: 35,
      });
    }, 400);

    // Grand finale
    setTimeout(() => {
      confetti.default({
        particleCount: 200,
        spread: 180,
        origin: { y: 0.7 },
        colors: colors,
        startVelocity: 30,
        gravity: 0.7,
        scalar: 1.5,
        ticks: 150
      });
    }, 800);
  });
}
