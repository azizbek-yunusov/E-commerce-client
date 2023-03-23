export const handleImage = (e, setImage) => {
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const file = e.target.files[0];
  setFileToBase(file);
};
