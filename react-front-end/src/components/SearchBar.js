import React from 'react';

export default function SearchBar() {
  return (
    <>
      <form>
        <label>
          Search:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}