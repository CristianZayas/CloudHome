
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import FormUploader from './Components/FormUploader/FormUploader';
import ViewsContent from './Components/ViewContent/ViewsContent';
function App() {
  return (
    <div className="App">
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="uploader" element={<FormUploader />} />
        <Route path="viewsContent" element={<ViewsContent />} />
      </Routes>
    </div>
  );
}

export default App;
