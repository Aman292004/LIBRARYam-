function getImgUrl(name) {
  if (!name || typeof name !== "string") return "/placeholder-image.jpg";

  if (name.includes("firebasestorage.googleapis.com")) {
    return name.includes("?alt=media") ? name : `${name}?alt=media`;
  }

  return new URL(`../assets/books/${name}`, import.meta.url).href;
}

export { getImgUrl };
