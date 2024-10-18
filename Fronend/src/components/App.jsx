import React, { useState, useEffect } from 'react';

const Nexxus = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [trends, setTrends] = useState([]);
  const [whoToFollow, setWhoToFollow] = useState([]);
  const [newTweet, setNewTweet] = useState('');

  useEffect(() => {
    // Simulate fetching user data
    fetchUserData();
    // Simulate fetching tweets
    fetchTweets();
    // Simulate fetching trends
    fetchTrends();
    // Simulate fetching who to follow
    fetchWhoToFollow();
  }, []);

  const fetchUserData = () => {
    // Simulate API call
    setTimeout(() => {
      setCurrentUser({
        name: 'Bradley Ortiz',
        handle: '@bradley_',
        avatar: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg'
      });
    }, 1000);
  };

  const fetchTweets = () => {
    // Simulate API call
    setTimeout(() => {
      setTweets([
        {
          id: 1,
          user: 'CNN',
          handle: '@CNN',
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
          handle: '@nytimes',
          time: '2h',
          content: 'Gardening boomed during the pandemic: Six Black writers share how it has helped them re-establish, and reimagine, a connection to cultivation and the land',
          comments: 19,
          retweets: 48,
          likes: 482,
          image: 'data:image/jpeg;base64,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',
          avatar: 'https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png',
          verified: true
        },
        {
          id: 3,
          user: 'NEXXUS',
          handle: '@Nexxus',
          time: 'Oct 29',
          content: 'BIG NEWS lol jk still Twitter',
          comments: '6.8K',
          retweets: '36.6K',
          likes: '267.1K',
          avatar: 'https://pbs.twimg.com/profile_images/1488548719062654976/u6qfBBkF_400x400.jpg',
          verified: true
        },
        {
          id: 4,
          user: 'NEXXUS',
          handle: '@Nexxus',
          time: 'Oct 29',
          content: 'BIG NEWS lol jk still Twitter',
          comments: '6.8K',
          retweets: '36.6K',
          likes: '267.1K',
          avatar: 'https://pbs.twimg.com/profile_images/1488548719062654976/u6qfBBkF_400x400.jpg',
          verified: true
        },
        {
          id: 5,
          user: 'The New York Times',
          handle: '@nytimes',
          time: '2h',
          content: 'Gardening boomed during the pandemic: Six Black writers share how it has helped them re-establish, and reimagine, a connection to cultivation and the land',
          comments: 19,
          retweets: 48,
          likes: 482,
          image: 'data:image/jpeg;base64,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',
          avatar: 'https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png',
          verified: true
        },
        {
          id: 6,
          user: 'CNN',
          handle: '@CNN',
          time: '7m',
          content: 'President Joe Biden touted a new agreement reached with the European Union to ease Trump-era tariffs on aluminum and steel as a "major breakthrough" that would serve to both strengthen the US steel industry and combat the global climate crisis.',
          comments: 57,
          retweets: 144,
          likes: 184,
          avatar: 'https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED_400x400.png',
          verified: true
        },
      ]);
    }, 1000);
  };

  const fetchTrends = () => {
    // Simulate API call
    setTimeout(() => {
      setTrends([
        { id: 1, location: 'Trending in Turkey', hashtag: '#SQUID', tweets: '2,066' },
        { id: 2, location: 'Trending in USA', hashtag: '#React', tweets: '5,230' },
        { id: 3, location: 'Trending Worldwide', hashtag: '#ClimateAction', tweets: '10,500' },
        { id: 4, location: 'Trending in Tech', hashtag: '#AI', tweets: '8,765' },
      ]);
    }, 1000);
  };

  const fetchWhoToFollow = () => {
    // Simulate API call
    setTimeout(() => {
      setWhoToFollow([
        { id: 1, name: 'The New York Times', handle: '@nytimes', avatar: 'https://pbs.twimg.com/profile_images/1098244578472280064/gjkVMelR_400x400.png', verified: true },
        { id: 2, name: 'CNN', handle: '@CNN', avatar: 'https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED_400x400.png', verified: true },
        { id: 3, name: 'NEXXUS', handle: '@Nexxus', avatar: 'https://pbs.twimg.com/profile_images/1488548719062654976/u6qfBBkF_400x400.jpg', verified: true },
      ]);
    }, 1000);
  };

  const handleNewTweet = (e) => {
    setNewTweet(e.target.value);
  };

  const submitTweet = () => {
    if (newTweet.trim() !== '') {
      const newTweetObj = {
        id: tweets.length + 1,
        user: currentUser.name,
        handle: currentUser.handle,
        time: 'Just now',
        content: newTweet,
        comments: 0,
        retweets: 0,
        likes: 0,
        avatar: currentUser.avatar,
        verified: true
      };
      setTweets([newTweetObj, ...tweets]);
      setNewTweet('');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#000', color: '#E7E9EA', fontFamily: 'Arial, sans-serif', fontSize: '15px' }}>
      <style>{`
        body { margin: 0; padding: 0; background-color: #000; }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
      `}</style>
      
      <div style={{ display: 'flex', width: '1200px' }}>
        {/* Left Sidebar */}
        <div style={{ width: '275px', padding: '0 12px' }}>
          <h1 style={{ color: '#fff', fontSize: '30px', fontWeight: 'bold', margin: '16px 0' }}>NEXXUS<span style={{ color: '#1D9BF0' }}>°</span></h1>
          <div style={{ backgroundColor: '#202327', borderRadius: '9999px', padding: '10px 15px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>🔍</span>
            <input type="text" placeholder="Search Nexxus" style={{ backgroundColor: 'transparent', border: 'none', color: '#71767B', width: '100%' }} />
          </div>
          <div style={{ backgroundColor: '#16181C', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Trends for you</h2>
              <span>⚙️</span>
            </div>
            {trends.map(trend => (
              <div key={trend.id} style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#71767B' }}>{trend.location}</div>
                <div style={{ fontWeight: 'bold' }}>{trend.hashtag}</div>
                <div style={{ fontSize: '13px', color: '#71767B' }}>{trend.tweets} Echo</div>
              </div>
            ))}
            <a href="#" style={{ color: '#1D9BF0', textDecoration: 'none' }}>Show more</a>
          </div>
          <div style={{ backgroundColor: '#16181C', borderRadius: '16px', padding: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Who to follow</h2>
            {whoToFollow.map(user => (
              <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <img src={user.avatar} alt={user.name} style={{ width: '48px', height: '48px', borderRadius: '50%', marginRight: '12px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold' }}>
                    {user.name}
                    {user.verified && <span style={{ color: '#1D9BF0', marginLeft: '4px' }}>✓</span>}
                  </div>
                  <div style={{ color: '#71767B' }}>{user.handle}</div>
                </div>
                <button style={{ backgroundColor: '#EFF3F4', color: '#0F1419', border: 'none', borderRadius: '9999px', padding: '6px 16px', fontWeight: 'bold' }}>Follow</button>
              </div>
            ))}
            <a href="#" style={{ color: '#1D9BF0', textDecoration: 'none' }}>Show more</a>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ width: '600px', borderLeft: '1px solid #2F3336', borderRight: '1px solid #2F3336' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #2F3336', position: 'sticky', top: 0, backgroundColor: '#000', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Home</h2>
            <span>✨</span>
          </div>
          <div style={{ padding: '16px', borderBottom: '1px solid #2F3336' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              {currentUser && <img src={currentUser.avatar} alt="User" style={{ width: '48px', height: '48px', borderRadius: '50%', marginRight: '12px' }} />}
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="What's happening?"
                  value={newTweet}
                  onChange={handleNewTweet}
                  style={{ backgroundColor: 'transparent', border: 'none', color: '#E7E9EA', fontSize: '20px', width: '100%', marginBottom: '12px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    {['🖼️', '📊', '😀', '📅', '📍'].map((icon, index) => (
                      <button key={index} style={{ backgroundColor: 'transparent', border: 'none', color: '#1D9BF0', fontSize: '18px', marginRight: '8px' }}>{icon}</button>
                    ))}
                  </div>
                  <button onClick={submitTweet} style={{ backgroundColor: '#1D9BF0', color: 'white', border: 'none', borderRadius: '9999px', padding: '8px 16px', fontWeight: 'bold' }}>Tweet</button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 53px)' }}>
            {tweets.map(tweet => (
              <div key={tweet.id} style={{ padding: '16px', borderBottom: '1px solid #2F3336' }}>
                <div style={{ display: 'flex', marginBottom: '12px' }}>
                  <img src={tweet.avatar} alt={tweet.user} style={{ width: '48px', height: '48px', borderRadius: '50%', marginRight: '12px' }} />
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{tweet.user}</span>
                    {tweet.verified && <span style={{ color: '#1D9BF0', marginLeft: '4px' }}>✓</span>}
                    <span style={{ color: '#71767B', marginLeft: '4px' }}>{tweet.handle} · {tweet.time}</span>
                  </div>
                </div>
                <p style={{ marginBottom: '12px' }}>{tweet.content}</p>
                {tweet.image && <img src={tweet.image} alt="Tweet image" style={{ width: '100%', borderRadius: '16px', marginBottom: '12px' }} />}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71767B' }}>
                  <span>💬 {tweet.comments}</span>
                  <span>🔁 {tweet.retweets}</span>
                  <span>❤️ {tweet.likes}</span>
                  <span>📤</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '350px', padding: '0 12px' }}>
          <div style={{ backgroundColor: '#16181C', borderRadius: '16px', padding: '16px', marginTop: '16px' }}>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '24px' }}><a href="#" style={{ color: '#E7E9EA', textDecoration: 'none', fontSize: '20px' }}>🏠 Home</a></li>
                <li style={{ marginBottom: '24px' }}><a href="#" style={{ color: '#E7E9EA', textDecoration: 'none', fontSize: '20px' }}># Explore</a></li>
                <li style={{ marginBottom: '24px' }}><a href="#" style={{ color: '#E7E9EA', textDecoration: 'none', fontSize: '20px' }}>🔔 Notifications</a></li>
                <li style={{ marginBottom: '24px' }}><a href="#" style={{ color: '#E7E9EA', textDecoration: 'none', fontSize: '20px' }}>✉️ Messages</a></li>
                <li style={{ marginBottom: '24px' }}><a href="#" style={{ color: '#E7E9EA', textDecoration: 'none', fontSize: '20px' }}>🔖 Bookmarks</a></li>
                <li style={{ marginBottom: '24px' }}><a href="#" style={{ color: '#E7E9EA', textDecoration: 'none', fontSize: '20px' }}>📃 Lists</a></li>
                <li style={{ marginBottom: '24px' }}><a  href="#" style={{ color: '#E7E9EA', textDecoration: 'none', fontSize: '20px' }}>👤 Profile</a></li>
                <li style={{ marginBottom: '24px' }}><a href="#" style={{ color: '#E7E9EA', textDecoration: 'none', fontSize: '20px' }}>⚙️ More</a></li>
              </ul>
            </nav>
            <button style={{ backgroundColor: '#1D9BF0', color: 'white', border: 'none', borderRadius: '9999px', padding: '12px 0', width: '100%', fontWeight: 'bold', fontSize: '17px' }}>Echo</button>
          </div>
        </div>
      </div>
      
      {/* Profile Tab */}
      {currentUser && (
        <div style={{
          position: 'fixed',
          bottom: '16px',
          right: 'calc(50% - 575px)',
          backgroundColor: '#16181C',
          borderRadius: '9999px',
          padding: '11.5px 47.5px',
          display: 'flex',
          alignItems: 'center',
          width: '220px',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', }}>
            <img src={currentUser.avatar} alt="Profile" style={{  width: '40px', height: '40px', borderRadius: '50%', marginRight: '9px', marginLeft:'-33px' }} />
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{currentUser.name}</div>
              <div style={{ color: '#71767B', fontSize: '15px' }}>{currentUser.handle}</div>
            </div>
          </div>
          <span style={{ fontSize: '20px',marginRight:'-10px', alignItems:'center', display:'flex' }}>...</span>
        </div>
      )}
    </div>
  );
};

export default Nexxus;