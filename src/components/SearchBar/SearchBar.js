import { useState } from 'react';
import s from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  function handleQueryValue(e) {
    return setInputValue(e.currentTarget.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return 'notFound';
    }
    onSubmit(inputValue);
    setInputValue('');
  }

  return (
    <form className={s.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={s.SearchForm__button}>
        <span className={s.SearchForm__buttonLabel}>Search</span>
      </button>

      <input
        onChange={handleQueryValue}
        value={inputValue}
        className={s.SearchForm__input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  );
}
