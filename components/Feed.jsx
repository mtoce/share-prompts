'use client';
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagCLick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagCLick}
        />
      ))}
    </div>
  )
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt/');
    const data = await response.json();
    
    setPosts(data);
  }
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const filterPrompts = (search_text) => {
    const regex = new RegExp(search_text, 'i'); // 'i' means case insensitive
    return posts.filter(
      (item) => 
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };


  const handleSearchChange = (event) => {
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(event.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
        type='text'
        placeholder='Search for a tag or username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList 
          data={searchedResults}
          handleTagCLick={handleTagClick}
        />
      ) : (
        <PromptCardList 
          data={posts}
          handleTagCLick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed