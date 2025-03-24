

export const formatFileSize = (sizeInBytes:number) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };
  

//1byte= 8bits
//1kb = 1024 byte
//1mb //1024 kb
//1gb 1024mb


//file types
export const acceptedFileTypes = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg", ".tiff"],
  documents: [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".csv"],
  audio: [".mp3", ".wav", ".aac", ".ogg", ".flac", ".wma"],
  video: [".mp4", ".avi", ".mov", ".wmv", ".mkv", ".flv", ".webm"],
  archives: [".zip", ".rar", ".7z", ".tar", ".gz"],
  code: [".html", ".css", ".js", ".jsx", ".tsx", ".ts", ".json", ".xml", ".py", ".java", ".cpp"],
  misc: [".psd", ".ai", ".sketch"]
};

