# FitLog — Train With Intent. Log Every Set.

## Project Links
* **Live Application**: [https://assignment-06-weld.vercel.app/](https://assignment-06-weld.vercel.app/)
* **GitHub Repository**: [https://github.com/jm-jahed/assignment-06](https://github.com/jm-jahed/assignment-06)

## Project Description
FitLog is a dark, no-nonsense gym companion web application that enables users to browse workout routines, inspect step-by-step performance instructions, build a daily workout plan with automated time and calorie tracking, save favorite exercises for later, and track completion progress.

## Technologies Used
* **Framework**: Next.js 16 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS (Dark/Lime Gym Theme)
* **State Management**: React Context API (`FitLogContext`, `ToastContext`)
* **Persistence**: Browser `localStorage` API
* **API Integration**: REST API via `fetch()`

## Features
1. **Home Workout Library**: Browse all available lifts fetched from the REST API, complete with muscle group badges, specs, and community ratings.
2. **Search & Sort System**: Instantly search workouts by name or muscle group tag, and sort by Duration, Calories Burned, or Rating.
3. **Workout Detail View**: Dynamic route `/workout/[id]` displaying step-by-step instructions, equipment required, difficulty, sets, reps, duration, and calories.
4. **Today's Plan Management**: Add up to 5 workouts to Today's Plan with duplicate prevention, cap limits, and real-time total exercises, minutes, and calories tracking on `/my-plan`.
5. **Saved Workouts**: Save workouts for later reference in a dedicated tab with instant access.
6. **Mark as Done & Remove Actions**: Toggle completion status for plan exercises and remove items with immediate Navbar counter updates.
7. **Toast Notifications**: Accessible notification toasts for real-time user feedback on actions, duplicates, and plan limits.
