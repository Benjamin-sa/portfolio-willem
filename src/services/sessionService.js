/**
 * Session Service - Manages session-level state that persists during navigation
 * but resets when the page is reloaded
 */

// Use a simple reactive object to store session state
import { reactive } from "vue";

// Session state - will be reset on page reload but persist during navigation
const sessionState = reactive({
  hasInteracted: false, // Tracks if the user has interacted with the site during this session
});

/**
 * Get the current session state
 * @returns {Object} - The current session state object
 */
export function getSessionState() {
  return sessionState;
}

/**
 * Mark that the user has interacted with the site during this session
 */
export function markUserInteraction() {
  sessionState.hasInteracted = true;
}

/**
 * Check if the user has interacted with the site during this session
 * @returns {boolean} - True if the user has interacted, false otherwise
 */
export function hasUserInteracted() {
  return sessionState.hasInteracted;
}

export default {
  getSessionState,
  markUserInteraction,
  hasUserInteracted,
};
