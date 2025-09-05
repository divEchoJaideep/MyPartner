import * as React from 'react';
import {Container, Header} from '../../components';
import BookPage from '../../components/BookPage';

function BookScreen({navigation}) {
  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          title="Filter"
          onBackPress={() => navigation.goBack()}
        />
        <BookPage />
      </Container>
    </>
  );
}

export default BookScreen;
