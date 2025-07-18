import mockCandidates from "../data/candidates";

export const getCandidates = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCandidates);
    }, 800); // simulate 800ms API delay
  });
};