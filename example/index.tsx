import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Annotator } from '../.';
import styled from 'styled-components';
import './App.css';
import headerImage from './header.jpg';

const AppContainer = styled.div`

`

const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-height: 280px;
background-image: url(${headerImage});
background-size: cover;
background-repeat: no-repeat;
background-position: center;
opacity: .88;
`
const HeaderTitle = styled.h1`
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 4em;
`

const Container = styled.main`
/* display: flex;
align-items: center;
justify-content: center; */
background-color: #fff;
max-width: 1200px;
margin: 0 auto;
padding: 1em 2em;
`

const TextWrapper = styled.div`
/* width: 45%; */
`

const AnnotatedText = styled.div`
line-height: 2em;
font-size: 1.5em;
`

const App = () => {
  const SampleText = `And when the day of Pentecost was fully come, they were all with one accord in one place.
  And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting.
  And there appeared unto them cloven tongues like as of fire, and it sat upon each of them.
  And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.
  
  And when the day of Pentecost was fully come, they were all with one accord in one place.
  And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting.
  And there appeared unto them cloven tongues like as of fire, and it sat upon each of them.
  And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.

  And when the day of Pentecost was fully come, they were all with one accord in one place.
  And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting.
  And there appeared unto them cloven tongues like as of fire, and it sat upon each of them.
  And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.  
  `


  return (
    <AppContainer>
      <Header>
        <HeaderTitle>Acts 2:1-4</HeaderTitle>
      </Header>
      <Container>
        <TextWrapper>
          <AnnotatedText>
            <Annotator text={SampleText} />
          </AnnotatedText>
        </TextWrapper>
      </Container>
    </AppContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
