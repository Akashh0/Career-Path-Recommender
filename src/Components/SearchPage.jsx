import React, { useEffect, useState } from 'react';
import './SearchPage.css';

export default function SearchPage() {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subredditResults, setSubredditResults] = useState([]);

  useEffect(() => {
    fetch("https://www.reddit.com/r/cscareerquestions/hot.json?limit=15")
      .then(res => res.json())
      .then(data => {
        const formatted = data.data.children.map(item => ({
          id: item.data.id,
          title: item.data.title,
          permalink: item.data.permalink,
        }));
        setTopics(formatted);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSubredditResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetch(`https://www.reddit.com/subreddits/search.json?q=${encodeURIComponent(searchTerm)}`)
        .then(res => res.json())
        .then(data => {
          const subs = data.data.children.map(item => ({
            name: item.data.display_name,
            title: item.data.title,
            url: `https://reddit.com${item.data.url}`,
            subscribers: item.data.subscribers,
            icon: item.data.icon_img || null,
          }));
          setSubredditResults(subs.slice(0, 6));
        })
        .catch(err => console.error("Subreddit Search Error ❌", err));
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="spotify-search-page">
      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="🔍 Search for Reddit communities (e.g. AI, fashion, tech)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {/* Subreddit Search Dropdown */}
        {subredditResults.length > 0 && (
          <div className="search-dropdown">
            {subredditResults.map(sub => (
              <div
                key={sub.name}
                className="search-result"
                onClick={() => window.open(sub.url, "_blank")}
              >
                {sub.icon && <img src={sub.icon} alt="" className="sub-icon" />}
                <div>
                  <div><strong>r/{sub.name}</strong></div>
                  <div className="sub-title">{sub.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trending Topics Grid (Unchanged) */}
      <div className="trending-grid">
        <h3>Career related topics you can't miss!</h3>
        <div className="grid-container">
          {topics.map((topic, idx) => (
            <div
              key={topic.id}
              className={`trending-tile tile-${idx % 8}`}
              onClick={() =>
                window.open(`https://reddit.com${topic.permalink}`, "_blank")
              }
            >
              <h4>{topic.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
