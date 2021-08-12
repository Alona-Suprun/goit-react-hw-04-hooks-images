import React from 'react';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ modalContent, openModal, image }) => {
  const onImageClick = e => {
    modalContent(e.target.dataset.url, e.target.alt);
    openModal();
  };

  return (
    <>
      {image.map(({ tags, id, webformatURL, largeImageURL }) => {
        return (
          <li key={id} className={s.ImageGalleryItem}>
            <img
              src={webformatURL}
              alt={tags}
              className={s.ImageGalleryItemImage}
              data-url={largeImageURL}
              onClick={onImageClick}
            />
          </li>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  openModal: PropTypes.func,
  modalContent: PropTypes.func,
};

export default ImageGalleryItem;
