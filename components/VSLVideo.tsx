import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react-native';
import { useVSL } from '@/contexts/VSLContext';

const { width, height } = Dimensions.get('window');

interface VSLVideoProps {
  videoUrl?: string;
  onVideoProgress?: (progress: number) => void;
  onVideoComplete?: () => void;
}

export default function VSLVideo({
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder Rick Roll
  onVideoProgress,
  onVideoComplete,
}: VSLVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const webViewRef = useRef<WebView>(null);
  const { trackVideoProgress } = useVSL();

  const handleVideoProgress = (newProgress: number) => {
    setProgress(newProgress);
    onVideoProgress?.(newProgress);
    trackVideoProgress(newProgress);
  };

  const togglePlayPause = () => {
    const command = isPlaying ? 'pause' : 'play';
    webViewRef.current?.postMessage(JSON.stringify({ command }));
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const command = isMuted ? 'unmute' : 'mute';
    webViewRef.current?.postMessage(JSON.stringify({ command }));
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.type === 'progress') {
        handleVideoProgress(data.progress);
      } else if (data.type === 'ended') {
        onVideoComplete?.();
        setIsPlaying(false);
      } else if (data.type === 'playing') {
        setIsPlaying(true);
      } else if (data.type === 'paused') {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  const videoHeight = isFullscreen ? height : width * 0.56; // 16:9 aspect ratio

  const webViewHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #000;
          overflow: hidden;
        }
        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .overlay:hover {
          opacity: 1;
        }
        .play-button {
          width: 80px;
          height: 80px;
          background: rgba(139, 92, 246, 0.9);
          border-radius: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .play-button:hover {
          transform: scale(1.1);
        }
        .play-icon {
          width: 0;
          height: 0;
          border-left: 25px solid white;
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
          margin-left: 5px;
        }
      </style>
    </head>
    <body>
      <div class="video-container">
        <iframe 
          src="${videoUrl}?autoplay=0&controls=1&rel=0&modestbranding=1&showinfo=0"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
        <div class="overlay">
          <div class="play-button" onclick="togglePlay()">
            <div class="play-icon"></div>
          </div>
        </div>
      </div>
      
      <script>
        let isPlaying = false;
        let progressInterval;
        
        function togglePlay() {
          const iframe = document.querySelector('iframe');
          if (iframe) {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo"}', '*');
            isPlaying = true;
            startProgressTracking();
          }
        }
        
        function startProgressTracking() {
          progressInterval = setInterval(() => {
            const iframe = document.querySelector('iframe');
            if (iframe && isPlaying) {
              try {
                iframe.contentWindow.postMessage('{"event":"command","func":"getCurrentTime"}', '*');
              } catch (e) {
                // Handle error silently
              }
            }
          }, 1000);
        }
        
        function stopProgressTracking() {
          if (progressInterval) {
            clearInterval(progressInterval);
          }
        }
        
        window.addEventListener('message', function(event) {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'progress') {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'progress',
                progress: data.progress
              }));
            }
          } catch (e) {
            // Handle error silently
          }
        });
        
        // Listen for messages from React Native
        document.addEventListener('message', function(event) {
          try {
            const data = JSON.parse(event.data);
            if (data.command === 'pause') {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo"}', '*');
                isPlaying = false;
                stopProgressTracking();
              }
            } else if (data.command === 'play') {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo"}', '*');
                isPlaying = true;
                startProgressTracking();
              }
            }
          } catch (e) {
            // Handle error silently
          }
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={[styles.container, { height: videoHeight }]}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text style={styles.loadingText}>Carregando vídeo...</Text>
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ html: webViewHTML }}
        style={styles.webview}
        onMessage={handleWebViewMessage}
        onLoadEnd={() => setIsLoading(false)}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      {/* Custom Controls Overlay */}
      <View style={styles.controlsOverlay}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={togglePlayPause}
          >
            {isPlaying ? (
              <Pause size={24} color="white" />
            ) : (
              <Play size={24} color="white" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={toggleMute}>
            {isMuted ? (
              <VolumeX size={24} color="white" />
            ) : (
              <Volume2 size={24} color="white" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleFullscreen}
          >
            <Maximize size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Video Title Overlay */}
      <View style={styles.titleOverlay}>
        <Text style={styles.videoTitle}>
          Como Transformar Seu Filho em um Jovem Investidor Consciente
        </Text>
        <Text style={styles.videoDuration}>5:23</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  loadingText: {
    color: 'white',
    marginTop: 12,
    fontSize: 16,
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    zIndex: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  titleOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 8,
    zIndex: 2,
  },
  videoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoDuration: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
});
