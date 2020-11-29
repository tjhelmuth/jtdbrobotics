# jtdbrobotics

We're here for robot arms.

If you don't understand why the "b" is there and hate it, complain to Tyler.

## Basic Architecture
____

There are two different apps that need to run in order for the robots to work:

1. Server
    - Runs on the Raspberry Pi
    - Actually controls the servos
    - Receives requests from client
2. Client
    - Runs on any machine
    - UI for people
    - Sends requests to Server

## GIT Tutorial for James:
____

Git is a way to share changes to code with other developers.

You will need to make an account on github.com

When you want to download the code for the first time you will want to navigate on your computer or raspberry pi to where you want to download the code and then execute

    git clone https://github.com/tjhelmuth/jtdbrobotics.git

This will download the code onto your computer for the first time.

### Pulling the latest code changes
____

This code will not automatically keep up to date with the changes that other people are making. You will need to manually ask git to download the latest changes

To do this you will need to run the command

    git pull --rebase

This will go out and check what has changed since you last pulled changes, and grab them.

If git gives you an error that you have local changes that need to be committed, you can first run

    git stash push

Before doing the pull

After doing the pull you can do 

    git stash apply 0

To put your changes that you've made back
