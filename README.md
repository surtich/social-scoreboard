Examen Segunda Evaluación
=========================

# Día 03/03/2015 Tiempo: 4 horas

* Nota: Cada pregunta se valorará como bien o como mal (valoraciones intermedias serán excepcionales).
* Nota2: En cada pregunta se especifica si se valora en el examen de diseño o en el de desarrollo.
* Nota3: Para aprobar cada examen hay que obtener una puntuación mínima de 5 puntos en ese examen.
* Nota4: Organice su tiempo. Si no consigue resolver un apartado pase al siguiente. El examen consta de dos ejercicios que se pueden resolver de forma independiente. Los apartados de diseño y de desarrollo también se pueden resolver por separado. Si un apartado depende de otro que no sabe resolver, siempre puede dar una solución que aunque no sea correcta, le permita seguir avanzando.
* Nota5: Lea completamente el examen antes de empezar.

Pasos previos antes de empezar
------------------------------

* Configure su usuario de Git (es único para todos)

```bash
    git config --global user.name "user-daw-zayas"
    git config --global user.email "javier.perezarteaga@educa.madrid.org"
```

* Clone el repositorio del enunciado

```bash
    git clone https://user-daw-zayas@bitbucket.org/surtich/social-scoreboard2.git
```

* Vaya al directorio del repositorio

```bash
    cd social-scoreboard
```

* Cree un *branch* con su nombre y apellidos separados con guiones (no incluya mayúsculas, acentos o caracteres no alfabéticos, excepción hecha de los guiones). Ejemplo:

```bash
    git checkout -b fulanito-perez-gomez
```

* Compruebe que está en la rama correcta:

```bas
    git status
```

* Suba la rama al repositorio remoto:

```bash
    git push origin nombre-de-la-rama-dado-anteriormente
```

* Instale las dependencias:

```bash
    npm install
    bower install
```

* Arranque MongoDB:

```bash
    su -c mongod
```

* Ejecute su proyecto:

```bash
    node server/server.js
```

* Navegue a la raíz del proyecto

```bash
    http://localhost:8000
```

* Compruebe que puede conectarse con los usuarios "homer" y "bar".

Para ello, copie el contenido del archivo "homer.json" y péguelo en la consola del desarrollador del navegador (en la ventana en la que tenga abierta la aplicación). Recargue la aplicación y compruebe que está conectado como "homer". Haga lo mismo con el archivo "bart.token".

* Dígale al profesor que ya ha terminado para que compruebe que todo es correcto y desconecte la red.


## Introducción

## 1.- Cuando se cree un marcador, es necesario asignar un nombre a los equipos local y visitante.

#### 1.1.- (2 puntos, diseño) Al pulsar sobre "new score" se mostrará un cuadro de diálogo como el de la imagen.

![dialog1](https://bitbucket.org/surtich/social-scoreboard2/downloads/dialog1.png)

#### 1.2.- (0.5 puntos, diseño) El diálogo será modal, es decir, no se podrá interactuar con la aplicación hasta que no se cierre pulsando "cancel" u "ok".

#### 1.3.- (1 punto, diseño) El diálogo estará centrado y no tendrá barras de desplazamiento y la información no se verá cortada.

#### 1.4.- (0.5 puntos, diseño) El diálogo se mostrará y ocultará con una animación (transición en lenguaje de Polymer).

#### 1.5.- (1 punto, diseño) El diálogo tendrá los colores e iconos que se indican en la imagen.

![dialog2](https://bitbucket.org/surtich/social-scoreboard2/downloads/dialog2.png)

#### 1.6.- (1 punto, diseño) Al pulsar sobre "Home Name" o sobre "Guest Name", la barra de subrayado cambiará de negro a azul para "home" y a rojo para "guest".

Nota: No he encontrado como hacer esto en la documentación de "pape-input". He tenido que "examinar elemento" para averiguar como se hace.

#### 1.7.- (1 punto, diseño) Al empezar a escribir sobre "Home Name" o sobre "Guest Name", el "placeholder" desaparecerá y las letras serán azules para "home" y rojas para "guest".

#### 1.8.- (0,5 puntos, diseño) El botón "ok" por defecto estará deshabilitado.

#### 1.9.- Hay que validar que el nombre de los equipos sea correcto. El nombre debe estar compuesto por entre 3 y 5 caracteres que pueden ser números y letras en mayúsculas y no puede empezar por número.

#### 1.9.1.- (1 punto, desarrollo) Al abrir el cuadro de diálogo, se mostrará un mensaje de error indicando que los nombres no son correctos según se muestra en la imagen.

![dialog3](https://bitbucket.org/surtich/social-scoreboard2/downloads/dialog3.png)

#### 1.9.2.- (2 puntos, desarrollo) Según se escriba en las cajas de texto, se ocultará o se mostrará el mensaje de error en función de que el nombre sea válido o no aplicando los criterios anteriores (ver 1.9).

![dialog4](https://bitbucket.org/surtich/social-scoreboard2/downloads/dialog4.png)

#### 1.9.3.- (1 punto, desarrollo) Al botón "ok" estará habilitado o deshabilitado según los dos nombres sean correctos o no lo sean respectivamente.

![dialog5](https://bitbucket.org/surtich/social-scoreboard2/downloads/dialog5.png)

### 1.10.- (1 punto, desarrollo) Al pulsar sobre el botón "ok", se creará un marcador con los nombres de los equipos asignados. El servidor está preparado para recibir en el "body" del "request" un JSON con esta estructura:

```javascript
{
  "homeName": "MADRI",
  "guestName": "BARSA"
}
```

Nota: Para mayor aclaración, consulte el método "create" del los ficheros "server/routes/score.js" y "server/manager/score.js"

### 1.11.- (2 puntos, desarrollo) Al cargar los marcadores, se mostrarán los nombres asignados a cada equipo.

![scores](https://bitbucket.org/surtich/social-scoreboard2/downloads/scores.png)

Nota: Observe que el nombre de cada equipo hay que cambiarlo en dos sitios (en "set score" también aparece).
Nota2: Deben seguir funcionado los botones de puntuación y la caja de "set score". Aunque esto puede parecer que no tiene nada que ver con lo que está haciendo, depende de como lo haga afectará a esta funcionalidad. Tenga en cuenta que el servidor sigue esperando la puntuación con los nombres "home" y "guest" y no con los nombres reales y que no puede cambiar el comportamiento del servidor.
Nota3: La función de recuperación de los marcadores devuelve los nombres con las claves del apartado 1.10.

## 2.- Se podrá elegir entre ver los marcadores creados por el usuario o todos los marcadores.

### 2.1.- (1 punto, diseño) Habrá dos opciones de menú adicionales:

![menu](https://bitbucket.org/surtich/social-scoreboard2/downloads/menu.png)

### 2.2.- (0,5 puntos, diseño) La vista inicial, mostrará todos los marcadores y la opción de menú "all scores" aparecerá resaltada.

![all](https://bitbucket.org/surtich/social-scoreboard2/downloads/all.png)

### 2.3.- (1 punto, diseño) Se resaltará la opción de menú pulsada y de eliminará la selección de la otra ("my scores" y "all scores"). Pulsar sobre "refresh" o sobre "new score" no afectará a la opción mostrada (se seguirá mostrando resaltada "all scores" o "my scores", según corresponda).

### 2.4.- (2 puntos, desarrollo) Al pulsar sobre "my scores", se ocultarán los marcadores que no sean del usuario conectado.

![mine](https://bitbucket.org/surtich/social-scoreboard2/downloads/mine.png)

### 2.5.- (1 punto, desarrollo) La opción de menú "refresh" seguirá funcionando como hasta ahora: Recargará los marcadores de la base de datos sin recargar la aplicación. Tenga en cuenta que si está en la vista "all scores", se mostrarán todos los marcadores y si en está en "my scores", se mostrarán únicamente los marcadores creados por el usuario conectado.


Para entregar
-------------

* Ejecute el siguiente comando para comprobar que está en la rama correcta y ver los ficheros que ha cambiado:

```bash
    git status
```

* Prepare los cambios para que se añadan al repositorio local:

```bash
    git add *
    git commit -m "completed exam" -a
```

* Compruebe que no tiene más cambios que incluir:

```bash
    git status
```

* Dígale al profesor que va a entregar el examen.

* Conecte la red y ejecute el siguiente comando:

```bash
    git push origin nombre-de-la-rama
```

* Abandone el aula en silencio.
