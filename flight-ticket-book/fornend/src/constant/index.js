export const locationName = [
  "Delhi",
  "Mumbai",
  "Kolkāta",
  "Bangalore",
  "Chennai",
  "Hyderābād",
  "Pune",
  "Ahmedabad",
  "Sūrat",
  "Lucknow",
  "Jaipur",
  "Cawnpore",
  "Mirzāpur",
  "Nāgpur",
  "Ghāziābād",
  "Indore",
  "Vadodara",
  "Vishākhapatnam",
  "Bhopāl",
  "Chinchvad",
  "Patna",
  "Ludhiāna",
  "Āgra",
  "Kalyān",
  "Madurai",
  "Jamshedpur",
  "Nāsik",
  "Farīdābād",
  "Aurangābād",
  "Rājkot",
  "Meerut",
  "Jabalpur",
  "Thāne",
  "Dhanbād",
  "Allahābād",
  "Vārānasi",
];

export const companyName = [
  "Air India",
  "Lines",
  "TATA",
  "Fish",
  "indgoo",
  "Dubai",
  "AT",
];

export const randomPrice = () => {
  const min = 1000;
  const max = 15000;
  return Math.round(min + Math.random() * (max - min));
};

export const minNumber = () => {
  const min = 1;
  const max = 180;
  return Math.round(min + Math.random() * (max - min));
};

