social-scoreboard
=================

This application ([demo](http://socialscoreboard-dawzayas.rhcloud.com/)) will be used to share the score of a basketball game between several people. 

There will be a person attending the match and she will go updating the result for other people who are not there.


## Software dependencies

First off, you need install the following open source software:

 - [NodeJS](http://nodejs.org/): __Important__: use the version 0.10.26 or later. [Installation guide](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
 - [g++](http://gcc.gnu.org/projects/cxx0x.html): Some Node libraries require *c++ compiler*. Find out how to install it on your operating system (in Ubuntu: `sudo apt-get install gcc-defaults`).
 - [MongoDB](http://www.mongodb.org/): We are using 2.4.8 [Installation guide](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
 - [Grunt](http://gruntjs.com/): `sudo npm install -g grunt-cli`
 - [Bower](http://bower.io/): `sudo npm install -g bower`


## To Start

```bash
$ sudo mongodb
```

## Launch local server

At the first time, open a console then go to the project folder and type the following command, installing all the dependencies required by NodeJS:

```bash
$ npm install
$ bower install
```

Then run the local dev server:

```bash
$ grunt
```

This will start the dev server at `http://localhost:8000/`


## To test with Cucumber:


```bash
$ npm install
$ bower install
```

```bash
$ grunt server-test
```

## To test API with dredd

```bash
grunt
grunt dredd ##In other terminal
```

## To deploy to OpenShift

### To merge ([see this](http://stackoverflow.com/questions/12657168/can-i-use-my-existing-git-repo-with-openshift)):

```bash
$ git clone <GitHub-repo-url>
$ git remote add openshift -f <openshift-git-repo-url>
$ git merge openshift/master -s recursive -X ours
```

### To push changes:

```bash
$ git pull
$ git push openshift HEAD
```

