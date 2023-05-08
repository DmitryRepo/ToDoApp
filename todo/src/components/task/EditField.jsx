import React from 'react';

const EditField = (props) => {
  const { onEditEnd, onTaskEscapeEdit, editing, label, onTaskEdit, id } = props;
  const onSubmitHandler = (event) => {
    event.preventDefault();
    onEditEnd(label, id);
  };
  if (editing) {
    return (
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          className="edit"
          value={label}
          onChange={onTaskEdit}
          onKeyDown={onTaskEscapeEdit}
          autoFocus
        />
      </form>
    );
  }
  return null;
};

export default EditField;
