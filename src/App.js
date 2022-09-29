import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Label from './pages/label-tool/LabelTool'
import 'antd/dist/antd.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="label" element={<Label />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
