# Hairtite retail app

This is an Expo react-native front-end project for quizing staff engagement for hair containment

## Version 1.1.1 (no back end implemented yet)

### Clickable Link to Youtube Shorts for learning resources

- Can now click on a resource and it will bring up the video within your default browser, within the app.
- URL is parsed to find video ID. This is then used to find the thumbnail, which is what is used for the image

<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.1/learningwiththumbnail.png" alt="learning page" width="500"/>
</p>

## Version 1.1 (no back end implemented yet)

### Home welcome message
- Added a welcome message to home page to fill empty space

<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.1/home.png" alt="home page" width="500"/>
</p>

### Added templates for learning resources
- Added a custom 'learning resource' component
- Application then maps a list of resources to this template, filling up a scroll view
- This will eventually come from a server for dynamic content

<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.1/learning.png" alt="learning page" width="500"/>
</p>

### Added Confetti animation to results screen
<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.1/confetti.png" alt="login page" width="500"/>
</p>

### Changed status bar
- Status Bar changed to be black so that it is visible against black background

<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.1/login.png" alt="login page" width="500"/>
</p>


## Version 1.0 (no back end implemented yet)

### Sign in/Sign up:
- Sign-up: Register for an account using name, email, D.O.B, place of work and password. When the manager of your branch accepts your request, you will then be able to sign in
- Sign-in: using a pre-registered account

### Home:
- Users can see their 'previous scores' in a graph (dummy data to begin with)
- A learning resources tab so that the users can learn more about hair containment before taking the test. (not populated yet)
<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.0/home.png" alt="home page" width="500"/>
</p>

### Quiz:
- Consists of 8 true/false questions

<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.0/quiz.png" alt="quiz" width="500"/>
</p>

- The user has two opportunities to get each question correct.
- If it is answered correctly initially, the score is incremented.
- If they get it wrong initially, a modal view pops up with some information to help them with the question, and a similar, rephrased followup question.
- If the follow up question is answered correctly, the score is incremented

<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.0/followup.png" alt="follow up" width="500"/>
</p>

- The user must get all questions correct to pass (Two atempts on each question, so it should be easy to pass, with a focus on staff **learning**, rather than testing)
