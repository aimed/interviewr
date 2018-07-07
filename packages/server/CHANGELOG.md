# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="2.2.0"></a>
# [2.2.0](https://github.com/aimed/interviewr/compare/v2.1.1...v2.2.0) (2018-07-07)


### Bug Fixes

* explicitly declare routes until https://github.com/prismagraphql/graphql-yoga/issues/352 is resolved ([4e7337e](https://github.com/aimed/interviewr/commit/4e7337e))


### Features

* adds abilitiy to change timeline color ([68028d9](https://github.com/aimed/interviewr/commit/68028d9))
* makes education description optional ([b2e82a1](https://github.com/aimed/interviewr/commit/b2e82a1))




<a name="2.1.1"></a>
## [2.1.1](https://github.com/aimed/interviewr/compare/v2.1.0...v2.1.1) (2018-04-19)


### Bug Fixes

* removes need to copy static server assets to the build output ([5a04767](https://github.com/aimed/interviewr/commit/5a04767))




<a name="2.1.0"></a>
# [2.1.0](https://github.com/aimed/interviewr/compare/v2.0.0...v2.1.0) (2018-04-19)


### Bug Fixes

* sends correct file in catch all ([056e042](https://github.com/aimed/interviewr/commit/056e042))




<a name="2.0.0"></a>
# 2.0.0 (2018-04-19)


### Bug Fixes

* adds .env and UserService, fixes build ([2da1fc6](https://github.com/aimed/interviewr/commit/2da1fc6))
* adds ApplicationCreateMutation ([12ab725](https://github.com/aimed/interviewr/commit/12ab725))
* adds ID to viewer to update ui when logging in ([b202030](https://github.com/aimed/interviewr/commit/b202030))
* adds Work to UserType ([ffacd83](https://github.com/aimed/interviewr/commit/ffacd83))
* fixes 'propery not found' ([a540f51](https://github.com/aimed/interviewr/commit/a540f51))
* fixes graphql version to prevent issues with .mjs ([c299fb9](https://github.com/aimed/interviewr/commit/c299fb9))
* fixes not found (hopefully) ([b92975d](https://github.com/aimed/interviewr/commit/b92975d))
* fixes typeorm cli usage ([5895051](https://github.com/aimed/interviewr/commit/5895051))
* fixes UserCreateMutation ([b222b1a](https://github.com/aimed/interviewr/commit/b222b1a))
* remove authService from context and fix UserCreate ([09f8cea](https://github.com/aimed/interviewr/commit/09f8cea))
* removes sqlite database ([322466a](https://github.com/aimed/interviewr/commit/322466a))
* **Application:** adds JoinTable decorator ([3e55077](https://github.com/aimed/interviewr/commit/3e55077))
* **Auth:** makes auth more robust ([d6e7241](https://github.com/aimed/interviewr/commit/d6e7241))
* **mutations:** fixes 'property not found' ([a51c250](https://github.com/aimed/interviewr/commit/a51c250))
* **NodeInterface:** adds type resolver ([c9017d4](https://github.com/aimed/interviewr/commit/c9017d4))
* **Skill:** fixes querying group by adding JoinTable decorator ([f46d6d6](https://github.com/aimed/interviewr/commit/f46d6d6))
* **User:** makes email unique ([9f6183c](https://github.com/aimed/interviewr/commit/9f6183c))


### Features

* adds a safeIdFetcher to help resolve globalIds ([44773ef](https://github.com/aimed/interviewr/commit/44773ef))
* adds Application ([0cb6863](https://github.com/aimed/interviewr/commit/0cb6863))
* adds basic permission management for self ([2c578d5](https://github.com/aimed/interviewr/commit/2c578d5))
* adds EducationCreate and WorkCreate mutations ([4284bae](https://github.com/aimed/interviewr/commit/4284bae))
* adds graphql decorators ([1d26502](https://github.com/aimed/interviewr/commit/1d26502))
* adds login and viewer ([b7daf21](https://github.com/aimed/interviewr/commit/b7daf21))
* adds logout ([8e42147](https://github.com/aimed/interviewr/commit/8e42147))
* adds PersonalCreateMutation ([01cbd07](https://github.com/aimed/interviewr/commit/01cbd07))
* adds role to work and adds form ([7da67f2](https://github.com/aimed/interviewr/commit/7da67f2))
* adds SkillCreateMutation ([b91a4df](https://github.com/aimed/interviewr/commit/b91a4df))
* adds SkillGroupCreateMutation ([93e8c2d](https://github.com/aimed/interviewr/commit/93e8c2d))
* **SkillGroupType:** adds skills to SkillGroupType ([c360a00](https://github.com/aimed/interviewr/commit/c360a00))
* adds ssl redirect for heroku ([1a3a617](https://github.com/aimed/interviewr/commit/1a3a617))
* **server:** now serves client build files ([53866e1](https://github.com/aimed/interviewr/commit/53866e1))
* adds UserCreateForm and hydrokit ([a312dd5](https://github.com/aimed/interviewr/commit/a312dd5))
* implements file based applications ([06045c1](https://github.com/aimed/interviewr/commit/06045c1))
* moves to DI and fixes tests ([a200e2a](https://github.com/aimed/interviewr/commit/a200e2a))
* serves client files after migration to json ([52db7b7](https://github.com/aimed/interviewr/commit/52db7b7))


### BREAKING CHANGES

* changes personal to OneToMany
