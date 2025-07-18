import internshipsData from "../data/internships";

export const getInternships = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(internshipsData);
    }, 500); // simulate delay
  });
};