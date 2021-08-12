import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import Modal from './components/Modal/Modal';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  //const onSubmit = searchValue => {
  // this.setState({ searchValue });
  //};

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const modalContent = (url, alt) => {
    setModalUrl(url);
    setModalAlt(alt);
  };

  return (
    <>
      <Searchbar onSubmit={setSearchValue} />

      <ImageGallery
        searchValue={searchValue}
        openModal={toggleModal}
        modalContent={modalContent}
      />

      {showModal && (
        <Modal onClose={toggleModal} modalContent={modalContent}>
          <img src={modalUrl} alt={modalAlt} />
        </Modal>
      )}

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
