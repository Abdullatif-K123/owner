import { useQuery, useMutation } from "@tanstack/react-query";
import { API } from "./apis";

export const queries = {
  useCity: () => useQuery({ queryKey: ["getCity"], queryFn: API.getCity }),
  useRegion: (test: string) => {
    return useQuery({
      queryKey: ["getRegion", test],
      queryFn: () => API.getRegion(test),
    });
  },

  useRegisterMobileNumber: () => useMutation(API.registerMobileNumber),
  useVerification: () => useMutation(API.verification),
  useCreatAccount1: () => useMutation(API.createAccount1),
  useCreatAccount2: () => useMutation(API.createAccount2),
};
