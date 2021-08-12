import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';

import ImageApi from '../../api/imageApi';

const imageApi = new ImageApi();

class ImageGallery extends Component {
  state = {
    image: null,
    error: null,
    status: 'idle',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchValue;
    const nextSearch = this.props.searchValue;

    if (prevSearch !== nextSearch) {
      this.setState({ status: 'pending', loading: true });

      imageApi.query = this.props.searchValue;
      imageApi
        .fetchImagesApi(nextSearch)
        .then(image => {
          if (image.length === 0) {
            toast(`Sorry, there is no image of ${this.props.searchValue}!`);

            this.setState({ image, status: 'rejected' });
            return;
          } else this.setState({ image, status: 'resolved' });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  onClick = () => {
    const scrollTo = document.documentElement.scrollHeight - 141;
    imageApi
      .fetchImagesApi()
      .then(image => {
        this.setState(prevState => ({
          loading: !prevState.loading,
          image: [...prevState.image, ...image],
        }));
        window.scrollTo({
          top: scrollTo,
          behavior: 'smooth',
        });
      })
      .finally(
        this.setState(prevState => ({
          loading: !prevState.loading,
        })),
      );
  };

  render() {
    const { image, status, loading } = this.state;

    if (status === 'idle') {
      return (
        <h2 className={s.heading}>
          Type what kind of image you're looking for in the search bar.
        </h2>
      );
    }

    if (status === 'pending') {
      return (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Loader type="Bars" />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h2 className={s.heading}>Try again.</h2>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.imageGallery}>
            <ImageGalleryItem
              image={image}
              openModal={this.props.openModal}
              modalContent={this.props.modalContent}
            />
          </ul>
          {loading ? (
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              <Button type="button" onClick={this.onClick}>
                Load more
              </Button>
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <Loader type="Bars" />
            </div>
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  onClick: PropTypes.func,
  searchValue: PropTypes.string.isRequired,
  openModal: PropTypes.func,
  modalContent: PropTypes.func,
};

export default ImageGallery;
