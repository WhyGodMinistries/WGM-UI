import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../media/logo.PNG';
import './../styles/YouTubeFeed.css';

const YouTubeFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const fetchAllLongFormVideos = async () => {
  try {
    setLoading(true);
    setFailed(false);

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;

    // Step 1: Get Uploads Playlist ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) throw new Error("Uploads playlist not found.");

    // Step 2: Fetch ALL playlist items
    let allVideos = [];
    let nextPageToken = '';
    do {
      const playlistRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet,contentDetails&maxResults=50&pageToken=${nextPageToken}`
      );
      const playlistData = await playlistRes.json();
      allVideos = [...allVideos, ...playlistData.items];
      nextPageToken = playlistData.nextPageToken;
    } while (nextPageToken);

    // Step 3: Get durations for all video IDs (in batches of 50)
    const allVideoIds = allVideos.map(item => item.contentDetails.videoId);
    const chunkedIds = [];
    for (let i = 0; i < allVideoIds.length; i += 50) {
      chunkedIds.push(allVideoIds.slice(i, i + 50));
    }

    const parseDurationToSeconds = (isoDuration) => {
      const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
      const [, hours, minutes, seconds] = isoDuration.match(regex) || [];
      return (
        (parseInt(hours || 0) * 3600) +
        (parseInt(minutes || 0) * 60) +
        (parseInt(seconds || 0))
      );
    };

      let allDetails = [];
      for (const idChunk of chunkedIds) {
        const ids = idChunk.join(",");
        const detailsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${ids}&part=snippet,contentDetails`
        );
        const detailsData = await detailsRes.json();
        allDetails.push(...detailsData.items);
      }

      // Step 4: Filter out videos < 180 seconds
      const filtered = allDetails.filter(item => {
        const duration = item.contentDetails.duration;
        return parseDurationToSeconds(duration) >= 180;
      });

      setVideos(filtered);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLongFormVideos();
  }, []);

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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <p className="video-title">
                  <img src={logo} className="vid-logo" alt="logo" /> 
                  <span>{video.snippet.title}</span>
                </p>
              </motion.div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default YouTubeFeed;
