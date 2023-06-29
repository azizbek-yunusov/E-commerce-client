import OverView from "./OverView";
import MyOrders from "./MyOrders";
import Addresses from "./Addresses";
import Favorites from "./Favorites";
import EditProfile from "./EditProfile";

const ActiveTab = ({ activeTab }) => {
  return (
    <div>
      {activeTab === 0 && <OverView />}
      {activeTab === 1 && <MyOrders />}
      {activeTab === 2 && <Addresses />}
      {activeTab === 3 && <Favorites />}
      {activeTab === 4 && <EditProfile />}
    </div>
  );
};

export default ActiveTab;
