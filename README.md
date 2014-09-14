social-scoreboard
=================

This application ([demo](http://socialscoreboard-dawzayas.rhcloud.com/)) will be used to share the score of a basketball game between several people. 

There will be a person attending the match and she will go updating the result for other people who are not there.

To install:

```bash
npm install
bower install
```

To test with Cucumber:

```bash
grunt server-test
```

To start Web server

```bash
grunt
```

deploy to OpenShift
===================

To merge ([see this](http://stackoverflow.com/questions/12657168/can-i-use-my-existing-git-repo-with-openshift)):

```bash
git clone <GitHub-repo-url>
git remote add openshift -f <openshift-git-repo-url>
git merge openshift/master -s recursive -X ours
```

To push changes:
```bash
git pull
git push openshift HEAD
```
