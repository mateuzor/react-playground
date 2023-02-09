import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
* {
    margin: 0;
    padding: 0;
}

html, body {
    width:100%;
    height:100%;

    background-color: #121212;
}

body {
    font-family: 'Roboto', sans-serif;
    color:#fff
}
`;

export default GlobalStyle;
