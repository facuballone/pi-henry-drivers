export const validateForename = (value) => {
  if (value.trim() === "") {
    return "The name is required";
  }
  if (!/^[A-Za-z]+$/.test(value)) {
    return "The name must contain only letters";
  } if(value.length>255){
    return"Supero el limite de caracteres" //hacerlo con todas los input de validacion
  }
  return "";
};

export const validateSurname = (value) => {
  if (value.trim() === "") {
    return "The last name is required";
  }
  if (!/^[A-Za-z]+$/.test(value)) {
    return "The last name must contain only letters";
  }
  return "";
};

export const validateDob = (value) => {
  if (value.trim() === "") {
    return "The date of birth is required";
  }

  const dateParts = value.split("-");
  if (dateParts.length !== 3) {
    return  "Invalid date format. Use the format YYYY-MM-DD";
  }

  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return  "Invalid date format. Use the format YYYY-MM-DD";
  }

  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1800) {
    return "Invalid date of birth";
  }

  return "";
};

export const validateDescription = (value) => {
  if (typeof value !== "string") {
    return "The description must be text";
  } else if (value.trim() === "") {
    return "The description is required";
  }
  return "";
};


export const validateNationality = (value) => {
  if (typeof value !== "string") {
    return "The nationality must be text";
  }

  if (/\d/.test(value)) {
    return "The nationality must not contain numbers";
  } else if (value.trim() === "") {
    return "The nationality is required";
  }
  return "";
};

export const validateImage = (value) => {
  if (typeof value !== "string") {
    return "The image must be a URL";
  }

  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  if (!urlPattern.test(value) ) {
    return "The image is not a valid URL";
  }

  return "";
};

