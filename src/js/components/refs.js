export default function getRefs() {
  return {
    input: document.getElementById('searchQuery'),
    searchQuery: document.querySelector('.form'),
    gallery: document.querySelector('.gallery'),
    target: document.querySelector('.target'),
    body: document.body,
  };
}
