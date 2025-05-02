import { ReactNode } from 'react';

const ChatMessage = ({ type, children }: { type: 'user' | 'system'; children: ReactNode }) => {
  return (
    <div className={`mb-2 p-2 rounded-lg ${type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
      <div className="text-sm">
        {type === 'system' && <span className="font-medium text-blue-600">System: </span>}
        {children}
      </div>
    </div>
  );
};

export default ChatMessage;