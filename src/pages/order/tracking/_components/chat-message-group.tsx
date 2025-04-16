import { Fragment } from "react";
import type { Message } from "@/features/order/types/chat.type";
import { ChatMessageBubble } from "./chat-message-bubble";

interface MessageGroupProps {
  messages: Message[];
}

export const ChatMessageGroup = ({ messages }: MessageGroupProps) => {
  if (!messages.length) return null;

  // Group messages by sender
  const messageGroups: Message[][] = [];
  let currentGroup: Message[] = [messages[0]];

  for (let i = 1; i < messages.length; i++) {
    const prevMessage = messages[i - 1];
    const currentMessage = messages[i];

    // Check if this message is from the same sender as the previous one
    if (prevMessage.is_sender === currentMessage.is_sender) {
      // Add to the current group
      currentGroup.push(currentMessage);
    } else {
      // Start a new group
      messageGroups.push([...currentGroup]);
      currentGroup = [currentMessage];
    }
  }

  // Add the last group
  messageGroups.push(currentGroup);

  return (
    <div className="space-y-2 py-1">
      {messageGroups.map((group, groupIndex) => (
        <Fragment key={`group-${groupIndex}`}>
          {group.map((message, index) => (
            <ChatMessageBubble
              key={`${message.timestamp}-${index}`}
              message={message}
              // Only show avatar for the last message in a group from the same sender
              showAvatar={index === group.length - 1}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};
