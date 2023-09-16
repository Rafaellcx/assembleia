# base image
FROM node:18

# Application dir
WORKDIR /app

#Copy source code to /app
COPY . .

#Run command to download dependencies
RUN npm install

#Run Build command
RUN npm run build

#Run application
CMD ["node", "dist/main.js"]