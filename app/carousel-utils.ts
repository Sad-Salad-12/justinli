export type SlideStackPosition = "active" | "next" | "after" | "hidden";

export function wrapSlideIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

export function getSlideStackPosition(
  index: number,
  activeIndex: number,
  total: number,
): SlideStackPosition {
  const relativeIndex = wrapSlideIndex(index - activeIndex, total);

  if (relativeIndex === 0) return "active";
  if (relativeIndex === 1) return "next";
  if (relativeIndex === 2) return "after";
  return "hidden";
}

export function getDraggedSlideIndex(
  activeIndex: number,
  dragDistance: number,
  total: number,
  threshold = 48,
) {
  if (dragDistance <= -threshold) return wrapSlideIndex(activeIndex + 1, total);
  if (dragDistance >= threshold) return wrapSlideIndex(activeIndex - 1, total);
  return activeIndex;
}
