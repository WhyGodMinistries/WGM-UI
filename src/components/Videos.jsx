import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './../styles/YouTubeFeed.css';

const YouTubeFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  //const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const API_KEY = 'AIzaSyDOXU53I6ldwOCoslVWKNYYuQ3Ba_4Z3oc';
  const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

  // Helper: Convert ISO 8601 duration to seconds
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
        // Step 1: Get latest video IDs
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=50`
        );

        if (searchRes.status === 403) {
          console.warn("API key quota exceeded or restricted.");
          setFailed(true);
          return;
        }

        const searchData = await searchRes.json();
        const videoIds = searchData.items.map(item => item.id.videoId).join(',');

        // Step 2: Get video durations
        const detailsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails&id=${videoIds}`
        );
        const detailsData = await detailsRes.json();

        const filtered = detailsData.items?.filter(item => {
          const duration = item.contentDetails.duration;
          const durationInSeconds = parseDurationToSeconds(duration);
          return durationInSeconds >= 180;
        }) || [];

        setVideos(filtered);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [API_KEY, CHANNEL_ID]);

  if (loading) return <p>Loading videos...</p>;

  if (failed) {
    return (
      <section className="youtube-feed-container" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Our website is experiencing server difficulties.</h2>
        <p>Please enjoy our content directly on our YouTube page:</p>
        <a
          href="https://www.youtube.com/@whygodministries"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 'bold', color: '#cc0000' }}
        >
          youtube.com/@whygodministries
        </a>
      </section>
    );
  }

  return (
    <main>
      <section className="youtube-feed-container">
        <h2 id="title">Latest YouTube Videos</h2>
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
                />
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
