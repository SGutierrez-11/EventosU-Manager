#!/bin/bash

# Exportar datos de PostgreSQL a archivos CSV
echo "Exportando datos de PostgreSQL a archivos CSV..."
docker exec -i local_pgdb psql -U admin -d eventos -c "\copy (
    SELECT 
        e.nombres as username, 
        CONCAT(e.nombres, ' ', e.apellidos) as fullName,
        e.email, 
        te.nombre as relationshipType 
    FROM 
        eventos.TYPE_ORM_empleado e 
    INNER JOIN 
        eventos.TYPE_ORM_tipo_empleado te 
    ON 
        e.\"tipoEmpleadoNombre\" = te.nombre
) TO '/tmp/empleados.csv' WITH CSV HEADER;"

docker cp local_pgdb:/tmp/empleados.csv ./empleados.csv

docker exec -i local_pgdb psql -U admin -d eventos -c "\copy (
    SELECT 
        c.nombre as name, 
        d.nombre as department, 
        p.nombre as country
    FROM 
        eventos.TYPE_ORM_ciudad c 
    INNER JOIN 
        eventos.TYPE_ORM_DEPARTAMENTO d 
    ON 
        c.\"codDptoCodigo\" = d.codigo
    INNER JOIN 
        eventos.TYPE_ORM_PAIS p 
    ON 
        d.\"codPaisCodigo\" = p.codigo
) TO 'tmp/ciudades.csv' WITH CSV HEADER;"

docker cp local_pgdb:/tmp/ciudades.csv ./ciudades.csv
echo "Datos exportados a archivos CSV."

# Esperar 3 segundos
echo "Esperando 3 segundos..."
sleep 3

# Copiar archivos CSV a contenedor de MongoDB
echo "Copiando archivos CSV a contenedor de MongoDB..."
docker cp ./empleados.csv eventos-u-manager-mongo-1:/empleados.csv
docker cp ./ciudades.csv eventos-u-manager-mongo-1:/ciudades.csv

# Importar datos desde archivos CSV a MongoDB
echo "Importando datos desde archivos CSV a MongoDB..."
docker exec -i eventos-u-manager-mongo-1 mongoimport -u admin -p admin --authenticationDatabase admin --db eventos --collection type_orm_user --type csv --file ./empleados.csv --headerline 
docker exec -i eventos-u-manager-mongo-1 mongoimport -u admin -p admin --authenticationDatabase admin --db eventos --collection type_orm_city --type csv --file ./ciudades.csv --headerline

# Eliminar archivos temporales
#rm ./*.csv
