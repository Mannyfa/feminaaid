import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';      // Your main website file
import BlogPost from './BlogPost'; // The new single post file
import LearnMore from './LearnMore';
import GalleryPage from './GalleryPage';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;