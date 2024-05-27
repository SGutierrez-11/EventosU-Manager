# Event Management System

Este sistema de gestión de eventos está diseñado para satisfacer las necesidades de una universidad en el suroccidente colombiano. Permite registrar y gestionar eventos, charlas, conferencias y reuniones, así como la información relacionada con los asistentes, conferencistas, facilitadores y comentarios.

## Empezar con docker compose

Para ejecutar la aplicación con Docker Compose, siga estos pasos:

1. Clone el repositorio:

```bash
git clone https://github.com/SGutierrez-11/eventos-u-manager.git
```

2. Cambie al directorio del proyecto:

```bash
cd eventos-u-manager
```

3. Construya y ejecute la aplicación con Docker Compose:

```bash
docker-compose up -d
```

4. Acceda a la aplicación en su navegador web:

```
http://localhost:3000
```

## Análisis

El análisis detallado de los requisitos del proyecto es crucial para garantizar el éxito del sistema de gestión de eventos. Los eventos requieren una estructura compleja de datos que incluye información como título, descripción, categorías, fecha y lugar. Además, la inclusión de detalles sobre asistentes, conferencistas, facilitadores y comentarios añade otro nivel de complejidad. Estos datos no solo deben almacenarse de manera eficiente, sino también ser fácilmente accesibles y manipulables para diversas operaciones, como búsquedas y recomendaciones.

La naturaleza diversa y el volumen potencial de los datos justifican la elección de una base de datos NoSQL como MongoDB. MongoDB es conocido por su capacidad para manejar grandes cantidades de datos no estructurados o semiestructurados, lo que lo hace ideal para aplicaciones donde la flexibilidad y la escalabilidad son esenciales. La base de datos relacional PostgreSQL también se utilizará para almacenar información estructurada y consistente sobre los empleados de la universidad, aprovechando sus capacidades de transacciones ACID y su robusto sistema de gestión de relaciones.

## Sustentación de la BD NoSQL

Las bases de datos NoSQL, como MongoDB, ofrecen varias ventajas que son críticas para el éxito del sistema de gestión de eventos. MongoDB permite el almacenamiento de datos en documentos flexibles en formato JSON, lo que es ideal para datos con estructuras variadas y que cambian con el tiempo. Esta flexibilidad es esencial para un sistema que debe manejar diferentes tipos de eventos y participantes con diversos atributos.

Además, MongoDB proporciona una escalabilidad horizontal que permite manejar grandes volúmenes de datos y un alto tráfico de consultas, lo cual es fundamental para una aplicación universitaria con potencialmente miles de usuarios y eventos. La capacidad de MongoDB para distribuir datos a través de múltiples servidores también asegura una alta disponibilidad y tolerancia a fallos, lo cual es crucial para una aplicación que debe estar siempre disponible para los usuarios.

## Diseño

El diseño del modelo de datos es una parte fundamental del desarrollo de este sistema. Se propone un modelo de datos que utiliza colecciones de MongoDB para almacenar eventos, lugares, participantes y comentarios. Cada colección contendrá documentos que representen entidades individuales, permitiendo una gran flexibilidad en la forma en que se almacenan y recuperan los datos.

### Modelo de Eventos
- Eventos: Cada documento de evento incluirá el título, descripción, categorías, fecha, lugar (referencia al documento de lugar), asistentes (referencias a los documentos de participantes), conferencistas/facilitadores (referencias a los documentos de participantes) y comentarios (documentos incrustados o referencias a documentos de comentarios).

### Modelo de Usuarios
- Usuarios: Los documentos de participantes incluirán identificador, nombre de usuario, nombre completo, tipo de relación con la institución, email y ciudad (referencia al documento de ciudad).

### Modelo de Lugares
- Lugares: Los documentos de lugar contendrán nombre, dirección y ciudad (referencia al documento de ciudad).

### Modelo de Comentarios
- Comentarios: Los documentos de comentarios incluirán el texto del comentario y el usuario que lo realizó (referencia al documento de participante).

## Implementación

### PostgreSQL

Para la base de datos relacional en PostgreSQL, se implementarán las siguientes tablas:

- Profesores: con columnas para el ID del profesor, nombre, email, y área o programa.
- Áreas/Programas: con columnas para el ID del área/programa, nombre y facultad.
- Facultades: con columnas para el ID de la facultad, nombre y sede.
- Sedes: con columnas para el ID de la sede, nombre y ubicación.

Se establecerán relaciones entre estas tablas utilizando claves foráneas, garantizando la integridad referencial. Los datos se cargarán adecuadamente, asegurando que todas las relaciones y restricciones estén correctamente implementadas.

### MongoDB

En MongoDB, se crearán las colecciones necesarias para almacenar eventos, lugares, participantes y comentarios. Se diseñarán índices adecuados para optimizar las consultas más comunes, como la búsqueda de eventos por categorías o la recuperación de comentarios asociados a un evento específico.

## Integración

La aplicación se desarrollará para integrarse eficazmente con ambas bases de datos, PostgreSQL y MongoDB. Utilizando una arquitectura de microservicios, se desarrollarán servicios independientes para manejar las operaciones de CRUD (Crear, Leer, Actualizar, Eliminar) en cada base de datos.

### Integración de PostgreSQL

Se desarrollará un servicio RESTful para interactuar con PostgreSQL, proporcionando endpoints para recuperar información sobre profesores, áreas, facultades y sedes. Este servicio se encargará de la lógica de negocio necesaria para garantizar la integridad de los datos y realizar las consultas necesarias.

### Integración de MongoDB

Un segundo servicio RESTful se desarrollará para manejar las operaciones de MongoDB. Este servicio proporcionará endpoints para gestionar eventos, lugares, participantes y comentarios. También se implementarán funcionalidades para recomendar eventos basados en las categorías de los eventos a los que han asistido los usuarios.

### Interacción entre Servicios

La aplicación principal consumirá estos servicios a través de llamadas API, asegurando que las operaciones de datos sean eficientes y seguras. La interacción entre los servicios se gestionará mediante un orquestador que garantizará la coherencia de los datos y manejará cualquier posible inconsistencia o conflicto de datos.

### Client Side

El frontend de la aplicación se desarrollará utilizando un framework moderno Next, proporcionando una interfaz de usuario intuitiva y responsiva. La interfaz permitirá a los usuarios buscar y registrar eventos, ver información detallada sobre los mismos, y recibir recomendaciones personalizadas de eventos.

## Conclusión

Este sistema de gestión de eventos ofrece una solución integral y robusta para la universidad del suroccidente colombiano. Al combinar las fortalezas de PostgreSQL y MongoDB, la aplicación proporciona una plataforma flexible y escalable para gestionar una amplia variedad de eventos y participantes. La integración eficaz entre las bases de datos y la aplicación asegura que la información esté siempre actualizada y disponible, mejorando la organización y promoción de actividades académicas y culturales en la universidad.
