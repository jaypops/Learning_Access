// src/components/FriendsList.js
"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, MoreHorizontal, User } from "lucide-react";
import { useApp } from "../context/AppContext";

interface FriendsListProps {
  activeTab: "all" | "online" | "pending";
  searchQuery: string;
}

export function FriendsList({ activeTab, searchQuery }: FriendsListProps) {
  const { friends, setSelectedUserId, setCurrentView } = useApp();

  const handleViewProfile = (friendId: string) => {
    setSelectedUserId(friendId);
    setCurrentView("profile");
  };

  // Filter friends (DMs) based on search query
  const filteredFriends = friends.filter((friend) => {
    const matchesSearch =
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (friend.lastText && friend.lastText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="space-y-2">
      {/* DM List */}
      {filteredFriends.length > 0 ? (
        filteredFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-2 rounded hover:bg-gray-700/50 group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                {friend.avatar ? (
                  <img
                    src={friend.avatar}
                    alt={friend.username}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-[#5865F2] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {friend.username.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Status indicator (gray for offline, green for active) */}
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    friend.unread > 0 ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-white truncate">
                  {friend.username}
                  {friend.unread > 0 && (
                    <span className="ml-2 bg-red-500 text-xs rounded-full px-2 py-0.5">
                      {friend.unread}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 truncate">{friend.lastText || "No messages yet"}</div>
                <div className="text-xs text-gray-500">{friend.lastMessage || "Never"}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-gray-400 hover:text-white"
                onClick={() => handleViewProfile(friend.id)}
              >
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No messages found</div>
          {searchQuery && <div className="text-sm text-gray-500">Try adjusting your search terms</div>}
        </div>
      )}
    </div>
  );
}