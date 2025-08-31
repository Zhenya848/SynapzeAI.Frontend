import { Card, CardMedia } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export const OptimizedVideoPlayer = ({ videoSrc, height = 400, maxWidth = 1400 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
    rootMargin: '50px'
  });

  const manageVideoPlayback = useCallback(async () => {
    try {
      const video = videoRef.current;

      if (!video) 
        return;

      if (inView) {
        if (video.readyState < 2) {
          video.addEventListener('loadeddata', async () => {
            if (inView && videoRef.current) {
              await videoRef.current.play();
            }
          }, { once: true });
        } 
        else {
          await video.play();
        }
      } 
      else {
        video.pause();
      }
    } 
    catch (error) {
      console.log('Video playback error:', error);
    }
  }, [inView]);

  useEffect(() => {
    manageVideoPlayback();
  }, [manageVideoPlayback]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <div ref={inViewRef}>
      <Card sx={{
        maxWidth: {maxWidth},
        width: "100%", 
        borderRadius: 4
      }}>
        <CardMedia 
          ref={videoRef}
          component="video" 
          height={height} 
          src={videoSrc}
          muted
          playsInline
          loop
          preload="metadata"
        />
      </Card>
    </div>
  );
};