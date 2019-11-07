# blitz-api

REST API for a serial art sharing SPA

- db schema: https://dbdiagram.io/d/5d84383aff5115114db47333
- plantuml diagrams
- tools:
  - server: node.js/express
  - database: PostgreSQL
    - migration and version control with sequelize
  - authentication: passport/jwt
    - OAuth2.0 Facebook and Google

- deployment (AWS)
  - Terraform for architecture model
  - AWS S3 (Standard - Infrequent Access tier)
  - AWS RDS - PostgreSQL (auto-scaling)