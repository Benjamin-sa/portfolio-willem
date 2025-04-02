/**
 * Media Service - Handles loading media assets with optimized loading strategies
 */

// Cache for loaded media to prevent duplicate requests
const mediaCache = new Map();

/**
 * Generate a placeholder SVG image as a data URL
 * @param {string} text - Text to display in the placeholder
 * @param {number} width - Width of the placeholder
 * @param {number} height - Height of the placeholder
 * @returns {string} - Data URL containing SVG image
 */
export function generatePlaceholder(
  text = "Image not found",
  width = 800,
  height = 600
) {
  const color = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23${color}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24px' fill='white'%3E${text}%3C/text%3E%3C/svg%3E`;
}

/**
 * Load an image with caching, lazy loading, and progressive loading
 * @param {string} imagePath - Path to the image (relative to @/assets)
 * @param {string} fallbackText - Text to display in fallback placeholder
 * @param {Object} options - Additional options
 * @returns {string} - URL of the image or a data URL for the placeholder
 */
export async function getImage(imagePath, fallbackText = null, options = {}) {
  // Return from cache if available
  if (mediaCache.has(imagePath)) {
    return mediaCache.get(imagePath);
  }

  // Always provide a placeholder immediately while real image loads
  const placeholder = generatePlaceholder(
    fallbackText || `Loading: ${imagePath}`,
    options.width || 800,
    options.height || 600
  );

  try {
    // Dynamically import the image
    const imageModule = import(`@/assets/images/${imagePath}`);

    // If this is not a critical image, return placeholder immediately
    // and update the reference when image loads
    if (options.lazy) {
      // Start loading in background
      imageModule
        .then((module) => {
          mediaCache.set(imagePath, module.default);
        })
        .catch((error) => {
          console.warn(`Failed to load image: ${imagePath}`, error);
        });

      return placeholder;
    }

    // For critical images, wait for them to load
    const loadedImage = await imageModule;
    mediaCache.set(imagePath, loadedImage.default);
    return loadedImage.default;
  } catch (error) {
    console.warn(`Failed to load image: ${imagePath}`, error);
    return placeholder;
  }
}

/**
 * Load a video with caching and lazy loading
 * @param {string} videoPath - Path to the video (relative to @/assets)
 * @param {Object} options - Additional options including lazy loading
 * @returns {string|null} - URL of the video or null if not found
 */
export async function getVideo(videoPath, options = {}) {
  // Return from cache if available
  if (mediaCache.has(videoPath)) {
    return mediaCache.get(videoPath);
  }

  try {
    // For lazy-loaded videos, return null initially and load in background
    if (options.lazy) {
      // Start loading in background
      import(`@/assets/videos/${videoPath}`)
        .then((module) => {
          mediaCache.set(videoPath, module.default);
        })
        .catch((error) => {
          console.warn(`Failed to load video: ${videoPath}`, error);
        });

      return null;
    }

    // For critical videos, wait for them to load
    const videoModule = await import(`@/assets/videos/${videoPath}`);
    mediaCache.set(videoPath, videoModule.default);
    return videoModule.default;
  } catch (error) {
    console.warn(`Failed to load video: ${videoPath}`, error);
    return null;
  }
}

/**
 * Preload commonly used images to improve response time
 * @param {Array<string>} imagePaths - Array of image paths to preload
 */
export function preloadCommonImages(imagePaths = []) {
  if (!Array.isArray(imagePaths) || imagePaths.length === 0) return;

  // Use requestIdleCallback when browser is idle
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      imagePaths.forEach((path) => {
        getImage(path, null, { lazy: true });
      });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      imagePaths.forEach((path) => {
        getImage(path, null, { lazy: true });
      });
    }, 1000); // Delay preloading by 1 second
  }
}

/**
 * Generate project image placeholders
 * @param {number} count - Number of placeholders to generate
 * @returns {Array<string>} - Array of placeholder URLs
 */
export function generateProjectPlaceholders(count) {
  return Array(count)
    .fill(null)
    .map((_, i) => generatePlaceholder(`Project ${i + 1}`, 800, 600));
}

// Export all functions as named exports
export default {
  generatePlaceholder,
  getImage,
  getVideo,
  generateProjectPlaceholders,
  preloadCommonImages,
};
