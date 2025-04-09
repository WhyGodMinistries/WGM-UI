// YouTubeFeed.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './../styles/YouTubeFeed.css';

const YouTubeFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

  // Helper function to convert ISO 8601 duration to seconds
  const parseDurationToSeconds = (isoDuration) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const [, hours, minutes, seconds] = isoDuration.match(regex) || [];
    return (
      (parseInt(hours || 0) * 3600) +
      (parseInt(minutes || 0) * 60) +
      (parseInt(seconds || 0))
    );
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Step 1: Use 'search' to get video IDs
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=50`
        );
        const searchData = await searchResponse.json();
        const videoIds = searchData.items.map(item => item.id.videoId).join(',');

        // Step 2: Use 'videos' to get contentDetails (for duration)
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails&id=${videoIds}`
        );
        const detailsData = await detailsResponse.json();

        const filtered = detailsData.items?.filter(item => {
          const duration = item.contentDetails.duration;
          const durationInSeconds = parseDurationToSeconds(duration);
          return durationInSeconds >= 180; // Only videos 3 minutes or longer
        }) || [];

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
    <main>
      <section className="youtube-feed-container">
        <h2 id='title'>Latest YouTube Videos</h2>
        <div className="youtube-grid">
          {videos.map((video, index) => (
            <article key={video.id} className="youtube-video-wrapper">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <iframe
                  className="youtube-iframe"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="video-title">{video.snippet.title}</p>
              </motion.div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default YouTubeFeed;
