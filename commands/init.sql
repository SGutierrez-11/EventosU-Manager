create schema IF NOT EXISTS eventos;

CREATE TABLE EVENTOS.AREAS
  (
    codigo            INTEGER NOT NULL ,
    nombre            VARCHAR (40) NOT NULL ,
    codigo_facultad INTEGER NOT NULL ,
    id_coordinador    VARCHAR (15) NOT NULL
  )
   ;
CREATE UNIQUE INDEX AREAS__IDX ON EVENTOS.AREAS
  (
    id_coordinador ASC
  )
  ;
ALTER TABLE EVENTOS.AREAS ADD CONSTRAINT AREAS_PK PRIMARY KEY ( codigo ) ;


CREATE TABLE EVENTOS.CIUDADES
  (
    codigo   INTEGER NOT NULL ,
    nombre   VARCHAR (20) NOT NULL ,
    cod_dpto INTEGER NOT NULL
  )
   ;
ALTER TABLE EVENTOS.CIUDADES ADD CONSTRAINT CIUDADES_PK PRIMARY KEY ( codigo ) ;


CREATE TABLE EVENTOS.DEPARTAMENTOS
  (
    codigo   INTEGER NOT NULL ,
    nombre   VARCHAR (20) NOT NULL ,
    cod_pais INTEGER NOT NULL
  )
   ;
ALTER TABLE EVENTOS.DEPARTAMENTOS ADD CONSTRAINT DEPARTAMENTOS_PK PRIMARY KEY ( codigo ) ;


CREATE TABLE EVENTOS.EMPLEADOS
  (
    identificacion    VARCHAR (15) NOT NULL ,
    nombres           VARCHAR (30) NOT NULL ,
    apellidos         VARCHAR (30) NOT NULL ,
    email             VARCHAR (40) NOT NULL ,
    tipo_contratacion VARCHAR (30) NOT NULL ,
    tipo_empleado     VARCHAR (30) NOT NULL ,
    cod_facultad      INTEGER NOT NULL ,
    codigo_sede       INTEGER NOT NULL ,
    lugar_nacimiento  INTEGER NOT NULL
  )
   ;
ALTER TABLE EVENTOS.EMPLEADOS ADD CONSTRAINT EMPLEADOS_PK PRIMARY KEY ( identificacion ) ;


CREATE TABLE EVENTOS.FACULTADES
  (
    codigo       INTEGER NOT NULL ,
    nombre       VARCHAR (30) NOT NULL ,
    ubicacion    VARCHAR (15) NOT NULL ,
    nro_telefono VARCHAR (15) NOT NULL ,
    id_decano    VARCHAR (15)
  )
   ;
CREATE UNIQUE INDEX FACULTADES__IDX ON EVENTOS.FACULTADES
  (
    id_decano ASC
  )
  ;
ALTER TABLE EVENTOS.FACULTADES ADD CONSTRAINT FACULTADES_PK PRIMARY KEY ( codigo ) ;


CREATE TABLE EVENTOS.PAISES
  (
    codigo INTEGER NOT NULL ,
    nombre VARCHAR (20) NOT NULL
  )
   ;
ALTER TABLE EVENTOS.PAISES ADD CONSTRAINT PAISES_PK PRIMARY KEY ( codigo ) ;


CREATE TABLE EVENTOS.PROGRAMAS
  (
    codigo       INTEGER NOT NULL ,
    nombre       VARCHAR (40) NOT NULL ,
    codigo_area INTEGER NOT NULL
  )
   ;
ALTER TABLE EVENTOS.PROGRAMAS ADD CONSTRAINT PROGRAMAS_PK PRIMARY KEY ( codigo ) ;


CREATE TABLE EVENTOS.SEDES
  (
    codigo        INTEGER NOT NULL ,
    nombre        VARCHAR (20) ,
    cod_ciudad INTEGER NOT NULL
  )
   ;
ALTER TABLE EVENTOS.SEDES ADD CONSTRAINT SEDES_PK PRIMARY KEY ( codigo ) ;


CREATE TABLE EVENTOS.TIPOS_CONTRATACION
  ( nombre VARCHAR (30) NOT NULL
  )  ;
ALTER TABLE EVENTOS.TIPOS_CONTRATACION ADD CONSTRAINT TIPOS_CONTRATACION_PK PRIMARY KEY ( nombre ) ;


CREATE TABLE EVENTOS.TIPOS_EMPLEADO
  ( nombre VARCHAR (30) NOT NULL
  )  ;
ALTER TABLE EVENTOS.TIPOS_EMPLEADO ADD CONSTRAINT TIPOS_EMPLEADO_PK PRIMARY KEY ( nombre ) ;


ALTER TABLE EVENTOS.AREAS ADD CONSTRAINT AREAS_EMPLEADOS_FK FOREIGN KEY ( id_coordinador ) REFERENCES EVENTOS.EMPLEADOS ( identificacion ) ;

ALTER TABLE EVENTOS.AREAS ADD CONSTRAINT AREAS_FACULTADES_FK FOREIGN KEY ( codigo_facultad ) REFERENCES EVENTOS.FACULTADES ( codigo ) ;

ALTER TABLE EVENTOS.CIUDADES ADD CONSTRAINT CIUDAD_DEPARTAMENTOS_FK FOREIGN KEY ( cod_dpto ) REFERENCES EVENTOS.DEPARTAMENTOS ( codigo ) ;

ALTER TABLE EVENTOS.DEPARTAMENTOS ADD CONSTRAINT DEPARTAMENTOS_PAISES_FK FOREIGN KEY ( cod_pais ) REFERENCES EVENTOS.PAISES ( codigo ) ;

ALTER TABLE EVENTOS.EMPLEADOS ADD CONSTRAINT EMPLEADOS_FACULTADES_FK FOREIGN KEY ( cod_facultad ) REFERENCES EVENTOS.FACULTADES ( codigo ) ;

ALTER TABLE EVENTOS.EMPLEADOS ADD CONSTRAINT EMPLEADOS_CIUDADES_FK FOREIGN KEY ( lugar_nacimiento ) REFERENCES EVENTOS.CIUDADES ( codigo ) ;

ALTER TABLE EVENTOS.EMPLEADOS ADD CONSTRAINT EMPLEADOS_SEDES_FK FOREIGN KEY ( codigo_sede ) REFERENCES EVENTOS.SEDES ( codigo ) ;

ALTER TABLE EVENTOS.EMPLEADOS ADD CONSTRAINT EMP_TIPOS_CONTRATACION_FK FOREIGN KEY ( tipo_contratacion ) REFERENCES EVENTOS.TIPOS_CONTRATACION ( nombre ) ;

ALTER TABLE EVENTOS.EMPLEADOS ADD CONSTRAINT EMPLEADOS_TIPOS_EMPLEADO_FK FOREIGN KEY ( tipo_empleado ) REFERENCES EVENTOS.TIPOS_EMPLEADO ( nombre ) ;

ALTER TABLE EVENTOS.FACULTADES ADD CONSTRAINT FACULTADES_EMPLEADOS_FK FOREIGN KEY ( id_decano ) REFERENCES EVENTOS.EMPLEADOS ( identificacion ) ;

ALTER TABLE EVENTOS.PROGRAMAS ADD CONSTRAINT PROGRAMAS_AREAS_FK FOREIGN KEY ( codigo_area) REFERENCES EVENTOS.AREAS ( codigo ) ;

ALTER TABLE EVENTOS.SEDES ADD CONSTRAINT SEDES_CIUDADES_FK FOREIGN KEY ( cod_ciudad ) REFERENCES EVENTOS.CIUDADES ( codigo ) ;


insert into eventos.TYPE_ORM_PAIS (codigo,nombre) values (57, 'COLOMBIA'); 
insert into eventos.TYPE_ORM_DEPARTAMENTO (codigo,nombre, "codPaisCodigo") values (76, 'VALLE DEL CAUCA', 57); 
insert into eventos.TYPE_ORM_DEPARTAMENTO (codigo,nombre, "codPaisCodigo") values (19, 'CAUCA', 57); 

insert into eventos.TYPE_ORM_ciudad (codigo,nombre, "codDptoCodigo") values (76001, 'CALI', 76); 
insert into eventos.TYPE_ORM_ciudad (codigo,nombre, "codDptoCodigo") values (76364, 'JAMUNDI', 76); 
insert into eventos.TYPE_ORM_ciudad (codigo,nombre, "codDptoCodigo") values (19001, 'POPAYAN', 76); 


insert into eventos.TYPE_ORM_facultad (codigo,nombre,ubicacion,nro_telefono) values (1,'INGENIERIA', 'P38-203','3197906');

insert into eventos.TYPE_ORM_sede (codigo,nombre,"codCiudadCodigo") values (1, 'PANCE', 76001);

insert into eventos.TYPE_ORM_tipo_contratacion (nombre) values ('PRESTACION DE SERVICIOS');
insert into eventos.TYPE_ORM_tipo_contratacion (nombre) values ('CONTRATO A TERMINO INDEFINIDO');
insert into eventos.TYPE_ORM_tipo_contratacion (nombre) values ('CONTRATO A TERMINO DEFINIDO');

insert into eventos.TYPE_ORM_tipo_empleado (nombre) values ('ADMINISTRATIVO');
insert into eventos.TYPE_ORM_tipo_empleado (nombre) values ('DOCENTE');

insert into eventos.TYPE_ORM_empleado (identificacion,nombres,apellidos,email,"tipoContratacionNombre","tipoEmpleadoNombre","codFacultadCodigo","codigoSedeCodigo") values (10,'ROCIO','LOPEZ','RLOPEZ@U.EDU.CO','CONTRATO A TERMINO INDEFINIDO','ADMINISTRATIVO',1,1);
insert into eventos.TYPE_ORM_empleado (identificacion,nombres,apellidos,email,"tipoContratacionNombre","tipoEmpleadoNombre","codFacultadCodigo","codigoSedeCodigo") values (11,'JOSE','JURADO','JJURADO@U.EDU.CO','CONTRATO A TERMINO INDEFINIDO','DOCENTE',1,1);

insert into eventos.TYPE_ORM_area (codigo,nombre,"facultadesCodigoCodigo") values (1, 'CSI', 1); 

insert into eventos.TYPE_ORM_PROGRAMA (codigo,nombre,areas_codigo) values (15,'INGENIERIA DE SISTEMAS', 1);