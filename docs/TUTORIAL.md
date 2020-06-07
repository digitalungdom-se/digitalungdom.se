# Introduktion till utveckling av [digitalungdom.se](./..)

Välkommen till en introduktion för att utveckla detta repository. Denna introduktion ämnar till att ge en överblick av relevanta steg i en utvecklingsprocess.

Denna tutorial kommer att vara på svenska, medan koden och dokumentationen kommer att vara på engelska.

Vi kommer att försöka skapa en Login-sida i denna tutorial.

## Att lägga till en route

I många fall vill man att ens funktion ska ha en egen sida, och i detta fall en egen "route". En route är en underdel på sin hemsida och kan se ut på lite olika sätt. Det är den del som kommer efter toppdomänen. `example.com/route`. Nedan kommer lite olika exempel på hur URL:er och routes kan vara uppbyggda.

```
// Enkel route
example.com/route
// En route med flera routes under sig, ungefär hur mappar är strukturerade
netflix.com/movies/comedy
// En route med en get parameter
amazon.com/categories/tools?search=screwdriver
```

För att lägga till en route behöver vi besöka [src/router](./../src/router). I denna mapp finns än så länge endast en fil, [index.tsx](./../src/router/index.tsx).

Denna router använder sig av react-router-dom. Läs deras dokumentation för att förstå hur man använder sig av react-router-dom.

Vi lägger till en `<Route>` inuti vårt `<Switch>`, och ber den fånga upp allting på `/logga-in`, dvs `digitalungdom.se/logga-in`.

```JSX
<Switch>
    <Route path="/logga-in">
    </Route>
    <Route path="/secret-component">
        <Secret />
    </Route>
</Switch>
```

Vi väljer att Login-routen ska rendera en Login-komponent och stoppar helt enkelt in den där.

```JSX
<Route path="/logga-in">
    <Login />
</Route>
```

Vi får heller inte glömma att importera denna Login-komponent. Vi kommer att göra det med React Lazy-Loading. Själva komponenten kommer vi placera vid [src/features/auth/Login.tsx](./../src/features/auth/Login.tsx). Vi har valt en "feature-based" mappstruktur. Det finns många olika sätt att göra det på, och jag rekommenderar att du läser olika källor själv.

Koden för att importera komponten (inuti [src/router/index.tsx](./../src/router/index.tsx)) ser ut som följande:

```JSX
const Login = React.lazy(() => import('features/auth/Login'));
```

## Bygga sidan / komponenten

Nu kommer vi att börja bygga vår själva stukturen av login-komponenten. Det kommer att bli en React functional component. Vi kommer att använda oss av Material-UI.

```TSX
import React from 'react';
import { Button, Form, TextField } from '@material-ui/core';

function Login() {
    return (
        <Form>
            <TextField
                label="E-mail"
                name="email"
                type="text"
                variant="outlined"
            />
            <TextField
                label="Lösenord"
                name="password"
                type="password"
                variant="outlined"
            />
            <Button type="submit">
                Logga in
            </Button>
        </Form>
    )
}
```

### Fotnot: Importering av komponenter

För att optimera själva inladdningen av komponenter kommer vi att importera varje komponent för sig. Se koden nedanför.

```TSX
// Dåligt
import { Button, Form, TextField } from '@material-ui/core';

// Bra
import Button from '@material-ui/core/Button';
import Form from '@material-ui/core/Form';
import TextField from '@material-ui/core/TextField';
```

---

Vi kommer nu att lägga till ett sätt för Form-komponenten att få vad som skickas in när man trycker på knappen.
Ändra Form-komponenten till följande.

```TSX
<Form onSubmit={(e) => {
    // Skicka inte vidare användaren så att sidan reloadar.
    e.preventDefault();
    // Få ut värdena
    const { password, email } = e.target.form;
    // Logga värdena
    console.log(email, password);
}}>
```

## Lägga till Formik

Formik är ett bibliotek för att underlätta hanteringen av formulär i React. Vi använder oss av både [formik](https://jaredpalmer.com/formik) och [formik-material-ui](https://stackworx.github.io/formik-material-ui/) som är ett bibliotek anpassat för användning `material-ui` och `formik`.

Vi kommer att omvandla ovanstående exempel till följande kod

```TSX
import { Field, Form, Formik } from 'formik';

import { Button } from '@material-ui/core';
import React from 'react';
import { TextField } from 'formik-material-ui';

function Login() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values.email, values.password);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }): JSX.Element => (
        <Form>
          <Field component={TextField} disabled={isSubmitting} label="Email" name="email" type="email" />
          <Field component={TextField} disabled={isSubmitting} label="Lösenord" name="password" type="password" />
          <Button disabled={isSubmitting} type="submit">
            Logga in
          </Button>
        </Form>
      )}
    </Formik>
  );
}
```
