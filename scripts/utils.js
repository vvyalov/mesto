export const photoPopup = document.querySelector('.photo-popup')

export function openPopup(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closeEsc);
    document.addEventListener('click', closeOverlay);
};

export function closeEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_open'))
    }
};

export function closeOverlay(evt) {
    if (evt.target.classList.contains('popup_open')) {
        closePopup(evt.target);
    }
}

export function closePopup(popup) {
    popup.classList.remove('popup_open')
    document.removeEventListener('keydown', closeEsc);
    document.removeEventListener('click', closeOverlay);
};