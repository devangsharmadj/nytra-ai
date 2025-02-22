import { useState } from 'react';
import { Button } from '../src/components/button';
import { Input } from '../src/components/input';
import { Card, CardContent } from '../src/components/card';

export default function NytraDashboard() {
  const [videoFile, setVideoFile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVideoFile(fileURL);
    }
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      setChatMessages([...chatMessages, { text: userMessage, sender: 'user' }]);
      setUserMessage('');
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-6 h-screen bg-gray-900 text-gray-200">
      {/* Video Player Section */}
      <Card className="col-span-8 bg-gray-800 p-4 rounded-xl shadow-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Video Player</h2>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            {videoFile ? (
              <video controls width="100%" height="400px" src={videoFile} />
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-700">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-6.518 3.759A1 1 0 017 14.06V9.94a1 1 0 011.234-.97l6.518 3.759a1 1 0 010 1.738z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-gray-400 ml-2">No video uploaded</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" id="video-upload" />
            <label htmlFor="video-upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Upload Video</label>
          </div>
        </CardContent>
      </Card>

      {/* Chat Section */}
      <Card className="col-span-4 bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Chat</h2>
          <div className="flex-1 overflow-y-auto h-64 border border-gray-700 p-2 rounded-md bg-gray-700">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-md">{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <Input
              type="text"
              placeholder="Type a message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="flex-1 mr-2 bg-gray-700 text-gray-200 border-gray-600"
            />
            <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white">Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}