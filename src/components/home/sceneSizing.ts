export const DEFAULT_SCENE_SIZE = 960;

export function getSceneSize() {
  if (typeof window === "undefined") {
    return DEFAULT_SCENE_SIZE;
  }

  return Math.max(
    390,
    Math.min(Math.min(window.innerWidth, window.innerHeight) * 1.24, 1280)
  );
}
