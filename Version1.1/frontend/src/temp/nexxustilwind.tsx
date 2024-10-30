'use client'

import React, { useState, useEffect } from 'react'
import { Search, Settings, Star, Home, Hash, Bell, Mail, Bookmark, FileText, User, MoreHorizontal, MessageCircle, Repeat, Heart, Share2 } from 'lucide-react'

interface Tweet {
    id: number
    user: string
    username: string
    time: string
    content: string
    comments: number | string
    retweets: number | string
    likes: number | string
    image?: string
    avatar: string
    verified: boolean
}

interface Trend {
    id: number
    location: string
    hashtag: string
    tweets: string
}

interface User {
    id: number
    name: string
    username: string
    avatar: string
    verified: boolean
}

interface CurrentUser {
    name: string
    username: string
    avatar: string
}

export default function Component() {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
    const [tweets, setTweets] = useState<Tweet[]>([])
    const [trends, setTrends] = useState<Trend[]>([])
    const [whoToFollow, setWhoToFollow] = useState<User[]>([])
    const [newTweet, setNewTweet] = useState('')

    useEffect(() => {
        fetchUserData()
        fetchTweets()
        fetchTrends()
        fetchWhoToFollow()
    }, [])

    const fetchUserData = () => {
        setTimeout(() => {
            setCurrentUser({
                name: 'Bradley Ortiz',
                username: '@bradley_',
                avatar: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg'
            })
        }, 1000)
    }

    const fetchTweets = () => {
        setTimeout(() => {
            setTweets([
                {
                    id: 1,
                    user: 'CNN',
                    username: '@CNN',
                    time: '7m',
                    content: 'President Joe Biden touted a new agreement reached with the European Union to ease Trump-era tariffs on aluminum and steel as a "major breakthrough" that would serve to both strengthen the US steel industry and combat the global climate crisis.',
                    comments: 57,
                    retweets: 144,
                    likes: 184,
                    avatar: 'https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED_400x400.png',
                    verified: true
                },
                {
                    id: 2,
                    user: 'The New York Times',
                    username: '@nytimes',
                    time: '2h',
                    content: 'Gardening boomed during the pandemic: Six Black writers share how it has helped them re-establish, and reimagine, a connection to cultivation and the land',
                    comments: 19,
                    retweets: 48,
                    likes: 482,
                    image: 'https://pbs.twimg.com/media/FKPv7YBVQAA-2Dw?format=jpg&name=small',
                    avatar: 'https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png',
                    verified: true
                },
                {
                    id: 3,
                    user: 'NEXXUS',
                    username: '@Nexxus',
                    time: 'Oct 29',
                    content: 'BIG NEWS lol jk still Twitter',
                    comments: '6.8K',
                    retweets: '36.6K',
                    likes: '267.1K',
                    avatar: 'https://pbs.twimg.com/profile_images/1488548719062654976/u6qfBBkF_400x400.jpg',
                    verified: true
                },
            ])
        }, 1000)
    }

    const fetchTrends = () => {
        setTimeout(() => {
            setTrends([
                { id: 1, location: 'Trending in Turkey', hashtag: '#SQUID', tweets: '2,066' },
                { id: 2, location: 'Trending in USA', hashtag: '#React', tweets: '5,230' },
                { id: 3, location: 'Trending Worldwide', hashtag: '#ClimateAction', tweets: '10,500' },
                { id: 4, location: 'Trending in Tech', hashtag: '#AI', tweets: '8,765' },
            ])
        }, 1000)
    }

    const fetchWhoToFollow = () => {
        setTimeout(() => {
            setWhoToFollow([
                { id: 1, name: 'The New York Times', username: '@nytimes', avatar: 'https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png', verified: true },
                { id: 2, name: 'CNN', username: '@CNN', avatar: 'https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED_400x400.png', verified: true },
                { id: 3, name: 'NEXXUS', username: '@Nexxus', avatar: 'https://pbs.twimg.com/profile_images/1488548719062654976/u6qfBBkF_400x400.jpg', verified: true },
            ])
        }, 1000)
    }

    const handleNewTweet = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTweet(e.target.value)
    }

    const submitTweet = () => {
        if (newTweet.trim() !== '' && currentUser) {
            const newTweetObj = {
                id: tweets.length + 1,
                user: currentUser.name,
                username: currentUser.username,
                time: 'Just now',
                content: newTweet,
                comments: 0,
                retweets: 0,
                likes: 0,
                avatar: currentUser.avatar,
                verified: true
            }
            setTweets([newTweetObj, ...tweets])
            setNewTweet('')
        }
    }

    return (
        <div className="flex justify-center min-h-screen bg-black text-gray-200 font-sans text-sm">
            <div className="flex w-full max-w-7xl">
                {/* Left Sidebar */}
                <div className="w-64 p-4 flex flex-col h-screen sticky top-0">
                    <h1 className="text-white text-3xl font-bold mb-4">NEXXUS<span className="text-blue-400">°</span></h1>
                    <div className="bg-gray-800 rounded-full p-3 mb-4 flex items-center">
                        <Search className="mr-2 text-gray-500" />
                        <input type="text" placeholder="Search Nexxus" className="bg-transparent border-none text-gray-500 w-full focus:outline-none" />
                    </div>
                    <div className="bg-gray-900 rounded-2xl p-4 mb-4">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-bold">Trends for you</h2>
                            <Settings className="text-gray-500" />
                        </div>
                        {trends.map(trend => (
                            <div key={trend.id} className="mb-4">
                                <div className="text-xs text-gray-500">{trend.location}</div>
                                <div className="font-bold">{trend.hashtag}</div>
                                <div className="text-xs text-gray-500">{trend.tweets} Echo</div>
                            </div>
                        ))}
                        <a href="#" className="text-blue-400 hover:underline">Show more</a>
                    </div>
                    <div className="bg-gray-900 rounded-2xl p-4 mb-4">
                        <h2 className="text-xl font-bold mb-3">Who to follow</h2>
                        {whoToFollow.map(user => (
                            <div key={user.id} className="flex items-center mb-4">
                                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
                                <div className="flex-1">
                                    <div className="font-bold">
                                        {user.name}
                                        {user.verified && <span className="text-blue-400 ml-1">✓</span>}
                                    </div>
                                    <div className="text-gray-500">{user.username}</div>
                                </div>
                                <button className="bg-gray-200 text-black rounded-full px-4 py-1 font-bold">Follow</button>
                            </div>
                        ))}
                        <a href="#" className="text-blue-400 hover:underline">Show more</a>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 border-l border-r border-gray-800 min-h-screen">
                    <div className="sticky top-0 bg-black z-10 border-b border-gray-800 p-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Home</h2>
                        <Star className="text-gray-500" />
                    </div>
                    <div className="border-b border-gray-800 p-4">
                        <div className="flex">
                            {currentUser && <img src={currentUser.avatar} alt="User" className="w-12 h-12 rounded-full mr-3" />}
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="What's happening?"
                                    value={newTweet}
                                    onChange={handleNewTweet}
                                    className="bg-transparent border-none text-gray-200 text-xl w-full mb-3 focus:outline-none"
                                />
                                <div className="flex justify-between items-center">
                                    <div>
                                        {['🖼️', '📊', '😀', '📅', '📍'].map((icon, index) => (
                                            <button key={index} className="text-blue-400 text-lg mr-2">{icon}</button>
                                        ))}
                                    </div>
                                    <button onClick={submitTweet} className="bg-blue-400 text-white rounded-full px-4 py-2 font-bold">Tweet</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-y-auto">
                        {tweets.map(tweet => (
                            <div key={tweet.id} className="p-4 border-b border-gray-800">
                                <div className="flex mb-3">
                                    <img src={tweet.avatar} alt={tweet.user} className="w-12 h-12 rounded-full mr-3" />
                                    <div>
                                        <span className="font-bold">{tweet.user}</span>
                                        {tweet.verified && <span className="text-blue-400 ml-1">✓</span>}
                                        <span className="text-gray-500 ml-1">{tweet.username} · {tweet.time}</span>
                                    </div>
                                </div>
                                <p className="mb-3">{tweet.content}</p>
                                {tweet.image && <img src={tweet.image} alt="Tweet image" className="w-full rounded-2xl mb-3" />}
                                <div className="flex justify-between text-gray-500">
                                    <span><MessageCircle className="inline mr-2" />{tweet.comments}</span>
                                    <span><Repeat className="inline mr-2" />{tweet.retweets}</span>
                                    <span><Heart className="inline mr-2" />{tweet.likes}</span>
                                    <span><Share2 className="inline" /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-64 p-4 flex flex-col h-screen sticky top-0">
                    <div className="bg-gray-900 rounded-2xl p-4 mt-4">
                        <nav>
                            <ul className="space-y-6">
                                <li><a href="#" className="text-gray-200 text-xl flex items-center"><Home className="mr-4" /> Home</a></li>
                                <li><a href="#" className="text-gray-200 text-xl flex items-center"><Hash className="mr-4" /> Explore</a></li>
                                <li><a href="#" className="text-gray-200 text-xl flex items-center"><Bell className="mr-4" /> Notifications</a></li>
                                <li><a href="#" className="text-gray-200 text-xl flex items-center"><Mail className="mr-4" /> Messages</a></li>
                                <li><a href="#" className="text-gray-200 text-xl flex items-center"><Bookmark className="mr-4" /> Bookmarks</a></li>
                                <li><a href="#" className="text-gray-200 text-xl flex items-center"><FileText className="mr-4" /> Lists</a></li>
                                <li><a href="#" className="text-gray-200 text-xl flex items-center"><User className="mr-4" /> Profile</a></li>
                                <li><a href="#" className="text-gray-200 text-xl flex items-center"><MoreHorizontal className="mr-4" /> More</a></li>
                            </ul>
                        </nav>
                        <button className="bg-blue-400 text-white rounded-full py-3 w-full font-bold text-lg mt-6">Echo</button>
                    </div>
                </div>
            </div>

            {/* Profile Tab */}
            {currentUser && (
                <div className="fixed bottom-4 right-4 bg-gray-900 rounded-full p-3 flex items-center w-56 justify-between">
                    <div className="flex items-center">
                        <img src={currentUser.avatar} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                        <div>
                            <div className="font-bold">{currentUser.name}</div>
                            <div className="text-gray-500">{currentUser.username}</div>
                        </div>
                    </div>
                    <MoreHorizontal className="text-gray-500" />
                </div>
            )}
        </div>
    )
}