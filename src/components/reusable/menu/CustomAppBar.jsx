import { useState } from "react";
import { Appbar, Avatar, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomConfirmDialog from "../modals/CustomConfirmDialog";
import * as userActions from "../../../actions/user";
import { AppBar } from "@react-native-material/core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

export default function CustomAppBar() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleLogOut = () => {
    dispatch(userActions.logout());
  };

  return (
    <Appbar.Header
      style={{
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <CustomConfirmDialog
        icon={"logout"}
        title={"Sign Out"}
        message={"Are you sure you want to sign out of your account?"}
        yesAction={handleLogOut}
        open={openModal}
        setOpen={setOpenModal}
      />
      <FontAwesomeIcon
        icon={faDumbbell}
        size={20}
        rotation={45}
        style={{ marginRight: 10, transform: [{ rotate: "45deg" }] }}
      />
      <Appbar.Content title="FitMaster" />
      <Avatar.Text
        size={24}
        label={user?.firstName[0] + user?.lastName[0]}
        onTouchEnd={() => {
          setOpenModal(true);
        }}
      />
    </Appbar.Header>
  );
}
