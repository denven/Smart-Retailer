import React from 'react';
import styles from './Statistics.css';
export default function SearchBar(props) {

  const handleSubmit = event => {
    event.preventDefault();
    props.onSearch((document.querySelector("#name").value));
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
          <input type="text" className={styles.sidebar} id="name" />
        <input type="submit"/>
      </form>
    </>
  )
}