import { useEffect } from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import CustomAppBar from "../../reusable/menu/CustomAppBar";
import { useDispatch, useSelector } from "react-redux";
import withTranslations from "../../../utils/HighOrderComponent";
import * as membershipsActions from "../../../actions/memberships";
import { Card, Button } from "react-native-paper";
import {
  GoodStatus,
  OkayStatus,
  BadStatus,
} from "../../reusable/other/StatusBars";
import { planStatus } from "../../../constants/globals";
import { IconButton } from "react-native-paper";
import { formatDate, formatDatev2 } from "../../../utils/utilFunctions";

const Home = (props) => {
  const { t } = props || {};

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { memberships } = useSelector((state) => state.memberships);

  useEffect(() => {
    dispatch(membershipsActions.fetchMemberships(user.memberID));
  }, [dispatch]);

  return (
    <View>
      <CustomAppBar />
      <Text variant="headlineLarge">{`${t?.fields?.welcome_back}, ${user.firstName}!`}</Text>
      {memberships?.map((membership) => (
        <Card.Title
          title={membership.name}
          subtitle={`${formatDatev2(membership.startDate)} - ${formatDatev2(
            membership.endDate
          )}`}
          left={(props) => <Avatar.Icon {...props} icon="ballot" />}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
      ))}
    </View>
  );
};

// const statusComponentMap = (t) => ({
//   [planStatus.COMPLETED]: (
//     <GoodStatus>{t?.completed?.toUpperCase()}</GoodStatus>
//   ),
//   [planStatus.CANCELLED]: <BadStatus>{t?.cancelled?.toUpperCase()}</BadStatus>,
//   [planStatus.AWAITING]: (
//     <NeutralStatus>{t?.awaiting?.toUpperCase()}</NeutralStatus>
//   ),
//   [planStatus.EXPIRED]: <OkayStatus>{t?.expired?.toUpperCase()}</OkayStatus>,
// });

export default withTranslations(Home);
