import { Container, Reshaped, View } from 'reshaped';
import 'reshaped/themes/reshaped/theme.css';
import { CountryCapitalGame } from './components/CountryCapitalGame';

function App() {
  return (
    <Reshaped theme="reshaped">
      <Container width="652px">
        <View align="center" justify="center" height="100vh">
          <CountryCapitalGame
            data={{
              Warsaw: 'Poland',
              Netherlands: 'Amsterdam',
              Norway: 'Oslo',
              Ukraine: 'Kyiv',
            }}
          />
        </View>
      </Container>
    </Reshaped>
  );
}

export default App;
