import './Dashboard.css'
import MainDash from '../../component/MainDash/MainDash';

import Sidebar from '../../component/Slidebar/Slidebar';

function Dashboard() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
      
      </div>
    </div>
  );
}

export default Dashboard;