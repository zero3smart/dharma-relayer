# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.10.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn
ENV PORT 80

EXPOSE 80

# Install all dependencies of the current project.
COPY package*.json ./
RUN npm install

# Copy all local files into the image.
COPY . .

CMD npm start