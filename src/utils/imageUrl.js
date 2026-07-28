const UPLOADS_BASE = "http://localhost:5000/uploads/";

export const resolveImageUrl = (image) => {
  if (!image) return null;
  if (/^https?:\/\//i.test(image)) return image;
  return `${UPLOADS_BASE}${image}`;
};
