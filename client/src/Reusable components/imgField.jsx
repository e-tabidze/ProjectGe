import React from "react";

const ImageField = ({ onChange }) => {
  return (
    <div>
      <input type="file" name='productImage' accept="image/*" multiple onChange={(e) => onChange(e)} />
    </div>
  );
};

export default ImageField;
