import { useRouter } from 'next/router';

function WatchVideoPage() {
  const { query } = useRouter();

  return (
    <>
      <video
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
        controls
        autoPlay
        width='800px'
        height='auto'
        id='video-player'
      />
    </>
  );
}

export default WatchVideoPage;
