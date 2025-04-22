FROM node:23-slim 
#version de la imagen de nodejs

WORKDIR /app
#directorio de trabajo dentro del contenedor
COPY package*.json /app
#copiamos los archivos de dependencias al contenedor
RUN npm install
#instalamos las dependencias
COPY . /app
#copiamos el resto de los archivos al contenedor
CMD ["npm", "start"]
#comando para iniciar la aplicacion