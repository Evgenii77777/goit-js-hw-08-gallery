import gallery from './gallery-items.js';

const jsGallery = document.querySelector('.js-gallery');
const jsModal = document.querySelector('.js-lightbox');
const btnModalClose = document.querySelector('.lightbox__button');
const fullImg = document.querySelector('.lightbox__image');
const overlayModal = document.querySelector('.lightbox__overlay');
const imgMarkup = galleryMarkup(gallery);

function galleryMarkup(el) {
    return gallery.map(el=> {
        return `<li class = 'gallery__item'>
    <a class 'gallery__link' href = '${el.original}'>
    <img class = 'gallery__image' src = '${el.preview}' data-source='${el.original}' alt = '${el.description}'>
    </a>
    </li>`;
        
    }).join('')
}
jsGallery.insertAdjacentHTML('beforeend', imgMarkup);

const createModal = (e) => {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return
    }
    fullImg.src = e.target.dataset.source;
    fullImg.alt = e.target.alt;
    onModalOpen();
 }

const onModalOpen = () => {
    jsModal.classList.add('is-open')
}

const onModalClose = () => {
    jsModal.classList.remove('is-open');
    fullImg.src = '';
    fullImg.alt = '';
 }

const onOverlayClick = (e) => {
    if (e.target === overlayModal) {
        onModalClose()
    }
}

const onEscape = (e) => {
    if (e.key === 'Escape') {
        onModalClose()
    }
}
 
jsGallery.addEventListener('click', createModal);
btnModalClose.addEventListener('click', onModalClose);
jsModal.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onEscape);