# LST React Mini project

This mini project uses bootstrap, and bootstrap icons
I recommend reading the comments i made in App.js and server.js to better
understand the code, otherwise here's a small summary.

# How to run

First use yarn install to install the dependencies, then yarn start in the root of the project.
Then use node server.js to run the node server.

## States

I used 3 state variables,

- donecards
  Which contains an array of JSX Card elements that represents the tasks
  that are done, they come with 2 buttons, one to toggle the done state of the task
  and one to delete the task
- notcards
  Which contains an array of JSX Card elements that represents the tasks
  that are yet to be done, same structure as the done tasks
- update
  A state variable that I used to force the rerender of the component.
  used in the useEffect dependency array, so that useEffect only triggers
  when that state variable is changed.

## Managing tasks

To add a task, I created a function which i called in the onSubmit in the form
and in the onClick in the button that's next to the input, I did this so that
you can add a task by pressing enter, or by pressing the button.
The function itself is pretty simple, it uses a POST rest API to send
data to the expressJS server as a JSON object that contains
{"task":"task to insert","complete":"false"}
the task newly added is not completed yet, so "complete" is always inserted false.
Then in the expressJS server, I load the current data.JSON , push into it the
new task, with an id that's the length + 1, and then i rewrite in the file.

Deleting a task works similarly enough, this time I used a GET rest API to send only
the id of the task to delete, which is set correctly in each delete button in the cards,
then in the server I used array.splice with a while loop to find the id to delete,
then i rewrite in the data.JSON file.

To toggle a task's complete state, I used a GET rest API with id params, like the delete,
then a while loop to find the task, and toggling the current complete variable.
