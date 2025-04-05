import { useState, useRef, useEffect } from "react";
import { Upload, Download } from "lucide-react";

// Add these random images to your public folder
const randomImages = [
  "/src/assets/1.jpg",
  "/src/assets/2.jpg",
  "/src/assets/3.jpeg",
  "/src/assets/4.jpeg",
  "/src/assets/8.jpeg",
  "/src/assets/9.jpeg",
  "/src/assets/10.jpeg",
  "/src/assets/11.jpeg",
  "/src/assets/12.jpeg",
  "/src/assets/13.jpeg",
  "/src/assets/14.jpeg",
  "/src/assets/15.jpg",


];
export default function FunnyImageEditor() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("Funny Text");
  const [textColor, setTextColor] = useState("#ffffff");
  const [position, setPosition] = useState({ x: 100, y: 50 });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const canvasRef = useRef(null);

  // 📌 Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Store the original uploaded image
        setUploadedImage(e.target.result);
        // Show the uploaded image
        setImage(e.target.result);
        // Start loading
        setIsLoading(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle the loading timer and random image swap
  useEffect(() => {
    let timer;
    
    if (isLoading && uploadedImage) {
      timer = setTimeout(() => {
        // Select random image from assets
        const randomIndex = Math.floor(Math.random() * randomImages.length);
        const randomImageUrl = randomImages[randomIndex];
        
        // Load the random image
        const randomImg = new Image();
        randomImg.crossOrigin = "Anonymous"; // To avoid CORS issues
        randomImg.onload = () => {
          setImage(randomImageUrl);
          setIsLoading(false);
        };
        randomImg.onerror = () => {
          console.error("Failed to load random image");
          setIsLoading(false);
        };
        randomImg.src = randomImageUrl;
      }, 5000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, uploadedImage]);

  // 📌 Draw Image + Text on Canvas
  useEffect(() => {
    console.log("Canvas Update Triggered");
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // To avoid CORS issues
      img.src = image;
      
      img.onload = () => {
        console.log("Image loaded");
        
        // Set canvas dimensions based on image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image
        ctx.drawImage(img, 0, 0);

        // Draw text
        ctx.font = "bold 40px Arial";
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        // ctx.fillText(text, canvas.width / 2, position.y);
      };
      
      img.onerror = () => {
        console.error("Failed to load image");
      };
    }
  }, [image, text, textColor, position]);

  // 📌 Download Image
  const downloadImage = () => {
    if (!canvasRef.current) return;
    
    try {
      const link = document.createElement("a");
      link.href = canvasRef.current.toDataURL("image/png");
      link.download = "funny-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading image:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl text-center border">
      <div className="p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Funny Image Creator 😆</h2>

        {/* 📌 Upload Image */}
        <label className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 block">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <Upload className="w-12 h-12 text-gray-500 mx-auto" />
          <p className="text-gray-600 mt-2">Click or Drag & Drop to Upload</p>
        </label>

        {/* 📌 User Controls */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 rounded"
            placeholder="Enter Funny Text"
          />
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-10" />
        </div>

        {/* 📌 Image Canvas with Centered Spinner Loader */}
        <div className="mt-4 border rounded-lg inline-block relative min-h-64 min-w-64">
          <canvas ref={canvasRef} className="rounded-lg shadow-md max-w-full" />
          
          {/* Centered Spinner Overlay */}
          {isLoading && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 rounded-lg z-10"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Spinner */}
              <div className="spinner">
                <style jsx>{`
                  .spinner {
                    width: 60px;
                    height: 60px;
                    border: 6px solid rgba(0, 0, 0, 0.1);
                    border-left-color: #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                  }
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
              <p className="font-medium mt-3 text-gray-800">Generating image...</p>
            </div>
          )}
        </div>

        {/* 📌 Buttons */}
        <div className="mt-4">
          <button 
            onClick={downloadImage} 
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mx-auto disabled:bg-gray-400"
            disabled={isLoading || !image}
          >
            <Download className="mr-2" /> Download
          </button>
        </div>
      </div>
    </div>
  );
}
