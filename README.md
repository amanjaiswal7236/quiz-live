# Real-Time Quiz Application

This application allows users to participate in quizzes in real-time. Users can create, view, update, and delete quizzes. The real-time feature ensures dynamic interaction during quizzes, powered by WebSockets. Authentication ensures that only authorized users can manage their quizzes.

## Features

- **Real-Time Interaction**: Host quizzes and receive participant responses instantly.
- **User-Friendly Interface**: Easily create and manage quizzes.
- **Secure Authentication**: Login and registration powered by Clerk.
- **Role-Based Access**: Only the quiz creator can make changes to their quizzes.
- **Dynamic Updates**: Real-time feedback and results for participants.

## How to Use

1. **Sign Up or Log In**
   - Access the application and sign up for an account or log in if you already have one.

2. **Create a Quiz**
   - Navigate to the "Create Quiz" section.
   - Provide a title, description, and add questions with multiple-choice answers.
   - Mark the correct answers.

3. **Host a Quiz**
   - Go to the "My Quizzes" section.
   - Select a quiz and click "Host" to start a real-time session.
   - Share the session code or link with participants.

4. **Participate in a Quiz**
   - Enter the session code or link provided by the host.
   - Answer questions as they appear in real-time.

5. **View Results**
   - Hosts can view participant responses and scores dynamically during the quiz.
   - Participants can see their scores at the end of the quiz.

6. **Update or Delete a Quiz**
   - Manage your quizzes in the "My Quizzes" section.
   - Select a quiz to edit or delete it permanently.

## Key Points

- **Authentication**: All features require you to be logged in.
- **Authorization**: You can only edit or delete quizzes that you created.
- **Real-Time Updates**: WebSocket integration ensures live interaction.
- **Data Storage**: All data is securely stored in a PostgreSQL database.

## Getting Started

- Visit the application link (e.g., `http://localhost:3000` for local development).
- Follow the steps above to manage and host quizzes seamlessly.

Enjoy hosting and participating in real-time quizzes!
