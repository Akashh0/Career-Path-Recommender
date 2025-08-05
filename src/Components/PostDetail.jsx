import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './PostDetail.css';

export default function PostDetail() {
  const { id } = useParams();
  const location = useLocation();
  const post = location.state?.post;

  if (!post) return <div className="post-detail">Post data not found.</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.body || 'No content available.'}</p>
      <div className="meta">
        <span>👤 u/{post.author}</span>
        <span>👍 {post.ups}</span>
        <span>💬 {post.num_comments}</span>
        <span>🕒 {new Date(post.created_utc * 1000).toLocaleString()}</span>
      </div>
      <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noreferrer">
        View on Reddit
      </a>
    </div>
  );
}
