const NexxusInterface = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
    },
    content: {
      display: 'flex',
      width: '1200px',
      margin: '0 auto',
    },
    leftSidebar: {
      width: '275px',
      padding: '20px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    searchBar: {
      backgroundColor: '#202327',
      borderRadius: '20px',
      padding: '10px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
    },
    searchIcon: {
      marginRight: '10px',
    },
    searchInput: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#6E767D',
      fontSize: '14px',
      width: '100%',
    },
    trendingSection: {
      marginBottom: '20px',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    settingsIcon: {
      fontSize: '18px',
    },
    trendingTopic: {
      marginBottom: '15px',
    },
    trendingTopicHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      color: '#6E767D',
    },
    trendingTopicName: {
      fontSize: '15px',
      fontWeight: 'bold',
      margin: '5px 0',
    },
    trendingTopicCount: {
      fontSize: '13px',
      color: '#6E767D',
    },
    showMore: {
      color: '#1DA1F2',
      fontSize: '14px',
      cursor: 'pointer',
    },
    mainContent: {
      flex: 1,
      borderLeft: '1px solid #2F3336',
      borderRight: '1px solid #2F3336',
    },
    header: {
      padding: '15px 20px',
      borderBottom: '1px solid #2F3336',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    tweetBox: {
      display: 'flex',
      padding: '10px 20px',
      borderBottom: '1px solid #2F3336',
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      marginRight: '10px',
    },
    tweetInput: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: '18px',
      width: '100%',
      marginBottom: '10px',
    },
    tweetActions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tweetActionIcon: {
      marginRight: '15px',
      fontSize: '18px',
      color: '#1DA1F2',
    },
    tweetButton: {
      backgroundColor: '#1DA1F2',
      color: '#fff',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    tweet: {
      borderBottom: '1px solid #2F3336',
      padding: '10px 20px',
    },
    tweetHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px',
    },
    tweetAuthor: {
      fontWeight: 'bold',
      marginRight: '5px',
    },
    tweetUsername: {
      color: '#6E767D',
    },
    tweetContent: {
      marginBottom: '10px',
      lineHeight: '1.4',
    },
    tweetImage: {
      width: '100%',
      borderRadius: '15px',
      marginBottom: '10px',
    },
    rightSidebar: {
      width: '275px',
      padding: '20px',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      fontSize: '18px',
      cursor: 'pointer',
    },
    navIcon: {
      marginRight: '15px',
      fontSize: '20px',
    },
    echoButton: {
      backgroundColor: '#1DA1F2',
      color: '#fff',
      border: 'none',
      borderRadius: '25px',
      padding: '15px 0',
      fontSize: '16px',
      fontWeight: 'bold',
      width: '100%',
      marginTop: '20px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.leftSidebar}>
          <div style={styles.logo}>NEXXUS</div>
          <div style={styles.searchBar}>
            <span style={styles.searchIcon}>🔍</span>
            <input style={styles.searchInput} placeholder="Serach Nexxus" />
          </div>
          <div style={styles.trendingSection}>
            <div style={styles.sectionHeader}>
              <h2>Trends for you</h2>
              <span style={styles.settingsIcon}>⚙️</span>
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={styles.trendingTopic}>
                <div style={styles.trendingTopicHeader}>
                  <span>Trending in Turkey</span>
                  <span>...</span>
                </div>
                <div style={styles.trendingTopicName}>#SQUID</div>
                <div style={styles.trendingTopicCount}>2,066 Echo</div>
              </div>
            ))}
            <div style={styles.showMore}>Show more</div>
          </div>
        </div>
        <div style={styles.mainContent}>
          <header style={styles.header}>Home</header>
          <div style={styles.tweetBox}>
            <img src="/placeholder.svg?height=48&width=48" alt="User" style={styles.avatar} />
            <div style={{flex: 1}}>
              <input style={styles.tweetInput} placeholder="What's happening?" />
              <div style={styles.tweetActions}>
                <div>
                  {['🖼️', 'GIF', '📊', '😊', '📅'].map((icon, index) => (
                    <span key={index} style={styles.tweetActionIcon}>{icon}</span>
                  ))}
                </div>
                <button style={styles.tweetButton}>Tweet</button>
              </div>
            </div>
          </div>
          {[
            { author: 'CNN', username: '@CNN', time: '7m', content: 'President Joe Biden touted a new agreement reached with the European Union to ease Trump-era tariffs on aluminum and steel as a "major breakthrough" that would serve to both strengthen the US steel industry and combat the global climate crisis.' },
            { author: 'The New York Times', username: '@nytimes', time: '2h', content: 'Gardening boomed during the pandemic. Six Black writers share how it has helped them re-establish, and reimagine, a connection to cultivation and the land', image: true }
          ].map((tweet, index) => (
            <div key={index} style={styles.tweet}>
              <div style={styles.tweetHeader}>
                <img src="/placeholder.svg?height=48&width=48" alt={tweet.author} style={styles.avatar} />
                <span style={styles.tweetAuthor}>{tweet.author}</span>
                <span style={styles.tweetUsername}>{tweet.username} · {tweet.time}</span>
              </div>
              <p style={styles.tweetContent}>{tweet.content}</p>
              {tweet.image && <img src="/placeholder.svg?height=300&width=500" alt="Tweet image" style={styles.tweetImage} />}
            </div>
          ))}
        </div>
        <div style={styles.rightSidebar}>
          <nav>
            {['🏠 Home', '# Explore', '🔔 Notifications', '✉️ Messages', '🔖 Bookmarks', '📃 Lists', '👤 Profile', '⚙️ More'].map((item) => (
              <div key={item} style={styles.navItem}>
                <span style={styles.navIcon}>{item.split(' ')[0]}</span>
                {item.split(' ')[1]}
              </div>
            ))}
          </nav>
          <button style={styles.echoButton}>Echo</button>
        </div>
      </div>
    </div>
  );
};

export default NexxusInterface;