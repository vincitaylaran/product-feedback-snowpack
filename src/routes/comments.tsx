import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Button from '../components/Button';
import GoBackButton from '../components/GoBackButton';
import PageLayout, { PageNav } from '../components/PageLayout';

function Comments() {
  return (
    <PageLayout>
      <PageNav>
        <GoBackButton />
        <Button>Edit Feedback</Button>
      </PageNav>
      <Outlet />
    </PageLayout>
  );
}

export default Comments;
