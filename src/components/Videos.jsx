// YouTubeFeed.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './../styles/YouTubeFeed.css';

const YouTubeFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`
        );
        const data = await response.json();
        console.log("YouTube API Response:", data);

        const filtered = data.items?.filter(item => item.id.kind === "youtube#video") || [];
        setVideos(filtered);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [API_KEY, CHANNEL_ID]);

  if (loading) return <p>Loading videos...</p>;

  return (
    <div className="youtube-feed-container">
      <h2 id='title'>Latest YouTube Videos</h2>
      <div className="youtube-grid">
        {videos.map((video, index) => (
          <motion.div
            key={video.id.videoId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="youtube-video-wrapper"
          >
            <iframe
              className="youtube-iframe"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeFeed;
