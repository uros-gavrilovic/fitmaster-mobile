import { useState } from "react";
import { Appbar, Avatar, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomConfirmDialog from "../modals/CustomConfirmDialog";
import * as userActions from "../../../actions/user";

export default function CustomAppBar() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleLogOut = () => {
    dispatch(userActions.logout());
  };

  return (
    <Appbar.Header>
      <CustomConfirmDialog
        icon={"logout"}
        title={"Sign Out"}
        message={"Are you sure you want to sign out of your account?"}
        yesAction={handleLogOut}
        open={openModal}
        setOpen={setOpenModal}
      />
      <Appbar.Content title="FitMaster" />
      <Avatar.Text
        size={24}
        label={user?.firstName[0] + user?.lastName[0]}
        onTouchEnd={() => {
          setOpenModal(true);
        }}
      />
      {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
    </Appbar.Header>
  );
}
