# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.10.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn
ENV PORT 80

# Install all dependencies of the current project with yarn.
COPY package*.json ./
COPY yarn.lock .
RUN yarn

# Copy all local files into the image.
COPY . .

# Build for production.
CMD yarn start