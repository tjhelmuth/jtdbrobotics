## Javascript client    

The client is a react project that runs in your browser or a standalone electron app. I have not figured out how to package the standalone app yet.


___
### Install yarn
To run the client you need to install Yarn

https://classic.yarnpkg.com/en/docs/install/#windows-stable

Yarn is a package manager for javascript that lets you download libraries from other people that you can add to your app. It also will package everything together into 1 file that you can give people to run.

Starting up the app and building it is done through yarn commands.

____

### Running the app in browser
Once yarn is installed you will need to navigate to the client/javascript folder.

    cd client/javascript

Once you are there you will need to run

    yarn install

You will want to run this anytime you pull down new code from the git repo. It goes out and downloads the necessary libraries that are includes in package.json

After yarn install is completed. To start the app, you will need to execute

    yarn browser

This will compile the app and start it up in your browser.
___

### Editing the code
You can use Visual Studio Code to edit the code :)