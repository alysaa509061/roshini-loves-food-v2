const STORAGE_KEY = 'roshini_recipe_images';

export const getRecipeImages = (): Record<string, string> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const getRecipeImage = (recipeId: string): string | null => {
  const images = getRecipeImages();
  return images[recipeId] || null;
};

export const saveRecipeImage = (recipeId: string, base64: string): void => {
  const images = getRecipeImages();
  images[recipeId] = base64;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch (e) {
    // localStorage full - remove oldest images
    const keys = Object.keys(images);
    if (keys.length > 1) {
      delete images[keys[0]];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    }
  }
};

export const deleteRecipeImage = (recipeId: string): void => {
  const images = getRecipeImages();
  delete images[recipeId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Compress image before storing
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 800;
        let { width, height } = img;
        if (width > height && width > MAX_SIZE) {
          height = (height * MAX_SIZE) / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = (width * MAX_SIZE) / height;
          height = MAX_SIZE;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
