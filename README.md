# Northwind Rest Commons

Northwind Rest Commons le provee al desarrollador una serie de objetos que sirven como la capa de transporte entre el Frontend, los servicios y la base de datos.


## Instalación

Luego de clonar el repositorios se deben instalar todas las dependencias.

En la terminal, dirígase a la carpeta base del proyecto, y ejecute el comando "npm install" o, si se tiene yarn instalado, "yarn install".

Luego la librería estará lista para ser importada por un proyecto autogenerado.


## Uso

Luego de ser instalada y agregada como paquete, Northwind puede ser importada desde cualquier archivo de la siguiente forma:

```
import { commonsSuccessfully } from 'northwind-rest-commons';
```

De ésa forma se importa la función de ejemplo commonsSuccessfully(), que símplemente regresa un string con un mensaje de éxito.

## Acceso a datos

### Conexión

1. Para poder acceder a la base de datos, se deben especificar las variables de acceso.

2. Llenar el archivo .env con los siguientes campos, como sea apropiado. Por ejemplo:

```
  RDS_TYPE=mysql
  RDS_HOSTNAME=c-61-123-45-67.hsd1.co.comcast.net
  RDS_PORT=1433
  RDS_USERNAME=<username>
  RDS_PASSWORD=<password>
  RDS_DB_NAME=info
  APP_ENV=
  DIR_DATA=./src/typeorm
```

## Adaptación a sistemas diferentes

Si se quisiera adaptar éste proyecto para que funcione con otros sistemas/bases de datos, el primer paso es eliminar todos los elementos en las carpetas "src/models" y "src/typeorm/entities", y reemplazarlas por las que sean correctas para el nuevo sistema.

### Entidades

Las entidades se generan mediante un script JS en "./src/typeorm-model-generator/generate-entities.ts".

Para correc el script, sólo es necesario ejecutar el siguiente comando CLI:

```
$ npm run generate:entities
```

Ve el resultado revisando el directorio "./src/typeorm/entities".

### Clases puras

A partir de las entidades, se pueden crear a mano clases puras, que son idénticas a las anteriores, pero sin los decoradores.

### Procedimientos almacenados

Se pueden generar automáticamente procedimentos almacenados mediante un script JS en "./src/typeorm-model-generator/generate-stored-procedures.ts".

Para correc el script, sólo es necesario ejecutar el siguiente comando CLI:

```
$ npm run generate:stored-procedures
```

Ve el resultado revisando el directorio "./src/typeorm/stored-procedures".
