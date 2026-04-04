import React, { useEffect } from "react";

const ModalNotice = ({ isOpen, onClose, notice }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleFavoriteClick = () => {
    // Call API to toggle favorite
  };

  return (
    <div className="modal-notice" onClick={onClose}>
      <div className="modal-notice__content" onClick={(e) => e.stopPropagation()}>
        <img className="modal-notice__image" src={notice.image} alt={notice.title} />
        <h3 className="modal-notice__title">{notice.title}</h3>
        <p className="modal-notice__popularity">Popularity: {notice.popularity}</p>
        <p className="modal-notice__pet-name">Pet: {notice.petName}</p>
        <p className="modal-notice__birth">Birth: {notice.birthDate}</p>
        <p className="modal-notice__gender">Gender: {notice.gender}</p>
        <p className="modal-notice__type">Type: {notice.petType}</p>
        <p className="modal-notice__category">Category: {notice.category}</p>
        <p className="modal-notice__comment">{notice.comment}</p>
        <button className="modal-notice__favorite" onClick={handleFavoriteClick}>
          {notice.isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
        <a className="modal-notice__contact" href={`mailto:${notice.contactEmail}`}>
          Contact
        </a>
        <button className="modal-notice__close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalNotice;