import { useState } from 'react';
import usePromiseTracker from '../hooks/usePromiseTracker';


const FileUploadStatus = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [promises, setPromises] = useState<Promise<string>[]>([]);
  console.log(files);

interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
}


const handleFileChange = (event: FileUploadEvent): void => {
    const selectedFiles: File[] = Array.from(event.target.files || []);
    setFiles(selectedFiles);

    const uploadPromises: Promise<string>[] = selectedFiles.map((file: File) => {
        return new Promise((resolve) => {
            // Simulate file upload with a timeout
            const uploadTime = Math.random() * 5000;
            setTimeout(() => {
                resolve(`Uploaded ${file.name}`);
            }, uploadTime);
        });
    });

    setPromises(uploadPromises);
};

  const { progress, results, error } = usePromiseTracker(promises);

  return (
    <div>
      <h1>File Upload Tracker</h1>
      <input type="file" onChange={handleFileChange} />
      <p>Progress: {progress.toFixed(2)}%</p>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {results.map((result: unknown, index) => (
          <li key={index}>{result as string}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploadStatus;
