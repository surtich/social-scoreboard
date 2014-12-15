Examen Primera Evaluación
=========================

# Día 09/12/2014 Tiempo: 4 horas

* Nota: Cada pregunta se valorará como bien o como mal (valoraciones intermedias serán excepcionales).
* Nota2: En cada pregunta se especifica si se valora en el examen de diseño o en el de desarrollo.
* Nota3: Para aprobar cada examen hay que obtener una puntuación mínima de 5 puntos en ese examen. En el exámen de diseño la puntuación máxima es 10 y en el de desarrollo 14 (al aprobado sigue siendo 5, los puntos adicionales que obtenga por encima de 10, le servirán para subir nota en la asignatura).
* Nota4: Organice su tiempo. Si no consigue resolver un apartado pase al siguiente. El examen consta de dos ejercicios que se pueden resolver de forma relativamente independiente. Los apartados de diseño y de desarrollo también se pueden resolver por separado. Si un apartado depende de otro que no sabe resolver, siempre puede dar una solución que aunque no sea correcta, le permita seguir avanzando.
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
    git clone https://user-daw-zayas@bitbucket.org/surtich/social-scoreboard.git
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
    http://localhost:9001
```

* Dígale al profesor que ya ha terminado para que compruebe que todo es correcto y desconecte la red.

## Introducción

El examen consiste en paginar los resultados de los marcadores.

![introduccion](https://bitbucket.org/surtich/social-scoreboard/downloads/intro.png)

Esto lo vamos a hacer en dos pasos.

El primer ejercicio consistirá en mostrar los marcadores en una lista de forma compacta y el segundo es la paginación propiamente dicha.


## 1.- Marcadores en una lista y vista de detalle

#### 1.1.- (1 punto, desarrollo) Muestre los resultados en una lista o tabla (no importa cómo lo haga, lo importante es que se muestren de forma compacta y que se vea cada resultado en una columna).

#### 1.2.- (2 puntos, diseño) La apariencia debe ser la que se muestra en la imagen. Observe centrado, colores, bordes, espaciado, título, etc.

![list](https://bitbucket.org/surtich/social-scoreboard/downloads/list.png)


#### 1.3.- (1 punto, desarrollo) Si no hay ningún marcador (la base de datos está vacía), se indicará.

![empty](https://bitbucket.org/surtich/social-scoreboard/downloads/empty.png)


#### 1.4.- (2 puntos, diseño) Al situarse encima de un marcador, éste se resaltará.

![highlight](https://bitbucket.org/surtich/social-scoreboard/downloads/highlight.png)


#### 1.5.- (1 punto, desarrollo) Al pulsar sobre el marcador seleccionado, se mostrará su vista de detalle que permitirá modificar los puntos anotados.

![detail](https://bitbucket.org/surtich/social-scoreboard/downloads/detail.png)

#### 1.6.- (1 punto, diseño) Añada un nuevo elemento (*list*) al menú de la izquierda.

![menu](https://bitbucket.org/surtich/social-scoreboard/downloads/menu.png)

#### 1.7.- (1 punto, desarrollo) Al pulsar sobre la opción de menú *list*, se volverá al modo compacto.

![list](https://bitbucket.org/surtich/social-scoreboard/downloads/list.png)

#### 1.8.- (0.5, desarrollo) La opción de menú "new score" mostrará la vista de detalle del menú creado:

![new](https://bitbucket.org/surtich/social-scoreboard/downloads/new.png)

#### 1.9.- (2 puntos, diseño) La transición entre modo vista y modo detalle, será animada.

#### 1.10.- (0,5 puntos, desarrollo) Al eliminar un marcador se volverá al modo lista.

## 2.- Paginación.

#### 2.1.- (1 punto, desarrollo) En el modo lista, se mostrarán los botones de la imagen. Observe que se mostrarán botones 1, 2, etc que permitirán moverse por las páginas de marcadores. Cada página tendrá 5 marcadores, así si hay, por ejemplo, 13 marcadores, se mostrarán los botones 1, 2, 3.
#### 2.2.- (2 puntos, diseño) El estilo es el que se muestra en la imagen. Observe que la página 1 (la seleccionada por defecto) está resaltada.

![pagination](https://bitbucket.org/surtich/social-scoreboard/downloads/pagination.png)

#### 2.3.- (1 punto, diseño) Los botones con el número de página no se mostrarán cuando la resolución sea menor que 768px.

![pagination_reduce](https://bitbucket.org/surtich/social-scoreboard/downloads/pagination_reduce.png)

#### 2.4.- (1 punto, desarrollo) Al pusar sobre un número de página, se resaltará y se podrá con estilo normal la página que estuviera resaltada.

![pagination_change](https://bitbucket.org/surtich/social-scoreboard/downloads/pagination_change.png)

#### 2.5.- (1 punto, desarrollo) Al estar sobre la página 1, los botones *first* y *prev* se desactivarán; al estar sobre la última página los botones *last* y *next* se desactivarán.

![pagination_last](https://bitbucket.org/surtich/social-scoreboard/downloads/pagination_last.png)

#### 2.6.- (1 punto, desarrollo) Al pulsar sobre *first* se seleccionará la primera página; al pulsar sobre *prev* se seleccionará la anterior; al pulsar sobre *last* se seleccionará la última página y al pulsar sobre *next* se seleccionará la siguiente.

#### 2.7.- (2 puntos, desarrollo) Al pulsar sobre un número de página, se verán únicamente los marcadores de esa página.

#### 2.8.- (1 punto, desarrollo) Al eliminar o añadir un marcador se mantendrá el número de páginas correcto (se eliminarán o añadirán páginas según sea necesario).

#### 2.9.- (1 punto, desarrollo) Al eliminar un marcador de una página que no sea la última, se seguirán mostrando 5 marcadores en esa página ya que se "moverá" el primer marcador de la siguiente página a ésta.

#### 2.10.- (1 punto, desarrollo) Al eliminar el último marcador de la última página, se reducirá el número de páginas (esto ya lo habrá hecho en 2.8) y se pondrá como página activa la 1.

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