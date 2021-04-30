import 'basiclightbox/dist/basiclightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import getRefs from './refs';

const refs = getRefs();

export default function onOpenModal(e) {
  if (e.target.localName !== 'img') {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${e.srcElement.dataset.src}">`,
    {
      onShow: () => {
        refs.body.style.overflow = 'hidden';
      },
      onClose: () => {
        refs.body.style.overflow = 'visible';
      },
    },
  );
  instance.show(e.srcElement.dataset.src);

  const listener = e => {
    if (e.key === 'Escape') {
      instance.close();
      if (instance.close()) {
        window.removeEventListener('keyup', listener);
      }
    }
  };
  window.addEventListener('keyup', listener);
}
