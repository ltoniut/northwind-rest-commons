# Rest Commons

Rest Commons es un repositorio diseñado para proveer controladores y servicios REST genéricos que pueden ser importados desde un proyecto para facilitar radicalmente la creación de endpoints funcionales usando un modelo de múltiples repositorios.

Éste proyecto fue diseñado para ser utilizado en conjunto con generic-rest-template para crear nuevos sistemas completamente funcionales desde 0.

https://github.com/ltoniut/generic-rest-template

## Requerimientos

NodeJS - https://nodejs.org/en/docs/
Node Package Manager - https://docs.npmjs.com/
Typescript 2.0 - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html
@nestjs/cli - https://docs.nestjs.com/cli/overview
GIT - https://git-scm.com/doc
Una base de datos SQL (MySQL, MsSql o Postgres) cuyas tablas utilizan una columna "id" como clave primaria.

# Cómo usar

A continuación se detallan instrucciones para utilizar a rest-commons en conjunto con generic-rest-template para la creación de nuevos proyectos completamente funcionales.

## Clonar proyectos

El primer paso es, en una nueva carpeta, clonar ambos proyectos.

- git clone https://github.com/ltoniut/rest-commons
- git clone https://github.com/ltoniut/generic-rest-template

Ir al directorio de rest-commons y remover el vínculo de git con la siguiente línea

- git remote remove origin

Ya que el proyecto de template es sólo usado para la creación de nuevos sistemas y no como un sistema en sí mismo, no existe tanta necesidad de hacer lo mismo con él.

Si se quisiera cambiar el nombre de la carpeta del proyecto commons, se deberá ir a los archivos 

@dir/package.json
@dir/src/schematics/rest-service/files/ts/package.json

y cambiar la línea

"rest-commons": "../rest-commons",

para reflejar la ubicación actual.

## Instalación y configuración

Dentro del directorio del proyecto rest-commons, abrir una consola y ejecutar el comando

- npm install

Luego, en la carpeta .env, colocar los parámetros de una base de datos existente del proyecto en lugar de las variables placeholder (Usuario, password, host, etc)

Ejecutar los tres comandos siguientes en la consola en orden

- npm run generate:entities

Para correr un script de typeORM y crear las entidades a partir de la base de datos

- npm run generate:models

Para traducir las entidades typeORM y crear modelos usables por los servicios del sistema

- npm run generate:index

Para hacer cleanup de algunos de los elementos generados, y para crear un módulo de los modelos

Luego de hacerlo, se habrán creado dos archivos en el directorio base del proyecto; .module-variables y entities.json, que serán usados luego en la configuración. Nuevamente, correr el comando

-npm install
-npm run build

En el proyecto generic-rest-template, en el archivo @dir/src/app.module.ts hay dos zonas comentadas. En una se encuentra una lista de entidades importadas, y en la otra se incluyen dichas entidades al módulo. Cambiar los contenidos de las áreas comentadas por los contenidos del archivo .module-variables.

Si se quisiera usar el sistema para crear múltiples proyectos basados en la misma base de datos, una opción que puede ayudar es la de modificar el archivo @dir/src/schematics/defaults.ts para incluir los datos de la base de datos.

En la carpeta del proyecto generic-rest-template, abrir una consola y ejecutar el comando

-npm install

## Creación de un nuevo proyecto

En la carpeta que contiene ambos proyectos, ejecutar el comando

- nest g -c ./generic-rest-template rest-service

Se recibirá una serie de preguntas: Nombre del autor, nombre del proyecto a crear, versión, etc. Luego se creará un proyecto nuevo en una carpeta con el mismo nombre que se ha seleccionado dentro de la carpeta utilizada.

Copiar el archivo entites.json que se ha creado en commons y pegarlo en la carpeta del nuevo proyecto. La misma contendrá una lista de objetos json vacíos, cada uno correspondiendo a las tablas de la base de datos. Si se quisieran ignorar entidades, ya sea para crear microservicios o para limitar el scope del proyecto, basta con eliminarlas del archivo.

En la carpeta con el nuevo proyecto, ejecutar el comando

- nest g -c ../generic-rest-template rest-resource

Se dará la opción de crear entidades a partir de un archivo o de crear una entidad única por nombre. Seleccionar la opción de usar el archivo y escribir "entities.json." Al hacerlo, se crearán automáticamente nuevos módulos con controladores, servicios y repositorios que importan sus implementaciones del proyecto commons.

Finalmente, ejecutar el comando

- npm install

Y el nuevo proyecto estará listo para correrse, con operaciones CRUD funcionales para cada una de las entidades.

## Subir proyectos a la web

De querer subir un proyecto autogenerado a la web, se debe recordar que no se puede utilizar la librería local, así que también se tendra que hacer deployment de commons y cambiar la referencia por defecto en package.json. 

## Notas finales

El objetivo de éste sistema no es reemplazar por completo la labor del programador, sino proveerle una herramienta que facilite la creación de sistemas informáticos. El proyecto generado no tendrá más que las funcionalidades básicas para el trabajo de creación, edición, lectura y remoción de datos, y no contempla los elementos de lógica que negocios que podrían ser únicos en un sistema informático específico.

## Tecnologías utilizadas

TypeScript
NestJS
Angular-devkit
ExpressJs

## Reconocimientos

Matthew Elgin, Obed Corrales, Erick Keller, David Camacho y Nicolás Pogulanik, sin cuya investigación y conocimientos éste proyecto no sería posible.
