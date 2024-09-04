# Hairtite retail app (No Backend implementation)

This is an Expo react-native front-end project for quizing staff engagement for hair containment

## Version 1.0

### Sign in/Sign up (no back end implemented yet):
- Sign-up: Register for an account using name, email, D.O.B, place of work and password. When the manager of your branch accepts your request, you will then be able to sign in
- Sign-in: using a pre-registered account

### Home:
- Users can see their 'previous scores' in a graph (dummy data to begin with)
- A learning resources tab so that the users can learn more about hair containment before taking the test. (not populated yet)
<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.0%20home.png" alt="home page" width="500"/>
</p>

### Quiz:
- Consists of 8 true/false questions

<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.0%20quiz.png" alt="quiz" width="500"/>
</p>

- The user has two opportunities to get each question correct.
- If it is answered correctly initially, the score is incremented.
- If they get it wrong initially, a modal view pops up with some information to help them with the question, and a similar, rephrased followup question.
- If the follow up question is answered correctly, the score is incremented

<p align="center">
  <img src="https://github.com/alexgburnet/Hairtite-App/blob/main/README%20images/v1.0%20followup.png" alt="follow up" width="500"/>
</p>

- The user must get all questions correct to pass (Two atempts on each question, so it should be easy to pass, with a focus on staff **learning**, rather than testing)
