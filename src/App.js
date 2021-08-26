import './App.css';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import { Pages } from './components/Pages';
import GetAsset from './views/GetAsset';
import GetAssets from './views/GetAssets';
import CreateBuyOrder from './views/CreateBuyOrder'
import VerifyOwnership from './views/VerifyOwnership';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function App() {
  return (
    <div className="App">
        <Pages content={[
          {title: "Get Asset", icon: <DescriptionIcon />, body: <GetAsset />},
          {title: "Get Assets", icon: <SearchIcon />, body: <GetAssets />},
          {title: "Verify Ownership", icon: <VerifiedUserIcon />, body: <VerifyOwnership />},
          {title: "Create Buy Order", icon: <ShoppingCartIcon />, body: <CreateBuyOrder />},
        ]}/>
    </div>
  );
}

export default App;
