import './Dashboard.css'
import MainDash from '../../component/MainDash/MainDash';
import Sidebar from '../../component/Slidebar/Slidebar';

function Dashboard() {
  return (
    <div className="App">
      <div className="AppGlass">  
        <div className='Sidebar_div'>
          <div >  <Sidebar/></div>
        </div>
        <div className='MainDash_div'>  <MainDash/></div>
      </div>
    </div>
  );
}

export default Dashboard;