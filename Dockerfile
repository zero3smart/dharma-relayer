# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.10.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
RUN npm install -g serve
CMD serve -s build -p 80
EXPOSE 80

# Install all dependencies of the current project with yarn.
COPY package*.json ./
COPY yarn.lock .
RUN yarn

# Copy all local files into the image.
COPY . .

# Build for production.
RUN yarn build --production