import { useContext, useEffect, useMemo } from "react";

import { UserContext } from "../contexts/UserContext";
import { useGetUser } from "./useUsers";

const useUpdateUserInner = (userId) => {
  const { data, dataUpdatedAt } = useGetUser(userId);

  const updateUser = useMemo(() => data?.[0] ?? null, [data]);

  const { handleLogIn, userObject } = useContext(UserContext);

  useEffect(() => {
    if (userObject?._id === userId && userObject !== updateUser && updateUser) {
      handleLogIn(updateUser);
    }
  }, [userObject, userId, updateUser, handleLogIn, dataUpdatedAt]);
};

export const useUpdateUser = () => {
  const { userObject, user } = useContext(UserContext);

  if (userObject && user) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateUserInner(userObject._id);
  }
};
