export const api = "http://localhost:5000";

export const cleanObject = (obj) => {
    const cleanedFilters = {};
  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      if (value.length > 0) cleanedFilters[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      const nested = cleanObject(value);
      if (Object.keys(nested).length > 0) cleanedFilters[key] = nested;
    } else if (value !== '' && value !== false && value !== null) {
      cleanedFilters[key] = value;
    }
  }
  return cleanedFilters;
  };
  export function appendDataToFormData(data) {
    const formData = new FormData();
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === "images" && Array.isArray(data[key])) {
          data[key].forEach((file) => formData.append("images", file)); 
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    
    return formData;
  }
  