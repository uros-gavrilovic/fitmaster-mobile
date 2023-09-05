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
      <Text variant="headlineLarge">{`${t?.fields?.welcome_back}, ${user?.firstName}!`}</Text>
      {memberships?.map((membership) => {
        const startsAt = `${formatDatev2(
          membership.startDate
        ).getDate()}. ${formatDatev2(membership.startDate).toLocaleString(
          "default",
          { month: "long" }
        )}`;
        const endsAt = `${formatDatev2(
          membership.endDate
        ).getDate()}. ${formatDatev2(membership.endDate).toLocaleString(
          "default",
          { month: "long" }
        )}`;

        return (
          <Card mode="contained" key={membership.membersipID}>
            <Card.Title
              title={membership.membershipPackage.name}
              subtitle={`${startsAt} - ${endsAt}`}
              left={(props) => <Avatar.Icon {...props} icon="ballot" />}
              right={() => getStatusComponent(membership.endDate, t)}
            />
          </Card>
        );
      })}
    </View>
  );
};

const getStatusComponent = (endDate, t) => {
  const currentDate = new Date();
  const endMembershipDate = new Date(formatDatev2(endDate));
  const timeDifference = endMembershipDate - currentDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference > 7) {
    return <GoodStatus>{t?.fields?.active}</GoodStatus>;
  } else if (daysDifference <= 7 && daysDifference >= 0) {
    return <OkayStatus>{t?.fields?.almost_expired}</OkayStatus>;
  } else {
    return <BadStatus>{t?.fields?.expired}</BadStatus>;
  }
};

export default withTranslations(Home);
