# Doodle Classifier

This is the frontend of our Doodle classifier, created as a project during the Le Wagon Data Science and AI bootcamp in December 2023.
It can recognize 20 categories from the beginning of the English alphabet. Try drawing things like an apple, an axe, an ambulance, an angel, a baseball, or anything else you can see in the background image.

**Try it**
https://dzsobacsi.github.io/doodle-frontend/

![screenshot](https://github.com/dzsobacsi/doodle-frontend/blob/master/apple.png)

## Under the hood

Our project is a doodle classifier that leverages the power of transfer learning for image recognition. We used the VGG-16 model as the foundation, training it on a diverse set of drawings sourced from Google's Quick Draw dataset. 
This approach enables our classifier to identify hand-drawn images.

Backend: https://github.com/Jrosis/apidoodle/tree/master

Machine learning model: https://github.com/psousa01/doodle-project
