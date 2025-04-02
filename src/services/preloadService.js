/**
 * Preload Service - Handles preloading of assets based on navigation
 */
import { preloadCommonImages, getImage } from "./mediaService";

// Track loading progress
let totalAssets = 0;
let loadedAssets = 0;

// Assets to preload when specific routes are loaded
const ROUTE_PRELOAD_MAP = {
  "/": [
    // Essential images for the home page
    "profile.jpg",
  ],
  "/projects": [
    // Common project thumbnails
    "Characters/De Wachters.jpg",
    "Characters/ROBOTOAD character design.jpg",
    "Posters/Poster Curse of the cliffs Artistiek dossier kopie.jpg",
  ],
  "/about": [
    // About page assets
    "profile.jpg",
  ],
};

/**
 * Emit loading progress event
 * @param {string} message - Loading message to display
 * @param {number} progress - Loading progress (0-100)
 */
function emitLoadingProgress(message, additionalLoaded = 1) {
  loadedAssets += additionalLoaded;
  const progress = Math.min(
    Math.round((loadedAssets / totalAssets) * 100),
    100
  );

  // Dispatch custom event that the loading screen can listen to
  window.dispatchEvent(
    new CustomEvent("mediaLoaded", {
      detail: {
        message,
        progress,
        loaded: loadedAssets,
        total: totalAssets,
      },
    })
  );
}

/**
 * Reset loading progress trackers
 */
export function resetLoadingProgress() {
  totalAssets = 0;
  loadedAssets = 0;
}

/**
 * Initialize loading for initial application load
 * @param {Array} criticalAssets - List of critical assets that must be loaded first
 */
export function initializeLoading(criticalAssets = []) {
  resetLoadingProgress();

  // Calculate estimated total assets for loading progress
  let estimatedAssetsCount = 0;

  // Count assets from route map
  Object.values(ROUTE_PRELOAD_MAP).forEach((assets) => {
    estimatedAssetsCount += assets.length;
  });

  // Add critical assets
  estimatedAssetsCount += criticalAssets.length;

  // Add base assets (HTML, CSS, JS, fonts)
  estimatedAssetsCount += 5;

  totalAssets = estimatedAssetsCount;
  emitLoadingProgress("Initializing application...", 0);

  // Start loading critical assets
  if (criticalAssets && criticalAssets.length) {
    criticalAssets.forEach((asset) => {
      // Determine asset type and load appropriately
      if (asset.includes(".mp4") || asset.includes(".webm")) {
        import(`@/assets/videos/${asset}`)
          .then(() => {
            emitLoadingProgress(`Loading video: ${asset}`);
          })
          .catch(() => {
            emitLoadingProgress(`Failed to load: ${asset}`);
          });
      } else {
        getImage(asset)
          .then(() => {
            emitLoadingProgress(`Loading image: ${asset}`);
          })
          .catch(() => {
            emitLoadingProgress(`Failed to load: ${asset}`);
          });
      }
    });
  }
}

/**
 * Preload assets specific to a route
 * @param {string} path - The route path
 */
export function preloadRouteAssets(path) {
  const assetsToPreload = ROUTE_PRELOAD_MAP[path];
  if (assetsToPreload && assetsToPreload.length > 0) {
    emitLoadingProgress(`Loading assets for ${path}`, 0);

    // Update totalAssets to include route-specific assets
    totalAssets += assetsToPreload.length;

    // Preload the assets
    preloadCommonImages(assetsToPreload);

    // Update loading message
    emitLoadingProgress(`Loaded route: ${path}`, assetsToPreload.length);
  }
}

/**
 * Preload assets for a project details page
 * @param {Object} project - The project data
 */
export function preloadProjectAssets(project) {
  if (!project) return;

  // Update totalAssets to include project assets
  if (project.images && project.images.length > 0) {
    totalAssets += project.images.length;
    emitLoadingProgress(`Loading project: ${project.title}`, 0);
  }

  // Preload the first image immediately
  if (project.images && project.images.length > 0) {
    getImage(project.images[0]).then(() =>
      emitLoadingProgress(`Loaded main image for ${project.title}`)
    );
  }

  // Preload the rest with lazy loading
  if (project.images && project.images.length > 1) {
    setTimeout(() => {
      const remainingImages = project.images.slice(1);
      remainingImages.forEach((img) => {
        getImage(img, null, { lazy: true }).then(() =>
          emitLoadingProgress(`Loaded image for ${project.title}`)
        );
      });
    }, 1000);
  }
}

/**
 * Prefetch assets for neighboring projects
 * @param {Array} projects - List of all projects
 * @param {number|string} currentId - Current project ID
 */
export function prefetchNeighboringProjects(projects, currentId) {
  if (!projects || !projects.length) return;

  const currentIndex = projects.findIndex((p) => p.id == currentId);
  if (currentIndex === -1) return;

  // Get previous and next project
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Update totalAssets to include neighboring projects' preview images
  let neighboringAssetsCount = 0;
  if (prevProject && prevProject.images && prevProject.images.length > 0)
    neighboringAssetsCount++;
  if (nextProject && nextProject.images && nextProject.images.length > 0)
    neighboringAssetsCount++;

  totalAssets += neighboringAssetsCount;

  // Prefetch images for these projects with low priority
  setTimeout(() => {
    if (prevProject && prevProject.images && prevProject.images.length > 0) {
      getImage(prevProject.images[0], null, { lazy: true }).then(() =>
        emitLoadingProgress(`Pre-loaded neighboring project`)
      );
    }
    if (nextProject && nextProject.images && nextProject.images.length > 0) {
      getImage(nextProject.images[0], null, { lazy: true }).then(() =>
        emitLoadingProgress(`Pre-loaded neighboring project`)
      );
    }
  }, 2000); // Wait 2 seconds before prefetching
}

export default {
  preloadRouteAssets,
  preloadProjectAssets,
  prefetchNeighboringProjects,
  initializeLoading,
  resetLoadingProgress,
  emitLoadingProgress: (message) => emitLoadingProgress(message),
};
