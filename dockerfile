# Imagen base
FROM ubuntu:latest

# Actualiza el sistema
RUN apt-get update && apt-get -y upgrade

# Instala fuentes chinas
RUN apt-get -y install fonts-wqy-zenhei fonts-wqy-microhei

# Establece las variables de entorno para las fuentes chinas
ENV LANG C.UTF-8
ENV LANGUAGE C.UTF-8
ENV LC_ALL C.UTF-8

# Ejecuta cualquier comando necesario para configurar tu aplicación
CMD ["npm", "build"]

# Establece el comando de inicio para tu aplicación
CMD ["npm", "start"]
