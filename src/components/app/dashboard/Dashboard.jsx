import { Text } from "react-native";
// import withTranslations from "../../../utils/HighOrderComponent";

const Dashboard = (props) => {
  const { t } = props || {};

  return (
    <Fragment>
      <Text>Dashboard</Text>
    </Fragment>
  );
};

// export default withTranslations(Dashboard);
export default Dashboard;
