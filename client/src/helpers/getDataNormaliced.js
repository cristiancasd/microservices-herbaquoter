export const getDataNormalicedToEditUser = (userData) => {
  const { country, name, email, password, herbalifeLevel, image, isactive, rol } = userData;

  return {
    email,
    password,
    fullname: name,
    country,
    image,
    isactive,
    rol,
    herbalifelevel: herbalifeLevel,
  };
};

export const getDataNormalicedToEditMyPassword = (myProfileData) => {
  const { country, name, oldPassword, password, herbalifeLevel } = myProfileData;
  return {
    country,
    fullname: name,
    password: oldPassword,
    newPassword: password,
    herbalifelevel: herbalifeLevel,
  };
};

export const getDataNormalicedToEditMyProfile = (myProfileData) => {
  const { country, name, oldPassword, herbalifeLevel } = myProfileData;
  return {
    country,
    fullname: name,
    password: oldPassword,
    herbalifelevel: herbalifeLevel,
  };
};
