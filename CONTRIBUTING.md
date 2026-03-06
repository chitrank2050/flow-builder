# Contributing to flow-builder

First off, thank you for considering contributing to flow-builder! It's people like you that make flow-builder such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](../../issues) to see if someone else in the community has already created a ticket. If not, go ahead and [make one](../../issues/new).

## Fork & create a branch

If this is something you think you can fix, then fork flow-builder and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b 325-add-graphql-support
```

## Get the test suite running

Make sure you have all the necessary dependencies installed and that the tests pass.

```sh
npm install
npm test
```

## Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first :smile:

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with flow-builder's master branch.

Finally, go to GitHub and [make a Pull Request](../../pulls) :D

## Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.
