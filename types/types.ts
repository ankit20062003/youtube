// types.ts
export interface YouTubeVideo {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
  }
  
  export interface YouTubeResponse {
    items: YouTubeVideo[];
  }
  