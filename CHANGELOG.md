# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="2.1.0"></a>
# [2.1.0](https://github.com/aimed/interviewr/compare/v2.0.0...v2.1.0) (2018-04-19)


### Bug Fixes

* adds build dir in postinstall script ([c53f5e8](https://github.com/aimed/interviewr/commit/c53f5e8))
* sends correct file in catch all ([056e042](https://github.com/aimed/interviewr/commit/056e042))


### Features

* adds loader to html to display while loading js ([6960b66](https://github.com/aimed/interviewr/commit/6960b66))




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
* **Skill:** fixes querying group by adding JoinTable decorator ([f46d6d6](https://github.com/aimed/interviewr/commit/f46d6d6))
* fixes Not found on parallel builds if build dir does not exists ([37ccaea](https://github.com/aimed/interviewr/commit/37ccaea))
* fixes typeorm cli usage ([5895051](https://github.com/aimed/interviewr/commit/5895051))
* fixes UserCreateMutation ([b222b1a](https://github.com/aimed/interviewr/commit/b222b1a))
* remove authService from context and fix UserCreate ([09f8cea](https://github.com/aimed/interviewr/commit/09f8cea))
* **Auth:** makes auth more robust ([d6e7241](https://github.com/aimed/interviewr/commit/d6e7241))
* removes sqlite database ([322466a](https://github.com/aimed/interviewr/commit/322466a))
* **apollo:** allow cookies for auth ([5048e33](https://github.com/aimed/interviewr/commit/5048e33))
* **Application:** adds JoinTable decorator ([3e55077](https://github.com/aimed/interviewr/commit/3e55077))
* **hydrokit:** fixes form alignment and field visibility ([44609b0](https://github.com/aimed/interviewr/commit/44609b0))
* **mutations:** fixes 'property not found' ([a51c250](https://github.com/aimed/interviewr/commit/a51c250))
* **NodeInterface:** adds type resolver ([c9017d4](https://github.com/aimed/interviewr/commit/c9017d4))
* **User:** makes email unique ([9f6183c](https://github.com/aimed/interviewr/commit/9f6183c))


### Features

* adds a safeIdFetcher to help resolve globalIds ([44773ef](https://github.com/aimed/interviewr/commit/44773ef))
* adds Application ([0cb6863](https://github.com/aimed/interviewr/commit/0cb6863))
* adds basic permission management for self ([2c578d5](https://github.com/aimed/interviewr/commit/2c578d5))
* adds basic/example resume layout to dashboard ([be16ef1](https://github.com/aimed/interviewr/commit/be16ef1))
* adds EducationCreate and WorkCreate mutations ([4284bae](https://github.com/aimed/interviewr/commit/4284bae))
* adds favicon ([61cba92](https://github.com/aimed/interviewr/commit/61cba92))
* adds graphql decorators ([1d26502](https://github.com/aimed/interviewr/commit/1d26502))
* adds login and viewer ([b7daf21](https://github.com/aimed/interviewr/commit/b7daf21))
* adds login/logout ([0a7c3f3](https://github.com/aimed/interviewr/commit/0a7c3f3))
* adds logout ([8e42147](https://github.com/aimed/interviewr/commit/8e42147))
* adds PersonalCreateMutation ([01cbd07](https://github.com/aimed/interviewr/commit/01cbd07))
* adds role to work and adds form ([7da67f2](https://github.com/aimed/interviewr/commit/7da67f2))
* adds routing ([9af629a](https://github.com/aimed/interviewr/commit/9af629a))
* adds SkillCreateMutation ([b91a4df](https://github.com/aimed/interviewr/commit/b91a4df))
* adds SkillGroupCreateMutation ([93e8c2d](https://github.com/aimed/interviewr/commit/93e8c2d))
* adds ssl redirect for heroku ([1a3a617](https://github.com/aimed/interviewr/commit/1a3a617))
* adds UserCreateForm and hydrokit ([a312dd5](https://github.com/aimed/interviewr/commit/a312dd5))
* adds/improves loader ([0a40a0f](https://github.com/aimed/interviewr/commit/0a40a0f))
* **SkillGroupType:** adds skills to SkillGroupType ([c360a00](https://github.com/aimed/interviewr/commit/c360a00))
* disable service worker ([08ef313](https://github.com/aimed/interviewr/commit/08ef313))
* implements file based applications ([06045c1](https://github.com/aimed/interviewr/commit/06045c1))
* loader always rotates ([7e14d25](https://github.com/aimed/interviewr/commit/7e14d25))
* makes the landing page pretty ([73f3ad8](https://github.com/aimed/interviewr/commit/73f3ad8))
* moves to DI and fixes tests ([a200e2a](https://github.com/aimed/interviewr/commit/a200e2a))
* serves client files after migration to json ([52db7b7](https://github.com/aimed/interviewr/commit/52db7b7))
* **ApplicationCreate:** adds work create and personal change ([4914fe6](https://github.com/aimed/interviewr/commit/4914fe6))
* **client:** init client ([61c8510](https://github.com/aimed/interviewr/commit/61c8510))
* **server:** now serves client build files ([53866e1](https://github.com/aimed/interviewr/commit/53866e1))


### BREAKING CHANGES

* changes personal to OneToMany
