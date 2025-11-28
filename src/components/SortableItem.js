import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, img, isFeatured, onDelete, onSetFeatured }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: "grab",
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(id);
  };

  const handleSetFeatured = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onSetFeatured(id);
  };

  return (
    <div className="sortable-item" ref={setNodeRef} style={style}>
      {/* Only the image is draggable */}
      <div className="drag-handle" {...attributes} {...listeners}>
        <img src={img.url} alt="Product" />
      </div>

      {isFeatured && <span className="featured-badge">Featured</span>}

      <div className="actions">
        <button type="button" onClick={handleSetFeatured}>
          ★
        </button>
        <button type="button" onClick={handleDelete}>
          🗑
        </button>
      </div>
    </div>
  );
};

export default SortableItem;
