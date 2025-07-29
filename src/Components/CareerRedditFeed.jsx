import React, { useEffect, useState } from 'react';
import './CareerRedditFeed.css';

export default function CareerRedditFeed() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("https://www.reddit.com/r/cscareerquestions/top.json?limit=10")
      .then(res => res.json())
      .then(data => {
        const formatted = data.data.children.map(item => ({
          id: item.data.id,
          title: item.data.title,
          author: item.data.author,
          body: item.data.selftext,
          ups: item.data.ups,
          num_comments: item.data.num_comments,
          created_utc: item.data.created_utc,
          permalink: item.data.permalink
        }));
        setPosts(formatted);
      })
      .catch(err => console.error("Reddit Fetch Error ❌", err));
  }, []);

  return (
    <div className="reddit-feed">
      <h2>💼 Career Discussions (Reddit)</h2>
      
      <div className="reddit-posts-container">
        {posts.map(post => (
          <div 
            key={post.id} 
            className={`reddit-card ${selectedPost?.id === post.id ? 'expanded' : ''}`}
            onClick={() => setSelectedPost(selectedPost?.id === post.id ? null : post)}
          >
            <div className="reddit-header">
              <strong>u/{post.author}</strong>
              <span className="timestamp">{new Date(post.created_utc * 1000).toLocaleString()}</span>
            </div>

            <h3>{post.title}</h3>

            {selectedPost?.id === post.id ? (
              <>
                <p>{post.body || 'No content available.'}</p>
                <a 
                  href={`https://reddit.com${post.permalink}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Full Conversation
                </a>
              </>
            ) : (
              <p>{post.body?.slice(0, 200)}{post.body.length > 200 ? '...' : ''}</p>
            )}

            <div className="reddit-meta">
              <span>👍 {post.ups}</span>
              <span>💬 {post.num_comments} Comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
