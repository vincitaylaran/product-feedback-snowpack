import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Comments() {
  return (
    <main>
      <h1>Comments</h1>
      <Outlet />
    </main>
  );
}

export default Comments;
