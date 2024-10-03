import { AppDispatch } from "app/store/store";
import { showMessage } from "app/store/slices/messageSlice";
import { user } from "app/store/slices/userSlice";
import { allUsers } from "app/store/slices/allUsersSlice";
import { choiceServer } from "api/choiceServer";

export const whoAmI = async (
  dispatch: AppDispatch,
  options: Record<string, string>
) => {
  const { email, password } = options;
  const response = JSON.parse(
    await choiceServer({
      path: "http://domain/api/user",
      method: "GET",
      body: { email, password },
    })
  );
  if (response.status === 200) {
    dispatch(user(response.data));
    dispatch(
      showMessage({
        msgText: `Hello ${response.data.name}`,
        msgType: "success",
      })
    );
  }
  if (response.status === 500) {
    dispatch(
      showMessage({
        msgText: `What is wrong`,
        msgType: "error",
      })
    );
  }
};

export const setUser = async (
  dispatch: AppDispatch,
  options: Record<string, string>
) => {
  const { name, email, password } = options;
  const response = JSON.parse(
    await choiceServer({
      path: "http://domain/api/user",
      method: "POST",
      body: { name, email, password },
    })
  );
  if (response.status === 200) {
    getAllUsers(dispatch);
    dispatch(
      showMessage({
        msgText: `User ${response.data.name} to be created`,
        msgType: "success",
      })
    );
  }
  if (response.status === 500) {
    dispatch(
      showMessage({
        msgText: `User is not created`,
        msgType: "error",
      })
    );
  }
};

export const deleteUser = async (
  dispatch: AppDispatch,
  options: Record<string, string>
) => {
  const { name, email } = options;
  const response = JSON.parse(
    await choiceServer({
      path: "http://domain/api/user",
      method: "DELETE",
      body: { name, email },
    })
  );

  if (response.status === 200) {
    getAllUsers(dispatch);
    dispatch(
      showMessage({
        msgText: `User ${response.data.name} with ${response.data.email} is deleted`,
        msgType: "success",
      })
    );
  }
  if (response.status === 500) {
    dispatch(
      showMessage({
        msgText: `User is not deleted`,
        msgType: "error",
      })
    );
  }
};

export const getAllUsers = async (dispatch: AppDispatch) => {
  const response = JSON.parse(
    await choiceServer({
      path: "http://domain/api/users",
      method: "POST",
    })
  );
  if (response.status === 200) {
    dispatch(allUsers(response.data));
  }
  if (response.status === 500) {
    dispatch(allUsers(response.data));
    dispatch(
      showMessage({
        msgText: `Users is not found`,
        msgType: "error",
      })
    );
  }
};
