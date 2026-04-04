import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ModalAttention = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-attention" onClick={onClose}>
      <div className="modal-attention__content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-attention__text">
          You need to be logged in to perform this action.
        </p>
        <Link className="modal-attention__link" to="/register">Register</Link>
        <Link className="modal-attention__link" to="/login">Login</Link>
        <button className="modal-attention__close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalAttention;