import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import { cardsApi } from '../utils/api';
import { authApi } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Content({ userToken, handleLogout }) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getCardsPromise = cardsApi.getInitialCards();
    const getUserPromise = cardsApi.getUserInfo();
    const checkUserToken = authApi.getUserData(userToken);
    Promise.all([getCardsPromise, getUserPromise, checkUserToken])
      .then(([cardsData, userData, authUserData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
        setCurrentUser((data) => ({
          ...data,
          email: authUserData.data.email,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userToken]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    cardsApi
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    setIsLoading(true);
    cardsApi
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  function handleUpdateUser(name, about) {
    setIsLoading(true);
    cardsApi
      .setUserInfo(name, about)
      .then((newUser) => {
        setCurrentUser((user) => ({
          ...user,
          name: newUser.name,
          about: newUser.about,
        }));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    cardsApi
      .setUserAvatar(avatar)
      .then((avatar) => {
        setCurrentUser((state) => {
          state.avatar = avatar;
          return state;
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    cardsApi
      .postCard({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header handleLogout={handleLogout} />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
        />
        {/* секция попапа для изменения данных профиля  */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        {/* секция попапа для изменения аватара профиля */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        {/* секция попапа для добавления картинки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        {/* секция попапа для подтверждения удаления карточки */}
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
          card={selectedCard}
        />
        {/* секция попапа для увеличения изображения */}
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default Content;
